"""`_kit.land` —— 原件落盘（只增不改）+ `_fetch_manifest.jsonl` 追加。

## 两条纪律（本仓既有，不是本包发明的）

1. **原件不可变**：同一 `(source_id, content_hash)` 重跑只记 `skipped`，**不覆盖**。
   与 `system/env/meta/raw/batches/**` 的"只增不改"同纪律。
2. **0 字节判失败**：`bytes == 0` 一律 `failed`——实测过 7 件"md 存在但 0 字节 +
   content_list 只有 []"被当成已跑成（`docs/v7/交接文档.md` 的坑清单）。

## 落点

    pipelines/_landing/<source_id>/<as-of>/<artifact_id>__<hash12>.<ext>
    pipelines/_landing/<source_id>/<as-of>/_fetch_manifest.jsonl

`artifact_id` 由源主键派生、只含 `[0-9A-Za-z._-]`；URL 参数一律进 manifest 不进文件名
（否则文件名会随查询参数爆炸）。
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Iterable

from .artifact import FetchRecord, sha256_hex

__all__ = ["Landing", "LandResult", "safe_slug", "LANDING_ROOT"]

LANDING_ROOT = Path(__file__).resolve().parents[1] / "_landing"
MANIFEST_NAME = "_fetch_manifest.jsonl"
_SLUG_RE = re.compile(r"[^0-9A-Za-z._-]+")
#: 文件名尾部 `__<hash12>.<ext>` 的锚定匹配（`hash12` 必须后接点号）
_HASH_SUFFIX = re.compile(r"__([0-9a-f]{12})\.[A-Za-z0-9]+$")


def safe_slug(raw: str, *, max_len: int = 80) -> str:
    """把任意 id 归一成安全文件名片段（只留 `[0-9A-Za-z._-]`）。

    ★ 除字符白名单外**必须再清一次点号**：`..` 由两个合法字符组成，
      白名单放行、路径穿越风险仍在（实测：`../../etc/passwd` 归一成
      `.._.._etc_passwd`，仍含 `..`）。所以归一后再把连续点号压成单个点，
      并去掉首尾的点——文件名里不需要它们。

    中文会被替换成 `_`，所以调用方应传入**已含英文主键**的 id
    （本包的 `material_id` 一律是 `01-10-K-2026-01-29-meta20251231` 这种形态）。
    """
    slug = _SLUG_RE.sub("_", raw.strip())
    slug = re.sub(r"\.{2,}", ".", slug).strip("._")
    return (slug[:max_len] or "artifact")


@dataclass(frozen=True)
class LandResult:
    """一件落盘的结果。"""

    path: Path
    content_hash: str
    bytes: int
    skipped: bool
    """`True` = 该 `(source_id, content_hash)` 已存在，本次未写入。"""


class Landing:
    """一个 `(source_id, as_of)` 的落盘目录。"""

    def __init__(self, source_id: str, as_of: date, root: Path | None = None) -> None:
        self.source_id = source_id
        self.as_of = as_of
        self.dir = (root or LANDING_ROOT) / safe_slug(source_id) / as_of.isoformat()
        self.dir.mkdir(parents=True, exist_ok=True)

    # ── 幂等查询 ────────────────────────────────────────────────────────
    def existing_hashes(self) -> dict[str, Path]:
        """本目录内已有的 `content_hash 前 12 位 → 路径`（幂等键的落盘侧索引）。

        以文件名里的 `__<hash12>.<ext>` 为索引，不读文件内容（够用且快）。

        ★ 必须用**锚定正则**而不是 `split("__")`：早期实现把扩展名直接拼在哈希后面
          （`...__1a358fd7824dhtm`），于是 `parts[1]` 恒为 `1a358fd7824dhtm`、
          与 `hash[:12]` 永不相等 ⇒ `skipped` 恒 0 且原件被每次重写。
          实测发现（2026-10-28）。正则要求哈希后紧跟 `.`，形状不对就跳过该文件
          （宁可漏判成"新件"也不误判成"已存在"——后者会丢材料）。
        """
        out: dict[str, Path] = {}
        for p in self.dir.iterdir():
            if not p.is_file() or p.name == MANIFEST_NAME:
                continue
            m = _HASH_SUFFIX.search(p.name)
            if m:
                out[m.group(1)] = p
        return out

    # ── 写入 ────────────────────────────────────────────────────────────
    def write(self, artifact_id: str, body: bytes, *, ext: str) -> LandResult:
        """写入原件（只增不改）。

        失败模式：`body` 为空即抛 `ValueError`——调用方必须把它记成 `failed`，
        **不许**把 0 字节落成"已取到"。
        """
        if not body:
            raise ValueError(f"{artifact_id}: 拒绝写入 0 字节（0 字节判失败）")
        digest = sha256_hex(body)
        short = digest[:12]
        suffix = ext.lstrip(".") or "bin"
        path = self.dir / f"{safe_slug(artifact_id)}__{short}.{suffix}"

        if short in self.existing_hashes():
            return LandResult(path=path, content_hash=digest, bytes=len(body), skipped=True)

        path.write_bytes(body)
        return LandResult(path=path, content_hash=digest, bytes=len(body), skipped=False)

    # ── manifest ────────────────────────────────────────────────────────
    def append_manifest(self, records: Iterable[FetchRecord]) -> int:
        """追加 manifest 行；返回写入行数。

        幂等：以 `(source_id, content_hash)` 为键，已存在的不再追加
        —— 否则同日重跑会让账变长，`_fetch_manifest` 行数就对不上索引行数了。
        """
        seen = self.read_manifest_keys()
        n = 0
        with (self.dir / MANIFEST_NAME).open("a", encoding="utf-8", newline="\n") as fh:
            for rec in records:
                key = (rec.source_id, rec.content_hash)
                if key in seen:
                    continue
                fh.write(rec.to_jsonl() + "\n")
                seen.add(key)
                n += 1
        return n

    def read_manifest_keys(self) -> set[tuple[str, str]]:
        """已记账的 `(source_id, content_hash)` 集合。"""
        f = self.dir / MANIFEST_NAME
        if not f.is_file():
            return set()
        keys: set[tuple[str, str]] = set()
        for line in f.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                continue
            keys.add((str(obj.get("source_id", "")), str(obj.get("content_hash", ""))))
        return keys

    def read_manifest(self) -> list[dict[str, object]]:
        """读回全部 manifest 行（守卫与报告用）。"""
        f = self.dir / MANIFEST_NAME
        if not f.is_file():
            return []
        return [json.loads(x) for x in f.read_text(encoding="utf-8").splitlines() if x.strip()]

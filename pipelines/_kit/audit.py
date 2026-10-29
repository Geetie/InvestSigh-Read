"""`_kit.audit` —— `corpus/materials/` 的入库体检（只读，不改任何东西）。

## 为什么单列一个命令

`run` 只告诉你"这一型跑完 ok"，不告诉你"仓库里 389 份材料是否都完整、有没有重复入库"。
`check.mjs` 查的是**引用是否属实**（R1/R2），也管不到入库形态。
所以入库卫生需要一个独立的、可反复跑的观测面。

## 五条判据（每条都能被一个反例触发）

| # | 判据 | 反例 |
|---|---|---|
| A1 | 必需文件齐（pages.json / content.md / meta.json / source.*） | Adapter 只 land 没 normalize |
| A2 | `pages` 非空 且 `pageCount == len(pages)` | 解析出 0 块还当成功 |
| A3 | 正文非 0 字 | 空壳材料冒充取到 |
| A4 | 无「同 sourceSha256 多份」 | 同一内容被多型各存一份 |
| A5 | 新产出（有 sourceSha256 的）必须有 `source` 字段 | 不知道材料从哪来 |

A4/A5 只对**有 `sourceSha256` 的材料**生效——历史手工材料没有这个字段，
不参与判定，但会在报告里单列数量（**不是**"通过"，是"无法判定"）。

## 退出码

`0` 全部通过 ｜ `1` 有违例（逐条具名） ｜ 与 `run` 的三态语义无关。
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path

__all__ = ["AuditReport", "audit_materials"]

REQUIRED_FILES = ("pages.json", "content.md", "meta.json")


@dataclass
class AuditReport:
    """体检结果。所有列表都装**材料 id**，便于直接 ls。"""

    total: int = 0
    missing_files: list[str] = field(default_factory=list)
    empty_pages: list[str] = field(default_factory=list)
    count_mismatch: list[str] = field(default_factory=list)
    zero_chars: list[str] = field(default_factory=list)
    bad_json: list[str] = field(default_factory=list)
    dups: dict[str, list[str]] = field(default_factory=dict)
    no_source: list[str] = field(default_factory=list)
    no_hash: list[str] = field(default_factory=list)

    @property
    def ok(self) -> bool:
        """A1–A3 与 A4–A5 全过才算通过。"""
        return not (
            self.missing_files
            or self.empty_pages
            or self.count_mismatch
            or self.zero_chars
            or self.bad_json
            or self.dups
            or self.no_source
        )

    def violations(self) -> list[str]:
        """逐条具名（**不静默**：每条都说清是哪份、错在哪）。"""
        out: list[str] = []
        for m in self.missing_files:
            out.append(f"[A1] 缺必需文件: {m}")
        for m in self.bad_json:
            out.append(f"[A1] JSON 解析失败: {m}")
        for m in self.empty_pages:
            out.append(f"[A2] pages 为空: {m}")
        for m in self.count_mismatch:
            out.append(f"[A2] pageCount 与 pages 长度不一致: {m}")
        for m in self.zero_chars:
            out.append(f"[A3] 正文 0 字: {m}")
        for h, ids in self.dups.items():
            out.append(f"[A4] 内容重复({h[:12]}) {len(ids)} 份: {', '.join(ids)}")
        for m in self.no_source:
            out.append(f"[A5] 有 hash 但缺 source 字段: {m}")
        return out


def audit_materials(root: Path) -> AuditReport:
    """扫 `corpus/materials/` 下的全部材料目录，返回体检报告。

    失败模式：目录不存在 ⇒ `total=0` 且**不报违例**（空仓库不是违例，
    但调用方应从 `total` 看出来"一份都没有"，而不是以为"全部通过"）。
    """
    rep = AuditReport()
    if not root.is_dir():
        return rep

    reps: dict[str, list[str]] = {}
    for d in sorted(p for p in root.iterdir() if p.is_dir()):
        rep.total += 1
        name = d.name
        files = {f.name for f in d.iterdir() if f.is_file()}

        missing = [r for r in REQUIRED_FILES if r not in files]
        if not any(f.startswith("source.") for f in files):
            missing.append("source.*")
        if missing:
            rep.missing_files.append(f"{name}（缺 {','.join(missing)}）")

        digest = None
        src = None
        pj = d / "pages.json"
        if pj.is_file():
            try:
                doc = json.loads(pj.read_text(encoding="utf-8"))
            except Exception:
                rep.bad_json.append(name)
                doc = None
            if doc is not None:
                pages = doc.get("pages") or []
                if not pages:
                    rep.empty_pages.append(name)
                else:
                    declared = doc.get("pageCount")
                    if declared is not None and int(declared) != len(pages):
                        rep.count_mismatch.append(f"{name}（pageCount={declared} 实为 {len(pages)}）")
                    total_chars = sum(
                        int(p.get("chars") or len(str(p.get("text") or ""))) for p in pages
                    )
                    if total_chars == 0:
                        rep.zero_chars.append(name)
                digest = doc.get("sourceSha256")
                src = doc.get("source")

        mj = d / "meta.json"
        if mj.is_file():
            try:
                meta = json.loads(mj.read_text(encoding="utf-8"))
            except Exception:
                if name not in rep.bad_json:
                    rep.bad_json.append(name)
                meta = {}
            # ★ 无论 pages.json 有没有 hash 都要读 meta：
            #   `source` 只写在 meta 里，若因"已有 digest"就跳过，A5 会永远通过
            #   —— 那是一条**看起来在查、实际查不到**的规则（自测反例见 A5 用法）。
            digest = meta.get("sourceSha256") or digest
            src = meta.get("source") or src

        if digest and not src:
            rep.no_source.append(name)

        if digest:
            reps.setdefault(str(digest), []).append(name)
        else:
            rep.no_hash.append(name)

    rep.dups = {h: ids for h, ids in reps.items() if len(ids) > 1}
    return rep

"""`_kit.artifact` —— 落盘物与取数记账的数据类（`_fetch_manifest.jsonl` 的唯一字段真源）。

## 为什么字段锁死 13 个

`_fetch_manifest.jsonl` 是这份管道唯一的审计面：Agent 靠它回答「这件是什么时候、
从哪个 URL、在哪个数据期间、用的哪个解析器、属于哪个许可层」。少一个字段，
那件材料就不可复现；多一个字段，就多一处要维护的漂移点。

所以 `FetchRecord` 用 `@dataclass(frozen=True)` 且 `__post_init__` 校验必填，
**`required_fields()` 与 `to_jsonl()` 共用同一份字段表**（`FIELDS`），不写第二份枚举。

## 三态与 `checked_scope`

`Status` 只有三个值。`EMPTY` **必须**带 `checked_scope`：它回答的不是"没数据"，
而是"我查了这些日期/接口/参数，确实没有"。缺它就把 `empty` 降级成 `failed`——
因为"没查就说没有"与"查过确实没有"在报告里长得一样，那是最危险的混淆。
"""

from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass, field
from datetime import date, datetime, timezone
from enum import Enum
from typing import Any, Mapping

__all__ = [
    "Status",
    "RunStatus",
    "Artifact",
    "FetchRecord",
    "TypeSpec",
    "TypeResult",
    "ClassReport",
    "now_utc",
    "sha256_hex",
]


def now_utc() -> str:
    """当前 UTC 时刻（ISO 8601，秒精度，带 `+00:00`）。"""
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def sha256_hex(payload: bytes) -> str:
    """原始字节的 SHA-256 十六进制摘要（幂等键的一半）。"""
    return hashlib.sha256(payload).hexdigest()


class Status(str, Enum):
    """单个型的运行结果。只有这三态 + 一个"不运行"的标记态。

    - `OK`：有件且可解析。
    - `EMPTY`：查过了、确实无件。**必须带 `checked_scope`**，否则降级为 `FAILED`。
    - `UNAVAILABLE`：不可达 / 无 key / 登录失效 / 结构性无源。**必须带 `absent_reason`**。
    - `FAILED`：解析异常、落盘 0 字节、manifest 缺字段——**这是"我跑坏了"**。
    - `NOT_RUN`：`status: map` 的查表册，本管道不负责取数。
    """

    OK = "ok"
    EMPTY = "empty"
    UNAVAILABLE = "unavailable"
    FAILED = "failed"
    NOT_RUN = "not_run"


class RunStatus(str, Enum):
    """一次整类/整轮运行的退出码来源（三态分码，给 Agent 用）。"""

    OK = "ok"
    FAILED = "failed"
    UNAVAILABLE = "unavailable"


@dataclass(frozen=True)
class Artifact:
    """一件落盘材料。

    `material_id` 与 `corpus/materials/<id>/` 的目录名同源（`README §3.1` 三处同 id 纪律）；
    `path` 是原件相对仓库根的路径；`bytes` 为 0 即判失败。
    """

    material_id: str
    path: str
    bytes: int
    content_hash: str
    pages: int | None = None
    caliber: Mapping[str, Any] = field(default_factory=dict)

    def to_json(self) -> dict[str, Any]:
        out: dict[str, Any] = {
            "id": self.material_id,
            "path": self.path,
            "bytes": self.bytes,
            "sha256": self.content_hash,
        }
        if self.pages is not None:
            out["pages"] = self.pages
        if self.caliber:
            out["caliber"] = dict(self.caliber)
        return out


#: `_fetch_manifest.jsonl` 的 13 个必填字段（顺序即落盘顺序，禁改序）。
FIELDS: tuple[str, ...] = (
    "source_id",
    "url",
    "http_status",
    "fetched_at",
    "published_at",
    "as_of",
    "vintage",
    "content_hash",
    "bytes",
    "content_type",
    "parser_version",
    "license_tier",
    "channel_tier",
)


class ManifestError(ValueError):
    """manifest 字段不合法（缺字段 / 值越界）。"""


@dataclass(frozen=True)
class FetchRecord:
    """一条取数记账（`_fetch_manifest.jsonl` 的一行，13 字段）。"""

    source_id: str
    url: str
    http_status: int
    fetched_at: str
    published_at: str | None
    as_of: str
    vintage: str | None
    content_hash: str
    bytes: int
    content_type: str
    parser_version: str
    license_tier: str
    channel_tier: str

    def __post_init__(self) -> None:
        # 必填但不在此处做的校验（0 字节、http 非 2xx）由 `_kit.land` 判，因为那里才知道上下文。
        if self.bytes < 0:
            raise ManifestError(f"bytes 不得为负：{self.bytes}")
        if not self.content_hash:
            raise ManifestError("content_hash 不得为空（幂等键的一半）")
        if self.license_tier not in {"official_public", "free_quota", "paid", "forbidden"}:
            raise ManifestError(f"license_tier 非法：{self.license_tier!r}")
        if self.channel_tier not in {"T0", "T1", "T2", "T3", "T4"}:
            raise ManifestError(f"channel_tier 非法：{self.channel_tier!r}")

    @classmethod
    def required_fields(cls) -> tuple[str, ...]:
        """13 个必填字段（与 `FIELDS` 同一份，不复制）。"""
        return FIELDS

    def to_json(self) -> dict[str, Any]:
        """按 `FIELDS` 顺序序列化——落盘顺序稳定，diff 才可读。"""
        as_dict = {name: getattr(self, name) for name in FIELDS}
        return as_dict

    def to_jsonl(self) -> str:
        """一行 JSONL（UTF-8，不转义非 ASCII，方便人读账）。"""
        return json.dumps(self.to_json(), ensure_ascii=False, sort_keys=False)


@dataclass(frozen=True)
class TypeSpec:
    """一个型的声明（来自 `<类目录>/channels.yaml` 的一行）。"""

    slug: str
    name: str
    class_id: str
    adapter: str | None
    status: str
    sub: str
    frequency: str
    page_caliber: str
    channel_tier: str
    license_tier: str
    params: Mapping[str, Any] = field(default_factory=dict)
    pitfalls: tuple[str, ...] = ()
    manual_ref: str = ""

    @property
    def key(self) -> str:
        """全仓唯一键：`<类码>-<slug>`（与 `channels.yaml` 主键、报告里的一致）。"""
        return f"{self.class_id}-{self.slug}"

    def __post_init__(self) -> None:
        if self.status not in {"auto", "partial", "needs_key", "t3", "map", "unavailable"}:
            raise ManifestError(f"{self.key}: status 非法 {self.status!r}")
        if self.status in {"auto", "partial", "needs_key", "t3"} and not self.adapter:
            raise ManifestError(f"{self.key}: status={self.status} 必须声明 adapter")
        if self.status in {"map", "unavailable"} and self.adapter:
            # 允许显式写 adapter 但会被忽略——这里直接拒，避免"声明了却不跑"的静默差
            raise ManifestError(f"{self.key}: status={self.status} 不得声明 adapter")


@dataclass
class TypeResult:
    """一个型跑完的结果（进 `_runs/<as-of>/<class_id>.json`）。"""

    slug: str
    name: str
    status: Status
    adapter: str | None = None
    artifacts: list[Artifact] = field(default_factory=list)
    skipped: int = 0
    failed: list[str] = field(default_factory=list)
    gap: dict[str, Any] | None = None
    checked_scope: list[str] = field(default_factory=list)
    absent_reason: str | None = None
    manual_ref: str | None = None
    action_required: dict[str, Any] | None = None
    """需要**某个人**（不是 Agent 重试）才能解的缺口：谁、在哪、做什么。
    见 `_kit/base.py::Unavailable.action`。`None` = 没人能解（结构性无源/网络不可达）。"""

    def to_json(self) -> dict[str, Any]:
        out: dict[str, Any] = {
            "slug": self.slug,
            "name": self.name,
            "status": self.status.value,
        }
        if self.adapter:
            out["adapter"] = self.adapter
        if self.artifacts:
            out["artifacts"] = [a.to_json() for a in self.artifacts]
        if self.skipped:
            out["skipped"] = self.skipped
        if self.failed:
            out["failed"] = list(self.failed)
        gap: dict[str, Any] = dict(self.gap or {})
        if self.checked_scope:
            gap["checked_scope"] = list(self.checked_scope)
        if self.absent_reason:
            gap["absent_reason"] = self.absent_reason
        if self.manual_ref:
            gap["manual_ref"] = self.manual_ref
        if self.action_required:
            gap["action_required"] = dict(self.action_required)
        if gap:
            out["gap"] = gap
        return out

    def finalize(self) -> "TypeResult":
        """把"缺证据的态"降级为 `FAILED`——三态语义在这里收口，调用方不必各写一遍。

        - `EMPTY` 缺 `checked_scope` ⇒ `FAILED`
        - `UNAVAILABLE` 缺 `absent_reason` ⇒ `FAILED`
        """
        if self.status is Status.EMPTY and not self.checked_scope:
            self.status = Status.FAILED
            self.failed.append("empty 缺 checked_scope：不许把「没查」写成「没有」")
        if self.status is Status.UNAVAILABLE and not self.absent_reason:
            self.status = Status.FAILED
            self.failed.append("unavailable 缺 absent_reason：不许把「不可用」写成空")
        return self


@dataclass
class ClassReport:
    """一类的运行报告（`_runs/<as-of>/<class_id>.json`）。"""

    as_of: date
    class_id: str
    class_name: str
    types: list[TypeResult] = field(default_factory=list)
    started_at: str = field(default_factory=now_utc)
    finished_at: str | None = None

    @property
    def exit_code(self) -> int:
        """三态分码：0 全 ok · **1 有 failed（优先）** · 3 有 unavailable。

        ★ **`failed` 优先于 `unavailable`，不是反过来**。理由是可行动性：

        - `failed` = **我们的问题**（解析坏 / 0 字节 / manifest 缺字段）⇒ 可重试、可修；
        - `unavailable` = **世界的问题**（无源 / 无 key / 登录失效）⇒ 重试不改变任何事。

        若让 `3` 盖住 `1`，Agent 看到"无源"就会判定"重试无意义"而跳过，
        于是一个**真的坏掉的工具会长期在线且没人知道**——这正是本包最该防的事。
        反过来让 `1` 赢，代价只是 Agent 多试一次（已限制 1 次），
        而"哪一型不可用"的信息**也不会丢**：它就在同一份 JSON 报告的 `gap` 里。

        `not_run`（`map` 类）与 `empty` 不影响退出码。
        """
        states = {t.status for t in self.types}
        if Status.FAILED in states:
            return 1
        if Status.UNAVAILABLE in states:
            return 3
        return 0

    def to_json(self) -> dict[str, Any]:
        return {
            "as_of": self.as_of.isoformat(),
            "class_id": self.class_id,
            "class_name": self.class_name,
            "started_at": self.started_at,
            "finished_at": self.finished_at or now_utc(),
            "exit_code": self.exit_code,
            "types": [t.to_json() for t in self.types],
        }

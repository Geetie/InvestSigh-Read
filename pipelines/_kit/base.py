"""`_kit.base` —— 五段骨架（Template Method）+ 每型的 Strategy 降级链。

## 五段

    probe —★→ fetch —★→ land → normalize —★→ manifest

实心段（`land` / `manifest`）在基类写死一次；★ 段由 Adapter 覆写。

**为什么要把这三段锁在基类**：三态语义、13 字段 manifest、幂等键、限速退避
若每型各写一遍，必然出现"某个型忘了写 `checked_scope`"——那正是
`selftest` 要拦的事。锁在基类 = 一次写对，34 型自动继承。

## Adapter 契约（Adapter 只需实现这三个）

```python
def probe(client, spec) -> list[str]                  # 打一条最小请求；返回 checked_scope 片段
def fetch(client, spec, window) -> list[RawItem]      # 拉取；RawItem 自带 url/published_at
def normalize(raw, spec) -> MaterialDraft             # 转成一份一目录的草稿
```

`RawItem` 只是「一个 HTTP 响应的最小元数据 + 字节」，不含解析结果——
解析放 `normalize`，这样"落原件"与"解析"可以分别失败、分别记账。

## Strategy：降级链

`channels.yaml` 里每型可写 `fallback: [<adapter>, …]`；主 Adapter 抛 `Unavailable`
时按序试下一个。**只对 `unavailable` 降级**：`failed`（解析坏了）不降级——
那说明工具本身有问题，掩盖它会让坏工具长期在线。
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Mapping, Protocol, Sequence

from .artifact import (
    Artifact,
    FetchRecord,
    Status,
    TypeResult,
    TypeSpec,
    now_utc,
    sha256_hex,
)
from .http import FetchError, HttpClient
from .land import Landing
from .material import MaterialDraft, write_material

__all__ = ["RawItem", "Unavailable", "AdapterProtocol", "Window", "run_type"]


class Unavailable(RuntimeError):
    """该源本次不可用（不可达 / 无 key / 登录失效）。

    与 `FetchError` 的区别：`FetchError` 是"某一次请求失败"，
    `Unavailable` 是"这个源整体现在不能用"——前者会重试，后者直接降级或记 unavailable。

    ## `action`：把"该找人"这件事变成结构化数据

    有些 unavailable **不是世界的问题，是"需要某个人做一件事"**（典型：扫码登录、
    在客户端里手动下载）。这类缺口光报 `absent_reason` 没用——Agent 会去重试，
    而重试永远不成功。所以允许 Adapter 附一个 `action`，说明**谁、在哪、做什么**：

    ```python
    Unavailable("zsxq: 没有会话", action={
        "who": "账号持有人",
        "why": "本机没有 zsxq 的登录会话",
        "command": "python -m pipelines login --source zsxq",
        "steps": ["运行上面的命令", "在弹出的浏览器窗口用微信扫码", "回到 Agent 回复已完成"],
    })
    ```

    它会原样进 `_runs/<as-of>/<class>.json` 的 `gap.action_required`，
    Agent 读到就直接转述给人，**不要再试**。
    """

    def __init__(
        self,
        reason: str,
        *,
        checked_scope: Sequence[str] = (),
        action: Mapping[str, Any] | None = None,
    ) -> None:
        super().__init__(reason)
        self.reason = reason
        self.checked_scope = list(checked_scope)
        self.action = dict(action) if action else None


@dataclass(frozen=True)
class Window:
    """取数窗口。`as_of` 是**运行日**，`lookback_days` 是回溯天数。"""

    as_of: str
    lookback_days: int = 7

    def since(self) -> str:
        """窗口起点（`YYYY-MM-DD`）。"""
        from datetime import date, timedelta

        return (date.fromisoformat(self.as_of) - timedelta(days=self.lookback_days)).isoformat()

    def as_of_date(self):
        """`as_of` 的 `date` 对象（落盘目录名要用）。"""
        from datetime import date

        return date.fromisoformat(self.as_of)


@dataclass(frozen=True)
class RawItem:
    """一件原始响应（落盘前的形态）。"""

    artifact_id: str
    url: str
    body: bytes
    content_type: str
    published_at: str | None
    as_of: str
    ext: str
    http_status: int = 200
    vintage: str | None = None
    extra: Mapping[str, Any] = field(default_factory=dict)
    """Adapter 顺手带出的元数据（如 `exhibit_type`），会并进 `material.meta`。"""


class AdapterProtocol(Protocol):
    """Adapter 必须提供的三件（+ 两个声明字段）。"""

    source_id: str
    parser_version: str

    def probe(self, client: HttpClient, spec: TypeSpec) -> Sequence[str]: ...

    def fetch(self, client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]: ...

    def normalize(self, raw: RawItem, spec: TypeSpec) -> MaterialDraft: ...


def _record_for(raw: RawItem, spec: TypeSpec, module: Any) -> FetchRecord:
    """按 13 字段造一条记账（字段取值全部有来源，无猜）。"""
    return FetchRecord(
        source_id=str(module.source_id),
        url=raw.url,
        http_status=raw.http_status,
        fetched_at=now_utc(),
        published_at=raw.published_at,
        as_of=raw.as_of,
        vintage=raw.vintage,
        content_hash=sha256_hex(raw.body),
        bytes=len(raw.body),
        content_type=raw.content_type,
        parser_version=str(module.parser_version),
        license_tier=spec.license_tier,
        channel_tier=spec.channel_tier,
    )


def run_type(
    registry: Any,
    spec: TypeSpec,
    *,
    as_of: str,
    lookback_days: int = 7,
    client: HttpClient | None = None,
    landing_root: Path | None = None,
    material_root: Path | None = None,
    dry_run: bool = False,
) -> TypeResult:
    """跑一个型，返回 `TypeResult`（已 `finalize()`）。

    失败语义（逐条对应三态）：
    - Adapter 抛 `Unavailable` ⇒ `unavailable`（带 reason + checked_scope）
    - 全部件都被幂等跳过 ⇒ `empty`（带 checked_scope：本次查的窗口与源）
    - 任一件 0 字节 / `normalize` 抛错 ⇒ `failed`（不降级）
    - 主 Adapter `unavailable` 且声明了 fallback ⇒ 按序试下一个

    **`status: map` 的型不跑**（返回 `NOT_RUN`）；`status: unavailable` 的型直接返回
    `unavailable`（reason 来自 `channels.yaml::absent_reason`）。
    """
    result = TypeResult(slug=spec.slug, name=spec.name, status=Status.OK, manual_ref=spec.manual_ref)

    if spec.status == "map":
        result.status = Status.NOT_RUN
        result.absent_reason = "查表册/建构册：本管道不取数，消费别类产物"
        return result.finalize()

    if spec.status == "unavailable":
        result.status = Status.UNAVAILABLE
        result.absent_reason = str(spec.params.get("absent_reason") or "结构性无源（见 channels.yaml）")
        result.checked_scope = [str(x) for x in (spec.params.get("checked_scope") or [])]
        return result.finalize()

    window = Window(as_of=as_of, lookback_days=lookback_days)
    chained: list[str] = [str(a) for a in (spec.params.get("fallback") or [])]
    client = client or HttpClient()
    reasons: list[str] = []
    scopes: list[str] = []
    #: Adapter 声明"需要某个人做一件事"时收集进来（见 `Unavailable.action`）
    actions: list[dict[str, Any]] = []
    #: 给出"窗口内 0 件"答复的通道名（判 `empty` 的依据；与措辞解耦）
    answered_sources: list[str] = []

    candidates = [spec.adapter] + chained if spec.adapter else chained
    for name in candidates:
        if not name:
            continue
        try:
            module = registry.adapter_for(spec, name)
        except Exception as exc:  # noqa: BLE001 — 缺实现即 failed，不降级
            result.status = Status.FAILED
            result.failed.append(f"{name}: {exc}")
            return result.finalize()
        result.adapter = name

        try:
            scope = list(module.probe(client, spec))
            scopes.extend(scope)
            items = list(module.fetch(client, spec, window))
        except Unavailable as exc:
            reasons.append(f"{name}: {exc.reason}")
            scopes.extend(exc.checked_scope)
            if getattr(exc, "action", None):
                merged = dict(exc.action)
                merged.setdefault("adapter", name)
                actions.append(merged)
            continue
        except FetchError as exc:
            # 单次请求失败 ⇒ 该源不可达；降级
            reasons.append(f"{name}: {exc}")
            scopes.append(f"{name}({exc.status or 'network'})")
            continue

        if not items:
            # ★ 结构化记下"这个源回答了我们、窗口内 0 件"——它是判 `empty` 的**唯一依据**。
            #   不靠匹配字符串：措辞一改判据就失效，而这类失效是静默的。
            answered_sources.append(name)
            scopes.append(f"{name}: window={window.since()}..{window.as_of} 命中 0 件")
            continue

        landing = Landing(module.source_id, window.as_of_date(), root=landing_root)
        records: list[FetchRecord] = []
        for raw in items:
            if not raw.body:
                result.failed.append(f"{raw.artifact_id}: 0 字节，判失败")
                continue
            landed = landing.write(raw.artifact_id, raw.body, ext=raw.ext)
            if landed.skipped:
                result.skipped += 1
            records.append(_record_for(raw, spec, module))

            if dry_run:
                result.artifacts.append(
                    Artifact(
                        material_id=raw.artifact_id,
                        path=str(landed.path),
                        bytes=landed.bytes,
                        content_hash=landed.content_hash,
                    )
                )
                continue

            try:
                draft = module.normalize(raw, spec)
                meta = dict(draft.meta)
                meta.update(dict(raw.extra))
                draft = MaterialDraft(
                    material_id=draft.material_id,
                    source_body=draft.source_body,
                    source_ext=draft.source_ext,
                    text=draft.text,
                    meta=meta,
                    page_caliber=draft.page_caliber,
                    sections=draft.sections,
                )
                out_dir = write_material(draft, root=material_root)
            except Exception as exc:  # noqa: BLE001 — 解析坏了就是 failed，不静默
                result.failed.append(f"{raw.artifact_id}: normalize 失败 {exc}")
                continue

            # 入库后再记一次 content_hash（入库口径 = draft.text 的落地结果），
            # 但 manifest 仍以原始字节 hash 为准（可复现的是原件，不是解析结果）
            result.artifacts.append(
                Artifact(
                    material_id=draft.material_id,
                    path=str(out_dir.relative_to(out_dir.parents[1])),
                    bytes=landed.bytes,
                    content_hash=landed.content_hash,
                    pages=int(dict(draft.meta).get("pageCount") or 0) or None,
                )
            )

        landing.append_manifest(records)

        if result.failed:
            result.status = Status.FAILED
            result.checked_scope = scopes
            return result.finalize()
        if result.artifacts:
            result.status = Status.OK
            result.checked_scope = scopes
            if spec.status == "partial":
                result.gap = {"partial": "该型只覆盖源的一部分（见 channels.yaml::partial_note）"}
            return result.finalize()
        if result.skipped:
            # 全被幂等跳过：不是 empty（确实有件），是 ok 但没有新件
            result.status = Status.OK
            result.checked_scope = scopes
            return result.finalize()
        # 走到这里 = 源**回答了我们**（probe 过了、没抛异常），但窗口内 0 件。
        return result.finalize()

    # ── 所有候选通道都没交出材料 ────────────────────────────────────────
    #
    # ★ 这里必须分清两种"没有"，否则会把正常现象误报成故障：
    #
    #   `answered_sources` 非空 ⇒ 源**能用**，只是窗口内确实没有这种件
    #                            ⇒ `empty`（**合格答案**）。实测教训：全量 dry-run 时
    #                              `10-k` 与 `proxy` 被判 `unavailable`，而它们其实只是
    #                              "7 天内没有年度件"——一年一次的件在周窗口里 0 件是正确结果。
    #   `answered_sources` 为空 ⇒ 源**没能回答**（不可达 / 无 key / 无源 / 全部拒答）
    #                            ⇒ `unavailable`
    if answered_sources:
        result.status = Status.EMPTY
        result.checked_scope = scopes
        return result.finalize()

    result.status = Status.UNAVAILABLE
    result.absent_reason = "；".join(reasons) if reasons else "源未给出可判定答复"
    result.checked_scope = scopes or [f"{spec.slug}: 未取得任何响应"]
    if actions:
        # 只留第一条：多个通道都要人做同一件事时，重复的请求只会让汇报变噪音
        result.action_required = actions[0]
    return result.finalize()

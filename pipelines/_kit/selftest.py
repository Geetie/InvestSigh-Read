"""`_kit.selftest` —— 本包的**静态守卫集**（`python -m pipelines selftest`）。

## 为什么需要它（以及为什么它不进 `system/scripts/ops/run_all_gates.py`）

那道门禁的 `code_root` 语义是 `system/`，跨树注册会让它**扫不到 `InvestSigh-Read/`**，
结果是"看起来有守卫、其实什么都没检查"（假绿）。所以本包的守卫自带入口，
在**本包的验收命令**里跑：

    python -m pipelines selftest

## 五条断言（每条都能被一个反例触发）

| # | 断言 | 反例会怎么暴露 |
|---|---|---|
| S1 | 34 型全覆盖、键唯一、`status` 合法 | 少写一个型 / 两处同 slug |
| S2 | `status ∈ {auto, partial, needs_key, t3}` 的型，Adapter 文件真实存在且五个必备属性齐 | 声明了 adapter 却没写文件 |
| S3 | `status ∈ {map, unavailable}` 的型**不得**声明 adapter | 声明了却不跑（静默差） |
| S4 | manifest 13 字段与 `FetchRecord.required_fields()` 一致 | 有人在子类里加了第 14 个字段 |
| S5 | T3 源码里**不得出现**验证码识别 / token 注入 / 伪造会话的调用 | 有人"顺手"加了破解 |
| S6 | 每个 `auto` 型都有 `manual_ref` 且文件存在 | 型脱离了手册判据 |

`map` 型只受 S1/S3/S6 约束（它们不取数）。
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path

from .artifact import FIELDS, FetchRecord
from .registry import PIPELINES_ROOT, Registry, load_registry

__all__ = ["Violation", "run_selftest"]

_VALID_STATUS = {"auto", "partial", "needs_key", "t3", "map", "unavailable"}
_ADAPTER_ATTRS = ("source_id", "parser_version", "probe", "fetch", "normalize")

#: T3 越界行为的**代码级**特征（不是关键词黑名单，是调用形态）。
#: 说明：这里只查"代码里出现这些调用"，不解析语义——因为这几类调用在材料管道里
#: **本就不该出现一次**，出现即需人工看。
_T3_FORBIDDEN = (
    r"2captcha",
    r"anticaptcha",
    r"capsolver",
    r"deathbycaptcha",
    r"add_cookies\s*\(.*token",
    r"localStorage\.setItem\s*\(\s*['\"](?:token|auth)",
    r"jwt\.encode",
    r"伪造",
)


@dataclass
class Violation:
    """一条违例。`rule` 是断言编号，`reason` 是可执行的修法提示。"""

    rule: str
    reason: str
    where: str = ""

    def render(self) -> str:
        loc = f" @ {self.where}" if self.where else ""
        return f"[{self.rule}]{loc} {self.reason}"


@dataclass
class Report:
    """守卫结果（`ok` 为真才退出 0）。"""

    violations: list[Violation] = field(default_factory=list)
    scanned: dict[str, int] = field(default_factory=dict)

    @property
    def ok(self) -> bool:
        return not self.violations


def _check_s1(reg: Registry) -> list[Violation]:
    """S1：型数量、键唯一、status 合法。"""
    out: list[Violation] = []
    keys = reg.type_keys()
    if len(keys) != 34:
        out.append(
            Violation("S1", f"型数量 = {len(keys)}，应为 34（与 taxonomy 的 34 个 subtype 对齐）")
        )
    dupes = {k for k in keys if keys.count(k) > 1}
    for k in sorted(dupes):
        out.append(Violation("S1", f"型键重复：{k}"))
    for t in reg.types():
        if t.status not in _VALID_STATUS:
            out.append(Violation("S1", f"{t.key}: status={t.status!r} 不在 {sorted(_VALID_STATUS)}"))
    return out


def _check_s2(reg: Registry) -> tuple[list[Violation], int]:
    """S2：取数型的 Adapter 必须真实存在且属性齐。"""
    out: list[Violation] = []
    n = 0
    for t in reg.types():
        if t.status not in {"auto", "partial", "needs_key", "t3"}:
            continue
        try:
            module = reg.adapter(t)
        except Exception as exc:  # noqa: BLE001 — 加载失败就是违例本身
            out.append(Violation("S2", f"{t.key}: 加载 Adapter 失败 — {exc}"))
            continue
        n += 1
        missing = [a for a in _ADAPTER_ATTRS if not hasattr(module, a)]
        if missing:
            out.append(Violation("S2", f"{t.key}: Adapter 缺 {missing}", where=str(t.adapter)))
        # fallback 链也要能加载（否则降级是假的）
        for fb in t.params.get("fallback") or []:
            try:
                reg.adapter_for(t, str(fb))
            except Exception as exc:  # noqa: BLE001
                out.append(Violation("S2", f"{t.key}: 降级 Adapter {fb!r} 不可加载 — {exc}"))
    return out, n


def _check_s3(reg: Registry) -> list[Violation]:
    """S3：`map` / `unavailable` 型不得声明 adapter（声明了却不跑 = 静默差）。"""
    out: list[Violation] = []
    for t in reg.types():
        if t.status in {"map", "unavailable"} and t.adapter:
            out.append(
                Violation("S3", f"{t.key}: status={t.status} 却声明了 adapter={t.adapter!r}")
            )
    return out


def _check_s4() -> list[Violation]:
    """S4：13 字段 manifest 与数据类一致。"""
    out: list[Violation] = []
    required = FetchRecord.required_fields()
    if required != FIELDS:
        out.append(Violation("S4", "FetchRecord.required_fields() 与 FIELDS 不一致（双写漂移）"))
    if len(FIELDS) != 13:
        out.append(Violation("S4", f"manifest 字段数 = {len(FIELDS)}，应为 13"))
    # 真正的判据：数据类真的能产出这 13 个值（不是只有声明）
    sample = FetchRecord(
        source_id="selftest",
        url="https://example.invalid/",
        http_status=200,
        fetched_at="2026-10-28T00:00:00+00:00",
        published_at=None,
        as_of="2026-10-28",
        vintage=None,
        content_hash="0" * 64,
        bytes=1,
        content_type="text/plain",
        parser_version="selftest/1",
        license_tier="official_public",
        channel_tier="T0",
    )
    produced = set(sample.to_json())
    missing = set(FIELDS) - produced
    if missing:
        out.append(Violation("S4", f"FetchRecord.to_json() 缺字段：{sorted(missing)}"))
    return out


def _check_s5() -> tuple[list[Violation], int]:
    """S5：T3 源码不得出现越界调用（验证码 / token 注入 / 伪造会话）。"""
    out: list[Violation] = []
    n = 0
    pattern = re.compile("|".join(_T3_FORBIDDEN), re.IGNORECASE)
    for py in sorted(PIPELINES_ROOT.glob("*/t3_*.py")) + sorted(PIPELINES_ROOT.glob("_kit/browser.py")):
        n += 1
        # 抹白注释与 docstring，避免"文档里提到不能做"被自己判成违例
        source = _strip_comments(py.read_text(encoding="utf-8"))
        for m in pattern.finditer(source):
            line = source[: m.start()].count("\n") + 1
            out.append(Violation("S5", f"T3 源码出现越界调用 `{m.group(0)}`", where=f"{py.name}:{line}"))
    return out, n


def _strip_comments(src: str) -> str:
    """抹掉注释与三引号块（保持行号 1:1，便于定位）。

    与 `system/scripts/checks/no_placeholder_guard.py` 同一手法：
    不抹白的话，docstring 里"不要做 X"会被扫成"做了 X"。
    """
    out: list[str] = []
    in_block: str | None = None
    for line in src.splitlines():
        stripped = line.strip()
        if in_block:
            if in_block in stripped:
                in_block = None
            out.append("")
            continue
        for q in ('"""', "'''"):
            if stripped.count(q) == 1 and (stripped.startswith(q) or q in stripped):
                in_block = q
                break
        if stripped.startswith("#"):
            out.append("")
            continue
        out.append(line.split("  #", 1)[0] if "  #" in line and not stripped.startswith("#") else line)
    return "\n".join(out)


def _check_s6(reg: Registry) -> tuple[list[Violation], int]:
    """S6：取数型必须有 `manual_ref` 且文件存在（型不能脱离手册判据）。"""
    out: list[Violation] = []
    n = 0
    repo = PIPELINES_ROOT.parent
    for t in reg.types():
        if t.status in {"map"}:
            continue
        n += 1
        if not t.manual_ref:
            out.append(Violation("S6", f"{t.key}: 缺 manual_ref（判据必须指到手册）"))
            continue
        if not (repo / t.manual_ref).is_file():
            out.append(Violation("S6", f"{t.key}: manual_ref 指向的文件不存在 — {t.manual_ref}"))
    return out, n


def run_selftest(registry: Registry | None = None) -> Report:
    """跑全部六条断言，返回 `Report`。"""
    reg = registry or load_registry()
    report = Report()

    report.violations.extend(_check_s1(reg))
    v2, n2 = _check_s2(reg)
    report.violations.extend(v2)
    report.violations.extend(_check_s3(reg))
    report.violations.extend(_check_s4())
    v5, n5 = _check_s5()
    report.violations.extend(v5)
    v6, n6 = _check_s6(reg)
    report.violations.extend(v6)

    report.scanned = {
        "types": len(reg.type_keys()),
        "adapters": n2,
        "t3_files": n5,
        "types_with_manual": n6,
    }
    return report

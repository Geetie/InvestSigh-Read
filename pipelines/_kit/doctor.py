"""`_kit.doctor` —— 初始化前的环境自检（**只读、不装东西、不改配置**）。

## 为什么需要它

"跑不起来"在初始化阶段有五种完全不同的原因：Python 版本不够、缺 PyYAML、
T3 缺 Node/浏览器、缺会话、缺免费 key。现象都是命令报错，但修法完全不同。
这一支命令把五类**分开报**，并给出**可执行的修法**（装什么、设哪个变量）。

## 两类依赖，别混

- **必需**：非 T3 的 23 个型也要用。缺了整包跑不动。
- **T3 专属**：只影响知识星球 / ima 三型。缺了它们照跑，只是这三型报 unavailable。

所以退出码要分清楚：`1` = 必需项缺（跑不了）；`2` = 只缺 T3 依赖（能跑，但 T3 不通）。

## 一条纪律

**本命令不安装任何东西、不写任何文件**。它只回答"缺什么、怎么补"，
补的动作由人或 Agent 显式执行——静默安装依赖是初始化阶段最容易失控的行为。
"""

from __future__ import annotations

import importlib.util
import os
import shutil
import sys
from dataclasses import dataclass
from pathlib import Path

__all__ = ["Check", "run_doctor", "summarize"]


@dataclass(frozen=True)
class Check:
    """一项检查的结果。`required=False` 表示只影响 T3 或可选增强。"""

    name: str
    ok: bool
    detail: str
    required: bool = True
    fix: str = ""
    """缺了怎么办（**必须可执行**，不许写"请配置好环境"这种废话）。"""


def _py_version_ok() -> Check:
    v = sys.version_info
    ok = (v.major, v.minor) >= (3, 10)
    return Check(
        "Python",
        ok,
        f"{v.major}.{v.minor}.{v.micro}" + ("" if ok else "（需要 ≥3.10）"),
        required=True,
        fix="" if ok else "装 Python 3.10+，或用一个更高的解释器跑 `python -m pipelines …`",
    )


def _module_check(import_name: str, label: str, *, required: bool, fix: str) -> Check:
    spec = importlib.util.find_spec(import_name)
    if spec is None:
        return Check(label, False, "未安装", required=required, fix=fix)
    ver = ""
    try:
        mod = __import__(import_name)
        ver = str(getattr(mod, "__version__", "") or "")
    except Exception:
        pass
    return Check(label, True, ver or "已安装", required=required)


def _node_check() -> Check:
    exe = shutil.which("node")
    if not exe:
        return Check(
            "Node.js",
            False,
            "未找到",
            required=False,
            fix="装 Node 18+（T3 需要 playwright-core，它是 Node 包）；不跑 T3 可以不装",
        )
    try:
        import subprocess

        out = subprocess.run([exe, "-v"], capture_output=True, text=True, timeout=10)
        return Check("Node.js", True, out.stdout.strip() or exe, required=False)
    except Exception:
        return Check("Node.js", True, exe, required=False)


def _playwright_core_check() -> Check:
    root = Path(__file__).resolve().parents[2]
    nm = root / "node_modules" / "playwright-core"
    if nm.is_dir():
        return Check("playwright-core", True, str(nm.relative_to(root)), required=False)
    return Check(
        "playwright-core",
        False,
        "未安装",
        required=False,
        fix=f"在 {root} 下执行 `npm install`（它在 package.json 的 devDependencies 里）",
    )


def _browser_check() -> Check:
    from .browser import BROWSER_ENV, _browser_exec
    from .browser import BrowserUnavailable

    try:
        path = _browser_exec()
        return Check("Chromium 系浏览器", True, path, required=False)
    except BrowserUnavailable as exc:
        return Check(
            "Chromium 系浏览器",
            False,
            str(exc)[:120],
            required=False,
            fix=f"装 Edge 或 Chrome；或设环境变量 {BROWSER_ENV} 指向可执行文件",
        )


def _sessions_check() -> list[Check]:
    """T3 的可用性检查。

    ★ zsxq 已改走**官方 CLI**（`zsxq-cli`），不再依赖浏览器 profile ——
      所以这里检查的是 CLI 登录态，不是 `_profiles/zsxq`。
    ★ ima 没有程序化通道（客户端独有），有没有会话都一样，
      所以只报"需要人工导出"，不当成缺依赖。
    """
    out: list[Check] = []

    # zsxq：问 CLI 拿账号
    try:
        from .zsxq_api import self_info

        who = self_info()
        if who.get("user_id"):
            out.append(Check("T3 zsxq（官方 CLI）", True,
                             f"{who.get('name')} ({who['user_id']})", required=False))
        else:
            out.append(Check("T3 zsxq（官方 CLI）", False, "未登录", required=False,
                             fix="`zsxq-cli auth login`（需账号持有人扫码一次）"))
    except SystemExit as exc:
        out.append(Check("T3 zsxq（官方 CLI）", False, f"找不到 zsxq-cli：{str(exc)[:80]}",
                         required=False, fix="`npm install -g zsxq-cli`"))
    except Exception as exc:  # noqa: BLE001 — CLI 报错就是要报出来
        out.append(Check("T3 zsxq（官方 CLI）", False, str(exc)[:100], required=False,
                         fix="先跑 `zsxq-cli auth login`；仍失败就看 CLI 报错原文"))

    # ima：无程序化通道，不算缺依赖
    out.append(Check("T3 ima（客户端独有）", True,
                     "无程序化通道：需人工在客户端导出，Agent 无法代劳", required=False))
    return out


def _keys_check() -> list[Check]:
    """可选 key：只报"缺"，不影响退出码——缺 key 是合格态（`unavailable(no_api_key)`）。"""
    items = [
        ("FRED_API_KEY", "06-macro-cycle", "https://fredaccount.stlouisfed.org/apikeys"),
        ("BLS_API_KEY", "06-macro-cycle（原始序列）", "https://data.bls.gov/registrationEngine/"),
        ("BEA_API_KEY", "06-macro-cycle（GDP/PCE）", "https://apps.bea.gov/api/signup/"),
    ]
    out: list[Check] = []
    for env, use, url in items:
        has = bool(os.environ.get(env, "").strip())
        out.append(
            Check(
                f"环境变量 {env}",
                has,
                "已设置" if has else f"未设置（影响 {use}）",
                required=False,
                fix="" if has else f"去 {url} 申请后设为环境变量；不设也可，该型会报 unavailable(no_api_key)",
            )
        )
    return out


def run_doctor() -> list[Check]:
    """跑全部检查，按"必需在前、T3 次之、可选最后"的顺序返回。"""
    checks: list[Check] = [
        _py_version_ok(),
        _module_check(
            "yaml", "PyYAML", required=True,
            fix="`python -m pip install -r pipelines/requirements.txt`",
        ),
        _module_check(
            "pytest", "pytest（可选，跑测试才要）", required=False,
            fix="`python -m pip install pytest`；不跑测试可以不管",
        ),
        _node_check(),
        _playwright_core_check(),
        _browser_check(),
    ]
    checks.extend(_sessions_check())
    checks.extend(_keys_check())
    return checks


def summarize(checks: list[Check]) -> tuple[int, str]:
    """返回 `(退出码, 一句话结论)`。

    退出码：`0` 全齐 ｜ `1` 必需项缺（整包跑不动） ｜ `2` 只缺 T3 依赖（能跑，T3 不通）。
    """
    missing_required = [c for c in checks if c.required and not c.ok]
    if missing_required:
        return 1, f"缺必需项 {len(missing_required)} 个：" + "、".join(c.name for c in missing_required)

    t3_prefixes = ("Node", "playwright", "Chromium", "T3 ")
    t3_missing = [c for c in checks if not c.ok and c.name.startswith(t3_prefixes)]
    optional_missing = [
        c for c in checks if not c.ok and not c.required and not c.name.startswith(t3_prefixes)
    ]
    tail = f"；另有 {len(optional_missing)} 个可选项未配（不影响主体）" if optional_missing else ""

    if t3_missing:
        return 2, "非 T3 的型可跑；T3（知识星球 / ima）还缺依赖或会话" + tail
    return 0, "必需项与 T3 全就绪" + tail

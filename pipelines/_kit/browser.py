"""`_kit.browser` —— T3 已购库的浏览器会话（**一次性人工登录，之后每日免登录跑**）。

## 为什么必须用真浏览器

知识星球 `api.zsxq.com` 对未登录请求一律 **401**；腾讯 ima 的公开 API 面全 **404**
（知识库走登录后的前端路由）。两者都不是"没有接口"，而是"接口要会话凭证"。
真浏览器 + 持久化 profile 是唯一不越界的做法：
**凭证来自人工登录一次，本模块从不构造、不注入、不破解任何 token。**

## 三条硬边界（selftest 会静态检查，见 `_kit/selftest.py`）

1. **不绕验证码**：不做 OCR 识别、不模拟扫码、不伪造会话。
2. **不绕付费墙**：只下载该账号**有权访问**的文件。
3. **失效即报**：登录态过期 → `Unavailable(login_expired)` → 退出码 3。
   **绝不**退化成 `empty`（`empty` 意为"查过确实没有"，语义完全不同）。

## 会话持久化：两条实测结论（决定实现形态）

实测（Playwright 1.64.1 + Edge 155，Windows）：

| 机制 | 跨重启保留？ | 结论 |
|---|---|---|
| `launchPersistentContext(profile)` 的 `localStorage` | **保留** | 可用 |
| `launchPersistentContext(profile)` 里 `addCookies()` 加的**会话 cookie** | **丢失** | 不可单独依赖 |
| 同 profile + `addCookies` 带 `expires` 的**持久 cookie** | **保留** | 可用 |
| `storageState({path})` 落盘 + 下次注入 | **完整保留（含会话 cookie）** | **主用这条路** |

⇒ 实现取「**profile 目录 + storageState 双写**」：profile 保 localStorage（SPA 常把
登录态放这里），storageState 保 cookie（含会话 cookie）。

## 为什么不做"自动刷新"

过期就报，不重试。因为"能不能刷出来"取决于站点，不取决于本模块；
一个会静默重试的会话层，最后一定会变成"看起来在跑、其实拿到的是登录页"。
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Sequence

__all__ = [
    "PROFILES_ROOT",
    "SourceSession",
    "BrowserUnavailable",
    "LoginExpired",
    "login",
    "with_session",
    "EDGE_PATHS",
]

PROFILES_ROOT = Path(__file__).resolve().parents[1] / "_profiles"

#: 覆盖用环境变量：指到任意 Chromium 系浏览器的可执行文件（Edge / Chrome / Chromium 都行）。
#: **跨平台的第一优先入口** —— 搬到别人的机器上时，只要这个变量对，就不必改代码。
BROWSER_ENV = "PIPELINES_BROWSER"

#: 各平台常见的 Chromium 系浏览器位置（按顺序取第一个存在的）。
#: 本包要求"真浏览器"是因为 T3 站点要**人工登录一次**，无头内核（如 playwright 自带 chromium）
#: 也能跑，但用户扫码时的窗口体验不如系统浏览器稳定，所以优先系统已装的。
_CANDIDATES: dict[str, tuple[str, ...]] = {
    "win32": (
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    ),
    "darwin": (
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ),
    "linux": (
        "/usr/bin/microsoft-edge",
        "/usr/bin/google-chrome",
        "/usr/bin/chromium",
        "/usr/bin/chromium-browser",
        "/snap/bin/chromium",
    ),
}

#: 向后兼容的别名（旧代码/文档提到 EDGE_PATHS 时仍可用）
EDGE_PATHS = _CANDIDATES["win32"]

#: 登录页与"已登录"的判据（每个源一套，选择器都在 `t3_sources.yaml` 里可改）
_LOGIN_HINTS = {
    "zsxq": ("登录知识星球", "获取登录二维码"),
    "ima": ("登录以同步历史会话",),
}


class BrowserUnavailable(RuntimeError):
    """浏览器/驱动不可用（未装 Edge、playwright-core 缺失、profile 损坏）。"""


class LoginExpired(RuntimeError):
    """会话已过期（页面回到登录态）。

    调用方必须把它转成 `Unavailable(login_expired)`，**不得**当成空结果。
    """


@dataclass(frozen=True)
class SourceSession:
    """一个源的两份会话文件。"""

    source: str
    profile_dir: Path
    state_file: Path

    @property
    def exists(self) -> bool:
        """两份里至少有一份存在才算"配置过"（首次没跑过 login 时为 False）。"""
        return self.profile_dir.is_dir() or self.state_file.is_file()


def _node_available() -> str:
    """找 `node`；找不到抛 `BrowserUnavailable`（T3 依赖 playwright-core，它是 Node 包）。"""
    exe = shutil.which("node")
    if not exe:
        raise BrowserUnavailable("找不到 node（T3 需要 playwright-core，它是 Node 包）")
    return exe


def session_of(source: str) -> SourceSession:
    """取某源的会话路径（不创建目录）。"""
    prof = PROFILES_ROOT / source
    return SourceSession(source=source, profile_dir=prof, state_file=PROFILES_ROOT / f"{source}.state.json")


_RUNNER = r"""
// pipelines/_kit/runner.mjs 的内联版：由 Python 侧生成临时脚本执行。
// 参数从 argv 读，不拼字符串——避免选择器里的引号破坏命令。
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const cfg = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));

function launchOpts(extra = {}) {
  return {
    executablePath: cfg.exec,
    headless: cfg.headless,
    locale: cfg.locale || "zh-CN",
    timezoneId: cfg.timezone || "Asia/Shanghai",
    viewport: { width: 1440, height: 900 },
    args: ["--no-first-run", "--no-default-browser-check"],
    ...extra,
  };
}

async function main() {
  const out = { ok: false, stage: "start", message: "" };
  let ctx;
  try {
    const opts = launchOpts();
    if (fs.existsSync(cfg.state) && !cfg.fresh) {
      opts.storageState = cfg.state;
    }
    ctx = await chromium.launchPersistentContext(cfg.profile, opts);
    const page = await ctx.newPage();
    out.stage = "goto";
    await page.goto(cfg.loginUrl, { timeout: cfg.gotoTimeout || 45000, waitUntil: "domcontentloaded" });
    if (cfg.mode === "login") {
      // ① 预登录动作：有的站点不点"同意协议"就**永远不渲染二维码**（zsxq 实测）。
      //    这里按 t3_sources.yaml 的 login.pre_click 依次 DOM 派发 click，
      //    不走 Playwright 的 hit-test —— 因为二维码区常有覆盖层挡住按钮，真实点击会超时。
      out.stage = "pre_login";
      out.preClick = [];
      for (const sel of cfg.preClick || []) {
        try {
          const hit = await page.evaluate((s) => {
            const n = document.querySelector(s);
            if (!n) return false;
            n.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            return true;
          }, sel);
          out.preClick.push({ sel, hit });
        } catch (e) {
          out.preClick.push({ sel, error: String(e).slice(0, 120) });
        }
        await page.waitForTimeout(1200);
      }

      out.stage = "wait_human";
      const deadline = Date.now() + cfg.loginTimeoutMs;
      let verdict = null;
      while (Date.now() < deadline) {
        await page.waitForTimeout(2500);
        // 判据 A（硬）：接口带会话返回 200 且关键字段为真。
        // 未登录时这类接口一律 401（zsxq /v2/groups 已四次阴性对照），所以 200 只能是真登录。
        if (cfg.verify && cfg.verify.url) {
          try {
            const r = await ctx.request.get(cfg.verify.url, { timeout: 12000 });
            if (r.status() === 200) {
              if (!cfg.verify.okField) {
                verdict = { how: "api", status: 200 };
                break;
              }
              const j = await r.json();
              if (j && j[cfg.verify.okField]) {
                verdict = { how: "api", status: 200, field: cfg.verify.okField };
                break;
              }
            }
          } catch (e) { /* 轮询期接口抖动不算失败，继续等 */ }
        }
        // 判据 B（软）：登录提示语全部消失且正文够长。仅在没有接口判据时用。
        if (!cfg.verify || !cfg.verify.url) {
          try {
            const body = (await page.evaluate(() => document.body.innerText)) || "";
            const stillLogin = (cfg.loginHints || []).some((h) => body.includes(h));
            if (!stillLogin && body.length > 200) {
              verdict = { how: "dom", bodyLen: body.length };
              break;
            }
          } catch (e) { /* 页面导航中会抛，继续等 */ }
        }
      }

      // ② 先落盘，再回报。顺序不能反：用户可能在任何时刻关掉窗口，
      //    而"接口已经 200、state 还没写"的窗口期里丢掉的会话要重扫一次码。
      out.stateSaved = false;
      try {
        fs.mkdirSync(path.dirname(cfg.state), { recursive: true });
        await ctx.storageState({ path: cfg.state });
        out.stateSaved = true;
      } catch (e) {
        out.stateError = String(e).slice(0, 200);
      }

      out.ok = !!verdict;
      out.stage = verdict ? "done" : "timeout";
      out.verdict = verdict;
      out.message = verdict
        ? "会话已保存（判据 " + verdict.how + "）"
        : "等待登录超时（未检测到登录完成）";
      try { await ctx.close(); } catch {}
      console.log(JSON.stringify(out));
      process.exit(out.ok ? 0 : 3);
    }
    // mode=api：用已存会话直接打接口（拿 id 之类），不依赖页面 DOM。
    // 放在登录态文案判定**之前**：接口 200 才是硬判据，页面文案只是软判据。
    if (cfg.mode === "api") {
      out.stage = "api";
      const r = await ctx.request.get(cfg.apiUrl, { timeout: cfg.apiTimeout || 20000 });
      out.apiStatus = r.status();
      out.apiBody = (await r.text()).slice(0, 200000);
      out.ok = r.status() === 200;
      out.stage = out.ok ? "done" : "api_not_ok";
      try { await ctx.close(); } catch {}
      console.log(JSON.stringify(out));
      process.exit(out.ok ? 0 : 5);
    }

    out.stage = "list";
    const body = (await page.evaluate(() => document.body.innerText)) || "";
    const hints = cfg.loginHints || [];
    if (hints.some((h) => body.includes(h))) {
      out.stage = "login_expired";
      out.message = "页面回到登录态：会话已过期，需人工重跑 login";
      await ctx.close();
      console.log(JSON.stringify(out));
      process.exit(4);
    }

    const items = await page.evaluate((sel) => {
      const nodes = Array.from(document.querySelectorAll(sel.item || "a"));
      return nodes.slice(0, 200).map((n) => ({
        text: (n.innerText || n.textContent || "").trim().slice(0, 200),
        href: n.getAttribute("href") || "",
      }));
    }, { item: cfg.itemSelector });
    out.ok = true;
    out.stage = "done";
    out.items = items;
    // 顺手刷新 storageState（cookie 轮换后仍可用）
    fs.mkdirSync(path.dirname(cfg.state), { recursive: true });
    await ctx.storageState({ path: cfg.state });
    await ctx.close();
    console.log(JSON.stringify(out));
  } catch (e) {
    out.message = String(e && e.message ? e.message : e).slice(0, 400);
    try { if (ctx) await ctx.close(); } catch {}
    console.log(JSON.stringify(out));
    process.exit(1);
  }
}
main();
"""


def _write_runner(workdir: Path) -> Path:
    """把内联 runner 落到 `_profiles/_runner.mjs`（每次覆盖，保持与代码同步）。"""
    PROFILES_ROOT.mkdir(parents=True, exist_ok=True)
    f = PROFILES_ROOT / "_runner.mjs"
    f.write_text(_RUNNER, encoding="utf-8")
    return f


def _browser_exec() -> str:
    """找一个可用的 Chromium 系浏览器，返回可执行文件路径。

    查找顺序（**跨平台，且可用环境变量覆盖**）：
    1. `PIPELINES_BROWSER` 环境变量 —— 换机器时只需设它，不改代码；
    2. 当前平台的常见安装位置（Edge / Chrome / Chromium）；
    3. `PATH` 里的常见命令名。

    都找不到 ⇒ `BrowserUnavailable`，并明确告诉人要做什么（装浏览器或设环境变量），
    **不静默退化成"无头内核"** —— 那会让 T3 的扫码窗口变成看不见的东西。
    """
    env = os.environ.get(BROWSER_ENV, "").strip().strip('"')
    if env:
        if Path(env).is_file():
            return env
        raise BrowserUnavailable(
            f"{BROWSER_ENV}={env!r} 指向的文件不存在（检查路径是否带空格未加引号）"
        )

    for p in _CANDIDATES.get(sys.platform, ()):
        if Path(p).is_file():
            return p

    for name in ("microsoft-edge", "msedge", "google-chrome", "chrome", "chromium", "chromium-browser"):
        found = shutil.which(name)
        if found:
            return found

    raise BrowserUnavailable(
        f"找不到 Chromium 系浏览器（平台 {sys.platform}）。"
        f"装 Edge 或 Chrome，或设环境变量 {BROWSER_ENV} 指向可执行文件"
    )


#: 旧名保留（外部脚本可能还在调）
_edge_exec = _browser_exec


def _playwright_root(read_root: Path) -> Path:
    """`playwright-core` 的所在目录（**必须存在**，否则 node 侧 import 失败）。

    本包的 Node 依赖走 InvestSigh-Read 自己的 `node_modules`（`playwright-core@1.64.1`
    已装，`tools/shot.cjs` 在用同一份）。
    """
    nm = read_root / "node_modules" / "playwright-core"
    if not nm.is_dir():
        raise BrowserUnavailable(
            f"找不到 {nm}（先在 InvestSigh-Read 下 npm install playwright-core）"
        )
    return nm


def _run_node(script: Path, cfg_path: Path, *, cwd: Path) -> tuple[int, dict]:
    """跑 node 脚本，返回 `(exit_code, 解析出的 JSON)`。

    失败模式：
    - node 输出不是 JSON ⇒ `BrowserUnavailable`（把原始输出前 400 字带出来）
    """
    proc = subprocess.run(  # noqa: S603 — 固定 node + 固定脚本路径，无外壳
        [_node_available(), str(script), str(cfg_path)],
        cwd=str(cwd),
        capture_output=True,
        text=True,
        timeout=900,
        encoding="utf-8",
        errors="replace",
    )
    raw = (proc.stdout or "").strip().splitlines()
    for line in reversed(raw):
        line = line.strip()
        if line.startswith("{"):
            try:
                return proc.returncode, json.loads(line)
            except json.JSONDecodeError:
                continue
    raise BrowserUnavailable(
        f"node 未回可解析 JSON（exit={proc.returncode}）: "
        f"{(proc.stdout or '')[:200]} {(proc.stderr or '')[:200]}"
    )


def login(
    source: str,
    *,
    timeout_s: float = 300.0,
    read_root: Path | None = None,
    pre_click: Sequence[str] = (),
    verify: dict | None = None,
) -> tuple[Path, dict]:
    """打开**有头**浏览器，等人扫码/输码，成功后把会话落盘。返回 `(state 路径, 判定详情)`。

    参数：
    - `pre_click`：打开登录页后要依次 DOM 派发的选择器（例如勾"同意协议"）。
      有的站点不勾就**不渲染二维码**，缺这一步用户会对着空白区域等到超时。
    - `verify`：`{"url": ..., "okField": ...}`。给了就走**接口判据**（返回 200 且字段为真），
      比"文案消失"硬得多；不给才退回 DOM 判据。

    失败模式：
    - Edge / node / playwright-core 缺 ⇒ `BrowserUnavailable`
    - 超时仍未登录 ⇒ `RuntimeError`（调用方转 exit 1）
    - 登录成功但 state 没写成 ⇒ `BrowserUnavailable`（会话白拿，必须显式说）
    """
    read_root = read_root or Path(__file__).resolve().parents[2]
    _playwright_root(read_root)
    exec_path = _edge_exec()
    sess = session_of(source)
    sess.profile_dir.mkdir(parents=True, exist_ok=True)

    cfg = {
        "exec": exec_path,
        "headless": False,
        "mode": "login",
        "profile": str(sess.profile_dir),
        "state": str(sess.state_file),
        "loginUrl": _login_url(source),
        "loginHints": list(_LOGIN_HINTS.get(source, ())),
        "loginTimeoutMs": int(timeout_s * 1000),
        "preClick": list(pre_click or ()),
        "verify": verify or {},
        "fresh": False,
    }
    cfg_path = PROFILES_ROOT / f"_{source}.login.json"
    cfg_path.write_text(json.dumps(cfg, ensure_ascii=False, indent=1), encoding="utf-8")
    script = _write_runner(read_root)

    print(f"正在打开浏览器（有头），请在窗口中完成 {source} 登录…", file=sys.stderr)
    code, payload = _run_node(script, cfg_path, cwd=read_root)
    if code != 0 or not payload.get("ok"):
        pre = payload.get("preClick")
        hint = f"；预登录动作 {pre}" if pre else ""
        raise RuntimeError(f"{source} 登录未完成：{payload.get('message') or payload.get('stage')}{hint}")
    if not payload.get("stateSaved"):
        raise BrowserUnavailable(
            f"{source} 登录成功但会话未落盘（{payload.get('stateError') or 'storageState 失败'}）"
            "—— 需重跑 login"
        )
    return sess.state_file, payload


def _login_url(source: str) -> str:
    """各源的登录入口（**只有入口，不含任何凭证参数**）。"""
    return {
        "zsxq": "https://wx.zsxq.com/",
        "ima": "https://ima.qq.com/",
    }.get(source, f"https://{source}/")


def list_items(
    source: str,
    *,
    item_selector: str,
    read_root: Path | None = None,
) -> list[dict[str, str]]:
    """用已存会话打开首页并列出候选条目（`text` + `href`）。

    失败模式：
    - 会话缺失 ⇒ `BrowserUnavailable`
    - 页面回登录态 ⇒ `LoginExpired`（调用方必须转 `unavailable(login_expired)`）
    """
    read_root = read_root or Path(__file__).resolve().parents[2]
    _playwright_root(read_root)
    exec_path = _edge_exec()
    sess = session_of(source)
    if not sess.exists:
        raise BrowserUnavailable(f"{source}: 还没有会话，先跑 `python -m pipelines login --source {source}`")

    cfg = {
        "exec": exec_path,
        "headless": True,
        "mode": "list",
        "profile": str(sess.profile_dir),
        "state": str(sess.state_file),
        "loginUrl": _login_url(source),
        "loginHints": list(_LOGIN_HINTS.get(source, ())),
        "itemSelector": item_selector,
    }
    cfg_path = PROFILES_ROOT / f"_{source}.list.json"
    cfg_path.write_text(json.dumps(cfg, ensure_ascii=False, indent=1), encoding="utf-8")
    script = _write_runner(read_root)

    code, payload = _run_node(script, cfg_path, cwd=read_root)
    if payload.get("stage") == "login_expired":
        raise LoginExpired(str(payload.get("message") or "会话过期"))
    if code != 0 or not payload.get("ok"):
        raise BrowserUnavailable(f"{source}: {payload.get('message') or payload.get('stage')}")
    items = payload.get("items") or []
    return [{"text": str(i.get("text") or ""), "href": str(i.get("href") or "")} for i in items]


def api_get(
    source: str,
    url: str,
    *,
    read_root: Path | None = None,
    timeout_ms: int = 20000,
) -> tuple[int, str]:
    """用**已保存的会话**打一个 GET 接口，返回 `(http_status, body_text)`。

    用途：初始化时自动取"只有登录态才拿得到"的标识（如知识星球的 `group_id`），
    避免让人手工去页面上抄。走的是浏览器上下文的 cookie，**不构造任何凭证**。

    失败模式：
    - 会话缺失 ⇒ `BrowserUnavailable`
    - 接口非 200 ⇒ 正常返回该状态码（调用方据此判断是过期还是别的问题）
    """
    read_root = read_root or Path(__file__).resolve().parents[2]
    _playwright_root(read_root)
    exec_path = _browser_exec()
    sess = session_of(source)
    if not sess.exists:
        raise BrowserUnavailable(f"{source}: 还没有会话，先跑 login --source {source}")

    cfg = {
        "exec": exec_path,
        "headless": True,
        "mode": "api",
        "profile": str(sess.profile_dir),
        "state": str(sess.state_file),
        "loginUrl": _login_url(source),
        "apiUrl": url,
        "apiTimeout": int(timeout_ms),
    }
    cfg_path = PROFILES_ROOT / f"_{source}.api.json"
    cfg_path.write_text(json.dumps(cfg, ensure_ascii=False, indent=1), encoding="utf-8")
    script = _write_runner(read_root)

    code, payload = _run_node(script, cfg_path, cwd=read_root)
    status = int(payload.get("apiStatus") or 0)
    body = str(payload.get("apiBody") or "")
    if code not in (0, 5) and not status:
        raise BrowserUnavailable(f"{source}: 接口调用未返回状态（{payload.get('message') or payload.get('stage')}）")
    return status, body


def with_session(source: str):
    """上下文管理器式取会话（当前只是包一层，便于以后加锁/日志）。"""
    return session_of(source)

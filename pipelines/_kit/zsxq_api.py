"""`_kit.zsxq_api` —— 知识星球官方 CLI 的薄封装（**唯一实现**）。

`zsxq_daily.py`（独立脚本）与 `zsxq_cli.py`（34 型 Adapter）都从这里取，
避免同一套 CLI 调用写两遍、改一处忘一处。

## 为什么走 `zsxq-cli` 而不是浏览器

1. 浏览器里 `fetch` 打 `/v2/files/*` 会被官方拦：`code:1059 不支持非官方工具访问`；
   `zsxq-cli` 是白名单，同一接口正常返回。
2. 抓 DOM 要钉一堆选择器，星球改版就挂；接口稳定得多。

## 三个工具的实测差异（2026-10-29）

| 工具 | 结果 |
|---|---|
| `get_self_info` | ✅ 顶层直接给 `user.user_id` |
| `get_user_groups` | ✅ **必须传 `user_id`**，否则 `User ID is required` |
| `get_group_topics` | ❌ 对这批付费星球**恒返回 0 条**（`scope=all` 也不管用） |
| `call_zsxq_api` + `/v2/groups/{id}/topics` | ✅ 正常 |
| `call_zsxq_api` + `/v2/files/{id}/download_url` | ✅ 正常，返回带 token 的临时链接 |

返回格式不统一：`get_*` 工具给顶层，`call_zsxq_api` 包在 `body` 里 —— `payload()` 抹平。
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
from pathlib import Path

__all__ = [
    "cli", "call", "payload", "list_of", "self_info", "groups", "topics",
    "download_url", "download_pdf", "SkillDenied",
]


class SkillDenied(RuntimeError):
    """该星球未开通 Skill 权限（官方限制）。调用方应改走浏览器通道。"""


def cli() -> str:
    """找 zsxq-cli。先问 npm 的全局 prefix（安装位置可能被改过），再退 PATH。"""
    names = ("zsxq-cli.cmd", "zsxq-cli") if os.name == "nt" else ("zsxq-cli",)

    try:
        out = subprocess.run(
            ["npm", "prefix", "-g"], capture_output=True, text=True,
            timeout=30, shell=(os.name == "nt"),
        )
        prefix = (out.stdout or "").strip().splitlines()[-1] if out.stdout else ""
        if prefix:
            for n in names:
                cand = Path(prefix) / n
                if cand.is_file():
                    return str(cand)
    except Exception:
        pass

    found = shutil.which("zsxq-cli")
    if found:
        return found

    for p in (
        Path(os.path.expandvars(r"%APPDATA%\npm\zsxq-cli.cmd")),
        Path(os.path.expandvars(r"%LOCALAPPDATA%\npm\zsxq-cli.cmd")),
        Path.home() / ".npm-global" / "zsxq-cli.cmd",
        Path("/usr/local/bin/zsxq-cli"),
        Path.home() / ".npm-global" / "bin" / "zsxq-cli",
    ):
        if p.is_file():
            return str(p)

    raise SystemExit(
        "找不到 zsxq-cli。安装：`npm install -g zsxq-cli`，"
        "然后 `zsxq-cli auth login` 登录（一次即可）。"
    )


def _run(args: list[str], *, timeout: int = 90) -> dict:
    """跑一条 zsxq-cli 命令，返回解析后的 JSON。

    ★ Windows 上 `.cmd` 必须经 `cmd /c`；但**不能用 shell=True 拼字符串** ——
      那样 `--params '{"limit":100}'` 的引号会被 cmd 吃掉（实测踩过）。
      正确做法是把 `["cmd","/c",exe,...]` 以**列表**传给 subprocess，由它转义。
    """
    exe = cli()
    if os.name == "nt" and exe.lower().endswith(".cmd"):
        cmd = ["cmd", "/c", exe] + args
    else:
        cmd = [exe] + args
    proc = subprocess.run(cmd, capture_output=True, text=True,
                          encoding="utf-8", errors="replace", timeout=timeout)
    out = (proc.stdout or "").strip()
    if proc.returncode != 0:
        raise RuntimeError(f"zsxq-cli 退出码 {proc.returncode}：{(proc.stderr or out)[:300]}")
    try:
        return json.loads(out)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"zsxq-cli 输出不是 JSON：{out[:300]}") from exc


def call(tool: str, params: dict | None = None) -> dict:
    args = ["api", "call", tool]
    if params:
        args += ["--params", json.dumps(params, ensure_ascii=False)]
    return _run(args)


def payload(d: dict) -> dict:
    """抹平两种返回格式：`get_*` 给顶层，`call_zsxq_api` 包在 `body` 里。"""
    return d["body"] if isinstance(d.get("body"), dict) else d


def list_of(d: dict, *keys: str) -> list[dict]:
    p = payload(d)
    for k in keys:
        v = p.get(k)
        if isinstance(v, list):
            return v
    rd = p.get("resp_data") or {}
    for k in keys:
        v = rd.get(k)
        if isinstance(v, list):
            return v
    return []


def self_info() -> dict:
    d = call("get_self_info")
    p = payload(d)
    u = p.get("user") or (p.get("resp_data") or {}).get("user") or {}
    return {
        "user_id": str(u.get("user_id") or ""),
        "name": u.get("name") or "",
        "location": u.get("location") or "",
    }


def groups(user_id: str) -> list[dict]:
    d = call("get_user_groups", {"user_id": user_id, "limit": 100})
    return [
        {"group_id": str(g.get("group_id")), "name": g.get("name"), "type": g.get("type")}
        for g in list_of(d, "groups")
        if g.get("group_id")
    ]


def topics(group_id: str, *, limit: int = 30, end_time: str | None = None) -> list[dict]:
    """星球主题列表。被拒（Skill 未开通）抛 `SkillDenied`，调用方改走浏览器通道。

    ★ `count` **上限 30**：传 40 或更大，接口不报错也不截断，直接返回**空列表**
      （实测 2026-10-29）。这种"看起来成功、其实什么都没给"的失败最容易骗过人，
      所以在入口就夹到 30，超了打一行警告。
    """
    if limit > 30:
        import sys as _sys

        print(f"  ! zsxq_api: limit={limit} 超过接口上限 30，已夹到 30", file=_sys.stderr)
        limit = 30
    query: dict = {"scope": "all", "count": limit}
    if end_time:
        query["end_time"] = end_time
    try:
        d = call("call_zsxq_api", {"method": "GET", "path": f"/v2/groups/{group_id}/topics", "query": query})
        return list_of(d, "topics")
    except RuntimeError as exc:
        if "Skill 权限" in str(exc):
            raise SkillDenied(str(exc)) from exc
        raise


def topics_since(group_id: str, since: str, *, max_pages: int = 20, page_size: int = 30) -> list[dict]:
    """翻页取回 `since`（ISO 日期）当天及之后的**全部**主题。

    ## 为什么必须翻页

    单次接口 `count` **硬上限 30**（31 直接返空，见 `topics()`）。只取一页的话，
    某天发帖超过 30 条的星球会漏掉后面的。翻页用 `end_time` 游标：

        第1页 30 条 → 最早 2026-10-16
        第2页 end_time=2026-10-16 → 30 条，最早 2026-09-29
        ...

    ## 两个必须处理的细节

    1. **相邻两页会重叠 1 条**（实测：传上一页最早那条的 `create_time`，它本身会重复出现）
       ⇒ 按 `topic_id` 去重，不能简单拼接。
    2. **`topic_id` 是 17 位**，超过 JS 安全整数范围；这里由 Python 的 json 解析，
       只要不当成数字运算就没问题——统一转 `str` 再比较。
    """
    seen: dict[str, dict] = {}
    end_time: str | None = None

    for page in range(max_pages):
        batch = topics(group_id, limit=page_size, end_time=end_time)
        if not batch:
            break
        new = 0
        for t in batch:
            tid = str(t.get("topic_id") or "")
            if tid and tid not in seen:
                seen[tid] = t
                new += 1
        oldest_iso = batch[-1].get("create_time") or ""
        oldest = oldest_iso[:10]
        # 已经翻到 since 之前，或这一页全是重复的（说明没有更多），就停
        if oldest and oldest < since:
            break
        if new == 0:
            break
        end_time = oldest_iso or None
        if not end_time:
            break

    out = [t for t in seen.values() if (t.get("create_time") or "")[:10] >= since]
    out.sort(key=lambda t: t.get("create_time") or "", reverse=True)
    return out


def download_url(file_id: str) -> str:
    d = call("call_zsxq_api", {"method": "GET", "path": f"/v2/files/{file_id}/download_url"})
    body = payload(d)
    url = (body.get("resp_data") or {}).get("download_url") or ""
    if not url:
        raise RuntimeError(f"file {file_id} 没返回 download_url")
    return url


def download_pdf(file_id: str, *, timeout: int = 120) -> bytes:
    """按 file_id 下载 PDF 字节。空 body 或非 PDF 头一律抛错（不静默放过）。"""
    import urllib.request

    url = download_url(file_id)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        body = r.read()
    if not body:
        raise RuntimeError(f"file {file_id}: 下载到 0 字节")
    if not body.startswith(b"%PDF"):
        raise RuntimeError(f"file {file_id}: 不是 PDF（前 4 字节 {body[:4]!r}）")
    return body

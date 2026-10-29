"""知识星球浏览器下载通道：官方 CLI 被拒的星球，改用真实页面点「下载文件」。

## 为什么需要这一条

`zsxq-daily`（官方 CLI）对部分星球回 `该星球暂未开通 Skill 权限`。这些星球的
**页面本身是能打开的**（走 cookie 认证，不是 Skill 通道），文件卡片点开后有
「下载文件」按钮，点了就真能下。

## 三种星球的实测结论（2026-10-29）

| 情况 | 弹窗内容 | 能不能下 |
|---|---|---|
| 正常 | 文件名 + 大小 + 上传时间 + **「下载文件」** | ✅ 能 |
| **内容保护** | `星主已开启「内容保护」，该星球内文件仅支持在「知识星球」App 内查看` | ❌ **星主禁止，电脑端无解** |
| 页面无卡片 | 页面里没有 `.file-gallery-container` | ⚠️ 需滚动加载或确实没内容 |

## 流程

    打开星球页 → 遍历文件卡片 → 点开读「上传时间」→ 当天且有下载按钮 → 点下载
    → 文件落浏览器默认下载目录 → 搬到 pipelines/_landing/zsxq/<as-of>/

**依赖 Tabbit 正在运行且已登录**（`tabbit-cli diagnose` 返回 ok）。

## 用法

    python "pipelines/03-卖方与共识/zsxq_browser.py" --groups 28888222154481 --as-of 2026-10-28
    python "pipelines/03-卖方与共识/zsxq_browser.py" --all-rejected --as-of 2026-10-28 --dry-run
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
import time
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LANDING = ROOT / "pipelines" / "_landing" / "zsxq"
DOWNLOADS = Path(os.path.expanduser("~/Downloads"))

#: 这 4 个星球的官方 CLI 通道被拒（`该星球暂未开通 Skill 权限`），走浏览器。
#: 名字只为汇报可读；真正下载按 group_id。
REJECTED = {
    "28888244551841": "宏观策略",
    "28888222154481": "180K Research",
    "28851151448151": "家办新智点",
    "88885882121542": "洪灝的宏观策略",
}


def tabbit_cli() -> str:
    cands = [
        Path(os.path.expandvars(r"%LOCALAPPDATA%\Tabbit\LocalAgent\bin\tabbit-cli.exe")),
        Path(os.path.expandvars(r"%LOCALAPPDATA%\Tabbit\LocalAgent\bin\tabbit-cli")),
        Path.home() / ".local" / "bin" / "tabbit-cli",
    ]
    for p in cands:
        if p.is_file():
            return str(p)
    found = shutil.which("tabbit-cli")
    if found:
        return found
    raise SystemExit("找不到 tabbit-cli（Tabbit 未安装或未运行）")


def _run_js(js: str, *, task: str = "zsxq-browser", timeout: int = 300) -> dict:
    """把 JS 写进 UTF-8 临时文件，用 CMD 重定向喂给 tabbit-cli。

    ★ 不能用 `input=js` 从 stdin 喂：Windows 上管道会吃掉引号，
      `{waitUntil:"domcontentloaded"}` 变成 `{waitUntil:}`（实测踩过）。
    """
    rid = f"r{int(time.time() * 1000) % 100000000}"
    tmp = Path(os.environ.get("TEMP", ".")) / f"zsxq_br_{rid}.js"
    tmp.write_text(js, encoding="utf-8")
    try:
        # ★ 必须显式给 --timeout-ms：tabbit-cli 默认只给 60 秒，
        #   遍历十几张卡片（每张 click + evaluate）必然超时，报
        #   `Evaluation exceeded hard deadline of 60000 ms`。上限是 180000。
        cmd = (
            f'chcp 65001 >nul && type "{tmp}" | "{tabbit_cli()}" '
            f"nodejs --task {task} --request-id {rid} --timeout-ms 180000"
        )
        proc = subprocess.run(cmd, shell=True, capture_output=True, text=True,
                              encoding="utf-8", errors="replace", timeout=timeout)
    finally:
        tmp.unlink(missing_ok=True)
    out = (proc.stdout or "").strip()
    if not out:
        raise RuntimeError(f"tabbit-cli 无输出：{(proc.stderr or '')[:200]}")
    last = out.splitlines()[-1]
    try:
        wrapper = json.loads(last)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"tabbit-cli 输出不是 JSON：{last[:300]}") from exc
    if wrapper.get("status") != "succeeded":
        err = (wrapper.get("result") or {}).get("error") or wrapper.get("error")
        raise RuntimeError(f"JS 执行失败：{str(err)[:300]}")
    return (wrapper.get("result") or {}).get("value") or {}


_JS_TEMPLATE = r"""
const GID = "__GID__";
const ASOF = "__ASOF__";
await page.goto("https://wx.zsxq.com/group/" + GID, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4500);

const cards = page.locator(".file-gallery-container .item");
const n = await cards.count();
const results = [];
if (n === 0) return { groupId: GID, cards: 0, results, note: "页面没有文件卡片" };

// 只处理前 __MAX__ 张（当天的新文件通常在最前面）
const limit = Math.min(n, __MAX__);
for (let i = 0; i < limit; i++) {
  // ★ 每张卡片前**重新加载页面**：这个站的文件详情弹窗按 Esc 关不掉，
  //   不重置状态的话第 2 张起必然"点击失败"（弹窗挡着），实测确认。
  if (i > 0) {
    await page.goto("https://wx.zsxq.com/group/" + GID, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3500);
  }
  const it = page.locator(".file-gallery-container .item").nth(i);
  let fname = "";
  try { fname = (await it.locator(".file-name").innerText()).trim(); } catch (e) {}
  try { await it.click({ timeout: 8000 }); } catch (e) { results.push({ fname, err: "点击失败" }); continue; }
  await page.waitForTimeout(2000);

  // ★ 判据用「页面上有没有 .btn.download」，不要靠 modal/dialog 的 class ——
  //   这个站的文件详情弹窗没有稳定的 modal 类名，靠 class 匹配会误判成"没弹窗"。
  // ★ 日期必须取「上传：」后面那个，不能取 body 里第一个日期 ——
  //   页面上别处也有日期（今天的时间戳、星球更新日期），抓第一个会误判成"非当天"（实测踩过）。
  const info = await page.evaluate(() => {
    const btn = document.querySelector(".btn.download");
    const body = document.body.innerText || "";
    const m = body.match(/上传[：:][\s\S]{0,120}?(\d{4}-\d{2}-\d{2})\s+\d{2}:\d{2}/);
    return {
      hasDownload: !!btn,
      date: m ? m[1] : "",
      isProtected: body.includes("内容保护"),
    };
  });

  if (info.isProtected && !info.hasDownload) {
    results.push({ fname, date: info.date, downloaded: false, reason: "内容保护（星主禁止，只能手机 App 看）" });
  } else if (!info.hasDownload) {
    results.push({ fname, date: info.date, downloaded: false, reason: "弹窗里没有下载按钮" });
  } else if (!info.date) {
    results.push({ fname, downloaded: false, reason: "读不到上传日期，不盲目下" });
  } else if (info.date !== ASOF) {
    results.push({ fname, date: info.date, downloaded: false, reason: "非当天（" + info.date + "）" });
  } else if (__DRYRUN__) {
    // ★ dry-run 必须**真的不点**：早先只在外层跳过搬运，JS 照样点了下载，
    //   结果 --dry-run 也把 3 个文件下进了 Downloads（实测踩过）。
    results.push({ fname, date: info.date, downloaded: false, wouldDownload: true, reason: "dry-run：可下但未点" });
  } else {
    await page.locator(".btn.download").first().click({ timeout: 8000 });
    results.push({ fname, date: info.date, downloaded: true });
    await page.waitForTimeout(7000);   // 给下载留时间（27MB 实测约 10s）
  }

  // 关弹窗：**只用键盘**。早先点左上角(8,8)会误触侧边栏导航，把页面带走，
  // 导致下一张卡片"点击失败"、甚至整个星球报"没有文件卡片"（实测踩过）。
  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(350);
  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(650);
}
return { groupId: GID, cards: n, results };
"""


def fetch_group(group_id: str, as_of: str, *, max_cards: int = 6, dry_run: bool = False) -> dict:
    js = (
        _JS_TEMPLATE.replace("__GID__", group_id)
        .replace("__ASOF__", as_of)
        .replace("__MAX__", str(max_cards))
        .replace("__DRYRUN__", "true" if dry_run else "false")
    )
    return _run_js(js)


def snapshot_downloads() -> dict[str, float]:
    """下载目录里现有文件 → 大小（用于识别新增）。"""
    out: dict[str, float] = {}
    if not DOWNLOADS.is_dir():
        return out
    for p in DOWNLOADS.iterdir():
        if p.is_file():
            try:
                out[p.name] = p.stat().st_mtime
            except OSError:
                pass
    return out


def harvest(before: dict[str, float], dest: Path) -> list[Path]:
    """把下载目录里新增的文件搬到 dest。返回搬走的路径。"""
    dest.mkdir(parents=True, exist_ok=True)
    moved: list[Path] = []
    for p in DOWNLOADS.iterdir():
        if not p.is_file():
            continue
        if p.name in before:
            continue
        if not p.name.lower().endswith((".pdf",)):
            continue
        try:
            target = dest / p.name
            if target.exists():
                target.unlink()
            shutil.move(str(p), str(target))
            moved.append(target)
        except OSError as exc:
            print(f"  ! 搬运 {p.name} 失败：{exc}", file=sys.stderr)
    return moved


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="知识星球浏览器下载通道（CLI 被拒的星球走这里）")
    ap.add_argument("--as-of", default=date.today().isoformat())
    ap.add_argument("--groups", default=None, help="逗号分隔 group_id")
    ap.add_argument("--all-rejected", action="store_true", help="处理预置的 4 个 CLI 被拒星球")
    ap.add_argument("--max-cards", type=int, default=6, help="每个星球最多看多少张文件卡片")
    ap.add_argument("--dry-run", action="store_true", help="只探测能不能下，不真下")
    args = ap.parse_args(argv)

    if args.groups:
        gids = [x.strip() for x in args.groups.split(",") if x.strip()]
    elif args.all_rejected:
        gids = list(REJECTED)
    else:
        raise SystemExit("要么给 --groups，要么给 --all-rejected")

    as_of = args.as_of
    dest = LANDING / as_of
    print(f"日期：{as_of}｜星球 {len(gids)} 个｜落地：{dest}\n")

    total_dl, problems = 0, []
    for gid in gids:
        name = REJECTED.get(gid, gid)
        print(f"[{name}] {gid}")
        before = snapshot_downloads() if not args.dry_run else {}
        try:
            r = fetch_group(gid, as_of, max_cards=args.max_cards, dry_run=args.dry_run)
        except Exception as exc:  # noqa: BLE001 — 单星球失败要报，不能吞
            print(f"  ✗ 失败：{exc}", file=sys.stderr)
            problems.append((name, str(exc)[:120]))
            continue

        cards = r.get("cards", 0)
        if not cards:
            print(f"  · {r.get('note') or '没有文件卡片'}")
            continue
        got = 0
        for x in r.get("results") or []:
            if x.get("downloaded"):
                print(f"  ✓ 下载 {x.get('fname')}（{x.get('date')}）")
                got += 1
            else:
                print(f"  · 跳过 {x.get('fname')}：{x.get('reason') or x.get('err')}")
        total_dl += got

        if got and not args.dry_run:
            time.sleep(2)
            moved = harvest(before, dest)
            print(f"  → 搬运 {len(moved)} 个到 {dest}")
            for m in moved:
                print(f"      {m.name}  {m.stat().st_size:,} B")

    print(f"\n完成：下载 {total_dl} 个｜问题 {len(problems)} 个")
    if problems:
        for n, e in problems:
            print(f"  问题 {n}: {e}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

"""知识星球每日抓取（独立脚本版）：多星球 + 当天 + PDF。

**34 型管线里请用 Adapter（`zsxq_cli.py`）**，本脚本用于手工补跑和排查问题
（`--dry-run` 看清单最快）。

CLI 封装统一在 `pipelines/_kit/zsxq_api.py`，本文件不重复实现。

## 用法

    python "pipelines/03-卖方与共识/zsxq_daily.py"                    # 抓今天
    python "pipelines/03-卖方与共识/zsxq_daily.py" --as-of 2026-10-28
    python "pipelines/03-卖方与共识/zsxq_daily.py" --dry-run           # 只列清单
    python "pipelines/03-卖方与共识/zsxq_daily.py" --groups 152...,488...

## 落点

`pipelines/_landing/zsxq/<as-of>/`。**不进 `corpus/materials`** ——
PDF 要先过 `tools/pdf-pipeline` 抽取才有 `pages.json`。
"""

from __future__ import annotations

import argparse
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from pipelines._kit import zsxq_api as Z  # noqa: E402

LANDING = ROOT / "pipelines" / "_landing" / "zsxq"
ACCEPT = (".pdf",)
BROWSER_HINT = 'python "pipelines/03-卖方与共识/zsxq_browser.py" --groups {gid} --as-of {as_of}'


def collect(as_of: str, uid: str, group_ids: list[str] | None, *, limit_per_group: int = 30) -> list[dict]:
    """收集 `as_of` 当天、带 PDF 附件的条目（不下载）。"""
    picked: list[dict] = []
    gl = Z.groups(uid) if group_ids is None else [{"group_id": g, "name": "(指定)"} for g in group_ids]

    for g in gl:
        gid, gname = g["group_id"], g.get("name") or gid
        try:
            ts = Z.topics(gid, limit=limit_per_group)
        except Z.SkillDenied:
            print(
                f"  ! {gname}: 官方通道未开通 Skill 权限 → 改用浏览器通道："
                f"{BROWSER_HINT.format(gid=gid, as_of=as_of)}",
                file=sys.stderr,
            )
            continue
        except Exception as exc:  # noqa: BLE001 — 单星球失败不该拖垮整轮
            print(f"  ! {gname}: 拉主题失败 {str(exc)[:140]}", file=sys.stderr)
            continue

        hit = 0
        for t in ts:
            if (t.get("create_time") or "")[:10] != as_of:
                continue
            talk = t.get("talk") or {}
            title = (talk.get("title") or "").strip()
            for f in talk.get("files") or []:
                name = str(f.get("name") or "")
                if not name.lower().endswith(ACCEPT):
                    continue
                picked.append(
                    {
                        "group_id": gid,
                        "group_name": gname,
                        "topic_title": title[:60],
                        "create_time": (t.get("create_time") or "")[:19],
                        "file_id": str(f.get("file_id")),
                        "name": name,
                        "size": f.get("size"),
                    }
                )
                hit += 1
        print(f"  {gname}: 主题 {len(ts)} 条，当天 PDF {hit} 个")
    return picked


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="知识星球每日抓取（多星球 + 当天 + PDF）")
    ap.add_argument("--as-of", default=date.today().isoformat(), help="抓哪一天（默认今天）")
    ap.add_argument("--groups", default=None, help="逗号分隔的 group_id；默认全部")
    ap.add_argument("--limit", type=int, default=30, help="每个星球看最近多少条主题")
    ap.add_argument("--dry-run", action="store_true", help="只列清单，不下载")
    args = ap.parse_args(argv)

    as_of = args.as_of
    gids = [x.strip() for x in args.groups.split(",") if x.strip()] if args.groups else None

    who = Z.self_info()
    if not who["user_id"]:
        print("没拿到 user_id：请先 `zsxq-cli auth login`", file=sys.stderr)
        return 2
    print(f"账号：{who['name']} ({who['user_id']})  {who['location']}")
    print(f"日期：{as_of}\n")

    items = collect(as_of, who["user_id"], gids, limit_per_group=args.limit)
    print(f"\n合计待下载 {len(items)} 个 PDF")

    if not items:
        print("今天没有新 PDF。")
        return 0
    if args.dry_run:
        for it in items:
            print(f"  [{it['group_name']}] {it['name']}  ({it['size']} B)")
        return 0

    dest = LANDING / as_of
    dest.mkdir(parents=True, exist_ok=True)
    ok, bad = 0, []
    for it in items:
        try:
            body = Z.download_pdf(it["file_id"])
            p = dest / it["name"]
            p.write_bytes(body)
            print(f"  ✓ {it['group_name']} / {p.name}  {len(body):,} B")
            ok += 1
        except Exception as exc:  # noqa: BLE001 — 单个失败要报，不能静默跳过
            print(f"  ✗ {it['group_name']} / {it['name']}: {exc}", file=sys.stderr)
            bad.append((it["name"], str(exc)))

    print(f"\n完成：成功 {ok}，失败 {len(bad)}")
    print(f"落点：{dest}")
    if bad:
        for n, e in bad:
            print(f"  失败 {n}: {e}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

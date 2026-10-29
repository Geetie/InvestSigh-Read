#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""验收材料库结构完整性。

用法：
    PYTHONUTF8=1 python tools/pdf-pipeline/verify.py
    PYTHONUTF8=1 python tools/pdf-pipeline/verify.py --strict   # 有问题退出码 1

检查六项：
  1. 每份材料都有 source.* / pages.json / content.md / meta.json
  2. pages.json 的 pageCount 与 pages 长度一致
  3. figures[] 的 order 是 1..N 连续无重复
  4. 每张图在 figures/ 下真实存在
  5. pages[].figures 里的图都在全局 figures[] 中（不悬挂）
  6. content.md 里的图片引用都能找到对应文件
"""
import json
import re
import sys
from pathlib import Path

READ = Path(__file__).resolve().parents[2]
MAT = READ / "corpus" / "materials"


def main():
    dirs = sorted(d for d in MAT.iterdir()
                  if d.is_dir() and d.name not in ("raw", "mineru") and not d.name.startswith("."))
    problems = []
    stats = {"mat": 0, "fig": 0, "ordered_ok": 0, "unmapped": 0}

    for d in dirs:
        mid = d.name
        stats["mat"] += 1
        # 1) 必需文件
        for need in ("pages.json", "content.md", "meta.json"):
            if not (d / need).exists():
                problems.append((mid, f"缺 {need}"))
        if not list(d.glob("source.*")):
            problems.append((mid, "缺 source.*"))

        pj = d / "pages.json"
        if not pj.exists():
            continue
        try:
            doc = json.loads(pj.read_text("utf-8"))
        except Exception as e:
            problems.append((mid, f"pages.json 解析失败: {e}"))
            continue

        pages = doc.get("pages") or []
        figs = doc.get("figures") or []
        stats["fig"] += len(figs)
        stats["unmapped"] += sum(1 for f in figs if f.get("page") is None)

        # 2) pageCount 一致
        if doc.get("pageCount") != len(pages):
            problems.append((mid, f"pageCount={doc.get('pageCount')} 但 pages={len(pages)}"))

        # 3) order 连续
        orders = [f.get("order") for f in figs]
        if orders and orders != list(range(1, len(orders) + 1)):
            stats["ordered_ok"] += 0
            problems.append((mid, f"order 不连续：{orders[:6]}…"))
        elif orders:
            stats["ordered_ok"] += 1

        # 4) 图文件存在
        figdir = d / "figures"
        for f in figs:
            if not (figdir / f["name"]).exists():
                problems.append((mid, f"figures/ 缺 {f['name']}"))

        # 5) pages[].figures 不悬挂
        names = {f["name"] for f in figs}
        for p in pages:
            for pf in p.get("figures") or []:
                if pf["name"] not in names:
                    problems.append((mid, f"p{p['n']} 悬挂图 {pf['name']}"))

        # 6) content.md 引用可解析
        cm = d / "content.md"
        if cm.exists():
            for ref in re.findall(r"!\[[^\]]*\]\(figures/([^)]+)\)", cm.read_text("utf-8")):
                if not (figdir / ref).exists():
                    problems.append((mid, f"content.md 引用不存在的图 {ref}"))

    print(f"材料 {stats['mat']} | 图 {stats['fig']} | order 连续 {stats['ordered_ok']} | "
          f"未定页 {stats['unmapped']} ({stats['unmapped']*100//max(stats['fig'],1)}%)")
    print()

    if problems:
        print(f"问题 {len(problems)}：")
        for mid, msg in problems[:25]:
            print(f"  {mid[:56]:<58} {msg}")
        if len(problems) > 25:
            print(f"  …还有 {len(problems)-25}")
    else:
        print("结构检查：全部通过")

    # 未定页只是降级（读者看不到该图），不算阻塞
    blocking = [p for p in problems]
    if "--strict" in sys.argv and blocking:
        print(f"\n[strict] {len(blocking)} 项，退出码 1")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())

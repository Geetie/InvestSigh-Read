#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""整页快照：把 PDF 的一页整体渲染成图。

**用途**（回答「整页快照是什么用」）：
MinerU 把复合图表拆成多个图元（一张图可能碎成 5–10 块，箭头、标注、图例还会丢）。
整页快照保留**原始版式**，是「figures 里的图看着不对」时的最终参照。

**为什么不默认全量生成**：6840 页全渲染要占几个 GB，而它只在人工核图时才用得上。
所以设计成**按需**：
    # 指定材料 + 页
    python page_snapshot.py --ids <id> --pages 3 7
    # 只给材料 → 渲染「figures 为空但文本也说没内容的页」（最可能是纯图页）
    python page_snapshot.py --ids <id> --auto
    # 全库扫一遍可疑页
    python page_snapshot.py --auto

落点：`materials/<id>/snapshots/p012.png`（与 figures 分开，避免和 MinerU 抽的图混淆）
"""
import json
import re
import sys
from pathlib import Path

READ = Path(__file__).resolve().parents[2]
MAT = READ / "corpus" / "materials"


def snap(mid, pages=None, auto=False, dpi=110):
    d = MAT / mid
    src = next((s for s in d.glob("source.*") if s.suffix.lower() == ".pdf"), None)
    if not src:
        return ("no-pdf", 0)
    try:
        import fitz  # pymupdf
    except ImportError:
        return ("no-pymupdf", 0)

    pj = d / "pages.json"
    doc = json.loads(pj.read_text("utf-8")) if pj.exists() else {"pages": []}
    allp = doc.get("pages") or []

    if auto and not pages:
        # 「文本 < 30 字」= 可能是纯图页
        pages = [p["n"] for p in allp
                 if len(re.sub(r"\s", "", p.get("text") or "")) < 30]
    if not pages:
        return ("nothing-to-do", 0)

    snapdir = d / "snapshots"
    snapdir.mkdir(exist_ok=True)
    out = 0
    pdf = fitz.open(str(src))
    try:
        for n in pages:
            if n < 1 or n > len(pdf):
                continue
            page = pdf[n - 1]
            pix = page.get_pixmap(dpi=dpi)
            f = snapdir / f"p{n:03d}.png"
            pix.save(str(f))
            out += 1
            # 快照也挂进 pages.json，前端能显示
            for p in allp:
                if p["n"] == n:
                    p["snapshot"] = f"snapshots/p{n:03d}.png"
    finally:
        pdf.close()

    if out and pj.exists():
        pj.write_text(json.dumps(doc, ensure_ascii=False, indent=1), encoding="utf-8")
    return ("ok", out)


def main():
    args = sys.argv[1:]
    ids = []
    pages = []
    auto = "--auto" in args
    if "--ids" in args:
        i = args.index("--ids")
        rest = args[i + 1:]
        for a in rest:
            if a == "--pages":
                break
            ids.append(a)
    if "--pages" in args:
        i = args.index("--pages")
        for a in args[i + 1:]:
            if a.startswith("--"):
                break
            pages.extend(int(x) for x in a.split(",") if x.isdigit())

    if not ids:
        ids = [p.name for p in sorted(MAT.iterdir())
               if p.is_dir() and p.name not in ("raw", "mineru")]

    total = 0
    for mid in ids:
        st, n = snap(mid, pages or None, auto)
        if st not in ("nothing-to-do",):
            print(f"{mid[:56]:<58} {st:<14} {n} 页")
        total += n
    print(f"\n生成快照 {total} 张")
    return 0


if __name__ == "__main__":
    sys.exit(main())

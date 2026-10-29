#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
recover-pdf-layer.py —— 把 PDF 文本层里、MinerU 丢掉的那部分补回 pages.json

为什么需要它（实测，2026-10-28）
--------------------------------
研报的「Consensus Price Target Distribution」「Consensus Rating Distribution」
是**矢量图里带文字**（不是位图）：文字在 PDF 文本层里有，MinerU 却把它当图，
只留标题行，把 87% Overweight / 12% Equal-weight / 1% Underweight、
$616.00 / $1,086.00 这类读数整段丢了。
后果：`server/check.mjs` 只认 pages.json 的 text，于是这些读数**进不了依据区**，
只能写「见 p.N 的图」——本型（共识与评级档位）的核心读数因此全不可核。

做法（只做加法，不改一个字）
----------------------------
不整页重灌（那会把 pages.json 撑大两倍）。只补**图块区域**：
  · 以「Consensus Price Target Distribution」「Consensus Rating Distribution」
    这两个标题块为锚，往下取到最近的「Source: …」块为止；
  · 只取该纵区间内、左半栏（x < 页宽 55%）的块，按 y 再按 x 排序；
  · 拼成一段，若整段在 pages.json 里已能逐字找到 → 不动；否则**原样追加**到该页 text 末尾。
原文件备份成 `pages.mineru.json`（只备份一次），`meta.json` 记 `textLayerRecovered`。

用法
----
    python tools/recover-pdf-layer.py --dry-run                  # 只看会加什么（默认）
    python tools/recover-pdf-layer.py --apply --ids a,b,c        # 写盘
    python tools/recover-pdf-layer.py --apply --show 13          # 顺带打印 p.13 补进去的原文

退出码：0 正常（含「无需补」）；2 有材料缺 source.pdf / pages.json 或页数不齐。
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import sys
from datetime import datetime, timezone

import pymupdf

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAT = os.path.join(ROOT, "corpus", "materials")

ANCHORS = ("Consensus Price Target Distribution", "Consensus Rating Distribution")


def norm(s: str) -> str:
    """与 server/validate.mjs 同口径：去掉所有空白，弯引号归一"""
    out = []
    for ch in s:
        if ch.isspace():
            continue
        out.append('"' if ch in "“”„‟＂" else "'" if ch in "‘’" else ch)
    return "".join(out)


def region_text(page) -> str:
    """取该页「共识面板」的文字：标题块本身 + 标题右下方 45pt 内、右延 220pt 的读数块

    实测版面（MS 报告，2025-10 / 2026-09 各期一致）：
      · 「Consensus Price Target Distribution」块内含 $616.00 / $1,086.00，
        右侧 223pt 处是「Morgan Stanley Estimates / Mean」；
      · 「Consensus Rating Distribution」标题单独成块，读数在右下方
        (x+96, y+15) 的另一块里：87% Overweight / 12% Equal-weight / 1% / Underweight。
    所以规则只要一句话：标题块 + 它右脚下方一小块。窗口固定，不随文件变。
    """
    blocks = [b for b in page.get_text("blocks") if b[6] == 0 and (b[4] or "").strip()]
    picked = []
    for b in blocks:
        if not any(a in (b[4] or "") for a in ANCHORS):
            continue
        x0, y0, x1, y1 = b[0], b[1], b[2], b[3]
        for c in blocks:
            inside = c[1] >= y0 - 6 and c[1] <= y0 + 45 and c[0] >= x0 - 12 and c[0] <= x1 + 220
            if not inside:
                continue
            t = "\n".join(ln.strip() for ln in (c[4] or "").splitlines() if ln.strip())
            if t:
                picked.append((round(c[1], 1), round(c[0], 1), t))
    if not picked:
        return ""
    picked.sort()
    seen, out = set(), []
    for _, _, t in picked:
        if t in seen:
            continue
        seen.add(t)
        out.append(t)
    return "\n".join(out)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="写盘；缺省为 dry-run")
    ap.add_argument("--dry-run", action="store_true", help="显式声明只看不写（默认行为）")
    ap.add_argument("--ids", default="", help="逗号分隔的材料 id；缺省=全部")
    ap.add_argument("--only-pages", default="", help="逗号分隔的页号；缺省=全部页")
    ap.add_argument("--show", default="", help="打印这些页补进去的原文，逗号分隔")
    args = ap.parse_args()

    ids = [x.strip() for x in args.ids.split(",") if x.strip()] or sorted(
        d for d in os.listdir(MAT) if os.path.isdir(os.path.join(MAT, d))
    )
    only_pages = {int(x) for x in args.only_pages.split(",") if x.strip()}
    show = {int(x) for x in args.show.split(",") if x.strip()}

    bad, report, total_chars = [], [], 0
    touched = 0
    for mid in ids:
        d = os.path.join(MAT, mid)
        pj, pdf = os.path.join(d, "pages.json"), os.path.join(d, "source.pdf")
        if not (os.path.exists(pj) and os.path.exists(pdf)):
            bad.append(mid)
            continue
        data = json.load(open(pj, encoding="utf-8"))
        pages = data.get("pages") or []
        doc = pymupdf.open(pdf)
        if len(doc) != len(pages):
            report.append({"id": mid, "skip": f"PDF {len(doc)} 页 vs pages.json {len(pages)} 页，不对齐，跳过"})
            continue

        adds = {}
        for p in pages:
            n = int(p["n"])
            if only_pages and n not in only_pages:
                continue
            block = region_text(doc[n - 1])
            if not block:
                continue
            if norm(block) and norm(block) in norm(p.get("text") or ""):
                continue  # 已完整存在，不动
            # 逐行剥掉已在文本里的行，剩下的才追加（减少重复）
            kept = [ln for ln in block.splitlines() if norm(ln) not in norm(p.get("text") or "")]
            if not kept:
                continue
            adds[n] = "\n".join(kept)

        if not adds:
            continue
        touched += 1
        total_chars += sum(len(v) for v in adds.values())
        report.append(
            {"id": mid, "pages": {str(n): {"chars": len(v), "text": v} for n, v in adds.items()}}
        )
        if args.apply:
            bak = os.path.join(d, "pages.mineru.json")
            if not os.path.exists(bak):
                shutil.copy2(pj, bak)
            for p in pages:
                n = int(p["n"])
                if n in adds:
                    p["text"] = (p.get("text") or "").rstrip() + "\n" + adds[n]
            tmp = pj + ".tmp"
            with open(tmp, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=1)
            os.replace(tmp, pj)
            mj = os.path.join(d, "meta.json")
            meta = json.load(open(mj, encoding="utf-8")) if os.path.exists(mj) else {}
            meta["textLayerRecovered"] = {
                "tool": "tools/recover-pdf-layer.py",
                "at": datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds"),
                "reason": "MinerU 丢弃矢量图内文字（一致评级分布 / 一致目标价分布），本层自同一 PDF 同一页补回",
                "backup": "pages.mineru.json",
                "pages": sorted(str(n) for n in adds),
                "addedChars": sum(len(v) for v in adds.values()),
            }
            with open(mj, "w", encoding="utf-8") as f:
                json.dump(meta, f, ensure_ascii=False, indent=1)

    if show:
        for r in report:
            for n, v in (r.get("pages") or {}).items():
                if int(n) in show:
                    print(f"--- {r['id']} p.{n} 补入 ---")
                    print(v["text"])

    mode = "APPLY" if args.apply else "DRY-RUN"
    print(f"[{mode}] 材料 {len(ids)} 份，需补 {touched} 份，合计 +{total_chars} 字符")
    for r in report:
        if "skip" in r:
            print("  SKIP", r["id"], r["skip"])
        else:
            ps = ", ".join(f"p.{n}(+{v['chars']})" for n, v in r["pages"].items())
            print("  " + r["id"][:54].ljust(54), ps)
    if bad:
        print("缺 pages.json / source.pdf：", ", ".join(bad))
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())

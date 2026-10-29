#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""扫描材料库：找出乱码 / 结构缺失 / 图片未定页 / 无产物。

用法：
    PYTHONUTF8=1 python tools/pdf-pipeline/scan.py
    PYTHONUTF8=1 python tools/pdf-pipeline/scan.py --strict     # 有乱码就退出码 1

输出四类问题：
  A 乱码（确定性 OCR 指纹）
  B 结构缺失（缺 pages.json / source / content.md / meta.json）
  C 图片未定页（page 为 null，读者看不到）
  D 空文本页（可能是纯图页，也可能是抽取失败）
"""
import json
import re
import sys
from pathlib import Path

READ = Path(__file__).resolve().parents[2]
MAT = READ / "corpus" / "materials"

# 确定性 OCR 指纹。**不要**改成「连续 >22 字母无空格」——那会把 URL、代码串、
# 高管名全标红（实测 175/259 全是噪声）。
SIG = [
    (r"\ufffd", "U+FFFD"),
    (r"P1atforms", "P1atforms"),
    (r"META\.0(?!Q)", "META.0"),
    (r"G00GL", "G00GL"),
    (r"Historg", "Historg"),
    (r"RESEARcH", "RESEARcH"),
    (r"tobuyorsell", "整段粘连"),
    (r"Fiste the Kingdom", "句首错乱"),
    (r"\b1O\d{3}\b", "1O0xx"),
    (r"\b2O2[0-9]\b", "2O26"),
]


def materials():
    return sorted(
        d for d in MAT.iterdir()
        if d.is_dir() and d.name not in ("raw", "mineru") and not d.name.startswith(".")
    )


def main():
    strict = "--strict" in sys.argv
    dirs = materials()
    garbled, broken, unmapped, empty_pages = [], [], [], []
    total_fig = total_unmapped = total_pages = 0

    for d in dirs:
        mid = d.name
        missing = [n for n in ("pages.json", "content.md", "meta.json") if not (d / n).exists()]
        if not list(d.glob("source.*")):
            missing.append("source.*")
        if missing:
            broken.append((mid, missing))

        pj = d / "pages.json"
        if not pj.exists():
            continue
        try:
            doc = json.loads(pj.read_text("utf-8"))
        except Exception as e:
            broken.append((mid, [f"pages.json 解析失败: {e}"]))
            continue

        pages = doc.get("pages") or []
        total_pages += len(pages)
        text = "\n".join(p.get("text") or "" for p in pages)
        hits = [name for pat, name in SIG if re.search(pat, text)]
        if hits:
            garbled.append((mid, hits))

        figs = doc.get("figures") or []
        total_fig += len(figs)
        un = [f for f in figs if f.get("page") is None]
        total_unmapped += len(un)
        if un:
            unmapped.append((mid, len(un), len(figs)))

        e = sum(1 for p in pages if len(re.sub(r"\s", "", p.get("text") or "")) < 30)
        if e:
            empty_pages.append((mid, e, len(pages)))

    print(f"材料 {len(dirs)} 份 | 总页 {total_pages} | 总图 {total_fig}")
    print()

    def section(title, rows, fmt, limit=12):
        print(f"{title}：{len(rows)}")
        for r in rows[:limit]:
            print("   ", fmt(r))
        if len(rows) > limit:
            print(f"    …还有 {len(rows)-limit}")
        print()

    section("A 乱码", garbled, lambda r: f"{r[0][:56]:<58} {r[1]}")
    section("B 结构缺失", broken, lambda r: f"{r[0][:56]:<58} 缺 {r[1]}")
    section("C 图片未定页", unmapped, lambda r: f"{r[0][:56]:<58} {r[1]}/{r[2]} 张无页码")
    section("D 空文本页（可能是纯图页）", empty_pages,
            lambda r: f"{r[0][:56]:<58} {r[1]}/{r[2]} 页", limit=8)

    print(f"图片未定页合计：{total_unmapped}/{total_fig} "
          f"({total_unmapped * 100 // max(total_fig, 1)}%)")

    bad = len(garbled) + len(broken)
    if strict and bad:
        print(f"\n[strict] 有 {bad} 项问题，退出码 1")
        return 1
    print("\n[ok] 无阻塞问题" if not bad else f"\n[warn] {bad} 项需处理")
    return 0


if __name__ == "__main__":
    sys.exit(main())

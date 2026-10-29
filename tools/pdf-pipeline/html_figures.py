#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""从 HTML 载体（01 类 SEC 文件）里抽内嵌图片。

为什么单独一套：01 类走的是 htm 不是 PDF，MinerU 不处理它，
所以 figures/ 一直是空的。SEC 的 10-K/10-Q/8-K 是 XBRL Inline 文档，
图片通常是 `<img src="...">` 内嵌 base64 或相对路径。

处理：
  · `<img src="data:image/...;base64,…">` → 解码落盘
  · `<img src="xxx.jpg">` 且文件在同目录 → 复制
  · 按文档中出现的先后排序（HTML 顺序即阅读顺序）

命名与 PDF 一致：`{order:03d}_p{part:03d}_{idx:02d}.jpg`
  · htm 无分页概念 → 用「文档分节序号」当页号：按 `<hr>`/大标题切分，
    实在切不出就全部记 p001（诚实：就是没分页）。
"""
import base64
import json
import re
import sys
from pathlib import Path

READ = Path(__file__).resolve().parents[2]
MAT = READ / "corpus" / "materials"

IMG_DATA = re.compile(r'<img[^>]+src=["\']data:image/(\w+);base64,([A-Za-z0-9+/=\s]+)["\']', re.I)
IMG_SRC = re.compile(r'<img[^>]+src=["\']([^"\']+)["\']', re.I)
EXT = {"jpeg": ".jpg", "jpg": ".jpg", "png": ".png", "gif": ".gif", "webp": ".webp", "bmp": ".bmp"}


def split_parts(html):
    """按分节标记切，返回 [(part_no, offset)]；切不出就单一节。"""
    marks = [m.start() for m in re.finditer(r"<hr\b|Item\s+\d+[A-C]?\.", html, re.I)]
    if len(marks) < 2:
        return [(1, 0)]
    return [(i + 1, pos) for i, pos in enumerate(marks)]


def part_of(offset, parts):
    cur = 1
    for pno, pos in parts:
        if offset >= pos:
            cur = pno
        else:
            break
    return cur


def do_one(d):
    mid = d.name
    src = next((s for s in d.glob("source.*") if s.suffix.lower() in (".htm", ".html")), None)
    if not src:
        return None
    html = src.read_text("utf-8", errors="replace")
    figdir = d / "figures"
    figdir.mkdir(exist_ok=True)

    parts = split_parts(html)
    found = []      # (offset, ext, bytes|None, path|None)

    for m in IMG_DATA.finditer(html):
        fmt = m.group(1).lower()
        ext = EXT.get(fmt, "." + fmt)
        try:
            raw = base64.b64decode(re.sub(r"\s", "", m.group(2)))
        except Exception:
            continue
        if len(raw) < 1024:      # 图标/分隔线，跳过
            continue
        found.append((m.start(), ext, raw, None))

    for m in IMG_SRC.finditer(html):
        u = m.group(1)
        if u.startswith("data:"):
            continue
        p = (src.parent / u).resolve()
        if p.exists() and p.is_file():
            found.append((m.start(), p.suffix.lower(), None, p))

    if not found:
        return ("no-img", 0, 0)

    found.sort(key=lambda t: t[0])
    # 逐节内编号
    seen_per_part = {}
    plan = []
    for i, (off, ext, raw, p) in enumerate(found, 1):
        part = part_of(off, parts)
        idx = seen_per_part.get(part, 0)
        seen_per_part[part] = idx + 1
        name = f"{i:03d}_p{part:03d}_{idx:02d}{ext}"
        plan.append({"name": name, "page": part, "idx": idx, "order": i,
                     "raw": raw, "path": p})

    for f in plan:
        dst = figdir / f["name"]
        if f["raw"] is not None:
            dst.write_bytes(f["raw"])
        else:
            dst.write_bytes(f["path"].read_bytes())

    # 回写 pages.json / meta.json / content.md
    pj = d / "pages.json"
    if pj.exists():
        doc = json.loads(pj.read_text("utf-8"))
        by_page = {}
        for f in plan:
            by_page.setdefault(f["page"], []).append({"name": f["name"], "order": f["order"]})
        for p in doc.get("pages") or []:
            p["figures"] = by_page.get(p["n"], [])
        doc["figures"] = [{"name": f["name"], "page": f["page"], "order": f["order"]} for f in plan]
        pj.write_text(json.dumps(doc, ensure_ascii=False, indent=1), encoding="utf-8")

        lines = []
        for p in doc.get("pages") or []:
            t = (p.get("text") or "").strip()
            if t:
                lines.append(t)
            for f in by_page.get(p["n"], []):
                lines.append(f'![{f["name"]}](figures/{f["name"]})')
            lines.append("")
        (d / "content.md").write_text("\n".join(lines).strip() + "\n", encoding="utf-8")

    mp = json.loads((d / "meta.json").read_text("utf-8"))
    mp["figureCount"] = len(plan)
    mp["figuresWithPage"] = len(plan)
    mp["ordered"] = True
    (d / "meta.json").write_text(json.dumps(mp, ensure_ascii=False, indent=1), encoding="utf-8")
    return ("ok", len(plan), len(parts))


def main():
    dirs = [d for d in sorted(MAT.iterdir())
            if d.is_dir() and d.name not in ("raw", "mineru") and not d.name.startswith(".")]
    n = 0
    for d in dirs:
        r = do_one(d)
        if r is None:
            continue
        st, cnt, parts = r
        print(f"{d.name[:56]:<58} {st:<8} 图 {cnt:>2}  节 {parts}")
        if st == "ok":
            n += 1
    print(f"\n处理 {n} 份")
    return 0


if __name__ == "__main__":
    sys.exit(main())

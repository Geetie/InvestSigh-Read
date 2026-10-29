#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""把材料落成「一份一目录」结构：抽图 → 定阅读顺序 → 生成 content.md / meta.json。

用法：
    PYTHONUTF8=1 python tools/pdf-pipeline/structure.py
    PYTHONUTF8=1 python tools/pdf-pipeline/structure.py --ids <id> [<id>…]
    PYTHONUTF8=1 python tools/pdf-pipeline/structure.py --renumber   # 重排已有图片名

目标结构：
    corpus/materials/<材料 id>/
        source.pdf|.htm|.xlsx      原始件
        content.md                 全文，**图片按阅读顺序内联**
        pages.json                 分页文本 + 每页 figures（带 order）
        figures/001_p012_00.jpg    序号_页_页内序
        meta.json                  子型/日期/页数/图数

阅读顺序的算法（**不是猜的**）：
    content_list 每条 image 带 `bbox: [left, top, right, bottom]` 与 `page_idx`。
    排序键 = (页, round(top/8), left) —— 8pt 容差把同一视觉行的图归为一组，
    组内按 left 从左到右。得到全书唯一的 order（1..N）。
"""
import json
import os
import re
import shutil
import sys
from pathlib import Path

READ = Path(__file__).resolve().parents[2]
MAT = READ / "corpus" / "materials"
# ★ 批次目录：默认在仓库内（corpus/_batches），可用环境变量指向别处（如 ~/mineru_out）。
#   原来写死 D:/InvestSigh/system/... 在 macOS 下会被当成相对路径，
#   exists() 恒 False 且**不报错** —— 会静默降级，比崩溃更难查。
BATCH = Path(os.environ.get("PDF_PIPELINE_BATCH") or (READ / "corpus" / "_batches")).resolve()


def build_boxes(items):
    """image 名 → (页 1基, 页内顺序)。页内按 bbox 上→下、左→右。"""
    if not items:
        return {}
    per_page = {}
    for it in items:
        ip = it.get("img_path")
        if not ip:
            continue
        nm = os.path.basename(ip)
        pi = it.get("page_idx")
        if pi is None:
            continue
        bbox = it.get("bbox") or [0, 0, 0, 0]
        try:
            top, left = float(bbox[1]), float(bbox[0])
        except Exception:
            top, left = 0.0, 0.0
        per_page.setdefault(int(pi) + 1, []).append((top, left, nm))
    out = {}
    for pg, lst in per_page.items():
        lst.sort(key=lambda t: (round(t[0] / 8), t[1]))
        for i, (_, _, nm) in enumerate(lst):
            out[nm] = (pg, i)
    return out


MAN = {}
_manfile = READ / "corpus" / "materials" / "ingest-manifest-2026-10-26.json"
if _manfile.exists():
    try:
        import os as _os
        MAN = {x["id"]: _os.path.splitext(x["source_file"])[0]
               for x in json.loads(_manfile.read_text("utf-8"))["items"]}
    except Exception:
        MAN = {}


def find_cl(mid, d):
    """manifest → slug 模糊 两步。**不能用 source.* 的 stem**：
    重构后原始件统一叫 source.pdf，stem 恒为 "source"，永远找不到 content_list。"""
    stem = MAN.get(mid)
    if stem:
        p = BATCH / "_mineru" / f"{stem}.cl"
        if p.exists():
            try:
                return json.loads(p.read_text("utf-8"))
            except Exception:
                pass
    tail = re.sub(r"[^0-9A-Za-z\u4e00-\u9fa5]", "", mid.split("-", 3)[-1]).lower()
    if tail and BATCH.exists():
        best = None
        for p in BATCH.glob("_mineru/*.cl"):
            s = re.sub(r"[^0-9A-Za-z\u4e00-\u9fa5]", "", p.stem).lower()
            if tail in s and (best is None or len(s) < len(best[0])):
                best = (s, p)
        if best:
            try:
                return json.loads(best[1].read_text("utf-8"))
            except Exception:
                return None
    return None


def main():
    only = None
    if "--ids" in sys.argv:
        i = sys.argv.index("--ids")
        only = sys.argv[i + 1:]

    dirs = sorted(d for d in MAT.iterdir()
                  if d.is_dir() and d.name not in ("raw", "mineru") and not d.name.startswith("."))
    print(f"{'材料':<54} {'页':>4} {'图':>4} {'定页':>4}  备注")
    print("-" * 78)

    stats = {"done": 0, "no_pages": 0, "no_fig": 0}
    for d in dirs:
        if only and d.name not in only:
            continue
        pj = d / "pages.json"
        if not pj.exists():
            stats["no_pages"] += 1
            continue
        doc = json.loads(pj.read_text("utf-8"))
        pages = doc.get("pages") or []

        # ── 已有图片：读 figures/ ──
        figdir = d / "figures"
        files = sorted(f.name for f in figdir.iterdir() if f.is_file()) if figdir.is_dir() else []
        if not files:
            # 没有图：仍要写 content.md / meta.json
            stats["no_fig"] += 1

        box = build_boxes(find_cl(d.name, d))

        # 已有 name 里能解析出页码的，优先用它（新命名 001_p012_00）
        ordered = []
        for nm in files:
            m = re.match(r"^\d{3,}_p(\d{3,})_(\d{2})\.", nm)   # 新命名（带 p）
            if m:
                ordered.append({"name": nm, "page": int(m.group(1)),
                                "pageIndex": int(m.group(2)), "keep": True})
                continue
            pg, idx = box.get(nm, (None, None))
            ordered.append({"name": nm, "page": pg, "pageIndex": idx, "keep": False})

        # 排序：有页的在前，按 (页, 页内序)；无页排最后
        ordered.sort(key=lambda f: (f["page"] is None, f["page"] or 0,
                                    f["pageIndex"] or 0, f["name"]))

        # ── 重命名（只在需要时）──
        renumber = "--renumber" in sys.argv or any(not f["keep"] for f in ordered)
        newfigs = []
        figdir.mkdir(exist_ok=True)
        for i, f in enumerate(ordered, 1):
            ext = Path(f["name"]).suffix.lower() or ".jpg"
            pg = f["page"]
            idx = f["pageIndex"]
            tag = f"p{pg:03d}_{idx:02d}" if pg is not None else "nopage"
            newname = f"{i:03d}_{tag}{ext}"
            src = figdir / f["name"]
            dst = figdir / newname
            if renumber and f["name"] != newname:
                # 先改名到临时名，避免循环覆盖
                tmp = figdir / f".tmp_{i:03d}{ext}"
                if src.exists():
                    shutil.move(str(src), str(tmp))
                f["_tmp"] = tmp
                f["name"] = newname
            newfigs.append({"name": newname, "page": pg, "pageIndex": idx, "order": i})
        # 二次落地
        for f in ordered:
            if f.get("_tmp"):
                shutil.move(str(f["_tmp"]), str(figdir / f["name"]))

        # ── 每页挂自己的图 ──
        by_page = {}
        for f in newfigs:
            if f["page"] is not None:
                by_page.setdefault(f["page"], []).append({"name": f["name"], "order": f["order"]})
        for p in pages:
            p["figures"] = by_page.get(p["n"], [])
        doc["pageCount"] = len(pages)
        doc["figures"] = [{"name": f["name"], "page": f["page"], "order": f["order"]} for f in newfigs]
        pj.write_text(json.dumps(doc, ensure_ascii=False, indent=1), encoding="utf-8")

        # ── content.md：逐页 文本 → 图（按阅读顺序）──
        lines = []
        for p in pages:
            t = (p.get("text") or "").strip()
            if t:
                lines.append(t)
            for f in by_page.get(p["n"], []):
                lines.append(f'![{f["name"]}](figures/{f["name"]})')
            lines.append("")
        (d / "content.md").write_text("\n".join(lines).strip() + "\n", encoding="utf-8")

        # ── meta.json ──
        parts = d.name.split("-")
        m = re.search(r"(\d{4}-\d{2}-\d{2})", d.name)
        (d / "meta.json").write_text(json.dumps({
            "id": d.name,
            "cat": parts[0],
            "sub": parts[1] if len(parts) > 1 else "",
            "date": m.group(1) if m else "0000-00-00",
            "pageCount": len(pages),
            "figureCount": len(newfigs),
            "figuresWithPage": sum(1 for f in newfigs if f["page"] is not None),
            "ordered": True,
        }, ensure_ascii=False, indent=1), encoding="utf-8")

        stats["done"] += 1
        note = "" if newfigs else "无图"
        print(f"{d.name[:52]:<54} {len(pages):>4} {len(newfigs):>4} "
              f"{sum(1 for f in newfigs if f['page'] is not None):>4}  {note}")

    print(f"\n完成 {stats['done']} 份 | 缺 pages.json {stats['no_pages']} | 无图 {stats['no_fig']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

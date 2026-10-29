#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""逐页择优合并：PDF 文本层 × MinerU OCR，取并集而不是二选一。

用法：
    PYTHONUTF8=1 python tools/pdf-pipeline/merge.py                 # 全部有乱码的件
    PYTHONUTF8=1 python tools/pdf-pipeline/merge.py --ids <id> [<id>…]
    PYTHONUTF8=1 python tools/pdf-pipeline/merge.py --all            # 全部材料

**为什么不能二选一**（本项目实测踩过）：
  卖方研报的图片表格页，文本层只有几行页眉，表格数字（`46,783`）根本不在文本层里。
  「文本层干净就用文本层」会把表格数据整个换没 —— 442 块依据里 169 块因此失效。

取法（四种情形）：
  1. 文本层干净，OCR 页无额外内容            → 文本层
  2. 文本层干净，OCR 有 <table> 且缺数字≥3   → 文本层正文 + OCR 表格（并集）
  3. 文本层只有页眉（<50 字），OCR 有实质    → OCR（否则整页正文丢失）
  4. 文本层为空或脏                          → OCR

阈值 50 字符是实测的，不是拍的：有页只有 209 字符却是干净的（MS 研报图注），
卡 200 会把它误判成"无文本层"而退回 OCR —— 等于把干净文本主动换成脏文本。
"""
import os
import json
import re
import sys
from pathlib import Path

READ = Path(__file__).resolve().parents[2]
MAT = READ / "corpus" / "materials"
# ★ 批次目录：默认在仓库内（corpus/_batches），可用环境变量指向别处（如 ~/mineru_out）。
#   原来写死 D:/InvestSigh/system/... 在 macOS 下会被当成相对路径，
#   exists() 恒 False 且**不报错** —— 会静默降级，比崩溃更难查。
BATCH = Path(os.environ.get("PDF_PIPELINE_BATCH") or (READ / "corpus" / "_batches")).resolve()

SIG = [r"\ufffd", r"P1atforms", r"META\.0(?!Q)", r"G00GL", r"Historg",
       r"RESEARcH", r"\b1O\d{3}\b", r"\b2O2[0-9]\b"]
NUM = re.compile(r"\d[\d,]*(?:\.\d+)?")


def has_garbage(t):
    return any(re.search(p, t) for p in SIG)


def nums(s):
    return {m.replace(",", "") for m in NUM.findall(s) if len(m.replace(",", "")) >= 2}


def clean(t):
    t = re.sub(r"-\n(?=[a-z])", "", t)      # 英文断词
    return re.sub(r"\n{3,}", "\n\n", t).strip()


def find_ocr(mid, d):
    """找该材料的 OCR content_list：先看批次 _mineru/<stem>.cl，再退回本地残留。"""
    src = list(d.glob("source.*"))
    if src:
        stem = src[0].stem
        p = BATCH / "_mineru" / f"{stem}.cl"
        if p.exists():
            return json.loads(p.read_text("utf-8"))
    # 模糊匹配（id 的 slug 尾部）
    tail = re.sub(r"[^0-9A-Za-z\u4e00-\u9fa5]", "", mid.split("-", 3)[-1]).lower()
    if tail and BATCH.exists():
        best = None
        for p in BATCH.glob("_mineru/*.cl"):
            s = re.sub(r"[^0-9A-Za-z\u4e00-\u9fa5]", "", p.stem).lower()
            if tail in s and (best is None or len(s) < len(best[0])):
                best = (s, p)
        if best:
            return json.loads(best[1].read_text("utf-8"))
    return None


def ocr_by_page(items):
    by = {}
    for it in items or []:
        p = it.get("page_idx")
        if p is None:
            continue
        s = (it.get("text") or "") + " " + (it.get("table_body") or "")
        if s.strip():
            by.setdefault(p + 1, []).append(s.strip())
    return {k: "\n".join(v) for k, v in by.items()}


def pdf_pages(d):
    src = next((s for s in d.glob("source.*") if s.suffix.lower() == ".pdf"), None)
    if not src:
        return None
    try:
        from pypdf import PdfReader
    except ImportError:
        return None
    try:
        return [clean(p.extract_text() or "") for p in PdfReader(str(src)).pages]
    except Exception:
        return None


def main():
    args = sys.argv[1:]
    only = None
    if "--ids" in args:
        i = args.index("--ids")
        only = args[i + 1:]
    allmode = "--all" in args

    dirs = sorted(d for d in MAT.iterdir() if d.is_dir() and d.name not in ("raw", "mineru"))
    targets = []
    for d in dirs:
        if only and d.name not in only:
            continue
        pj = d / "pages.json"
        if not pj.exists():
            continue
        doc = json.loads(pj.read_text("utf-8"))
        txt = "\n".join(p.get("text") or "" for p in doc.get("pages") or [])
        if allmode or only or has_garbage(txt):
            targets.append((d, doc))

    if not targets:
        print("没有需要合并的材料")
        return 0

    print(f"处理 {len(targets)} 份\n")
    print(f"{'材料':<56} {'文本层':>5} {'并集':>5} {'OCR':>4}  结果")
    print("-" * 84)

    changed = 0
    for d, doc in targets:
        tl = pdf_pages(d)
        if tl is None:
            print(f"{d.name[:54]:<56} {'-':>5} {'-':>5} {'-':>4}  无 PDF/无 pypdf，跳过")
            continue
        ocr = ocr_by_page(find_ocr(d.name, d))
        total = max(len(tl), max(ocr) if ocr else 0)
        pages, f_tl, f_merge, f_ocr = [], 0, 0, 0
        for n in range(1, total + 1):
            t = tl[n - 1] if n - 1 < len(tl) else ""
            o = ocr.get(n, "")
            t_ok = len(re.sub(r"\s", "", t)) >= 50 and not has_garbage(t)
            # 文本层只有页眉、OCR 有更多内容 → 优先 OCR
            if t_ok and len(re.sub(r"\s", "", o)) > len(re.sub(r"\s", "", t)) * 3 \
                    and len(re.sub(r"\s", "", o)) > 300:
                t_ok = False
            o_has_table = "<table" in o.lower()
            o_only = nums(o) - nums(t)

            if t_ok and not (o_has_table and len(o_only) >= 3):
                pages.append({"n": len(pages) + 1, "src": "pdf-text", "chars": len(t), "text": t})
                f_tl += 1
            elif t_ok and o_has_table and len(o_only) >= 3:
                tbl = "\n".join(re.findall(r"<table[\s\S]*?</table>", o, re.I))
                body = t + ("\n\n" + tbl if tbl else "")
                pages.append({"n": len(pages) + 1, "src": "pdf-text+ocr-table",
                              "chars": len(body), "text": body})
                f_merge += 1
            elif o:
                pages.append({"n": len(pages) + 1, "src": "mineru", "chars": len(o), "text": o})
                f_ocr += 1
            else:
                pages.append({"n": len(pages) + 1, "src": "empty", "chars": 0, "text": ""})

        if not pages:
            print(f"{d.name[:54]:<56} {'0':>5} {'0':>5} {'0':>4}  无页，跳过")
            continue
        doc["pages"] = pages
        doc["pageCount"] = len(pages)
        doc["mergedFrom"] = "pdf-pipeline/merge.py"
        (d / "pages.json").write_text(json.dumps(doc, ensure_ascii=False, indent=1), encoding="utf-8")
        changed += 1
        print(f"{d.name[:54]:<56} {f_tl:>5} {f_merge:>5} {f_ocr:>4}  ok")

    print(f"\n改写 {changed} 份。**接下来必须跑 check.mjs**：")
    print("  依据块是逐字抄旧 pages.json 的，换文本后会集体 unverified，需按 SKILL.md §8 分层校正。")
    return 0


if __name__ == "__main__":
    sys.exit(main())

# -*- coding: utf-8 -*-
"""把 12 份投行研报的全文（pages.txt）切成前端可按页取用的 JSON。

真源：system/env/meta/test/2026-10-22-投行研报-12件/材料/R*.pages.txt
产物：public/data/sources/index.json（清单，首屏可载）
      public/data/sources/R*.json（单件全文，按需懒加载）

为什么要拆：12 份合计约 1.5MB，529 页。全量塞进 bundle.json 会让首屏多背 1.3MB，
而详情页一次只看 1 份材料的几页。所以清单常驻、全文按件懒加载。
"""
import json
import re
from datetime import datetime
from pathlib import Path

SRC = Path(r"D:/InvestSigh/system/env/meta/test/2026-10-22-投行研报-12件/材料")
ROOT = Path(__file__).resolve().parents[1]
BUNDLE = ROOT / "public" / "data" / "bundle.json"
OUT = ROOT / "public" / "data" / "sources"

CITE_RE = re.compile(r"\[p\.(\d+)\]")
PAGE_RE = re.compile(r"\[\[p\.(\d+)\]\]")
# 句切：保留 .!? 后的空白，且要求下一句以大写/括号/引号开头，避免 U.S. / Inc. 被切碎
SENT_SPLIT = re.compile(r"(?<=[.!?])\s+(?=[A-Z(\[\"“])")


def normalize(text: str) -> str:
    t = text.replace("\r", "").replace("\u00a0", " ")
    t = re.sub(r"[ \t]{2,}", " ", t)
    t = re.sub(r"\n{3,}", "\n\n", t)
    return t.strip()


def split_pages(raw: str) -> list[dict]:
    # 丢掉文件头部的 # 注释
    lines = [ln for ln in raw.split("\n") if not ln.startswith("#")]
    body = "\n".join(lines)
    parts = PAGE_RE.split(body)
    # parts: [前置, n1, 正文1, n2, 正文2, ...]
    pages = []
    for i in range(1, len(parts) - 1, 2):
        n = int(parts[i])
        text = normalize(parts[i + 1])
        pages.append({"n": n, "chars": len(text), "text": text})
    return pages


def main():
    bundle = json.loads(BUNDLE.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)

    # bundle 里真实的 03 材料：03-broker-research-R01 → R01
    by_src: dict[str, dict] = {}
    for m in bundle["materials"]:
        if m["cat"] == "03" and m["sub"] == "broker-research":
            src_id = m["id"].rsplit("-", 1)[-1]
            by_src[src_id] = m

    index = {
        "version": 1,
        "generatedAt": datetime.now().astimezone().isoformat(timespec="seconds"),
        "materials": {},
    }

    total_bytes = 0
    for f in sorted(SRC.glob("R*.pages.txt")):
        src_id = f.name.split("_", 1)[0]
        raw = f.read_text(encoding="utf-8", errors="ignore")
        pages = split_pages(raw)
        if not pages:
            print("skip (no pages):", f.name)
            continue

        mat = by_src.get(src_id)
        mat_id = mat["id"] if mat else f"03-broker-research-{src_id}"

        # 该材料的答案里引用了哪些页、有没有越界
        cited, out_of_range = [], []
        if mat:
            page_count = len(pages)
            for cell in mat.get("cells", {}).values():
                for g in CITE_RE.findall(cell):
                    n = int(g)
                    if n not in cited:
                        cited.append(n)
                    if n > page_count and n not in out_of_range:
                        out_of_range.append(n)

        payload = {
            "id": mat_id,
            "srcId": src_id,
            "pageCount": len(pages),
            "pages": pages,
        }
        out_file = OUT / f"{src_id}.json"
        out_file.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        size = out_file.stat().st_size
        total_bytes += size

        index["materials"][mat_id] = {
            "srcId": src_id,
            "file": f"{src_id}.json",
            "pageCount": len(pages),
            "chars": sum(p["chars"] for p in pages),
            "emptyPages": [p["n"] for p in pages if p["chars"] < 30],
            "citedPages": sorted(cited),
            "outOfRange": sorted(out_of_range),
            "bytes": size,
        }
        print(f"{src_id}  pages={len(pages):3d}  cited={len(cited):2d}  out={out_of_range}  {size//1024}KB")

    (OUT / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\nindex: {len(index['materials'])} 件，全文合计 {total_bytes/1024/1024:.2f} MB")


if __name__ == "__main__":
    main()

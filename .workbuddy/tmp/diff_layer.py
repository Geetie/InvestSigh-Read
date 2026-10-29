import json, os, re, sys

import pymupdf

batch = json.load(open(".workbuddy/tmp/meta-batch.json", encoding="utf-8"))
PROBE = ["Consensus Rating Distribution", "Consensus Price Target Distribution", "Overweight", "Equal-weight", "Underweight"]

rows = []
for r in batch:
    d = os.path.join("corpus", "materials", r["id"])
    pdf_path = os.path.join(d, "source.pdf")
    pages = json.load(open(os.path.join(d, "pages.json"), encoding="utf-8"))["pages"]
    by_n = {int(p["n"]): (p.get("text") or "") for p in pages}
    try:
        doc = pymupdf.open(pdf_path)
    except Exception as e:
        print("PDF 打不开", r["id"], e)
        continue
    miss = []
    for n in r["pt"]:
        if n < 1 or n > len(doc):
            miss.append(f"p.{n}:越界")
            continue
        pdf = doc[n - 1].get_text()
        js = by_n.get(n, "")
        for w in PROBE:
            if w in pdf and w not in js:
                miss.append(f"p.{n}:缺「{w}」")
        pct = sorted({m.group(0) for m in re.finditer(r"\b\d{1,3}%", pdf)})
        lost_pct = [p for p in pct if p not in js]
        if lost_pct:
            miss.append(f"p.{n}:缺百分比 {'/'.join(lost_pct)}")
        money = sorted({m.group(0) for m in re.finditer(r"\$[\d,]+\.\d\d", pdf)})
        lost_money = [m for m in money if m not in js]
        if lost_money:
            miss.append(f"p.{n}:缺金额 {'/'.join(lost_money)}")
    rows.append({"id": r["id"], "date": r["date"], "pt": r["pt"], "missing": miss})

json.dump(rows, open(".workbuddy/tmp/layer-diff.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
for x in rows:
    print((x["date"] or "?").ljust(11), x["id"][:46].ljust(46), " ".join(x["missing"])[:160] if x["missing"] else "（无缺失）")
print("材料数", len(rows), "有缺失", sum(1 for x in rows if x["missing"]))

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

/** 比对 pages.json 与 PDF 文本层：哪些词在 PDF 里有、pages.json 里没有 */
const batch = JSON.parse(fs.readFileSync(".workbuddy/tmp/meta-batch.json", "utf8"));

const probe = ["Consensus Rating Distribution", "Consensus Price Target Distribution", "Overweight", "Equal-weight", "Underweight"];

for (const r of batch) {
  const dir = path.join("corpus/materials", r.id);
  let pdfTexts = {};
  try {
    const out = execFileSync(
      "python",
      [
        "-c",
        `import pymupdf,json,sys
d=pymupdf.open(r"${path.join(dir, "source.pdf").replace(/\\/g, "/")}")
print(json.dumps({i+1:d[i].get_text() for i in range(len(d))}, ensure_ascii=False))`,
      ],
      { encoding: "utf8", maxBuffer: 1 << 28 },
    );
    pdfTexts = JSON.parse(out);
  } catch (e) {
    console.log("PDF 打不开", r.id, String(e).slice(0, 80));
    continue;
  }
  const pages = JSON.parse(fs.readFileSync(path.join(dir, "pages.json"), "utf8")).pages;
  const byN = new Map(pages.map((g) => [g.n, g.text || ""]));
  const miss = [];
  for (const n of r.pt) {
    const pdf = pdfTexts[n] || "";
    const js = byN.get(n) || "";
    for (const w of probe) {
      if (pdf.includes(w) && !js.includes(w)) miss.push(`p.${n}:${w}`);
    }
    // 百分比如 87% / 12% / 1%
    const pct = [...pdf.matchAll(/\b(\d{1,3})%/g)].map((m) => m[1] + "%");
    const lostPct = pct.filter((p) => !js.includes(p));
    if (lostPct.length) miss.push(`p.${n}:pct=${[...new Set(lostPct)].join("/")}`);
    const money = [...pdf.matchAll(/\$[\d,]+\.\d\d/g)].map((m) => m[0]);
    const lostMoney = money.filter((m) => !js.includes(m));
    if (lostMoney.length) miss.push(`p.${n}:money=${[...new Set(lostMoney)].join("/")}`);
  }
  console.log((r.date || "?").padEnd(11), r.id.slice(0, 46).padEnd(46), miss.length ? miss.join(" ") : "（无缺失）");
}

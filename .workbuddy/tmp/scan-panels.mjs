import fs from "node:fs";
import path from "node:path";

const dir = "corpus/materials";
const ids = fs.readdirSync(dir).filter((d) => fs.existsSync(path.join(dir, d, "pages.json")));

const R = {
  msPT: /Consensus\s+Price\s+Target\s+Distribution/i,
  consPT: /Consensus\s+(Price\s+)?Target|Street\s+PT|Avg\.?\s+PT|Average\s+PT/i,
  consEst: /Consensus\s+(EPS|Revenue|Estimate|Estimates|Sales|EBITDA)/i,
  msrr: /Risk\s+Reward/i,
};

const hits = [];
for (const id of ids) {
  let pages = [];
  try {
    pages = JSON.parse(fs.readFileSync(path.join(dir, id, "pages.json"), "utf8")).pages || [];
  } catch {
    continue;
  }
  for (const g of pages) {
    const t = g.text || "";
    const s = {};
    for (const k of Object.keys(R)) if (R[k].test(t)) s[k] = true;
    const meta = JSON.parse(fs.readFileSync(path.join(dir, id, "meta.json"), "utf8"));
    if (s.msPT || (s.consPT && s.msrr) || s.consEst) {
      // 抓该页出现的公司名与目标价（粗筛，供人工核）
      const pt = (t.match(/\$(\d{2,4})\.00\s*PRICE\s*TARGET/i) || [])[1] || "";
      hits.push({ id, date: meta.date, p: g.n, ...s, pt });
    }
  }
}
console.log("pages:", hits.length, "materials:", new Set(hits.map((h) => h.id)).size);
const byKind = {
  msPT: hits.filter((h) => h.msPT).length,
  consPT: hits.filter((h) => h.consPT && !h.msPT).length,
  consEst: hits.filter((h) => h.consEst).length,
};
console.log(byKind);
fs.writeFileSync(".workbuddy/tmp/agg-panels.json", JSON.stringify(hits, null, 1));
for (const h of hits.filter((x) => x.msPT).slice(0, 40))
  console.log("MS-PT", h.id.slice(0, 50).padEnd(50), h.date, "p." + String(h.p).padStart(3), "PT", h.pt);

import fs from "node:fs";
import path from "node:path";

const batch = JSON.parse(fs.readFileSync(".workbuddy/tmp/meta-batch.json", "utf8"));
const rows = [];

for (const r of batch) {
  const d = path.join("corpus/materials", r.id);
  const pages = JSON.parse(fs.readFileSync(path.join(d, "pages.json"), "utf8")).pages;
  const byN = new Map(pages.map((g) => [g.n, g.text || ""]));
  const rec = { id: r.id, date: r.date, panel: r.pt[0] };

  for (const n of r.pt) {
    const t = byN.get(n) || "";
    const ow = t.match(/(\d{1,3})%\s*Overweight/i);
    const eq = t.match(/(\d{1,3})%\s*Equal-weight/i);
    const un = t.match(/(\d{1,3})%\s*Underweight/i) || t.match(/(\d{1,3})%\s*\n?\s*Underweight/i);
    if (ow) rec.ow = ow[1];
    if (eq) rec.eq = eq[1];
    if (un) rec.un = un[1];
    const monies = [...t.matchAll(/\$([\d,]+\.\d\d)/g)].map((m) => m[1]);
    if (monies.length) rec.money = [...new Set(monies)];
    // 一致目标价分布的两端标注：紧跟在面板标题之后出现的两个金额
    const seg = t.split(/Consensus\s+Price\s+Target\s+Distribution/)[1] || "";
    const ends = [...seg.matchAll(/\$([\d,]+\.\d\d)/g)].map((m) => m[1]).slice(0, 2);
    if (ends.length === 2) rec.ends = ends;
  }
  // 自家评级与目标价
  for (const g of pages) {
    const t = g.text || "";
    if (!/Meta\s+Platforms/i.test(t)) continue;
    const pt = t.match(/\$([\d,]+)\.00\s*(?:\n|\s)*PRICE\s*TARGET/i);
    if (pt && !rec.msPT) {
      rec.msPT = pt[1];
      const rt = t.match(/\b(OVERWEIGHT|EQUAL-WEIGHT|UNDERWEIGHT)\b/);
      if (rt) rec.msRating = rt[1];
    }
  }
  // 披露时点（评级分布表的 as of）
  for (const g of pages) {
    const t = g.text || "";
    const m = t.match(/[Aa]s of ([A-Z][a-z]+ \d{1,2},? \d{4})/);
    if (m) {
      rec.asOf = m[1];
      break;
    }
  }
  rows.push(rec);
}

rows.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
fs.writeFileSync(".workbuddy/tmp/consensus-series.json", JSON.stringify(rows, null, 1));
console.log("date        OW  EW  UW | 分布两端($) | MS PT | MS评级 | 披露时点 | 面板页");
for (const r of rows) {
  console.log(
    [
      (r.date || "?").padEnd(11),
      (r.ow ?? "-").padStart(3),
      (r.eq ?? "-").padStart(3),
      (r.un ?? "-").padStart(3),
      "|",
      (r.ends ? r.ends.join(" ~ ") : "-").padEnd(18),
      "|",
      (r.msPT ?? "-").padStart(6),
      "|",
      (r.msRating ?? "-").padEnd(11),
      "|",
      (r.asOf ?? "-").padEnd(18),
      "|",
      "p." + r.panel,
    ].join(" "),
  );
}

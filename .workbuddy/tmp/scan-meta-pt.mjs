import fs from "node:fs";
import path from "node:path";

const dir = "corpus/materials";
const ids = fs.readdirSync(dir).filter((d) => fs.existsSync(path.join(dir, d, "pages.json")));
const rows = [];
for (const id of ids) {
  let pages = [];
  try {
    pages = JSON.parse(fs.readFileSync(path.join(dir, id, "pages.json"), "utf8")).pages || [];
  } catch {
    continue;
  }
  const meta = JSON.parse(fs.readFileSync(path.join(dir, id, "meta.json"), "utf8"));
  for (const g of pages) {
    const t = g.text || "";
    if (!/Consensus\s+Price\s+Target\s+Distribution/i.test(t)) continue;
    if (!/Meta\s+Platforms/i.test(t)) continue;
    const pt = (t.match(/\$(\d{2,4})\.00\s*PRICE\s*TARGET/i) || [])[1] || "";
    const rating = (t.match(/OVERWEIGHT|EQUAL-WEIGHT|UNDERWEIGHT|BUY|HOLD|SELL/g) || []).join("/");
    rows.push({ id, date: meta.date, p: g.n, pt, rating, len: t.length });
  }
}
rows.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
console.log("META consensus-PT pages:", rows.length, "materials:", new Set(rows.map((r) => r.id)).size);
for (const r of rows) console.log(r.date, r.id.slice(0, 50).padEnd(50), "p." + String(r.p).padStart(3), "PT", (r.pt || "-").padEnd(4), r.rating.slice(0, 40));
fs.writeFileSync(".workbuddy/tmp/meta-cons-pt.json", JSON.stringify(rows, null, 1));

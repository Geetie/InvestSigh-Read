import fs from "node:fs";
const root = "D:/InvestSigh/InvestSigh-Read";
const dirs = fs.readdirSync(root + "/output/meta").filter((d) => d.startsWith("03-independent"));
let total = 0;
const rows = [];
for (const d of dirs) {
  const f = root + "/output/meta/" + d + "/material.md";
  const t = fs.readFileSync(f, "utf8");
  const m = t.match(/source_pages:\s*(\d+)/);
  const p = m ? +m[1] : 0;
  let size = 0;
  let figs = 0;
  try {
    size = fs.statSync(root + "/corpus/materials/" + d + "/content.md").size;
  } catch (e) {}
  try {
    figs = fs.readdirSync(root + "/corpus/materials/" + d + "/figures").length;
  } catch (e) {}
  rows.push({ d, p, kb: Math.round(size / 1024), figs });
  total += p;
}
rows.sort((a, b) => b.p - a.p);
console.log("dirs", dirs.length, "total pages", total);
console.log("largest:");
rows.slice(0, 12).forEach((r) => console.log("  ", r.p, "p", r.kb, "KB", r.figs, "figs", r.d));
console.log("smallest:");
rows.slice(-5).forEach((r) => console.log("  ", r.p, "p", r.kb, "KB", r.figs, "figs", r.d));
const buckets = [0, 10, 20, 40, 80, 200, 400];
for (let i = 0; i < buckets.length - 1; i++) {
  const c = rows.filter((r) => r.p >= buckets[i] && r.p < buckets[i + 1]).length;
  console.log("pages", buckets[i] + "-" + buckets[i + 1], ":", c);
}
const totalKB = rows.reduce((s, r) => s + r.kb, 0);
console.log("total content.md KB", totalKB);

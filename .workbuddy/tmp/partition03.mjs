import fs from "node:fs";
const root = "D:/InvestSigh/InvestSigh-Read";
const done = new Set(
  fs
    .readdirSync(root + "/output/meta")
    .filter((d) => d.startsWith("03-independent"))
    .filter((d) => {
      const t = fs.readFileSync(root + "/output/meta/" + d + "/material.md", "utf8");
      const body = t
        .split(/^## /m)
        .slice(1)
        .map((s) => s.split(/^### 依据/m)[0].replace(/^[^\n]*\n/, "").trim());
      return body.filter((b) => b.length > 30).length >= 7;
    })
);
const dirs = fs
  .readdirSync(root + "/output/meta")
  .filter((d) => d.startsWith("03-independent"))
  .filter((d) => !done.has(d));

const famRules = [
  [/clustermax2bilingual/, "CM2-BI"],
  [/2025-11-07-ClusterMAX2/, "CM2-EN"],
  [/100kh100clusters/, "CM1"],
  [/AgenticReality|260923智能体时代/, "AGENTIC"],
  [/metasuperintelligence/, "SUPER"],
  [/Meta超级智能的未来一年进展|2026-07-10-META-1yrProgress/, "SUPER1Y"],
  [/metainfraculturereset|2026-07-21-META-InfraCultureReset/, "INFRACULT"],
  [/metamsl1yr/, "MSL1Y"],
  [/metacomputeneocloud|2026-07-01|2026-07-03|2026-07-06/, "NEOCLOUD"],
  [/metabizarreaiinfrachoice/, "BIZARRE"],
  [/metacustomsilicon/, "CUSTOMSIL"],
  [/metaaihardwarecpo/, "CPO"],
  [/2026-01-26/, "PREVIEW4Q25"],
  [/2026-01-29/, "REVIEW4Q25"],
  [/2026-09-21/, "DEEPMUSE"],
  [/2026-10-08/, "MUSERET"],
  [/q32022semiroundup/, "Q3SEMI"],
];
function famOf(id) {
  for (const [re, k] of famRules) if (re.test(id)) return k;
  return id;
}
const rows = dirs.map((d) => {
  const t = fs.readFileSync(root + "/output/meta/" + d + "/material.md", "utf8");
  const m = t.match(/source_pages:\s*(\d+)/);
  const p = m ? +m[1] : 0;
  let kb = 0;
  try {
    kb = Math.round(fs.statSync(root + "/corpus/materials/" + d + "/content.md").size / 1024);
  } catch (e) {}
  return { d, p, kb, fam: famOf(d) };
});
const famMap = new Map();
for (const r of rows) {
  if (!famMap.has(r.fam)) famMap.set(r.fam, { fam: r.fam, p: 0, kb: 0, ids: [] });
  const f = famMap.get(r.fam);
  f.p += r.p;
  f.kb += r.kb;
  f.ids.push(r.d);
}
const fams = [...famMap.values()].sort((a, b) => b.kb - a.kb);
console.log("units", fams.length, "total pages", fams.reduce((s, f) => s + f.p, 0), "total KB", fams.reduce((s, f) => s + f.kb, 0));
const NB = +(process.argv[2] || 13);
const bins = Array.from({ length: NB }, () => ({ fams: [], p: 0, kb: 0 }));
for (const f of fams) {
  bins.sort((a, b) => a.kb - b.kb);
  const b = bins[0];
  b.fams.push(f);
  b.p += f.p;
  b.kb += f.kb;
}
bins.forEach((b, i) => {
  console.log("\n== BIN " + (i + 1) + "  " + b.p + "p  " + b.kb + "KB  " + b.fams.length + " units");
  b.fams.forEach((f) => console.log("   [" + f.p + "p/" + f.kb + "KB] " + f.fam + " :: " + f.ids.join(" | ")));
});

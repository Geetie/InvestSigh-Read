import fs from "node:fs";
const root = "D:/InvestSigh/InvestSigh-Read";
const done = new Set([
  "03-independent-research-2026-01-26-META-Preview4Q25",
  "03-independent-research-2026-01-29-META-Review4Q25",
  "03-independent-research-2026-07-01-META-NeoCloudVsRent",
  "03-independent-research-2026-07-03-META-ComputeNeocloud",
  "03-independent-research-2026-07-10-META-1yrProgress",
  "03-independent-research-2026-07-21-META-InfraCultureReset",
  "03-independent-research-2026-09-21-META-DeepMuse",
  "03-independent-research-2026-10-08-META-MuseRetention",
]);
const dirs = fs
  .readdirSync(root + "/output/meta")
  .filter((d) => d.startsWith("03-independent"))
  .filter((d) => !done.has(d));

const rules = [
  [/100kh100clusters/, "H100CLUSTERS"],
  [/AgenticReality|260923智能体时代/, "AGENTIC"],
  [/FUNDAWeeklyConsumerAgentsT/, "FUNDA-VOL5"],
  [/clustermax2bilingual/, "CM2-BI"],
  [/2025-11-07-ClusterMAX2/, "CM2-EN"],
  [/gpt4architecture/, "GPT4"],
  [/metaaihardwarecpo/, "CPO"],
  [/metabizarreaiinfrachoice/, "BIZARRE"],
  [/metacomputeneocloud|2026-07-03-MetaComputeEveryoneWantsTo/, "NEOCLOUD-SA"],
  [/2026-07-01-260701|2026-07-01-火速/, "NEOCLOUD-FUNDA"],
  [/2026-07-06/, "FUNDA-JUL06"],
  [/metacustomsilicon/, "CUSTOMSIL"],
  [/metainfraculturereset/, "INFRACULT"],
  [/metasuperintelligence(?!.*1yr)/, "SUPER"],
  [/metamsl1yr|2026-07-10-Meta超级智能/, "SUPER1Y"],
  [/q32022semiroundup/, "Q3SEMI"],
  [/scalinglawso1p/, "SCALING"],
  [/2026-01-26-260126/, "PREVIEW4Q25"],
  [/2026-01-29-260129/, "REVIEW4Q25"],
  [/2026-02-05/, "SHIXIANG"],
  [/2026-03-15/, "FUNDA-MAR15"],
  [/2026-04-13/, "FUNDA-APR13"],
  [/2026-04-27/, "FUNDA-TIKTOK"],
  [/2026-05-04/, "FUNDA-APP"],
  [/2026-05-05/, "STRATECHERY-MAY"],
  [/2026-06-29/, "EXPV"],
  [/2026-07-08/, "ANTHROPIC"],
  [/2026-07-13/, "FUNDA-JUL13"],
  [/2026-07-20/, "CITRINI-JUL20"],
  [/2026-08-03/, "FUNDA-AUG03"],
  [/2026-08-07/, "GEMINI-GCP"],
  [/2026-09-11/, "MUSE-SELLERS"],
  [/2026-09-14-OpenAI/, "STRATECHERY-SEP"],
  [/2026-09-14-RSI/, "RSI"],
  [/2026-09-21/, "DEEPMUSE"],
  [/2026-10-08/, "MUSERET"],
  [/2025-11-13/, "MSFT"],
  [/2025-11-24/, "BENEVANS"],
  [/2025-11-28/, "TPUV7"],
  [/2025-12-31/, "GAS"],
  [/2026-01-05/, "FUNDA-JAN05"],
  [/2026-01-07/, "RL"],
];
const famOf = (id) => (rules.find(([re]) => re.test(id)) || [null, id])[1];

const rows = dirs.map((d) => {
  const t = fs.readFileSync(root + "/output/meta/" + d + "/material.md", "utf8");
  const p = +(t.match(/source_pages:\s*(\d+)/)?.[1] || 0);
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
const NB = +(process.argv[2] || 12);
const bins = Array.from({ length: NB }, () => ({ fams: [], p: 0, kb: 0 }));
for (const f of fams) {
  bins.sort((a, b) => a.kb - b.kb);
  const b = bins[0];
  b.fams.push(f);
  b.p += f.p;
  b.kb += f.kb;
}
console.log("units", fams.length, "files", rows.length, "pages", fams.reduce((s, f) => s + f.p, 0), "KB", fams.reduce((s, f) => s + f.kb, 0));
bins.forEach((b, i) => {
  console.log("\n== BIN " + (i + 1) + "  " + b.p + "p  " + b.kb + "KB");
  b.fams.forEach((f) => console.log("   [" + f.p + "p/" + f.kb + "KB] " + f.fam + " :: " + f.ids.map((x) => x.replace("03-independent-research-", "")).join(" | ")));
});

import fs from "node:fs";
import path from "node:path";

const dir = "corpus/materials";
const ids = fs.readdirSync(dir).filter((d) => fs.existsSync(path.join(dir, d, "pages.json")));

const pats = {
  streetHL: /street\s+(high|low)|high\s*\/\s*low|mean\s+target|average\s+price\s+target|consensus\s+(price\s+)?target|consensus\s+PT/i,
  nEst: /#\s*of\s+est|number\s+of\s+analysts|analysts?\s+covering|\b\d{1,2}\s+analysts\b/i,
  sd: /standard\s+deviation|std\.?\s*dev|dispersion/i,
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
    for (const k of Object.keys(pats)) if (pats[k].test(t)) s[k] = true;
    if (s.streetHL || (s.nEst && /consensus/i.test(t))) hits.push({ id, p: g.n, ...s });
  }
}
console.log("candidate pages:", hits.length);
fs.writeFileSync(".workbuddy/tmp/multi-firm.json", JSON.stringify(hits, null, 1));
for (const h of hits.slice(0, 50))
  console.log(h.id.slice(0, 54).padEnd(54), "p." + String(h.p).padStart(3), JSON.stringify({ s: h.streetHL, n: h.nEst, d: h.sd }));

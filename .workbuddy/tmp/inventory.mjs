import fs from "node:fs";
import path from "node:path";

const dir = "corpus/materials";
const ids = fs.readdirSync(dir).filter((d) => fs.existsSync(path.join(dir, d, "pages.json")));

/** 五类聚合签名 —— 全部按"页"判定，因为同一份材料里聚合只占一两页 */
const SIG = {
  /** MS：Coverage Universe 三件表（含家数） */
  msTable: /Coverage Universe/i,
  /** Bernstein：DISTRIBUTION OF EQUITY RATINGS */
  bernTable: /DISTRIBUTION OF EQUITY RATINGS/i,
  /** 泛用：评级分布 + 投行关系 */
  generic: /[Rr]atings?\s+Distribution/i,
  /** MS：Refinitiv 一致目标价分布图 */
  consPT: /Consensus\s+Price\s+Target\s+Distribution/i,
  /** 一致预期表字段 */
  consEst: /Consensus\s+(EPS|Revenue|Estimate|Estimates|Sales|EBITDA)/i,
};

const inv = [];
for (const id of ids) {
  let pages = [];
  let meta = {};
  try {
    pages = JSON.parse(fs.readFileSync(path.join(dir, id, "pages.json"), "utf8")).pages || [];
    meta = JSON.parse(fs.readFileSync(path.join(dir, id, "meta.json"), "utf8"));
  } catch {
    continue;
  }
  const hit = { id, date: meta.date, pageCount: meta.pageCount, pages: {}, notes: [] };
  for (const g of pages) {
    const t = g.text || "";
    for (const k of Object.keys(SIG)) {
      if (!SIG[k].test(t)) continue;
      (hit.pages[k] ??= []).push(g.n);
      if (k === "consPT" && !/Meta\s+Platforms/i.test(t)) hit.notes.push(`p.${g.n} 共识图非 META`);
    }
  }
  if (Object.keys(hit.pages).length) inv.push(hit);
}

fs.writeFileSync(".workbuddy/tmp/agg-inventory.json", JSON.stringify(inv, null, 1));

const meta = (h) => h.pages.msTable || h.pages.bernTable || h.pages.generic;
const withTable = inv.filter(meta);
const withPT = inv.filter((h) => h.pages.consPT);
const withBoth = inv.filter((h) => meta(h) && h.pages.consPT);

console.log("材料总数", ids.length);
console.log("含评级分布表（有家数/占比）", withTable.length);
console.log("含一致目标价分布图", withPT.length);
console.log("两者都有", withBoth.length);
console.log("含一致预期表字段", inv.filter((h) => h.pages.consEst).length);
console.log("\n=== 两者都有的材料（本型最强候选）===");
for (const h of withBoth.sort((a, b) => (a.date || "").localeCompare(b.date || "")))
  console.log((h.date || "?").padEnd(11), h.id.slice(0, 52).padEnd(52), "p" + h.pageCount, "表p" + meta(h).join(","), "图p" + h.pages.consPT.join(","));

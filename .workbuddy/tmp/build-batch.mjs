import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const dir = "corpus/materials";
const ids = fs.readdirSync(dir).filter((d) => fs.existsSync(path.join(dir, d, "pages.json")));

const rows = [];
const hashOf = new Map();
for (const id of ids) {
  const p = JSON.parse(fs.readFileSync(path.join(dir, id, "pages.json"), "utf8"));
  const h = crypto.createHash("sha1").update(p.pages.map((g) => g.text || "").join("\u0001")).digest("hex").slice(0, 12);
  hashOf.set(id, h);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, id, "meta.json"), "utf8"));
  const M = { table: [], pt: [] };
  for (const g of p.pages) {
    const t = g.text || "";
    if (/Coverage Universe|DISTRIBUTION OF EQUITY RATINGS|[Rr]atings?\s+Distribution/.test(t)) M.table.push(g.n);
    if (/Consensus\s+Price\s+Target\s+Distribution/.test(t) && /Meta\s+Platforms/i.test(t)) M.pt.push(g.n);
  }
  if (!M.pt.length) continue;
  // META 自家评级与目标价（首页或风险收益页）
  const pt = (() => {
    for (const g of p.pages) {
      const t = g.text || "";
      const m = t.match(/^\$([\d,.]+)\.00\s*\n?\s*PRICE\s*TARGET/m) || t.match(/\$([\d,.]+)\.00\s*PRICE\s*TARGET/);
      if (m && /Meta\s+Platforms/i.test(t)) return { page: g.n, pt: m[1] };
    }
    return {};
  })();
  rows.push({ id, date: meta.date, pageCount: meta.pageCount, table: M.table, pt: M.pt, own: pt, hash: h });
}

// 去重：同一文本只留 id 字典序最小的一条
const byHash = new Map();
for (const r of rows) {
  const prev = byHash.get(r.hash);
  if (!prev || r.id < prev.id) byHash.set(r.hash, r);
}
const uniq = [...byHash.values()].sort((a, b) => (a.date || "").localeCompare(b.date || ""));
console.log("META 一致目标价分布图所在材料（去重后）", uniq.length);
for (const r of uniq)
  console.log((r.date || "?").padEnd(11), r.id.slice(0, 48).padEnd(48), "p" + String(r.pageCount).padStart(3), "表[" + r.table.join(",") + "]", "图[" + r.pt.join(",") + "]", "自家PT", r.own.pt || "-", "p" + (r.own.page || "-"));
fs.writeFileSync(".workbuddy/tmp/meta-batch.json", JSON.stringify(uniq, null, 1));

const dup = [];
for (const r of rows) {
  const others = rows.filter((x) => x.hash === r.hash && x.id > r.id);
  for (const o of others) dup.push([r.id, o.id]);
}
fs.writeFileSync(".workbuddy/tmp/dups.json", JSON.stringify([...new Set(dup.map((d) => d.join("|")))], null, 1));

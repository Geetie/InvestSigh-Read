import fs from "node:fs";
const root = "D:/InvestSigh/InvestSigh-Read";
const dirs = fs
  .readdirSync(root + "/output/meta")
  .filter((d) => d.startsWith("03-independent"))
  .sort();
const rows = [];
for (const id of dirs) {
  const t = fs.readFileSync(root + "/output/meta/" + id + "/material.md", "utf8");
  const secs = t.split(/^## /m).slice(1);
  const map = new Map();
  for (const s of secs) {
    const q = s.split(/\s/)[0];
    const ev = (s.split(/^### 依据/m)[1] || "").split(/^## /m)[0] || "";
    for (const m of ev.matchAll(/^-\s*p\.(\d+)\s*[｜|]\s*(.+)$/gm)) {
      const key = m[2].trim();
      if (key.length < 60) continue; // 只算实句
      if (!map.has(key)) map.set(key, new Set());
      map.get(key).add(q);
    }
  }
  let hard = 0;
  let soft = 0;
  for (const [, qs] of map) {
    if (qs.size >= 3) hard++;
    else if (qs.size === 2) soft++;
  }
  rows.push({ id, hard, soft });
}
rows.sort((a, b) => b.hard - a.hard || b.soft - a.soft);
for (const r of rows) if (r.hard || r.soft) console.log(String(r.hard).padStart(2), String(r.soft).padStart(2), r.id.replace("03-independent-research-", ""));

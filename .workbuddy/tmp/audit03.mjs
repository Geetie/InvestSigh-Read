import fs from "node:fs";
const root = "D:/InvestSigh/InvestSigh-Read";
const dirs = fs
  .readdirSync(root + "/output/meta")
  .filter((d) => d.startsWith("03-independent"))
  .sort();
const bad = [];
let totalRows = 0;
let totalBlocks = 0;
for (const d of dirs) {
  const f = root + "/output/meta/" + d + "/material.md";
  const t = fs.readFileSync(f, "utf8");
  const secs = t.split(/^## /m).slice(1);
  const rows = [];
  for (const s of secs) {
    const id = s.split(/\s/)[0];
    const body = s.split(/^### 依据/m)[0].replace(/^[^\n]*\n/, "").trim();
    const ev = (s.split(/^### 依据/m)[1] || "").split(/^## /m)[0] || "";
    const blocks = (ev.match(/^-\s*p\.\d+\s*[｜|]/gm) || []).length;
    rows.push({ id, len: body.length, blocks, body });
  }
  // page refs in body
  let pageRef = 0;
  for (const r of rows) if (/[\[（(]?\bp\.\d+/i.test(r.body) || /第\s*\d+\s*页/.test(r.body)) pageRef++;
  const answered = rows.filter((r) => r.len > 30).length;
  const emptyIds = rows.filter((r) => r.len <= 30).map((r) => r.id);
  // duplicate quotes across questions within a file
  const quotes = [];
  for (const s of secs) {
    const id = s.split(/\s/)[0];
    const ev = (s.split(/^### 依据/m)[1] || "").split(/^## /m)[0] || "";
    for (const m of ev.matchAll(/^-\s*p\.(\d+)\s*[｜|]\s*(.+)$/gm)) quotes.push({ id, q: m[2].trim().slice(0, 40) });
  }
  const seen = new Map();
  let dup = 0;
  for (const q of quotes) {
    if (seen.has(q.q)) dup++;
    else seen.set(q.q, q.id);
  }
  const sp = +(t.match(/source_pages:\s*(\d+)/)?.[1] || 0);
  let actual = 0;
  try {
    actual = JSON.parse(fs.readFileSync(root + "/corpus/materials/" + d + "/pages.json", "utf8")).pages.length;
  } catch (e) {}
  totalRows += answered;
  totalBlocks += rows.reduce((a, r) => a + r.blocks, 0);
  const flags = [];
  if (rows.length !== 8) flags.push("题数" + rows.length);
  if (answered < 8) flags.push("空答:" + emptyIds.join(","));
  if (pageRef) flags.push("正文含页码×" + pageRef);
  if (dup) flags.push("同句重复×" + dup);
  if (sp !== actual) flags.push(`pages声明${sp}/实际${actual}`);
  const short = rows.filter((r) => r.len > 30 && r.len < 120).map((r) => r.id + "(" + r.len + ")");
  if (short.length) flags.push("偏短:" + short.join(","));
  if (flags.length) bad.push({ d, flags: flags.join(" | ") });
}
console.log("total rows", totalRows, "total blocks", totalBlocks);
console.log("flags on", bad.length, "of", dirs.length);
for (const b of bad) console.log(" -", b.d.replace("03-independent-research-", ""), "::", b.flags);

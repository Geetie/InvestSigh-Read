import fs from "node:fs";
const root = "D:/InvestSigh/InvestSigh-Read";
const dirs = fs.readdirSync(root + "/output/meta").filter((d) => d.startsWith("03-independent"));
const changes = [];
for (const id of dirs) {
  const mf = root + "/output/meta/" + id + "/material.md";
  const meta = JSON.parse(fs.readFileSync(root + "/corpus/materials/" + id + "/meta.json", "utf8"));
  const t = fs.readFileSync(mf, "utf8");
  const m = t.match(/^source_pages:\s*(\d+)\s*$/m);
  const declared = m ? +m[1] : null;
  if (declared === null) continue;
  if (declared === meta.pageCount) continue;
  const pages = JSON.parse(fs.readFileSync(root + "/corpus/materials/" + id + "/pages.json", "utf8")).pages.length;
  // 取 meta.pageCount 与 pages.json 长度的较小者，保证每条引用都能落到真实页
  const target = Math.min(meta.pageCount, pages);
  const used = [...t.matchAll(/^-\s*p\.(\d+)\s*[｜|]/gm)].map((x) => +x[1]);
  const maxUsed = used.length ? Math.max(...used) : 0;
  changes.push({ id, declared, pageCount: meta.pageCount, pages, target, maxUsed });
}
console.log("mismatch", changes.length);
for (const c of changes) console.log(c.declared, "->", c.target, "| pageCount", c.pageCount, "| pages.json", c.pages, "| maxUsed", c.maxUsed, "|", c.id.slice(-34));

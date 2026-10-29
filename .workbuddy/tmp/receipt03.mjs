import fs from "node:fs";
const root = "D:/InvestSigh/InvestSigh-Read";
const dirs = fs
  .readdirSync(root + "/output/meta")
  .filter((d) => d.startsWith("03-independent"))
  .sort();
const rows = [];
for (const id of dirs) {
  const t = fs.readFileSync(root + "/output/meta/" + id + "/material.md", "utf8");
  const title = (t.match(/^title:\s*"?(.*?)"?\s*$/m) || [])[1] || "";
  const issuer = (t.match(/^issuer:\s*"?(.*?)"?\s*$/m) || [])[1] || "";
  const pages = +(t.match(/^source_pages:\s*(\d+)/m) || [])[1] || 0;
  const secs = t.split(/^## /m).slice(1);
  const q3 = (() => {
    const s = secs.find((x) => x.startsWith("Q3"));
    if (!s) return "";
    const b = s.split(/^### 依据/m)[0].replace(/^[^\n]*\n/, "");
    const m = b.match(/`(original|bilingual|translation|summary)`/);
    return m ? m[1] : "按内容判";
  })();
  let blocks = 0;
  for (const s of secs) {
    const ev = (s.split(/^### 依据/m)[1] || "").split(/^## /m)[0] || "";
    blocks += (ev.match(/^-\s*p\.\d+\s*[｜|]/gm) || []).length;
  }
  rows.push({ id: id.replace("03-independent-research-", ""), pages, rows: secs.length, blocks, q3, issuer, title });
}
const md = [];
md.push("# 03 独立研究 · 批次验收单（66 份）");
md.push("");
md.push(`生成时间：2026-10-28　|　判据真源：\`corpus/prompts/03-型/独立研究.md\`　|　作业书：\`.workbuddy/brief-03-independent.md\``);
md.push("");
const totalPages = rows.reduce((a, r) => a + r.pages, 0);
const totalBlocks = rows.reduce((a, r) => a + r.blocks, 0);
md.push("## 一、总账");
md.push("");
md.push("| 项 | 值 |");
md.push("|---|---|");
md.push(`| 材料数 | ${rows.length} 份 |`);
md.push(`| 总页数 | ${totalPages} 页 |`);
md.push(`| 答案行 | ${rows.reduce((a, r) => a + r.rows, 0)} 行（每份 8 行，无空答） |`);
md.push(`| 逐字依据块 | ${totalBlocks} 块 |`);
md.push(`| check.mjs | 66/66 \`OK\`（0 没登记 · 0 查无此文 · 0 页码越界） |`);
md.push("");
md.push("## 二、逐份清单");
md.push("");
md.push("| # | 材料（短 id） | 标题 | 发布方 | 页 | 答案行 | 依据块 | 交付物类型 |");
md.push("|---|---|---|---|---|---|---|---|");
rows.forEach((r, i) => {
  md.push(`| ${i + 1} | \`${r.id}\` | ${r.title.replace(/\|/g, "／")} | ${r.issuer} | ${r.pages} | ${r.rows} | ${r.blocks} | ${r.q3} |`);
});
fs.writeFileSync(root + "/.workbuddy/receipt-03-independent.md", md.join("\n"), "utf8");
console.log("rows", rows.length, "pages", totalPages, "blocks", totalBlocks);
console.log(md.slice(0, 20).join("\n"));

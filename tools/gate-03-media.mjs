/**
 * 03 媒体分析批的门禁 —— 补 `server/check.mjs` 的盲区。
 *
 * `check.mjs` 只查两件：有答案必须有块、块须逐字可核。
 * 它管不到「答案是不是两个字交差」：「未见。」也会判 OK，空答案根本不触发任何规则。
 * 本脚本查 check 管不到的那一半：答案厚度、「未见」裸写、正文页码、裸编号、
 * 同一段原文跨行复用、frontmatter 页数与 pages.json 对账。
 *
 *   node tools/gate-03-media.mjs            # 全部 03-media-analysis-*
 *   node tools/gate-03-media.mjs <材料 id>   # 单份
 *
 * 阳性对照（改脚本后先跑一遍）：拿一份空骨架跑，应当逐行报「没有答案」；
 * 拿填好的跑，应当「无待修项」。两边都不动才说明门禁真的在测东西。
 */
import fs from "node:fs";
import path from "node:path";
import { mdToMaterial } from "../server/parse-md.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "output", "meta");
const MAT = path.join(ROOT, "corpus", "materials");

const only = process.argv[2];
const ids = fs
  .readdirSync(OUT)
  .filter((d) => d.startsWith("03-media-analysis-"))
  .filter((d) => !only || d === only)
  .sort();

let problems = 0;
const say = (id, tag, msg) => {
  problems += 1;
  console.log(`  [${tag}] ${id.slice(0, 42)} :: ${msg}`);
};

for (const id of ids) {
  const md = fs.readFileSync(path.join(OUT, id, "material.md"), "utf8");
  const doc = mdToMaterial(md, id);
  const pj = JSON.parse(fs.readFileSync(path.join(MAT, id, "pages.json"), "utf8"));
  const short = id.slice(0, 42);

  const fmPages = Number((/^source_pages:\s*(\d+)/m.exec(md) || [])[1] || 0);
  if (fmPages !== pj.pageCount) say(id, "页数", `frontmatter ${fmPages} ≠ pages.json ${pj.pageCount}`);

  const rows = doc.sections;
  if (rows.length !== 7) say(id, "行数", `识别到 ${rows.length} 行，应为 7`);

  const seenQuotes = new Map();
  for (const s of rows) {
    const ans = (s.answer || "").trim();
    const blocks = s.blocks || [];
    if (!ans) {
      say(id, "空行", `${s.id} 没有答案`);
      continue;
    }
    const len = ans.replace(/\s/g, "").length;
    if (len < 80) say(id, "太薄", `${s.id} 答案仅 ${len} 字`);
    if (!blocks.length) say(id, "无依据", `${s.id} 有答案无依据块`);
    // 正文页码
    const bodyPage = /第\s*\d+\s*页|\[p\.\d+\]|（p\.\d+）/.exec(ans);
    if (bodyPage) say(id, "正文页码", `${s.id} 正文出现 ${bodyPage[0]}`);
    // 裸「未见。」
    if (/^未见。?$|^未见。?\s*$/m.test(ans) || /未见。\s*$/.test(ans) && len < 40) {
      say(id, "裸未见", `${s.id} 只有「未见」`);
    }
    // 序号裸编号
    if (/\bQ[1-7]\b|\bM-\d+\b/.test(ans)) say(id, "裸编号", `${s.id} 正文出现题号/格号`);
    for (const b of blocks) {
      const k = b.quote.replace(/\s/g, "");
      if (seenQuotes.has(k)) say(id, "重复引用", `${s.id} 与 ${seenQuotes.get(k)} 共用同一段原文`);
      else seenQuotes.set(k, s.id);
      if (b.quote.length < 12) say(id, "块过短", `${s.id} 依据仅 ${b.quote.length} 字：${b.quote}`);
    }
  }
  const filled = rows.filter((s) => (s.answer || "").trim()).length;
  const blocks = rows.reduce((a, s) => a + (s.blocks?.length ?? 0), 0);
  console.log(`${short}  行 ${filled}/7 · 块 ${blocks} · 平均 ${Math.round(
    rows.reduce((a, s) => a + (s.answer || "").replace(/\s/g, "").length, 0) / Math.max(filled, 1)
  )} 字`);
}

console.log(problems ? `\n共 ${problems} 处待修` : "\n无待修项");
process.exit(problems ? 1 : 0);

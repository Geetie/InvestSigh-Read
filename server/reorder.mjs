// 按映射重排问句表题行并改题号。用法：node server/reorder.mjs <分册路径> <起点行正则> <映射JSON>
// 映射：{ 新序: 旧序 }。题行 = 起点标记之后、下一个 "## " 标题之前、匹配 ^\|\s*Q?\d+\s*\| 的行。
import fs from "fs";
const [file, startRe, mapJson] = process.argv.slice(2);
const start = new RegExp(startRe);
const map = JSON.parse(mapJson); // 新序 -> 旧序
const lines = fs.readFileSync(file, "utf8").split("\n");
const startIdx = lines.findIndex(l => start.test(l));
if (startIdx < 0) { console.error("start marker not found"); process.exit(1); }
const rowRe = /^\|\s*(Q?)(\d+)\s*\|/;
let endIdx = lines.length;
for (let i = startIdx + 1; i < lines.length; i++) if (/^#{1,3} /.test(lines[i])) { endIdx = i; break; }
const idxs = [];
for (let i = startIdx; i < endIdx; i++) if (rowRe.test(lines[i])) idxs.push(i);
if (!idxs.length) { console.error("no question rows found"); process.exit(1); }
const rows = idxs.map(i => ({ i, text: lines[i], old: Number(lines[i].match(rowRe)[2]) }));
const qPrefix = lines[idxs[0]].match(rowRe)[1];
const byOld = new Map(rows.map(r => [r.old, r]));
for (const [ni, oi] of Object.entries(map)) {
  const r = byOld.get(Number(oi));
  if (!r) { console.error(`旧题 ${oi} 未找到`); process.exit(1); }
  r.newNo = Number(ni);
  r.text = r.text.replace(rowRe, `| ${qPrefix}${ni} |`);
}
const sorted = rows.slice().sort((a, b) => a.newNo - b.newNo);
idxs.forEach((lineIdx, k) => { lines[lineIdx] = sorted[k].text; });
fs.writeFileSync(file, lines.join("\n"));
console.log(`reordered ${rows.length} rows in ${file}`);
console.log(`新序(按旧号): ${sorted.map(r => r.old).join(", ")}`);

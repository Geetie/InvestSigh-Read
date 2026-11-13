/**
 * 逐题提案落库——把提案文件里的"读法列修改后全文"写进分册问句表读法列。
 * 用法：node server/apply-proposals.mjs [--dry]
 * 真源纪律：只改读法列（题干/需件/频次/篮子列不动）；恒等替换自然无 diff。
 */
import fs from "node:fs";
import path from "node:path";
import { parseManual, writeRows } from "./manual.mjs";

const DRY = process.argv.includes("--dry");
const ROOT = process.cwd();

const FILES = [
  "corpus/prompts/提案/02-业绩与沟通-逐题提案.md",
  "corpus/prompts/提案/03-卖方与共识-逐题提案.md",
];
// 册名 → 类目录（分册文件名 = 册名）
const CAT_OF = { "公司自己的话": "02", "别人的解读": "02", "旁证与读穿": "02",
  "投行研报": "03", "媒体分析": "03", "共识与评级档位": "03", "专家纪要与渠道交流": "03", "独立研究": "03" };

/* 解析提案文件 → [{ book, q, reading }] */
function parseProposals(file) {
  const text = fs.readFileSync(file, "utf-8");
  const out = [];
  let cur = null, inReading = false;
  for (const line of text.split(/\r?\n/)) {
    const h = /^###\s*〔(.+?)〕\s*(Q?\d+)\s*·/.exec(line);
    if (h) {
      if (cur && cur.reading) out.push(cur);
      cur = { book: h[1], q: h[2], reading: "" };
      inReading = false;
      continue;
    }
    if (!cur) continue;
    if (/^\s*[-*]\s*读法列修改后全文/.test(line)) { inReading = true; continue; }
    if (inReading) {
      if (/^###/.test(line) || (/^\s*[-*]\s*[^>]/.test(line) && !/^>/.test(line.trim()))) { inReading = false; continue; }
      const m = /^>?\s?(.*)$/.exec(line);
      if (cur.reading) cur.reading += "\n" + (m ? m[1] : line.trim());
      else cur.reading = (m ? m[1] : line.trim());
    }
  }
  if (cur && cur.reading) out.push(cur);
  return out;
}

let applied = 0, identical = 0, failed = [];
const all = FILES.flatMap((f) => parseProposals(path.join(ROOT, f)));
console.log(`提案解析：${all.length} 题（02+03）`);

for (const prop of all) {
  const cat = CAT_OF[prop.book];
  if (!cat) { failed.push(`${prop.book} Q${prop.q}: 无类映射`); continue; }
  const file = path.join(ROOT, "corpus/prompts", `${cat}-型`, `${prop.book}.md`);
  if (!fs.existsSync(file)) { failed.push(`${file}: 分册不存在`); continue; }
  const m = parseManual(file, cat, prop.book);
  const rows = m.rows ?? [];
  const norm = (s) => String(s).replace(/^Q/i, "").trim();
  const target = rows.find((r) => norm(r.id) === norm(prop.q));
  if (!target) { failed.push(`${prop.book} Q${prop.q}: 分册无此题（现有 id: ${rows.map(r=>r.id).join(",")}）`); continue; }
  const newReading = prop.reading.trim();
  if (!newReading) { failed.push(`${prop.book} Q${prop.q}: 读法全文为空`); continue; }
  const before = target.reading.trim();
  if (before === newReading) { identical++; continue; }
  target.reading = newReading;
  if (!DRY) writeRows(file, rows);
  applied++;
}

console.log(`${DRY ? "[dry] " : ""}落库 ${applied} 题、恒等 ${identical} 题、失败 ${failed.length}`);
failed.forEach((f) => console.log(" FAIL", f));
if (DRY) console.log("(dry-run 未写文件)");

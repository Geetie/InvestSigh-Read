#!/usr/bin/env node
/**
 * 自检：手册解析器能不能把 33 册的问句表都读出来，读出来的行数/列对不对。
 *
 *   node tools/check-manual-parse.mjs           # 概览
 *   node tools/check-manual-parse.mjs --detail  # 每册前两行
 */
import { listManuals, parseManual, buildSlugMap } from "../server/manual.mjs";
import fs from "node:fs";

const detail = process.argv.includes("--detail");
const manuals = listManuals();
const tax = JSON.parse(fs.readFileSync("server/data/taxonomy.json", "utf8"));
const { map: slugMap, unmatched } = buildSlugMap(tax, manuals);

let shapeA = 0,
  shapeB = 0,
  none = 0,
  total = 0;
const bad = [];

for (const m of manuals) {
  const p = parseManual(m.file, m.cat, m.stem);
  const slug = slugMap.get(m.stem);
  if (p.noTable) {
    none++;
    bad.push(`${m.cat}/${m.stem}  ✗ 无表`);
    continue;
  }
  if (p.shape === "A") shapeA++;
  else shapeB++;
  total += p.rows.length;

  const line =
    `${(slug ?? "—").padEnd(22)} ${(m.cat + "/" + m.stem).padEnd(24)}` +
    ` ${p.shape}  ${String(p.rows.length).padStart(2)} 行` +
    ` 问题列=${p.labelCol + 1} 读法列=${p.readingCol + 1}` +
    ` [${p.header.join("·").slice(0, 46)}]`;
  console.log(line);
  if (detail) {
    p.rows.slice(0, 2).forEach((r) => {
      console.log(`      ${r.id}: 问「${r.label.slice(0, 40)}」 / 读「${r.reading.slice(0, 40)}」`);
    });
  }
}

console.log(`\n共 ${manuals.length} 册：形状A ${shapeA} · 形状B ${shapeB} · 无表 ${none}`);
console.log(`问句行合计 ${total}`);
if (unmatched.length) console.log(`未映射到 slug 的册：${unmatched.join(" · ")}`);
if (bad.length) {
  console.log("\n有问题的：");
  bad.forEach((b) => console.log("  " + b));
}

#!/usr/bin/env node
/**
 * 模板重生成器 —— 「模板 = 手册问句表的生成物」这一契约的落地工具。
 *
 *   node tools/gen_template.mjs --sub <型slug>            重出这一型
 *   node tools/gen_template.mjs --all                     重出全部型（有手册的）
 *
 * 做的事：
 *   1. readPromptSet(slug) 读手册问句表（唯一真源）；
 *   2. renderTemplate() 现场渲染答题卡（行 id = 手册行 id，Q1… 或 1…）；
 *   3. 写 corpus/templates/<类id>-<型名>.md（store.templatePath 的首选路径）。
 *
 * ★ 为什么必须有这个工具：自动化 prompt 让 agent「从 corpus/templates/ 拿模板，
 *   没有就用本工具生成」。旧模板是 S0n 手工编号、部分退化成通用脚手架，
 *   与手册问句表（Q1… / 1…）对不上 → 材料答案键全部落空、矩阵全空。
 *   模板从此只从手册生成，不许手写（INTEGRATION.md 同款约定）。
 */
import fs from "node:fs";
import path from "node:path";
import { PATHS, loadTaxonomy } from "../server/store.mjs";
import { readPromptSet } from "../server/promptsource.mjs";
import { renderTemplate } from "../server/template.mjs";

const argv = process.argv.slice(2);
const arg = (k) => {
  const i = argv.indexOf(`--${k}`);
  return i >= 0 ? argv[i + 1] : undefined;
};
const all = argv.includes("--all");
const sub = arg("sub");

if (!all && !sub) {
  console.error("用法：node tools/gen_template.mjs --sub <型slug>  |  --all [--force]");
  process.exit(1);
}
const force = argv.includes("--force");

const tax = loadTaxonomy();
const targets = [];
for (const c of tax.cats ?? []) {
  for (const s of c.subtypes ?? []) {
    if (all || s.id === sub) targets.push({ cat: c, s });
  }
}
if (!targets.length) {
  console.error(`taxonomy 里没有这个型：${sub}`);
  process.exit(1);
}

let ok = 0;
const failed = [];
for (const { cat, s } of targets) {
  let set;
  try {
    set = readPromptSet(s.id);
  } catch {
    set = null;
  }
  if (!set || !set.rows?.length) {
    failed.push(`${s.id}（没有手册问句表）`);
    continue;
  }
  const md = renderTemplate({
    subId: s.id,
    cat: cat.id,
    version: 2,
    rows: set.rows,
    oneLiner: s.oneLiner ?? "",
  });
  /* 文件名净化：型名可能带 / 等非法字符（如「招股书 S-1 / S-3」） */
  const safeName = s.name.replace(/[\\/:*?"<>|]/g, "");
  const file = path.join(PATHS.templatesDir, `${cat.id}-${safeName}.md`);
  if (fs.existsSync(file) && !force) {
    console.error(`  跳过（已存在，加 --force 覆盖）：${path.relative(PATHS.templatesDir, file)}`);
    continue;
  }
  fs.writeFileSync(file, md, "utf8");
  ok += 1;
  console.log(`  ✓ ${s.id} → ${path.relative(PATHS.templatesDir, file)}（${set.rows.length} 行，行id ${set.rows[0].id}…）`);
}
console.log(`完成 ${ok} 份${failed.length ? `；失败 ${failed.length}：${failed.join("；")}` : ""}`);

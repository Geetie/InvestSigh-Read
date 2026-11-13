#!/usr/bin/env node
/**
 * 存量材料 S-id → 手册行 id 重映射（只动标题编号，不动任何答案内容）。
 *
 * 规则：材料里 `## S<n> · <题面>`（n≥2）只有当
 *   1) 手册第 n-2 行存在，且
 *   2) 归一化题面 == 归一化手册行题面（逐字一致，忽略加粗/空白/全半角）
 * 才把 `S<n>` 改成该行 id。不一致的一律不动、逐条列出 —— 重映射必须可核。
 */
import fs from "node:fs";
import path from "node:path";
import { PATHS, listTickerDirs } from "../server/store.mjs";
import { readPromptSet } from "../server/promptsource.mjs";

const norm = (s) =>
  s.normalize("NFKC").replace(/[\s*＊·、，。：:？?！!（）()""''"'"—－\-]/g, "").toLowerCase();

const HEAD = /^## (S(\d+))([ ·:：-]+)(.*)$/;
let files = [];
for (const t of listTickerDirs()) {
  const dir = path.join(PATHS.output, t);
  for (const id of fs.readdirSync(dir)) {
    const f = path.join(dir, id, "material.md");
    if (fs.existsSync(f)) files.push(f);
  }
}

let totalRemapped = 0, touchedFiles = 0;
const skipped = [];
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  if (!/^## S\d+/m.test(src)) continue;
  const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(src)[1];
  const sub = /^sub:\s*"?([\w-]+)/m.exec(fm)?.[1];
  if (!sub) { skipped.push([f, "无 sub"]); continue; }
  let rows;
  try { rows = readPromptSet(sub)?.rows ?? []; } catch { rows = []; }
  if (!rows.length) { skipped.push([f, `手册无行：${sub}`]); continue; }

  let remapped = 0; const unmatched = [];
  const out = src.split(/\r?\n/).map((line) => {
    const h = HEAD.exec(line);
    if (!h) return line;
    const [, sid, nStr, sep, text] = h;
    const n = Number(nStr);
    if (n < 2) return line; // S00/S01 是情景卡/认知增量，手册里没有对应行，保留
    const row = rows[n - 2];
    if (!row || norm(text) !== norm(row.label)) {
      unmatched.push(`${sid}→?（题面不一致）`);
      return line;
    }
    if (row.id !== sid) remapped += 1;
    return `## ${row.id}${sep}${text}`;
  }).join("\n");

  if (remapped > 0) {
    fs.writeFileSync(f, out, "utf8");
    touchedFiles += 1; totalRemapped += remapped;
    console.log(`✓ ${path.relative(PATHS.output, f)}：重映射 ${remapped} 节${unmatched.length ? `；未动 ${unmatched.length} 节（${unmatched.join("、")}）` : ""}`);
  } else if (unmatched.length) {
    console.log(`— ${path.relative(PATHS.output, f)}：0 节可映射（${unmatched.slice(0, 3).join("、")}${unmatched.length > 3 ? "…" : ""}）`);
  }
}
console.log(`\n共改 ${touchedFiles} 份文件、${totalRemapped} 个节标题；跳过 ${skipped.length} 份`);
for (const [f, why] of skipped) console.log(`  跳过 ${path.relative(PATHS.output, f)}：${why}`);

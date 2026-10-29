#!/usr/bin/env node
/**
 * 原文取用与依据核验小工具（给填材料的 agent 用，零依赖）。
 *
 *   node tools/src.mjs page   <材料 id> <n|n-m>        # 打印该页原文（带 p.N 行首）
 *   node tools/src.mjs grep   <材料 id> <正则> [-i] [-C 1] [-p 27]
 *   node tools/src.mjs verify <材料 id> <片段.md>      # 逐块核验 `- p.N｜原文`
 *   node tools/src.mjs pages  <材料 id>                # 各页字数与首行
 *
 * verify 与 server/validate.mjs 用同一套归一化（去空白、引号统一），
 * 退出码 0 = 全部可核；1 = 有块搜不到。
 */
import fs from "node:fs";
import path from "node:path";
import { parseSections } from "../server/parse-md.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const MAT = path.join(ROOT, "corpus", "materials");

const norm = (s) =>
  String(s)
    .replace(/\s+/g, "")
    .replace(/[“”„‟"＂]/g, '"')
    .replace(/[‘’]/g, "'");

function load(id) {
  const f = path.join(MAT, id, "pages.json");
  if (!fs.existsSync(f)) {
    console.error(`没有这份材料：${f}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(f, "utf8"));
}

const argv = process.argv.slice(2);
const cmd = argv[0];
const id = argv[1];

if (!cmd || !id) {
  console.error("用法：node tools/src.mjs <page|grep|verify|pages> <材料 id> [参数]");
  process.exit(1);
}

const doc = load(id);
const pages = doc.pages ?? [];

if (cmd === "pages") {
  for (const p of pages) {
    const head = String(p.text).replace(/\s+/g, " ").trim().slice(0, 100);
    console.log(`${String(p.n).padStart(3)}  ${String(p.text.length).padStart(7)}  ${head}`);
  }
  process.exit(0);
}

if (cmd === "page") {
  const spec = argv[2];
  if (!spec) {
    console.error("用法：node tools/src.mjs page <材料 id> <n|n-m>");
    process.exit(1);
  }
  const [a, b] = spec.split("-").map(Number);
  const lo = a;
  const hi = Number.isFinite(b) ? b : a;
  for (const p of pages) {
    if (p.n < lo || p.n > hi) continue;
    console.log(`\n===== p.${p.n} =====`);
    console.log(p.text);
  }
  process.exit(0);
}

if (cmd === "grep") {
  const pat = argv[2];
  if (!pat) {
    console.error('用法：node tools/src.mjs grep <材料 id> <正则> [-i] [-C 1] [-p 27]');
    process.exit(1);
  }
  const ci = argv.includes("-i");
  const ciAt = argv.indexOf("-C");
  const ctx = ciAt > 0 ? Number(argv[ciAt + 1]) : 0;
  const pAt = argv.indexOf("-p");
  const onlyPage = pAt > 0 ? Number(argv[pAt + 1]) : 0;
  const re = new RegExp(pat, ci ? "i" : "");
  let hits = 0;
  for (const p of pages) {
    if (onlyPage && p.n !== onlyPage) continue;
    const lines = String(p.text).split(/\r?\n/);
    const show = new Set();
    lines.forEach((l, i) => {
      if (re.test(l)) for (let k = i - ctx; k <= i + ctx; k++) if (k >= 0 && k < lines.length) show.add(k);
    });
    if (!show.size) continue;
    console.log(`\n--- p.${p.n} ---`);
    [...show].sort((x, y) => x - y).forEach((i) => console.log(`${String(i + 1).padStart(5)}| ${lines[i]}`));
    hits += 1;
  }
  if (!hits) console.log("（无命中）");
  process.exit(hits ? 0 : 2);
}

if (cmd === "verify") {
  const frag = argv[2];
  if (!frag || !fs.existsSync(frag)) {
    console.error(`没有这个片段文件：${frag}`);
    process.exit(1);
  }
  const sections = parseSections(fs.readFileSync(frag, "utf8"));
  if (!sections.length) {
    console.error("片段里切不出任何题：标题必须写成 `## Q1 · 题面`（解析器要求 id + 中点 + 题面）。");
    process.exit(1);
  }
  let total = 0;
  let bad = 0;
  for (const s of sections) {
    if (!s.answer.trim()) console.log(`! ${s.id} 答案为空`);
    if (!(s.blocks ?? []).length) console.log(`! ${s.id} 依据区为空`);
    for (const b of s.blocks) {
      total += 1;
      const page = pages.find((p) => Number(p.n) === Number(b.page));
      const text = page ? norm(page.text) : null;
      const q = norm(b.quote);
      if (text && text.includes(q)) {
        console.log(`  ok  ${s.id} p.${b.page}｜${String(b.quote).replace(/\s+/g, " ").slice(0, 70)}`);
        continue;
      }
      bad += 1;
      console.log(`  XX  ${s.id} p.${b.page}｜${String(b.quote).replace(/\s+/g, " ").slice(0, 70)}`);
      if (!text) {
        console.log(`      该页没有原文`);
        continue;
      }
      let lo = 0;
      let hi = q.length;
      while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2);
        if (text.includes(q.slice(0, mid))) lo = mid;
        else hi = mid - 1;
      }
      console.log(`      最长可匹配前缀 ${lo}/${q.length} 字：${q.slice(0, lo).slice(-40)}`);
    }
  }
  console.log(`\n共 ${total} 块，${bad} 块搜不到。${bad ? "不合格" : "全部逐字可核。"}`);
  process.exit(bad ? 1 : 0);
}

console.error(`未知命令：${cmd}`);
process.exit(1);

#!/usr/bin/env node
/**
 * 把多份答题片段合并进骨架 material.md。
 *
 *   node tools/merge-frags.mjs output/meta/<id>/material.md .workbuddy/tmp/10k/frag_*.md
 *
 * 只替换 `## <id> · …` 到下一个 `## ` 之间的内容；题号与问题文字原样保留。
 * 任何一行没有答案或没有依据块 -> 不写盘，exit 1（避免半成品覆盖）。
 */
import fs from "node:fs";
import path from "node:path";
import { parseSections } from "../server/parse-md.mjs";

const [, , matFile, ...frags] = process.argv;
if (!matFile || !frags.length) {
  console.error("用法：node tools/merge-frags.mjs <material.md> <片段…>");
  process.exit(1);
}

const src = fs.readFileSync(matFile, "utf8");
const fmMatch = src.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
if (!fmMatch) {
  console.error("material.md 没有 frontmatter");
  process.exit(1);
}
const fm = fmMatch[0];
const body = src.slice(fm.length);

const parts = body.split(/^(?=## )/m);
const heads = [];
const map = new Map();
for (const chunk of parts) {
  const m = chunk.match(/^##\s+([A-Za-z0-9_-]+)\s*[·:：-]\s*(.+?)\s*$/m);
  if (!m) {
    heads.push({ raw: chunk, id: null });
    continue;
  }
  const item = { raw: chunk, id: m[1], label: m[2] };
  heads.push(item);
  map.set(m[1], item);
}

const patch = new Map();
for (const f of frags) {
  const sections = parseSections(fs.readFileSync(f, "utf8"));
  for (const s of sections) {
    if (!s.answer.trim()) {
      console.error(`片段 ${path.basename(f)} 的 ${s.id} 没有答案`);
      process.exit(1);
    }
    if (!(s.blocks ?? []).length) {
      console.error(`片段 ${path.basename(f)} 的 ${s.id} 没有依据块`);
      process.exit(1);
    }
    if (patch.has(s.id)) {
      console.error(`片段重复：${s.id}（${path.basename(f)}）`);
      process.exit(1);
    }
    patch.set(s.id, s);
  }
}

const missing = [...patch.keys()].filter((id) => !map.has(id));
if (missing.length) {
  console.error(`骨架里没有这些题号：${missing.join(", ")}`);
  process.exit(1);
}

let out = fm;
for (const h of heads) {
  if (!h.id) {
    out += h.raw;
    continue;
  }
  const s = patch.get(h.id);
  if (!s) {
    out += h.raw;
    continue;
  }
  const ev = s.blocks.map((b) => `- p.${b.page}｜${b.quote}`).join("\n");
  out += `## ${h.id} · ${h.label}\n\n${s.answer.trim()}\n\n### 依据\n${ev}\n\n`;
}

// 题号完整性：骨架里有几题就必须补几题
const unanswered = [...map.keys()].filter((id) => !patch.has(id));
if (unanswered.length) {
  console.error(`还有题没补：${unanswered.join(", ")}`);
  process.exit(1);
}

fs.writeFileSync(matFile, out.replace(/\n{3,}(?=## )/g, "\n\n"), "utf8");
console.log(`已合并 ${patch.size} 题 -> ${matFile}`);

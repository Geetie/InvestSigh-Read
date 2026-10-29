#!/usr/bin/env node
/**
 * 页内检索 —— 给 agent 用，把 100 页的研报压到十几页必读。
 *
 *   node tools/pgrep.mjs <材料 id> "<正则>" [上下文长度,默认120]
 *   node tools/pgrep.mjs <材料 id> --pages 3,7,12      # 打印整页（长页自动截断到 12000 字）
 *   node tools/pgrep.mjs <材料 id> --index             # 每页前 100 字（定位用）
 *   node tools/pgrep.mjs <材料 id> --stat              # 每页字符数
 *
 * 只读 corpus/materials/<id>/pages.json，不改任何东西。
 */
import fs from "node:fs";
import path from "node:path";

const [id, arg1, arg2] = process.argv.slice(2);
if (!id || !arg1) {
  console.error("用法：node tools/pgrep.mjs <材料 id> <正则|--pages|--index|--stat> [参数]");
  process.exit(1);
}

const file = path.join("corpus", "materials", id, "pages.json");
if (!fs.existsSync(file)) {
  console.error(`没有这份材料：${file}`);
  process.exit(1);
}
const doc = JSON.parse(fs.readFileSync(file, "utf8"));
const pages = doc.pages ?? [];
const flat = (s) => String(s).replace(/\s+/g, " ").trim();

if (arg1 === "--stat") {
  console.log(pages.map((p) => `${p.n}:${(p.text ?? "").length}`).join(" "));
  console.log(`共 ${pages.length} 页，${pages.reduce((a, p) => a + (p.text ?? "").length, 0)} 字符`);
} else if (arg1 === "--index") {
  for (const p of pages) console.log(`p.${p.n}｜${flat(p.text).slice(0, 100)}`);
} else if (arg1 === "--pages") {
  const want = String(arg2 ?? "").split(",").map((x) => Number(x.trim())).filter(Boolean);
  for (const n of want) {
    const p = pages.find((x) => Number(x.n) === n);
    if (!p) {
      console.log(`=== p.${n} 不存在 ===`);
      continue;
    }
    const t = p.text ?? "";
    console.log(`=== p.${n}（${t.length} 字）===`);
    console.log(t.length > 12000 ? t.slice(0, 12000) + `\n…[截断，还有 ${t.length - 12000} 字]` : t);
  }
} else {
  const re = new RegExp(arg1, "gi");
  const ctx = Number(arg2 ?? 120);
  let hits = 0;
  for (const p of pages) {
    const t = flat(p.text);
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(t))) {
      const s = Math.max(0, m.index - ctx);
      console.log(`p.${p.n}｜…${t.slice(s, m.index + m[0].length + ctx)}…`);
      hits += 1;
      if (m[0].length === 0) re.lastIndex += 1;
      if (hits > 200) {
        console.log("…命中超过 200 处，已停止（缩小正则）");
        process.exit(0);
      }
    }
  }
  console.log(`—— ${hits} 处命中 / ${pages.length} 页`);
}

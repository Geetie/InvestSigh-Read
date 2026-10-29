/**
 * 补齐最后 9 册：它们的 id 前缀与旧壳源不同（手册 1..n / Q1..n，源 Q1/T1/X1/M1/F1），
 * 且行数不一致，所以按 id 和按行序都配不上。
 *
 * 做法：**按问题文字语义配对** —— 手册该行的问题文字与源某行的 label 指同一问，就取那行的读法。
 * 匹配用「问题关键词集合的交集」，且要求同册内一对一（不重复占用）。
 * 匹配不上的保持原样，报告出来人工确认。
 *
 *   node tools/restore-readings-2.mjs --dry [--show 宏观与周期]
 */
import fs from "node:fs";
import { listManuals, parseManual, writeRows, buildSlugMap } from "../server/manual.mjs";

const DRY = process.argv.includes("--dry");
const SHOW = process.argv.includes("--show") ? process.argv[process.argv.indexOf("--show") + 1] : null;
const SRC = "../InvestSigh-Workbuddy-frontend/InvestSigh-Read/corpus/prompts/index.json";

/* 只处理「上一轮没恢复」的这几册 */
const TARGETS = [
  "公司自己的话", "别人的解读", "旁证与读穿",
  "催化剂地图", "宏观与周期", "宏观与周期细目",
  "政策与管制", "政策与管制细目", "财政与国债供给", "情绪指标地图",
];

const src = JSON.parse(fs.readFileSync(SRC, "utf8"));
const tax = JSON.parse(fs.readFileSync("server/data/taxonomy.json", "utf8"));
const manuals = listManuals("corpus/prompts");
const { map: slugMap } = buildSlugMap(tax, manuals);

const srcById = new Map();
for (const [slug, vs] of Object.entries(src)) {
  if (!Array.isArray(vs) || !vs.length) continue;
  const best = [...vs].sort((a, b) => (b.rows?.length ?? 0) - (a.rows?.length ?? 0))[0];
  srcById.set(slug, (best.rows ?? []).map((r) => ({ id: r.id, label: (r.label ?? "").trim(), reading: (r.reading ?? "").trim() })));
}

/** 关键词集合：中文按 2-gram、拉丁按词 */
const keysOf = (s) =>
  new Set(
    (String(s).match(/[A-Za-z]{2,}|[\u4e00-\u9fa5]{2,}/g) ?? [])
      .flatMap((w) => (/^[A-Za-z]/.test(w) ? [w.toLowerCase()] : Array.from({ length: Math.max(1, w.length - 1) }, (_, i) => w.slice(i, i + 2))))
      .filter((x) => x.length >= 2),
  );

const score = (a, b) => {
  const A = keysOf(a);
  const B = keysOf(b);
  let n = 0;
  for (const x of A) if (B.has(x)) n++;
  return n;
};

const plan = [];
let skippedManual = [];

for (const stem of TARGETS) {
  const m = manuals.find((x) => x.stem === stem);
  if (!m) {
    skippedManual.push(`${stem}: 找不到文件`);
    continue;
  }
  const slug = slugMap.get(m.stem);
  const pool = slug ? srcById.get(slug) : null;
  if (!pool || !pool.length) {
    skippedManual.push(`${stem}: 源里没有`);
    continue;
  }

  const p = parseManual(m.file, m.cat, m.stem);
  const used = new Set();
  const next = p.rows.map((r) => {
    /* 在未占用的源行里找最相似的一条 */
    let bestI = -1;
    let bestS = 0;
    pool.forEach((s, i) => {
      if (used.has(i)) return;
      const sc = score(r.label, s.label);
      if (sc > bestS) {
        bestS = sc;
        bestI = i;
      }
    });
    /* 阈值：至少 2 个关键词命中，且读法非空 */
    if (bestI >= 0 && bestS >= 2 && pool[bestI].reading) {
      used.add(bestI);
      return { id: r.id, label: r.label, reading: pool[bestI].reading, matched: pool[bestI].label, score: bestS };
    }
    return { id: r.id, label: r.label, reading: r.reading, matched: null, score: bestS };
  });

  const changed = next.filter((r, i) => r.reading !== p.rows[i].reading).length;
  plan.push({ m, p, next, changed, poolSize: pool.length });
}

console.log(`${DRY ? "[dry] " : ""}处理 ${plan.length} 册\n`);
for (const x of plan) {
  const matched = x.next.filter((r) => r.matched).length;
  console.log(`  ${(x.m.cat + "/" + x.m.stem).padEnd(22)} 改 ${String(x.changed).padStart(2)} 行 · 语义匹配 ${matched}/${x.next.length}（源 ${x.poolSize} 行）`);
  if (SHOW && x.m.stem === SHOW) {
    console.log("    明细：");
    x.next.forEach((r, i) => {
      if (r.reading === x.p.rows[i].reading) {
        console.log(`      ${r.id} 未匹配（最佳 ${r.score} 分）`);
      } else {
        console.log(`      ${r.id} ↔ 「${r.matched}」（${r.score} 分）`);
        console.log(`         新: ${r.reading.slice(0, 70)}`);
      }
    });
  }
}
if (skippedManual.length) {
  console.log(`\n跳过：`);
  skippedManual.forEach((s) => console.log("  " + s));
}

if (!DRY) {
  for (const x of plan) writeRows(x.m.file, x.next);
  console.log(`\n已写入 ${plan.length} 册`);
}

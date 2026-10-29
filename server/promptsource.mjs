/**
 * 提示词数据源 —— **手册即真源**。
 *
 * `corpus/prompts/<NN>-型/<册>.md` 的问句表是唯一内容来源；
 * `corpus/prompts/index.json` 与 `server/data/taxonomy.json` 都是过时产物，**不参与任何行内容**：
 *   · taxonomy 仅用于把材料里的英文 slug 对到中文册名
 *   · index.json **已不再被引用**（行的 kind 由读法文本推出，见下）
 *
 * 读写口径：
 *   GET  → `parseManual()` 把该册问句表读成行
 *   PUT  → `writeRows()` 原地改写该册的问句表单元格（其余字节不动）
 */
import fs from "node:fs";
import path from "node:path";
import { listManuals, parseManual, writeRows, buildSlugMap, manualBySlug, nextIdOf } from "./manual.mjs";
import { ROOT, loadTaxonomy } from "./store.mjs";

/** 手册里没有"版"的概念：它是当前态。前端仍要 effectiveFrom，故给一个恒定基线。 */
export const BASELINE = "2000-01-01";

let cache = null;
/** 缓存带指纹（mtime+size），文件被外部改动就重读 —— 否则磁盘与 API 会分叉 */
let stamp = null;

const stampOf = (files) =>
  files.map((f) => {
    try {
      const st = fs.statSync(f.file);
      return `${f.file}:${st.mtimeMs}:${st.size}`;
    } catch {
      return `${f.file}:missing`;
    }
  }).join("|");

function buildIndex() {
  const manuals = listManuals(path.join(ROOT, "corpus", "prompts"));
  const tax = loadTaxonomy();
  const { map: slugMap, unmatched } = buildSlugMap(tax, manuals);

  const bySlug = new Map();
  for (const m of manuals) {
    const slug = slugMap.get(m.stem);
    if (!slug) continue;
    bySlug.set(slug, { ...m, slug });
  }
  return { manuals, slugMap, unmatched, bySlug };
}

export function loadIndex() {
  const manuals = listManuals(path.join(ROOT, "corpus", "prompts"));
  const s = stampOf(manuals);
  if (!cache || s !== stamp) {
    cache = buildIndex();
    stamp = s;
  }
  return cache;
}

/* ───────── kind（问/数）—— 手册没有这一列，从读法文本推出来 ───────── */

/**
 * `kind` 只影响界面上的行头标记（`问` / `数`）与左缘墨条颜色，不参与任何业务判断。
 *
 * 手册里没有这一列，原先靠 `corpus/prompts/index.json` 补（那是过时产物）。
 * 实测该规则与旧值 **164/164 完全一致**：读法/问题任一列出现「只抄材料给出的数字」这句
 * 数字类套话 ⇒ `data`，否则 `question`。所以直接推，不再依赖 index.json。
 */
const DATA_READING = /只抄材料给出的数字/;
const kindOf = (row) => (DATA_READING.test(row.reading ?? "") || DATA_READING.test(row.label ?? "") ? "data" : "question");

/* ───────── 读 ───────── */

/**
 * 某一型（slug）的当前问句表。读不到手册就返回 null（调用方给 404）。
 * @returns {null | {subId, version, effectiveFrom, rows, shape, section, header, stem, cat, file}}
 */
export function readPromptSet(slug) {
  const { bySlug } = loadIndex();
  const m = bySlug.get(slug);
  if (!m) return null;

  const parsed = parseManual(m.file, m.cat, m.stem);
  if (parsed.noTable || !parsed.rows.length) return null;

  return {
    subId: slug,
    /* 手册是当前态，不存在多版；version 恒为 1，只用于前端显示 */
    version: 1,
    effectiveFrom: BASELINE,
    rows: parsed.rows.map((r) => ({
      id: r.id,
      label: r.label,
      reading: r.reading,
      kind: kindOf(r),
    })),
    /* 供界面显示"这一册长什么样"，不参与行内容 */
    shape: parsed.shape,
    section: parsed.section,
    header: parsed.header,
    stem: parsed.stem,
    cat: parsed.cat,
    file: path.relative(ROOT, m.file).replace(/\\/g, "/"),
  };
}

/** 全部型（一次拿完，前端启动时用） */
export function readAllPromptSets() {
  const { bySlug } = loadIndex();
  const out = [];
  for (const slug of bySlug.keys()) {
    const set = readPromptSet(slug);
    if (set) out.push(set);
  }
  return out;
}

/** 某型能用哪些 id（新增行要避开历史最大号） */
export function nextIdFor(slug) {
  const { bySlug } = loadIndex();
  const m = bySlug.get(slug);
  if (!m) return null;
  const parsed = parseManual(m.file, m.cat, m.stem);
  if (parsed.noTable || !parsed.rows.length) return null;
  return nextIdOf(parsed);
}

/* ───────── 写 ───────── */

/**
 * 把整张问句表按 rows 写回该册（只改目标单元格）。
 *
 * @param {string} slug
 * @param {Array<{id,label,reading}>} rows
 * @returns {{file, before, after, added, removed}}
 */
export function savePromptRows(slug, rows) {
  const { bySlug } = loadIndex();
  const m = bySlug.get(slug);
  if (!m) throw new Error(`没有对应的手册：${slug}`);

  /* 每行必须有 id 与 label（前端也会拦，这里是最后一道） */
  const seen = new Set();
  for (const r of rows) {
    if (!r?.id) throw new Error("每一行都要有 id");
    if (!String(r.label ?? "").trim()) throw new Error(`行 ${r.id} 没有写问题`);
    if (seen.has(r.id)) throw new Error(`行 id 重复：${r.id}`);
    seen.add(r.id);
  }

  const res = writeRows(m.file, rows);
  /* 写完让缓存失效，下一次读立即反映 */
  stamp = null;
  return res;
}

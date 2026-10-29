/**
 * 从旧壳 index.json 恢复真读法（第三版，最终）。
 *
 * 对齐规则（按优先级）：
 *   ① **按 id**：手册该行的 id 在源里存在 → 取源该 id 的读法。
 *      这条最可靠：不同册行数可以不同（手册是问句表，源含模板节），但同 id 就是同一问。
 *   ② 源无此 id → 保持手册原值，不动。
 *
 * 只改读法列；问题列一律原样。
 *   node tools/restore-readings.mjs --dry [--show 内部人申报]
 *   node tools/restore-readings.mjs
 */
import fs from "node:fs";
import { listManuals, parseManual, writeRows, buildSlugMap } from "../server/manual.mjs";

const DRY = process.argv.includes("--dry");
const SHOW = process.argv.includes("--show") ? process.argv[process.argv.indexOf("--show") + 1] : null;
const SRC = "../InvestSigh-Workbuddy-frontend/InvestSigh-Read/corpus/prompts/index.json";
const BOIL =
  /^只读材料明确写出的判断：谁在什么时点说了什么，句末带页码；材料没说的不补、不推论。$|^只抄材料给出的数字，连同口径、单位、财年；没给这一项就留空，不要估算。$/;

const src = JSON.parse(fs.readFileSync(SRC, "utf8"));
const tax = JSON.parse(fs.readFileSync("server/data/taxonomy.json", "utf8"));
const manuals = listManuals("corpus/prompts");
const { map: slugMap } = buildSlugMap(tax, manuals);

/* 源：同型多版本时，取行数最多的那一版；id → reading */
const srcById = new Map();
for (const [slug, vs] of Object.entries(src)) {
  if (!Array.isArray(vs) || !vs.length) continue;
  const best = [...vs].sort((a, b) => (b.rows?.length ?? 0) - (a.rows?.length ?? 0))[0];
  const m = new Map();
  for (const r of best.rows ?? []) if (r?.id) m.set(r.id, (r.reading ?? "").trim());
  srcById.set(slug, m);
}

const plan = [];
const noSrc = [];
let totalRows = 0;

for (const m of manuals) {
  const slug = slugMap.get(m.stem);
  const p = parseManual(m.file, m.cat, m.stem);
  if (p.noTable) continue;

  const byId = slug ? srcById.get(slug) : undefined;
  if (!byId || !byId.size) {
    noSrc.push(`${m.cat}/${m.stem}（slug=${slug ?? "未映射"}）`);
    continue;
  }

  const next = p.rows.map((r) => {
    const t = byId.get(r.id);
    return { id: r.id, label: r.label, reading: t && t.trim() ? t.trim() : r.reading };
  });

  const changed = next.filter((r, i) => r.reading !== p.rows[i].reading).length;
  const covered = next.filter((r) => byId.has(r.id)).length;
  if (!changed) continue;

  plan.push({ m, p, next, changed, covered });
  totalRows += changed;

  if (SHOW && m.stem === SHOW) {
    console.log(`\n=== ${m.cat}/${m.stem} 明细`);
    next.forEach((r, i) => {
      const old = p.rows[i].reading;
      if (r.reading === old) return;
      console.log(`  ${r.id}`);
      console.log(`    旧: ${old.slice(0, 80)}`);
      console.log(`    新: ${r.reading.slice(0, 80)}`);
    });
  }
}

console.log(`\n${DRY ? "[dry] " : ""}可恢复 ${plan.length} 册 · ${totalRows} 行\n`);
for (const x of plan) {
  console.log(
    `  ${(x.m.cat + "/" + x.m.stem).padEnd(24)} 改 ${String(x.changed).padStart(2)} 行` +
      ` · 源覆盖 ${x.covered}/${x.next.length}`,
  );
}
if (noSrc.length) {
  console.log(`\n无源（保持原样）：${noSrc.length} 册`);
  noSrc.forEach((s) => console.log("  " + s));
}

if (!DRY) {
  for (const x of plan) writeRows(x.m.file, x.next);
  console.log(`\n已写入 ${plan.length} 册`);
}

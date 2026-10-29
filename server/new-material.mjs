#!/usr/bin/env node
/**
 * 新开一份材料：**按手册当前问句表现场生成答题卡**，再让 agent 往里填。
 *
 *   node server/new-material.mjs --sub 10-K --id 01-10-K-2026-10-24-NVDA \
 *        --date 2026-10-24 --time 08:00 --title "…" --issuer … --ticker NVDA --kind 研报 --pages 34 \
 *        [--ticker-dir meta]
 *
 * 做的事：
 *   1. 读该型（slug）的手册问句表（`## 4. 问句表`）；
 *   2. 用 `renderTemplate()` 生成答题卡；
 *   3. 写进 output/<标的目录>/<id>/material.md（标的目录默认 meta）；
 *   4. 各题答案与依据位留空，等 agent 填。
 *
 * ★ 不再依赖 `template.vN.md`（那是旧的多版模型产物，已废）。
 *   手册是当前态，答题卡现生现用，避免"模板与手册漂移"。
 */
import fs from "node:fs";
import path from "node:path";
import { PATHS, ROOT } from "./store.mjs";
import { readPromptSet } from "./promptsource.mjs";
import { renderTemplate } from "./template.mjs";

const argv = process.argv.slice(2);
const arg = (k, d) => {
  const i = argv.indexOf(`--${k}`);
  return i >= 0 ? argv[i + 1] : d;
};

const sub = arg("sub");
const id = arg("id");
const date = arg("date");
if (!sub || !id || !date) {
  console.error(
    "用法：node server/new-material.mjs --sub <型 slug> --id <材料 id> --date YYYY-MM-DD [--time HH:MM] [--title …] [--issuer …] [--ticker …] [--kind …] [--pages N] [--force]",
  );
  process.exit(1);
}

const set = readPromptSet(sub);
if (!set) {
  console.error(`没有对应的手册：${sub}（先确认 corpus/prompts/<NN>-型/ 下有这一册）`);
  process.exit(1);
}

/* 产出路径 = output/<标的目录>/<材料 id>/material.md
 *
 * ★ 2026-10-28 修正：原来直接拼 `output/<id>/`，漏了标的目录这一层。
 *   阅读器（store.mjs::materialPath）读的是 `output/<tickerDir>/<id>/material.md`，
 *   两者不一致会导致「脚本说生成了、阅读器看不到」。
 *   标的目录名默认 `meta`（本仓唯一标的 META），可用 `--ticker-dir` 覆盖。
 */
const tickerDir = arg("ticker-dir", "meta");
const out = path.join(PATHS.output, tickerDir, id, "material.md");
if (fs.existsSync(out) && !argv.includes("--force")) {
  console.error(`已存在：${out}（要覆盖加 --force）`);
  process.exit(1);
}

/* 老路径若已存在同名残留，提示一下，避免两份并存 */
const legacy = path.join(PATHS.output, id, "material.md");
if (fs.existsSync(legacy)) {
  console.error(
    `⚠ 发现旧路径残留：${path.relative(ROOT, legacy)}\n` +
      `   阅读器不读这里。确认无用后删除，否则会出现两份并存的假象。`,
  );
}

/* ★ 2026-10-28：version 必须 ≥ 2。
 *   validate.mjs 第 33 行：`templateVersion <= 1` → 直接返回 level:"legacy"，
 *   整份材料**不参与判定**（不当错、也不验依据）。新生成的骨架若写 1，
 *   等于「永远不会被 check.mjs 检查」，这是最危险的静默失败。
 *   全库 297 份都是 2，只有本脚本旧代码写 1。 */
let md = renderTemplate({
  subId: sub,
  cat: set.cat,
  version: 2,
  rows: set.rows,
  oneLiner: "",
});

const put = (k, v) => {
  if (v === undefined || v === null || v === "") return;
  const re = new RegExp(`^${k}:.*$`, "m");
  const val = /^[\w.\-:/]+$/.test(v) ? v : JSON.stringify(v);
  md = re.test(md) ? md.replace(re, `${k}: ${val}`) : md;
};

put("id", id);
put("cat", set.cat);
put("sub", sub);
put("date", date);
put("time", arg("time", "08:00"));
put("title", arg("title", ""));
put("kind", arg("kind", ""));
put("issuer", arg("issuer", ""));
put("ticker", arg("ticker", ""));
put("source_pages", arg("pages", ""));

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md, "utf8");

const nSec = (md.match(/^## /gm) ?? []).length;
console.log(`已按手册「${set.section}」生成答题卡 → ${path.relative(ROOT, out)}`);
console.log(`  ${nSec} 个题目待填（来自 ${set.file}）；填完跑：node server/check.mjs ${id}`);

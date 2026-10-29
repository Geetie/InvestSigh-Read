#!/usr/bin/env node
/**
 * 证据自检 CLI —— agent 写完一份材料，跑一下再交付。
 *
 *   node server/check.mjs                 # 全量，只打汇总与不合格
 *   node server/check.mjs <材料 id>        # 单份，打全部问题
 *   node server/check.mjs --all --verbose  # 全量，逐份打
 *
 * 退出码：0 = 没有 missing/unverified/broken；1 = 有，需要回去补。
 */
import fs from "node:fs";
import path from "node:path";
import { mdToMaterial } from "./parse-md.mjs";
import { validateMaterial, summarize } from "./validate.mjs";
import { PATHS, listMaterialFiles, readSource } from "./store.mjs";

const args = process.argv.slice(2);
const verbose = args.includes("--verbose");
const only = args.find((a) => !a.startsWith("--"));

/** `--only` 可写 `<材料 id>`（全树搜）或 `<标的>/<材料 id>`（精确） */
function pickOnly(arg) {
  if (arg.includes("/")) {
    const f = path.join(PATHS.output, arg, "material.md");
    return fs.existsSync(f) ? [f] : [];
  }
  return listMaterialFiles().filter((x) => x.id === arg).map((x) => x.file);
}

const entries = listMaterialFiles();
const files = only
  ? pickOnly(only)
  : entries.map((x) => x.file);

if (!files.length) {
  console.error(only ? `没有这份材料：${only}` : "output/ 里没有 material.md");
  process.exit(1);
}

const tickerOf = new Map(entries.map((x) => [x.file, x.ticker]));

const tally = { ok: 0, missing: 0, unverified: 0, broken: 0, legacy: 0 };
const bad = [];

for (const f of files) {
  const doc = mdToMaterial(fs.readFileSync(f, "utf8"), path.basename(path.dirname(f)));
  const r = validateMaterial(doc, readSource(doc.id));
  tally[r.level] = (tally[r.level] ?? 0) + 1;
  const tag = tickerOf.get(f) ? `${tickerOf.get(f)}/${doc.id}` : doc.id;

  if (r.level === "ok" || r.level === "legacy") {
    if (verbose || only) console.log("  " + summarize(tag, r));
    continue;
  }

  bad.push({ id: tag, r });
  console.log("  " + summarize(tag, r));
  if (verbose || only) {
    for (const i of r.issues.slice(0, 12)) {
      console.log(`      · [${i.kind}] ${i.row ?? ""} ${i.msg}`);
    }
    if (r.issues.length > 12) console.log(`      · …还有 ${r.issues.length - 12} 条`);
  }
}

const print = (k, label) => console.log(`${label.padEnd(12)} ${tally[k] ?? 0}`);
console.log("\n—— 汇总 ——");
print("ok", "合格");
print("missing", "没登记");
print("unverified", "查无此文");
print("broken", "页码越界");
print("legacy", "旧材料（不判）");
console.log(`共 ${files.length} 份`);

if (bad.length) {
  console.log(`\n${bad.length} 份需要回去补。单份看细节：node server/check.mjs <标的>/<材料 id>`);
  process.exit(1);
}

#!/usr/bin/env node
/**
 * 把已有的成品重排成「模板的填写件」。
 *
 * 规矩是：模板复用，每份材料都是**先把模板复制到输出文件夹**再填的。
 * 早期那批是从 bundle 直接生成的，形状像模板但不是模板复制件；这个脚本按模板重排一遍：
 *   · 题号与问题文字一律取模板（保证和模板完全一致）；
 *   · 答案与依据原样搬回去，一个字不改；
 *   · frontmatter 用这份材料自己的值。
 *
 *   node server/refit-materials.mjs            # 全量
 *   node server/refit-materials.mjs --dry 20   # 只试 20 份，不写盘
 */
import fs from "node:fs";
import path from "node:path";
import { mdToMaterial, parseFrontmatter } from "./parse-md.mjs";
import { PATHS, listMaterialFiles, templatePath } from "./store.mjs";

const argv = process.argv.slice(2);
const dryIdx = argv.indexOf("--dry");
const dry = dryIdx >= 0 ? Number(argv[dryIdx + 1] || 5) : 0;

const q = (v) => (/^[\w.\-:/]+$/.test(String(v)) ? String(v) : JSON.stringify(String(v)));

/** 用模板重排一份材料 */
function refit(md, doc) {
  const tplFile = templatePath(doc.sub, doc.templateVersion || 1);
  if (!fs.existsSync(tplFile)) return null;
  let tpl = fs.readFileSync(tplFile, "utf8");

  /* 1) frontmatter：键取模板的（含注释），值取这份材料的 */
  const { meta } = parseFrontmatter(tpl);
  const values = {
    id: doc.id,
    cat: doc.cat,
    sub: doc.sub,
    date: doc.date,
    time: doc.time,
    title: doc.name,
    kind: doc.kind,
    issuer: doc.issuer,
    ticker: doc.ticker,
    source_pages: doc.sourcePages || 0,
  };
  for (const [k, v] of Object.entries(values)) {
    const re = new RegExp(`^${k}:.*$`, "m");
    if (!re.test(tpl)) continue;
    /* 空值也要写，否则模板里的占位符会留在成品里 */
    tpl = tpl.replace(re, `${k}: ${v === undefined || v === null || v === "" ? "" : q(v)}`);
  }
  const head = tpl.slice(0, tpl.search(/^## /m));

  /* 2) 每一节取模板的题号与问题，答案与依据从这份材料搬回 */
  const sections = tpl.slice(tpl.search(/^## /m)).split(/^## /m).slice(1);
  const byId = new Map(doc.sections.map((s) => [s.id, s]));

  const body = sections
    .map((chunk) => {
      const nl = chunk.indexOf("\n");
      const heading = chunk.slice(0, nl).trim();
      const id = heading.split("·")[0].trim();
      const src = byId.get(id);
      const answer = (src?.answer ?? "").trim();
      const blocks = (src?.blocks ?? []).map((b) => `- p.${b.page}｜${b.quote}`).join("\n");
      return `## ${heading}

${answer}

### 依据
${blocks}
`;
    })
    .join("\n");

  return head + body;
}

const files = listMaterialFiles();
let done = 0;
let skipped = 0;
let same = 0;

for (const f of files) {
  const id = path.basename(path.dirname(f));
  const before = fs.readFileSync(f, "utf8");
  const doc = mdToMaterial(before, id);
  const after = refit(before, doc);
  if (!after) {
    skipped += 1;
    continue;
  }
  /* 往返一致才写：答案与块必须一模一样 */
  const check = mdToMaterial(after, id);
  const sameCells = JSON.stringify(check.cells) === JSON.stringify(doc.cells);
  const sameBlocks = JSON.stringify(check.evidence) === JSON.stringify(doc.evidence);
  if (!sameCells || !sameBlocks) {
    console.error(`✘ 往返不一致，跳过：${id}（cells ${sameCells} / blocks ${sameBlocks}）`);
    skipped += 1;
    continue;
  }
  same += 1;
  if (dry && done >= dry) continue;
  if (dry) {
    if (done === 0) console.log(`--- 样例：${id} ---\n${after.slice(0, 700)}`);
    done += 1;
    continue;
  }
  fs.writeFileSync(f, after, "utf8");
  done += 1;
}

console.log(
  dry
    ? `\n[试跑] 可重排 ${same} 份 · 跳过 ${skipped} · 已展示 ${done} 份样例（未写盘）`
    : `\n重排完成：写盘 ${done} 份 · 跳过 ${skipped} 份（模板缺失或往返不一致）`,
);

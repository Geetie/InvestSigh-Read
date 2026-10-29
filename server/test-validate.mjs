#!/usr/bin/env node
/**
 * 校验器自测：三种结局各造一份，跑一遍看分级对不对。
 * 用的是真实 pages.json 里的原文，所以「逐字可查」这条是真的被验证过。
 *
 *   node server/test-validate.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { mdToMaterial } from "./parse-md.mjs";
import { validateMaterial } from "./validate.mjs";
import { PATHS, readSource } from "./store.mjs";

const ID = "03-broker-research-R01";
const src = readSource(ID);
if (!src) {
  console.error(`缺 pages.json：corpus/materials/${ID}/`);
  process.exit(1);
}

/* 从第 1 页原样截一段当原文块 */
const page1 = src.pages.find((p) => p.n === 1).text;
const quote = page1.trim().slice(0, 60).replace(/\n/g, " ");
const tail = page1.trim().slice(60, 90).replace(/\n/g, " ");

const wrap = (version, answer, blocks) => `---
id: ${ID}
cat: "03"
sub: broker-research
template: broker-research
template_version: ${version}
date: 2026-02-02
time: 08:30
title: 自测用材料
kind: 研报
issuer: Barclays
ticker: NVDA
source_pages: ${src.pageCount}
---

## Q1 · 读数属于哪层哪一环

${answer}

### 依据
${blocks.map((b) => `- p.${b.page}｜${b.quote}`).join("\n")}
`;

const cases = [
  {
    name: "合格：每句挂页码，块是原文",
    level: "ok",
    md: wrap(2, `这家覆盖 NVDA，报告名与机构都在首页。`, [
      { page: 1, quote },
      { page: 1, quote: tail },
    ]),
  },
  {
    name: "没登记：有答案，依据区空着",
    level: "missing",
    md: wrap(2, `这家覆盖 NVDA。`, []),
  },
  {
    name: "查无此文：块是改写不是原文",
    level: "unverified",
    md: wrap(2, `这家覆盖 NVDA。`, [{ page: 1, quote: quote.slice(0, 20) + "（改写版）" }]),
  },
  {
    name: "查无此文：块是编的",
    level: "unverified",
    md: wrap(2, `这家覆盖 NVDA。`, [{ page: 1, quote: "这句话在原文里根本不存在" }]),
  },
  {
    name: "旧材料：v1 不判",
    level: "legacy",
    md: wrap(1, `这家覆盖 NVDA。`, []),
  },
];

let pass = 0;
for (const c of cases) {
  const doc = mdToMaterial(c.md, ID);
  const r = validateMaterial(doc, src);
  const ok = r.level === c.level;
  pass += ok ? 1 : 0;
  console.log(`${ok ? "✔" : "✘"} ${c.name}  →  ${r.level}（期望 ${c.level}）`);
  if (!ok) for (const i of r.issues) console.log(`     · [${i.kind}] ${i.msg}`);
}

console.log(`\n${pass}/${cases.length} 通过`);
process.exit(pass === cases.length ? 0 : 1);

#!/usr/bin/env node
/**
 * 用户视角走查：**不改 URL 参数**，从首页默认进入（这是真实用户看到的第一屏），
 * 一路点：类 → 型 → 切粒度 → 点格子 → 进提示词页。
 *
 * 判据：每一步之后都还有东西可读（不是空白/报错），且数据来自后端。
 * 与 e2e-readpages.mjs 的分工：那个是带参数定点断言，这个是"人手怎么用"。
 */
import { chromium } from "playwright-core";

const FRONT = "http://127.0.0.1:5277";
const b = await chromium.launch({ channel: "msedge", headless: true });
const p = await (await b.newContext({ viewport: { width: 1680, height: 1000 } })).newPage();

const errs = [];
p.on("pageerror", (e) => errs.push(String(e)));

const shot = (n) => p.screenshot({ path: `docs/shots/walk-${n}.png` });
const txt = () => p.evaluate(() => document.body.innerText);

console.log("=== 1. 首页（默认进入，不带任何 query） ===");
await p.goto(FRONT, { waitUntil: "domcontentloaded" });
await p.waitForTimeout(3000);
let t = await txt();
console.log(`  URL: ${p.url()}`);
console.log(`  有分类栏: ${/监管一手披露/.test(t)}`);
console.log(`  有型标签: ${/10-K/.test(t)}`);
console.log(`  首屏有材料: ${/LOADING|暂无|无材料/.test(t) ? "否/加载中" : "看起来有"}`);
await shot("1-day");

console.log("\n=== 2. 点「资金与持仓」类 ===");
const clicked = await p.evaluate(() => {
  const els = [...document.querySelectorAll("button,a,div")];
  const target = els.find((e) => /资金与持仓/.test(e.innerText || "") && e.innerText.length < 40);
  target?.click();
  return !!target;
});
await p.waitForTimeout(2500);
t = await txt();
console.log(`  点到了: ${clicked}`);
console.log(`  当前类: ${/资金与持仓/.test(t) ? "资金与持仓" : "未切换"}`);
console.log(`  有材料卡: ${/内部人申报|机构持仓|做空/.test(t)}`);
await shot("2-cat04");

console.log("\n=== 3. 切时分矩阵（按 M） ===");
await p.keyboard.press("m");
await p.waitForTimeout(2500);
t = await txt();
const rowCol = (t.match(/(\d+)\s*×\s*(\d+)/) ?? [])[0] ?? "(无)";
console.log(`  矩阵尺寸 Row×Col: ${rowCol}`);
console.log(`  有版本条: ${/第\s*\d+\s*版/.test(t)}`);
console.log(`  空白态: ${/该型当日无材料/.test(t) ? "★ 是（当日无材料）" : "否"}`);
await shot("3-matrix");

console.log("\n=== 4. 点左箭头退一天（键盘 ←） ===");
await p.keyboard.press("ArrowLeft");
await p.waitForTimeout(1800);
t = await txt();
console.log(`  焦点日变了: ${/该型当日无材料/.test(t) ? "仍空白" : "有内容"}`);
console.log(`  矩阵尺寸: ${(t.match(/(\d+)\s*×\s*(\d+)/) ?? [])[0] ?? "(无)"}`);
await shot("4-matrix-prevday");

console.log("\n=== 5. 点一个格子进详情页 ===");
const cellClick = await p.evaluate(() => {
  const cells = [...document.querySelectorAll("[role=button][tabindex='0']")];
  if (!cells.length) return { ok: false, n: 0 };
  cells[0].click();
  return { ok: true, n: cells.length };
});
await p.waitForTimeout(2500);
console.log(`  可点格子 ${cellClick.n} 个，点第一个: ${cellClick.ok}`);
console.log(`  URL: ${p.url()}`);
t = await txt();
console.log(`  Hash 进详情: ${/#\/m\//.test(p.url())}`);
console.log(`  详情页有答案或依据: ${/依据|未收录|答案/.test(t)}`);
await shot("5-detail");

console.log("\n=== 6. Esc 返回 → 进提示词页 ===");
await p.keyboard.press("Escape");
await p.waitForTimeout(1500);
await p.goto(`${FRONT}/#/prompts/insider-filing`, { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2500);
t = await txt();
console.log(`  提示词页: ${/提示词/.test(t) && /读法/.test(t) ? "已打开" : "未打开"}`);
console.log(`  条目数可读: ${/index/i.test(t)}`);
await shot("6-prompts");

console.log(`\n页面级报错: ${errs.length ? errs.slice(0, 3).join(" | ") : "无"}`);
await b.close();
process.exitCode = errs.length ? 1 : 0;

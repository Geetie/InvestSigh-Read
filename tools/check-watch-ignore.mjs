#!/usr/bin/env node
/**
 * 回归验证：`vite.config.ts` 的 watch.ignored 是否真的挡住了「保存提示词 → 整页重载」。
 *
 * 这是本次修的一个真缺陷：后端每次保存都会重写 corpus/prompts/index.json，
 * 而 Vite 监听项目根 ⇒ 页面被整页刷新 ⇒「已保存」回执还没显示就没了。
 * 判据：往被忽略的目录写文件，navigate 次数不增；写 src/ 也不增（走 HMR）。
 */
import fs from "node:fs";
import { chromium } from "playwright-core";

const FRONT = "http://127.0.0.1:5277";
const b = await chromium.launch({ channel: "msedge", headless: true });
const p = await (await b.newContext({ viewport: { width: 1400, height: 900 } })).newPage();
let navs = 0;
p.on("framenavigated", (f) => {
  if (f === p.mainFrame()) navs++;
});

await p.goto(`${FRONT}/#/prompts/insider-filing`, { waitUntil: "domcontentloaded" });
await p.waitForTimeout(3000);
const base = navs;
console.log(`基线 navigate = ${base}`);

const trial = async (label, write, cleanup) => {
  const n0 = navs;
  write();
  await p.waitForTimeout(2200);
  const d = navs - n0;
  console.log(`${label}: +${d} → ${d === 0 ? "✓ 不重载" : "✗ 仍整页重载"}`);
  cleanup();
  await p.waitForTimeout(600);
  return d;
};

const r = [];
r.push(
  await trial(
    "[corpus/prompts/index.json]（后端每次保存都写）",
    () => {
      const f = "corpus/prompts/index.json";
      fs.writeFileSync(f, fs.readFileSync(f));
    },
    () => {},
  ),
);
r.push(
  await trial(
    "[corpus/prompts/<sub>/template.vN.md]",
    () => {
      fs.mkdirSync("corpus/prompts/insider-filing", { recursive: true });
      fs.writeFileSync("corpus/prompts/insider-filing/_t.md", "x");
    },
    () => fs.rmSync("corpus/prompts/insider-filing/_t.md", { force: true }),
  ),
);
r.push(
  await trial(
    "[output/<id>/material.md]",
    () => {
      fs.mkdirSync("output/_t", { recursive: true });
      fs.writeFileSync("output/_t/material.md", "x");
    },
    () => fs.rmSync("output/_t", { recursive: true, force: true }),
  ),
);

const fail = r.filter((x) => x !== 0).length;
console.log(`\n${fail ? "✗ 仍有 " + fail + " 处会触发整页重载" : "✓ watch.ignored 生效，运行时不重载"}`);
process.exitCode = fail ? 1 : 0;
await b.close();

// 验收截图：确认新入库的 03 类 Meta 材料在阅读器里真的能看到
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'docs', 'shots');
fs.mkdirSync(OUT, { recursive: true });
const EXEC = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = process.env.READ_BASE || 'http://127.0.0.1:5277';

const SHOTS = [
  { name: 'meta-01-broker-timeline', url: BASE + '/?cat=03&sub=broker-research&date=2026-07-30', wait: 3500 },
  { name: 'meta-02-broker-minute', url: BASE + '/?cat=03&sub=broker-research&grain=minute&date=2026-07-30', wait: 3500 },
];

(async () => {
  const browser = await chromium.launch({ executablePath: EXEC, headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1680, height: 1050 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });

  for (const s of SHOTS) {
    await page.goto(s.url, { waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(s.wait);
    await page.screenshot({ path: path.join(OUT, s.name + '.png'), fullPage: false });
    console.log('shot', s.name);
  }

  // 详情页：直接打一个已入库材料的原文接口，确认前端能取到页
  const api = 'http://127.0.0.1:5280';
  const r = await fetch(api + '/materials/03-broker-research-2026-07-30-META-GS2Q26Review/source');
  const d = await r.json();
  console.log('source ok:', r.status, d.id, 'pages=' + d.pageCount);
  const idx = await (await fetch(api + '/materials?cat=03')).json();
  console.log('cat03 count:', idx.length);
  console.log('all filled=0:', idx.every((m) => m.filled === 0));
  console.log('errors:', errs.length);
  errs.slice(0, 5).forEach((e) => console.log('  ', e));
  await browser.close();
})();

// 产业链页截图 + 量测：确认横向布局不塌、不越界、不重叠
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const os = require('os');

const OUT = path.join(os.tmpdir(), 'swiss-shots');
fs.mkdirSync(OUT, { recursive: true });

const EXEC = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://127.0.0.1:5276';

const SHOTS = [
  { name: 'chain-ai', url: BASE + '/#/chain/ai-compute', wait: 2600 },
  { name: 'chain-auto', url: BASE + '/#/chain/autonomous', wait: 2600 },
  { name: 'chain-robot', url: BASE + '/#/chain/robotics', wait: 2600 },
];

(async () => {
  const browser = await chromium.launch({ executablePath: EXEC });
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });
  page.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));

  for (const s of SHOTS) {
    await page.goto(s.url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(s.wait);
    const p = path.join(OUT, s.name + '.png');
    await page.screenshot({ path: p });
    console.log('shot ' + p);

    const m = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('[data-seg]'));
      const rects = cards.map((e) => {
        const r = e.getBoundingClientRect();
        return { n: e.getAttribute('data-seg'), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
      });
      // 重叠检测
      const overlaps = [];
      for (let i = 0; i < rects.length; i++)
        for (let j = i + 1; j < rects.length; j++) {
          const a = rects[i], b = rects[j];
          if (a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h)
            overlaps.push(a.n + ' × ' + b.n);
        }
      return { count: rects.length, rects, overlaps };
    });
    console.log(JSON.stringify(m, null, 1));
  }

  // 选中态：点第一个环节，看提亮与侧栏
  await page.goto(BASE + '/#/chain/ai-compute', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);
  const first = await page.$('[data-seg="packaging"] button');
  if (first) await first.click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(OUT, 'chain-ai-focus.png') });
  console.log('shot ' + path.join(OUT, 'chain-ai-focus.png'));

  console.log('ERRORS ' + JSON.stringify(errs.slice(0, 20), null, 1));
  await browser.close();
})();

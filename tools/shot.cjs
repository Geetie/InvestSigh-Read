// 视觉审查截图脚本：抓取 Dashboard 原型的多个状态
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'docs', 'preview');
fs.mkdirSync(OUT, { recursive: true });

const EXEC = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = process.env.DASH_BASE || 'http://127.0.0.1:5391';

const SHOTS = [
  { name: '01-day-default', url: BASE + '/', wait: 3500 },
  { name: '02-day-01-10K', url: BASE + '/?cat=01&sub=10-K', wait: 3000 },
  { name: '03-minute-matrix', url: BASE + '/?cat=01&sub=10-K&grain=minute', wait: 3500 },
  { name: '04-ai-open', url: BASE + '/?cat=03&sub=broker-research&ai=1', wait: 3500 },
  { name: '05-cat07', url: BASE + '/?cat=07&sub=consensus-gap', wait: 3000 },
  { name: '06-cat04', url: BASE + '/?cat=04&sub=insider-filing', wait: 3000 },
];

(async () => {
  const browser = await chromium.launch({
    executablePath: EXEC,
    args: ['--enable-unsafe-swiftshader', '--use-gl=swiftshader', '--ignore-gpu-blocklist'],
  });
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE ' + m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));

  for (const s of SHOTS) {
    try {
      await page.goto(s.url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(s.wait);
      const p = path.join(OUT, s.name + '.png');
      await page.screenshot({ path: p, fullPage: false });
      console.log('OK  ' + s.name + '  -> ' + p);
    } catch (e) {
      console.log('FAIL ' + s.name + ' : ' + e.message);
    }
  }

  // 量测：关键 DOM 尺寸，确认布局不塌
  await page.goto(BASE + '/?cat=01&sub=10-K', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  const metrics = await page.evaluate(() => {
    const q = (sel) => document.querySelector(sel);
    const box = (el) => (el ? el.getBoundingClientRect() : null);
    const all = (sel) => Array.from(document.querySelectorAll(sel)).map((e) => {
      const r = e.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) };
    });
    return {
      body: { w: document.body.scrollWidth, h: document.body.scrollHeight, vw: innerWidth, vh: innerHeight },
      nav: box(q('nav')),
      main: box(q('main')),
      canvasCount: document.querySelectorAll('canvas').length,
      buttons: all('button').slice(0, 40),
      mainChildren: Array.from(q('main')?.children ?? []).map((e) => e.className.slice(0, 80)),
    };
  });
  console.log('METRICS ' + JSON.stringify(metrics, null, 2));
  console.log('ERRORS ' + JSON.stringify(errors.slice(0, 30), null, 2));

  await browser.close();
})();

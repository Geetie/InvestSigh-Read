/**
 * 接入后综合审查：
 *  1. vendor 组件是否真被引用（配合 tools/check_vendor.cjs）
 *  2. 关键交互事实：滚轮伸缩 / AI 面板挤压不遮挡 / 悬浮球不压数据 / 日→时分跳转 / 矩阵缺格
 *  3. console & pageerror 计数
 * 用法：node tools/audit_final.cjs
 */
const { chromium } = require('playwright-core');

const EXEC = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = process.env.DASH_BASE || 'http://127.0.0.1:5391';

(async () => {
  const browser = await chromium.launch({
    executablePath: EXEC,
    args: ['--enable-unsafe-swiftshader', '--use-gl=swiftshader'],
  });
  const page = await (
    await browser.newContext({ viewport: { width: 1920, height: 1080 } })
  ).newPage();
  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push('CONSOLE ' + m.text().slice(0, 200));
  });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message.slice(0, 200)));

  const R = {};
  await page.goto(BASE + '/?cat=01&sub=10-K', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500);

  // 布局尺寸
  R.layout = await page.evaluate(() => {
    const b = (s) => {
      const e = document.querySelector(s);
      if (!e) return null;
      const r = e.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    };
    return {
      doc: { w: document.body.scrollWidth, h: document.body.scrollHeight },
      header: b('header'),
      nav: b('nav'),
      main: b('main'),
      aside: b('aside'),
      canvases: document.querySelectorAll('canvas').length,
    };
  });

  // 悬浮球 vs 数据按钮 相交
  R.orbOverlap = await page.evaluate(() => {
    const main = document.querySelector('main');
    if (!main) return null;
    const orb = main.querySelector('button[aria-label*="AI"]') || main.querySelector('button:last-of-type');
    if (!orb) return { orb: null, hits: [] };
    const o = orb.getBoundingClientRect();
    const hits = [];
    for (const c of main.querySelectorAll('button')) {
      if (c === orb) continue;
      const r = c.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (r.left < o.right && r.right > o.left && r.top < o.bottom && r.bottom > o.top) {
        hits.push(c.textContent.trim().slice(0, 20));
      }
    }
    return { orb: { x: Math.round(o.x), y: Math.round(o.y), w: Math.round(o.width), h: Math.round(o.height) }, hits };
  });

  // 滚轮伸缩
  const before = await page.evaluate(() => {
    const el = document.querySelector('input.zoom-slider');
    return el ? Number(el.value) : null;
  });
  const rail = await page.$('div.cursor-crosshair');
  if (rail) {
    const b = await rail.boundingBox();
    if (b) {
      await page.mouse.move(b.x + b.width * 0.5, b.y + b.height * 0.5);
      await page.mouse.wheel(0, -400);
      await page.waitForTimeout(700);
    }
  }
  const after = await page.evaluate(() => {
    const el = document.querySelector('input.zoom-slider');
    return el ? Number(el.value) : null;
  });
  R.wheelZoom = { before, after, changed: before !== after };

  // AI 面板：挤压式
  const mainW0 = await page.evaluate(() => Math.round(document.querySelector('main').getBoundingClientRect().width));
  await page.keyboard.press('Control+k');
  await page.waitForTimeout(900);
  const mainW1 = await page.evaluate(() => Math.round(document.querySelector('main').getBoundingClientRect().width));
  const asideW = await page.evaluate(() => {
    const a = document.querySelector('aside');
    return a ? Math.round(a.getBoundingClientRect().width) : null;
  });
  R.aiSqueeze = { mainW0, mainW1, asideW, squeezed: mainW1 < mainW0 };

  // 日→时分
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  const grainBefore = await page.evaluate(() =>
    document.querySelector('.hatch-missing') ? 'minute' : 'day',
  );
  const chip = await page.$('main .glass-blur');
  if (chip) {
    await chip.click();
    await page.waitForTimeout(900);
  }
  const grainAfter = await page.evaluate(() =>
    document.querySelector('.hatch-missing') ? 'minute' : 'day',
  );
  R.materialClick = { grainBefore, grainAfter, switched: grainBefore !== grainAfter };

  // 矩阵格统计
  R.matrix = await page.evaluate(() => {
    const cells = Array.from(document.querySelectorAll('[title]')).filter((e) =>
      e.title.includes('未提供') || e.title.includes('\n'),
    );
    const empty = cells.filter((e) => e.title.includes('未提供'));
    return {
      total: cells.length,
      empty: empty.length,
      filled: cells.length - empty.length,
      sampleEmptyText: empty[0] ? empty[0].textContent.trim().slice(0, 20) : null,
    };
  });

  // 文字裁剪
  R.clipped = await page.evaluate(() => {
    const out = [];
    for (const e of Array.from(document.querySelectorAll('span,p,div'))) {
      if (e.children.length) continue;
      const t = e.textContent.trim();
      if (!t || t.length < 4) continue;
      if (e.scrollWidth > e.clientWidth + 4 && getComputedStyle(e).overflow !== 'visible') {
        out.push({ t: t.slice(0, 28), sw: e.scrollWidth, cw: e.clientWidth });
      }
    }
    return out.slice(0, 10);
  });

  R.errors = errors;
  console.log(JSON.stringify(R, null, 1));
  await browser.close();
})();

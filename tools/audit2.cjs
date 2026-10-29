// 功能性视觉审查：交互行为 + 布局硬事实（无图片通道时用程序化事实替代肉眼）
const { chromium } = require('playwright-core');

const EXEC = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://127.0.0.1:5391';

const rgb = (c) => {
  const m = c.match(/\d+(\.\d+)?/g);
  return m ? m.slice(0, 3).map(Number) : [0, 0, 0];
};
const lum = ([r, g, b]) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); const hi = Math.max(l1, l2), lo = Math.min(l1, l2); return (hi + 0.05) / (lo + 0.05); };

(async () => {
  const browser = await chromium.launch({ executablePath: EXEC, args: ['--enable-unsafe-swiftshader', '--use-gl=swiftshader'] });
  const page = await (await browser.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE ' + m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
  const R = {};

  await page.goto(BASE + '/?cat=01&sub=10-K', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // --- 1. WebGL 背景是否真的画出了东西（采样 canvas 像素） ---
  R.webgl = await page.evaluate(() => {
    const out = [];
    for (const c of document.querySelectorAll('canvas')) {
      try {
        const ctx = c.getContext('2d');
        if (ctx) {
          const d = ctx.getImageData(Math.floor(c.width / 2), Math.floor(c.height / 2), 1, 1).data;
          out.push({ kind: '2d', px: [d[0], d[1], d[2], d[3]] });
        } else {
          const gl = c.getContext('webgl2') || c.getContext('webgl');
          out.push({ kind: gl ? 'gl' : 'unknown', w: c.width, h: c.height });
        }
      } catch (e) { out.push({ err: String(e).slice(0, 60) }); }
    }
    return out;
  });

  // --- 2. 悬浮球是否压住了数据（与日主体/矩阵格子做矩形相交检测） ---
  R.overlap = await page.evaluate(() => {
    const orb = document.querySelector('main > button');
    const chips = Array.from(document.querySelectorAll('main button')).filter((b) => b !== orb);
    const o = orb ? orb.getBoundingClientRect() : null;
    const hits = [];
    if (o) for (const c of chips) {
      const r = c.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.left < o.right && r.right > o.left && r.top < o.bottom && r.bottom > o.top) {
        hits.push({ t: c.textContent.trim().slice(0, 24), r: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } });
      }
    }
    return { orb: o ? { x: Math.round(o.x), y: Math.round(o.y), w: Math.round(o.width), h: Math.round(o.height) } : null, hits };
  });

  // --- 3. 时间线滚轮伸缩：派发 wheel，看 spacing 是否变 ---
  const before = await page.evaluate(() => {
    const el = document.querySelector('input.zoom-slider');
    return el ? Number(el.value) : null;
  });
  const rail = await page.$('div.cursor-crosshair');
  if (rail) {
    const b = await rail.boundingBox();
    await page.mouse.move(b.x + b.width * 0.5, b.y + b.height * 0.5);
    await page.mouse.wheel(0, -400);
    await page.waitForTimeout(600);
  }
  const after = await page.evaluate(() => {
    const el = document.querySelector('input.zoom-slider');
    return el ? Number(el.value) : null;
  });
  R.wheelZoom = { before, after, changed: before !== after };

  // --- 4. ⌘K 开关 AI 面板，且面板是否挤压而非覆盖 ---
  const mainBefore = await page.evaluate(() => Math.round(document.querySelector('main').getBoundingClientRect().width));
  await page.keyboard.press('Control+k');
  await page.waitForTimeout(900);
  const mainAfter = await page.evaluate(() => Math.round(document.querySelector('main').getBoundingClientRect().width));
  const panelInfo = await page.evaluate(() => {
    const a = document.querySelector('aside');
    if (!a) return null;
    const r = a.getBoundingClientRect();
    return { w: Math.round(r.width), x: Math.round(r.x), text: a.textContent.slice(0, 60) };
  });
  R.aiPanel = { mainBefore, mainAfter, squeezed: mainAfter < mainBefore, panel: panelInfo };

  // --- 5. 日模式点材料 → 是否跳到时分矩阵 ---
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  const grainBefore = await page.evaluate(() => (document.querySelector('.hatch-missing') ? 'minute' : 'day'));
  const chip = await page.$('main .glass-blur');
  if (chip) { await chip.click(); await page.waitForTimeout(900); }
  const grainAfter = await page.evaluate(() => (document.querySelector('.hatch-missing') ? 'minute' : 'day'));
  R.materialClick = { grainBefore, grainAfter, switched: grainBefore !== grainAfter };

  // --- 6. 时分矩阵：格数、缺格标记、答案文本 ---
  R.matrix = await page.evaluate(() => {
    const cells = Array.from(document.querySelectorAll('[title]')).filter((e) => e.title.includes('未提供') || e.title.includes('\n'));
    const empty = cells.filter((e) => e.title.includes('未提供'));
    const filled = cells.filter((e) => !e.title.includes('未提供') && e.title.includes('\n'));
    const sampleEmpty = empty[0] ? empty[0].title.split('\n').pop() : null;
    const sampleFilled = filled[0] ? filled[0].textContent.trim().slice(0, 60) : null;
    const rowHeads = Array.from(document.querySelectorAll('.sticky.left-0')).map((e) => e.textContent.trim().slice(0, 30));
    return { total: cells.length, empty: empty.length, filled: filled.length, sampleEmpty, sampleFilled, rowHeads: rowHeads.slice(0, 5) };
  });

  // --- 7. 对比度抽查：正文与背景 ---
  R.contrast = await page.evaluate(() => {
    const pick = ['main', 'header', 'nav'];
    const bgOf = (el) => {
      let e = el;
      while (e) { const c = getComputedStyle(e).backgroundColor; if (c && !c.includes('rgba(0, 0, 0, 0)')) return c; e = e.parentElement; }
      return 'rgb(3,5,10)';
    };
    const out = [];
    for (const sel of pick) {
      const root = document.querySelector(sel);
      if (!root) continue;
      const els = Array.from(root.querySelectorAll('*')).filter((e) => e.children.length === 0 && e.textContent.trim());
      for (const e of els.slice(0, 60)) {
        const cs = getComputedStyle(e);
        const fs = parseFloat(cs.fontSize);
        out.push({ sel, t: e.textContent.trim().slice(0, 18), fs, c: cs.color, bg: bgOf(e), op: cs.opacity });
      }
    }
    return out.slice(0, 120);
  });
  R.contrastSummary = R.contrast.map((x) => ({ ...x, ratio: +ratio(rgb(x.c), rgb(x.bg)).toFixed(2) }))
    .filter((x) => x.ratio < 3)
    .sort((a, b) => a.ratio - b.ratio)
    .slice(0, 20);

  // --- 8. 溢出裁剪：文字被容器切掉 ---
  R.clipped = await page.evaluate(() => {
    const out = [];
    for (const e of Array.from(document.querySelectorAll('span,p,div'))) {
      if (e.children.length) continue;
      const t = e.textContent.trim();
      if (!t || t.length < 4) continue;
      if (e.scrollWidth > e.clientWidth + 4 && getComputedStyle(e).overflow !== 'visible') {
        out.push({ t: t.slice(0, 30), sw: e.scrollWidth, cw: e.clientWidth, cls: String(e.className).slice(0, 40) });
      }
    }
    return out.slice(0, 15);
  });

  R.errors = errors.slice(0, 20);
  console.log(JSON.stringify(R, null, 1));
  await browser.close();
})();

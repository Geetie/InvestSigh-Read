// 视觉审查：程序化量测（无图片通道时也能拿到硬事实）
const { chromium } = require('playwright-core');
const path = require('path');

const EXEC = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://127.0.0.1:5391';

(async () => {
  const browser = await chromium.launch({
    executablePath: EXEC,
    args: ['--enable-unsafe-swiftshader', '--use-gl=swiftshader', '--ignore-gpu-blocklist'],
  });
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE ' + m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));

  const audit = async (label, url) => {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(3000);
    const r = await page.evaluate(() => {
      const rect = (e) => { const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
      const find = (sel) => Array.from(document.querySelectorAll(sel));
      const vis = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none'; };
      const bg = (e) => { const c = getComputedStyle(e); return { bg: c.backgroundColor, bgi: c.backgroundImage.slice(0, 60), blur: c.backdropFilter, op: c.opacity }; };

      const nav = document.querySelector('nav');
      const main = document.querySelector('main');
      const railBtns = find('nav button');
      const topBtns = find('header ~ div button, main ~ div button');
      // 找时间线
      const footerish = find('div').filter((d) => d.className && String(d.className).includes('zoom-slider'));
      const orb = find('button,div').filter((e) => { const c = getComputedStyle(e); return c.borderRadius.includes('9999') || c.borderRadius === '50%'; });

      return {
        doc: { sw: document.documentElement.scrollWidth, sh: document.documentElement.scrollHeight, vw: innerWidth, vh: innerHeight },
        nav: nav ? rect(nav) : null,
        navBtns: railBtns.map((b) => ({ t: b.textContent.slice(0, 20), ...rect(b) })),
        header: rect(document.querySelector('header')),
        main: main ? rect(main) : null,
        mainOverflowX: main ? getComputedStyle(main).overflowX : null,
        mainScrollW: main ? main.scrollWidth : null,
        mainScrollH: main ? main.scrollHeight : null,
        canvas: find('canvas').map((c) => ({ cls: c.className.slice(0, 40), w: c.width, h: c.height })),
        zoomSlider: footerish.length ? rect(footerish[0]) : null,
        circleEls: orb.slice(0, 6).map((e) => ({ cls: String(e.className).slice(0, 50), ...rect(e), ...bg(e) })),
        // 文字对比度抽查
        samples: find('p,span,h1,h2,button').filter(vis).slice(0, 24).map((e) => ({
          t: e.textContent.trim().slice(0, 26), fs: getComputedStyle(e).fontSize, c: getComputedStyle(e).color,
        })),
      };
    });
    console.log('=== ' + label + ' ===');
    console.log(JSON.stringify(r, null, 1));
  };

  await audit('DAY 01/10-K', BASE + '/?cat=01&sub=10-K');
  await audit('MINUTE 01/10-K', BASE + '/?cat=01&sub=10-K&grain=minute');
  await audit('AI OPEN 03/broker', BASE + '/?cat=03&sub=broker-research&ai=1');

  console.log('ERRORS ' + JSON.stringify(errors.slice(0, 20)));
  await browser.close();
})();

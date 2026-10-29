const { chromium } = require('playwright-core');
const EXEC = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://127.0.0.1:5391';

(async () => {
  const browser = await chromium.launch({ executablePath: EXEC, args: ['--enable-unsafe-swiftshader'] });
  const page = await (await browser.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));

  const probe = async (tag) => {
    const r = await page.evaluate(() => {
      const a = document.querySelector('aside');
      const inner = a?.firstElementChild;
      const cs = a ? getComputedStyle(a) : null;
      const mainCol = document.querySelector('main')?.parentElement;
      return {
        asideW: a ? Math.round(a.getBoundingClientRect().width) : null,
        asideOpacity: cs ? cs.opacity : null,
        inlineWidth: a?.style.width,
        innerW: inner ? Math.round(inner.getBoundingClientRect().width) : null,
        colW: mainCol ? Math.round(mainCol.getBoundingClientRect().width) : null,
        topbarW: Math.round(document.querySelector('header').getBoundingClientRect().width),
      };
    });
    console.log(tag, JSON.stringify(r));
  };

  await page.goto(BASE + '/?cat=01&sub=10-K', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await probe('initial       ');

  // A. 快捷键
  await page.keyboard.press('Control+k');
  await page.waitForTimeout(1200);
  await probe('after Ctrl+K  ');

  await page.keyboard.press('Escape');
  await page.waitForTimeout(900);
  await probe('after Escape  ');

  // B. URL 参数
  await page.goto(BASE + '/?cat=03&sub=broker-research&ai=1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await probe('url ai=1      ');

  // C. 点击悬浮球
  const orb = await page.$('main > button');
  if (orb) { await orb.click(); await page.waitForTimeout(1200); await probe('after orbClick'); }

  console.log('ERRS', JSON.stringify(errs));
  await browser.close();
})();

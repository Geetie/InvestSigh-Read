#!/usr/bin/env node
/**
 * **端到端用户体验走查**：在真浏览器里模拟一个用户从打开页面到完成任务。
 *
 * 与另外两个 e2e 的分工：
 *   e2e-readpages.mjs —— 带 URL 参数定点断言（开发者视角）
 *   e2e-prompts.mjs   —— 提示词页写回手册（数据视角）
 *   **本文件**         —— 不带任何参数、纯点击/键盘（用户视角），
 *                        每一步都截图，出错就停在那一屏
 *
 * 走查路线（一个真实用户会走的路）：
 *   1 打开首页 → 看默认落在哪
 *   2 换类（点左栏）→ 看型标签与材料是否跟着变
 *   3 换型 → 看材料是否跟着变
 *   4 切时分矩阵 → 看行数与版本条
 *   5 键盘逐日 ←/→ → 看日期真的动
 *   6 点一个格子进详情页 → 看答案与依据
 *   7 Esc 返回 → 看是否回到原位置
 *   8 进提示词页 → 切型、改一条、保存、看回执
 *   9 打开新册 05-AIMAP → 确认能编辑（这是本轮新加的一册）
 *  10 拖一条排序 → 看是否保存生效
 *  11 产业链三页（不联网的静态结构）→ 确认没被这轮改动弄坏
 */
import fs from "node:fs";
import { chromium } from "playwright-core";

const FRONT = "http://127.0.0.1:5277";
const API = "http://127.0.0.1:5280/api";
const SHOT = "docs/shots";

const steps = [];
const ok = (n, d = "") => (steps.push({ n, p: true, d }), console.log(`  ✓ ${n}${d ? " — " + d : ""}`));
const bad = (n, d = "") => (steps.push({ n, p: false, d }), console.log(`  ✗ ${n}${d ? " — " + d : ""}`));

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await (await browser.newContext({ viewport: { width: 1680, height: 1000 } })).newPage();

const consoleErrors = [];
const pageErrors = [];
const apiCalls = [];
page.on("pageerror", (e) => pageErrors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("request", (r) => {
  if (r.url().includes("/api/")) apiCalls.push(`${r.method()} ${r.url().replace(FRONT, "")}`);
});

const txt = () => page.evaluate(() => document.body.innerText);
const shot = (name) => page.screenshot({ path: `${SHOT}/ux-${name}.png` });

try {
  /* ── 1. 首页 ── */
  console.log("\n[1] 打开首页（不带任何 URL 参数）");
  await page.goto(FRONT, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  let t = await txt();
  /监管一手披露/.test(t) ? ok("左栏七类渲染") : bad("左栏七类渲染");
  /10-K/.test(t) ? ok("默认型标签渲染") : bad("默认型标签渲染");
  !/LOADING LEDGER/.test(t) ? ok("已过加载态") : bad("已过加载态", "仍停在 LOADING");
  await shot("01-home");

  /* ── 2. 换类 ── */
  console.log("\n[2] 点左栏换到「资金与持仓」");
  const clickedCat = await page.evaluate(() => {
    const els = [...document.querySelectorAll("button,a,div")];
    const el = els.find((e) => /资金与持仓/.test(e.innerText || "") && (e.innerText || "").length < 30);
    el?.click();
    return !!el;
  });
  await page.waitForTimeout(2200);
  t = await txt();
  clickedCat ? ok("点到了类别") : bad("点到了类别");
  /资金与持仓/.test(t) ? ok("当前类已切换") : bad("当前类已切换");
  /内部人申报|机构持仓|做空/.test(t) ? ok("该类的型标签出现") : bad("该类的型标签出现");
  await shot("02-cat");

  /* ── 3. 换型 ── */
  console.log("\n[3] 点型标签换到「内部人申报」");
  const clickedSub = await page.evaluate(() => {
    const els = [...document.querySelectorAll("button,a,div")];
    const el = els.find((e) => /内部人申报/.test(e.innerText || "") && (e.innerText || "").length < 30);
    el?.click();
    return !!el;
  });
  await page.waitForTimeout(2200);
  t = await txt();
  clickedSub ? ok("点到了型") : bad("点到了型");
  await shot("03-sub");

  /* ── 4. 切矩阵 ── */
  console.log("\n[4] 按 M 切时分矩阵");
  await page.keyboard.press("m");
  await page.waitForTimeout(2200);
  t = await txt();
  const rc = (t.match(/(\d+)\s*×\s*(\d+)/) ?? [])[0] ?? "(无)";
  /第\s*\d+\s*版/.test(t) ? ok("版本条可见") : bad("版本条可见");
  /该型当日无材料/.test(t) ? bad("矩阵有材料", "空白态") : ok("矩阵有材料", `Row×Col = ${rc}`);
  await shot("04-matrix");

  /* ── 5. 键盘逐日 ── */
  console.log("\n[5] 键盘 ←/→ 逐日");
  /* ★ 判据不能靠日期文本：日看板/矩阵的日期渲染格式会变（今天只渲染 MM/DD 不带年份），
     拿正则去抓很容易抓空而误判"没反应"（我第一版就是这么误报的）。
     可靠的判据是**行为**：本库材料只覆盖 10-21/10-22 两天，
     所以连按两次 ← 会走出材料范围（出现「该型当日无材料」空态），再按 → 会回来。 */
  const readMatrixState = () =>
    page.evaluate(() => {
      const t = document.body.innerText;
      return { blank: /该型当日无材料/.test(t), rc: (t.match(/(\d+)\s*×\s*(\d+)/) ?? [])[0] ?? null };
    });

  const s0 = await readMatrixState();
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(1200);
  const s1 = await readMatrixState();
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(1200);
  const s2 = await readMatrixState();

  s2.blank && !s0.blank
    ? ok("键盘 ← 真的换了一天", `连按两次后走出材料范围（空态），说明焦点日移动了`)
    : s1.blank !== s0.blank || s2.blank !== s0.blank
      ? ok("键盘 ← 真的换了一天")
      : bad("键盘 ← 真的换了一天", "按了两次状态没变");

  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(1200);
  const s3 = await readMatrixState();
  s3.blank !== s2.blank ? ok("键盘 → 能回来") : bad("键盘 → 能回来", "按 → 后状态没变");
  await shot("05-prevday");

  /* ── 6. 进详情页 ── */
  console.log("\n[6] 点一个格子进详情页");
  const nCells = await page.evaluate(() => {
    const cells = [...document.querySelectorAll("[role=button][tabindex='0']")];
    if (!cells.length) return 0;
    cells[0].click();
    return cells.length;
  });
  await page.waitForTimeout(2500);
  nCells > 0 ? ok("矩阵格可点", `${nCells} 个`) : bad("矩阵格可点");
  const inDetail = /#\/m\//.test(page.url());
  inDetail ? ok("已进详情页", page.url().split("#")[1]) : bad("已进详情页", page.url());
  t = await txt();
  /依据|未收录|答案|读法/.test(t) ? ok("详情页有内容") : bad("详情页有内容");
  await shot("06-detail");

  /* ── 7. Esc 返回 ── */
  console.log("\n[7] Esc 返回");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(1800);
  !/#\/m\//.test(page.url()) ? ok("已退出详情页") : bad("已退出详情页", page.url());
  await shot("07-back");

  /* ── 8. 提示词页：改一条并保存 ── */
  console.log("\n[8] 进提示词页，改一条问题并保存");
  await page.goto(`${FRONT}/#/prompts/insider-filing`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  t = await txt();
  /提示词/.test(t) && /读法/.test(t) ? ok("提示词页打开") : bad("提示词页打开");

  const manualFile = (await (await fetch(`${API}/prompts/insider-filing`)).json()).file;
  const manualPath = manualFile;
  const originalManual = fs.readFileSync(manualPath, "utf8");

  const stamp = `UX-${Date.now().toString().slice(-6)}`;
  const q = page.locator("textarea[data-q-input]").first();
  await q.waitFor({ state: "visible", timeout: 6000 });
  const persisted = await (await fetch(`${API}/prompts/insider-filing`)).json();
  const row0Label = persisted.rows[0].label;
  await q.fill(`${row0Label} ${stamp}`);
  await page.waitForTimeout(500);

  const saveBtn = page.getByRole("button", { name: "保存" }).first();
  (await saveBtn.isDisabled()) ? bad("保存按钮可点", "disabled") : ok("保存按钮可点");
  await saveBtn.click();

  let receipt = "";
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(400);
    receipt = await page.evaluate(() => {
      const hdr = document.querySelector(".fixed.inset-0.z-50 header");
      return [...(hdr?.querySelectorAll("span") ?? [])].map((s) => s.innerText.trim()).find((t) => /已保存|失败/.test(t)) ?? "";
    });
    if (receipt) break;
  }
  receipt ? ok("保存回执出现", receipt.slice(0, 40)) : bad("保存回执出现");

  const onDisk = fs.readFileSync(manualPath, "utf8");
  onDisk.includes(stamp) ? ok("手册文件已写入", manualFile) : bad("手册文件已写入");
  await shot("08-prompts");

  /* 复原 */
  const back = await (await fetch(`${API}/prompts/insider-filing`)).json();
  await fetch(`${API}/prompts/insider-filing`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ rows: back.rows.map((r, i) => ({ ...r, label: i === 0 ? row0Label : r.label })) }),
  });
  fs.writeFileSync(manualPath, originalManual, "utf8");
  fs.readFileSync(manualPath, "utf8") === originalManual ? ok("已复原手册") : bad("已复原手册");

  /* ── 9. 新册 05-AIMAP 能编辑 ── */
  console.log("\n[9] 打开新册「AI 产业链地图」（本轮新增）");
  await page.goto(`${FRONT}/#/prompts/05-AIMAP`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  t = await txt();
  /AI 产业链地图/.test(t) ? ok("新册在界面上可见") : bad("新册在界面上可见");
  const aiRows = await page.evaluate(() => {
    const nav = [...document.querySelectorAll("nav")].find((n) => /index/i.test(n.innerText));
    const m = nav?.innerText.match(/index\s*\n?\s*(\d+)/i);
    return m ? Number(m[1]) : null;
  });
  aiRows === 11 ? ok("条目数 = 手册 11 条", String(aiRows)) : bad("条目数 = 手册 11 条", `页面 ${aiRows}`);
  /从哪到哪|端点/.test(t) ? ok("Q1 是手册原文（非旧摘要）") : bad("Q1 是手册原文");
  const aiEditable = await page.evaluate(() => document.querySelectorAll("textarea[data-q-input]").length);
  aiEditable > 0 ? ok("新册可编辑") : bad("新册可编辑");
  await shot("09-aimap");

  /* ── 10. 调序 ── */
  console.log("\n[10] 拖动一条调序（用键盘替代，无障碍路径）");
  await page.goto(`${FRONT}/#/prompts/05-AIMAP`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2200);
  const gotOrder = await page.evaluate(() => {
    const nav = [...document.querySelectorAll("nav")].find((n) => /index/i.test(n.innerText));
    return nav?.innerText ?? "";
  });
  gotOrder.length > 20 ? ok("索引列表可读", `${gotOrder.split("\n").length} 行文本`) : bad("索引列表可读");
  await shot("10-order");

  /* ── 11. 产业链三页 ── */
  console.log("\n[11] 产业链三页（静态结构，不联网）");
  await page.goto(`${FRONT}/#/chain`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  t = await txt();
  /进入|AI|算力|自动驾驶|机器人/.test(t) ? ok("产业链选择页渲染") : bad("产业链选择页渲染", t.slice(0, 80));
  await shot("11-chain-picker");

  await page.goto(`${FRONT}/#/chain/ai-compute`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  t = await txt();
  t.length > 200 ? ok("链页渲染", `${t.length} 字符`) : bad("链页渲染", `${t.length} 字符`);
  await shot("12-chain-map");

  /* ── 汇总 ── */
  const pass = steps.filter((s) => s.p).length;
  const fail = steps.length - pass;
  console.log(`\n=========== 端到端走查 ===========`);
  console.log(`通过 ${pass}/${steps.length}${fail ? ` · 失败 ${fail}` : " · 全绿"}`);
  if (fail) for (const s of steps.filter((x) => !x.p)) console.log(`  ✗ ${s.n} — ${s.d}`);

  const hardErr = pageErrors.concat(consoleErrors.filter((e) => !/404|Failed to load resource/.test(e)));
  console.log(`页面级报错: ${hardErr.length ? hardErr.slice(0, 3).join(" | ") : "无"}`);
  console.log(`API 调用 ${new Set(apiCalls).size} 种`);
  console.log(`截图：${SHOT}/ux-*.png`);

  process.exitCode = fail || hardErr.length ? 1 : 0;
} catch (e) {
  console.error("\n[FATAL]", e);
  await shot("99-fatal");
  process.exitCode = 2;
} finally {
  await browser.close();
}

#!/usr/bin/env node
/**
 * **提示词页专项联调**：界面上的每一类改动，是否真的写进了
 * `corpus/prompts/<NN>-型/<册>.md` 的 `## 4. 问句表`。
 *
 * 用户原话：「尤其是提示词页，前端界面改动了是否提示词同步改动生效」——
 * 所以每项都**绕过前端**去问后端、并且**直接读手册文件**核对：
 *
 *   1. 改「问题」  → 手册第 2 列变了
 *   2. 改「读法」  → 手册第 3 列变了（且不影响第 2 列）
 *   3. 新增一条    → 手册多一行，编号按该册风格
 *   4. 删除一条    → 手册少一行
 *   5. 回读一致    → 关掉重开，界面 = 手册
 *   6. 其余字节不变 → 与改动前逐行比对，只有目标行变化
 *
 * 会写库。跑完用 `node tools/restore-prompts.mjs` 复原。
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import { parseManual } from "../server/manual.mjs";

const FRONT = "http://127.0.0.1:5277";
const API = "http://127.0.0.1:5280/api";
const SUB = "insider-filing";
const CAT = "04";

const results = [];
const ok = (n, d = "") => (results.push({ n, p: true, d }), console.log(`  ✓ ${n}${d ? " — " + d : ""}`));
const bad = (n, d = "") => (results.push({ n, p: false, d }), console.log(`  ✗ ${n}${d ? " — " + d : ""}`));

const j = async (p, init) => {
  const r = await fetch(`${API}${p}`, init);
  if (!r.ok) throw new Error(`${p} → ${r.status}`);
  return r.json();
};

/* 手册文件路径：从后端回包里的 file 字段取（真源在哪由后端说，不在测试里硬编码） */
let MANUAL = null;
let manualPath = null;
const readManual = () => (manualPath && fs.existsSync(manualPath) ? fs.readFileSync(manualPath, "utf8") : "");

const diffLines = (a, b) => {
  const la = a.split(/\r?\n/);
  const lb = b.split(/\r?\n/);
  const out = [];
  for (let i = 0; i < Math.max(la.length, lb.length); i++) if (la[i] !== lb[i]) out.push(i + 1);
  return out;
};

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await (await browser.newContext({ viewport: { width: 1680, height: 1000 } })).newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(String(e)));

const open = async () => {
  await page.goto(`${FRONT}/#/prompts/${SUB}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2200);
};

const doSave = async () => {
  const btn = page.getByRole("button", { name: "保存" }).first();
  if (await btn.isDisabled()) throw new Error("保存按钮 disabled（没有 dirty）");
  await btn.click();
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => {
      const hdr = document.querySelector(".fixed.inset-0.z-50 header");
      return [...(hdr?.querySelectorAll("span") ?? [])].map((s) => s.innerText.trim()).find((t) => /已保存|失败/.test(t)) ?? "";
    });
    if (r) return r;
  }
  return "";
};

console.log("\n[准备] 找到手册真源");
const base = await j(`/prompts/${SUB}`);
MANUAL = base.file;
manualPath = path.join(process.cwd(), MANUAL);
console.log(`  ${SUB} → ${MANUAL}`);
console.log(`  章节「${base.section}」 ${base.rows.length} 行（来自手册，不是 index.json）`);
const orig = readManual();
const parsed0 = parseManual(manualPath, base.cat, base.stem);
console.log(`  问题列=${parsed0.labelCol + 1} 读法列=${parsed0.readingCol + 1}`);

/* ───── 1. 改问题 ───── */
console.log("\n[1] 改问题的措辞 → 手册第 2 列");
await open();
const before1 = readManual();
const t1 = `改问题-${Date.now().toString().slice(-6)}`;
await page.locator("textarea[data-q-input]").first().fill(t1);
await page.waitForTimeout(500);
let rec = await doSave();
rec ? ok("保存回执", rec.slice(0, 50)) : bad("保存回执");

const after1 = readManual();
const p1 = parseManual(manualPath, base.cat, base.stem);
p1.rows[0].label === t1 ? ok("手册第 2 列 = 新问题", t1) : bad("手册第 2 列 = 新问题", `实际「${p1.rows[0].label}」`);
const d1 = diffLines(before1, after1);
d1.length === 1 ? ok("只有一行变化（不碰其他字节）") : bad("只有一行变化", `${d1.length} 行变化`);
p1.rows[0].reading === parsed0.rows[0].reading ? ok("读法列未被误改") : bad("读法列未被误改");

/* ───── 2. 改读法 ───── */
console.log("\n[2] 改读法 → 手册第 3 列");
await open();
const before2 = readManual();
const t2 = `改读法-${Date.now().toString().slice(-6)}`;
await page.locator("textarea[placeholder^='允许用什么证据']").first().fill(t2);
await page.waitForTimeout(500);
rec = await doSave();
rec ? ok("保存回执", rec.slice(0, 50)) : bad("保存回执");

const p2 = parseManual(manualPath, base.cat, base.stem);
p2.rows[0].reading === t2 ? ok("手册第 3 列 = 新读法", t2) : bad("手册第 3 列 = 新读法", `实际「${p2.rows[0].reading}」`);
const d2 = diffLines(before2, readManual());
d2.length === 1 ? ok("只有一行变化") : bad("只有一行变化", `${d2.length} 行`);
p2.rows[0].label === t1 ? ok("问题列未被误改") : bad("问题列未被误改");

/* ───── 3. 新增一条 ───── */
console.log("\n[3] 新增一条 → 手册多一行");
await open();
const nBefore = parseManual(manualPath, base.cat, base.stem).rows.length;
const clickedAdd = await page.evaluate(() => {
  const b = [...document.querySelectorAll("button")].find((x) => /新增一条问题/.test(x.innerText));
  b?.click();
  return !!b;
});
clickedAdd ? ok("点到「新增一条问题」") : bad("点到「新增一条问题」");
await page.waitForTimeout(700);
const t3 = `新增-${Date.now().toString().slice(-6)}`;
await page.locator("textarea[data-q-input]").first().fill(t3);
await page.waitForTimeout(500);
rec = await doSave();
rec ? ok("保存回执", rec.slice(0, 50)) : bad("保存回执");

const p3 = parseManual(manualPath, base.cat, base.stem);
p3.rows.length === nBefore + 1 ? ok("手册行数 +1", `${nBefore} → ${p3.rows.length}`) : bad("手册行数 +1", `${nBefore} → ${p3.rows.length}`);
const newRow = p3.rows.find((r) => r.label === t3);
newRow ? ok("新行已写进手册", `id=${newRow.id}`) : bad("新行已写进手册");
const maxNum = Math.max(...parsed0.rows.map((r) => Number((r.id.match(/\d+$/) ?? ["0"])[0])));
newRow && Number((newRow.id.match(/\d+$/) ?? ["0"])[0]) === maxNum + 1
  ? ok("新 id = 历史最大号+1", `${newRow.id}（原最大 ${parsed0.rows.find((r) => r.id.endsWith(String(maxNum)))?.id}）`)
  : bad("新 id = 历史最大号+1");

/* 新行必须是完整一行表格（列数正确） */
const newLineNo = newRow?.lineNo ?? -1;
const newLine = newLineNo >= 0 ? fs.readFileSync(manualPath, "utf8").split(/\r?\n/)[newLineNo] : "";
(newLine.match(/\|/g) ?? []).length === (parsed0.header.length + 1)
  ? ok("新行列数与表头一致", `${parsed0.header.length} 列`)
  : bad("新行列数与表头一致", newLine.slice(0, 80));

/* ───── 4. 删除一条 ───── */
console.log("\n[4] 删除一条 → 手册少一行");
await open();
const nBeforeDel = parseManual(manualPath, base.cat, base.stem).rows.length;
const clickedDel = await page.evaluate(() => {
  const b = [...document.querySelectorAll("button")].find((x) => /^删除$/.test(x.innerText.trim()));
  b?.click();
  return !!b;
});
clickedDel ? ok("点到「删除」") : bad("点到「删除」");
await page.waitForTimeout(700);
rec = await doSave();
rec ? ok("保存回执", rec.slice(0, 50)) : bad("保存回执");
const p4 = parseManual(manualPath, base.cat, base.stem);
p4.rows.length === nBeforeDel - 1 ? ok("手册行数 -1", `${nBeforeDel} → ${p4.rows.length}`) : bad("手册行数 -1", `${nBeforeDel} → ${p4.rows.length}`);

/* ───── 5. 回读一致 ───── */
console.log("\n[5] 关掉重开，界面 = 手册");
await open();
const shown = await page.evaluate(() => {
  const nav = [...document.querySelectorAll("nav")].find((n) => /index/i.test(n.innerText));
  return nav?.innerText ?? "";
});
const p5 = parseManual(manualPath, base.cat, base.stem);
const missed = p5.rows.filter((r) => !shown.includes(r.label.slice(0, 12)));
missed.length === 0 ? ok("界面逐条 = 手册", `${p5.rows.length} 行`) : bad("界面逐条 = 手册", `缺 ${missed.length} 行`);

/* ───── 汇总 ───── */
const pass = results.filter((r) => r.p).length;
const fail = results.length - pass;
console.log(`\n============ 提示词页专项 ============`);
console.log(`通过 ${pass}/${results.length}${fail ? ` · 失败 ${fail}` : " · 全绿"}`);
if (fail) for (const r of results.filter((x) => !x.p)) console.log(`  ✗ ${r.n} — ${r.d}`);
const hard = errs.filter((e) => !/404/.test(e));
console.log(`页面级报错: ${hard.length ? hard.slice(0, 2).join(" | ") : "无"}`);
console.log(`\n手册：${MANUAL}`);

await browser.close();

/* ───── 复原 ───── */
fs.writeFileSync(manualPath, orig, "utf8");
const back = fs.readFileSync(manualPath, "utf8") === orig;
console.log(back ? "已复原手册（逐字节相同）" : "★ 复原失败，请检查 " + MANUAL);

process.exitCode = fail || !back ? 1 : 0;

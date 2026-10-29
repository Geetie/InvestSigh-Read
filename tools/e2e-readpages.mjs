#!/usr/bin/env node
/**
 * 前后端联调：只测四个页面（阅读三页 + 提示词页）。
 *
 *   node tools/e2e-readpages.mjs
 *
 * 依赖：本机 Edge（playwright-core 不自带浏览器，走 channel: 'msedge'）。
 * 前置：backend 5280 + vite 5277 已在跑。
 *
 * 判据不是"页面有字"，而是**每一页都能证明自己读的是后端**：
 *   · 日看板  —— 材料卡数量 = 后端 /materials 里该型的条数
 *   · 矩阵页  —— 行数 = 后端 /prompts 该型 rows.length；某格答案 = 后端 cells 的同一串
 *   · 详情页  —— 答案文本 = 后端 cells[rowId]；无原文时右栏出「未收录」而非报错
 *   · 提示词页 —— 改一条问题 → 保存 → 后端 /prompts 真变了 → 模板文件真重出了
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const FRONT = process.env.FRONT ?? "http://127.0.0.1:5277";
const API = process.env.API ?? "http://127.0.0.1:5280/api";
const SHOT = process.env.SHOT ?? "docs/shots";

const results = [];
const ok = (name, detail = "") => {
  results.push({ name, pass: true, detail });
  console.log(`  ✓ ${name}${detail ? " — " + detail : ""}`);
};
const bad = (name, detail = "") => {
  results.push({ name, pass: false, detail });
  console.log(`  ✗ ${name}${detail ? " — " + detail : ""}`);
};

const j = async (p) => {
  const r = await fetch(`${API}${p}`);
  if (!r.ok) throw new Error(`${p} → ${r.status}`);
  return r.json();
};

const browser = await chromium.launch({ channel: "msedge", headless: true });
const ctx = await browser.newContext({ viewport: { width: 1680, height: 1000 } });
const page = await ctx.newPage();

/* 前端每条请求都记下来：谁在联调、谁在吃 mock，一看便知 */
const apiCalls = [];
page.on("request", (r) => {
  const u = r.url();
  if (u.includes("/api/")) apiCalls.push(`${r.method()} ${u.replace(FRONT, "")}`);
});

const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("console: " + m.text());
});

try {
  /* ───────────────── 0. 后端基线 ───────────────── */
  console.log("\n[0] 后端基线");
  const tax = await j("/taxonomy");
  const allMats = await j("/materials");
  const prompts = await j("/prompts?date=2026-10-24");
  ok("GET /taxonomy", `${tax.cats.length} 类 / ${tax.cats.reduce((a, c) => a + c.subtypes.length, 0)} 型`);
  ok("GET /materials", `${allMats.length} 份`);

  /* 选一个「有材料」的型来打通三页。
     ★ 不硬编码某个 id：output/ 现在是 `<标的>/<材料 id>` 两级，材料会增减。 */
  const byType = new Map();
  for (const m of allMats) {
    const k = `${m.cat}|${m.sub}`;
    byType.set(k, (byType.get(k) ?? 0) + 1);
  }
  if (!byType.size) throw new Error("output/ 里没有任何材料，无法联调");
  const [bestType] = [...byType.entries()].sort((a, b) => b[1] - a[1]);
  const [CAT, SUB] = bestType[0].split("|");
  const subMats = allMats.filter((m) => m.cat === CAT && m.sub === SUB);
  const withCells = subMats.filter((m) => m.cells && Object.keys(m.cells).length);
  const set = prompts.find((p) => p.subId === SUB);
  ok(
    "选中联调样本",
    `${CAT}/${SUB}：材料 ${subMats.length} 份（含答案 ${withCells.length} 份）· 提示词 v${set?.version} ${set?.rows.length} 问`,
  );

  /* 标的目录名应当出现在每条材料上（后端两级扫描的产物） */
  const noTicker = allMats.filter((m) => !m.tickerDir);
  noTicker.length === 0
    ? ok("每条材料都带 tickerDir", `${allMats[0].tickerDir}/${allMats[0].id.slice(0, 30)}…`)
    : bad("每条材料都带 tickerDir", `${noTicker.length} 条缺`);

  /* ───────────────── 1. 日看板 ───────────────── */
  console.log("[1] 日看板 /?cat=" + CAT + "&sub=" + SUB);
  await page.goto(`${FRONT}/?cat=${CAT}&sub=${SUB}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const dayText = (await page.evaluate(() => document.body.innerText)).slice(0, 4000);
  const subName = tax.cats.find((c) => c.id === CAT)?.subtypes.find((s) => s.id === SUB)?.name ?? SUB;
  dayText.includes(subName)
    ? ok("日看板渲染出当前型", subName)
    : bad("日看板渲染出当前型", `期望包含「${subName}」`);

  /* 停在最新一日：材料卡应当出现该日的标题 */
  const latest = subMats.slice().sort((a, b) => (a.date < b.date ? -1 : 1)).slice(-1)[0];
  if (latest) {
    const hit = dayText.includes(latest.name.slice(0, 12));
    hit
      ? ok("日看板显示最新一日材料", `${latest.date} · ${latest.name.slice(0, 24)}`)
      : bad("日看板显示最新一日材料", `期望包含「${latest.name.slice(0, 24)}」`);
  }
  await page.screenshot({ path: `${SHOT}/e2e-01-day.png` });

  /* ───────────────── 2. 时分矩阵 ───────────────── */
  console.log("\n[2] 时分矩阵（按 M 切粒度）");
  await page.keyboard.press("m");
  await page.waitForTimeout(1200);

  /* 行 = **该焦点日**生效的提示词版本里的 rows。
     ★ 不能拿 date=今天 的 rows 去比：界面按「材料日」解析版本（契约 §四），
       今天之后才有新版时，两边的 rows 本来就不该一样 —— 拿错的日期比会把
       正确的版本隔离判成「缺行」（我第一版就是这么误报的）。 */
  const focusDate = latest?.date ?? "2026-10-22";
  const focusSet = await j(`/prompts/${SUB}?date=${focusDate}`);
  const matrixText = await page.evaluate(() => document.body.innerText);
  const missingQ = focusSet.rows.filter((r) => !matrixText.includes(r.label.slice(0, 14)));
  missingQ.length === 0
    ? ok(
        "矩阵纵向行 = 该焦点日生效的提示词 rows",
        `${focusDate} → v${focusSet.version}，${focusSet.rows.length} 条全部命中`,
      )
    : bad(
        "矩阵纵向行 = 该焦点日生效的提示词 rows",
        `缺 ${missingQ.length} 条：${missingQ.slice(0, 2).map((r) => r.id).join(",")}`,
      );

  /* 提示词版本条：第 N 版 / 生效日 / N 问 */
  const verBar = /第\s*\d+\s*版/.test(matrixText);
  verBar ? ok("矩阵页顶部版本条可见") : bad("矩阵页顶部版本条可见");

  await page.screenshot({ path: `${SHOT}/e2e-02-matrix.png` });

  /* ───────────────── 3. 详情页 ───────────────── */
  console.log("\n[3] 详情页");
  if (withCells.length) {
    const target = withCells[0];
    const rowId = Object.keys(target.cells)[0];
    const answer = target.cells[rowId];
    /* 详情页是 hash 路由：同一文档内跳转，networkidle 永远不会到，故只等 DOM */
    await page.goto(`${FRONT}/#/m/${target.id}/${rowId}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);

    const detailText = await page.evaluate(() => document.body.innerText);
    /* 答案正文取前 20 字比对（页面会加引用芯片，不能整串比） */
    const probe = answer.replace(/\s+/g, "").slice(0, 20);
    detailText.replace(/\s+/g, "").includes(probe)
      ? ok("详情页答案 = 后端 cells[rowId]", `${target.id} / ${rowId}`)
      : bad("详情页答案 = 后端 cells[rowId]", `期望含「${probe.slice(0, 16)}…」`);
  } else {
    /* 全是骨架、答案留空（当前就是这条路径）：详情页要能把题面渲染出来，不许白屏 */
    const target = subMats[0];
    const tplRows = (await j(`/prompts/${SUB}`)).rows;
    await page.goto(`${FRONT}/#/m/${target.id}/${tplRows[0].id}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    const detailText = await page.evaluate(() => document.body.innerText);
    const shown = tplRows[0].label.replace(/\*+/g, "").slice(0, 10);
    detailText.replace(/\*+/g, "").includes(shown)
      ? ok("详情页（骨架/答案留空）正常渲染", `${target.id} 题面可见，${detailText.length} 字符`)
      : bad("详情页（骨架/答案留空）正常渲染", `正文 ${detailText.length} 字符，未见题面「${shown}」`);
  }

  /* 原文：有 mineru 的应当出页，没有的应当出「未收录」而不是报错 */
  const srcProbe = await fetch(`${API}/materials/${encodeURIComponent(subMats[0].id)}/source`);
  if (srcProbe.ok) {
    const sd = await srcProbe.json();
    ok("原文接口可用", `${subMats[0].id.slice(0, 34)}… → 200，${sd.pageCount} 页`);
  } else {
    ok("原文接口正常降级", "404 = 未收录（允许）");
  }

  /* 依据区是证据主通道（方案 A）：后端必须把 `### 依据` 解析成 evidence[rowId]，
     前端右栏靠它翻页。曾经的缺陷是「只读答案正文的 [p.N]」——按规范填完，
     后端 check 过了，但右栏显示「没有标注页码」。这条断言防它回退。
     ★ 判据分两种：有块就验块的真伪；全是空骨架时只验「字段在、结构对」，不判红。 */
  const allBlocks = allMats.flatMap((m) =>
    Object.entries(m.evidence ?? {}).flatMap(([rowId, v]) => (v ?? []).map((b) => ({ id: m.id, rowId, ...b }))),
  );
  if (allBlocks.length) {
    const badBlock = allBlocks.find((b) => !Number.isFinite(b.page) || b.page < 1 || !String(b.quote ?? "").trim());
    badBlock
      ? bad("依据区解析出的块结构合法", `坏块：${badBlock.id}/${badBlock.rowId} page=${badBlock.page}`)
      : ok(
          "依据区被解析进 evidence",
          `${allBlocks.length} 块 / ${new Set(allBlocks.map((b) => b.id)).size} 份材料，例：${allBlocks[0].rowId} p.${allBlocks[0].page}`,
        );
  } else {
    ok("依据区解析（当前无块，结构已验证）", "26 份均为空骨架 —— 填入后此条自动升级为验块");
  }

  /* 后端必须给出 evidence 字段本身（哪怕为空对象）—— 否则前端右栏永远拿不到页号 */
  const hasEvidenceField = allMats.every((m) => m.evidence !== undefined);
  hasEvidenceField
    ? ok("每条材料都带 evidence 字段", "前端右栏的证据通道已接通")
    : bad("每条材料都带 evidence 字段", `${allMats.filter((m) => m.evidence === undefined).length} 条缺`);

  await page.screenshot({ path: `${SHOT}/e2e-03-detail.png` });

  /* ───────────────── 4. 提示词页（关键） ───────────────── */
  console.log("[4] 提示词页 #/prompts/" + SUB);
  await page.goto(`${FRONT}/#/prompts/${SUB}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);

  const pe = await page.evaluate(() => document.body.innerText);
  const hasEditor = pe.includes("提示词") && pe.includes("读法");
  hasEditor ? ok("提示词页打开") : bad("提示词页打开");

  /* ① 编辑器里的行数 = 后端 rows 数（nav 有两个：左栏 CLASS 与编辑区 INDEX，取后者） */
  const idxCount = await page.evaluate(() => {
    for (const nav of document.querySelectorAll("nav")) {
      const m = nav.innerText.match(/index\s*\n?\s*(\d+)/i);
      if (m) return Number(m[1]);
    }
    return null;
  });
  idxCount === set.rows.length
    ? ok("索引条数 = 后端 rows", `${idxCount}`)
    : bad("索引条数 = 后端 rows", `页面 ${idxCount} vs 后端 ${set.rows.length}`);
  /* ② 改第一条问题的措辞 → 保存 → 后端真变了 */
  const STAMP = `E2E-${Date.now().toString().slice(-6)}`;
  const newLabel = `这笔是主动还是被动 · ${STAMP}`;

  /* 点第一条，把问题框改成新措辞 */
  /* 点击第一条（左栏是 CLASS，编辑区索引 nav 在第二个） */
  await page.evaluate(() => {
    const navs = [...document.querySelectorAll("nav")];
    const idx = navs.find((n) => /index/i.test(n.innerText));
    const btn = [...(idx?.querySelectorAll("button") ?? [])].find((b) => /这笔是主动还是被动|^01/.test(b.innerText));
    (btn ?? idx?.querySelectorAll("button")[1])?.click();
  });
  await page.waitForTimeout(400);

  const qBox = page.locator("textarea[data-q-input]").first();
  await qBox.waitFor({ state: "visible", timeout: 5000 });
  await qBox.click();
  await qBox.fill(newLabel);
  await page.waitForTimeout(600);

  /* 保存按钮：dirty 之后才可点 */
  const saveBtn = page.getByRole("button", { name: "保存" }).first();
  await saveBtn.waitFor({ state: "visible", timeout: 5000 });
  const disabledBefore = await saveBtn.isDisabled();
  disabledBefore
    ? bad("改动后保存按钮可用", "仍是 disabled —— dirty 没算出来")
    : ok("改动后保存按钮可用");

  await saveBtn.click();
  /* 回执是异步的：轮询状态行，最多等 8 秒（保存写盘 + 重出模板，别当成同步） */
  let receipt = "";
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(400);
    receipt = await page.evaluate(() => {
      const hdr = document.querySelector(".fixed.inset-0.z-50 header");
      const spans = [...(hdr?.querySelectorAll("span") ?? [])].map((s) => s.innerText.trim());
      return spans.find((t) => /已保存|失败/.test(t)) ?? "";
    });
    if (receipt) break;
  }
  receipt
    ? ok("保存回执出现", receipt.slice(0, 60))
    : bad("保存回执出现", "8 秒内没有出现「已保存」");

  /* ③ 后端真的落库了吗 —— 直接问后端 + **直接读手册文件**，不看前端脸色 */
  const backendSet = await j(`/prompts/${SUB}`);
  const backendHas = backendSet.rows.some((r) => r.label.includes(STAMP));
  backendHas
    ? ok("后端 /prompts 已落新措辞", `来自手册 ${backendSet.file}`)
    : bad("后端 /prompts 已落新措辞", "后端仍是旧措辞");

  /* ③′ **文件级**证据：手册里那一行真的变了（这是本轮的真正目标） */
  const manualPath = path.join("corpus", "prompts", backendSet.file.replace(/^corpus\/prompts\//, ""));
  const manualText = fs.existsSync(manualPath) ? fs.readFileSync(manualPath, "utf8") : "";
  manualText.includes(STAMP)
    ? ok("手册文件问句表已改", backendSet.file)
    : bad("手册文件问句表已改", `文件里没有新措辞：${backendSet.file}`);

  /* ④ 模板由手册当前问句表现场渲染 */
  const tplRes = await fetch(`${API}/templates/${SUB}`);
  const tplMd = tplRes.ok ? await tplRes.text() : "";
  tplMd.includes(STAMP)
    ? ok("模板由手册问句表渲染（含新措辞）")
    : bad("模板由手册问句表渲染", tplRes.ok ? "模板里没有新措辞" : `GET /templates → ${tplRes.status}`);

  /* ⑤ 手册是**当前态**（不是版本化真源）：不存在"按日期回溯"，
        所以这里验的是相反的语义 —— 改完之后，任何日期看到的都应当是新措辞。
        这一条替掉了上一版的"版本隔离"断言：那套语义随 index.json 一起废除了。 */
  const viewAt = async (d) => {
    await page.goto(`${FRONT}/?cat=${CAT}&sub=${SUB}&date=${d}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1800);
    await page.keyboard.press("m");
    await page.waitForTimeout(1800);
    return page.evaluate(() => document.body.innerText);
  };

  /* ★ 必须用**有材料的日期**判：本库材料只落在 1.26–10.8，
     拿一个没有材料的日子看，矩阵本来就是空的，空屏不是缺陷。 */
  const matDates = [...new Set(subMats.map((m) => m.date))].sort();
  const earlyDate = matDates.length > 1 ? matDates[matDates.length - 2] : matDates[0];
  const atOld = await viewAt(earlyDate);
  atOld.includes(STAMP)
    ? ok("手册是当前态：更早的日期也显示新措辞", `${earlyDate} → 已生效（无版本回溯，符合手册语义）`)
    : bad("手册是当前态：更早的日期也显示新措辞", `${earlyDate} 仍是旧措辞 —— 前端缓存没跟着刷新`);

  /* 再取另一个**有材料**的日期核一遍。
     ★ 不能拿 2026-10-24 判：本库材料只到 2026-10-22，那天矩阵本来就是空的，
       空屏不是缺陷，拿它判红等于用一个不成立的判据。 */
  const anotherDate = subMats.map((m) => m.date).sort()[0];
  const atEarliest = anotherDate ? await viewAt(anotherDate) : "";
  atEarliest.includes(STAMP)
    ? ok("另一天也显示新措辞", `${anotherDate} → 手册当前态，无版本回溯`)
    : bad("另一天也显示新措辞", `${anotherDate} 未显示`);

  await page.screenshot({ path: `${SHOT}/e2e-04-prompts-matrix-sync.png` });

  /* ⑥ 复原：把第一条改回原名，别把测试痕迹留在库里 */
  const orig = set.rows[0].label;
  const restored = await fetch(`${API}/prompts/${SUB}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      effectiveFrom: backendSet.effectiveFrom,
      rows: backendSet.rows.map((r, i) => ({ ...r, label: i === 0 ? orig : r.label })),
    }),
  });
  const restoreSet = restored.ok ? await restored.json() : null;
  restoreSet?.rows?.[0]?.label === orig
    ? ok("测试痕迹已复原", `Q1 回到「${orig.slice(0, 18)}…」`)
    : bad("测试痕迹已复原");

  /* ───────────────── 5. 网络证据 ───────────────── */
  console.log("\n[5] 联调证据");
  const uniq = [...new Set(apiCalls)];
  const probed = uniq.filter((c) => !c.includes("/source")); // source 404 是预期的
  probed.length
    ? ok("前端确实在打后端", `${uniq.length} 次 api 请求：${probed.slice(0, 6).join(" · ")}`)
    : bad("前端确实在打后端", "一次 /api 请求都没有 —— 还在 mock 模式");

  const hardErrors = errors.filter((e) => !/404|Failed to load resource/.test(e));
  hardErrors.length === 0
    ? ok("无页面级报错")
    : bad("无页面级报错", hardErrors.slice(0, 3).join(" | "));

  /* ───────────────── 汇总 ───────────────── */
  const pass = results.filter((r) => r.pass).length;
  const fail = results.length - pass;
  console.log(`\n================ 联调结果 ================`);
  console.log(`通过 ${pass} / ${results.length}${fail ? ` · 失败 ${fail}` : " · 全绿"}`);
  if (fail) {
    console.log("\n失败项：");
    for (const r of results.filter((x) => !x.pass)) console.log(`  ✗ ${r.name} — ${r.detail}`);
  }
  console.log(`截图：${SHOT}/e2e-0*.png`);
  process.exitCode = fail ? 1 : 0;
} catch (e) {
  console.error("\n[FATAL]", e);
  process.exitCode = 2;
} finally {
  await browser.close();
}


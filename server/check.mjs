#!/usr/bin/env node
/**
 * 证据自检 CLI —— agent 写完一份材料，跑一下再交付。
 *
 *   node server/check.mjs                 # 全量，只打汇总与不合格
 *   node server/check.mjs <材料 id>        # 单份，打全部问题
 *   node server/check.mjs --all --verbose  # 全量，逐份打
 *
 * 退出码：0 = 没有 missing/unverified/broken；1 = 有，需要回去补。
 */
import fs from "node:fs";
import path from "node:path";
import { mdToMaterial } from "./parse-md.mjs";
import { validateMaterial, summarize } from "./validate.mjs";
import { PATHS, listMaterialFiles, readSource } from "./store.mjs";

const args = process.argv.slice(2);
const verbose = args.includes("--verbose");
const only = args.find((a) => !a.startsWith("--"));

/** `--only` 可写 `<材料 id>`（全树搜）或 `<标的>/<材料 id>`（精确） */
function pickOnly(arg) {
  if (arg.includes("/")) {
    const f = path.join(PATHS.output, arg, "material.md");
    return fs.existsSync(f) ? [f] : [];
  }
  return listMaterialFiles().filter((x) => x.id === arg).map((x) => x.file);
}

const entries = listMaterialFiles();
const files = only
  ? pickOnly(only)
  : entries.map((x) => x.file);

if (!files.length) {
  console.error(only ? `没有这份材料：${only}` : "output/ 里没有 material.md");
  process.exit(1);
}

const tickerOf = new Map(entries.map((x) => [x.file, x.ticker]));

const tally = { ok: 0, missing: 0, unverified: 0, broken: 0, legacy: 0 };
const bad = [];
const remnant = [];
const coverFail = [];   // 非 legacy 卡：Operator 点名的提问者未在卡面出现（硬门禁）
const coverTrip = [];   // legacy 卡：同款检查，仅警告

/* 模板残留（硬违例）：说明书、占位符、agent 指令注释不该出现在成品卡里 */
const REMNANT =
  /把本文件复制到|采集登记表模板|复制后先填|<在此填写答案|<答案：|<把支撑|<支撑本栏|填写规则（给 agent）/;
/* 密度软观察（不拦交付，只回报）：否定占位句、碎依据 */
/* 框架词守卫（硬违例，写法规范 §一/§三/§七 的机器对应）：审题残余、结构预告、自述——只查正文题节，依据区引文不查 */
const FRAMEWORK =
  /这题问的|本题问的|所以这题|这题的读法|该题的读法|首先[^。]{0,60}其次|经仔细核对|已逐项检查|经核查全文|分三点|分以下几个方面|综上所述|综上来看|先立基石|归位如下|逐条主张放上去|引用时出处写回|一律标"卖方主张"|永不写成事实|最值得注意的是|附带一条信源提示|不用猜|能自己核对|的好处是|都摊开了|拿走一句|核账处|这本身就是结论|要先剔掉|分两段讲|的读法，本案|判：多数|三件判|两年判据下|季度问的是|答不出来就写/;
const NEGATIVE = /材料未给出|材料未给|未发现|未含|未载明|未点名|未获取|未定价|未标[「（]|不适用/;
let negTotal = 0, negMax = { n: 0, id: "" }, fragCards = 0;

/* 中文语序软观察（写法规范 §中文语序 A/B 层的机器对应）——不拦交付，只回报。
   C 层术语纪律与代词显化需语义分析，不进正则（如实局限）。 */
const CN_ORDER = [
  /，凸显了|，彰显了|不断演变|关键作用|深入探讨/g,
  /不仅[^。]{0,40}而且|不是[^。]{0,40}而是/g,
  /作为[^。]{0,24}的(?:平台|工具|空间|渠道|载体|角色|存在|窗口|延伸)/g,
  /由于[^。]{0,18}的事实|在[^。]{0,18}的情况下|具有[^。]{0,14}的能力/g,
  /被[^。\n]{2,14}为(?![^\n]{0,6}(?:称为|誉为))/g,
];
let cnTotal = 0, cnMax = { n: 0, id: "" };

/* 排版软观察（写法规范 §排版 守恒死命令的机器对应）：答案区"挤坨"检测——
   单段超 200 字且含并列信号（顿号≥2 或分号≥1）= 该分条列点的没分。 */
let paraTotal = 0, paraMax = { n: 0, id: "" };

/* 登记题守卫（软观察 → 二期转硬门禁）：03 投行研报型的 Q8/15/16 是登记题——
   对照面（指引账摘要、公司口径摘要）在场时永远可答，缺失 = 被状态 3 误删
   或对照面不在场未按状态 4 登记。跑批契约：03 类批必须携带对照物（RUN-PARALLEL §1）。 */
let regCards = 0;
const regMissing = [];

for (const f of files) {
  const rawText = fs.readFileSync(f, "utf8");
  const doc = mdToMaterial(rawText, path.basename(path.dirname(f)));
  const r = validateMaterial(doc, readSource(doc.id));
  tally[r.level] = (tally[r.level] ?? 0) + 1;
  const tag = tickerOf.get(f) ? `${tickerOf.get(f)}/${doc.id}` : doc.id;

  if (r.level !== "legacy" && REMNANT.test(rawText)) remnant.push(tag);


  /* 密度软观察 */
  const body = rawText.replace(/^---[\s\S]*?^---/m, "");
  const neg = (body.match(new RegExp(NEGATIVE, "g")) ?? []).length;
  negTotal += neg;
  if (neg > negMax.n) negMax = { n: neg, id: tag };

  /* 中文语序软观察（正文，引文与表格豁免）＋破折号密度 */
  const proseText = body
    .split(/\n(?=## )/)
    .filter((s) => /^## /.test(s))
    .map((s) => s.split(/### 依据/)[0])
    .join("\n");
  let cn = 0;
  for (const re of CN_ORDER) cn += (proseText.match(new RegExp(re.source, "g")) ?? []).length;
  for (const para of proseText.split(/\n{2,}/)) {
    const dashes = (para.match(/——/g) ?? []).length;
    if (dashes >= 2 && para.length > 120) cn += dashes - 1;
  }
  cnTotal += cn;
  if (cn > cnMax.n) cnMax = { n: cn, id: tag };

  /* 登记题守卫（软观察）：03 投行研报型 Q8/15/16 */
  if (doc.cat === "03" && (doc.template === "broker-research" || doc.sub === "broker-research")) {
    regCards += 1;
    const ids = new Set((doc.sections ?? []).map((s) => String(s.id).replace(/^Q/i, "")));
    const miss = ["8", "15", "16"].filter((n) => !ids.has(n));
    if (miss.length) regMissing.push(`${tag} 缺 Q${miss.join("/Q")}`);
  }

  /* 框架词守卫：逐题节扫（## 分节），每节只查正文（### 依据 之前），引文豁免 */
  let fwTotal = 0;
  for (const sec of body.split(/\n(?=## )/)) {
    if (!/^## /.test(sec)) continue;
    const prose = sec.split(/### 依据/)[0];
    fwTotal += (prose.match(new RegExp(FRAMEWORK.source, "g")) ?? []).length;
  }
  if (r.level !== "legacy" && fwTotal > 0 && !REMNANT.test(rawText)) remnant.push(tag + "（框架词×" + fwTotal + "）");

  /* 覆盖哨兵：转录稿型材料（sub=company-voice 且含 Operator 主持行）→ Operator 介绍句点名的每位提问者
     必须在卡正文出现。提问者名单只取 Operator 介绍句（"comes from X with Y"）——IR 主持人、高管天然排除
     （他们不是提问单元）。非 legacy 卡＝硬门禁（缺提问者＝整单元遗漏）；legacy 卡仅警告。 */
  try {
    const matDir = path.join(PATHS.materials, doc.id);
    const metaP = path.join(matDir, "meta.json"), cmP = path.join(matDir, "content.md");
    if (fs.existsSync(metaP) && fs.existsSync(cmP)) {
      const m = JSON.parse(fs.readFileSync(metaP, "utf8"));
      if ((m.sub || "") === "company-voice") {
        const cmText = fs.readFileSync(cmP, "utf8");
        const introNames = [];
        for (const raw of cmText.split("\n")) {
          const mm = raw.match(/comes from (?:the line of |a line of )?([A-Z][a-z]+(?:\s+[A-Z][a-z.'-]+){1,3})(?=\s+with|[.,]|\s*$)/);
          if (mm) introNames.push(mm[1].trim());
        }
        const questioners = [...new Set(introNames)];
        if (questioners.length >= 5) {
          const missing = questioners.filter(q => !body.includes(q.split(/\s+/).pop().replace(/[.,]/g, "")));
          if (missing.length) {
            if (r.level === "legacy") coverTrip.push(`${tag} → 缺：${missing.join("、")}`);
            else coverFail.push(`${tag} → 缺提问者：${missing.join("、")}`);
          }
        }
      }
    }
  } catch { /* 哨兵自身不挡验证 */ }
  const blocks = Object.values(doc.evidence ?? {}).flat();
  if (blocks.length >= 10 && blocks.filter((b) => (b.quote ?? "").length < 30).length / blocks.length >= 0.5) fragCards += 1;

  /* 排版软观察：答案区挤坨段统计 */
  let cardParas = 0;
  for (const s of doc.sections ?? []) {
    for (const p of (s.answer ?? "").split(/\n+/)) {
      const t = p.trim();
      if (t.length > 200 && !/^[-*>|#]/.test(t) && ((t.match(/、/g) ?? []).length >= 2 || (t.match(/；/g) ?? []).length >= 1)) {
        paraTotal += 1; cardParas += 1;
      }
    }
  }
  if (cardParas > paraMax.n) paraMax = { n: cardParas, id: tag };

  if (r.level === "ok" || r.level === "legacy") {
    if (verbose || only) console.log("  " + summarize(tag, r));
    continue;
  }

  bad.push({ id: tag, r });
  console.log("  " + summarize(tag, r));
  if (verbose || only) {
    for (const i of r.issues.slice(0, 12)) {
      console.log(`      · [${i.kind}] ${i.row ?? ""} ${i.msg}`);
    }
    if (r.issues.length > 12) console.log(`      · …还有 ${r.issues.length - 12} 条`);
  }
}

const print = (k, label) => console.log(`${label.padEnd(12)} ${tally[k] ?? 0}`);
console.log("\n—— 汇总 ——");
print("ok", "合格");
print("missing", "没登记");
print("unverified", "查无此文");
print("broken", "页码越界");
print("legacy", "旧材料（不判）");
console.log(`共 ${files.length} 份`);
console.log(`\n—— 密度观察（软指标，不拦交付）——`);
console.log(`否定占位句    ${negTotal} 处（单卡最高 ${negMax.n}：${negMax.id}）`);
console.log(`碎依据卡      ${fragCards} 张（依据≥10条且<30字符占比≥50%）`);
console.log(`中文语序      ${cnTotal} 处（AI 词/排比/系动词回避/填充短语/被动句/破折号密度；单卡最高 ${cnMax.n}：${cnMax.id}）`);
console.log(`挤坨段落      ${paraTotal} 处（单卡最高 ${paraMax.n}：${paraMax.id}；>200 字含并列——按 §排版 该分条列点）`);
console.log(`登记题缺失    ${regMissing.length}/${regCards} 张 03 投行研报卡缺 Q8/15/16（软观察，跑两批后升硬门禁）`);
regMissing.slice(0, 10).forEach((r) => console.log(`  · ${r}`));
if (regMissing.length > 10) console.log(`  · …还有 ${regMissing.length - 10} 张`);

if (remnant.length) {
  console.log(`\n模板残留 ${remnant.length} 份（说明书/占位符/指令注释进了成品，须清理）：`);
  for (const t of remnant.slice(0, 15)) console.log(`  · ${t}`);
  if (remnant.length > 15) console.log(`  · …还有 ${remnant.length - 15} 份`);
}

if (coverFail.length) {
  console.log(`\n覆盖哨兵（须修复）——${coverFail.length} 张卡的提问者未在卡面出现（整单元遗漏）：`);
  for (const t of coverFail.slice(0, 15)) console.log(`  · ${t}`);
  if (coverFail.length > 15) console.log(`  · …还有 ${coverFail.length - 15} 张`);
}

if (coverTrip.length) {
  console.log(`\n覆盖哨兵（legacy 警告，不拦交付）——${coverTrip.length} 张：`);
  for (const t of coverTrip.slice(0, 15)) console.log(`  · ${t}`);
  if (coverTrip.length > 15) console.log(`  · …还有 ${coverTrip.length - 15} 张`);
}

/* 账本算术守卫：偏差栏必须与行内数字自洽——落点是算术事实，不交给 agent 的措辞 */
const ledgerBad = [];
for (const tk of fs.readdirSync(PATHS.output)) {
  const tdir = path.join(PATHS.output, tk);
  if (!fs.statSync(tdir).isDirectory()) continue;
  for (const f of fs.readdirSync(tdir).filter(x => x.startsWith("_ledger-"))) {
    const t = fs.readFileSync(path.join(tdir, f), "utf8");
    for (const line of t.split("\n")) {
      if (!/^\|\s*\d{4}Q/.test(line)) continue;
      const cells = line.split("|");
      const gM = (cells[2] ?? "").match(/\$([\d.]+)-([\d.]+)\s*billion/i);
      const aM = (cells[3] ?? "").match(/([\d.]+)\s*亿美元/);
      if (!gM || !aM) continue;
      const lo = parseFloat(gM[1]), hi = parseFloat(gM[2]), act = parseFloat(aM[1]) / 10;
      const verdict = act > hi ? "高于上限" : act < lo ? "低于下限" : "落区间内";
      const ok = verdict === "高于上限" ? /高于上限|越上限/.test(cells[4] ?? "")
        : verdict === "低于下限" ? /低于下限/.test(cells[4] ?? "")
        : /落区间内|贴上限|贴下限/.test(cells[4] ?? "");
      if (!ok) ledgerBad.push(`${tk}/${f} ${cells[1]?.trim()}：实际 $${act}B vs 区间 ${lo}-${hi} ⇒ 应记「${verdict}」，账面写「${(cells[4] ?? "").trim().slice(0, 30)}」`);
    }
  }
}

if (ledgerBad.length) {
  console.log(`\n账本算术矛盾（须修）——${ledgerBad.length} 行：`);
  for (const t of ledgerBad) console.log(`  · ${t}`);
}

if (bad.length || remnant.length || coverFail.length || ledgerBad.length) {
  if (bad.length) console.log(`\n${bad.length} 份需要回去补。单份看细节：node server/check.mjs <标的>/<材料 id>`);
  process.exit(1);
}

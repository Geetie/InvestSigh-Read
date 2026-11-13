#!/usr/bin/env node
// kit.mjs —— 需件列 → 答题白名单（跨材料聚合重构·第三步：A 遍改造）
//
// 用法：
//   node server/kit.mjs <材料id> [--ticker 标的] [--json]
// 逻辑：
//   1. 读材料 meta.json（cat/sub/date），定位分册（channels.yaml: sub→name）
//   2. 解析分册 §4 问句表每题的「需件」格
//   3. 按需件 token 解析成具体材料（同场/同型跨期/跨类）或缺口（跨标的/账本/外部）
//   4. 输出 runs/kits/<id>.json ＋ 提示词可直接使用的白名单文本段
// 原则：程序只解析不判断——候选材料按需件列与元数据匹配，多给的只是候选。

import fs from "fs";
import path from "path";
import crypto from "crypto";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2);
const id = args.find(a => !a.startsWith("--") && !args[args.indexOf(a) - 1]?.startsWith("--ticker"));
const tickerArg = args.includes("--ticker") ? args[args.indexOf("--ticker") + 1] : null;
const asJson = args.includes("--json");
if (!id) { console.error("用法：node server/kit.mjs <材料id> [--ticker 标的] [--json]"); process.exit(1); }

const sha = t => crypto.createHash("sha256").update(t).digest("hex").slice(0, 16);
const norm = s => s.replace(/\s+/g, "");

// ── 材料索引 ──
function loadIndex() {
  const dir = path.join(ROOT, "corpus/materials");
  const idx = [];
  for (const id of fs.readdirSync(dir)) {
    const mp = path.join(dir, id, "meta.json");
    if (!fs.existsSync(mp)) continue;
    try {
      const m = JSON.parse(fs.readFileSync(mp, "utf8"));
      idx.push({ id, cat: m.cat, sub: m.sub, date: m.date || null });
    } catch { /* 忽略坏 meta */ }
  }
  return idx;
}
const dstr = d => (d && /^\d{4}-\d{2}-\d{2}/.test(d) ? d.slice(0, 10) : null);
const dayDiff = (a, b) => { if (!a || !b) return Infinity; return Math.abs((new Date(a) - new Date(b)) / 86400000); };

// ── 需件格解析（与校验脚本同一正则） ──
const CELL = /\|\s*(单份|同场:[^|]*?|同型跨期:[^|]*?|同类跨型:[^|]*?|跨类:[^|]*?|跨标的:[^|]*?|账本:[^|]*?|外部:[^|]*?)\s*\|(?=\s*$)/;
function parseNeeds(bookletPath) {
  const t = fs.readFileSync(bookletPath, "utf8");
  const out = [];
  for (const line of t.split("\n")) {
    const m = line.match(CELL);
    if (!m) continue;
    const qm = line.match(/^\|\s*(Q?\d+|★?Q?\d+)\s*\|/) || line.match(/^\|\s*(\d+)\s*\|/);
    out.push({ q: qm ? qm[1] : "?", need: m[1].trim() });
  }
  return out;
}

// ── 解析器 ──
function resolve(need, ctx) {
  const segs = need.split("；").map(s => s.trim()).filter(Boolean);
  const found = [], gaps = [];
  for (const seg of segs) {
    if (seg === "单份") { found.push({ seg, id: ctx.id, why: "本材料" }); continue; }
    if (seg.startsWith("同场:")) {
      const role = seg.slice(3);
      const cands = ctx.index
        .filter(x => x.id !== ctx.id && x.date && ctx.date && dayDiff(x.date, ctx.date) <= 1 && ctx.tickerMatch(x))
        .filter(x => roleMatch(role, x))
        .sort((a, b) => dayDiff(a.date, ctx.date) - dayDiff(b.date, ctx.date))
        .slice(0, 4);
      if (cands.length) cands.forEach(x => found.push({ seg, id: x.id, why: `同场(${role}, ${dayDiff(x.date, ctx.date) | 0}天)` }));
      else gaps.push(`${seg}（同场无候选）`);
      continue;
    }
    if (seg.startsWith("同型跨期:")) {
      const n = Math.min(parseInt(seg.match(/(\d+)/)?.[1] || "1", 10) || 1, 4);
      const cands = ctx.index
        .filter(x => x.id !== ctx.id && x.cat === ctx.cat && x.sub === ctx.sub && x.date && ctx.date && !/^0000/.test(x.date) && x.date < ctx.date && ctx.tickerMatch(x))
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, n);
      if (cands.length) cands.forEach(x => found.push({ seg, id: x.id, why: `上季同型(${x.date})` }));
      else gaps.push(`${seg}（同型历史件不在库）`);
      continue;
    }
    if (seg.startsWith("同类跨型:")) {
      // 同类跨型:10-K:上年(角色) —— 同类（同 cat）不同型的另一份申报
      const m2 = seg.match(/^同类跨型:([^:：]+):?([^(:]*)?(?:\(([^)]*)\))?$/);
      const targetSub = m2 && m2[1] ? m2[1].trim() : "";
      const cands = ctx.index
        .filter(x => x.id !== ctx.id && x.cat === ctx.cat && targetSub && ((x.sub || "").includes(targetSub) || targetSub.includes(x.sub || "###")) && x.date && ctx.date && !/^0000/.test(x.date) && x.date < ctx.date && ctx.tickerMatch(x))
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 1);
      if (cands.length) cands.forEach(x => found.push({ seg, id: x.id, why: `同类跨型(${x.sub}, ${x.date})` }));
      else gaps.push(`${seg}（同类跨型件不在库）`);
      continue;
    }
    if (seg.startsWith("跨类:")) {
      const [, cls, role = ""] = seg.match(/^跨类:([^:：]+):?(.*)$/) || [];
      const cands = ctx.index
        .filter(x => x.id !== ctx.id && x.cat === cls && x.date && ctx.date && dayDiff(x.date, ctx.date) <= 7 && ctx.tickerMatch(x))
        .filter(x => roleMatch(role, x))
        .sort((a, b) => dayDiff(a.date, ctx.date) - dayDiff(b.date, ctx.date))
        .slice(0, 4);
      if (cands.length) cands.forEach(x => found.push({ seg, id: x.id, why: `跨类(${cls}, ${role || "角色"})` }));
      else gaps.push(`${seg}（近 7 天无该类材料）`);
      continue;
    }
    if (seg.startsWith("账本:")) {
      const name = seg.slice(3);
      const file = { 指引账: "_ledger-guidance.md", 我方假设账: "_ledger-assumptions.md", 骨架: "_skeleton.md" }[name];
      const p = ctx.ticker ? path.join(ROOT, "output", ctx.ticker, file || "") : null;
      if (file && p && fs.existsSync(p)) found.push({ seg, id: `output/${ctx.ticker}/${file}`, why: "账本" });
      else gaps.push(`${seg}（未建）`);
      continue;
    }
    if (seg.startsWith("跨标的:")) { gaps.push(`${seg}（v1 人工：需 watchlist）`); continue; }
    if (seg.startsWith("外部:")) { gaps.push(`${seg}（E 档缺件）`); continue; }
    gaps.push(`${seg}（未知 token）`);
  }
  return { found, gaps };
}

// 角色 → sub 关键词（宽匹配，命中即保留；无关键词则不过滤）
const ROLE_KEYS = [
  ["主会", ["company-voice", "电话会议"]], ["电话会", ["company-voice"]], ["逐字稿", ["company-voice"]],
  ["EX-99.1", ["8-K", "EX-99.1"]], ["新闻稿", ["8-K"]], ["业绩件", ["8-K"]],
  ["10-Q", ["10-Q"]], ["10-K", ["10-K"]], ["年报", ["10-K"]], ["季报", ["10-Q"]],
  ["委托书", ["委托书"]], ["招股", ["招股书"]],
];
function roleMatch(role, x) {
  if (!role) return true;
  const hit = ROLE_KEYS.find(([k]) => role.includes(k));
  if (!hit) return true;
  return hit[1].some(k => (x.sub || "").includes(k) || x.id.includes(k));
}

// ── 主流程 ──
const matDir = path.join(ROOT, "corpus/materials", id);
const metaPath = path.join(matDir, "meta.json");
if (!fs.existsSync(metaPath)) { console.error(`材料不存在：${id}`); process.exit(1); }
const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
const cat = meta.cat, sub = meta.sub, date = dstr(meta.date) || dstr(id);

// 分册定位：channels.yaml sub→name
let booklet = null;
const pipes = fs.readdirSync(path.join(ROOT, "pipelines")).filter(d => d.startsWith(cat + "-"));
for (const pd of pipes) {
  const cy = path.join(ROOT, "pipelines", pd, "channels.yaml");
  if (!fs.existsSync(cy)) continue;
  const yaml = fs.readFileSync(cy, "utf8");
  const block = yaml.split("\n  - slug:").find(b => b.includes("sub:") && b.includes(sub));
  if (block) {
    const nameM = block.match(/name:\s*(.+)/);
    if (nameM) {
      const cand = path.join(ROOT, "corpus/prompts", `${cat}-型`, `${nameM[1].trim()}.md`);
      if (fs.existsSync(cand)) { booklet = cand; break; }
    }
  }
}
if (!booklet) { console.error(`未定位到分册（cat=${cat} sub=${sub}）`); process.exit(1); }

// ticker：参数 > 既有卡位置
let ticker = tickerArg;
if (!ticker) {
  for (const t of fs.readdirSync(path.join(ROOT, "output"))) {
    if (fs.existsSync(path.join(ROOT, "output", t, id, "material.md"))) { ticker = t; break; }
  }
}

const index = loadIndex();
const ctx = {
  id, cat, sub, date, ticker, index,
  tickerMatch: x => {
    if (!ticker) return true; // 标的未知：不过滤（候选标注 ticker 待人工筛）
    const xt = cardTicker(x.id);
    return xt ? xt === ticker : true;
  },
};
function cardTicker(mid) {
  for (const t of fs.readdirSync(path.join(ROOT, "output"))) {
    if (fs.existsSync(path.join(ROOT, "output", t, mid, "material.md"))) return t;
  }
  return null;
}

const questions = parseNeeds(booklet);
const resolved = questions.map(q => ({ ...q, ...resolve(q.need, ctx) }));
const whitelistIds = [...new Set([id, ...resolved.flatMap(r => r.found.map(f => f.id)).filter(x => x.includes("/materials/") === false ? x.includes("/") && !x.startsWith("output") : true)])];
const whyById = {};
for (const r of resolved) for (const f of r.found) if (f.id !== id) whyById[f.id] = whyById[f.id] ? `${whyById[f.id]}；${f.why}` : f.why;
const matIds = [...new Set(resolved.flatMap(r => r.found.filter(f => !f.id.startsWith("output")).map(f => f.id)))].filter(x => x !== id);
const matPaths = matIds.map(x => `corpus/materials/${x}/`);
const gaps = [...new Set(resolved.flatMap(r => r.gaps))];
const fpSrc = path.join(matDir, "content.md"), fpSrc2 = path.join(matDir, "pages.json");
const fingerprint = fs.existsSync(fpSrc) && fs.existsSync(fpSrc2)
  ? sha(fs.readFileSync(fpSrc, "utf8") + "\n" + fs.readFileSync(fpSrc2, "utf8")) : null;

// ── 单元清单：材料自然结构的机器盘点（覆盖自检的下限，覆盖哨兵的输入）──
//   转录稿判定：材料含 Operator 主持行（真逐字稿都有——也是条款书类材料的防误报闸门）
//   讲话人形态：行首"人名＋冒号"（Mark Mahaney: …）——2026-11-08 实测追问会逐字稿的真实形态；
//   此前两版（markdown 头／独立人名行）都匹配了不存在的形态，units 返回 null。
//   申报件：Item N / PART x 锚点 → 章节级单元
function extractUnits(text) {
  const speakers = [], items = [];
  const isTranscript = /\bOperator\b/.test(text);
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    let m = line.match(/^#{1,3}\s+(.{2,60})\s*$/);
    if (m) {
      // markdown 头候选：去尾标点后必须是人名形状（标题/术语行如"Launching Meta Enterprise Platform（…）"被形状挡掉）
      const nm = m[1].trim().replace(/[.:：,，]+$/, "");
      if (/^[A-Z][a-z]+(?:\s+[A-Z][a-z.'-]+){0,3}$/.test(nm)) speakers.push(nm);
    }
    if (isTranscript) {
      m = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z.'-]+){1,3}):\s/);
      if (m) speakers.push(m[1].trim());
    }
    m = line.match(/^(Item\s+\d+[A-C]?\b[^\n]{0,60}|PART\s+[IVX]+\b[^\n]{0,40})/);
    if (m) items.push(m[1].trim());
  }
  const uniq = a => [...new Set(a)];
  const NONSPEAKER_HEAD = /^(Operator|Moderators?|Participants?|Meta|Disclosure|Segment|Forward|General|Financial|About|Contacts|Webcast|Results|Risk|Question|Answer|Safe)\b/i;
  const sp = uniq(speakers).filter(h => !NONSPEAKER_HEAD.test(h) && !/^Item\s/i.test(h) && !/^PART\s/i.test(h));
  return { speakers: sp, items: uniq(items), kind: sp.length >= 5 ? "transcript" : (uniq(items).length >= 3 ? "doc-structure" : null) };
}
let units = null;
if (fs.existsSync(fpSrc)) {
  const u = extractUnits(fs.readFileSync(fpSrc, "utf8"));
  if (u.kind) units = { kind: u.kind, speakers: u.speakers.slice(0, 40), items: u.items.slice(0, 30),
    count: u.kind === "transcript" ? u.speakers.length : u.items.length };
}

const kit = { id, cat, sub, date, ticker, booklet: path.relative(ROOT, booklet), fingerprint, whitelist: matPaths, questions: resolved, gaps, units };
const kitDir = path.join(ROOT, "runs/kits");
fs.mkdirSync(kitDir, { recursive: true });
fs.writeFileSync(path.join(kitDir, `${id}.json`), JSON.stringify(kit, null, 2));

if (asJson) console.log(JSON.stringify(kit, null, 2));
else {
  console.log(`【kit 白名单】材料 ${id}（${cat}/${sub}，${date}，标的=${ticker || "未知"}）`);
  console.log(`主材料：corpus/materials/${id}/`);
  for (const mid of matIds) {
    console.log(`配套：corpus/materials/${mid}/  ← ${whyById[mid] || ""}`);
  }
  const ledgers = [...new Set(resolved.flatMap(r => r.found.map(f => f.id).filter(x => x.startsWith("output"))))];
  for (const l of ledgers) console.log(`账本：${l}`);
  for (const g of gaps) console.log(`缺口：${g}`);
  if (units) console.log(`单元清单：${units.count} 个${units.kind === "transcript" ? "讲话人" : "章节"}（覆盖自检下限——每位讲话人的问答不得整段消失）${units.kind === "transcript" ? "：" + units.speakers.join("、") : ""}`);
  if (fingerprint) console.log(`指纹：source_fingerprint: ${fingerprint}（填卡时记入 frontmatter）`);
  console.log(`问句：${questions.length} 题，其中需件非单份 ${resolved.filter(r => r.need !== "单份").length} 题`);
}

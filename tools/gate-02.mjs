#!/usr/bin/env node
/**
 * 02-型 填卡门禁（补 `server/check.mjs` 的盲区）。
 *
 * check.mjs 只查 R1/R2：空答案不触发任何规则 —— 全新骨架也报「合格 · 无答案 · 0 块原文」。
 * 本门禁查「填完了没有」这件事本身：
 *   G1 十行题号齐全、顺序对、题面未改（与骨架快照逐字比）
 *   G2 每行有答案且答案够三层（长度下限 + 不许「未见。」两字交差）
 *   G3 每行至少 1 块依据
 *   G4 正文（依据区之外）不得出现页码
 *   G5 不得残留占位词
 *   G6 同一段引文不得跨行反复粘（>2 次）
 *
 * 退出码：0 = 全绿；1 = 有问题。
 *   node tools/gate-02.mjs <材料 id>
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const OUT = path.join(ROOT, "output", "meta");
const SNAP = path.join(ROOT, ".workbuddy", "skeleton-02");

const id = process.argv[2];
if (!id) {
  console.error("用法：node tools/gate-02.mjs <材料 id>");
  process.exit(2);
}

const file = path.join(OUT, id, "material.md");
if (!fs.existsSync(file)) {
  console.error(`没有这份：${file}`);
  process.exit(2);
}

const src = fs.readFileSync(file, "utf8");

/** frontmatter 剥掉，只留正文 */
const body = src.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");

/** 按 `## <id> · <label>` 切段 */
const sections = [];
let cur = null;
for (const line of body.split(/\r?\n/)) {
  const h = /^##\s+([A-Za-z0-9_-]+)\s*[·:：-]\s*(.+?)\s*$/.exec(line);
  if (/^##\s/.test(line) && !h) {
    sections.push({ id: "(坏标题)", label: line, answer: "", blocks: [], bad: true });
    cur = sections[sections.length - 1];
    continue;
  }
  if (h) {
    cur = { id: h[1], label: h[2], answer: "", blocks: [] };
    sections.push(cur);
    continue;
  }
  if (!cur) continue;
  if (/^###\s*依据/.test(line)) {
    cur._ev = true;
    continue;
  }
  if (/^-\s*p\.\d+\s*[｜|]/.test(line)) {
    cur.blocks.push(line.replace(/^-\s*/, ""));
    continue;
  }
  if (/^-\s*p\.\S*\s*[｜|]/.test(line)) {
    // 骨架占位行（`- p.N｜<把支撑…>`）没被替换：既不算块，也不能当正文
    cur.bad_block = line;
    continue;
  }
  if (!cur._ev) cur.answer += line + "\n";
}
sections.forEach((s) => (s.answer = s.answer.trim()));

const issues = [];
const warn = [];
const push = (kind, row, msg) => issues.push({ kind, row, msg });

/* G1 题号与题面 */
const snapshotFile = path.join(SNAP, id + ".md");
const want = fs.existsSync(snapshotFile)
  ? fs
      .readFileSync(snapshotFile, "utf8")
      .split(/\r?\n/)
      .filter((l) => /^##\s/.test(l))
      .map((l) => l.trim())
  : null;
const got = sections.map((s) => `## ${s.id} · ${s.label}`.trim());

if (!want) {
  warn.push(`没有骨架快照 .workbuddy/skeleton-02/${id}.md，跳过题面比对`);
} else if (want.length !== got.length) {
  push("G1", "-", `题号数量 ${got.length} ≠ 骨架 ${want.length}`);
} else {
  want.forEach((w, i) => {
    if (w !== got[i]) push("G1", sections[i].id, `题面被改：\n      骨架: ${w}\n      现在: ${got[i]}`);
  });
}

/* G2 答案 */
const MINLEN = Number(process.env.GATE_MINLEN || 120);
const BAN = [
  /^未见[。.]?$/,
  /^无[。.]?$/,
  /^N\/?A$/i,
  /^材料未给出[。.]?$/,
  /^待(填|补)/,
];
for (const s of sections) {
  const a = s.answer;
  if (!a) {
    push("G2", s.id, "没有答案");
    continue;
  }
  if (BAN.some((re) => re.test(a.trim()))) push("G2", s.id, `答案两字交差：${a.trim()}`);
  if (a.length < MINLEN) push("G2", s.id, `答案太短（${a.length} 字），够不到三层`);
}

/* G3 依据块 */
for (const s of sections) {
  if (s.answer && s.blocks.length === 0) push("G3", s.id, "有答案但依据区为空");
  if (s.bad_block) push("G3", s.id, `占位依据行没换成真引文：${s.bad_block.slice(0, 50)}`);
}

/* G4 正文页码 */
for (const s of sections) {
  const hits = [
    [/第\s*\d+\s*页/, "第N页"],
    [/\[\s*p\.\s*\d+/i, "[p.N]"],
    [/[（(]\s*见\s*p\.\s*\d+/i, "（见 p.N）"],
    [/(?<![｜|])\bp\.\s*\d+\s*[｜|]?/, "正文里的 p.N"],
  ];
  for (const [re, tag] of hits) {
    const m = a_of(s).match(re);
    if (m) push("G4", s.id, `正文出现页码（${tag}）：…${ctx(a_of(s), m.index)}…`);
  }
}
function a_of(s) {
  return s.answer;
}
function ctx(t, i) {
  return t.slice(Math.max(0, i - 12), i + 18).replace(/\s+/g, " ");
}

/* G5 占位词 */
const PH = [/(^|\n)\s*…\s*($|\n)/, /TODO/, /XXX/, /<在此填写/, /待补(充)?/, /（空）/];
for (const s of sections) {
  for (const re of PH) {
    if (re.test(s.answer)) push("G5", s.id, `残留占位：${re}`);
  }
}

/* G6 引用重复 */
const freq = new Map();
for (const s of sections) {
  for (const b of s.blocks) {
    const key = b.replace(/^p\.\d+\s*[｜|]\s*/, "").replace(/\s+/g, "");
    if (!key) continue;
    if (!freq.has(key)) freq.set(key, []);
    freq.get(key).push(s.id);
  }
}
for (const [q, rows] of freq) {
  if (rows.length > 2) warn.push(`同一引文出现在 ${rows.length} 行（${rows.join("/")}）：${q.slice(0, 40)}…`);
}

/* 汇总 */
const rowsWithAnswer = sections.filter((s) => s.answer).length;
const blocks = sections.reduce((a, s) => a + s.blocks.length, 0);
console.log(
  `${id}  段落 ${sections.length} · 有答案 ${rowsWithAnswer} 行 · 依据 ${blocks} 块 · 平均答案 ${
    Math.round(sections.reduce((a, s) => a + s.answer.length, 0) / Math.max(1, sections.length))
  } 字`
);

if (warn.length) {
  console.log("  提醒：");
  for (const w of warn) console.log("    · " + w);
}
if (issues.length) {
  console.log(`  不合格 ${issues.length} 条：`);
  for (const i of issues.slice(0, 30)) console.log(`    · [${i.kind}] ${i.row} ${i.msg}`);
  if (issues.length > 30) console.log(`    · …还有 ${issues.length - 30} 条`);
  process.exit(1);
}
console.log("  GATE OK");

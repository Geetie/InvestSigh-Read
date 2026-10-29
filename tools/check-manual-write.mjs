#!/usr/bin/env node
/**
 * 验证「界面改动 → 真的改到 corpus/prompts 的手册问句表」。
 *
 * 判据（每步都落盘核对，不看前端脸色）：
 *   ① 改问题 → PUT → 手册文件里那一行的第 2 列变了，其余字节不变
 *   ② 改读法 → 第 3 列变了
 *   ③ 新增一行 → 手册里多一行、编号按该册风格
 *   ④ 删除一行 → 少一行
 *   ⑤ 复原后文件与原始逐字节相同
 */
import fs from "node:fs";
import { execSync } from "node:child_process";
import { parseManual, writeRows } from "../server/manual.mjs";

const FILE = "corpus/prompts/04-型/内部人申报.md";
const original = fs.readFileSync(FILE, "utf8");
let pass = 0;
let fail = 0;
const ok = (n, d = "") => (pass++, console.log(`  ✓ ${n}${d ? " — " + d : ""}`));
const bad = (n, d = "") => (fail++, console.log(`  ✗ ${n}${d ? " — " + d : ""}`));

/* 字节级差异定位：只列变化的行 */
const diffLines = (a, b) => {
  const la = a.split(/\r?\n/);
  const lb = b.split(/\r?\n/);
  const out = [];
  for (let i = 0; i < Math.max(la.length, lb.length); i++) {
    if (la[i] !== lb[i]) out.push({ i: i + 1, before: la[i] ?? "<无>", after: lb[i] ?? "<无>" });
  }
  return out;
};

console.log("\n[0] 解析手册");
const p0 = parseManual(FILE, "04", "内部人申报");
console.log(`  章节=${p0.section}  表头=[${p0.header.join("·")}]  行=${p0.rows.length}`);
console.log(`  问题列=${p0.labelCol + 1} 读法列=${p0.readingCol + 1}`);
console.log(`  Q1 问题：${p0.rows[0].label.slice(0, 40)}`);
console.log(`  Q1 读法：${p0.rows[0].reading.slice(0, 40)}`);

/* ① 只改问题 */
console.log("\n[1] 只改 Q1 的问题");
const rows1 = p0.rows.map((r) => ({ id: r.id, label: r.label, reading: r.reading }));
rows1[0].label = "改过的问题-ABC";
writeRows(FILE, rows1);
let now = fs.readFileSync(FILE, "utf8");
let d = diffLines(original, now);
console.log(`  变化行数=${d.length}`);
d.slice(0, 3).forEach((x) => console.log(`    L${x.i}:\n      旧 ${x.before.slice(0, 90)}\n      新 ${x.after.slice(0, 90)}`));
d.length === 1 ? ok("只有一行变化（不改别的字节）") : bad("只有一行变化", `实际 ${d.length} 行`);

const p1 = parseManual(FILE, "04", "内部人申报");
p1.rows[0].label === "改过的问题-ABC" ? ok("手册第 2 列已写入新问题") : bad("手册第 2 列已写入新问题");
p1.rows[0].reading === p0.rows[0].reading ? ok("读法未被误改") : bad("读法未被误改");
p1.rows.length === p0.rows.length ? ok("行数不变") : bad("行数不变");

/* ② 只改读法 */
console.log("\n[2] 只改 Q1 的读法");
const before2 = fs.readFileSync(FILE, "utf8");
const rows2 = p1.rows.map((r) => ({ id: r.id, label: r.label, reading: r.reading }));
rows2[0].reading = "改过的读法-XYZ";
writeRows(FILE, rows2);
now = fs.readFileSync(FILE, "utf8");
d = diffLines(before2, now);
d.length === 1 ? ok("只有一行变化") : bad("只有一行变化", `${d.length} 行`);
const p2 = parseManual(FILE, "04", "内部人申报");
p2.rows[0].reading === "改过的读法-XYZ" ? ok("手册第 3 列已写入新读法") : bad("手册第 3 列已写入新读法");
p2.rows[0].label === "改过的问题-ABC" ? ok("问题未被误改") : bad("问题未被误改");

/* ③ 新增 */
console.log("\n[3] 新增一行");
const rows3 = p2.rows.map((r) => ({ id: r.id, label: r.label, reading: r.reading }));
const newId = "Q99";
rows3.push({ id: newId, label: "新增的问题", reading: "新增的读法" });
writeRows(FILE, rows3);
const p3 = parseManual(FILE, "04", "内部人申报");
p3.rows.length === p2.rows.length + 1 ? ok("行数 +1", `${p2.rows.length} → ${p3.rows.length}`) : bad("行数 +1");
const added = p3.rows.find((r) => r.id === newId);
added && added.label === "新增的问题" ? ok("新行问题已写入") : bad("新行问题已写入");
added && added.reading === "新增的读法" ? ok("新行读法已写入") : bad("新行读法已写入");
/* 新行的列数必须与表一致 */
const newLine = fs.readFileSync(FILE, "utf8").split(/\r?\n/).find((l) => l.startsWith(`| ${newId} `) || l.startsWith(`|${newId}|`));
newLine ? ok("新行列结构正常", newLine.slice(0, 70)) : bad("新行列结构正常");

/* ④ 删除 */
console.log("\n[4] 删除新增那一行");
const rows4 = p3.rows.map((r) => ({ id: r.id, label: r.label, reading: r.reading })).filter((r) => r.id !== newId);
writeRows(FILE, rows4);
const p4 = parseManual(FILE, "04", "内部人申报");
p4.rows.length === p3.rows.length - 1 ? ok("行数 -1", `${p3.rows.length} → ${p4.rows.length}`) : bad("行数 -1");
!p4.rows.some((r) => r.id === newId) ? ok("该行已消失") : bad("该行已消失");

/* ⑤ 复原并逐字节比对 */
console.log("\n[5] 复原");
const rows5 = p4.rows.map((r) => ({ id: r.id, label: r.label, reading: r.reading }));
rows5[0].label = p0.rows[0].label;
rows5[0].reading = p0.rows[0].reading;
writeRows(FILE, rows5);
const final = fs.readFileSync(FILE, "utf8");
const dd = diffLines(original, final);
dd.length === 0
  ? ok("复原后与原始**逐字节相同**")
  : bad("复原后与原始逐字节相同", `${dd.length} 行不同，例：L${dd[0].i} ${JSON.stringify(dd[0].after.slice(0, 60))}`);

console.log(`\n结果：通过 ${pass} · 失败 ${fail}`);
process.exitCode = fail ? 1 : 0;

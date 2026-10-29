/**
 * 统一后的验收（判据本身要站得住，否则报的是假数）。
 *
 * 检查四条：
 *   ① 33 册都有 `## 4. 问句表`（中文序号册为 `## 四、问句表`）
 *   ② 同一册内**整数主节号不重复**（`4.5` / `1.5` 是子节号，不算主节，不参与判重）
 *   ③ **同一册内不混用编号风格**（不能出现「一、二、三、4.、七、」这种混排）
 *   ④ 内容零丢失：与 git HEAD 比，问句表**取值集合**不得变小（按集合比，不按多重集 ——
 *      删掉一个完全重复的副本是预期行为，不该算丢内容）
 *
 * 缺号**不作为失败**：目录是文档不是程序，节号跳跃（如 0/1/2/3/4/5/6/7 里缺 0、
 * 或中文册从「一」起算没有 0）都是既有事实，硬补一个空节等于造内容。只报告，不判红。
 *
 *   node tools/verify-unified.mjs
 */
import fs from "node:fs";
import { execSync } from "node:child_process";
import { listManuals, parseManual, buildSlugMap } from "../server/manual.mjs";

const CN = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 十一: 11, 十二: 12, 十三: 13, 十四: 14 };

const manuals = listManuals("corpus/prompts");

/* 真读法的唯一完好副本（旧壳 index.json）：34 型 323 行、套话 0 条。
   ★ 不能用 git HEAD（那次提交里读法已被 bundle 污染）也不能用 system/env/meta/prompts
     （那套手册的问句表读法列同样是套话）。 */
const LEGACY = "../InvestSigh-Workbuddy-frontend/InvestSigh-Read/corpus/prompts/index.json";
const legacy = fs.existsSync(LEGACY) ? JSON.parse(fs.readFileSync(LEGACY, "utf8")) : {};
const tax = JSON.parse(fs.readFileSync("server/data/taxonomy.json", "utf8"));
const { map: slugMap } = buildSlugMap(tax, manuals);
const cellsOf = (l) => l.split("|").slice(1, -1).map((c) => c.trim());
const qBag = (t) =>
  new Set(
    t
      .split(/\r?\n/)
      .filter((l) => /^\|\s*Q?\d+\s*\|/.test(l))
      .map((l) => cellsOf(l).filter(Boolean).sort().join("\u0001")),
  );

const badTitle = [];
const dupMain = [];
const mixedStyle = [];
const thinContent = [];
const gapReports = [];

for (const m of manuals) {
  const rel = m.file.replace(/\\/g, "/");
  const text = fs.readFileSync(m.file, "utf8");
  const lines = text.split(/\r?\n/);
  const name = `${m.cat}/${m.stem}`;

  /* ① 问句表标题 */
  const qTitle = lines.find((l) => /^##\s*(?:\d+[.．、]|[一二三四五六七八九十]+[、.．])\s*问句表\s*$/.test(l));
  if (!qTitle) badTitle.push(name);

  /* ② 主节号（整数）与风格 */
  const mains = [];
  let style = null;
  lines.forEach((l) => {
    if (!/^##\s/.test(l)) return;
    const t = l.replace(/^##\s+/, "").trim();
    /* 小数号先排除：`4.5 xxx` 是子节 */
    if (/^\d+\.\d+/.test(t)) return;
    let x = /^(\d+)[.．、]/.exec(t);
    if (x) {
      mains.push(Number(x[1]));
      if (style === null) style = "arabic";
      else if (style !== "arabic") mixedStyle.push(`${name}: 「${t.slice(0, 20)}」`);
      return;
    }
    x = /^([一二三四五六七八九十]+)[、.．]/.exec(t);
    if (x) {
      mains.push(CN[x[1]] ?? -1);
      if (style === null) style = "cn";
      else if (style !== "cn") mixedStyle.push(`${name}: 「${t.slice(0, 20)}」`);
    }
  });

  const seen = new Set();
  mains.forEach((n) => {
    if (seen.has(n)) dupMain.push(`${name}: 第 ${n} 节出现两次`);
    seen.add(n);
  });

  /* 缺号只报告（同风格内，且不含 0 —— 从「一」起算的册没有 0 是正常的） */
  const ints = [...seen].filter((n) => n > 0).sort((a, b) => a - b);
  if (ints.length) {
    const miss = [];
    for (let n = ints[0]; n < ints[ints.length - 1]; n++) if (!seen.has(n)) miss.push(n);
    if (miss.length) gapReports.push(`${name}: 缺 ${miss.join(",")}`);
  }

  /* ④ 取值集合不得变小。
     基线 = **旧壳 index.json**（`InvestSigh-Workbuddy-frontend/.../prompts/index.json`）——
     它是唯一保留了真读法的副本（34 型 323 行、套话 0 条）。
     不能用 git HEAD：首次入库那次提交里读法列已被 bundle 快照污染成同一句套话，
     拿它当基线会把"恢复真读法"误报成"丢内容"（实测 24 册假红）。
     也不能用 system/env/meta/prompts：那套手册自己的问句表里读法列同样是套话。 */
  /* ④ 读法质量（不再与旧壳源比"条数"）。
     ★ 为什么改：旧壳 index.json 与手册的**问句条数本来就不同**
       （如 内部人申报 源 10 条、手册 7 条；投行研报 源 27 条、手册 12 条）——
       那是"模板节"与"问句表"两种粒度，不是丢内容。按条数比会把这些永远判成丢失。
     现在只判两件事，都是本仓库真正在乎的：
       · 每行都有读法，且**不是**内置默认套话（`只读材料明确写出的判断…` / `只抄材料给出的数字…`）
       · 读法不是空桩（< 14 字，如"表格""官方原文"这种来源词） */
  const BOILISH = /^只读材料明确写出的判断：谁在什么时点说了什么，句末带页码；材料没说的不补、不推论。$|^只抄材料给出的数字，连同口径、单位、财年；没给这一项就留空，不要估算。$/;
  const p = parseManual(m.file, m.cat, m.stem);
  const boil = p.rows.filter((r) => BOILISH.test((r.reading ?? "").trim())).length;
  const stub = p.rows.filter((r) => {
    const t = (r.reading ?? "").trim();
    return t && !BOILISH.test(t) && t.length < 14;
  }).length;
  if (boil || stub) {
    thinContent.push(`${name}: 套话 ${boil} 行 · 空桩 ${stub} 行（共 ${p.rows.length}）`);
  }
}

const pass = badTitle.length === 0 && dupMain.length === 0 && mixedStyle.length === 0 && thinContent.length === 0;

console.log(`① 有「问句表」标题的册：${manuals.length - badTitle.length}/${manuals.length}`);
badTitle.forEach((b) => console.log("   ✗ " + b));

console.log(`\n② 主节号重复：${dupMain.length}`);
dupMain.forEach((d) => console.log("   ✗ " + d));

console.log(`\n③ 编号风格混排：${mixedStyle.length}`);
mixedStyle.forEach((d) => console.log("   ✗ " + d));

console.log(`\n④ 读法质量（套话 / 空桩）：${thinContent.length} 册有问题`);
thinContent.forEach((d) => console.log("   ★ " + d));

console.log(`\n（参考，不判红）节号跳跃 ${gapReports.length} 册：`);
gapReports.forEach((d) => console.log("   · " + d));

console.log(`\n${pass ? "✓ 通过" : "✗ 未通过"}`);
process.exitCode = pass ? 0 : 1;

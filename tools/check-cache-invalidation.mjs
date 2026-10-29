#!/usr/bin/env node
/**
 * 验证「**手册文件被外部改动**（不走 PUT）后，API 下一次读能立刻看到新值」。
 *
 * 为什么必须验：`promptsource.mjs` 有进程内缓存。若缓存只认"第一次读"，
 * 外部编辑手册后 API 会一直回旧值 —— 磁盘与 API 分叉，症状是
 * 「我明明改了手册，界面却不跟着变」，而且重启才恢复，极难归因。
 *
 * 判据：直接改手册文件里的一条问题 → 立刻 GET /prompts → 必须看到新值 → 复原后再看一次。
 *
 *   node tools/check-cache-invalidation.mjs
 */
import fs from "node:fs";

const API = "http://127.0.0.1:5280/api";
const SUB = "insider-filing";

/* 先问后端"真源是哪个文件"，不在这里硬编码路径 */
const base = await (await fetch(`${API}/prompts/${SUB}`)).json();
const FILE = base.file;
const Q1Before = base.rows[0].label;
console.log(`真源：${FILE}`);
console.log(`基线 Q1 =「${Q1Before}」`);

const backup = fs.readFileSync(FILE, "utf8");
const eol = backup.includes("\r\n") ? "\r\n" : "\n";

/* 只改第一行 Q 的第 2 列（问题），保持其他字节与行尾 */
const STAMP = `EXT-${Date.now().toString().slice(-6)}`;
const lines = backup.split(/\r?\n/);
const qi = lines.findIndex((l) => /^\|\s*Q1\s*\|/.test(l));
if (qi < 0) {
  console.error("✗ 找不到 Q1 行");
  process.exit(2);
}
const cells = lines[qi].split("|");
cells[2] = ` ${STAMP} `;
lines[qi] = cells.join("|");
fs.writeFileSync(FILE, lines.join(eol), "utf8");

/* 不改动后端进程，直接再读 */
const after = await (await fetch(`${API}/prompts/${SUB}`)).json();
const Q1After = after.rows[0].label;
console.log(`外部改文件后 Q1 =「${Q1After}」`);
const ok1 = Q1After === STAMP;
console.log(ok1 ? "✓ 缓存已失效，API 读到新值" : "✗ 缓存未失效 —— 磁盘/API 分叉");

/* 复原 */
fs.writeFileSync(FILE, backup, "utf8");
const restored = await (await fetch(`${API}/prompts/${SUB}`)).json();
const Q1Restored = restored.rows[0].label;
console.log(`复原后 Q1 =「${Q1Restored}」`);
const ok2 = Q1Restored === Q1Before;
console.log(ok2 ? "✓ 复原也被感知" : "✗ 复原没被感知");

const bytes = fs.readFileSync(FILE, "utf8") === backup;
console.log(bytes ? "✓ 复原后文件逐字节相同" : "✗ 复原后文件有差异");

process.exitCode = ok1 && ok2 && bytes ? 0 : 1;

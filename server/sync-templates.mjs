/**
 * 模板题集同步 —— 分册问句表是唯一真源，模板题节从分册逐字重建。
 *
 * 背景：34 个模板停在初始版题集；分册经两轮专家审查演进（重排＋补题）从未同步到模板。
 * 做什么：
 *   1. parseManual 读分册问句表（题干列逐字）
 *   2. 定位模板文件：分册锚点行（兼容「本册模板/本型模板」）；锚点指向不存在的文件名时，
 *      在 templates/ 找 stem 前缀匹配的实际文件，并把分册锚点行改指实际文件
 *   3. 重建模板题节区（YAML 头与 HTML 注释块原样保留；占位符用全库统一文案）
 *
 * 用法：node server/sync-templates.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import { parseManual } from "./manual.mjs";

const DRY = process.argv.includes("--dry");
const ROOT = process.cwd();
const ANSWER_PH = "<答案：第一行结论＋数字＋所以什么；答不出整节删掉（什么都不写）>";
const EVID_PH = "- p.N｜<支撑本栏答案的最短原文，原样抄；无关的不登>";

/* 锚点文件名 → 实际文件名（历史命名差异，显式登记） */
const RENAME = {
  "corpus/templates/01-8-K与EX-99.1.md": "corpus/templates/01-8-K 与 EX-99.1 业绩件.md",
  "corpus/templates/01-其他条目与红灯.md": "corpus/templates/01-其他法定表格与红灯.md",
  "corpus/templates/07-共识预期与预期差.md": "corpus/templates/07-共识与预期差.md",
  "corpus/templates/07-利率与通胀预期.md": "corpus/templates/07-利率与通胀.md",
  "corpus/templates/07-期权与波动率预期.md": "corpus/templates/07-期权与波动率.md",
};

const bookFiles = [];
for (const d of fs.readdirSync(path.join(ROOT, "corpus/prompts"))) {
  if (!/-型$/.test(d)) continue;
  for (const f of fs.readdirSync(path.join(ROOT, "corpus/prompts", d))) {
    if (f.endsWith(".md")) bookFiles.push(path.join("corpus/prompts", d, f));
  }
}

const tplPathFromAnchor = (text) => {
  const m = text.match(/输出格式\s*=\s*本(?:册|型)模板\*\*\s*`([^`]+)`/);
  return m ? m[1].trim() : null;
};

const findActualTpl = (p) => {
  const renamedPath = RENAME[p];
  if (renamedPath) {
    if (fs.existsSync(path.join(ROOT, renamedPath))) return { resolved: renamedPath, renamed: true };
  }
  if (fs.existsSync(path.join(ROOT, p))) return { resolved: p, renamed: false };
  const dir = path.dirname(path.join(ROOT, p));
  const stem = path.basename(p, ".md");
  const hit = fs.readdirSync(dir).find((f) => f.endsWith(".md") && f.startsWith(stem));
  return hit ? { resolved: path.join("corpus/templates", hit), renamed: true } : { resolved: null, renamed: false };
};

let fixedAnchors = 0, synced = 0, skipped = [];
for (const book of bookFiles) {
  const full = path.join(ROOT, book);
  const text = fs.readFileSync(full, "utf-8");
  const anchor = tplPathFromAnchor(text);
  if (!anchor) { skipped.push(`${book}: 无锚点行`); continue; }
  const { resolved, renamed } = findActualTpl(anchor);
  if (!resolved) { skipped.push(`${book}: 锚点模板不存在且找不到实际文件 → ${anchor}`); continue; }

  const rows = parseManual(book).rows ?? [];
  if (!rows.length) { skipped.push(`${book}: 问句表 0 行`); continue; }

  // 分册锚点指向的文件名与实际不符 → 修锚点行
  let bookText = text;
  if (renamed) {
    bookText = bookText.replace(anchor, resolved);
    if (!DRY) fs.writeFileSync(full, bookText);
    fixedAnchors++;
  }

  // 重建模板题节区
  const tplFull = path.join(ROOT, resolved);
  const tpl = fs.readFileSync(tplFull, "utf-8");
  const headMatch = tpl.match(/^([\s\S]*?)(?=\n## Q?\d)/);
  if (!headMatch) { skipped.push(`${resolved}: 找不到题节起点`); continue; }
  const head = headMatch[1].replace(/\s+$/, "\n\n");
  // 题节号用分册 rows 的 id 原文（Q1 / 1 两种册内风格）——卡 sections id 必须与
  // 分册 rows id 一致，前端详情页按 rowId 对齐 cells，错一格显示就空转
  const sections = rows
    .map((r) => `## ${r.id} · ${r.label.trim()}\n\n${ANSWER_PH}\n\n### 依据\n${EVID_PH}`)
    .join("\n\n\n");
  const next = head + sections + "\n";
  const oldN = [...tpl.matchAll(/^##\s+Q?\d+\s*·/gm)].length;
  if (!DRY) fs.writeFileSync(tplFull, next);
  synced++;
  console.log(`${DRY ? "[dry] " : ""}${path.basename(resolved)}: ${oldN} 题 → ${rows.length} 题${renamed ? `（锚点 ${anchor} → ${resolved}）` : ""}`);
}

console.log(`\n${DRY ? "[dry-run] " : ""}同步 ${synced} 册、修锚点 ${fixedAnchors} 处、跳过 ${skipped.length}`);
skipped.forEach((s) => console.log(" SKIP", s));

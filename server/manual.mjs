/**
 * 手册读写 —— **真源是 `corpus/prompts/0X-型/*.md` 的 `## 4. 问句表`**。
 *
 * `corpus/prompts/index.json` 与 `server/data/taxonomy.json` 是**过时产物**：
 *   · taxonomy 只用来把材料里的英文 slug 对到中文册名（**不提供行内容**）
 *   · index.json 只用来给行补一个 `kind`（问/数）显示提示，因为手册没有对应的列
 *
 * 33 册的问句表已统一为：
 *   章节 `## 4. 问句表`（中文序号册为 `## 四、问句表`，保持该册编号风格）
 *   表头 `| # | 问什么 | 读法 | 拿到什么算过 | 答不上来怎么写 | 频次 | 落哪个篮子 |`
 *
 * 因此回写只有一条路径：定位 `## 4. 问句表` 那一节 → 该节里表头像问句表的那一块 →
 * 第 2 列写问题、第 3 列写读法，其余字节不动。
 */

import fs from "node:fs";
import path from "node:path";

export const MANUAL_ROOT = "corpus/prompts";

/** 问句表的标题（阿拉伯 / 中文两种编号风格都认） */
const Q_TITLE = /^(?:\d+[.．、]|[一二三四五六七八九十]+[、.．])\s*问句表\s*$/;
/** 统一种之前的旧标题，也要能认（回写要兼容存量）。
 *  ★ 必须含「逐问读法」：四册查表册（催化剂地图 / 宏观与周期细目 / 政策与管制细目 / 情绪指标地图）
 *    的问句表标题是 `附·逐问读法（按N族，针对性）`，漏了它就会退回到「表行最多的一节」，
 *    而那一节往往是**指标清单表**（指标/发布方/频率…），选错一次就把清单当问句表改掉。 */
const Q_TITLE_LEGACY = /问句|要问的问题|逐问读法/;

/** 问题列的表头候选。
 *  ★ 不要放单独的「指标」：`## 二、情绪族` 那种**指标清单表**（指标/发布方/频率/…）也含它，
 *    会把清单表误认成问句表（实测 情绪指标地图 因此选错节）。 */
const LABEL_HEADS = ["问什么", "指标族", "族", "域", "件", "项"];

const norm = (s) => s.replace(/[`*]/g, "").replace(/\s+/g, "").trim();

const isH2 = (l) => /^##\s/.test(l);
const isH3 = (l) => /^###\s/.test(l);
const headingTitle = (l) => l.replace(/^#{2,3}\s+/, "").trim();
const isTableLine = (l) => /^\s*\|/.test(l);
const isSep = (l) => /^\|[\s:|-]+\|?\s*$/.test(String(l ?? "").trim()) && String(l).includes("-");

const splitCells = (line) => line.split("|");
const cellAt = (line, i) => {
  const parts = splitCells(line);
  return parts[i] !== undefined ? parts[i].trim() : "";
};

/* ───────── 行尾保持 ───────── */

/**
 * ★ 这个工作树是 **CRLF**。`split(/\r?\n/)` 再 `join("\n")` 会把整份文件改成 LF，
 *   `git diff` 就成了"整个文件被重写"，看起来像改坏了（实际内容没变）。
 *   所以：解析时可以容忍任意行尾，**写回必须沿用文件原来的行尾**。
 */
const eolOf = (text) => (text.includes("\r\n") ? "\r\n" : "\n");

/* ───────── 手册清单 ───────── */

/** 目录即真源：`corpus/prompts/<NN>-型/<册>.md` */
export function listManuals(root = MANUAL_ROOT) {
  if (!fs.existsSync(root)) return [];
  const out = [];
  for (const d of fs.readdirSync(root, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const m = /^(\d{2})-型$/.exec(d.name);
    if (!m) continue;
    for (const f of fs.readdirSync(path.join(root, d.name))) {
      if (!f.endsWith(".md")) continue;
      out.push({ cat: m[1], stem: f.replace(/\.md$/, ""), file: path.join(root, d.name, f) });
    }
  }
  return out.sort((a, b) => (a.cat === b.cat ? (a.stem < b.stem ? -1 : 1) : a.cat < b.cat ? -1 : 1));
}

/* ───────── 定位问句表 ───────── */

/**
 * 在某一行区间里，找**表头像问句表**的那一块表。
 *
 * ★ 关键：不能按「行首是 | Q1 | 或 | 1 |」判问句行 —— `必过项` 表也是 `| 1 |`，
 *   按行匹配会把整张必过项表当成问句表的一部分（实测把「共识与评级档位」「独立研究」改坏）。
 *   正确做法：**先按表块切**（连续的 `|` 行算一块），再挑表头像问句表、且行数最多的那一块。
 */
export function findQuestionTable(lines, start, end) {
  const blocks = [];
  let cur = null;
  for (let i = start; i < end; i++) {
    if (isTableLine(lines[i])) {
      if (!cur) cur = { from: i, to: i };
      else cur.to = i;
    } else if (cur) {
      blocks.push(cur);
      cur = null;
    }
  }
  if (cur) blocks.push(cur);

  const looksQuestion = (heads) => heads.some((h) => LABEL_HEADS.some((k) => norm(h).includes(k)));

  let best = null;
  for (const b of blocks) {
    const header = b.from;
    const sep = b.from + 1;
    if (!isSep(lines[sep])) continue;
    const heads = splitCells(lines[header]).slice(1, -1).map((c) => c.trim());
    if (!looksQuestion(heads)) continue;
    const rows = b.to - sep;
    if (rows < 1) continue;
    if (!best || rows > best.rows) best = { header, sep, firstRow: sep + 1, lastRow: b.to, heads, rows };
  }
  return best;
}

/**
 * 定位「问句表」这一节：优先标题精确为 `<编号>问句表`；否则退回含「问句/要问的问题」；
 * 再没有就取含问句表且行数最多的一节（兼容统一之前的存量手册）。
 */
export function locateQuestionSection(lines) {
  const heads = [];
  lines.forEach((l, i) => {
    if (isH2(l)) heads.push({ i, title: headingTitle(l) });
  });
  const endOf = (k) => (k + 1 < heads.length ? heads[k + 1].i : lines.length);

  const withTable = heads
    .map((h, k) => {
      const t = findQuestionTable(lines, h.i, endOf(k));
      return t ? { ...h, end: endOf(k), table: t, rows: t.rows } : null;
    })
    .filter(Boolean);

  const exact = withTable.filter((h) => Q_TITLE.test(h.title));
  if (exact.length) {
    exact.sort((a, b) => b.rows - a.rows);
    return exact[0];
  }
  const legacy = withTable.filter((h) => Q_TITLE_LEGACY.test(h.title));
  if (legacy.length) {
    legacy.sort((a, b) => b.rows - a.rows);
    return legacy[0];
  }
  if (withTable.length) {
    const sorted = [...withTable].sort((a, b) => b.rows - a.rows);
    return sorted[0].rows >= 4 ? sorted[0] : null;
  }
  return null;
}

/* ───────── 解析 ───────── */

/**
 * 解析某一册。
 * @returns {{cat,stem,file,section,table,header,labelCol,readingCol,rows:Array,text,lines,firstRow,lastRow,noTable?}}
 */
export function parseManual(file, cat, stem, textOverride) {
  const text = textOverride ?? fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  const sec = locateQuestionSection(lines);
  if (!sec) return { cat, stem, file, rows: [], noTable: true, text, lines };

  const t = sec.table;
  const headerCells = t.heads;

  let labelCol = headerCells.findIndex((h) => LABEL_HEADS.some((k) => norm(h).includes(k)));
  if (labelCol < 0) labelCol = headerCells.length > 1 ? 1 : 0;
  /* 读法列 = 问题列右邻（统一种之后固定是第 3 列「读法」） */
  const readingCol = Math.min(labelCol + 1, Math.max(headerCells.length - 1, labelCol));

  const rows = [];
  for (let i = t.firstRow; i <= t.lastRow; i++) {
    if (!isTableLine(lines[i])) continue;
    const parts = splitCells(lines[i]);
    const id = cellAt(lines[i], 1);
    if (!id) continue;
    rows.push({
      id,
      label: parts[labelCol + 1] !== undefined ? parts[labelCol + 1].trim() : "",
      reading: parts[readingCol + 1] !== undefined ? parts[readingCol + 1].trim() : "",
      lineNo: i,
      raw: lines[i],
    });
  }

  return {
    cat,
    stem,
    file,
    section: sec.title,
    header: headerCells,
    labelCol,
    readingCol,
    rows,
    text,
    lines,
    firstRow: t.firstRow,
    lastRow: t.lastRow,
  };
}

/* ───────── 写回 ───────── */

/** 保留原有空格风格，写入一个单元格；竖线转义、换行压平 */
const putCell = (line, col0, value) => {
  const parts = splitCells(line);
  if (col0 + 1 >= parts.length) return line;
  const old = parts[col0 + 1] ?? "";
  const lead = /^\s*/.exec(old)?.[0] || " ";
  const trail = /\s*$/.exec(old)?.[0] || " ";
  const v = String(value).replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
  parts[col0 + 1] = `${lead || " "}${v}${trail || " "}`;
  return parts.join("|");
};

/** 按该册既有编号风格造新 id（`Q12` 或 `12`） */
export function nextIdOf(parsed) {
  const ids = parsed.rows.map((r) => r.id);
  const qStyle = ids.some((i) => /^Q\d+$/.test(i));
  const max = ids.reduce((a, i) => {
    const n = Number((i.match(/\d+$/) ?? ["0"])[0]);
    return Number.isFinite(n) && n > a ? n : a;
  }, 0);
  return qStyle ? `Q${max + 1}` : String(max + 1);
}

/**
 * 把整张问句表按 `rows` 重写进手册（只动这一张表的行区块，其余字节原样）。
 *
 * @param {string} file
 * @param {Array<{id,label,reading}>} rows 目标行，顺序即最终顺序
 * @returns {{file,before,after,added:string[],removed:string[]}}
 */
export function writeRows(file, rows) {
  const parsed = parseManual(file);
  if (parsed.noTable || !parsed.rows.length) {
    throw new Error(`${path.basename(file)} 没有 4. 问句表，无法写回`);
  }
  const lines = parsed.text.split(/\r?\n/);
  const cols = Math.max(parsed.header.length, parsed.labelCol + 1, parsed.readingCol + 1);

  const byId = new Map(parsed.rows.map((r) => [r.id, r]));
  const keep = new Set(rows.map((r) => r.id));
  const added = rows.filter((r) => !byId.has(r.id)).map((r) => r.id);
  const removed = parsed.rows.filter((r) => !keep.has(r.id)).map((r) => r.id);

  const body = rows.map((row) => {
    const old = byId.get(row.id);
    if (old) {
      let line = old.raw;
      if ((row.label ?? "") !== old.label) line = putCell(line, parsed.labelCol, row.label);
      if ((row.reading ?? "") !== old.reading) line = putCell(line, parsed.readingCol, row.reading);
      return line;
    }
    const cells = Array.from({ length: cols }, () => " ");
    cells[0] = ` ${row.id} `;
    cells[parsed.labelCol] = ` ${String(row.label ?? "").replace(/\|/g, "\\|")} `;
    if (parsed.readingCol !== parsed.labelCol) {
      cells[parsed.readingCol] = ` ${String(row.reading ?? "").replace(/\|/g, "\\|")} `;
    }
    return "|" + cells.join("|") + "|";
  });

  const out = [...lines.slice(0, parsed.firstRow), ...body, ...lines.slice(parsed.lastRow + 1)];
  /* 沿用原文件的行尾（CRLF 工作树里写 LF 会让 git 认为整个文件被重写） */
  fs.writeFileSync(file, out.join(eolOf(parsed.text)), "utf8");
  return { file, before: parsed.rows.length, after: rows.length, added, removed };
}

/* ───────── slug ↔ 手册 ───────── */

/**
 * 材料里的 `sub:` 是英文 slug（`insider-filing`），手册文件名是中文（`内部人申报.md`）。
 * taxonomy 只用来查这个对应，**不提供行内容**。
 *
 * 匹配顺序：① 完全相等 → ② 互为前缀（册名更长者优先）→ ③ 显式别名
 */
const SQUASH = /[\s·（）()]/g;
const squash = (s) => String(s ?? "").replace(SQUASH, "");

const STEM_ALIASES = {
  共识预期与预期差: "consensus-gap",
};

export function buildSlugMap(taxonomy, manuals) {
  const map = new Map();
  const slugs = (taxonomy?.cats ?? []).flatMap((c) => c.subtypes.map((s) => ({ cat: c.id, ...s })));

  const claim = (stem, slug) => {
    if (!map.has(stem) && ![...map.values()].includes(slug)) map.set(stem, slug);
  };

  for (const s of slugs) {
    const n = squash(s.name);
    for (const m of manuals) if (squash(m.stem) === n || s.id === m.stem) claim(m.stem, s.id);
  }

  const byLen = [...manuals].sort((a, b) => squash(b.stem).length - squash(a.stem).length);
  for (const s of slugs) {
    const n = squash(s.name);
    for (const m of byLen) {
      const st = squash(m.stem);
      if (!st || !n) continue;
      if (n.startsWith(st) || st.startsWith(n)) claim(m.stem, s.id);
    }
  }

  for (const [stem, slug] of Object.entries(STEM_ALIASES)) {
    if (manuals.some((m) => m.stem === stem)) claim(stem, slug);
  }

  const unmatched = manuals.filter((m) => !map.has(m.stem)).map((m) => m.stem);
  return { map, unmatched };
}

export const manualBySlug = (slugMap, manuals, slug) => {
  for (const [stem, s] of slugMap) if (s === slug) return manuals.find((m) => m.stem === stem);
  return undefined;
};

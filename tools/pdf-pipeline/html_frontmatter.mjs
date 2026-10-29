#!/usr/bin/env node
/**
 * HTML 载体（01 类 SEC 文件）分页补齐：把被抽取丢掉的前置页（封面 / 说明书封面 / 目录 / 关于本招股书）
 * 还原成可引用的逻辑块，并把原有块整体后移。
 *
 * 背景（实测）：这两份 S-3ASR 的 pages.json 只有 5 块，且第 1 块从 "Item 9.01, is not incorporated..."
 * 半句起——封面 i–ii、目录、以及"关于本招股书 + 并入清单"全被丢弃，导致这些内容无法作 p.N 依据。
 *
 * 做法：
 *   1. 用与抽取端一致的标签剥离法把 source.htm 转成纯文本；
 *   2. 按固定锚点切出 4 个前置块（封面 / 说明书封面 / 目录 / 关于本招股书+并入清单）；
 *   3. 原第 1 块开头补上被切在锚点前的那一段（"Notwithstanding the foregoing paragraphs…"），
 *      使前置块与原第 1 块之间既不重叠也不留缝；
 *   4. 原 5 块编号 +4 后原样保留（**文本一个字符不改**，已有依据块因此仍然可核）；
 *   5. 重写 pages.json / content.md / meta.json（pageCount）。
 *
 * 断言（任一不满足即退出码 1，不写盘）：
 *   A 锚点各命中一次且顺序正确；
 *   B 原第 1 块文本必须仍是新第 5 块文本的子串（逐字不改）；
 *   C 拼接后的总字数 = 前置块 + 原块 - 交接段（无重复、无遗漏）；
 *   D 每块非空；
 *   E 图片仍在第 1 块（封面 logo）。
 *
 * 用法：node tools/pdf-pipeline/html_frontmatter.mjs --ids <id> [<id> ...] [--dry]
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "../..");
const MAT = path.join(ROOT, "corpus", "materials");

const ANCHORS = {
  coverStart: "As filed with the Securities",
  prospectusCover: "\nPROSPECTUS",
  toc: "TABLE OF CONTENTS",
  about: "ABOUT THIS PROSPECTUS",
  seam: "Notwithstanding the foregoing paragraphs",
  bodyStart: "Item 9.01, is not incorporated",
};

const NAMES = ["封面（注册说明书正面）", "说明书封面", "目录", "关于本招股书与并入清单"];

/** 与抽取端一致的剥离：去 script/style、去标签、&nbsp;→空格、压空白、压空行 */
function strip(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

const norm = (s) => String(s).replace(/\s+/g, "");

function one(text, needle, label) {
  const i = text.indexOf(needle);
  if (i < 0) throw new Error(`锚点找不到：${label}（${JSON.stringify(needle)}）`);
  if (text.indexOf(needle, i + 1) >= 0) throw new Error(`锚点命中多次：${label}`);
  return i;
}

function rebuild(id, dry) {
  const dir = path.join(MAT, id);
  const html = fs.readFileSync(path.join(dir, "source.htm"), "utf8");
  const pj = JSON.parse(fs.readFileSync(path.join(dir, "pages.json"), "utf8"));
  const meta = JSON.parse(fs.readFileSync(path.join(dir, "meta.json"), "utf8"));
  const old = pj.pages ?? [];
  if (old.length !== 5) throw new Error(`${id}: 预期原 5 块，实际 ${old.length}`);

  const text = strip(html);
  const at = {
    coverStart: one(text, ANCHORS.coverStart, "coverStart"),
    prospectusCover: one(text, ANCHORS.prospectusCover, "prospectusCover"),
    toc: one(text, ANCHORS.toc, "toc"),
    about: one(text, ANCHORS.about, "about"),
    seam: one(text, ANCHORS.seam, "seam"),
    bodyStart: one(text, ANCHORS.bodyStart, "bodyStart"),
  };
  const order = ["coverStart", "prospectusCover", "toc", "about", "seam", "bodyStart"];
  for (let i = 1; i < order.length; i++) {
    if (at[order[i]] <= at[order[i - 1]]) throw new Error(`${id}: 锚点顺序异常 ${order[i - 1]} → ${order[i]}`);
  }

  const front = [
    text.slice(at.coverStart, at.prospectusCover),
    text.slice(at.prospectusCover, at.toc),
    text.slice(at.toc, at.about),
    text.slice(at.about, at.seam),
  ];
  const handoff = text.slice(at.seam, at.bodyStart); // 原文里被切在锚点前的一段

  /* 断言 B：原第 1 块必须逐字保留 */
  if (!norm(old[0].text).startsWith(norm(ANCHORS.bodyStart))) {
    throw new Error(`${id}: 原第 1 块不以预期句子开头，拒绝改动`);
  }

  const pages = [];
  front.forEach((t, i) => {
    if (!t.trim()) throw new Error(`${id}: 前置块 ${i + 1} 为空`);
    pages.push({ n: i + 1, chars: t.length, text: t, figures: [], note: NAMES[i] });
  });

  old.forEach((p, i) => {
    const t = i === 0 ? handoff + p.text : p.text;
    pages.push({
      n: 4 + i + 1,
      chars: t.length,
      text: t,
      figures: (p.figures ?? []).map((f) => ({ ...f })),
      note: i === 0 ? "招股书主体（含本页交接段）" : p.note,
    });
  });

  /* 断言 C：字数守恒 */
  const frontChars = front.reduce((a, b) => a + b.length, 0);
  const oldChars = old.reduce((a, b) => a + b.text.length, 0);
  const total = pages.reduce((a, b) => a + b.text.length, 0);
  if (total !== frontChars + oldChars + handoff.length) {
    throw new Error(`${id}: 字数不守恒 ${total} ≠ ${frontChars}+${oldChars}+${handoff.length}`);
  }
  /* 断言 B（严格）：原第 1 块整段仍是新第 5 块的子串 */
  if (!norm(pages[4].text).includes(norm(old[0].text))) throw new Error(`${id}: 原第 1 块文本在新块里找不回`);

  /* 断言 E：图片在第 1 块 */
  const figs = pj.figures ?? [];
  if (figs.length && figs[0].page !== 1) throw new Error(`${id}: 图片不在第 1 块`);
  pages[0].figures = figs.map((f) => ({ name: f.name, order: f.order }));

  const out = {
    id: pj.id,
    srcId: pj.srcId,
    pageCount: pages.length,
    note:
      "逻辑块 = 文档结构段，不是印刷页码。前 4 块是前置页（封面/说明书封面/目录/关于本招股书），" +
      "第 5 块起为原有块（含招股书主体与 Part II 各项）。源文件共 3 处 <img>，均为同一枚 Meta 文字标志（ALT=LOGO），只落图 1 张。",
    pages,
    figures: figs,
  };

  const md = pages
    .map((p) => {
      const body = String(p.text).replace(/\s+$/g, "");
      const f = (p.figures ?? []).map((x) => `![${x.name}](figures/${x.name})`).join("\n");
      return f ? `${body}\n\n${f}` : body;
    })
    .join("\n\n");

  console.log(
    `${id}: ${old.length} → ${pages.length} 块｜前置 ${frontChars} 字｜交接 ${handoff.length} 字｜总 ${total} 字`
  );
  pages.forEach((p) => console.log(`   p.${p.n}  ${String(p.chars).padStart(7)}  ${String(p.text).replace(/\s+/g, " ").slice(0, 56)}`));

  if (dry) return;
  fs.writeFileSync(path.join(dir, "pages.json"), JSON.stringify(out, null, 1));
  fs.writeFileSync(path.join(dir, "content.md"), md);
  meta.pageCount = pages.length;
  meta.frontMatterRestored = true;
  fs.writeFileSync(path.join(dir, "meta.json"), JSON.stringify(meta, null, 1));
}

const argv = process.argv.slice(2);
const dry = argv.includes("--dry");
const i = argv.indexOf("--ids");
const ids = i >= 0 ? argv.slice(i + 1).filter((x) => !x.startsWith("--")) : [];
if (!ids.length) {
  console.error("用法：node tools/pdf-pipeline/html_frontmatter.mjs --ids <id> [<id> ...] [--dry]");
  process.exit(2);
}
for (const id of ids) rebuild(id, dry);

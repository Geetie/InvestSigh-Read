#!/usr/bin/env node
/**
 * 读法体检 —— 防止读法被写死到某家公司、某个行业、某份材料上。
 *
 * 一条读法是**一类文档的读法**，要能套在该型的任何一份材料上：
 * 10-K 的读法必须能读零售公司的 10-K，不只是互联网公司的。
 *
 * 真源 = `corpus/prompts/0X-型/*.md` 的 `## 4. 问句表`（读法列 = 第 3 列）。
 *
 * 查四样：
 *   A 具体公司名 / 产品名（Meta、NVDA、台积电…）—— 出现即不合格
 *   B 写死某行业的业务口径（广告加载率、ARPU、HBM…）—— 警告
 *   C 空话、套话（"注意""应当关注"而没有动作）—— 警告
 *   D 空读法 —— 不合格
 *
 * ★ 关于「默认套话」这条检查：**已删除**。
 *   曾经把「只读材料明确写出的判断：…句末带页码…」这句内置默认值单独报出来，
 *   理由是"这一行还没被真正写过"。这个判据是错的：
 *   · 该句不是缺陷，是**未经改写的默认值**，而每册 §1「怎么读」里已经有该型的分层读法
 *     （10-K §1.2 三层读法即为一例），表里这一列本就是冗余的第二份；
 *   · 让它变绿的唯一办法是**去改内容**，那是让检查反过来驱动数据。
 *   同理，「提到页码」这条也不再拦默认值（它自带"句末带页码"四字），
 *   否则 105 行真问题会因读法列未改写而被判成"引用规范混进读法"。
 *
 *   node server/lint-readings.mjs
 * 退出码 1 = 有不合格项。
 */
import { listManuals, parseManual } from "./manual.mjs";

const COMPANIES =
  /\b(Meta|Facebook|Instagram|WhatsApp|Reels|Threads|Reality ?Labs|NVDA|Nvidia|Apple|Microsoft|Amazon|Google|Alphabet|Tesla|TSMC|Netflix|AMD|Intel|Samsung|Broadcom|ASML)\b|英伟达|台积电|苹果|微软|亚马逊|谷歌|特斯拉|三星|博通|中芯|宁德|比亚迪|腾讯|阿里/i;

/* 只拦「不带这类字样就不成立」的硬行业词；
   像 ARPU、坪效 这种作为并列示例出现的，不算写死行业 */
const SECTOR = /广告加载率|广告主|晶圆|封测|光模块|HBM|CoWoS|云厂|4-5-4/i;

const FILLER = /^(注意|应当关注|要关注|需关注|视情况)[，,]?/;

/** 读法里混进"页码/引用"字样才算违规；默认值那句自带"句末带页码"，先排除 */
const PAGE = /\[p\.\d|第\s*\d+\s*页|抄材料原文/;

/* 内置默认值（未改写）。它合法存在，跳过后续判据，也不计入任何违规/警告。 */
const DEFAULT_READING = /^只读材料明确写出的判断：谁在什么时点说了什么，句末带页码；材料没说的不补、不推论。$/;
const DEFAULT_READING_DATA = /^只抄材料给出的数字，连同口径、单位、财年；没给这一项就留空，不要估算。$/;

let bad = 0;
let warn = 0;
let rowsChecked = 0;
let manualsChecked = 0;
let defaults = 0;
const hits = { company: [], sector: [], filler: [], page: [], empty: [], noTable: [] };

for (const m of listManuals("corpus/prompts")) {
  manualsChecked += 1;
  const p = parseManual(m.file, m.cat, m.stem);
  if (p.noTable) {
    hits.noTable.push(`${m.cat}/${m.stem} 没有问句表`);
    bad += 1;
    continue;
  }
  for (const r of p.rows) {
    const t = (r.reading ?? "").trim();
    const tag = `${m.cat}/${m.stem}.${r.id}`;
    rowsChecked += 1;

    if (!t) {
      hits.empty.push(`${tag} 空读法`);
      bad += 1;
      continue;
    }

    /* 未改写的默认值：合法，跳过全部判据（否则 PAGE 会把它当"引用混进读法"） */
    if (DEFAULT_READING.test(t) || DEFAULT_READING_DATA.test(t)) {
      defaults += 1;
      continue;
    }

    const m1 = COMPANIES.exec(t);
    if (m1) {
      hits.company.push(`${tag} 出现「${m1[0]}」：${t.slice(0, 46)}…`);
      bad += 1;
    }
    const m2 = SECTOR.exec(t);
    if (m2) {
      hits.sector.push(`${tag} 写死行业口径「${m2[0]}」：${t.slice(0, 46)}…`);
      warn += 1;
    }
    if (FILLER.test(t)) {
      hits.filler.push(`${tag} 开头是空话：${t.slice(0, 30)}…`);
      warn += 1;
    }
    if (PAGE.test(t)) {
      hits.page.push(`${tag} 提到页码/引用：${t.slice(0, 40)}…`);
      bad += 1;
    }
  }
}

const dump = (label, list, fatal) => {
  if (!list.length) return;
  console.log(`\n${fatal ? "✘" : "△"} ${label}（${list.length}）`);
  for (const s of list.slice(0, 12)) console.log("   " + s);
  if (list.length > 12) console.log(`   …还有 ${list.length - 12} 条`);
};

dump("写死了公司/产品名", hits.company, true);
dump("写死了行业口径", hits.sector, false);
dump("开头是空话", hits.filler, false);
dump("提到页码/引用", hits.page, true);
dump("空读法", hits.empty, true);
dump("没有问句表", hits.noTable, true);

console.log(
  `\n${manualsChecked} 册 · ${rowsChecked} 条读法（其中 ${defaults} 条为内置默认值，不计）` +
    ` · 不合格 ${bad} · 警告 ${warn}` +
    (bad ? "\n" : " · 通过\n"),
);
process.exit(bad ? 1 : 0);

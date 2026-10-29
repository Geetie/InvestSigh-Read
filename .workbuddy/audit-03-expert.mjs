/**
 * 03-expert 批次审计 —— check.mjs 只查「有答案必有块 + 块逐字」，
 * 空答案不触发任何规则。所以这里补三条它看不见的：
 *   1 每行答案的厚度（字数、块数）
 *   2 正文有没有偷偷写页码
 *   3 手册 §4 要求的「拿到什么算过」是否真的落在答案里（Q2 四档次 / Q3 三档 / Q5 ⅠⅡ / Q6 二选一 / Q7 是否）
 * 外加对 check.mjs 的阳性对照：捏一条假引文必须报 unverified，否则说明校验器没生效。
 */
import fs from "node:fs";
import path from "node:path";
import { mdToMaterial } from "../server/parse-md.mjs";
import { validateMaterial } from "../server/validate.mjs";
import { readSource } from "../server/store.mjs";

const IDS = [
  "03-expert-channel-2026-05-31-对Meta模型的理解",
  "03-expert-channel-2026-06-28-海外互联网1Q26业绩回顾及展望",
  "03-expert-channel-2026-06-28-谷歌云专家交流",
  "03-expert-channel-2026-08-08-JeffDean最新访谈",
  "03-expert-channel-2026-09-15-MetaMuse产品解读",
  "03-expert-channel-2026-09-21-北美大模型专家纪要谷歌Meta等前沿进展",
];

const HEADINGS = {
  Q1: "**谁**在说（身份 / 层级 / **是否现任员工**）？**哪天**说的？**谁**整理的？",
  Q2: "他说的里，**哪些是未公开的经营事实**？",
  Q3: "它和**已经公开披露的**说法，**一致还是冲突**？",
  Q4: "有哪些**可计量的经营事实**（产能 / 成本 / 单位经济 / 人员）？",
  Q5: "这些数字**能不能回溯**到一手？",
  Q6: "这是**逐字问答**还是**整理者概述**？",
  Q7: "有没有**时点过期**问题（访谈早于最近一次披露）？",
};

const REQ = {
  Q2: ["涉及", "可能涉及", "不涉及", "无法排除"],
  Q3: ["一致", "冲突", "无法对照"],
  Q5: ["Ⅰ", "Ⅱ"],
  Q6: ["逐字", "概述"],
  Q7: ["是", "否"],
};

let bad = 0;
for (const id of IDS) {
  const file = path.join("output", "meta", id, "material.md");
  const src = fs.readFileSync(file, "utf8");
  const doc = mdToMaterial(src, id);
  const r = validateMaterial(doc, readSource(id));
  console.log(`\n=== ${id}`);
  console.log(`  check: ${r.level}  ${r.counts.rows}/7 行 · ${r.counts.blocks} 块`);

  const heads = [...src.matchAll(/^##\s+([A-Za-z0-9_-]+)\s*·\s*(.+?)\s*$/gm)].map((m) => [
    m[1],
    m[2],
  ]);
  const headMap = new Map(heads);
  for (const q of Object.keys(HEADINGS)) {
    if (!headMap.has(q)) {
      console.log(`  ✗ ${q} 题面行丢了或没被解析到`);
      bad++;
    } else if (headMap.get(q) !== HEADINGS[q]) {
      console.log(`  ✗ ${q} 题面被改动：${headMap.get(q).slice(0, 40)}`);
      bad++;
    }
  }

  for (const s of doc.sections) {
    const a = (s.answer || "").trim();
    const n = a.replace(/\s/g, "").length;
    const b = (s.blocks || []).length;
    const flags = [];
    if (!n) flags.push("空答案");
    if (n && n < 150) flags.push(`偏薄(${n}字)`);
    if (!b) flags.push("无块");
    if (/\[p\.\d+\]|(?<![A-Za-z])p\.\d{1,3}(?![\d])/.test(a)) flags.push("正文里有页码");
    if (/第\s*\d+\s*页/.test(a)) flags.push("正文写「第N页」");
    if (/待填|TODO|待补|<在此填写/.test(a)) flags.push("占位符残留");
    if (/^未见[。.]?$/.test(a)) flags.push("「未见」两个字");
    const req = REQ[s.id];
    if (req && n && !req.some((k) => a.includes(k))) flags.push(`缺口径词(${req.join("/")})`);
    if (flags.length) bad++;
    console.log(
      `  ${flags.length ? "✗" : "·"} ${s.id}  ${String(n).padStart(4)} 字  ${String(b).padStart(2)} 块` +
        (flags.length ? `  ← ${flags.join(" · ")}` : ""),
    );
  }
}

/* ── 阳性对照：假引文必须被抓住 ── */
const probe = mdToMaterial(
  `---\nid: probe\ntemplate_version: 2\nsource_pages: 4\n---\n## Q1 · x\n有答案\n### 依据\n- p.1｜这句话原文里绝对不存在\n`,
  "probe",
);
const pr = validateMaterial(probe, readSource(IDS[0]));
const probeOk = pr.level === "unverified";
console.log(`\n阳性对照（捏假引文）：${pr.level}  ${probeOk ? "✓ 校验器真的在查" : "✗ 校验器空转，前面所有 OK 都不可信"}`);
if (!probeOk) bad++;

/* ── 盲区确认：空答案仍是 OK ── */
const blind = mdToMaterial(
  `---\nid: blind\ntemplate_version: 2\nsource_pages: 4\n---\n## Q1 · x\n\n### 依据\n`,
  "blind",
);
console.log(`盲区确认（空答案）：${validateMaterial(blind, readSource(IDS[0])).level} —— 所以上面必须靠字数与块数自查`);

console.log(`\n${bad ? `有 ${bad} 处要回去补` : "全部 6 份通过形态审计"}`);
process.exit(bad ? 1 : 0);

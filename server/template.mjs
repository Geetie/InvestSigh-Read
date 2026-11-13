/**
 * 模板生成器 —— 后端版。
 *
 * 模板是**提示词版本的产物**，不是并列的第二份定义。界面上改了问题/读法、
 * 增删了行，后端就用新的行列表重出一份；旧模板文件归档不删（旧材料还指着它）。
 *
 * 注意：**读法不进模板**。读法是写给 agent 的指令，不是材料内容；
 * agent 只需要知道「回答哪几条、每条问什么」，怎么读由 prompt 版本带着走。
 */

const pad = (n) => String(n).padStart(2, "0");

export function renderTemplate({ subId, cat, version, rows, oneLiner = "" }) {
  const head = `---
# ── 材料身份（解析成 Material 的字段，键名不要改） ──
id: ${cat}-${subId}-YYYY-MM-DD-<slug>
cat: "${cat}"
sub: ${subId}
# ── 模板身份：这份材料是用哪一版问法生成的 ──
template: ${subId}
template_version: ${version}
# ── 材料元信息 ──
date: YYYY-MM-DD
time: HH:MM
title: <材料标题，与原文封面一致>
kind: <跟踪件 | 研报 | 10-K | 电话会 | …>
issuer: <出品方>
ticker: <标的代码，没有就留空>
source_pages: <原文页数>
---

<!--
  填写规则（给 agent）—— 本块是全库统一缺省，要改只改 server/template.mjs：★ 交付前删除本注释块（check.mjs 会拦残留）。
  0. 写法真源：corpus/prompts/写法规范.md（构思/落纸两道工序、四段结构、紧贴问题、篇幅、空格死命令）——本块只留缺省动作序与本型特例。

  1. 答案行：第一行就是「结论 + 关键数字（量名·数值·期间·口径）+ 所以什么」。
     不复述问题、不写铺垫；查证的努力体现在引用里，不体现在形容词里（禁「经仔细核对 / 已逐项检查」类自述）。
  2. 正文不写页码、不写 p.N；页码只出现在依据区。
  3. 依据：只登支撑本栏答案的最短原文，原样抄（不改字、不概括、不加省略号）；与答案无关的原文不登。
     源块本身碎的（表格被拆成单格）逐块照登，不许自己拼行。
  4. 这一栏答不出时只有一条路：本节整体删掉（答案区与依据区全空；阅读器显示斜线格，是合法读数）。
     禁止：写「材料未给出 / 未见 / 样本不足 / 非本问标准口径」任何字样、写"查了哪里"的解说、为填格罗列缺失清单、留半截标题。
     沾边的线索放进能回答它的那一格。答案内个别无原文支撑的句子 → 直接删句。
  5. 密度自检：一格只讲一件事；长句拆短，句号要有；每个数字后面跟「所以什么」。
  好答案的密度基准：「VVIX 收 106.43（2026-10-30 收盘，指数点），近 60 个交易日在 82.59–109.91 间震荡，
  10 月中旬起抬升约 27%——市场为波动本身的不确定性付的保费在变贵；传导到 Meta 要过 VIX 一环。」
  ${oneLiner ? `这一型要的是：${oneLiner}` : ""}
-->
`;

  /* 模板只是答题卡：题号 + 问题 + 依据位。读法属于提示词，不进这里。 */
  const body = rows
    .map(
      (r) => `
## ${r.id} · ${r.label}

<答案：第一行结论＋数字＋所以什么；答不出就整节留空>

### 依据
- p.N｜<支撑本栏答案的最短原文，原样抄；无关的不登>
`,
    )
    .join("\n");

  return head + body;
}

/** 版本号 = 按生效日排序后的序号（1 起） */
export const versionNo = (versions, at) => versions.findIndex((v) => v.at === at) + 1;

/** 取某日生效的一版：生效日 ≤ date 里最新的那一版 */
export function resolveAt(versions, date) {
  if (!versions?.length) return undefined;
  let chosen = versions[0];
  for (const v of versions) if (v.at <= date) chosen = v;
  return chosen;
}

export const pad2 = pad;

/**
 * 提示词（prompt）—— 和答题卡（template）是两样东西。
 *
 * 模板只给 agent 一个填字的地方；**提示词才告诉它怎么读**。
 * 两者分开存，改读法不会动到已经发出去的模板。
 */
export function renderPrompt({ subId, cat, version, rows, oneLiner = "" }) {
  const head = `# 提示词 · ${subId}
<!--
  cat: ${cat}
  version: ${version}
  rows: ${rows.length}
  ${oneLiner ? `这一型要的是：${oneLiner}` : ""}
-->

把这份提示词和答题卡（template.v${version}.md）一起用：
下面每条问法的「读法」告诉你到材料里取什么、怎么判、没有怎么办；答案填进答题卡。
「### 依据」只登支撑该答案的最短原文，原样抄；与答案无关的原文不登。

---

`;

  const body = rows
    .map(
      (r) => `## ${r.id} · ${r.label}

> 读法：${(r.reading ?? "").trim() || "（未设定）"}
`,
    )
    .join("\n---\n\n");

  return head + body;
}

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
  填写规则（给 agent）：

  1. 答案里**不要写页码、不要写括号引用** —— 正文保持干净的书面语，页码只出现在依据区。
  2. 每一行的「### 依据」**要把它支撑这个答案的原文全部登记进来**，不是登记一段就完。
     材料里有几处支撑就登几处（不同段落、不同页都分开登），格式一行一条：- p.12｜原文片段
  3. 原文片段必须是那一页里**原样抄下来的**：不改字、不概括、不加省略号、不换语序。
     抄不出来，就回 corpus/materials/<材料 id>/content.md 里再找一遍。
  4. 找不到任何原文支撑的那一句，**从答案里删掉**，或整句改成「材料未给出此项」。
     不允许留没有原文支撑的断言。
  ${oneLiner ? `这一型要的是：${oneLiner}` : ""}
-->
`;

  /* 模板只是答题卡：题号 + 问题 + 依据位。读法属于提示词，不进这里。 */
  const body = rows
    .map(
      (r) => `
## ${r.id} · ${r.label}

<在此填写答案，不要写页码>

### 依据
- p.N｜<把支撑上一段答案的原文原样抄进来，有几处登几处>
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
下面每条问法的「读法」告诉你到材料里取什么、怎么判、没有怎么办；答案填进答题卡，每条答案都要在
「### 依据」里抄进支撑它的原文，有几处抄几处，不许只抄一段交差。

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

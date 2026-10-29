/**
 * 原文证据校验器。
 *
 * 只查两件能查的事：
 *   R1 有答案的行，依据区至少一条块
 *   R2 每条块是第 N 页原文的逐字片段（去空白后可搜到）
 *
 * 「所有依据都要登记」这条**无法程序校验** —— 它写在模板里强制给 agent，
 * 校验器只能保证「登记了的都真」，不能保证「真的都登记了」。这一点不许含糊。
 */

const norm = (s) =>
  String(s)
    .replace(/\s+/g, "")
    .replace(/[“”„‟"＂]/g, '"')
    .replace(/[‘’]/g, "'");

const pageText = (pages, n) => {
  const p = pages?.pages?.find((x) => Number(x.n) === Number(n));
  return p ? norm(p.text) : null;
};

/**
 * @param {{id:string, templateVersion:number, sourcePages:number, sections:Array}} material
 * @param {{pages?:{n:number,text:string}[], pageCount?:number}|null} source
 */
export function validateMaterial(material, source) {
  const issues = [];
  const sections = material.sections ?? [];
  const withAnswer = sections.filter((s) => (s.answer ?? "").trim());

  /* v1 是「要求登记原文」之前的产物：整份不判错，不重跑、不伪造 */
  if ((material.templateVersion ?? 0) <= 1) {
    return {
      level: "legacy",
      counts: { rows: withAnswer.length, blocks: 0, noBlock: 0, unverified: 0, outOfRange: 0 },
      issues: [{ kind: "legacy", msg: "v1 旧材料（新规则之前生成），不参与判定" }],
    };
  }

  /* R1：有答案就必须有块 */
  let noBlock = 0;
  for (const s of withAnswer) {
    if (!(s.blocks ?? []).length) {
      noBlock += 1;
      issues.push({ kind: "no-block", row: s.id, msg: "有答案，依据区为空" });
    }
  }

  /* R2：逐字可查 + 页码在范围内 */
  let unverified = 0;
  let outOfRange = 0;
  const maxPage = Number(material.sourcePages || source?.pageCount || 0);
  for (const s of sections) {
    for (const b of s.blocks ?? []) {
      if (maxPage && (b.page < 1 || b.page > maxPage)) {
        outOfRange += 1;
        issues.push({ kind: "out-of-range", row: s.id, msg: `p.${b.page} 超出 1..${maxPage}` });
        continue;
      }
      const text = pageText(source, b.page);
      if (text == null) {
        unverified += 1;
        issues.push({ kind: "no-source", row: s.id, msg: `没有 p.${b.page} 的原文可核` });
        continue;
      }
      if (!text.includes(norm(b.quote))) {
        unverified += 1;
        issues.push({ kind: "unverified", row: s.id, msg: `p.${b.page} 里搜不到：${b.quote.slice(0, 36)}…` });
      }
    }
  }

  const level = outOfRange ? "broken" : unverified ? "unverified" : noBlock ? "missing" : "ok";
  const blocks = sections.reduce((a, s) => a + (s.blocks?.length ?? 0), 0);

  return { level, counts: { rows: withAnswer.length, blocks, noBlock, unverified, outOfRange }, issues };
}

/** 一句话说清结论，CLI 与 API 共用 */
export function summarize(id, r) {
  const c = r.counts;
  const detail = [
    c.rows ? `${c.rows} 行有答案` : "无答案",
    c.blocks ? `${c.blocks} 块原文` : "0 块原文",
    c.noBlock ? `${c.noBlock} 行没登记` : "",
    c.unverified ? `${c.unverified} 块查无此文` : "",
    c.outOfRange ? `${c.outOfRange} 处页码越界` : "",
  ]
    .filter(Boolean)
    .join(" · ");
  return `${id}  ${r.level.toUpperCase()}  ${detail}`;
}

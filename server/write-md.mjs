/**
 * 反向：Material → MD。只在「把既有数据搬进后端」时用（seed）。
 * 日常不写 md —— 那是 agent 的活。
 */
import { DEFAULT_READING } from "./defaults.mjs";

const quote = (v) => (/^[\w.\-:/]+$/.test(v) ? v : `"${String(v).replace(/"/g, '\\"')}"`);

export function materialToMd({ meta, rows }) {
  const fm = [
    "---",
    `id: ${quote(meta.id)}`,
    `cat: ${quote(meta.cat)}`,
    `sub: ${quote(meta.sub)}`,
    `template: ${quote(meta.sub)}`,
    `template_version: ${meta.templateVersion ?? 1}`,
    `date: ${quote(meta.date)}`,
    `time: ${quote(meta.time)}`,
    `title: ${quote(meta.name)}`,
    `kind: ${quote(meta.kind || "")}`,
    `issuer: ${quote(meta.issuer || "")}`,
    `ticker: ${quote(meta.ticker || "")}`,
    `source_pages: ${meta.sourcePages ?? 0}`,
    "---",
    "",
  ].join("\n");

  const body = rows
    .map((r) => {
      const answer = meta.cells?.[r.id] ?? "";
      return `## ${r.id} · ${r.label}\n\n${answer || ""}\n\n### 依据\n${evidenceOf(answer)}`;
    })
    .join("\n");

  return `${fm}\n${body}\n`;
}

/** 从答案里把 [p.N] 抽成依据行（seed 时原文句子拿不到，先只留页码） */
function evidenceOf(answer) {
  const pages = [...new Set([...answer.matchAll(/\[p\.(\d+)\]/g)].map((m) => m[1]))];
  if (!pages.length) return "";
  return pages.map((p) => `- [p.${p}]`).join("\n") + "\n";
}

export { DEFAULT_READING };

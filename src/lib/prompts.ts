import type { RowDef } from "./types";
import { apiMode, getPromptVersions, savePrompts, type PromptSet, type PromptRowDoc } from "./api";
import {
  BASELINE,
  DEFAULT_READING,
  readStore,
  seedIfEmpty,
  versionsOf,
  writeLocalPromptSet,
  type PromptRow,
  type PromptVersion,
} from "./prompts.local";

/**
 * 提示词的**应用层门面**。
 *
 * 页面只认这里：同步取行（rowsAt / versionAt / readingOf）+ 异步同步与保存。
 * 数据真正的来源分两种，见 `lib/api.ts`：http 打后端，mock 用 localStorage 缓存。
 *
 * 版本按「生效日」切：后来改过的问题不会回溯污染旧材料，旧问题与旧答案原样成对。
 */

export type { PromptRow, PromptVersion, PromptSet };
export { BASELINE, DEFAULT_READING, versionsOf };

/* ───────── 变更通知（改完词，矩阵与详情页要重算） ───────── */

let rev = 0;
const listeners = new Set<() => void>();

export const promptRev = () => rev;
export const subscribePrompts = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

const emit = () => {
  rev += 1;
  for (const fn of listeners) fn();
};

export const todayISO = (): string => {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

/* ───────── 同步取（页面渲染用） ───────── */

/** 首次使用种一版；http 模式下由 syncPrompts 回填，这里不做事 */
export function ensureSeeded(subId: string, base: RowDef[]): PromptVersion[] {
  if (apiMode === "http") return versionsOf(subId);
  return seedIfEmpty(subId, base);
}

export function versionAt(subId: string, date: string, base: RowDef[]): PromptVersion {
  const vs = ensureSeeded(subId, base);
  if (!vs.length) return { at: BASELINE, rows: base.map((r) => ({ ...r, reading: DEFAULT_READING[r.kind] })) };
  let chosen = vs[0];
  for (const v of vs) if (v.at <= date) chosen = v;
  return chosen;
}

export const rowsAt = (subId: string, date: string, base: RowDef[]): PromptRow[] =>
  versionAt(subId, date, base).rows;

export const readingOf = (subId: string, date: string, base: RowDef[], rowId: string): string =>
  rowsAt(subId, date, base).find((r) => r.id === rowId)?.reading ?? "";

/** 缓存里已有哪些型（App 判断要不要拉） */
export const cachedSubs = (): string[] => Object.keys(readStore());

/* ───────── 与后端同步 ───────── */

let synced = false;

/**
 * 启动时拉一遍（http 模式）。
 *
 * **必须拉「全部版本」，不是「今天生效的那版」**：
 * 缓存要能按材料日回溯 —— 只灌一版进去，旧材料就会解析到新问法，
 * 旧答案顶着新问题出现（版本隔离被击穿，`docs/CONTRACT.md §四` 的头号禁忌）。
 */
export async function syncPrompts(subs: { id: string }[], date = todayISO()): Promise<void> {
  if (apiMode !== "http" || synced) return;
  synced = true;
  try {
    const all = await getPromptVersions();
    for (const [subId, vs] of Object.entries(all)) {
      for (const v of vs) writeLocalPromptSet(subId, v.rows, v.at);
    }
  } catch {
    /* 拉失败就退回缓存里的旧版，不阻塞首屏 */
  }
  emit();
}

/** 保存一版：先打后端（或写本地），成功后更新缓存并通知全站 */
export async function savePrompt(
  subId: string,
  rows: PromptRowDoc[],
  effectiveFrom: string,
): Promise<PromptSet> {
  const set =
    apiMode === "http"
      ? await savePrompts(subId, rows, effectiveFrom)
      : writeLocalPromptSet(subId, rows, effectiveFrom);
  writeLocalPromptSet(subId, set.rows, set.effectiveFrom);
  emit();
  return set;
}

/** 当前某型在某日的行数（SubtypeBar / 矩阵表头用） */
export const countRowsAt = (subId: string, date: string, base: RowDef[]): number =>
  rowsAt(subId, date, base).length;

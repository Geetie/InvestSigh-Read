import type { FillHint, RowDef, RowKind } from "./types";
import type { PromptSet, PromptRowDoc } from "./api";

/**
 * 本地缓存层：读写 localStorage 里的提示词版本。
 *
 * 它有两个身份：
 *  · mock 模式下它就是唯一的「库」（原型不连后端也能改提示词）；
 *  · http 模式下它只是**读缓存** —— 真库在后端，`syncPrompts()` 拉回来落在这里，
 *    这样 App / 详情页那些同步取行的地方不用改成异步。
 *
 * 版本模型不变：按生效日切，取「生效日 ≤ 该日」里最新的一版。
 */

export interface PromptRow extends RowDef {
  /** 读法：这条问题该怎么读、允许用什么证据、材料没写时怎么办 */
  reading: string;
}

export interface PromptVersion {
  at: string;
  rows: PromptRow[];
}

const KEY = "investsigh.prompts.cache.v1";
export const BASELINE = "2000-01-01";

export const DEFAULT_READING: Record<RowKind, string> = {
  question: "只读材料明确写出的判断：谁在什么时点说了什么，句末带页码；材料没说的不补、不推论。",
  data: "只抄材料给出的数字，连同口径、单位、财年；没给这一项就留空，不要估算。",
};

type Store = Record<string, PromptVersion[]>;

export const readStore = (): Store => {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Store) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

export const writeStore = (store: Store) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* 配额满也不该把页面搞崩 */
  }
};

const byAt = (a: PromptVersion, b: PromptVersion) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0);

export const versionsOf = (subId: string): PromptVersion[] => (readStore()[subId] ?? []).slice().sort(byAt);

/** 首次使用按内置模板种一版（只在没有缓存时） */
export function seedIfEmpty(subId: string, base: RowDef[]): PromptVersion[] {
  const store = readStore();
  if (store[subId]?.length) return store[subId].slice().sort(byAt);
  store[subId] = [{ at: BASELINE, rows: base.map((r) => ({ ...r, reading: DEFAULT_READING[r.kind] })) }];
  writeStore(store);
  return store[subId];
}

export function resolveVersion(subId: string, date: string): PromptVersion | undefined {
  const vs = versionsOf(subId);
  if (!vs.length) return undefined;
  let chosen = vs[0];
  for (const v of vs) if (v.at <= date) chosen = v;
  return chosen;
}

const toSet = (subId: string, v: PromptVersion | undefined): PromptSet => ({
  subId,
  version: Math.max(1, versionsOf(subId).findIndex((x) => x.at === v?.at) + 1),
  effectiveFrom: v?.at ?? BASELINE,
  rows: (v?.rows ?? []).map<PromptRowDoc>((r) => ({
    id: r.id,
    label: r.label,
    reading: r.reading,
    kind: r.kind === "data" ? "data" : "question",
  })),
});

/** 某日生效的一版（mock 读 / http 回填缓存都走这个） */
export const readLocalPromptSet = (subId: string, date: string): PromptSet =>
  toSet(subId, resolveVersion(subId, date));

/** 一次读全部型（mock 用） */
export const readAllLocalPromptSets = (date: string): PromptSet[] =>
  Object.keys(readStore()).map((subId) => readLocalPromptSet(subId, date));

/** 写一版进缓存：同一个生效日只留一版 */
export function writeLocalPromptSet(subId: string, rows: PromptRowDoc[], effectiveFrom: string): PromptSet {
  const store = readStore();
  const vs = store[subId] ?? [];
  const next: PromptVersion = {
    at: effectiveFrom,
    rows: rows.map((r) => ({
      id: r.id,
      label: r.label,
      reading: r.reading,
      kind: r.kind === "data" ? "data" : "question",
      fill: "likely" as FillHint,
    })),
  };
  const hit = vs.findIndex((v) => v.at === effectiveFrom);
  if (hit >= 0) vs[hit] = next;
  else vs.push(next);
  vs.sort(byAt);
  store[subId] = vs;
  writeStore(store);
  return readLocalPromptSet(subId, effectiveFrom);
}

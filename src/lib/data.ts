import { getBundle } from "./api";
import type { Bundle, CategoryDef, Material, SubtypeDef } from "./types";

/** 七类的色相族：每类一个主色 + 一个副色，用于流光 / 光柱 / 选中态。 */
export interface Swatch {
  key: string;
  primary: string;
  secondary: string;
  glow: string;
}

export const CAT_SWATCH: Record<string, Swatch> = {
  "01": { key: "cyan", primary: "#22E6FF", secondary: "#7CF8FF", glow: "34,230,255" },
  "02": { key: "mint", primary: "#00FFC8", secondary: "#9BFFE4", glow: "0,255,200" },
  "03": { key: "violet", primary: "#8B6CFF", secondary: "#C7B6FF", glow: "139,108,255" },
  "04": { key: "amber", primary: "#FFB545", secondary: "#FFD99A", glow: "255,181,69" },
  "05": { key: "azure", primary: "#3D8BFF", secondary: "#9CC4FF", glow: "61,139,255" },
  "06": { key: "rose", primary: "#FF5C7A", secondary: "#FFA8B8", glow: "255,92,122" },
  "07": { key: "magenta", primary: "#FF3FD0", secondary: "#FF9BE8", glow: "255,63,208" },
};

export const swatchOf = (catId: string): Swatch => CAT_SWATCH[catId] ?? CAT_SWATCH["01"];

/** 载体形态：18 种 kind 的几何轮廓与图标语义。 */
export const KIND_META: Record<string, { icon: string; shape: string; hint: string }> = {
  卷宗: { icon: "fileStack", shape: "notch", hint: "全长卷宗" },
  波形: { icon: "activity", shape: "round", hint: "时序波形" },
  面板: { icon: "gauge", shape: "soft", hint: "读数面板" },
  轨道: { icon: "orbit", shape: "round", hint: "持仓轨道" },
  公文: { icon: "scroll", shape: "notch", hint: "公文原件" },
  六边: { icon: "hexagon", shape: "hex", hint: "聚合读数" },
  闪电: { icon: "zap", shape: "cut", hint: "即时事件" },
  表格: { icon: "table", shape: "grid", hint: "申报表" },
  印章: { icon: "stamp", shape: "round", hint: "盖章文书" },
  报刊: { icon: "newspaper", shape: "soft", hint: "报刊版面" },
  手稿: { icon: "pen", shape: "soft", hint: "长文手稿" },
  报道: { icon: "newspaper", shape: "soft", hint: "报道剪报" },
  骨架: { icon: "boxes", shape: "grid", hint: "链条骨架" },
  评述: { icon: "quote", shape: "soft", hint: "观点评述" },
  旁证: { icon: "radar", shape: "round", hint: "旁证扫描" },
  讲稿: { icon: "pen", shape: "soft", hint: "电话会讲稿" },
  菱形: { icon: "diamond", shape: "cut", hint: "预期分布" },
  纪要: { icon: "activity", shape: "soft", hint: "渠道纪要" },
};

export const kindMeta = (kind: string) => KIND_META[kind] ?? { icon: "file", shape: "soft", hint: kind };

/* ---------- 数据加载与索引 ---------- */

let cache: Bundle | null = null;

/**
 * 类 / 型 / 材料的总入口。
 * 具体从哪来由 `lib/api.ts` 决定（后端 or 本地 mock），这里只做缓存。
 */
export async function loadBundle(): Promise<Bundle> {
  if (cache) return cache;
  cache = await getBundle();
  return cache;
}

export interface Index {
  cats: CategoryDef[];
  byId: Map<string, Material>;
  byCatSub: Map<string, Material[]>;
  days: string[];
  totalMaterials: number;
  filledCells: number;
  totalCells: number;
  start: string;
  end: string;
}

export function buildIndex(b: Bundle): Index {
  const byCatSub = new Map<string, Material[]>();
  const byId = new Map<string, Material>();
  const daySet = new Set<string>();
  let filled = 0;
  let total = 0;
  for (const m of b.materials) {
    byId.set(m.id, m);
    const k = `${m.cat}|${m.sub}`;
    const arr = byCatSub.get(k);
    if (arr) arr.push(m);
    else byCatSub.set(k, [m]);
    daySet.add(m.date);
    filled += m.filled;
    total += m.total;
  }
  for (const arr of byCatSub.values())
    arr.sort((x, y) => (x.date === y.date ? x.time.localeCompare(y.time) : x.date.localeCompare(y.date)));

  const days: string[] = [];
  const cur = new Date(b.window[0] + "T00:00:00");
  const last = new Date(b.window[1] + "T00:00:00");
  while (cur <= last) {
    days.push(iso(cur));
    cur.setDate(cur.getDate() + 1);
  }

  return {
    cats: b.categories,
    byId,
    byCatSub,
    days,
    totalMaterials: b.materials.length,
    filledCells: filled,
    totalCells: total,
    start: b.window[0],
    end: b.window[1],
  };
}

export const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const shortDay = (d: string) => {
  const [, m, dd] = d.split("-");
  return `${Number(m)}.${Number(dd)}`;
};

export const weekdayOf = (d: string) =>
  ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][new Date(d + "T00:00:00").getDay()];

export const subtypeOf = (cat: CategoryDef | undefined, subId: string): SubtypeDef | undefined =>
  cat?.subtypes.find((s) => s.id === subId);

export const materialsOf = (idx: Index, cat: string, sub: string) => idx.byCatSub.get(`${cat}|${sub}`) ?? [];

export function groupByDay(list: Material[]): Map<string, Material[]> {
  const m = new Map<string, Material[]>();
  for (const x of list) {
    const a = m.get(x.date);
    if (a) a.push(x);
    else m.set(x.date, [x]);
  }
  for (const a of m.values()) a.sort((p, q) => p.time.localeCompare(q.time));
  return m;
}

/** 生成 [a, b] 之间的连续日期（含两端） */
export function rangeDays(a: string, b: string): string[] {
  const out: string[] = [];
  const cur = new Date(a + "T00:00:00");
  const last = new Date(b + "T00:00:00");
  while (cur <= last) {
    out.push(iso(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

/** 日期加减天 */
export function shiftDay(d: string, n: number): string {
  const x = new Date(d + "T00:00:00");
  x.setDate(x.getDate() + n);
  return iso(x);
}

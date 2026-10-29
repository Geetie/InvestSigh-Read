import type { Bundle, RowDef } from "./types";
import type { SourceDoc, SourceIndex } from "./sources";

/**
 * 唯一的数据出入口 —— 前后端只有这一个接缝。
 *
 * 两种模式，靠环境变量切：
 *   VITE_API_BASE=/api   → 走 HTTP，打真实后端
 *   （不设）              → 走本地 mock（public/data + localStorage），前端可单独跑
 *
 * 页面里**不许**再出现 `fetch("/data/...")`、`localStorage` —— 全部经过这里。
 * 后端换实现（Node / Python / 云函数）都不影响前端。
 *
 * 只有四个页面需要联调：日看板、时分矩阵、详情页、提示词编辑。
 * 产业链那三页是静态结构，不走这里。
 */

const BASE = (import.meta.env.VITE_API_BASE ?? "").replace(/\/$/, "");
export const apiMode: "http" | "mock" = BASE ? "http" : "mock";

/** 后端基址（写死空串时走同源）。图表 URL 等**非 fetch** 场景需要它 */
export const apiBase = (): string => BASE;

const json = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "content-type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  return (await res.json()) as T;
};

/* ───────────────────────── 模型 ───────────────────────── */

/** 一类一型的定义（不含行；行随提示词版本变） */
export interface Taxonomy {
  cats: {
    id: string;
    name: string;
    oneLiner: string;
    subtypes: { id: string; name: string; oneLiner: string }[];
  }[];
}

/** 一份材料 —— 矩阵与看板只要这些字段，答案按行 id 放在 cells 里 */
export interface MaterialDoc {
  id: string;
  cat: string;
  sub: string;
  name: string;
  kind: string;
  issuer: string;
  ticker: string;
  date: string;
  time: string;
  /** rowId → 答案正文。规范要求正文不写页码，页码只在依据区 */
  cells: Record<string, string>;
  filled: number;
  total: number;
  /** 标的目录名（`output/<标的>/<材料 id>/`）—— 后端按标的两级扫描后附加 */
  tickerDir?: string;
  /** rowId → 依据区登记的原文块（`- p.N｜原文`）；详情页右栏翻页与命中都靠它 */
  evidence?: Record<string, { page: number; quote: string }[]>;
}

export interface PromptRowDoc {
  id: string;
  label: string;
  reading: string;
  kind: "question" | "data";
}

/** 某型在某日生效的一版提示词 */
export interface PromptSet {
  subId: string;
  /** 第几版（1 起），只用于显示 */
  version: number;
  /** 生效日 YYYY-MM-DD */
  effectiveFrom: string;
  rows: PromptRowDoc[];
}

/* ───────────────────────── 读取 ───────────────────────── */

/** 类 / 型 / 材料的一次性快照（App 的 Index 由它构建） */
export async function getBundle(): Promise<Bundle> {
  if (apiMode === "http") {
    const [tax, materials] = await Promise.all([getTaxonomy(), getAllMaterials()]);
    const days = Array.from(new Set(materials.map((m) => m.date))).sort();
    return {
      window: [days[0] ?? "", days[days.length - 1] ?? ""],
      categories: tax.cats.map((c) => ({
        id: c.id,
        name: c.name,
        oneLiner: c.oneLiner,
        subtypes: c.subtypes.map((s) => ({ ...s, rows: [] as RowDef[] })),
      })),
      materials: materials.map((m) => ({ ...m, filled: m.filled, total: m.total })),
    };
  }
  return loadMockBundle();
}

/** 类与型 */
export async function getTaxonomy(): Promise<Taxonomy> {
  if (apiMode === "http") return json<Taxonomy>("/taxonomy");
  // mock：从 bundle 里抽
  const b = await loadMockBundle();
  return {
    cats: b.categories.map((c) => ({
      id: c.id,
      name: c.name,
      oneLiner: c.oneLiner,
      subtypes: c.subtypes.map((s) => ({ id: s.id, name: s.name, oneLiner: s.oneLiner })),
    })),
  };
}

/** 全部材料（一次拿完；App 建索引用） */
export async function getAllMaterials(): Promise<MaterialDoc[]> {
  if (apiMode === "http") return json<MaterialDoc[]>("/materials");
  const b = await loadMockBundle();
  return b.materials as unknown as MaterialDoc[];
}

/** 一型下的材料（带 cells） */
export async function getMaterials(cat: string, sub: string): Promise<MaterialDoc[]> {
  if (apiMode === "http") {
    return json<MaterialDoc[]>(`/materials?cat=${encodeURIComponent(cat)}&sub=${encodeURIComponent(sub)}`);
  }
  const b = await loadMockBundle();
  return b.materials
    .filter((m) => m.cat === cat && m.sub === sub)
    .map(({ cat: c, sub: s, ...rest }) => ({ ...rest, cat: c, sub: s }));
}

/** 原文分页（详情页右栏）。没有原文时返回 null */
export async function getSource(materialId: string): Promise<SourceDoc | null> {
  if (apiMode === "http") {
    const r = await fetch(`${BASE}/materials/${encodeURIComponent(materialId)}/source`);
    if (r.status === 404) return null;
    if (!r.ok) throw new Error(`source ${r.status}`);
    return (await r.json()) as SourceDoc;
  }
  const { loadSource } = await import("./sources");
  return loadSource(materialId);
}

/** 可读全文（图片按阅读顺序内联）。没有就返回 null */
export async function getContent(materialId: string): Promise<string | null> {
  if (apiMode !== "http") return null;
  const r = await fetch(`${BASE}/materials/${encodeURIComponent(materialId)}/content`);
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`content ${r.status}`);
  const j = (await r.json()) as { markdown?: string };
  return j.markdown ?? null;
}

/** 整页快照清单（把 PDF 一页整体渲染成的图，用于核对复杂图表） */
export async function getSnapshots(materialId: string): Promise<string[]> {
  if (apiMode !== "http") return [];
  const r = await fetch(`${BASE}/materials/${encodeURIComponent(materialId)}/snapshots`);
  if (r.status === 404) return [];
  if (!r.ok) return [];
  const j = (await r.json()) as { snapshots?: string[] };
  return j.snapshots ?? [];
}

/** 材料元信息（子型/日期/页数/图数） */
export async function getMaterialMeta(
  materialId: string,
): Promise<{ pageCount?: number; figureCount?: number; figuresWithPage?: number } | null> {
  if (apiMode !== "http") return null;
  const r = await fetch(`${BASE}/materials/${encodeURIComponent(materialId)}/meta`);
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`meta ${r.status}`);
  return (await r.json()) as { pageCount?: number; figureCount?: number };
}

/** 全部型在某日生效的问题与读法（一次拿完） */
export async function getAllPrompts(date: string): Promise<PromptSet[]> {
  if (apiMode === "http") return json<PromptSet[]>(`/prompts?date=${encodeURIComponent(date)}`);
  const { readAllLocalPromptSets } = await import("./prompts.local");
  return readAllLocalPromptSets(date);
}

/** 一型的**全部版本**（按生效日升序）—— 前端缓存靠它做「按材料日回溯」 */
export interface PromptVersionSet {
  at: string;
  rows: PromptRowDoc[];
}

/**
 * 全部型的全部版本。
 *
 * 为什么不复用 `getAllPrompts(date)`：那个只回「该日生效的一版」。
 * 拿它填缓存，等于把旧版本从本地抹掉 —— 于是 10-22 的材料也解析到 10-24 的新问法，
 * 版本隔离被击穿（旧答案顶着新问题出现，正是契约要防的事故）。
 */
export async function getPromptVersions(): Promise<Record<string, PromptVersionSet[]>> {
  if (apiMode === "http") return json<Record<string, PromptVersionSet[]>>("/prompt-versions");
  const { readStore } = await import("./prompts.local");
  return readStore();
}

/** 某型在某日生效的问题与读法 */
export async function getPrompts(subId: string, date: string): Promise<PromptSet> {
  if (apiMode === "http") {
    return json<PromptSet>(`/prompts/${encodeURIComponent(subId)}?date=${encodeURIComponent(date)}`);
  }
  const { readLocalPromptSet } = await import("./prompts.local");
  return readLocalPromptSet(subId, date);
}

/* ───────────────────────── 写入 ───────────────────────── */

/**
 * 保存一版（只改问题与读法）。
 *
 * 后端要做的三件事（顺序不能反）：
 *   1. 落库这一版（effectiveFrom 当天，同一天再改覆盖当天）；
 *   2. **用这一版重新生成该型的 MD 模板**，旧版本模板归档不动；
 *   3. 回给前端新的 PromptSet。
 * 旧材料仍指向它生成时的那一版，答案不会被改写。
 */
export async function savePrompts(
  subId: string,
  rows: PromptRowDoc[],
  effectiveFrom: string,
): Promise<PromptSet> {
  if (apiMode === "http") {
    return json<PromptSet>(`/prompts/${encodeURIComponent(subId)}`, {
      method: "PUT",
      body: JSON.stringify({ rows, effectiveFrom }),
    });
  }
  const { writeLocalPromptSet } = await import("./prompts.local");
  return writeLocalPromptSet(subId, rows, effectiveFrom);
}

/* ───────────────────────── mock 内部 ───────────────────────── */

let bundlePromise: Promise<Bundle> | null = null;
async function loadMockBundle(): Promise<Bundle> {
  if (!bundlePromise) {
    bundlePromise = fetch("/data/bundle.json")
      .then((r) => r.json() as Promise<Bundle>)
      .catch(
        () => ({ window: ["", ""], categories: [], materials: [] }) as unknown as Bundle,
      );
  }
  return bundlePromise;
}

/** 原文索引：mock 模式给详情页预热用 */
export async function getSourceIndex(): Promise<SourceIndex | null> {
  if (apiMode === "http") return null;
  const { loadIndex } = await import("./sources");
  return loadIndex();
}

/**
 * 产业链数据的类型与加载。
 *
 * 分两层：
 *  · index.json —— 三条链的清单，选择页只要这个（几百字节）
 *  · <id>.json  —— 单条链的环节与企业，进链页才拉
 */

export interface ChainMeta {
  id: string;
  name: string;
  en: string;
  oneLiner: string;
  status: "ready" | "planned";
  segments: number;
  companies: number;
}

export interface ChainSegment {
  id: string;
  name: string;
  gloss: string;
  output: string;
  /** 这个环节供给哪些下游环节（可以多个）—— 产业链是 DAG 不是直线 */
  feeds?: string[];
}

export interface ChainCompany {
  ticker: string;
  name: string;
  market: string;
  segment: string;
  role: "leader" | "main" | "edge";
  /** 未上市公司没有 ticker，进不了材料层 —— 链页里渲染成不可点的条目 */
  listed?: boolean;
}

export const isListed = (c: ChainCompany): boolean => c.listed !== false && Boolean(c.ticker);

export interface ChainDoc {
  id: string;
  name: string;
  en: string;
  oneLiner: string;
  status: string;
  draft: boolean;
  note: string;
  segments: ChainSegment[];
  companies: ChainCompany[];
}

let indexPromise: Promise<ChainMeta[]> | null = null;
const docCache = new Map<string, ChainDoc>();

export function loadChainIndex(): Promise<ChainMeta[]> {
  if (!indexPromise) {
    indexPromise = fetch("/data/chain/index.json")
      .then((r) => (r.ok ? r.json() : { chains: [] }))
      .then((d: { chains?: ChainMeta[] }) => d.chains ?? [])
      .catch(() => []);
  }
  return indexPromise;
}

export async function loadChain(id: string): Promise<ChainDoc | null> {
  const hit = docCache.get(id);
  if (hit) return hit;
  try {
    const res = await fetch(`/data/chain/${id}.json`);
    if (!res.ok) return null;
    const doc = (await res.json()) as ChainDoc;
    docCache.set(id, doc);
    return doc;
  } catch {
    return null;
  }
}

export const companiesOf = (doc: ChainDoc, segmentId: string): ChainCompany[] =>
  doc.companies.filter((c) => c.segment === segmentId);

/** 环节按上游 → 下游排（JSON 里的顺序即顺序） */
export const orderedSegments = (doc: ChainDoc): ChainSegment[] => doc.segments;

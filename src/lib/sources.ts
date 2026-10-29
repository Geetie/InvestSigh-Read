/**
 * 原文清单与全文的加载。
 *
 * index.json 只有 2KB，首屏随 App 一起拉；
 * 单件全文（60–400KB）按需懒加载，命中一次就缓存。
 * 没有原文的材料（1470 份合成件）不在这里出现 —— 调用方拿 null 走空态。
 */

export interface SourceMeta {
  srcId: string;
  file: string;
  pageCount: number;
  chars: number;
  emptyPages: number[];
  citedPages: number[];
  outOfRange: number[];
  bytes: number;
}

export interface SourceIndex {
  version: number;
  generatedAt: string;
  materials: Record<string, SourceMeta>;
}

export interface SourcePage {
  n: number;
  chars: number;
  text: string;
  /** 这页文本的来源：pdf-text / mineru / pdf-text+ocr-table / empty */
  src?: string;
}

/** 原文里的一张图。
 *  `order` = 全书阅读顺序（先页、后页内 bbox 上→下），**保证图能按正确顺序被读到**；
 *  `page` 为 null = 没定位到页（仍可展示，归「未分页」）。
 *  文件名形如 `001_p012_00.jpg`，序号与 order 一致，所以按文件名排序也是阅读顺序。 */
export interface SourceFigure {
  name: string;
  page: number | null;
  order?: number;
  url?: string;
}

export interface SourceDoc {
  id: string;
  srcId: string;
  pageCount: number;
  pages: SourcePage[];
  /** 整页快照文件名（snapshots/），用于核对「MinerU 把复合图表拆碎了」 */
  /** 图表清单。后端从 content_list 的 img_path + page_idx 生成，不是按文件名猜的 */
  figures?: SourceFigure[];
}

let indexPromise: Promise<SourceIndex | null> | null = null;
let indexCache: SourceIndex | null = null;
const docCache = new Map<string, SourceDoc>();

export function loadIndex(): Promise<SourceIndex | null> {
  if (indexCache) return Promise.resolve(indexCache);
  if (!indexPromise) {
    indexPromise = fetch("/data/sources/index.json")
      .then((r) => (r.ok ? (r.json() as Promise<SourceIndex>) : null))
      .then((d) => {
        indexCache = d;
        return d;
      })
      .catch(() => null);
  }
  return indexPromise;
}

/** 同步读已加载的清单（未加载完返回 null，调用方按「无原文」处理即可） */
export const peekMeta = (matId: string): SourceMeta | null => indexCache?.materials[matId] ?? null;

export async function loadSource(matId: string): Promise<SourceDoc | null> {
  const cached = docCache.get(matId);
  if (cached) return cached;

  const idx = await loadIndex();
  const meta = idx?.materials[matId];
  if (!meta) return null;

  try {
    const res = await fetch(`/data/sources/${meta.file}`);
    if (!res.ok) return null;
    const doc = (await res.json()) as SourceDoc;
    docCache.set(matId, doc);
    return doc;
  } catch {
    return null;
  }
}

/** 取某一页（页号从 1 起），越界返回 null */
export const pageOf = (doc: SourceDoc | null, n: number): SourcePage | null =>
  doc?.pages.find((p) => p.n === n) ?? null;

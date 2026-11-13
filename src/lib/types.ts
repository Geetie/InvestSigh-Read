export type RowKind = "question" | "data";
export type FillHint = "likely" | "sometimes" | "rare";

export interface RowDef {
  id: string;
  label: string;
  kind: RowKind;
  fill: FillHint;
}

export interface SubtypeDef {
  id: string;
  name: string;
  oneLiner: string;
  rows: RowDef[];
}

export interface CategoryDef {
  id: string;
  name: string;
  oneLiner: string;
  subtypes: SubtypeDef[];
}

export interface Material {
  id: string;
  cat: string;
  sub: string;
  name: string;
  kind: string;
  issuer: string;
  ticker: string;
  date: string;
  time: string;
  cells: Record<string, string>;
  filled: number;
  total: number;
  /** 标的目录名（`output/<标的>/<材料 id>/`）—— 后端两级扫描给的 */
  tickerDir?: string;
  /** rowId → 依据区登记的原文块（`- p.N｜原文`）；后端 parse-md 解析，前端右栏靠它翻页 */
  evidence?: Record<string, EvidenceBlock[]>;
  /**
   * 分册问句表逐行的有/无/缺 —— 格点阵的真源，与行序一一对应：
   *   "1" 取到了 · "0" 节在但空（材料不含，合法读数）· "x" 卡上没这节（未按现行问法重填）
   */
  grid?: string[];
  /** grid 里 "x" 的个数（卡节数少于现行问句表行数） */
  unfilled?: number;
  /** 配套件（需件列解析结果）：back=同型跨期（可回连）· cross=跨类（同日优先）· ledger/external 无日期对象 */
  companions?: Companions | null;
}

export interface Companions {
  tokens: string[];
  back: { id: string; date: string; name: string }[];
  cross: { cat: string; note: string; date: string | null; id: string | null }[];
  ledger: string[];
  external: string[];
}

export interface EvidenceBlock {
  page: number;
  quote: string;
}

export interface Bundle {
  window: [string, string];
  categories: CategoryDef[];
  materials: Material[];
}

export type Grain = "day" | "minute";

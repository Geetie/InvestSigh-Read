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

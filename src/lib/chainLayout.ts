import Dagre from "@dagrejs/dagre";
import { isListed, type ChainCompany, type ChainDoc, type ChainSegment } from "./chain";

/**
 * 产业链布局：dagre 横向分层 + 正交圆角连线。
 *
 * 为什么横着放：产业链就是「谁供给谁」，从左往右读是这类图的天然方向——
 * 上游在左、终端在右，横向排布同时给下方留出标注空间。竖排会把 7 个层级
 * 拉成 3000px 的长条，读者看不到全貌。
 *
 * 为什么用 dagre：手写的「同层竖排 + 居中」没法处理**边交叉**。同层节点的
 * 上下顺序一旦和连接关系错位，线就互相穿插。dagre 的 ordering 阶段用重心法
 * 重排同层节点来减少交叉，这一步手写不出来。
 *
 * dagre 不管边路由（官方明确写 Edge routing: No），所以连线我自己按
 * smoothstep 规则生成：水平右 → 垂直移 → 水平右，每个拐点 10px 圆角。
 * 正交线的好处是交叉点一眼能看清；全斜的贝塞尔交叉起来会糊成一团。
 */

export const COL_W = 190;
/** 同列节点之间的竖向间距 */
const NODE_SEP = 22;
/** 列与列之间的横向间距 */
const RANK_SEP = 56;
/** 节点头部固定高（编号行 + 环节名 + 释义两行 + 产出行），固定住才敢算位置 */
export const HEAD_H = 104;
/** 企业行固定高 */
export const CO_H = 28;
const PAD_B = 10;
const CORNER = 10;

/** 顶部带区高（上/中/下游色带 + 层号），给 SVG 留出的上方净空 */
export const BAND_H = 62;

export type BandKey = 0 | 1 | 2;
export const BANDS: { key: BandKey; zh: string; en: string }[] = [
  { key: 0, zh: "上游", en: "UPSTREAM" },
  { key: 1, zh: "中游", en: "MIDSTREAM" },
  { key: 2, zh: "下游", en: "DOWNSTREAM" },
];

export interface Placed {
  seg: ChainSegment;
  /** 语义层级（最长路径层，用于统计） */
  rank: number;
  /** dagre 实际列号（0 起），显示 L(n+1) 用它，保证和列位置一致 */
  col: number;
  band: BandKey;
  /** 左上角坐标（dagre 给的是中心点，已换算） */
  x: number;
  y: number;
  w: number;
  h: number;
  companies: ChainCompany[];
}

export interface EdgePoint {
  from: Placed;
  to: Placed;
}

export interface Column {
  col: number;
  band: BandKey;
  x: number;
  w: number;
}

export interface BandSpan {
  band: BandKey;
  x: number;
  w: number;
  cols: number;
}

export interface Layout {
  nodes: Placed[];
  edges: EdgePoint[];
  columns: Column[];
  bands: BandSpan[];
  width: number;
  height: number;
  /** 分几列（= 几层） */
  cols: number;
}

export function layoutChain(doc: ChainDoc): Layout {
  const segs = doc.segments;

  /* —— 语义层级：只用来写字与统计，位置交给 dagre —— */
  const rank = new Map<string, number>(segs.map((s) => [s.id, 0]));
  let changed = true;
  let guard = 0;
  while (changed && guard++ < 64) {
    changed = false;
    for (const s of segs) {
      const base = rank.get(s.id) ?? 0;
      for (const t of s.feeds ?? []) {
        if ((rank.get(t) ?? 0) < base + 1) {
          rank.set(t, base + 1);
          changed = true;
        }
      }
    }
  }

  /* —— 尺寸：宽度统一、高度随公司数 —— */
  const size = new Map<string, { w: number; h: number }>();
  for (const s of segs) {
    const n = doc.companies.filter((c) => c.segment === s.id).length;
    size.set(s.id, { w: COL_W, h: HEAD_H + Math.max(1, n) * CO_H + PAD_B });
  }

  /* —— dagre LR —— */
  const g = new Dagre.graphlib.Graph({ multigraph: false, compound: false });
  g.setGraph({ rankdir: "LR", nodesep: NODE_SEP, ranksep: RANK_SEP, marginx: 0, marginy: 0 });
  g.setDefaultEdgeLabel(() => ({}));

  for (const s of segs) {
    const z = size.get(s.id)!;
    g.setNode(s.id, { width: z.w, height: z.h });
  }
  const ids = new Set(segs.map((s) => s.id));
  for (const s of segs) {
    for (const t of s.feeds ?? []) {
      if (ids.has(t)) g.setEdge(s.id, t);
    }
  }

  Dagre.layout(g);

  /* —— 列号：用 dagre 给的中心 x 分组。
     不能用自己算的 rank 分组 —— 两者不一定一致（dagre 会做 tightening），
     拿错的键分组会把不同列的节点拽到同一 x、叠在一起。 —— */
  const cxOf = new Map<string, number>();
  const raw = segs.map((seg) => {
    const z = size.get(seg.id)!;
    const n = g.node(seg.id) as { x: number; y: number };
    cxOf.set(seg.id, n.x);
    return { seg, z, cx: n.x, cy: n.y };
  });
  const colKeys = [...new Set(raw.map((r) => Math.round(r.cx)))].sort((a, b) => a - b);
  const colOf = new Map<number, number>(colKeys.map((k, i) => [k, i]));
  const cols = colKeys.length;

  /* —— 带区：按列位置三等分（7 列 → 2 / 2 / 3） —— */
  const bandOf = (c: number): BandKey => {
    if (cols <= 1) return 0;
    const t = c / (cols - 1);
    if (t < 1 / 3) return 0;
    if (t < 2 / 3) return 1;
    return 2;
  };

  const nodes: Placed[] = raw.map((r) => {
    const col = colOf.get(Math.round(r.cx)) ?? 0;
    return {
      seg: r.seg,
      rank: rank.get(r.seg.id) ?? 0,
      col,
      band: bandOf(col),
      x: r.cx - r.z.w / 2,
      y: r.cy - r.z.h / 2,
      w: r.z.w,
      h: r.z.h,
      companies: doc.companies
        .filter((c) => c.segment === r.seg.id)
        .sort((a, b) => todoFirst(a) - todoFirst(b)),
    };
  });

  /* dagre 让同列节点「中心对齐」，高度不同就参差；改成左边缘对齐。
     宽度全部相等，所以等价于把同列节点的 x 拉到最小值。 */
  const colLeft = new Map<number, number>();
  for (const n of nodes) {
    const cur = colLeft.get(n.col);
    if (cur === undefined || n.x < cur) colLeft.set(n.col, n.x);
  }
  for (const n of nodes) n.x = colLeft.get(n.col)!;

  /* dagre 的坐标可能为负，整体平移到 0 起 */
  const minX = Math.min(...nodes.map((n) => n.x), 0);
  const minY = Math.min(...nodes.map((n) => n.y), 0);
  for (const n of nodes) {
    n.x -= minX;
    n.y -= minY;
  }

  const byId = new Map(nodes.map((n) => [n.seg.id, n]));
  const edges: EdgePoint[] = [];
  for (const n of nodes) {
    for (const t of n.seg.feeds ?? []) {
      const target = byId.get(t);
      if (target) edges.push({ from: n, to: target });
    }
  }

  const width = Math.max(...nodes.map((n) => n.x + n.w), COL_W);
  const height = Math.max(...nodes.map((n) => n.y + n.h), 1);

  /* —— 列与带区的几何 —— */
  const columns: Column[] = [];
  for (let c = 0; c < cols; c++) {
    const inCol = nodes.filter((n) => n.col === c);
    columns.push({
      col: c,
      band: bandOf(c),
      x: Math.min(...inCol.map((n) => n.x)),
      w: COL_W,
    });
  }

  /* 带区是**一把等分的尺子**，不是「列分组」。
     两种做法结果差很远：
      · 按列的归属分组 → 7 列只能切成 2/2/3，下游那一段宽出 50%，
        看上去就像没对齐（用户第一版就退了这条）；
      · 按宽度三等分 → 三段永远一样宽，视觉上是真正的刻度。
     代价是分界线可能落在某张卡的上方 —— 但它只存在于顶部 26px 的标尺里，
     不贯穿图面，读起来是「刻度」而不是「分组框」。 */
  const bands: BandSpan[] = BANDS.map((b, i) => ({
    band: b.key,
    x: (width * i) / 3,
    w: width / 3,
    cols: columns.filter((c) => c.band === b.key).length,
  }));

  return { nodes, edges, columns, bands, width, height, cols };
}

/** 上市的先排（0），未上市的沉到本环节底部（1） */
const todoFirst = (c: ChainCompany): number => (isListed(c) ? 0 : 1);

/**
 * 正交圆角连线：源右缘中点 → 水平右 → 垂直移 → 水平右 → 目标左缘中点。
 * 拐点用二次贝塞尔做 10px 圆角 —— 比硬折角柔和，又比全斜的曲线好读。
 */
export function edgePath(e: EdgePoint): string {
  const sx = e.from.x + e.from.w;
  const sy = e.from.y + e.from.h / 2;
  const tx = e.to.x;
  const ty = e.to.y + e.to.h / 2;

  const dx = tx - sx;
  const dy = ty - sy;

  if (Math.abs(dy) < 0.5) return `M ${sx} ${sy} L ${tx} ${ty}`;

  const mx = sx + dx / 2;
  const r = Math.min(CORNER, Math.abs(dy) / 2, Math.abs(dx) / 4);
  const dir = ty > sy ? 1 : -1;

  if (r < 1) return `M ${sx} ${sy} L ${mx} ${sy} L ${mx} ${ty} L ${tx} ${ty}`;

  return [
    `M ${sx} ${sy}`,
    `L ${mx - r} ${sy}`,
    `Q ${mx} ${sy} ${mx} ${sy + dir * r}`,
    `L ${mx} ${ty - dir * r}`,
    `Q ${mx} ${ty} ${mx + r} ${ty}`,
    `L ${tx} ${ty}`,
  ].join(" ");
}

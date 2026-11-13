/**
 * 探测器网络布局：固定层列 + 组内排序 + 独立正交通道。
 *
 * 为什么不用 dagre 的分层：dagre 按「最长路径」自由分层，同级节点会因出边
 * 长短被拆到不同列（起点节点散在 L1/L3/L4），既破坏「同级别同列」的读法，
 * 又让跨列长边互相穿插。这里层是语义（起点→驱动→因子→估值→终点），
 * 必须一列一层；dagre 唯一不可替代的 ordering 由「按主上交对象分组排序」代替。
 *
 * 交叉控制：层内节点按主要上交对象的层内序号分组排 y（同组相邻 → 边平行）；
 * 每条边分配独立的垂直通道 x（相邻列间按索引错开），线不再叠在一起。
 * 跨层直交边默认折叠（页面开关 / 点节点展开），信息不丢失只是按需呈现。
 */

export type NLayer = "start" | "drive" | "factor" | "val" | "top" | "nut";

export interface DNode {
  id: string;
  label: string;
  layer: NLayer;
  layerZh: string;
  agg: string;
  collect: string;
  forage: string;
  to: string;
  pub: boolean;
  v2: boolean;
  reg: boolean;
  /** 实例网在通用网基准上被「改」/「加」的节点，页面据此标角标 */
  modified?: boolean;
  added?: boolean;
}

export interface DEdge {
  from: string;
  to: string;
  label: string;
  type: "sub" | "cross" | "reg" | "forage";
}

export interface Placed {
  node: DNode;
  col: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Routed {
  edge: DEdge;
  path: string;
  /** 跨层直交边 = 默认折叠；相邻列边 = 默认可见 */
  folded: boolean;
  /** 起终点用于 hover 关联 */
  from: string;
  to: string;
}

export interface Layout {
  nodes: Placed[];
  edges: Routed[];
  columns: { col: number; x: number; w: number; zh: string }[];
  width: number;
  height: number;
  cols: number;
}

export const COL_W = 232;
/** 四个列间距：第一↔第二列最大，之后等差递减（公差 -55）。
    理由：五列节点数 17/8/6/4/1，左侧信息密度最高，通道需要最宽。 */
export const GAPS = [280, 225, 170, 115];
export const PAD = 32;
/** 第 col 列的左缘：列宽累加 + 已走过的间隔累加 */
const xOf = (col: number) =>
  PAD + col * COL_W + GAPS.slice(0, col).reduce((a, b) => a + b, 0);
const H_START = 70;
const H_OTHER = 96;
const NODE_SEP = 18;
const ORDER: NLayer[] = ["start", "drive", "factor", "val"];
const ZH: Record<NLayer, string> = {
  start: "起点 · 信息采集",
  drive: "驱动族",
  factor: "盈利因子",
  val: "估值层",
  top: "价值判断",
  nut: "养分面",
};

/** 正交圆角路径：源右缘 → 独立通道垂直段 → 目标左缘（照抄 chainLayout.edgePath，mx 可指定） */
function edgePath(sx: number, sy: number, tx: number, ty: number, mx: number, r = 9): string {
  const dx = tx - sx;
  const dy = ty - sy;
  if (Math.abs(dy) < 0.5) return `M ${sx} ${sy} L ${tx} ${ty}`;
  const rr = Math.min(r, Math.abs(dy) / 2, Math.abs(dx) / 4);
  const dir = ty > sy ? 1 : -1;
  if (rr < 1) return `M ${sx} ${sy} L ${mx} ${sy} L ${mx} ${ty} L ${tx} ${ty}`;
  return [
    `M ${sx} ${sy}`,
    `L ${mx - rr} ${sy}`,
    `Q ${mx} ${sy} ${mx} ${sy + dir * rr}`,
    `L ${mx} ${ty - dir * rr}`,
    `Q ${mx} ${ty} ${mx + rr} ${ty}`,
    `L ${tx} ${ty}`,
  ].join(" ");
}

export function layoutNetwork(nodes: DNode[], edges: DEdge[]): Layout {
  const net = nodes.filter((n) => n.layer !== "nut");
  const layerOf = new Map(net.map((n) => [n.id, n.layer]));
  const cols: NLayer[] = [...ORDER, "top"];
  const colOf = new Map<NLayer, number>(cols.map((l, i) => [l, i] as [NLayer, number]));

  /* 主上交对象：优先相邻列的目标，取第一个；没有出边时用自身 id 兜底 */
  const mainTarget = new Map<string, string>();
  for (const n of net) mainTarget.set(n.id, n.id);
  for (const e of edges) {
    if (e.type === "forage") continue;
    const from = layerOf.get(e.from);
    const to = layerOf.get(e.to);
    if (!from || !to) continue;
    const adjacent = (colOf.get(to) ?? 0) - (colOf.get(from) ?? 0) === 1;
    if (adjacent || mainTarget.get(e.from) === e.from) mainTarget.set(e.from, e.to);
  }

  /* 层内排序：先按主上交对象的层，再按该对象在本层的预期序号（用 id 稳定排序） */
  const groups: Map<NLayer, DNode[]> = new Map(ORDER.map((l) => [l, []]));
  for (const n of net) groups.get(n.layer as NLayer)?.push(n);
  for (const [l, list] of groups) {
    list.sort((a, b) => {
      const ta = mainTarget.get(a.id) ?? a.id;
      const tb = mainTarget.get(b.id) ?? b.id;
      const la = layerOf.get(ta) ?? l;
      const lb = layerOf.get(tb) ?? l;
      return (colOf.get(la) ?? 0) - (colOf.get(lb) ?? 0) || ta.localeCompare(tb) || a.id.localeCompare(b.id);
    });
  }
  const seq = new Map<string, number>();
  for (const [, list] of groups) list.forEach((n, i) => seq.set(n.id, i));

  /* 固定列 x；层内按统一间距紧凑排布，整列在画布内垂直居中。
     稀疏列不再被强行拉满高度——节点之间不留大块空白，留白交给列间 GAP。 */
  const heightOf = (n: number, h: number) => (n > 0 ? n * h + (n - 1) * NODE_SEP : 0);
  const colH = new Map<NLayer, number>(
    ORDER.map((l) => [
      l,
      heightOf((groups.get(l) ?? []).length, l === "start" ? H_START : H_OTHER),
    ]),
  );
  const contentH = Math.max(H_OTHER, ...colH.values());
  const placed: Placed[] = [];
  for (const l of ORDER) {
    const col = colOf.get(l)!;
    const list = groups.get(l) ?? [];
    const h = l === "start" ? H_START : H_OTHER;
    const top = PAD + (contentH - (colH.get(l) ?? 0)) / 2;
    list.forEach((n, i) => {
      placed.push({
        node: n,
        col,
        x: xOf(col),
        y: top + i * (h + NODE_SEP),
        w: COL_W,
        h,
      });
    });
  }
  const tops = net.filter((n) => n.layer === "top");
  const topCol = ORDER.length;
  tops.forEach((n, i) => {
    placed.push({ node: n, col: topCol, x: xOf(topCol), y: PAD + (contentH - H_OTHER) / 2 + i * (H_OTHER + NODE_SEP), w: COL_W, h: H_OTHER });
  });

  const byId = new Map(placed.map((p) => [p.node.id, p]));
  const width = Math.max(...placed.map((p) => p.x + p.w), 0) + PAD;
  const height = PAD + contentH + PAD;

  /* 通道分配：同列/相邻列边默认可见（短边不交错）；跨列 ≥2 的边默认折叠。
     保底规则：某节点若一条可见出边都没有，从它的跨层边里救回列差最小的一条——
     默认视图里不允许出现"整节点断线"（此前 9 个节点因此看起来没接线）。 */
  const near: DEdge[] = [];
  const far: DEdge[] = [];
  for (const e of edges) {
    if (e.type === "forage") continue;
    const a = byId.get(e.from);
    const b = byId.get(e.to);
    if (!a || !b) continue;
    (Math.abs(b.col - a.col) <= 1 ? near : far).push(e);
  }
  const sortE = (x: DEdge, y: DEdge) => {
    const a = byId.get(x.from)!, b = byId.get(y.from)!;
    return a.y - b.y || (byId.get(x.to)?.y ?? 0) - (byId.get(y.to)?.y ?? 0);
  };
  near.sort(sortE);
  far.sort(sortE);
  const colDist = (e: DEdge) => Math.abs(byId.get(e.to)!.col - byId.get(e.from)!.col);
  const hasNear = new Set(near.map((e) => e.from));
  const rescued = new Set<DEdge>();
  const farByFrom = new Map<string, DEdge[]>();
  for (const e of far) {
    if (!farByFrom.has(e.from)) farByFrom.set(e.from, []);
    farByFrom.get(e.from)!.push(e);
  }
  for (const [from, list] of farByFrom) {
    if (hasNear.has(from)) continue;
    list.sort((x, y) => colDist(x) - colDist(y));
    rescued.add(list[0]);
  }

  const routed: Routed[] = [];
  const channel = (a: Placed, k: number, total: number, outer: boolean) => {
    const space = (GAPS[Math.min(a.col, GAPS.length - 1)] ?? 115) - 24;
    const step = total > 1 ? space / total : space / 2;
    const base = a.x + a.w + 12;
    return outer ? base + 14 + (k % Math.max(1, total)) * step : base + k * step;
  };
  near.forEach((e, k) => {
    const a = byId.get(e.from)!, b = byId.get(e.to)!;
    const sx = a.x + a.w, sy = a.y + a.h / 2;
    const tx = b.x, ty = b.y + b.h / 2;
    routed.push({ edge: e, from: e.from, to: e.to, folded: false, path: edgePath(sx, sy, tx, ty, channel(a, k, near.length, false)) });
  });
  far.forEach((e, k) => {
    const a = byId.get(e.from)!, b = byId.get(e.to)!;
    const sx = a.x + a.w, sy = a.y + a.h / 2;
    const tx = b.x, ty = b.y + b.h / 2;
    routed.push({ edge: e, from: e.from, to: e.to, folded: !rescued.has(e), path: edgePath(sx, sy, tx, ty, channel(a, k, far.length, true)) });
  });

  const columns = [...ORDER, "top" as NLayer].map((l, i) => ({
    col: i,
    x: xOf(i),
    w: COL_W,
    zh: ZH[l],
  }));

  return { nodes: placed, edges: routed, columns, width, height, cols: columns.length };
}

/** 全链闭包：全部上游祖先 + 全部下游子孙（照抄产业链页的 trace 交互） */
export function traceOf(id: string, edges: DEdge[]): { ups: Set<string>; downs: Set<string>; all: Set<string> } {
  const ups = new Set<string>();
  const downs = new Set<string>();
  const walk = (start: string, dir: "up" | "down", acc: Set<string>) => {
    const stack = [start];
    while (stack.length) {
      const cur = stack.pop()!;
      for (const e of edges) {
        if (e.type === "forage") continue;
        const hit = dir === "up" ? e.to === cur : e.from === cur;
        if (!hit) continue;
        const next = dir === "up" ? e.from : e.to;
        if (next !== start && !acc.has(next)) { acc.add(next); stack.push(next); }
      }
    }
  };
  walk(id, "up", ups);
  walk(id, "down", downs);
  return { ups, downs, all: new Set<string>([id, ...ups, ...downs]) };
}

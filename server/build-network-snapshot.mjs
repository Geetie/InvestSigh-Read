/**
 * 生成「五张网离线快照」单文件 HTML。
 *
 * 输入：public/data/network/{meta,lvde,estun,boshi,tsmc}.json（由 build-networks.mjs 生成）
 *       docs/网络查看器/快照模板.html（人可读模板，含 /*__SNAPSHOT_DATA__*\/ 占位）
 * 输出：docs/探测器网络快照_2026-11-12.html
 *
 * 布局算法与 src/lib/detectorLayout.ts 逐行对应（固定层列、列间距等差递减、
 * 层内紧凑居中、独立正交通道、跨层边折叠）。快照在 Node 侧预计算坐标与 SVG 路径，
 * HTML 端只渲染，零外部依赖、零 fetch、零 CDN —— 可直接转发、离线打开。
 *
 * 运行：node server/build-network-snapshot.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIR = path.join(ROOT, "public/data/network");
const TEMPLATE = path.join(ROOT, "docs/网络查看器/快照模板.html");
const OUT = path.join(ROOT, "docs/探测器网络快照_2026-11-12.html");
const KEYS = ["meta", "lvde", "estun", "boshi", "tsmc"];

/* ── 与 detectorLayout.ts 一致的参数 ── */
const COL_W = 232, GAPS = [280, 225, 170, 115], PAD = 32;
const H_START = 70, H_OTHER = 96, NODE_SEP = 18;
const ORDER = ["start", "drive", "factor", "val"];
const ZH = { start: "起点 · 信息采集", drive: "驱动族", factor: "盈利因子", val: "估值层", top: "价值判断" };
const xOf = (col) => PAD + col * COL_W + GAPS.slice(0, col).reduce((a, b) => a + b, 0);
const colOf = new Map([...ORDER, "top"].map((l, i) => [l, i]));

function edgePath(sx, sy, tx, ty, mx, r = 9) {
  const dx = tx - sx, dy = ty - sy;
  if (Math.abs(dy) < 0.5) return `M ${sx} ${sy} L ${tx} ${ty}`;
  const rr = Math.min(r, Math.abs(dy) / 2, Math.abs(dx) / 4), dir = ty > sy ? 1 : -1;
  if (rr < 1) return `M ${sx} ${sy} L ${mx} ${sy} L ${mx} ${ty} L ${tx} ${ty}`;
  return [
    `M ${sx} ${sy}`, `L ${mx - rr} ${sy}`, `Q ${mx} ${sy} ${mx} ${sy + dir * rr}`,
    `L ${mx} ${ty - dir * rr}`, `Q ${mx} ${ty} ${mx + rr} ${ty}`, `L ${tx} ${ty}`,
  ].join(" ");
}

function layoutNetwork(nodes, edges) {
  const net = nodes.filter((n) => n.layer !== "nut");
  const layerOf = new Map(net.map((n) => [n.id, n.layer]));

  const mainTarget = new Map(net.map((n) => [n.id, n.id]));
  for (const e of edges) {
    if (e.type === "forage") continue;
    const from = layerOf.get(e.from), to = layerOf.get(e.to);
    if (!from || !to) continue;
    const adjacent = (colOf.get(to) ?? 0) - (colOf.get(from) ?? 0) === 1;
    if (adjacent || mainTarget.get(e.from) === e.from) mainTarget.set(e.from, e.to);
  }
  const groups = new Map(ORDER.map((l) => [l, []]));
  for (const n of net) groups.get(n.layer)?.push(n);
  for (const [l, list] of groups) {
    list.sort((a, b) => {
      const ta = mainTarget.get(a.id) ?? a.id, tb = mainTarget.get(b.id) ?? b.id;
      const la = layerOf.get(ta) ?? l, lb = layerOf.get(tb) ?? l;
      return (colOf.get(la) ?? 0) - (colOf.get(lb) ?? 0) || ta.localeCompare(tb) || a.id.localeCompare(b.id);
    });
  }

  const heightOf = (n, h) => (n > 0 ? n * h + (n - 1) * NODE_SEP : 0);
  const colH = new Map(ORDER.map((l) => [l, heightOf((groups.get(l) ?? []).length, l === "start" ? H_START : H_OTHER)]));
  const contentH = Math.max(H_OTHER, ...colH.values());
  const placed = [];
  for (const l of ORDER) {
    const col = colOf.get(l), list = groups.get(l) ?? [], h = l === "start" ? H_START : H_OTHER;
    const top = PAD + (contentH - (colH.get(l) ?? 0)) / 2;
    list.forEach((n, i) => placed.push({ node: n, col, x: xOf(col), y: top + i * (h + NODE_SEP), w: COL_W, h }));
  }
  const topCol = ORDER.length;
  net.filter((n) => n.layer === "top").forEach((n, i) => {
    placed.push({ node: n, col: topCol, x: xOf(topCol), y: PAD + (contentH - H_OTHER) / 2 + i * (H_OTHER + NODE_SEP), w: COL_W, h: H_OTHER });
  });

  const byId = new Map(placed.map((p) => [p.node.id, p]));
  const width = Math.max(0, ...placed.map((p) => p.x + p.w)) + PAD;
  const height = PAD + contentH + PAD;

  // 同列/相邻列边默认可见；跨列 ≥2 折叠；每个节点保底至少一条可见出边
  const near = [], far = [];
  for (const e of edges) {
    if (e.type === "forage") continue;
    const a = byId.get(e.from), b = byId.get(e.to);
    if (!a || !b) continue;
    (Math.abs(b.col - a.col) <= 1 ? near : far).push(e);
  }
  const sortE = (x, y) => {
    const a = byId.get(x.from), b = byId.get(y.from);
    return a.y - b.y || (byId.get(x.to)?.y ?? 0) - (byId.get(y.to)?.y ?? 0);
  };
  near.sort(sortE); far.sort(sortE);
  const colDist = (e) => Math.abs(byId.get(e.to).col - byId.get(e.from).col);
  const hasNear = new Set(near.map((e) => e.from)), rescued = new Set();
  const farByFrom = new Map();
  for (const e of far) {
    if (!farByFrom.has(e.from)) farByFrom.set(e.from, []);
    farByFrom.get(e.from).push(e);
  }
  for (const [from, list] of farByFrom) {
    if (hasNear.has(from)) continue;
    list.sort((x, y) => colDist(x) - colDist(y));
    rescued.add(list[0]);
  }
  const routed = [];
  const channel = (a, k, total, outer) => {
    const space = (GAPS[Math.min(a.col, GAPS.length - 1)] ?? 115) - 24;
    const step = total > 1 ? space / total : space / 2;
    const base = a.x + a.w + 12;
    return outer ? base + 14 + (k % Math.max(1, total)) * step : base + k * step;
  };
  for (const [list, outer] of [[near, false], [far, true]]) {
    list.forEach((e, k) => {
      const a = byId.get(e.from), b = byId.get(e.to);
      const sx = a.x + a.w, sy = a.y + a.h / 2, tx = b.x, ty = b.y + b.h / 2;
      const folded = outer && !rescued.has(e);
      routed.push({ edge: e, from: e.from, to: e.to, folded, path: edgePath(sx, sy, tx, ty, channel(a, k, list.length, outer)) });
    });
  }
  placed.slice().sort((a, b) => a.col - b.col || a.y - b.y).forEach((p, i) => { p.no = String(i + 1).padStart(2, "0"); });
  const columns = [...ORDER, "top"].map((l, i) => ({ col: i, x: xOf(i), w: COL_W, zh: ZH[l] }));
  return { nodes: placed, edges: routed, columns, width, height, cols: columns.length };
}

const byKey = {};
for (const k of KEYS) {
  const doc = JSON.parse(fs.readFileSync(path.join(DIR, `${k}.json`), "utf-8"));
  byKey[k] = {
    ...layoutNetwork(doc.nodes, doc.edges),
    info: doc.info ?? null,
    // 页面口径：含养分面承载节点与觅食边；布局口径不含（觅食由总线呈现）
    counts: { nodes: doc.nodes.length, edges: doc.edges.length },
  };
  console.log(`${k.padEnd(7)} ${byKey[k].nodes.length} 节点 / ${byKey[k].edges.length} 边 · 画布 ${Math.round(byKey[k].width)}×${Math.round(byKey[k].height)}`);
}

// 自检：默认视图里除终点外，不许有节点一条可见出边都没有
for (const k of KEYS) {
  const d = byKey[k];
  const visible = new Set(d.edges.filter((e) => !e.folded).map((e) => e.from));
  const orphans = d.nodes.filter((p) => p.node.layer !== "top" && !visible.has(p.node.id)).map((p) => p.node.id);
  console.log(`  自检 ${k.padEnd(7)} 零可见出边: ${orphans.length ? orphans.join(",") : "无 ✓"}`);
}

const DATA = { order: KEYS, byKey };
const template = fs.readFileSync(TEMPLATE, "utf-8");
if (!template.includes("/*__SNAPSHOT_DATA__*/")) throw new Error("模板缺少占位符");

const writeSnapshot = (out, data) => {
  // JSON 字面量内嵌；转义 '<' 防止任何 </script> 截断 HTML 解析器
  const literal = JSON.stringify(data).replace(/</g, "\\u003c");
  const html = template.replace("/*__SNAPSHOT_DATA__*/", `const DATA = ${literal};`);
  fs.writeFileSync(out, html);
  return html;
};

// ① 合并快照（五张网在一个文件里切换）
const html = writeSnapshot(OUT, DATA);
console.log(`\n合并快照: ${OUT} (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB)`);

// ② 五份独立快照：每份只含一张网（另附通用网基准用于「与通用网对比」），可单独转发
const SNAP_DIR = path.join(ROOT, "docs/网络快照");
fs.mkdirSync(SNAP_DIR, { recursive: true });
const FILES = {
  meta:  "01_Meta_广告AI平台.html",
  lvde:  "02_绿的谐波_机器人上游.html",
  estun: "03_埃斯顿_机器人中游.html",
  boshi: "04_博实股份_机器人下游.html",
  tsmc:  "05_TSMC_半导体代工.html",
};
console.log("\n五份独立快照:");
for (const k of KEYS) {
  const title = byKey[k].info?.title ?? k;
  const by = k === "meta" ? { meta: byKey.meta } : { meta: byKey.meta, [k]: byKey[k] };
  const out = path.join(SNAP_DIR, FILES[k]);
  const h = writeSnapshot(out, { order: [k], byKey: by, title: `通用探测器网络 · ${title}` });
  console.log(`  docs/网络快照/${FILES[k]}  (${(Buffer.byteLength(h) / 1024).toFixed(1)} KB)`);
}

const external = /https?:\/\/|fetch\(|<script[^>]+src=/;
console.log("\n零外部依赖检查:", external.test(html) || KEYS.some((k) => external.test(fs.readFileSync(path.join(SNAP_DIR, FILES[k]), "utf-8")))
  ? "发现外部引用，需检查" : "通过（六个文件均无 URL / fetch / 外部 script）");

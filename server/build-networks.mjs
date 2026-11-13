/**
 * 从通用网基准（public/data/network/detectors.json）生成五张实例化网。
 *
 *   通用网 = 标准版；每张实例网 = 在标准版上应用一张「差异清单」
 *   （加/删/改节点、加/删边），差异来源：
 *     - Meta            : docs/调研/06-投资者模型因子树.md（通用网第一张网，基准）
 *     - 绿的谐波/埃斯顿/博实 : docs/组合A差异清单_机器人产业链_2026-11-11.md
 *     - TSMC            : docs/调研/15-TSMC跨产业链验证.md §七（机器可读 JSON）
 *
 * 运行：node server/build-networks.mjs
 * 产物：public/data/network/{meta,lvde,estun,boshi,tsmc}.json + networks.json（下拉索引）
 * 只写 public/data/network/，不改 corpus/ 与任何真源提示词。
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIR = path.join(ROOT, "public/data/network");
const BASE = JSON.parse(fs.readFileSync(path.join(DIR, "detectors.json"), "utf-8"));
const LAYER_ZH = { start: "起点", drive: "驱动族", factor: "盈利因子", val: "估值层", top: "价值判断", nut: "养分面" };

const tsmcText = fs.readFileSync(path.join(ROOT, "docs/调研/15-TSMC跨产业链验证.md"), "utf-8");
const tsmcSec = tsmcText.slice(tsmcText.indexOf("## 七"));
const tsmcJson = /```json\n([\s\S]*?)\n```/.exec(tsmcSec);
if (!tsmcJson) throw new Error("TSMC 报告 §七 找不到 JSON 块");
const TSMC_DIFF = JSON.parse(tsmcJson[1]);

/** 组合 A 三家公司：位置层/公司层差异（结构 JSON 只放加/删/改，权重与标记属参数层，写进 note） */
const ROBOT = {
  lvde: {
    info: {
      title: "绿的谐波 · 机器人上游减速器",
      chain: "机器人产业链",
      position: "上游 · 核心零部件",
      source: "docs/组合A差异清单_机器人产业链_2026-11-11.md §二",
      note: "量价 B 级（量官方 42.52 万台／价推导）；产能利用率官方序列 43%→68% 是第一驱动；在手订单仅第三方口径（约 8 亿／排至 2027）→代理＋置信分级；采集面＝年报／定增文件；D2 供给族、D7 技术族权重最高。通用核结构零改动。",
    },
    nodes_remove: [],
    nodes_add: [],
    nodes_modify: [
      { id: "F1", label: "F1 收入因子\n量官方·价推导（B 级）", collect: "官方销量 42.52 万台＋分产品收入；单价精确可推导、官方不报", to: "E1：量官方／价代理分列（proxy_tier 2）" },
      { id: "Y11", label: "Y11 产能库存\n（官方利用率 43%→68%）", collect: "官方产能利用率序列、月产能 5→9→12 万套、良率", to: "D2（上游第一驱动·核心）" },
      { id: "Y21", label: "Y21 订单与合同\n（仅第三方口径·代理）", collect: "在手订单约 8 亿／定点排至 2027；官方不披露订单金额", to: "D1（代理 B 模式＋置信分级）" },
      { id: "D2", collect: "产能利用率、良率、原材料传导——上游第一驱动（位置层权重最高）", to: "F1：量约束；F2：利用率→成本；F3：产能 capex" },
      { id: "D7", collect: "谐波减速器技术迭代、国产替代、研发产出", to: "F1：产品量价；F2：研发费用；E2：颠覆风险" },
    ],
    edges_add: [],
    edges_remove: [],
  },
  estun: {
    info: {
      title: "埃斯顿 · 机器人中游本体",
      chain: "机器人产业链",
      position: "中游 · 本体制造",
      source: "docs/组合A差异清单_机器人产业链_2026-11-11.md §二",
      note: "量价 C 级：官方零量披露，通行量（3.34 万台／市占 10%）全部来自第三方 MIR → 量节点停用为代理、置信上限下调；MIR 份额登顶是公司地位主证据；采集面＝业绩交流会；D4 成本族（规模效应拐点，毛利率年升 1–1.5pct）与 D5 竞争族权重最高；中游净利率仅 5–8%，是价格战主承担方。通用核结构零改动。",
    },
    nodes_remove: [],
    nodes_add: [],
    nodes_modify: [
      { id: "F1", label: "F1 收入因子\n量节点停用·MIR 代理（C 级）", collect: "官方零量披露；通行量 3.34 万台／市占 10% 来自第三方 MIR，按代理处理", to: "E1：量代理（禁预期差，置信上限下调）" },
      { id: "D5", label: "D5 竞争族\n（MIR 份额登顶）", collect: "MIR 份额登顶（第三方背书为主证据）、对手动向、替代威胁", to: "F1：份额；F2：价格战；E2：竞争风险" },
      { id: "D4", collect: "规模效应拐点：毛利率年升 1–1.5pct 目标（交流会明示）；中游是降本主承担者", to: "F2：利润率输入（位置层权重最高）" },
      { id: "Y21", collect: "订单/出货口径（本位置以第三方份额与出货量为主）", to: "D1（代理口径）" },
    ],
    edges_add: [],
    edges_remove: [],
  },
  boshi: {
    info: {
      title: "博实股份 · 机器人下游集成",
      chain: "机器人产业链",
      position: "下游 · 系统集成",
      source: "docs/组合A差异清单_机器人产业链_2026-11-11.md §二",
      note: "项目制无量纲披露 → 量概念不存在，需求改「订单-交付」形态；反直觉发现：下游官方在手合同 56.66 亿（智造装备 44.01 亿）反而是全链最强的官方需求先行指标；营运资本重点＝应收＋合同资产＋合同负债三件套；采集面＝逐笔重大合同公告。通用核结构零改动。",
    },
    nodes_remove: [],
    nodes_add: [],
    nodes_modify: [
      { id: "F1", label: "F1 收入因子\n项目制·无量纲（订单-交付）", collect: "项目订单与交付验收；无量价披露（C 级，量概念不存在）", to: "E1：项目交付口径" },
      { id: "D1", label: "D1 需求族\n（订单-交付型）", collect: "项目订单、在手合同、交付验收周期、回款", to: "F1：量驱动（订单≠收入，时滞 3–9 月）" },
      { id: "F5", collect: "应收＋合同资产＋合同负债三件套（下游营运资本结构）", to: "F4：OCF 质量" },
      { id: "Y21", label: "Y21 订单与合同\n（官方在手合同 56.66 亿·最强源）", collect: "官方公告在手合同 56.66 亿（智造装备 44.01 亿）、逐笔重大合同", to: "D1（核心·官方强源）" },
    ],
    edges_add: [],
    edges_remove: [],
  },
};

const META_INFO = {
  title: "Meta · 广告 / AI 平台（基准）",
  chain: "广告平台 / AI 算力",
  position: "平台型 · 注意力变现",
  source: "docs/调研/06-投资者模型因子树.md；docs/通用探测器网络_建模_v1.md",
  note: "通用网第一张网＝标准版。官方量价分解 DAP×ARPP、impressions×price per ad（复利）；目标价＝盈利预测×倍数双分解。其余四张网都是在这张网上应用差异清单。",
};

const TSMC_INFO = {
  title: "TSMC · 半导体晶圆代工",
  chain: "半导体代工 ＋ 先进封装 CoWoS",
  position: "名义中游制造／实际敏感度偏上游型",
  source: "docs/调研/15-TSMC跨产业链验证.md（530 行，纸面实例化）",
  note: "跨产业链验证：量价 B 级（量官方 12 寸约当片数／价推导），组合项（制程 mix）主导收入；折旧占营业成本 43.76%、capex 2026 指引 US$52–56B；foundry 无 backlog，订单落在客户暂收款与产能售罄表述；出口管制直接改可售范围；PE 为主锚、PB 作重资产参照。新增 3 个起点节点（制程 mix／CoWoS 产能／行业周期），改 8 个节点，加 10 边删 1 边，通用核结构复用。",
};

function clone(o) { return JSON.parse(JSON.stringify(o)); }

function applyDiff(base, diff, info) {
  const nodes = base.nodes.map(clone);
  let edges = base.edges.map(clone);

  // 1) 删边（先于删节点，避免 id 引用残留）
  for (const e of diff.edges_remove ?? []) {
    edges = edges.filter((x) => !(x.from === e.from && x.to === e.to));
  }
  // 2) 删节点 + 它的一切边
  const removed = new Set(diff.nodes_remove ?? []);
  if (removed.size) {
    for (let i = nodes.length - 1; i >= 0; i--) if (removed.has(nodes[i].id)) nodes.splice(i, 1);
    edges = edges.filter((e) => !removed.has(e.from) && !removed.has(e.to));
  }
  // 3) 改节点
  for (const m of diff.nodes_modify ?? []) {
    const n = nodes.find((x) => x.id === m.id);
    if (!n) { console.warn(`  ! 改节点不存在: ${m.id}`); continue; }
    for (const [k, v] of Object.entries(m)) if (k !== "id" && v !== undefined) n[k] = v;
    n.modified = true; // 页面据此标「改」，切换标的时差异可见
  }
  // 4) 加节点（补齐页面所需的结构字段 + 觅食边）
  for (const a of diff.nodes_add ?? []) {
    if (nodes.some((x) => x.id === a.id)) continue;
    nodes.push({
      id: a.id, label: a.label, layer: a.layer, layerZh: LAYER_ZH[a.layer] ?? a.layer,
      agg: a.agg ?? "—", collect: a.collect ?? "", forage: a.forage ?? "", to: a.to ?? "",
      pub: false, v2: false, reg: false, added: true, // 「加」角标
    });
    if (a.layer === "start") edges.push({ from: a.id, to: "NUTRIENT", label: "觅食", type: "forage" });
  }
  // 5) 加边（去重）
  for (const e of diff.edges_add ?? []) {
    if (!nodes.some((n) => n.id === e.from) || !nodes.some((n) => n.id === e.to)) { console.warn(`  ! 加边端点不存在: ${e.from}→${e.to}`); continue; }
    if (!edges.some((x) => x.from === e.from && x.to === e.to && x.label === e.label)) {
      edges.push({ from: e.from, to: e.to, label: e.label, type: e.type ?? "sub" });
    }
  }
  const summary = {
    nodes: nodes.length, edges: edges.length,
    add: (diff.nodes_add ?? []).length, remove: (diff.nodes_remove ?? []).length,
    modify: (diff.nodes_modify ?? []).length,
    edgeAdd: (diff.edges_add ?? []).length, edgeRemove: (diff.edges_remove ?? []).length,
  };
  return { nodes, edges, meta: BASE.meta, info: { ...info, summary } };
}

const OUT = {
  meta: applyDiff(BASE, {}, META_INFO),
  lvde: applyDiff(BASE, ROBOT.lvde, ROBOT.lvde.info),
  estun: applyDiff(BASE, ROBOT.estun, ROBOT.estun.info),
  boshi: applyDiff(BASE, ROBOT.boshi, ROBOT.boshi.info),
  tsmc: applyDiff(BASE, TSMC_DIFF, TSMC_INFO),
};

for (const [key, doc] of Object.entries(OUT)) {
  const file = key === "meta" ? "meta.json" : `${key}.json`;
  fs.writeFileSync(path.join(DIR, file), JSON.stringify(doc, null, 2));
  const s = doc.info.summary;
  console.log(`${key.padEnd(7)} → ${file.padEnd(14)} ${s.nodes} 节点 / ${s.edges} 边 · 加 ${s.add} 删 ${s.remove} 改 ${s.modify} · 边 +${s.edgeAdd}/-${s.edgeRemove}`);
}

const index = Object.entries(OUT).map(([key, doc]) => ({
  key, file: key === "meta" ? "meta.json" : `${key}.json`,
  title: doc.info.title, chain: doc.info.chain, position: doc.info.position,
  source: doc.info.source, note: doc.info.note, summary: doc.info.summary,
}));
fs.writeFileSync(path.join(DIR, "networks.json"), JSON.stringify(index, null, 2));
console.log("\nnetworks.json 索引已生成（5 张网）");

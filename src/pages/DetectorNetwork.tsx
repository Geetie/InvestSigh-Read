import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { layoutNetwork, traceOf, type DEdge, type DNode } from "../lib/detectorLayout";

/**
 * 探测器网络：独立可视化页面。
 *
 * 布局与视觉照抄产业链页（ChainMap.tsx）：白纸墨线、header / 三等分标尺 /
 * 列号 / 环节卡片 / 正交圆角连线 / 右侧详情栏 / footer / 适应一屏缩放 /
 * 点节点提亮全链上下游通路。
 *
 * 与产业链页的三处不同（都是网络本身要求的）：
 * 1. 固定层列：同级别必同列（dagre 自由分层会把同级起点拆到不同列）；
 * 2. 每条边独立正交通道 + 跨层边默认折叠，消除交错；折叠边可一键展开，信息不丢；
 * 3. 卡片与详情栏承载探测器四字段（聚合/收集/觅食面/上交）与边标签，不截断。
 */

const PAD = 32;
const BAND_H = 62;
const BANDS = [
  { zh: "信息采集", en: "SIGNALS" },
  { zh: "传导聚合", en: "PROPAGATION" },
  { zh: "价值判断", en: "VALUATION" },
];

interface NetSummary { nodes: number; edges: number; add: number; remove: number; modify: number; edgeAdd: number; edgeRemove: number; }
interface NetInfo { title: string; chain: string; position: string; source: string; note: string; summary: NetSummary; }
interface NetIndex extends NetInfo { key: string; file: string; }
type NetDoc = { nodes: DNode[]; edges: DEdge[]; info?: NetInfo };

export function DetectorNetwork() {
  const [doc, setDoc] = useState<NetDoc | null>(null);
  const [nets, setNets] = useState<NetIndex[]>([]);
  const [netKey, setNetKey] = useState(() => new URLSearchParams(window.location.search).get("net") ?? "meta");
  const [missing, setMissing] = useState(false);
  const [focus, setFocus] = useState<string | null>(() => new URLSearchParams(window.location.search).get("focus"));
  const [sideOpen, setSideOpen] = useState(() => new URLSearchParams(window.location.search).has("focus"));
  const [fit, setFit] = useState(false);
  /** null＝跟随「原尺寸/适应一屏」；数值＝手动倍率（覆盖自动档） */
  const [zoom, setZoom] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [showForage, setShowForage] = useState(() => new URLSearchParams(window.location.search).has("forage"));
  const [diffOnly, setDiffOnly] = useState(true);
  const [baseDoc, setBaseDoc] = useState<NetDoc | null>(null);
  const [hoverEdge, setHoverEdge] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    fetch("/data/network/networks.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (Array.isArray(d)) setNets(d); })
      .catch(() => {});
    // 通用网基准：右侧详情栏做「与通用网对比」用
    fetch("/data/network/meta.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d) setBaseDoc(d); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const file = nets.find((n) => n.key === netKey)?.file ?? "detectors.json";
    setDoc(null);
    fetch(`/data/network/${file}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => (d ? setDoc(d) : setMissing(true)))
      .catch(() => setMissing(true));
  }, [netKey, nets]);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const read = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setFocus(null); setSideOpen(false); }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, []);

  const layout = useMemo(() => (doc ? layoutNetwork(doc.nodes, doc.edges) : null), [doc]);
  const trace = useMemo(() => (doc && focus ? traceOf(focus, doc.edges) : null), [doc, focus]);
  const focused = focus ? doc?.nodes.find((n) => n.id === focus) : null;
  const hasDiff = !!doc?.info && (
    doc.info.summary.add + doc.info.summary.modify + doc.info.summary.remove +
    doc.info.summary.edgeAdd + doc.info.summary.edgeRemove > 0
  );

  const totalW = layout ? layout.width + PAD * 2 : 0;
  const totalH = layout ? layout.height + BAND_H + PAD * 2 : 0;
  const autoS = useMemo(() => {
    if (!fit || !box.w) return 1;
    return Math.min(1, (box.w - 2) / totalW, (box.h - 2) / totalH);
  }, [fit, box, totalW, totalH]);
  const s = zoom ?? autoS;
  const stepZoom = (k: number) => setZoom(Math.max(0.3, Math.min(2, (zoom ?? autoS) * k)));

  const noOf = useMemo(() => {
    const m = new Map<string, string>();
    layout?.nodes.slice().sort((a, b) => a.col - b.col || a.y - b.y).forEach((n, i) => m.set(n.node.id, String(i + 1).padStart(2, "0")));
    return m;
  }, [layout]);

  if (missing) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-paper">
        <p className="text-[15px] text-ink-700">网络数据还没生成</p>
        <a href="#/chain" className="border border-ink-900 px-4 py-2 text-[14px]">回到产业链</a>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paper">
      <header className="relative z-30 flex h-16 shrink-0 items-center gap-3 border-b border-rule px-8">
        <a href="#/" aria-label="返回阅读器" title="返回阅读器"
          className="flex h-9 w-9 items-center justify-center border border-rule-strong text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900">
          <ArrowLeft size={15} strokeWidth={1.8} />
        </a>
        <h1 className="text-[15px] font-medium">通用探测器网络</h1>
        <span className="font-mono text-[10px] tracking-[0.14em] text-ink-300">DETECTOR NETWORK</span>
        <select
          value={netKey}
          onChange={(e) => {
            const k = e.target.value;
            setNetKey(k); setFocus(null); setSideOpen(false);
            const u = new URL(window.location.href);
            u.searchParams.set("net", k);
            window.history.replaceState(null, "", u.toString());
          }}
          className="h-9 shrink-0 border border-rule-strong bg-paper px-2 text-[12px] text-ink-900 outline-none hover:border-ink-900"
          title="切换标的：同一张通用网＋各自的差异清单。紫框＝新增节点，角标「改」＝被实例化的节点"
        >
          {nets.length === 0 && <option value="meta">Meta · 广告 / AI 平台（基准）</option>}
          {nets.map((n) => <option key={n.key} value={n.key}>{n.title}</option>)}
        </select>
        <div className="ml-auto flex items-center gap-4 font-mono text-[12px] text-ink-500">
          <span className="tnum">{doc?.nodes.length ?? 0} 节点</span>
          <span className="tnum">{doc?.edges.length ?? 0} 边</span>
          <span className="text-[11px] text-ink-400">{layout ? `${layout.cols} 层 · 起点 → 终点` : ""}</span>
          <button onClick={() => setDiffOnly((v) => !v)}
            className={`flex h-9 items-center border px-2.5 text-[12px] transition-colors ${diffOnly ? "border-ink-900 text-ink-900" : "border-rule-strong text-ink-700 hover:border-ink-900"}`}
            title="把相对通用网新增/改动的节点高亮（淡紫底＋紫左条），其余压暗；点节点可在右侧看逐字段对比">
            差异高亮：{diffOnly ? "开" : "关"}
          </button>
          <button onClick={() => setShowAll((v) => !v)}
            className={`flex h-9 items-center border px-2.5 text-[12px] transition-colors ${showAll ? "border-ink-900 text-ink-900" : "border-rule-strong text-ink-700 hover:border-ink-900"}`}
            title="显示跨层直交边与横向交互边（默认折叠，避免交错）">
            {showAll ? "全部连线：开" : "全部连线：关"}
          </button>
          <button onClick={() => setShowForage((v) => !v)}
            className={`flex h-9 items-center border px-2.5 text-[12px] transition-colors ${showForage ? "border-ink-900 text-ink-900" : "border-rule-strong text-ink-700 hover:border-ink-900"}`}
            title="觅食边＝探测器向 7 大类 34 型材料找信息的关系，只登记、不参与推导；开启后起点列左侧出现点线总线">
            觅食边：{showForage ? "开" : "关"}
          </button>
          <div className="flex h-9 items-stretch border border-rule-strong">
            <button onClick={() => stepZoom(1 / 1.2)} title="缩小 1/1.2"
              className="w-8 text-[14px] text-ink-700 transition-colors hover:bg-surface hover:text-ink-900">－</button>
            <span className="tnum flex w-[54px] items-center justify-center border-x border-rule-strong text-[11.5px] text-ink-900">{Math.round(s * 100)}%</span>
            <button onClick={() => stepZoom(1.2)} title="放大 1.2 倍"
              className="w-8 text-[14px] text-ink-700 transition-colors hover:bg-surface hover:text-ink-900">＋</button>
          </div>
          <button onClick={() => { setFit(false); setZoom(1); }}
            className="flex h-9 items-center border border-rule-strong px-2.5 text-[12px] text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
            title="回到 100% 原尺寸（可拖动滚动）">
            100%
          </button>
          <button onClick={() => { setFit(true); setZoom(null); }}
            className="flex h-9 items-center border border-rule-strong px-2.5 text-[12px] text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
            title="按画布尺寸自动缩到一屏看全貌">
            适应一屏
          </button>
          <button onClick={() => setSideOpen((v) => !v)}
            className={`flex h-9 items-center border px-2.5 text-[12px] transition-colors ${sideOpen ? "border-ink-900 text-ink-900" : "border-rule-strong text-ink-700 hover:border-ink-900"}`}
            title="收起/展开右侧详情栏；点节点会自动展开">
            {sideOpen ? "收起详情" : "详情"}
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <div ref={boxRef} className="min-h-0 flex-1 overflow-auto"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("[data-node]")) return;
            setFocus(null);
          }}>
          {layout && (
            <div className="mx-auto" style={{ width: totalW * s, height: totalH * s, marginTop: Math.max(0, (box.h - totalH * s) / 2) }}>
              <div className="relative origin-top-left" style={{ width: totalW, height: totalH, transform: `scale(${s})` }}>
                {/* 三等分标尺：一把尺子，不是列分组（照抄产业链页） */}
                {BANDS.map((b, i) => (
                  <div key={b.zh} className="absolute" style={{ left: PAD + (layout.width * i) / 3, top: PAD, width: layout.width / 3 }}>
                    <div className="h-[2px] bg-rule-strong" />
                    <div className="mt-2 flex items-baseline justify-center gap-2">
                      <span className="text-[13px] font-medium text-ink-500">{b.zh}</span>
                      <span className="font-mono text-[9.5px] tracking-[0.16em] text-ink-300">{b.en}</span>
                    </div>
                  </div>
                ))}
                {[1, 2].map((i) => (
                  <div key={i} className="absolute w-px bg-rule-strong" style={{ left: PAD + (layout.width * i) / 3, top: PAD, height: 24 }} />
                ))}
                {layout.columns.map((c) => (
                  <div key={c.col} className="absolute" style={{ left: c.x, top: PAD + 33, width: c.w }}>
                    <span className="font-mono text-[10.5px] tracking-[0.14em] text-ink-300">L{c.col + 1} · {c.zh}</span>
                  </div>
                ))}

                {/* 连线：每条独立通道；折叠边按需显示；hover 出标签 */}
                <svg className="pointer-events-auto absolute" style={{ left: 0, top: BAND_H }}
                  width={layout.width + PAD * 2} height={layout.height + PAD * 2} aria-hidden>
                  <defs>
                    <marker id="dn-ar" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                      <path d="M 0 0 L 8 4 L 0 8" fill="none" stroke="#b9b6ac" strokeWidth="1.3" />
                    </marker>
                    <marker id="dn-ar-hot" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                      <path d="M 0 0 L 8 4 L 0 8" fill="none" stroke="#101010" strokeWidth="1.3" />
                    </marker>
                  </defs>
                  {layout.edges.map((e, i) => {
                    const visible = e.folded ? (showAll || !!trace && (trace.all.has(e.from) && trace.all.has(e.to))) : true;
                    if (!visible) return null;
                    const hot = !!trace && trace.all.has(e.from) && trace.all.has(e.to);
                    const dim = !!trace && !(trace.all.has(e.from) && trace.all.has(e.to));
                    return (
                      <g key={i} onMouseEnter={() => setHoverEdge(i)} onMouseLeave={() => setHoverEdge(null)}>
                        <path d={e.path} fill="none" stroke={hot ? "#101010" : "#b3afa4"}
                          strokeWidth={hot ? 1.8 : 1.1} strokeDasharray={e.edge.type === "cross" || e.edge.type === "reg" ? "4 3" : undefined}
                          markerEnd={hot ? "url(#dn-ar-hot)" : "url(#dn-ar)"}
                          style={{ opacity: dim ? 0.1 : 1, cursor: "pointer", transition: "opacity 200ms" }} />
                        <path d={e.path} fill="none" stroke="transparent" strokeWidth={12} style={{ pointerEvents: "stroke" }} />
                        {hoverEdge === i && (() => {
                          const m = /M ([\d.]+) ([\d.]+)/.exec(e.path);
                          return <text x={Number(m?.[1] ?? 0) + 26} y={Number(m?.[2] ?? 0) - 8}
                            className="font-mono" fontSize="10" fill="#101010" style={{ paintOrder: "stroke", stroke: "#ffffff", strokeWidth: 4 }}>
                            {e.edge.label}
                          </text>;
                        })()}
                      </g>
                    );
                  })}
                  {/* 觅食边：起点探测器 → 养分面（承载）。总线紧贴起点列左侧，
                      开关一开就在视野内；它不是推导链的边，不参与上交/聚合。 */}
                  {showForage && (() => {
                    const starts = layout.nodes.filter((p) => p.node.layer === "start");
                    if (!starts.length) return null;
                    const busX = PAD - 17;
                    const ys = starts.map((p) => p.y + p.h / 2);
                    const y1 = Math.min(...ys), y2 = Math.max(...ys);
                    return (
                      <g>
                        <path d={`M ${busX} ${y1} L ${busX} ${y2}`} fill="none" stroke="#5f5e5a" strokeWidth="1.2" strokeDasharray="2 4" />
                        {starts.map((p) => (
                          <g key={p.node.id}>
                            <path d={`M ${busX} ${p.y + p.h / 2} L ${p.x} ${p.y + p.h / 2}`} fill="none" stroke="#5f5e5a" strokeWidth="1.1" strokeDasharray="2 4" />
                            <circle cx={busX} cy={p.y + p.h / 2} r="2.4" fill="#5f5e5a" />
                            <circle cx={p.x} cy={p.y + p.h / 2} r="2" fill="#5f5e5a" />
                          </g>
                        ))}
                      </g>
                    );
                  })()}
                </svg>

                {/* 卡片 */}
                {layout.nodes.map((p) => {
                  const n = p.node;
                  const on = !trace || trace.all.has(n.id);
                  const sel = n.id === focus;
                  const isDiff = !!(n.added || n.modified);
                  const dimByDiff = diffOnly && hasDiff && !isDiff;
                  const shadow = "0 2px 3px -1px rgba(24,24,27,.07), 0 12px 22px -16px rgba(24,24,27,.30)";
                  return (
                    <div key={n.id} data-node className="absolute transition-opacity duration-200"
                      style={{ left: p.x, top: PAD + BAND_H + p.y - PAD, width: p.w, height: p.h,
                        opacity: trace ? (on ? 1 : 0.35) : (dimByDiff ? 0.42 : 1),
                        background: isDiff ? "linear-gradient(180deg,#faf7ff 0%,#f1ecfb 100%)" : "linear-gradient(180deg,#ffffff 0%,#fcfbf9 100%)",
                        border: sel ? "2px solid #101010" : n.added ? "2px solid #534AB7" : n.modified ? "1.5px solid #9270CA" : `1px solid ${n.pub ? "#b9b6ac" : "#d5d2c9"}`,
                        borderRadius: 10, boxShadow: isDiff ? `inset 3px 0 0 #534AB7, ${shadow}` : shadow,
                        cursor: "pointer", overflow: "hidden" }}
                      onClick={() => { if (sel) setFocus(null); else { setFocus(n.id); setSideOpen(true); } }}
                      title={n.label.replace(/\n/g, " ")}>
                      <div className="flex items-center gap-2 px-3 pt-2">
                        <span className="tnum font-mono text-[10.5px] leading-none text-ink-300">{noOf.get(n.id) ?? "--"}</span>
                        <span className="font-mono text-[9px] leading-none tracking-[0.12em] text-ink-300">L{p.col + 1}</span>
                        <span className="h-px flex-1 bg-rule" />
                        {n.pub && <span className="font-mono text-[9px] text-ink-400">公共</span>}
                        {n.v2 && <span className="font-mono text-[9px] text-ink-400">v2</span>}
                        {n.reg && <span className="font-mono text-[9px] text-ink-400">调节</span>}
                        {n.added && <span className="rounded-sm bg-[#534AB7] px-1 py-[2px] font-mono text-[9.5px] leading-none text-white">加</span>}
                        {n.modified && <span className="rounded-sm bg-[#E4D9F8] px-1 py-[2px] font-mono text-[9.5px] leading-none text-[#3C2A80]">改</span>}
                      </div>
                      <div className="px-3 pt-1.5">
                        <p className="truncate text-[13px] font-medium leading-[1.3] text-ink-900">{n.label.replace(/\n/g, " · ")}</p>
                        <p className="mt-1 truncate text-[11px] leading-[1.4] text-ink-500">{n.collect}</p>
                        {p.h > 88 && <p className="mt-0.5 truncate text-[10.5px] leading-[1.4] text-ink-400">上交 · {n.to}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 右侧详情：默认收起，画布占满宽度；点节点自动展开，顶栏可开关 */}
        {sideOpen && (
        <aside className="w-[340px] shrink-0 overflow-y-auto border-l border-rule bg-surface">
          {focused && doc && layout ? (
            <div className="p-6">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-400">
                    节点 · L{(layout.nodes.find((p) => p.node.id === focused.id)?.col ?? 0) + 1}
                  </p>
                  <h3 className="mt-1.5 text-[18px] leading-tight font-medium text-ink-900">{focused.label.replace(/\n/g, " · ")}</h3>
                </div>
                <button onClick={() => { setFocus(null); setSideOpen(false); }} aria-label="关闭"
                  className="shrink-0 border border-rule-strong p-1.5 text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900">
                  <X size={13} strokeWidth={2} />
                </button>
              </div>
              {(focused.added || focused.modified) && (
                <div className="mt-4 flex items-center gap-2 border border-[#9270CA] bg-[#F3EFFB] px-3 py-2">
                  <span className="rounded-sm bg-[#534AB7] px-1 py-[2px] font-mono text-[9.5px] leading-none text-white">
                    {focused.added ? "加" : "改"}
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.08em] text-[#3C2A80]">
                    {focused.added ? "通用网无此项 · 本产业链新增" : "相对通用网已实例化 · 逐字段对比见下方"}
                  </span>
                </div>
              )}
              <dl>
                <Row k="聚合" v={focused.agg} />
                <Row k="收集" v={focused.collect} />
                <Row k="觅食面" v={focused.forage} />
                <Row k="上交" v={focused.to} />
                <Row k="全链" v={`上游 ${trace?.ups.size ?? 0} 节点 / 下游 ${trace?.downs.size ?? 0} 节点`} />
                <Row k="直接上游"
                  v={doc.edges.filter((e) => e.to === focused.id && e.type !== "forage").map((e) => `${e.from}（${e.label}）`).join("\n") || "—"} />
                <Row k="直接下游"
                  v={doc.edges.filter((e) => e.from === focused.id && e.type !== "forage").map((e) => `${e.to}（${e.label}）`).join("\n") || "—"} />
              </dl>
              {(focused.added || focused.modified) && (
                <div className="mt-5 border-t border-rule pt-3">
                  <p className="font-mono text-[10.5px] tracking-[0.12em] text-[#3C2A80]">
                    与通用网对比 · {focused.added ? "新增节点" : "实例化改动"}
                  </p>
                  {focused.added ? (
                    <p className="mt-2 text-[12px] leading-[1.7] text-ink-700">
                      通用网没有这个探测器；本产业链实例化时新增，落在起点层（只收集、不聚合）。
                    </p>
                  ) : (
                    (["label", "collect", "to"] as const).map((k) => {
                      const b = baseDoc?.nodes.find((x) => x.id === focused.id);
                      if (!b || b[k] === focused[k]) return null;
                      const zh = k === "label" ? "名称" : k === "collect" ? "收集" : "上交";
                      return (
                        <div key={k} className="mt-2">
                          <p className="text-[11px] leading-[1.6] text-ink-400">通用 · {zh}：{b[k].replace(/\n/g, " · ")}</p>
                          <p className="text-[12px] leading-[1.65] text-ink-900">本网 · {zh}：{focused[k].replace(/\n/g, " · ")}</p>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
              <p className="mt-5 border-t border-rule pt-3 text-[12px] leading-[1.7] text-ink-400">
                图里提亮的是它到起点、到终点的完整通路，其余压暗。「全部连线」可展开跨层直交边（默认折叠以避免交错），悬停连线看机制标签。
              </p>
            </div>
          ) : (
            <div className="p-6">
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-400">DETECTOR NETWORK</p>
              <h3 className="mt-1.5 text-[18px] leading-tight font-medium text-ink-900">通用探测器网络</h3>
              <p className="mt-3 text-[12.5px] leading-[1.85] text-ink-500">
                起点＝只收集的最低级探测器，终点＝价值判断。七大类 34 型材料是养分的承载面，不是网络的一层。
                点任意节点，看它到起点、到终点的完整通路与四字段。
              </p>
              <dl>
                <Row k="规模" v={`${doc?.nodes.length ?? 0} 节点 / ${doc?.edges.length ?? 0} 边 / ${layout?.cols ?? 5} 列`} />
                {doc?.info && (
                  <Row k="本网" v={`${doc.info.title}\n产业链：${doc.info.chain}\n位置：${doc.info.position}\n\n${doc.info.note}`} />
                )}
                {doc?.info && (
                  <Row k="差异" v={`改 ${doc.info.summary.modify} 节点 / 加 ${doc.info.summary.add} 节点 / 删 ${doc.info.summary.remove} 节点；边 +${doc.info.summary.edgeAdd} / -${doc.info.summary.edgeRemove}\n依据：${doc.info.source}`} />
                )}
                <Row k="列序" v={"L1 起点 · 信息采集\nL2 驱动族\nL3 盈利因子\nL4 估值层\nL5 价值判断"} />
                <Row k="线型" v={"灰实线＝上交（收集＋聚合）\n虚线＝横向交互 / 可信度调节\n点线＝觅食（可开关）"} />
                <Row k="操作" v={"悬停连线看机制标签\n「全部连线」展开跨层直交边\n「适应一屏」看全貌\n点空白 / Esc 清除高亮"} />
              </dl>
              <p className="mt-5 border-t border-rule pt-3 text-[12px] leading-[1.7] text-ink-400">
                默认原尺寸，画布可拖动；列间留白是通道，用来让每条边各走各的路、互不交错。
              </p>
            </div>
          )}
        </aside>
        )}
      </div>

      <footer className="flex h-12 shrink-0 items-center gap-6 border-t border-rule bg-surface px-8">
        <span className="max-w-[1100px] truncate text-[12.5px] text-ink-500">
          {showForage
            ? "觅食边＝起点探测器向 7 大类 34 型材料「找信息」的关系：只登记去哪找，不参与上交与聚合；左侧点线总线＝养分面（承载，不是网络的一层）。"
            : "同级别同列；列间距按信息密度等差递减；每条边走独立正交通道；跨层边可展开；养分面（34 型材料）是承载，不是网络一层。"}
        </span>
        <span className="ml-auto shrink-0 font-mono text-[12px] text-ink-400">点节点看全链通路 · 点空白返回 · Esc 关闭</span>
      </footer>
    </div>
  );
}

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex gap-3 border-t border-rule pt-2.5 mt-3">
    <dt className="m-0 w-[68px] shrink-0 font-mono text-[10.5px] tracking-[0.1em] text-ink-400">{k}</dt>
    <dd className="m-0 whitespace-pre-wrap text-[12.5px] leading-[1.6] text-ink-900">{v}</dd>
  </div>
);

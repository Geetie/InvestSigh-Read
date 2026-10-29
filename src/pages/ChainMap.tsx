import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ChevronDown, Maximize2, Minimize2, X } from "lucide-react";
import {
  isListed,
  loadChain,
  loadChainIndex,
  type ChainCompany,
  type ChainDoc,
  type ChainMeta,
} from "../lib/chain";
import { BAND_H, BANDS, COL_W, edgePath, layoutChain } from "../lib/chainLayout";
import { ChainNode } from "../components/ChainNode";

/**
 * 产业链页：dagre 横向分层 DAG（上游在左 → 终端在右）+ 白纸风格。
 *
 * 为什么横着放：产业链本身就是「谁供给谁」的单向流，横向排布天然给出阅读方向，
 * 顶部还能挂一条「上游 / 中游 / 下游」的连续标尺。竖排会把 7 个层级拉成
 * 3000px 的长条，读者永远看不到全貌。
 *
 * 借的是 neural-creator-dashboard 的**交互模型**（点节点 → 侧栏详情、选中提亮），
 * 不借它的皮肤（暗底发光）—— 那是「创作图谱」的氛围，不是产业链的表达。
 *
 * 产业链真正的信息在「上下游」：选中一个环节时，把它的**全部**上游祖先、
 * 全部下游子孙以及它们之间的连线一起提亮，其余压暗。这条从源头到终端的
 * 通路，比任何视觉特效都更能说明结构。
 */

const PAD = 32;

export function ChainMap({ chainId }: { chainId: string }) {
  const [doc, setDoc] = useState<ChainDoc | null>(null);
  const [missing, setMissing] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);
  const [chains, setChains] = useState<ChainMeta[]>([]);
  const [switchOpen, setSwitchOpen] = useState(false);
  /* 默认「适应宽度」：7 层链在 1760 屏上放不下，先给全貌，再让人选择看原尺寸 */
  const [fit, setFit] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const switchRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    loadChainIndex().then(setChains);
  }, []);

  /* 点空白处关掉产业链下拉 */
  useEffect(() => {
    if (!switchOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!switchRef.current?.contains(e.target as Node)) setSwitchOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [switchOpen]);

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
    loadChain(chainId).then((d) => {
      if (!d) setMissing(true);
      setDoc(d);
    });
  }, [chainId]);

  const layout = useMemo(() => (doc ? layoutChain(doc) : null), [doc]);

  /* 环节编号：按「先列后纵向位置」排，和视觉顺序一致 */
  const noOf = useMemo(() => {
    const m = new Map<string, string>();
    if (!layout) return m;
    [...layout.nodes]
      .sort((a, b) => a.col - b.col || a.y - b.y)
      .forEach((n, i) => m.set(n.seg.id, String(i + 1).padStart(2, "0")));
    return m;
  }, [layout]);

  /* 选中环节的完整上下游闭包 —— 这是产业链的关键读数 */
  const trace = useMemo(() => {
    if (!doc || !focus) return null;
    const ups = new Set<string>();
    const downs = new Set<string>();
    const stack = [focus];
    while (stack.length) {
      const id = stack.pop()!;
      for (const s of doc.segments) {
        if ((s.feeds ?? []).includes(id) && s.id !== focus && !ups.has(s.id)) {
          ups.add(s.id);
          stack.push(s.id);
        }
      }
    }
    stack.push(focus);
    while (stack.length) {
      const id = stack.pop()!;
      for (const t of doc.segments.find((s) => s.id === id)?.feeds ?? []) {
        if (t !== focus && !downs.has(t)) {
          downs.add(t);
          stack.push(t);
        }
      }
    }
    return { ups, downs, all: new Set<string>([focus, ...ups, ...downs]) };
  }, [doc, focus]);

  const segOf = (id: string) => doc?.segments.find((s) => s.id === id);
  const focusedSeg = focus ? segOf(focus) : null;
  const ups = doc && focus ? doc.segments.filter((s) => (s.feeds ?? []).includes(focus)) : [];
  const downs = focusedSeg ? (focusedSeg.feeds ?? []).map((id) => segOf(id)).filter(Boolean) : [];
  const open = !!focus;

  const totalW = layout ? layout.width + PAD * 2 : 0;
  const totalH = layout ? layout.height + BAND_H + PAD * 2 : 0;
  /* 缩放比：fit 时同时受宽高约束，最多 1（不放大） */
  const s = useMemo(() => {
    if (!fit || !box.w) return 1;
    return Math.min(1, (box.w - 2) / totalW, (box.h - 2) / totalH);
  }, [fit, box, totalW, totalH]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (switchOpen) {
        setSwitchOpen(false);
        e.stopPropagation();
      } else if (focus) {
        setFocus(null);
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [switchOpen, focus]);

  /* 侧栏一开，图的可视宽度就变窄；把选中的环节滚进视野，
     否则最右一列会被裁在侧栏边上，看着像坏了 */
  useEffect(() => {
    if (!focus) return;
    const el = boxRef.current?.querySelector(`[data-seg="${focus}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [focus, open]);

  if (missing) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-paper">
        <p className="text-[15px] text-ink-700">这条链还没有数据</p>
        <a href="#/chain" className="border border-ink-900 px-4 py-2 text-[14px]">
          回到产业链
        </a>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paper">
      <header className="relative z-30 flex h-16 shrink-0 items-center gap-3 border-b border-rule px-8">
        {/* 返回：只留图标，样式与其他图标按钮统一（方框 + 墨线悬停） */}
        <a
          href="#/chain"
          aria-label="返回产业链选择"
          title="返回产业链选择"
          className="flex h-9 w-9 items-center justify-center border border-rule-strong text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
        >
          <ArrowLeft size={15} strokeWidth={1.8} />
        </a>

        {/* 产业链本身也可切换：三条链是平级的三个视图，不该只能从上一层进来 */}
        <div ref={switchRef} className="relative">
          <button
            onClick={() => setSwitchOpen((v) => !v)}
            className={`flex h-9 items-center gap-2 border px-3 text-[14px] transition-colors ${
              switchOpen ? "border-ink-900 text-ink-900" : "border-rule-strong text-ink-900 hover:border-ink-900"
            }`}
            aria-expanded={switchOpen}
          >
            <span className="max-w-[180px] truncate font-medium">{doc?.name ?? "载入中"}</span>
            <ChevronDown
              size={14}
              strokeWidth={1.9}
              className={`shrink-0 text-ink-400 transition-transform duration-200 ${switchOpen ? "rotate-180" : ""}`}
            />
          </button>
          {switchOpen && (
            <div className="absolute top-full left-0 mt-1 w-[372px] border border-ink-900 bg-paper">
              {chains.map((c) => {
                const cur = c.id === chainId;
                return (
                  <a
                    key={c.id}
                    href={`#/chain/${c.id}`}
                    onClick={() => setSwitchOpen(false)}
                    className={`flex items-baseline gap-2.5 border-b border-rule px-3 py-2.5 whitespace-nowrap last:border-b-0 transition-colors ${
                      cur ? "bg-surface-2" : "hover:bg-surface"
                    }`}
                  >
                    <span className={`text-[14px] ${cur ? "font-medium text-ink-900" : "text-ink-700"}`}>{c.name}</span>
                    <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-ink-300">{c.en}</span>
                    <span className="tnum ml-auto shrink-0 font-mono text-[11px] text-ink-400">
                      {c.segments} 环节 · {c.companies} 家
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-5 font-mono text-[14px] text-ink-500">
          <span className="tnum">{doc?.segments.length ?? 0} 环节</span>
          <span className="tnum">{doc?.companies.length ?? 0} 家公司</span>
          <span className="text-[12px] text-ink-400">{layout ? `${layout.cols} 层 · 上游 → 下游` : ""}</span>
          <button
            onClick={() => setFit((v) => !v)}
            className="flex h-9 items-center gap-1.5 border border-rule-strong px-2.5 text-[12px] text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
            title={fit ? "按原尺寸看（可滚动）" : "缩到一屏看全"}
          >
            {fit ? <Maximize2 size={12} strokeWidth={1.9} /> : <Minimize2 size={12} strokeWidth={1.9} />}
            {fit ? "适应一屏" : "原尺寸"}
            <span className="tnum text-ink-300">{Math.round(s * 100)}%</span>
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* 图 */}
        <div
          ref={boxRef}
          className="min-h-0 flex-1 overflow-auto"
          /* 点空白处回到初始状态：画布上除了卡片没有别的东西，点了就该退回来 */
          onClick={(e) => {
            if ((e.target as HTMLElement).closest(".magic-bento__card")) return;
            setFocus(null);
          }}
        >
          {layout ? (
            <div
              className="mx-auto"
              style={{
                width: totalW * s,
                height: totalH * s,
                /* 比容器矮时竖向居中，别把整张图贴在顶边 */
                marginTop: Math.max(0, (box.h - totalH * s) / 2),
              }}
            >
              <div
                className="relative origin-top-left"
                style={{ width: totalW, height: totalH, transform: `scale(${s})` }}
              >
              {/* 顶部标尺：上游 / 中游 / 下游，三等分 —— 是一把尺子，不是列分组 */}
              {layout.bands.map((b) => {
                const meta = BANDS.find((x) => x.key === b.band)!;
                const sel = trace && layout.nodes.some((n) => n.band === b.band && trace.all.has(n.seg.id));
                return (
                  <div key={b.band} className="absolute" style={{ left: PAD + b.x, top: PAD, width: b.w }}>
                    <div className={`h-[2px] transition-colors ${sel ? "bg-ink-900" : "bg-rule-strong"}`} />
                    <div className="mt-2 flex items-baseline justify-center gap-2">
                      <span className={`text-[13px] font-medium ${sel ? "text-ink-900" : "text-ink-500"}`}>{meta.zh}</span>
                      <span className="font-mono text-[9.5px] tracking-[0.16em] text-ink-300">{meta.en}</span>
                    </div>
                  </div>
                );
              })}
              {/* 三等分的两道界标（只落在标尺上，不贯穿图面） */}
              {[1, 2].map((i) => (
                <div
                  key={`tick-${i}`}
                  className="absolute w-px bg-rule-strong"
                  style={{ left: PAD + (layout.width * i) / 3, top: PAD, height: 24 }}
                  aria-hidden
                />
              ))}

              {/* 列号 */}
              {layout.columns.map((c) => (
                <div key={c.col} className="absolute" style={{ left: PAD + c.x, top: PAD + 33, width: COL_W }}>
                  <span className="font-mono text-[10.5px] tracking-[0.14em] text-ink-300">L{c.col + 1}</span>
                </div>
              ))}

              {/* 连线（正交圆角，供给方向 = 向右） */}
              <svg
                className="pointer-events-none absolute"
                style={{ left: PAD, top: PAD + BAND_H }}
                width={layout.width}
                height={layout.height}
                aria-hidden
              >
                <defs>
                  <marker id="ar-dark" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                    <path d="M 0 0 L 8 4 L 0 8" fill="none" stroke="#101010" strokeWidth="1.3" />
                  </marker>
                  <marker id="ar-gray" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 8 4 L 0 8" fill="none" stroke="#b9b6ac" strokeWidth="1.3" />
                  </marker>
                </defs>
                {layout.edges.map((e, i) => {
                  const a = e.from.seg.id;
                  const b = e.to.seg.id;
                  const inside = !trace || (trace.all.has(a) && trace.all.has(b));
                  const hot = !!trace && (trace.all.has(a) && trace.all.has(b)) && isSpine(a, b, focus, trace);
                  return (
                    <path
                      key={i}
                      d={edgePath(e)}
                      fill="none"
                      stroke={hot ? "#101010" : "#b3afa4"}
                      strokeWidth={hot ? 1.8 : 1.1}
                      markerEnd={hot ? "url(#ar-dark)" : "url(#ar-gray)"}
                      style={{ opacity: inside ? 1 : 0.1, transition: "opacity 200ms" }}
                    />
                  );
                })}
              </svg>

              {/* 环节卡片：MagicBento 单卡壳（见 ChainNode） */}
              {layout.nodes.map((n) => {
                const on = !trace || trace.all.has(n.seg.id);
                const sel = n.seg.id === focus;
                return (
                  <div
                    key={n.seg.id}
                    data-seg={n.seg.id}
                    className="absolute transition-opacity duration-200"
                    style={{
                      left: PAD + n.x,
                      top: PAD + BAND_H + n.y,
                      width: n.w,
                      height: n.h,
                      opacity: on ? 1 : 0.4,
                    }}
                  >
                    <ChainNode
                      seg={n.seg}
                      no={noOf.get(n.seg.id) ?? "—"}
                      col={n.col}
                      height={n.h}
                      companies={n.companies}
                      selected={sel}
                      onFocus={() => setFocus(sel ? null : n.seg.id)}
                      /* 点票不弹详情，直接进阅读链路（七类材料 → 时分矩阵 → 详情） */
                      onPickCo={(c) => {
                        if (!isListed(c)) return;
                        window.location.href = `/?ticker=${encodeURIComponent(c.ticker)}&chain=${encodeURIComponent(
                          chainId,
                        )}&cat=05&sub=chain-tracking`;
                      }}
                    />
                  </div>
                );
              })}
              </div>
            </div>
          ) : (
            <p className="p-8 text-[14px] text-ink-400">载入中…</p>
          )}
        </div>

        {/* 右侧详情：只讲环节。标的点一下就进材料层，不在这里再开一层 */}
        {open && focusedSeg && (
          <aside className="w-[340px] shrink-0 overflow-y-auto border-l border-rule bg-surface">
            <div className="p-6">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-400">
                    环节 · L{(layout?.nodes.find((n) => n.seg.id === focusedSeg.id)?.col ?? 0) + 1}
                  </p>
                  <h3 className="mt-1.5 text-[20px] leading-tight font-medium text-ink-900">{focusedSeg.name}</h3>
                </div>
                <button
                  onClick={() => setFocus(null)}
                  className="shrink-0 border border-rule-strong p-1.5 text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900"
                  aria-label="关闭"
                >
                  <X size={13} strokeWidth={2} />
                </button>
              </div>
              <p className="mt-2 text-[13px] leading-[1.6] text-ink-700">{focusedSeg.gloss}</p>

              <dl className="mt-5 space-y-3">
                <Row k="产出" v={focusedSeg.output} />
                <Row k="直接上游" v={ups.length ? ups.map((s) => s.name).join("、") : "源头环节"} />
                <Row k="直接下游" v={downs.length ? downs.map((s) => s?.name ?? "").join("、") : "终端环节"} />
                <Row k="全链" v={`上游 ${trace?.ups.size ?? 0} 环 / 下游 ${trace?.downs.size ?? 0} 环`} />
                <Row k="本环节" v={`${doc?.companies.filter((c) => c.segment === focusedSeg.id).length ?? 0} 家公司`} />
              </dl>

              <p className="mt-5 border-t border-rule pt-3 text-[12px] leading-[1.7] text-ink-400">
                图里提亮的是它到源头、到终端的完整通路，其余压暗。点环节里的票，直接进七类材料。
              </p>
            </div>
          </aside>
        )}
      </div>

      <footer className="flex h-12 shrink-0 items-center gap-6 border-t border-rule bg-surface px-8">
        <span className="max-w-[900px] truncate text-[12.5px] text-ink-500">{doc?.note}</span>
        <span className="ml-auto shrink-0 font-mono text-[12px] text-ink-400">
          点卡片看全链通路 · 点票进材料 · 点空白返回
        </span>
      </footer>
    </div>
  );
}

/** 边是否落在「选中环节 → 源头 / 终端」的主通路上 */
function isSpine(
  a: string,
  b: string,
  focus: string | null,
  trace: { ups: Set<string>; downs: Set<string> },
): boolean {
  if (!focus) return false;
  const fromOk = a === focus || trace.ups.has(a);
  const toOk = b === focus || trace.downs.has(b);
  return fromOk && toOk;
}

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex gap-3 border-t border-rule pt-2.5">
    <dt className="m-0 w-[68px] shrink-0 font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-400">{k}</dt>
    <dd className="m-0 text-[12.5px] leading-[1.6] text-ink-900">{v}</dd>
  </div>
);

import { useEffect, useMemo, useState } from "react";
import type { Material } from "../lib/types";
import { catInk } from "../lib/palette";
import { shortDay } from "../lib/data";

/**
 * 配套件浮层：悬停主卡时从卡右缘浮现的竖向大板。
 *
 * 尺寸纪律：宽度固定；高度只比列轴（串起时间轴卡片的竖线）短一点点——
 * 上下各让 6px；垂直位置固定对齐列轴（不跟卡片走）。
 * 外框宽高固定，内部格子随数量伸缩（3 列，行数 = ceil(N/3)，格子等分高度）。
 * 格子视觉词汇与主卡同源（白纸 + 1px 灰线 + 左缘类属墨色 + mono 元信息 + 格点阵）；
 * 出现动画用全站同一条贝塞尔（180ms，右移 6px 入场），无弹跳无发光。
 */

const COLS = 3;
const PANEL_W = 480;
const AXIS_TOP = 46; /* StageDay 列轴的顶（与列轴同源） */
const AXIS_BOTTOM = 38; /* 列轴的底（地平线） */
const INSET = 6; /* 比竖线短一些些：上下各让 6px */

export function CompanionPanel({
  anchor,
  material,
  byId,
  stageRef,
  onOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  anchor: DOMRect;
  material: Material;
  byId: Map<string, Material>;
  /** StageDay 滚动容器 —— 列轴的几何基准（取它的视口矩形） */
  stageRef: React.RefObject<HTMLDivElement | null>;
  onOpen: (m: Material) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const c = material.companions;
  const [shown, setShown] = useState(false);
  useEffect(() => {
    /* 下一帧再置位：让 opacity/translate 过渡生效 */
    const t = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const cells = useMemo(() => {
    if (!c) return [];
    const out: { key: string; mat?: Material; text?: string; note?: string }[] = [];
    for (const b of c.back) {
      const mat = byId.get(b.id);
      out.push({ key: `b-${b.id}`, mat, text: mat ? undefined : b.name, note: mat ? undefined : "同型跨期" });
    }
    for (const x of c.cross) {
      const mat = x.id ? byId.get(x.id) : undefined;
      if (mat) out.push({ key: `x-${x.id}`, mat });
      else out.push({ key: `x-${x.cat}-${x.note}`, text: x.note, note: `${x.cat} 类配套` });
    }
    for (const l of c.ledger) out.push({ key: `l-${l}`, text: l.replace(/^账本[:：]/, ""), note: "账本" });
    for (const e of c.external) out.push({ key: `e-${e}`, text: e.replace(/^外部[:：]/, ""), note: "外部" });
    return out;
  }, [c, byId]);

  if (!c || !cells.length || !stageRef.current) return null;

  /* 几何：对齐列轴，上下各让 INSET */
  const stage = stageRef.current.getBoundingClientRect();
  const top = stage.top + AXIS_TOP + INSET;
  const height = stage.height - AXIS_TOP - AXIS_BOTTOM - INSET * 2;
  const rows = Math.ceil(cells.length / COLS);

  /* 水平：贴卡右缘；视口右缘放不下翻到左侧 */
  const flip = anchor.right + PANEL_W + 8 > window.innerWidth;
  const left = flip ? anchor.left - PANEL_W - 2 : anchor.right + 2;

  return (
    <div
      className="companion-panel fixed z-40 flex flex-col bg-paper"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        left,
        top,
        width: PANEL_W,
        height,
        border: "1px solid var(--color-rule-strong)",
        boxShadow: "var(--shadow-hard)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateX(0)" : `translateX(${flip ? 6 : -6}px)`,
      }}
    >
      {/* 头部：极小的 mono 标签 */}
      <div className="flex shrink-0 items-baseline justify-between px-3 pt-2">
        <span className="label-xs">配套</span>
        <span className="font-mono text-[10.5px] tracking-[0.04em] text-ink-400 tnum">
          {cells.length} 件 · {rows} 行
        </span>
      </div>

      {/* 矩阵：3 列固定，格子随数量等分可用高度 */}
      <div
        className="grid min-h-0 flex-1 px-3 pb-2.5 pt-1.5"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gap: 8,
        }}
      >
        {cells.map((cell) => (
          <div key={cell.key} className="min-h-0">
            {cell.mat ? (
              <MiniCard m={cell.mat} onOpen={onOpen} />
            ) : (
              <TextCell text={cell.text ?? ""} note={cell.note ?? ""} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** 配套迷你卡：与主卡同一套词汇（1px 灰线、左缘类属墨色、mono 元信息、格点阵），填满格子随格伸缩 */
function MiniCard({ m, onOpen }: { m: Material; onOpen: (m: Material) => void }) {
  const ink = catInk(m.cat);
  const grid = m.grid ?? Array.from({ length: m.total }, (_, i) => (i < m.filled ? "1" : "0"));
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onOpen(m);
      }}
      className="card-hover relative flex h-full w-full flex-col overflow-hidden bg-paper text-left"
      style={{
        borderTop: "1px solid var(--color-rule-strong)",
        borderRight: "1px solid var(--color-rule-strong)",
        borderBottom: "1px solid var(--color-rule-strong)",
        borderLeft: `3px solid ${ink.ink}`,
      }}
      title={m.name}
    >
      <div className="flex min-h-0 flex-1 flex-col px-2 py-1.5">
        <div className="flex shrink-0 items-baseline gap-1 font-mono text-[10px] leading-none text-ink-500">
          <span className="tnum">{shortDay(m.date)}</span>
          <span className="ml-auto shrink-0 tnum text-ink-400">
            {m.filled}/{m.total}
          </span>
        </div>
        {/* 名称居中弹性伸缩：格子高多吃行数、矮时自动截断 */}
        <p className="my-1 line-clamp-3 min-h-0 flex-1 overflow-hidden text-[11.5px] leading-[1.45] text-ink-900">
          {m.name}
        </p>
        <div className="flex shrink-0 items-center gap-[2px]">
          {grid.slice(0, 12).map((g, i) => (
            <span
              key={i}
              className="block h-[2px] flex-1"
              style={{
                background: g === "1" ? "var(--color-ink-900)" : "transparent",
                boxShadow: g === "1" ? "none" : "inset 0 0 0 1px var(--color-rule)",
                maxWidth: 10,
              }}
            />
          ))}
          {grid.length > 12 && (
            <span className="shrink-0 font-mono text-[8.5px] leading-none text-ink-300">+{grid.length - 12}</span>
          )}
        </div>
      </div>
    </button>
  );
}

/** 非卡片格（跨类说明 / 账本 / 外部）：同框线、弱字，与迷你卡对齐 */
function TextCell({ text, note }: { text: string; note: string }) {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-paper px-2 py-1.5"
      style={{
        borderTop: "1px solid var(--color-rule)",
        borderRight: "1px solid var(--color-rule)",
        borderBottom: "1px solid var(--color-rule)",
        borderLeft: "3px solid var(--color-rule-strong)",
      }}
    >
      <span className="font-mono text-[9px] tracking-[0.06em] text-ink-400">{note}</span>
      <span className="line-clamp-3 text-[11px] leading-[1.4] text-ink-700">{text}</span>
    </div>
  );
}

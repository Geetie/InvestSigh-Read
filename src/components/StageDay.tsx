import { useEffect, useMemo, useRef, useState } from "react";
import type { Material } from "../lib/types";
import { shortDay, weekdayOf } from "../lib/data";
import { MaterialChip, type Density } from "./MaterialChip";
import { CompanionPanel } from "./CompanionPanel";

/**
 * 日粒度主体：一天一根 1px 轴线，材料作为档案卡悬在轴上。
 * 同一日的材料按时间自下而上排列，整簇垂直居中。
 * 轴线只承担「对齐」——空日浅灰、有料加深、当天变红，不做任何发光。
 */
export function StageDay({
  days,
  grouped,
  catId,
  spacing,
  focusDate,
  scrollX,
  onScroll,
  onPickDay,
  onOpenMaterial,
  allById,
  onOpenDetail,
}: {
  days: string[];
  grouped: Map<string, Material[]>;
  catId: string;
  spacing: number;
  focusDate: string;
  scrollX: number;
  onScroll: (x: number) => void;
  onPickDay: (d: string) => void;
  onOpenMaterial: (m: Material) => void;
  /** 全量材料索引（跨类配套卡在这里取） */
  allById: Map<string, Material>;
  /** 配套迷你卡点击 → 进那张卡的详情页 */
  onOpenDetail: (m: Material) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  /* ★ 2026-11-03 改：材料簇可用高度不再是「永远够」——单日 18 份时固定卡高
     总超出现场被 overflow-y-hidden 裁掉。现在量出现场高度，按当日份数均分
     卡高（下限 52px），仍放不下时列内滚动，一张都不丢。 */
  const [stageH, setStageH] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 900,
  );
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setStageH(el.clientHeight));
    ro.observe(el);
    setStageH(el.clientHeight);
    return () => ro.disconnect();
  }, []);

  const density: Density = spacing >= 172 ? "full" : spacing >= 128 ? "md" : "dense";
  const gap = density === "dense" ? 6 : 12;

  /* 单列卡片高度与溢出判定（列内常量，days.map 里直接用） */
  const avail = Math.max(140, stageH - 64 - 48); /* 材料簇 top:64 → bottom:48 */
  const fitFor = (n: number) => {
    if (n <= 0) return { cardH: 224, clipped: false };
    const preset = n === 1 ? 224 : n === 2 ? 182 : 152;
    if (density === "dense") {
      /* 概览态是细柱（≤64px），放不下时同样走列内滚动 */
      return { cardH: 0, clipped: n * 64 + gap * (n - 1) > avail };
    }
    const fitted = (avail - gap * (n - 1)) / n;
    return { cardH: Math.max(52, Math.min(preset, fitted)), clipped: fitted < 52 };
  };

  const maxCount = useMemo(
    () => Math.max(1, ...days.map((d) => grouped.get(d)?.length ?? 0)),
    [days, grouped],
  );

  /* 配套件浮层：hover 有配套的卡，从卡右缘浮现矩阵（n 行 3 列迷你卡）。
     平时不可见；横向滚动 / 缩放 / 换日即收 —— 浮层是 fixed 的，不跟滚动走。 */
  const [panel, setPanel] = useState<{ m: Material; rect: DOMRect } | null>(null);
  const closeTimer = useRef<number | null>(null);
  const openPanel = (m: Material, el: HTMLElement) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (!m.companions || (!m.companions.back.length && !m.companions.cross.length && !m.companions.ledger.length && !m.companions.external.length))
      return;
    setPanel({ m, rect: el.getBoundingClientRect() });
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPanel(null), 160);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  useEffect(() => {
    /* 轴动了浮层锚就错了 —— 直接收 */
    setPanel(null);
  }, [scrollX, spacing, days.length, focusDate]);
  useEffect(() => () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (scrollX > 1e5) {
      // 打开时停在最新一日：交给浏览器 clamp，并把真实值同步回去
      el.scrollLeft = scrollX;
      onScroll(el.scrollLeft);
      return;
    }
    if (Math.abs(el.scrollLeft - scrollX) > 1) el.scrollLeft = scrollX;
  }, [scrollX, onScroll]);

  return (
    <div
      ref={ref}
      onScroll={(e) => onScroll((e.target as HTMLDivElement).scrollLeft)}
      className="scrollbar-none relative h-full overflow-x-auto overflow-y-hidden bg-paper"
    >
      {/* 配套件浮层：fixed 定位，挂在滚动容器外层；几何对齐列轴 */}
      {panel && (
        <CompanionPanel
          anchor={panel.rect}
          material={panel.m}
          byId={allById}
          stageRef={ref}
          onOpen={onOpenDetail}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        />
      )}
      <div className="relative h-full" style={{ width: days.length * spacing + 140 }}>
        {/* 极淡的横向标尺：每 spacing*0.44 一条 1px 线 */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.035) 1px, transparent 1px)",
            backgroundSize: `100% ${Math.max(72, Math.round(spacing * 0.44))}px`,
          }}
        />

        {/* 地平线 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[38px] h-px bg-rule-strong" />

        {days.map((d, i) => {
          const list = grouped.get(d) ?? [];
          const on = d === focusDate;
          const empty = list.length === 0;
          const left = 70 + i * spacing;
          const dot = empty ? 5 : 6 + (list.length / maxCount) * 4;

          return (
            <div
              key={d}
              data-col={d}
              className="group absolute top-0 bottom-0 cursor-default"
              style={{ left, width: spacing }}
              onClick={() => !empty && onPickDay(d)}
            >
              {/* 选中列：两侧 1px 红线（红色预算之二） */}
              <div
                className="pointer-events-none absolute inset-y-0 -left-px w-px transition-opacity duration-150"
                style={{ background: "var(--color-accent)", opacity: on ? 0.35 : 0 }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-0 -right-px w-px transition-opacity duration-150"
                style={{ background: "var(--color-accent)", opacity: on ? 0.35 : 0 }}
                aria-hidden
              />

              {/* 列轴：一根 1px 竖线，有料加深，当前变红 */}
              <div
                className="pointer-events-none absolute top-[46px] bottom-[38px] left-1/2 w-px -translate-x-1/2 transition-colors duration-150"
                style={{
                  background: empty
                    ? "var(--color-rule)"
                    : on
                      ? "var(--color-accent)"
                      : "var(--color-rule-strong)",
                }}
              />

              {/* 列顶：日期 */}
              <button
                onClick={() => !empty && onPickDay(d)}
                className="absolute top-3 left-1/2 flex -translate-x-1/2 flex-col items-center gap-[3px] transition-opacity"
                style={{ opacity: empty ? 0.45 : 1 }}
              >
                <span
                  className="font-mono text-[12px] leading-none tracking-[0.06em] tnum transition-colors"
                  style={{ color: on ? "var(--color-accent-ink)" : "var(--color-ink-700)" }}
                >
                  {shortDay(d)}
                </span>
                <span className="flex items-center gap-1 font-mono text-[10.5px] tracking-[0.04em] text-ink-400">
                  {weekdayOf(d)}
                  {list.length > 0 && (
                    <>
                      <span className="text-ink-300">·</span>
                      <span className="tnum">{list.length}</span>
                    </>
                  )}
                </span>
              </button>

              {/* 材料簇：垂直居中；放不下时列内滚动（flex-start 在 col-reverse 里=底边起排） */}
              {(() => {
                const { cardH, clipped } = fitFor(list.length);
                return (
                  <div
                    className={`absolute inset-x-0 flex flex-col-reverse items-stretch${clipped ? " scrollbar-none overflow-y-auto" : ""}`}
                    style={{
                      bottom: 48,
                      top: 64,
                      justifyContent: clipped ? "flex-start" : "center",
                      gap,
                      paddingLeft: density === "dense" ? 0 : 14,
                      paddingRight: density === "dense" ? 0 : 14,
                    }}
                  >
                    {list.map((m) => (
                      <button
                        key={m.id}
                        onMouseEnter={(e) => openPanel(m, e.currentTarget)}
                        onMouseLeave={scheduleClose}
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenMaterial(m);
                        }}
                        className="block w-full shrink-0 text-left"
                        style={{
                          height:
                            density === "dense" || cardH === 0
                              ? undefined
                              : list.length === 1
                                ? Math.min(224, cardH)
                                : cardH,
                        }}
                      >
                        <MaterialChip m={m} catId={catId} density={density} />
                      </button>
                    ))}
                  </div>
                );
              })()}

              {/* 轴基座：方块，尺寸公式不变 */}
              <button
                onClick={() => !empty && onPickDay(d)}
                className="absolute bottom-[31px] left-1/2 -translate-x-1/2"
                aria-label={d}
              >
                <span
                  className="block transition-all duration-150"
                  style={{
                    width: dot,
                    height: dot,
                    background: empty ? "var(--color-paper)" : on ? "var(--color-accent)" : "var(--color-ink-900)",
                    boxShadow: empty ? "inset 0 0 0 1px var(--color-rule-strong)" : "none",
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

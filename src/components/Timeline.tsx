import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Grain, Material } from "../lib/types";
import { shortDay, weekdayOf } from "../lib/data";

export const SPACING_MIN = 40;
export const SPACING_MAX = 320;
export const PAD_L = 70;

/**
 * 底部时间线：横向、可滚轮伸缩、一个单位一个点。
 *
 * 日粒度：一天一点，点径 = 当日材料量；滚轮 = 伸缩（锚定光标位置缩放时间跨度）。
 * 时:分粒度：一份材料一点（按时刻定位）；滚轮 = 前后翻日。
 *
 * 对齐铁律：主体里一列的 left 是 PAD_L + i*spacing、宽 spacing，
 * 卡片与列顶日期都居中在 spacing/2 —— 所以滴必须落在 PAD_L + i*spacing + spacing/2，
 * 不是列的左边缘。两边的容器宽度也必须同源（days.length*spacing + 140）。
 */
export function Timeline({
  days,
  grain,
  spacing,
  scrollX,
  focusDate,
  grouped,
  catId,
  dayMaterials,
  onGrain,
  onSpacing,
  onScroll,
  onFocus,
  compact,
}: {
  days: string[];
  grain: Grain;
  spacing: number;
  scrollX: number;
  focusDate: string;
  grouped: Map<string, Material[]>;
  catId: string;
  dayMaterials: Material[];
  onGrain: (g: Grain) => void;
  onSpacing: (s: number) => void;
  onScroll: (x: number) => void;
  onFocus: (d: string) => void;
  compact?: boolean;
}) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const sp = useRef(spacing);
  const sx = useRef(scrollX);
  const grainRef = useRef(grain);
  const focusRef = useRef(focusDate);
  sp.current = spacing;
  sx.current = scrollX;
  grainRef.current = grain;
  focusRef.current = focusDate;

  const [railW, setRailW] = useState(0);
  useLayoutEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const ro = new ResizeObserver((e) => setRailW(e[0].contentRect.width));
    ro.observe(el);
    setRailW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const counts = days.map((d) => grouped.get(d)?.length ?? 0);
  const maxC = Math.max(1, ...counts);
  const totalDay = counts.reduce((a, b) => a + b, 0);

  /* 滚轮：日粒度缩放（锚定鼠标位置）；时分粒度翻日 */
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (grainRef.current === "day") {
        const rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const cur = sp.current;
        const next = Math.min(SPACING_MAX, Math.max(SPACING_MIN, cur * (e.deltaY > 0 ? 0.9 : 1.12)));
        if (Math.abs(next - cur) < 0.5) return;
        const anchor = (sx.current + mx - PAD_L) / cur;
        onSpacing(next);
        onScroll(Math.max(0, anchor * next + PAD_L - mx));
      } else {
        const i = days.indexOf(focusRef.current);
        const n = e.deltaY > 0 ? 1 : -1;
        const next = days[Math.min(days.length - 1, Math.max(0, i + n))];
        if (next && next !== focusRef.current) onFocus(next);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [days, onSpacing, onScroll, onFocus]);

  const iFocus = Math.max(0, days.indexOf(focusDate));
  /* 内容宽度与主体完全一致，滚动量夹在同一区间 —— 否则两把尺子会错开 */
  const contentW = days.length * spacing + 140;
  const safeX = Math.max(0, Math.min(scrollX, Math.max(0, contentW - railW)));

  return (
    <div
      className="relative z-20 shrink-0 select-none border-t border-rule bg-surface pb-[5px]"
    >
      {/* 头部 */}
      <div className="flex h-9 items-center gap-4 px-6">
        <span className="label-xs">Timeline</span>
        <span className="font-mono text-[12px] tracking-[0.04em] text-ink-700 tnum">
          {shortDay(days[0])} — {shortDay(days[days.length - 1])}
        </span>
        <span className="font-mono text-[11px] text-ink-400">
          {grain === "day" ? `${days.length} 日${compact ? " · 紧凑" : ""}` : `${shortDay(focusDate)} ${weekdayOf(focusDate)}`}
        </span>
        <span className="h-3 w-px bg-rule-strong" />
        <span className="font-mono text-[11px] tracking-[0.04em] text-ink-500">
          当日 <span className="tnum font-medium text-ink-900">{counts[iFocus] ?? 0}</span> 份
          <span className="mx-2 text-ink-300">/</span>
          窗口 <span className="tnum text-ink-700">{totalDay}</span> 份
        </span>

        <div className="ml-auto flex items-center gap-3">
          {/* 伸缩滑杆（仅日粒度） */}
          <div
            className="flex items-center gap-2 transition-opacity duration-300"
            style={{ opacity: grain === "day" ? 1 : 0.25, pointerEvents: grain === "day" ? "auto" : "none" }}
          >
            <span className="font-mono text-[10.5px] tracking-[0.18em] text-ink-700">SPAN</span>
            <input
              type="range"
              min={SPACING_MIN}
              max={SPACING_MAX}
              step={1}
              value={spacing}
              onChange={(e) => onSpacing(Number(e.target.value))}
              className="zoom-slider"
              aria-label="时间线伸缩"
            />
          </div>

          {/* 单位切换 */}
          <div className="flex items-center border border-rule-strong">
            {(["day", "minute"] as Grain[]).map((g) => {
              const on = grain === g;
              return (
                <button
                  key={g}
                  onClick={() => onGrain(g)}
                  className="px-3.5 py-[5px] font-mono text-[11.5px] tracking-[0.08em] transition-colors"
                  style={{
                    color: on ? "var(--color-paper)" : "var(--color-ink-500)",
                    background: on ? "var(--color-ink-900)" : "transparent",
                  }}
                >
                  {g === "day" ? "日" : "时:分"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 轴区 */}
      <div ref={railRef} className="relative h-[62px] cursor-crosshair overflow-hidden">
        {grain === "day" ? (
          <>
            {/* 轴 */}
            <div className="absolute right-0 left-0 h-px bg-rule-strong" style={{ bottom: 26 }} />
            <div
              className="absolute top-0 bottom-0 left-0"
              style={{
                width: contentW,
                transform: `translateX(${-safeX}px)`,
              }}
            >
              {days.map((d, i) => {
                const n = grouped.get(d)?.length ?? 0;
                const on = d === focusDate;
                const r = 3.6 + (n / maxC) * 4.4;
                /* 滴落在列的中轴上 */
                const x = PAD_L + i * spacing + spacing / 2;
                const step = spacing >= 132 ? 1 : spacing >= 88 ? 2 : spacing >= 56 ? 5 : 10;
                const showLabel = on || i % step === 0;
                return (
                  <button
                    key={d}
                    data-drop={d}
                    onClick={() => onFocus(d)}
                    className="group absolute"
                    style={{ left: x, bottom: 0, height: "100%", width: 1 }}
                  >
                    {/* 选中：轴上方一段 2px 红线 */}
                    <span
                      className="absolute bottom-[26px] left-1/2 w-[2px] -translate-x-1/2 transition-opacity duration-150"
                      style={{ height: on ? 26 : 0, background: "var(--color-accent)", opacity: on ? 1 : 0 }}
                    />
                    {/* 滴：方块，尺寸公式不变 */}
                    <span
                      className="absolute left-1/2 transition-colors duration-150"
                      style={{
                        bottom: 26 - r,
                        width: r * 2,
                        height: r * 2,
                        marginLeft: -r,
                        background: on ? "var(--color-accent)" : n > 0 ? "var(--color-ink-900)" : "transparent",
                        boxShadow: n > 0 || on ? "none" : "inset 0 0 0 1px var(--color-rule-strong)",
                      }}
                    />
                    {/* 日期 */}
                    {showLabel && (
                      <span
                        className="absolute left-1/2 -translate-x-1/2 font-mono text-[12px] tracking-[0.04em] whitespace-nowrap tnum"
                        style={{
                          bottom: 1,
                          color: on
                            ? "var(--color-accent-ink)"
                            : n > 0
                              ? "var(--color-ink-700)"
                              : "var(--color-ink-300)",
                          fontWeight: on ? 600 : 400,
                        }}
                      >
                        {shortDay(d)}
                      </span>
                    )}
                    {/* 份数（放大后可见） */}
                    {spacing >= 150 && n > 0 && (
                      <span
                        className="absolute left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.02em] tnum"
                        style={{ bottom: 36, color: on ? "var(--color-accent-ink)" : "var(--color-ink-400)" }}
                      >
                        {n}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <MinuteAxis
            date={focusDate}
            materials={dayMaterials}
            catId={catId}
            onPickDay={(dir) => {
              const i = days.indexOf(focusDate);
              const n = days[Math.min(days.length - 1, Math.max(0, i + dir))];
              if (n) onFocus(n);
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ---------- 时分轴 ---------- */
function MinuteAxis({
  date,
  materials,
  catId,
  onPickDay,
}: {
  date: string;
  materials: Material[];
  catId: string;
  onPickDay: (dir: number) => void;
}) {
  const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
  const H0 = 0;
  const H1 = 24 * 60;
  const span = H1 - H0;
  const pct = (t: string) => Math.max(0, Math.min(100, ((toMin(t) - H0) / span) * 100));

  return (
    <div className="relative h-full">
      {/* 翻日 */}
      <div className="absolute top-2 right-5 z-10 flex items-center gap-2">
        <button
          onClick={() => onPickDay(-1)}
          className="px-1.5 py-0.5 font-mono text-[12px] text-ink-500 transition-colors hover:bg-surface-2 hover:text-ink-900"
        >
          ◀
        </button>
        <span className="font-mono text-[11px] tracking-[0.06em] text-ink-700 tnum">
          {shortDay(date)} {weekdayOf(date)}
        </span>
        <button
          onClick={() => onPickDay(1)}
          className="px-1.5 py-0.5 font-mono text-[12px] text-ink-500 transition-colors hover:bg-surface-2 hover:text-ink-900"
        >
          ▶
        </button>
      </div>

      {/* 轴 */}
      <div className="absolute right-8 left-[100px] h-px bg-rule-strong" style={{ bottom: 26 }} />

      {/* 小时刻度：数字在轴上方，刻度钉骑在轴上 */}
      <div className="absolute right-8 left-[100px]" style={{ bottom: 26 }}>
        {Array.from({ length: 13 }).map((_, i) => {
          const h = i * 2;
          const left = ((h * 60 - H0) / span) * 100;
          return (
            <div key={h} className="absolute" style={{ left: `${left}%`, bottom: 0 }}>
              <span className="absolute w-px bg-rule-strong" style={{ bottom: 0, height: 4 }} />
              <span
                className="absolute -translate-x-1/2 font-mono text-[10px] tracking-[0.04em] whitespace-nowrap text-ink-400"
                style={{ bottom: 7 }}
              >
                {String(h).padStart(2, "0")}
              </span>
            </div>
          );
        })}
      </div>

      {/* 材料点：点骑在轴上，标签压在轴下方一行 —— 只用一层高度，栏才压得矮 */}
      <div className="absolute right-8 bottom-0 left-[100px] h-full">
        {materials.map((m) => {
          const p = pct(m.time);
          return (
            <div key={m.id} className="group absolute" style={{ left: `${p}%`, bottom: 0 }}>
              <span
                className="absolute block h-[7px] w-[7px] transition-transform duration-150 group-hover:scale-125"
                style={{ bottom: 23, left: -3, background: "var(--color-ink-900)" }}
              />
              <span
                className="absolute flex w-[164px] items-baseline gap-1.5 text-[11px] leading-none"
                style={{
                  left: p > 86 ? "auto" : -4,
                  right: p > 86 ? -4 : "auto",
                  bottom: 2,
                  flexDirection: p > 86 ? "row-reverse" : "row",
                }}
              >
                <span className="shrink-0 font-mono text-[10.5px] tracking-[0.04em] text-ink-700 tnum">
                  {m.time}
                </span>
                <span className="min-w-0 truncate text-ink-500 transition-colors group-hover:text-ink-900">
                  {m.name}
                </span>
              </span>
            </div>
          );
        })}
        {materials.length === 0 && (
          <span className="absolute bottom-2 left-0 font-mono text-[11px] tracking-[0.08em] text-ink-400">该日无材料</span>
        )}
      </div>
    </div>
  );
}

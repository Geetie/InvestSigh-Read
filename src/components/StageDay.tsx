import { useEffect, useMemo, useRef } from "react";
import type { Material } from "../lib/types";
import { shortDay, weekdayOf } from "../lib/data";
import { MaterialChip, type Density } from "./MaterialChip";

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
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const density: Density = spacing >= 172 ? "full" : spacing >= 128 ? "md" : "dense";
  const gap = density === "dense" ? 6 : 12;

  const maxCount = useMemo(
    () => Math.max(1, ...days.map((d) => grouped.get(d)?.length ?? 0)),
    [days, grouped],
  );

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

              {/* 材料簇：垂直居中（布局不动） */}
              <div
                className="absolute inset-x-0 flex flex-col-reverse items-stretch"
                style={{
                  bottom: 48,
                  top: 64,
                  justifyContent: "center",
                  gap,
                  paddingLeft: density === "dense" ? 0 : 14,
                  paddingRight: density === "dense" ? 0 : 14,
                }}
              >
                {list.map((m) => (
                  <button
                    key={m.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenMaterial(m);
                    }}
                    className="block w-full text-left"
                    style={{
                      height:
                        density === "dense"
                          ? undefined
                          : list.length === 1
                            ? 224
                            : list.length === 2
                              ? 182
                              : 152,
                    }}
                  >
                    <MaterialChip m={m} catId={catId} density={density} />
                  </button>
                ))}
              </div>

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

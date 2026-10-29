import type { Material } from "../lib/types";
import { catInk } from "../lib/palette";

export type Density = "dense" | "md" | "full";

/**
 * 一份材料 = 一张档案卡。
 *
 * 没有玻璃、没有液态、没有异形切角。白纸 + 1px 灰线 + 左缘一条类属墨色，
 * 抬起来靠 2px 硬投影偏移（瑞士），不靠模糊。
 *
 * 底部那排 3px 小方块是「格点阵」：一格一行，实心=取到了，空心=材料给不了。
 */
export function MaterialChip({ m, catId, density }: { m: Material; catId: string; density: Density }) {
  const ink = catInk(catId);
  const ratio = m.total ? m.filled / m.total : 0;

  if (density === "dense") {
    /* 概览态：一根细柱，高度 = 该材料的可填比例 */
    return (
      <div
        className="relative mx-auto w-[3px] bg-rule"
        style={{ height: 20 + ratio * 44 }}
        title={`${m.name} · ${m.filled}/${m.total}`}
      >
        <span className="absolute inset-x-0 top-0" style={{ height: `${ratio * 100}%`, background: ink.ink }} />
      </div>
    );
  }

  return (
    <div
      className="card-hover relative flex h-full flex-col overflow-hidden bg-paper"
      style={{
        borderTop: "1px solid var(--color-rule-strong)",
        borderRight: "1px solid var(--color-rule-strong)",
        borderBottom: "1px solid var(--color-rule-strong)",
        borderLeft: `3px solid ${ink.ink}`,
      }}
      title={m.name}
    >
      <div className="flex min-h-0 flex-1 flex-col px-2.5 py-2">
        {/* 元信息行 */}
        <div className="flex shrink-0 items-baseline gap-1.5 font-mono text-[11px] leading-none text-ink-500">
          <span className="tnum">{m.time}</span>
          {m.ticker && <span className="truncate tracking-[0.02em]">{m.ticker}</span>}
          <span className="ml-auto shrink-0 tnum text-ink-400">
            {m.filled}/{m.total}
          </span>
        </div>

        {/* 标题 */}
        <p className="mt-1.5 line-clamp-6 min-h-0 flex-1 overflow-hidden text-[13px] leading-[1.5] text-ink-900">
          {m.name}
        </p>

        {/* 格点阵 */}
        <div className="mt-2 flex shrink-0 items-center gap-[2px]">
          {Array.from({ length: m.total }).map((_, i) => {
            const on = i < m.filled;
            return (
              <span
                key={i}
                className="block h-[3px] flex-1"
                style={{
                  background: on ? "var(--color-ink-900)" : "transparent",
                  boxShadow: on ? "none" : "inset 0 0 0 1px var(--color-rule)",
                  maxWidth: 14,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

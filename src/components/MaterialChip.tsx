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

  /* 配套件：卡面只留一个 ⇄ 符号，明细由悬停浮层（CompanionPanel）承担 */
  const c = m.companions;
  const hasComp = Boolean(c && (c.back.length || c.cross.length || c.ledger.length || c.external.length));

  if (density === "dense") {
    /* 概览态：一根细柱，高度 = 该材料的可填比例 */
    return (
      <div
        className="relative mx-auto w-[3px] bg-rule"
        style={{ height: 20 + ratio * 44 }}
        title={`${m.name} · ${m.filled}/${m.total}${(m.unfilled ?? 0) > 0 ? `（未按现行问法重填）` : ""}`}
      >
        <span className="absolute inset-x-0 top-0" style={{ height: `${ratio * 100}%`, background: ink.ink }} />
      </div>
    );
  }

  /* 格点阵真源：分册逐行的有/无。没拿到 grid（旧缓存）时退回前缀近似。 */
  const grid = m.grid ?? Array.from({ length: m.total }, (_, i) => (i < m.filled ? "1" : "0"));
  const stale = (m.unfilled ?? 0) > 0;

  return (
    <div
      className="card-hover relative flex h-full flex-col overflow-hidden bg-paper"
      style={{
        borderTop: "1px solid var(--color-rule-strong)",
        borderRight: "1px solid var(--color-rule-strong)",
        borderBottom: "1px solid var(--color-rule-strong)",
        borderLeft: `3px solid ${ink.ink}`,
      }}
      title={`${m.name}${stale ? `（未按现行问法重填，缺 ${m.unfilled} 行）` : ""}`}
    >
      <div className="flex min-h-0 flex-1 flex-col px-2.5 py-2">
        {/* 元信息行 */}
        <div className="flex shrink-0 items-baseline gap-1.5 font-mono text-[11px] leading-none text-ink-500">
          {hasComp && (
            <span className="text-ink-400" aria-label="有配套件">
              ⇄
            </span>
          )}
          <span className="tnum">{m.time}</span>
          {m.ticker && <span className="truncate tracking-[0.02em]">{m.ticker}</span>}
          <span className="ml-auto shrink-0 tnum text-ink-400">
            {m.filled}/{m.total}
            {stale && <span title="未按现行问法重填">†</span>}
          </span>
        </div>

        {/* 标题 */}
        <p className="mt-1.5 line-clamp-6 min-h-0 flex-1 overflow-hidden text-[13px] leading-[1.5] text-ink-900">
          {m.name}
        </p>

        {/* 格点阵：一格一行，实心=取到了，空心=材料给不了（删节，合法读数）；
            卡上没有的行也是空心 —— 未重填的量看 filled/total 的 † */}
        <div className="mt-2 flex shrink-0 items-center gap-[2px]">
          {grid.map((g, i) => (
            <span
              key={i}
              className="block h-[3px] flex-1"
              style={{
                background: g === "1" ? "var(--color-ink-900)" : "transparent",
                boxShadow: g === "1" ? "none" : "inset 0 0 0 1px var(--color-rule)",
                maxWidth: 14,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

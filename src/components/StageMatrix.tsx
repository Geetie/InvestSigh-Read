import type { Material, RowDef } from "../lib/types";
import { shortDay, weekdayOf } from "../lib/data";
import { catInk } from "../lib/palette";
import { openDetail } from "../lib/route";

/**
 * 尺寸常量。
 *
 * ★ 2026-10-28 改：原来是固定 `ROW_H = 98` + `line-clamp-3`，只显示 3 行。
 *   实测答案长度中位 **449 字**、p95 **1292 字**、最长 **4991 字**，
 *   3 行（约 60 字）连中位数都装不下，等于把所有答案都截断了。
 *
 *   现在改成**行高由内容决定**：不再有 ROW_H，格子完整展开。
 *   CSS Grid 天然让同一行的格子等高，横向依然可以比较。
 *
 * 字号 15px / 行高 1.6 → 每行 24px。中文 15px 字宽约 15px。
 */
const HEAD_W = 296;
const HEAD_H = 126;
/** 列最小宽度：按 15px 中文约 22 字/行，340px 可读性尚可 */
const COL_MIN = 340;
/** 行头最小高度（内容多时自动撑开） */
const ROW_MIN_H = 72;

/**
 * 时:分粒度主体：材料成列，该型要回答的问题/要收集的数据成行。
 *
 * 表头压一条 2px 黑线（瑞士的章节线），行头左缘 2px 竖线区分「问」与「数」。
 * 格子只放 Agent 真实取到的答案；材料给不了的行留斜线空格——空缺本身是读数。
 */
export function StageMatrix({
  rows,
  materials,
  catId,
  focusDate,
  onOpenMaterial,
}: {
  rows: RowDef[];
  materials: Material[];
  catId: string;
  focusDate: string;
  onOpenMaterial: (m: Material) => void;
}) {
  const ink = catInk(catId);
  const filled = materials.reduce((a, m) => a + m.filled, 0);
  const totalCells = materials.length * rows.length;

  if (materials.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-paper">
        <span className="block h-[10px] w-[10px] bg-ink-900/15" aria-hidden />
        <p className="font-mono text-[12px] tracking-[0.12em] text-ink-500">
          {shortDay(focusDate)} · 该型当日无材料
        </p>
        <p className="text-[12.5px] text-ink-400">在底部时间线换一天，或按 D 回到日粒度看分布</p>
      </div>
    );
  }

  const cols = ` ${HEAD_W}px repeat(${materials.length}, minmax(${COL_MIN}px, 1fr))`;

  return (
    <div className="h-full overflow-auto bg-paper">
      <div className="grid w-full" style={{ gridTemplateColumns: cols }}>
        {/* ── 表头：左上角元信息 ── */}
        <div
          className="sticky top-0 left-0 z-40 flex flex-col justify-end px-4 pb-2.5"
          style={{
            height: HEAD_H,
            background: "var(--color-surface)",
            borderBottom: "2px solid var(--color-ink-900)",
          }}
        >
          <div className="flex items-baseline gap-2">
            <span className="label-xs">Row / Col</span>
            <span className="font-mono text-[12px] text-ink-700 tnum">
              {rows.length} × {materials.length}
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 font-mono text-[11px] text-ink-400">
            <span className="tnum">
              {shortDay(focusDate)} · {weekdayOf(focusDate)}
            </span>
            <span className="text-ink-300">·</span>
            <span className="tnum text-ink-700">
              {filled}/{totalCells} 有读数
            </span>
          </div>
        </div>

        {/* ── 表头：材料列 ── */}
        {materials.map((m) => (
          <button
            key={m.id}
            onClick={() => onOpenMaterial(m)}
            className="group/col sticky top-0 z-30 flex flex-col justify-end px-4 pb-2.5 text-left transition-colors hover:bg-surface-2"
            style={{
              height: HEAD_H,
              background: "var(--color-surface)",
              borderBottom: "2px solid var(--color-ink-900)",
              borderLeft: "1px solid var(--color-rule)",
            }}
          >
            <span className="font-mono text-[12px] tracking-[0.06em] text-ink-700 tnum">{m.time}</span>
            <span className="mt-1.5 line-clamp-3 text-[12px] leading-[1.45] text-ink-900">{m.name}</span>
            <span className="mt-2 flex items-center gap-1.5">
              <span className="font-mono text-[11px] tracking-[0.02em] text-ink-500">
                {m.ticker || m.issuer || "—"}
              </span>
              <span className="ml-auto flex items-center gap-[2px]">
                {Array.from({ length: m.total }).map((_, i) => (
                  <span
                    key={i}
                    className="block h-[3px] w-[5px]"
                    style={{
                      background: i < m.filled ? "var(--color-ink-900)" : "transparent",
                      boxShadow: i < m.filled ? "none" : "inset 0 0 0 1px var(--color-rule)",
                    }}
                  />
                ))}
              </span>
              <span className="font-mono text-[11px] text-ink-500 tnum">
                {m.filled}/{m.total}
              </span>
            </span>
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity group-hover/col:opacity-100"
              style={{ background: "var(--color-accent)" }}
            />
          </button>
        ))}

        {/* ── 数据行 ── */}
        {rows.map((r, ri) =>
          [
            <div
              key={`h-${r.id}`}
              className="sticky left-0 z-20 flex items-center gap-2.5 px-4"
              style={{
                minHeight: ROW_MIN_H,
                background: "var(--color-paper)",
                borderBottom: "1px solid var(--color-rule)",
                borderRight: "1px solid var(--color-rule)",
              }}
            >
              <span
                className="absolute inset-y-0 left-0 w-[2px]"
                style={{ background: r.kind === "data" ? ink.ink : "var(--color-ink-900)" }}
                aria-hidden
              />
              <span className="flex w-7 shrink-0 flex-col items-center gap-1">
                <span className="font-mono text-[10.5px] tracking-[0.04em] text-ink-500">{r.id}</span>
                <span
                  className="px-1 font-mono text-[10px] leading-[14px]"
                  style={{
                    color: r.kind === "data" ? ink.ink : "var(--color-ink-700)",
                    boxShadow: `inset 0 0 0 1px ${r.kind === "data" ? ink.ink : "var(--color-rule-strong)"}`,
                  }}
                >
                  {r.kind === "data" ? "数" : "问"}
                </span>
              </span>
              <span className="py-2 text-[12.5px] leading-[1.5] text-ink-700">{r.label}</span>
            </div>,

            ...materials.map((m) => {
              const v = m.cells[r.id];
              return (
                <div
                  key={`${m.id}-${r.id}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => openDetail(m.id, r.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openDetail(m.id, r.id);
                    }
                  }}
                  className="group/cell relative cursor-pointer px-3.5 py-2.5 transition-colors hover:bg-surface-2"
                  style={{
                    minHeight: ROW_MIN_H,
                    borderLeft: "1px solid var(--color-rule)",
                    borderBottom: "1px solid var(--color-rule)",
                    /* 空格不参与撑高：自己贴顶，剩下的留白而不是斜线铺满。
                       否则同行有长答案时，空格会被拉到同高，斜线一片很吓人。
                       注意：这是 grid item，`verticalAlign` 无效，要用 alignSelf。 */
                    alignSelf: "start",
                  }}
                  title={v ? `${r.label}\n\n点开看原文依据` : `${r.label}\n\n材料未提供该行读数`}
                  aria-label={`展开「${r.label}」的完整答案与原文依据`}
                >
                  {/* 悬停指示：**贴右下角**，不压正文首行（原来在右上角会盖住第一句话） */}
                  <span
                    className="pointer-events-none absolute right-2 bottom-1.5 font-mono text-[11px] text-ink-300 opacity-0 transition-opacity group-hover/cell:opacity-100"
                    aria-hidden
                  >
                    ↗
                  </span>
                  {v ? (
                    /* ★ 不 clamp：老板要求「能直接在矩阵格子阅读到全文，不进行省略」。
                       white-space: pre-wrap 保留答案里的换行（列表、分段），否则会挤成一段。
                       ★ 格子里**只放答案**，不放问题、不放依据——问题在左侧行头，依据点进详情页看。 */
                    <p className="whitespace-pre-wrap break-words pr-3 text-[15px] leading-[1.6] text-ink-700 group-hover/cell:text-ink-900">
                      {v}
                    </p>
                  ) : (
                    /* 空读数：只占一行高、贴顶，**不铺满整格**。
                       斜线只在那一小条上，明确表示「材料没给」，不制造大块视觉噪音。 */
                    <div className="hatch-missing flex h-8 w-full items-center justify-center">
                      <span className="font-mono text-[13px] leading-none text-ink-300">—</span>
                    </div>
                  )}
                </div>
              );
            }),
          ].flat(),
        )}
      </div>
    </div>
  );
}

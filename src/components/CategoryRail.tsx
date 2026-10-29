import type { CategoryDef, Material } from "../lib/types";
import { catInk } from "../lib/palette";

/**
 * 左侧竖栏：七类切换。
 *
 * 选中态不是「发光」，是「白纸 + 左侧 2px 红线」——红色只标记交互位，
 * 分类归属由编号旁那颗 6×6 墨色方块承担。宽度 96px、七格均分不变。
 */
export function CategoryRail({
  cats,
  active,
  counts,
  onPick,
}: {
  cats: CategoryDef[];
  active: string;
  counts: Record<string, number>;
  onPick: (id: string) => void;
}) {
  const max = Math.max(...Object.values(counts), 1);

  return (
    <nav className="relative z-20 flex w-[96px] shrink-0 flex-col border-r border-rule bg-surface">
      <div className="flex h-9 items-center justify-center border-b border-rule">
        <span className="label-xs">Class</span>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col">
        {cats.map((c, i) => {
          const on = c.id === active;
          const ink = catInk(c.id);
          const ratio = (counts[c.id] ?? 0) / max;
          return (
            <button
              key={c.id}
              onClick={() => onPick(c.id)}
              aria-pressed={on}
              className={`group relative flex flex-1 flex-col items-center justify-center gap-1.5 transition-colors duration-150 ${
                on ? "bg-paper" : "hover:bg-surface-2/60"
              }`}
              style={{ minHeight: 0 }}
            >
              {/* 选中：左侧 2px 红线（唯一允许的红色预算之一） */}
              <span
                className="pointer-events-none absolute top-0 bottom-0 left-0 w-[2px] transition-opacity duration-150"
                style={{ background: "var(--color-accent)", opacity: on ? 1 : 0 }}
                aria-hidden
              />
              {i > 0 && <span className="absolute -top-px right-3 left-3 h-px bg-rule" aria-hidden />}

              {/* 编号 + 墨色方块 */}
              <span className="relative flex items-center gap-1.5">
                <span
                  className="block h-[6px] w-[6px] transition-opacity duration-150"
                  style={{ background: ink.ink, opacity: on ? 1 : 0.42 }}
                  aria-hidden
                />
                <span
                  className="font-mono text-[22px] leading-none tracking-[0.02em] tnum"
                  style={{ color: on ? "var(--color-ink-900)" : "var(--color-ink-400)" }}
                >
                  {c.id}
                </span>
              </span>

              <span
                className="relative px-1.5 text-center text-[12.5px] leading-[1.45]"
                style={{
                  color: on ? "var(--color-ink-900)" : "var(--color-ink-500)",
                  fontWeight: on ? 500 : 400,
                }}
              >
                {c.name}
              </span>

              {/* 计数 + 占比细条 */}
              <span className="relative flex items-center gap-1.5">
                <span
                  className="font-mono text-[11px] tracking-[0.04em] tnum"
                  style={{ color: on ? "var(--color-ink-700)" : "var(--color-ink-400)" }}
                >
                  {counts[c.id] ?? 0}
                </span>
                <span className="relative block h-px w-6 bg-rule">
                  <span
                    className="absolute inset-y-0 left-0 transition-[width] duration-200"
                    style={{
                      width: `${Math.max(6, ratio * 100)}%`,
                      background: on ? "var(--color-ink-900)" : "var(--color-rule-strong)",
                    }}
                  />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex h-8 items-center justify-center border-t border-rule">
        <span className="label-xs">07 / 07</span>
      </div>
    </nav>
  );
}

export const countByCat = (materials: Material[]) => {
  const out: Record<string, number> = {};
  for (const m of materials) out[m.cat] = (out[m.cat] ?? 0) + 1;
  return out;
};

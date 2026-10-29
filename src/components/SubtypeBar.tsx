import { SquarePen } from "lucide-react";
import Magnet from "./vendor/Magnet";
import type { CategoryDef, Material } from "../lib/types";
import { catInk } from "../lib/palette";

/**
 * 上横栏：当前类的细分型切换。
 *
 * 这里没有「芯片」，只有排成一行的文字标签 —— 选中靠底部 2px 红线，
 * 不靠底色、不靠边框、不靠发光。整条底线用本类的印刷墨色，
 * 切换类目时换墨，这是七类身份最克制的一处表达。
 */
export function SubtypeBar({
  cat,
  active,
  materials,
  rowCounts,
  onPick,
}: {
  cat: CategoryDef;
  active: string;
  materials: Material[];
  /** 各型「该日生效」的行数 —— 行数随提示词版本变，不能用内置模板的 */
  rowCounts?: Record<string, number>;
  onPick: (id: string) => void;
}) {
  const ink = catInk(cat.id);
  const counts = new Map<string, number>();
  for (const m of materials) counts.set(m.sub, (counts.get(m.sub) ?? 0) + 1);

  return (
    <div className="relative z-20 shrink-0">
      <div className="flex items-stretch">
        <div className="scrollbar-none flex h-[72px] min-w-0 flex-1 items-stretch overflow-x-auto px-5 pt-3">
          {cat.subtypes.map((s, i) => {
            const on = s.id === active;
            const n = counts.get(s.id) ?? 0;
            return (
              <button
                key={s.id}
                onClick={() => onPick(s.id)}
                aria-pressed={on}
                title={s.oneLiner}
                className="group relative flex shrink-0 flex-col justify-end pb-2.5 pr-6 pl-6 text-left transition-colors duration-150 first:pl-0"
                style={{ minWidth: 150 }}
              >
                {/* 标签之间的发丝分隔 */}
                {i > 0 && (
                  <span
                    className="absolute top-1 bottom-3 left-0 w-px bg-rule"
                    aria-hidden
                  />
                )}

                <span
                  className="block truncate text-[15.5px] leading-tight transition-colors duration-150"
                  style={{
                    color: on ? "var(--color-ink-900)" : "var(--color-ink-500)",
                    fontWeight: on ? 600 : 400,
                  }}
                >
                  {s.name}
                </span>

                <span className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em]">
                  <span className="tnum" style={{ color: on ? "var(--color-ink-700)" : "var(--color-ink-400)" }}>
                    {n} 份
                  </span>
                  <span className="text-ink-300">·</span>
                  <span className="tnum" style={{ color: "var(--color-ink-400)" }}>
                    {rowCounts?.[s.id] ?? s.rows.length} 行
                  </span>
                </span>

                {/* 选中：底部 2px 红线 */}
                <span
                  className="pointer-events-none absolute right-6 bottom-0 left-6 h-[2px] transition-opacity duration-150"
                  style={{ background: "var(--color-accent)", opacity: on ? 1 : 0 }}
                  aria-hidden
                />
              </button>
            );
          })}

          <div className="flex shrink-0 items-end pb-2.5 pl-2">
            <span className="max-w-[220px] text-[12px] leading-[1.5] text-ink-400">
              {cat.subtypes.find((s) => s.id === active)?.oneLiner}
            </span>
          </div>
        </div>

        {/* 提示词入口：钉在小类型栏右端，不随标签横向滚动 */}
        <div className="flex h-[72px] shrink-0 items-center border-l border-rule px-4">
          <Magnet padding={40} magnetStrength={12} maxOffset={3}>
            <a
              href={`#/prompts/${encodeURIComponent(active)}`}
              title="改问题与读法"
              className="flex h-9 items-center gap-2 border border-ink-900 bg-ink-900 px-3.5 text-[12.5px] text-paper transition-colors hover:bg-paper hover:text-ink-900"
            >
              <SquarePen size={13} strokeWidth={1.9} />
              提示词
            </a>
          </Magnet>
        </div>
      </div>

      {/* 类属底线：换类即换墨 */}
      <div className="h-px w-full" style={{ background: ink.ink, opacity: 0.38 }} aria-hidden />
    </div>
  );
}

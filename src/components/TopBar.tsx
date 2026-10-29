import type { Index } from "../lib/data";
import { shortDay } from "../lib/data";
import { TickerPicker } from "./TickerPicker";

/**
 * 顶栏：一条 1px 发丝线，什么都不装饰。
 * 左侧「黑方块 + 字标 + 面包屑」，右侧四组「标签 / 数值」，最右一个 6×6 状态方块。
 * 高度 h-14（56px）不变。
 */
export function TopBar({
  idx,
  catName,
  subName,
  aiOpen,
  ticker,
  chainId,
  onPickTicker,
}: {
  idx: Index;
  catName: string;
  subName: string;
  aiOpen: boolean;
  ticker?: string;
  chainId?: string;
  onPickTicker: (t?: string) => void;
}) {
  return (
    <header className="relative z-40 flex h-14 shrink-0 items-center gap-5 border-b border-rule bg-paper px-6">
      <div className="flex items-center gap-2.5">
        <span className="block h-[10px] w-[10px] bg-ink-900" aria-hidden />
        <span className="text-[13px] font-semibold tracking-[0.16em] text-ink-900">INVESTSIGH</span>
      </div>

      {/* 回到上游的选择层 */}
      <a
        href="#/chain"
        className="shrink-0 border border-rule-strong px-2.5 py-1 text-[12px] text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
      >
        产业链
      </a>

      <TickerPicker chainId={chainId} ticker={ticker} onChange={onPickTicker} />

      <div className="flex min-w-0 items-center gap-2 text-[12.5px]">
        <span className="text-ink-300">/</span>
        <span className="truncate text-ink-500">{catName}</span>
        <span className="text-ink-300">/</span>
        <span className="truncate font-medium text-ink-900">{subName}</span>
      </div>

      <div className="ml-auto flex items-center gap-5">
        <Stat label="窗口" value={`${shortDay(idx.start)} — ${shortDay(idx.end)}`} />
        <Stat label="材料" value={idx.totalMaterials.toLocaleString()} />
        <Stat label="格填充" value={`${Math.round((idx.filledCells / idx.totalCells) * 100)}%`} strong />
        <span className="flex items-center gap-2">
          <span
            className={`block h-[6px] w-[6px] ${aiOpen ? "bg-accent" : "border border-ink-400"}`}
            aria-hidden
          />
          <span className={aiOpen ? "text-accent-ink" : "text-ink-500"} style={{ fontSize: 12 }}>
            AI
          </span>
        </span>
      </div>
    </header>
  );
}

const Stat = ({ label, value, strong }: { label: string; value: string; strong?: boolean }) => (
  <span className="flex items-baseline gap-2">
    <span className="label-xs">{label}</span>
    <span
      className={`font-mono text-[12px] tnum ${strong ? "font-medium text-ink-900" : "text-ink-700"}`}
    >
      {value}
    </span>
  </span>
);

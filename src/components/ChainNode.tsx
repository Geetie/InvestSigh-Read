import type { CSSProperties } from "react";
import { isListed, type ChainCompany, type ChainSegment } from "../lib/chain";
import { CO_H, HEAD_H } from "../lib/chainLayout";
import MagicBento from "./vendor/MagicBento";

/**
 * 产业链节点卡 —— MagicBento 的单卡壳 + 我们自己的内容。
 *
 * 为什么一节点一个实例：MagicBento 是 CSS Grid 组件，而我们节点的位置由
 * dagre 算出来（绝对定位 + 连线要对齐到卡片边缘）。用 `columns=1` 的
 * 单卡实例，就能把它的「指针 → 光」那套物理原样搬到任意坐标上，
 * 既不改它的内部，也不放弃 DAG 布局。
 *
 * 内容上用 `content` 整块替换（保留光、边框、点击涟漪），不用它自带的
 * analytics / dashboard 那些插画 —— 供应链环节配 SaaS 插画是错的。
 */

const SHADOW_IDLE =
  "0 2px 3px -1px rgba(24,24,27,.07), 0 12px 22px -16px rgba(24,24,27,.30)";
const SHADOW_SEL =
  "0 2px 4px -1px rgba(16,16,16,.10), 0 16px 28px -16px rgba(16,16,16,.40)";

interface Props {
  seg: ChainSegment;
  no: string;
  col: number;
  /** 卡片高度（dagre 算好的），也是 MagicBento 的行高 */
  height: number;
  companies: ChainCompany[];
  selected: boolean;
  onFocus: () => void;
  onPickCo: (c: ChainCompany) => void;
}

export function ChainNode({ seg, no, col, height, companies, selected, onFocus, onPickCo }: Props) {
  const tune = {
    "--mb-pad": "0px",
    /* 纸面几乎纯白，只留一丝暖调；渐变一重就显脏 */
    "--mb-surface": "linear-gradient(180deg, #ffffff 0%, #fcfbf9 100%)",
    "--mb-edge": "#d5d2c9",
    "--mb-highlight": "rgba(255,255,255,1)",
    /* 白底 + 白卡，墨色的光根本看不出来（alpha 0.09 只等于 #f7f6f5）。
       换成灯光色（琥珀）：在白纸上是「一盏灯照过来」，而不是一圈灰。 */
    "--mb-spot-alpha": "0.26",
    /* 已选中的卡不再叠光：它已经有 2px 墨线，再叠暖边就互相打架 */
    "--mb-glow-alpha": selected ? "0.45" : "0.75",
    "--mb-shadow": selected ? SHADOW_SEL : SHADOW_IDLE,
  } as CSSProperties;

  const listed = companies.filter(isListed).length;

  const body = (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 overflow-hidden px-3 pt-3" style={{ height: HEAD_H }}>
        {/* 编号 · 层 · 上市刻度 · 家数：一行里既有索引也有一点数据图形 */}
        <span className="flex items-center gap-2">
          <span className="tnum font-mono text-[11.5px] leading-none text-ink-300">{no}</span>
          <span className="font-mono text-[9.5px] leading-none tracking-[0.12em] text-ink-300">L{col + 1}</span>
          <span className={`h-px flex-1 ${selected ? "bg-ink-900" : "bg-rule"}`} />
          <span className="flex items-end gap-[3px]" aria-hidden>
            {companies.map((c) => (
              <span
                key={c.ticker + c.name}
                className="block w-[3px]"
                style={{
                  height: 9,
                  background: isListed(c) ? "var(--color-ink-900)" : "var(--color-rule-strong)",
                }}
              />
            ))}
          </span>
          <span className="tnum font-mono text-[9.5px] leading-none text-ink-300">
            {listed}/{companies.length}
          </span>
        </span>
        <span className="mt-2 block text-[17px] leading-[1.22] font-medium text-ink-900">{seg.name}</span>
        <span className="mt-1 block truncate text-[12px] leading-[1.4] text-ink-500">{seg.gloss}</span>
        <span className="mt-1 block truncate text-[11px] leading-[1.35] text-ink-400">产出 · {seg.output}</span>
      </div>

      <div className="mt-auto border-t border-rule">
        {companies.map((c) => (
          <CompanyRow
            key={c.ticker + c.name}
            co={c}
            onPick={() => onPickCo(c)}
            /* 两步走：还没选环节时，点票只是「先把这个环节选上」 */
            onArm={onFocus}
          />
        ))}
      </div>
    </div>
  );

  return (
    <MagicBento
      className={`chain-node${selected ? " chain-node--sel" : ""}`}
      theme="light"
      columns={1}
      gap={0}
      radius={10}
      rowHeight={Math.round(height)}
      glowColor="#ffb224"
      enableSpotlight
      spotlightRadius={62}
      enableBorderGlow
      enableStars={false}
      clickEffect
      intro={false}
      textAutoHide={false}
      style={tune}
      items={[
        {
          id: seg.id,
          title: seg.name,
          content: body,
          onClick: (e) => {
            /* 公司行自己处理（stopPropagation），这里只接卡片本体 */
            if ((e.target as HTMLElement).closest("[data-co]")) return;
            onFocus();
          },
        },
      ]}
    />
  );
}

function CompanyRow({ co, onPick, onArm }: { co: ChainCompany; onPick: () => void; onArm: () => void }) {
  const listed = isListed(co);
  return (
    <button
      data-co
      onClick={(e) => {
        e.stopPropagation();
        /* 票就是入口：一下直接进阅读链路，不先弹侧栏。
           未上市的没有披露可读，点了只是把这个环节选上。 */
        if (listed) {
          onPick();
          return;
        }
        onArm();
      }}
      className={`relative flex w-full items-center gap-2 border-b border-rule px-3 text-left transition-colors last:border-b-0 ${
        listed ? "hover:bg-surface" : ""
      }`}
      style={{ height: CO_H, cursor: listed ? undefined : "default" }}
      title={!listed ? `${co.name} · 未上市，无披露` : `${co.name} · 进七类材料`}
    >
      {co.role === "leader" && (
        <span className={`absolute top-0 bottom-0 left-0 w-[2px] ${listed ? "bg-ink-900" : "bg-rule-strong"}`} aria-hidden />
      )}
      <span
        className="shrink-0 font-mono text-[11.5px] leading-none tracking-[0.02em]"
        style={{
          color: listed ? "var(--color-ink-900)" : "var(--color-ink-400)",
          fontWeight: co.role === "leader" ? 500 : 400,
        }}
      >
        {listed ? co.ticker : "未上市"}
      </span>
      {co.name.trim().toLowerCase() !== co.ticker.trim().toLowerCase() && (
        <span className={`min-w-0 flex-1 truncate text-[12px] leading-none ${listed ? "text-ink-700" : "text-ink-400"}`}>
          {co.name}
        </span>
      )}
    </button>
  );
}

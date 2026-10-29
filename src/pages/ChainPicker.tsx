import { useEffect, useState } from "react";
import { loadChainIndex, type ChainMeta } from "../lib/chain";
import ProfileCard from "../components/vendor/ProfileCard";

/** 三条链各一张配图（黑白工业摄影，白纸页面上才不打架） */
const COVER: Record<string, string> = {
  "ai-compute": "/chain/ai-data-center.png",
  autonomous: "/chain/autonomous-highway.png",
  robotics: "/chain/robotics-joint.png",
};

/**
 * 产业链选择页（第 0 层）。
 *
 * 三张 React Bits ProfileCard：指针驱动 3D 倾斜 + 视差 + 全息箔。
 * 卡片承担全部信息：配图、链名、一句话、英文名、环节/公司数、进入按钮。
 * 未开的链不隐藏也不伪造数据，降饱和 + 按钮变「筹备中」且不可点。
 */
export function ChainPicker() {
  const [chains, setChains] = useState<ChainMeta[] | null>(null);

  useEffect(() => {
    loadChainIndex().then(setChains);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paper">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-rule px-8">
        <span className="block h-[10px] w-[10px] bg-ink-900" aria-hidden />
        <span className="text-[13px] font-semibold tracking-[0.16em] text-ink-900">INVESTSIGH</span>
        <span className="text-[12.5px] text-ink-300">/</span>
        <span className="text-[12.5px] text-ink-500">产业链</span>
      </header>

      <div className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1240px] px-8 py-10">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-ink-400">Step 0</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="font-mono text-[12px] text-ink-400 tnum">{chains?.length ?? 0} 条链</span>
          </div>

          <h1 className="mt-4 text-[32px] leading-[1.25] font-medium tracking-[-0.02em] text-ink-900">
            先选一条链
          </h1>
          <p className="mt-3 max-w-[620px] text-[14.5px] leading-[1.8] text-ink-500">
            每条链按「上游 → 下游」切成环节，企业在环节内落位。选定公司后再进七类材料。
          </p>

          <div className="mt-9 flex flex-nowrap items-start justify-center gap-x-6">
            {(chains ?? []).map((c) => {
              const ready = c.status === "ready";
              return (
                <div key={c.id} className="flex flex-col items-center gap-3">
                  <ProfileCard
                    avatarUrl={COVER[c.id] ?? ""}
                    name={c.name}
                    title={c.oneLiner}
                    handle={c.en}
                    status={ready ? `${c.segments} 环节 · ${c.companies} 家公司` : "筹备中 · 尚未建链"}
                    statusColor={ready ? "#22c55e" : "#9a9a9a"}
                    contactText={ready ? "进入" : "筹备中"}
                    onContactClick={() => {
                      if (ready) location.hash = `#/chain/${c.id}`;
                    }}
                    className={`chain-xl ${ready ? "" : "profile-card--idle"}`}
                    radius={3}
                    holo={0.5}
                    glare={0.45}
                    tiltStrength={9}
                    parallax={7}
                    intro={false}
                  />
                  {!ready && (
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-300">
                      等待建链
                    </span>
                  )}
                </div>
              );
            })}

            {!chains && <p className="text-[14px] text-ink-400">载入中…</p>}
          </div>

          <p className="mx-auto mt-12 max-w-[760px] border-l-2 border-rule pl-4 text-[12.5px] leading-[1.85] text-ink-400">
            环节切分与公司归属是草案，基于公开产业研究整理，未逐家核对，也不含市占率与财务数字。
            配图为黑白工业摄影，只为区分三条链的质感，不承载信息。
          </p>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { companiesOf, isListed, loadChain, orderedSegments, type ChainDoc } from "../lib/chain";

/**
 * 标的切换器：顶栏那颗「标的 MU」是可点的。
 *
 * 列表按当前链的环节分组，一家一行；未上市的灰掉不可选。
 * 切换只改 URL 的 ticker 参数（history.replaceState），不刷新页面、不丢滚动位置。
 */
export function TickerPicker({
  chainId,
  ticker,
  onChange,
}: {
  chainId?: string;
  ticker?: string;
  onChange: (t: string | undefined) => void;
}) {
  // ?topen=1 可直接展开（截图与深链用）
  const [open, setOpen] = useState(() => new URLSearchParams(location.search).get("topen") === "1");
  const [doc, setDoc] = useState<ChainDoc | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chainId) {
      setDoc(null);
      return;
    }
    loadChain(chainId).then(setDoc);
  }, [chainId]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  const pick = (t: string | undefined) => {
    onChange(t);
    setOpen(false);
  };

  const segments = doc ? orderedSegments(doc) : [];
  const current = doc?.companies.find((c) => c.ticker === ticker);

  return (
    <div ref={boxRef} className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 border px-2 py-1 font-mono text-[11.5px] transition-colors"
        style={{
          borderColor: ticker ? "var(--color-ink-900)" : "var(--color-rule-strong)",
          color: ticker ? "var(--color-ink-900)" : "var(--color-ink-500)",
        }}
        title={chainId ? "切换标的" : "先选一条产业链"}
      >
        <span className="text-ink-400">标的</span>
        <span className="font-medium">{ticker ?? "未选"}</span>
        {current && <span className="max-w-[72px] truncate text-ink-500">{current.name}</span>}
        <ChevronDown size={12} strokeWidth={2} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 z-[80] mt-1 w-[336px] border border-ink-900"
          style={{ background: "#ffffff", boxShadow: "5px 7px 0 rgba(16,16,16,0.10)" }}
        >
          {!chainId ? (
            <div className="px-4 py-4">
              <p className="text-[13px] leading-[1.7] text-ink-700">
                当前没有挂产业链上下文。先选一条链，再从这里切换标的。
              </p>
              <a
                href="#/chain"
                className="mt-3 inline-block border border-ink-900 px-3 py-1.5 text-[12.5px] text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper"
              >
                去选链 →
              </a>
            </div>
          ) : !doc ? (
            <p className="px-4 py-4 text-[13px] text-ink-400">载入中…</p>
          ) : (
            <>
              <div className="flex items-center gap-2 border-b border-rule px-3 py-2">
                <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-ink-400">
                  {doc.name}
                </span>
                <span className="ml-auto font-mono text-[10.5px] text-ink-400 tnum">
                  {doc.companies.filter((c) => isListed(c)).length} 可选
                </span>
              </div>

              <div className="max-h-[380px] overflow-y-auto">
                {segments.map((seg) => {
                  const list = companiesOf(doc, seg.id).filter((c) => isListed(c));
                  if (!list.length) return null;
                  return (
                    <div key={seg.id}>
                      <div className="sticky top-0 border-b border-rule bg-surface px-3 py-1">
                        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-500">
                          {seg.name}
                        </span>
                      </div>
                      {list.map((co) => {
                        const usable = true;
                        const on = co.ticker === ticker;
                        return (
                          <button
                            key={co.ticker + co.name}
                            disabled={!usable}
                            onClick={() => usable && pick(co.ticker)}
                            className={`flex w-full items-center gap-2 px-3 py-1.5 text-left transition-colors ${
                              usable ? "hover:bg-surface-2" : "cursor-not-allowed"
                            }`}
                          >
                            <span
                              className={`w-[62px] shrink-0 font-mono text-[11.5px] ${
                                on ? "font-medium text-ink-900" : usable ? "text-ink-700" : "text-ink-300"
                              }`}
                            >
                              {usable ? co.ticker : "—"}
                            </span>
                            <span className={`truncate text-[12.5px] ${usable ? "text-ink-500" : "text-ink-300"}`}>
                              {co.name}
                            </span>
                            <span className="ml-auto font-mono text-[10px] text-ink-300">{co.market}</span>
                            {on && <Check size={12} strokeWidth={2.4} className="shrink-0 text-accent" />}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {(() => {
                const hidden = doc.companies.filter((c) => !isListed(c)).length;
                return hidden > 0 ? (
                  <p className="border-t border-rule px-3 py-1.5 font-mono text-[10.5px] text-ink-300">
                    另有 {hidden} 家未上市，不可选
                  </p>
                ) : null;
              })()}
              <button
                onClick={() => pick(undefined)}
                className="w-full border-t border-rule px-3 py-2 text-left font-mono text-[11px] tracking-[0.08em] text-ink-500 transition-colors hover:bg-surface-2 hover:text-ink-900"
              >
                清除标的（看全量）
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

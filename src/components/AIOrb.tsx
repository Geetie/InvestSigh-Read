import { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowUp, X, CornerDownLeft } from "lucide-react";
import { swatchOf, shortDay } from "../lib/data";
import type { Material } from "../lib/types";

/**
 * 悬浮球：唤出 / 收起 AI 输入框。
 * 58px 的圆形新拟态键 —— 唯一允许「软」的地方，因为它能被按下去。
 * 开启态变成 10px 圆角黑底白叉。
 */
export function AIBall({ open, onToggle }: { open: boolean; onToggle: () => void; catId: string }) {
  return (
    <button
      onClick={onToggle}
      aria-label={open ? "收起 AI 输入框" : "唤出 AI 输入框"}
      className="group absolute right-6 bottom-6 z-40 flex h-[58px] w-[58px] items-center justify-center bg-surface transition-all duration-150 hover:-translate-y-px active:translate-y-0"
      style={{
        borderRadius: open ? 10 : "50%",
        background: open ? "var(--color-ink-900)" : "var(--color-surface)",
        boxShadow: open ? "none" : "var(--shadow-neu-raised)",
      }}
    >
      {open ? (
        <X size={18} strokeWidth={2} color="var(--color-paper)" className="relative" />
      ) : (
        <Sparkles size={19} strokeWidth={1.6} color="var(--color-ink-900)" className="relative" />
      )}
      <span className="pointer-events-none absolute right-[68px] bottom-2 border border-rule bg-paper px-2 py-1 font-mono text-[11px] tracking-[0.06em] whitespace-nowrap text-ink-700 opacity-0 transition-opacity group-hover:opacity-100">
        {open ? "收起 · ⌘K" : "AI 阅读 · ⌘K"}
      </span>
    </button>
  );
}

/* 推入式对话面板：挤压宽度而非覆盖 */
export function AIPanel({
  open,
  catId,
  catName,
  subName,
  date,
  materials,
}: {
  open: boolean;
  catId: string;
  catName: string;
  subName: string;
  date: string;
  materials: Material[];
}) {
  const sw = swatchOf(catId);
  const [draft, setDraft] = useState("");
  const [log, setLog] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const gaps = materials.reduce((a, m) => a + (m.total - m.filled), 0);
    const blanks = materials.filter((m) => m.filled === 0).length;
    setLog([
      {
        role: "ai",
        text: `已挂上上下文：${catName} · ${subName} · ${shortDay(date)}。${materials.length} 份材料，${
          materials.length * (materials[0]?.total ?? 0)
        } 个待填格，${gaps} 格材料给不了${blanks ? `，其中 ${blanks} 份是空回执` : ""}。`,
      },
    ]);
  }, [open, catId, subName, date]);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: 9e6, behavior: "smooth" });
  }, [log]);

  const ask = (q: string) => {
    const text = q.trim();
    if (!text) return;
    setDraft("");
    setLog((l) => [
      ...l,
      { role: "user", text },
      {
        role: "ai",
        text: `（原型）按当前上下文取数：${shortDay(date)} 的 ${materials.length} 份材料，缺格已区分「材料未提供」与「未读到」。接后端后这里返回逐格出处与原文段落。`,
      },
    ]);
  };

  return (
    <aside
      className="relative z-30 flex min-w-0 shrink-0 flex-col overflow-hidden transition-[width,opacity] duration-500 ease-[cubic-bezier(0.22,0.9,0.24,1)]"
      style={{
        width: open ? 368 : 0,
        opacity: open ? 1 : 0,
        boxShadow: open ? "inset 1px 0 0 var(--color-rule)" : "none",
        background: "var(--color-paper)",
      }}
    >
      <div className="flex h-full shrink-0 flex-col" style={{ width: 368 }}>
        <div className="flex items-center gap-2 border-b border-rule px-4 py-3">
          <span className="flex h-6 w-6 items-center justify-center bg-ink-900">
            <Sparkles size={12} color="var(--color-paper)" strokeWidth={1.8} />
          </span>
          <span className="text-[14px] font-medium text-ink-900">AI 阅读助手</span>
          <span className="ml-auto font-mono text-[11px] tracking-[0.08em] text-ink-400">⌘K</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-b border-rule px-4 py-2.5">
          {[catName, subName, shortDay(date)].map((t) => (
            <span
              key={t}
              className="px-1.5 py-[2px] font-mono text-[11px] tracking-[0.04em]"
              style={{ color: "var(--color-ink-700)", boxShadow: "inset 0 0 0 1px var(--color-rule-strong)" }}
            >
              {t}
            </span>
          ))}
          <span className="ml-auto font-mono text-[11px] text-ink-400 tnum">{materials.length} 份</span>
        </div>

        {/* 上下文读数 */}
        <div className="grid grid-cols-3 border-b border-rule">
          {[
            { k: "材料", v: String(materials.length) },
            { k: "待填行", v: String(materials.length * (materials[0]?.total ?? 0)) },
            { k: "材料给不了", v: String(materials.reduce((a, m) => a + (m.total - m.filled), 0)) },
          ].map((x) => (
            <div key={x.k} className="flex flex-col gap-1 border-r border-rule px-3 py-2.5 last:border-r-0">
              <span className="label-xs">{x.k}</span>
              <span className="font-mono text-[17px] leading-none tnum text-ink-900">{x.v}</span>
            </div>
          ))}
        </div>

        <div ref={boxRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {log.map((l, i) =>
            l.role === "ai" ? (
              <div key={i} className="flex gap-2">
                <span className="mt-2 block h-3 w-[2px] shrink-0 bg-ink-900" aria-hidden />
                <p className="text-[14px] leading-[1.75] text-ink-700">{l.text}</p>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <p className="max-w-[86%] bg-surface-2 px-2.5 py-1.5 text-[14px] leading-[1.6] text-ink-900">
                  {l.text}
                </p>
              </div>
            ),
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 px-4 pb-2">
          {["缺的行是材料没有还是没读到", "哪几格最该先补", "跨日对比同一行"].map((q) => (
            <button
              key={q}
              onClick={() => ask(q)}
              className="border border-rule-strong px-2 py-[3px] text-[12px] text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="px-3 pb-3">
          <div
            className="flex items-end gap-2 px-3 py-2"
            style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-neu-inset)" }}
          >
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  ask(draft);
                }
              }}
              rows={1}
              placeholder="问这份材料、这一行、或跨日变化…"
              className="max-h-24 min-h-[22px] flex-1 resize-none bg-transparent text-[14px] leading-[1.6] text-ink-900 outline-none placeholder:text-ink-400"
            />
            <button
              onClick={() => ask(draft)}
              className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center transition-colors"
              style={{ background: draft.trim() ? "var(--color-ink-900)" : "var(--color-rule)" }}
            >
              <ArrowUp size={13} strokeWidth={2.4} color={draft.trim() ? "#ffffff" : "#767676"} />
            </button>
          </div>
          <div className="mt-1.5 flex items-center gap-1 px-1 font-mono text-[11px] tracking-[0.04em] text-ink-400">
            <CornerDownLeft size={9} />
            <span>发送 · Shift+Enter 换行 · Esc 收起</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

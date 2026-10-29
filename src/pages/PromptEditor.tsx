import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, GripVertical, Plus, Trash2, Undo2 } from "lucide-react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Index } from "../lib/data";
import { catInk } from "../lib/palette";
import type { PromptRow } from "../lib/prompts";
import { savePrompt, subscribePrompts, todayISO, versionAt, versionsOf } from "../lib/prompts";
import Magnet from "../components/vendor/Magnet";

/**
 * 提示词的**结构编辑**：增、删、调序，加上原有的改措辞与改读法。
 *
 * 行 id 是**不透明的主键**，不是序号：
 *  · 界面显示的是位置（01、02…），不是 id —— 所以拖动换序不动 id；
 *  · 新行拿一个从未用过的号（`Q<最大号+1>`），**删掉的号不回收** ——
 *    否则旧材料里那条答案会串到新问题上（答案是按 id 存的）；
 *  · 删一行不删任何答案：旧材料仍解析到它生成时那一版，那一版里这行还在。
 *
 * 排序用 @dnd-kit/sortable（生态标准件，核心 6KB、键盘可操作），
 * 同时保留 ↑↓ / ←→ 作为精确微调与无障碍的退路 —— 表单类产品都两条路都给。
 *
 * 版式仍是「一条索引 + 一张文档页」：中间那块是主体，问题与读法同字号（36px），
 * 靠字重、墨色和那根 2px 墨线区分，不靠字号。
 */

export function PromptEditor({ idx, subId: initial }: { idx: Index; subId?: string }) {
  /* prompts 从后端回来是异步的：rev 变化要重载草稿，否则首屏拿到的是空表 */
  const [rev, bump] = useState(0);
  useEffect(() => subscribePrompts(() => bump((v) => v + 1)), []);

  const all = useMemo(
    () => idx.cats.flatMap((c) => c.subtypes.map((s) => ({ cat: c, sub: s }))),
    [idx],
  );

  const [subId, setSubId] = useState(() => initial ?? all[0]?.sub.id ?? "");

  /* ★ 路由里的 `subId` 变了要跟着换 —— 否则在提示词页内部把 hash 从
     `#/prompts/insider-filing` 改成 `#/prompts/05-AIMAP`（点站内锚点、
     或用户直接改地址栏）时，编辑器仍停在原来那一型，看起来像"新册打不开"。
     首次挂载时 initial 已由 useState 初始化，这里只处理后续变化。 */
  useEffect(() => {
    if (initial && initial !== subId) setSubId(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  const cur = all.find((x) => x.sub.id === subId);
  const cat = cur?.cat;
  const sub = cur?.sub;

  const today = todayISO();
  const live = sub ? versionAt(sub.id, today, sub.rows) : undefined;
  const total = sub ? versionsOf(sub.id).length : 0;

  const [draft, setDraft] = useState<PromptRow[]>([]);
  const [sel, setSel] = useState(0);
  const [saved, setSaved] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [undo, setUndo] = useState<{ row: PromptRow; at: number } | null>(null);

  /* rev 变化时重载草稿（后端刚回包）；但**不能顺手清掉回执** ——
     savePrompt() 内部会 emit()，rev 一变这个 effect 就跑，
     把刚设好的「已保存 · 第 N 版」冲成 null，于是保存看起来毫无反馈。
     ⇒ 回执与撤销提示只在**换型**时清，草稿本身才跟着 rev 重载。 */
  const prevSub = useRef<string | null>(null);
  useEffect(() => {
    if (!sub) return;
    setDraft(versionAt(sub.id, today, sub.rows).rows.map((r) => ({ ...r })));
    if (prevSub.current !== sub.id) {
      setSel(0);
      setSaved(null);
      setUndo(null);
      prevSub.current = sub.id;
    }
  }, [subId, rev]);

  const row = draft[sel];
  const ink = cat ? catInk(cat.id).ink : "var(--color-ink-900)";

  /* 用过的 id（跨所有版本，含已删）—— 新行不回收这些号 */
  const usedIds = useMemo(() => {
    const set = new Set<string>();
    if (sub) versionsOf(sub.id).forEach((v) => v.rows.forEach((r) => set.add(r.id)));
    draft.forEach((r) => set.add(r.id));
    return set;
  }, [sub, draft]);

  const nextRowId = () => {
    let max = 0;
    for (const id of usedIds) {
      const n = Number((id.match(/(\d+)\s*$/) ?? [])[1] ?? 0);
      if (Number.isFinite(n)) max = Math.max(max, n);
    }
    return `Q${max + 1}`;
  };

  const changed = (r: PromptRow, i: number) =>
    r.label !== live?.rows[i]?.label ||
    r.reading !== live?.rows[i]?.reading ||
    r.kind !== live?.rows[i]?.kind;

  const diff = useMemo(() => {
    const prev = new Map((live?.rows ?? []).map((r) => [r.id, r]));
    const now = new Set(draft.map((r) => r.id));
    let edited = 0;
    for (const r of draft) {
      const p = prev.get(r.id);
      if (p && (p.label !== r.label || p.reading !== r.reading || p.kind !== r.kind)) edited += 1;
    }
    const added = draft.filter((r) => !prev.has(r.id)).length;
    const removed = (live?.rows ?? []).filter((r) => !now.has(r.id)).length;
    const moved =
      added === 0 && removed === 0 && draft.some((r, i) => (live?.rows[i]?.id ?? r.id) !== r.id);
    return { edited, added, removed, moved, dirty: edited > 0 || added > 0 || removed > 0 || moved };
  }, [draft, live]);

  const patch = (p: Partial<PromptRow>) => setDraft((d) => d.map((x, k) => (k === sel ? { ...x, ...p } : x)));

  /* ── 增 / 删 ── */

  const addRow = () => {
    const r: PromptRow = { id: nextRowId(), label: "", reading: "", kind: "question", fill: "likely" };
    setDraft((d) => [...d, r]);
    setSel(draft.length);
    requestAnimationFrame(() => document.querySelector<HTMLTextAreaElement>("[data-q-input]")?.focus());
  };

  const removeRow = (i: number) => {
    const gone = draft[i];
    if (!gone) return;
    setDraft((d) => d.filter((_, k) => k !== i));
    setSel((v) => Math.max(0, Math.min(draft.length - 2, v > i ? v - 1 : v)));
    setUndo({ row: gone, at: i });
    window.setTimeout(() => setUndo((u) => (u && u.row.id === gone.id ? null : u)), 6000);
  };

  const undoRemove = () => {
    if (!undo) return;
    const { row: back, at } = undo;
    setDraft((d) => {
      const next = d.slice();
      next.splice(Math.min(at, next.length), 0, back);
      return next;
    });
    setUndo(null);
  };

  /* ── 排序 ── */

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const from = draft.findIndex((r) => r.id === active.id);
    const to = draft.findIndex((r) => r.id === over.id);
    if (from < 0 || to < 0) return;
    setDraft((d) => arrayMove(d, from, to));
    setSel(to);
  };

  /* ── 保存 ── */

  const save = async () => {
    if (!sub || saving) return;
    /* 行没有问题是存不进去的（后端也会拒），先在这里拦住并指到那一行 */
    const empty = draft.findIndex((r) => !r.label.trim());
    if (empty >= 0) {
      setSel(empty);
      setSaved(`第 ${empty + 1} 条还没写问题`);
      return;
    }
    setSaving(true);
    try {
      const set = await savePrompt(
        sub.id,
        draft.map((r) => ({ id: r.id, label: r.label, reading: r.reading, kind: r.kind })),
        today,
      );
      setSaved(`已保存 · 第 ${set.version} 版，${set.effectiveFrom} 起生效`);
    } catch {
      setSaved("保存失败，看后端");
    } finally {
      setSaving(false);
    }
  };

  /* ── 键盘 ── */

  const countRef = useRef(0);
  countRef.current = draft.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t?.tagName === "INPUT" || t?.tagName === "TEXTAREA";
      if (e.key === "Escape") {
        if (typing) {
          (t as HTMLInputElement).blur();
          return;
        }
        location.hash = "";
        return;
      }
      if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && !typing) {
        e.preventDefault();
        const step = e.key === "ArrowRight" ? 1 : -1;
        setSel((v) => Math.max(0, Math.min(countRef.current - 1, v + step)));
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, []);

  const status = saved
    ? saved
    : diff.dirty
      ? [diff.added ? `新增 ${diff.added}` : "", diff.removed ? `删除 ${diff.removed}` : "", diff.edited ? `改动 ${diff.edited}` : "", diff.moved ? "已调序" : ""]
          .filter(Boolean)
          .join(" · ")
      : `已是最新 · 共 ${total} 版`;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paper">
      <header className="flex h-[68px] shrink-0 items-center gap-5 border-b border-rule px-8">
        <a
          href="#"
          aria-label="返回看板"
          title="返回看板"
          className="flex h-10 w-10 items-center justify-center border border-rule-strong text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
        >
          <ArrowLeft size={16} strokeWidth={1.8} />
        </a>

        <div className="flex items-baseline gap-3">
          <span className="text-[16px] font-medium tracking-[-0.01em] text-ink-900">提示词</span>
          <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-300">
            问题 · 读法
          </span>
        </div>

        {cat && (
          <div className="flex items-baseline gap-2 border-l border-rule pl-5 text-[13px] text-ink-500">
            <span className="font-mono text-[11px] text-ink-300 tnum">{cat.id}</span>
            <span>{cat.name}</span>
            <span className="text-ink-300">/</span>
            <span className="text-ink-900">{sub?.name}</span>
          </div>
        )}

        <div className="ml-auto flex items-center gap-5">
          <span
            className="font-mono text-[12px]"
            style={{ color: diff.dirty ? "var(--color-accent)" : "var(--color-ink-500)" }}
          >
            {status}
          </span>
          <Magnet padding={48} magnetStrength={11} maxOffset={4} disabled={!diff.dirty}>
            <button
              onClick={save}
              disabled={!diff.dirty || saving}
              className={`flex h-10 items-center gap-2 border px-5 text-[14px] transition-colors ${
                diff.dirty
                  ? "border-ink-900 bg-ink-900 text-paper hover:bg-paper hover:text-ink-900"
                  : "border-rule text-ink-300"
              }`}
            >
              <Check size={15} strokeWidth={2.2} />
              保存
            </button>
          </Magnet>
        </div>
      </header>

      {/* 型切换 */}
      <div className="relative z-10 shrink-0 border-b border-rule">
        <div className="scrollbar-none flex h-[58px] items-stretch overflow-x-auto px-8">
          {cat?.subtypes.map((s, i) => {
            const on = s.id === subId;
            return (
              <button
                key={s.id}
                onClick={() => setSubId(s.id)}
                className="group relative flex shrink-0 items-end pr-7 pb-3 pl-7 text-left first:pl-0"
              >
                {i > 0 && <span className="absolute top-3 bottom-4 left-0 w-px bg-rule" aria-hidden />}
                <span
                  className="text-[15px] leading-none transition-colors"
                  style={{ color: on ? "var(--color-ink-900)" : "var(--color-ink-500)", fontWeight: on ? 600 : 400 }}
                >
                  {s.name}
                </span>
                <span
                  className="pointer-events-none absolute right-7 bottom-0 left-7 h-[2px] transition-opacity"
                  style={{ background: "var(--color-accent)", opacity: on ? 1 : 0 }}
                  aria-hidden
                />
              </button>
            );
          })}
          {cat && (
            <span className="ml-auto flex shrink-0 items-center pb-3 pl-8 font-mono text-[12px] tracking-[0.04em] text-ink-300">
              保存后 {today} 起生效 · 此前日期仍用旧版
            </span>
          )}
        </div>
        <div className="h-px w-full" style={{ background: ink, opacity: 0.38 }} aria-hidden />
      </div>

      <div className="flex min-h-0 flex-1">
        {/* 条目索引：可拖、可删、可加 */}
        <nav className="flex w-[360px] shrink-0 flex-col border-r border-rule">
          <div
            className="flex shrink-0 items-baseline gap-2 bg-paper px-5 pb-2.5"
            style={{ borderBottom: "2px solid var(--color-ink-900)", paddingTop: 16 }}
          >
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-500">index</span>
            <span className="tnum ml-auto font-mono text-[12px] text-ink-500">{draft.length}</span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={draft.map((r) => r.id)} strategy={verticalListSortingStrategy}>
                {draft.map((r, i) => (
                  <SortableRow
                    key={r.id}
                    row={r}
                    no={String(i + 1).padStart(2, "0")}
                    active={i === sel}
                    marker={r.kind === "data" ? ink : "var(--color-ink-900)"}
                    touched={!live?.rows.some((p) => p.id === r.id) || changed(r, i)}
                    onSelect={() => setSel(i)}
                    onRemove={() => removeRow(i)}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <button
              onClick={addRow}
              className="mt-2 flex w-full items-center gap-2 border border-dashed border-rule-strong py-3 pl-4 text-[13px] text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900"
            >
              <Plus size={14} strokeWidth={2} />
              新增一条问题
            </button>
          </div>

          {undo && (
            <div className="flex shrink-0 items-center gap-2 border-t border-rule bg-surface px-5 py-2.5 text-[12px] text-ink-500">
              <span>已删除 {undo.row.id}</span>
              <button
                onClick={undoRemove}
                className="ml-auto flex items-center gap-1.5 border border-rule-strong px-2 py-1 text-[11.5px] text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
              >
                <Undo2 size={12} strokeWidth={2} />
                撤销
              </button>
            </div>
          )}
        </nav>

        {/* 文档页 */}
        {row ? (
          <div className="min-w-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[880px] px-14 pt-12 pb-20">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => patch({ kind: row.kind === "data" ? "question" : "data" })}
                  title="切换：问 / 数"
                  className="px-1.5 font-mono text-[11px] leading-[16px] tracking-[0.08em] transition-opacity hover:opacity-70"
                  style={{
                    color: row.kind === "data" ? ink : "var(--color-ink-900)",
                    boxShadow: `inset 0 0 0 1px ${row.kind === "data" ? ink : "var(--color-ink-900)"}`,
                  }}
                >
                  {row.kind === "data" ? "数" : "问"}
                </button>
                <span className="h-px w-7 bg-rule-strong" />
                <span className="font-mono text-[14px] font-medium text-ink-900">{row.id}</span>
                <span className="tnum font-mono text-[13px] text-ink-300">
                  {String(sel + 1).padStart(2, "0")} / {String(draft.length).padStart(2, "0")}
                </span>

                <div className="ml-auto flex items-center">
                  <button
                    onClick={() => setSel((v) => Math.max(0, v - 1))}
                    disabled={sel === 0}
                    className="flex h-9 w-9 items-center justify-center border border-rule text-ink-700 transition-colors enabled:hover:border-ink-900 enabled:hover:text-ink-900 disabled:text-ink-300"
                    title="上一条（←）"
                  >
                    <ChevronLeft size={15} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => setSel((v) => Math.min(draft.length - 1, v + 1))}
                    disabled={sel >= draft.length - 1}
                    className="-ml-px flex h-9 w-9 items-center justify-center border border-rule text-ink-700 transition-colors enabled:hover:border-ink-900 enabled:hover:text-ink-900 disabled:text-ink-300"
                    title="下一条（→）"
                  >
                    <ChevronRight size={15} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => removeRow(sel)}
                    className="ml-2 flex h-9 items-center gap-1.5 border border-rule px-2.5 text-[12px] text-ink-500 transition-colors hover:border-accent hover:text-accent"
                    title="删掉这一条"
                  >
                    <Trash2 size={13} strokeWidth={1.9} />
                    删除
                  </button>
                </div>
              </div>

              <div className="relative mt-9">
                <MarginNote>问题</MarginNote>
                <AutoTextarea
                  qInput
                  value={row.label}
                  onChange={(v) => patch({ label: v })}
                  minH={48}
                  placeholder="让 Agent 回答什么"
                  className="text-[36px] leading-[1.28] font-medium tracking-[-0.018em] text-ink-900 placeholder:text-ink-300"
                />
              </div>

              <div className="mt-8 mb-8 h-[2px] w-full bg-ink-900" />

              <div className="relative">
                <MarginNote>读法</MarginNote>
                <AutoTextarea
                  value={row.reading}
                  onChange={(v) => patch({ reading: v })}
                  minH={62}
                  placeholder="允许用什么证据 · 口径怎么对齐 · 材料没写时怎么办"
                  className="text-[36px] leading-[1.55] font-normal tracking-[-0.012em] text-ink-700 placeholder:text-[18px] placeholder:leading-[1.7] placeholder:text-ink-300"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <p className="text-[14px] text-ink-400">这个型还没有问题条目</p>
            <button
              onClick={addRow}
              className="flex items-center gap-2 border border-ink-900 bg-ink-900 px-4 py-2 text-[13px] text-paper transition-colors hover:bg-paper hover:text-ink-900"
            >
              <Plus size={14} strokeWidth={2} />
              新增一条
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────── 可拖的索引行 ───────── */

function SortableRow({
  row,
  no,
  active,
  marker,
  touched,
  onSelect,
  onRemove,
}: {
  row: PromptRow;
  no: string;
  active: boolean;
  marker: string;
  touched: boolean;
  onSelect: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`group relative flex items-center border-b border-rule ${
        isDragging ? "z-10 bg-paper shadow-[0_8px_24px_-12px_rgba(24,24,27,.35)]" : ""
      }`}
    >
      <span className="absolute inset-y-0 left-0 w-[2px]" style={{ background: marker }} aria-hidden />

      {/* 抓手：只有这里能发起拖动；点行本身是选中 */}
      <button
        {...attributes}
        {...listeners}
        className="flex w-7 shrink-0 cursor-grab items-center justify-center self-stretch pl-2 text-ink-300 opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
        title="拖动排序"
        aria-label="拖动排序"
      >
        <GripVertical size={13} strokeWidth={2} />
      </button>

      <button
        onClick={onSelect}
        className="flex min-w-0 flex-1 items-center gap-3 py-[15px] pr-1 pl-1 text-left"
      >
        <span
          className="w-[24px] shrink-0 font-mono text-[11px] tnum"
          style={{ color: active ? "var(--color-ink-900)" : "var(--color-ink-400)" }}
        >
          {no}
        </span>
        <span
          className="min-w-0 flex-1 truncate text-[15px] leading-[1.45]"
          style={{ color: active ? "var(--color-ink-900)" : "var(--color-ink-700)", fontWeight: active ? 600 : 400 }}
        >
          {row.label || <span className="text-ink-300">（空）</span>}
        </span>
        {touched && (
          <span className="h-[5px] w-[5px] shrink-0" style={{ background: "var(--color-accent)" }} aria-hidden />
        )}
      </button>

      <button
        onClick={onRemove}
        className="flex w-8 shrink-0 items-center justify-center self-stretch pr-1 text-ink-300 opacity-0 transition-opacity hover:text-accent group-hover:opacity-100"
        title="删掉这一条"
        aria-label="删掉这一条"
      >
        <Trash2 size={12} strokeWidth={1.9} />
      </button>
    </div>
  );
}

/* ───────── 小组件 ───────── */

function MarginNote({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute top-[15px] -left-[76px] w-[56px] text-right font-mono text-[11px] leading-none tracking-[0.14em] text-ink-300">
      {children}
    </span>
  );
}

function AutoTextarea({
  value,
  onChange,
  className,
  minH,
  placeholder,
  qInput,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  minH?: number;
  placeholder?: string;
  qInput?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(minH ?? 0, el.scrollHeight)}px`;
  }, [value, minH]);
  return (
    <textarea
      ref={ref}
      rows={1}
      data-q-input={qInput ? "" : undefined}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      spellCheck={false}
      className={`block w-full resize-none border-0 bg-transparent p-0 outline-none ${className ?? ""}`}
    />
  );
}

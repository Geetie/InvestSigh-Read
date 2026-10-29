import { useCallback, useEffect, useMemo, useState } from "react";
import { TopBar } from "./components/TopBar";
import { CategoryRail, countByCat } from "./components/CategoryRail";
import { SubtypeBar } from "./components/SubtypeBar";
import { StageDay } from "./components/StageDay";
import { StageMatrix } from "./components/StageMatrix";
import { Timeline } from "./components/Timeline";
import { AIBall, AIPanel } from "./components/AIOrb";
import { DetailPage } from "./pages/DetailPage";
import { ChainPicker } from "./pages/ChainPicker";
import { ChainMap } from "./pages/ChainMap";
import { PromptEditor } from "./pages/PromptEditor";
import { closeDetail, replaceRow, useRoute } from "./lib/route";
import { BASELINE, ensureSeeded, rowsAt, subscribePrompts, syncPrompts, versionAt, versionsOf } from "./lib/prompts";
import type { Grain, Material } from "./lib/types";
import { buildIndex, groupByDay, loadBundle, materialsOf, rangeDays, shiftDay, swatchOf, type Index } from "./lib/data";

export default function App() {
  const [idx, setIdx] = useState<Index | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const [catId, setCatId] = useState("01");
  const [subId, setSubId] = useState("10-K");
  const [grain, setGrain] = useState<Grain>("day");
  const [focusDate, setFocusDate] = useState("2026-10-22");
  const [spacing, setSpacing] = useState(252);
  const [scrollX, setScrollX] = useState(0);
  const [aiOpen, setAiOpen] = useState(false);
  const route = useRoute();
  /* 提示词库变了要重算矩阵的行 */
  const [promptRev, bumpPrompt] = useState(0);
  useEffect(() => subscribePrompts(() => bumpPrompt((v) => v + 1)), []);
  const q0 = new URLSearchParams(location.search);
  const [ticker, setTicker] = useState<string | undefined>(q0.get("ticker") ?? undefined);
  const [chainId, setChainId] = useState<string | undefined>(q0.get("chain") ?? undefined);

  /* 切标的不刷新页面：只改 URL，保留滚动位置与选中日 */
  const pickTicker = useCallback((t?: string) => {
    setTicker(t);
    const q = new URLSearchParams(location.search);
    if (t) q.set("ticker", t);
    else q.delete("ticker");
    history.replaceState(null, "", `${location.pathname}?${q.toString()}`);
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    loadBundle()
      .then((b) => {
        const i = buildIndex(b);
        /* 提示词库首次使用时按内置模板种 v1（每个型一版） */
        i.cats.forEach((c) => c.subtypes.forEach((s) => ensureSeeded(s.id, s.rows)));
        /* http 模式下把该型的提示词从后端拉一遍，落进本地缓存 */
        void syncPrompts(i.cats.flatMap((c) => c.subtypes.map((s) => ({ id: s.id }))));
        setIdx(i);
        const catId0 = q.get("cat") ?? i.cats[0].id;
        const cat0 = i.cats.find((c) => c.id === catId0) ?? i.cats[0];
        const subId0 = q.get("sub") ?? cat0.subtypes[0].id;
        setCatId(cat0.id);
        setSubId(subId0);
        if (q.get("grain") === "minute") setGrain("minute");
        if (q.get("ai") === "1") setAiOpen(true);
        if (q.get("span")) setSpacing(Number(q.get("span")));
        const list = i.byCatSub.get(`${cat0.id}|${subId0}`) ?? [];
        const d = q.get("date") ?? (list.length ? list[list.length - 1].date : i.end);
        setFocusDate(d);
        // 打开即停在最新一日
        requestAnimationFrame(() => setScrollX(1e6));
      })
      .catch((e) => setErr(String(e)));
  }, []);

  const cat = useMemo(() => idx?.cats.find((c) => c.id === catId), [idx, catId]);
  const sub = useMemo(() => cat?.subtypes.find((s) => s.id === subId), [cat, subId]);

  const catMaterials = useMemo(
    () => (idx && cat ? cat.subtypes.flatMap((s) => materialsOf(idx, cat.id, s.id)) : []),
    [idx, cat],
  );
  const subMaterials = useMemo(
    () => (idx && cat && sub ? materialsOf(idx, cat.id, sub.id) : []),
    [idx, cat, sub],
  );

  /* 从产业链点标的上来的：只看这一家的材料。
     这一型下没有它的材料就退回全部并显式说明 —— 空屏比「没筛选」更糟。 */
  const scoped = useMemo(() => {
    if (!ticker) return null;
    const t = ticker.trim().toUpperCase();
    const hit = subMaterials.filter((m) => (m.ticker ?? "").trim().toUpperCase() === t);
    return { hit, empty: hit.length === 0 };
  }, [subMaterials, ticker]);
  const shownMaterials = scoped && scoped.hit.length ? scoped.hit : subMaterials;
  /* 时间轴按当前型的真实跨度生成。
     跨度 ≤ 45 天 → 连续日轴（一天一个点，空日也留着）；
     跨度更大（真实研报会散在半年里）→ 紧凑轴：只列「有材料的日子」，
     否则 12 份材料会被拉成 225 天的空条，什么都看不见。 */
  const axis = useMemo(() => {
    if (!idx) return { days: [], compact: false };
    if (!shownMaterials.length) return { days: idx.days, compact: false };
    const uniq = Array.from(new Set(shownMaterials.map((m) => m.date))).sort();
    const a = new Date(uniq[0] + "T00:00:00").getTime();
    const b = new Date(uniq[uniq.length - 1] + "T00:00:00").getTime();
    const span = Math.round((b - a) / 86400000);
    if (span <= 45) return { days: rangeDays(shiftDay(uniq[0], -2), shiftDay(uniq[uniq.length - 1], 2)), compact: false };
    return { days: uniq, compact: true };
  }, [idx, shownMaterials]);

  const activeDays = axis.days;
  const compactAxis = axis.compact;

  /* 换型时按跨度给一个合适的初始缩放（长窗口压缩、短窗口拉开） */
  useEffect(() => {
    if (!activeDays.length) return;
    const n = activeDays.length;
    setSpacing(compactAxis ? 252 : n > 45 ? 104 : 252);
    requestAnimationFrame(() => setScrollX(1e6));
  }, [catId, subId, activeDays.length, compactAxis]);

  const grouped = useMemo(() => groupByDay(shownMaterials), [shownMaterials]);
  const dayMaterials = useMemo(() => grouped.get(focusDate) ?? [], [grouped, focusDate]);

  /* 矩阵的行来自「该日生效的提示词版本」——不是内置模板。
     改了问题/读法之后，只有生效日及之后的日期会换，之前的日期仍解析到旧版。 */
  const promptRows = useMemo(
    () => (sub ? rowsAt(sub.id, focusDate, sub.rows) : []),
    [sub, focusDate, promptRev],
  );
  const promptVers = useMemo(() => (sub ? versionsOf(sub.id) : []), [sub, promptRev]);
  const promptVer = useMemo(
    () => (sub ? versionAt(sub.id, focusDate, sub.rows) : undefined),
    [sub, focusDate, promptRev],
  );
  /* 第几版（1 起）+ 是否已落后于最新 */
  const promptNo = promptVer ? promptVers.findIndex((v) => v.at === promptVer.at) + 1 : 0;
  const latestNo = promptVers.length;
  const rowCounts = useMemo(() => {
    const out: Record<string, number> = {};
    if (!cat) return out;
    for (const s of cat.subtypes) out[s.id] = rowsAt(s.id, focusDate, s.rows).length;
    return out;
  }, [cat, focusDate, promptRev]);
  const catCounts = useMemo(() => (idx ? countByCat(idx.cats.flatMap((c) => c.subtypes.flatMap((s) => materialsOf(idx, c.id, s.id)))) : {}), [idx]);

  const sw = swatchOf(catId);

  /* 换类：重置细分型到该类第一型 */
  const pickCat = useCallback(
    (id: string) => {
      if (!idx) return;
      const c = idx.cats.find((x) => x.id === id);
      if (!c) return;
      setCatId(id);
      const firstSub = c.subtypes[0].id;
      setSubId(firstSub);
      const list = materialsOf(idx, id, firstSub);
      if (list.length) setFocusDate(list[list.length - 1].date);
      setScrollX(1e6);
      setGrain("day");
    },
    [idx],
  );

  const pickSub = useCallback(
    (id: string) => {
      if (!idx || !cat) return;
      setSubId(id);
      const list = materialsOf(idx, cat.id, id);
      if (list.length) {
        const has = list.some((m) => m.date === focusDate);
        if (!has) setFocusDate(list[list.length - 1].date);
      }
      setScrollX(1e6);
    },
    [idx, cat, focusDate],
  );

  /* 键盘：⌘K 开关 AI，Esc 收起，←/→ 逐日 */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      /* 详情页先接管：否则 Esc 会同时关面板、←/→ 会换日期 */
      if (route.name === "detail") {
        if (e.key === "Escape") {
          closeDetail();
          return;
        }
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          /* ★ 不能用 `sub.rows`：http 模式下 getBundle 把 subtypes 的 rows 置成 []（行来自手册），
             那样列表恒空、上下键静默失效。必须和详情页一样走 rowsAt(按材料日期解析)。 */
          const m = idx?.byId.get(route.matId);
          const rws = m ? rowsAt(m.sub, m.date, sub?.rows ?? []) : (sub?.rows ?? []);
          const i = rws.findIndex((r) => r.id === route.rowId);
          const next = rws[i + (e.key === "ArrowDown" ? 1 : -1)];
          if (next) {
            e.preventDefault();
            replaceRow(next.id);
          }
          return;
        }
        /* ←→ 交给详情页自己处理（切换同一天的其他材料），这里必须直接返回，
           否则会继续往下走到「逐日」，把 background 的 focusDate 也改了 */
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setAiOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setAiOpen(false);
        return;
      }
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (!idx) return;
      /* 日粒度与时:分粒度都要能逐日切换 —— 矩阵页看不出「下一天」，键盘是唯一入口 */
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const step = e.key === "ArrowLeft" ? -1 : 1;
        let i = activeDays.indexOf(focusDate);
        if (i === -1) i = activeDays.findIndex((d) => d >= focusDate);
        if (i === -1) i = activeDays.length - 1;
        const n = activeDays[Math.min(activeDays.length - 1, Math.max(0, i + step))];
        if (n && n !== focusDate) setFocusDate(n);
      }
      if (e.key.toLowerCase() === "d") setGrain("day");
      if (e.key.toLowerCase() === "m") setGrain("minute");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, focusDate, activeDays, route, sub]);

  /* 材料 → 切到分时粒度看它那一列的逐行读数 */
  const openMaterial = useCallback((m: Material) => {
    setFocusDate(m.date);
    setGrain("minute");
  }, []);

  if (err) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-mono text-[14px] text-ink-500">数据加载失败：{err}</p>
      </div>
    );
  }

  if (!idx || !cat || !sub) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-paper">
        <span className="label-xs">LOADING LEDGER</span>
        <span className="block h-[2px] w-[180px] overflow-hidden bg-rule">
          <span className="track-fill block h-full w-full bg-ink-900" />
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden bg-paper"
      style={{ ["--cat-ink" as string]: sw.primary } as React.CSSProperties}
    >
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <TopBar
          idx={idx}
          catName={cat.name}
          subName={sub.name}
          aiOpen={aiOpen}
          ticker={ticker}
          chainId={chainId}
          onPickTicker={pickTicker}
        />

        <div className="flex min-h-0 flex-1">
          <CategoryRail cats={idx.cats} active={catId} counts={catCounts} onPick={pickCat} />

          <div className="relative flex min-w-0 flex-1 flex-col">
            <SubtypeBar cat={cat} active={subId} materials={catMaterials} rowCounts={rowCounts} onPick={pickSub} />

            {scoped?.empty && (
              <div className="flex shrink-0 items-center gap-3 border-b border-rule bg-surface px-5 py-1.5 text-[11.5px] leading-[1.5] text-ink-500">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-400">no cover</span>
                <span>
                  {ticker} 在「{sub.name}」下还没有收录材料，下面照常显示全部
                </span>
              </div>
            )}

            {/* 提示词版本条：这一日解析到哪一版，以及从哪里改 */}
            {grain === "minute" && promptVer && (
              <div className="flex shrink-0 items-center gap-2.5 border-b border-rule bg-surface px-5 py-1.5 text-[11.5px] leading-[1.5] text-ink-500">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-400">prompt</span>
                <span className="font-mono text-ink-900 tnum">第 {promptNo} 版</span>
                <span className="text-ink-300">·</span>
                <span className="tnum">{promptVer.at === BASELINE ? "初始版" : `${promptVer.at} 起`}</span>
                <span className="text-ink-300">·</span>
                <span className="tnum">{promptRows.length} 问</span>
                {promptNo < latestNo && (
                  <>
                    <span className="text-ink-300">·</span>
                    <span style={{ color: "var(--color-accent)" }}>该日仍用旧版，最新第 {latestNo} 版</span>
                  </>
                )}
              </div>
            )}

            <main className="relative min-h-0 flex-1">
              {grain === "day" ? (
                <StageDay
                  days={activeDays}
                  grouped={grouped}
                  catId={catId}
                  spacing={spacing}
                  focusDate={focusDate}
                  scrollX={scrollX}
                  onScroll={setScrollX}
                  onPickDay={setFocusDate}
                  onOpenMaterial={openMaterial}
                />
              ) : (
                <StageMatrix
                  rows={promptRows}
                  materials={dayMaterials}
                  catId={catId}
                  focusDate={focusDate}
                  onOpenMaterial={openMaterial}
                />
              )}

              <AIBall open={aiOpen} onToggle={() => setAiOpen((v) => !v)} catId={catId} />
            </main>

            <Timeline
              days={activeDays}
              grain={grain}
              spacing={spacing}
              scrollX={scrollX}
              focusDate={focusDate}
              grouped={grouped}
              catId={catId}
              dayMaterials={dayMaterials}
              onGrain={setGrain}
              onSpacing={setSpacing}
              onScroll={setScrollX}
              onFocus={setFocusDate}
              compact={compactAxis}
            />
          </div>

          <AIPanel
            open={aiOpen}
            catId={catId}
            catName={cat.name}
            subName={sub.name}
            date={focusDate}
            materials={dayMaterials}
          />
        </div>
      </div>

      {/* 详情页：全屏覆盖，dashboard 保持挂载，关闭后滚动位置不丢 */}
      {route.name === "detail" && (
        <DetailPage idx={idx} matId={route.matId} rowId={route.rowId} />
      )}

      {/* 第 0 层：产业链选择 → 链页 */}
      {route.name === "picker" && <ChainPicker />}
      {route.name === "chain" && <ChainMap chainId={route.chainId} />}
      {route.name === "prompts" && <PromptEditor idx={idx} subId={route.subId} />}
    </div>
  );
}

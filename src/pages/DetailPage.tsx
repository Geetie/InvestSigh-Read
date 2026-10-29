import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import type { Index } from "../lib/data";
import { shortDay } from "../lib/data";
import { catInk, HL, HL_ORDER } from "../lib/palette";
import {
  parseAnswerBlocks, parseHtmlTable, stripInline, blocksByPage, pagesOf, pagesOfEvidence,
  sentenceHasHit, splitParagraphs, tokensOf,
  type AnswerBlock, type AnswerSentence,
} from "../lib/cite";
import { pageOf, peekMeta, type SourceDoc, type SourceFigure, type SourceMeta } from "../lib/sources";
import { apiBase, getSnapshots, getSource } from "../lib/api";
import { closeDetail, hrefOf, replaceRow } from "../lib/route";
import { rowsAt } from "../lib/prompts";

/**
 * 详情页（点矩阵格进来的那一页）。
 *
 * 左边是这条答案的全文，按句切成色块 —— 色块的作用是**分隔**，让人一眼看出
 * 哪句在判断、哪句是量化依据、哪句在打折扣。
 * 右边是这条答案的原文依据：**按依据区登记的 `p.N` 分页**（`- p.N｜原文片段`），
 * 卡片里先列出该页登记的那几段，再显示原文中命中的句子。
 * 正文里的 `[p.N]` 只作 v1 旧材料的兜底，规范要求正文不写页码。
 */
export function DetailPage({ idx, matId, rowId }: { idx: Index; matId: string; rowId: string }) {
  const mat = idx.byId.get(matId);
  const cat = mat ? idx.cats.find((c) => c.id === mat.cat) : undefined;
  const sub = cat && mat ? cat.subtypes.find((s) => s.id === mat.sub) : undefined;
  /* 行（问题）按**这份材料的日期**解析到当时的提示词版本：
     后来改过的问题不会回溯污染旧材料，旧问题与旧答案仍成对。 */
  const rows = mat && sub ? rowsAt(sub.id, mat.date, sub.rows) : (sub?.rows ?? []);
  const row = rows.find((r) => r.id === rowId) ?? sub?.rows.find((r) => r.id === rowId);
  const reading = (row as { reading?: string } | undefined)?.reading ?? "";

  const [meta, setMeta] = useState<SourceMeta | null>(peekMeta(matId));
  const [doc, setDoc] = useState<SourceDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [openPages, setOpenPages] = useState<number[]>([]);
  /** 整页快照（把 PDF 一页整体渲染成的图）。只在「figures 看着不对」时才需要，
      所以按需拉、不预生成。 */
  const [snaps, setSnaps] = useState<string[]>([]);

  /* 原文走 api 这一个接缝：mock 读 /data/sources，http 打 /materials/:id/source */
  useEffect(() => {
    let alive = true;
    setLoading(true);
    getSnapshots(matId).then((list) => {
      if (alive) setSnaps(list);
    });
    getSource(matId).then((d) => {
      if (!alive) return;
      setDoc(d);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [matId]);

  /* 页数、空页、越界页优先用索引里的质检结果；http 模式下没有索引，就从 doc 现算 */
  const liveMeta = useMemo<SourceMeta | null>(() => {
    const m = peekMeta(matId);
    if (m) return m;
    if (!doc) return null;
    return {
      srcId: doc.srcId,
      file: "",
      pageCount: doc.pageCount,
      chars: doc.pages.reduce((a, p) => a + p.chars, 0),
      emptyPages: doc.pages.filter((p) => !p.text.trim()).map((p) => p.n),
      citedPages: [],
      outOfRange: [],
      bytes: 0,
    };
  }, [doc, matId]);

  useEffect(() => {
    if (liveMeta) setMeta(liveMeta);
  }, [liveMeta]);

  const answer = mat && row ? (mat.cells[row.id] ?? "") : "";

  /* 依据区（`- p.N｜原文`）= 证据的主来源。后端 parse-md 已解析成 evidence[rowId]。
     正文里的 `[p.N]` 只在旧材料（v1 legacy，没有依据区）上还有值，作兜底。 */
  const evidenceBlocks = mat && row ? (mat.evidence?.[row.id] ?? []) : [];
  const byPage = useMemo(() => blocksByPage(evidenceBlocks), [evidenceBlocks]);

  /* 图表按页归组，**页内按 order 升序**（order 是全书阅读顺序）。
     这样读者在同一页里看到的图序 = 原文里的图序，不会乱。 */
  const figsByPage = useMemo(() => {
    const m = new Map<number, SourceFigure[]>();
    for (const f of doc?.figures ?? []) {
      if (f.page == null) continue;
      const arr = m.get(f.page);
      if (arr) arr.push(f);
      else m.set(f.page, [f]);
    }
    for (const arr of m.values()) arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return m;
  }, [doc]);

  /* 整页快照按页号归组：文件名 p012.png → 第 12 页 */
  const snapsByPage = useMemo(() => {
    const m = new Map<number, string>();
    for (const n of snaps) {
      const mm = /^p(\d+)\./i.exec(n);
      if (mm) m.set(Number(mm[1]), n);
    }
    return m;
  }, [snaps]);

  /* 没定到页的图：单独一栏，不塞进任何页（否则会张冠李戴） */
  const orphanFigs = useMemo(
    () => (doc?.figures ?? []).filter((f) => f.page == null),
    [doc],
  );

  const answerBlocks = useMemo(() => parseAnswerBlocks(answer), [answer]);
  const allSentences = useMemo(
    () => answerBlocks.flatMap((b) => b.sentences ?? []),
    [answerBlocks],
  );
  const cited = useMemo(() => {
    const fromEvidence = pagesOfEvidence(evidenceBlocks);
    if (fromEvidence.length) return fromEvidence;
    return pagesOf(answer); // 兜底：正文写了 [p.N] 的旧材料
  }, [evidenceBlocks, answer]);
  const citedFromEvidence = pagesOfEvidence(evidenceBlocks).length > 0;
  const tokens = useMemo(() => tokensOf(allSentences), [allSentences]);

  /* 当天同一批材料（同型、同日），按时间排序 —— ←→ 在这一组里走 */
  const siblings = useMemo(() => {
    if (!mat) return [];
    return (idx.byCatSub.get(`${mat.cat}|${mat.sub}`) ?? [])
      .filter((m) => m.date === mat.date)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [idx, mat]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const t = e.target as HTMLElement;
      if (t?.tagName === "INPUT" || t?.tagName === "TEXTAREA") return;
      const i = siblings.findIndex((m) => m.id === matId);
      const target = siblings[i + (e.key === "ArrowRight" ? 1 : -1)];
      if (!target) return;
      e.preventDefault();
      location.replace(hrefOf(target.id, rowId));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [siblings, matId, rowId]);

  if (!mat || !cat || !sub || !row) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-paper">
        <p className="text-[15px] text-ink-700">找不到这条记录</p>
        <button onClick={closeDetail} className="border border-ink-900 px-4 py-2 text-[14px]">
          返回
        </button>
      </div>
    );
  }

  const ink = catInk(cat.id);
  const hasSource = Boolean(meta);
  const outOfRange = meta?.outOfRange ?? [];

  const si = siblings.findIndex((m) => m.id === matId);
  const prevMat = si > 0 ? siblings[si - 1] : undefined;
  const nextMat = si >= 0 && si < siblings.length - 1 ? siblings[si + 1] : undefined;
  const goto = (m?: typeof prevMat) => {
    if (m) location.replace(hrefOf(m.id, rowId));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-paper"
      style={{ ["--cat-ink" as string]: ink.ink } as React.CSSProperties}
    >
      {/* 顶部 */}
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-rule px-8">
        <button
          onClick={closeDetail}
          className="flex items-center gap-2 border border-rule-strong px-3 py-2 text-[14px] text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
        >
          <ArrowLeft size={15} strokeWidth={1.8} />
          返回
        </button>
        <div className="flex min-w-0 items-center gap-2 text-[13.5px]">
          <span className="text-ink-300">/</span>
          <span className="truncate text-ink-500">{cat.name}</span>
          <span className="text-ink-300">/</span>
          <span className="truncate text-ink-700">{sub.name}</span>
          <span className="text-ink-300">/</span>
          <span className="font-mono text-ink-900 tnum">
            {shortDay(mat.date)} {mat.time}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-5">
          {/* 当天同批材料：n / m + 左右切换（←→ 键同效） */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => goto(prevMat)}
              disabled={!prevMat}
              title={prevMat ? `上一份：${prevMat.name}` : "已是当天第一份"}
              className="border border-rule-strong px-1.5 py-0.5 font-mono text-[12px] text-ink-700 transition-colors enabled:hover:border-ink-900 enabled:hover:text-ink-900 disabled:text-ink-300"
            >
              ←
            </button>
            <span className="font-mono text-[12px] text-ink-500 tnum">
              {si + 1} / {siblings.length}
            </span>
            <button
              onClick={() => goto(nextMat)}
              disabled={!nextMat}
              title={nextMat ? `下一份：${nextMat.name}` : "已是当天最后一份"}
              className="border border-rule-strong px-1.5 py-0.5 font-mono text-[12px] text-ink-700 transition-colors enabled:hover:border-ink-900 enabled:hover:text-ink-900 disabled:text-ink-300"
            >
              →
            </button>
          </div>
          <span className="font-mono text-[13px] font-medium tracking-[0.06em] text-ink-900">{row.id}</span>
          <span className="font-mono text-[13px] text-ink-500 tnum">
            {mat.filled}/{mat.total} 格
          </span>
          {hasSource && (
            <span className="font-mono text-[13px] text-ink-500 tnum">原文 {meta!.pageCount} 页</span>
          )}
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* 行轨 */}
        <nav className="scrollbar-none w-[78px] shrink-0 overflow-y-auto border-r border-rule bg-surface">
          {rows.map((r) => {
            const on = r.id === row.id;
            const has = Boolean(mat.cells[r.id]);
            return (
              <button
                key={r.id}
                onClick={() => replaceRow(r.id)}
                className={`relative flex h-11 w-full items-center justify-center font-mono text-[12px] tracking-[0.04em] transition-colors ${
                  on ? "bg-ink-900 text-paper" : has ? "text-ink-700 hover:bg-surface-2" : "text-ink-300"
                }`}
                title={r.label}
              >
                {r.id}
              </button>
            );
          })}
        </nav>

        {/* 主体 */}
        <div className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1320px] px-10 py-9">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-ink-400">
                {row.kind === "data" ? "要收集的数据" : "要回答的问题"}
              </span>
              <span className="h-px flex-1 bg-rule" />
            </div>

            <h1 className="mt-4 max-w-[900px] text-[32px] leading-[1.3] font-medium tracking-[-0.015em] text-ink-900">
              {unescapeForDisplay(stripInline(row.label))}
            </h1>

            {reading && (
              <div className="mt-4 flex max-w-[900px] gap-3 border-l-2 border-rule-strong pl-3">
                <span className="shrink-0 pt-[3px] font-mono text-[10px] tracking-[0.14em] uppercase text-ink-400">
                  读法
                </span>
                <p className="m-0 text-[12.5px] leading-[1.75] text-ink-500">{unescapeForDisplay(reading)}</p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13.5px]">
              <span className="text-[15px] font-medium text-ink-900">{unescapeForDisplay(mat.name)}</span>
              {mat.ticker && <span className="font-mono text-ink-500">· {mat.ticker}</span>}
              {mat.issuer && <span className="text-ink-500">· {mat.issuer}</span>}
              <span className="font-mono text-ink-500 tnum">· {shortDay(mat.date)}</span>
              {cited.length > 0 && (
                <span className="flex items-center gap-1.5 text-ink-500">
                  · 引用
                  {cited.map((n) => (
                    <span key={n} className="cite-chip" style={{ fontSize: 12 }}>
                      p.{n}
                    </span>
                  ))}
                </span>
              )}
            </div>

            <div className="mt-6 h-px bg-rule" />

            <div className="mt-8">
              {/* 上半：问题在上（已在页头）、答案紧随 */}
              <article>
                {answer ? (
                  <div className="read-body">
                    <AnswerBody blocks={answerBlocks} />
                  </div>
                ) : (
                  <p className="text-[15px] text-ink-400">这份材料没有提供该栏目的读数。</p>
                )}
              </article>

              {/* 下半：原文依据。一条答案常挂多处依据，横向最多两栏 */}
              <aside className="mt-12 border-t border-rule pt-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-ink-400">原文依据</span>
                  <span className="h-px flex-1 bg-rule" />
                  {hasSource && (
                    <span className="font-mono text-[12px] text-ink-400 tnum">
                      {cited.length} 处 / {meta!.pageCount} 页
                    </span>
                  )}
                </div>

                {/* 没定到页的图单独列，避免张冠李戴地塞进某一页 */}
                {orphanFigs.length > 0 && (
                  <FigureStrip
                    figs={orphanFigs}
                    materialId={mat!.id}
                    label={`未定位到页的图 ${orphanFigs.length} 张`}
                  />
                )}

                {!hasSource ? (
                  <NoSource />
                ) : loading ? (
                  <p className="text-[14px] text-ink-400">原文载入中…</p>
                ) : cited.length === 0 ? (
                  <p className="text-[14px] leading-[1.8] text-ink-400">
                    {answer
                      ? "这条答案的「依据」区还没登记原文，无法定位到原文。"
                      : "这一栏还没有读数。"}
                  </p>
                ) : (
                  <div>
                    {!citedFromEvidence && (
                      <p className="mb-3 border-l-2 border-rule pl-3 text-[13px] leading-[1.7] text-ink-500">
                        页号来自答案正文的旧式 <code>[p.N]</code> 标记；新材料应在「依据」区登记原文块。
                      </p>
                    )}
                    {outOfRange.length > 0 && (
                      <p className="mb-3 border-l-2 border-accent pl-3 text-[13px] leading-[1.7] text-ink-700">
                        引用页码 {outOfRange.map((n) => `p.${n}`).join("、")} 超出该材料（共{" "}
                        {meta!.pageCount} 页），原文档可能重编过页。
                      </p>
                    )}

                    {(() => {
                      /* 一条答案常挂多处依据：横向最多两栏（窄屏自动落单栏） */
                      const cards = cited.map((n) => {
                        const page = pageOf(doc, n);
                        const empty = meta!.emptyPages.includes(n);
                        const expanded = openPages.includes(n);
                        return (
                          <EvidenceCard
                            key={n}
                            n={n}
                            page={page}
                            empty={empty}
                            tokens={tokens}
                            quotes={byPage.get(n) ?? []}
                            figs={figsByPage.get(n) ?? []}
                            snapshot={snapsByPage.get(n) ?? null}
                            materialId={mat!.id}
                            expanded={expanded}
                            onToggle={() =>
                              setOpenPages((v) => (v.includes(n) ? v.filter((x) => x !== n) : [...v, n]))
                            }
                          />
                        );
                      });
                      return <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">{cards}</div>;
                    })()}
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>

      {/* 图例 */}
      <footer className="flex h-12 shrink-0 items-center gap-6 border-t border-rule bg-surface px-8">
        <span className="font-mono text-[12px] text-ink-400">Esc 返回 · ↑↓ 换栏目 · ←→ 换当天材料</span>
      </footer>
    </div>
  );
}

/* ---------- 答案正文（按块渲染：段落 / 列表 / 表格） ---------- */

function AnswerBody({ blocks }: { blocks: AnswerBlock[] }) {
  return (
    <>
      {blocks.map((b, bi) => {
        if (b.kind === "table" && b.table && b.table.length) {
          return <DataTable key={bi} rows={b.table} />;
        }
        if (b.kind === "li") {
          return (
            <p
              key={bi}
              className="ans-li"
              style={{ marginLeft: b.depth * 18 }}
            >
              <span className="ans-li-marker">{b.marker ?? "•"}</span>
              <Sentences items={b.sentences ?? []} />
            </p>
          );
        }
        return (
          <p key={bi} className="ans-p">
            <Sentences items={b.sentences ?? []} />
          </p>
        );
      })}
    </>
  );
}

/** 一段内的句子，逐句上底色与页码芯片 */
function Sentences({ items }: { items: AnswerSentence[] }) {
  return (
    <>
      {items.map((s, i) => (
        <span key={i} className={`ans ${s.tone ? `ans--${s.tone}` : ""}`}>
          {s.tone && <span className="ans-dot" style={{ background: HL[s.tone].bar }} aria-hidden />}
          {s.text}
          {s.pages.map((n) => (
            <span key={n} className="cite-chip">
              p.{n}
            </span>
          ))}
          {i < items.length - 1 && " "}
        </span>
      ))}
    </>
  );
}

/** 答案里内嵌的表格（agent 从原文抄的 `<table>`）——渲染成真表格，不显示标签 */
function DataTable({ rows, compact = false }: { rows: string[][]; compact?: boolean }) {
  const [head, ...body] = rows;
  const cols = Math.max(...rows.map((r) => r.length));
  return (
    <div className={compact ? "ans-table-wrap ans-table-wrap--compact" : "ans-table-wrap"}>
      <table className="ans-table">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}>{head[i] ?? ""}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((r, i) => (
            <tr key={i}>
              {Array.from({ length: cols }).map((_, j) => (
                <td key={j} className={j === 0 ? "ans-table-key" : "ans-table-num"}>
                  {r[j] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- 证据卡 ---------- */

/* ---------- 原文图表 ----------
   图片由后端 `/materials/:id/figures/:name` 提供；这里只负责按页展示。
   为什么要展示：研报里**大量结论靠图表承载**（估计表、份额图、走势图），
   只给文字等于把原文最有信息量的部分丢了。 */

function FigureStrip({
  figs,
  materialId,
  label,
}: {
  figs: SourceFigure[];
  materialId: string;
  label?: string;
}) {
  const [zoom, setZoom] = useState<{ url: string; title: string } | null>(null);
  if (!figs.length) return null;
  return (
    <>
      <div className="border-b border-rule bg-surface px-4 py-2.5">
        <p className="mb-1.5 font-mono text-[11px] tracking-[0.1em] uppercase text-ink-400">
          {label ?? `本页图表 ${figs.length} 张`}
        </p>
        <div className="flex flex-wrap gap-2">
          {figs.map((f) => {
            const url = figureUrl(materialId, f.name);
            /* 序号用 order（全书阅读顺序），没有就按传入顺序 */
            const badge = f.order != null ? `#${f.order}` : "";
            return (
              <button
                key={f.name}
                onClick={() =>
                  setZoom({
                    url,
                    title: `#${f.order ?? "?"} · p.${f.page ?? "?"} · ${f.name}`,
                  })
                }
                className="group relative h-20 w-28 overflow-hidden border border-rule bg-white"
                title={`阅读序 #${f.order ?? "?"} · 第 ${f.page ?? "?"} 页`}
              >
                <img
                  src={url}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-opacity group-hover:opacity-75"
                />
                {badge && (
                  <span className="absolute left-0 top-0 bg-ink-900/75 px-1 font-mono text-[10px] text-white">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      {zoom && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-black/75 p-8"
          onClick={() => setZoom(null)}
          role="presentation"
        >
          <img src={zoom.url} alt="" className="max-h-[85vh] max-w-full bg-white shadow-2xl" />
          <p className="font-mono text-[12px] text-white/80">{zoom.title}</p>
        </div>
      )}
    </>
  );
}

/** 图表 URL（http 模式打后端；mock 模式退回相对路径） */
function figureUrl(materialId: string, name: string): string {
  return `${apiBase()}/materials/${encodeURIComponent(materialId)}/figures/${encodeURIComponent(name)}`;
}

function EvidenceCard({
  n,
  page,
  empty,
  tokens,
  quotes,
  figs,
  snapshot,
  materialId,
  expanded,
  onToggle,
}: {
  n: number;
  page: ReturnType<typeof pageOf>;
  empty: boolean;
  tokens: string[];
  /** 本页在「依据」区登记的原文片段（可能多条）；空 = 旧材料，只按页码定位 */
  quotes: string[];
  /** 本页上的图表（按 content_list 的 page_idx 归页） */
  figs: SourceFigure[];
  /** 该页的整页快照（没有就不显示） */
  snapshot: string | null;
  materialId: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  if (!page) {
    return (
      <div className="border border-rule p-3.5">
        <p className="font-mono text-[12px] text-ink-400">p.{n}</p>
        <p className="mt-1 text-[13.5px] text-ink-400">该页未收录或无文本层。</p>
      </div>
    );
  }

  /* 按行/段切，不压成一坨；命中判定仍在句级做 */
  const sentences = splitParagraphs(page.text);
  /* 命中判定：优先用本页登记的原文片段（最精确），没有再退回答案侧的 token */
  const hitOf = (s: string) =>
    quotes.length
      ? quotes.some((q) => q.replace(/\s+/g, " ").includes(s.trim()) || s.includes(q.replace(/\s+/g, " ").slice(0, 40)))
      : sentenceHasHit(s, tokens);

  const hitIdx = sentences.map((s, i) => (hitOf(s) ? i : -1)).filter((i) => i >= 0);
  const focus = expanded
    ? sentences
    : hitIdx.length
      ? sentences.slice(Math.max(0, hitIdx[0] - 1), Math.min(sentences.length, hitIdx[hitIdx.length - 1] + 2))
      : sentences.slice(0, 3);

  return (
    <div className="border border-rule bg-paper">
      <button
        onClick={onToggle}
        className="flex w-full items-baseline gap-2.5 border-b border-rule px-4 py-2.5 text-left transition-colors hover:bg-surface-2"
      >
        <span className="font-mono text-[22px] leading-none text-ink-900 tnum">p.{n}</span>
        <span className="font-mono text-[12px] text-ink-400">
          {quotes.length
            ? /* 「登记」= agent 在「依据」区为这条答案抄了几段原文；
                 「命中」= 其中几段在这一页的正文里真的搜到了（佐证这条依据不是编的） */
              `${quotes.length} 段依据` +
              (hitIdx.length ? ` · 本页 ${hitIdx.length} 句对上` : " · 本页未对上")
            : hitIdx.length
              ? `本页 ${hitIdx.length} 句对上`
              : "仅按页码定位（未登记片段）"}
        </span>
        <ChevronDown
          size={15}
          strokeWidth={1.8}
          className={`ml-auto text-ink-400 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {quotes.length > 0 && (
        <ul className="border-b border-rule bg-surface px-4 py-2.5">
          {quotes.map((q, i) => {
            const hasTableHtml = /<\/?(table|thead|tbody|tr|td|th)[\s>]/i.test(q);
            if (!hasTableHtml) {
              return (
                <li key={i} className="mb-1.5 last:mb-0">
                  <span className="font-mono text-[12.5px] leading-[1.7] text-ink-700">
                    · {unescapeForDisplay(q)}
                  </span>
                </li>
              );
            }
            /* 抄的是表格区：可能带完整 <table>，也可能只是几行 <td> 片段。
               两种情况都先补成合法 table 再渲成真表格，绝不把标签当文字显示。 */
            return (
              <li key={i} className="mb-1.5 last:mb-0">
                <DataTable rows={parseHtmlTable(rowFragmentToTable(q))} compact />
              </li>
            );
          })}
        </ul>
      )}

      {figs.length > 0 && <FigureStrip figs={figs} materialId={materialId} />}

      {snapshot && (
        <div className="border-b border-rule bg-surface px-4 py-2.5">
          <p className="mb-1.5 font-mono text-[11px] tracking-[0.1em] uppercase text-ink-400">
            整页快照（原始版式）
          </p>
          <a
            href={`${apiBase()}/materials/${encodeURIComponent(materialId)}/snapshots/${encodeURIComponent(snapshot)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block border border-rule bg-white"
            title="点开看原始版式（MinerU 抽图可能把复合图表拆碎）"
          >
            <img
              src={`${apiBase()}/materials/${encodeURIComponent(materialId)}/snapshots/${encodeURIComponent(snapshot)}`}
              alt=""
              loading="lazy"
              className="h-28 w-auto object-contain"
            />
          </a>
        </div>
      )}

      {empty ? (
        <p className="px-4 py-3 text-[13.5px] text-ink-400">该页为图表页，无文本层。</p>
      ) : (
        <div className="src-body px-4 py-3">
          {focus.map((s, i) =>
            /<table[\s>]/i.test(s) ? (
              /* 原文句里夹着表格：只把 <table> 那一段渲成真表格，其余文字照常 */
              <RawWithTable key={i} html={s} hit={hitOf(s)} />
            ) : (
              <p key={i} className={hitOf(s) ? "src-sentence src-sentence--hit" : "src-sentence"}>
                {cleanInlineHtml(s)}
              </p>
            ),
          )}
          {!expanded && sentences.length > focus.length && (
            <button onClick={onToggle} className="mt-2 font-mono text-[12px] text-ink-500 underline">
              展开整页（{sentences.length} 句）
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- 原文侧：把内嵌 <table> 渲成真表格 ---------- */


/** 把「只有 <td>…</td> 片段、没有 <table> 外壳」的依据补成合法表格，
 *  避免把标签当文字显示（agent 常只抄表格的一行或几格）。 */
function rowFragmentToTable(q: string): string {
  if (/<table[\s>]/i.test(q)) return q;
  const cells = [...q.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) => `<td>${m[1]}</td>`);
  if (!cells.length) return `<table><tr><td>${q}</td></tr></table>`;
  return `<table><tr>${cells.join("")}</tr></table>`;
}

/** 显示层去掉 MinerU 的反斜杠转义（`\$825` → `$825`、`\~23x` → `~23x`）。
 *
 *  **只用于显示**：依据块在 md 里必须保留反斜杠，因为 `check.mjs` 要拿它
 *  与 pages.json 做逐字比对；这里动了就是改数据，不能碰。
 */
function unescapeForDisplay(s: string): string {
  return s.replace(/\\+([\$~%])/g, "$1");
}

/** 去掉行内 HTML 标签（`<td>`、`</tr>` 之类），只留文字 */
function cleanInlineHtml(s: string): string {  return s
    .replace(/<\/?t[dhr][^>]*>/gi, " ")
    .replace(/<\/?table[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    /* MinerU 的正文转义：显示时去掉反斜杠（依据块仍按逐字比，不受影响） */
    .replace(/\\+([\$~%])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** 一段原文里若含 `<table>`：表格渲成表，前后文字照常显示 */
function RawWithTable({ html, hit }: { html: string; hit: boolean }) {
  const parts: { kind: "text" | "table"; value: string }[] = [];
  const re = /<table[\s\S]*?<\/table>/gi;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    if (m.index > last) parts.push({ kind: "text", value: html.slice(last, m.index) });
    parts.push({ kind: "table", value: m[0] });
    last = m.index + m[0].length;
  }
  if (last < html.length) parts.push({ kind: "text", value: html.slice(last) });

  return (
    <>
      {parts.map((p, i) => {
        if (p.kind === "table") {
          const rows = parseHtmlTable(p.value);
          return rows.length ? <DataTable key={i} rows={rows} compact /> : null;
        }
        const t = cleanInlineHtml(p.value);
        if (!t) return null;
        return (
          <p key={i} className={hit ? "src-sentence src-sentence--hit" : "src-sentence"}>
            {t}
          </p>
        );
      })}
    </>
  );
}

/* ---------- 空态 ---------- */

function NoSource() {
  return (
    <div className="border border-rule bg-surface p-5">
      <p className="font-mono text-[12px] tracking-[0.14em] uppercase text-ink-400">未收录</p>
      <p className="mt-3 text-[14px] leading-[1.85] text-ink-700">
        这份材料是原型合成数据，答案由模板生成，<span className="text-ink-900">没有附原文</span>。
        真实链路里每一格都会挂到 PDF 的具体页。
      </p>
      <a
        href="#/m/03-broker-research-R03/S00"
        className="mt-4 inline-block border border-ink-900 px-3 py-2 text-[13.5px] text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper"
      >
        看一条真实样例 →
      </a>
    </div>
  );
}

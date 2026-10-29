import type { HlTone } from "./palette";

/**
 * 把一格答案切成**可排版的块**，每块带一个分隔档。
 *
 * 为什么要按块而不是按句：agent 写的是 markdown（`- ` 列表、空行分段、`**粗体**`、
 * 表格 HTML）。早先的实现把所有句子用空格拼成一个长串，导致换行、列表、粗体全丢，
 * 阅读器里变成一坨字。现在改为：
 *
 *   · 空行 → 段落边界
 *   · `- ` / `1. ` 开头 → 列表项（独立成块，保留缩进层级）
 *   · `<table>` … `</table>` → 表格块（渲染成真表格，不显示标签）
 *   · 其余文字 → 段落块，块内再按中文句末切句（用于分块高亮）
 *
 * 页号从哪来（容易错，写死在这里）：
 *   主通道 = 答案下面的 `### 依据` 区，每行 `- p.3｜原文片段`，后端解析成
 *            `evidence[rowId] = [{page, quote}]`；前端用 `pagesOfEvidence()` 取页、
 *            `blocksByPage()` 按页分组。
 *   兜底   = 答案正文里的 `[p.N]`（`pagesOf`）。只有 v1 legacy 旧材料还靠它。
 */

export type BlockKind = "p" | "li" | "table";

/** 一个可渲染块：段落 / 列表项 / 表格 */
export interface AnswerBlock {
  kind: BlockKind;
  /** 列表项的层级（0 = 顶层 `- `，1 = 缩进两级等）；非列表恒 0 */
  depth: number;
  /** 段落与列表项的正文（已去 markdown 标记），按句切好以便分块高亮 */
  sentences?: AnswerSentence[];
  /** 表格：二维单元格（首行作表头） */
  table?: string[][];
  /** 原始无序列表标记（`-` / `1.`） */
  marker?: string;
}

export interface AnswerSentence {
  text: string;
  tone?: HlTone;
  pages: number[];
}

const PAGE_RE = /\[p\.(\d+)\]/g;
const SENT_END = /[。；！？]/;

/** 数字 + 量纲（先长后短，避免「12 亿美元」被切成「12」） */
const METRIC_RE =
  /-?\d[\d,]*(?:\.\d+)?\s*(?:亿美元|百万美元|万美元|美元|亿港元|亿人民币|个百分点|bp|bps|%|％|倍|x|万|亿|个|家|只|笔|页|条)/;

const HEDGE_WORDS = [
  "但", "仅", "约", "尚未", "无法核实", "未披露", "据称", "可能", "预计",
  "尚无", "存疑", "无法验证", "暂无", "未必", "不足以", "有待",
];

const hasHedge = (s: string) => HEDGE_WORDS.some((w) => s.includes(w));

/** 按中文句末标点切句，页码标记不参与切分 */
function splitCn(text: string): string[] {
  const out: string[] = [];
  let buf = "";
  for (const ch of text) {
    buf += ch;
    if (SENT_END.test(ch)) {
      out.push(buf);
      buf = "";
    }
  }
  if (buf.trim()) out.push(buf);
  return out.filter((s) => s.trim().length > 0);
}

/** 去掉 markdown 行内标记：**粗体**、`代码`、行内链接。保留文字本身。 */
export function stripInline(s: string): string {
  return s
    /* 只去**成对**的粗体标记；单个/落单的 `**` 是原文脚注（如 "IB clients**"），必须保留 */
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    /* MinerU 抽出来的正文带反斜杠转义（`\$775`、`\~23x`）。
       校验要连反斜杠一起比（依据块必须逐字），但**显示时不该露出反斜杠**。 */
    .replace(/\\+([\$~%])/g, "$1")
    .trim();
}

function annotate(text: string, startIndex = 0): AnswerSentence[] {
  return splitCn(text).map((sentence, i) => {
    const pages: number[] = [];
    for (const m of sentence.matchAll(PAGE_RE)) {
      const n = Number(m[1]);
      if (!pages.includes(n)) pages.push(n);
    }
    let tone: HlTone | undefined;
    if (startIndex === 0 && i === 0) tone = "conclusion";
    else if (METRIC_RE.test(sentence)) tone = "metric";
    else if (hasHedge(sentence)) tone = "hedge";
    return { text: sentence.replace(PAGE_RE, "").trim(), tone, pages };
  });
}

/** 兼容旧调用：把一段文字切成句子块（不做 block 划分） */
export function annotateAnswer(text: string): AnswerSentence[] {
  if (!text) return [];
  return annotate(text);
}

/* ───────── Markdown 管道表 ───────── */

const isPipeRow = (l: string) => /^\s*\|.*\|\s*$/.test(l);
const isPipeSep = (l: string) => /^\s*\|[\s:|-]+\|\s*$/.test(l) && l.includes("-");

/** `| a | b |` → ["a", "b"]（去掉首尾空列，单元格 trim） */
function splitPipeRow(l: string): string[] {
  const s = l.trim().replace(/^\|/, "").replace(/\|$/, "");
  return s.split("|").map((c) => c.trim());
}

/* ───────── HTML 表格 → 二维数组 ───────── */

const TABLE_RE = /<table[\s\S]*?<\/table>/gi;

/** 把一段 `<table>…</table>` 解析成二维单元格。跳过纯空行。 */
export function parseHtmlTable(html: string): string[][] {
  const rows: string[][] = [];
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let rm: RegExpExecArray | null;
  while ((rm = rowRe.exec(html))) {
    const cells: string[] = [];
    const cellRe = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
    let cm: RegExpExecArray | null;
    while ((cm = cellRe.exec(rm[1]))) {
      cells.push(
        decodeEntities(cm[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()),
      );
    }
    if (cells.some((c) => c !== "")) rows.push(cells);
  }
  return rows;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));
}

/**
 * 答案 markdown → 可渲染块序列。
 *
 * 支持：空行分段、`- `/`* ` 无序列表、`1. ` 有序列表、`<table>` 表格、`**粗体**`（去标记）。
 * 不认识的行按普通段落处理 —— 宁可朴素，不要丢字。
 */
export function parseAnswerBlocks(text: string): AnswerBlock[] {
  if (!text || !text.trim()) return [];

  const blocks: AnswerBlock[] = [];
  let para: string[] = [];
  let firstParagraphDone = false;

  const flushPara = () => {
    if (!para.length) return;
    const joined = para.join(" ").trim();
    para = [];
    if (!joined) return;
    blocks.push({
      kind: "p",
      depth: 0,
      /* 段落也要去 markdown 标记（`**粗体**`、`\$`）——
         早先只有列表项做了 stripInline，段落里的星号会原样显示出来。 */
      sentences: annotate(stripInline(joined), firstParagraphDone ? 1 : 0),
    });
    firstParagraphDone = true;
  };

  /* 先把表格整段抠出来，行内其余文字按行处理 */
  const lines = text.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    /* HTML 表格：可能跨多行 */
    if (/^\s*<table/i.test(line)) {
      let html = line;
      while (!/<\/table>/i.test(html) && i + 1 < lines.length) {
        i += 1;
        html += "\n" + lines[i];
      }
      flushPara();
      const rows = parseHtmlTable(html);
      if (rows.length) blocks.push({ kind: "table", depth: 0, table: rows });
      i += 1;
      continue;
    }

    /* Markdown 管道表：`| a | b |` + 分隔行 `|---|---|`。
       agent 常直接手写管道表（不写 <table>），必须一并认，否则会渲染成一排竖线。 */
    if (isPipeRow(line) && i + 1 < lines.length && isPipeSep(lines[i + 1])) {
      flushPara();
      const table: string[][] = [splitPipeRow(line)];
      i += 2; // 跳过表头与分隔行
      while (i < lines.length && isPipeRow(lines[i])) {
        table.push(splitPipeRow(lines[i]));
        i += 1;
      }
      blocks.push({ kind: "table", depth: 0, table });
      continue;
    }

    /* 空行 → 段落边界 */
    if (!line.trim()) {
      flushPara();
      i += 1;
      continue;
    }

    /* 列表项：`- ` / `* ` / `1. `（允许前置缩进） */
    const li = line.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/);
    if (li) {
      flushPara();
      const depth = Math.min(2, Math.floor(li[1].length / 2));
      const body = stripInline(li[3]);
      if (body) {
        blocks.push({
          kind: "li",
          depth,
          marker: /^\d/.test(li[2]) ? li[2] : "•",
          sentences: annotate(body),
        });
      }
      i += 1;
      continue;
    }

    para.push(line.trim());
    i += 1;
  }
  flushPara();
  return blocks;
}

/** 段落块的纯文本（写回 md 时用） */
export const blocksToText = (blocks: AnswerBlock[]): string =>
  blocks
    .map((b) => {
      if (b.kind === "table") return "";
      const t = (b.sentences ?? []).map((s) => s.text).join("");
      return b.kind === "li" ? `${"  ".repeat(b.depth)}- ${t}` : t;
    })
    .filter(Boolean)
    .join("\n\n");

/* ───────── 页号 ───────── */

/** 该格引用到的页码（去重、保序），用于右栏按页取原文。
 *
 *  **这是兜底通道**：正规来源是答案下面「### 依据」区登记的块（见 `pagesOfEvidence`）。
 *  正文里写 `[p.N]` 也认 —— 但规范要求正文不写页码（页码只进依据区），
 *  所以正常情况下这个函数返回空，页号全部来自依据区。
 */
export function pagesOf(text: string): number[] {
  const seen: number[] = [];
  for (const m of text.matchAll(PAGE_RE)) {
    const n = Number(m[1]);
    if (!seen.includes(n)) seen.push(n);
  }
  return seen;
}

/** 一块原文依据：解析自 `- p.3｜原文片段` */
export interface EvidenceBlock {
  page: number;
  quote: string;
}

/**
 * 依据区 → 页号序列（去重、按首次出现排序）。
 *
 * 这是「原文依据」右栏的**主通道**：后端 `parse-md.mjs` 把 `### 依据` 下的
 * `- p.N｜原文` 解析成 `evidence[rowId] = [{page, quote}]`，
 * 前端据此翻页、并按 quote 去原文里定位命中句。
 */
export function pagesOfEvidence(blocks?: EvidenceBlock[] | null): number[] {
  const seen: number[] = [];
  for (const b of blocks ?? []) {
    const n = Number(b?.page);
    if (Number.isFinite(n) && n > 0 && !seen.includes(n)) seen.push(n);
  }
  return seen;
}

/** 该行「按页聚合」的依据：p.N → 该页上登记的所有原文片段 */
export function blocksByPage(blocks?: EvidenceBlock[] | null): Map<number, string[]> {
  const m = new Map<number, string[]>();
  for (const b of blocks ?? []) {
    const n = Number(b?.page);
    if (!Number.isFinite(n) || n <= 0) continue;
    const q = String(b?.quote ?? "").trim();
    if (!q) continue;
    const arr = m.get(n);
    if (arr) arr.push(q);
    else m.set(n, [q]);
  }
  return m;
}

/* ============================================================
   原文侧：按句切 + 字面命中
   ============================================================ */

const SENT_SPLIT = /(?<=[.!?])\s+(?=[A-Z(\["“])/;

/** 英文原文切句；过短的碎片并回上一句（对付 U.S. / Inc.） */
export function splitSentences(text: string): string[] {
  const raw = text.replace(/\s*\n\s*/g, " ").split(SENT_SPLIT);
  const out: string[] = [];
  for (const s of raw) {
    const t = s.trim();
    if (!t) continue;
    if (t.length < 25 && out.length) out[out.length - 1] += " " + t;
    else out.push(t);
  }
  return out;
}

/** 原文**按行**切（保留换行结构），跨行时才按句切。
 *
 *  为什么不直接用 `splitSentences`：它第一步就把 `\n` 全压成空格，
 *  于是一整页的标题、正文、脚注、表注会连成一大段 —— 右栏看起来就是
 *  「一坨字」。实测 Citi 那份 p1 有 24 个换行，压完就只剩 1 段。
 *
 *  规则：先按行分组，连续的短行（< 40 字，多为标题/表注）各自成段；
 *  长行内部再按句切，但**不跨行合并**，保证排版与原文一致。
 */
export function splitParagraphs(text: string): string[] {
  const lines = text.split(/\r?\n/);
  const out: string[] = [];
  let buf: string[] = [];

  const flush = () => {
    if (!buf.length) return;
    const joined = buf.join(" ").trim();
    buf = [];
    if (joined) out.push(joined);
  };

  for (const raw of lines) {
    const ln = raw.trim();
    if (!ln) {
      flush();
      continue;
    }
    /* 短行（标题、表注、署名）独立成段 */
    if (ln.length < 40) {
      flush();
      out.push(ln);
      continue;
    }
    buf.push(ln);
  }
  flush();
  return out;
}

/**
 * 从答案侧抽「可字面对齐」的 token：数字（去千分位）+ 专有名词。
 * 中文答案 vs 英文原文，语义对齐做不到，只做能验证的字面命中。
 */
export function tokensOf(sentences: AnswerSentence[]): string[] {
  const set = new Set<string>();
  for (const s of sentences) {
    for (const m of s.text.matchAll(/[\d,]+(?:\.\d+)?/g)) {
      const n = m[0].replace(/,/g, "");
      if (n.length >= 2) set.add(n);
    }
    for (const m of s.text.matchAll(/\b[A-Z][A-Za-z&.]{1,20}\b/g)) {
      if (m[0].length >= 3) set.add(m[0]);
    }
    for (const m of s.text.matchAll(/《([^》]{2,40})》/g)) {
      set.add(m[1]);
    }
  }
  return [...set];
}

export const sentenceHasHit = (sentence: string, tokens: string[]): boolean =>
  tokens.some((t) => t.length >= 2 && sentence.toLowerCase().includes(t.toLowerCase()));

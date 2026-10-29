/**
 * MD 材料解析器 —— 后端唯一要「看懂」的东西。
 *
 * 输入是 agent 按模板填好的 .md，输出是前端要的 Material：
 *
 *   ---
 *   id: 05-chain-tracking-2026-10-22-HBM
 *   cat: "05"
 *   ...
 *   ---
 *   ## Q1 · 读数属于哪层哪一环
 *   （答案，引用写成 [p.3]）
 *   ### 依据
 *   - [p.3] …
 *
 * 只认三个结构：frontmatter、`## <id> · <label>`、`### 依据`。别的一律当正文。
 * 解析要宽容：占位符（`<在此填写…>` / `YYYY-MM-DD`）当空处理，不许当成真实数据。
 */

const PLACEHOLDER = /^<.*>$|^YYYY-MM-DD$|^HH:MM$|^…$/;

/** 极简 YAML：只支持 `key: value`，够 frontmatter 用 */
export function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: src };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const i = line.indexOf(":");
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (!val) continue;
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (PLACEHOLDER.test(val)) continue;
    meta[key] = val;
  }
  return { meta, body: src.slice(m[0].length) };
}

/** `## Q1 · 读数属于哪层哪一环` → { id, label } */
const HEAD = /^##\s+([A-Za-z0-9_-]+)\s*[·:：-]\s*(.+?)\s*$/;

/** 一块原文证据：`- p.3｜原文片段` */
const BLOCK = /^p\.(\d+)\s*[｜|]\s*(.+)$/i;
/** 兼容旧的 `- [p.3] 原文` 写法 */
const BLOCK_OLD = /^\[p\.(\d+)\]\s*(.*)$/i;
/** 明确「材料里没有」的句子，不要求挂页码 */
const EXEMPT = /材料未给出|未披露|未提供|无此项|不适用/;

/** 证据区专用的占位判定：只认「明显没填」。表格行 `<tr>…</tr>` 是正文，不是占位符 */
const EV_PLACEHOLDER = /^(…|\.\.\.)$|在此填写|待填写|<在此|^TODO$/;

/** 把正文切成 [{ id, label, answer, blocks[], sentences[] }] */
export function parseSections(body) {
  const out = [];
  const lines = body.split(/\r?\n/);
  let cur = null;
  let buf = [];
  let ev = [];
  let inEvidence = false;

  const flush = () => {
    if (!cur) return;
    const answer = buf.join("\n").trim();
    out.push({ id: cur.id, label: cur.label, answer, blocks: ev });
    cur = null;
    buf = [];
    ev = [];
    inEvidence = false;
  };

  for (const line of lines) {
    const h = HEAD.exec(line);
    if (h) {
      flush();
      cur = { id: h[1], label: h[2] };
      continue;
    }
    if (!cur) continue;
    if (/^###\s*依据/.test(line)) {
      inEvidence = true;
      continue;
    }
    if (/^###\s/.test(line) && !/^###\s*依据/.test(line)) {
      // 别的三级标题：当作正文继续，但不进依据
      inEvidence = false;
      continue;
    }
    if (inEvidence) {
      const item = line.trim().replace(/^[-*]\s*/, "");
      if (!item || EV_PLACEHOLDER.test(item)) continue;
      const b = BLOCK.exec(item) || BLOCK_OLD.exec(item);
      if (b) {
        const quote = b[2].trim();
        if (quote && !EV_PLACEHOLDER.test(quote)) ev.push({ page: Number(b[1]), quote });
      }
      /* 不符合块格式的行忽略：校验时会以「块缺失」暴露出来 */
    } else if (!line.trim().startsWith("<!--")) {
      /* 题目下面那段「> 读法：…」是写给 agent 的指令，不算答案
         （答案一旦开始就不能再跳过，所以只在还没写答案时生效） */
      if (!buf.some((l) => l.trim()) && /^\s*>/.test(line)) continue;
      /* ★ 2026-10-28 修正：骨架里的 `<在此填写答案，不要写页码>` 是占位符，不是答案。
         原来只有依据区用 EV_PLACEHOLDER 过滤，答案区没过滤，导致
         全新的空骨架被判成「7 行有答案 · 0 块原文 · 7 行没登记」。
         这与「空骨架也报 OK」是同一个坑的两面：都把占位符当成了真实内容。 */
      if (PLACEHOLDER.test(line.trim()) || EV_PLACEHOLDER.test(line.trim())) continue;
      buf.push(line);
    }
  }
  flush();
  return out;
}

/** 答案里出现的页码，按出现顺序去重 */
export function citedPages(answer) {
  const seen = new Set();
  for (const m of answer.matchAll(/\[p\.(\d+)\]/g)) seen.add(Number(m[1]));
  return [...seen].sort((a, b) => a - b);
}

/**
 * 一份 md → Material（前端要的形状）。
 * `cells` 只放**非空**答案：空的行在前端要显示成斜线空格，那是有效读数。
 */
export function mdToMaterial(src, fallbackId) {
  const { meta, body } = parseFrontmatter(src);
  const sections = parseSections(body);
  const cells = {};
  for (const s of sections) {
    if (s.answer) cells[s.id] = s.answer;
  }
  return {
    id: meta.id || fallbackId,
    cat: meta.cat || "",
    sub: meta.sub || "",
    name: meta.title || "",
    kind: meta.kind || "",
    issuer: meta.issuer || "",
    ticker: meta.ticker || "",
    date: meta.date || "",
    time: meta.time || "",
    cells,
    filled: Object.keys(cells).length,
    total: sections.length,
    /* 原文证据：每行一块数组，校验与详情页都用它 */
    evidence: Object.fromEntries(sections.map((s) => [s.id, s.blocks])),
    /* 后端多给的字段：前端现在不用，但接图表/检索时会要 */
    template: meta.template || "",
    templateVersion: Number(meta.template_version || 0),
    sourcePages: Number(meta.source_pages || 0),
    sections,
  };
}

#!/usr/bin/env node
/**
 * InvestSigh 阅读器后端 —— 零依赖，Node 原生 http。
 *
 * 只服务四个页面：日看板 / 时分矩阵 / 详情页 / 提示词编辑。产业链那三页不联网。
 *
 *   GET  /api/taxonomy                    类与型
 *   GET  /api/materials?cat=&sub=&date=   材料列表（cells 已解析）
 *   GET  /api/materials/:id               单份材料
 *   GET  /api/materials/:id/source        原文分页（404 = 未收录）
 *   GET  /api/prompts/:sub?date=          某日生效的问题与读法
 *   PUT  /api/prompts/:sub                保存一版（顺带重出模板）
 *   GET  /api/templates/:sub?v=           看某版模板原文
 *   GET  /api/health
 *
 * 启动：node server/index.mjs   （默认 5280）
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { mdToMaterial } from "./parse-md.mjs";
import { validateMaterial, summarize } from "./validate.mjs";
import { renderTemplate } from "./template.mjs";
import { readAllPromptSets, readPromptSet, savePromptRows, loadIndex } from "./promptsource.mjs";
import { parseManual } from "./manual.mjs";
import {
  PATHS,
  loadTaxonomy,
  listMaterialFiles,
  listTickerDirs,
  readSource,
  readContent,
  readMeta,
  listFigures,
  figurePath,
  figuresOf,
  listSnapshots,
  snapshotPath,
  ROOT,
} from "./store.mjs";

const PORT = Number(process.env.PORT || 5280);

/* ───────── 材料读取（按 mtime 缓存） ───────── */

const cache = new Map();

function readMaterial(file) {
  const full = file;
  const st = fs.statSync(full);
  const hit = cache.get(full);
  if (hit && hit.mtime === st.mtimeMs) return hit.doc;
  const doc = mdToMaterial(fs.readFileSync(full, "utf8"), path.basename(path.dirname(full)));
  cache.set(full, { mtime: st.mtimeMs, doc });
  return doc;
}

function allMaterials() {
  const docs = listMaterialFiles()
    .map(({ file, ticker }) => {
      const doc = readMaterial(file);
      /* 标的目录名（小写，如 meta / nvidia）：前端「按标的筛」用它，frontmatter 的 ticker 缺失时也兜得住 */
      return { ...doc, tickerDir: ticker };
    })
    .filter((d) => d.id && d.cat && d.sub);

  /* 卡 ↔ 分册：grid（分册逐行的有/无/缺）与 companions（配套件解析）。
     total 真源 = 分册行数——旧卡缺新题在这里如实显示（unfilled>0），不装满。 */
  for (const doc of docs) {
    const rows = manualRows(doc.sub);
    if (!rows?.length) continue;
    const secById = new Map((doc.sections ?? []).map((s) => [String(s.id), s]));
    doc.grid = rows.map((r) => {
      const s = secById.get(String(r.id));
      return s ? (String(s.answer ?? "").trim() ? "1" : "0") : "x";
    });
    doc.filled = doc.grid.filter((c) => c === "1").length;
    doc.total = rows.length;
    doc.unfilled = doc.grid.filter((c) => c === "x").length;
    doc.companions = companionsOf(doc, rows, docs);
  }

  return docs.sort((a, b) => (a.date === b.date ? (a.time < b.time ? -1 : 1) : a.date < b.date ? -1 : 1));
}

/* ───────── 卡 ↔ 分册（grid / companions） ───────── */

const rowsCache = new Map(); /* slug → { stamp, rows }——分册文件动了自动失效 */

function manualRows(slug) {
  let entry;
  try {
    entry = loadIndex().bySlug.get(slug);
  } catch {
    return null;
  }
  if (!entry) return null;
  const st = fs.statSync(entry.file);
  const stamp = `${st.mtimeMs}:${st.size}`;
  const hit = rowsCache.get(slug);
  if (hit && hit.stamp === stamp) return hit.rows;
  const parsed = parseManual(entry.file, entry.cat, entry.stem);
  const rows = parsed.rows ?? [];
  rowsCache.set(slug, { stamp, rows });
  return rows;
}

/**
 * 配套件解析：把需件 token 落到时间轴上可定位的对象。
 *   同型跨期:N期 → 同 sub、日期更早的最近 N 份（back，可画回连线）
 *   跨类:NN…/同类跨型:NN:… → 同 ticker 同日的另一类材料（cross，同日优先，找不到只给 note）
 *   账本:… / 外部:… → 无日期对象，只登记（ledger / external）
 */
function companionsOf(doc, rows, list) {
  const tokens = [
    ...new Set(
      rows
        .flatMap((r) => String(r.needs ?? "").split(/[;；]/))
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  ];
  if (!tokens.length) return null;
  const validDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && d >= "2000-01-01";
  const out = { tokens, back: [], cross: [], ledger: [], external: [] };
  const backSeen = new Set();
  for (const t of tokens) {
    let m = /^同型跨期[:：](\d+)期/.exec(t);
    if (m) {
      const earlier = list
        .filter(
          (x) =>
            x.sub === doc.sub &&
            x.id !== doc.id &&
            validDate(x.date) &&
            validDate(doc.date) &&
            x.date < doc.date,
        )
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, Number(m[1]));
      out.back.push(
        ...earlier
          .filter((x) => !backSeen.has(x.id) && backSeen.add(x.id))
          .map((x) => ({ id: x.id, date: x.date, name: x.name })),
      );
      continue;
    }
    m = /^(?:跨类|同类跨型)[:：](\d{2})/.exec(t);
    if (m) {
      const cat = m[1];
      const sameDay = doc.ticker
        ? list.find(
            (x) =>
              x.cat === cat &&
              x.id !== doc.id &&
              (x.ticker ?? "").toUpperCase() === doc.ticker.toUpperCase() &&
              x.date === doc.date,
          )
        : null;
      out.cross.push({ cat, note: t, date: sameDay?.date ?? (validDate(doc.date) ? doc.date : null), id: sameDay?.id ?? null });
      continue;
    }
    if (/^账本[:：]/.test(t)) {
      out.ledger.push(t);
      continue;
    }
    if (/^外部[:：]/.test(t)) {
      out.external.push(t);
      continue;
    }
  }
  return out;
}

/* ───────── 提示词 → PromptSet ─────────
   真源是手册（见 promptsource.mjs）；这里不再有任何「版本→PromptSet」的转换逻辑。 */

/* ───────── 静态托管（生产模式：vite build 产物 dist/，与 /api 同端口同源） ─────────
   开发模式没有 dist/，这里全部落空 → 照旧 404，不影响本地 dev 流程。 */

const DIST = path.join(ROOT, "dist");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

function serveStatic(req, res, pathname) {
  if (req.method !== "GET" && req.method !== "HEAD") return false;
  /* 防目录穿越：解析后必须仍在 dist 内 */
  const full = path.resolve(DIST, "." + pathname);
  if (!full.startsWith(DIST + path.sep) && full !== DIST) return false;

  let file = full;
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    /* SPA 兜底：非资源路径一律回 index.html，交给前端路由 */
    if (path.extname(pathname)) return false;
    file = path.join(DIST, "index.html");
    if (!fs.existsSync(file)) return false;
  }
  const type = MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream";
  const buf = fs.readFileSync(file);
  res.writeHead(200, {
    "Content-Type": type,
    "Content-Length": buf.length,
    /* 带 hash 的资源长缓存；index.html 不缓存，保证发版即生效 */
    "Cache-Control": pathname.startsWith("/assets/") ? "public, max-age=31536000, immutable" : "no-cache",
  });
  res.end(req.method === "HEAD" ? undefined : buf);
  return true;
}

/* ───────── 路由 ───────── */

const send = (res, code, body, type = "application/json; charset=utf-8") => {
  res.writeHead(code, {
    "content-type": type,
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,PUT,OPTIONS",
    "access-control-allow-headers": "content-type",
    "cache-control": "no-store",
  });
  res.end(typeof body === "string" ? body : JSON.stringify(body));
};

const bodyOf = (req) =>
  new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve(null);
      }
    });
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const p = url.pathname.replace(/^\/api/, "").replace(/\/+$/, "") || "/";

  if (req.method === "OPTIONS") return send(res, 204, "");

  try {
    /* 健康检查 */
    if (p === "/health") {
      return send(res, 200, { ok: true, materials: listMaterialFiles().length, api: "investsigh-read" });
    }

    /* 类与型 */
    if (p === "/taxonomy" && req.method === "GET") {
      return send(res, 200, loadTaxonomy());
    }

    /* 材料列表 */
    if (p === "/materials" && req.method === "GET") {
      const cat = url.searchParams.get("cat");
      const sub = url.searchParams.get("sub");
      const date = url.searchParams.get("date");
      const tickerDir = url.searchParams.get("ticker");
      let list = allMaterials();
      if (cat) list = list.filter((m) => m.cat === cat);
      if (sub) list = list.filter((m) => m.sub === sub);
      if (tickerDir) list = list.filter((m) => m.tickerDir === tickerDir.toLowerCase());
      if (date) list = list.filter((m) => m.date === date);
      return send(res, 200, list);
    }

    /* 已产出过材料的标的目录（output/<标的>/） */
    if (p === "/tickers" && req.method === "GET") {
      return send(res, 200, listTickerDirs());
    }

    /* 图表：列出清单 / 取单张图片
       GET /materials/:id/figures            → [{name, page}]，page 可为 null
       GET /materials/:id/figures/:name      → 图片字节（按扩展名给 Content-Type） */
    const fgList = /^\/materials\/([^/]+)\/figures$/.exec(p);
    if (fgList && req.method === "GET") {
      const id = decodeURIComponent(fgList[1]);
      const figures = figuresOf(id);
      return send(res, 200, { id, count: figures.length, figures });
    }
    const fgOne = /^\/materials\/([^/]+)\/figures\/([^/]+)$/.exec(p);
    if (fgOne && req.method === "GET") {
      const id = decodeURIComponent(fgOne[1]);
      const name = decodeURIComponent(fgOne[2]);
      const f = figurePath(id, name);
      if (!f) return send(res, 404, { error: "no figure" });
      const ext = path.extname(f).toLowerCase();
      const type =
        ext === ".png" ? "image/png"
        : ext === ".webp" ? "image/webp"
        : ext === ".gif" ? "image/gif"
        : ext === ".bmp" ? "image/bmp"
        : "image/jpeg";
      try {
        const buf = fs.readFileSync(f);
        res.writeHead(200, {
          "Content-Type": type,
          "Content-Length": buf.length,
          "Cache-Control": "public, max-age=3600",
        });
        return res.end(buf);
      } catch {
        return send(res, 500, { error: "figure read failed" });
      }
    }

    /* 整页快照：清单 / 取图（用于核对「MinerU 把复合图表拆碎了」） */
    const snList = /^\/materials\/([^/]+)\/snapshots$/.exec(p);
    if (snList && req.method === "GET") {
      const id = decodeURIComponent(snList[1]);
      return send(res, 200, { id, snapshots: listSnapshots(id) });
    }
    const snOne = /^\/materials\/([^/]+)\/snapshots\/([^/]+)$/.exec(p);
    if (snOne && req.method === "GET") {
      const f = snapshotPath(decodeURIComponent(snOne[1]), decodeURIComponent(snOne[2]));
      if (!f) return send(res, 404, { error: "no snapshot" });
      const ext = path.extname(f).toLowerCase();
      const type = ext === ".png" ? "image/png" : "image/jpeg";
      try {
        const buf = fs.readFileSync(f);
        res.writeHead(200, { "Content-Type": type, "Content-Length": buf.length,
                             "Cache-Control": "public, max-age=3600" });
        return res.end(buf);
      } catch {
        return send(res, 500, { error: "snapshot read failed" });
      }
    }

    /* 单份材料 / 原文 / 证据质检 */
    const m = /^\/materials\/([^/]+)(\/source|\/quality|\/content|\/meta)?$/.exec(p);
    if (m && req.method === "GET") {
      const id = decodeURIComponent(m[1]);
      if (m[2] === "/source") {
        const src = readSource(id);
        return src ? send(res, 200, src) : send(res, 404, { error: "no source" });
      }
      if (m[2] === "/content") {
        const md = readContent(id);
        return md == null
          ? send(res, 404, { error: "no content" })
          : send(res, 200, { id, markdown: md });
      }
      if (m[2] === "/meta") {
        const meta = readMeta(id);
        return meta ? send(res, 200, meta) : send(res, 404, { error: "no meta" });
      }
      const hit = allMaterials().find((x) => x.id === id);
      if (!hit) return send(res, 404, { error: "not found" });
      if (m[2] === "/quality") {
        const r = validateMaterial(hit, readSource(id));
        return send(res, 200, { ...r, summary: summarize(id, r) });
      }
      return send(res, 200, hit);
    }

    /* ───────── 提示词：**真源 = corpus/prompts/<NN>-型/<册>.md 的 ## 4. 问句表** ─────────
       index.json / taxonomy.json 只是过时产物，不再作为行内容来源。
       手册是"当前态"，没有多版概念 ⇒ 版本号恒为 1、生效日恒为基线。 */

    /* 一次拿全部（前端启动用） */
    if (p === "/prompts" && req.method === "GET") {
      return send(res, 200, readAllPromptSets());
    }

    /* 兼容旧端点：现在也回「全部版本」，但只有一版（手册就是当前态） */
    if (p === "/prompt-versions" && req.method === "GET") {
      const out = {};
      for (const set of readAllPromptSets()) {
        out[set.subId] = [
          {
            at: set.effectiveFrom,
            rows: set.rows.map((r) => ({ id: r.id, label: r.label, reading: r.reading, kind: r.kind })),
          },
        ];
      }
      return send(res, 200, out);
    }

    /* 读单型（手册里的问句表） */
    const pr = /^\/prompts\/([^/]+)$/.exec(p);
    if (pr && req.method === "GET") {
      const subId = decodeURIComponent(pr[1]);
      const set = readPromptSet(subId);
      if (!set) return send(res, 404, { error: `没有对应的手册：${subId}` });
      return send(res, 200, set);
    }

    /* 写：**原地改写手册的问句表**（第 2 列问题 / 第 3 列读法），其余字节不动 */
    if (pr && req.method === "PUT") {
      const subId = decodeURIComponent(pr[1]);
      const body = await bodyOf(req);
      if (!body || !Array.isArray(body.rows)) {
        return send(res, 400, { error: "需要 { rows[] }" });
      }
      try {
        const res1 = savePromptRows(subId, body.rows);
        const set = readPromptSet(subId);
        return send(res, 200, { ...set, write: res1 });
      } catch (e) {
        const msg = String(e?.message || e);
        /* 行内容不合法 → 400；没有手册 → 404 */
        const code = /没有对应的手册/.test(msg) ? 404 : 400;
        return send(res, code, { error: msg });
      }
    }

    /* 看模板原文 —— 模板是**问句表的生成物**：现场按手册当前问句表渲染，
       不再读旧版 template.vN.md（那是统一之前留下的产物，版本号已无意义）。 */
    const tp = /^\/templates\/([^/]+)$/.exec(p);
    if (tp && req.method === "GET") {
      const subId = decodeURIComponent(tp[1]);
      const set = readPromptSet(subId);
      if (!set) return send(res, 404, { error: `没有对应的手册：${subId}` });
      const md = renderTemplate({
        subId,
        cat: set.cat,
        version: 1,
        rows: set.rows,
        oneLiner: loadTaxonomy().cats.flatMap((c) => c.subtypes).find((s) => s.id === subId)?.oneLiner ?? "",
      });
      return send(res, 200, md, "text/markdown; charset=utf-8");
    }

    /* 生产模式：API 没接住的 GET 一律尝试 dist/ 静态托管（dev 无 dist → 404） */
    if (serveStatic(req, res, url.pathname)) return;
    return send(res, 404, { error: `no route ${req.method} ${p}` });
  } catch (e) {
    console.error(e);
    return send(res, 500, { error: String(e?.message || e) });
  }
});

/* 绑 0.0.0.0：本机/局域网/Tailscale 虚拟网都能访问；只监听 127.0.0.1 时外网流量进不来 */
server.listen(PORT, "0.0.0.0", () => {
  const hasDist = fs.existsSync(DIST);
  console.log(`InvestSigh Read → http://0.0.0.0:${PORT}  [${hasDist ? "生产模式：dist/ + /api 同端口" : "纯 API 模式（无 dist，dev 时前端走 Vite 5277）"}]`);
  console.log(`  材料 ${listMaterialFiles().length} 份 → output/<标的>/<材料 id>/material.md`);
  console.log(`  标的 ${listTickerDirs().length} 个 → ${listTickerDirs().join(", ") || "(空)"}`);
  console.log(`  模板 ${fs.existsSync(PATHS.templatesDir) ? fs.readdirSync(PATHS.templatesDir).filter((f) => f.endsWith(".md")).length : 0} 份 → corpus/templates/`);
  console.log(`  提示词 ${readAllPromptSets().length} 型 → corpus/prompts/<NN>-型/*.md 的 ## 4. 问句表（手册即真源）`);
});


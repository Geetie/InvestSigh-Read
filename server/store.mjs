import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * 文件存储 —— 没有数据库，只有两个根目录。
 *
 *   corpus/                        喂给 agent 的一切（人维护）
 *     prompts/<NN>-型/<册>.md      判读手册（唯一真相源：问句表 + 读法 + 判据）
 *     templates/<类>-<册>.md       采集登记表模板（33 份）；agent 复制到 output/<标的>/<材料 id>/
 *     materials/<材料 id>/         **一份材料一个子文件夹**，文本与图片同处一室：
 *         source.pdf|.htm|.xlsx       原始件
 *         content.md                  全文，**图片按阅读顺序内联**
 *         pages.json                  分页文本 + 每页的 figures（带 order）
 *         figures/001_p012_00.jpg     序号_页_页内序 —— 按文件名排 = 按阅读顺序
 *         meta.json                   子型/日期/页数/图数
 *
 *   output/                        agent 的产出（机器写）
 *     <标的>/<材料 id>/material.md  填好的成品；后端解析这一份
 *
 * 为什么分开：corpus 是**输入**，人可以改、可以重跑；output 是**产物**，
 * 按「标的 / 材料」两级放，删掉重跑不影响任何输入。
 *
 * 2026-10-27 结构调整：原先 raw/（按子型堆原始件）与 mineru/（按 id 放文本+图）分离，
 * 图片与它对应的文本不在一个目录、也没有阅读顺序。现在合并成「一份一目录」，
 * 图片名自带序号，`content.md` 里按序内联。旧的 raw/ 与 mineru/ 保留为兼容（仅迁移用）。
 */

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const PATHS = {
  corpus: path.join(ROOT, "corpus"),
  promptsDir: path.join(ROOT, "corpus", "prompts"),
  templatesDir: path.join(ROOT, "corpus", "templates"),
  /** 一份材料一个子目录（2026-10-27 起的主结构） */
  materials: path.join(ROOT, "corpus", "materials"),
  /** 旧结构，仅作迁移兜底读取；新代码一律走 materials/<id>/ */
  raw: path.join(ROOT, "corpus", "materials", "raw"),
  mineru: path.join(ROOT, "corpus", "materials", "mineru"),
  output: path.join(ROOT, "output"),
  taxonomy: path.join(ROOT, "server", "data", "taxonomy.json"),
};

for (const dir of [PATHS.promptsDir, PATHS.templatesDir, PATHS.materials, PATHS.output]) {
  fs.mkdirSync(dir, { recursive: true });
}

/* ───────── json ───────── */

const readJson = (file, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
};

const writeJson = (file, value) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2), "utf8");
  fs.renameSync(tmp, file);
};

export const loadTaxonomy = () => readJson(PATHS.taxonomy, { cats: [] });
export const saveTaxonomy = (t) => writeJson(PATHS.taxonomy, t);

/* ───────── 材料（output/<标的>/<材料 id>/material.md） ───────── */

/**
 * 两级目录：**第一级 = 标的**（小写，`meta` / `nvidia` / …），**第二级 = 材料 id**。
 *
 *   output/
 *   └── meta/
 *       ├── 03-broker-research-2026-09-09-META-MuseArrived/
 *       │   └── material.md
 *       └── 03-broker-research-2026-07-30-META-GS2Q26Review/
 *           └── material.md
 *
 * 为什么按标的分：一份标的的材料拆解要能一把捞走；不按标的分的平铺目录
 * 做到几十个标的、上千份材料就没人找得到了。
 *
 * 「有没有这份材料」= `<标的>/<材料 id>/material.md` 这个文件在不在。
 * 只认这两级；`output/README.md` 这类说明文件不算材料。
 */
export function listMaterialFiles() {
  if (!fs.existsSync(PATHS.output)) return [];
  const out = [];
  for (const t of fs.readdirSync(PATHS.output, { withFileTypes: true })) {
    if (!t.isDirectory() || t.name.startsWith(".") || t.name === "_") continue;
    const tickerDir = path.join(PATHS.output, t.name);
    for (const m of fs.readdirSync(tickerDir, { withFileTypes: true })) {
      if (!m.isDirectory() || m.name.startsWith(".")) continue;
      const f = path.join(tickerDir, m.name, "material.md");
      if (fs.existsSync(f)) out.push({ file: f, ticker: t.name, id: m.name });
    }
  }
  return out;
}

/** output/ 下已有产物的标的目录（小写短名），前端用来列标的 */
export function listTickerDirs() {
  if (!fs.existsSync(PATHS.output)) return [];
  return fs
    .readdirSync(PATHS.output, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith(".") && d.name !== "_")
    .map((d) => d.name)
    .sort();
}

export const materialPath = (tickerDir, id) =>
  path.join(PATHS.output, tickerDir, id, "material.md");

export function writeMaterial(tickerDir, id, md) {
  const dir = path.join(PATHS.output, tickerDir, id);
  fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, "material.md");
  fs.writeFileSync(f, md, "utf8");
  return f;
}

/* ───────── 模板（corpus/templates/<类>-<册>.md，33 份） ───────── */

/** 按子型 slug 找模板文件；找不到返回 null。
 *  slug → 中文册名的映射走 taxonomy（slug 是英文短名，模板名是中文）。 */
export function templatePath(slug) {
  const tax = loadTaxonomy();
  for (const c of tax.cats ?? []) {
    for (const s of c.subtypes ?? []) {
      if (s.id !== slug) continue;
      const f = path.join(PATHS.templatesDir, `${c.id}-${s.name}.md`);
      if (fs.existsSync(f)) return f;
      /* 册名里可能有 / 之类，退一步按前缀+包含匹配 */
      const hit = fs
        .readdirSync(PATHS.templatesDir)
        .find((n) => n.startsWith(`${c.id}-`) && n.includes(s.name.replace(/[\\/:*?"<>|]/g, "")));
      if (hit) return path.join(PATHS.templatesDir, hit);
    }
  }
  return null;
}

/* ───────── 材料目录（一份一目录） ───────── */

/** 一份材料的目录：corpus/materials/<id>/ */
export const materialDir = (id) => path.join(PATHS.materials, id);

/** 兼容旧调用名（mineru/ 已成旧结构） */
export const mineruDir = (id) => materialDir(id);

export function readSource(id) {
  const f = path.join(materialDir(id), "pages.json");
  return fs.existsSync(f) ? readJson(f, null) : null;
}

export function writeSource(id, doc) {
  const dir = materialDir(id);
  fs.mkdirSync(dir, { recursive: true });
  writeJson(path.join(dir, "pages.json"), doc);
}

/** 可读全文（图片已按阅读顺序内联） */
export function readContent(id) {
  const f = path.join(materialDir(id), "content.md");
  return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null;
}

/** 这份材料的元信息（子型/日期/页数/图数） */
export function readMeta(id) {
  const f = path.join(materialDir(id), "meta.json");
  return fs.existsSync(f) ? readJson(f, null) : null;
}

/* ───────── 图表（figures/） ─────────
   图片与它对应的文本**在同一个目录**下：`materials/<id>/figures/`。
   文件名自带阅读顺序：`001_p012_00.jpg` = 全书第 1 张 / 第 12 页 / 页内第 0 张，
   所以**按文件名排序就等于按阅读顺序**。页码与顺序的权威来源仍是
   `pages.json` 的 `figures[]`（含 `order` 与 `page`），文件名只是它的可视化。
*/

const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"]);

/** 列出某材料的全部图片文件名（**按名排序 = 按阅读顺序**） */
export function listFigures(id) {
  const dir = path.join(materialDir(id), "figures");
  if (!fs.existsSync(dir)) return [];
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMG_EXT.has(path.extname(f).toLowerCase()))
      .sort();
  } catch {
    return [];
  }
}

/** 解析单个图片的绝对路径；**拒绝越界**（名字里带 .. / 分隔符一律不给） */
export function figurePath(id, name) {
  if (!name || name.includes("..") || name.includes("/") || name.includes("\\")) return null;
  if (!IMG_EXT.has(path.extname(name).toLowerCase())) return null;
  const f = path.join(materialDir(id), "figures", name);
  return fs.existsSync(f) ? f : null;
}

/**
 * 列出图片，带上页码与阅读顺序。
 *
 * 权威来源是 `pages.json` 的 `figures[]`（由 content_list 的 `img_path`+`page_idx`+`bbox`
 * 生成，`order` = 全书阅读顺序）。文件名里的序号是它的可视化副本，用于**按名排序**。
 * 若 pages.json 没有 figures（老数据），退化为按文件名解析。
 */
export function figuresOf(id) {
  const doc = readSource(id);
  const listed = listFigures(id);
  if (!listed.length) return [];
  const meta = new Map();
  for (const f of Array.isArray(doc?.figures) ? doc.figures : []) {
    if (f && f.name) meta.set(f.name, f);
  }
  return listed.map((name, i) => {
    const m = meta.get(name);
    if (m) {
      return {
        name,
        page: m.page ?? null,
        order: m.order ?? i + 1,
        url: `/materials/${encodeURIComponent(id)}/figures/${encodeURIComponent(name)}`,
      };
    }
    return {
      name,
      page: pageOfFigureByName(name),
      order: i + 1,
      url: `/materials/${encodeURIComponent(id)}/figures/${encodeURIComponent(name)}`,
    };
  });
}

/* ───────── 整页快照（snapshots/） ─────────
   把 PDF 一页整体渲染成的图。用于「MinerU 把复合图表拆碎了」时做最终参照。
   与 figures/ 分开存，避免与 MinerU 抽出的图元混淆。 */

export function listSnapshots(id) {
  const dir = path.join(materialDir(id), "snapshots");
  if (!fs.existsSync(dir)) return [];
  try {
    return fs.readdirSync(dir)
      .filter((f) => IMG_EXT.has(path.extname(f).toLowerCase()))
      .sort();
  } catch {
    return [];
  }
}

export function snapshotPath(id, name) {
  if (!name || name.includes("..") || name.includes("/") || name.includes("\\")) return null;
  if (!IMG_EXT.has(path.extname(name).toLowerCase())) return null;
  const f = path.join(materialDir(id), "snapshots", name);
  return fs.existsSync(f) ? f : null;
}

/** 单张图 → 页码 */
export function pageOfFigure(id, name) {
  const doc = readSource(id);
  for (const f of Array.isArray(doc?.figures) ? doc.figures : []) {
    if (f && f.name === name) return f.page ?? null;
  }
  return pageOfFigureByName(name);
}

/**
 * 仅按文件名解析（兜底）。
 * 新命名：`001_p012_00.jpg` → 页 12；旧命名：`page_11_x.jpg`（0 基）→ 页 12、`p005.png` → 页 5。
 */
export function pageOfFigureByName(name) {
  /* 新命名：`001_p012_00.jpg`（带 p）、兼容早期 `001_012_00.jpg`（无 p） */
  let m = /^\d{3,}_p(\d{3,})_/.exec(name) || /^\d{3,}_(\d{3,})_\d{2}\./.exec(name);
  if (m) return Number(m[1]);
  m = /^page_(\d+)_/.exec(name);
  if (m) return Number(m[1]) + 1;
  m = /^p(\d+)\./i.exec(name);
  if (m) return Number(m[1]);
  return null;
}

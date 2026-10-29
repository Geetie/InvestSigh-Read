# materials —— agent 的原料

两层分开放，因为它们的用途完全不同：

| 目录 | 里面是什么 | 谁写 | 谁读 |
|---|---|---|---|
| `raw/<类>/<子型>/` | 原始 PDF / docx / html / 网页存档，文件名 = `<材料 id>.pdf` | 人 | MinerU（前置处理） |
| `mineru/<材料 id>/` | MinerU 的输出：`full.md`、`pages.json`、`figures/` | MinerU | agent |

## 为什么不直接给 agent 塞 PDF

- PDF 里的表格、双栏、页眉页脚会让模型读串行；MinerU 出来的是线性 markdown 加页码锚点；
- `pages.json` 按页切好，详情页右栏要靠它把答案里的 `[p.12]` 回到原文那一页；
- 图在 `figures/` 里，markdown 用相对路径引用，agent 能一起看。

## 命名

`<材料 id>` = `<类号>-<子型>-<日期或序号>-<短标识>`，例如 `05-chain-tracking-2026-10-22-HBM`。

同一个 id 会出现在三处（raw 的文件名、mineru 的文件夹名、`output/<标的>/<材料 id>/`），
它是唯一的对账钥匙 —— 改名等于换了一份材料。

## 已入库：Meta 专题研报 26 件（2026-10-26）

来源 = `system/env/meta/raw/batches/2026-10-18/`（`_extract_manifest.json` n=274 / done=274 / failed=0）。
挑选与判定过程见 `docs/v7/Meta专题研报清单_2026-10-25.md`，逐件账见 `ingest-manifest-2026-10-26.json`。

| 项 | 值 |
|---|---|
| 件数 | 26（25 篇研报 PDF + 1 份 GS Meta 估值模型 xlsx） |
| 子型 | `raw/03/broker-research/` 18 件 · `raw/03/independent-research/` 8 件 |
| 覆盖财报季 | 4Q25（2026-01-28 披露）5 篇 · 1Q26（2026-04-29）· 2Q26（2026-07-29）共 21 件 |
| 页数 | 合计 376 页；`pages.json` 页数已逐件对过源 PDF 实际页数（0 失配） |
| 图 | 24 个材料有 `figures/`（3 件正文无插图，MinerU 不产图，正常） |

三条落点纪律（本次实测踩出来的）：

1. **`pages.json` 必须按源 PDF 页数补齐空页**。MinerU `content_list.json` 只记有内容块的页，
   末尾整页为空的会缺页 → 详情页右栏 `[p.N]` 点不到。**用 pypdf 数实际页数对齐，不要信 content_list 的最大 page_idx。**
2. **`full.md` 的图片引用要从 `images/` 改写成 `figures/`**，否则 md 里的相对路径指向一个不存在的目录。
3. **`output/<标的>/<材料 id>/material.md` 只放骨架**（frontmatter + 题号，答案区留空）。
   依 `交接.md §3`「output 必须从空开始，任何预填都是假的」——填字是读材料那一步的事。
   骨架的 `template_version` 必须 **≥2**：`validate.mjs` 把 `<=1` 一律判 `legacy` 跳过证据校验，
   新材料要参与校验就不能停在 v1。
4. **骨架的题号要用阅读器认的那一版**。`corpus/templates/` 是采集登记表（S00–S34），
   阅读器的矩阵行却来自 `corpus/prompts/` 的手册问句表（本批 `broker-research` 是 Q1–Q12）。
   取法：`GET /templates/<sub>` —— 那是后端按手册现场渲染的，与界面同源。


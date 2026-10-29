# corpus —— 喂给 agent 的一切

这个目录是**输入区**：人维护，可以改、可以重跑。产出不在里面（在 `../output/`）。

```
corpus/
├── prompts/                     ← 判读手册（唯一真相源：问句表 + 读法 + 判据）
│   ├── 01-监管一手披露.md … 07-情绪与预期.md     ← 7 个类主件
│   ├── 01-型/ … 07-型/                          ← 34 个型分册
│   └── RUN-PARALLEL.md                          ← 并行跑的口径与表达纪律
├── templates/                   ← 采集登记表模板（33 份，`<类>-<册>.md`）
└── materials/
    ├── raw/<类>/<子型>/         ← 原始 PDF / docx / html / 网页存档
    └── mineru/<材料 id>/        ← MinerU 处理后的文本
        ├── full.md              ← 正文 markdown（带 figures/ 图片引用）
        ├── pages.json           ← 按页切好的文本（详情页右栏用）
        └── figures/             ← 抽出来的图
```

## 三条硬规则

1. **模板不许手改，也不许手写第二份**。`corpus/templates/<类>-<册>.md` 由 `corpus/prompts/` 的手册问句表渲染；
   要改问题或读法，去手册（或界面）改，然后 `node server/regen-templates.mjs` 重出。
   `GET /templates/<sub>` 可以随时看当前渲染结果 —— 界面用的就是它。

2. **一份材料一个 id，贯穿三个地方**：`materials/raw/.../<id>.pdf`、`materials/mineru/<id>/`、
   `output/<标的>/<id>/material.md`。id 是唯一的对账钥匙，改名等于换了一份材料。

3. **read 与 write 分离**：这个目录里只放输入；agent 的成品一律写到
   `../output/<标的>/<材料 id>/material.md`（按标的分目录，见 `../output/README.md`）。

## agent 一次运行的完整路径

```
corpus/templates/<类>-<册>.md                    ① 复制这份模板
        ↓
output/<标的>/<材料 id>/material.md              ② 落到标的目录下、按材料 id 命名
        ↓  读 corpus/materials/mineru/<材料 id>/full.md 与 pages.json
        ↓  逐行填答案 + 在「### 依据」里抄原文（带 p.N）
node server/check.mjs <标的>/<材料 id>            ③ 过证据三规则
```

## materials 内部约定

`raw/<类>/<子型>/` 与 `mineru/<材料 id>/` 两层分开放，因为用途不同：raw 给 MinerU 做前置处理，
mineru 给 agent 读。命名与落点见 `materials/README.md`。

## 已入库：Meta 专题研报 26 件（2026-10-26）

来源 = `system/env/meta/raw/batches/2026-10-18/`（`_extract_manifest.json` n=274 / done=274 / failed=0）。
挑选与判定过程见 `docs/v7/Meta专题研报清单_2026-10-25.md`，逐件账见 `materials/ingest-manifest-2026-10-26.json`。

| 项 | 值 |
|---|---|
| 件数 | 26（25 篇研报 PDF + 1 份 GS Meta 估值模型 xlsx） |
| 子型 | `raw/03/broker-research/` 18 件 · `raw/03/independent-research/` 8 件 |
| 覆盖财报季 | 4Q25（2026-01-28 披露）5 篇 · 1Q26（2026-04-29）· 2Q26（2026-07-29）共 21 件 |
| 页数 | 合计 376 页；`pages.json` 已逐件对过源 PDF 实际页数（0 失配） |
| 成品 | `output/meta/` 26 份骨架，答案待填 |

三条落点纪律（本次实测踩出来的）：

1. **`pages.json` 必须按源 PDF 页数补齐空页**。MinerU `content_list.json` 只记有内容块的页，
   末尾整页为空的会缺页 → 详情页右栏 `[p.N]` 点不到。**用 pypdf 数实际页数对齐，不要信 content_list 的最大 page_idx。**
2. **`full.md` 的图片引用要从 `images/` 改写成 `figures/`**，否则 md 里的相对路径指向一个不存在的目录。
3. **骨架要用阅读器认的那一版行号**。`corpus/templates/` 是「采集登记表」（S00–S34），
   而阅读器的矩阵行来自 `corpus/prompts/` 的手册问句表（Q1–Q12）——
   骨架必须按后者生成，否则矩阵对不上。取法：`GET /templates/<sub>`。

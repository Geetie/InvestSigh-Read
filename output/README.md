# output —— agent 的成品（按标的分）

```
output/
├── meta/                                        ← 标的（小写短名）
│   ├── 03-broker-research-2026-09-09-META-MuseArrived/
│   │   └── material.md                          ← 唯一必需的文件，后端解析它
│   └── 03-broker-research-2026-07-30-META-GS2Q26Review/
│       └── material.md
├── nvidia/                                      ← 另立一个标的
│   └── <材料 id>/material.md
└── README.md
```

## 结构：两级

| 层 | 是什么 | 规则 |
|---|---|---|
| 第一级 `output/<标的>/` | **标的**，小写短名（`meta` / `nvidia` / `googl`） | 一份标的的拆解能一把捞走；不按标的平铺，几十个标的上千份材料就没人找得到 |
| 第二级 `output/<标的>/<材料 id>/` | **一份材料一个文件夹**，文件夹名 = 材料 id | id 与 `corpus/materials/raw/` 下的文件名、`corpus/materials/mineru/` 下的目录名同源 |
| 文件 `material.md` | 填好的成品 | 名字固定，后端扫的就是它 |

## 规则

- **这个目录是只写区**：agent 写，后端读。想改内容就重跑一遍，不要手工编辑成品
  （要改问法请改 `corpus/prompts/<NN>-型/<册>.md` 的问句表）。
- **起点是 Qxx 答题卡，不是 `corpus/templates/` 里那 33 份**（这条最容易踩）。

  `corpus/templates/*.md` 是 **Sxx 采集登记表**：35 个 `## Sxx` 节、三行制
  （页码范围／登记／档位）、**没有 frontmatter**。那是旧系统（`system/env/meta/runs/`）的产物。
  复制它填出来的东西**解析器认不出**——题号是 `S00` 不是 `Q1`，且缺 `id/cat/sub/template_version`，
  后端会当成无 id 文档直接丢弃。

  正确骨架来自渲染：`GET /templates/<sub>`（`server/template.mjs` 现场生成），形如

  ```
  ---
  id: 03-broker-research-YYYY-MM-DD-<slug>
  cat: 03
  sub: broker-research
  template_version: 2
  ...
  ---
  ## Q1 · <题面>

  <答案>

  ### 依据
  - p.N｜<逐字原文>
  ```

  已有 324 份成品可以直接参考格式，**别手写第二份模板**。
- **每份 `material.md` 的 frontmatter 必须带 `template` 与 `template_version`**，
  它记录了这份成品是用哪一版问法生成的。
  `template_version <= 1` 的材料会被 `validate.mjs` 判为 `legacy` 并**跳过证据校验** ——
  新材料一律 v2 起。
- 删掉某个标的目录或材料目录 = 它从阅读器里消失，`corpus/` 里的原料不受影响。

## 当前状态（2026-10-29）

- `output/meta/` = **324 份 material.md**，`template_version` 全为 2，其中 291 份已带依据块。
- **覆盖缺口**：`corpus/materials` 有 397 份，output 只有 324 份。缺的 73 份里：
  - **04 / 05 / 06 / 07 类全缺**（23 + 13 + 16 + 15 = 67 份），一份成品都没有
  - 03 类缺 6 份（含 2 份 `needsExtraction` 壳尚未抽取、4 份 10-29 新入库）
- 所有成品都在 `output/meta/` 一个标的下；`output/nvidia/` 等尚未建立。
- 填字要按 `corpus/prompts/03-型/投行研报.md` 的 Q1–Q12 逐行读全文、每句带 `[p.N]`、
  依据区逐条抄原文；填完 `node server/check.mjs <标的>/<材料 id>` 过证据三规则。

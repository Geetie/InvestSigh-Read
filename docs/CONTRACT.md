# 阅读器 · 前后端契约

范围只有四个页面：**日看板 / 时分矩阵 / 详情页 / 提示词编辑**。
产业链那三页是静态结构，不联网。

前端此刻跑在 **mock 模式**（不连后端也能用）；配一个 `VITE_API_BASE` 就切到真后端：

```bash
# .env.local
VITE_API_BASE=/api
```

---

## 一、接缝只有一个文件

`src/lib/api.ts` —— 页面里**不许**再出现 `fetch("/data/…")` 或 `localStorage`。
后端换语言、换部署都不动前端组件。

| 函数 | 谁在用 | mock 行为 | http 行为 |
|---|---|---|---|
| `getBundle()` | App 建索引 | 读 `public/data/bundle.json` | `/taxonomy` + `/materials` 拼装 |
| `getMaterials(cat, sub)` | 矩阵/看板 | 从 bundle 过滤 | `GET /materials?cat=&sub=` |
| `getSource(materialId)` | 详情页右栏 | 读 `public/data/sources/*` | `GET /materials/:id/source` |
| `getPrompts(subId, date)` | 提示词页 | localStorage 缓存 | `GET /prompts/:sub?date=` |
| `getPromptVersions()` | `syncPrompts()` 填缓存 | 读 localStorage | `GET /prompt-versions` |
| `savePrompts(subId, rows, from)` | 提示词页保存 | 写 localStorage | `PUT /prompts/:sub` |

> `lib/prompts.ts` 里的 `rowsAt / versionAt / readingOf` 是**同步**取行（首屏要直接算），
> 所以后端的数据在 `syncPrompts()` 时一次性落进本地缓存，页面不用改成异步。
>
> **★ `syncPrompts()` 必须用 `getPromptVersions()`（全部版本），不能用 `getAllPrompts(date)`（当日一版）。**
> 只灌一版进缓存，旧材料就会解析到新问法 —— 旧答案顶着新问题出现，版本隔离被击穿。
> 这条是 2026-10-24 联调实测出的真缺陷，回归判据在 `tools/e2e-readpages.mjs` 的「版本隔离」两条。

---

## 二、五个端点

### 0. `GET /health`（自检）

```json
{ "ok": true, "materials": 1482, "api": "investsigh-read" }
```

### 1. `GET /taxonomy`

```json
{ "cats": [ { "id": "05", "name": "产业链与另类", "oneLiner": "…",
  "subtypes": [ { "id": "chain-tracking", "name": "产业链跟踪", "oneLiner": "…" } ] } ] }
```

### 2. `GET /materials?cat=05&sub=chain-tracking`

三个参数都可省；**全省 = 一次拿完**（前端建索引就发这一个请求，别发 29 个）。

```json
[ {
  "id": "05-chain-tracking-2026-10-22-HBM",
  "cat": "05", "sub": "chain-tracking",
  "name": "HBM 环节产能与订单跟踪 10.22",
  "kind": "跟踪件", "issuer": "摩根士丹利", "ticker": "MU",
  "date": "2026-10-22", "time": "07:00",
  "cells": { "Q1": "答案正文，含 [p.3] 引用…", "Q6": "…" },
  "filled": 9, "total": 12
} ]
```

`cells` 的键是**行 id**，不是问题文字。空答案不要出现在 `cells` 里 —— 前端靠缺席画斜线空格。

### 3. `GET /materials/:id/source`

```json
{ "id": "…", "srcId": "…", "pageCount": 34,
  "pages": [ { "n": 1, "chars": 1820, "text": "…" } ] }
```

没有抽到原文就 `404`，前端显示「未收录」而不是报错。

### 3.5 `GET /prompts?date=2026-10-22`（批量「当日一版」）

返回 `PromptSet[]`，一次拿全部型的**该日生效版**。给「只看某一天」的消费方用。

> **★ 不要拿它填前端缓存** —— 它只回一版，旧版本会被抹掉，版本隔离就破了。
> 填缓存用下面的 `GET /prompt-versions`。

### 3.6 `GET /prompt-versions`（全部型的**全部版本**）

前端启动时用这一个请求把整个版本史灌进本地缓存，之后 `versionAt(subId, 材料日)` 才能回溯。

```json
{ "chain-tracking": [
    { "at": "2000-01-01", "rows": [ { "id": "Q1", "label": "…", "reading": "…", "kind": "data" } ] },
    { "at": "2026-10-23", "rows": [ … ] } ] }
```

形状是 `Record<subId, {at, rows}[]>`，版本按生效日升序。

### 4. `GET /prompts/:sub?date=2026-10-22`

```json
{ "subId": "chain-tracking", "version": 2, "effectiveFrom": "2026-10-23",
  "rows": [ { "id": "Q1", "label": "读数属于哪层哪一环", "reading": "只抄材料给出的数字…", "kind": "data" } ] }
```

### 5. `PUT /prompts/:sub`
整型**全量覆盖**：增、删、改、调序都在这一个请求里，后端拿到的就是最终的行列表（顺序即顺序）。

```json
{ "effectiveFrom": "2026-10-23",
  "rows": [ { "id": "Q1", "label": "…", "reading": "…", "kind": "data" },
            { "id": "Q13", "label": "…", "reading": "…", "kind": "question" } ] }
```

返回同上（新的 `PromptSet`）。

**行 id 的规则（前端分配，后端照收）**

| 场景 | 怎么处理 |
|---|---|
| 新增一行 | 前端分配一个**从未用过**的号：`Q<历史最大号 + 1>` |
| 删除一行 | 该 id 从这一版起消失，但**号不回收** —— 再新增不会拿到它 |
| 调序 | 只换位置，id 一个都不动 |
| 显示序号 | 按位置算（01、02…），与 id 无关 |

> 为什么删掉的号不能回收：答案是**按 id 存**的（`cells[rowId]`）。若 `Q3` 被删后又被新问题复用，
> 旧材料里的 `Q3` 答案会串到这个新问题上 —— 这正是版本隔离要防的事。
> 反过来，删一行**不删任何答案**：旧材料仍解析到它生成时那一版，那一版里这行还在。

**产物落在哪**：`output/<标的>/<材料 id>/material.md` —— 两级目录：第一级是标的（小写短名，`meta` / `nvidia`），第二级是一份材料一个文件夹，文件名固定。
模板里已经写明了这条（给 agent 看），后端只读 `output/`，不写它。

**后端收到 PUT 必须按这个顺序做三件事**：

1. 落库这一版（同一个 `effectiveFrom` 只留一版，当天再改覆盖当天）；
2. **用这一版重新生成该型的 MD 模板**（`.md` 骨架，**按新行列表生成，增删调序都要反映**），旧版本模板归档，不覆盖；
3. 回包。

顺序反了就会出现「模板还是旧问题、但矩阵已经显示新问题」的事故。

---

### 错误约定

| 码 | 场景 |
|---|---|
| 400 | `PUT /prompts` 缺 `effectiveFrom` / `rows`，或某行没有 `label` |
| 404 | 原材料没抽到（前端显示「未收录」，不是报错） |
| 409 | 行 id 重复（说明前端分配 id 出了 bug，必须拒） |
| 500 | 兜底，响应体带 `error` |

---

## 三、MD 模板：由提示词版本生成，不许手写

Agent 每天产 1–N 份材料。**提示词与模板是两份东西**：

| 文件 | 是什么 | 里面有什么 |
|---|---|---|
| `corpus/prompts/<子型>/prompt.v<N>.md` | **提示词** | 问题 + 每条的读法（怎么读、判据、没有怎么办） |
| `corpus/prompts/<子型>/template.v<N>.md` | **答题卡** | 只有题号、问题、依据位；不含读法 |

模板只是让 agent 填字的地方，**读法不进模板**。改读法只重出提示词，不影响已经发出去的答题卡。

答题卡长这样：

```markdown
---
id: 05-chain-tracking-2026-10-22-HBM
cat: "05"
sub: chain-tracking
template: chain-tracking
template_version: 2
date: 2026-10-22
time: 07:00
title: HBM 环节产能与订单跟踪 10.22
kind: 跟踪件
issuer: 摩根士丹利
ticker: MU
source_pages: 34
---

## Q1 · 读数属于哪层哪一环

> 读法：Item 1 的 Business 段末尾或 MD&A 首段会给关键运营指标的定义……

单月营收 2,583 亿元，同比 +34.2%。产量 96%。

### 依据
- p.3｜单月营收 2,583 亿元，同比 +34.2%
- p.3｜产量 96%，环比持平
```

**解析规则（后端照这个切）**

| 目标 | 规则 |
|---|---|
| 元数据 | frontmatter，键名即前端字段名 |
| 一道题 | 以 `## ` 开头的一节；`## ` 后第一个 `·` 前是行 id，之后是问题文字 |
| 读法 | 题下第一段 `> 读法：…`，是给 agent 的指令，**不计入答案**（解析时跳过） |
| 答案 | 该节里 `### 依据` 之前的正文（去掉首尾空行） |
| 原文块 | `### 依据` 下每行 `- p.N｜原文片段`；`｜` 也接受 `|` |
| 未回答 | 正文为空 → 不写进 `cells`；`filled` 只数非空 |
| 引用页码 | **主通道 = 依据区的 `p.N`**（后端解析成 `evidence[rowId]`，前端 `pagesOfEvidence()` 取页）；**兜底 = 答案正文的 `[p.N]`**（仅 v1 旧材料）。与 `source_pages` 比对，越界要报错 |

**原文证据的三条硬规则**（详见 `docs/EVIDENCE-SPEC.md`，`node server/check.mjs` 会逐份查）

1. 有答案的行，依据区至少一条块；
2. **答案正文不写页码**（页码只进依据区）—— 这是功能要求，不是文风：右栏按依据区的 `p.N` 翻页；
3. 每条块必须是第 N 页原文的**逐字片段**（去空白后可搜到，**反斜杠转义要原样保留**）。

不合格分四种 `kind`：`no-block`（有答案没登记）/ `unverified`（查无此文）/ `out-of-range`（页码越界）/ `no-source`（该份无原文）。
`template_version <= 1` 的材料一律 `legacy`，不参与判定。

---

### 前端字段 ↔ 模板字段

| 前端 | 模板 | 谁负责 |
|---|---|---|
| `Material.id / cat / sub / date / time / name / kind / issuer / ticker` | frontmatter 同名键 | 后端解析 |
| 行的 `id / label` | `## <id> · <label>` | 模板生成时写入 |
| 行的 `kind`（问/数） | 不进 md，只影响表格行头样式 | 提示词版本 |
| 行的 `reading`（读法） | **不进 md** —— 它是写给 agent 的指令，不是材料内容 | 提示词版本 |
| 行的答案 | 该节正文 | agent 填写 → 后端解析 |
| 原文依据 | `### 依据` 下 `- p.N｜原文片段` | agent 填写 → 后端解析成 `evidence[rowId]` → 前端右栏翻页 |
| `Material.tickerDir` | 不在 md 里；由后端按 `output/<标的>/` 目录名附加 | 后端扫描 |

> 增删行同样会改模板：删了两行，新模板就少两节；加了一行，新模板就多一节。
> 旧模板文件不删 —— 它对应的是旧版本的问法，旧材料还指着它。

**同步规则（一改全改）**：如果前端加了一个模板里没有的字段（比如给行加 `weight`、
给材料加 `sector`），那就**改模板并重新生成全部版本**，不许前端先上、模板后补。
判据：`GET /taxonomy` + `GET /prompts` 能拼出的字段，必须与 `templates/*` 的字段一一对应。

---

## 四、版本隔离（这条不能动）

- 提示词按**生效日**切版本：某天改完，从那天起用新的问题与读法；
- **每份材料记住自己是用哪一版模板生成的**（frontmatter 的 `template_version`）；
- 矩阵与详情页按**材料自身的日期**解析版本 → 旧材料永远显示它当时的问法与答案；
- 于是「改词」不会篡改历史，也不会让旧答案顶着新标题出现。

同一个 `effectiveFrom` 只保留一版（当天反复改，覆盖当天那版），避免版本号膨胀。

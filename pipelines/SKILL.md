# 材料获取管道 · 操作手册（给 Agent 读）

> 本目录 = `<仓库>/pipelines/`。**它不是一个服务，是一套 CLI 工具**。
> 定时**不由本包负责**：哪天跑、跑几次，由**宿主 Agent**（Codex / WorkBuddy / 系统 cron）
> 通过它自己的定时能力唤起。本包自身**不含任何调度器**，也不假定宿主是谁。
>
> ★ **接手这台机器的第一件事：读 `docs/注意事项.md`**
> （平台差异怎么应变 / 26 个通道的硬验收标准 / 入库前必须读内容 / 已知缺口清单）。
>
> ★ **知识星球已改走官方 CLI，不再抓页面**：见 `docs/zsxq取数.md`
> （两条通道分工、老板只需扫码一次、哪些星球拿不到）。
>
> ★ **定时任务要你（宿主 Agent）自己建**：见 `docs/自动化任务.md`
> （三个任务的 cron 与 prompt 已写好，直接抄）。本包**不含调度器**。
>
> 移植到别的机器（含 macOS）的做法见 `docs/部署与调度.md`。
>
> **T3 的一切（初始化、登录引导、缺口分诊、怎么跟人开口）都在 `docs/T3Agent引导.md`**。
> 那份是**唯一**的 T3 文档——没有"给老板看的版本"，老板不看文档，他只扫码。

---

## 0. 三十秒速查

```bash
cd <仓库根>          # 含 pipelines/ 的那一层，Windows/macOS 都一样

python -m pipelines doctor                      # ⓪ 初始化前自检（必需/T3/可选三类分开报）
python -m pipelines setup --source zsxq          # ⓪ 初始化一个 T3 源（能自动的全自动，只剩扫码）
python -m pipelines selftest                    # ① 开工前自检（静态守卫，不联网）
python -m pipelines health                      # ② 各源今天能不能用（不落材料）
python -m pipelines audit                       # ③ 入库体检（缺件/空页/重复/无源）
python -m pipelines run  --class 01 --as-of 2026-10-28    # ④ 按类跑
python -m pipelines run  --type consensus-gap --as-of 2026-10-28   # ⑤ 补跑单个型
python -m pipelines run  --all --as-of 2026-10-28         # ⑥ 全跑
python -m pipelines status --type consensus-gap --as-of 2026-10-28 # ⑦ 读上次结果
python -m pipelines login  --source zsxq        # ⑧ T3 一次性人工登录（有头，要人看着）
python -m pipelines t3     --source zsxq --as-of 2026-10-28        # ⑨ T3 每日巡检
python -m pipelines list                        # ⑩ 列 34 型与状态
```

---

## 1. 退出码 = 你该做什么（**只看这一个信号就够**）

| 码 | 含义 | 你要做什么 |
|---|---|---|
| **0** | 全部 `ok`（含"查过确实没有"的 `empty`） | 收工。读 `_runs/<日期>/<类>.json` 汇报取到什么 |
| **1** | 有 `failed`（解析坏 / 0 字节 / manifest 缺字段） | **最多重试 1 次**。仍失败就贴 `failed[]` 原文，不要自己改代码 |
| **2** | 输入异常（未知型、`--as-of` 格式错、缺参数） | 修调用参数。**不要重试**（重试必然同样失败） |
| **3** | 有 `unavailable`（不可达 / 无 key / 登录失效 / 结构性无源） | **汇报缺口，不要重试**。重试不改变"源不存在"这件事 |

> **★ `1` 优先于 `3`（同一轮里两者都有时，退出码是 1）**。这是刻意设计：
> `failed` 是"我们的问题"（可修、可重试），`unavailable` 是"世界的问题"（修不了、重试无用）。
> 若让 `3` 盖住 `1`，你会看到"有源不可用"就不重试，于是一个**真的坏掉的工具会长期在线**
> —— 而那正是最该被发现的事。
> **但"哪一型不可用"不会丢**：它就在同一份 JSON 报告的 `gap` 里。
> 所以**即使退出码是 1，也必须逐型读 `gap` 汇报不可用的型**。

---

## 1.1 读报告时最容易漏的一件事

退出码只给一个数，而一类的 6–7 个型各有自己的态。**永远读完整报告，不要只看退出码**：

```bash
cat pipelines/_runs/2026-10-28/07.json
```

`exit_code` 是给流程判断用的；`types[]` 才是给人/Agent 汇报用的。

---

## 2. 读报告：只读 JSON，不要 grep 日志

每次 `run` 会写 `pipelines/_runs/<as-of>/<类码>.json`。形状固定：

```json
{"as_of":"2026-10-28","class_id":"07","class_name":"情绪与预期","exit_code":0,
 "types":[
   {"slug":"consensus-gap","status":"ok","adapter":"stockanalysis",
    "artifacts":[{"id":"07-consensus-gap-2026-10-28-META-forecast","bytes":181148,"pages":6}]},
   {"slug":"prediction-market","status":"unavailable",
    "gap":{"absent_reason":"四端全超时…",
           "checked_scope":["gamma-api.polymarket.com…","api.elections.kalshi.com…"],
           "manual_ref":"corpus/prompts/07-型/预测市场与事件概率.md"}}
 ]}
```

**`gap` 的三个键各有用途，缺一不可**：

- `absent_reason` —— **为什么没有**（给人看的一句话）；
- `checked_scope` —— **查过哪些**（给机器核的清单）；`empty` 缺它就会被降级成 `failed`；
- `manual_ref` —— **手册哪一节说了这是允许的**（判据可回溯）。

---

## 3. 三种态分别怎么写进汇报

| 态 | 汇报话术 | 禁止 |
|---|---|---|
| `ok` | "取到 N 件：<id 列表>" | 不要写"数据完整"（件数 ≠ 结论质量） |
| `empty`（带 `checked_scope`） | "查了 <范围>，确实无新件" | **禁止**写成"没有材料"（少了范围就是撒谎） |
| `unavailable` | "**尚未接入**：<absent_reason>" | **禁止**写成"无风险 / 已覆盖 / 无需关注" |
| `not_run` | "该型是查表册，本管道不取数" | **禁止**写成"取数失败" |

> 这三条不是文风偏好，是 `corpus/prompts/04-型/做空与期权读数.md §0` 的明文纪律：
> "缺数据与没有风险是两回事"。

### 3.1 `empty` 是最容易被误读的一态（实测踩过）

**`empty` 是合格答案，不是故障。** 例：`10-K` 一年只发一次，7 天窗口里 0 件是**正确结果**。
管道当初把它判成 `unavailable`，读报告的人就会以为 SEC 挂了。

判据（`_kit/base.py` 已实现，`tests/test_pipelines_tristate.py` 钉死）：

| 源怎么回答的 | 判成 | 为什么 |
|---|---|---|
| probe 通过、fetch 返回空列表 | **`empty`** + `checked_scope` | 源能用，只是这窗口没这种件 |
| probe 抛异常 / 缺 key / 登录失效 | `unavailable` + `absent_reason` | 源没能回答 |
| 取到件但 0 字节 | `failed` | 等于没取到 |

**看到 `empty` 时不要去找人、不要去重试**——把 `checked_scope` 里的窗口原样汇报即可。

---

## 4. 34 型的六个状态（决定它能不能自动跑）

| status | 型数 | 含义 | 保底行为 |
|---|---|---|---|
| `auto` | 20 | 零密钥全自动 | 必须 `ok` |
| `partial` | 3 | 只覆盖源的一部分 | `ok` + `gap.partial`（**必须转述 partial_note**） |
| `needs_key` | 1 | 缺 free key 不可用 | `unavailable(no_api_key)` → 见 `_keys/README.md` |
| `t3` | 3 | 已购库，需人工登录的浏览器会话 | 会话有效 `ok`；过期 `unavailable(login_expired)` |
| `map` | 6 | 查表册/建构册，不产材料 | `not_run`（**不是失败**） |
| `unavailable` | 1 | 结构性无源 | `unavailable` + 四端 `checked_scope` |

`python -m pipelines list` 可看逐型状态。**`partial` 与 `map` 最容易被误报**：
前者要转述"缺哪一半"，后者要说明"它本来就不取数"。

---

## 5. T3（知识星球 / 腾讯 ima）：唯一有"人工前置"的一类

### 5.1 首次（人做一次）

```bash
python -m pipelines login --source zsxq     # 打开有头浏览器，扫码/输码
python -m pipelines login --source ima
```

登录完成后会写两份会话：`_profiles/<source>/`（profile，保 localStorage）
与 `_profiles/<source>.state.json`（storageState，保 cookie）。**两份都要留**。

### 5.2 之后（Agent 每日跑，headless）

```bash
python -m pipelines t3 --source zsxq --as-of <今天>
```

### 5.3 三条硬边界（**任何情况下不越线**）

1. **不绕验证码**：不做识别、不模拟扫码、不伪造 token。
2. **不绕付费墙**：只下该账号有权访问的文件。
3. **失效即报**：`login_expired` → 退出码 3 → 汇报"需人工重扫"。
   **不许**把它当 `empty`（"查过没有"与"我登不上"是两件事）。

### 5.4 选择器还没钉版时

`t3_sources.yaml` 里的 `item_selector` 现在是 `<待钉>` 占位符。
此时 `t3` 型会回 `unavailable(selector_not_pinned)` —— 这是**如实的状态**，
不是故障。钉版方式：登录后按真实 DOM 填 `item_selector` / `attachment_selector`。

---

## 6. 交给宿主的定时任务（prompt 骨架，直接抄）

> **怎么"挂"到宿主上不在这里管**：cron 表达式、Codex / WorkBuddy 各自的接法、
> Mac 移植步骤，都在 `docs/部署与调度.md §5`。
> 本节只给**任务本身的语义与判据**，不含任何宿主专有语法。

### 6.0 三条铁律（先看这三条，再看骨架）

1. **每个 type 都读 `status`**，不要只看退出码——一类里 6–7 个型，各有各的态。
2. **`gap.action_required` 出现 = 这件事只有人能解**：把它原样转述给人
   （`who` / `needs` / `command` / `steps`），然后**停止重试**。
   重试不会让一个不存在的会话变出来。
3. **`empty` 不许说成"没有材料"**：它是"查了 `checked_scope`，窗口内确实无新件"，
   是合格答案。

### 6.1 盘前自检（每交易日）

```
在仓库根目录（含 pipelines/ 的那一层）运行：
  python -m pipelines selftest
  python -m pipelines health
只需汇报两件事：① selftest 是否全绿；② 哪些型不是 ok（贴型键 + 原因）。
不是 ok 的条目若带 action_required，把 who/needs 一并转述；不要重试，不要修改任何文件。
```

### 6.2 收盘后采集（每交易日 1 次）

```
在仓库根目录（含 pipelines/ 的那一层）运行：
  python -m pipelines run --class 01 --as-of <今天>
  python -m pipelines run --class 03 --as-of <今天>
  python -m pipelines run --class 04 --as-of <今天>
  python -m pipelines run --class 07 --as-of <今天>
然后读管道生成的 _runs/<今天>/*.json，**逐型**报态：
  - ok → 报"取到 N 件：<id 列表>"
  - empty → 报"查了 <gap.checked_scope>，确实无新件"（合格结果，不重试）
  - unavailable 且 gap 有 action_required → 原样转述 who/needs/command/steps，
    然后**停下等人**，不要重试
  - unavailable 且无 action → 只报 gap.absent_reason
  - failed → 贴 failed[] 原文，最多重试 1 次
  - not_run → 说明"该型是查表册，本管道不取数"
不要修改 channels.yaml、不要改代码、不要把 unavailable 说成"无风险"。
```

### 6.3 周度（每周五）

```
  python -m pipelines run --type 07-position-flow --as-of <今天>   # COT 周五发布
  python -m pipelines t3  --source zsxq --as-of <今天>
  python -m pipelines run --type 03-media-analysis --as-of <今天>
```

---

## 7. 目录与落点（找东西时看这里）

```
pipelines/
├── _kit/            五段骨架 / 三态 / manifest / 落盘 / 浏览器会话（唯一实现）
├── _keys/           B 类 key 的申请步骤 + check_keys.py（**不存密钥**）
├── _landing/<src>/<date>/   原件（只增不改）+ _fetch_manifest.jsonl   ← gitignore
├── _profiles/       T3 会话（含 cookie）                              ← gitignore
├── _runs/<date>/    运行报告 JSON（你读这个）                          ← gitignore
├── 01-监管一手披露/ … 07-情绪与预期/   channels.yaml + <adapter>.py
└── SKILL.md         本文件
```

**材料本体落在 `corpus/materials/<材料 id>/`**（`source.*` / `content.md` / `pages.json` /
`meta.json`），与阅读器后端 `server/store.mjs` 读的是同一处。

---

## 8. 三条最容易踩的坑（实测）

| 坑 | 表现 | 怎么避 |
|---|---|---|
| **`p.N` 口径混用** | agent 去 PDF 第 3 页找第 3 个 `Item` | 01/02 类 htm 是**逻辑块号**；03 类 PDF 才是物理页。材料的 `meta.pageCaliber` 写明口径 |
| **把 `partial` 当 `ok` 汇报** | "做空已覆盖"，实际四件套只有两件半 | `gap.partial` 必须转述 `partial_note` 原文 |
| **拿 `DEMO` 之类的示例 key 试** | 200 但返回体是错误消息，看起来"通了" | `_keys/check_keys.py --live` 会看返回体是否含 error；缺 key 就报缺 |

---

## 9. 不许做的事

- ❌ 不许在管道里加调度（cron / APScheduler / systemd）——定时归 Agent 的自动化任务；
- ❌ 不许改 `corpus/prompts/**`（判据真源）与 `server/data/taxonomy.json`；
- ❌ 不许把 `unavailable` 写成"无风险 / 已覆盖"；
- ❌ 不许为"让它跑通"而放宽 `must_contain` 断言（那等于把错误页当正文）；
- ❌ 不许在 T3 链路里加验证码识别 / token 注入（`selftest S5` 会拦）；
- ❌ 不许把 key 写进仓库任何文件（只走环境变量）。

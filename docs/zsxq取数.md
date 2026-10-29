# 知识星球取数（Agent 操作手册）

> **一句话**：zsxq 走**官方 CLI**（`zsxq-cli`），不走浏览器抓页面。
> 老板只需**扫码授权一次**；之后每天自动跑。

---

## 一、老板要做什么（唯一前置，一次即可）

**只有一件事：用微信扫码授权。**

```bash
zsxq-cli auth login
```

CLI 会打印一个链接和确认码，例如：

```
请访问以下链接完成授权：
  →  https://garden.zsxq.com/jasmine/index.html?code=XXXX-XXXX
  确认码：XXXX-XXXX
```

- 如果**浏览器已登录过 zsxq**，链接会自动确认，CLI 直接输出 `✓ Logged in as <昵称>`
  （实测如此，老板不用手动点）。
- 如果没有自动确认：把链接发给老板，让他在浏览器里打开并确认——**这是整条链上唯一需要人的地方**。
- token 存在系统凭据管理器，**不在终端明文输出，也不进仓库**。

判断是否已登录：

```bash
zsxq-cli auth login          # 已登录会直接返回账号，不会重复要求授权
zsxq-cli api call get_self_info
```

> 会话过期时同样重跑 `auth login`。**Agent 不要自己反复重试**——每次都会弹授权页。

---

## 二、Agent 怎么用（三段式：采集 → **判读** → 入库）

> **核心纪律：型由内容决定，不由星球决定。**
> 同一个星球（例：Dots机构投资者社区）既可能发投行研报，也可能发访谈稿、发个人研究笔记。
> 按星球预设型会判错，实测两发两错。

```
① intake（拉+抽）        ② Agent 判读             ③ ingest（按判定的型入库）
   python -m pipelines     读 _intake.json            python -m pipelines
   intake --as-of ...       的 items[].head           ingest --mapping ...
        ↓                        ↓                          ↓
  _landing/zsxq/<日期>/      mapping.json            corpus/materials/<型>-<日期>-<名>/
  *.pdf + *.txt + 清单                                真内容（按物理页分块）
```

### 2.1 采集（不分型）

```bash
python -m pipelines intake --as-of 2026-10-29
python -m pipelines intake --as-of 2026-10-29 --limit 30   # 每星球看最近 N 条（上限 30）
```

产出：

```
pipelines/_landing/zsxq/2026-10-29/
├── <原名>.pdf        原件
├── <原名>.txt        本地抽出的正文（Agent 读全文用）
└── _intake.json      清单：星球/大小/页数/字数/前 800 字
```

`_intake.json` 的 `items[]` 每项：

```json
{"file": "xxx.pdf", "group": "Dots机构投资者社区",
 "pages": 7, "chars": 4119, "needs_external": false,
 "head": "EARNINGS REVIEW / SCENARIO ANALYSIS\nRobinhood 三季报…"}
```

`needs_external: true` = 本地抽不出字（扫描件），需要另过 `tools/pdf-pipeline`。

### 2.2 判读（**这一步不能省，也不能外包给猜测**）

读 `_intake.json` 里的 `head`；不够就读同目录的 `.txt`。然后对每份回答三个问题：

1. 它是**什么文体**？（研报 / 访谈 / 个人笔记 / 纪要 / 公告）
2. 有没有**机构署名、评级体系、合规免责声明**？
3. 它的**结论是给谁看的**？（买方决策 / 公众传播 / 内部纪要）

**判读依据不在这份文档里，在手册里**——每份手册开头就写着「这是哪一类」：

| 型 | 手册 |
|---|---|
| `03-broker-research` | `corpus/prompts/03-型/投行研报.md` |
| `03-independent-research` | `corpus/prompts/03-型/独立研究.md` |
| `03-expert-channel` | `corpus/prompts/03-型/专家纪要与渠道交流.md` |
| `03-media-analysis` | `corpus/prompts/03-型/媒体分析.md` |
| `03-consensus-ratings` | `corpus/prompts/03-型/共识与评级档位.md` |

**判读顺序：先读手册，再读材料。** 不要凭印象分类，也不要用本文档里的二手总结——
手册里除了「这是哪一类」，还有必过项、问句表、常见坑、红灯信号，那些才是判据。

`evidence` 要写**你依据手册的哪一条**，例如：

> 「按《独立研究》手册：无评级体系、无合规声明，第一人称情景分析，属非卖方视角」

而不是「看着像独立研究」。

**判完写 `mapping.json`**（放在 `_landing/zsxq/<日期>/` 下）：

```json
[
 {"file": "Robinhood_Q3_2026_Outlook_2027.pdf",
  "group": "Dots机构投资者社区",
  "title": "Robinhood 三季报与 2027 展望",
  "type": "03-independent-research",
  "evidence": "第一人称情景分析（我的判断是…）+ 两版条件估值（固定约44.4倍PE），无券商署名、无评级体系、无合规免责声明"},
 {"file": "Indigo_郑迪_对谈全文.pdf",
  "group": "Dots机构投资者社区",
  "title": "Indigo × 郑迪 对谈",
  "type": "03-expert-channel",
  "evidence": "播客对谈文稿（INDIGO TALK，小宇宙），19 章节+时间轴+嘉宾简介，属访谈纪要而非研究结论"}
]
```

**`evidence` 必填**。没有依据的判型就是猜，`ingest` 会拒绝——猜出来的型比不填更糟。

### 2.3 入库（按判定的型）

```bash
python -m pipelines ingest --mapping "pipelines/_landing/zsxq/2026-10-29/mapping.json"
```

产出（实测）：

```
✓ 03-independent-research-2026-10-28-Robinhood_Q3_2026_Outlook_2027  7页 / 4119字
✓ 03-expert-channel-2026-10-28-Indigo                                28页 / 28891字
入库 2 份｜问题 0 条
```

**抽取分工**（这条最容易搞错）：

| 阶段 | 在哪 | 用什么 | 结果 |
|---|---|---|---|
| 判读 | 本机 | `pymupdf` | 看得出"是什么文体"就够 |
| **入库（写壳）** | 本机 | `pipelines ingest` | `needsExtraction: true`，只有指针 + 预览正文 |
| **入库（真正文）** | **远端 GPU** | `tools/pdf-pipeline`（MinerU 3.0.4） | 可逐字引用、页码准、表格不散 |

**`ingest` 不抽正文**——本机是纯 CPU，抽一份 7 页 PDF 要 1 小时（实测）。
它写完壳就结束，正文由 `tools/pdf-pipeline` 在远端抽，抽完过**五道门禁**才算真入库。

详见 `docs/MinerU使用说明.md`（含门禁清单）。**不要拿 `needsExtraction: true` 的材料做引用。**

每份材料的形态：

```
corpus/materials/<型>-<日期>-<文件名>/
├── source.pdf    原件
├── pages.json    按物理页分块（pageCaliber=physical_page）
├── content.md    全文
└── meta.json     含 classifyEvidence（判型依据，可回溯）
```

`needsExtraction=false` 表示正文已抽出，可直接判读；`true` 表示是扫描件，还得过 MinerU。

### 2.4 脚本版（手工排查用）

```bash
python "pipelines/03-卖方与共识/zsxq_daily.py" --dry-run --as-of 2026-10-29   # 只看清单
python "pipelines/03-卖方与共识/zsxq_browser.py" --all-rejected --as-of 2026-10-29
```

`zsxq_browser.py` 专治「官方通道未开通 Skill 权限」的星球（它用浏览器点真实下载按钮）。

## 三、落点与去向（别搞错）

```
pipelines/_landing/zsxq/<as-of>/*.pdf     ← 只到这里
```

**不进 `corpus/materials/`**。原因：materials 里的每份材料必须有 `pages.json`，
PDF 要先过 `tools/pdf-pipeline`（远端 MinerU）抽取才有。

如果把 PDF 直接塞进 materials，阅读器会当它不存在——**等于没入库**。

---

## 四、当前能拿到哪几个星球（2026-10-29 实测）

| 星球 | 通道 | 状态 |
|---|---|---|
| Dots机构投资者社区 | CLI | ✅ |
| 投资聚义厅 | CLI | ✅ |
| 全球特讯｜兔主席的宝藏 | CLI | ✅ |
| 卓哥笔记 | CLI | ✅ |
| 2030FY | CLI | ✅ |
| **180K Research** | 浏览器 | ✅ |
| 洪灝的宏观策略 | — | ❌ **星主开了内容保护**：`该星球内文件仅支持在「知识星球」App 内查看` |
| 宏观策略 | — | ⚠️ 页面上没有文件卡片 |
| 家办新智点 | — | ⚠️ 页面上没有文件卡片 |

**内容保护是纪律性限制，技术手段绕不过**，也不该绕。遇到就如实汇报，别硬试。

---

## 五、故障处理

| 现象 | 原因 | 怎么办 |
|---|---|---|
| `not logged in` | 会话缺失/过期 | 让老板重跑 `zsxq-cli auth login`（**不要循环重试**） |
| `该星球暂未开通 Skill 权限` | 官方限制 | 换浏览器通道（`zsxq_browser.py`） |
| `内容保护` | 星主禁止 | 汇报给人，无解 |
| 浏览器通道报 `找不到 tabbit-cli` | Tabbit 没装/没运行 | 先 `tabbit-cli diagnose`，或改用 CLI 通道 |
| 浏览器通道 `Evaluation exceeded hard deadline` | 超 60s 默认上限 | 脚本已带 `--timeout-ms 180000`；减少 `--max-cards` |
| `该星球 0 个` 但手机上有 | 可能被限流或分页 | 加 `--limit`；仍不行就隔天再试 |

---

## 六、给 Agent 的三条纪律

1. **不许把"内容保护"说成"没有新文件"** —— 那是两件事，前者是拿不到，后者是确实没有。
2. **不许改 `zsxq_browser.py` 去绕内容保护**（截图/OCR/模拟 App 都算越界）。
3. **会话过期只提醒一次**，不要每次采集都催老板扫码。

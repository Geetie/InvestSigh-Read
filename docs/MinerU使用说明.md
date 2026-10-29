# PDF 入库：MinerU 与门禁

> **一句话**：本机只写「壳」（秒级），正文由**远端 GPU** 上的 MinerU 抽（分钟级），
> 抽完必须过**五道门禁**才算真入库。
>
> 本文件只讲**入库这一段怎么用**。抽取的工程细节（分批、offline 变量、择优算法）
> 在 `tools/pdf-pipeline/SKILL.md`，那是本项目实测沉淀的原始记录，以它为准。

---

## 一、谁在哪跑（先记住这张表，能省很多冤枉路）

| 环节 | 在哪跑 | 用什么 | 耗时 |
|---|---|---|---|
| 采 PDF + 本地抽正文（判读用） | **本机** | `pymupdf` | 秒级 |
| 写材料「壳」 | **本机** | `pipelines ingest` | 秒级 |
| **版面级抽正文** | **学校 GPU 服务器** `student03@10.20.28.21` | `mineru==3.0.4`（`~/mineru_jobs/venv`） | 分钟级 |
| 择优合并 / 落结构 / 验收 | **本机** | `tools/pdf-pipeline` | 秒级 |

**为什么不在本机抽**：这是硬约束，不是偏好。本机是纯 CPU（`torch +cpu`），
7 页 PDF 实测跑了 **1 小时都没结束**；远端 GPU 上同样的文件是**十几秒**。

> ⚠️ 所以 `pipelines` 里**没有任何**挖 MinerU 的代码。`ingest` 写完壳就结束，
> 正文留给 `tools/pdf-pipeline`。

---

## 二、壳长什么样

```bash
python -m pipelines ingest --mapping "pipelines/_landing/zsxq/2026-10-28/mapping.json"
```

```
✓ 03-independent-research-2026-10-28-Robinhood_Q3_2026_Outlook_2027  7页（本地预览 4119 字）· 待 MinerU
```

`meta.json`：

```json
{"extractor": "pending",
 "needsExtraction": true,
 "extractionNote": "正文待 tools/pdf-pipeline 在远端 GPU 用 MinerU 抽取",
 "localPreviewChars": 4119}
```

`pages.json` 里是本地 pymupdf 抽的**预览正文**（按物理页分块）。
**它不是入库正文**——多栏会串行、表格会散，判读够用，引用不够用。

判断一份材料现在能不能引用：

```bash
python -c "import json;print(json.load(open('corpus/materials/<id>/meta.json'))['needsExtraction'])"
```

`true` = 壳，`false` = 已抽好。

---

## 三、远端怎么抽

### 3.1 四条硬约束（缺一条就白跑）

| 约束 | 事实 |
|---|---|
| **三条 offline 变量缺一即静默挂死** | `HF_HUB_OFFLINE=1`、`TRANSFORMERS_OFFLINE=1`、`MINERU_MODEL_SOURCE=local`。缺了不报错，日志停在 `DocAnalysis init`，子进程对着外网 SYN-SENT |
| **GPU 要显式指定** | `CUDA_VISIBLE_DEVICES=0`（该机 shell 默认写死不可分配的 GPU2） |
| **不要用 `--api-url`** | API 模式只回 `md` + `content_list`，`middle/model/images/layout/span` 全丢 |
| **默认 shell 是 fish** | 复杂命令一律 `scp 脚本 + ssh "bash /tmp/x.sh"`，别内联 |

### 3.2 分批：一次传一个目录

```bash
# ❌ 逐件调：模型重载 N 次，实测 59 秒/件
while read f; do mineru -p "$f" -o out -b pipeline; done

# ✅ 一批一个目录，一次传：实测 19 秒/件（3 倍）
mineru -p chunk_001 -o out -b pipeline -m txt
```

块大小 **12 份**（12GB 显存对应 `batch_ratio=4`）。
实测 237 件从「预计 2 小时」压到 **68 分钟**。

判据：日志里 `DocAnalysis init` 出现几次 = 模型加载几次。

### 3.3 `-m txt` 会静默回退，必须验收

`-m txt` 强制走 PDF 文本层（避开 OCR）。但**单份失败时它会静默回退 `auto`（OCR）**，
只在 stderr 打一行 `N task(s) failed`，命令本身可能仍返回 0。

```bash
ls out/<stem>/          # 期望看到 txt/；出现 auto/ 就是被回退了
```

---

## 四、门禁：五道必过（这是本文的重点）

| # | 门禁 | 查什么 | 不过的信号 | 怎么修 |
|---|---|---|---|---|
| **1** | `python tools/pdf-pipeline/scan.py --strict` | 四类问题：乱码 / 结构缺失 / 图片未定页 / 空文本页 | **退出码 1** | 按类修；乱码走 `merge.py` |
| **2** | `ls out/<stem>/` 目录名 | `-m txt` 有没有被静默回退成 OCR | 出现 `auto/` 而不是 `txt/` | 用 `merge.py` 并集绕过（MinerU 3.0.4 的 `pdf_classify` bug，改不了站点包） |
| **3** | `python tools/pdf-pipeline/verify.py` | 结构验收：`pages.json`/`content.md`/`meta.json`/图页码对应 | 报缺项 | `repair_figures.py` 修图名 |
| **4** | `node server/check.mjs` | 阅读器能否解析（R1 有答案必须有块 / R2 块须逐字） | 报 unverified | 回原文核；见记忆里的"盲区"说明 |
| **5** | `python tools/pdf-pipeline/audit_answers.py` / `audit_facts.py` | 内容审计：答案里的数字在依据区能否找到 | 报缺依据 | 补块，**不许编** |

**五道全过**才算"这份 PDF 真入库了"。
只跑 1 和 3 会漏内容层的问题；只跑 5 会漏结构层的问题。

### 4.1 门禁 1 的判据（别用错）

乱码检测用**确定性 OCR 指纹**，不要用「连续 >22 字母无空格」——
后者把 URL、代码串、高管名全标红，实测 175/259 全是噪声。

`scan.py` 已经是这个口径，直接跑它，不要自己写规则。

### 4.2 逐页择优不是二选一（门禁 2 的延伸）

卖方研报的**图片表格页**，文本层只有几行页眉，表格数字（`46,783`）根本不在文本层里。
「文本层干净就用文本层」会把表格数据整个换没——实测 **442 块依据里 169 块**因此失效。

`merge.py` 的做法是**并集**：

| 情形 | 取法 |
|---|---|
| 文本层干净，OCR 无额外内容 | 用文本层 |
| 文本层干净，但 OCR 有 `<table>` 且文本层缺的数字 ≥3 个 | **文本层正文 + OCR 表格段** |
| 文本层只有页眉（<50 字），OCR 有实质内容 | **用 OCR**（否则整页丢失） |
| 文本层为空或脏 | 用 OCR |

**干净阈值 50 字符，不是 200**——实测有页只有 209 字符却是干净的（图表页图注），
卡 200 会把它误判成"无文本层"，等于把干净文本换成脏文本。

---

## 五、完整流程（一条命令到能引用）

```bash
cd D:/InvestSigh/InvestSigh-Read

# ① 本机：写壳（pipelines 的活到这就结束了）
python -m pipelines ingest --mapping "pipelines/_landing/zsxq/<日期>/mapping.json"

# ② 远端：批量抽（在 GPU 服务器上，12 份一块）
#    scp 上去 → 设三条 offline 变量 + CUDA_VISIBLE_DEVICES=0 → mineru -p chunk -o out -b pipeline -m txt

# ③ 本机：把抽取结果回灌并落结构
PYTHONUTF8=1 python tools/pdf-pipeline/merge.py --ids <id1> <id2>      # 逐页择优
PYTHONUTF8=1 python tools/pdf-pipeline/structure.py --ids <id1> <id2>  # 一份一目录 + 抽图定序

# ④ 门禁
PYTHONUTF8=1 python tools/pdf-pipeline/scan.py --strict
PYTHONUTF8=1 python tools/pdf-pipeline/verify.py
node server/check.mjs
PYTHONUTF8=1 python tools/pdf-pipeline/audit_answers.py --ids <id1>
```

---

## 六、判读和入库用不同质量，别乱用

| 阶段 | 正文从哪来 | 够干什么 | 不够干什么 |
|---|---|---|---|
| 判读 | `pymupdf`（`_kit/pdf_text.py`） | 看出"这是研报还是访谈" | 引用、摘数字 |
| 入库（壳） | 同上，只填元信息 | 让人知道"有这份东西" | **任何引用** |
| 入库（真） | **MinerU + merge.py** | 逐字引用、页码定位、表格数字 | — |

**把 pymupdf 抽的正文拿去引用 = 引用了一堆串行的多栏文本。**
`meta.needsExtraction` 就是用来防这个的。

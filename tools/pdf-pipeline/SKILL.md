# PDF 材料处理 skill（InvestSigh-Read 专用）

> 把一份 PDF 变成阅读器可用的材料。**所有结论都来自本项目实测**，不是通用建议。
> 本目录同时是**流程说明书**（本文）与**可执行脚本集**。

## 快速上手

```bash
cd ~/InvestSigh-Read

# 1) 扫描：乱码 / 结构缺失 / 图片未定页 / 空文本页
python3 tools/pdf-pipeline/scan.py
python3 tools/pdf-pipeline/scan.py --strict     # 有阻塞问题退出码 1

# 2) 逐页择优合并（修乱码主力；先跑这个，再重建结构）
python3 tools/pdf-pipeline/merge.py --ids <id1> <id2>

# 3) 落成「一份一目录」结构（抽图 + 定阅读顺序 + content.md/meta.json）
python3 tools/pdf-pipeline/structure.py --ids <id1> <id2>

# 4) 图片缺页 / 命名不一致时修一把
python3 tools/pdf-pipeline/repair_figures.py <id>

# 5) HTML 载体（01 类 SEC 文件）的图：先从前端引用名反推 EDGAR 主文档，再下载
python3 tools/pdf-pipeline/sec_figures.py

# 6) 整页快照（按需，用于核对复杂图表）
python3 tools/pdf-pipeline/page_snapshot.py --ids <id> --pages 3 7
python3 tools/pdf-pipeline/page_snapshot.py --ids <id> --auto

# 7) 验收
node server/check.mjs
python3 tools/pdf-pipeline/verify.py
```

## 脚本清单

| 脚本 | 作用 |
|---|---|
| `scan.py` | 四类问题扫描（乱码/结构/未定页/空页） |
| `merge.py` | 逐页择优合并（PDF 文本层 × OCR 并集） |
| `structure.py` | 落一份一目录 + 抽图定序 + content.md/meta.json |
| `repair_figures.py` | 修图片命名与页码映射 |
| `html_figures.py` | HTML 内嵌 base64 图（本项目的 SEC 件不含内嵌图，走 sec_figures） |
| `sec_figures.py` | 从 SEC EDGAR 下载 htm 引用的图（**必须声明 UA**） |
| `page_snapshot.py` | 整页快照（pymupdf 渲染），按需 |

### 两个命名陷阱（都踩过）

1. **`source.*` 的 stem 恒为 `source`**。重构后原始件统一改名 `source.pdf` / `source.htm`，
   任何靠 `Path(src).stem` 去批次里找 `content_list` 或 EDGAR 主文档名的代码都会失败。
   必须回 `ingest-manifest-2026-10-26.json` 查源文件名；01 类不在 manifest 里，
   就用**HTML 里图片名反推**（`meta-20251231_g1.jpg` → 主文档 `meta-20251231.htm`）。
2. **图片名格式必须统一**。生成端写 `001_001_00.jpg`（无 `p`）、解析端读 `_p(\d{3})`（有 `p`），
   会导致页码全丢、图全变 `nopage`。现行标准是 **`{order:03d}_p{page:03d}_{idx:02d}{ext}`**，
   生成与解析两端都在 `structure.py` / `repair_figures.py` / `store.mjs::pageOfFigureByName` 里，改一处要三处同步。

### SEC 下载的两条硬规定

- **必须声明 User-Agent**，否则 403「Undeclared Automated Tool」。本项目用
  `InvestSigh research pipeline (contact: local@example.com)`。
- **≤10 请求/秒**（SEC 明文要求）。脚本每次请求间隔 0.15s。

**远端 MinerU 批处理**不在本目录（它跑在学校服务器上），见下面 §1。

---

## §1 硬约束（先读，违反会白跑）

> **场景已变**：这一版跑在**老板自己的 macOS 上**（单机，无 GPU 集群）。
> 上一版的「一律 scp 到学校 GPU 服务器 `student03@10.20.28.21`」**作废**——
> 那套路径、CUDA 参数、fish shell、nvidia-smi 全部不适用。下面按单机 macOS 重写。

| 约束 | 事实 |
|---|---|
| **PDF 抽取在本机跑** | `mineru` 装在 Mac 上（pipx/venv 均可）。**不再有远端服务器、不再 scp** |
| **模型只加载一次** | 用 `-p <目录>` 批量（§2）。逐件调 = 每件重载一次模型，这是最大的性能陷阱 |
| **首次要下模型** | 约 600 MB 到 `~/.cache/huggingface`。第一次跑卡十几分钟**是在下模型，不是死**；`du -sh ~/.cache/huggingface` 看是否在涨 |
| **macOS 没有 CUDA** | `CUDA_VISIBLE_DEVICES` 一律无效。Apple Silicon 走 MPS（Metal），Intel/未启用时纯 CPU |
| **CPU 慢到不可用于批量** | 实测 Windows 纯 CPU：7 页 PDF 跑 **3 分 39 秒仍未完成**。Mac 上**必须先测吞吐再排批次**（见 §1.1） |
| **不要用 `--api-url`** | API 模式只回 md + content_list，`middle/model/images/layout/span` 全丢；而 `structure.py` 要靠 images 定页 |
| **`-m txt` 会静默回退** | 单份失败时偷偷改用 OCR，命令仍返回 0。必须按 §3 验收 |

### §1.1 先在 Mac 上测出真实吞吐，再决定怎么跑

不要拍脑袋定"一批 12 份"——那是 12 GB 显存 GPU 的经验值。Mac 上第一步是量：

```bash
# 拿一份中等大小的 PDF，单件跑，记时间
time mineru -p "某份 10 页左右的.pdf" -o /tmp/mineru_probe -b pipeline -m txt
```

按结果选路：

| 单份耗时（10 页） | 判断 | 怎么办 |
|---|---|---|
| < 60 秒 | 可用 | 直接批量跑，块大小按内存定（见下） |
| 1–5 分钟 | 勉强 | 只在必要时跑；优先 `-m txt`；批次调小到 4–6 份 |
| > 5 分钟 | 不可用 | 换路：① 用 MinerU 官方在线 API（需 token）② 只对"必须逐字引用"的材料跑 ③ 接受 `pymupdf` 预览正文并标 `needsExtraction` |

**块大小怎么定**：看常驻内存，不看显存。经验值 `块大小 ≈ 可用内存GB / 1.5`，
且**单块不超过 12 份**。宁可多跑几块——每块多加载一次模型（几十秒），比 OOM 重来划算。

**Apple Silicon 启用 MPS**（能显著提速，4.x 支持）：

```bash
python -c "import torch; print(torch.backends.mps.is_available())"   # True 才有戏
```

若为 `True`，优先用 4.x 的默认后端（VLM/Metal 路径）；`-b pipeline` 是 CPU 兜底。

### §1.2 装在哪

```bash
# 建议独立 venv，别污染系统 Python
python3 -m venv ~/.venvs/mineru && source ~/.venvs/mineru/bin/activate
pip install -U "mineru[all]"

mineru --version          # 4.0.x
```

装完先跑 §1.1 的探针，再动真数据。

---

### §1.3 两条落盘路径：**优先走 4.0**（决定你要不要手工拷图）

Mac 上装 4.x 之后，有两条路把 MinerU 产物变成材料。**它们对"图片从哪来"的处理完全不同**：

| | 4.0 路径（推荐） | 3.0 路径（历史兼容） |
|---|---|---|
| 抽取命令 | `mineru-kit parse <path> -o <out> --tier standard --ocr-mode txt -f zip` | `mineru -p <dir> -o <out> -b pipeline -m txt` |
| 落盘脚本 | **`import_v4.py --zip-dir <dir>`** | `merge.py` → `structure.py` |
| **图片** | ✅ **脚本自己拷**（`import_v4.py:146` `shutil.copy2(src, figdir/name)`，从 zip 里的 `images/` 解出来并改名） | ❌ **要你手工拷**：先把 `out/<stem>/{txt,auto}/images/*.jpg` 原样拷进 `materials/<id>/figures/`（保持 hash 名），`structure.py` 才认 |
| 页码来源 | `pages` 数组下标 +1，**天然确定** | `.cl` 的 `page_idx`，可能缺 → `nopage` |
| 一步到位 | 是（一个脚本出四件套） | 否（两步，且中间漏拷图会静默丢图） |

**结论：走 4.0 路径就不存在"拷图缺失"问题**。只有走 3.0 老路径时才要手工拷。

### §1.4 3.0 路径的拷图陷阱（只在用老路径时看）

`structure.py:123` 是这么取图的：

```python
figdir = d / "figures"
files = sorted(f.name for f in figdir.iterdir() if f.is_file()) if figdir.is_dir() else []
if not files:
    stats["no_fig"] += 1          # ← 只计数，不报错
```

它**只读已存在的文件，从不从 `.cl` 或批次目录拷**。所以漏了拷图这一步的后果是：

- `figures/` 空 → `doc["figures"] = []` → `content.md` 无图
- **`verify.py` 第 4/5/6 项全过**（没有图就没有"不存在的图"）
- **`scan.py` 的"图片未定页"仍是 0/0**

**整套门禁绿灯，但图全丢了**。这是本项目最隐蔽的坑，靠门禁发现不了。

自查方法（3.0 路径专用）：

```bash
# .cl 里有几张 image，figures/ 就该有几张；不等就是漏拷
python3 -c "
import json,sys,pathlib
mid=sys.argv[1]; d=pathlib.Path('corpus/materials')/mid
cl=[x for x in d.parent.glob('_batches/**/*.cl')][:1]
print('figures/', len(list((d/'figures').glob('*'))) if (d/'figures').is_dir() else 0)
" <id>
```

### §1.5 批次目录改成了可配置

原来三个脚本写死 `D:/InvestSigh/system/env/meta/raw/batches/2026-10-18`。macOS 下这是个
**相对路径**（名为 `D:` 的目录），`exists()` 恒 False 且**不报错** → 静默降级。

现在统一为：

```python
BATCH = Path(os.environ.get("PDF_PIPELINE_BATCH") or (READ / "corpus" / "_batches")).resolve()
```

所以 Mac 上把 MinerU 产物放哪都行，指一下即可：

```bash
export PDF_PIPELINE_BATCH=~/mineru_out          # 或任何你放 out/ 的目录
```

目录内契约不变：`<BATCH>/_mineru/<stem>.cl` + `<BATCH>/_mineru/out/<stem>/{txt,auto}/`。

同理，13 处硬编码的 `D:/InvestSigh/...`（8 个 `READ`、1 个 `MAT`、1 个 `IDX`、3 个批次路径）
已全部改为 `Path(__file__).resolve().parents[2]` 推导，换机器不用改代码。

---

## §2 分批：目录批处理，不要逐件调

**这是最大的性能陷阱。** `mineru -p` 本来就接受目录，传目录时模型只加载一次。

```bash
# ❌ 错：每件一次，模型重载 N 次
while read f; do mineru -p "$f" -o out -b pipeline -m txt; done

# ✅ 对：一批放进目录，一次传
mkdir -p chunk_001
ln -s /abs/path/a.pdf chunk_001/
ln -s /abs/path/b.pdf chunk_001/
mineru -p chunk_001 -o out -b pipeline -m txt
```

### 实测数据（**注意：这是 GPU 机器上的，Mac 上要重测**）

| 做法 | 单件耗时 | 说明 |
|---|---|---|
| 逐件调 | **59 秒/件** | 84 件 → 加载 84 次模型 |
| 12 份一块 | **19 秒/件**（3×） | 237 件从"预计 2 小时"压到 **68 分钟** |

判据：日志里 `DocAnalysis init` 出现的次数 = 模型加载次数。**这个判据在 Mac 上同样有效**。

### Mac 上的块大小

`12 份` 是 12 GB 显存 GPU 的经验值（`batch_ratio=4`），**Mac 上没有显存，别照抄**。

Mac 的算法是**看常驻内存**：

```
块大小 ≈ 可用内存(GB) / 1.5，且不超过 12
```

8 GB 内存的 Mac → 一批 4–5 份；16 GB → 8–10 份。
**宁可多跑几块**：每块多一次模型加载（几十秒），比 OOM 重来一次划算得多。

批量跑时用 `--start/--end` 分段也行，但**分块跑更稳**（失败只影响一块）。

## §3 `-m txt` 必须验收回退

`-m txt` 强制走 PDF 文本层，避开 OCR。**但单份失败时它会静默回退 `auto`（OCR）**，
只在 stderr 打 `N task(s) failed`，命令本身可能仍返回 0。

```bash
ls out/<stem>/     # 期望 txt/；出现 auto/ 就是被回退了
```

被回退的典型报错（MinerU 3.0.4 自身 bug，非用法问题）：

```
ERROR mineru.utils.pdf_classify:classify_hybrid:120
  - Failed to classify PDF with hybrid strategy: 'PdfImage' object has no attribute 'get_pos'
```

根因在 `site-packages/mineru/utils/pdf_classify.py:391`：假定 `page.get_objects()` 全有 `get_pos()`。
共享环境改不了站点包 —— 用 `merge.py` 绕开。

## §4 逐页择优合并（核心）

**为什么不能二选一**：卖方研报的**图片表格页**，文本层只有几行页眉，
表格数字（`46,783`）根本不在文本层里。二选一（「文本层干净就用文本层」）会把表格数据整个换没。
实测踩过：442 块依据里 **169 块**因此失效。

**正确做法是并集**（`merge.py` 已实现）：

| 情形 | 取法 |
|---|---|
| 文本层干净，OCR 页无额外内容 | 用文本层 |
| 文本层干净，但 OCR 页有 `<table>` 且**文本层缺的数字 ≥3 个** | **文本层正文 + OCR 表格段**（`src: pdf-text+ocr-table`） |
| 文本层只有页眉（<50 字），OCR 有实质内容 | **用 OCR**（否则整页正文丢失） |
| 文本层为空或脏 | 用 OCR |

**干净阈值 50 字符，不是 200**。实测有页只有 209 字符却是干净的（MS 研报图表页图注），
卡 200 会把它误判成「无文本层」而退回 OCR —— 等于把干净文本主动换成脏文本。

## §5 乱码检测判据

**用确定性 OCR 指纹，不要用「连续 >22 字母无空格」**。后者把 URL、代码串、高管名全标红，
实测 175/259 全是噪声。

```python
SIG = [r'\ufffd', r'P1atforms', r'META\.0(?!Q)', r'G00GL', r'Historg',
       r'RESEARcH', r'tobuyorsell', r'Fiste the Kingdom',
       r'\b1O\d{3}\b', r'\b2O2[0-9]\b']
```

`META\.0(?!Q)` 的负向断言必要：`META.OQ` 是合法写法。

**OCR 乱码不可能靠重跑消除** —— 同图同模型结果一样。形近字符混淆：

| OCR 输出 | 应为 | 原因 |
|---|---|---|
| `G00GL` | `GOOGL` | O↔0 |
| `2O26` | `2026` | 0↔O |
| `META.0` | `META.O` | O↔0 |
| `P1atforms` | `Platforms` | l↔1 |
| `Historg` | `History` | r+y 粘连 |
| `afites` | `affiliates` | 少字母 |

**唯一解法是不用 OCR** —— PDF 有文本层就抽文本层。

## §6 抽图 + 定阅读顺序

图片与它的文本**放在同一目录**，文件名自带阅读顺序。

排序依据 `content_list` 每条 image 的 `bbox` 与 `page_idx`：

```python
# 键 = (页, round(top/8), left)
# 8pt 容差把同一视觉行的图归一组，组内按 left 从左到右
lst.sort(key=lambda t: (round(t[0] / 8), t[1]))
```

得到全书唯一的 `order`（1..N），落到三处：
- `pages.json` 的 `figures[].order`（**权威**）
- 文件名前缀 `001_p012_00.jpg`（可视化副本，`ls` 顺序 = 阅读顺序）
- `pages[].figures[]`（每页只挂自己那几张）

**判断抽图完整性不能用 XObject 计数**。源 PDF 每页 15–40 个 Image XObject
（图表被切成图元 + alpha/掩模），`figures` 数才是真实图表数。
用 pypdf 数 XObject 会得出「源图 821 vs figures 39」的误判。

## §7 落盘结构（一份一目录）

```
corpus/materials/<材料 id>/
    source.pdf|.htm|.xlsx      原始件
    content.md                 全文，**图片按阅读顺序内联**
    pages.json                 分页文本 + 每页 figures（带 order）
    figures/001_p012_00.jpg    序号_页_页内序
    meta.json                  子型/日期/页数/图数
```

**不要**保留 `materials/raw/` 与 `materials/mineru/` 两处分离的旧结构——
图与文本分家会导致：图无页码、读者看不到图、agent 读不到图。

## §8 换文本后必须校正依据块

依据块是**逐字抄旧 pages.json** 的，一换干净文本就集体 `unverified`。

按失效形态分层处理：

| 形态 | 例子 | 修法 |
|---|---|---|
| 错字 | `2O26`→`2026` | 正则最小替换 |
| HTML 表格 → 纯文本行 | `<td>46,783</td>` → `Total Revenue 63,530 …` | 按**数字序列**匹配行 |
| 裸文本行 → HTML 表格 | `Capex 22,492 …` → `<tr><td>Capex</td>…` | 按行首标签 + 数字匹配 `<tr>` |
| 单词粘连 | `Weslightly take upour` | 压成字母骨架匹配 |
| OCR 少字母 | `afites`→`affiliates`、`FNRA`→`FINRA` | 关键实词（≥5 字母）重合 |
| **页码本身错** | 块写 p.16、内容在 p.12 | **必须人工核**，脚本不要猜 |

实测 442 块里 436 块能自动修好，**6 块必须人工**。

## §9 验收清单（缺一条不算完）

```bash
node server/check.mjs                        # 全「合格」，0 查无此文
python3 tools/pdf-pipeline/scan.py --strict   # 0 件乱码
python3 tools/pdf-pipeline/verify.py           # 结构完整
node tools/e2e-readpages.mjs                 # 24/24
npx tsc --noEmit                             # 0 错
```

## §10 两个版本并存（3.0.4 / 4.0.12）——先选版本再看命令

**Mac 上只装一个 4.x 就够**。3.0.4 只用于"复现历史产物"——历史那批材料的
`mergedFrom` 里写着 `mineru-4.0.12/standard`，所以**新批次一律 4.x**。

| 场景 | MinerU | 命令 |
|---|---|---|
| **新批次（默认）** | **4.0.x** | `mineru -p <path> -o <out> -b pipeline -m txt`<br>或 4.0 的 `mineru-kit parse <path> -o <out> --tier standard --ocr-mode txt -f zip` |
| 复现历史产物 | 3.0.4（可选，另建 venv） | `mineru -p <path> -o <out> -b pipeline -m txt` |

两版本的 CLI 参数**不完全兼容**：4.0 的 `mineru-kit parse` 直接出 zip（`import_v4.py` 能吃），
3.0.4 只出目录树（`merge.py`/`structure.py` 吃）。**别混用产物**。

### 4.0 在 macOS 上的装法（**没有 CUDA**，别照抄 GPU 那套）

```bash
python3 -m venv ~/.venvs/mineru && source ~/.venvs/mineru/bin/activate
pip install -U "mineru[all]"

# 模型（约 2 GB：PP-OCRv6 + MinerU2.5-Pro VLM）
mineru-models-download --tier standard --small-backend torch -s modelscope
```

**三处与 GPU 版的差别**（照抄会装坏）：

| GPU 版 | macOS | 原因 |
|---|---|---|
| `--index-url .../whl/cu126` | **不要加** | Mac 没有 CUDA，官方 wheel 自带 CPU/MPS 支持 |
| `torch==2.7.1` 钉版本 | **不钉**，让它随 `mineru[all]` 解析 | Mac 的 torch 版本线不同，钉死容易无轮子 |
| `--small-backend torch` 必填 | **仍要填** | 否则默认走 onnx 后端报 `MinerU-4_models_onnx is not ready` |

**必须写配置文件**，否则默认走 onnx 后端会报 `MinerU-4_models_onnx is not ready`：

```yaml
# ~/.mineru/config.yaml
model:
  source: local
  small_backend: torch
  vlm:
    engine: llama-cpp
```

**torch 在 Mac 上没有这类地雷**（那段是 GPU 机器的：驱动 595.91 与 cu130 错配导致
`cuda.is_available()=False`）。Mac 上：

```bash
python -c "import torch; print(torch.__version__, torch.cuda.is_available(), torch.backends.mps.is_available())"
# 期望：2.x.x  False  True（Apple Silicon）/ False（Intel）
```

`cuda.is_available()` 恒 False 是正常的，**不要为此去装 cuXXX 版**——Mac 装不上。
判断能不能加速只看 `mps.is_available()`。

### 4.0 的产物结构与 3.0.4 不同

| | 3.0.4 | 4.0 |
|---|---|---|
| 文件 | `<stem>_content_list.json` | `middle_json.json` / `structured_content.json` / `markdown.md` / `images/` |
| 图位置 | 条目有 `img_path` + `page_idx` + `bbox` | `pages[i].blocks[]` 里 `type=image`，带 `bbox`（**归一化 0–1**）与 `content[].image_path` |
| 页归属 | 要读 `page_idx` | **就是 `pages` 数组下标 +1**，天然确定 |

**这解决了 378 张图未定页的根因**：3.0.4 里部分 image 条目没有 `page_idx`（pypdf 补抽的更无 bbox），
排不出页码；4.0 每页的 image 都挂在 `pages[i]` 下，页码不需要猜。

### 4.0 的两个坑（本波踩的）

1. **`mineru-kit parse` 不认 symlink 目录**。用 `ln -s` 组块会报「未找到输入文件」，必须 `cp` 真文件。
2. **性能**：224 页 151 秒（1.6 页/秒）。比 3.0.4 的 pipeline 慢，但准确率更高（VLM 参与）。
   分批每块 6 份（VLM 显存占用比 pipeline 高）。

## §11 版本演进（为什么要升）


本机 `mineru 3.0.4`（2026-03-30），PyPI 最新 `4.0.12`（2026-10-11），中间隔 33 个版本。

关键节点：**3.4.0（2026-06-18）OCR 换 PP-OCRv6，准确率 +11%、速度 +100%** —— 正对 §5 的问题。

升级代价：命令全变（`-b pipeline -m txt` → `--tier standard`）、产物 schema 变
（`docvortex.middle` 2.0）、已有产物要不要重跑是个大决定。

**建议**：下一批新材料先升 4.0.12 再跑（新项目新目录，不碰老产物）。
**不要照 4.0 文档改 3.0.4 的命令**，会直接报参数不认。

## 相关文档

- `docs/v7/MinerU用法调研_2026-10-27.md` —— 错因与正确用法的完整调研
- `docs/v7/MinerU_逐页择优合并.md` —— 逐页合并的原理与两个严重错误
- `AGENTS.md §1.1` —— 服务器环境硬事实
- `docs/EVIDENCE-SPEC.md §7` —— 图的依据怎么算

"""`_kit.ingest` —— 按 Agent 的判读结果入库。

## 分工

| 谁 | 干什么 |
|---|---|
| `intake` | 拉 PDF、抽正文、出清单（**不判型**） |
| **Agent** | 读 `_intake.json` 里的 `head` / `.txt`，判定每份属于哪个型 |
| `ingest`（本模块） | 按 mapping 把文件写成 `corpus/materials/<型>-<日期>-<名>/` |

**型必须由内容决定，不由星球决定**——这是本模块存在的理由。
同一星球可能发投行研报也可能发独立研究，采集阶段无法预知。

## mapping.json 格式

```json
[
  {"file": "Robinhood_Q3_2026_Outlook_2027.pdf",
   "type": "03-broker-research",
   "evidence": "含 Goldman Sachs 评级表与目标价，页脚有合规声明"},
  {"file": "Indigo_郑迪_对谈全文.pdf",
   "type": "03-independent-research",
   "evidence": "个人访谈稿，无机构评级体系"}
]
```

`evidence` 必填：没有依据的判型就是猜，猜出来的型不如不填。
"""

from __future__ import annotations

import json
import re
import time
from pathlib import Path

from . import pdf_text
from .material import MaterialDraft, write_material

__all__ = ["ingest", "VALID_TYPES"]

LANDING = Path(__file__).resolve().parents[1] / "_landing" / "zsxq"


def _valid_types() -> set[str]:
    """34 型的合法 key（`<类码>-<slug>`），从 registry 取，不硬编码。"""
    from .registry import load_registry

    reg = load_registry()
    return {t.key for t in reg.types()}


VALID_TYPES: set[str] = set()  # 运行时由 `ingest` 填充（避免 import 期加载 registry）


def _slug(raw: str, *, max_len: int = 60) -> str:
    s = re.sub(r"[^0-9A-Za-z._-]+", "_", raw.strip())
    s = re.sub(r"\.{2,}", ".", s).strip("._")
    return (s[:max_len] or "file")


def ingest(
    mapping_path: str | Path,
    *,
    as_of: str | None = None,
    dir_path: str | Path | None = None,
) -> list[str]:
    """按 mapping 入库。返回写入的 material_id 列表。

    ## 分三轮，不是"逐份走一遍"

    1. **校验收集**：把 mapping 里每一条检查完（文件在不在、型合不合法、有没有 evidence）
    2. **批量抽取**：所有 PDF 一起交给 MinerU，**模型只加载一次**
       —— 一份一调会每份重载模型，N 份浪费 N-1 次
    3. **逐份落盘**：用抽好的正文写 materials

    任何一条出问题都进 `problems`，不静默。
    """
    global VALID_TYPES
    VALID_TYPES = _valid_types()

    mp = Path(mapping_path)
    rows = json.loads(mp.read_text(encoding="utf-8"))
    if not isinstance(rows, list):
        raise SystemExit(f"{mp}: 顶层必须是数组")

    base = Path(dir_path) if dir_path else (mp.parent if mp.parent != Path(".") else LANDING)
    day_default = as_of or (base.name if re.fullmatch(r"\d{4}-\d{2}-\d{2}", base.name) else "")

    problems: list[str] = []
    pending: list[dict] = []

    # ── 第一轮：校验并收集 ────────────────────────────────────────────
    for i, row in enumerate(rows, 1):
        fname = str(row.get("file") or "").strip()
        typ = str(row.get("type") or "").strip()
        ev = str(row.get("evidence") or "").strip()

        if not fname or not typ:
            problems.append(f"#{i}: 缺 file 或 type → {row}")
            continue
        if typ not in VALID_TYPES:
            problems.append(f"#{i} {fname}: 型 {typ!r} 不在 34 型里")
            continue
        if not ev:
            problems.append(f"#{i} {fname}: 缺 evidence（判型必须有依据，不许猜）")
            continue

        pdf = base / fname
        if not pdf.is_file():
            problems.append(f"#{i} {fname}: 文件不存在（找的是 {pdf}）")
            continue
        day = str(row.get("as_of") or day_default or "").strip()
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", day):
            problems.append(f"#{i} {fname}: 拿不到日期，请给 --as-of")
            continue

        pending.append({"i": i, "row": row, "pdf": pdf, "fname": fname,
                        "typ": typ, "ev": ev, "day": day})

    if not pending:
        print(f"入库 0 份｜问题 {len(problems)} 条")
        for x in problems:
            print(f"  ✗ {x}")
        return []

    # ── 第二轮：本地快抽（只为填判读用的元信息，**不是入库正文**）─────────
    # ★ 真正的版面级抽取由 tools/pdf-pipeline 在远端 GPU 上做（见 docs/MinerU使用说明.md）。
    #   本机不跑 MinerU：SKILL.md §1 明写"PDF 抽取不在本机跑"。
    print(f"本地快抽 {len(pending)} 份（pymupdf，仅用于填元信息）…")

    # ── 第三轮：逐份落盘 ─────────────────────────────────────────────
    written: list[str] = []
    for x in pending:
        pdf, fname, typ, day, ev = x["pdf"], x["fname"], x["typ"], x["day"], x["ev"]

        try:
            fb = pdf_text.extract(pdf)
            page_texts, full_text = fb.page_texts, fb.text
            secs = 0.0
        except Exception as exc:  # noqa: BLE001
            problems.append(f"#{x['i']} {fname}: PDF 打不开（{str(exc)[:80]}）")
            continue

        if not full_text.strip():
            problems.append(f"#{x['i']} {fname}: 正文 0 字（扫描件？试 MinerU -m ocr）")
            continue

        mid = f"{typ}-{day}-{_slug(fname.rsplit('.', 1)[0])}"
        draft = MaterialDraft(
            material_id=mid,
            source_body=pdf.read_bytes(),
            source_ext="pdf",
            text=full_text,
            page_caliber="physical_page",
            sections=[(f"p.{n + 1}", body) for n, body in enumerate(page_texts) if body.strip()],
            meta={
                "cat": typ.split("-", 1)[0],
                "sub": typ.split("-", 1)[1] if "-" in typ else typ,
                "date": day,
                "source": "zsxq.cli",
                "provider": str(x["row"].get("group") or ""),
                "title": str(x["row"].get("title") or fname),
                "fileName": fname,
                "classifyEvidence": ev,
                "extractor": "pending",
                "needsExtraction": True,
                "extractionNote": "正文待 tools/pdf-pipeline 在远端 GPU 用 MinerU 抽取（见 docs/MinerU使用说明.md）",
                "localPreviewChars": len(full_text),
            },
        )
        try:
            write_material(draft)
            written.append(mid)
            print(f"  ✓ {mid}  {len(page_texts)}页（本地预览 {len(full_text)} 字）· 待 MinerU")
        except Exception as exc:  # noqa: BLE001
            problems.append(f"#{x['i']} {fname}: 落盘失败（{str(exc)[:100]}）")


    print(f"\n入库 {len(written)} 份｜问题 {len(problems)} 条")
    if problems:
        for p in problems:
            print(f"  ✗ {p}")
    return written

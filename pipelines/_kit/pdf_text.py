"""`_kit.pdf_text` —— 本地 PDF 抽正文（判读用，不追求排版还原）。

## 定位

`tools/pdf-pipeline`（远端 MinerU）负责**出版级**抽取：扫描件、多栏、表格、公式。
本模块只做一件事：**把正文抠出来给 Agent 读，用来判定它属于哪个型**。

两者的分工：

| 场景 | 用谁 |
|---|---|
| 判读「这是投行研报还是独立研究」 | **本模块**（快，秒级，够用） |
| 入库后要逐字引用、要页码、要表格 | `tools/pdf-pipeline`（慢，GPU） |

## 抽不出来怎么办

扫描件/纯图片 PDF 抽出 0 字。这时**不能**当成"空文档"入库——
本模块返回 `needs_external=True`，调用方应标 `needsExtraction`，交 MinerU 处理。
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

__all__ = ["PdfText", "extract"]

#: 低于这个字数就认为"本地抽不出来"（扫描件常见 0–20 字）
_MIN_CHARS = 80


@dataclass(frozen=True)
class PdfText:
    """一份 PDF 的抽取结果。"""

    text: str
    pages: int
    chars: int
    needs_external: bool
    """`True` = 本地抽不出字，需要 `tools/pdf-pipeline`（扫描件/图片型 PDF）。"""

    head: str
    """前 800 字（给 Agent 判读用，避免整篇塞进上下文）。"""

    page_texts: tuple[str, ...] = ()
    """逐页正文。写 `pages.json` 时按它分块（PDF 的口径是物理页）。"""


def _open(path: Path):
    """打开 PDF。优先 `pymupdf`（新名），退回 `fitz`（旧名，会有 FutureWarning）。"""
    try:
        import pymupdf  # type: ignore

        return pymupdf.open(str(path))
    except ImportError:
        import warnings

        with warnings.catch_warnings():
            warnings.simplefilter("ignore", FutureWarning)
            import fitz  # type: ignore

            return fitz.open(str(path))


def extract(path: str | Path, *, head_chars: int = 800) -> PdfText:
    """抽一份 PDF 的正文。

    失败模式（**都不静默**）：
    - 打不开 ⇒ 抛异常，调用方决定是报错还是跳过
    - 能打开但没字 ⇒ `needs_external=True`，不是"空文档"
    """
    p = Path(path)
    doc = _open(p)
    try:
        pages = doc.page_count
        chunks: list[str] = []
        for i in range(pages):
            try:
                chunks.append(doc[i].get_text() or "")
            except Exception:
                chunks.append("")  # 单页坏掉不拖垮整份，但字数会体现出来
        text = "\n".join(chunks).strip()
    finally:
        doc.close()

    chars = len(text)
    return PdfText(
        text=text,
        pages=pages,
        chars=chars,
        needs_external=chars < _MIN_CHARS,
        head=text[:head_chars],
        page_texts=tuple(c.strip() for c in chunks),
    )

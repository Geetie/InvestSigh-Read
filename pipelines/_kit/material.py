"""`_kit.material` —— 把取到的东西落成阅读器认得的「一份一目录」。

## 目录形态（真源 = `corpus/materials/README.md`）

    corpus/materials/<材料 id>/
        source.htm | source.pdf | source.md     原始件（本包只写 htm/md 这两类载体）
        content.md                              全文，图片按阅读顺序内联
        pages.json                              {"id","srcId","pageCount","pages":[{"n","text","chars","figures"}]}
        meta.json                               cat/sub/date/pageCount/source/...
        figures/                                抽出来的图（HTML 载体通常为空）

## 为什么 `p.N` 要按型分口径（`instructions/_GENERATOR.md §四③`）

- 01/02 类的 htm **不走 MinerU**，所以 `p.N` 是**逻辑块号**（按 `Item N.` / 章节切），
  不是 PDF 物理页。写错口径，agent 会去"第 3 页"找第 3 个 `Item`。
- 03 类 PDF 走 MinerU，`p.N` 才是物理页——本包**不产 PDF 材料**（交 `tools/pdf-pipeline`）。

本模块只实现「HTML / 纯文本 → 逻辑块 pages」这一种，PDF 路径明确不实现也不假装实现。
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Mapping

__all__ = ["MaterialDraft", "write_material", "split_logical_pages", "html_to_text", "MATERIALS_ROOT"]

MATERIALS_ROOT = Path(__file__).resolve().parents[2] / "corpus" / "materials"

#: 逻辑块切分的锚点：SEC 的 `Item N.` / `PART x` / 招股书 `PROPOSAL N` / 章节标题。
_BLOCK_ANCHOR = re.compile(
    r"(?:^|\n)\s*(?:Item\s+\d+[A-C]?\.|PART\s+[IVX]+|PROPOSAL\s+\d+|ARTICLE\s+[IVX]+)",
    re.IGNORECASE,
)

_TAG = re.compile(r"<[^>]+>")
_SCRIPT = re.compile(r"<(script|style)[\s\S]*?</\1>", re.IGNORECASE)
_ENTITIES = (("&nbsp;", " "), ("&#160;", " "), ("&amp;", "&"), ("&lt;", "<"),
             ("&gt;", ">"), ("&quot;", '"'), ("&#39;", "'"), ("&mdash;", "—"),
             ("&ndash;", "–"), ("&rsquo;", "’"), ("&lsquo;", "‘"), ("&ldquo;", "“"),
             ("&rdquo;", "”"))

#: 块级标签 → 换行；单元格/换行 → ` | ` 与换行（表格不压成一坨，否则数字对不上列）
_BLOCK_TAGS = re.compile(
    r"</?(?:p|div|section|article|header|footer|main|aside|h[1-6]|ul|ol|dl|dt|dd|"
    r"table|thead|tbody|tfoot|figure|figcaption|blockquote|pre|form|fieldset)\b[^>]*>",
    re.IGNORECASE,
)
_CELL_SPLIT = re.compile(r"</t[dh]\s*>", re.IGNORECASE)
_ROW_END = re.compile(r"</tr\s*>", re.IGNORECASE)
_BR = re.compile(r"<br\s*/?>", re.IGNORECASE)


def html_to_text(html: str) -> str:
    """HTML → 带行结构的纯文本（确定性规则，不解释、不摘要）。

    **为什么不用 `lxml.text_content()`**：它把整页压成一两行长串——实测
    `stockanalysis` 的 181 KB 页面被压成 5010 字符、**两行**，于是按小节标题切块
    一条都切不出来，全文退化成一块。行结构是「按位置读」的前提。

    因此先用正则保住结构，再交给 `lxml` 兜底：

    1. 去 `script` / `style`；
    2. 表格单元格 `</td>` → ` | `、行 `</tr>` → 换行（**表格必须保住列**，
       否则 `Target | Low | Average | Median | High` 这种表读不出来）；
    3. 块级标签 → 换行、`<br>` → 换行；
    4. 去剩余标签、反转义实体、收敛空白。

    单个元素里的裸文本（无块级包裹）由自然换行保留即可，不额外补。
    """
    text = _SCRIPT.sub(" ", html)
    text = _BR.sub("\n", text)
    text = _CELL_SPLIT.sub(" | ", text)
    text = _ROW_END.sub("\n", text)
    text = _BLOCK_TAGS.sub("\n", text)
    text = _TAG.sub("", text)
    for a, b in _ENTITIES:
        text = text.replace(a, b)
    text = text.replace("\r", "")
    text = re.sub(r"[ \t\u00a0]+", " ", text)
    text = re.sub(r" *\| *\n", "\n", text)      # 行尾多余的单元格分隔
    text = re.sub(r"\n[ \t]+", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def split_logical_pages(text: str, *, fallback_chars: int = 7000) -> list[tuple[str, str]]:
    """把全文切成逻辑块，返回 `[(section_label, block_text), …]`。

    规则（与 `_tmp/meta_reports/ingest_01b.py::split_pages` 同源，此处是正式实现）：
    1. 若 `Item N.` / `PART` / `PROPOSAL` 锚点 ≥3 处 ⇒ 按锚点切，段长 >80 字才收；
    2. 否则按自然段累积到 `fallback_chars` 切（8-K、EX-99.1 这类短件通常落在规则 2）；
    3. 都不成 ⇒ 全文一块。

    **这是"逻辑块号"口径**：`p.1` 是第一个带锚点的块，不是 PDF 第 1 页。
    """
    marks = [(m.start(), m.group(0).strip()) for m in _BLOCK_ANCHOR.finditer(text)]
    if len(marks) >= 3:
        out: list[tuple[str, str]] = []
        for i, (pos, title) in enumerate(marks):
            end = marks[i + 1][0] if i + 1 < len(marks) else len(text)
            body = text[pos:end].strip()
            if len(body) > 80:
                out.append((title, body))
        if len(out) >= 2:
            return out

    paras = [p for p in re.split(r"\n\s*\n", text) if p.strip()]
    out2: list[tuple[str, str]] = []
    buf: list[str] = []
    size = 0
    for p in paras:
        buf.append(p)
        size += len(p)
        if size >= fallback_chars:
            out2.append((f"§{len(out2) + 1}", "\n\n".join(buf)))
            buf, size = [], 0
    if buf:
        out2.append((f"§{len(out2) + 1}", "\n\n".join(buf)))
    return out2 or [("全文", text)]


@dataclass
class MaterialDraft:
    """一份待落的材料（Adapter 的 `normalize` 产出）。"""

    material_id: str
    source_body: bytes
    source_ext: str
    text: str
    meta: Mapping[str, Any]
    page_caliber: str = "logical_block"
    sections: list[tuple[str, str]] = field(default_factory=list)
    """显式给的分块；为空时按 `split_logical_pages(text)` 自动切。"""

    def resolve_sections(self) -> list[tuple[str, str]]:
        """取分块：显式优先，否则自动切（每次调用都重算，不可变）。"""
        return list(self.sections) if self.sections else split_logical_pages(self.text)


def write_material(draft: MaterialDraft, *, root: Path | None = None) -> Path:
    """把一份材料写进 `corpus/materials/<id>/`，返回目录。

    幂等：同 `material_id` 已存在且 `source.*` 的 sha256 与本次一致 ⇒ 不重写（返回原目录）。
    内容不同则**重写整目录**（材料改版是合法的：同一 id 同一材料的新快照），
    但 `pages.json` 会保留 `sourceSha256` 以便比对。

    失败模式：`text` 为空 ⇒ `ValueError`（空材料等于没取到，不许落盘冒充取到）。
    """
    if not draft.text.strip():
        raise ValueError(f"{draft.material_id}: 正文为空，拒绝落盘")

    base = (root or MATERIALS_ROOT) / draft.material_id
    base.mkdir(parents=True, exist_ok=True)

    import hashlib

    src_sha = hashlib.sha256(draft.source_body).hexdigest()
    (base / f"source.{draft.source_ext}").write_bytes(draft.source_body)

    sections = draft.resolve_sections()
    pages = [
        {"n": i + 1, "text": body, "chars": len(body), "section": label, "figures": []}
        for i, (label, body) in enumerate(sections)
    ]
    (base / "pages.json").write_text(
        json.dumps(
            {
                "id": draft.material_id,
                "srcId": str(draft.meta.get("srcId") or draft.material_id),
                "pageCount": len(pages),
                "pageCaliber": draft.page_caliber,
                "sourceSha256": src_sha,
                "pages": pages,
            },
            ensure_ascii=False,
            indent=1,
        ),
        encoding="utf-8",
    )
    (base / "content.md").write_text(draft.text.strip() + "\n", encoding="utf-8")

    meta = dict(draft.meta)
    meta["id"] = draft.material_id
    meta.setdefault("pageCount", len(pages))
    meta.setdefault("figureCount", 0)
    meta.setdefault("figuresWithPage", 0)
    meta["ordered"] = True
    meta["pageCaliber"] = draft.page_caliber
    meta["sourceSha256"] = src_sha
    (base / "meta.json").write_text(
        json.dumps(meta, ensure_ascii=False, indent=1), encoding="utf-8"
    )
    return base

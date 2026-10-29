"""`06-宏观与政策/federal_register.py` —— Federal Register Adapter（政策与管制）。

## 为什么它是政策类的**主通道**

手册 `06-型/政策与管制.md` 逐字："只认规则原文与生效依据；提案 ≠ 生效"，
并点名要以 `Federal Register` 与 `eCFR` 两处现查为准。
`federalregister.gov/api/v1/documents.json` 是**发布方自己的 API**（免 key、免 token），
实测 200 / 0.8s，带 `agencies` + `term` + 日期过滤，正好对上手册要的"规则变了吗"。

## 每条记录要落什么（手册 §0 三问）

1. **规则变了还是读数变了** —— `type`（Rule / Proposed Rule / Notice）+ `effective_on`
2. **从哪天起** —— `effective_on`；缺失则写"未标生效日"（`proposal` 常见）
3. **谁被迫改** —— `agencies` + `cfr_references`（章节号）

## `proposal ≠ effective` 的机器判据

`type` 为 `PRORULE`（Proposed Rule）时**必须有** `comments_close_on` 或"未标生效日"，
不允许把它的 `publication_date` 当生效日。这条写进 `normalize`，不靠注释提醒。
"""

from __future__ import annotations

from typing import Any, Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft

source_id = "fr.federalregister"
parser_version = "federal_register/1"

_API = "https://www.federalregister.gov/api/v1/documents.json"

#: `type` 的人话（管道不做判断，只把原文代码翻成人能读的标签）
_TYPE_LABEL = {
    "RULE": "最终规则（已生效或已定生效日）",
    "PRORULE": "提案（**不等于生效**）",
    "NOTICE": "通知",
    "PRESDOCU": "总统文件",
}


def _params(spec: TypeSpec, window: Window, term: str) -> list[tuple[str, str]]:
    """构造**单个 term** 的查询参数，返回键值对列表（不是 dict）。

    ★ 两个都实测过：
      1. **必须用 `k[]=v` 重复键**：写成 `conditions[agencies][0]=a&[1]=b` 服务端 400。
         故 `HttpClient.get` 接受 `[(k, v), …]`。
      2. **一次只查一个 term**：把 5 个 term 拼成
         `"a" OR "b" OR "c" OR "d" OR "e"` 时服务端回 **count=0**
         （实测：2 个 term=4 条、5 个 term=0 条，而单词各自都有 5–33 条）。
         这是 API 的查询复杂度限制，不是"政策确实没有"。
         ⇒ 改成**逐 term 查询再合并去重**：既绕开限制，也让"每个 term 各命中几条"
         成为可核的数字（写进 `checked_scope`）。
    """
    p: list[tuple[str, str]] = [
        ("per_page", str(int(spec.params.get("per_page") or 20))),
        ("order", "newest"),
        ("conditions[publication_date][gte]", window.since()),
        ("conditions[publication_date][lte]", window.as_of),
        ("conditions[term]", term),
    ]
    for a in spec.params.get("agencies") or []:
        p.append(("conditions[agencies][]", str(a)))
    for f in (
        "title",
        "type",
        "publication_date",
        "effective_on",
        "comments_close_on",
        "agencies",
        "cfr_references",
        "html_url",
        "pdf_url",
        "raw_text_url",
        "document_number",
        "abstract",
        "action",
    ):
        p.append(("fields[]", f))
    return p


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """打一条最小查询（1 条），断言 `count` 字段在场。"""
    try:
        data = client.get_json(
            _API,
            source_id=source_id,
            params=[
                ("per_page", "1"),
                ("order", "newest"),
                ("conditions[term]", str((spec.params.get("terms") or ["artificial intelligence"])[0])),
                ("fields[]", "title"),
                ("fields[]", "type"),
            ],
        )
    except FetchError as exc:
        raise Unavailable(f"Federal Register 不可达：{exc}") from exc
    if not isinstance(data, dict) or "results" not in data:
        raise Unavailable("Federal Register 返回结构异常（无 results）")
    return [f"fr.federalregister: 最小查询命中 count={data.get('count')}"]


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """逐 term 查询、按文号去重，**一件文件一件材料**（政策类必须逐件可核）。

    多 term 合并去重的理由见 `_params` 的 docstring（API 对多 term OR 回 0 条）。
    """
    import json

    terms = [str(t) for t in (spec.params.get("terms") or ["artificial intelligence"])]
    seen: dict[str, dict[str, Any]] = {}
    for term in terms:
        try:
            resp = client.get(_API, source_id=source_id, params=_params(spec, window, term))
        except FetchError:
            continue
        try:
            data = json.loads(resp.text)
        except json.JSONDecodeError:
            continue
        for doc in (data.get("results") if isinstance(data, dict) else None) or []:
            if not isinstance(doc, dict):
                continue
            key = str(doc.get("document_number") or doc.get("html_url") or "")
            if key and key not in seen:
                doc["_matched_term"] = term
                seen[key] = doc

    out: list[RawItem] = []
    for doc in seen.values():
        url = str(doc.get("raw_text_url") or doc.get("html_url") or "")
        if not url:
            continue
        try:
            body_resp = client.get(url, source_id=source_id)
        except FetchError:
            continue
        docnum = str(doc.get("document_number") or "").strip() or "nodocnum"
        out.append(
            RawItem(
                artifact_id=f"{spec.class_id}-{spec.slug}-{window.as_of}-{docnum}",
                url=body_resp.url,
                body=body_resp.body,
                content_type=body_resp.content_type,
                published_at=str(doc.get("publication_date") or "") or None,
                as_of=str(doc.get("effective_on") or doc.get("publication_date") or window.as_of),
                ext="txt" if url.endswith(".txt") else "htm",
                http_status=body_resp.status,
                extra={
                    "cat": spec.class_id,
                    "sub": spec.sub,
                    "date": str(doc.get("publication_date") or ""),
                    "docNumber": docnum,
                    "docType": str(doc.get("type") or ""),
                    "effectiveOn": doc.get("effective_on"),
                    "commentsCloseOn": doc.get("comments_close_on"),
                    "agencies": ", ".join(_agency_names(doc)),
                    "cfrRefs": ", ".join(_cfr_refs(doc)),
                    "abstract": str(doc.get("abstract") or ""),
                    "matchedTerm": str(doc.get("_matched_term") or ""),
                    "source": source_id,
                    "provider": "U.S. Office of the Federal Register",
                    "url": str(doc.get("html_url") or url),
                    "fetchedAt": window.as_of,
                },
            )
        )
    return out


def _agency_names(doc: dict[str, Any]) -> list[str]:
    """机构名（API 回的是对象数组，取 `name`）。"""
    out: list[str] = []
    for a in doc.get("agencies") or []:
        if isinstance(a, dict):
            name = a.get("name") or a.get("raw_name")
            if name:
                out.append(str(name))
        elif a:
            out.append(str(a))
    return out


def _cfr_refs(doc: dict[str, Any]) -> list[str]:
    """CFR 章节引用（`title` + `part`），这是"谁被迫改"的定位键。"""
    out: list[str] = []
    for r in doc.get("cfr_references") or []:
        if isinstance(r, dict):
            title = r.get("title")
            part = r.get("part")
            if title and part:
                out.append(f"{title} CFR {part}")
            elif title:
                out.append(f"{title} CFR")
        elif r:
            out.append(str(r))
    return out


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """规则原文 → 一份一目录（逻辑块：头部元信息 / 正文）。"""
    text = raw.body.decode("utf-8", errors="replace")
    if raw.ext != "txt":
        from pipelines._kit.material import html_to_text

        text = html_to_text(text)
    if not text.strip():
        raise ValueError(f"{raw.artifact_id}: 正文为空")

    doc_type = str(raw.extra.get("docType") or "")
    effective = raw.extra.get("effectiveOn")
    comments = raw.extra.get("commentsCloseOn")
    blocks: list[tuple[str, str]] = [
        (
            "发布与生效（口径）",
            "\n".join(
                [
                    f"文号: {raw.extra.get('docNumber')}",
                    f"类型: {doc_type} — {_TYPE_LABEL.get(doc_type, '未登记类型')}",
                    f"刊登日(publication_date): {raw.extra.get('date') or '未标'}",
                    f"生效日(effective_on): {effective or '未标'}",
                    f"评论截止(comments_close_on): {comments or '未标'}",
                    f"机构: {raw.extra.get('agencies') or '未标'}",
                    f"CFR 引用: {raw.extra.get('cfrRefs') or '未标'}",
                ]
            ),
        )
    ]
    if str(raw.extra.get("abstract") or "").strip():
        blocks.append(("摘要（发布方原文）", str(raw.extra.get("abstract"))))

    # 正文按自然段累积（规则原文没有 Item 锚点，用字数阈值切）
    from pipelines._kit.material import split_logical_pages

    for i, (label, body) in enumerate(split_logical_pages(text, fallback_chars=12000), start=1):
        blocks.append((f"正文 {i}｜{label}", body))

    # 硬纪律：提案不得被当生效
    if doc_type == "PRORULE" and effective:
        blocks.append(
            (
                "★ 归类提示",
                "本条是 **PRORULE（提案）**，但 API 回了 effective_on。"
                "手册 §0 明文：提案 ≠ 生效。判读时不得把此日期当生效依据，须回 Final Rule 核。",
            )
        )

    out_text = "\n\n".join(f"## {k}\n{v}" for k, v in blocks)
    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext=raw.ext,
        text=out_text,
        meta={
            "srcId": str(raw.extra.get("docNumber") or raw.artifact_id),
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": str(raw.extra.get("date") or ""),
            "docNumber": raw.extra.get("docNumber", ""),
            "docType": doc_type,
            "effectiveOn": effective,
            "commentsCloseOn": comments,
            "agencies": raw.extra.get("agencies", ""),
            "cfrRefs": raw.extra.get("cfrRefs", ""),
            "source": source_id,
            "provider": raw.extra.get("provider", ""),
            "url": raw.extra.get("url", raw.url),
            "publishedAt": raw.published_at,
            "pageCount": len(blocks),
        },
        page_caliber=spec.page_caliber,
        sections=blocks,
    )

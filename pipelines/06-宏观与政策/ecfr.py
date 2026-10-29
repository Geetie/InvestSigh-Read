"""`06-宏观与政策/ecfr.py` —— eCFR 版本化 Adapter（政策类的**生效依据**通道）。

## 它回答的问题与 `federal_register` 不同

| 通道 | 回答什么 |
|---|---|
| `federal_register` | **规则变了吗**：这次刊登的是什么类型、哪天生效、谁被迫改 |
| `ecfr`（本件） | **条文现在长什么样**：某条 CFR 在某个日期点上是否已并入、现行文本是什么 |

手册 `06-型/政策与管制.md` 逐字："「已刊登」不等于「已并入」，也不等于「已生效」"。
`federal_register` 只能给"已刊登"；**"已并入"必须回 eCFR 查**——这就是本 Adapter 的职责。

## 实测（2026-10-28）

    ecfr.gov/api/versioner/v1/titles.json ................... 200 / 8 KB（含 up_to_date_as_of）
    ecfr.gov/api/versioner/v1/versions/title-17.json ......... 200 / 260 KB（逐条版本史）
    ecfr.gov/api/search/v1/results?query=semiconductor ....... 200（全文检索）
    ecfr.gov/api/versioner/v1/structure/<date>/title-17.json . **404**
      —— 响应体逐字："The requested date 2026-10-28 is past the title's most recent
         issue date of 2026-10-26"
      ⇒ **不能拿"今天"当查询日期**，必须先用 `titles.json` 的 `up_to_date_as_of`
         取该标题的最近可用日期，否则每次都会 404。这是本 Adapter 的核心规避点。

## 取数策略

以 `search/v1/results` 按 term 检索 → 对命中的 title 取 `versions` 拿**版本史**。
落盘物是"该标题的条款版本史 + 检索命中上下文"，而不是整部 CFR
（title-17 的 versions 已 260 KB，整部结构更大；判读只需要"这一条哪天改的"）。
"""

from __future__ import annotations

from typing import Any, Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft

source_id = "ecfr"
parser_version = "ecfr/1"

_TITLES = "https://www.ecfr.gov/api/versioner/v1/titles.json"
_VERSIONS = "https://www.ecfr.gov/api/versioner/v1/versions/title-{title}.json"
_SEARCH = "https://www.ecfr.gov/api/search/v1/results"


def _terms(spec: TypeSpec) -> list[str]:
    raw = spec.params.get("terms") or ["artificial intelligence"]
    return [str(t) for t in raw]


def _max_titles(spec: TypeSpec) -> int:
    return int(spec.params.get("max_titles") or 2)


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """打 `titles.json`，并报该站当前可用的最新日期（`up_to_date_as_of`）。

    这个日期必须记进 `checked_scope`：它解释"为什么查的不是今天"。
    """
    try:
        data = client.get_json(_TITLES, source_id=source_id)
    except FetchError as exc:
        raise Unavailable(f"eCFR 不可达：{exc}") from exc
    titles = (data or {}).get("titles") if isinstance(data, dict) else None
    if not titles:
        raise Unavailable("eCFR titles.json 结构异常（无 titles）")
    latest = max((str(t.get("up_to_date_as_of") or "") for t in titles), default="")
    return [f"ecfr: {len(titles)} 个 title，站点最新可用日期 as_of={latest}"]


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """对每个 term 检索，取命中 title 的版本史。"""
    picked: dict[str, list[dict[str, Any]]] = {}
    for term in _terms(spec):
        try:
            data = client.get_json(
                _SEARCH,
                source_id=source_id,
                params=[("query", term), ("per_page", "10")],
            )
        except FetchError:
            continue
        for r in ((data or {}).get("results") if isinstance(data, dict) else None) or []:
            if not isinstance(r, dict):
                continue
            title = str(((r.get("hierarchy") or {}).get("title") or "")).strip()
            if title:
                picked.setdefault(title, []).append(
                    {
                        "term": term,
                        "type": r.get("type"),
                        "starts_on": r.get("starts_on"),
                        "hierarchy": r.get("hierarchy"),
                    }
                )

    out: list[RawItem] = []
    for title in list(picked)[: _max_titles(spec)]:
        url = _VERSIONS.format(title=title)
        try:
            resp = client.get(url, source_id=source_id)
        except FetchError:
            continue
        hits = picked[title]
        out.append(
            RawItem(
                artifact_id=f"{spec.class_id}-{spec.slug}-{window.as_of}-title{title}",
                url=resp.url,
                body=resp.body,
                content_type=resp.content_type,
                published_at=None,
                as_of=window.as_of,
                ext="json",
                http_status=resp.status,
                extra={
                    "cat": spec.class_id,
                    "sub": spec.sub,
                    "date": window.as_of,
                    "title": title,
                    "hitTerms": sorted({h["term"] for h in hits}),
                    "hits": hits[:20],
                    "source": source_id,
                    "provider": "U.S. eCFR (National Archives)",
                    "url": resp.url,
                    "fetchedAt": window.as_of,
                },
            )
        )
    return out


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """版本史 JSON → 一份一目录（检索命中 / 最近改动 / 版本史规模）。"""
    import json

    title = str(raw.extra.get("title") or "")
    try:
        data = json.loads(raw.body.decode("utf-8", errors="replace"))
    except json.JSONDecodeError:
        data = None

    blocks: list[tuple[str, str]] = [
        (
            "检索命中（本轮为什么取这个 title）",
            "\n".join(
                f"- term={h.get('term')} | type={h.get('type')} | starts_on={h.get('starts_on')} | "
                f"层级={_hier(h.get('hierarchy'))}"
                for h in (raw.extra.get("hits") or [])
            )
            or "（无命中明细）",
        )
    ]

    versions = (data or {}).get("content_versions") if isinstance(data, dict) else None
    if isinstance(versions, list):
        vers = [v for v in versions if isinstance(v, dict)]
        # 按 (日期, identifier) 倒序取最近 60 条改动
        vers.sort(key=lambda v: (str(v.get("date") or ""), str(v.get("identifier") or "")), reverse=True)
        recent = vers[:60]
        blocks.append(
            (
                "口径",
                "\n".join(
                    [
                        f"CFR Title: {title}",
                        f"版本条目数: {len(vers)}",
                        "本件给的是**逐条版本史**（哪一条、哪天改的），不是条文全文",
                        "纪律: 「已刊登」（Federal Register）≠「已并入」（eCFR）≠「已生效」",
                    ]
                ),
            )
        )
        blocks.append(
            (
                "最近改动（按日期倒序前 60）",
                "\n".join(
                    f"{v.get('date')} | {v.get('identifier')} | {str(v.get('name') or '')[:90]}"
                    for v in recent
                )
                or "（无版本条目）",
            )
        )
    else:
        blocks.append(("版本史", "（本件无 content_versions；原文见 source.json）"))

    text = "\n\n".join(f"## {k}\n{v}" for k, v in blocks)
    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext="json",
        text=text,
        meta={
            "srcId": f"title-{title}-versions.json",
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": str(raw.extra.get("date") or ""),
            "title": title,
            "hitTerms": raw.extra.get("hitTerms") or [],
            "source": source_id,
            "provider": raw.extra.get("provider", ""),
            "url": raw.url,
            "pageCount": len(blocks),
        },
        page_caliber=spec.page_caliber,
        sections=blocks,
    )


def _hier(h: Any) -> str:
    """把 hierarchy 压成 `15 CFR 744` 这种可读串。"""
    if not isinstance(h, dict):
        return "未标"
    parts = [str(h.get(k)) for k in ("title", "subtitle", "chapter", "subchapter", "part", "section")
             if h.get(k)]
    return " ".join(parts) or "未标"

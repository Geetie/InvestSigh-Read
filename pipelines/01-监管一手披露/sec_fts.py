"""`01-监管一手披露/sec_fts.py` —— SEC 全文检索 Adapter（01/03 类的**降级**通道）。

## 它解决什么

`sec_edgar` 走 `submissions` 拿准确清单；但两类情况它会漏：

1. 公司改过名 / 换过 CIK（`submissions` 只回当前 CIK 名下的件）；
2. 要找**关键词**而非按表单类型（如 `non-reliance` / `restatement` 红灯线索）。

`efts.sec.gov/LATEST/search-index` 是 SEC 自己的全文检索（实测 200，返回 `hits.total`），
按 `forms` + `ciks` + 日期窗口过滤，是合法且稳定的补漏通道。

## 与 `sec_edgar` 的关系：Strategy 降级链

`channels.yaml` 里写 `fallback: [sec_fts]`。只对 `Unavailable` 降级——
`failed`（解析坏了）不降级，因为那说明工具本身有问题。

## 实测

    efts.sec.gov/LATEST/search-index?forms=8-K            → 200, hits.total=40
    efts.sec.gov/LATEST/search-index?forms=4&ciks=…       → 200, hits.total=9

响应里 `hits.hits[]._id` 形如 `0001628280-26-003832:meta-20260128.htm`
（`<accession>:<文件名>`），`_source.ciks` / `display_names` / `period_ending` 可用。
"""

from __future__ import annotations

from typing import Any, Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft, html_to_text, split_logical_pages
from pipelines._kit.sec import archive_url, cik_of
from pipelines._kit.targets import ticker_of

source_id = "sec.fts"
parser_version = "sec_fts/1"

_SEARCH = "https://efts.sec.gov/LATEST/search-index"
_MAX_HITS = 100


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """打一条最小检索（`forms` 取第一个 + 空 query），断言返回 `hits` 结构。"""
    forms = [str(f) for f in (spec.params.get("forms") or [])]
    form = forms[0] if forms else "8-K"
    try:
        data = client.get_json(
            _SEARCH,
            source_id=source_id,
            params={"q": "", "forms": form, "dateRange": "custom"},
        )
    except FetchError as exc:
        raise Unavailable(f"SEC 全文检索不可达：{exc}") from exc
    if not isinstance(data, dict) or "hits" not in data:
        raise Unavailable("SEC 全文检索返回结构异常（无 hits）")
    total = ((data.get("hits") or {}).get("total") or {}).get("value", 0)
    return [f"sec.fts: forms={form} hits.total={total}"]


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """按窗口检索，逐条取归档原件。"""
    forms = [str(f) for f in (spec.params.get("forms") or [])]
    if not forms:
        raise Unavailable(f"{spec.key}: channels.yaml 未声明 forms")
    ticker = ticker_of(spec)
    cik = cik_of(client, ticker, explicit=str(spec.params.get("cik") or "") or None)

    out: list[RawItem] = []
    for form in forms:
        params = {
            "q": str(spec.params.get("fts_query") or ""),
            "forms": form,
            "ciks": cik,
            "dateRange": "custom",
            "startdt": window.since(),
            "enddt": window.as_of,
        }
        try:
            data = client.get_json(_SEARCH, source_id=source_id, params=params)
        except FetchError:
            continue
        for hit in _hits(data)[: _MAX_HITS]:
            item = _item_of(client, hit, spec, form)
            if item is not None:
                out.append(item)
    return out


def _hits(data: Any) -> list[dict[str, Any]]:
    """从检索响应里取 `hits.hits`（结构变了就返回空表，由调用方判 empty）。"""
    if not isinstance(data, dict):
        return []
    arr = ((data.get("hits") or {}).get("hits")) or []
    return [h for h in arr if isinstance(h, dict)]


def _item_of(
    client: HttpClient, hit: dict[str, Any], spec: TypeSpec, form: str
) -> RawItem | None:
    """一条命中 → `RawItem`（取归档主文档）。"""
    hit_id = str(hit.get("_id") or "")
    if ":" not in hit_id:
        return None
    accession, name = hit_id.split(":", 1)
    source = hit.get("_source") or {}
    ciks = source.get("ciks") or []
    if not ciks:
        return None
    cik = str(ciks[0])
    url = archive_url(cik, accession.replace("-", ""), name)

    try:
        resp = client.get(url, source_id=source_id)
    except FetchError:
        return None

    stamp = str(source.get("period_ending") or source.get("file_date") or "")
    stem = name.rsplit("/", 1)[-1].rsplit(".", 1)[0]
    mid = f"{spec.class_id}-{spec.slug}-{stamp}-{stem}"
    return RawItem(
        artifact_id=mid,
        url=resp.url,
        body=resp.body,
        content_type=resp.content_type,
        published_at=str(source.get("file_date") or "") or None,
        as_of=stamp,
        ext="htm",
        http_status=resp.status,
        extra={
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": stamp,
            "form": form,
            "accession": accession,
            "ticker": ticker_of(spec),
            "source": source_id,
            "provider": "U.S. SEC EDGAR (full-text search)",
            "primaryDoc": name,
            "url": url,
            "fetchedAt": stamp,
        },
    )


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """与 `sec_edgar` 同一口径：htm → 逻辑块号。"""
    text = html_to_text(raw.body.decode("utf-8", errors="replace"))
    if not text.strip():
        raise ValueError(f"{raw.artifact_id}: 正文抽取为空")
    sections = split_logical_pages(text)
    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext=raw.ext,
        text=text,
        meta={
            "srcId": str(raw.extra.get("primaryDoc") or raw.artifact_id),
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": str(raw.extra.get("date") or ""),
            "form": raw.extra.get("form", ""),
            "accession": raw.extra.get("accession", ""),
            "ticker": raw.extra.get("ticker", ""),
            "source": source_id,
            "provider": raw.extra.get("provider", ""),
            "url": raw.url,
            "pageCount": len(sections),
        },
        page_caliber=spec.page_caliber,
        sections=sections,
    )

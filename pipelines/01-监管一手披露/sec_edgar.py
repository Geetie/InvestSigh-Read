"""`01-监管一手披露/sec_edgar.py` —— SEC EDGAR 主文档 Adapter（服务 01 类全部 6 型）。

## 取数三段

    submissions/CIK##########.json  →  Archives/<acc>/index.json  →  Archives/<acc>/<主文档>

三段都在 `_kit.sec` 里实现（一个源服务十个型，不按型复制）。

## 一件材料取几个文件

| 型 | 取什么 |
|---|---|
| 10-K / 10-Q / 委托书 / 招股书 | **只取主文档**（htm）；`index.json` 用来给 `p.N` 与附件计数做准备 |
| 8-K | 主文档 + **EX-99.1 / EX-99.2**（业绩公告的实质在附件里，`01-型/8-K与EX-99.1.md` 明文） |
| 其他条目与红灯 | 主文档；`items` 里有红灯条目时带 `red_flag` 标记进 meta |

## `p.N` 口径

本类材料是 **htm，不走 MinerU** ⇒ `p.N` = **逻辑块号**（按 `Item N.` / `PART` 切）。
实现在 `_kit.material.split_logical_pages`，`page_caliber: logical_block`。
"""

from __future__ import annotations

from typing import Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft, html_to_text, split_logical_pages
from pipelines._kit.sec import (
    SecFiling,
    cik_of,
    filing_index,
    list_filings,
    pick_raw_xml,
)
from pipelines._kit.targets import ticker_of

source_id = "sec.edgar"
parser_version = "sec_edgar/1"

_UA_NOTE = "SEC 要求实名 UA + ≤10 req/s（本包 8）"

#: 附件抽取白名单（只取业绩公告本体，不取图片/zip）
_EXHIBIT_PATTERNS = ("ex991", "ex99-1", "ex-99.1", "exhibit991", "ex99_1")


def _lookback(spec: TypeSpec, window: Window) -> int:
    """本型的回溯天数：`channels.yaml::lookback_days` 优先，否则用运行参数。"""
    explicit = spec.params.get("lookback_days")
    return int(explicit) if explicit is not None else window.lookback_days


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """打一条最小请求：取 ticker 的 CIK（这一步同时验证 UA 与网络）。"""
    ticker = ticker_of(spec)
    try:
        cik = cik_of(client, ticker, explicit=str(spec.params.get("cik") or "") or None)
    except FetchError as exc:
        raise Unavailable(f"SEC 不可达或 UA 被拒：{exc}", checked_scope=[_UA_NOTE]) from exc
    return [f"sec.edgar: {ticker}→CIK {cik}", _UA_NOTE]


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """按 `forms` 拉窗口内的申报，取主文档（8-K 另取 EX-99.x）。"""
    ticker = ticker_of(spec)
    cik = cik_of(client, ticker, explicit=str(spec.params.get("cik") or "") or None)
    forms = [str(f) for f in (spec.params.get("forms") or [])]
    if not forms:
        raise Unavailable(f"{spec.key}: channels.yaml 未声明 forms")

    days = _lookback(spec, window)
    since = Window(as_of=window.as_of, lookback_days=days).since()
    filings = list_filings(client, cik, forms=forms, since=since, until=window.as_of)
    if not filings:
        return []

    limit = spec.params.get("max_items")
    if limit:
        filings = filings[: int(limit)]

    items: list[RawItem] = []
    for filing in filings:
        items.extend(_items_of(client, filing, spec))
    return items


def _items_of(client: HttpClient, filing: SecFiling, spec: TypeSpec) -> list[RawItem]:
    """一件申报 → 一份或两份 `RawItem`（主文档 + 可选 EX-99.x）。"""
    out: list[RawItem] = []
    ticker = ticker_of(spec)
    mid = f"{spec.class_id}-{spec.slug}-{filing.material_id_stem}"
    extra = {
        "cat": spec.class_id,
        "sub": spec.sub,
        "date": filing.filing_date,
        "form": filing.form,
        "accession": filing.accession,
        "ticker": ticker,
        "source": source_id,
        "provider": "U.S. SEC EDGAR",
        "primaryDoc": filing.primary_document.rsplit("/", 1)[-1],
        "items": filing.items,
        "url": filing.archive_url(),
    }

    # 1) 主文档
    try:
        resp = client.get(filing.archive_url(), source_id=source_id)
    except FetchError as exc:
        if exc.status == 404:
            # 主文档名与归档不符（老包）→ 用 index.json 找 htm
            alt = _fallback_htm(client, filing)
            if not alt:
                raise
            resp = client.get(filing.archive_url(alt), source_id=source_id)
            extra["primaryDoc"] = alt
        else:
            raise
    ext = _ext_of(extra["primaryDoc"])
    out.append(
        RawItem(
            artifact_id=mid,
            url=resp.url,
            body=resp.body,
            content_type=resp.content_type,
            published_at=filing.filing_date,
            as_of=filing.report_date or filing.filing_date,
            ext=ext,
            http_status=resp.status,
            vintage=_vintage_of(filing),
            extra={**extra, "exhibitType": "primary"},
        )
    )

    # 2) 8-K 的业绩附件
    if filing.form.startswith("8-K") and spec.params.get("include_exhibits"):
        for name in _exhibit_names(client, filing):
            try:
                ex_resp = client.get(filing.archive_url(name), source_id=source_id)
            except FetchError:
                continue
            out.append(
                RawItem(
                    artifact_id=f"{mid}-{name.rsplit('.', 1)[0]}",
                    url=ex_resp.url,
                    body=ex_resp.body,
                    content_type=ex_resp.content_type,
                    published_at=filing.filing_date,
                    as_of=filing.report_date or filing.filing_date,
                    ext=_ext_of(name),
                    http_status=ex_resp.status,
                    vintage=_vintage_of(filing),
                    extra={**extra, "exhibitType": name, "primaryDoc": name},
                )
            )
    return out


def _fallback_htm(client: HttpClient, filing: SecFiling) -> str | None:
    """主文档 404 时，从 `index.json` 找第一个 `.htm`（跳过 index 页）。"""
    for it in filing_index(client, filing):
        name = str(it.get("name") or "")
        if not name.lower().endswith((".htm", ".html")):
            continue
        if "index" in name.lower():
            continue
        return name
    return None


def _exhibit_names(client: HttpClient, filing: SecFiling) -> list[str]:
    """从 `index.json` 里挑 EX-99.x 的 htm（实测 8-K 包里 99.1 与 99.2 并列）。"""
    names: list[str] = []
    for it in filing_index(client, filing):
        name = str(it.get("name") or "")
        low = name.lower()
        if not low.endswith((".htm", ".html", ".txt")):
            continue
        if "index" in low:
            continue
        if any(p.replace(".", "") in low.replace(".", "").replace("-", "").replace("_", "")
               for p in _EXHIBIT_PATTERNS):
            names.append(name)
    return names


def _ext_of(name: str) -> str:
    """文件名 → 落盘扩展名（`htm` 归一，无后缀按 `htm`）。"""
    low = name.lower()
    for ext in ("htm", "html", "txt", "xml", "json"):
        if low.endswith("." + ext):
            return "htm" if ext == "html" else ext
    return "htm"


def _vintage_of(filing: SecFiling) -> str | None:
    """修订件（`/A`）才有 vintage；首版为 None（不是空串——空串会冒充"有值"）。"""
    return filing.accession if filing.form.endswith("/A") else None


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """htm/txt/xml 原件 → 一份一目录（逻辑块号口径）。"""
    text = html_to_text(raw.body.decode("utf-8", errors="replace"))
    if not text.strip():
        raise ValueError(f"{raw.artifact_id}: 正文抽取为空（原件可能是脚本壳）")

    sections = split_logical_pages(text)
    meta = {
        "srcId": str(raw.extra.get("primaryDoc") or raw.artifact_id),
        "cat": spec.class_id,
        "sub": spec.sub,
        "date": str(raw.extra.get("date") or ""),
        "form": raw.extra.get("form", ""),
        "accession": raw.extra.get("accession", ""),
        "ticker": raw.extra.get("ticker", ""),
        "source": source_id,
        "provider": raw.extra.get("provider", "U.S. SEC EDGAR"),
        "primaryDoc": raw.extra.get("primaryDoc", ""),
        "exhibitType": raw.extra.get("exhibitType", "primary"),
        "items": raw.extra.get("items", ""),
        "url": raw.url,
        "fetchedAt": raw.as_of,
        "pageCount": len(sections),
    }
    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext=raw.ext,
        text=text,
        meta=meta,
        page_caliber=spec.page_caliber,
        sections=sections,
    )

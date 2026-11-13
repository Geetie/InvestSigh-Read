"""`01-监管一手披露/sec_edgar.py` —— SEC EDGAR 主文档 Adapter（服务 01 类全部 6 型）。

## 取数三段

    submissions/CIK##########.json  →  Archives/<acc>/index.json  →  Archives/<acc>/<主文档>

三段都在 `_kit.sec` 里实现（一个源服务十个型，不按型复制）。

## 一件材料取几个文件

| 型 | 取什么 |
|---|---|
| 全部型 | **主文档 + 申报包内全部申报文件**（2026-11-03 起：不裁剪）。`index.json` 用来列包、给 `p.N` 做准备 |
| 排除项 | 机器渲染物，不是申报文件：`R*.htm`（XBRL 渲染视图）、`FilingSummary.xml` 与 `*_lab/_cal/_def/_pre/_htm.xml`（XBRL 机器件）、`<accession>.txt`（全包串联件）、`index` 页、带目录前缀的渲染壳 |

排除只是**不去重复存储机器生成的视图**，不是内容裁剪；申报包里每一份人读文件（主文档、
EX-1.x/3.x/4.x/5.x/10.x/99.x、SD 的 conflict minerals 报告等）都进语料。
`index.json` 缺失（老包）时退化为只取主文档——这是唯一允许的"少取"，因为它取不到清单。

## `p.N` 口径

本类材料是 **htm，不走 MinerU** ⇒ `p.N` = **逻辑块号**（按 `Item N.` / `PART` 切）。
实现在 `_kit.material.split_logical_pages`，`page_caliber: logical_block`。
"""

from __future__ import annotations

from typing import Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import DocPart, MaterialDraft, html_to_text, split_logical_pages
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

#: 申报文件的扩展名白名单（exhibit 可能是 .txt；.xml 一律是 XBRL 机器件，不在此列）
_DOC_EXTS = (".htm", ".html", ".txt")


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
    """按 `forms` 拉窗口内的申报，取主文档 + 包内全部申报文件（不裁剪）。"""
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
    """一件申报 → **一份** `RawItem`（主文档在 `body`，包内全部申报文件随行于 `extra["parts"]`）。

    包口径（2026-11-03 起，不裁剪）：一份材料 = 一份申报 = 主文档 + 全部附件，
    落盘后同目录（`source.<ext>` + `exhibits/`）。单附件请求失败不停整包。
    """
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
    primary_name = extra["primaryDoc"]
    parts: list[dict] = [
        {
            "name": primary_name,
            "kind": "primary",
            "body": resp.body,
            "ext": _ext_of(primary_name),
            "url": resp.url,
            "content_type": resp.content_type,
            "http_status": resp.status,
        }
    ]

    # 2) 包内其余申报文件（不裁剪：协议、证书、意见书、业绩稿都进同一份材料）
    for name in _package_documents(client, filing, primary=primary_name):
        try:
            ex_resp = client.get(filing.archive_url(name), source_id=source_id)
        except FetchError:
            continue
        parts.append(
            {
                "name": name,
                "kind": "exhibit",
                "body": ex_resp.body,
                "ext": _ext_of(name),
                "url": ex_resp.url,
                "content_type": ex_resp.content_type,
                "http_status": ex_resp.status,
            }
        )

    extra["files"] = [{"doc": p["name"], "kind": p["kind"], "bytes": len(p["body"])} for p in parts]
    extra["exhibitType"] = "package"
    out.append(
        RawItem(
            artifact_id=mid,
            url=resp.url,
            body=resp.body,
            content_type=resp.content_type,
            published_at=filing.filing_date,
            as_of=filing.report_date or filing.filing_date,
            ext=_ext_of(primary_name),
            http_status=resp.status,
            vintage=_vintage_of(filing),
            extra={**extra, "parts": parts},
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


def _package_documents(client: HttpClient, filing: SecFiling, primary: str) -> list[str]:
    """申报包内**全部申报文件**（除主文档外；不裁剪，见模块 docstring 的排除项表）。

    排除的只有机器渲染物与冗余串联件，依据（2026-11-03 实测 9 个包的 index.json）：
    - `R1.htm…R91.htm`：XBRL 渲染视图，是同一报表的机器生成图壳（10-K 包 91 个）
    - `*_lab.xml / *_cal.xml / *_def.xml / *_pre.xml / *_htm.xml / FilingSummary.xml`：XBRL 机器件
    - `<accession>.txt`：全包串联件，内容与逐文件完全相同
    - 带 `xsl` 目录前缀的渲染壳与图形/压缩文件（非 .htm/.html/.txt 不选）
    """
    import re

    render = re.compile(r"^r\d+\.htm$")
    primary_low = primary.rsplit("/", 1)[-1].lower()
    full_txt = filing.accession + ".txt"
    names: list[str] = []
    for it in filing_index(client, filing):
        name = str(it.get("name") or "")
        low = name.lower()
        if not low.endswith(_DOC_EXTS):
            continue
        if "/" in name or "index" in low:
            continue  # 渲染壳目录 / index 页
        if render.match(low):
            continue  # XBRL 渲染视图
        if name == full_txt:
            continue  # 全包串联件
        if low == primary_low:
            continue  # 主文档已在上面取过
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
    """申报包原件 → 一份一目录（逻辑块号口径；主文档块在前、附件块接续）。"""
    extra = dict(raw.extra)
    parts_meta = extra.pop("parts", None) or []
    primary_name = str(extra.get("primaryDoc") or raw.artifact_id)

    doc_parts: list[DocPart] = []
    merged: list[str] = []
    for idx, p in enumerate(parts_meta):
        text = html_to_text(p["body"].decode("utf-8", errors="replace"))
        if not text.strip():
            # 主文档空 = 没取到（failed）；附件空（纯图片件等）保文件不保页
            if idx == 0:
                raise ValueError(f"{raw.artifact_id}: 主文档正文抽取为空（原件可能是脚本壳）")
            continue
        secs = split_logical_pages(text)
        doc_parts.append(
            DocPart(
                name=str(p["name"]),
                kind=str(p.get("kind") or ("primary" if idx == 0 else "exhibit")),
                body=p["body"],
                ext=str(p["ext"]),
                text=text,
                sections=secs,
            )
        )
        merged.append(text if idx == 0 else f"<!-- doc: {p['name']} ({p['kind']}) -->\n\n{text}")

    text = "\n\n".join(merged)
    if not text.strip():
        raise ValueError(f"{raw.artifact_id}: 正文抽取为空（原件可能是脚本壳）")

    meta = {
        "srcId": primary_name,
        "cat": spec.class_id,
        "sub": spec.sub,
        "date": str(extra.get("date") or ""),
        "form": extra.get("form", ""),
        "accession": extra.get("accession", ""),
        "ticker": extra.get("ticker", ""),
        "source": source_id,
        "provider": extra.get("provider", "U.S. SEC EDGAR"),
        "primaryDoc": primary_name,
        "exhibitType": "package" if len(doc_parts) > 1 else "primary",
        "items": extra.get("items", ""),
        "url": raw.url,
        "fetchedAt": raw.as_of,
    }
    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext=raw.ext,
        text=text,
        meta=meta,
        page_caliber=spec.page_caliber,
        sections=[],
        parts=doc_parts,
    )

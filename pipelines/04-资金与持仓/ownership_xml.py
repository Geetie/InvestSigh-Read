"""`04-资金与持仓/ownership_xml.py` —— Form 3/4/5 原始 XML Adapter（内部人申报）。

## 关键坑（已实测，写进代码）

**`primaryDocument` 是渲染壳**：Form 4 的 `primaryDocument` 实测为
`xslF345X06/ownership.xml`，那是 XSL 渲染后的 HTML 版；**原始 XML** 在同一个
提交包里、与它并列，名为 `ownership.xml`（无目录前缀）。

`_kit.sec.pick_raw_xml()` 的判据就是"路径里不含 `xsl`"——不靠名字猜。

## 取数路径

    submissions/CIK.json（找 form=4） → Archives/<acc>/index.json → ownership.xml

## 解析口径

Form 4 的两张表必须分开读（`04-型/内部人申报.md`）：
- **Table I**：非衍生证券（common stock 的 P/S/A/F/M/G 逐笔）
- **Table II**：衍生证券（期权、RSU 授予与行权）

本 Adapter 只把 XML **原样落成材料**（`source.xml` + 可读的 `content.md` 摘要），
不做"主动/被动"判定——那是判读层的事，管道做判定就越界了。
"""

from __future__ import annotations

import re
from typing import Sequence
from xml.etree import ElementTree as ET

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft, split_logical_pages
from pipelines._kit.sec import cik_of, filing_index, list_filings, pick_raw_xml
from pipelines._kit.targets import ticker_of

source_id = "sec.edgar.ownership"
parser_version = "ownership_xml/1"

#: 5.1/5.2 表的行契约（只抽判读要用的列，其余原文仍在 source.xml 里）
_TABLE1_COLS = (
    ("Security", "securityTitle/value"),
    ("Date", "transactionDate/value"),
    ("Code", "transactionCoding/transactionCode"),
    ("Shares", "transactionAmounts/transactionShares/value"),
    ("Price", "transactionAmounts/transactionPricePerShare/value"),
    ("AD", "transactionAmounts/transactionAcquiredDisposedCode/value"),
    ("After", "postTransactionAmounts/sharesOwnedFollowingTransaction/value"),
)


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """最小请求：取 CIK + 确认 submissions 里 Form 4 计数。"""
    ticker = ticker_of(spec)
    try:
        cik = cik_of(client, ticker, explicit=str(spec.params.get("cik") or "") or None)
    except FetchError as exc:
        raise Unavailable(f"SEC 不可达：{exc}") from exc
    return [f"sec.edgar.ownership: {ticker}→CIK {cik}"]


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """拉窗口内 Form 3/4/5，取原始 XML。"""
    ticker = ticker_of(spec)
    cik = cik_of(client, ticker, explicit=str(spec.params.get("cik") or "") or None)
    forms = [str(f) for f in (spec.params.get("forms") or ["4"])]
    days = int(spec.params.get("lookback_days") or window.lookback_days)
    since = Window(as_of=window.as_of, lookback_days=days).since()

    filings = list_filings(client, cik, forms=forms, since=since, until=window.as_of)
    limit = spec.params.get("max_items")
    if limit:
        filings = filings[: int(limit)]

    out: list[RawItem] = []
    for f in filings:
        xml_name = pick_raw_xml(filing_index(client, f)) or "ownership.xml"
        try:
            resp = client.get(f.archive_url(xml_name), source_id=source_id)
        except FetchError:
            continue
        out.append(
            RawItem(
                artifact_id=f"{spec.class_id}-{spec.slug}-{f.material_id_stem}",
                url=resp.url,
                body=resp.body,
                content_type=resp.content_type,
                published_at=f.filing_date,
                as_of=f.report_date or f.filing_date,
                ext="xml",
                http_status=resp.status,
                extra={
                    "cat": spec.class_id,
                    "sub": spec.sub,
                    "date": f.filing_date,
                    "form": f.form,
                    "accession": f.accession,
                    "ticker": ticker,
                    "source": source_id,
                    "provider": "U.S. SEC EDGAR",
                    "primaryDoc": xml_name,
                    "url": resp.url,
                    "fetchedAt": f.filing_date,
                },
            )
        )
    return out


def _txt(node: ET.Element | None, path: str) -> str:
    """按 `a/b/value` 取文本（缺则空串，不抛——Form 4 的列常常整段缺失）。"""
    if node is None:
        return ""
    cur: ET.Element | None = node
    for part in path.split("/"):
        if cur is None:
            return ""
        cur = cur.find(part)
    return (cur.text or "").strip() if cur is not None and cur.text else ""


def render_xml(xml_text: str) -> tuple[str, list[tuple[str, str]]]:
    """Form 4 XML → 人可读正文 + 逻辑块。

    返回 `(全文, [(块标签, 块正文), …])`。解析失败时退化为"原始 XML 全文一块"
    —— 原文必须可读，不能因为解析器不认识某版 DTD 就丢掉。

    块划分：`报告人` / `发行人` / `Table I 非衍生` / `Table II 衍生` / `签名`。
    """
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError:
        return xml_text, [("原始 XML", xml_text)]

    owner = root.find("reportingOwner")
    issuer = root.find("issuer")
    owner_name = _txt(owner, "reportingOwnerId/rptOwnerName")
    owner_cik = _txt(owner, "reportingOwnerId/rptOwnerCik")
    rel = _txt(owner, "reportingOwnerRelationship/isDirector")
    officer = _txt(owner, "reportingOwnerRelationship/officerTitle")
    issuer_name = _txt(issuer, "issuerName")
    issuer_ticker = _txt(issuer, "issuerTradingSymbol")

    blocks: list[tuple[str, str]] = []
    blocks.append(
        (
            "报告人与发行人",
            "\n".join(
                [
                    f"报告人: {owner_name} (CIK {owner_cik})",
                    f"是否董事: {rel or '未标'}",
                    f"职务: {officer or '未标'}",
                    f"发行人: {issuer_name} ({issuer_ticker})",
                ]
            ),
        )
    )

    rows: list[str] = []
    for txn in root.findall(".//nonDerivativeTransaction"):
        rows.append(" | ".join(_txt(txn, p) for _, p in _TABLE1_COLS))
    header = " | ".join(name for name, _ in _TABLE1_COLS)
    blocks.append(("Table I 非衍生证券", header + "\n" + ("\n".join(rows) or "（本件无此行）")))

    drows: list[str] = []
    for txn in root.findall(".//derivativeTransaction"):
        drows.append(
            " | ".join(
                [
                    _txt(txn, "securityTitle/value"),
                    _txt(txn, "transactionDate/value"),
                    _txt(txn, "transactionCoding/transactionCode"),
                    _txt(txn, "transactionAmounts/transactionShares/value"),
                    _txt(txn, "transactionAmounts/transactionPricePerShare/value"),
                    _txt(txn, "transactionAmounts/transactionAcquiredDisposedCode/value"),
                ]
            )
        )
    dh = "Security | Date | Code | Shares | Price | A/D"
    blocks.append(("Table II 衍生证券", dh + "\n" + ("\n".join(drows) or "（本件无此行）")))

    footnote = root.find("footnotes")
    if footnote is not None:
        notes = "\n".join(
            f"{fn.get('id', '')}: {(fn.text or '').strip()}" for fn in footnote.findall("footnote")
        )
        if notes.strip():
            blocks.append(("脚注", notes))

    text = "\n\n".join(f"## {label}\n{body}" for label, body in blocks)
    return text, blocks


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """XML → 一份一目录（块 = 报告人/发行人/两表/脚注）。"""
    xml_text = raw.body.decode("utf-8", errors="replace")
    text, blocks = render_xml(xml_text)
    if not text.strip():
        raise ValueError(f"{raw.artifact_id}: Form XML 渲染为空")

    for name, body in blocks:
        if name == "报告人与发行人":
            m = re.search(r"报告人: (.+?) \(CIK", body)
            if m:
                raw.extra.setdefault("filer", m.group(1))
        if name == "Table I 非衍生证券" and "（本件无此行）" not in body:
            raw.extra.setdefault("hasTableI", True)

    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext="xml",
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
            "pageCount": len(blocks),
        },
        page_caliber=spec.page_caliber,
        sections=blocks,
    )

"""`04-资金与持仓/form13f_xml.py` —— 13F / 13D / 13G Adapter（机构持仓申报）。

## 一个必须先说清的实测事实

**META 作为发行人不申报 13F**（实测 `submissions/CIK0001326801.json` 的
`filings.recent` 里没有任何 13F）。13F 是**机构**申报的持仓表。
所以本型的取数对象是**机构 CIK**，不是被持仓公司的 CIK
——`channels.yaml::params.filer_ciks` 就是那份名单。

## 两类表结构不同

| 表单 | 取哪个文件 | 说明 |
|---|---|---|
| `13F-HR` | `index.json` 里的 **`form13fInfoTable.xml`** | 持仓明细表；另有 `primary_doc.xml` 是封面 |
| `SC 13D / 13G` | 主文档（htm） | 举牌/被动持股声明，正文是叙述 + 表格 |

实测（BlackRock CIK 1364742，13F-HR 2024-08-13）：
`index.json` 含 `form13fInfoTable.xml` + `primary_doc.xml`。

## 时滞纪律

13F 是**季末快照 + ≤45 天时滞**。`as_of` 必须记**报告期**
（`periodOfReport`），不是提交日；超 45 天当"当前持仓"要判红（手册 `§3.4` 第 3 条）。
"""

from __future__ import annotations

import re
from typing import Any, Sequence
from xml.etree import ElementTree as ET

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft, html_to_text, split_logical_pages
from pipelines._kit.sec import list_filings, pick_raw_xml
from pipelines._kit.targets import ticker_of

source_id = "sec.edgar.13f"
parser_version = "form13f_xml/1"

_INFO_TABLE = "form13fInfoTable"


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """最小请求：证明能用（取第一个机构的 CIK 直接打 submissions）。

    机构名单为空即 `Unavailable`——那是配置缺失，不是"没有持仓"。
    """
    filers = _filers(spec)
    if not filers:
        raise Unavailable(f"{spec.key}: channels.yaml 未声明 filer_ciks（13F 由机构申报，发行人无此项）")
    name, cik = next(iter(filers.items()))
    try:
        data = client.get_json(
            f"https://data.sec.gov/submissions/CIK{cik}.json", source_id=source_id
        )
    except FetchError as exc:
        raise Unavailable(f"SEC 不可达：{exc}") from exc
    forms = ((data.get("filings") or {}).get("recent") or {}).get("form") or []
    n13f = sum(1 for f in forms if str(f).startswith("13F"))
    return [f"sec.edgar.13f: {name}(CIK {cik}) 近期 13F 计数={n13f}"]


def _filers(spec: TypeSpec) -> dict[str, str]:
    """机构名 → 10 位 CIK。接受 list（只给 CIK）或 dict（名→CIK）。"""
    raw = spec.params.get("filer_ciks") or {}
    out: dict[str, str] = {}
    if isinstance(raw, dict):
        for k, v in raw.items():
            out[str(k)] = str(v).zfill(10)
    elif isinstance(raw, (list, tuple)):
        for v in raw:
            cik = str(v).zfill(10)
            out[f"CIK{cik}"] = cik
    return out


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """逐机构拉窗口内的 13F / 13D·G。"""
    filers = _filers(spec)
    if not filers:
        raise Unavailable(f"{spec.key}: 未声明 filer_ciks")
    forms = [str(f) for f in (spec.params.get("forms") or ["13F-HR"])]
    days = int(spec.params.get("lookback_days") or 200)
    since = Window(as_of=window.as_of, lookback_days=days).since()
    limit = int(spec.params.get("max_items") or 20)

    out: list[RawItem] = []
    for name, cik in filers.items():
        try:
            filings = list_filings(client, cik, forms=forms, since=since, until=window.as_of)
        except FetchError:
            continue
        for f in filings[:limit]:
            item = _item_of(client, spec, f, name, cik)
            if item is not None:
                out.append(item)
    return out


def _item_of(
    client: HttpClient, spec: TypeSpec, filing: Any, filer_name: str, filer_cik: str
) -> RawItem | None:
    """一件申报 → `RawItem`（13F 取 info table，13D·G 取主文档）。"""
    from pipelines._kit.sec import filing_index

    idx = filing_index(client, filing)
    is_13f = filing.form.startswith("13F")
    name = pick_raw_xml(idx, prefer=_INFO_TABLE) if is_13f else filing.primary_document
    if not name:
        name = filing.primary_document
    try:
        resp = client.get(filing.archive_url(name), source_id=source_id)
    except FetchError:
        return None

    ext = "xml" if name.lower().endswith(".xml") else "htm"
    # ★ id 必须含 accession 尾段：13F-HR 与 13F-HR/A 是**同一报告期的两份不同申报**
    #   （实测 StateStreet 2026-06-30 同时有 13F-HR 与 13F-HR/A，仅用 report_date + 文件名
    #   会产出同一个 id，导致后一份覆盖前一份——修正件把原件吞掉）。
    acc_tail = filing.accession.rsplit("-", 1)[-1]
    form_tag = filing.form.replace(" ", "").replace("/", "-")
    mid = (
        f"{spec.class_id}-{spec.slug}-{filer_cik.lstrip('0')}"
        f"-{filing.report_date or filing.filing_date}-{form_tag}-{acc_tail}"
    )
    return RawItem(
        artifact_id=mid,
        url=resp.url,
        body=resp.body,
        content_type=resp.content_type,
        published_at=filing.filing_date,
        as_of=filing.report_date or filing.filing_date,
        ext=ext,
        http_status=resp.status,
        extra={
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": filing.filing_date,
            "form": filing.form,
            "accession": filing.accession,
            "filer": filer_name,
            "filerCik": filer_cik,
            "reportDate": filing.report_date,
            "ticker": ticker_of(spec),
            "source": source_id,
            "provider": "U.S. SEC EDGAR",
            "primaryDoc": name,
            "url": resp.url,
            "fetchedAt": filing.filing_date,
        },
    )


def _strip_ns(root: ET.Element) -> ET.Element:
    """去掉默认命名空间。

    13F 的 info table 有默认命名空间
    `xmlns="http://www.sec.gov/edgar/document/thirteenf/informationtable"`，
    `find(".//infoTable")` 在带命名空间时**一条都取不到**（实测：解析出 0 行，
    而原文有 2.3 MB、上千行）。所以先剥。剥法用正则改开标签而非 `iterparse`，
    因为要保留 `ElementTree` 的普通查找语义。
    """
    for el in root.iter():
        if isinstance(el.tag, str) and "}" in el.tag:
            el.tag = el.tag.split("}", 1)[1]
    return root


def _render_13f(
    xml_text: str, *, filer: str = "", period: str = "", target: str = ""
) -> tuple[str, list[tuple[str, str]]]:
    """13F info table（持仓明细）→ 封面摘要 + 本标的持仓 + 持仓汇总。

    ★ **info table 不含封面**（`periodOfReport` / `filingManager` 在另一个文件
      `primary_doc.xml` 里）。所以申报机构与报告期从**申报记录**传入，
      不在明细表里硬猜——猜出来的报告期会让"超 45 天即过期"这条判据失效。

    ★ 明细表动辄上千行（实测 StateStreet 一份 2.3 MB），全文塞进 `content.md`
      会让人读不到重点。所以正文只留：封面、**本标的的全部持仓行**、按市值排序的
      前 30 条。**完整明细仍在 `source.xml` 里**（原文永远可回溯，这才是诚实的做法）。
    """
    try:
        root = _strip_ns(ET.fromstring(xml_text))
    except ET.ParseError:
        return xml_text, [("原始 XML", xml_text)]

    def txt(node: ET.Element, *path: str) -> str:
        cur: ET.Element | None = node
        for p in path:
            if cur is None:
                return ""
            cur = cur.find(p)
        return (cur.text or "").strip() if cur is not None and cur.text else ""

    def num(raw: str) -> int:
        try:
            return int(float(raw.replace(",", "") or 0))
        except ValueError:
            return 0

    rows: list[tuple[str, dict[str, str]]] = []
    for info in root.findall(".//infoTable"):
        rows.append(
            (
                txt(info, "nameOfIssuer"),
                {
                    "class": txt(info, "titleOfClass"),
                    "cusip": txt(info, "cusip"),
                    "value": txt(info, "value"),
                    "shares": txt(info, "shrsOrPrnAmt/sshPrnamt"),
                    "type": txt(info, "shrsOrPrnAmt/sshPrnamtType"),
                    "discretion": txt(info, "investmentDiscretion"),
                    "sole": txt(info, "votingAuthority/Sole"),
                },
            )
        )

    total_value = sum(num(d["value"]) for _, d in rows)
    blocks: list[tuple[str, str]] = [
        (
            "封面",
            "\n".join(
                [
                    f"申报机构: {filer or '（申报记录未给机构名）'}",
                    f"报告期(periodOfReport): {period or '未标'}",
                    f"持仓条目数: {len(rows)}",
                    f"申报总市值(原始单位): {total_value}",
                ]
            ),
        )
    ]

    # ★ 不能用子串匹配：实测 `"META" in "ALPHA METALLURGICAL RESOUR I"` 为真，
    #   于是「本标的持仓」块会把 ALPHA METALLURGICAL 一起列进去（假命中）。
    #   判据改成**独立词**（`\bMETA\b`）+ CUSIP 精确匹配（CUSIP 是 13F 里唯一无歧义的键）。
    hit: list[tuple[str, dict[str, str]]] = []
    if target:
        word = re.compile(rf"\b{re.escape(target.upper())}\b")
        hit = [(n, d) for n, d in rows if word.search(n.upper()) or d["cusip"] == target.upper()]
    if hit:
        blocks.append(
            (
                f"本标的持仓（{target}）",
                "\n".join(
                    f"{n} :: {d['class']} | CUSIP {d['cusip']} | 市值 {d['value']} | "
                    f"{d['shares']} {d['type']} | 裁量 {d['discretion']} | 单独投票 {d['sole']}"
                    for n, d in hit
                ),
            )
        )
    elif target:
        blocks.append((f"本标的持仓（{target}）", f"（本表中未出现 {target} 命名的发行人）"))

    top = sorted(rows, key=lambda x: num(x[1]["value"]), reverse=True)[:30]
    blocks.append(
        (
            "持仓汇总（按市值降序前 30）",
            "\n".join(
                f"{i + 1}. {n} :: {d['class']} | 市值 {d['value']} | {d['shares']} {d['type']}"
                for i, (n, d) in enumerate(top)
            )
            or "（本表无持仓行）",
        )
    )

    text = "\n\n".join(f"## {label}\n{body}" for label, body in blocks)
    return text, blocks


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """13F XML / 13D·G htm → 一份一目录。"""
    if raw.ext == "xml":
        # info table 无封面：机构与报告期从**申报记录**取（`raw.extra` 已带），不猜
        text, blocks = _render_13f(
            raw.body.decode("utf-8", errors="replace"),
            filer=str(raw.extra.get("filer") or ""),
            period=str(raw.extra.get("reportDate") or ""),
            target=ticker_of(spec),
        )
    else:
        text = html_to_text(raw.body.decode("utf-8", errors="replace"))
        blocks = split_logical_pages(text)
    if not text.strip():
        raise ValueError(f"{raw.artifact_id}: 渲染为空（原件可能是壳）")

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
            "filer": raw.extra.get("filer", ""),
            "filerCik": raw.extra.get("filerCik", ""),
            "ticker": raw.extra.get("ticker", ""),
            "source": source_id,
            "provider": raw.extra.get("provider", ""),
            "url": raw.url,
            "periodOfReport": str(raw.extra.get("reportDate") or ""),
            "pageCount": len(blocks),
        },
        page_caliber=spec.page_caliber,
        sections=blocks,
    )

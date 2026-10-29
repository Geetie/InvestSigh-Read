"""`_kit.sec` —— SEC EDGAR 的共用取数件（01 类与 04 类都用它，故放共享层）。

## 为什么要共享

`sec.edgar` 是**一个源服务十个型**（10-K/10-Q/8-K/委托书/招股书/其他表格/Form 4/13F）。
把 submissions → index.json → 主文档 这套三段动作按型复制十遍，就会出现
"某个型的 UA 忘了写""某个型的限速没设"这类偏差。所以这里只写一次。

## 三段取数（每段都有实测依据）

1. **`submissions/CIK##########.json`** — 取申报清单（`filings.recent` 里 form/date/accession/primaryDocument 四列对齐）。
2. **`Archives/edgar/data/<cik>/<acc-no-dash>/index.json`** — 取该提交包的文件清单
   （**8-K 的 EX-99.1 与 10-K 的图片都靠它**；实测该包 134 项）。
3. **`Archives/.../<文件名>`** — 取原件。

## 三个已实测的坑（写进代码而不是注释）

- **`primaryDocument` 可能是渲染壳**：Form 4 的 `xslF345X06/ownership.xml` 是 XSL 渲染版，
  原始 XML 是 `index.json` 里的 `ownership.xml`。⇒ `pick_raw_xml()` 去掉目录前缀。
- **`full-index/*.idx` 返回 403**：不能用整库索引，必须走 `submissions`。
- **UA 必须实名可联系**，否则 403「Undeclared Automated Tool」；限速 ≤10 req/s（本包取 8）。
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable, Mapping, Sequence

from .http import HttpClient, FetchError, SEC_UA

__all__ = [
    "SecFiling",
    "load_ticker_map",
    "cik_of",
    "list_filings",
    "filing_index",
    "pick_raw_xml",
    "archive_url",
    "SEC_RATE",
]

#: SEC 明文要求 ≤10 req/s；取 8 留余量（`tools/pdf-pipeline/SKILL.md` 同口径）。
SEC_RATE = 8.0

_SUBMISSIONS = "https://data.sec.gov/submissions/CIK{cik}.json"
_ARCHIVE = "https://www.sec.gov/Archives/edgar/data/{cik}/{acc}/{name}"
_INDEX = "https://www.sec.gov/Archives/edgar/data/{cik}/{acc}/index.json"
_TICKERS = "https://www.sec.gov/files/company_tickers.json"

#: ticker→CIK 的本地缓存（避免每次跑都拉 798 KB；按 `_landing/_cache` 落，gitignore）
_TICKER_CACHE_TTL_DAYS = 14


@dataclass(frozen=True)
class SecFiling:
    """一条申报记录（submissions 的 `filings.recent` 一行）。"""

    cik: str
    form: str
    filing_date: str
    """提交日（`YYYY-MM-DD`）—— 这是 `published_at` 的候选，不是 `as_of`。"""
    report_date: str
    accession: str
    primary_document: str
    items: str = ""
    """8-K 的 Item 列表（`2.02,9.01` 这种），红灯判据要用。"""

    @property
    def acc_nodash(self) -> str:
        """归档目录名（连字符去掉）。"""
        return self.accession.replace("-", "")

    @property
    def material_id_stem(self) -> str:
        """材料 id 的尾段：`<report_date 或 filing_date>-<主文档去后缀>`。"""
        stem = self.primary_document.rsplit("/", 1)[-1]
        for ext in (".htm", ".html", ".txt", ".xml"):
            if stem.lower().endswith(ext):
                stem = stem[: -len(ext)]
                break
        stamp = self.report_date or self.filing_date
        return f"{stamp}-{stem}"

    def archive_url(self, name: str | None = None) -> str:
        """归档里某个文件的 URL（默认主文档）。"""
        return archive_url(self.cik, self.acc_nodash, name or self.primary_document)


def archive_url(cik: str, acc_nodash: str, name: str) -> str:
    """拼归档 URL（`cik` 会自动补零到 10 位口径无关：归档路径用去零后的 cik）。"""
    return _ARCHIVE.format(cik=str(int(cik)), acc=acc_nodash, name=name)


def _cache_dir() -> Path:
    d = Path(__file__).resolve().parents[1] / "_landing" / "_cache"
    d.mkdir(parents=True, exist_ok=True)
    return d


def load_ticker_map(client: HttpClient, *, force: bool = False) -> dict[str, str]:
    """取 ticker→CIK（10 位补零字符串）映射，带 14 天本地缓存。

    失败模式：`FetchError`（SEC 不可达）。缓存损坏则重取，不静默返回空表
    （空表会让所有型都变成"0 件"，那是把网络故障伪装成"确实没有"）。
    """
    import time

    f = _cache_dir() / "sec_company_tickers.json"
    if f.is_file() and not force:
        age_days = (time.time() - f.stat().st_mtime) / 86400
        if age_days <= _TICKER_CACHE_TTL_DAYS:
            try:
                raw = json.loads(f.read_text(encoding="utf-8"))
                return {str(k): str(v) for k, v in raw.items()}
            except (json.JSONDecodeError, OSError):
                pass  # 损坏即重取

    resp = client.get(_TICKERS, source_id="sec.edgar")
    data = json.loads(resp.text)
    mapping: dict[str, str] = {}
    for row in data.values() if isinstance(data, dict) else data:
        ticker = str(row.get("ticker") or "").upper()
        cik = str(row.get("cik_str") or "").zfill(10)
        if ticker and cik.strip("0"):
            mapping[ticker] = cik
    if not mapping:
        raise FetchError("company_tickers.json 解析出 0 条（SEC 改版？）", url=_TICKERS)
    f.write_text(json.dumps(mapping, ensure_ascii=False), encoding="utf-8")
    return mapping


def cik_of(client: HttpClient, ticker: str, *, explicit: str | None = None) -> str:
    """取某 ticker 的 CIK（10 位）。`explicit` 优先（`channels.yaml` 可钉死）。"""
    if explicit:
        return str(explicit).zfill(10)
    mapping = load_ticker_map(client)
    cik = mapping.get(ticker.upper())
    if not cik:
        raise FetchError(
            f"ticker {ticker!r} 不在 SEC company_tickers 里（写错票号或未上市？）",
            url=_TICKERS,
        )
    return cik


def list_filings(
    client: HttpClient,
    cik: str,
    *,
    forms: Sequence[str],
    since: str,
    until: str,
) -> list[SecFiling]:
    """列出窗口内、表单类型命中的申报（按提交日倒序）。

    `forms` 支持前缀匹配：写 `"424B"` 会命中 `424B5`；写 `"10-K"` 不会命中 `10-K/A`
    （要用 `10-K/A` 就得显式写，或写 `"10-K"` + 另加 `"10-K/A"`）。
    """
    data = client.get_json(_SUBMISSIONS.format(cik=cik), source_id="sec.edgar")
    assert isinstance(data, dict)
    recent = (data.get("filings") or {}).get("recent") or {}
    cols = ("form", "filingDate", "reportDate", "accessionNumber", "primaryDocument", "items")
    lengths = {len(recent.get(c) or []) for c in cols if c in recent}
    if not lengths:
        return []
    rows = zip(*(recent.get(c) or [] for c in cols))

    wanted = tuple(forms)
    out: list[SecFiling] = []
    for form, filed, report, acc, doc, items in rows:
        form = str(form)
        if not any(form == w or form.startswith(w) for w in wanted):
            continue
        filed = str(filed)
        if since and filed < since:
            continue
        if until and filed > until:
            continue
        out.append(
            SecFiling(
                cik=cik,
                form=form,
                filing_date=filed,
                report_date=str(report or ""),
                accession=str(acc),
                primary_document=str(doc),
                items=str(items or ""),
            )
        )
    out.sort(key=lambda x: (x.filing_date, x.accession), reverse=True)
    return out


def filing_index(client: HttpClient, filing: SecFiling) -> list[dict[str, Any]]:
    """取该提交包的文件清单（`index.json` 的 `directory.item`）。

    返回元素含 `name` / `size` / `type`。缺 `index.json`（老提交包）时返回空表，
    调用方退化为"只用主文档"。
    """
    try:
        data = client.get_json(
            _INDEX.format(cik=str(int(filing.cik)), acc=filing.acc_nodash),
            source_id="sec.edgar",
        )
    except FetchError:
        return []
    if not isinstance(data, dict):
        return []
    items = ((data.get("directory") or {}).get("item")) or []
    return [i for i in items if isinstance(i, dict)]


def pick_raw_xml(index_items: Iterable[Mapping[str, Any]], *, prefer: str = "") -> str | None:
    """从 index.json 里挑**原始** XML（剔除 XSL 渲染壳）。

    Form 4 的 `primaryDocument` 常是 `xslF345X06/ownership.xml`；归档里与它并列
    还有 `ownership.xml`（原始）。判据：**路径里不含 `xsl` 前缀**。

    `prefer` 给文件名片段（如 `form13fInfoTable`），命中优先返回。
    """
    names = [str(i.get("name") or "") for i in index_items]
    xmls = [n for n in names if n.lower().endswith(".xml") and "/" not in n]
    raw = [n for n in xmls if "xsl" not in n.lower()]
    if prefer:
        for n in raw:
            if prefer.lower() in n.lower():
                return n
    for n in raw:
        if not n.lower().startswith("primary_doc"):
            return n
    return raw[0] if raw else None

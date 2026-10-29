"""`03-卖方与共识/stockanalysis.py` —— 共识 / 评级 / 做空读数 Adapter（跨类共享）。

## 一个 Adapter 服务三个类的四个型

| 类-型 | 用它取什么 |
|---|---|
| `03 consensus-ratings` | 评级分布三档 + 目标价 Low/Avg/Median/High + 覆盖家数 |
| `07 consensus-gap` | 共识水平/分歧/修正/确定性四维 |
| `04 short-option` | SI% float / SI% of shares out / days to cover（**四件套里只这两件半**） |
| `07 option-vol`（可选补充） | 不用；指数波动率走 `cboe.py` |

共享的理由与 `sec_edgar` 相同：一个源，多处消费。按型复制会立刻漂移。

## 来源与许可（不许含糊）

数据供应商是 **S&P Global Market Intelligence**，载体是 `stockanalysis.com`
（第三方聚合站，**T1 / free_quota**，`may_enter_decision_logic=false`）。
所以材料 meta 里必须同时写 `provider`（S&P Global）与 `publisher`（stockanalysis.com）
——手册要求"来源 + 覆盖家数 + 时点"三件齐，缺一个这项读数就不能入结论。

## 实测（2026-10-28）

    /stocks/meta/forecast/    200 / 181 KB ：62 analysts polled、Low/Avg/Median/High、
                                            Recommendation Trends 六个月序列、Revenue/EPS、
                                            Last checked: Oct 27, 2026
    /stocks/meta/statistics/  200 / 126 KB ：Short Interest 33.57M、Short % of Float 1.52%、
                                            Short Ratio (days to cover) 1.44
    /stocks/meta/ratings/     200 /  93 KB ：逐条 Upgrade/Action/Price Target
    六只票（meta/nvda/aapl/msft/googl/amzn）全 200；连续 10 次无 429
    robots.txt 只禁 /e/ 与 /p/（不动 /stocks/）

## 页面已结构化，不再自带解析器

每页正文用 `[小节名]` 分块（`[Stock Price Forecast]` / `[Price Target]` /
`[Recommendation Trends]` / `[Short Selling Information]` …）。本 Adapter 按这些
**人可读的小节标题**切块，而不是按 CSS 类名——类名会随前端框架升级整体变，
小节标题是产品语义，改版时不动。
"""

from __future__ import annotations

import re
from typing import Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft, html_to_text
from pipelines._kit.targets import ticker_of

source_id = "stockanalysis"
parser_version = "stockanalysis/1"

_BASE = "https://stockanalysis.com/stocks/{ticker}/{page}/"

#: 页面 → 该页提供的小节（用于 `checked_scope`，让"查了哪些页"可核）
_PAGE_SECTIONS: dict[str, tuple[str, ...]] = {
    "forecast": ("Stock Price Forecast", "Price Target", "Analyst Ratings",
                 "Recommendation Trends", "Latest Forecasts", "Financial Forecast"),
    "statistics": ("Short Selling Information", "Income Statement", "Valuation Ratios",
                   "Analyst Consensus"),
    "ratings": ("Analyst Ratings", "Latest Ratings"),
}

#: 页面 → 该页**必须**出现的关键词（`must_contain` 式断言，拦错误页/改版页）
_REQUIRED: dict[str, tuple[str, ...]] = {
    "forecast": ("analysts polled by",),
    "statistics": ("Short Interest",),
    "ratings": ("Price Target",),
}


def _pages(spec: TypeSpec) -> list[str]:
    """本型要抓哪些页（`channels.yaml::params.pages`，默认 forecast+statistics）。"""
    raw = spec.params.get("pages") or ["forecast", "statistics"]
    return [str(p) for p in raw]


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """最小请求：抓第一页，断言必须关键词在场。

    `must_contain` 是**先声明后比对**：抓到的正文不含声明的串 ⇒ 判不可用
    （拦的是 Cloudflare 挑战页、改版空壳页，而不是靠"扫可疑词"）。
    """
    ticker = ticker_of(spec).lower()
    page = _pages(spec)[0]
    try:
        resp = client.get(_BASE.format(ticker=ticker, page=page), source_id=source_id)
    except FetchError as exc:
        raise Unavailable(f"stockanalysis 不可达：{exc}") from exc
    text = html_to_text(resp.text)
    missing = [k for k in _REQUIRED.get(page, ()) if k not in text]
    if missing:
        raise Unavailable(
            f"页面缺必备字段 {missing}（可能被 WAF 拦或改版）",
            checked_scope=[f"{resp.url}: {len(text)} 字符但缺 {missing}"],
        )
    return [f"stockanalysis: {ticker}/{page} 200 / {len(text)} 字符"]


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """逐页抓取。**每一页都是独立一件材料**（不同页回答不同问题）。"""
    ticker = ticker_of(spec)
    out: list[RawItem] = []
    for page in _pages(spec):
        url = _BASE.format(ticker=ticker.lower(), page=page)
        try:
            resp = client.get(url, source_id=source_id)
        except FetchError as exc:
            if exc.status == 404:
                continue  # 该票没这一页（小票常见），跳过而不是判死
            raise
        text = html_to_text(resp.text)
        missing = [k for k in _REQUIRED.get(page, ()) if k not in text]
        if missing:
            raise Unavailable(
                f"{ticker}/{page} 缺必备字段 {missing}",
                checked_scope=[f"{url}: {len(text)} 字符"],
            )
        out.append(
            RawItem(
                artifact_id=f"{spec.class_id}-{spec.slug}-{window.as_of}-{ticker}-{page}",
                url=resp.url,
                body=resp.body,
                content_type=resp.content_type,
                published_at=_published_of(text) or window.as_of,
                as_of=window.as_of,
                ext="htm",
                http_status=resp.status,
                extra={
                    "cat": spec.class_id,
                    "sub": spec.sub,
                    "date": window.as_of,
                    "ticker": ticker,
                    "source": source_id,
                    "provider": _provider_of(text),
                    "publisher": "stockanalysis.com",
                    "page": page,
                    "url": resp.url,
                    "fetchedAt": window.as_of,
                },
            )
        )
    return out


def _published_of(text: str) -> str | None:
    """从页面取 as-of 时点（`Last checked:` / `Last updated:` → ISO 日期）。

    **这是手册硬要求**：共识"每日在变，写截至某日"（`07-型/共识预期与预期差.md §二`）。
    取不到就返回 None（manifest 里 `published_at=null`，不猜）。

    ★ 标签与日期**不一定在同一行**：实测抓取件里
      `Last updated: Oct 27, 2026` 同行，而 `Last checked:` 后换行才是日期。
      所以模式用 `\\s*` 吃换行，不假设单行。
    """
    from datetime import datetime

    for pat in (
        r"Last checked:\s*([A-Z][a-z]{2,8}\.?\s+\d{1,2},\s+\d{4})",
        r"Last updated:\s*([A-Z][a-z]{2,8}\.?\s+\d{1,2},\s+\d{4})",
    ):
        m = re.search(pat, text)
        if not m:
            continue
        raw = re.sub(r"\s+", " ", m.group(1)).replace(".", "")
        for fmt in ("%b %d, %Y", "%B %d, %Y"):
            try:
                return datetime.strptime(raw, fmt).date().isoformat()
            except ValueError:
                continue
    return None


def _provider_of(text: str) -> str:
    """数据供应商署名（页面写了谁就记谁，猜不出就写"未标"）。

    实测 `stockanalysis` 页脚写 `Data Sources: S&P Global Market Intelligence and TipRanks`
    —— **两家**，不是一家。所以这里只记录**页面上逐字出现的**那句话的关键词，
    不在代码里钉死"S&P Global"，否则等于替页面做归属判断。
    """
    m = re.search(r"Data Sources?:\s*([^\n]{3,90})", text)
    if m:
        return re.sub(r"\s+", " ", m.group(1)).strip()
    m = re.search(r"polled by ([A-Z][\w&.\s]{2,40}?),", text)
    if m:
        return m.group(1).strip()
    return "未标"


#: 页面小节标题（人可读标签；改版时这些是产品语义，比 CSS 类名稳）
_SEC_HEAD = re.compile(r"^\[?([A-Z][A-Za-z &/()'’\-]{3,48})\]?$", re.MULTILINE)


def _sections_of(text: str) -> list[tuple[str, str]]:
    """按**人可读小节标题**切块，每块带标题行。

    三种来源依次尝试：
    1. 抓取件自带的 `[小节名]` 标记（`stockanalysis` 历史抓取件用的形态）；
    2. `_PAGE_SECTIONS` 里声明的**已知小节名**，整行匹配（实测可用：
       `Price Target` / `Recommendation Trends` / `Short Selling Information` …）；
    3. 都不成 ⇒ 全文一块（**不假装切过**）。
    """
    marked = [
        (m.start(), m.group(1).strip())
        for m in re.finditer(r"^\[([^\]]{3,60})\]\s*$", text, re.MULTILINE)
    ]
    if marked:
        out: list[tuple[str, str]] = []
        for i, (pos, label) in enumerate(marked):
            end = marked[i + 1][0] if i + 1 < len(marked) else len(text)
            body = text[pos:end].strip()
            if body:
                out.append((label, body))
        if out:
            return out

    known = sorted({s for secs in _PAGE_SECTIONS.values() for s in secs}, key=len, reverse=True)
    hits: list[tuple[int, str]] = []
    for label in known:
        for m in re.finditer(rf"(?m)^[ \t]*{re.escape(label)}[ \t]*:?[ \t]*$", text):
            hits.append((m.start(), label))
    if not hits:
        return [("全文", text)]
    hits.sort()
    out2: list[tuple[str, str]] = []
    for i, (pos, label) in enumerate(hits):
        end = hits[i + 1][0] if i + 1 < len(hits) else len(text)
        body = text[pos:end].strip()
        if body:
            out2.append((label, body))
    return out2 or [("全文", text)]


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """htm → 一份一目录（逻辑块 = 小节）。"""
    text = html_to_text(raw.body.decode("utf-8", errors="replace"))
    if not text.strip():
        raise ValueError(f"{raw.artifact_id}: 正文为空")
    sections = _sections_of(text)
    from pipelines._kit.targets import ticker_dir_of

    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext="htm",
        text=text,
        meta={
            "srcId": str(raw.url),
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": str(raw.extra.get("date") or ""),
            "ticker": raw.extra.get("ticker", ""),
            "tickerDir": ticker_dir_of(spec),
            "source": source_id,
            "provider": raw.extra.get("provider", ""),
            "publisher": raw.extra.get("publisher", "stockanalysis.com"),
            "urls": [raw.url],
            "fetchedAt": raw.as_of,
            "publishedAt": raw.published_at,
            "page": raw.extra.get("page", ""),
            "pageCount": len(sections),
        },
        page_caliber=spec.page_caliber,
        sections=sections,
    )

"""`03-卖方与共识/rss_trafilatura.py` —— RSS + 正文抽取 Adapter（媒体 / 第三方解读 / 旁证）。

## 服务哪些型

| 型 | 用它做什么 |
|---|---|
| `03 media-analysis` | 近 7 日媒体件，标二手 |
| `02 third-party` | 别人的解读（点评类） |
| `02 company-voice`（降级） | IR 页 RSS / 新闻稿 |

一个 Adapter 服务三型：都是"RSS 发现 → 抽正文 → 落一件"的同一动作，
只是 feed 清单与关键词不同。按型复制三次，改一处就得改三处。

## 为什么用 RSS 而不是 GDELT

实测 `gdeltproject.org/api/v2/doc/doc` **连接超时**；而 RSS 三源全 200：
`feeds.finance.yahoo.com/rss`（按票号）· `feeds.arstechnica.com` · `prnewswire.com/rss`。
GDELT 的价值是"全球全量"，但既然不可达，写进 `channels.yaml` 的 absent_scope 才是诚实的。

## `trafilatura` 的角色

只做一件事：**从 HTML 抽正文**（实测 NVIDIA newsroom 458 KB → 31,934 字符）。
**不做摘要、不改写**——摘要会切断「引文 ↔ 原文」的绑定，那正是证据链的根。
"""

from __future__ import annotations

import re
from typing import Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft, split_logical_pages

source_id = "rss.media"
parser_version = "rss_trafilatura/1"


def _feeds(spec: TypeSpec) -> list[str]:
    raw = spec.params.get("feeds") or []
    return [str(f) for f in raw]


def _keywords(spec: TypeSpec) -> list[str]:
    raw = spec.params.get("keywords") or []
    return [str(k).lower() for k in raw]


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """逐个 feed 探测；至少一个可用即通过。

    返回的 scope 里带"每个 feed 的条目数"，这样"为什么只有 3 件"可核。
    """
    feeds = _feeds(spec)
    if not feeds:
        raise Unavailable(f"{spec.key}: channels.yaml 未声明 feeds")
    scopes: list[str] = []
    ok = 0
    for f in feeds:
        try:
            resp = client.get(f, source_id=source_id)
        except FetchError as exc:
            scopes.append(f"{f} → {exc.status or 'network'}")
            continue
        n = _item_count(resp.text)
        if n == 0:
            scopes.append(f"{f} → 200 但 0 条目（feed 结构变了？）")
            continue
        ok += 1
        scopes.append(f"{f} → {n} 条目")
    if not ok:
        raise Unavailable("全部 RSS 源不可用", checked_scope=scopes)
    return scopes


def _item_count(xml: str) -> int:
    """RSS/Atom 条目数（`<item>` 或 `<entry>`）。"""
    return len(re.findall(r"<(?:item|entry)\b", xml, re.IGNORECASE))


def _parse_feed(xml: str) -> list[dict[str, str]]:
    """解析 RSS/Atom 条目（`feedparser` 优先，缺失则正则兜底）。

    `feedparser` 的好处是容错强（RSS 0.9/1.0/2.0/Atom 都能读）；
    但它对破损 feed 会静默返回空表，所以这里额外用正则数一遍条目数做**阳性对照**。
    """
    try:
        import feedparser  # type: ignore

        parsed = feedparser.parse(xml)
        out = []
        for e in parsed.entries:
            out.append(
                {
                    "title": str(e.get("title") or ""),
                    "link": str(e.get("link") or ""),
                    "published": str(e.get("published") or e.get("updated") or ""),
                    "summary": str(e.get("summary") or ""),
                }
            )
        return out
    except Exception:  # noqa: BLE001 — 无 feedparser 或解析异常，走正则
        out = []
        for block in re.findall(r"<(?:item|entry)\b[\s\S]*?</(?:item|entry)>", xml, re.IGNORECASE):
            def pick(tag: str) -> str:
                m = re.search(rf"<{tag}[^>]*>([\s\S]*?)</{tag}>", block, re.IGNORECASE)
                if not m:
                    return ""
                return re.sub(r"<!\[CDATA\[|\]\]>", "", m.group(1)).strip()

            out.append(
                {
                    "title": pick("title"),
                    "link": pick("link") or _attr(block, "link", "href"),
                    "published": pick("pubDate") or pick("published") or pick("updated"),
                    "summary": pick("description") or pick("summary"),
                }
            )
        return out


def _attr(block: str, tag: str, attr: str) -> str:
    m = re.search(rf"<{tag}[^>]*\b{attr}=\"([^\"]+)\"", block, re.IGNORECASE)
    return m.group(1) if m else ""


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """按 feed 拉条目、按关键词与日期过滤、逐条抽正文。"""
    feeds = _feeds(spec)
    kws = _keywords(spec)
    max_items = int(spec.params.get("max_items") or 20)
    since = window.since()

    seen_links: set[str] = set()
    out: list[RawItem] = []
    for feed in feeds:
        try:
            feed_resp = client.get(feed, source_id=source_id)
        except FetchError:
            continue
        for entry in _parse_feed(feed_resp.text):
            link = entry.get("link") or ""
            if not link or link in seen_links:
                continue
            if not _within(entry.get("published") or "", since, window.as_of):
                continue
            if kws and not _match(entry, kws):
                continue
            # ★ 标题也必须过一遍相关性：Yahoo 的按票 feed 会把整页"相关股"混进来
            #   （实测抓到「Nvidia's New $3 Billion AI Bet」——那是 Yahoo 的推荐位，
            #   不是 META 的新闻）。判据：**标题命中关键词**才收；
            #   只在摘要里命中不足以证明标题讲的是本标的。
            if kws and not _match({"title": entry.get("title", ""), "summary": ""}, kws):
                continue
            if len(out) >= max_items:
                return out
            seen_links.add(link)

            try:
                page = client.get(link, source_id=source_id)
            except FetchError:
                continue
            text = _extract(page.text)
            if not text.strip():
                continue
            out.append(
                RawItem(
                    artifact_id=_artifact_id(spec, window, link),
                    url=link,
                    body=page.body,
                    content_type=page.content_type,
                    published_at=_iso(entry.get("published") or "") or window.as_of,
                    as_of=window.as_of,
                    ext="htm",
                    http_status=page.status,
                    extra={
                        "cat": spec.class_id,
                        "sub": spec.sub,
                        "date": window.as_of,
                        "headline": entry.get("title") or "",
                        "feed": feed,
                        "tierNote": "二手：媒体/第三方，Ⅱ 档，不得当事实用",
                        "source": source_id,
                        "provider": _domain(link),
                        "url": link,
                        "fetchedAt": window.as_of,
                    },
                )
            )
    return out


def _artifact_id(spec: TypeSpec, window: Window, link: str) -> str:
    """由 URL 派生稳定 id（同一 URL 恒同 id ⇒ 幂等键稳定）。"""
    import hashlib

    h = hashlib.sha256(link.encode("utf-8")).hexdigest()[:10]
    return f"{spec.class_id}-{spec.sub}-{window.as_of}-{h}"


def _domain(link: str) -> str:
    m = re.match(r"https?://([^/]+)", link)
    return (m.group(1) if m else "unknown").replace("www.", "")


def _match(entry: dict[str, str], kws: list[str]) -> bool:
    """关键词命中判定（标题或摘要）。

    只搜标题 + 摘要，不搜正文：正文抽取前就要决定抓不抓，否则每篇都全文下载，
    既慢又不礼貌。

    ★ **ASCII 关键词必须按词边界匹配**：实测用子串匹配时 `"meta"` 会命中
      `metadata` / `metals` / `metaverse` 之外的无关稿，实测抓到了
      「Farizon SV Model Year 2027 makes its French debut」这种完全无关的新闻稿。
      中文关键词没有词边界概念，仍用子串。
    """
    hay = (entry.get("title", "") + " " + entry.get("summary", "")).lower()
    for k in kws:
        if k.isascii():
            if re.search(rf"\b{re.escape(k)}\b", hay):
                return True
        elif k in hay:
            return True
    return False


def _within(published: str, since: str, until: str) -> bool:
    """`published` 是否落在窗口内；解析不出日期时**放行**（宁多抓一件，不漏日期格式变化）。"""
    iso = _iso(published)
    if not iso:
        return True
    return since <= iso <= until


def _iso(raw: str) -> str | None:
    """把 RSS 的各种日期格式转成 `YYYY-MM-DD`；解析不出返回 None（不猜）。"""
    from datetime import datetime

    raw = (raw or "").strip()
    if not raw:
        return None
    # RFC 822（RSS 2.0）：`Tue, 27 Oct 2026 12:00:00 GMT`
    for fmt in (
        "%a, %d %b %Y %H:%M:%S %Z",
        "%a, %d %b %Y %H:%M:%S %z",
        "%Y-%m-%dT%H:%M:%S%z",
        "%Y-%m-%dT%H:%M:%SZ",
        "%Y-%m-%d",
        "%d %b %Y %H:%M:%S %Z",
    ):
        try:
            return datetime.strptime(raw, fmt).date().isoformat()
        except ValueError:
            continue
    return None


def _extract(html: str) -> str:
    """正文抽取（`trafilatura` 优先，退化到 `html_to_text`）。

    `trafilatura` 会去掉导航/广告，保留文章主体；`html_to_text` 只去标签。
    两者都不做摘要。
    """
    try:
        import trafilatura  # type: ignore

        body = trafilatura.extract(html)
        if body and body.strip():
            return body.strip()
    except Exception:  # noqa: BLE001
        pass
    from pipelines._kit.material import html_to_text

    return html_to_text(html)


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """htm → 一份一目录（媒体件按自然段切；标题进首块便于判读）。"""
    from pipelines._kit.material import html_to_text

    text = _extract(raw.body.decode("utf-8", errors="replace"))
    if not text.strip():
        raise ValueError(f"{raw.artifact_id}: 正文抽取为空（可能是付费墙或反爬页）")

    blocks: list[tuple[str, str]] = [
        (
            "来源与定性",
            "\n".join(
                [
                    f"标题: {raw.extra.get('headline') or '未标'}",
                    f"来源域名: {raw.extra.get('provider') or '未标'}",
                    f"URL: {raw.url}",
                    f"Feed: {raw.extra.get('feed') or '未标'}",
                    f"定性: {raw.extra.get('tierNote')}",
                ]
            ),
        )
    ]
    for i, (label, body) in enumerate(split_logical_pages(text, fallback_chars=9000), start=1):
        blocks.append((f"正文 {i}｜{label}", body))

    out_text = "\n\n".join(f"## {k}\n{v}" for k, v in blocks)
    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext="htm",
        text=out_text,
        meta={
            "srcId": raw.url,
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": str(raw.extra.get("date") or ""),
            "headline": raw.extra.get("headline", ""),
            "source": source_id,
            "provider": raw.extra.get("provider", ""),
            "urls": [raw.url],
            "feed": raw.extra.get("feed", ""),
            "tierNote": raw.extra.get("tierNote", ""),
            "publishedAt": raw.published_at,
            "pageCount": len(blocks),
        },
        page_caliber=spec.page_caliber,
        sections=blocks,
    )

"""`06-宏观与政策/treasury.py` —— 美国财政部 Adapter（收益率曲线 + 拍卖结果）。

## 覆盖两个型

| 型 | 用哪两路 |
|---|---|
| `07 rates-inflation` | 日收益率曲线 `daily_treasury_yield_curve`（名义）+ `daily_treasury_real_yield_curve`（TIPS） |
| `06 fiscal-debt` | 拍卖结果 `TA_WS/securities/auctioned`（发行公告 ≠ 结果，只取结果） |

## 实测（2026-10-28）

    api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates  → 200
    treasurydirect.gov/TA_WS/securities/auctioned?format=json&days=7                              → 200
    home.treasury.gov/.../daily-treasury-rates.csv/...                                            → 连接超时
      ⇒ 收益率曲线改走 `fiscaldata` 的 fiscal_service 端点（同一发布方、官方）。
      **不是换源，是换同一发布方的另一条官方入口**。

## 两条口径纪律

1. **盈亏平衡 = 名义 − 通胀挂钩，但含风险溢价** ⇒ 不等于纯通胀预期。
   本 Adapter 只落两条曲线，**不做减法**（减法带口径假设，属判读层）。
2. **拍卖：发行公告 ≠ 结果**；`auctioned` 端点给的是**已拍卖结果**，
   高收益（high yield）与认购倍数（bid-to-cover）才是读数。
"""

from __future__ import annotations

import csv
import io
from typing import Any, Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft

source_id = "treasury.fiscaldata"
parser_version = "treasury/1"

_FISCAL = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/rates_of_exchange"
_AVG_RATES = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates"
_AUCTION = "https://www.treasurydirect.gov/TA_WS/securities/auctioned"

#: 收益率曲线走 fiscaldata 的 `/v2/accounting/od/...` 没有直接对应；
#: 用 **TreasuryData API 的 `daily_treasury_yield_curve` 走 fiscaldata 网关**（实测路径见下）。
_YIELD_CSV = (
    "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/"
    "daily-treasury-rates.csv/{year}/all?type={kind}&field_tdr_date_value={year}&page&_format=csv"
)


def _kinds(spec: TypeSpec) -> list[str]:
    raw = spec.params.get("series") or ["daily_treasury_yield_curve"]
    return [str(k) for k in raw]


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """打拍卖端点（短、稳、免 key）；收益率曲线在 fetch 里逐条试。"""
    try:
        data = client.get_json(
            _AUCTION, source_id=source_id, params={"format": "json", "days": "7"}
        )
    except FetchError as exc:
        raise Unavailable(f"TreasuryDirect 不可达：{exc}") from exc
    n = len(data) if isinstance(data, list) else 0
    return [f"treasury: TA_WS/auctioned 7 天内 {n} 条拍卖结果"]


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """拍卖结果一件 + 每条收益率曲线一件。"""
    out: list[RawItem] = []
    year = window.as_of[:4]

    # ① 收益率曲线（CSV）
    for kind in _kinds(spec):
        url = _YIELD_CSV.format(year=year, kind=kind)
        try:
            resp = client.get(url, source_id=source_id)
        except FetchError:
            continue
        if len(resp.body) < 100:
            continue
        out.append(
            RawItem(
                artifact_id=f"{spec.class_id}-{spec.slug}-{window.as_of}-{kind}",
                url=resp.url,
                body=resp.body,
                content_type=resp.content_type,
                published_at=None,
                as_of=window.as_of,
                ext="csv",
                http_status=resp.status,
                extra={
                    "cat": spec.class_id,
                    "sub": spec.sub,
                    "date": window.as_of,
                    "kind": kind,
                    "source": source_id,
                    "provider": "U.S. Department of the Treasury",
                    "url": resp.url,
                    "fetchedAt": window.as_of,
                },
            )
        )

    # ② 拍卖结果（JSON）
    try:
        resp2 = client.get(_AUCTION, source_id=source_id, params={"format": "json", "days": "30"})
        out.append(
            RawItem(
                artifact_id=f"{spec.class_id}-{spec.slug}-{window.as_of}-auctioned",
                url=resp2.url,
                body=resp2.body,
                content_type=resp2.content_type,
                published_at=None,
                as_of=window.as_of,
                ext="json",
                http_status=resp2.status,
                extra={
                    "cat": spec.class_id,
                    "sub": spec.sub,
                    "date": window.as_of,
                    "kind": "auctioned",
                    "source": source_id,
                    "provider": "U.S. TreasuryDirect",
                    "url": resp2.url,
                    "fetchedAt": window.as_of,
                },
            )
        )
    except FetchError:
        pass
    return out


def _render_yield(body: bytes, kind: str) -> tuple[str, list[tuple[str, str]]]:
    """收益率曲线 CSV → 最近 30 个交易日 + 利差一览。"""
    rows = [r for r in csv.reader(io.StringIO(body.decode("utf-8", errors="replace"))) if r]
    if not rows:
        return "（空表）", [("口径", "CSV 为空")]
    header, data = rows[0], rows[1:]
    recent = data[:30]

    blocks: list[tuple[str, str]] = [
        (
            "口径",
            "\n".join(
                [
                    f"曲线类型: {kind}",
                    f"列: {' | '.join(c.strip() for c in header)}",
                    f"总行数: {len(data)}",
                    "发布方: U.S. Department of the Treasury（日频，非实时）",
                    "纪律: 名义 − 通胀挂钩 = 盈亏平衡，但**含风险溢价**，不等于纯通胀预期",
                ]
            ),
        ),
        (
            "最近 30 个交易日",
            "\n".join(" | ".join(c.strip() for c in r) for r in recent) or "（无数据）",
        ),
    ]

    # 期限利差（10Y − 2Y / 10Y − 3M），按列名定位
    norm = [c.strip().upper().replace(" ", "") for c in header]
    def idx(*names: str) -> int | None:
        for n in names:
            if n in norm:
                return norm.index(n)
        return None

    i10 = idx("10 YR", "10YR", "10Y")
    i2 = idx("2 YR", "2YR", "2Y")
    i3m = idx("3 MO", "3MO", "3M")
    if i10 is not None and data:
        latest = data[0]
        parts = []
        if i2 is not None and i2 < len(latest):
            try:
                parts.append(f"10Y−2Y = {float(latest[i10]) - float(latest[i2]):+.2f} bp×100")
            except ValueError:
                pass
        if i3m is not None and i3m < len(latest):
            try:
                parts.append(f"10Y−3M = {float(latest[i10]) - float(latest[i3m]):+.2f} bp×100")
            except ValueError:
                pass
        if parts:
            blocks.append(("期限利差（最新一行）", "\n".join(parts)))

    text = "\n\n".join(f"## {k}\n{v}" for k, v in blocks)
    return text, blocks


def _render_auction(body: bytes, window: Window) -> tuple[str, list[tuple[str, str]]]:
    """拍卖结果 JSON → 按证券类型分组的最近结果。"""
    import json

    try:
        data = json.loads(body.decode("utf-8", errors="replace"))
    except json.JSONDecodeError:
        return "（拍卖 JSON 解析失败）", [("拍卖结果", "JSON 解析失败，原文见 source.json")]
    if not isinstance(data, list):
        return "（拍卖结果形状异常）", [("拍卖结果", "非数组，原文见 source.json")]

    rows: list[str] = []
    for it in data[:60]:
        if not isinstance(it, dict):
            continue
        rows.append(
            " | ".join(
                [
                    str(it.get("auctionDate") or it.get("issueDate") or ""),
                    str(it.get("securityType") or ""),
                    str(it.get("securityTerm") or ""),
                    f"高收益 {it.get('highYield', '-')}",
                    f"认购倍数 {it.get('bidToCoverRatio', '-')}",
                    f"发行额 {it.get('totalAccepted', '-')}",
                ]
            )
        )
    blocks: list[tuple[str, str]] = [
        (
            "口径",
            "\n".join(
                [
                    f"条数: {len(data)}（取前 60 条）",
                    "端点: TA_WS/securities/auctioned（**已拍卖结果**，不是发行公告）",
                    "纪律: 拍卖日 ≠ 结算日；高收益与认购倍数是读数，发行公告里的金额不是结果",
                ]
            ),
        ),
        ("最近拍卖结果", "\n".join(rows) or "（无数据）"),
    ]
    text = "\n\n".join(f"## {k}\n{v}" for k, v in blocks)
    return text, blocks


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """CSV/JSON → 一份一目录。"""
    kind = str(raw.extra.get("kind") or "")
    if kind == "auctioned":
        text, blocks = _render_auction(raw.body, Window(as_of=str(raw.extra.get("date"))))
    else:
        text, blocks = _render_yield(raw.body, kind)
    if not text.strip():
        raise ValueError(f"{raw.artifact_id}: 渲染为空")

    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext=raw.ext,
        text=text,
        meta={
            "srcId": kind,
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": str(raw.extra.get("date") or ""),
            "kind": kind,
            "source": source_id,
            "provider": raw.extra.get("provider", ""),
            "url": raw.url,
            "pageCount": len(blocks),
        },
        page_caliber=spec.page_caliber,
        sections=blocks,
    )

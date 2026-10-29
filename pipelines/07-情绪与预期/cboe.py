"""`07-情绪与预期/cboe.py` —— CBOE 指数级波动率历史 Adapter（期权与波动率预期）。

## 覆盖边界（必须先说清）

**只覆盖指数级**：`VIX` / `VIX9D` / `SKEW` / `VVIX` 的日频历史 CSV。
**个股期权链、flow、OI 全部无源**（实测：`PCALL_History.csv` 403、
`api.nasdaq.com` 超时、`api.finra.org` 307 WAF），故本型 `status: partial`。

不是"没找"，是"找不到"——手册 `07-型/期权与波动率预期.md` 要的 per-name IV/skew
需要付费源；本 Adapter 的 job 是把**能拿到的指数级**拿到并如实标注。

## 实测（2026-10-28）

    cdn-api.cboe.com/api/global/us_indices/daily_prices/VIX_History.csv  → 200 / 474 KB
    .../VIX9D_History.csv → 200 / 202 KB ｜ .../SKEW_History.csv → 200 / 204 KB
    .../VVIX_History.csv → 200 / 109 KB ｜ .../PCALL_History.csv → 403

注意 **域名是 `cdn-api.cboe.com`**（不是 `cdn.cboe.com`：后者 307 跳转）。

## 用途（写进报告的话术）

指数波动率回答的是"市场为**整体**不确定性付多少钱"，**不是**某个名字的 IV。
把它当个股 IV 用是手册明列的坑（`07-型/情绪指标地图.md` §1.2 失效条件列）。
"""

from __future__ import annotations

import csv
import re
import io
from typing import Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft

source_id = "cboe.indices"
parser_version = "cboe/1"

_CSV = "https://cdn-api.cboe.com/api/global/us_indices/daily_prices/{name}_History.csv"

#: 每个指数回答什么问题（`checked_scope` 与报告都要用它，别只写个代码）
_MEANING = {
    "VIX": "30 天隐含波动率（方差互换法）；低 ≠ 低风险",
    "VIX9D": "9 天隐含波动率；短端紧张时先动",
    "SKEW": "尾部风险定价（偏斜）；陡 ⇒ 尾部保护贵",
    "VVIX": "波动率的波动率；VIX 自身的风险溢价",
}


def _indices(spec: TypeSpec) -> list[str]:
    raw = spec.params.get("indices") or ["VIX"]
    return [str(x).upper() for x in raw]


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """打第一个指数，断言 CSV 有表头 + 至少一行数据。"""
    name = _indices(spec)[0]
    try:
        resp = client.get(_CSV.format(name=name), source_id=source_id)
    except FetchError as exc:
        raise Unavailable(f"CBOE 不可达：{exc}") from exc
    rows = _rows_of(resp.body)
    if len(rows) < 2:
        raise Unavailable(
            f"CBOE {name} 返回空表（{len(resp.body)} 字节）",
            checked_scope=[f"{resp.url}: {len(resp.body)} 字节"],
        )
    return [f"cboe.indices: {name} {len(rows) - 1} 行｜{_MEANING.get(name, '')}"]


def _rows_of(body: bytes) -> list[list[str]]:
    """CSV 字节 → 行（去空行；表头保留在第 0 行）。"""
    text = body.decode("utf-8", errors="replace")
    return [r for r in csv.reader(io.StringIO(text)) if any(c.strip() for c in r)]


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """每个指数一件（不同指数回答不同问题，合并会丢语义）。"""
    out: list[RawItem] = []
    for name in _indices(spec):
        try:
            resp = client.get(_CSV.format(name=name), source_id=source_id)
        except FetchError as exc:
            if exc.status == 403:
                continue  # 该指数不公开（如 PCALL），跳过而非判死
            raise
        if len(_rows_of(resp.body)) < 2:
            continue
        out.append(
            RawItem(
                artifact_id=f"{spec.class_id}-{spec.slug}-{window.as_of}-{name}",
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
                    "index": name,
                    "meaning": _MEANING.get(name, ""),
                    "source": source_id,
                    "provider": "Cboe Global Markets",
                    "url": resp.url,
                    "fetchedAt": window.as_of,
                },
            )
        )
    return out


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """CSV → 一份一目录（最近 60 个交易日 + 分位统计）。"""
    rows = _rows_of(raw.body)
    name = str(raw.extra.get("index") or "")
    blocks: list[tuple[str, str]] = []

    header = rows[0] if rows else []
    body_rows = rows[1:]
    blocks.append(
        (
            "口径",
            "\n".join(
                [
                    f"指数: {name}",
                    f"含义: {raw.extra.get('meaning') or '未登记'}",
                    f"列: {' | '.join(header)}",
                    f"总行数: {len(body_rows)}",
                    "时点: 日频收盘（不是实时）；换月/结构变化后基准可能失效",
                ]
            ),
        )
    )

    tail = body_rows[-60:]
    blocks.append(
        (
            "最近 60 个交易日",
            "\n".join(" | ".join(c.strip() for c in r) for r in tail) or "（无数据）",
        )
    )

    # 分位（用 **CLOSE 列**；按列名定位，不按"第一个能转成数字的格子"）
    #  ★ 踩过的坑：VIX 的列序是 `DATE|OPEN|HIGH|LOW|CLOSE`，若取"第一个数字"
    #    得到的是 **OPEN**，于是"最新值"报成 18.43（那其实是当日 HIGH）。
    #    价格序列的收盘列必须按名字拿，否则分位全错且看不出来。
    head_norm = [re.sub(r"[^A-Z]", "", h.upper()) for h in header]
    close_idx: int | None = None
    for cand in ("CLOSE", "CLOSELAST", "LAST", "PXLAST", "VALUE"):
        if cand in head_norm:
            close_idx = head_norm.index(cand)
            break
    if close_idx is None:
        for i, h in enumerate(head_norm):
            if "CLOSE" in h:
                close_idx = i
                break

    closes: list[float] = []
    if close_idx is not None:
        for r in body_rows:
            if close_idx < len(r):
                try:
                    closes.append(float(r[close_idx]))
                except ValueError:
                    continue
    if closes:
        srt = sorted(closes)
        blocks.append(
            (
                "历史分位（全样本）",
                "\n".join(
                    [
                        f"样本数: {len(closes)}",
                        f"最小: {srt[0]:.2f}｜最大: {srt[-1]:.2f}",
                        f"中位: {srt[len(srt) // 2]:.2f}",
                        f"最新: {closes[-1]:.2f}（分位 {100 * sum(1 for x in closes if x <= closes[-1]) / len(closes):.1f}%）",
                    ]
                ),
            )
        )

    text = "\n\n".join(f"## {label}\n{body_}" for label, body_ in blocks)
    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext="csv",
        text=text,
        meta={
            "srcId": f"{name}_History.csv",
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": str(raw.extra.get("date") or ""),
            "index": name,
            "meaning": raw.extra.get("meaning", ""),
            "source": source_id,
            "provider": raw.extra.get("provider", ""),
            "url": raw.url,
            "pageCount": len(blocks),
        },
        page_caliber=spec.page_caliber,
        sections=blocks,
    )

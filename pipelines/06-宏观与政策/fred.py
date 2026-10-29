"""`06-宏观与政策/fred.py` —— FRED/ALFRED Adapter（B 类：需一次性免费 key）。

## 本 Adapter 的存在意义

`macro-cycle` / `rates-inflation` / `sentiment-survey` 三型要的官方统计序列
（CPI、非农、核心 PCE、盈亏平衡通胀）在 FRED 上是**免 key 可达但必须带 key 才放行**：
实测无 key 时 `api.stlouisfed.org` 返 **400**（服务可达、参数被拒）。

所以本模块**不申请 key、不猜 key**：读环境变量；没有就把该型如实判 `unavailable(no_api_key)`，
并在报告里指到 `pipelines/_keys/README.md`。有 key 就正常取数、带 `vintage`。

## 为什么 `vintage` 是必填

手册 `06-型/宏观与周期.md` 与 `07-型/利率与通胀预期.md` 都写着"初值/修订必须记 vintage"。
FRED 的 `realtime_start` / `realtime_end` 就是 ALFRED 的 vintage 参数；
不带它取到的是**修订后的最新值**，用它做历史判断会虚高（这是本仓既有结论）。
所以：`vintage` 参数默认带当前日期区间，让"当时能看到的值"可复现。
"""

from __future__ import annotations

import os
from typing import Any, Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft

source_id = "fred"
parser_version = "fred/1"

_API = "https://api.stlouisfed.org/fred/series/observations"
_SERIES_INFO = "https://api.stlouisfed.org/fred/series"

_KEY_DOC = "pipelines/_keys/README.md"


def api_key(spec: TypeSpec) -> str | None:
    """读 key：`params.env_key` 指名的环境变量，缺则 None（**不抛**，由调用方判态）。"""
    env_name = str(spec.params.get("env_key") or "FRED_API_KEY")
    value = os.environ.get(env_name, "").strip()
    return value or None


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """有 key 才探测；无 key 直接抛 `Unavailable(no_api_key)`。

    这样"缺 key"与"服务挂了"在报告里是两句话，不会混成一句"不可用"。
    """
    key = api_key(spec)
    if not key:
        raise Unavailable(
            f"缺 {spec.params.get('env_key', 'FRED_API_KEY')}：申请步骤见 {_KEY_DOC}",
            checked_scope=["api.stlouisfed.org/fred/series → 400（服务可达，缺 api_key）"],
        )
    try:
        data = client.get_json(
            _SERIES_INFO,
            source_id=source_id,
            params=[("series_id", "CPIAUCSL"), ("api_key", key), ("file_type", "json")],
        )
    except FetchError as exc:
        raise Unavailable(f"FRED 不可达：{exc}") from exc
    if not isinstance(data, dict) or "seriess" not in data:
        raise Unavailable("FRED 返回结构异常（无 seriess）")
    return [f"fred: key 有效（CPIAUCSL 元数据可读）"]


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """逐序列取观测值（每序列一件）。"""
    key = api_key(spec)
    if not key:
        raise Unavailable(
            f"缺 {spec.params.get('env_key', 'FRED_API_KEY')}：申请步骤见 {_KEY_DOC}"
        )
    series = spec.params.get("series") or {}
    if not isinstance(series, dict) or not series:
        raise Unavailable(f"{spec.key}: channels.yaml 未声明 series")

    years = int(spec.params.get("lookback_years") or 5)
    start = f"{int(window.as_of[:4]) - years}-01-01"

    out: list[RawItem] = []
    for series_id, meaning in series.items():
        try:
            data = client.get_json(
                _API,
                source_id=source_id,
                params=[
                    ("series_id", str(series_id)),
                    ("api_key", key),
                    ("file_type", "json"),
                    ("observation_start", start),
                    ("observation_end", window.as_of),
                    # ALFRED vintage：取"截至今日能看到的那一版"，让"当时可见"可复现
                    ("realtime_start", "1900-01-01"),
                    ("realtime_end", window.as_of),
                ],
            )
        except FetchError:
            continue
        if not isinstance(data, dict):
            continue
        obs = data.get("observations")
        if not isinstance(obs, list):
            continue
        out.append(
            RawItem(
                artifact_id=f"{spec.class_id}-{spec.slug}-{window.as_of}-{series_id}",
                url=_API,
                body=__import__("json").dumps(data, ensure_ascii=False).encode("utf-8"),
                content_type="application/json",
                published_at=None,
                as_of=window.as_of,
                ext="json",
                http_status=200,
                vintage=f"realtime_end={window.as_of}",
                extra={
                    "cat": spec.class_id,
                    "sub": spec.sub,
                    "date": window.as_of,
                    "seriesId": str(series_id),
                    "meaning": str(meaning),
                    "source": source_id,
                    "provider": "Federal Reserve Bank of St. Louis (FRED/ALFRED)",
                    "url": f"{_API}?series_id={series_id}",
                    "fetchedAt": window.as_of,
                },
            )
        )
    return out


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """观测值 → 一份一目录（口径 + 最近 24 个观察 + 首末可核行）。"""
    import json

    sid = str(raw.extra.get("seriesId") or "")
    try:
        data = json.loads(raw.body.decode("utf-8", errors="replace"))
    except json.JSONDecodeError:
        data = {}
    obs = [o for o in (data.get("observations") or []) if isinstance(o, dict)]
    valid = [o for o in obs if str(o.get("value", "")).strip() not in ("", ".")]

    blocks: list[tuple[str, str]] = [
        (
            "口径",
            "\n".join(
                [
                    f"序列: {sid}",
                    f"含义: {raw.extra.get('meaning') or '未登记'}",
                    f"发布方: Federal Reserve Bank of St. Louis（FRED / ALFRED）",
                    f"观察点数: {len(obs)}（有效 {len(valid)}，'.' 表示未发布）",
                    f"vintage: {raw.vintage or '未标'}",
                    "纪律: 季调/未季调是两套口径；初值与修订不同，跨期比必须带 vintage",
                ]
            ),
        ),
        (
            "最近 24 个观察",
            "\n".join(f"{o.get('date')} | {o.get('value')}" for o in valid[-24:]) or "（无有效观察）",
        ),
        (
            "首末可核行",
            (
                f"最早: {valid[0].get('date')} | {valid[0].get('value')}\n"
                f"最新: {valid[-1].get('date')} | {valid[-1].get('value')}"
            )
            if valid
            else "（无有效观察）",
        ),
    ]
    text = "\n\n".join(f"## {k}\n{v}" for k, v in blocks)
    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext="json",
        text=text,
        meta={
            "srcId": sid,
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": str(raw.extra.get("date") or ""),
            "seriesId": sid,
            "meaning": raw.extra.get("meaning", ""),
            "source": source_id,
            "provider": raw.extra.get("provider", ""),
            "url": raw.extra.get("url", ""),
            "vintage": raw.vintage,
            "pageCount": len(blocks),
        },
        page_caliber=spec.page_caliber,
        sections=blocks,
    )

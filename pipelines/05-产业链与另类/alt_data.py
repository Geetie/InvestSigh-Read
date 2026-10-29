"""`05-产业链与另类/alt_data.py` —— 另类数据 Adapter（招聘 + App 元数据 + 专利）。

## 为什么这三路放进一个 Adapter

手册 `05-型/另类数据.md` 要求每个源产出「覆盖 / 口径 / 偏差 / 领先期」四栏；
三路都是"投入侧旁证"，问句形态相同，合并成一处实现才能保证**四栏不缺**。
分开写就会出现"招聘有领先期、App 没有"这种不对称。

## 三路的实测与选择理由（2026-10-28）

| 源 | 实测 | 为什么选它 |
|---|---|---|
| `boards-api.greenhouse.io` | 200（anthropic 681 岗） | 免 key、结构化 JSON、岗位数可数 |
| `itunes.apple.com/lookup` | 200 | 免 key、官方、给 App 版本与评分 |
| `developer.uspto.gov/ibd-api` | 200 | 免 key、官方（`patentsview` 需 key） |

**已知不可用**（写进 `channels.yaml::absent_scope`，不在这里假装实现）：
Meta 自身不走 Greenhouse（`boards/meta` → 404）、`lever` 也无 Meta（404）；
卫星与信用卡流水属付费。

## 纪律

- **投入侧 ≠ 产出侧**：招聘数是"公司在为未来下注"，不是"产出已经涨了"。
  每条材料必须写清"这是投入侧"。
- **四栏必填**：覆盖 / 口径 / 偏差 / 领先期。缺栏就不进卡（手册明文）。
"""

from __future__ import annotations

import json
from typing import Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft

source_id = "alt.data"
parser_version = "alt_data/1"

_GREENHOUSE = "https://boards-api.greenhouse.io/v1/boards/{board}/jobs"
_ITUNES = "https://itunes.apple.com/lookup?id={app_id}&country=us"
_USPTO = "https://developer.uspto.gov/ibd-api/v1/application/publications"


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """逐路探测；至少一路可用即通过（其余记 scope，不整体挂掉）。"""
    scopes: list[str] = []
    ok = 0

    for board in spec.params.get("greenhouse_boards") or []:
        try:
            data = client.get_json(_GREENHOUSE.format(board=board), source_id=source_id)
            n = len((data or {}).get("jobs") or []) if isinstance(data, dict) else 0
            if n:
                ok += 1
            scopes.append(f"greenhouse/{board}: {n} 岗位")
        except FetchError as exc:
            scopes.append(f"greenhouse/{board}: {exc.status or 'network'}")

    app_ids = spec.params.get("app_ids") or {}
    for app_name, app_id in list(app_ids.items())[:1]:
        try:
            data = client.get_json(_ITUNES.format(app_id=app_id), source_id=source_id)
            n = int((data or {}).get("resultCount") or 0)
            if n:
                ok += 1
            scopes.append(f"itunes/{app_name}: resultCount={n}")
        except FetchError as exc:
            scopes.append(f"itunes/{app_name}: {exc.status or 'network'}")

    if not ok:
        raise Unavailable("另类数据三路全不可用", checked_scope=scopes)
    return scopes


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """逐路取数；每路一件材料。"""
    out: list[RawItem] = []

    for board in spec.params.get("greenhouse_boards") or []:
        try:
            resp = client.get(_GREENHOUSE.format(board=board), source_id=source_id)
        except FetchError:
            continue
        data = json.loads(resp.text or "{}")
        n = len((data or {}).get("jobs") or [])
        if not n:
            continue
        out.append(
            _item(
                spec, window,
                artifact_id=f"{spec.class_id}-{spec.slug}-{window.as_of}-gh-{board}",
                url=resp.url, body=resp.body, ctype=resp.content_type, ext="json",
                kind="hiring", label=f"Greenhouse board={board}",
                extra={"board": board, "jobCount": n},
            )
        )

    for app_name, app_id in (spec.params.get("app_ids") or {}).items():
        try:
            resp = client.get(_ITUNES.format(app_id=app_id), source_id=source_id)
        except FetchError:
            continue
        data = json.loads(resp.text or "{}")
        if int((data or {}).get("resultCount") or 0) < 1:
            continue
        out.append(
            _item(
                spec, window,
                artifact_id=f"{spec.class_id}-{spec.slug}-{window.as_of}-app-{app_name}",
                url=resp.url, body=resp.body, ctype=resp.content_type, ext="json",
                kind="app_store", label=f"App Store lookup id={app_id}",
                extra={"app": app_name, "appId": str(app_id)},
            )
        )

    for q in spec.params.get("uspto_queries") or []:
        try:
            resp = client.get(
                _USPTO, source_id=source_id,
                params=[("searchText", str(q)), ("rows", "20")],
            )
        except FetchError:
            continue
        out.append(
            _item(
                spec, window,
                artifact_id=f"{spec.class_id}-{spec.slug}-{window.as_of}-uspto-{_slug(str(q))}",
                url=resp.url, body=resp.body, ctype=resp.content_type, ext="json",
                kind="patents", label=f"USPTO IBD search={q}", extra={"query": str(q)},
            )
        )
    return out


def _slug(raw: str) -> str:
    import re

    return re.sub(r"[^0-9a-z]+", "-", raw.lower()).strip("-")[:30] or "q"


def _item(
    spec: TypeSpec,
    window: Window,
    *,
    artifact_id: str,
    url: str,
    body: bytes,
    ctype: str,
    ext: str,
    kind: str,
    label: str,
    extra: dict,
) -> RawItem:
    """统一构造 `RawItem`（三路的公共字段在一处写，避免各写一份）。"""
    return RawItem(
        artifact_id=artifact_id,
        url=url,
        body=body,
        content_type=ctype,
        published_at=None,
        as_of=window.as_of,
        ext=ext,
        extra={
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": window.as_of,
            "altKind": kind,
            "label": label,
            "source": source_id,
            "provider": _provider_of(kind),
            "url": url,
            "fetchedAt": window.as_of,
            **extra,
        },
    )


def _provider_of(kind: str) -> str:
    return {
        "hiring": "Greenhouse (公司官方招聘板)",
        "app_store": "Apple App Store (官方 lookup API)",
        "patents": "USPTO (IBD API)",
    }.get(kind, "未标")


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """JSON → 一份一目录（**四栏必填**：覆盖 / 口径 / 偏差 / 领先期）。"""
    kind = str(raw.extra.get("altKind") or "")
    if kind == "hiring":
        text, blocks = _render_hiring(raw)
    elif kind == "app_store":
        text, blocks = _render_app(raw)
    else:
        text, blocks = _render_patents(raw)

    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext="json",
        text=text,
        meta={
            "srcId": str(raw.extra.get("label") or raw.artifact_id),
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": str(raw.extra.get("date") or ""),
            "altKind": kind,
            "label": raw.extra.get("label", ""),
            "source": source_id,
            "provider": raw.extra.get("provider", ""),
            "url": raw.url,
            "pageCount": len(blocks),
        },
        page_caliber=spec.page_caliber,
        sections=blocks,
    )


#: 四栏模板（手册 `05-型/另类数据.md:42-49`；缺一栏不进卡）
def _four_cols(coverage: str, caliber: str, bias: str, lead: str) -> tuple[str, str]:
    return (
        "四栏（覆盖 / 口径 / 偏差 / 领先期）",
        "\n".join(
            [
                f"覆盖: {coverage}",
                f"口径: {caliber}",
                f"偏差: {bias}",
                f"领先期: {lead}",
            ]
        ),
    )


def _render_hiring(raw: RawItem) -> tuple[str, list[tuple[str, str]]]:
    """招聘 JSON → 岗位数与部门/地点分布。"""
    try:
        data = json.loads(raw.body.decode("utf-8", errors="replace"))
    except json.JSONDecodeError:
        data = {}
    jobs = [j for j in (data.get("jobs") or []) if isinstance(j, dict)]
    by_loc: dict[str, int] = {}
    for j in jobs:
        loc = ((j.get("location") or {}).get("name") or "未标").split(";")[0].strip()
        by_loc[loc] = by_loc.get(loc, 0) + 1
    top = sorted(by_loc.items(), key=lambda kv: kv[1], reverse=True)[:12]

    blocks: list[tuple[str, str]] = [
        (
            "读数",
            "\n".join(
                [
                    f"招聘板: {raw.extra.get('board')}",
                    f"在招岗位数: {len(jobs)}",
                    f"最近更新（抽样）: {str((jobs[0].get('updated_at') if jobs else '') or '未标')}",
                ]
            ),
        ),
        _four_cols(
            coverage=f"一家公司的一个招聘板（{raw.extra.get('board')}）；单位=在招岗位条数",
            caliber="岗位数是**时点存量**（不是新增量），含实习与重复发布；地区取 location 首段",
            bias="大公司在招岗位与净增员工数不成比例（内部转岗、冻结后重开都会抬高或压低）",
            lead="领先于财报的用工成本 1–2 个季度；不得当收入领先指标",
        ),
        ("地点分布（前 12）", "\n".join(f"{k}: {v}" for k, v in top) or "（无地点字段）"),
    ]
    return "\n\n".join(f"## {k}\n{v}" for k, v in blocks), blocks


def _render_app(raw: RawItem) -> tuple[str, list[tuple[str, str]]]:
    """App Store lookup → 版本 / 评分 / 评分数量。"""
    try:
        data = json.loads(raw.body.decode("utf-8", errors="replace"))
    except json.JSONDecodeError:
        data = {}
    results = [r for r in (data.get("results") or []) if isinstance(r, dict)]
    r0 = results[0] if results else {}
    blocks: list[tuple[str, str]] = [
        (
            "读数",
            "\n".join(
                [
                    f"App: {r0.get('trackName') or raw.extra.get('app')}",
                    f"版本: {r0.get('version') or '未标'}",
                    f"更新日: {str(r0.get('currentVersionReleaseDate') or '未标')[:10]}",
                    f"平均评分: {r0.get('averageUserRating') or '未标'}",
                    f"评分数量: {r0.get('userRatingCount') or '未标'}",
                    f"内容分级: {r0.get('contentAdvisoryRating') or '未标'}",
                ]
            ),
        ),
        _four_cols(
            coverage=f"一个 App（id={raw.extra.get('appId')}）的一条元数据快照",
            caliber="评分为**累计**平均（含历史版本），不是本期评分；数量单位=条",
            bias="评分受事件驱动（改版、故障）会突变，且与安装量无固定比例",
            lead="版本发布日可作为功能上线的**同期**标记，不构成财务领先",
        ),
    ]
    return "\n\n".join(f"## {k}\n{v}" for k, v in blocks), blocks


def _render_patents(raw: RawItem) -> tuple[str, list[tuple[str, str]]]:
    """USPTO IBD → 公开申请条数与前几条标题。"""
    try:
        data = json.loads(raw.body.decode("utf-8", errors="replace"))
    except json.JSONDecodeError:
        data = {}
    pubs = []
    if isinstance(data, dict):
        for key in ("results", "publications", "response"):
            v = data.get(key)
            if isinstance(v, list):
                pubs = [x for x in v if isinstance(x, dict)]
                break
    titles = [
        str(p.get("inventionTitle") or p.get("title") or p.get("applicationTitle") or "")[:90]
        for p in pubs[:10]
    ]
    blocks: list[tuple[str, str]] = [
        (
            "读数",
            "\n".join(
                [
                    f"检索式: {raw.extra.get('query')}",
                    f"命中条数: {len(pubs)}",
                    f"原始响应键: {', '.join(list(data)[:8]) if isinstance(data, dict) else '非对象'}",
                ]
            ),
        ),
        _four_cols(
            coverage=f"USPTO IBD 公开申请（检索式={raw.extra.get('query')}，最多 20 条）",
            caliber="只含**已公开**申请（申请后 18 个月才公开）⇒ 天然滞后；条数≠授权数",
            bias="同族专利会重复计数；公司改名/子公司在不同名下申请会漏",
            lead="公开滞后 18 个月 ⇒ 领先期已耗尽，只能当**技术方向**旁证，不能当近期动量",
        ),
        ("前 10 条标题", "\n".join(f"- {t}" for t in titles if t) or "（未解析出标题字段）"),
    ]
    return "\n\n".join(f"## {k}\n{v}" for k, v in blocks), blocks

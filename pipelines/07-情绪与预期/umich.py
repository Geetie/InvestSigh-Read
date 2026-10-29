"""`07-情绪与预期/umich.py` —— 情绪调查 Adapter（UMich 消费者信心 + NAAIM 敞口）。

## 为什么这两源合在一个 Adapter

两者都是**周/月频的调查读数**，问句形态一致（"态度，不是仓位"），
且都在手册 `07-型/情绪调查与行为.md` 的同一张表里。合成一个 Adapter 的好处是
"这一型只有一处实现"——分开写就会出现"UMich 有时点、NAAIM 忘了时点"这种不对称。

## 实测（2026-10-28）

    sca.isr.umich.edu/files/tbmics.csv ......... 200 / 12 KB ｜ Month,YYYY,ICS_ALL；1952-11 → 2026-10
    index.naaim.org/embeddable/table ........... 200 / 52 KB ｜ Date, NAAIM Number, Bearish, Bullish, Deviation
    aaii.com/sentimentsurvey/sent_results ...... 403（无源，不得用别的调查顶替）

## 三条口径纪律（写进正文，判读时不用再查）

1. **问卷不是仓位**：NAAIM 是"敞口自报"，UMich 是"态度"，两者都不是实际持仓。
2. **单用反向指标必错**：极值只在"配合仓位读数"时才有反向含义。
3. **UMich 的「预期分项」比总指数重要**（手册 `07-型/情绪指标地图.md` §2.2）——
   本包只取到 `ICS_ALL`（总指数），分项缺失必须如实写在正文里，不许当已覆盖。
"""

from __future__ import annotations

import csv
import io
import re
from typing import Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft, html_to_text

source_id = "sentiment.survey"
parser_version = "umich/1"

_URLS = {
    "umich": "http://www.sca.isr.umich.edu/files/tbmics.csv",
    "naaim": "https://index.naaim.org/embeddable/table",
}


def _sources(spec: TypeSpec) -> list[str]:
    raw = spec.params.get("sources") or ["umich"]
    return [str(s).lower() for s in raw]


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """逐源探测；任一源不可达只记 scope，不整体失败（另一源仍可用）。"""
    scopes: list[str] = []
    ok = 0
    for name in _sources(spec):
        try:
            resp = client.get(_URLS[name], source_id=source_id)
        except FetchError as exc:
            scopes.append(f"{name}: {exc}")
            continue
        ok += 1
        scopes.append(f"{name}: 200 / {len(resp.body)} 字节")
    if not ok:
        raise Unavailable("情绪调查两源都不可达", checked_scope=scopes)
    return scopes


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """每个源一件。"""
    out: list[RawItem] = []
    for name in _sources(spec):
        try:
            resp = client.get(_URLS[name], source_id=source_id)
        except FetchError:
            continue
        out.append(
            RawItem(
                artifact_id=f"{spec.class_id}-{spec.slug}-{window.as_of}-{name}",
                url=resp.url,
                body=resp.body,
                content_type=resp.content_type,
                published_at=None,
                as_of=window.as_of,
                ext="csv" if name == "umich" else "htm",
                http_status=resp.status,
                extra={
                    "cat": spec.class_id,
                    "sub": spec.sub,
                    "date": window.as_of,
                    "survey": name,
                    "source": source_id,
                    "provider": "U. Michigan Surveys of Consumers" if name == "umich" else "NAAIM",
                    "url": resp.url,
                    "fetchedAt": window.as_of,
                },
            )
        )
    return out


def _render_umich(body: bytes, spec: TypeSpec) -> tuple[str, list[tuple[str, str]]]:
    """UMich `Month,YYYY,ICS_ALL` → 近 N 年序列 + 口径。"""
    text = body.decode("utf-8", errors="replace")
    rows = [r for r in csv.reader(io.StringIO(text)) if len(r) >= 3 and r[0].strip() != "Month"]
    years = int(spec.params.get("umich_include_years") or 3)
    recent = [r for r in rows if _num(r[1]) and int(float(r[1])) >= 2026 - years]

    blocks: list[tuple[str, str]] = [
        (
            "口径",
            "\n".join(
                [
                    "发布方: University of Michigan, Surveys of Consumers",
                    "本包只取到: ICS_ALL（消费者信心总指数，1966Q1=100）",
                    "缺项: 现状分项（ICC）与预期分项（ICE）**未在本文件内** ⇒ 手册要的「预期分项」在本件里答不了，须如实写缺口",
                    "时点: 月频；初值与终值不同，本文件是发布序列（不区分初/终）",
                    "用法纪律: 问卷不是仓位；单用反向指标必错",
                ]
            ),
        ),
        (
            f"最近 {years} 年序列",
            "\n".join(f"{r[0].strip()} {r[1].strip()} | ICS_ALL {r[2].strip()}" for r in recent)
            or "（无数据）",
        ),
    ]
    if rows:
        blocks.append(
            (
                "首末行（可核）",
                f"最早: {rows[0][0].strip()} {rows[0][1].strip()} | {rows[0][2].strip()}\n"
                f"最新: {rows[-1][0].strip()} {rows[-1][1].strip()} | {rows[-1][2].strip()}",
            )
        )
    out = "\n\n".join(f"## {k}\n{v}" for k, v in blocks)
    return out, blocks


def _num(raw: str) -> bool:
    try:
        float(raw)
        return True
    except (TypeError, ValueError):
        return False


def _render_naaim(body: bytes, spec: TypeSpec) -> tuple[str, list[tuple[str, str]]]:
    """NAAIM embeddable table（htm）→ 周序列。

    表头实测为 `Date | NAAIM Number | Bearish | Quarter 1 | Quarter 2 | Quarter 3 | Bullish | Deviation`
    ——**列不固定**（每季多一列），所以按表头**列名**定位，不按列序号。
    """
    text = html_to_text(body.decode("utf-8", errors="replace"))
    lines = [ln.strip() for ln in text.split("\n") if ln.strip()]
    pat = re.compile(r"^\d{2}/\d{2}/\d{4}$")
    entries: list[str] = []
    for i, ln in enumerate(lines):
        if pat.match(ln):
            window = lines[i : i + 8]
            entries.append(" | ".join(window))
    max_weeks = int(spec.params.get("naaim_max_weeks") or 60)
    blocks: list[tuple[str, str]] = [
        (
            "口径",
            "\n".join(
                [
                    "发布方: NAAIM（National Association of Active Investment Managers）",
                    "读的是什么: 成员自报的**股票敞口**（-200%..200%），周频",
                    "时点: 周三收盘后收集、周四发布",
                    "用法纪律: 自报敞口 ≠ 实际持仓；极端值需配合仓位读数才可反向读",
                ]
            ),
        ),
        ("最近周序列（按页面顺序）", "\n".join(entries[:max_weeks]) or "（未解析出日期行）"),
    ]
    out = "\n\n".join(f"## {k}\n{v}" for k, v in blocks)
    return out, blocks


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """CSV/HTM → 一份一目录。"""
    name = str(raw.extra.get("survey") or "umich")
    if name == "umich":
        text, blocks = _render_umich(raw.body, spec)
    else:
        text, blocks = _render_naaim(raw.body, spec)
    if not text.strip():
        raise ValueError(f"{raw.artifact_id}: 渲染为空")

    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext=raw.ext,
        text=text,
        meta={
            "srcId": name,
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": str(raw.extra.get("date") or ""),
            "survey": name,
            "source": source_id,
            "provider": raw.extra.get("provider", ""),
            "url": raw.url,
            "pageCount": len(blocks),
        },
        page_caliber=spec.page_caliber,
        sections=blocks,
    )

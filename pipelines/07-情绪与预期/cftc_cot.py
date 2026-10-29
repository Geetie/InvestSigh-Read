"""`07-情绪与预期/cftc_cot.py` —— CFTC 持仓报告（COT）Adapter。

## 为什么要用官方 zip 而不是 Socrata

实测：`publicreporting.cftc.gov/resource/6dca-aqww.json` → **403**（Socrata 需 app token）；
`cftc.gov/files/dea/history/deacot2026.zip` → **200 / 729 KB**。
官方历史 zip 是年报一包（每包内含当年全部周报，固定宽度 CSV），免 key、免 token。

## 三个必须写进报告的时点事实

1. **COT 是周二持仓、周五发布**（滞后 3 天）⇒ `as_of` 记**报告日**（周二），不是抓取日。
2. **COT 是期货/期权持仓，不是现货仓位**（手册 `07-型/情绪指标地图.md` §2.1）——
   管道只落原始表，不做"等于现货"的换算。
3. **Legacy 与 TFF 是两套报表**，contract 名不同，不得混算。本 Adapter 按
   `report_type` 声明取哪一套。

## zip 内文件结构

每包解出若干 `.txt`，命名形如 `F_year.txt`（Legacy Futures）、`FinFutYY.txt` 等。
格式是**固定宽度**，表头第一行给列名、第二行给字段名。本 Adapter 用「按表头列名定位」
而不是按字符位置切——列宽随年份变过，按位置切会在跨年拼表时错列。
"""

from __future__ import annotations

import csv
import io
import re
import zipfile
from typing import Any, Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.http import FetchError, HttpClient
from pipelines._kit.material import MaterialDraft

source_id = "cftc.cot"
parser_version = "cftc_cot/1"

_ZIP = "https://www.cftc.gov/files/dea/history/deacot{year}.zip"

#: zip 内我们要的文件（Legacy 期货，按年）
_LEGACY_HINTS = ("f_year", "fut_fin", "deacot", "legacy")


def _years(spec: TypeSpec) -> list[int]:
    raw = spec.params.get("years") or []
    years = [int(y) for y in raw]
    return years or [2026]


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """打当年 zip 的 HEAD 式探测（真下载一次，因为 CFTC 不支持 HEAD 稳定返回）。"""
    year = max(_years(spec))
    try:
        resp = client.get(_ZIP.format(year=year), source_id=source_id)
    except FetchError as exc:
        raise Unavailable(f"CFTC COT zip 不可达：{exc}") from exc
    if not zipfile.is_zipfile(io.BytesIO(resp.body)):
        raise Unavailable(
            f"CFTC COT {year} 返回的不是 zip（{resp.content_type}, {len(resp.body)} 字节）",
            checked_scope=[f"{resp.url}: {len(resp.body)} 字节"],
        )
    return [f"cftc.cot: {year} zip {len(resp.body)} 字节"]


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """每年一件（zip 太大不重复下载：同一年只取一次）。"""
    out: list[RawItem] = []
    for year in _years(spec):
        try:
            resp = client.get(_ZIP.format(year=year), source_id=source_id)
        except FetchError as exc:
            if exc.status == 404:
                continue  # 该年尚未发布（未来年份）
            raise
        out.append(
            RawItem(
                artifact_id=f"{spec.class_id}-{spec.slug}-{window.as_of}-cot{year}",
                url=resp.url,
                body=resp.body,
                content_type=resp.content_type,
                published_at=None,
                as_of=window.as_of,
                ext="zip",
                http_status=resp.status,
                extra={
                    "cat": spec.class_id,
                    "sub": spec.sub,
                    "date": window.as_of,
                    "year": year,
                    "source": source_id,
                    "provider": "U.S. CFTC",
                    "url": resp.url,
                    "fetchedAt": window.as_of,
                },
            )
        )
    return out


def _pick_member(zf: zipfile.ZipFile, spec: TypeSpec) -> str | None:
    """从 zip 里挑目标表（Legacy 期货优先）。"""
    names = [n for n in zf.namelist() if n.lower().endswith(".txt")]
    if not names:
        return None
    report_type = str(spec.params.get("report_type") or "legacy").lower()
    if report_type == "legacy":
        for n in names:
            low = n.lower()
            if "f_year" in low or ("legacy" in low and "fin" not in low):
                return n
        for n in names:
            if "fut" in n.lower() and "fin" not in n.lower():
                return n
    for n in names:
        if any(h in n.lower() for h in _LEGACY_HINTS):
            return n
    return names[0]


def _parse_fixed_width(raw_text: str) -> tuple[list[str], list[list[str]]]:
    """CFTC 固定宽度 CSV → `(表头, 行)`。

    CFTC 的 txt 其实是**逗号分隔**（历史包也是 CSV，字段带引号），所以直接 `csv` 读；
    若某年真的用了定宽（无逗号），退化为按两行以上空白切。
    """
    head = raw_text.splitlines()[0] if raw_text else ""
    if "," in head:
        reader = csv.reader(io.StringIO(raw_text))
        rows = [r for r in reader if any(c.strip() for c in r)]
        if not rows:
            return [], []
        header = [c.strip() for c in rows[0]]
        return header, [r for r in rows[1:]]
    rows = [re.split(r"\s{2,}", ln.strip()) for ln in raw_text.splitlines() if ln.strip()]
    if not rows:
        return [], []
    return rows[0], rows[1:]


def _col(header: list[str], *candidates: str) -> int | None:
    """按列名（不区分大小写、容忍空格差异）找列号；找不到返回 None。"""
    norm = [re.sub(r"[^a-z0-9]", "", h.lower()) for h in header]
    for cand in candidates:
        key = re.sub(r"[^a-z0-9]", "", cand.lower())
        for i, h in enumerate(norm):
            if h == key:
                return i
    for cand in candidates:
        key = re.sub(r"[^a-z0-9]", "", cand.lower())
        for i, h in enumerate(norm):
            if key and key in h:
                return i
    return None


def _render_zip(
    body: bytes, spec: TypeSpec, *, year: int, target: str
) -> tuple[str, list[tuple[str, str]]]:
    """zip → 可读正文（本标的合约行 + 报告日索引）。

    `content.md` 只留**与目标相关的行**与**报告日清单**；完整原始表在 `source.zip` 里
    （CFTC 一年 zip 约 729 KB、数千行，全塞正文没人读得完，且会淹没判读要点）。
    """
    try:
        zf = zipfile.ZipFile(io.BytesIO(body))
    except zipfile.BadZipFile:
        return "（zip 损坏，原文见 source.zip）", [("原始 zip", "zip 损坏，未解析")]

    member = _pick_member(zf, spec)
    if not member:
        return "（zip 内无 .txt）", [("zip 内容", "\n".join(zf.namelist()[:50]))]

    raw = zf.read(member).decode("utf-8", errors="replace")
    header, rows = _parse_fixed_width(raw)

    i_date = _col(header, "As of Date in Form YYMMDD", "Report Date as YYMMDD", "As of Date")
    i_name = _col(header, "Market_and_Exchange_Names", "Market and Exchange Names")
    i_long = _col(header, "Noncommercial Positions-Long All", "NonComm_Positions_Long_All")
    i_short = _col(header, "Noncommercial Positions-Short All", "NonComm_Positions_Short_All")
    i_comm_long = _col(header, "Commercial Positions-Long All", "Comm_Positions_Long_All")
    i_comm_short = _col(header, "Commercial Positions-Short All", "Comm_Positions_Short_All")
    i_oi = _col(header, "Open Interest (All)", "Open_Interest_All")

    blocks: list[tuple[str, str]] = [
        (
            "文件说明",
            "\n".join(
                [
                    f"CFTC COT 年度包: {year}",
                    f"zip 内取用文件: {member}",
                    f"列数: {len(header)}｜数据行: {len(rows)}",
                    "时点纪律: COT 为**周二持仓、周五发布**（滞后 3 天）；COT 是期货持仓，不是现货仓位。",
                ]
            ),
        )
    ]

    # 本标的 / 相关合约（只留判读要用的 6 列，不要把 129 列都摊开）
    picked: list[str] = []
    if i_name is not None:
        word = re.compile(rf"\b{re.escape(target.upper())}\b", re.IGNORECASE)

        def cell(row: list[str], idx: int | None) -> str:
            return row[idx].strip() if idx is not None and idx < len(row) else "-"

        for r in rows:
            if i_name >= len(r):
                continue
            name = r[i_name]
            if not (word.search(name) or ("NASDAQ" in name.upper() and "MINI" in name.upper())):
                continue
            picked.append(
                f"{cell(r, i_date)} | {name.strip()} | 非商多 {cell(r, i_long)} | "
                f"非商空 {cell(r, i_short)} | 商多 {cell(r, i_comm_long)} | "
                f"商空 {cell(r, i_comm_short)} | OI {cell(r, i_oi)}"
            )
    picked.sort(key=lambda s: (s.split(" | ", 1)[0], s), reverse=True)
    blocks.append(
        (
            "相关合约行（按报告日倒序）",
            "\n".join(picked[:40])
            if picked
            else f"（本表中未出现含 {target} 或 NASDAQ MINI 的合约名）",
        )
    )

    # 报告日清单（证明覆盖了哪些周）
    dates: list[str] = []
    if i_date is not None:
        seen: set[str] = set()
        for r in rows:
            if i_date < len(r):
                d = r[i_date].strip()
                if d and d not in seen:
                    seen.add(d)
                    dates.append(d)
    blocks.append(("报告日清单", "\n".join(sorted(dates)[-60:]) or "（未取到报告日列）"))

    # 汇总口径（示例行，供判读对齐列）
    if rows and i_long is not None and i_short is not None:
        sample = rows[0]
        blocks.append(
            (
                "列口径示例（首行）",
                f"{sample[i_name] if i_name is not None and i_name < len(sample) else '?'}\n"
                f"非商业多头={sample[i_long] if i_long < len(sample) else '?'}｜"
                f"非商业空头={sample[i_short] if i_short < len(sample) else '?'}｜"
                f"商业多头={sample[i_comm_long] if i_comm_long is not None and i_comm_long < len(sample) else '?'}｜"
                f"商业空头={sample[i_comm_short] if i_comm_short is not None and i_comm_short < len(sample) else '?'}｜"
                f"总持仓={sample[i_oi] if i_oi is not None and i_oi < len(sample) else '?'}",
            )
        )

    text = "\n\n".join(f"## {label}\n{body_}" for label, body_ in blocks)
    return text, blocks


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """zip → 一份一目录（原始 zip 原样保存在 source.zip）。"""
    from pipelines._kit.targets import ticker_of

    year = int(raw.extra.get("year") or 0)
    text, blocks = _render_zip(raw.body, spec, year=year, target=ticker_of(spec))
    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext="zip",
        text=text,
        meta={
            "srcId": f"deacot{year}.zip",
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": str(raw.extra.get("date") or ""),
            "year": year,
            "source": source_id,
            "provider": "U.S. CFTC",
            "url": raw.url,
            "reportType": spec.params.get("report_type", "legacy"),
            "publishedAt": raw.published_at,
            "pageCount": len(blocks),
        },
        page_caliber=spec.page_caliber,
        sections=blocks,
    )

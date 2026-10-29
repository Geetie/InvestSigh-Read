"""`03-卖方与共识/t3_browser.py` —— T3 已购库 Adapter（知识星球 / 腾讯 ima）。

## 它做什么、不做什么

| 做 | 不做 |
|---|---|
| 用**人工登录保存的会话**打开当日更新列表 | 不破解验证码、不模拟扫码、不注入 token |
| 只挑**当日更新且有 PDF 附件**的条目 | 不抓未订阅内容（不绕付费墙） |
| 下载原件到 `_landing/<source>/<as-of>/` | 不做 OCR/解析（PDF 抽取交 `tools/pdf-pipeline`） |
| 会话过期 ⇒ `unavailable(login_expired)` | **不重试登录**、不静默降级成 `empty` |

## 为什么本 Adapter 不写 PDF 归一

PDF → 一份一目录 需要 **MinerU 在 GPU 服务器上跑**（`AGENTS.md §1.1`）。
本 Adapter 的职责边界是「把原件拿到并记账」，`normalize` 只产出**原件指针材料**
（`source.pdf` + 一份说明正文），真正的抽取由 `tools/pdf-pipeline` 另行触发。
这条边界是刻意的：让管道在没有 GPU 的机器上也能跑完 `fetch/land`，
拿到的东西不会因为 GPU 忙而丢。

## 选择器配置

条目选择器在 `t3_sources.yaml`（同目录），**必须登录后才能钉版**。
未钉版时 `probe` 抛 `Unavailable(selector_not_pinned)` —— 这是"还没配好"，
不是"没材料"，措辞不能混。
"""

from __future__ import annotations

import json
from typing import Sequence

from pipelines._kit.artifact import TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.browser import (
    BrowserUnavailable,
    LoginExpired,
    list_items,
    session_of,
)
from pipelines._kit.http import HttpClient
from pipelines._kit.material import MaterialDraft

source_id = "t3.browser"
parser_version = "t3_browser/1"


def _source_name(spec: TypeSpec) -> str:
    return str(spec.params.get("source") or "").strip()


def _sources_file() -> dict:
    """读同目录的 `t3_sources.yaml`（选择器与名录的唯一真源）。"""
    import yaml

    f = __import__("pathlib").Path(__file__).with_name("t3_sources.yaml")
    if not f.is_file():
        return {}
    return yaml.safe_load(f.read_text(encoding="utf-8")) or {}


def _source_cfg(spec: TypeSpec) -> dict:
    """取某源的配置段；缺配置返回空 dict（由调用方判态）。"""
    data = _sources_file()
    for s in data.get("sources") or []:
        if str(s.get("id")) == _source_name(spec):
            return s
    return {}


def _targets(cfg: dict) -> list[str]:
    """取该源的目标名录（星球 id / 知识库 id）。空列表 = 还没配目标。"""
    daily = cfg.get("daily") or {}
    for k in ("group_ids", "kb_ids"):
        v = daily.get(k)
        if isinstance(v, list):
            return [str(x) for x in v if str(x).strip()]
    return []


def probe(client: HttpClient, spec: TypeSpec) -> Sequence[str]:
    """探测顺序：能力声明 → 源配置 → 目标名录 → 条目选择器 → 会话 → 实际打开一次列表。

    每一环缺件都给**具名**原因，因为四种"没结果"在人眼里长得一样、实际完全不同：
    `capability=*`（站点就没有程序化通道）/ `no_target_configured`（没配星球）/
    `selector_not_pinned`（还没钉版）/ `no_session`（还没登录）。混成一个词就等于没报。
    """
    src = _source_name(spec)
    if not src:
        raise Unavailable(f"{spec.key}: channels.yaml 未声明 params.source")

    cfg = _source_cfg(spec)
    if not cfg:
        raise Unavailable(f"{src}: t3_sources.yaml 里没有这个源")

    # ① 站点能力：任何非空 capability 都表示"没有可用的取数通道"，
    #    必须单独成态 —— 否则会被后面的选择器检查盖成 selector_not_pinned，
    #    让人以为贴个选择器就能用，白跑一轮。
    cap = str(cfg.get("capability") or "")
    if cap:
        evidence = str(cfg.get("capability_evidence") or "未记录证据")
        drop = str((cfg.get("daily") or {}).get("drop_dir") or "pipelines/_landing/ima")
        raise Unavailable(
            f"{src}: 无程序化取数通道（capability={cap}；{evidence}）。这不是配置缺口，"
            f"补选择器或换账号都无解。",
            checked_scope=[f"{src}: capability={cap}"],
            action={
                "kind": "manual_export",
                "who": "账号持有人（本人在装有 ima 客户端的机器上）",
                "why": f"{src} 只能在客户端里人工导出，Agent 无法代劳",
                "needs": "在 ima 客户端里把要用的文件逐个点「下载」",
                "target": drop,
                "steps": [
                    "打开 ima 客户端 → 左侧「知识库」→ 选中目标知识库",
                    "点开某份文件，在预览窗口点右上「下载」",
                    "在「另存为」里按 Alt+D 聚焦地址栏，粘贴目标目录后回车",
                    "文件名框只填纯文件名，回车保存",
                    "全部下完后回复 Agent「已下载」",
                ],
                "note": "文件名框填完整路径会报「文件名无效」；目录必须经地址栏导航。",
            },
        )

    # ② 目标名录：没有星球 id 就没有"当日更新列表"这个页面，选择器无从钉起
    targets = _targets(cfg)
    if not targets:
        raise Unavailable(
            f"{src}: 还没配目标名录（t3_sources.yaml::daily.group_ids 为空）。"
            "登录账号名下若确实没有星球，需先在站内加入，再回填 id。",
            checked_scope=[f"{src}: group_ids=[]"],
            action={
                "kind": "confirm_account",
                "who": "账号持有人",
                "why": "已登录，但账号名下没有任何星球可采",
                "needs": "确认要采的星球是否在这个账号下；若不在，换号登录或先在站内加入",
                "command": f"python -m pipelines login --source {src}",
                "steps": [
                    "确认目标星球属于哪个微信号",
                    "若换号：运行上面的命令，在弹出的浏览器里用目标微信号扫码",
                    "若这个号还没加入星球：在站内先加入，再回复 Agent",
                    "Agent 会重新读取 /v2/groups 并把 group_id 写进配置",
                ],
            },
        )

    # ③ 选择器
    item_selector = str((cfg.get("daily") or {}).get("item_selector") or "")
    if not item_selector or item_selector.startswith("<"):
        raise Unavailable(
            f"{src}: 条目选择器未钉版（t3_sources.yaml::daily.item_selector = {item_selector!r}）。"
            "需先跑 `python -m pipelines login --source " + src + "` 后按真实 DOM 填上。",
            checked_scope=[f"{src}: item_selector 未钉版"],
            action={
                "kind": "dev_pin_selector",
                "who": "维护者（不是账号持有人，别去打扰老板）",
                "why": "列表条目选择器还是占位符，跑起来会抓到 0 条甚至报错",
                "needs": "登录后打开目标列表页，按真实 DOM 把 item_selector 填进配置",
                "target": "pipelines/03-卖方与共识/t3_sources.yaml",
                "steps": [
                    "先确认会话可用（login --source " + src + "）",
                    "打开目标列表页，用浏览器开发者工具选中一条条目，复制稳定的 CSS 选择器",
                    "填到 daily.item_selector / time_selector / attachment_selector",
                    "重跑 health --class 03 确认不再是 selector_not_pinned",
                ],
            },
        )

    # ④ 会话
    sess = session_of(src)
    if not sess.exists:
        raise Unavailable(
            f"{src}: 还没有会话，先跑 `python -m pipelines login --source {src}`",
            checked_scope=[f"{src}: profile/state 均不存在"],
            action={
                "kind": "login",
                "who": "账号持有人",
                "why": f"本机没有 {src} 的登录会话（首次部署或换机器后必然如此）",
                "needs": "扫码登录一次，会话会存到本地，之后不再需要人工",
                "command": f"python -m pipelines login --source {src}",
                "steps": [
                    "在仓库根目录运行上面的命令",
                    "会弹出一个浏览器窗口，用**目标账号**的手机微信扫码",
                    "看到登录成功（页面跳走 / 出现头像）后，回到 Agent 回复「已登录」",
                    "Agent 会重新探测并继续",
                ],
                "note": "会话是账号级的：扫谁的码就采谁的数据。要老板的材料就得老板本人扫。",
            },
        )

    try:
        items = list_items(src, item_selector=item_selector)
    except LoginExpired as exc:
        raise Unavailable(
            f"{src}: 登录态已过期（{exc}）。需人工重跑 login，**不要重试**。",
            checked_scope=[f"{src}: 页面回到登录页"],
            action={
                "kind": "login",
                "who": "账号持有人",
                "why": f"{src} 的会话过期了（页面已跳回登录页）",
                "needs": "重新扫码一次",
                "command": f"python -m pipelines login --source {src}",
                "steps": [
                    "运行上面的命令",
                    "在弹出的浏览器窗口重新扫码",
                    "回复 Agent「已重新登录」",
                ],
                "note": "这条 Agent 重试再多次也不会变好，只能人来。",
            },
        ) from exc
    except BrowserUnavailable as exc:
        raise Unavailable(f"{src}: 浏览器会话不可用（{exc}）") from exc

    return [f"{src}: 会话有效，列表条目 {len(items)}"]


def fetch(client: HttpClient, spec: TypeSpec, window: Window) -> Sequence[RawItem]:
    """列出当日更新 → 过滤 PDF 附件 → 逐件下载。

    `accept` 来自 `channels.yaml`（默认只要 pdf）。
    本函数只下载**列表里真实存在且有 href** 的条目；没有附件就跳过（不是失败）。
    """
    src = _source_name(spec)
    cfg = _source_cfg(spec)
    item_selector = str((cfg.get("daily") or {}).get("item_selector") or "")
    accept = [str(a).lower() for a in (spec.params.get("accept") or ["pdf"])]
    max_items = int(spec.params.get("max_items") or 20)

    try:
        items = list_items(src, item_selector=item_selector)
    except LoginExpired as exc:
        raise Unavailable(f"{src}: 登录态已过期（{exc}）", checked_scope=[f"{src}: 回到登录页"]) from exc
    except BrowserUnavailable as exc:
        raise Unavailable(f"{src}: 会话不可用（{exc}）") from exc

    out: list[RawItem] = []
    for it in items:
        href = it.get("href") or ""
        if not href:
            continue
        ext_of = href.rsplit(".", 1)[-1].lower() if "." in href else ""
        if ext_of not in accept:
            continue
        if len(out) >= max_items:
            break
        try:
            resp = client.get(href, source_id=f"t3.{src}")
        except Exception:  # noqa: BLE001 — 单个附件失败不中断整轮
            continue
        if not resp.body:
            continue
        stem = href.rsplit("/", 1)[-1] or "attachment"
        out.append(
            RawItem(
                artifact_id=f"{spec.class_id}-{spec.sub}-{window.as_of}-{_slug(stem)}",
                url=href,
                body=resp.body,
                content_type=resp.content_type,
                published_at=None,
                as_of=window.as_of,
                ext=ext_of,
                http_status=resp.status,
                extra={
                    "cat": spec.class_id,
                    "sub": spec.sub,
                    "date": window.as_of,
                    "t3source": src,
                    "title": it.get("text", "")[:200],
                    "source": source_id,
                    "provider": src,
                    "url": href,
                    "fetchedAt": window.as_of,
                    "needsExtraction": ext_of == "pdf",
                },
            )
        )
    return out


def _slug(raw: str) -> str:
    import re

    return re.sub(r"[^0-9A-Za-z._-]+", "_", raw)[:60] or "attachment"


def normalize(raw: RawItem, spec: TypeSpec) -> MaterialDraft:
    """T3 原件 → 一份一目录（**原件 + 指针说明**，抽取另行触发）。

    对 PDF 不抽正文：正文抽取必须经 MinerU（GPU 服务器），
    这里只写一份"这是哪份材料、原件在哪、还需抽取"的说明，并显式标 `needsExtraction`。
    这样下游不会误以为"材料已可读"。
    """
    src = str(raw.extra.get("t3source") or "")
    title = str(raw.extra.get("title") or raw.url.rsplit("/", 1)[-1])
    needs = bool(raw.extra.get("needsExtraction"))

    blocks: list[tuple[str, str]] = [
        (
            "来源与状态",
            "\n".join(
                [
                    f"来源: {src}（已购库，T3）",
                    f"标题/条目: {title}",
                    f"原件 URL: {raw.url}",
                    f"载体: {raw.ext.upper()}｜字节数: {len(raw.body)}",
                    ("状态: **待抽取** —— PDF 正文需经 tools/pdf-pipeline（远端 MinerU）转换后才可判读"
                     if needs
                     else "状态: 已入库（文本类载体可直接判读）"),
                    "纪律: 库内已有 ≠ 可再分发；引用只到「机构名 + 报告名 + 日期」",
                ]
            ),
        )
    ]
    text = "\n\n".join(f"## {k}\n{v}" for k, v in blocks)
    return MaterialDraft(
        material_id=raw.artifact_id,
        source_body=raw.body,
        source_ext=raw.ext,
        text=text,
        meta={
            "srcId": raw.url.rsplit("/", 1)[-1],
            "cat": spec.class_id,
            "sub": spec.sub,
            "date": str(raw.extra.get("date") or ""),
            "t3source": src,
            "title": title,
            "source": source_id,
            "provider": src,
            "url": raw.url,
            "needsExtraction": needs,
            "pageCount": len(blocks),
        },
        page_caliber="physical_page" if needs else spec.page_caliber,
        sections=blocks,
    )

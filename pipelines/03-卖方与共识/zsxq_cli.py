"""`zsxq_cli` Adapter —— 知识星球走**官方 CLI**，不抓页面。

## 为什么换掉 `t3_browser`

浏览器 fetch 打 `/v2/files/*` 会被官方拦（`code:1059 不支持非官方工具访问`），
而 `zsxq-cli` 是白名单，同一接口正常返回。所以整条链路改成：

    zsxq-cli auth login → get_user_groups → /v2/groups/{id}/topics
                        → /v2/files/{id}/download_url → 下载

优点：不用钉任何 CSS 选择器，星球改版也不受影响；登录一次长期有效。

## 与 `t3_browser` 的分工

| Adapter | 管什么 |
|---|---|
| `zsxq_cli`（本文件） | **zsxq 全部能通过官方通道拿到的星球** |
| `t3_browser` | ima 的 capability 报告；以及 zsxq 里官方通道被拒、必须走浏览器的星球 |

## PDF 的处理（重要）

本 Adapter 只把 PDF **原样落成材料指针**（`source.pdf` + 一份说明正文，
显式标 `needsExtraction: true`），**不抽正文**——抽取必须经 `tools/pdf-pipeline`（远端 MinerU）。
下游不要把它当成"已可读"。
"""

from __future__ import annotations

import re
import urllib.request
from typing import Sequence

from pipelines._kit import zsxq_api as Z
from pipelines._kit.base import RawItem, Unavailable, Window
from pipelines._kit.material import MaterialDraft

source_id = "zsxq.cli"
parser_version = "1.0"


def _slug(raw: str, *, max_len: int = 60) -> str:
    s = re.sub(r"[^0-9A-Za-z._-]+", "_", raw.strip())
    s = re.sub(r"\.{2,}", ".", s).strip("._")
    return (s[:max_len] or "file")


def probe(client, spec) -> list[str]:
    """登录 + 星球数。拿不到就 `Unavailable`（附 action：让账号持有人扫码）。"""
    try:
        who = Z.self_info()
    except SystemExit as exc:
        raise Unavailable(f"zsxq: 找不到或无法运行 zsxq-cli（{exc}）") from exc
    except Exception as exc:  # noqa: BLE001 — CLI 报错要如实转成 unavailable
        raise Unavailable(f"zsxq: zsxq-cli 调用失败（{str(exc)[:160]}）") from exc

    if not who.get("user_id"):
        raise Unavailable(
            "zsxq: 未登录（zsxq-cli 没有有效会话）",
            checked_scope=["zsxq: get_self_info 无 user_id"],
            action={
                "kind": "login",
                "who": "账号持有人",
                "why": "zsxq-cli 没有有效会话",
                "needs": "用微信扫码授权一次，之后长期有效",
                "command": "zsxq-cli auth login",
                "steps": [
                    "运行上面的命令",
                    "若浏览器已登录 zsxq，会自动确认；否则把链接发给账号持有人扫码",
                    "看到 `✓ Logged in as <昵称>` 即成功",
                    "回复 Agent「已登录」",
                ],
            },
        )

    try:
        gs = Z.groups(who["user_id"])
    except Exception as exc:  # noqa: BLE001
        raise Unavailable(f"zsxq: 拉星球列表失败（{str(exc)[:160]}）") from exc

    if not gs:
        raise Unavailable(
            f"zsxq: 账号 {who.get('name')} 名下 0 个星球",
            checked_scope=["zsxq: get_user_groups 返回空"],
            action={
                "kind": "confirm_account",
                "who": "账号持有人",
                "why": "已登录但账号没加入任何星球",
                "needs": "确认要采的星球在哪个微信号下",
                "command": "zsxq-cli auth login",
                "steps": ["确认目标星球归属哪个微信号", "换号后重跑 login", "回复 Agent"],
            },
        )

    return [f"zsxq: {who.get('name')}({who['user_id']})｜{len(gs)} 个星球"]


def fetch(client, spec, window: Window) -> Sequence[RawItem]:
    """拉 `window.as_of` 当天、带 PDF 附件的条目，并把字节下下来。

    星球范围：`params.group_ids` 给了就只抓那些；没给就抓账号下**全部**星球。
    """
    who = Z.self_info()
    if not who.get("user_id"):
        raise Unavailable("zsxq: 未登录", action={"kind": "login", "who": "账号持有人",
                                                   "needs": "扫码授权", "command": "zsxq-cli auth login"})

    wanted = [str(x) for x in (spec.params.get("group_ids") or [])]
    if not wanted:
        # ★ 这是刻意的硬拦：**型不能按星球预设**。
        #   同一个星球既可能发投行研报、也可能发访谈稿（实测 Dots 一次发两样，判型完全不同）。
        #   没配 group_ids 就抓全部再按本型入库，等于把访谈稿塞进「投行研报」。
        raise Unavailable(
            "zsxq: 该型没有配 group_ids，而 zsxq 的型必须**由内容判定**、不能按星球预设。"
            "请改走三段式：pipelines intake → Agent 判读 → pipelines ingest（见 docs/zsxq取数.md）",
            checked_scope=[f"{spec.key}: params.group_ids 为空"],
            action={
                "kind": "use_intake_flow",
                "who": "Agent 自己（不需要找人）",
                "why": "zsxq 的 PDF 属于哪个型要看内容，采集阶段无法预知",
                "needs": "改走 intake / 判读 / ingest 三段式",
                "steps": [
                    "python -m pipelines intake --as-of <日期>",
                    "读 _landing/zsxq/<日期>/_intake.json 的 items[].head 判定型",
                    "写 mapping.json（每条必须有 evidence）",
                    "python -m pipelines ingest --mapping <path>",
                ],
            },
        )

    all_groups = Z.groups(who["user_id"])
    picked = [g for g in all_groups if g["group_id"] in wanted]
    missing = set(wanted) - {g["group_id"] for g in picked}
    if missing:
        # 配了但账号里没有：如实报，不静默跳过
        print(f"  ! zsxq: 配置里的 group_ids 有 {len(missing)} 个不在账号下：{sorted(missing)}")

    max_items = int(spec.params.get("max_items") or 20)
    accept = tuple(f".{x.lower().lstrip('.')}" for x in (spec.params.get("accept") or ["pdf"]))
    as_of = window.as_of

    out: list[RawItem] = []
    for g in picked:
        gid, gname = g["group_id"], g.get("name") or gid
        try:
            ts = Z.topics(gid, limit=30)
        except Exception as exc:  # noqa: BLE001 — 单星球失败不该拖垮整型
            msg = str(exc)
            if "Skill 权限" in msg:
                print(f"  · zsxq/{gname}: 官方通道未开通（改由 t3_browser 或 zsxq_browser.py 处理）")
            else:
                print(f"  ! zsxq/{gname}: 拉主题失败 {msg[:100]}")
            continue

        for t in ts:
            created = (t.get("create_time") or "")[:10]
            if created != as_of:
                continue
            talk = t.get("talk") or {}
            title = (talk.get("title") or "").strip()
            for f in talk.get("files") or []:
                name = str(f.get("name") or "")
                if not name.lower().endswith(accept):
                    continue
                if len(out) >= max_items:
                    break
                fid = str(f.get("file_id"))
                try:
                    url = Z.download_url(fid)
                    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(req, timeout=120) as r:
                        body = r.read()
                except Exception as exc:  # noqa: BLE001
                    print(f"  ! zsxq/{gname}/{name}: 下载失败 {str(exc)[:100]}")
                    continue
                if not body:
                    print(f"  ! zsxq/{gname}/{name}: 0 字节，判失败")
                    continue
                out.append(
                    RawItem(
                        artifact_id=f"{spec.class_id}-{spec.slug}-{as_of}-{_slug(name.rsplit('.', 1)[0])}",
                        url=url.split("?")[0],
                        body=body,
                        content_type="application/pdf",
                        published_at=created,
                        as_of=as_of,
                        ext="pdf",
                        extra={
                            "t3source": "zsxq",
                            "group_id": gid,
                            "group_name": gname,
                            "title": title or name,
                            "file_name": name,
                            "file_id": fid,
                            "needsExtraction": True,
                        },
                    )
                )
    return out


def normalize(raw: RawItem, spec):
    """PDF → 一份一目录（**原件 + 指针说明**，抽取另行触发）。

    与 `t3_browser.normalize` 同口径：不抽正文，显式标 `needsExtraction`，
    免得下游把"有材料"当成"可判读"。
    """
    gname = str(raw.extra.get("group_name") or "")
    title = str(raw.extra.get("title") or "")
    fname = str(raw.extra.get("file_name") or "")

    blocks = [
        (
            "来源与状态",
            "\n".join(
                [
                    f"来源: 知识星球（已购库，T3）｜星球: {gname}",
                    f"文件: {fname}",
                    f"所属主题: {title or '(无标题)'}",
                    f"发布日: {raw.published_at}｜字节数: {len(raw.body):,}",
                    "状态: **待抽取** —— PDF 正文需经 tools/pdf-pipeline（远端 MinerU）转换后才可判读",
                    "纪律: 库内已有 ≠ 可再分发；引用只到「星球名 + 报告名 + 日期」",
                ]
            ),
        )
    ]
    text = "\n\n".join(f"## {k}\n{v}" for k, v in blocks)

    return MaterialDraft(
        material_id=f"{spec.class_id}-{spec.slug}-{raw.as_of}-{_slug(fname.rsplit('.', 1)[0])}",
        source_body=raw.body,
        source_ext="pdf",
        text=text,
        page_caliber="physical_page",
        meta={
            "cat": spec.class_id,
            "sub": spec.slug,
            "date": raw.as_of,
            "source": source_id,
            "provider": f"知识星球/{gname}",
            "url": raw.url,
            "title": title or fname,
            "fileName": fname,
            "groupId": str(raw.extra.get("group_id") or ""),
            "needsExtraction": True,
        },
    )

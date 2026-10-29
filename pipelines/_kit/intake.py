"""`_kit.intake` —— **采集但不判型**：把当天所有 PDF 拉下来，抽好正文，列成清单等人/Agent 判读。

## 为什么单独有一段"采集"

一份 PDF 属于哪个型，**由内容决定，不由它来自哪个星球决定**。
同一星球既可能发投行研报，也可能发独立研究。所以采集阶段**不许预设型**：

    intake（本模块）     →  拉到 _landing，抽正文，出清单
    Agent 读清单         →  判定每份属于哪个型，写 mapping.json
    ingest（_kit.ingest）→  按 mapping 入库到 corpus/materials

这样"型"是**读出来的**，不是"取数时猜的"。

## 落点

    pipelines/_landing/zsxq/<as-of>/
    ├── <原名>.pdf          原件（不可变）
    ├── <原名>.txt          本地抽出的正文（Agent 读它判型）
    └── _intake.json        清单：每份的星球/大小/页数/字数/前 800 字
"""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path

from . import pdf_text
from . import zsxq_api as Z

__all__ = ["intake_zsxq"]

LANDING = Path(__file__).resolve().parents[1] / "_landing" / "zsxq"


def intake_zsxq(as_of: str | None = None, *, limit_per_group: int = 30, max_pages: int = 10) -> Path:
    """拉当天全部星球的 PDF，抽正文，写 `_intake.json`。返回 manifest 路径。

    **不判定型**，也不写 `corpus/materials`——那是 `ingest` 的事。
    """
    as_of = as_of or date.today().isoformat()
    who = Z.self_info()
    if not who.get("user_id"):
        raise SystemExit("zsxq 未登录：先跑 `zsxq-cli auth login`（需账号持有人扫码一次）")

    gs = Z.groups(who["user_id"])
    dest = LANDING / as_of
    dest.mkdir(parents=True, exist_ok=True)

    items: list[dict] = []
    skipped: list[dict] = []

    for g in gs:
        gid, gname = g["group_id"], g.get("name") or gid
        try:
            # ★ 用 topics_since 翻页，不是单页 topics：单页上限 30 条，
            #   某天发帖超过 30 条的星球会漏（详见 zsxq_api.topics_since 的说明）。
            ts = Z.topics_since(gid, as_of, max_pages=max_pages, page_size=limit_per_group)
        except Z.SkillDenied:
            skipped.append({"group": gname, "reason": "官方通道未开通 Skill 权限（改走浏览器通道）"})
            continue
        except Exception as exc:  # noqa: BLE001 — 单星球失败要记下来，不能吞
            skipped.append({"group": gname, "reason": f"拉主题失败：{str(exc)[:120]}"})
            continue

        if not ts:
            # ★ 空列表要显式记录：接口 count>30 时就是"返回 200 但给空"，
            #   静默跳过会让人以为"这个星球今天没更新"（实测踩过）。
            skipped.append({"group": gname, "reason": "主题列表为空（可能被限流，或该星球无内容）"})
            continue

        for t in ts:
            if (t.get("create_time") or "")[:10] != as_of:
                continue
            talk = t.get("talk") or {}
            title = (talk.get("title") or "").strip()
            for f in talk.get("files") or []:
                name = str(f.get("name") or "")
                if not name.lower().endswith(".pdf"):
                    continue
                fid = str(f.get("file_id"))
                try:
                    body = Z.download_pdf(fid)
                except Exception as exc:  # noqa: BLE001
                    skipped.append({"group": gname, "file": name, "reason": f"下载失败：{str(exc)[:100]}"})
                    continue

                pdf = dest / name
                pdf.write_bytes(body)
                try:
                    txt = pdf_text.extract(pdf)
                except Exception as exc:  # noqa: BLE001 — 打不开就报，不当空文档
                    skipped.append({"group": gname, "file": name, "reason": f"PDF 打不开：{str(exc)[:100]}"})
                    continue
                (dest / f"{name}.txt").write_text(txt.text, encoding="utf-8")

                items.append(
                    {
                        "file": name,
                        "group": gname,
                        "group_id": gid,
                        "topic_title": title[:80],
                        "bytes": len(body),
                        "pages": txt.pages,
                        "chars": txt.chars,
                        "needs_external": txt.needs_external,
                        "text_file": f"{name}.txt",
                        "head": txt.head,
                    }
                )
                flag = " ⚠️抽不出字" if txt.needs_external else ""
                print(f"  ✓ {gname} / {name}  {len(body):,}B · {txt.pages}页 · {txt.chars}字{flag}")

    manifest = {
        "as_of": as_of,
        "source": "zsxq",
        "account": f"{who.get('name')} ({who['user_id']})",
        "dir": str(dest),
        "count": len(items),
        "items": items,
        "skipped": skipped,
        "next": "读 items[].head 判定每份的型，写 mapping.json，再跑 `python -m pipelines ingest`",
    }
    path = dest / "_intake.json"
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding="utf-8")

    print(f"\n采集 {len(items)} 份｜跳过 {len(skipped)} 条")
    print(f"清单：{path}")
    return path

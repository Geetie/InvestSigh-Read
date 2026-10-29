# -*- coding: utf-8 -*-
"""把真实 Agent 产物（投行研报 12 件）解析成 dashboard 的台账格式。

真源：system/env/meta/test/2026-10-22-投行研报-12件/
  · 规格_栏目.json  —— 27 个栏目（S00–S26），决定矩阵的「行」
  · 输出/R*.md      —— 12 份真实结果，决定矩阵的「列」与每一格的读数

口径：
  · 栏目缺席 = 该材料没采到 → 矩阵里留空（不是「没读到」）
  · 每格的文本取自该段「登记」字段，去掉 markdown 强调符号，保留原文
输出：data/real/broker-research.json
"""
import json
import re
from pathlib import Path

ROOT = Path(r"D:/InvestSigh/system/env/meta/test/2026-10-22-投行研报-12件")
OUT = Path(__file__).resolve().parents[1] / "data" / "real" / "broker-research.json"

BROKERS = ["巴克莱", "高盛", "摩根士丹利", "摩根大通", "瑞银", "美银", "花旗", "德意志",
           "杰富瑞", "Piper", "Wedbush", "伯恩斯坦", "中金", "中信", "野村", "麦格理"]


def clean(text: str) -> str:
    t = re.sub(r"\*\*(.+?)\*\*", r"\1", text)
    t = re.sub(r"`([^`]*)`", r"\1", t)
    t = re.sub(r"\n{2,}", " ", t)
    t = re.sub(r"[ \t]+", " ", t)
    return t.strip()


def parse_sections(body: str) -> dict:
    """按 `## Sxx 标题` 切段，取每段的 登记 / 页码 / 档位。"""
    parts = re.split(r"\n##\s+(S\d+)\s*(.*)\n", body)
    out = {}
    # parts: [head, id1, title1, content1, id2, title2, content2, ...]
    for i in range(1, len(parts) - 2, 3):
        sid, title, content = parts[i], parts[i + 1].strip(), parts[i + 2]
        reg = re.search(r"\*\*登记\*\*[：:]\s*(.+?)(?=\n\*\*|\n---|\Z)", content, re.S)
        body_text = clean(reg.group(1)) if reg else ""
        if not body_text:
            # 有些栏目只有表格：把表格行压成一句
            rows = re.findall(r"^\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.*?)\s*\|$", content, re.M)
            rows = [r for r in rows if r[0] not in ("要件", "项", "---", "") and not set(r[0]) <= {"-", " "}]
            body_text = "；".join(f"{a}：{b}" for a, b, _ in rows if b)
        page = re.search(r"\*\*页码范围\*\*[：:]\s*(.+)", content)
        tier = re.search(r"\*\*档位\*\*[：:]\s*(.+)", content)
        if body_text:
            out[sid] = {
                "text": body_text,
                "page": clean(page.group(1)) if page else "",
                "tier": clean(tier.group(1)) if tier else "",
                "title": title,
            }
    return out


def pick(pattern, text, default=""):
    m = re.search(pattern, text)
    return m.group(1) if m else default


def main():
    spec = json.loads((ROOT / "规格_栏目.json").read_text(encoding="utf-8"))
    rows = []
    for s in spec["sections"]:
        rows.append({
            "id": s["id"],
            "label": s["title"],
            "kind": "data" if s.get("table") else "question",
            "fill": "likely",
        })

    materials = []
    for f in sorted((ROOT / "输出").glob("R*.md")):
        raw = f.read_text(encoding="utf-8")
        h1 = raw.split("\n", 1)[0].lstrip("# ").strip()
        name = re.sub(r"^R\d+\s*·\s*", "", h1)
        name = re.sub(r"（原文件名[:：].*?）\s*$", "", name).strip()

        rid = pick(r"^(R\d+)", f.name)
        date = pick(r"(20\d{2}-\d{2}-\d{2})", f.name, "2026-08-01")
        secs = parse_sections(raw)

        s00 = secs.get("S00", {}).get("text", "")
        time = pick(r"发布\s*\S+\s*(\d{1,2}:\d{2})", s00) or pick(r"(\d{1,2}:\d{2})\s*GMT", s00) or "08:30"
        broker = next((b for b in BROKERS if b in (s00 + name)), "")
        ticker = next((t for t in ["Meta", "Alphabet", "Amazon", "NVIDIA", "Microsoft", "Apple",
                                   "Broadcom", "Netflix", "Tesla"] if t in (s00 + name)), "")

        cells = {sid: v["text"] for sid, v in secs.items() if v["text"]}
        materials.append({
            "id": f"03-broker-research-{rid}",
            "cat": "03",
            "sub": "broker-research",
            "name": name,
            "kind": "手稿",
            "issuer": broker,
            "ticker": ticker,
            "date": date,
            "time": time,
            "cells": cells,
            "filled": len(cells),
            "total": len(rows),
            "pageCount": sum(len(v["page"]) for v in secs.values()),
        })

    materials.sort(key=lambda m: (m["date"], m["time"]))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "cat": "03",
        "sub": "broker-research",
        "source": str(ROOT),
        "rows": rows,
        "materials": materials,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")

    filled = sum(m["filled"] for m in materials)
    total = len(materials) * len(rows)
    print(f"rows={len(rows)} materials={len(materials)} cells={filled}/{total} ({filled*100//total}%)")
    for m in materials:
        print(f"  {m['id']:26s} {m['date']} {m['time']} {m['filled']:2d}/{len(rows)}  {m['name'][:34]}")


if __name__ == "__main__":
    main()

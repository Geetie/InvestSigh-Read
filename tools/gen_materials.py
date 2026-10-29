# -*- coding: utf-8 -*-
"""生成 Dashboard 展示用材料台账（materials.json）。

口径（对应用户诉求）：
- 七类 29 细分型；每型每天可能 1 份或多份材料
- Agent 按该型"需要回答的问题 / 需要收集的数据"原子化拆分
- 每份材料逐行如实填格：材料给不了的行 -> 不填（矩阵里留空）

输入：data/extracted/0X.json
输出：data/materials.json
"""
import json
import re
import hashlib
import random
import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXT = ROOT / "data" / "extracted"
OUT = ROOT / "data" / "materials.json"
BUNDLE = ROOT / "public" / "data" / "bundle.json"

WIN_START = datetime.date(2026, 9, 23)
WIN_END = datetime.date(2026, 10, 22)

TICKERS = [
    ("Apple", "AAPL"), ("NVIDIA", "NVDA"), ("Amazon", "AMZN"), ("Microsoft", "MSFT"),
    ("Alphabet", "GOOGL"), ("Meta", "META"), ("Tesla", "TSLA"), ("Netflix", "NFLX"),
    ("Broadcom", "AVGO"), ("Taiwan Semi", "TSM"), ("Adobe", "ADBE"),
    ("Palantir", "PLTR"), ("Costco", "COST"), ("Micron", "MU"), ("Qualcomm", "QCOM"),
    ("Salesforce", "CRM"), ("Oracle", "ORCL"), ("Block", "SQ"), ("Snowflake", "SNOW"),
    ("Dell", "DELL"), ("Arista", "ANET"), ("Marvell", "MRVL"), ("Vertiv", "VRT"),
]

BROKERS = ["高盛", "摩根士丹利", "瑞银", "摩根大通", "美银", "巴克莱", "野村", "中金", "中信里昂"]
PEERS = ["Apple", "Microsoft", "Alphabet", "Amazon", "Meta", "Netflix", "Broadcom", "Oracle"]
PEOPLE = ["J. Cook", "T. Cook", "J. Huang", "S. Jobs", "M. Zuckerberg", "A. Nadella",
          "J. Y. Lee", "R. Okafor", "D. Whitfield", "K. Nakamura", "L. Marsh"]
MANAGERS = ["先锋", "贝莱德", "富达", "Capital Group", "桥水", "老虎环球", "淡马锡", "高瓴"]
AGENCIES = ["SEC", "Fed", "Treasury", "BIS", "FSB", "DOJ", "FTC", "NSA", "财政部", "发改委"]
SEGMENTS = ["先进制程", "HBM", "CoWoS 封装", "光模块", "液冷", "电源", "服务器整机", "IDC", "AI 应用层", "网络设备"]
VENDORS = ["Sensor Tower", "Similarweb", "Planescape", "TaraPods", "Appfigures", "Kpler", "Windward"]
INDICATORS = ["CPI", "核心 PCE", "非农", "PMI", "联邦基金期货", "盈亏平衡通胀", "国债发行", "期限利差"]
TOPICS = ["算力资本开支", "数据中心电力", "出口管制", "反垄断", "关税", "供应链去风险", "回购计划", "管理层指引",
          "并购审查", "气候披露", "芯片补贴", "AI 监管", "价格战", "渠道库存"]
PEOPLE_CO = ["中信", "中金", "华泰", "招商", "国泰君安", "广发"]
QUARTERS = ["2025Q4", "2026Q1", "2026Q2", "2026Q3"]
FISCAL = ["FY2025", "FY2026"]

# 子型 -> (载体类型, 名称模板列表, 覆盖率系数)
# 覆盖率 = 这类材料"通常能填满该型问题清单"的比例，用于制造真实的缺格
SUBSPEC = {
    "10-K": ("卷宗", ["{issuer} 10-K {fy} 全文（Item 1-16 与全部附注）",
                    "{issuer} 10-K {fy} 全文（附注与审计报告段）",
                    "{issuer} 10-K {fy} · Item 15 展品索引"], 0.92),
    "10-Q": ("卷宗", ["{issuer} 10-Q {q} 全文", "{issuer} 10-Q {q} · Part I 财务与 Part II 其他信息"], 0.85),
    "8-K与EX-99.1": ("闪电", ["{issuer} 8-K {md} + EX-99.1 {topic}",
                        "{issuer} 8-K {md} Item 2.02 业绩发布", "{issuer} 8-K {md} 重大事项"], 0.72),
    "委托书": ("卷宗", ["{issuer} 委托书 DEF 14A {fy} 全文", "{issuer} 代理声明 · 薪酬与持股方案"], 0.68),
    "招股书": ("卷宗", ["{issuer} 招股书 S-1 全文", "{issuer} S-1/A 修订稿 · {topic}"], 0.6),
    "其他条目与红灯": ("闪电", ["{issuer} 20-F 年报 {fy}", "{issuer} 6-K 外方披露 {md}",
                          "{issuer} 8-K 非业绩条目 · {topic}"], 0.5),
    "company-voice": ("讲稿", ["{issuer} 业绩电话会 准备稿 + 问答 {q}", "{issuer} 业绩演示材料 {q}",
                          "{issuer} 8-K Item 2.02 指引原文 {q}"], 0.8),
    "third-party": ("评述", ["{issuer} 业绩点评 {topic}", "{issuer} 季报复盘 · 假设表与情景"], 0.66),
    "cross-read": ("旁证", ["{peer} 业绩说明会旁证 {q}", "{peer} 同期披露 · 同口径对照"], 0.5),
    "broker-research": ("报刊", ["{issuer} 业绩点评与模型更新 {broker}", "{issuer} 深度报告 · {topic} {broker}"], 0.72),
    "independent-research": ("手稿", ["{issuer} 独立研究 · {topic}", "{issuer} 产业链拆解笔记"], 0.55),
    "consensus-ratings": ("面板", ["共识面板 {issuer} {md}", "评级与目标价分布快照 {issuer}"], 0.85),
    "expert-channel": ("纪要", ["{issuer} 渠道专家纪要 · {topic}", "{issuer} 专家电话会记录 {topic}"], 0.45),
    "media-analysis": ("报道", ["{issuer} 媒体深度报道 · {topic}", "{issuer} 财经长文 · {topic}"], 0.42),
    "insider-filing": ("印章", ["Form 4 · {person} {issuer} {md}", "Form 4 汇总 · {issuer} {md}"], 0.75),
    "institutional-holding": ("表格", ["13F 聚合 · {manager} {q}", "13F 机构持仓 · {manager} {q}"], 0.62),
    "short-option": ("六边", ["做空与期权读数 {issuer} {md}", "空头四件套快照 {issuer} {md}"], 0.35),
    "chain-map": ("骨架", ["{seg} 产业链骨架 v{ver}", "{seg} 上下游环节图谱 v{ver}"], 0.7),
    "chain-tracking": ("轨道", ["{issuer} {seg} 量价跟踪 {md}", "{seg} 环节产能与订单跟踪 {md}"], 0.78),
    "alt-data": ("波形", ["{vendor} 另类数据 · {topic} {md}", "{vendor} 投入侧观测 · {topic}"], 0.6),
    "policy-regulation": ("公文", ["{agency} · {topic} {md}", "{agency} 规则文本与生效口径 {md}"], 0.7),
    "macro-cycle": ("波形", ["{ind} {mm} 月度读数", "{ind} 修正值与分项 {md}"], 0.82),
    "fiscal-debt": ("公文", ["{agency} {issue} 发行计划 {md}", "国债供给与期限结构 {md}"], 0.65),
    "consensus-gap": ("面板", ["共识快照 {issuer} {md}", "一致预期与修正 · {issuer}"], 0.85),
    "option-vol": ("六边", ["期权链与波动率 {issuer} {md}", "隐含波动率曲面 {issuer} {md}"], 0.68),
    "rates-inflation": ("波形", ["{ind} 预期读数 {md}", "通胀预期与政策路径 {md}"], 0.72),
    "position-flow": ("轨道", ["{src} 仓位读数 {md}", "资金流与拥挤度 {md}"], 0.6),
    "sentiment-survey": ("面板", ["{vendor} 情绪调查 {mm}", "态度族与动作族读数 {md}"], 0.7),
    "prediction-market": ("菱形", ["事件合约报价 · {topic} {md}", "事件概率与跨平台价差 {md}"], 0.55),
}

SOURCES = ["CFTC COT", "EPFR 基金流", "主经纪商 PB", "FMS 问卷", "13F 聚合"]


def h(*parts) -> int:
    return int(hashlib.md5("|".join(str(p) for p in parts).encode("utf-8")).hexdigest()[:8], 16)


def jitter(text: str, seed: int) -> str:
    rng = random.Random(seed)

    def repl(m):
        raw = m.group(0)
        try:
            val = float(raw)
        except ValueError:
            return raw
        if "." in raw:
            dec = len(raw.split(".")[1])
            delta = round(rng.uniform(-0.15, 0.15) * max(1.0, abs(val) * 0.05), dec)
            if delta == 0:
                delta = round(0.1 ** dec, dec)
            out = round(val + delta, dec)
            if out <= 0:
                out = round(abs(val) * 0.9, dec)
        else:
            delta = int(rng.uniform(-0.13, 0.13) * max(1, abs(val)))
            if delta == 0:
                delta = 1 if val else 0
            out = int(val + delta)
        return f"{out}"

    return re.sub(r"(?<![A-Za-z0-9.])(\d+(?:\.\d+)?)", repl, text)


def build_name(tpl: str, ctx: dict) -> str:
    out = tpl
    for k, v in ctx.items():
        out = out.replace("{" + k + "}", str(v))
    return out


def main():
    cats = []
    for f in sorted(EXT.glob("*.json")):
        with open(f, encoding="utf-8") as fh:
            cats.append(json.load(fh))

    span = (WIN_END - WIN_START).days
    materials = []
    for cat in cats:
        for sub in cat["subtypes"]:
            sub_id = sub["id"]
            kind, templates, cover = SUBSPEC.get(sub_id, ("面板", ["{issuer} 材料 {md}"], 0.6))
            target = 38 + len(sub["materials"]) * 2
            rng = random.Random(h(cat["id"], sub_id, "v2"))
            # 时间线窗口内约 85% 的日子有材料；工作日优先，周末稀疏
            n_days = max(6, int((span + 1) * 0.85))
            weekdays = [i for i in range(span + 1)
                        if (WIN_START + datetime.timedelta(days=i)).weekday() < 5]
            weekends = [i for i in range(span + 1)
                        if (WIN_START + datetime.timedelta(days=i)).weekday() >= 5]
            n_week = min(len(weekdays), max(1, int(n_days * 0.88)))
            n_end = min(len(weekends), max(0, n_days - n_week))
            days = sorted(rng.sample(weekdays, n_week) + rng.sample(weekends, n_end))
            # 每天 1~3 份：先保底 1 份，余量随机撒到各处（避免「前密后疏」）
            per_day = [1] * len(days)
            left = max(0, target - len(days))
            guard = 0
            while left > 0 and guard < 10000:
                guard += 1
                i = rng.randrange(len(days))
                if per_day[i] < 3:
                    per_day[i] += 1
                    left -= 1

            used_slots = set()
            idx = 0
            for di, n in zip(days, per_day):
                d = WIN_START + datetime.timedelta(days=di)
                for _ in range(n):
                    ctx = {
                        "issuer": TICKERS[rng.randrange(len(TICKERS))][0],
                        "ticker": "",
                        "md": f"{d.month}.{d.day}",
                        "mm": f"{d.month} 月",
                        "fy": FISCAL[rng.randrange(len(FISCAL))],
                        "q": QUARTERS[rng.randrange(len(QUARTERS))],
                        "broker": BROKERS[rng.randrange(len(BROKERS))],
                        "peer": PEERS[rng.randrange(len(PEERS))],
                        "person": PEOPLE[rng.randrange(len(PEOPLE))],
                        "manager": MANAGERS[rng.randrange(len(MANAGERS))],
                        "agency": AGENCIES[rng.randrange(len(AGENCIES))],
                        "seg": SEGMENTS[rng.randrange(len(SEGMENTS))],
                        "vendor": VENDORS[rng.randrange(len(VENDORS))],
                        "ind": INDICATORS[rng.randrange(len(INDICATORS))],
                        "src": SOURCES[rng.randrange(len(SOURCES))],
                        "topic": TOPICS[rng.randrange(len(TOPICS))],
                        "ver": rng.randint(2, 9),
                        "issue": ["国债", "特别国债", "地方债", "票据"][rng.randrange(4)],
                    }
                    if sub_id in ("chain-map",):
                        ctx["issuer"] = ctx["seg"]
                    tpl = templates[rng.randrange(len(templates))]
                    name = build_name(tpl, ctx)
                    for orig in sub["materials"]:
                        if orig not in [m["name"] for m in materials]:
                            name = orig
                            break
                    issuer, ticker = next(((c, t) for c, t in TICKERS if c in name), (ctx["issuer"], ""))

                    # 时刻：交易/披露时段
                    hh = rng.choice([7, 8, 9, 16, 17, 20, 21])
                    mm = rng.choice([0, 10, 15, 20, 25, 30, 35, 40, 45, 50])
                    slot = (d, hh, mm)
                    bump = 0
                    while slot in used_slots and bump < 30:
                        bump += 1
                        mm = (mm + 5) % 60
                        if mm == 0:
                            hh = (hh + 1) % 24
                        slot = (d, hh, mm)
                    used_slots.add(slot)

                    seed = h(cat["id"], sub_id, name, idx)
                    cov = cover * rng.uniform(0.8, 1.15)
                    cov = min(1.0, cov)
                    cells = {}
                    for row in sub["rows"]:
                        base = {"likely": 0.9, "sometimes": 0.52, "rare": 0.18}[row["fill"]]
                        if row["kind"] == "data":
                            base *= 0.95
                        row_seed = h(sub_id, row["id"])
                        corr = 0.7 if (row_seed % 100) < 40 else 1.05
                        p = min(0.97, base * cov * corr)
                        if rng.random() < p:
                            cells[row["id"]] = jitter(row["valueHint"], seed + h(row["id"]))

                    materials.append({
                        "id": f"{cat['id']}-{sub_id}-{idx + 1:03d}",
                        "cat": cat["id"],
                        "sub": sub_id,
                        "name": name,
                        "kind": kind,
                        "issuer": issuer,
                        "ticker": ticker,
                        "date": d.isoformat(),
                        "time": f"{hh:02d}:{mm:02d}",
                        "cells": cells,
                        "filled": len(cells),
                        "total": len(sub["rows"]),
                    })
                    idx += 1

    materials.sort(key=lambda m: (m["date"], m["time"], m["id"]))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump({"window": [WIN_START.isoformat(), WIN_END.isoformat()],
                   "materials": materials}, fh, ensure_ascii=False, separators=(",", ":"))

    # 浏览器端 bundle：类别/细分型/行定义 + 材料台账
    bundle = {"window": [WIN_START.isoformat(), WIN_END.isoformat()], "categories": [], "materials": materials}
    for cat in cats:
        c = {"id": cat["id"], "name": cat["name"], "oneLiner": cat.get("oneLiner", ""), "subtypes": []}
        for sub in cat["subtypes"]:
            c["subtypes"].append({
                "id": sub["id"], "name": sub["name"], "oneLiner": sub.get("oneLiner", ""),
                "rows": [{"id": r["id"], "label": r["label"], "kind": r["kind"], "fill": r["fill"]} for r in sub["rows"]],
            })
        bundle["categories"].append(c)
    BUNDLE.parent.mkdir(parents=True, exist_ok=True)
    with open(BUNDLE, "w", encoding="utf-8") as fh:
        json.dump(bundle, fh, ensure_ascii=False, separators=(",", ":"))

    filled = sum(m["filled"] for m in materials)
    total = sum(m["total"] for m in materials)
    size = OUT.stat().st_size
    by_cat = {}
    for m in materials:
        by_cat[m["cat"]] = by_cat.get(m["cat"], 0) + 1
    print(f"materials={len(materials)} cells={filled}/{total} ({filled*100//total}%) size={size//1024}KB")
    print(by_cat)
    days = {}
    for m in materials:
        days.setdefault(m["date"], 0)
        days[m["date"]] += 1
    print("active days:", len(days), "max per day:", max(days.values()))


if __name__ == "__main__":
    main()

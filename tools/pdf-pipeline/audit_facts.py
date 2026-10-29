# -*- coding: utf-8 -*-
"""实质抽查：把答案里的关键数字回原文核对（不是格式，是事实）。

抽 3 份已填材料，从答案正文里抓「数字+量纲」，去该材料的 pages.json 全文里找。
找不到的列出来 —— 那可能是编的、也可能是换算过的，逐条人工判。
"""
import json
import re
from pathlib import Path

READ = Path(__file__).resolve().parents[2]  # 从脚本位置推导，跨机器可用
OUT = READ / 'output' / 'meta'
MAT = READ / 'corpus' / 'materials'

SEC = re.compile(r'^## (Q?[\w-]+) · .*?\n(.*?)(?=^## |\Z)', re.M | re.S)
NUM = re.compile(r'\d[\d,]*(?:\.\d+)?\s*(?:%|％|倍|x|亿|百万|万|bp|bps|\$)')
BLOCK = re.compile(r'^-\s*p\.(\d+)\s*[｜|]\s*(.+)$', re.M)

SAMPLES = [
    '01-8-K与EX-99.1-2026-10-21-meta20261019',
    '02-cross-read-2026-08-11-Sea2026Q2业绩会纪要',
    '03-expert-channel-2026-05-31-对Meta模型的理解',
]


def load(mid):
    pj = MAT / mid / 'pages.json'
    if not pj.exists():
        return None
    d = json.loads(pj.read_text('utf-8'))
    return '\n'.join(p.get('text') or '' for p in d.get('pages') or [])


def norm(s):
    return re.sub(r'\s+', '', s)


for mid in SAMPLES:
    md = OUT / mid / 'material.md'
    page = load(mid)
    if not md.exists() or page is None:
        print(f'--- {mid[:50]} 缺文件')
        continue
    t = md.read_text(encoding='utf-8')
    np_ = norm(page)
    print(f'\n=== {mid[:52]}')

    miss = []
    for m in SEC.finditer(t):
        rid, body = m.group(1), m.group(2)
        ans = body.split('### 依据')[0]
        for num in NUM.findall(ans):
            v = num.strip()
            core = re.sub(r'[^\d.]', '', v.split('%')[0].split('倍')[0].split('亿')[0])
            if not core or len(core) < 2:
                continue
            if norm(core) in np_:
                continue
            miss.append((rid, v))

    print(f'  正文数字 {len(NUM.findall(t))} 个 | 在原文找不到 {len(miss)} 个')
    seen = set()
    for rid, v in miss:
        if (rid, v) in seen:
            continue
        seen.add((rid, v))
        if len(seen) <= 12:
            print(f'    {rid:<4} {v}')

#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""最后 11 块：4.0 把合并单元格拆成了多行，旧块是合并写法。

例：
  旧块  `<td>Stock Rating Industry View</td><td>Overweight Attractive</td>`
  4.0   `<tr><td>Stock Rating</td><td>Overweight</td></tr><tr><td>Industry View</td><td>Attractive</td></tr>`

内容都在，只是**结构不同**。做法：抽块里的**文字 token**（去标签、按空格切），
在页里找包含这些 token 的**连续 <tr> 序列**，整段作为新块。
"""
import json
import re
import sys
from pathlib import Path

READ = Path(__file__).resolve().parents[2]  # 从脚本位置推导，跨机器可用
MAT = READ / 'corpus' / 'materials'
OUT = READ / 'output' / 'meta'
BLOCK = re.compile(r'^-\s*p\.(\d+)\s*[｜|]\s*(.+)$', re.M)


def tokens(s):
    s = re.sub(r'<[^>]+>', ' ', s)
    s = re.sub(r'&[a-z]+;', ' ', s)
    return [t for t in re.split(r'[\s,;]+', s) if len(t) >= 2]


def pages_of(mid):
    pj = MAT / mid / 'pages.json'
    if not pj.exists():
        return {}
    d = json.loads(pj.read_text('utf-8'))
    return {p['n']: p['text'] for p in d.get('pages') or []}


def do(mid, dry=False):
    mp = OUT / mid / 'material.md'
    if not mp.exists():
        return None
    text = mp.read_text(encoding='utf-8')
    P = pages_of(mid)
    fixed = 0
    unres = []

    def repl(m):
        nonlocal fixed
        n = int(m.group(1))
        q = m.group(2).strip()
        kq = re.sub(r'\s+', '', q)
        # 已可核
        if kq and kq in re.sub(r'\s+', '', P.get(n, '')):
            return m.group(0)
        qt = tokens(q)
        if len(qt) < 2:
            unres.append((n, q[:50]))
            return m.group(0)
        # 全篇找：包含最多 token 的连续 <tr> 段
        best = None
        for pn, pt in P.items():
            rows = re.findall(r'<tr>[\s\S]*?</tr>', pt, re.I)
            for i in range(len(rows)):
                acc = ''
                hit = set()
                for j in range(i, min(i + 4, len(rows))):
                    acc += rows[j]
                    hit |= {t for t in qt if t.lower() in acc.lower()}
                    sc = len(hit) / len(qt)
                    if sc >= 0.7:
                        if best is None or sc > best[0]:
                            best = (sc, pn, acc)
                        break
        if best:
            fixed += 1
            return f'- p.{best[1]}｜{best[2]}'
        unres.append((n, q[:50]))
        return m.group(0)

    t2 = BLOCK.sub(repl, text)
    if not dry and t2 != text:
        mp.write_text(t2, encoding='utf-8')
    return (fixed, unres)


if __name__ == '__main__':
    dry = '--dry-run' in sys.argv
    ids = sorted(p.name for p in OUT.iterdir() if p.is_dir())
    T = 0
    U = []
    for mid in ids:
        r = do(mid, dry)
        if r and (r[0] or r[1]):
            T += r[0]
            print(f'  {mid[:52]:<54} 修 {r[0]:>2} 未决 {len(r[1]):>2}')
            U.extend((mid, n, q) for n, q in r[1])
    print(f'\n修 {T} | 未决 {len(U)}')
    for mid, n, q in U[:12]:
        print(f'  {mid[-30:]:<32} p{n:<3} {q}')

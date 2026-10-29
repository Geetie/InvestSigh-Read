#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""4.0 换文本后，按新 pages.json 校正失效的依据块。

换引擎后两类变化导致失效：
  1. **页码变了**：4.0 的页数与 3.0.4 不同（如 90 页 vs 20 页），旧块写的 `p.6` 可能是 `p.23`
  2. **表格载体变了**：4.0 的 VLM 把表格转成 `<table>` 文本或纯文本，旧块抄的 `<td>` 片段对不上

校正策略（从严到宽，找到即停，**不改答案只改依据**）：
  A. 原页逐字 → 不动
  B. **全篇**逐字找（处理页码位移）→ 改成新页号
  C. 同页 / 全篇按**数字序列**匹配（处理表格载体变化）
  D. 全篇按**字母骨架**匹配（处理单词粘连）
  E. 都失败 → 记 unresolved，交人工，不删不猜

用法：
    PYTHONUTF8=1 python fix_evidence_v4.py            # 全部失效的
    PYTHONUTF8=1 python fix_evidence_v4.py --dry-run  # 只看不改
"""
import json
import re
import sys
from pathlib import Path

READ = Path(__file__).resolve().parents[2]  # 从脚本位置推导，跨机器可用
MAT = READ / 'corpus' / 'materials'
OUT = READ / 'output' / 'meta'
BLOCK = re.compile(r'^-\s*p\.(\d+)\s*[｜|]\s*(.+)$', re.M)
NUM = re.compile(r'-?\d[\d,]*(?:\.\d+)?')


def nk(s):
    t = re.sub(r'\s+', '', str(s).replace('\r', '').replace('\u00a0', ' '))
    for a, b in [('“', '"'), ('”', '"'), ('„', '"'), ('‟', '"'), ('＂', '"'), ('‘', "'"), ('’', "'")]:
        t = t.replace(a, b)
    return t


def skel(s):
    t = re.sub(r'[^0-9a-z]', '', str(s).lower())
    return re.sub(r'(.)\1+', r'\1', t)


def nums(s):
    return {m.replace(',', '') for m in NUM.findall(s) if len(m.replace(',', '')) >= 2}


def pages_of(mid):
    pj = MAT / mid / 'pages.json'
    if not pj.exists():
        return {}
    d = json.loads(pj.read_text('utf-8'))
    return {p['n']: p['text'] for p in d.get('pages') or []}


def fix_one(mid, dry=False):
    mp = OUT / mid / 'material.md'
    if not mp.exists():
        return None
    text = mp.read_text(encoding='utf-8')
    P = pages_of(mid)
    if not P:
        return None

    stats = {'ok': 0, 'page_moved': 0, 'by_num': 0, 'by_skel': 0, 'unresolved': 0}
    unres = []
    line_span = {}

    def repl(m):
        n = int(m.group(1))
        q = m.group(2).strip()
        page = P.get(n, '')
        # A
        if nk(q) and nk(q) in nk(page):
            stats['ok'] += 1
            return m.group(0)
        # B: 全篇逐字（页码位移）
        for pn, pt in P.items():
            if nk(q) and nk(q) in nk(pt):
                stats['page_moved'] += 1
                return f'- p.{pn}｜{q}'
        # B2: 全篇逐行（取整行）
        for pn, pt in P.items():
            for ln in pt.split('\n'):
                s = ln.strip()
                if len(s) >= 20 and nk(q) and nk(q) in nk(s):
                    stats['page_moved'] += 1
                    return f'- p.{pn}｜{s}'
        # C: 数字序列
        qn = nums(q)
        if len(qn) >= 2:
            best = None
            for pn, pt in P.items():
                for ln in pt.split('\n'):
                    s = ln.strip()
                    if len(s) < 12:
                        continue
                    inter = len(qn & nums(s))
                    sc = inter / len(qn)
                    if sc >= 0.6 and inter >= 2:
                        if best is None or sc > best[0]:
                            best = (sc, pn, s)
            if best:
                stats['by_num'] += 1
                return f'- p.{best[1]}｜{best[2]}'
        # D: 骨架
        kq = skel(q)[:60]
        if len(kq) >= 12:
            for pn, pt in P.items():
                joined = ' '.join(ln.strip() for ln in pt.split('\n') if ln.strip())
                if kq in skel(joined):
                    # 回取覆盖该位置的行
                    for ln in pt.split('\n'):
                        s = ln.strip()
                        if len(s) >= 15 and skel(s)[:30] and skel(s)[:30] in kq:
                            stats['by_skel'] += 1
                            return f'- p.{pn}｜{s}'
                    stats['by_skel'] += 1
                    return f'- p.{pn}｜{joined[:220]}'
        stats['unresolved'] += 1
        unres.append((n, q[:60]))
        return m.group(0)

    t2 = BLOCK.sub(repl, text)
    if not dry and t2 != text:
        mp.write_text(t2, encoding='utf-8')
    stats['unresolved_list'] = unres
    return stats


def main():
    dry = '--dry-run' in sys.argv
    ids = [p.name for p in sorted(OUT.iterdir()) if p.is_dir()]
    tot = {'ok': 0, 'page_moved': 0, 'by_num': 0, 'by_skel': 0, 'unresolved': 0}
    touched = 0
    allunres = []
    for mid in ids:
        r = fix_one(mid, dry)
        if not r:
            continue
        changed = r['page_moved'] + r['by_num'] + r['by_skel']
        if changed or r['unresolved']:
            touched += 1
            print(f'  {mid[:52]:<54} 位移{r["page_moved"]:>3} 数字{r["by_num"]:>3} '
                  f'骨架{r["by_skel"]:>3} 未决{r["unresolved"]:>3}')
        for k in ('ok', 'page_moved', 'by_num', 'by_skel', 'unresolved'):
            tot[k] += r[k]
        allunres.extend((mid, n, q) for n, q in r['unresolved_list'])

    print(f'\n汇总: 原样 {tot["ok"]} | 页码位移 {tot["page_moved"]} | '
          f'数字匹配 {tot["by_num"]} | 骨架 {tot["by_skel"]} | 未决 {tot["unresolved"]}')
    print(f'触及材料 {touched} 份')
    if allunres:
        print(f'\n未决 {len(allunres)} 块（前 10）：')
        for mid, n, q in allunres[:10]:
            print(f'  {mid[-32:]:<34} p{n:<3} {q}')
    if dry:
        print('\n[dry-run] 未写入')
    return 0


if __name__ == '__main__':
    sys.exit(main())

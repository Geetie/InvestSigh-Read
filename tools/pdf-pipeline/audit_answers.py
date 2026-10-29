# -*- coding: utf-8 -*-
"""独立审计：不采信 agent 自述，自己查四件事。

1. **空答案也报 OK** —— 复现这个盲区，证明 check.mjs 不能当完成判据
2. **阳性对照** —— 捏造一条引文，必须报 unverified
3. **正文偷写页码** —— 规范禁止，扫全库
4. **两字交差 / 过短答案** —— 粒度不合格
5. **依据块与答案不匹配** —— 块数 1 但答案几千字
"""
import json
import re
import subprocess
import sys
import tempfile
import shutil
from pathlib import Path

READ = Path(__file__).resolve().parents[2]  # 从脚本位置推导，跨机器可用
OUT = READ / 'output' / 'meta'
MAT = READ / 'corpus' / 'materials'

SEC = re.compile(r'^## (Q?[\w-]+) · .*?\n(.*?)(?=^## |\Z)', re.M | re.S)
BLOCK = re.compile(r'^-\s*p\.(\d+)\s*[｜|]\s*(.+)$', re.M)
PAGE_IN_BODY = re.compile(r'第\s*\d+\s*页|\[p\.\d+\]|p\.\d+\s*里')
# 与 parse-md.mjs 保持一致：占位符不是答案（2026-10-28 两边同时修）
PLACEHOLDER = re.compile(r'^<.*>$|^在此填写|^待填写|^…$|^\.\.\.$|^TODO$', re.M)


def main_parse(md):
    """答案区去掉占位符行 —— 否则空骨架会被算成「有答案」。"""
    t = md.read_text(encoding='utf-8')
    out = []
    for m in SEC.finditer(t):
        rid, body = m.group(1), m.group(2)
        ans = body.split('### 依据')[0]
        ans = '\n'.join(ln for ln in ans.split('\n')
                        if not PLACEHOLDER.match(ln.strip())).strip()
        out.append((rid, ans, BLOCK.findall(body)))
    return out


def parse(md):
    t = md.read_text(encoding='utf-8')
    out = []
    for m in SEC.finditer(t):
        rid, body = m.group(1), m.group(2)
        ans = body.split('### 依据')[0].strip()
        blocks = BLOCK.findall(body)
        out.append((rid, ans, blocks))
    return out


def main():
    rows = []
    for p in sorted(OUT.glob('*/material.md')):
        for rid, ans, blocks in main_parse(p):
            rows.append((p.parent.name, rid, ans, blocks))

    print(f'总行 {len(rows)}')

    # ① 空答案统计
    empty = [r for r in rows if not r[2]]
    print(f'\n[1] 空答案（有题无答案）: {len(empty)} 行')
    from collections import Counter
    c = Counter(r[0].split('-')[0] + '/' + r[0].split('-')[1] for r in empty)
    for k, v in c.most_common(6):
        print(f'     {k:<28}{v}')

    # ② 正文偷写页码
    bad_page = [(r[0], r[1]) for r in rows if r[2] and PAGE_IN_BODY.search(r[2])]
    print(f'\n[2] 正文写页码（规范禁止）: {len(bad_page)} 行')
    for x in bad_page[:8]:
        print(f'     {x[0][-34:]:<36} {x[1]}')

    # ③ 过短答案（两字交差）
    thin = [(r[0], r[1], len(r[2])) for r in rows if r[2] and len(r[2]) < 80]
    print(f'\n[3] 答案 <80 字（疑似交差）: {len(thin)} 行')
    for x in thin[:10]:
        print(f'     {x[0][-32:]:<34} {x[1]:<4} {x[2]} 字')

    # ④ 依据块数与答案长度失调
    skew = [(r[0], r[1], len(r[2]), len(r[3])) for r in rows
            if r[2] and len(r[2]) > 600 and len(r[3]) <= 1]
    print(f'\n[4] 答案 >600 字但依据 ≤1 块: {len(skew)} 行')
    for x in skew[:8]:
        print(f'     {x[0][-34:]:<36} {x[1]:<4} {x[2]}字/{x[3]}块')

    # ⑤ 阳性对照：捏造引文
    print('\n[5] 阳性对照（捏造引文应报 unverified）')
    cand = [r for r in rows if r[2] and len(r[3]) >= 2]
    if not cand:
        print('     无可用样本')
    else:
        mid = cand[0][0]
        mp = OUT / mid / 'material.md'
        bak = mp.read_bytes()
        try:
            t = mp.read_text(encoding='utf-8')
            t2 = re.sub(r'^(- p\.\d+｜).*$', r'\1THIS_QUOTE_DOES_NOT_EXIST_xyzzy',
                        t, count=1, flags=re.M)
            mp.write_text(t2, encoding='utf-8')
            r = subprocess.run(['node', 'server/check.mjs', f'meta/{mid}'],
                               cwd=READ, capture_output=True, text=True,
                               encoding='utf-8', timeout=120)
            hit = 'unverified' in (r.stdout + r.stderr) or '查无此文' in r.stdout
            print(f'     {mid[-38:]} 捏造后 → {"✓ 报错（校验有效）" if hit else "✗ 没报错（校验失效！）"}')
        finally:
            mp.write_bytes(bak)

    return 0


if __name__ == '__main__':
    sys.exit(main())

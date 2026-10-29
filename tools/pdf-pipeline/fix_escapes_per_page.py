# -*- coding: utf-8 -*-
"""全库：找出「依据块去掉了转义、但原文带转义」的错配，并修回。

背景：2026-10-28 换 4.0 引擎时，有一批 3.0.4 材料的 pages.json **带** `\\$`
（4.0 不带）。当时做了一次全局「去依据块转义」，把这些 3.0.4 材料的块改错了。

判据：**每页各自判断**。该页原文有 `\\$` 而块里写 `$` → 补回；反之去掉。
不猜、不全局统一——原文是唯一基准。
"""
import json
import re
from pathlib import Path

READ = Path(__file__).resolve().parents[2]  # 从脚本位置推导，跨机器可用
MAT = READ / 'corpus' / 'materials'
OUT = READ / 'output' / 'meta'
BLOCK = re.compile(r'^-\s*p\.(\d+)\s*[｜|]\s*(.+)$', re.M)
BS = chr(92)
SPECIAL = '$~%'


def norm_ws(s):
    return re.sub(r'\s+', '', s)


def main():
    total_fix = 0
    touched = []
    for mp in sorted(OUT.glob('*/material.md')):
        mid = mp.parent.name
        pj = MAT / mid / 'pages.json'
        if not pj.exists():
            continue
        try:
            doc = json.loads(pj.read_text('utf-8'))
        except Exception:
            continue
        P = {p['n']: (p.get('text') or '') for p in doc.get('pages') or []}
        if not P:
            continue
        # 该材料是否整体带转义（多数情况全篇一致）
        whole = '\n'.join(P.values())
        src_escaped = (BS + '$') in whole or (BS + '~') in whole or (BS + '%') in whole

        t = mp.read_text(encoding='utf-8')
        n_fix = 0

        def repl(m):
            nonlocal n_fix
            page, q = int(m.group(1)), m.group(2)
            pt = P.get(page, '')
            if not pt:
                return m.group(0)
            # 已可核 → 不动
            if norm_ws(q) and norm_ws(q) in norm_ws(pt):
                return m.group(0)
            page_escaped = any((BS + c) in pt for c in SPECIAL)

            cand = None
            if page_escaped:
                # 原文带转义 → 块里补上
                q2 = q
                for c in SPECIAL:
                    q2 = re.sub(r'(?<!' + re.escape(BS) + r')' + re.escape(c), BS + c, q2)
                if norm_ws(q2) in norm_ws(pt):
                    cand = q2
            else:
                # 原文不带转义 → 块里去掉
                q2 = q.replace(BS, '')
                if norm_ws(q2) in norm_ws(pt):
                    cand = q2
            if cand is None:
                return m.group(0)
            n_fix += 1
            return f'- p.{page}｜{cand}'

        t2 = BLOCK.sub(repl, t)
        if n_fix:
            mp.write_text(t2, encoding='utf-8')
            total_fix += n_fix
            touched.append((mid, n_fix))

    print(f'修正 {total_fix} 块，涉及 {len(touched)} 份')
    for mid, n in touched:
        print(f'  {mid[:56]:<58} {n:>3} 块')


if __name__ == '__main__':
    main()

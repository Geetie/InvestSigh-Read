#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""为 01 类里有 pendingFigures 的材料下载图，并按尺寸过滤图标。

为什么要过滤：SEC 的 DEF 14A 有 100+ 个 <img>，多数是 bullet/logo 之类的小图元
（几十像素），不是内容图。不筛会污染 figures/。

阈值：宽或高 < 80px 的一律丢弃（实测小图标 19–23px，内容图普遍 ≥200px）。
"""
import json
import time
import urllib.request
from pathlib import Path

UA = 'InvestSigh research pipeline (contact: local@example.com)'
CIK = '1326801'
MAT = Path(__file__).resolve().parents[2] / 'corpus' / 'materials'
# 原来指向仓库外的一次性抓取缓存；改到仓库内，缺失时由调用处报错
IDX = Path(__file__).resolve().parents[2] / 'corpus' / '_cache' / 'cik3.json'

MIN_SIDE = 80


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        d = r.read()
        if r.headers.get('Content-Encoding') == 'gzip':
            import gzip
            d = gzip.decompress(d)
        return d


def main():
    # accession 索引：主文档名 → accession
    idx = json.loads(IDX.read_text('utf-8'))['filings']['recent']
    acc_of = {}
    for acc, doc in zip(idx['accessionNumber'], idx['primaryDocument']):
        acc_of.setdefault(doc, acc)

    try:
        from PIL import Image
        import io
        have_pil = True
    except ImportError:
        have_pil = False

    total_ok = total_skip = 0
    for d in sorted(MAT.iterdir()):
        if not d.is_dir() or not d.name.startswith('01-'):
            continue
        pj = d / 'pages.json'
        if not pj.exists():
            continue
        doc = json.loads(pj.read_text('utf-8'))
        pend = doc.get('pendingFigures') or []
        if not pend:
            continue
        meta = json.loads((d / 'meta.json').read_text('utf-8'))
        primary = meta.get('primaryDoc', '')
        acc = acc_of.get(primary)
        if not acc:
            print(f'  ✗ {d.name[:50]} 无 accession')
            continue
        base = f'https://www.sec.gov/Archives/edgar/data/{CIK}/{acc.replace("-","")}/'

        figdir = d / 'figures'
        figdir.mkdir(exist_ok=True)
        kept = []
        for f in pend:
            src = f.get('src')
            if not src:
                continue
            try:
                data = get(base + src)
            except Exception:
                continue
            time.sleep(0.15)
            if len(data) < 800:
                total_skip += 1
                continue
            if have_pil:
                try:
                    im = Image.open(io.BytesIO(data))
                    w, h = im.size
                    if w < MIN_SIDE or h < MIN_SIDE:
                        total_skip += 1
                        continue
                except Exception:
                    total_skip += 1
                    continue
            (figdir / f['name']).write_bytes(data)
            kept.append({'name': f['name'], 'page': f['page'], 'order': f['order']})
            total_ok += 1

        # 重排 order 与每页挂图
        kept.sort(key=lambda x: (x['page'] or 0, x['order'] or 0))
        for i, k in enumerate(kept, 1):
            k['order'] = i
        by = {}
        for k in kept:
            by.setdefault(k['page'], []).append({'name': k['name'], 'order': k['order']})
        for p in doc.get('pages') or []:
            p['figures'] = by.get(p['n'], [])
        doc['figures'] = kept
        doc.pop('pendingFigures', None)
        pj.write_text(json.dumps(doc, ensure_ascii=False, indent=1), encoding='utf-8')

        # content.md 补图引用
        lines = []
        for p in doc.get('pages') or []:
            if p.get('text'):
                lines.append(p['text'])
            for f in p.get('figures') or []:
                lines.append(f'![{f["name"]}](figures/{f["name"]})')
            lines.append('')
        (d / 'content.md').write_text('\n'.join(lines).strip() + '\n', encoding='utf-8')

        meta['figureCount'] = len(kept)
        meta['figuresWithPage'] = len(kept)
        (d / 'meta.json').write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding='utf-8')
        print(f'  ✓ {d.name[:50]:<52} 保留{len(kept):>3} / 原{len(pend):>3}')

    print(f'\n下载 {total_ok} 张 | 过滤 {total_skip} 张小图')


if __name__ == '__main__':
    main()

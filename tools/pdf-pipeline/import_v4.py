#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""把 MinerU 4.0 的 zip 产物转成 materials/<id>/ 结构。

4.0 的产物与 3.0.4 完全不同：

  3.0.4: <stem>_content_list.json  扁平条目，带 img_path + page_idx + bbox
  4.0:   middle_json.json          pages[i].blocks[]，image 块带归一化 bbox
                                   images/page_<i>_image_<n>.jpg

**4.0 的关键优势**：image 块就在 `pages[i].blocks[]` 里，**数组下标就是页码**，
不需要读 page_idx、也不可能出现「图没有页码」的情况（3.0.4 那 378 张的根因）。

本脚本：
  1. 解 zip
  2. 从 middle_json 取每页的 text 块 + image 块
  3. 图片按 **页内 bbox（上→下、左→右）** 排序 → 全书 order
  4. 落 figures/{order:03d}_p{page:03d}_{idx:02d}.jpg
  5. 写 pages.json（含每页 figures）/ content.md / meta.json
  6. **可选**：把旧依据块按新文本校正（--fix-evidence）

用法：
    PYTHONUTF8=1 python import_v4.py --zip-dir <dir> [--fix-evidence]
"""
import json
import re
import shutil
import sys
import zipfile
from pathlib import Path

READ = Path(__file__).resolve().parents[2]  # 从脚本位置推导，跨机器可用
MAT = READ / 'corpus' / 'materials'
OUT = READ / 'output' / 'meta'


def img_key(block):
    """页内排序键：上→下（8pt 归一化容差）、左→右。bbox 是归一化 0–1。"""
    bb = block.get('bbox') or [0, 0, 0, 0]
    try:
        left, top = float(bb[0]), float(bb[1])
    except Exception:
        left, top = 0.0, 0.0
    return (round(top * 1000 / 8), left)


def text_of_block(block):
    """4.0 的 text 块：content[] 里是 spans。"""
    parts = []
    for c in block.get('content') or []:
        if isinstance(c, dict):
            t = c.get('content')
            if isinstance(t, str) and t:
                parts.append(t)
            elif isinstance(t, list):
                for x in t:
                    if isinstance(x, dict) and x.get('content'):
                        parts.append(str(x['content']))
    return ''.join(parts).strip()


def table_of_block(block):
    """表格块：content[] 里 type=table 的 html。"""
    for c in block.get('content') or []:
        if isinstance(c, dict) and c.get('type') == 'table' and c.get('content'):
            return c['content']
    return ''


def find_image_path(block):
    for c in block.get('content') or []:
        if isinstance(c, dict):
            p = c.get('image_path')
            if p:
                return p
    return None


def do_zip(zp: Path, fix_evidence=False):
    mid = zp.stem
    mdst = MAT / mid
    if not mdst.exists():
        return ('no-dir', mid)

    tmp = zp.parent / (mid + '__x')
    if tmp.exists():
        shutil.rmtree(tmp)
    with zipfile.ZipFile(zp) as z:
        z.extractall(tmp)

    mj = tmp / 'middle_json.json'
    if not mj.exists():
        cand = list(tmp.rglob('middle_json.json'))
        mj = cand[0] if cand else None
    if not mj:
        return ('no-middle-json', mid)

    doc = json.loads(mj.read_text('utf-8'))
    pages_raw = doc.get('pages') or []

    figdir = mdst / 'figures'
    if figdir.exists():
        shutil.rmtree(figdir)
    figdir.mkdir()

    pages = []
    figs = []
    order = 0
    for pi, pg in enumerate(pages_raw, 1):
        blocks = pg.get('blocks') or []
        texts = []
        imgs = []
        for b in blocks:
            t = b.get('type')
            if t in ('text', 'paragraph_title', 'doc_title', 'list', 'abstract',
                     'content', 'ref_text', 'footnote', 'header', 'footer', 'page_footnote'):
                s = text_of_block(b)
                if s:
                    texts.append(s)
            elif t == 'image':
                ip = find_image_path(b)
                if ip:
                    imgs.append((b, ip))
            elif t == 'table':
                h = table_of_block(b)
                if h:
                    texts.append(h)
                else:
                    s = text_of_block(b)
                    if s:
                        texts.append(s)

        body = '\n'.join(texts).strip()
        page_figs = []
        imgs.sort(key=lambda x: img_key(x[0]))
        for k, (b, ip) in enumerate(imgs):
            src = tmp / ip
            if not src.exists():
                cand = list(tmp.rglob(Path(ip).name))
                if not cand:
                    continue
                src = cand[0]
            order += 1
            ext = src.suffix.lower() or '.jpg'
            name = f'{order:03d}_p{pi:03d}_{k:02d}{ext}'
            shutil.copy2(src, figdir / name)
            page_figs.append({'name': name, 'order': order})
            figs.append({'name': name, 'page': pi, 'order': order})

        pages.append({'n': pi, 'chars': len(body), 'text': body,
                      'src': 'mineru4', 'figures': page_figs})

    (mdst / 'pages.json').write_text(json.dumps(
        {'id': mid, 'srcId': mid, 'pageCount': len(pages), 'pages': pages,
         'figures': figs, 'mergedFrom': 'mineru-4.0.12/standard'},
        ensure_ascii=False, indent=1), encoding='utf-8')

    lines = []
    for p in pages:
        if p['text']:
            lines.append(p['text'])
        for f in p['figures']:
            lines.append(f'![{f["name"]}](figures/{f["name"]})')
        lines.append('')
    (mdst / 'content.md').write_text('\n'.join(lines).strip() + '\n', encoding='utf-8')

    meta = json.loads((mdst / 'meta.json').read_text('utf-8'))
    meta.update({'pageCount': len(pages), 'figureCount': len(figs),
                 'figuresWithPage': len(figs), 'ordered': True, 'engine': 'mineru-4.0.12'})
    (mdst / 'meta.json').write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding='utf-8')

    shutil.rmtree(tmp, ignore_errors=True)
    return ('ok', mid, len(pages), len(figs))


def main():
    args = sys.argv[1:]
    zdir = None
    if '--zip-dir' in args:
        zdir = Path(args[args.index('--zip-dir') + 1])
    if not zdir or not zdir.exists():
        print('用法: import_v4.py --zip-dir <dir>')
        return 2

    zips = sorted(zdir.glob('*.zip'))
    print(f'{len(zips)} 个 zip\n')
    ok = fail = 0
    tot_p = tot_f = 0
    for zp in zips:
        r = do_zip(zp)
        if r[0] == 'ok':
            ok += 1
            tot_p += r[2]
            tot_f += r[3]
            print(f'  ✓ {r[1][:54]:<56} 页{r[2]:>4} 图{r[3]:>4}')
        else:
            fail += 1
            print(f'  ✗ {r[1][:54]:<56} {r[0]}')

    print(f'\n成功 {ok} | 失败 {fail} | 共 {tot_p} 页 / {tot_f} 图')
    print('\n下一步必须跑：node server/check.mjs（依据块可能因换文本失效）')
    return 0


if __name__ == '__main__':
    sys.exit(main())

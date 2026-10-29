# -*- coding: utf-8 -*-
"""从 SEC EDGAR 下载 01 类 htm 材料引用的图片。

背景：SEC 的 Inline XBRL 文档（10-K/10-Q/8-K 的 htm）只含 `<img src="meta-20251231_g1.jpg">`
引用，图片是**同一提交包里的独立文件**。当初抓取时 `images: 0`，没下。

做法：
  1. 用 data.sec.gov 的 submissions API 拿到「表单类型 + 日期 → accession」
  2. 按 accession 拼出归档目录 `https://www.sec.gov/Archives/edgar/data/1326801/<acc-no-dash>/`
  3. 逐个下载 `<主文档名>_gN.jpg`
  4. 按 HTML 里出现顺序命名 `{order:03d}_p{part:03d}_{idx:02d}.jpg`

**必须声明 User-Agent**，否则 SEC 返回 403（"Undeclared Automated Tool"）。
限速 ≤10 请求/秒（SEC 明确要求），本脚本每次请求间隔 0.15s。
"""
import json
import re
import sys
import time
import urllib.request
from pathlib import Path

READ = Path(__file__).resolve().parents[2]  # 从脚本位置推导，跨机器可用
MAT = READ / 'corpus' / 'materials'
UA = 'InvestSigh research pipeline (contact: local@example.com)'

_MF = READ / 'corpus' / 'materials' / 'ingest-manifest-2026-10-26.json'
MAN = {}
if _MF.exists():
    import os as _os
    MAN = {x['id']: _os.path.splitext(x['source_file'])[0]
           for x in json.loads(_MF.read_text('utf-8'))['items']}
CIK = '1326801'
SUB_URL = f'https://data.sec.gov/submissions/CIK{CIK.zfill(10)}.json'


def get(url, binary=False):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Encoding': 'gzip, deflate'})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
        if r.headers.get('Content-Encoding') == 'gzip':
            import gzip
            data = gzip.decompress(data)
        return data if binary else data.decode('utf-8', errors='replace')


def submissions():
    d = json.loads(get(SUB_URL))
    rec = d['filings']['recent']
    out = {}
    for form, dt, acc, doc in zip(rec['form'], rec['filingDate'],
                                  rec['accessionNumber'], rec['primaryDocument']):
        out.setdefault(doc, (form, dt, acc))
    return out


def split_parts(html):
    marks = [m.start() for m in re.finditer(r'<hr\b|Item\s+\d+[A-C]?\.', html, re.I)]
    if len(marks) < 2:
        return [(1, 0)]
    return [(i + 1, pos) for i, pos in enumerate(marks)]


def part_of(off, parts):
    cur = 1
    for pno, pos in parts:
        if off >= pos:
            cur = pno
        else:
            break
    return cur


def main():
    idx = submissions()
    print(f'EDGAR 索引 {len(idx)} 条主文档名')
    total = 0
    for d in sorted(MAT.iterdir()):
        if not d.is_dir() or d.name in ('raw', 'mineru'):
            continue
        src = next((s for s in d.glob('source.*') if s.suffix.lower() in ('.htm', '.html')), None)
        if not src:
            continue
        html = src.read_text('utf-8', errors='replace')
        names = re.findall(r'src=["\']([^"\']+\.(?:jpg|jpeg|png|gif))["\']', html, re.I)
        if not names:
            print(f'{d.name[:54]:<56} 0 张引用，跳过')
            continue

        # **不能用 src.stem**：重构后原始件统一叫 source.htm，stem 恒为 "source"。
        # 必须回 manifest 拿原始文件名。
        # 01 类不在 manifest 里（manifest 只收了原 26 件）。
        # 但 **HTML 里的图片名本身就是线索**：`meta-20251231_g1.jpg` → EDGAR 主文档 `meta-20251231.htm`。
        m0 = re.match(r'(.+?)_g\d+\.', names[0])
        edgar_stem = (m0.group(1) + src.suffix.lower()) if m0 else src.stem
        meta = idx.get(edgar_stem)
        if not meta:
            # 主文档名可能带前缀日期，用包含匹配
            cand = [(k, v) for k, v in idx.items() if edgar_stem in k]
            meta = cand[0][1] if cand else None
        if not meta:
            print(f'{d.name[:54]:<56} 在 EDGAR 索引里找不到 {stem}')
            continue
        form, dt, acc = meta
        accdir = acc.replace('-', '')
        base = f'https://www.sec.gov/Archives/edgar/data/{CIK}/{accdir}/'

        figdir = d / 'figures'
        figdir.mkdir(exist_ok=True)
        parts = split_parts(html)
        ok = fail = 0
        plan = []
        seen = {}
        for i, nm in enumerate(names, 1):
            off = html.find(nm)
            part = part_of(off if off >= 0 else 0, parts)
            k = seen.get(part, 0)
            seen[part] = k + 1
            plan.append({'src': nm, 'page': part, 'idx': k, 'order': i})

        for f in plan:
            url = base + f['src']
            try:
                data = get(url, binary=True)
                if len(data) < 512:
                    fail += 1
                    continue
                ext = Path(f['src']).suffix.lower()
                out = figdir / f"{f['order']:03d}_p{f['page']:03d}_{f['idx']:02d}{ext}"
                out.write_bytes(data)
                ok += 1
            except Exception as e:
                fail += 1
            time.sleep(0.15)      # SEC 要求 ≤10 req/s

        if ok:
            # 回写 pages.json / content.md / meta.json
            pj = d / 'pages.json'
            doc = json.loads(pj.read_text('utf-8')) if pj.exists() else {'pages': []}
            figs = []
            for f in plan:
                ext = Path(f['src']).suffix.lower()
                cand = figdir / f"{f['order']:03d}_p{f['page']:03d}_{f['idx']:02d}{ext}"
                if cand.exists():
                    figs.append({'name': cand.name, 'page': f['page'], 'order': f['order']})
            byp = {}
            for f in figs:
                byp.setdefault(f['page'], []).append({'name': f['name'], 'order': f['order']})
            for p in doc.get('pages') or []:
                p['figures'] = byp.get(p['n'], [])
            doc['figures'] = figs
            if pj.exists():
                pj.write_text(json.dumps(doc, ensure_ascii=False, indent=1), encoding='utf-8')
                lines = []
                for p in doc.get('pages') or []:
                    t = (p.get('text') or '').strip()
                    if t:
                        lines.append(t)
                    for f in byp.get(p['n'], []):
                        lines.append(f'![{f["name"]}](figures/{f["name"]})')
                    lines.append('')
                (d / 'content.md').write_text('\n'.join(lines).strip() + '\n', encoding='utf-8')
            mp = json.loads((d / 'meta.json').read_text('utf-8'))
            mp['figureCount'] = len(figs)
            mp['figuresWithPage'] = len([x for x in figs if x['page'] is not None])
            mp['ordered'] = True
            (d / 'meta.json').write_text(json.dumps(mp, ensure_ascii=False, indent=1), encoding='utf-8')
        total += ok
        print(f'{d.name[:54]:<56} ok={ok} fail={fail}  ({form} {dt})')

    print(f'\n共下载 {total} 张')
    return 0


if __name__ == '__main__':
    sys.exit(main())

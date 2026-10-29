# -*- coding: utf-8 -*-
"""修 structure.py 的两个 bug，并恢复被它改坏的那份材料。

**bug 1（严重）**：文件名正则写成 `^\\d{3,}_p(\\d{3,})_(\\d{2})\\.`，
但 restructure.py 生成的是 `001_001_00.jpg`（**没有 `p`**）。
两者不一致 → 已有图片全被解析成 `nopage`，页码全丢。

**bug 2**：`find_cl()` 只看 `source.*` 的 stem。
重构后原始件统一叫 `source.pdf`，stem 恒为 `source`，永远找不到 content_list。
必须回 `ingest-manifest-2026-10-26.json` 查源文件名，或用 id 的 slug 尾部模糊匹配。

修法：
  · 生成名统一为 `{order:03d}_p{page:03d}_{idx:02d}.jpg`（**带 `p`**，与解析器一致）
  · `find_cl()` 走 manifest → slug 模糊两步
  · 新命名解析器同时兼容「带 p」和「旧的纯数字」两种
"""
import json
import os
import re
import shutil
from pathlib import Path

READ = Path(__file__).resolve().parents[2]  # 从脚本位置推导，跨机器可用
MAT = READ / 'corpus' / 'materials'
# ★ 批次目录：默认在仓库内（corpus/_batches），可用环境变量指向别处（如 ~/mineru_out）。
#   原来写死 D:/InvestSigh/system/... 在 macOS 下会被当成相对路径，
#   exists() 恒 False 且**不报错** —— 会静默降级，比崩溃更难查。
B = Path(os.environ.get("PDF_PIPELINE_BATCH") or (READ / "corpus" / "_batches")).resolve()
MAN = json.loads((READ / 'corpus' / 'materials' / 'ingest-manifest-2026-10-26.json').read_text('utf-8'))
SRC = {x['id']: os.path.splitext(x['source_file'])[0] for x in MAN['items']}


def find_cl(mid):
    """manifest → slug 模糊 两步找 content_list。"""
    stem = SRC.get(mid)
    if stem:
        p = B / '_mineru' / f'{stem}.cl'
        if p.exists():
            try:
                return json.loads(p.read_text('utf-8'))
            except Exception:
                pass
    tail = re.sub(r'[^0-9A-Za-z\u4e00-\u9fa5]', '', mid.split('-', 3)[-1]).lower()
    if tail and B.exists():
        best = None
        for p in B.glob('_mineru/*.cl'):
            s = re.sub(r'[^0-9A-Za-z\u4e00-\u9fa5]', '', p.stem).lower()
            if tail in s and (best is None or len(s) < len(best[0])):
                best = (s, p)
        if best:
            try:
                return json.loads(best[1].read_text('utf-8'))
            except Exception:
                pass
    return None


def build_boxes(items):
    if not items:
        return {}
    per_page = {}
    for it in items:
        ip = it.get('img_path')
        if not ip:
            continue
        nm = os.path.basename(ip)
        pi = it.get('page_idx')
        if pi is None:
            continue
        bbox = it.get('bbox') or [0, 0, 0, 0]
        try:
            top, left = float(bbox[1]), float(bbox[0])
        except Exception:
            top, left = 0.0, 0.0
        per_page.setdefault(int(pi) + 1, []).append((top, left, nm))
    out = {}
    for pg, lst in per_page.items():
        lst.sort(key=lambda t: (round(t[0] / 8), t[1]))
        for i, (_, _, nm) in enumerate(lst):
            out[nm] = (pg, i)
    return out


def repair_one(mid, verbose=True):
    """重建一份材料的 figures 命名与 pages.json.figures。"""
    d = MAT / mid
    pj = d / 'pages.json'
    if not pj.exists():
        return 'no pages.json'
    doc = json.loads(pj.read_text('utf-8'))
    figdir = d / 'figures'
    files = sorted(f.name for f in figdir.iterdir() if f.is_file()) if figdir.is_dir() else []
    if not files:
        return 'no figures'

    box = build_boxes(find_cl(mid))

    # 现有 figures 里若已存过 page（旧版写过），先用它；否则按 bbox 重算；
    # 都拿不到时按「文件当前顺序」推（顺序本身是对的，只是缺页码）
    prev = {f['name']: f for f in (doc.get('figures') or []) if f.get('name')}
    ordered = []
    for idx, nm in enumerate(files):
        m = re.match(r'^\d{3,}_p(\d{3,})_(\d{2})\.', nm)      # 新命名（带 p）
        if m:
            ordered.append({'old': nm, 'page': int(m.group(1)), 'idx': int(m.group(2))})
            continue
        p = prev.get(nm)
        if p and p.get('page') is not None:
            ordered.append({'old': nm, 'page': p['page'], 'idx': idx})
            continue
        # 旧 content_list 里的哈希名：按 bbox 查
        pg, pi = box.get(nm, (None, None))
        ordered.append({'old': nm, 'page': pg, 'idx': pi if pi is not None else idx})

    ordered.sort(key=lambda f: (f['page'] is None, f['page'] or 0, f['idx'] or 0))

    # 两阶段改名，避免互相覆盖
    plan = []
    for i, f in enumerate(ordered, 1):
        ext = Path(f['old']).suffix.lower() or '.jpg'
        tag = f"p{f['page']:03d}_{f['idx']:02d}" if f['page'] is not None else 'nopage'
        plan.append({**f, 'new': f"{i:03d}_{tag}{ext}", 'order': i})

    for f in plan:
        if f['old'] != f['new']:
            shutil.move(str(figdir / f['old']), str(figdir / f".t_{f['order']:03d}{Path(f['new']).suffix}"))
    for f in plan:
        tmp = figdir / f".t_{f['order']:03d}{Path(f['new']).suffix}"
        if tmp.exists():
            shutil.move(str(tmp), str(figdir / f['new']))

    # 回写 pages.json
    by_page = {}
    for f in plan:
        if f['page'] is not None:
            by_page.setdefault(f['page'], []).append({'name': f['new'], 'order': f['order']})
    for p in doc.get('pages') or []:
        p['figures'] = by_page.get(p['n'], [])
    doc['figures'] = [{'name': f['new'], 'page': f['page'], 'order': f['order']} for f in plan]
    pj.write_text(json.dumps(doc, ensure_ascii=False, indent=1), encoding='utf-8')

    # content.md / meta.json
    lines = []
    for p in doc.get('pages') or []:
        t = (p.get('text') or '').strip()
        if t:
            lines.append(t)
        for f in by_page.get(p['n'], []):
            lines.append(f'![{f["name"]}](figures/{f["name"]})')
        lines.append('')
    (d / 'content.md').write_text('\n'.join(lines).strip() + '\n', encoding='utf-8')

    parts = mid.split('-')
    mm = re.search(r'(\d{4}-\d{2}-\d{2})', mid)
    (d / 'meta.json').write_text(json.dumps({
        'id': mid, 'cat': parts[0], 'sub': parts[1] if len(parts) > 1 else '',
        'date': mm.group(1) if mm else '0000-00-00',
        'pageCount': len(doc.get('pages') or []),
        'figureCount': len(plan),
        'figuresWithPage': sum(1 for f in plan if f['page'] is not None),
        'ordered': True,
    }, ensure_ascii=False, indent=1), encoding='utf-8')

    if verbose:
        w = sum(1 for f in plan if f['page'] is not None)
        print(f'  {mid[:52]:<54} {len(plan):>3} 图 {w:>3} 定页')
    return 'ok'


if __name__ == '__main__':
    import sys
    ids = sys.argv[1:] or [p.name for p in MAT.iterdir()
                           if p.is_dir() and p.name not in ('raw', 'mineru')]
    ok = 0
    for mid in ids:
        if repair_one(mid) == 'ok':
            ok += 1
    print(f'\n修复 {ok} 份')

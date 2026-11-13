#!/usr/bin/env python
"""SEC 申报包迁移：把"一文件一目录"的存量 SEC 材料合并成"一申报一目录"。

目标不变量（2026-11-03 用户拍板）：
    corpus/materials/<材料 id>/  =  一份申报（主文档 source.htm + exhibits/ 全部附件）
    pages.json 页号全局唯一：主文档 1..k **原样不动**（历史卡的 p.N 引用不失效），
    附件页接续编号并带 doc/docType 字段；content.md 只在尾部追加。

用法：
    python tools/migrate-sec-packages.py            # dry-run，只打方案
    python tools/migrate-sec-packages.py --apply    # 执行

被吸收的"附件独立目录"与其 output 卡片移入 _pkg-merge-archive-2026-11-04/（可逆，非删除）。
"""

from __future__ import annotations

import json
import re
import shutil
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MATERIALS = ROOT / "corpus" / "materials"
OUTPUT = ROOT / "output"
ARCHIVE_TAG = "_pkg-merge-archive-2026-11-04"
UA = "InvestSigh research pipeline (contact: local@example.com)"
PROXY = "http://127.0.0.1:7897"
CIKS = {"META": "1326801", "NVDA": "1045810"}

_ID_RE = re.compile(r"^(?P<cat>\d{2})-(?P<sub>.+)-(?P<date>\d{4}-\d{2}-\d{2})-(?P<stem>.+)$")
_RENDER_RE = re.compile(r"^r\d+\.htm$")
_DOC_EXTS = (".htm", ".html", ".txt")

_opener = urllib.request.build_opener(
    urllib.request.ProxyHandler({"http": PROXY, "https": PROXY})
)


def http_get(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with _opener.open(req, timeout=60) as r:
        return r.read()


def http_json(url: str):
    return json.loads(http_get(url).decode("utf-8", "replace"))


def load_submissions() -> tuple[dict[str, dict], list[tuple]]:
    """返回 ({primaryDocument: {accession, form, filed, cik}}, [(norm_stem, row)])。

    附件永远不是某次申报的 primaryDocument ⇒ 第一张表是"主文档/附件"的判决书；
    第二张表用于旧 meta 全空时按"去连字符文件名 + 日期窗"反查 accession。
    """
    out: dict[str, dict] = {}
    fuzzy: list[tuple] = []
    for cik in set(CIKS.values()):
        data = http_json(f"https://data.sec.gov/submissions/CIK{cik.zfill(10)}.json")
        time.sleep(0.25)
        r = data["filings"]["recent"]
        for form, filed, acc, doc in zip(
            r["form"], r["filingDate"], r["accessionNumber"], r["primaryDocument"]
        ):
            name = str(doc).rsplit("/", 1)[-1]
            out[name] = {
                "accession": str(acc),
                "form": str(form).replace(" ", ""),
                "filed": str(filed),
                "cik": cik,
            }
            fuzzy.append(
                (
                    name.rsplit(".", 1)[0].replace("-", "").lower(),
                    {
                        "accession": str(acc),
                        "form": str(form).replace(" ", ""),
                        "filed": str(filed),
                        "cik": cik,
                        "docname": name,
                    },
                )
            )
    return out, fuzzy


def fuzzy_lookup(fuzzy: list[tuple], stem: str, date: str, cik: str):
    """去连字符 stem + ±60 天窗口反查 accession（旧 meta 全空时的兜底）。"""
    want = stem.replace("-", "").lower()
    y, m, d = int(date[:4]), int(date[5:7]), int(date[8:10])
    hits = []
    for norm, row in fuzzy:
        if norm != want or row["cik"] != cik:
            continue
        fy, fm, fd = int(row["filed"][:4]), int(row["filed"][5:7]), int(row["filed"][8:10])
        gap = abs((fy - y) * 372 + (fm - m) * 31 + (fd - d))
        if gap <= 62:
            hits.append((gap, row))
    hits.sort(key=lambda x: x[0])
    return hits[0][1] if len(hits) >= 1 and (len(hits) == 1 or hits[0][0] < hits[1][0]) else (
        hits[0][1] if hits else None
    )


def parse_id(mid: str):
    m = _ID_RE.match(mid)
    return m.groupdict() if m else None


_SEC_SUBS = {"10-K", "10-Q", "8-K与EX-99.1", "委托书", "招股书", "其他条目与红灯"}


def scan_materials() -> list[dict]:
    rows = []
    for d in sorted(MATERIALS.iterdir()):
        if not d.is_dir() or d.name.startswith("_"):
            continue
        meta_f = d / "meta.json"
        if not meta_f.is_file():
            continue
        try:
            meta = json.loads(meta_f.read_text(encoding="utf-8"))
        except Exception:
            continue
        src = str(meta.get("source", "")).replace("-", ".")
        parsed = parse_id(d.name)
        if not parsed:
            continue
        is_sec = src in ("sec.edgar",)
        if not is_sec and not src:
            # 旧 schema 缺 source 的兜底：01 类 SEC 子型 + 有 source.htm 原件
            if parsed["cat"] == "01" and parsed["sub"] in _SEC_SUBS and (d / "source.htm").is_file():
                is_sec = True
        if not is_sec:
            continue
        rows.append({"dir": d, "id": d.name, "meta": meta, **parsed})
    return rows


_pkg_cache: dict[str, list[str]] = {}


def package_docs(cik: str, acc: str, primary: str) -> list[str]:
    key = f"{cik}:{acc}"
    if key in _pkg_cache:
        return _pkg_cache[key]
    nod = acc.replace("-", "")
    data = http_json(f"https://www.sec.gov/Archives/edgar/data/{int(cik)}/{nod}/index.json")
    time.sleep(0.2)
    items = (data.get("directory") or {}).get("item") or []
    full = acc + ".txt"
    out = []
    for it in items:
        n = str(it.get("name") or "")
        low = n.lower()
        if not low.endswith(_DOC_EXTS):
            continue
        if "/" in n or "index" in low:
            continue
        if _RENDER_RE.match(low) or n == full or low == primary.lower():
            continue
        out.append(n)
    _pkg_cache[key] = out
    return out


def split_logical_pages(text: str, fallback_chars: int = 7000):
    """与 pipelines/_kit/material.py::split_logical_pages 同口径（独立实现避免 import 链）。"""
    anchor = re.compile(
        r"(?:^|\n)\s*(?:Item\s+\d+[A-C]?\.|PART\s+[IVX]+|PROPOSAL\s+\d+|ARTICLE\s+[IVX]+)",
        re.IGNORECASE,
    )
    marks = [(m.start(), m.group(0).strip()) for m in anchor.finditer(text)]
    if len(marks) >= 3:
        res = []
        for i, (pos, title) in enumerate(marks):
            end = marks[i + 1][0] if i + 1 < len(marks) else len(text)
            body = text[pos:end].strip()
            if len(body) > 80:
                res.append((title, body))
        if len(res) >= 2:
            return res
    paras = [p for p in re.split(r"\n\s*\n", text) if p.strip()]
    res, buf, size = [], [], 0
    for p in paras:
        buf.append(p)
        size += len(p)
        if size >= fallback_chars:
            res.append((f"§{len(res) + 1}", "\n\n".join(buf)))
            buf, size = [], 0
    if buf:
        res.append((f"§{len(res) + 1}", "\n\n".join(buf)))
    return res or [("全文", text)]


_TAG = re.compile(r"<[^>]+>")
_SCRIPT = re.compile(r"<(script|style)[\s\S]*?</\1>", re.IGNORECASE)
_BLOCK = re.compile(
    r"</?(?:p|div|section|article|header|footer|main|aside|h[1-6]|ul|ol|dl|dt|dd|"
    r"table|thead|tbody|tfoot|figure|figcaption|blockquote|pre|form|fieldset)\b[^>]*>",
    re.IGNORECASE,
)
_ENT = (("&nbsp;", " "), ("&#160;", " "), ("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"),
        ("&quot;", '"'), ("&#39;", "'"), ("&mdash;", "—"), ("&ndash;", "–"),
        ("&rsquo;", "’"), ("&lsquo;", "‘"), ("&ldquo;", "“"), ("&rdquo;", "”"))


def html_to_text(html: str) -> str:
    t = _SCRIPT.sub(" ", html)
    t = re.sub(r"<br\s*/?>", "\n", t, flags=re.IGNORECASE)
    t = re.sub(r"</t[dh]\s*>", " | ", t, flags=re.IGNORECASE)
    t = re.sub(r"</tr\s*>", "\n", t, flags=re.IGNORECASE)
    t = _BLOCK.sub("\n", t)
    t = _TAG.sub("", t)
    for a, b in _ENT:
        t = t.replace(a, b)
    t = t.replace("\r", "")
    t = re.sub(r"[ \t ]+", " ", t)
    t = re.sub(r" *\| *\n", "\n", t)
    t = re.sub(r"\n[ \t]+", "\n", t)
    t = re.sub(r"\n{3,}", "\n\n", t)
    return t.strip()


def ticker_of(row) -> str:
    t = str(row["meta"].get("ticker") or "").upper()
    if t in CIKS:
        return t
    return "NVDA" if "cross-read" in row["id"] else "META"


def cik_of(row) -> str:
    return CIKS[ticker_of(row)]


def find_output_card(mid: str) -> Path | None:
    if not OUTPUT.is_dir():
        return None
    for t in OUTPUT.iterdir():
        if not t.is_dir() or t.name.startswith("_") or t.name.startswith("."):
            continue
        card = t / mid / "material.md"
        if card.is_file():
            return card.parent
    return None


def main(apply: bool) -> int:
    submissions, fuzzy = load_submissions()
    rows = scan_materials()
    print(f"SEC 材料目录：{len(rows)}")

    # ── 1) 主文档 / 附件独立目录 判决 ──
    # 判据：meta.primaryDoc（缺则从 id 推断）是否是某次申报的 primaryDocument。
    primaries, exhibits = [], []
    for r in rows:
        pd = str(r["meta"].get("primaryDoc") or (r["stem"] + ".htm"))
        r["meta"]["primaryDoc"] = pd
        hit = submissions.get(pd)
        if not hit:
            # 旧 meta 全空/连字符差异：按去连字符 stem + 日期窗兜底
            hit = fuzzy_lookup(fuzzy, r["stem"], r["date"], cik_of(r))
            if hit:
                # 反查命中 ⇒ 权威主文档名以 EDGAR 为准（推断名可能差连字符）
                r["meta"]["primaryDoc"] = hit["docname"]
        if hit:
            r["acc"] = hit["accession"]
            r["filing"] = hit
            primaries.append(r)
        else:
            exhibits.append(r)
    print(f"主文档目录 {len(primaries)}，附件独立目录 {len(exhibits)}")

    # ── 2) 附件目录归属：同 sub + 同 date 的主目录，且附件名在其 accession 包清单里 ──
    #   按主目录聚合：一个主目录吸收多个附件目录时只产生一条迁移项
    by_key: dict[tuple, list] = {}
    for p in primaries:
        by_key.setdefault((p["sub"], p["date"]), []).append(p)

    agg: dict[str, dict] = {}
    orphan = []
    for e in exhibits:
        doc_name = str(e["meta"].get("primaryDoc"))
        matched = None
        for p in by_key.get((e["sub"], e["date"]), []):
            acc = str(p["meta"].get("accession") or p.get("acc") or "")
            if not acc:
                continue
            try:
                docs = package_docs(cik_of(p), acc, str(p["meta"]["primaryDoc"]))
            except Exception:
                continue
            if doc_name in docs:
                matched = (p, acc, docs)
                break
        if matched:
            p, acc, docs = matched
            entry = agg.setdefault(
                p["id"], {"row": p, "acc": acc, "docs": docs, "absorbed": []}
            )
            entry["absorbed"].append(e)
        else:
            orphan.append(e)

    # ── 3) 其余主目录：直接按 accession 补包（无附件目录可吸收就下载） ──
    for p in primaries:
        if p["id"] in agg:
            continue
        acc = str(p["meta"].get("accession") or p.get("acc") or "")
        if not acc:
            print(f"  ? 无 accession 可定（保持不动）：{p['id']}")
            continue
        try:
            docs = package_docs(cik_of(p), acc, str(p["meta"]["primaryDoc"]))
        except Exception as exc:
            print(f"  ? index.json 失败：{p['id']} {exc}")
            continue
        agg[p["id"]] = {"row": p, "acc": acc, "docs": docs, "absorbed": []}

    plan = list(agg.values())

    print(f"\n== 迁移方案（{len(plan)} 份主目录） ==")
    for ent in plan:
        p, acc, docs = ent["row"], ent["acc"], ent["docs"]
        absorbed = ent["absorbed"]
        print(f"  {p['id']}")
        print(
            f"    accession={acc}  附件 {len(docs)} 份  吸收附件目录 "
            f"{', '.join(a['id'] for a in absorbed) if absorbed else '—'}"
        )
        for dname in docs:
            print(f"      - {dname}")
    for e in orphan:
        print(f"  ! 孤儿附件目录（找不到归属，保持不动）：{e['id']}")

    if not apply:
        print("\n(dry-run，未写盘。--apply 执行)")
        return 0

    # ── 4) 执行 ──
    archived = 0
    touched: list[str] = []
    for ent in plan:
        p, acc, docs, absorbed = ent["row"], ent["acc"], ent["docs"], ent["absorbed"]
        d = p["dir"]
        pages_f = d / "pages.json"
        pages = json.loads(pages_f.read_text(encoding="utf-8"))
        all_pages = pages.get("pages") or []
        n0 = len(all_pages)
        have = {str(pg.get("doc")) for pg in all_pages if pg.get("doc")}
        have.add(str(p["meta"]["primaryDoc"]))

        ex_dir = d / "exhibits"
        if not ex_dir.exists():
            ex_dir.mkdir()
        content = (d / "content.md").read_text(encoding="utf-8")
        files = list(pages.get("files") or [])
        added = 0
        for name in docs:
            if name in have or (ex_dir / name).is_file():
                continue
            src_bytes: bytes | None = None
            url = (
                f"https://www.sec.gov/Archives/edgar/data/{int(cik_of(p))}/"
                f"{acc.replace('-', '')}/{name}"
            )
            for a in absorbed:
                if str(a["meta"].get("primaryDoc")) == name:
                    cand = a["dir"] / "source.htm"
                    if cand.is_file():
                        src_bytes = cand.read_bytes()
                    break
            if src_bytes is None:
                try:
                    src_bytes = http_get(url)
                    time.sleep(0.2)
                except Exception as exc:
                    print(f"    ! 下载失败 {name}: {exc}")
                    continue
            (ex_dir / name).write_bytes(src_bytes)
            text = html_to_text(src_bytes.decode("utf-8", "replace"))
            if not text.strip():
                print(f"    ! 附件抽取为空（保留文件，不产页）：{name}")
                continue
            stem = name.rsplit(".", 1)[0]
            for label, body in split_logical_pages(text):
                n0 += 1
                all_pages.append(
                    {
                        "n": n0,
                        "doc": name,
                        "docType": "exhibit",
                        "text": body,
                        "chars": len(body),
                        "section": f"{stem} · {label}",
                        "figures": [],
                    }
                )
            content = content.rstrip("\n") + f"\n\n<!-- doc: {name} (exhibit) -->\n\n{text}\n"
            files.append({"doc": name, "kind": "exhibit", "bytes": len(src_bytes)})
            have.add(name)
            added += 1

        if added == 0 and not absorbed:
            # 没有附件可补（DEF 14A/424B 这类单文件包），但 accession 缺失仍要回填
            if not p["meta"].get("accession") and acc:
                meta = p["meta"]
                meta["accession"] = acc
                meta["package"] = True
                meta["files"] = [
                    {
                        "doc": str(meta["primaryDoc"]),
                        "kind": "primary",
                        "bytes": (d / "source.htm").stat().st_size
                        if (d / "source.htm").is_file()
                        else 0,
                    }
                ]
                (d / "meta.json").write_text(
                    json.dumps(meta, ensure_ascii=False, indent=1), "utf-8"
                )
                touched.append(p["id"])
                print(f"  ✔ {p['id']}：无附件包，回填 accession={acc}")
            continue

        if not any(f.get("kind") == "primary" for f in files):
            src = d / "source.htm"
            files.insert(
                0,
                {
                    "doc": str(p["meta"]["primaryDoc"]),
                    "kind": "primary",
                    "bytes": src.stat().st_size if src.is_file() else 0,
                },
            )
        pages["pages"] = all_pages
        pages["pageCount"] = len(all_pages)
        pages["files"] = files
        pages_f.write_text(json.dumps(pages, ensure_ascii=False, indent=1), "utf-8")
        (d / "content.md").write_text(content, "utf-8")

        meta = p["meta"]
        meta["accession"] = acc
        meta["package"] = True
        meta["files"] = files
        meta["exhibitType"] = "package" if len(files) > 1 else "primary"
        meta["pageCount"] = len(all_pages)
        (d / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1), "utf-8")
        touched.append(p["id"])
        print(f"  ✔ {p['id']}：+{added} 附件，pages → {len(all_pages)}")

        for a in absorbed:
            dst = MATERIALS / ARCHIVE_TAG / a["id"]
            dst.parent.mkdir(parents=True, exist_ok=True)
            if a["dir"].exists():
                shutil.move(str(a["dir"]), str(dst))
            card = find_output_card(a["id"])
            if card:
                cdst = OUTPUT / ARCHIVE_TAG / card.parent.name / a["id"]
                cdst.parent.mkdir(parents=True, exist_ok=True)
                if not cdst.exists():
                    shutil.move(str(card), str(cdst))
            archived += 1
            print(f"    ↳ 吸收并归档附件目录 {a['id']}")

    stale = OUTPUT / f"{ARCHIVE_TAG}-STALE.md"
    stale.write_text(
        "# 包合并后建议重读的卡（主目录新增了附件页，旧答案里的「附件未在手」已可补）\n\n"
        + "\n".join(f"- {i}" for i in touched)
        + "\n",
        "utf-8",
    )
    print(f"\n完成：迁移 {len(touched)} 份主目录，归档 {archived} 个附件目录。")
    print(f"建议重读清单：{stale}")
    return 0


if __name__ == "__main__":
    sys.exit(main(apply="--apply" in sys.argv))

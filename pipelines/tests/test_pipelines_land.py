"""`test_pipelines_land.py` —— 落盘与幂等的行为测试（离线）。

## 为什么必须有一组专门测这个

实测踩过一次真缺陷：文件名把扩展名直接拼在哈希后面（`...__1a358fd7824dhtm`），
导致 `existing_hashes()` 用 `split("__")` 取到 `1a358fd7824dhtm`、与 `hash[:12]`
永不相等 ⇒ **`skipped` 恒 0、原件每次被重写**（违反"只增不改"，且白耗流量）。

这条缺陷在"跑一次看结果"的验收里**看不见**（材料确实进来了、报告也是 ok）。
只有"跑两次、比 skipped"，或者直接测落盘层，才能发现。
所以这组测试的存在本身就是那条教训的固化。
"""

from __future__ import annotations

from datetime import date
from pathlib import Path

import pytest

from pipelines._kit.land import Landing, safe_slug


def _landing(tmp_path: Path, source: str = "sec.edgar") -> Landing:
    return Landing(source, date(2026, 10, 28), root=tmp_path)


# ── 文件名形状 ──────────────────────────────────────────────────────────


def test_write_produces_hash_dot_ext_filename(tmp_path: Path) -> None:
    """★ 文件名必须是 `<id>__<hash12>.<ext>`（哈希后**必须有点号**）。

    这是幂等索引的物理基础；点号丢了，索引就永远匹配不上（实测踩过）。
    """
    L = _landing(tmp_path)
    r = L.write("01-10-q-2026-09-30-meta", b"<html>hi</html>", ext="htm")
    assert r.path.name.endswith(".htm")
    assert "__" in r.path.name
    hash_part = r.path.name.split("__", 1)[1]
    assert hash_part.split(".")[0] == r.content_hash[:12]


def test_second_write_is_skipped(tmp_path: Path) -> None:
    """同一内容写两次 ⇒ 第二次 `skipped=True`，且文件不被重写。"""
    L = _landing(tmp_path)
    body = b"<html>same</html>"
    first = L.write("a", body, ext="htm")
    mtime_before = first.path.stat().st_mtime_ns
    second = L.write("a", body, ext="htm")
    assert second.skipped is True
    assert second.path.stat().st_mtime_ns == mtime_before, "原件被重写了（违反只增不改）"


def test_different_content_both_kept(tmp_path: Path) -> None:
    """不同内容 ⇒ 两件都保留（同 id 不同版本是合法的：材料有更新）。"""
    L = _landing(tmp_path)
    a = L.write("a", b"v1", ext="htm")
    b = L.write("a", b"v2", ext="htm")
    assert not a.skipped and not b.skipped
    assert a.path != b.path
    assert len(list(tmp_path.rglob("*.htm"))) == 2


def test_zero_bytes_rejected(tmp_path: Path) -> None:
    """反例：0 字节必须抛（0 字节等于没取到，不许落成"已取到"）。"""
    with pytest.raises(ValueError):
        _landing(tmp_path).write("a", b"", ext="htm")


def test_safe_slug_strips_unsafe_chars() -> None:
    """路径安全：中文/斜杠/空格都归一，不留可穿越字符。"""
    assert "/" not in safe_slug("a/b")
    assert ".." not in safe_slug("../../etc/passwd") or safe_slug("../../etc/passwd") == "etc_passwd"
    assert safe_slug("01-10-K-2026-01-29-meta") == "01-10-K-2026-01-29-meta"


# ── manifest 幂等 ───────────────────────────────────────────────────────


def _record(content_hash: str = "a" * 64):
    from pipelines._kit.artifact import FetchRecord

    return FetchRecord(
        source_id="sec.edgar",
        url="https://example.invalid/x",
        http_status=200,
        fetched_at="2026-10-28T00:00:00+00:00",
        published_at=None,
        as_of="2026-10-28",
        vintage=None,
        content_hash=content_hash,
        bytes=10,
        content_type="text/html",
        parser_version="t/1",
        license_tier="official_public",
        channel_tier="T0",
    )


def test_manifest_append_is_idempotent(tmp_path: Path) -> None:
    """同 `(source_id, content_hash)` 追加两次 ⇒ 只写 1 行。

    这条保证"同日重跑 ledger 行数 = 索引行数"这个对账前提成立。
    """
    L = _landing(tmp_path)
    rec = _record()
    assert L.append_manifest([rec]) == 1
    assert L.append_manifest([rec]) == 0
    assert len(L.read_manifest()) == 1


def test_manifest_distinct_hashes_both_written(tmp_path: Path) -> None:
    """反例的反面：不同内容 ⇒ 两行（不许因为同 URL 就吞掉）。"""
    L = _landing(tmp_path)
    assert L.append_manifest([_record("a" * 64)]) == 1
    assert L.append_manifest([_record("b" * 64)]) == 1
    assert len(L.read_manifest()) == 2


def test_manifest_keys_roundtrip(tmp_path: Path) -> None:
    """`read_manifest_keys()` 与写入一致（幂等判定读的就是它）。"""
    L = _landing(tmp_path)
    L.append_manifest([_record("c" * 64)])
    assert L.read_manifest_keys() == {("sec.edgar", "c" * 64)}

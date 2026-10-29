"""`test_pipelines_tristate.py` —— 三态判定的**行为**测试（离线，用假 Adapter）。

## 为什么要有这组

`test_pipelines_contract.py` 锁的是数据类契约；这组锁的是 `run_type` 的**分派逻辑**：
同样"没拿到材料"，什么情况判 `ok`、什么情况判 `empty`、什么情况判 `unavailable`。

这是本包最容易写错的地方，实测踩过一次：`10-K` 一年一次，7 天窗口里 0 件，
却被判成 `unavailable` —— 读报告的人会以为 SEC 挂了。所以这组测试用**假 Adapter**
把五种情形钉死，不依赖任何真实站点。
"""

from __future__ import annotations

from pathlib import Path
from types import SimpleNamespace

import pytest

from pipelines._kit.artifact import Status, TypeSpec
from pipelines._kit.base import RawItem, Unavailable, Window, run_type


class _FakeModule:
    """一个可编程的假 Adapter：按 `behaviour` 决定 probe/fetch 怎么走。"""

    source_id = "fake.source"
    parser_version = "fake/1"

    def __init__(self, behaviour: str) -> None:
        self.behaviour = behaviour

    def probe(self, client, spec):  # noqa: ANN001, ANN201 — 测试替身不标注
        if self.behaviour == "probe_unavailable":
            raise Unavailable("端点不可达", checked_scope=["fake: timeout"])
        return ["fake: probe ok"]

    def fetch(self, client, spec, window):  # noqa: ANN001, ANN201
        if self.behaviour == "fetch_unavailable":
            raise Unavailable("需要 key", checked_scope=["fake: no_key"])
        if self.behaviour == "zero_items":
            return []
        if self.behaviour == "one_empty_body":
            return [
                RawItem(
                    artifact_id="fake-1",
                    url="https://example.invalid/a",
                    body=b"",
                    content_type="text/html",
                    published_at=None,
                    as_of="2026-10-28",
                    ext="htm",
                )
            ]
        return [
            RawItem(
                artifact_id="fake-ok",
                url="https://example.invalid/ok",
                body=b"<html><body><p>hello world</p></body></html>",
                content_type="text/html",
                published_at=None,
                as_of="2026-10-28",
                ext="htm",
            )
        ]

    def normalize(self, raw, spec):  # noqa: ANN001, ANN201
        from pipelines._kit.material import MaterialDraft

        return MaterialDraft(
            material_id=raw.artifact_id,
            source_body=raw.body,
            source_ext=raw.ext,
            text="hello world",
            meta={"cat": spec.class_id, "date": "2026-10-28"},
        )


class _FakeRegistry:
    """只实现 `run_type` 用到的那一个方法。"""

    def __init__(self, behaviour: str) -> None:
        self.module = _FakeModule(behaviour)

    def adapter_for(self, spec, name):  # noqa: ANN001, ANN201
        return self.module


def _spec(status: str = "auto") -> TypeSpec:
    return TypeSpec(
        slug="fake",
        name="Fake",
        class_id="09",
        adapter="fake_adapter",
        status=status,
        sub="fake",
        frequency="daily",
        page_caliber="logical_block",
        channel_tier="T0",
        license_tier="official_public",
        params={},
    )


def _run(behaviour: str, tmp_path: Path, *, status: str = "auto", dry_run: bool = True):
    return run_type(
        _FakeRegistry(behaviour),
        _spec(status),
        as_of="2026-10-28",
        lookback_days=7,
        dry_run=dry_run,
        landing_root=tmp_path / "land",
        material_root=tmp_path / "mat",
    )


# ── 正向：有件 ──────────────────────────────────────────────────────────


def test_items_found_is_ok(tmp_path: Path) -> None:
    r = _run("one_item", tmp_path)
    assert r.status is Status.OK
    assert len(r.artifacts) == 1


# ── 关键分支：0 件 ≠ 不可用 ─────────────────────────────────────────────


def test_zero_items_is_empty_not_unavailable(tmp_path: Path) -> None:
    """★ 源回答了"窗口内 0 件" ⇒ `empty`（带 scope），**不得**判 `unavailable`。

    这就是实测踩到的那个错：`10-K` 一年一次，7 天窗口 0 件是**正确结果**。
    判成 unavailable 会让人以为 SEC 挂了，进而去查一个根本没坏的源。
    """
    r = _run("zero_items", tmp_path)
    assert r.status is Status.EMPTY
    assert r.checked_scope, "empty 必须带 checked_scope（否则被 finalize 降级成 failed）"
    assert any("命中 0 件" in s for s in r.checked_scope)


def test_empty_keeps_scope_after_finalize(tmp_path: Path) -> None:
    """`empty` 经 `finalize()` 后仍是 `empty`（不被误降级）。"""
    r = _run("zero_items", tmp_path).finalize()
    assert r.status is Status.EMPTY
    assert r.failed == []


# ── 反例：源拒答 ⇒ unavailable ──────────────────────────────────────────


def test_probe_unavailable_is_unavailable(tmp_path: Path) -> None:
    """probe 就抛（端点不可达）⇒ `unavailable` + 原因。"""
    r = _run("probe_unavailable", tmp_path)
    assert r.status is Status.UNAVAILABLE
    assert r.absent_reason
    assert any("fake" in s for s in r.checked_scope)


def test_fetch_unavailable_reports_reason(tmp_path: Path) -> None:
    """fetch 抛 `Unavailable`（如缺 key）⇒ `unavailable` 且原因逐字带出。"""
    r = _run("fetch_unavailable", tmp_path)
    assert r.status is Status.UNAVAILABLE
    assert "需要 key" in (r.absent_reason or "")


def test_missing_adapter_is_failed_not_unavailable(tmp_path: Path) -> None:
    """反例：Adapter 文件缺失 ⇒ `failed`（我们的问题），**不降级**、不报无源。"""

    class _Missing:
        def adapter_for(self, spec, name):  # noqa: ANN001, ANN201
            raise FileNotFoundError("fake_adapter.py 不存在")

    r = run_type(
        _Missing(),
        _spec(),
        as_of="2026-10-28",
        dry_run=True,
        landing_root=tmp_path / "land",
        material_root=tmp_path / "mat",
    )
    assert r.status is Status.FAILED
    assert r.failed


def test_zero_byte_item_is_failed(tmp_path: Path) -> None:
    """反例：取到 0 字节 ⇒ `failed`（0 字节等于没取到，不许记成 ok）。"""
    r = _run("one_empty_body", tmp_path)
    assert r.status is Status.FAILED
    assert any("0 字节" in m for m in r.failed)


# ── 声明型（不跑） ──────────────────────────────────────────────────────


def test_map_status_is_not_run(tmp_path: Path) -> None:
    """`status: map` ⇒ `not_run`（查表册不取数，不是失败）。"""
    spec = TypeSpec(
        slug="map1",
        name="Map",
        class_id="09",
        adapter=None,
        status="map",
        sub="map1",
        frequency="n/a",
        page_caliber="logical_block",
        channel_tier="T4",
        license_tier="official_public",
    )
    r = run_type(_FakeRegistry("one_item"), spec, as_of="2026-10-28", dry_run=True)
    assert r.status is Status.NOT_RUN


def test_unavailable_status_carries_declared_scope(tmp_path: Path) -> None:
    """`status: unavailable` 的型 ⇒ 直接回声明好的原因与 scope（不去打网络）。"""
    spec = TypeSpec(
        slug="no-source",
        name="NoSource",
        class_id="09",
        adapter=None,
        status="unavailable",
        sub="no-source",
        frequency="daily",
        page_caliber="logical_block",
        channel_tier="T1",
        license_tier="official_public",
        params={"absent_reason": "四端超时", "checked_scope": ["a.com", "b.com"]},
    )
    r = run_type(_FakeRegistry("one_item"), spec, as_of="2026-10-28", dry_run=True)
    assert r.status is Status.UNAVAILABLE
    assert r.absent_reason == "四端超时"
    assert r.checked_scope == ["a.com", "b.com"]


# ── window 计算 ─────────────────────────────────────────────────────────


def test_window_since_subtracts_days() -> None:
    """`Window.since()` 是纯函数（窗口算错会让所有型都查错日期）。"""
    assert Window(as_of="2026-10-28", lookback_days=7).since() == "2026-10-21"
    assert Window(as_of="2026-03-01", lookback_days=1).since() == "2026-02-28"

"""`test_pipelines_contract.py` —— 契约层测试（离线，不联网）。

锁四件事：
1. Registry 能扫出 34 型，键唯一，`status` 合法；
2. **三态语义不被削弱**：`empty` 缺 `checked_scope` 必须降级成 `failed`；
   `unavailable` 缺 `absent_reason` 同理；
3. 13 字段 manifest 与 `FIELDS`、`required_fields()` 三者一致；
4. 退出码三态分码（0/1/3）—— `3` 优先于 `1`。

每条正向断言都配反例（本仓纪律 `AGENTS.md §4`）。
"""

from __future__ import annotations

from datetime import date

import pytest

from pipelines._kit.artifact import (
    FIELDS,
    ClassReport,
    FetchRecord,
    Status,
    TypeResult,
    TypeSpec,
)
from pipelines._kit.registry import load_registry


# ── 1. Registry ─────────────────────────────────────────────────────────


def test_registry_covers_all_34_types() -> None:
    """34 型全部声明（与 `server/data/taxonomy.json` 的 subtype 数量对齐）。"""
    reg = load_registry()
    assert len(reg.type_keys()) == 34
    assert reg.class_ids() == ("01", "02", "03", "04", "05", "06", "07")


def test_registry_keys_are_unique() -> None:
    """全仓唯一键 `<类码>-<slug>` 不得重复（重复会让 `resolve` 有歧义）。"""
    keys = load_registry().type_keys()
    assert len(set(keys)) == len(keys)


def test_registry_rejects_bare_slug_ambiguity() -> None:
    """裸 slug 唯一时能解析；不唯一时必须抛（反例：不许静默取第一个）。"""
    reg = load_registry()
    # `consensus-ratings` 在 03，`consensus-gap` 在 07 —— 裸 slug 都唯一
    assert reg.resolve("consensus-gap").key == "07-consensus-gap"
    with pytest.raises(Exception):
        reg.resolve("不存在的型")


def test_registry_class_mismatch_raises(tmp_path) -> None:
    """反例：目录名前缀与 `class_id` 不一致必须抛（防"改目录忘改声明"）。"""
    d = tmp_path / "01-错误目录"
    d.mkdir()
    (d / "channels.yaml").write_text(
        "class_id: '02'\nclass_name: X\ntypes:\n  - slug: a\n    status: map\n",
        encoding="utf-8",
    )
    with pytest.raises(Exception):
        load_registry(tmp_path)


# ── 2. 三态语义 ─────────────────────────────────────────────────────────


def test_empty_without_checked_scope_becomes_failed() -> None:
    """`empty` 缺 `checked_scope` ⇒ 降级 `failed`（"没查就说没有"必须被拦）。"""
    r = TypeResult(slug="x", name="X", status=Status.EMPTY).finalize()
    assert r.status is Status.FAILED
    assert any("checked_scope" in m for m in r.failed)


def test_empty_with_checked_scope_stays_empty() -> None:
    """`empty` 带 `checked_scope` ⇒ 保持 `empty`（"查过确实没有"是合格答案）。"""
    r = TypeResult(
        slug="x", name="X", status=Status.EMPTY, checked_scope=["查了 2026-09-28..2026-10-28"]
    ).finalize()
    assert r.status is Status.EMPTY
    assert r.failed == []


def test_unavailable_without_reason_becomes_failed() -> None:
    """反例：`unavailable` 不给 `absent_reason` ⇒ 降级 `failed`。"""
    r = TypeResult(slug="x", name="X", status=Status.UNAVAILABLE).finalize()
    assert r.status is Status.FAILED


def test_unavailable_with_reason_keeps_gap_fields() -> None:
    """`unavailable` 的三个 gap 键都要出现在报告 JSON 里。"""
    r = TypeResult(
        slug="prediction-market",
        name="预测市场",
        status=Status.UNAVAILABLE,
        absent_reason="四端超时",
        checked_scope=["gamma-api.polymarket.com"],
        manual_ref="corpus/prompts/07-型/预测市场与事件概率.md",
    ).finalize()
    doc = r.to_json()
    assert doc["status"] == "unavailable"
    assert doc["gap"]["absent_reason"] == "四端超时"
    assert doc["gap"]["checked_scope"] == ["gamma-api.polymarket.com"]
    assert doc["gap"]["manual_ref"].endswith("预测市场与事件概率.md")


# ── 3. manifest 13 字段 ─────────────────────────────────────────────────


def test_manifest_has_exactly_13_fields() -> None:
    """13 字段是契约（多一个就多一处漂移点，少一个就不可复现）。"""
    assert len(FIELDS) == 13
    assert FetchRecord.required_fields() == FIELDS


def test_manifest_roundtrip_keeps_all_fields() -> None:
    """`to_json()` 必须产全部 13 个键（不是只有声明）。"""
    rec = FetchRecord(
        source_id="sec.edgar",
        url="https://example.invalid/x",
        http_status=200,
        fetched_at="2026-10-28T00:00:00+00:00",
        published_at=None,
        as_of="2026-10-28",
        vintage=None,
        content_hash="a" * 64,
        bytes=10,
        content_type="text/html",
        parser_version="t/1",
        license_tier="official_public",
        channel_tier="T0",
    )
    assert set(rec.to_json()) == set(FIELDS)


def test_manifest_rejects_bad_license_tier() -> None:
    """反例：非法 `license_tier` 必须抛（它决定能不能进决策逻辑）。"""
    with pytest.raises(Exception):
        FetchRecord(
            source_id="s",
            url="u",
            http_status=200,
            fetched_at="t",
            published_at=None,
            as_of="2026-10-28",
            vintage=None,
            content_hash="a",
            bytes=1,
            content_type="t",
            parser_version="p",
            license_tier="随便写的",
            channel_tier="T0",
        )


def test_manifest_rejects_bad_channel_tier() -> None:
    """反例：`channel_tier` 只认 T0–T4。"""
    with pytest.raises(Exception):
        FetchRecord(
            source_id="s",
            url="u",
            http_status=200,
            fetched_at="t",
            published_at=None,
            as_of="2026-10-28",
            vintage=None,
            content_hash="a",
            bytes=1,
            content_type="t",
            parser_version="p",
            license_tier="official_public",
            channel_tier="T9",
        )


# ── 4. 退出码三态分码 ───────────────────────────────────────────────────


def _report(*statuses: Status) -> ClassReport:
    rep = ClassReport(as_of=date(2026, 10, 28), class_id="07", class_name="情绪与预期")
    rep.types = [TypeResult(slug=f"t{i}", name="T", status=s) for i, s in enumerate(statuses)]
    return rep


def test_exit_code_all_ok() -> None:
    assert _report(Status.OK, Status.EMPTY).exit_code == 0


def test_exit_code_failed_is_1() -> None:
    assert _report(Status.OK, Status.FAILED).exit_code == 1


def test_exit_code_unavailable_is_3() -> None:
    assert _report(Status.OK, Status.UNAVAILABLE).exit_code == 3


def test_exit_code_failed_wins_over_unavailable() -> None:
    """★ `1`（failed）优先于 `3`（unavailable）—— 这是刻意的，不是笔误。

    可行动性决定优先级：`failed` 是我们的问题（可重试可修），
    `unavailable` 是世界的问题（重试无用）。若 `3` 盖住 `1`，
    Agent 看到"无源"就不重试 ⇒ **坏掉的工具会长期在线且无人发现**。
    而"哪一型不可用"的信息并不丢：它就在同一份 JSON 的 `gap` 里。
    """
    assert _report(Status.FAILED, Status.UNAVAILABLE).exit_code == 1


def test_exit_code_unavailable_still_reported_in_json() -> None:
    """反例的反面：即使退出码被 `failed` 盖住，`unavailable` 的 gap 仍必须在报告里。"""
    rep = _report(Status.FAILED, Status.UNAVAILABLE)
    rep.types[1].absent_reason = "四端超时"
    rep.types[1].checked_scope = ["polymarket"]
    doc = rep.to_json()
    gaps = [t.get("gap") for t in doc["types"] if t["status"] == "unavailable"]
    assert gaps and gaps[0]["absent_reason"] == "四端超时"


def test_exit_code_map_is_not_failure() -> None:
    """`map` 型（查表册）不取数 ⇒ 不得让整轮判成失败。"""
    assert _report(Status.OK, Status.NOT_RUN).exit_code == 0


# ── 5. TypeSpec 声明校验 ────────────────────────────────────────────────


def test_typespec_requires_adapter_for_fetching_status() -> None:
    """反例：`status=auto` 却不声明 adapter ⇒ 抛（声明与实现不一致）。"""
    with pytest.raises(Exception):
        TypeSpec(
            slug="a",
            name="A",
            class_id="01",
            adapter=None,
            status="auto",
            sub="a",
            frequency="daily",
            page_caliber="logical_block",
            channel_tier="T0",
            license_tier="official_public",
        )


def test_typespec_forbids_adapter_for_map_status() -> None:
    """反例：`status=map` 却声明了 adapter ⇒ 抛（"声明了却不跑"是静默差）。"""
    with pytest.raises(Exception):
        TypeSpec(
            slug="a",
            name="A",
            class_id="01",
            adapter="sec_edgar",
            status="map",
            sub="a",
            frequency="n/a",
            page_caliber="logical_block",
            channel_tier="T4",
            license_tier="official_public",
        )

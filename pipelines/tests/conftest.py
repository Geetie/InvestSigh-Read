"""pytest 配置：默认只跑离线用例（联网用例标 `net`）。

`net` 标记的用例会真的打 SEC / stockanalysis / CFTC 等站点。
它们**不该**出现在日常回归里（站点抖动会让门禁随机变红，而随机变红的门禁会被关掉）。
"""

from __future__ import annotations

import pytest


def pytest_configure(config: pytest.Config) -> None:
    """注册 `net` 标记（不注册会 warning）。"""
    config.addinivalue_line("markers", "net: 需要真实网络的用例（默认跳过）")


def pytest_collection_modifyitems(config: pytest.Config, items: list[pytest.Item]) -> None:
    """没显式 `-m net` 时自动跳过 `net` 用例。"""
    marker_expr = config.getoption("-m") or ""
    if "net" in marker_expr:
        return
    skip = pytest.mark.skip(reason="联网用例，需显式 -m net")
    for item in items:
        if "net" in item.keywords:
            item.add_marker(skip)

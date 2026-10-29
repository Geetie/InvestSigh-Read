"""`_kit.targets` —— 「这一轮跑哪个标的」的唯一读口。

## 为什么要有它

34 型里绝大多数需要标的（ticker）。若每个 Adapter 各自读环境变量、各自写默认值，
就会出现"SEC 走 META、stockanalysis 走 AAPL"这种静默错配——报告上两型都 `ok`，
但材料不是同一家公司的。所以标的只从这里取。

## 取值顺序（前者覆盖后者）

1. `spec.params["ticker"]`（`channels.yaml` 可把某型钉死在某个标的，注释里说明原因）
2. 环境变量 `PIPELINES_TICKER`
3. `DEFAULT_TICKER`（本仓库当前唯一标的 META）

`ticker_dir` 是 `output/<标的>/` 的目录名（小写短名），与 `corpus/materials/` 无关。
"""

from __future__ import annotations

import os

from .artifact import TypeSpec

__all__ = ["DEFAULT_TICKER", "ticker_of", "ticker_dir_of", "TickerMissing"]

#: 本仓库当前唯一标的（`corpus/materials/` 里全部材料都是它）。
DEFAULT_TICKER = "META"


class TickerMissing(RuntimeError):
    """既没有声明也没有环境变量，且默认值被显式禁用。"""


def ticker_of(spec: TypeSpec) -> str:
    """取本型本轮要跑的标的（大写 ticker）。"""
    explicit = str(spec.params.get("ticker") or "").strip()
    if explicit:
        return explicit.upper()
    env = os.environ.get("PIPELINES_TICKER", "").strip()
    if env:
        return env.upper()
    return DEFAULT_TICKER


def ticker_dir_of(spec: TypeSpec) -> str:
    """`output/<标的目录>/` 的名字（小写短名）。`channels.yaml` 可用 `ticker_dir` 覆盖。"""
    explicit = str(spec.params.get("ticker_dir") or "").strip()
    if explicit:
        return explicit.lower()
    return ticker_of(spec).lower()

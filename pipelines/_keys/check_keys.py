#!/usr/bin/env python3
"""`_keys/check_keys.py` —— 报「哪些 key 已配 / 哪些缺」。

```
python pipelines/_keys/check_keys.py --check
python pipelines/_keys/check_keys.py --check --live      # 额外打一次最小请求验 key 真有效
```

## 两条纪律

1. **只报有无，不打印值**。输出里只出现 `已配（长度 32）` / `缺`，永不出现 key 本身。
2. **不猜、不填默认**。缺就是缺；`--live` 失败也只是把该 key 标成 `无效`，
   不会去试"常见的示例 key"。

## 退出码

`0` = 全部必需 key 已配 · `1` = 有必需 key 缺失 · `2` = 输入异常

必需 vs 可选：`FRED_API_KEY` / `BLS_API_KEY` / `BEA_API_KEY` 属必需（影响 `needs_key` 型），
`EIA_API_KEY` / `USPTO_API_KEY` 属可选（缺了不影响已实现的路）。
"""

from __future__ import annotations

import argparse
import os
import sys
from dataclasses import dataclass

#: 让 `python pipelines/_keys/check_keys.py` 也能 import 到包（从子目录跑时 sys.path 不含父级）
_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _ROOT not in sys.path:
    sys.path.insert(0, os.path.dirname(_ROOT))


@dataclass(frozen=True)
class KeySpec:
    """一个 key 的声明（名字 / 必需性 / 验证用的最小请求）。"""

    env: str
    required: bool
    affects: str
    probe_url: str = ""
    probe_note: str = ""


KEYS: tuple[KeySpec, ...] = (
    KeySpec(
        env="FRED_API_KEY",
        required=True,
        affects="06 macro-cycle / 07 rates-inflation / 07 sentiment-survey",
        probe_url="https://api.stlouisfed.org/fred/series/observations",
        probe_note="series_id=CPIAUCSL&file_type=json&limit=1",
    ),
    KeySpec(
        env="BLS_API_KEY",
        required=True,
        affects="06 macro-cycle（CPI/就业/PPI 原始序列）",
        probe_note="BLS 需 POST，本脚本只查存在性（验证命令见 README）",
    ),
    KeySpec(
        env="BEA_API_KEY",
        required=True,
        affects="06 macro-cycle（GDP/PCE）",
        probe_url="https://apps.bea.gov/api/data/",
        probe_note="UserID=<key>&method=GETDATASETLIST&ResultFormat=JSON",
    ),
    KeySpec(
        env="EIA_API_KEY",
        required=False,
        affects="05 alt-data（电力，可选）",
    ),
    KeySpec(
        env="USPTO_API_KEY",
        required=False,
        affects="05 alt-data（专利全文，可选；IBD 免 key 已通）",
    ),
)


def _masked_status(value: str | None) -> str:
    """只回有无与长度，**不回值**。"""
    if not value:
        return "缺"
    return f"已配（长度 {len(value)}）"


def _live_check(spec: KeySpec, value: str) -> tuple[bool, str]:
    """打一次最小请求验 key 是否真有效。

    失败模式：网络不通也返回 `(False, 原因)`——本函数**不抛**，
    因为"检查脚本"本身不能因为网络问题变成异常。
    """
    if not spec.probe_url:
        return True, "（无最小请求，跳过验证）"
    import urllib.error
    import urllib.parse
    import urllib.request

    note = spec.probe_note or ""
    params: list[tuple[str, str]] = []
    key_name = "api_key" if "stlouisfed" in spec.probe_url else "UserID"
    params.append((key_name, value))
    if "series_id=" in note:
        for part in note.split("&"):
            if "=" in part:
                k, v = part.split("=", 1)
                params.append((k, v))
    url = spec.probe_url + "?" + urllib.parse.urlencode(params)
    try:
        with urllib.request.urlopen(
            urllib.request.Request(url, headers={"User-Agent": "InvestSigh pipelines key check"}),
            timeout=20,
        ) as resp:
            body = resp.read(4000).decode("utf-8", errors="replace")
        if resp.status == 200 and "error" not in body.lower()[:400]:
            return True, "有效"
        return False, f"HTTP {resp.status}，返回体前 120 字：{body[:120]}"
    except urllib.error.HTTPError as exc:
        return False, f"HTTP {exc.code}"
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        return False, f"网络失败：{exc}"


def main(argv: list[str] | None = None) -> int:
    """入口。`--check` 为默认行为（保留参数是为了将来加 `--export` 之类）。"""
    p = argparse.ArgumentParser(description="检查 B 类 key 是否已配置")
    p.add_argument("--check", action="store_true", help="检查（默认行为）")
    p.add_argument("--live", action="store_true", help="额外打一次最小请求验证 key 有效")
    args = p.parse_args(argv)

    missing_required = 0
    print("B 类 key 状态（只报有无，不打印值）\n")
    for spec in KEYS:
        value = os.environ.get(spec.env, "").strip()
        status = _masked_status(value)
        tag = "必需" if spec.required else "可选"
        line = f"  {spec.env:<18} {tag}  {status:<20} → {spec.affects}"
        if args.live and value:
            ok, note = _live_check(spec, value)
            line += f"｜实测：{'有效' if ok else '无效'}（{note}）"
            if not ok and spec.required:
                missing_required += 1
        elif not value and spec.required:
            missing_required += 1
        print(line)

    print()
    if missing_required:
        print(f"{missing_required} 个必需 key 缺失或无效 ⇒ 对应型为 `unavailable(no_api_key)`。")
        print("申请步骤见 pipelines/_keys/README.md（注意：FRED 申请页在本机不可达，需换网络）")
        return 1
    print("必需 key 齐备。对应型应已转 `ok`；可跑 `python -m pipelines health --class 06` 复核。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

"""`pipelines/tests/` —— 本包的测试（**不联网**为主，联网的单独标 `net`）。

跑法：

```bash
cd D:/InvestSigh/InvestSigh-Read
python -m pytest pipelines/tests -q                    # 只跑离线用例（默认）
python -m pytest pipelines/tests -q -m net             # 只跑联网用例
python -m pytest pipelines/tests -q -m "not net"       # 显式排除联网
```

## 为什么默认排除联网

联网用例会因站点抖动而随机变红，而"会随机变红的测试 = 会被关掉的测试"
（`system/CONVENTIONS.md::V-03` 同一课）。所以默认只跑**离线**用例：
它们锁的是**契约与解析逻辑**，那才是本包自己的代码。

## 每条正向用例都配反例

本仓纪律（`AGENTS.md §4` 第 3 条）：守卫必须能被触发。
所以每个 Adapter 至少有一条"端点返回错误页 ⇒ 判 failed 而非 ok"的反例。
"""

pytest_plugins: tuple[str, ...] = ()

"""`pipelines` —— InvestSigh-Read 的材料获取管道（只采美股公开材料）。

## 这个包是什么

七类材料（34 型）的**统一取数骨架**。它不是调度器：定时启动由 Agent 产品的
自动化任务调用本包 CLI 完成，本包只负责「给定一个型 + 一个日期，把材料取回来并且记账」。

## 目录约定（唯一真源 = 目录本身）

    pipelines/
    ├── _kit/                    七类共享的唯一实现（五段骨架 / 三态 / manifest / 浏览器会话）
    ├── _keys/                   B 类免费 key 的申请步骤与校验脚本（不申请、不存密钥）
    ├── _landing/<source>/<as-of>/   原件落点（只增不改；gitignore）
    ├── _profiles/               T3 浏览器会话（含 cookie；gitignore）
    ├── _runs/<as-of>/           运行报告 JSON（Agent 唯一判读面；gitignore）
    └── <NN>-<类名>/
        ├── channels.yaml        本类各型的声明（型/slug/adapter/参数/频率/频率口径/status）
        └── <adapter>.py         Adapter 实现（一个源服务多个型）

**类目录名带连字符与中文，不能当 Python 包 import** —— Adapter 一律由
`_kit.registry` 用 `importlib.util.spec_from_file_location` 按文件路径加载。

## 型的三态承诺（`status` 字段）

| status | 含义 | 运行目标态 |
|---|---|---|
| `auto` | 零密钥可全自动 | 必须 `ok` |
| `partial` | 只采到一部分（如做空四件套缺两件） | `ok` + 具名 `gap.partial` |
| `needs_key` | 缺 free key 时不可用 | 无 key ⇒ `unavailable(no_api_key)` |
| `t3` | 已购库，需人工登录的浏览器会话 | 会话有效 ⇒ `ok`；过期 ⇒ `unavailable(login_expired)` |
| `map` | 查表册/建构册，不产材料 | 不运行；报告里标 `map` |
| `unavailable` | 结构性无源 | `unavailable` + `checked_scope` |

**没有第七种态**。`empty`（查过确实无件）必须带 `checked_scope`，缺它即判 `failed`。
"""

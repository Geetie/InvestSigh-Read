"""`_kit.setup` —— 初始化编排：让 **Agent 一个人** 把 T3 渠道配到能跑。

## 分工（这条边界不能含糊）

| 谁做 | 做什么 |
|---|---|
| **账号持有人（老板）** | **只做一件事：扫码**。别的全不碰，也不需要看任何说明。 |
| **Agent** | 装依赖、建目录、拉星球 id、写配置、钉选择器、验证——全部自己做 |
| 本模块 | 把"能自动的"自动掉，把"必须人做的"压到**只剩一次扫码** |

## 可自动 / 不可自动

- ✅ 环境自检、会话检查、**拉 `group_id` 并写回 yaml**、建落地目录、最终 probe 验证
- ❌ 扫码（本质是人机交互）
- ❌ 判断哪个 CSS 选择器稳定（需要看真实 DOM 的语义，猜错比不猜更糟）
  ⇒ 所以本模块只 **dump 页面结构**，由 Agent 看完再填

## 为什么改 yaml 用行替换而不是 `yaml.safe_dump`

`t3_sources.yaml` 里全是**注释**——那些注释解释了每个选择器为什么这么填、踩过什么坑。
`yaml.safe_load` + `safe_dump` 会把注释全丢掉，等于把知识扔了。
所以只做**单行替换**：定位 `group_ids:` 那一行改值，其余一个字不动。
"""

from __future__ import annotations

import json
import re
import shutil
from dataclasses import dataclass, field
from pathlib import Path

__all__ = ["SetupStep", "SetupReport", "setup_source", "T3_YAML"]

T3_YAML = Path(__file__).resolve().parents[1] / "03-卖方与共识" / "t3_sources.yaml"


@dataclass
class SetupStep:
    """一个初始化步骤。`ok=False` 时 `detail` 必须说清**下一步做什么**。"""

    name: str
    ok: bool
    detail: str


@dataclass
class SetupReport:
    source: str
    steps: list[SetupStep] = field(default_factory=list)
    next_actions: list[str] = field(default_factory=list)

    @property
    def ok(self) -> bool:
        return all(s.ok for s in self.steps) and not self.next_actions

    def add(self, name: str, ok: bool, detail: str) -> None:
        self.steps.append(SetupStep(name, ok, detail))


# ── yaml 单行改写（保留注释） ───────────────────────────────────────────


def _read_groups(yaml_path: Path) -> list[str]:
    """读当前 `group_ids`（只为展示与幂等判断，解析失败返回空）。"""
    import yaml

    try:
        data = yaml.safe_load(yaml_path.read_text(encoding="utf-8")) or {}
    except Exception:
        return []
    for s in data.get("sources") or []:
        if s.get("id") == "zsxq":
            return [str(x) for x in ((s.get("daily") or {}).get("group_ids") or [])]
    return []


def _write_group_ids(yaml_path: Path, ids: list[str]) -> tuple[bool, str]:
    """把 `group_ids` 改成 `ids`，**只替换那一行**，其余（含注释）原样保留。

    返回 `(是否真的改了, 说明)`。幂等：值相同则不写盘。
    """
    raw = yaml_path.read_text(encoding="utf-8")
    cur = _read_groups(yaml_path)
    if cur == ids:
        return False, f"已是这些 id（{len(ids)} 个），未改动"

    new_line = "      group_ids: [" + ", ".join(f'"{i}"' for i in ids) + "]"
    # 只匹配 zsxq 段里的 group_ids 行（缩进 6 空格，值是 [] 或 [..]）
    pattern = re.compile(r"^ {6}group_ids:\s*\[[^\]]*\]\s*$", re.MULTILINE)
    if not pattern.search(raw):
        return False, "没找到 `      group_ids: [...]` 这一行（yaml 结构变了？请人工确认）"

    backup = yaml_path.with_suffix(".yaml.bak")
    shutil.copy2(yaml_path, backup)
    yaml_path.write_text(pattern.sub(new_line, raw, count=1), encoding="utf-8")
    return True, f"已写入 {len(ids)} 个 id（原文件备份到 {backup.name}）"


# ── 主流程 ─────────────────────────────────────────────────────────────


def setup_source(
    source: str,
    *,
    yaml_path: Path | None = None,
    drop_date: str | None = None,
) -> SetupReport:
    """把一个源配到"能跑"。**不自动扫码**——只检查会话并告诉人该扫了。"""
    rep = SetupReport(source=source)
    yaml_path = yaml_path or T3_YAML

    # ① 环境：必需项不全就别往下走
    from .doctor import run_doctor

    checks = run_doctor()
    bad = [c for c in checks if c.required and not c.ok]
    if bad:
        rep.add("环境自检", False, "缺必需项：" + "；".join(f"{c.name}（{c.fix}）" for c in bad))
        rep.next_actions.append("先补齐上面缺的必需依赖，再重跑 setup")
        return rep
    t3_bad = [c for c in checks if c.name.startswith(("Node", "playwright", "Chromium")) and not c.ok]
    if t3_bad:
        rep.add("T3 依赖", False, "缺：" + "；".join(f"{c.name}（{c.fix}）" for c in t3_bad))
        rep.next_actions.append("装好 T3 依赖（Node + playwright-core + 浏览器）后再跑 setup")
        return rep
    rep.add("环境自检", True, "必需项与 T3 依赖齐备")

    # ② 会话
    from .browser import BrowserUnavailable, LoginExpired, api_get, session_of

    sess = session_of(source)
    if not sess.exists:
        rep.add("登录会话", False, "没有会话")
        rep.next_actions.append(
            f"让账号持有人扫码：跑 `python -m pipelines login --source {source}`"
            "（会弹出浏览器窗口，用户只需扫码；扫完回复即可）。"
        )
        return rep
    rep.add("登录会话", True, f"{sess.state_file.name} 存在（{sess.state_file.stat().st_size} 字节）")

    # ③ 按源做后续
    if source == "zsxq":
        _setup_zsxq(rep, api_get, yaml_path)
    elif source == "ima":
        _setup_ima(rep, drop_date)
    else:
        rep.add("后续步骤", False, f"未知源 {source}（本模块只支持 zsxq / ima）")

    # ④ 最终验证：能不能过 probe
    try:
        from .http import HttpClient
        from .registry import load_registry

        reg = load_registry()
        targets = [t for t in reg.types() if str(t.params.get("source")) == source]
        for t in targets:
            module = reg.adapter(t)
            scopes = module.probe(HttpClient(), t)
            rep.add(f"验证 {t.key}", True, "；".join(str(s) for s in scopes)[:120])
    except Exception as exc:  # noqa: BLE001 — 验证失败要如实说，不能当没发生
        rep.add("最终验证", False, f"{type(exc).__name__}: {str(exc)[:150]}")
        rep.next_actions.append("按上面这条的具体原因处理；若显示 selector_not_pinned，见 docs/T3Agent引导.md §4")

    return rep


def _setup_zsxq(rep: SetupReport, api_get, yaml_path: Path) -> None:
    """拉星球列表并写回配置；再 dump 列表页结构供 Agent 钉选择器。"""
    status, body = api_get("zsxq", "https://api.zsxq.com/v2/groups")
    if status == 401:
        rep.add("拉取星球列表", False, "会话无效（接口 401）")
        rep.next_actions.append("会话已失效：让持有人重跑 `login --source zsxq` 重新扫码")
        return
    if status != 200:
        rep.add("拉取星球列表", False, f"接口返回 {status}")
        rep.next_actions.append("先确认网络能访问 api.zsxq.com，再重跑 setup")
        return

    try:
        data = json.loads(body)
    except Exception:
        rep.add("拉取星球列表", False, "返回体不是 JSON")
        return

    groups = ((data.get("resp_data") or {}).get("groups")) or []
    ids = [str(g.get("group_id")) for g in groups if g.get("group_id")]
    names = [f"{g.get('name')}({g.get('group_id')})" for g in groups]

    if not ids:
        rep.add("拉取星球列表", False, "账号名下 0 个星球")
        rep.next_actions.append(
            "这个号没有加入任何星球，所以没有可采内容。两种解法：\n"
            "    A) 要采的星球在另一个微信号下 → 让持有人用那个号重扫一次\n"
            "    B) 这个号还没加入 → 先在知识星球里加入目标星球，再重跑 setup"
        )
        return

    rep.add("拉取星球列表", True, f"{len(ids)} 个：" + "；".join(names[:5]) + ("…" if len(names) > 5 else ""))

    changed, how = _write_group_ids(yaml_path, ids)
    rep.add("写入 group_ids", True, how)

    # 选择器：只 dump，不猜
    rep.next_actions.append(
        "选择器还没钉版（这步必须 Agent 自己做，不要找人）：\n"
        "    1) 用会话打开目标星球的列表页，看真实 DOM\n"
        "    2) 把稳定的 CSS 选择器填到 t3_sources.yaml 的 daily.item_selector / attachment_selector\n"
        "    3) 重跑 `python -m pipelines health --class 03` 确认不再是 selector_not_pinned\n"
        "    判据：别用 nth-child 或含随机 hash 的 class（改版必挂）"
    )


def _setup_ima(rep: SetupReport, drop_date: str | None) -> None:
    """ima 没有可自动取的接口，只把落地目录建好并说清人工步骤。"""
    from datetime import date

    day = drop_date or date.today().isoformat()
    drop = Path(__file__).resolve().parents[1] / "_landing" / "ima" / day
    drop.mkdir(parents=True, exist_ok=True)
    rep.add("建立落地目录", True, str(drop.relative_to(Path(__file__).resolve().parents[2])))

    rep.add(
        "取数通道",
        False,
        "ima 无程序化入口（web 无知识库视图 / 客户端无接口），只能人工导出",
    )
    rep.next_actions.append(
        "让持有人在 ima 客户端里导出文件到上面那个目录（Agent 只需给一句话，不要让他读文档）：\n"
        f"    「请在 ima 客户端 → 知识库 → 点开文件 → 下载，存到 {drop}」\n"
        "    收到回执后：`ls` 该目录 → 校验 %PDF 头 + %%EOF 尾 + 页数 > 0 → 报「收到 N 份」\n"
        "    若是空的，多半存到系统下载文件夹了，去那里搬。"
    )

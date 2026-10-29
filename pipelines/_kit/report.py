"""`_kit.report` —— 运行报告的唯一写口（Agent 的唯一判读面）。

## 为什么报告是 JSON 而不是 stdout 散文

三条自动化任务（盘前自检 / 收盘后采集 / 周度）由 Agent 触发，Agent 需要回答
"哪一型没取到、为什么、要不要重试"。让 Agent 去 grep 日志 = 每换一次日志格式就得改 prompt。
所以：**结构化 JSON 落 `_runs/<as-of>/<class_id>.json`，stdout 只打一行人工摘要**。

## 报告形状（键名即契约，勿改）

    {"as_of":"2026-10-28","class_id":"07","exit_code":3,
     "types":[{"slug":"consensus-gap","status":"ok","adapter":"stockanalysis",
               "artifacts":[{"id":"…","bytes":181148,"caliber":{…}}],
               "gap":null}, …]}

`exit_code` 与 CLI 退出码同值（0/1/3），Agent 读一个地方就够。
"""

from __future__ import annotations

import json
from pathlib import Path

from .artifact import ClassReport, Status

__all__ = ["RUNS_ROOT", "write_report", "summarize", "read_latest"]

RUNS_ROOT = Path(__file__).resolve().parents[1] / "_runs"


def write_report(report: ClassReport, *, root: Path | None = None) -> Path:
    """落一份类报告，返回文件路径（`_runs/<as-of>/<class_id>.json`）。"""
    d = (root or RUNS_ROOT) / report.as_of.isoformat()
    d.mkdir(parents=True, exist_ok=True)
    f = d / f"{report.class_id}.json"
    f.write_text(
        json.dumps(report.to_json(), ensure_ascii=False, indent=1) + "\n", encoding="utf-8"
    )
    return f


def read_latest(class_id: str, *, as_of: str, root: Path | None = None) -> dict | None:
    """读某日某类的报告；不存在返回 None（调用方决定报错还是提示先跑）。"""
    f = (root or RUNS_ROOT) / as_of / f"{class_id}.json"
    return json.loads(f.read_text(encoding="utf-8")) if f.is_file() else None


def summarize(report: ClassReport) -> str:
    """一行人工摘要（stdout 用）：`<类> ok=12 empty=1 failed=0 unavailable=1 exit=3`。"""
    tally: dict[str, int] = {}
    for t in report.types:
        tally[t.status.value] = tally.get(t.status.value, 0) + 1
    parts = " ".join(f"{k}={v}" for k, v in sorted(tally.items()))
    return (
        f"{report.class_id} {report.class_name} "
        f"({len(report.types)} 型): {parts} exit={report.exit_code}"
    )


def problems(report: ClassReport) -> list[str]:
    """列出需要人/Agent 处理的条目（`failed` 与 `unavailable`），一行一条。

    `unavailable` 里若带 `action_required`，额外缩进两行说明**该找谁、做什么** ——
    这类缺口 Agent 重试无意义，必须转成人能执行的指令。
    """
    out: list[str] = []
    for t in report.types:
        if t.status is Status.FAILED:
            out.append(f"[FAILED] {t.slug}: {'；'.join(t.failed) or '未给原因'}")
        elif t.status is Status.UNAVAILABLE:
            scope = "，".join(t.checked_scope[:3])
            out.append(f"[UNAVAILABLE] {t.slug}: {t.absent_reason or '未给原因'}｜查过：{scope}")
            a = t.action_required or {}
            if a:
                who = a.get("who") or "某人"
                need = a.get("needs") or a.get("why") or ""
                out.append(f"    → [{a.get('kind') or '?'}] 需要【{who}】做：{need}")
                if a.get("command"):
                    out.append(f"      命令：{a['command']}")
    return out

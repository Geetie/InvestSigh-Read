"""`pipelines/__main__.py` —— 唯一 CLI 入口（`python -m pipelines …`）。

## 为什么要有 CLI 而不只是库

定时启动由 **Agent 产品的自动化任务** 调本包完成。Agent 需要：
① 一个不会变化的调用形态；② 一个可机读的结果（退出码 + JSON）；③ 幂等（可安全重试）。
这三个就是本 CLI 的全部设计理由。

## 子命令

```
python -m pipelines list                          # 列 34 型及其 status
python -m pipelines health  [--class 01]          # 全部/某类的 probe 汇总（不落材料）
python -m pipelines run  --class 01 --as-of 2026-10-28
python -m pipelines run  --type consensus-gap --as-of 2026-10-28
python -m pipelines run  --all --as-of 2026-10-28
python -m pipelines status --type consensus-gap --as-of 2026-10-28   # 读上次报告
python -m pipelines login --source zsxq           # T3 一次性登录（有头浏览器）
python -m pipelines t3 --source zsxq --as-of …     # T3 每日巡检下载
```

## 退出码（三态分码，Agent 据此决定下一步）

| 码 | 含义 | Agent 该做什么 |
|---|---|---|
| 0 | 全 `ok`（含带 `checked_scope` 的 `empty`） | 收工 |
| 1 | 至少一型 `failed`（工具/解析问题） | 最多重试 1 次，仍失败就贴 `failed[]` |
| 2 | 输入异常（未知型、参数缺失/格式错） | 修调用参数，不要重试 |
| 3 | 至少一型 `unavailable`（无源/无 key/登录失效） | 汇报缺口，**不要重试**（重试不改变源的存在性） |
"""

from __future__ import annotations

import argparse
import sys
from datetime import date
from pathlib import Path

from ._kit.artifact import ClassReport, Status, now_utc
from ._kit.base import run_type
from ._kit.http import HttpClient
from ._kit.registry import PIPELINES_ROOT, load_registry
from ._kit.report import problems, summarize, write_report

_EXIT_OK = 0
_EXIT_FAILED = 1
_EXIT_INPUT = 2
_EXIT_UNAVAILABLE = 3


def _parse_as_of(raw: str) -> date:
    """`--as-of` 必须是 ISO 日期；格式错抛 `ValueError`（→ exit 2）。"""
    try:
        return date.fromisoformat(raw)
    except ValueError as exc:
        raise ValueError(f"--as-of 需为 YYYY-MM-DD，收到 {raw!r}") from exc


def _http(args: argparse.Namespace) -> HttpClient:
    """按命令行参数建 HttpClient（SEC 8 req/s，其余默认 1 req/s）。"""
    return HttpClient(
        default_rate=args.rate,
        rates={"sec.edgar": 8.0, "sec.fts": 8.0, "sec.edgar.ownership": 8.0, "sec.edgar.13f": 8.0},
        timeout=args.timeout,
    )


def cmd_list(args: argparse.Namespace) -> int:
    """列全部型（Agent 与人都用它确认 slug）。"""
    reg = load_registry()
    only = getattr(args, "class_id", None)
    for c in reg.classes():
        if only and c.class_id != only:
            continue
        print(f"{c.class_id} {c.class_name} —— {c.one_liner}")
        for t in c.types:
            print(f"    {t.slug:<22} {t.status:<12} {str(t.adapter or '-'):<18} {t.name}")
    print(f"\n合计 {len(reg.type_keys())} 型")
    return _EXIT_OK


def cmd_health(args: argparse.Namespace) -> int:
    """跑 probe（不落材料、不写库），汇总每型的可达性。

    这是「盘前自检」用的：它回答"今天哪些源能用"，不产生材料。
    `map` 型不探测（不取数），`unavailable` 型直接回显声明的缺口。
    """
    reg = load_registry()
    client = _http(args)
    targets = [t for t in reg.types() if not args.class_id or t.class_id == args.class_id]

    bad = 0
    unavailable = 0
    for spec in targets:
        if spec.status == "map":
            print(f"  {spec.key:<28} map        （查表册，不取数）")
            continue
        if spec.status == "unavailable":
            print(f"  {spec.key:<28} unavailable（声明即无源）")
            unavailable += 1
            continue
        try:
            module = reg.adapter(spec)
            scopes = module.probe(client, spec)
            print(f"  {spec.key:<28} ok         {'；'.join(str(s) for s in scopes)[:110]}")
        except Exception as exc:  # noqa: BLE001 — health 要逐型报，不能一挂全挂
            print(f"  {spec.key:<28} PROBLEM    {type(exc).__name__}: {str(exc)[:110]}")
            # 带 action 的缺口说明"要人做一件事"，health 也要给人看到，否则等于没报
            act = getattr(exc, "action", None) or {}
            if act:
                print(
                    f"  {'':<28}            └ [{act.get('kind') or '?'}] "
                    f"需要【{act.get('who') or '某人'}】{act.get('needs') or act.get('why') or ''}"
                )
                if act.get("command"):
                    print(f"  {'':<28}              命令：{act['command']}")
            bad += 1

    print(f"\n探测 {len(targets)} 型：问题 {bad} ｜ 声明无源 {unavailable} ｜ 请求数 {client.request_count}")
    if bad:
        return _EXIT_UNAVAILABLE
    return _EXIT_OK


def _run_specs(
    reg, specs: list, args: argparse.Namespace, client: HttpClient
) -> tuple[dict[str, ClassReport], int]:
    """跑一组型，按类聚合成报告；返回 `(reports, exit_code)`。

    `reg` 由调用方传进来（不在这里重新加载）：`load_registry()` 要扫全部
    `channels.yaml` 并校验，每型都调一次是无谓的重复工作。
    """
    reports: dict[str, ClassReport] = {}
    for spec in specs:
        report = reports.get(spec.class_id)
        if report is None:
            decl = reg.class_of(spec.class_id)
            report = ClassReport(
                as_of=date.fromisoformat(args.as_of),
                class_id=spec.class_id,
                class_name=decl.class_name,
            )
            reports[spec.class_id] = report
        result = run_type(
            reg,
            spec,
            as_of=args.as_of,
            lookback_days=args.lookback_days,
            client=client,
            dry_run=args.dry_run,
        )
        report.types.append(result)
        state = result.status.value
        extra = f"｜{result.absent_reason[:70]}" if result.absent_reason else ""
        if result.failed:
            extra = f"｜{result.failed[0][:90]}"
        print(
            f"  {spec.key:<28} {state:<12} artifacts={len(result.artifacts):<3} "
            f"skipped={result.skipped}{extra}"
        )

    code = _EXIT_OK
    for report in reports.values():
        report.finished_at = now_utc()
        if not args.dry_run:
            f = write_report(report)
            print(f"  报告 → {f}")
        print(f"  {summarize(report)}")
        for line in problems(report):
            print(f"    {line}")
        code = max(code, report.exit_code)
    return reports, code


def cmd_run(args: argparse.Namespace) -> int:
    """跑指定型/类/全部。"""
    reg = load_registry()
    try:
        _parse_as_of(args.as_of)
    except ValueError as exc:
        print(f"输入异常：{exc}", file=sys.stderr)
        return _EXIT_INPUT

    if args.type:
        try:
            specs = [reg.resolve(args.type)]
        except Exception as exc:  # noqa: BLE001
            print(f"输入异常：{exc}", file=sys.stderr)
            return _EXIT_INPUT
    elif args.class_id:
        try:
            specs = list(reg.class_of(args.class_id).types)
        except Exception as exc:  # noqa: BLE001
            print(f"输入异常：{exc}", file=sys.stderr)
            return _EXIT_INPUT
    elif args.all:
        specs = list(reg.types())
    else:
        print("输入异常：需给 --type / --class / --all 之一", file=sys.stderr)
        return _EXIT_INPUT

    client = _http(args)
    _, code = _run_specs(reg, specs, args, client)
    return code


def cmd_status(args: argparse.Namespace) -> int:
    """读上次运行报告（不联网）。"""
    from ._kit.report import read_latest

    reg = load_registry()
    try:
        spec = reg.resolve(args.type)
    except Exception as exc:  # noqa: BLE001
        print(f"输入异常：{exc}", file=sys.stderr)
        return _EXIT_INPUT
    doc = read_latest(spec.class_id, as_of=args.as_of)
    if not doc:
        print(f"没有 {args.as_of} 的 {spec.class_id} 类报告（先跑 run）")
        return _EXIT_INPUT
    for t in doc.get("types") or []:
        if t.get("slug") == spec.slug:
            import json

            print(json.dumps(t, ensure_ascii=False, indent=1))
            return _EXIT_OK if t.get("status") == Status.OK.value else _EXIT_UNAVAILABLE
    print(f"该日报告里没有 {spec.slug}")
    return _EXIT_INPUT


def _login_cfg(source: str) -> dict:
    """从 03 类的 `t3_sources.yaml` 取该源的 `login:` 段（**选择器真源在那里**）。

    为什么不写在本文件：登录页选择器与日常列表选择器会**同时随改版失效**，
    两处各存一份必然漂移。缺文件/缺段时返回 `{}`，由 `login()` 退回 DOM 判据并如实说明。
    """
    import yaml

    f = PIPELINES_ROOT / "03-卖方与共识" / "t3_sources.yaml"
    if not f.is_file():
        return {}
    data = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
    for s in data.get("sources") or []:
        if str(s.get("id")) == source:
            return s.get("login") or {}
    return {}


def cmd_login(args: argparse.Namespace) -> int:
    """T3 一次性人工登录（**有头浏览器**，只能在人看着的机器上跑）。"""
    from ._kit.browser import login

    cfg = _login_cfg(args.source)
    try:
        state_path, verdict = login(
            args.source,
            timeout_s=args.timeout_login,
            pre_click=cfg.get("pre_click") or (),
            verify=cfg.get("verify") or None,
        )
    except Exception as exc:  # noqa: BLE001 — 登录失败要说清原因，不让栈淹没提示
        print(f"登录失败：{type(exc).__name__}: {exc}", file=sys.stderr)
        return _EXIT_FAILED
    how = (verdict.get("verdict") or {}).get("how", "?")
    v = verdict.get("verdict") or {}
    detail = (
        f"status={v.get('status')}，字段 {v.get('field') or '-'}"
        if how == "api"
        else f"正文 {v.get('bodyLen')} 字（无接口判据，退 DOM 判据）"
    )
    print(f"已保存会话 → {state_path}")
    print(f"登录判据：{how} —— {detail}")
    print("下次 `t3` 子命令会用这个会话；过期时 `status` 会报 login_expired。")
    return _EXIT_OK


def cmd_t3(args: argparse.Namespace) -> int:
    """T3 每日巡检下载（headless，用已保存会话）。"""
    reg = load_registry()
    try:
        _parse_as_of(args.as_of)
    except ValueError as exc:
        print(f"输入异常：{exc}", file=sys.stderr)
        return _EXIT_INPUT

    specs = [
        t
        for t in reg.types()
        if t.status == "t3" and (not args.source or str(t.params.get("source")) == args.source)
    ]
    if not specs:
        print(f"输入异常：没有 source={args.source!r} 的 t3 型", file=sys.stderr)
        return _EXIT_INPUT
    client = _http(args)
    _, code = _run_specs(reg, specs, args, client)
    return code


def cmd_selftest(args: argparse.Namespace) -> int:
    """跑本包静态守卫（六条断言）；失败即 exit 1。"""
    from ._kit.selftest import run_selftest

    report = run_selftest()
    for v in report.violations:
        print(f"  {v.render()}")
    print(f"\n扫描：{report.scanned}")
    if report.ok:
        print("selftest 全绿")
        return _EXIT_OK
    print(f"\n{len(report.violations)} 条违例 —— 修完再跑")
    return _EXIT_FAILED


def cmd_audit(args: argparse.Namespace) -> int:
    """入库体检：扫 `corpus/materials/`，逐条报缺件/空页/重复/无源。"""
    from ._kit.audit import audit_materials
    from ._kit.material import MATERIALS_ROOT

    root = Path(args.root) if args.root else MATERIALS_ROOT
    rep = audit_materials(root)
    print(f"扫描 {root}")
    print(f"材料 {rep.total} 份｜有 content_hash {rep.total - len(rep.no_hash)} 份｜无 hash（历史件）{len(rep.no_hash)} 份")

    v = rep.violations()
    if not v:
        print("\n全部通过（A1–A5）")
        return _EXIT_OK

    print(f"\n{len(v)} 条违例：")
    for line in v:
        print(f"  {line}")
    return _EXIT_FAILED


def cmd_doctor(args: argparse.Namespace) -> int:
    """初始化前的环境自检：分开报「必需 / T3 专属 / 可选」，每条给可执行修法。"""
    from ._kit.doctor import run_doctor, summarize

    checks = run_doctor()
    groups = {
        "必需（缺了整包跑不动）": [c for c in checks if c.required],
        "T3 专属（缺了只有知识星球/ima 不通）": [
            c for c in checks if not c.required and c.name.startswith(("Node", "playwright", "Chromium", "T3 "))
        ],
        "可选（缺了不影响主体）": [
            c
            for c in checks
            if not c.required and not c.name.startswith(("Node", "playwright", "Chromium", "T3 "))
        ],
    }
    for title, items in groups.items():
        if not items:
            continue
        print(f"\n=== {title} ===")
        for c in items:
            print(f"  {'✓' if c.ok else '✗'} {c.name}：{c.detail}")
            if not c.ok and c.fix:
                print(f"      → {c.fix}")

    code, verdict = summarize(checks)
    print(f"\n结论：{verdict}")
    return code


def cmd_setup(args: argparse.Namespace) -> int:
    """把一个 T3 源配到能跑（能自动的全自动，只剩扫码归人）。"""
    from ._kit.setup import setup_source

    try:
        rep = setup_source(args.source, drop_date=args.as_of)
    except Exception as exc:  # noqa: BLE001 — 初始化失败必须说清，不能半路静默
        print(f"初始化中断：{type(exc).__name__}: {exc}", file=sys.stderr)
        return _EXIT_FAILED

    print(f"=== {rep.source} 初始化 ===")
    for s in rep.steps:
        print(f"  {'✓' if s.ok else '✗'} {s.name}：{s.detail}")

    if rep.next_actions:
        print("\n下一步（Agent 照做，不要找人除非写明要人做）：")
        for a in rep.next_actions:
            print(f"  - {a}")
        return _EXIT_UNAVAILABLE

    print("\n全部就绪")
    return _EXIT_OK


def cmd_intake(args: argparse.Namespace) -> int:
    """采集但**不判型**：拉当天 PDF、抽正文、出清单（含每份前 800 字）。"""
    from ._kit.intake import intake_zsxq

    try:
        if args.source == "zsxq":
            path = intake_zsxq(args.as_of, limit_per_group=args.limit)
        else:
            print(f"暂不支持 source={args.source}（当前只有 zsxq）", file=sys.stderr)
            return _EXIT_INPUT
    except SystemExit as exc:
        print(str(exc), file=sys.stderr)
        return _EXIT_UNAVAILABLE

    print(f"\n下一步：读清单里的 items[].head 判定每份的型，写 mapping.json，再跑：")
    print(f'  python -m pipelines ingest --mapping "{path.parent / "mapping.json"}"')
    return _EXIT_OK


def cmd_ingest(args: argparse.Namespace) -> int:
    """按 Agent 的判读结果（mapping.json）入库到 corpus/materials。"""
    from ._kit.ingest import ingest

    try:
        written = ingest(args.mapping, as_of=args.as_of, dir_path=args.dir)
    except FileNotFoundError:
        print(f"mapping 不存在：{args.mapping}", file=sys.stderr)
        return _EXIT_INPUT
    except SystemExit as exc:
        print(str(exc), file=sys.stderr)
        return _EXIT_INPUT
    return _EXIT_OK if written else _EXIT_FAILED


def build_parser() -> argparse.ArgumentParser:
    """构造 argparse（所有子命令共享 `--as-of` 等公共项）。"""
    p = argparse.ArgumentParser(
        prog="python -m pipelines",
        description="InvestSigh-Read 材料获取管道（只采美股公开材料）",
    )
    sub = p.add_subparsers(dest="cmd", required=True)

    def common(sp: argparse.ArgumentParser) -> None:
        sp.add_argument("--as-of", default=date.today().isoformat(), help="运行日 YYYY-MM-DD")
        sp.add_argument("--dry-run", action="store_true", help="只取数+记账，不落材料")
        sp.add_argument("--lookback-days", type=int, default=7, help="回溯天数（型内声明优先）")
        sp.add_argument("--rate", type=float, default=1.0, help="默认每秒请求数（SEC 固定 8）")
        sp.add_argument("--timeout", type=float, default=30.0, help="单次请求超时秒")

    sp = sub.add_parser("list", help="列 34 型及其 status")
    sp.add_argument("--class", dest="class_id", default=None)
    sp.set_defaults(func=cmd_list)

    sp = sub.add_parser("health", help="probe 汇总（不落材料）")
    sp.add_argument("--class", dest="class_id", default=None)
    sp.add_argument("--timeout", type=float, default=30.0)
    sp.add_argument("--rate", type=float, default=1.0)
    sp.set_defaults(func=cmd_health)

    sp = sub.add_parser("run", help="跑型/类/全部")
    g = sp.add_mutually_exclusive_group()
    g.add_argument("--type", default=None, help="型键（`07-consensus-gap` 或裸 `consensus-gap`）")
    g.add_argument("--class", dest="class_id", default=None, help="类码（01–07）")
    g.add_argument("--all", action="store_true", help="全部 34 型")
    common(sp)
    sp.set_defaults(func=cmd_run)

    sp = sub.add_parser("status", help="读上次报告")
    sp.add_argument("--type", required=True)
    sp.add_argument("--as-of", default=date.today().isoformat())
    sp.set_defaults(func=cmd_status)

    sp = sub.add_parser("login", help="T3 一次性人工登录（有头）")
    sp.add_argument("--source", required=True, help="zsxq / ima")
    sp.add_argument("--timeout-login", type=float, default=300.0, help="等人扫码的秒数")
    sp.set_defaults(func=cmd_login)

    sp = sub.add_parser("t3", help="T3 每日巡检下载")
    sp.add_argument("--source", default=None, help="zsxq / ima（省略=全部 t3 型）")
    common(sp)
    sp.set_defaults(func=cmd_t3)

    sp = sub.add_parser("selftest", help="本包静态守卫（六条断言）")
    sp.set_defaults(func=cmd_selftest)

    sp = sub.add_parser("audit", help="入库体检：corpus/materials 的缺件/空页/重复/无源")
    sp.add_argument("--root", default=None, help="材料根目录（默认 corpus/materials）")
    sp.set_defaults(func=cmd_audit)

    sp = sub.add_parser("doctor", help="环境自检：必需/T3/可选三类分开报，每条给修法")
    sp.set_defaults(func=cmd_doctor)

    sp = sub.add_parser("intake", help="采集但不判型：拉 PDF、抽正文、出清单")
    sp.add_argument("--source", default="zsxq", choices=["zsxq"])
    sp.add_argument("--as-of", default=None, help="抓哪一天（默认今天）")
    sp.add_argument("--limit", type=int, default=30, help="每个星球看最近多少条主题（上限 30）")
    sp.set_defaults(func=cmd_intake)

    sp = sub.add_parser("ingest", help="按 Agent 的判读结果（mapping.json）入库")
    sp.add_argument("--mapping", required=True, help="mapping.json 路径")
    sp.add_argument("--as-of", default=None, help="日期（默认取目录名）")
    sp.add_argument("--dir", default=None, help="PDF 所在目录（默认 mapping 同级）")
    sp.set_defaults(func=cmd_ingest)

    sp = sub.add_parser("setup", help="初始化一个 T3 源（能自动的全自动，只剩扫码归人）")
    sp.add_argument("--source", required=True, choices=["zsxq", "ima"])
    sp.add_argument("--as-of", default=None, help="落地目录的日期（默认今天）")
    sp.set_defaults(func=cmd_setup)

    return p


def main(argv: list[str] | None = None) -> int:
    """入口：解析参数并分派；异常一律转成退出码（不让栈直接抛给 Agent）。"""
    args = build_parser().parse_args(argv)
    try:
        return int(args.func(args))
    except KeyboardInterrupt:
        print("已中断", file=sys.stderr)
        return _EXIT_FAILED
    except Exception as exc:  # noqa: BLE001 — 顶层兜底：Agent 需要的是一个确定的退出码
        print(f"未预期异常：{type(exc).__name__}: {exc}", file=sys.stderr)
        return _EXIT_FAILED


if __name__ == "__main__":
    raise SystemExit(main())

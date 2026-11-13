#!/usr/bin/env python3
"""ima_gui.py —— 腾讯 ima.copilot（Mac 客户端）GUI 自动化：probe / download。

背景（为什么存在）：
  Windows 上 2026-10-29 验证过的 SendInput 流程（docs/管线与入库指导.md §6.3）
  全是 Win32 API，无法移植；Mac 上的等价物是 AXUIElement（定位+AXPress）
  + CGEvent（真实输入事件兜底）。CDP 已被厂商封禁（2026-11-03 实测，
  日志原文 "DevTools remote debugging is disallowed by the system admin."），
  GUI 是唯一通道——与 t3_sources.yaml::ima 的 capability=desktop_client_only 一致。

与 Windows 版的三点不同（别照抄 §6.3）：
  ① 不用坐标盲点：Chromium 用 AXManualAccessibility 打开 web 内容树后，
     按钮是可寻址的 AXButton，AXPress 优先，坐标点击只做兜底；
  ② 另存为是原生 NSSavePanel：Cmd+Shift+G 输目录、文件名框 AXValue 直写，
     没有 Alt+D；
  ③ 客户端「下载」不走 Chromium 下载系统（History 表为空），弹的是原生面板。

前置（一次性，TCC 硬要求，脚本无法代劳）：
  系统设置 → 隐私与安全性 → 辅助功能 → 给运行本脚本的宿主（WorkBuddy/终端）
  打勾。未授权时 AXIsProcessTrusted()=False，所有 AX 调用拿空、CGEvent 被丢弃。

用法：
  python ima_gui.py probe                  # dump ima 全部窗口的 AX 树（找选择器用）
  python ima_gui.py probe --out <file>     # 同上，另存 JSON
  python ima_gui.py press --title 下载     # 在 ima 窗口里按 title/role 找按钮并 AXPress
  python ima_gui.py download --as-of 2026-11-03   # 完整单文件流程（probe 确认选择器后启用）

纪律：不绕验证码 / 不绕付费墙 / 失效即报（选择器失效报 selector_not_pinned，
      不许静默重试到撞对为止）。本脚本不内置调度、不进 run --all。
"""
from __future__ import annotations

import argparse
import json
import sys
import time

import Quartz
from ApplicationServices import (
    AXUIElementCreateApplication,
    AXUIElementCopyAttributeValue,
    AXUIElementCopyAttributeNames,
    AXUIElementSetAttributeValue,
    AXUIElementCopyAttributeValue,
    AXIsProcessTrusted,
    AXValueCreate,
    kAXValueAttribute,
    kAXPositionAttribute,
    kAXSizeAttribute,
    kAXPressAction,
    kAXRoleAttribute,
    kAXTitleAttribute,
    kAXChildrenAttribute,
    kAXWindowsAttribute,
    kAXFocusedWindowAttribute,
    kCFStringEncodingUTF8,
)
import CoreFoundation as CF
from AppKit import NSWorkspace
import objc

BUNDLE_ID = "com.tencent.imamac"
APP_NAME = "ima.copilot"

# Chromium 打开 web 内容 AX 树的开关（对 Electron/Chromium 系普遍有效）
AX_MANUAL_ACCESSIBILITY = "AXManualAccessibility"
AX_ENHANCED_USER_INTERFACE = "AXEnhancedUserInterface"

MAX_DEPTH = 30          # AX 树遍历上限，防环
MAX_NODES = 20000       # 节点总数上限


def fail(msg: str, code: int = 1):
    print(f"[ima_gui] FAIL: {msg}", file=sys.stderr)
    sys.exit(code)


def find_ima_pid() -> int:
    apps = NSWorkspace.sharedWorkspace().runningApplications()
    hits = [a for a in apps if a.bundleIdentifier() == BUNDLE_ID]
    if not hits:
        fail(f"未找到运行中的 {APP_NAME}（bundleIdentifier={BUNDLE_ID}）。先打开客户端。", 2)
    return hits[0].processIdentifier()


def check_ax_trusted():
    if not AXIsProcessTrusted():
        fail(
            "辅助功能权限未授予（AXIsProcessTrusted=False）。\n"
            "  系统设置 → 隐私与安全性 → 辅助功能 → 给运行本脚本的宿主 App 打勾，\n"
            "  打勾后可能需要重开宿主再试。这是 TCC 硬要求，脚本无法代劳。",
            3,
        )


def ax_get(el, attr):
    """AX 取属性，失败返回 None（AX 错误一律不炸，探测模式要能走完）。"""
    err, val = AXUIElementCopyAttributeValue(el, attr, None)
    if err != 0:
        return None
    return val


def ax_attr_names(el):
    err, names = AXUIElementCopyAttributeNames(el, None)
    return list(names) if err == 0 else []


def ax_set(el, attr, val):
    return AXUIElementSetAttributeValue(el, attr, val)


def make_cfstring(s: str):
    return CF.CFStringCreateWithCString(None, s, kCFStringEncodingUTF8)


def ax_point_value(x: float, y: float):
    point = Quartz.CGPointMake(x, y)
    return AXValueCreate(kAXPositionAttribute, point)


def ax_size_value(w: float, h: float):
    size = Quartz.CGSizeMake(w, h)
    return AXValueCreate(kAXSizeAttribute, size)


def ax_value_to_tuple(val):
    """AXValue(点/尺寸) → (x, y) / (w, h)。"""
    if val is None:
        return None
    try:
        t = Quartz.AXValueGetType(val)
        if t == Quartz.kAXValueCGPointType:
            p = Quartz.CGPoint()
            Quartz.AXValueGetValue(val, Quartz.kAXValueCGPointType, p)
            return (p.x, p.y)
        if t == Quartz.kAXValueCGSizeType:
            s = Quartz.CGSize()
            Quartz.AXValueGetValue(val, Quartz.kAXValueCGSizeType, s)
            return (s.width, s.height)
    except Exception:
        pass
    return None


def el_geometry(el):
    pos = ax_value_to_tuple(ax_get(el, kAXPositionAttribute))
    size = ax_value_to_tuple(ax_get(el, kAXSizeAttribute))
    if pos and size:
        return {"pos": pos, "size": size}
    return None


def el_summary(el) -> dict:
    role = ax_get(el, kAXRoleAttribute)
    title = ax_get(el, kAXTitleAttribute)
    val = ax_get(el, kAXValueAttribute)
    desc = ax_get(el, "AXDescription")
    help_ = ax_get(el, "AXHelp")
    def as_str(x):
        if x is None:
            return None
        if isinstance(x, str):
            return x[:120]
        if isinstance(x, (int, float)):
            return x
        return str(x)[:60]
    d = {
        "role": as_str(role),
        "title": as_str(title),
        "description": as_str(desc),
        "help": as_str(help_),
        "value": as_str(val) if not isinstance(val, (str, int, float)) else as_str(val),
    }
    g = el_geometry(el)
    if g:
        d["geometry"] = g
    return d


def dump_tree(el, depth=0, counter=None, out=None, max_depth=MAX_DEPTH):
    """递归 dump AX 树为 dict（role/title/desc/geometry + children）。"""
    if counter is None:
        counter = [0]
    if out is None:
        out = []
    if depth > max_depth or counter[0] > MAX_NODES:
        return None
    counter[0] += 1
    node = el_summary(el)
    out.append(node)
    kids = ax_get(el, kAXChildrenAttribute)
    if kids:
        node["children"] = []
        for k in kids:
            child_node = dump_tree(k, depth + 1, counter, out, max_depth)
            if child_node is not None:
                node["children"].append(child_node)
    return node


def open_accessibility(app_el):
    """Chromium 系：先开 AXManualAccessibility，否则 web 内容整棵树不可见。"""
    r1 = ax_set(app_el, AX_MANUAL_ACCESSIBILITY, True)
    r2 = ax_set(app_el, AX_ENHANCED_USER_INTERFACE, True)
    return r1, r2


def activate_ima():
    """把 ima 调到前台（NSSavePanel 的键盘操作需要 app 在前台）。"""
    apps = NSWorkspace.sharedWorkspace().runningApplications()
    for a in apps:
        if a.bundleIdentifier() == BUNDLE_ID:
            a.activateWithOptions_(1)  # NSApplicationActivateIgnoringOtherApps
            return True
    return False


def iter_elements(root, max_depth=MAX_DEPTH):
    """先序遍历 AX 元素（yield 原生元素引用）。"""
    stack = [(root, 0)]
    n = 0
    while stack and n < MAX_NODES:
        el, d = stack.pop()
        n += 1
        yield el, d
        if d >= max_depth:
            continue
        kids = ax_get(el, kAXChildrenAttribute)
        if kids:
            for k in reversed(list(kids)):
                stack.append((k, d + 1))


def find_elements(app_el, *, role=None, title_contains=None, desc_contains=None,
                  value_contains=None, limit=20):
    """按条件找 AX 元素。全部条件都是「包含」匹配，None 表示不限。"""
    hits = []
    for el, _d in iter_elements(app_el):
        if len(hits) >= limit:
            break
        if role is not None:
            r = ax_get(el, kAXRoleAttribute)
            if not r or role.lower() not in str(r).lower():
                continue
        if title_contains is not None:
            t = ax_get(el, kAXTitleAttribute)
            if not t or title_contains not in str(t):
                continue
        if desc_contains is not None:
            ds = ax_get(el, "AXDescription")
            if not ds or desc_contains not in str(ds):
                continue
        if value_contains is not None:
            v = ax_get(el, kAXValueAttribute)
            if not v or value_contains not in str(v):
                continue
        hits.append(el)
    return hits


def ax_press(el) -> bool:
    """AXPress 动作。失败返回 False（调用方可降级坐标点击）。"""
    err = Quartz.AXUIElementPerformAction(el, kAXPressAction)
    return err == 0


# ── 输入兜底层（CGEvent，真实输入事件，mac 版 SendInput）──────────────────

KEYCODES = {
    "return": 36, "esc": 53, "tab": 48, "space": 49,
    "delete": 51, "down": 125, "up": 126, "left": 123, "right": 124,
    "g": 5, "w": 13, "d": 2, "l": 37, "f": 3,
}


def click_at(x, y):
    """坐标点击（物理像素点坐标，与 AXPosition 同一坐标系）。"""
    for etype, btn in ((Quartz.kCGEventLeftMouseDown, Quartz.kCGMouseButtonLeft),
                       (Quartz.kCGEventLeftMouseUp, Quartz.kCGMouseButtonLeft)):
        ev = Quartz.CGEventCreateMouseEvent(None, etype, Quartz.CGPointMake(x, y), btn)
        Quartz.CGEventPost(Quartz.kCGHIDEventTap, ev)
        time.sleep(0.03)


def move_to(x, y):
    ev = Quartz.CGEventCreateMouseEvent(
        None, Quartz.kCGEventMouseMoved, Quartz.CGPointMake(x, y), Quartz.kCGMouseButtonLeft)
    Quartz.CGEventPost(Quartz.kCGHIDEventTap, ev)
    time.sleep(0.02)


def click_element(el):
    """AXPress 优先，失败降级几何中心坐标点击。返回实际用的方式。"""
    if ax_press(el):
        return "axpress"
    g = el_geometry(el)
    if not g:
        return None
    (x, y), (w, h) = g["pos"], g["size"]
    cx, cy = x + w / 2, y + h / 2
    move_to(cx, cy)
    time.sleep(0.05)
    click_at(cx, cy)
    return "cgclick"


def key_combo(*mods_and_key):
    """key_combo('cmd','shift','g') / key_combo('return')。"""
    mods = 0
    key = None
    mod_map = {"cmd": Quartz.kCGEventFlagMaskCommand, "shift": Quartz.kCGEventFlagMaskShift,
               "alt": Quartz.kCGEventFlagMaskAlternate, "ctrl": Quartz.kCGEventFlagMaskControl}
    for m in mods_and_key:
        if m in mod_map:
            mods |= mod_map[m]
        else:
            key = m
    if key is None:
        fail("key_combo 缺主键")
    kc = KEYCODES[key]
    down = Quartz.CGEventCreateKeyboardEvent(None, kc, True)
    up = Quartz.CGEventCreateKeyboardEvent(None, kc, False)
    Quartz.CGEventSetFlags(down, mods)
    Quartz.CGEventSetFlags(up, mods)
    Quartz.CGEventPost(Quartz.kCGHIDEventTap, down)
    time.sleep(0.02)
    Quartz.CGEventPost(Quartz.kCGHIDEventTap, up)
    time.sleep(0.05)


def type_text(text: str):
    """Unicode 直灌（中英文/路径都走这里，不依赖键盘布局）。"""
    for ch in text:
        ev = Quartz.CGEventCreateKeyboardEvent(None, 0, True)
        Quartz.CGEventKeyboardSetUnicodeString(ev, len(ch), ch)
        Quartz.CGEventPost(Quartz.kCGHIDEventTap, ev)
        up = Quartz.CGEventCreateKeyboardEvent(None, 0, False)
        Quartz.CGEventKeyboardSetUnicodeString(up, len(ch), ch)
        Quartz.CGEventPost(Quartz.kCGHIDEventTap, up)
        time.sleep(0.01)


# ── 子命令 ────────────────────────────────────────────────────────────────

# ── 窗口几何与截屏（web 内容无 AX 树，坐标校准靠截屏）────────────────────

import subprocess


def ima_window_bounds():
    """CGWindowList 取 ima 主窗口 bounds（不需要额外权限）。
    返回 [(window_number, (x, y, w, h)), ...] 按面积降序。"""
    wl = Quartz.CGWindowListCopyWindowInfo(
        Quartz.kCGWindowListOptionOnScreenOnly | Quartz.kCGWindowListExcludeDesktopElements,
        Quartz.kCGNullWindowID)
    out = []
    for w in wl:
        if w.get("kCGWindowOwnerPID") != find_ima_pid():
            continue
        b = w.get("kCGWindowBounds")
        if not b:
            continue
        x, y, wd, ht = b["X"], b["Y"], b["Width"], b["Height"]
        if wd < 200 or ht < 200:  # 排除小浮层
            continue
        out.append((w.get("kCGWindowNumber"), (x, y, wd, ht), w.get("kCGWindowName")))
    out.sort(key=lambda t: -(t[1][2] * t[1][3]))
    return out


def cmd_bounds(args):
    check_ax_trusted()
    for num, (x, y, w, h), name in ima_window_bounds():
        print(f"win#{num}  x={x} y={y} w={w} h={h}  name={name!r}")


def cmd_shot(args):
    """screencapture 单窗口。需要宿主有「屏幕录制」权限。"""
    wins = ima_window_bounds()
    if not wins:
        fail("找不到 ima 窗口", 2)
    num, b, name = wins[args.index] if args.index < len(wins) else wins[0]
    subprocess.run(["screencapture", "-x", "-o", "-l", str(num), args.out], check=False)
    print(f"[ima_gui] 窗口{args.index} win#{num} {b} → {args.out}")


def cmd_click(args):
    """窗口相对坐标点击（原点=窗口左上）。--abs 用绝对屏幕坐标。"""
    check_ax_trusted()
    if args.abs:
        x, y = args.x, args.y
    else:
        wins = ima_window_bounds()
        if not wins:
            fail("找不到 ima 窗口", 2)
        _, (wx, wy, _, _), _ = wins[0]
        x, y = wx + args.x, wy + args.y
    move_to(x, y)
    time.sleep(0.05)
    click_at(x, y)
    print(f"[ima_gui] clicked abs=({x},{y})")


def cmd_key(args):
    check_ax_trusted()
    if args.text is not None:
        type_text(args.text)
        print(f"[ima_gui] typed: {args.text!r}")
    else:
        key_combo(*args.combo)
        print(f"[ima_gui] keyed: {'+'.join(args.combo)}")


def cmd_probe(args):
    check_ax_trusted()
    pid = find_ima_pid()
    app_el = AXUIElementCreateApplication(pid)
    r1, r2 = open_accessibility(app_el)
    print(f"[ima_gui] pid={pid} AXManualAccessibility→{r1} AXEnhancedUserInterface→{r2}")

    time.sleep(1.0)  # 等 Chromium 把 web 树展开
    windows = ax_get(app_el, kAXWindowsAttribute) or []
    print(f"[ima_gui] 窗口数: {len(windows)}")
    dump = []
    for i, w in enumerate(windows):
        node = dump_tree(w)
        dump.append({"window_index": i, **{k: v for k, v in (node or {}).items()}})
        s = el_summary(w)
        print(f"  窗口{i}: role={s['role']} title={s['title']!r} geom={s.get('geometry')}")
    names = ax_attr_names(app_el)
    print(f"[ima_gui] app 级属性: {names}")

    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            json.dump(dump, f, ensure_ascii=False, indent=1)
        print(f"[ima_gui] 树已写入 {args.out}（{len(dump)} 窗口）")
    else:
        print(json.dumps(dump, ensure_ascii=False, indent=1)[:20000])


def cmd_find(args):
    check_ax_trusted()
    pid = find_ima_pid()
    app_el = AXUIElementCreateApplication(pid)
    open_accessibility(app_el)
    time.sleep(0.8)
    hits = find_elements(
        app_el,
        role=args.role, title_contains=args.title,
        desc_contains=args.desc, value_contains=args.value,
        limit=args.limit,
    )
    print(f"[ima_gui] 命中 {len(hits)} 个：")
    out = []
    for el in hits:
        s = el_summary(el)
        s["pressable"] = ax_press is not None
        out.append(s)
        print(json.dumps(s, ensure_ascii=False))
    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            json.dump(out, f, ensure_ascii=False, indent=1)


def cmd_press(args):
    check_ax_trusted()
    pid = find_ima_pid()
    app_el = AXUIElementCreateApplication(pid)
    open_accessibility(app_el)
    time.sleep(0.8)
    hits = find_elements(app_el, title_contains=args.title, role=args.role, limit=5)
    if not hits:
        fail(f"没找到 title 含 {args.title!r} 的元素（先 probe 看树）", 4)
    how = click_element(hits[0])
    print(f"[ima_gui] 已点击（方式={how}）: {el_summary(hits[0])}")


def cmd_download(args):
    fail("完整 download 流程等 probe 确认选择器后再启用（先跑 probe / find）", 9)


def main():
    ap = argparse.ArgumentParser(description="ima.copilot GUI 自动化（AX 优先，CGEvent 兜底）")
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("bounds", help="列出 ima 窗口 bounds")
    p.set_defaults(func=cmd_bounds)

    p = sub.add_parser("shot", help="截 ima 窗口（需屏幕录制权限）")
    p.add_argument("--out", required=True)
    p.add_argument("--index", type=int, default=0)
    p.set_defaults(func=cmd_shot)

    p = sub.add_parser("click", help="坐标点击（默认窗口相对）")
    p.add_argument("--x", type=float, required=True)
    p.add_argument("--y", type=float, required=True)
    p.add_argument("--abs", action="store_true", help="用绝对屏幕坐标")
    p.set_defaults(func=cmd_click)

    p = sub.add_parser("key", help="按键组合或输入文本")
    p.add_argument("combo", nargs="*", help="如 cmd shift g / return / esc")
    p.add_argument("--text", help="Unicode 文本直灌")
    p.set_defaults(func=cmd_key)

    p = sub.add_parser("probe", help="dump ima 窗口 AX 树")
    p.add_argument("--out", help="树 JSON 输出路径")
    p.set_defaults(func=cmd_probe)

    p = sub.add_parser("find", help="按条件找元素")
    p.add_argument("--role"); p.add_argument("--title")
    p.add_argument("--desc"); p.add_argument("--value")
    p.add_argument("--limit", type=int, default=20)
    p.add_argument("--out")
    p.set_defaults(func=cmd_find)

    p = sub.add_parser("press", help="按 title 找元素并点击")
    p.add_argument("--title", required=True)
    p.add_argument("--role")
    p.set_defaults(func=cmd_press)

    p = sub.add_parser("download", help="完整下载流程（占位）")
    p.add_argument("--as-of", required=True)
    p.add_argument("--file")
    p.set_defaults(func=cmd_download)

    args = ap.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()

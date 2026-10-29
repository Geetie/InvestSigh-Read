"""`_kit.registry` —— 型声明的**唯一读取口**（Registry 模式）。

## 目录即真源

`registry` 扫描 `pipelines/*/channels.yaml` 汇总，**代码里零枚举型名**。
理由是本仓实测过的教训：同一份清单在两处写必然漂移
（`system/scripts/ops/verify.py` 的超时列被删、`gen_templates.py` 的"分册清单 = 目录"）。
34 型若写进代码，增删一个型就要改代码，且守卫看不见"声明与实现不一致"。

## Adapter 的加载方式（为什么走文件路径而不是 import 包）

类目录名是 `01-监管一手披露` 这种带数字前缀与中文的名字，**不是合法 Python 包名**，
不能 `import pipelines.01-监管一手披露.sec_edgar`。所以按文件路径加载：

    spec_from_file_location("pipelines_adapters.<class>.<name>", "<类目录>/<adapter>.py")

这样 Adapter 仍是普通模块（可被 pytest 直接 import 测试），目录名不受 Python 标识符限制。
"""

from __future__ import annotations

import importlib.util
import sys
from dataclasses import dataclass
from pathlib import Path
from types import ModuleType
from typing import Any, Iterator, Mapping

import yaml

from .artifact import ManifestError, TypeSpec

__all__ = ["Registry", "ClassDecl", "load_registry", "PIPELINES_ROOT"]

#: `pipelines/` 根目录（本文件在 `pipelines/_kit/registry.py`，上两级即根）。
PIPELINES_ROOT = Path(__file__).resolve().parents[1]

_CLASS_DIR_GLOB = "[0-9][0-9]-*"
_CHANNELS_FILE = "channels.yaml"


@dataclass(frozen=True)
class ClassDecl:
    """一个类的声明（`channels.yaml` 的类级字段 + 该类的型列表 + 目录）。"""

    class_id: str
    class_name: str
    dir: Path
    one_liner: str
    types: tuple[TypeSpec, ...]

    def type_by_slug(self, slug: str) -> TypeSpec | None:
        """按 slug 找型；找不到返回 None（调用方决定报 404 还是 fail）。"""
        for t in self.types:
            if t.slug == slug:
                return t
        return None


class Registry:
    """全部类的声明集合 + Adapter 模块缓存。"""

    def __init__(self, classes: Mapping[str, ClassDecl]) -> None:
        self._classes = dict(classes)
        self._modules: dict[tuple[str, str], ModuleType] = {}

    # ── 查询 ────────────────────────────────────────────────────────────
    def classes(self) -> tuple[ClassDecl, ...]:
        """按类码升序的全部类。"""
        return tuple(self._classes[k] for k in sorted(self._classes))

    def class_ids(self) -> tuple[str, ...]:
        """类码元组（`("01", …, "07")`）。"""
        return tuple(sorted(self._classes))

    def class_of(self, class_id: str) -> ClassDecl:
        """取一个类；类码不存在即抛（不静默返回空）。"""
        try:
            return self._classes[class_id]
        except KeyError:
            raise ManifestError(
                f"未知类码 {class_id!r}；已声明={sorted(self._classes)}"
            ) from None

    def types(self) -> Iterator[TypeSpec]:
        """遍历全部型。"""
        for c in self.classes():
            yield from c.types

    def type_keys(self) -> tuple[str, ...]:
        """全部型的全仓唯一键（`<类码>-<slug>`）。"""
        return tuple(t.key for t in self.types())

    def resolve(self, key: str) -> TypeSpec:
        """按 `<类码>-<slug>` 或裸 `slug` 解析一个型；歧义/不存在即抛。"""
        hits = [t for t in self.types() if t.key == key]
        if not hits:
            hits = [t for t in self.types() if t.slug == key]
        if not hits:
            raise ManifestError(f"未知型 {key!r}；可用键见 `python -m pipelines list`")
        if len(hits) > 1:
            raise ManifestError(
                f"型 {key!r} 有歧义：{sorted(t.key for t in hits)}（请写全 `<类码>-<slug>`）"
            )
        return hits[0]

    # ── Adapter 模块 ────────────────────────────────────────────────────
    def _adapter_path(self, spec: TypeSpec, name: str) -> Path:
        """定位 Adapter 文件：**本类目录优先，再全库找**。

        跨类复用是常态而非例外：`stockanalysis` 一个 Adapter 同时服务
        `03 consensus-ratings` 与 `07 consensus-gap` 与 `04 short-option`；
        `sec_edgar` 服务 01 类全部 6 型。若只允许同目录，就得复制三份同样的代码
        ——复制的那天起，三份就开始各自漂移。

        歧义（同名文件出现在多个类目录）⇒ 报错，逼调用方消歧，不做"取第一个"的静默选择。
        """
        own = self.class_of(spec.class_id).dir / f"{name}.py"
        if own.is_file():
            return own
        hits = sorted(
            d / f"{name}.py" for d in (c.dir for c in self.classes()) if (d / f"{name}.py").is_file()
        )
        if not hits:
            raise ManifestError(
                f"{spec.key}: Adapter 文件不存在（查过本类目录与全库）：{name}.py"
            )
        if len(hits) > 1:
            raise ManifestError(
                f"{spec.key}: Adapter 名 {name!r} 在多个类目录下都有，请消歧："
                + ", ".join(str(h.parent.name) for h in hits)
            )
        return hits[0]

    def adapter_for(self, spec: TypeSpec, name: str) -> ModuleType:
        """加载某型在某类目录下的 Adapter 模块（按文件路径，进程内缓存）。

        `name` 显式给，便于 Strategy 降级链按序试多个 Adapter。

        失败模式：
        - `name` 为空 ⇒ `ManifestError`
        - 文件不存在 ⇒ `ManifestError`（**不降级**，缺实现就是缺实现）
        - 模块缺 `source_id` / `parser_version` / 三个钩子 ⇒ `ManifestError`
          （声明与实现不一致必须响亮，否则 `manifest` 会写出空 `source_id`）
        """
        if not name:
            raise ManifestError(f"{spec.key}: 未声明 adapter（status={spec.status} 不需取数）")
        cache_key = (spec.class_id, name)
        if cache_key in self._modules:
            return self._modules[cache_key]

        path = self._adapter_path(spec, name)
        mod_name = f"pipelines_adapters.c{spec.class_id}.{name}"
        spec_obj = importlib.util.spec_from_file_location(mod_name, path)
        if spec_obj is None or spec_obj.loader is None:
            raise ManifestError(f"{spec.key}: 无法加载 Adapter {path}")
        module = importlib.util.module_from_spec(spec_obj)
        # 让 Adapter 能 `from pipelines._kit... import ...`
        if "pipelines" not in sys.modules:
            sys.path.insert(0, str(PIPELINES_ROOT.parent))
        sys.modules[mod_name] = module
        spec_obj.loader.exec_module(module)

        missing = [
            attr
            for attr in ("source_id", "parser_version", "probe", "fetch", "normalize")
            if not hasattr(module, attr)
        ]
        if missing:
            raise ManifestError(f"{path}: Adapter 缺 {missing}（声明与实现不一致）")

        self._modules[cache_key] = module
        return module

    def adapter(self, spec: TypeSpec) -> ModuleType:
        """加载某型**声明的**那个 Adapter（`fallback` 链请用 `adapter_for`）。"""
        if not spec.adapter:
            raise ManifestError(f"{spec.key}: 未声明 adapter（status={spec.status} 不需取数）")
        return self.adapter_for(spec, spec.adapter)


def _as_tuple(value: Any) -> tuple[str, ...]:
    """把 YAML 的 list / scalar 统一成字符串元组（`pitfalls` 允许留空）。"""
    if value is None:
        return ()
    if isinstance(value, str):
        return (value,)
    return tuple(str(v) for v in value)


def _parse_type(raw: Mapping[str, Any], class_id: str, class_name: str, src: Path) -> TypeSpec:
    """把 `channels.yaml` 的一行型声明转成 `TypeSpec`；缺字段响亮失败。"""
    slug = str(raw.get("slug") or "").strip()
    if not slug:
        raise ManifestError(f"{src}: 有一个型缺 `slug`")
    manual_default = f"corpus/prompts/{class_id}-型/{raw.get('name', slug)}.md"
    return TypeSpec(
        slug=slug,
        name=str(raw.get("name") or slug),
        class_id=class_id,
        adapter=(str(raw["adapter"]) if raw.get("adapter") else None),
        status=str(raw.get("status") or ""),
        sub=str(raw.get("sub") or slug),
        frequency=str(raw.get("frequency") or "unspecified"),
        page_caliber=str(raw.get("page_caliber") or "physical_page"),
        channel_tier=str(raw.get("channel_tier") or "T0"),
        license_tier=str(raw.get("license_tier") or "official_public"),
        params=dict(raw.get("params") or {}),
        pitfalls=_as_tuple(raw.get("pitfalls")),
        manual_ref=str(raw.get("manual_ref") or manual_default),
    )


def load_registry(root: Path | None = None) -> Registry:
    """扫描 `pipelines/*/channels.yaml` 建 Registry。

    失败模式（全部响亮）：
    - 一个类目录都没有 ⇒ `ManifestError`
    - `channels.yaml` 缺 `class_id` / `class_name` / `types` ⇒ `ManifestError`
    - 同一 `class_id` 出现两次、同一类内 `slug` 重复 ⇒ `ManifestError`
    - 类目录名前缀与 `class_id` 不一致 ⇒ `ManifestError`（防止改目录名忘改声明）
    """
    base = (root or PIPELINES_ROOT).resolve()
    dirs = sorted(d for d in base.glob(_CLASS_DIR_GLOB) if d.is_dir())
    if not dirs:
        raise ManifestError(f"{base} 下没有任何类目录（期望 `<NN>-<类名>/`）")

    classes: dict[str, ClassDecl] = {}
    for d in dirs:
        f = d / _CHANNELS_FILE
        if not f.is_file():
            raise ManifestError(f"{d.name}: 缺 {_CHANNELS_FILE}")
        data = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
        class_id = str(data.get("class_id") or "").strip()
        class_name = str(data.get("class_name") or "").strip()
        if not class_id or not class_name:
            raise ManifestError(f"{f}: 缺 class_id 或 class_name")
        if not d.name.startswith(class_id):
            raise ManifestError(f"{f}: 目录名 {d.name!r} 与 class_id={class_id!r} 不一致")
        if class_id in classes:
            raise ManifestError(f"{f}: class_id={class_id!r} 重复声明")
        raw_types = data.get("types") or []
        if not raw_types:
            raise ManifestError(f"{f}: types 为空")

        types = tuple(_parse_type(t, class_id, class_name, f) for t in raw_types)
        seen: set[str] = set()
        for t in types:
            if t.slug in seen:
                raise ManifestError(f"{f}: slug {t.slug!r} 在本类内重复")
            seen.add(t.slug)
        classes[class_id] = ClassDecl(
            class_id=class_id,
            class_name=class_name,
            dir=d,
            one_liner=str(data.get("one_liner") or ""),
            types=types,
        )

    return Registry(classes)

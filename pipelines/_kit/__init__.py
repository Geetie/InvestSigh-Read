"""`pipelines._kit` —— 七类共享的唯一实现（五段骨架 / 三态 / manifest / 落盘 / 报告 / 浏览器会话）。

对外只暴露各子模块的公开名字；不要在 Adapter 里 import 私有名。
"""

from __future__ import annotations

from .artifact import (
    Artifact,
    ClassReport,
    FetchRecord,
    Status,
    TypeResult,
    TypeSpec,
    now_utc,
    sha256_hex,
)
from .http import HttpClient, FetchError, SEC_UA, DEFAULT_UA
from .land import Landing, LandResult, LANDING_ROOT
from .material import (
    MATERIALS_ROOT,
    MaterialDraft,
    html_to_text,
    split_logical_pages,
    write_material,
)
from .registry import PIPELINES_ROOT, ClassDecl, Registry, load_registry

__all__ = [
    "Artifact",
    "ClassReport",
    "ClassDecl",
    "DEFAULT_UA",
    "FetchError",
    "FetchRecord",
    "HttpClient",
    "LANDING_ROOT",
    "LandResult",
    "Landing",
    "MATERIALS_ROOT",
    "MaterialDraft",
    "PIPELINES_ROOT",
    "Registry",
    "SEC_UA",
    "Status",
    "TypeResult",
    "TypeSpec",
    "html_to_text",
    "load_registry",
    "now_utc",
    "sha256_hex",
    "split_logical_pages",
    "write_material",
]

"""`_kit.http` —— 唯一出网口：UA、令牌桶限速、指数退避、条件请求。

## 为什么七类共用一份

三个数一旦各写一遍就会漂移，而这三个数都是**合规要求**不是偏好：

| 约束 | 值 | 出处 |
|---|---|---|
| SEC 必须声明可识别 UA | `InvestSigh research pipeline (contact: …)` | SEC 明文（`tools/pdf-pipeline/SKILL.md`「SEC 下载的两条硬规定」） |
| SEC ≤10 请求/秒 | 本包取 **8 req/s** 留余量 | 同上（明文要求 ≤10） |
| 其余站点默认 1 req/s | `1.0` | `docs/v7/数据通道方案_2026-10-20.md §6.3` |

## 退避与"停该源"

`429` / `5xx` → 指数退避 `1s / 4s / 16s` 三次；仍失败抛 `FetchError`，
由 `base.py` 记 `unavailable` 并**停该源、其余源继续**——一个源挂掉不该拖垮整类。

## 条件请求

落盘物带 `etag` / `last_modified`（存在 `_landing` 侧的 manifest 里），
下次带 `If-None-Match` / `If-Modified-Since`；`304` 记 `skipped`，**不进新件**。
这既省流量也是幂等的第一道闸。
"""

from __future__ import annotations

import gzip
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from typing import Mapping, Sequence

__all__ = ["HttpResponse", "FetchError", "HttpClient", "DEFAULT_UA", "SEC_UA"]

#: SEC 要求可识别的 UA（实名 + 联系方式）；改它等于违反 SEC 的访问条款。
SEC_UA = "InvestSigh research pipeline (contact: local@example.com)"

#: 默认 UA（非 SEC 站点）。带 `Mozilla/5.0` 前缀是必要条件而非伪装：
#: 实测 `stockanalysis.com` 对纯脚本 UA 直返 403，对带浏览器前缀的 UA 返 200。
DEFAULT_UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 InvestSigh-research"
)

_RETRY_DELAYS = (1.0, 4.0, 16.0)


class FetchError(RuntimeError):
    """取数失败（网络 / HTTP 非 2xx / 解压失败）。

    `status` 为 HTTP 状态码（网络层失败时为 None），供调用方区分
    「这个源不可达」（unavailable）与「这个源返回了错误页」（failed）。
    """

    def __init__(self, message: str, *, status: int | None = None, url: str = "") -> None:
        super().__init__(message)
        self.status = status
        self.url = url


@dataclass(frozen=True)
class HttpResponse:
    """一次成功的 HTTP 响应（含落盘所需的全部元数据）。"""

    url: str
    status: int
    body: bytes
    content_type: str
    etag: str | None = None
    last_modified: str | None = None
    not_modified: bool = False

    @property
    def text(self) -> str:
        """按 `utf-8` 解码（错误替换而非抛错——错误页也要能被记进 manifest）。"""
        return self.body.decode("utf-8", errors="replace")


@dataclass
class _Bucket:
    """按 `source_id` 独立的令牌桶（一个源慢不该拖累另一个源）。"""

    rate: float
    _last: float = field(default=0.0)

    def wait(self) -> None:
        """阻塞到允许下一次请求（`rate` 为每秒请求数）。"""
        if self.rate <= 0:
            return
        interval = 1.0 / self.rate
        now = time.monotonic()
        delta = now - self._last
        if delta < interval:
            time.sleep(interval - delta)
        self._last = time.monotonic()


class HttpClient:
    """一个进程一个实例；按 `source_id` 分桶限速。"""

    def __init__(
        self,
        *,
        default_rate: float = 1.0,
        rates: Mapping[str, float] | None = None,
        timeout: float = 30.0,
        user_agents: Mapping[str, str] | None = None,
    ) -> None:
        self._default_rate = default_rate
        self._rates = dict(rates or {})
        self._timeout = timeout
        self._ua = dict(user_agents or {})
        self._buckets: dict[str, _Bucket] = {}
        self.request_count = 0
        """本进程累计请求数（报告里给出，便于核对"抓了多少次"）。"""

    def _bucket(self, source_id: str) -> _Bucket:
        if source_id not in self._buckets:
            rate = self._rates.get(source_id, self._default_rate)
            self._buckets[source_id] = _Bucket(rate=rate)
        return self._buckets[source_id]

    def _headers(self, source_id: str, extra: Mapping[str, str] | None) -> dict[str, str]:
        ua = self._ua.get(source_id) or (SEC_UA if source_id.startswith("sec.") else DEFAULT_UA)
        headers = {
            "User-Agent": ua,
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8",
        }
        if extra:
            headers.update(extra)
        return headers

    def get(
        self,
        url: str,
        *,
        source_id: str,
        params: "Mapping[str, str] | Sequence[tuple[str, str]] | None" = None,
        headers: Mapping[str, str] | None = None,
        etag: str | None = None,
        last_modified: str | None = None,
        retries: int = len(_RETRY_DELAYS),
    ) -> HttpResponse:
        """GET 一次（含限速、条件请求、退避重试）。

        `params` 接受 dict **或** `[(k, v), …]`——后者是必需的：Federal Register 这类
        API 用**重复键**表达数组（`conditions[agencies][]=a&conditions[agencies][]=b`），
        用 dict 只能写出 `[0]=` / `[1]=` 这种带下标的形态，服务端直接 400（实测踩过）。

        返回 `HttpResponse`；`304` 也返回（`not_modified=True`，`body=b""`）。

        失败模式：`FetchError`（网络错 / 非 2xx / 重试耗尽）。
        """
        full = url
        if params:
            pairs = list(params.items()) if isinstance(params, Mapping) else list(params)
            sep = "&" if urllib.parse.urlparse(url).query else "?"
            full = f"{url}{sep}{urllib.parse.urlencode(pairs)}"

        extra = dict(headers or {})
        if etag:
            extra["If-None-Match"] = etag
        if last_modified:
            extra["If-Modified-Since"] = last_modified

        last_err: FetchError | None = None
        for attempt in range(retries + 1):
            self._bucket(source_id).wait()
            self.request_count += 1
            req = urllib.request.Request(full, headers=self._headers(source_id, extra))
            try:
                with urllib.request.urlopen(req, timeout=self._timeout) as resp:
                    body = resp.read()
                    if resp.headers.get("Content-Encoding") == "gzip":
                        body = gzip.decompress(body)
                    return HttpResponse(
                        url=full,
                        status=resp.status,
                        body=body,
                        content_type=resp.headers.get_content_type() or "application/octet-stream",
                        etag=resp.headers.get("ETag"),
                        last_modified=resp.headers.get("Last-Modified"),
                    )
            except urllib.error.HTTPError as exc:
                if exc.code == 304:
                    return HttpResponse(
                        url=full,
                        status=304,
                        body=b"",
                        content_type=exc.headers.get_content_type() if exc.headers else "",
                        etag=etag,
                        last_modified=last_modified,
                        not_modified=True,
                    )
                # 4xx（除 429）是确定性的，重试无意义 —— 立即抛，让调用方判 failed/unavailable
                if 400 <= exc.code < 500 and exc.code != 429:
                    raise FetchError(
                        f"HTTP {exc.code} {exc.reason} — {full}", status=exc.code, url=full
                    ) from exc
                last_err = FetchError(
                    f"HTTP {exc.code} {exc.reason} — {full}", status=exc.code, url=full
                )
            except (urllib.error.URLError, TimeoutError, OSError) as exc:
                reason = getattr(exc, "reason", exc)
                last_err = FetchError(f"网络失败 {reason} — {full}", status=None, url=full)

            if attempt < retries:
                time.sleep(_RETRY_DELAYS[min(attempt, len(_RETRY_DELAYS) - 1)])

        assert last_err is not None
        raise last_err

    def get_json(self, url: str, **kwargs: object) -> object:
        """GET 并按 JSON 解析；解析失败抛 `FetchError`（不返回 None 冒充空）。"""
        resp = self.get(url, **kwargs)  # type: ignore[arg-type]
        import json

        try:
            return json.loads(resp.text)
        except json.JSONDecodeError as exc:
            raise FetchError(
                f"响应不是合法 JSON（{exc}）— {resp.url}", status=resp.status, url=resp.url
            ) from exc

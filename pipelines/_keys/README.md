# B 类：需要一次性免费 key 的源（**本包只给步骤与校验，不申请、不存密钥**）

> 为什么单列一个目录：这三个 key 是**人工一次性动作**，不是管道能自动完成的事。
> 管道能做的只有两件：① 缺 key 时如实报 `unavailable(no_api_key)`；② 有 key 时自动转 `ok`。
> 把步骤写在这里，是为了让"缺 key"这件事**有明确的下一步**，而不是一句"不可用"。

---

## 0. 三条纪律（先看这三条，再看表格）

1. **本包不申请任何 key**。申请必须由你在浏览器里完成（要邮箱、要同意条款）。
2. **key 不进版本库**。一律走环境变量；`.env*` 已在 `.gitignore`（本包另加 `pipelines/_profiles/`）。
3. **不猜 key 值、不填示例值**。缺就是缺——`unavailable(no_api_key)` 是合格答案，
   编一个假的让它"看起来能跑"才是事故。

---

## 1. 五个 key 的申请表

| # | key | 服务哪些型 | 申请入口 | **本机实测** | 免费额度 | 环境变量 |
|---|---|---|---|---|---|---|
| 1 | **FRED** | `06 macro-cycle`（CPI/非农/核心 PCE/GDP/工业生产）<br>`07 rates-inflation`（T10YIE/T5YIFR）<br>`07 sentiment-survey`（UMCSENT 备用） | `https://fredaccount.stlouisfed.org/apikeys` | ⚠️ **000 连接超时** | 120 req/min | `FRED_API_KEY` |
| 2 | **BLS** | `06 macro-cycle`（CPI/就业/PPI 原始序列） | `https://data.bls.gov/registrationEngine/` | ⚠️ **403**（浏览器可开） | 无 key 25 查询/日；有 key 500/日 | `BLS_API_KEY` |
| 3 | **BEA** | `06 macro-cycle`（GDP/PCE/个人收入） | `https://apps.bea.gov/api/signup/` | ✅ 200 | — | `BEA_API_KEY` |
| 4 | **EIA**（可选） | `05 alt-data`（电网/电力） | `https://www.eia.gov/opendata/register.php` | ✅ 200 | — | `EIA_API_KEY` |
| 5 | **USPTO ODP**（可选） | `05 alt-data`（专利全文检索） | `https://developer.uspto.gov/` | ✅ 200（IBD 免 key 已通） | — | `USPTO_API_KEY` |

> **本机可达性差异本身就是信息**：`api.stlouisfed.org`（数据接口）**可达**（无 key 返 400），
> 但 `fredaccount.stlouisfed.org`（申请页）**不可达**。所以 FRED key 必须在能访问
> 申请页的网络里申请 —— 这是网络问题，不是管道 bug。**别去改代码排查它。**

---

## 2. 逐个申请步骤

### 2.1 `FRED_API_KEY`

1. 在能打开 `https://fredaccount.stlouisfed.org/apikeys` 的网络里打开该页
   （本机实测 000 超时；用手机热点或换网络）；
2. 注册账号（邮箱 + 密码 + 验证邮件）；
3. 登录后进 **API Keys** 页 → **Request API Key**；
4. 填用途（一句英文即可，例如 *"Personal research pipeline reading public macro series"*）；
5. 提交后页面直接给出 32 位字符串 → 复制。

**验证**（应返 200 + `observations`）：

```bash
curl "https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCSL&api_key=$FRED_API_KEY&file_type=json&limit=2"
```

### 2.2 `BLS_API_KEY`

1. 打开 `https://data.bls.gov/registrationEngine/`（本机 curl 403，**浏览器可正常打开**）；
2. 填邮箱 → 收验证信 → 点链接 → 得到 key；
3. 免费额度：无 key 25 查询/日、有 key 500 查询/日。

**验证**（应返 `status: REQUEST_SUCCEEDED`）：

```bash
curl -s -X POST "https://api.bls.gov/publicAPI/v2/timeseries/data/" \
  -H "Content-Type: application/json" \
  -d "{\"seriesid\":[\"CUUR0000SA0\"],\"registrationkey\":\"$BLS_API_KEY\"}"
```

### 2.3 `BEA_API_KEY`

1. 打开 `https://apps.bea.gov/api/signup/`；
2. 填邮箱 + 姓名 → 邮件收 key（通常即时）；
3. 额度：无硬上限，但要求合理频率。

**验证**（注意：**`UserID=DEMO` 会返回 200 但只带错误体**，实测过，别把它当成功）：

```bash
curl "https://apps.bea.gov/api/data/?UserID=$BEA_API_KEY&method=GETDATASETLIST&ResultFormat=JSON"
```

### 2.4 `EIA_API_KEY`（可选）

1. 打开 `https://www.eia.gov/opendata/register.php`；
2. 填邮箱 → 邮件收 key；
3. 只影响 `05 alt-data` 的电力一路，缺它不影响其余。

### 2.5 `USPTO_API_KEY`（可选）

1. `05 alt-data` 当前走 **IBD API（免 key，实测 200）**；
2. 只有要**专利全文检索**时才需要 ODP key：`https://developer.uspto.gov/` 注册；
3. 缺它不影响现有实现。

---

## 3. 配好之后

```bash
# 只报有没有，不打印值
python -m pipelines _keys/check_keys.py --check

# 配好后验证对应型是否真的转 ok
python -m pipelines run --type macro-cycle --as-of 2026-10-28 --dry-run
python -m pipelines run --type rates-inflation --as-of 2026-10-28 --dry-run
```

`fred.py` 的 `probe` 会读 `PIPELINES_FRED_KEY` 指名的环境变量（默认 `FRED_API_KEY`）；
有 key 就正常取数，没 key 就 `unavailable(no_api_key)` —— **同一个型，两种态，都可核**。

---

## 4. 环境变量怎么设（Windows / PowerShell）

```powershell
# 当前会话临时生效（推荐先这样试）
$env:FRED_API_KEY = "<你的 key>"

# 永久（写入用户环境变量，不落仓库）
[Environment]::SetEnvironmentVariable("FRED_API_KEY", "<你的 key>", "User")
```

```bash
# Git Bash 当前会话
export FRED_API_KEY="<你的 key>"
```

> **不要**把它们写进 `pipelines/` 下的任何文件；本包的 `.gitignore` 已覆盖 `_landing/`、
> `_profiles/`、`_runs/`，但**没有也不会**为"key 文件"留位置。

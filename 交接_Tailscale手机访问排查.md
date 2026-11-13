# 交接：MacBook Air 3 经 Tailscale 访问阅读器失败 · 排查任务（原误记为「手机」）

> 交接时间：2026-11-12 00:2x PST
> 交接对象：接手本问题的 agent
> 目标：**查清为什么另一台 Mac（与本机不同网络）在浏览器输入 `http://100.71.236.89:5280/#/network` 打不开，并给出最小修复方案。**
> 本文件只做交接与事实登记，**我没有下最终结论**，也没有对对端设备做任何验证。诊断与修复由你继续。

> ⚠️ **重大更正（2026-11-12 00:50 PST，用户截图确认）**：目标设备不是手机，是 **MacBook Air 3**（`100.97.64.86`），且 Tailscale 显示 **Connected**、账号 `leilawubing@gmail.com`。
> 因此：**第五节 P0 两条假设（设备未加入 tailnet / 未开启连接）已被推翻**；F2「tailnet 里没有手机」作为事实仍成立，但不再有诊断价值；第六节步骤 2 的「手机侧三问」、第九节交付中「手机侧操作」、第七节验收里的「手机」全部作废。
> 第一~十节保留为当时的认知记录，其中所有「手机」字样均属误判。**当前有效的诊断以第十二节为准。**

---

## 一、问题原话与范围

用户原话：「明明装了 tailscale，和本机不同网络的手机为何不能在浏览器里输入 `http://100.71.236.89:5280/#/network` 并访问」。

- 「装了 tailscale」指**本机装了**（已证实）。手机是否安装/登录/连接，**未知，这是首要待查项**。
- 「不同网络」＝手机不在本机同一 Wi-Fi（蜂窝数据或另一个局域网），因此**唯一通路是 Tailscale 虚拟网**；普通局域网 IP 和公网都指望不上。
- 目标 URL 是阅读器的独立可视化页面 `#/network`（hash 路由），但**问题定位先看首页能不能连通**：hash 不会发给服务器，服务器只需返回 `index.html` 即算链路通。请分别验证 `/` 与 `/#/network`。

---

## 二、项目最小背景

| 项 | 值 |
|---|---|
| 仓库 | `/Users/leilabot/InvestSigh-Read` |
| 服务 | `server/index.mjs`，单进程 Node，静态托管 `dist/` + `/api` 同端口 |
| 端口 | 5280（前端 dev 时另有 Vite 5277，与本次无关） |
| 绑定 | `server.listen(PORT, "0.0.0.0", ...)`，见 `server/index.mjs:452`（代码注释明写「本机/局域网/Tailscale 虚拟网都能访问」） |
| 当前版本 | git `5f338b8c`，工作区干净；dist 产物 `index-D-LN5AqA.js` |
| `#/network` 页面 | `src/pages/DetectorNetwork.tsx` + `src/lib/detectorLayout.ts` + `public/data/network/detectors.json`；路由注册在 `src/lib/route.ts` / `src/App.tsx` |
| 启动方式 | `cd /Users/leilabot/InvestSigh-Read && node server/index.mjs`（后台常驻；**曾整体挂过一次导致 5280 无监听**，见下） |

**重启/服务存活是排查第一步**：本机曾出现「后端进程整个没了，5280 无监听、本地 curl 返回 000」，重启后恢复。若你接手时手机报「无法连接」，先确认服务还活着，别把服务挂掉误判成 Tailscale 问题。

---

## 三、已验证事实（本机只读采集，可复现）

采集命令与原始输出摘要：

```bash
TS="/Applications/Tailscale.app/Contents/MacOS/Tailscale"
$TS version            # 1.104.4（standalone/App 版，CLI 不在 PATH）
$TS ip -4              # 100.71.236.89
$TS status             # 见下
$TS status --json      # Self: leilabot的Mac mini, Online=true; peers: 1
ifconfig | grep 100\.  # utun5: inet 100.71.236.89 --> 100.71.236.89
lsof -nP -iTCP:5280 -sTCP:LISTEN   # node PID 51723, TCP *:5280 (LISTEN)
/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate  # Firewall is disabled (State = 0)
curl http://127.0.0.1:5280/        # HTTP 200
curl http://100.71.236.89:5280/    # HTTP 200 · remote_ip 100.71.236.89
curl http://192.168.101.66:5280/   # HTTP 200 · remote_ip 192.168.101.66
curl http://100.71.236.89:5280/data/network/detectors.json  # HTTP 200
```

| # | 事实 | 含义 |
|---|---|---|
| F1 | `100.71.236.89` 是本机 Tailscale 虚拟网卡 `utun5` 的地址（属 `100.64.0.0/10` CGNAT 段） | **该段在公网/普通网络不可路由，只有加入同一 tailnet 的设备才能到达** |
| F2 | `tailscale status` 只有两台设备：本机 `leilabotmac-mini` / `macbook-air-3`（均 macOS、`Online=true`，同一账号 `leilawubing@…`） | **tailnet 里没有任何 iOS / Android / 手机设备** ← 目前指向性最强的证据，但**未经手机侧核实，不许当作结论** |
| F3 | 本机 Tailscale `Self.Online = true`，版本 1.104.4 | 本机侧 VPN 隧道本身是活的 |
| F4 | 服务绑 `0.0.0.0:5280`，本机、Tailscale IP、局域网 IP 三种地址 curl 全部 200 | **绑定层/服务层已排除**；本机自测通不能证明外部设备可达（流量走本机回环） |
| F5 | `server/index.mjs:233` 有 `access-control-allow-origin: *`，代码不校验 Host | 服务端没有 Host 白名单或 CORS 拦截 |
| F6 | macOS 应用防火墙全局关闭 | macOS 防火墙这一层已排除 |
| F7 | 局域网 IP 为 `192.168.101.66` | 若排查时手机碰巧连回同一 Wi-Fi，可用此地址做「非 Tailscale 通路」对照实验 |

**注意 F4 的陷阱**：从本机 `curl 100.71.236.89` 返回 200 只证明本机协议栈认这个地址，**完全不能证明手机可达**。任何「本机测过了所以通」的推论都是错的，请不要复用。

---

## 四、已排除项（不要重复查）

- ❌ 服务没启动 / 端口没监听（交接时确认在跑；但**每次排查开头仍应快速复核**）
- ❌ 服务只绑 `127.0.0.1`（代码与实际监听都是 `0.0.0.0`）
- ❌ macOS 应用防火墙拦截（全局 disabled）
- ❌ 服务端 Host 校验 / CORS 拦截
- ❌ `dist/` 没构建、数据文件缺失（首页与 `detectors.json` 均 200）
- ❌ `#/network` 路由未注册（本机 Chrome headless 截图已验证页面正常渲染：37 节点 / 109 边 / 5 列）

---

## 五、待验证假设（按优先级，每条给验证方法与判据）

| 优先级 | 假设 | 怎么验证 | 判据 |
|---|---|---|---|
| **P0** | 手机根本没加入这个 tailnet（未装 App / 未登录 / 用别的账号 / 登录到别的 tailnet） | 请用户在手机打开 Tailscale App 看：是否显示本机 `leilabotmac-mini` 在线；再本机跑 `$TS status --json` 看是否出现手机设备 | 手机 App 里看不到本机，或本机 status 里无手机设备 → 成立 |
| **P0** | 手机装了但**未开启连接**（VPN 开关是关的 / 系统 VPN 配置被移除） | 手机状态栏有无 VPN 图标；Tailscale App 显示 Connected/Active | 显示 Disconnected → 成立 |
| **P1** | iOS 同时只能有一个 VPN 生效：iCloud Private Relay、企业 VPN、其他代理 App 抢占或干扰 | 手机关掉 Private Relay（设置 → Apple ID → iCloud → 专用代理）与其他 VPN 后重试 | 关闭后可访问 → 成立 |
| **P1** | ACL / 设备审批限制：设备需管理员批准，或 ACL 只放行特定端口 | 登录 Tailscale admin console 查 Machines 页（设备是否 waiting for approval / 已过期）与 ACL 规则 | 手机设备处于待批准 / key expired，或 ACL 未放行 5280 → 成立 |
| **P1** | DERP/直连协商失败：蜂窝网络下 UDP 被封、只能走中继，或双端 NAT 穿透都不通 | 本机 `$TS ping <手机TailscaleIP>`（需手机先上线）看是否 `via DERP` / 是否通；`$TS netcheck` 看 UDP 状态 | 完全 ping 不通 → 成立；只走 DERP 仍应能通，若仍失败另有原因 |
| **P2** | 浏览器输入层问题：`http://` 被自动升级 https、`#` 被地址栏当搜索词/截断、浏览器内置代理/省流模式改写了请求 | 让用户手机分别试：① `http://100.71.236.89:5280/`（无 hash）② 无痕窗口 ③ 另一个浏览器 ④ 用 Tailscale 官方工具/终端 ping 该 IP:端口 | 无 hash 也不通 → 不是 hash 问题；换个浏览器能通 → 浏览器层 |
| **P2** | 手机访问的是**另一台机器的旧 IP**（Tailscale IP 重分配、用户复制了过期链接） | 重新确认本机 `$TS ip -4` 输出 | 与 100.71.236.89 不一致 → 成立 |
| **P2** | 服务进程在用户尝试时恰好挂了 | 现场 `lsof -nP -iTCP:5280 -sTCP:LISTEN` + `curl` 复核 | 无监听 → 先重启服务，与 Tailscale 无关 |
| **P3** | 本机开启 exit node / subnet router 或本机另有 VPN 导致回程路由异常 | `$TS status` 看 exit node 标记；`$TS prefs` 看路由相关开关；`route -n get 100.71.236.89` | 回程不走 utun5 → 成立 |

---

## 六、建议排查顺序（先低成本、后需用户配合）

1. **本机复核（30 秒，只读）**：服务监听、Tailscale IP 与在线状态、`$TS status` 设备清单——确认交接事实未变。
2. **手机侧三问（必须让用户配合，别猜）**：
   - 手机装了 Tailscale 吗？登录的是不是**同一个账号/同一个 tailnet**？
   - App 里 VPN 开关是开的吗？设备列表里能看到 `leilabotmac-mini` 吗？
   - 手机系统有没有开 Private Relay 或其他 VPN？
3. **分层判通路**（把「Tailscale 不通」和「Web 服务不通」分开）：
   - 手机浏览器开 `http://100.71.236.89:5280/`（**不带 hash**）→ 先看首页能否出；
   - 若手机有 ping/网络工具，测 `100.71.236.89` 是否可达；
   - 对照实验：手机连回本机同一 Wi-Fi，开 `http://192.168.101.66:5280/` → 通说明服务与前端没问题，问题纯在 Tailscale 通路。
4. **按第五节假设逐条排除**，每条记录验证命令/现象/结论，别跳步。
5. 得出根因后给出**最小修复**（优先是手机侧操作：装 App / 登录同账号 / 打开 VPN / 关冲突 VPN / 批准设备），必要时才动本机或 tailnet 配置。

---

## 七、验收标准（什么算修好）

手机在**非本机同一网络**（蜂窝或外部 Wi-Fi）下：

1. 浏览器输入 `http://100.71.236.89:5280/#/network` 能打开，**不是**「无法连接 / 找不到服务器 / 超时」；
2. 页面渲染出探测器网络：header「通用探测器网络」、37 节点 / 109 边、五列同级别同列、正交连线；
3. 点任意节点右侧详情栏出四字段；「全部连线 / 觅食边 / 适应一屏」按钮可交互；
4. `http://100.71.236.89:5280/` 主阅读器也能打开（顶栏有黑底白字「探测器网络」入口，点它可跳到 `#/network`）。

---

## 八、约束与禁止项（遵守）

- **诊断优先只读**：`tailscale status/ip/ping/netcheck`、`lsof`、`curl`、`ifconfig` 这类命令随便跑；**不要**擅自改 Tailscale ACL、不要改 macOS 防火墙、不要改系统网络/路由、不要改 `server/index.mjs` 的绑定。
- **任何配置变更前先向用户报告并等批准**（尤其涉及 tailnet、账号、防火墙、服务重启）。
- 手机侧操作由用户执行；给用户的话要具体到「在哪个菜单点什么」，不要写「请检查手机设置」这种空话。
- 不要把「本机 curl 200」当成外部可达的证据；不要把「tailnet 里没有手机」直接当最终结论——要按 P0/P1 逐条验证。
- 不要顺手改阅读器前端代码或重建 dist，这个问题与前端无关。
- 结论要有证据：每条判断附命令输出或用户反馈的现象；查不到的如实写「未验证」，不许编。

---

## 九、交付给用户的东西

1. 一句话根因（**明确区分「已验证」与「推断」**）；
2. 证据链（关键命令输出 / 手机侧现象）；
3. 最小修复步骤（按用户要操作的顺序写，含手机与本机分别做什么）；
4. 修复后的验收结果（按第七节四条逐条报）。

---

## 十、相关文件与命令速查

```
/Users/leilabot/InvestSigh-Read/server/index.mjs          # 服务与 0.0.0.0 绑定(:452)
/Users/leilabot/InvestSigh-Read/dist/index.html            # 生产构建入口
/Users/leilabot/InvestSigh-Read/docs/通用探测器网络_交互版.html  # 早期独立 HTML 查看器（本次 URL 不用它）
/Applications/Tailscale.app/Contents/MacOS/Tailscale       # CLI（不在 PATH，必须用绝对路径）
```

```bash
TS="/Applications/Tailscale.app/Contents/MacOS/Tailscale"
"$TS" version; "$TS" ip -4; "$TS" status; "$TS" status --json; "$TS" netcheck
lsof -nP -iTCP:5280 -sTCP:LISTEN
curl -s --noproxy '*' -o /dev/null -w "HTTP %{http_code}\n" http://100.71.236.89:5280/
# 服务若挂了：cd /Users/leilabot/InvestSigh-Read && node server/index.mjs （后台跑）
```

---

## 十一、接手复核（2026-11-12 00:30 PST · 全部只读，未做任何配置变更）

### 11.1 复核结果（交接事实未变）

| 项 | 命令 | 结果 |
|---|---|---|
| 服务监听 | `lsof -nP -iTCP:5280 -sTCP:LISTEN` | node PID 51723，`TCP *:5280 (LISTEN)` |
| 防火墙 | `socketfilterfw --getglobalstate` | disabled (State = 0) |
| 本机连通 | `curl --noproxy '*'` × 3 | `127.0.0.1` / `100.71.236.89` / `192.168.101.66` 的 `/` 与 `detectors.json` 全部 200 |
| Tailscale | `version` / `ip -4` / `status` | 1.104.4 / `100.71.236.89` / 仅 2 台 macOS 在线 |
| Tailnet | `status --json` | Self `leilabot的Mac mini` Online=true；Peers 仅 `MacBook Air (3)` macOS；tailnet 域名 `tail76054e.ts.net` |
| 路由 | `route -n get 100.71.236.89` | interface `utun5`，flags 含 `LOCAL`（再次说明本机自测走本机协议栈，**不是外部可达证据**） |

### 11.2 新增排除项（第五节 P1/P3 假设，已由本机证据排除）

| 假设 | 证据 | 判定 |
|---|---|---|
| ACL 未放行 5280 | `debug netmap` → `PacketFilter` 只有 1 条规则：`Srcs` 覆盖 `100.64.0.0/10` 各子网与 `fd7a:115c:a1e0::/48`，`Dsts` = `0.0.0.0/0` + `::/0`、端口 `0–65535`、`IPProto` 含 6(TCP) | ❌ 排除，全端口放行 |
| Tailnet Lock / 设备需签名 | `debug netmap` → `TKAEnabled = false` | ❌ 排除 |
| 本机设备未批准 / key 过期 | `SelfNode.MachineAuthorized = true`，`KeyExpiry = 2027-05-01T08:46:56Z`；netmap 唯一 peer `KeyExpired = None` | ❌ 排除 |
| Shields Up 拒绝所有入站 | `debug prefs` → `ShieldsUp = false` | ❌ 排除 |
| 本机 exit node / subnet router 导致回程异常 | `debug prefs` → `ExitNodeID = ""`、`ExitNodeIP = ""`、`AdvertiseRoutes = None`；`status --json` Self `ExitNode = false` | ❌ 排除 |
| DERP / 隧道本身不通 | `netcheck`：UDP=true、CaptivePortal=false、最近 DERP sfo 130ms；`ping -c 3 100.97.64.86` 三包全通（前两包 `via DERP(lax)` 1.9s/344ms，第三包直连 `101.87.222.74:28966` 19ms） | ❌ 排除，隧道可正常承载到 peer 的流量 |
| 服务端 IP/Host 白名单 | `server/index.mjs:255` 只用 `req.headers.host` 构造 URL，无来源 IP 校验；`:452` 绑 `0.0.0.0` | ❌ 排除 |

### 11.3 阶段性结论（严格区分证据层级）

- **已验证**：本机侧各层（服务、绑定、防火墙、路由、服务端过滤、ACL、设备授权、Tailnet Lock、Shields Up、隧道）均无阻塞。
- **已验证**：控制平面下发的 netmap 里只有 1 个 peer（macOS 笔记本），**没有任何 iOS / Android 节点**；未授权/待审批设备若存在也应出现在 admin console 的 Machines 页，本机 netmap 中连待审批节点都没有。
- **逻辑必然**：`100.71.236.89` 属 `100.64.0.0/10` CGNAT 保留段，公网与普通蜂窝网络不可路由。手机若不在 `tail76054e.ts.net` 这个 tailnet（未装 / 未登录 / 登录了别的账号 / VPN 开关没开），浏览器请求根本到不了本机，必然表现为「无法连接 / 超时」。
- **未验证（唯一卡点，禁止推断成结论）**：手机侧实际状态。P0 两条必须由用户现场确认；P1 的 ACL / Tailnet Lock / Shields Up、P3 的 exit node 已排除。
- 因此排查已收敛到「手机侧是否连上同一 tailnet」这一个环节；本机不再有可查项。

### 11.4 待用户配合（手机侧三问，需给出现象才算验证）

1. 手机装了 Tailscale 吗？打开 App 看登录账号是不是 `leilawubing@…`（与本机同一账号 / tailnet `tail76054e.ts.net`）。
2. App 首页 VPN 开关是不是 Connected？设备列表里能看到 `leilabotmac-mini` 且显示在线吗？
3. iOS「设置 → Apple ID → iCloud → 专用代理」是否关闭？「设置 → 通用 → VPN 与设备管理」里是否只有一个生效的 Tailscale VPN？

验证顺序（不带 hash 先测）：`http://100.71.236.89:5280/` → 再 `http://100.71.236.89:5280/#/network`；对照实验：手机连回同一 Wi-Fi 开 `http://192.168.101.66:5280/`。手机上线后本机再跑 `tailscale status` 与 `tailscale ping <手机IP>`，并复核 `lsof`。

### 11.5 最小修复（仅在用户确认手机侧状态后执行，配置变更一律先报批）

> 本节基于「目标是手机」的误判，**已整体作废，以 12.5 取代**。

优先手机侧：装 App → 用同一账号登录 → 允许添加 VPN 配置 → 关掉 Private Relay / 其他 VPN → 打开 VPN 开关 → 确认设备列表出现 `leilabotmac-mini` → 浏览器访问。本机侧无需改动（不改 ACL、不改防火墙、不改 `server/index.mjs`、不重建 dist）。

验收按第七节四条逐条报；截至本次复核，**四条均未验证**（手机侧尚未做过任何访问测试）。

---

## 十二、设备更正后的重新诊断（2026-11-12 00:50 PST · 全部只读，未做任何配置变更）

### 12.1 更正内容

用户提供 MacBook Air 3 的菜单栏截图：Tailscale **Connected**、账号 `leilawubing@gmail.com`、`This Device: macbook-air-3 (100.97.64.86)`、菜单含 Network Devices / Exit Nodes / Settings。
→ 目标设备是 **已在同一 tailnet 内、在线、同账号的 Mac**，不是手机。
→ **第五节 P0 两条假设（没加入 tailnet / 没开 VPN）直接被推翻**；第六节手机侧三问、第九节手机侧交付要求作废。
→ 原「tailnet 里只有两台 macOS，没有手机」不再是线索：其中一台 macOS 正是出问题的那台。

### 12.2 新增只读证据（本机采集）

| # | 命令 | 结果 | 判定 |
|---|---|---|---|
| N1 | `status --json` + netmap peer | `MacBook Air (3)` / `100.97.64.86` / Online=true / `User = 4624362967738245`（与 Self 同一 UserID）/ KeyExpiry `2027-05-01`；Endpoints 含 `192.168.31.193:41641` 与 **`198.18.0.1:41641`** | 同账号同 tailnet、密钥有效；对端在 `192.168.31.x` 另一局域网；`198.18.0.1` 是 Clash Verge TUN 网关，**对端也跑着代理 TUN** |
| N2 | `nc -z -G 3 100.97.64.86 50113`；`curl --noproxy '*' http://100.97.64.86:50113/` | TCP succeeded；**HTTP 200**，connect 14ms | 不是只有 disco ping：**Tailscale 真实 TCP 数据面本机↔MacBook 是通的** |
| N3 | `route -n get 100.97.64.86`；`netstat -rn -f inet` | 走 `utun5`；有 `100.97.64.86/32 → utun5` 主机路由，Clash TUN `utun0` 只有 `1/8 … 128/1` 拆分默认路由 | 本机回程未被代理 TUN 抢走，P3 排除 |
| N4 | `lsof -nP -iTCP:5280` | 只有 `*:5280 LISTEN` 与 4 条 `127.0.0.1`（WorkBuddy 自身）连接，**无任何 `100.97.64.86` 来源** | 对端的 HTTP 请求**从未到达 5280**，问题在请求发出侧，不在本机服务 |
| N5 | `scutil --proxy`（本机） | HTTP/HTTPS/SOCKS 全部指向 `127.0.0.1:7897`；ExceptionsList = `127.0.0.1`、`192.168.0.0/16`、`10.0.0.0/8`、`172.16.0.0/12`、`localhost`、`*.local`、`<local>` —— **不含 `100.64.0.0/10`** | 浏览器访问 `100.71.236.89` 一定先把请求交给 Clash，由代理规则决定去向，而不是走路由表 |
| N6 | 本机 Clash 配置 grep；`curl -x http://127.0.0.1:7897 http://100.71.236.89:5280/` | 配置里多处 `IP-CIDR,100.64.0.0/10,DIRECT`；经代理也返回 **200** | 本机「经代理也通」是因为有 DIRECT 规则，且目标是本机地址；**对端 profile / 绕过列表未知，不能套用** |
| N7 | peer 会话计数 | `RxBytes = 0` / `TxBytes = 0` / `Active = false` / `CurAddr = ""` / `LastHandshake` 零值 | 两侧从未建立持续 WireGuard 数据流（ping 是 disco 层不计数），与 N4 一致 |

### 12.3 根因判断（严格分层）

- **已验证**：设备加入、账号、密钥、ACL、Shields Up、Tailnet Lock、隧道真实 TCP、本机服务、本机回程路由，全部正常。
- **已验证**：对端浏览器的请求没有到达本机 5280（N4 + N7）。
- **高置信推断（未验证，需对端执行命令）**：请求在对端应用层被**系统代理 / Clash 规则**送进代理节点（或 TUN 抢占 / 浏览器 HTTPS 升级），而 `100.64.0.0/10` 在公网不可路由 → 表现为「打不开」。N5/N6 给出了机制，N1 的 `198.18.0.1` 说明对端确有 Clash TUN。
- **为什么本机怎么测都通**：本机 `curl 100.71.236.89` 走 LOCAL 回环（F4 陷阱），且本机 Clash 恰好有 `100.64/10 → DIRECT` 规则。两个「通」都不能代表对端。

### 12.4 新假设优先级（对端 MacBook Air 3 上验证）

| 优先级 | 假设 | 验证命令 / 动作 | 判据 |
|---|---|---|---|
| **P0** | 系统代理 / Clash 规则未放行 `100.64.0.0/10` | 终端 `curl -v --noproxy '*' -m 5 http://100.71.236.89:5280/`；再看 `scutil --proxy` 的 ExceptionsList | curl 返回 200 但浏览器不通 → 成立（应用层代理） |
| **P0b** | Clash TUN 抢占 / 隧道层不通 | `nc -vz -G 3 100.71.236.89 5280`；`ping 100.71.236.89`；`netstat -rn -f inet \| grep 100.`；`route -n get 100.71.236.89` | curl 也超时 → 查路由是否走 Tailscale 的 utun；被 utun0 抢走即成立 |
| **P1** | 多个 VPN/Network Extension 冲突 | 对端临时退出 Clash Verge（或只关 TUN），Tailscale 菜单断开再连后重试 | 退出后可访问 → 成立 |
| **P1** | 浏览器把 http 自动升级 https | 看报错文案；Chrome → 设置 → 隐私和安全 → 安全 → 关「一律使用安全连接」；换 Safari 试 | 换浏览器/关升级后可访问 → 成立 |
| **P2** | 访问瞬间服务挂了 / URL 带 hash | 本机 `lsof -nP -iTCP:5280` 已复核在听；先测不带 hash 的 `http://100.71.236.89:5280/` | 无监听 → 与 Tailscale 无关；无 hash 通、带 hash 不通 → 浏览器输入层 |

### 12.5 最小修复（对端配置变更，须用户确认后由用户执行；本机不改动）

1. **先自证**：MacBook 终端跑 `curl -v --noproxy '*' -m 5 http://100.71.236.89:5280/`（绕过系统代理）。返回 200 就说明 Tailscale 全链路没问题，只差浏览器这一层。
2. **加绕过**：系统设置 → 网络 → Wi-Fi → 详细信息 → 代理 → 「忽略这些主机与域的代理设置」加入 `100.64.0.0/10`；或在 Clash Verge 设置里把 `100.64.0.0/10` 写进系统代理绕过，并确认规则 `IP-CIDR,100.64.0.0/10,DIRECT` 排在 MATCH 之前。
3. **仍不通**：Clash Verge 退出 TUN（或整个退出）→ Tailscale 菜单断开重连一次重建路由。
4. **浏览器**：地址栏显式带 `http://`；Chrome 关「一律使用安全连接」。
5. 本机无需改动：不改 ACL、不改防火墙、不改 `server/index.mjs`、不重建 dist、不动 tailnet。

### 12.6 验收（更新第七节的设备描述）

第七节四条验收项不变，设备改为 **MacBook Air 3**（`192.168.31.x` 网络，与本机 `192.168.101.x` 不同网），浏览器分别测 `/` 与 `/#/network`。截至本次复核，**四条全部未验证**——对端尚未执行任何访问测试。

### 12.7 IP 地址核验（2026-11-12 01:05 PST · 用户问「是不是给错 IP 了」）

**结论：`100.71.236.89` 没给错，它就是跑 5280 服务那台机器的 Tailscale IP。** P2「IP 重分配 / 复制了过期链接」排除。

| 地址 | 属于谁 | 依据 |
|---|---|---|
| `100.71.236.89` | **本机 Mac mini**（服务端） | `hostname = leilabotdeMac-mini.local`、`hw.model = Mac16,10`；`tailscale ip -4`；netmap `SelfNode.Name = leilabotmac-mini.tail76054e.ts.net`、`Addresses = 100.71.236.89/32`；5280 的 node PID 51723 就在这台机器上 |
| `100.97.64.86` | **MacBook Air 3**（访问端自己） | 用户截图 `This Device: macbook-air-3 (100.97.64.86)`；`tailscale status` 第二行 peer；netmap `Peers[0]` |
| `192.168.101.66` | 本机局域网 IP | 只在与本机同一 Wi-Fi 时有效，跨网络不可用 |
| `218.79.62.225` | 本机公网出口（netcheck） | CGNAT 出口，无端口映射，不能用来访问 5280 |

关键实验（本机只读）：

- `curl --noproxy '*' http://100.71.236.89:5280/` → **HTTP 200**
- `curl --noproxy '*' http://100.97.64.86:5280/` → **HTTP 000**（`Failed to connect to 100.97.64.86 port 5280 after 2798 ms`）→ 若对端浏览器输的是 `100.97.64.86`，那才是真的给错了（等于连自己，而自己没跑 5280）。**待用户确认实际输入的是哪个 IP。**
- `dscacheutil -q host -a name leilabotmac-mini.tail76054e.ts.net` → `ip_address: 100.71.236.89`，MagicDNS 与裸 IP 一致。
- netmap `SelfNode.Created = 2026-11-02T08:46:56Z`，交接文档 11-12 00:2x 记录的 IP 也是 `100.71.236.89`，10 天内未变，不是过期链接。
- `lsof -nP -iTCP:5280 -sTCP:LISTEN` 只有 `IPv4 *:5280`，**服务不监听 IPv6**。本机另有 Tailscale IPv6 `fd7a:115c:a1e0::8401:ece5`；因此对端若用 MagicDNS 名且系统优先 IPv6，反而可能连不上 —— **裸 IPv4 是最稳的写法，不要改成域名**。

对端可直接复核 IP：MacBook 菜单栏 Tailscale → **Network Devices** → 找到 `leilabotmac-mini` / `leilabot的Mac mini`，点开看 IP 是不是 `100.71.236.89`。

IP 这一层已排除，回到 12.3/12.4：请求没到 5280，卡在对端系统代理 / Clash TUN / 浏览器层，仍需在 MacBook 上执行 `curl -v --noproxy '*' -m 5 http://100.71.236.89:5280/`。

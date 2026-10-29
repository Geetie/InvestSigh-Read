---
id: 03-independent-research-2025-11-28-GoogleTPUv7The900lbGorilla
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2025-11-28
time: "00:00"
title: "SemiAnalysis：谷歌对外卖 TPU，TPUv7 Ironwood 的算力账（2025-11-28）"
kind: "independent-research"
issuer: "SemiAnalysis / Dylan Patel、Myron Xie、Daniel Nishball"
ticker: META
source_pages: 64
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件主体是谷歌 TPU 对外销售这一新业务，全部关键数字都是 SemiAnalysis 自建模型的估算，无一家公司按此口径披露。逐项（均为外部估算）：① Anthropic 100 万颗 TPU 的拆分——首批 40 万颗 TPUv7 Ironwood 以成品机柜计约 100 亿美元、由博通直售；其余 60 万颗经 GCP 出租，估约 420 亿美元 RPO，构成 GCP 当季积压订单增加 490 亿美元的主要部分；② 单位经济——谷歌视角下全 3D Torus 配置的每颗 Ironwood all-in TCO 比 GB200 服务器低约 44%；对外加价后租价仍比 GB200 低约 30%、比 GB300 低约 41%；Anthropic 的 GCP 价约 1.60 美元/TPU-小时，对应每有效 PFLOP 的 TCO 比 GB300 低约 52%；③ 打平条件——谷歌自用 15% MFU 即与 GB300 的 30% MFU 打平；④ 竞争性折让——英伟达以股权返点替代降价，GPU 含量 220 亿美元/GW、非 GPU 系统 120 亿、关键 IT 合计 340 亿美元/GW，返点 100 亿（OpenAI）、50 亿（Anthropic）加微软 100 亿，折出 29%／44%，故 OpenAI 尚未部署 TPU 已省约 30% 全实验室算力成本；⑤ 性能差——TPUv7 相对 GB200 峰值 FLOPs 与带宽仅低约 10%。判断：②有 BOM 与租价两条腿，可入模；①是 RPO 口径（合约期总收入），不能当季度收入；④是谈判折让，不是产品价差。读法交代：机柜/ICI 拓扑与软件栈两段（PyTorch-XLA、vLLM kernel、SparseCore 细节）只取与产能成本相关的量，其余略读。

### 依据
- p.8｜1. The first phase of the deal covers 400k TPUv7 Ironwoods, worth \~\$10 billion in finished racks that Broadcom will sell directly to Anthropic.
- p.8｜2. The remaining 600k TPUv7 units will be rented through GCP in a deal we estimate at \$42 billion of RPO, accounting for most of the \$49 billion increase in GCP’s backlog reported in the third quarter.
- p.16｜From Google’s perspective this results in the all-in TCO per Ironwood chip for the full 3D Torus configuration being \~44% lower than the TCO of a GB200 server.
- p.19｜However, when looking at the 600K rented TPUs, when we incorporate the higher TCO that Anthropic pays (ie inclusive of Google’s margin stacking) into this analysis, we estimate the cost to Anthropic to be \$1.60 per TPU-hour from GCP, narrowing the TCO advantage.
- p.5｜OpenAI hasn’t even deployed TPUs yet and they’ve already saved \~30% on their entire lab wide NVIDIA fleet.

## Q2 · 他的**物理量**从哪来、能不能核？

① 电力：Anthropic 的 TPU 建设规模是"超过 1GW"，对应"至少 100 万颗 TPU"的需求，倒推约 1kW/颗（含主机与配套），但材料没有给单芯片 TDP，也没有给分阶段 MW，属来源不可回溯，只能当量级；② 机柜：每柜 64 颗 TPU（4×4×4 立方体），由 16 个 TPU 托盘（每托盘 4 颗）加 16 或 8 个主机托盘、1 台 ToR 组成，液冷与风冷之比为 1:1 与 2:1——这组数标"Source: Google at Hot Chips 2025"，可回溯；③ 集群：单个 ICI 域 9,216 颗，DCN 层最多 147,456 颗（16 个 pod），需 48 台 144×144 光路交换机、每颗 1.5 个 800G 光模块、合计 13,824 个端口——这些是由拓扑与端口数推导，可复算（见 Q4）；④ 英伟达侧：Rubin 单卡功耗由 1,800W 上调到 2,300W、HBM 带宽由 13TB/s 上调到 20TB/s，TPUv8AX 为 9.8TB/s。判断：机柜级与端口级可回溯，1GW 这一条是全文唯一的电力物理量，却恰好没有出处与拆分，引用时只能标"据其估算"。

### 依据
- p.3｜The huge upwards revisions to TPU production volumes, Anthropic’s >1GW TPU buildout, SOTA models Gemini 3 and Opus 4.5 trained on TPU
- p.24｜Each rack consists of 16 TPU Trays, 16 or 8 Host CPU Trays depending on the cooling configuration, a ToR Switch, power supply units, and BBUs.
- p.33｜the attach ratio of 1.5 Optical Transceivers per TPU v7
- p.45｜a maximum of 16 ICI pods can be connected in the DCN with 4 aggregation blocks connecting 4 ICI pods each – a total of 147,456 TPUs.
- p.62｜Nvidia initially had a much less aggressive target for Rubin, but they upped the power from 1800W to 2300W in order to improve FLOPS and the HBM speed from 13TB/s to 20TB/s.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

判为 `original`（纯英文原文）。依据：① 全文只有英文，页首是标题加两行副题，随后是作者署名与 `NOV 28, 2025 ∙ PAID`，没有任何中英并列或译文段落；② 它不是摘要——正文有完整论证链（Anthropic 交易拆解→Neocloud 融资模板→芯片与机柜→ICI 拓扑→软件栈→TPUv8 对比 Rubin），每页都带 `2025/11/28 21:36` 与 `x/64` 的 PDF 打印页眉，说明是从 Substack 原文直接转出的整篇；③ 文末是作者版权行与评论区计数，不是研报式结论页。同源组：按全批《同源对照表》"TPUv7（2025-11-28）"一行，同源 id 只有本份，未发现 bilingual／translation／summary 版本，本份即根来源，不得与 SemiAnalysis 其它 TPU 文章（如 2023 年的 TPU Supremacy）合并计为多个独立源——文中确实多次引用那篇旧文，属同一机构的自引，不是独立佐证。

### 依据
- p.1｜, , , AND 9 OTHERSDYLAN PATEL MYRON XIE DANIEL NISHBALL NOV 28, 2025 ∙ PAID
- p.2｜Google AI Infrastructure Supremacy: Systems Matter More Than Microarchitecture
- p.64｜© 2025 Dylan Patel ∙ Privacy ∙ Terms ∙ Collection notice Substack is the home for great culture

## Q4 · 他的**假设与算式**能不能复算？

挑两处能算的。① 折让率：GPU 加系统含量 340 亿美元/GW 为分母，OpenAI 拿英伟达返点 100 亿 → 100÷340＝29.4%，他写 29%，通过；Anthropic 拿英伟达 50 亿加微软 100 亿 → 150÷340＝44.1%，他写 44%，通过（差 0.1pp 属取整）。② 光路交换机数量：最大 9,216 颗由 144 个 64 颗立方体拼成，每立方体 96 条光连接 → 144×96＝13,824 个端口；每台 OCS 有 144 进加 144 出共 288 端口 → 13,824÷288＝48 台，与他写的"48 台 144×144"完全一致；且 9,216×1.5 个光模块＝13,824，两处独立口径互相咬合，说明 attach ratio 与端口数没有打架。DCN 侧 16×9,216＝147,456 也成立。不能复算的是 44%／30%／41%／52% 这组 TCO 优势：全文没有给 GB200 与 Ironwood 的 BOM 明细单价，只有"Source: SemiAnalysis AI TCO Model"，属只给结果。

### 依据
- p.5｜<tr><td rowspan=1 colspan=1>Crit IT Content</td><td rowspan=1 colspan=1>$B/GW</td><td rowspan=1 colspan=1>$34</td><td rowspan=1 colspan=1>$34</td></tr>
- p.5｜<tr><td rowspan=1 colspan=1>Nvidia/Partner Discount %</td><td rowspan=1 colspan=1>%</td><td rowspan=1 colspan=1>29%</td><td rowspan=1 colspan=1>44%</td></tr>
- p.41｜The maximum world size of 9,216 TPUs is built up using 144 4x4x4 cubes requiring 96 optical connections each amounting to a total requirement of 13,824 ports.

## Q5 · 关键数字的**脚注指向哪**？

无编号脚注，只有图注 `Source:` 行，按内容分层。① 一手可回溯：机柜构成标"Source: Google at Hot Chips 2025"；GCP 积压订单单季增加 490 亿美元是公司披露，Anthropic 为"博通最近一次财报电话会提到的第四个客户"；② 自建模型：TCO 优势、1.60 美元/TPU-小时、420 亿 RPO、100 亿美元机柜价全部只标"Source: SemiAnalysis AI TCO Model"或"We estimate"，没有供应商报价、没有合约条款，记 Ⅱ 档；③ 交易结构细节（Thomas Kurian 主导谈判、谷歌承诺不设投票权、15% 持股上限、Fluidstack 做现场交付、TeraWulf 与 Cipher 供电）只有"We understand that"这一层，属访谈口径，无法核。④ 需注意：本件是付费墙文章，正文里"Behind the paywall, we will share our thoughts"那句之后内容照常出现，说明这是订阅版全文；但原文中的超链接在转 PDF 时多数只剩 `Source: xxx` 文字，点不开，属载体丢失，不能据此说原文无出处。

### 依据
- p.24｜Source: Google at Hot Chips 2025
- p.17｜What about Google’s external customers when Google adds their margin on top? We assume that in the case where Google earns a margin on leasing TPU 7 to external customers that the TCO per hour can still be up to \~30% lower than the cost of the GB200 and \~41% lower than the cost of the GB300.
- p.7｜The Anthropic deal marks a major milestone in this push. We understand that GCP CEO Thomas Kurian played a central role in the negotiations.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

三把尺子，定义都给全了。① MFU（模型 FLOP 利用率）＝实测有效 FLOPs ÷ 峰值理论 FLOPs；他明确说峰值是厂商按 DVFS 能偶尔冲到的最高频率算出来的，实际跑不到——最理想的 GEMM 测试里 Hopper 也只到约 80% 峰值、Blackwell 在 70% 多、MI300 在 50–60%，训练的经验值是 30%。这把尺子把厂商标称算力整体下调 2–3 倍，是全文最重要的一次口径修正。② TCO per effective FLOP：分子含芯片、系统、网络、电力等 all-in 成本，分母是折减后的有效算力；与公司口径的差异在分子分母两端同时改——谷歌按采购价、Anthropic 按含谷歌加价的租价（1.60 美元/TPU-小时），得到 44%（谷歌视角）与 52%（Anthropic 视角）两个不同答案，方向一致但幅度差 8pp，引用时必须说明站在谁的角度。③ $B/GW：按每 GW 装机算 GPU 含量、系统含量、关键 IT 含量与股权返点，是把资本开支与电力绑定的一种口径，与公司按台/按机柜披露不同，好处是能跨代比较，坏处是隐含"每 GW 装多少卡"未公开。

### 依据
- p.18｜We believe that despite lower marketed peak FLOPs, TPUs can reach higher realized Model FLOP Utilization (MFU) than Blackwell, which translates into higher effective FLOPs for Ironwood.
- p.18｜Even in tests designed to maximize throughput through GEMMs shaped far from real workloads, Hopper only reached about \~80% of peak, Blackwell landed in the 70s, and AMD’s MI300 series in the 50s-60s.
- p.19｜When we put together much lower TCO and higher effective FLOPs utilization, from the perspective of Google the \$ per effective FLOP becomes much cheaper, with \~15% MFU being the breakeven with GB300 at 30% MFU.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：① 收费顾问＝**有**，文末招聘其"研究、咨询与创投"三类岗位，正文反复引导机构订阅（Accelerator Model、Datacenter Model、Tokenomics Model）并留 sales@semianalysis.com，即向被研究行业与买方同时收费；② 投行关系＝**未声明**，全文没有承销、经纪、做市或投行部门关联说明；③ 持仓／受资助＝**未声明**，但有两处需要警惕的自述：一是"这些交易前我们的机构客户已提前得到提示"，把自己定位成交易信息的提供方；二是明确说"年初股价明显更低时我们就在提示 IREN、Applied Digital"等矿企转型标的，属公开的看多记录，却没有任何仓位披露。文末只有一行 `© 2025 Dylan Patel`，没有常规免责声明。首页的 `PAID` 是付费墙标记，不能当作"无投行关系"的证据。按关系不明处理，其"谁赢谁输"的排序须当有立场的判断。

### 依据
- p.6｜To get access to these insights as and stay ahead of the curve: sales@semianalysis.com
- p.9｜This mechanic has been key to our bullish views on the cryptomining industry – notably we were calling out numerous including IREN and Applied Digital at the beginning of the year when stock prices were materially lower.
- p.64｜© 2025 Dylan Patel ∙ Privacy ∙ Terms ∙ Collection notice Substack is the home for great culture

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

三条判断，支撑强度差很多。① 供给侧格局：TPU 从只服务内部变成对外卖整机，Anthropic 一家就 100 万颗（40 万直购＋60 万租用），并称 Meta、SSI、xAI、OpenAI 都在排队——"100 万颗"是需求意向而非交付量，材料没有给 2026 年 TPU 出货颗数、没有给晶圆或 CoWoS 产能，所以不能说份额；② 技术节奏：Rubin 把单卡功耗从 1,800W 拉到 2,300W、HBM 带宽从 13TB/s 拉到 20TB/s，而 TPUv8AX 只有 9.8TB/s、仍停在 N3E/N3P、2027 年才上 224G SerDes，因此"TPU 相对优势在 v8 一代明显收窄"——这条有设备规格支撑，可核；③ 谁主导：正文只给一句"英伟达在 FLOPs shipped 上仍是主导者"，配一张图，没有百分比、没有口径（峰值算力还是产值）、没有年份。判断：②可入模，③只能当方向，①的"排队"名单属访谈线索，涉及 Meta 采购的部分尤其没有金额与时点。

### 依据
- p.61｜This is seen in the chart below, as Nvidia remains the dominant player when it comes to FLOPs shipped.
- p.60｜Again, this is down to Rubin going to a whopping 20TB/S of bandwidth per chip with HBM4 using \~10Gbps pin speeds, while TPU 8 continues to use HBM3E delivering half the bandwidth at 9.8TB/s for v8AX.
- p.6｜In early September, we revealed that one of the big external customers will be Anthropic, with demand of at least 1 million TPUs.

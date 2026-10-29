---
id: 03-broker-research-2026-08-11-4
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-08-11
time: "00:00"
title: "03-broker-research-2026-08-11-4"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 21
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-08-11-4/full.md`（21 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是 AI 供应链主题件（CoWoS／HBM／GPU-ASIC 出货），无公司损益表，六项财务假设里只有"量的假设链"可取值。

- **单芯片功率与总装机（容量假设）**：按每颗 GPU/ASIC 平均 TDP 2kW 计，2027 年 CoWoS 隐含芯片量约 19mn 颗，对应约 38GW 装机功率需求；这是全篇唯一的"单耗×数量"换算锚。
- **芯片与整机换算（口径假设）**：9 台 HGX（每台 8 GPU）折 1 台 NVL72 机柜；2026 年 Blackwell 5.4mn 颗，2027 年 Rubin 与 Rubin Ultra 合计近 7mn 颗，Rubin NVL72 机柜 2027 年可达 90k 台；Rubin 于 3Q26 起量、机柜 4Q26 起出货。
- **HBM 规格与容量**：Rubin Ultra 走分层规格——高端 HBM4e 8Hi、低端 HBM4 12Hi 或 8Hi，Nvidia 将在 3Q26 末前定案；AI HBM 消耗上限 2026 年 30bn Gb、2027 年 50bn Gb。
- **CoWoS 产能分配（k 片，2026e→2027e）**：NVIDIA 780→1,222（份额 56%→45%）、Broadcom 300→484、AMD 130→530、MediaTek 40→180，总需求 1,394→2,694（同比 +102%、+93%）。
- **TPU／CPU 出货**：TPU 2026 年 3.7mn 颗、2027 年 7.35mn 颗；Google CPU 2026 年 1.5mn、2027 年 3mn；KYEC 的 Google 相关收入占其总营收 2026 年 8–10%、2027 年 10–15%。
- **材料未给出此项**：收入增速、毛利率、营业利润率、资本开支、实际税率、摊薄股数六项均无——本件不做损益表，也没有可复算的估值表；原本承载个股倍数与收入暴露的那一页只有标题、正文为空，表格未进入文本层。

结论：这套假设只能用来看"量"（晶圆、颗数、GW），看不到"价与利"，落不到 EPS。

### 依据

- p.3｜Assuming an average TDP of 2kW per GPU/ASIC, the installed base would require roughly 38GW of power capacity.
- p.9｜We now incorporate HGX systems (8 GPUs per server) into our chip consumption model and assume that nine HGX servers are equivalent to one NVL72 rack.
- p.9｜We forecast 5.4mn Blackwell units in 2026, with chip supply sufficient to meet Grace Blackwell NVL72 demand by 2H26.
- p.1｜We think Nvidia's Rubin Ultra will feature several SKUs with high-end version adopting HBM4e 8Hi lower-end versions using HBM4 12Hi or 8Hi.
- p.5｜Exhibit 3: AI HBM consumption: Up to 50bn Gb in 2027
- p.6｜<tr><td>Total demand</td><td>117</td><td>372</td><td>689</td><td>1,394</td><td>2,694</td><td>100%</td><td>100%</td><td>100%</td><td>100%</td><td>100%</td></tr>

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。

本件没有 FirstCall／Visible Alpha 一类共识表，故改做"他 vs 公司指引／他人测算"，可核的有三处，差异集中在 2027 年的量与功率：

| 项目 | 公司指引或他人测算 | 他的假设 | 差额 |
|---|---|---|---|
| MediaTek 2027 年 ASIC 份额 | 15–20%（公司指引） | 20% 收入份额（TPU 项目） | 取指引上限，差 0–5pp |
| 2027 年新增算力 | SpaceX 目标由 2GW 扩至近 10GW（+8GW） | 其同事 Adam Jonas 仅建模 3GW 增量、2027 年末 5GW | 差 5–8GW |
| 2027 年 CoWoS 隐含芯片的电力需求 | 同上 10GW 级别 | 19mn 颗 × 2kW ≈ 38GW | 高出约 28GW，是全篇最大的口径缺口 |

第三行最值得追：他自己的芯片量隐含 38GW，而同一份材料里同事的模型只有 3–5GW、客户目标也只有 10GW 级别，说明"颗数"与"能通电的机架"之间有一层没被解释的落差。差异不在收入端也不在利润率端（本件无利润率），而在功率与上电节奏。

判断：他的 2027 年颗数假设偏乐观一侧，且未论证电力可得性；若按 5GW 口径回推，可支撑的芯片量只有约 2.5mn 颗。

### 依据

- p.2｜MediaTek guided that it could achieve a 15–20% share of the ASIC market in 2027, broadly in line with our preview and Joe's assumption that MediaTek could secure a 20% revenue share in TPU programs.
- p.3｜Notably, Adam Jonas models only 3GW of incremental computing demand, reaching 5GW by the end of 2027.
- p.3｜As a rough illustration, the additional 8GW implied by SpaceX's target would equate to approximately 4mn Rubin GPUs, or roughly 20% of the AI accelerators that TSMC could produce in 2027.
- p.3｜investors questioned whether power infrastructure can support our projected 2027 CoWoS-implied chip volume of approximately 19mn units.

## Q3 · 他的**财年是谁的财年**？

是日历年，且不是任何一家公司的财年——所有预测列头直接写 2023／2024／2025／2026e／2027e（个别表到 2028e），没有"FYE"、没有结账月、没有"fiscal year ending"。

因此可与日历年末的市场共识直接比。两点边界：一是台系供应链公司实务上多用日历年财年，与本件口径一致，但本件并未显式声明，属**推定**；二是"2026e／2027e"是摩根士丹利自建的供应链测算年，不是公司指引年度，比较时须区分"他的估算年"与"公司指引年"。

### 依据

- p.6｜<tr><td>(k wafer)</td><td>2023</td><td>2024</td><td>2025</td><td>2026e</td><td>2027e</td><td>2023</td><td>2024</td><td>2025e</td><td>2026e</td><td>2027e</td></tr>
- p.7｜Source: Company data, Morgan Stanley Research (e) estimates; note: estimates are complied using our supply chain checks

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

无上一版报告可比（本件是同一主题的跟踪更新，未附上期数值表），修正分四类：

| 项目 | 旧值 | 新值 | 变动 |
|---|---|---|---|
| TPU 出货（2026／2027） | 上期仅称"有上行空间"，未给数 | 3.7mn／7.35mn 颗 | 仅方向，无旧基数 |
| Google CPU 出货 | 上期未纳入 | 1.5mn（2026）／3mn（2027） | 新增项，无旧值 |
| 芯片-机柜换算口径 | 旧模型只算芯片出货 | 新增 HGX，9 台 HGX 折 1 台 NVL72 | 方法变更（口径变了） |
| CoWoS 2027 总量 | 6 月版"初步分配"，未给总数 | 2,694k 片 | 仅方向，无旧数 |

分层判定：改的是**假设**——新增 HGX 换算、新增 Google CPU 需求、上调 TPU 口径，属模型结构与量的假设变动；本件无评级、无目标价，故不存在"结论变而假设没变"的情形。真正要盯的是口径变更：把 HGX 折成机柜后，同一批芯片对应的机架数会变，跨期比较不能直接用颗数。

原文另有 2027 年 NVIDIA CoWoS 份额由 56% 降至 45%，这是分配结构变化，不是总量下调（总量反而 +93%）。

### 依据

- p.9｜Our latest checks also suggest shipments of nearly 7mn Rubin and Rubin Ultra units in 2027, while total Rubin NVL72 rack shipments could reach 90k units in 2027
- p.9｜We now incorporate HGX systems (8 GPUs per server) into our chip consumption model
- p.3｜We now forecast Google CPU shipments of 1.5mn units in 2026 and 3mn units in 2027.
- p.6｜<tr><td>NVIDIA</td><td>53</td><td>200</td><td>425</td><td>780</td><td>1,222</td><td>45%</td><td>54%</td><td>62%</td><td>56%</td><td>45%</td></tr>

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

产品型不符：本件无个股评级、无目标价，所以没有 Bull／Base／Bear 三档，也没有对应的目标价与触发假设。

它有的是"技术配置分支"，容易被误读成情景，须分清：Rubin Ultra 分两档 SKU——高端用 HBM4e 8Hi、低端用 HBM4 12Hi 或 8Hi，驱动是 HBM 产能短缺、成本压力与不同工作负载的显存容量需求；Nvidia 将在 3Q26 末前定案。这是产品规格的二选一，不是估值的上下行情景，也没有给出两档各自对收入或利润的影响。

与之相关的唯一"方向性分歧"是：降规格会拖累解码性能（长上下文 LLM 更明显），但会推高芯片出货量，利好按量计价的供应商——同一件事对两类公司方向相反，文中未量化。

### 依据

- p.1｜Our checks indicate Rubin Ultra may adopt tiered HBM spec to balance supply, cost & workload requirements; shorter testing times could ease near-term capacity constraints.
- p.1｜Nvidia should make final decision before end-3Q26.
- p.1｜Our checks suggest HBM de-specification will have a more meaningful impact on decoding than pre-fill workloads, particularly for long-context-window LLMs.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

产品型不符：本件不做估值，没有目标价、没有可复算的倍数表，因此不存在"两法是否得同一结果"。

须点明一处载体异常：目录里确实有一节叫"AI semis – stock implications, P/E multiples, revenue exposure"，但该页文本层只有这一行标题（正文与表格为图片、未进入文本层），紧接着的"AI GPU and ASIC rental price tracker"页同样只有标题。也就是说，本件**声称**有个股倍数与收入暴露，实际无法取数，不能当作有估值方法。

它真正用的排序依据是供应链量：CoWoS 分配片数、HBM 消耗 Gb、TPU/CPU 颗数、机柜数，均为"量"的口径，与估值倍数无换算关系。

### 依据

- p.10｜AI semis – stock implications, P/E multiples, revenue exposure
- p.11｜AI GPU and ASIC rental price tracker
- p.15｜For valuation methodology and risks associated with any recommendation, rating or price target referenced in this research report, please contact the Client Support Team

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件全缺，属产品型不符（本件无目标价），仍须照实点名缺哪三件：

- 方法：无。全文无目标价公式，也无"DCF／倍数×指标"的表述；披露段把估值方法整体外推给客户支持团队。
- 关键输入：无。没有 EPS、倍数、WACC、永续增长率中的任何一项；连那节 P/E 倍数也停在标题、无数字。
- 风险列示：无针对目标价的风险条目。文中有供应链风险的方向句（HBM 短缺、Kyber 机柜延期、电力瓶颈），但都不挂在目标价上。

按合规口径上报一句：若误作个股研报判，2241(c)(1) 三件皆缺；正确归类是 AI 供应链主题研究，不适用该条。

### 依据

- p.15｜For valuation methodology and risks associated with any recommendation, rating or price target referenced in this research report, please contact the Client Support Team
- p.1｜2. Kyber server rack delays with no concrete timeline, while inter-rack CPO connectivity remains Nvidia's preferred direction
- p.10｜AI semis – stock implications, P/E multiples, revenue exposure

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，取自机构级披露表本身。

- 三档占比（覆盖全集 3,674 只）：Overweight/Buy 1,529 只占 42%；Equal-weight/Hold 1,582 只占 43%；Not-Rated/Hold 3 只占 0%；Underweight/Sell 560 只占 15%。
- 投行关系占比（近 12 个月收过投行报酬的客户 IBC，合计 936 只）：占本类别比例 OW 29%、EW 25%、NR 33%、UW 17%；占 IBC 总数比例 OW 47%、EW 42%、NR 0%、UW 10%。
- 观测时点：截至 2026 年 7 月 31 日。此处与常规口径有偏差——用的是**月末**而非日历季末，且距发布日（8 月 10 日）仅 10 天；读表时须记清这是月末快照，不是季末快照。
- 另有其他重大投资服务客户（MISC）列：合计 1,741 只，OW 750、EW 773、NR 1、UW 217。

判断：OW 占比 42% 明显高于 UW 15%，且 OW 中 29% 是投行客户，读其"AI 供应链看多"的排序时须按立场折价。

### 依据

- p.16｜Global Stock Ratings Distribution (as of July 31, 2026)
- p.16｜<tr><td>Overweight/Buy</td><td>1529</td><td>42%</td><td>442</td><td>47%</td><td>29%</td><td>750</td><td>43%</td></tr>
- p.16｜<tr><td>Equal-weight/Hold</td><td>1582</td><td>43%</td><td>396</td><td>42%</td><td>25%</td><td>773</td><td>44%</td></tr>
- p.16｜<tr><td>Underweight/Sell</td><td>560</td><td>15%</td><td>97</td><td>10%</td><td>17%</td><td>217</td><td>12%</td></tr>
- p.16｜<tr><td>Total</td><td>3,674</td><td></td><td>936</td><td></td><td></td><td>1741</td><td></td></tr>

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

未见。全篇无任何评级或目标价时间轴图，也没有逐条升降级记录表；披露段只有一句指向官网的声明，说股价图与评级历史在 Disclosure Website 上。

文本层能拿到的只是"当前评级 + 该评级起始日 + 前一交易日价格"三列清单，例如台积电 O（起始 2022-02-07）、联电 O（起始 2026-05-19）、世界先进 E（起始 2026-01-14）。这类清单只能读出评级起用日，读不出覆盖期内的升降级次数与历次目标价，不构成本题要求的走势图。

判断：本件为行业主题件，个股历史图由官网承载而非报告内页；报告中"声明有图、文本层无数据"成立。

### 依据

- p.15｜For important disclosures, stock price charts and equity rating histories regarding companies that are the subject of this report, please see the Morgan Stanley Research Disclosure Website
- p.20｜<tr><td>TSMC (2330.TW)</td><td>O (02/07/2022)</td><td>NT$2,380.00</td></tr>
- p.20｜<tr><td>UMC (2303.TW)</td><td>O (05/19/2026)</td><td>NT$123.00</td></tr>
- p.20｜<tr><td>Vanguard International Semiconductor (5347.TWO)</td><td>E (01/14/2026)</td><td>NT$157.50</td></tr>

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页只有样板指引（分析师认证与其他重要披露见文末 Disclosure Section），九项内容集中在文末披露附录的"Important Regulatory Disclosures on Subject Companies"与"Other Important Disclosures"两节。逐项：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 未见 | 查了认证段、监管披露段、Other Important Disclosures 三节，无"分析师或其家庭成员持有证券"的句子。唯一相近的是"研究部内可提前接触报告的人员持有 Alphabet、Broadcom、Meta、Microsoft、NVIDIA 等"，但同句明确"此人不是分析师、也不是分析师家庭成员"，主体不符，故判未见 |
| ② 报酬是否挂钩投行收入 | 有（间接） | 报酬基于研究质量、客户反馈、选股、竞争因素、公司收入与"overall investment banking revenues"；同段明确不挂钩具体投行交易 |
| ③ 近 12 个月主/副承销或收投行报酬 | 有 | managed or co-managed a public offering 名单含 NVIDIA、Broadcom、Meta Platforms、Alphabet、Amazon、Intel、SK hynix；另列近 12 个月收投行服务报酬的公司名单 |
| ④ 未来 3 个月是否寻求投行费 | 有 | "In the next 3 months… intends to seek compensation for investment banking services"，名单起于 AMD、AMEC、Advantest、Alchip、Alphabet |
| ⑤ 近 12 个月非投行服务报酬 | 有 | "products and services other than investment banking services"，名单含 AMD、Alphabet、Amazon、Amkor、ASE、BESI、Broadcom |
| ⑥ 是否客户及服务类型 | 有 | 单列"non-investment banking, securities-related services"客户关系句，与投行客户句分列，服务类型写明 |
| ⑦ 实益持有该类普通股 ≥1% | 有 | 截至 2026-07-31，实益持有 1% 以上普通股的名单含 NVIDIA、TSMC、MediaTek、ASE、KYEC（King Yuan Electronics）、Broadcom、AMD、Alchip、Advantest、SK hynix；**不含 GUC（Global Unichip）**，而 GUC 恰是本件 CoWoS 增速最高的标的之一 |
| ⑧ 是否做市 | 未见 | 全文无"makes a market in the securities of…"的名单句。唯一相近的是通用声明"业务包括 market making、providing liquidity…"，那是机构业务范围描述，不指名本件任何标的，故判未见 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 只有认证句"未因表达具体建议或观点收取直接或间接报酬"，讲的是表达观点的对价，不是从标的公司收酬，事项不符 |
| ⑩ 其他重大冲突 | 有 | 研究部内可提前接触报告者持有 Alphabet、Amazon、Broadcom、Cisco、Meta、Microsoft、NVIDIA 证券；另有美国行政令 14032／出口管制相关的交易限制提示（属合规限制而非利益冲突，但影响可交易性） |

红旗提示：该机构实益持有本件核心受益标的（NVIDIA、TSMC、MediaTek、KYEC）≥1% 普通股，且近 12 个月对 NVIDIA、Broadcom、Meta 等有承销或投行收酬关系、未来 3 个月仍拟寻求投行费 ⇒ 引用其"CoWoS 分配与 TPU 上修"的量假设时立场折价；GUC 虽不在 1% 名单，却是增速最高的推荐标的，尤须注意。

### 依据

- p.17｜Other Important Disclosures A member of Research who had or could have had access to the research prior to completion owns securities (or related derivatives) in the Alphabet Inc., Amazon.com Inc, Broadcom Inc., Cisco Systems Inc, Meta Platforms Inc, Microsoft, NVIDIA Corp.. This person is not a research analyst or a member of research analyst's household.
- p.15｜As of July 31, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research: ACM Research Inc, Advanced Micro Devices
- p.15｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Alchip Technologies Ltd, Alphabet Inc., Amazon.com Inc, Broadcom Inc.
- p.15｜In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services from Advanced Micro Devices, Advanced Micro-Fabrication Equipment Inc, Advantest, Alchip Technologies Ltd
- p.15｜Within the last 12 months, Morgan Stanley has received compensation for products and services other than investment banking services from Advanced Micro Devices, Alphabet Inc., Amazon.com Inc, Amkor Technology Inc
- p.16｜Equity Research analysts' or strategists' compensation is not linked to investment banking or capital markets transactions performed by Morgan Stanley or the profitability or revenues of particular trading desks.
- p.14｜This report references export controls and/or entities that may be subject to export control restrictions.

## Q11 · 他的**风险章**挂了数字吗？

无独立风险章，判"样板风险"（不是缺口）：本件以供应链跟踪为主，风险散在正文方向句里，未与目标价或 EPS 挂钩。

文中唯一带数字的"敏感性"是功率对算力的约束：按每颗 2kW、2027 年 19mn 颗计需约 38GW；反向换算，SpaceX 目标的额外 8GW 只够约 4mn 颗 Rubin，相当于台积电 2027 年 AI 加速器产量的 20%。这可以写成"若可上电容量只有 5GW ⇒ 可支撑芯片约 2.5mn 颗"，但仍换算不到任何公司的 EPS 或目标价。

其余风险条目均为方向句、无百分点与金额：Kyber 机柜延期且无时间表、HBM 降规格对长上下文解码影响更大、HBM 短缺与成本压力、CoWoS 分配结构变化。

判断：风险清单有形，缺的是"哪一年、影响几个百分点"的映射；本件产品型决定它不做这一步。

### 依据

- p.3｜Assuming an average TDP of 2kW per GPU/ASIC, the installed base would require roughly 38GW of power capacity.
- p.3｜the additional 8GW implied by SpaceX's target would equate to approximately 4mn Rubin GPUs
- p.1｜Kyber server rack delays with no concrete timeline, while inter-rack CPO connectivity remains Nvidia's preferred direction

## Q12 · 这份报告落在**静默期窗口**内吗？

否。发布日为 2026 年 8 月 10 日（GMT 21:00），本件是 AI 供应链的跟踪更新（文中列出的前序报告自 3 月至 7 月共六篇），不是首发覆盖，也不是增发后的跟踪报告。

全文没有发行时间线、没有承销角色标注、没有锁定期说明；披露段虽列出近 12 个月的主/副承销名单（含 NVIDIA、Broadcom、Meta、SpaceX 等），但那是机构级关系披露，不是本件所论标的的发行事件，也不构成本件在发行后若干天内发布的证据。

判断：不落窗。若后续出现以上述名单内公司为单一标的的首评或增发后更新，须按"IPO 后 10 天／二次发行后 3 天"重判。

### 依据

- p.1｜August 10, 2026 09:00 PM GMT
- p.13｜Key Featured Reports on the AI Supply Chain
- p.15｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Alchip Technologies Ltd, Alphabet Inc., Amazon.com Inc, Broadcom Inc.

---
id: 03-broker-research-2025-10-21-10
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2025-10-21
time: "00:00"
title: "03-broker-research-2025-10-21-10"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 21
---

> 产品型为**行业主题件（Morgan Stanley「Idea」）**：亚太科技团队 AI 供应链综述（TSMC 展望 / ASIC 进展 / OCP 纪要），21 页，正文 13 页 + 披露 8 页。全篇无单公司损益表、无目标价，个股只给 OW/E 评级。META 在本件中**不是被评级标的**，仅作为 CSP 需求方出现（MTIA 3、QLC、Yosemite 机架）。

## Q1 · 他的**关键假设取值**各是多少？

本件没有公司模型表，六项假设只能按"给了哪几行、没给哪几行"逐条交代，且全部是**行业口径**：

| 六项 | 取值 | 期间与口径 |
|---|---|---|
| 收入增速 | **未给公司收入**；替代项：2026 云 capex +31% Y/Y、隐含 AI 服务器 capex 约 +70% Y/Y | 2026E，超大规模云厂商合计，日历年 |
| 毛利率 | **未给该行**（全篇无毛利率、无 EPS） | — |
| 营业利润率 | **未给该行** | — |
| 资本开支 | **US\$582bn**（2025 基数 445bn，读图；共识仅 +16%） | 2026E，云 capex 合计 |
| 实际税率 | **未给该行** | — |
| 摊薄股数 | **未给该行** | — |

真正能搬进模型的是**量的假设**：

- CoWoS 总需求 2026E **1,154k 片（+70% Y/Y）**，其中 NVIDIA 685k（59%）、Broadcom 210k（18%）、AMD 105k（9%）。
- 对应 HBM 需求合计 **3,285,296 kGB**，晶圆收入 TAM **US\$20,224mn**（该表 CoWoS 合计 1,109k 片，与上表差 45k，即 Marvell 一行未计入）。
- 落到 Meta 的三行：MTIA 3（Iris）2026E 分到 **50k 片 CoWoS**、单 wafer 10 颗 ⇒ 出货 **500k 颗**、HBM 216GB×6 颗 ⇒ **108,000 kGB**。这是全篇唯一可落到本标的的量化假设。

驱动链：OCP 标准化（HVDC 800V、液冷、100k+ GPU 集群）＋ token 用量高增（中国 30trn/日、Google 1,300trn/月、字节 30trn/日、微软 500trn/F2025）⇒ 机柜与 HBM 先紧，TSMC 前段产能反而不再是瓶颈。

### 依据

- p.10｜According to our US hardware analyst Erik Woodring's Global Cloud Capex Tracker, MS expects 2026 cloud capex to increase to US\$582bn, implying 31% Y/Y growth (vs. consensus now only +16% Y/Y).
- p.10｜Assuming the AI server capex mix (spending on short-lived assets) increases, implied AI server capex may grow \~70% Y/Y in 2026
- p.7｜<tr><td>Total demand</td><td>20 117</td><td>10 370</td><td>19 680</td><td>15 1,154</td><td>100%</td><td>100%</td><td>100%</td><td>100%</td></tr>
- p.8｜<tr><td>Meta</td><td>MTIA 3 (Iris)</td><td>50</td><td>10</td><td>500</td><td>36</td><td>6</td><td>216</td><td>HBM3e 12hi</td><td>Hynix/Samsung</td><td>108,000</td></tr>
- p.8｜<tr><td>Total</td><td></td><td>1,109</td><td></td><td></td><td></td><td></td><td></td><td></td><td>Hynix/Samsung</td><td>3,285,296</td></tr>
- p.9｜<td>B300</td><td>235</td><td>14</td><td>3,290</td><td>850</td><td>4nm</td><td>2</td><td>261</td><td>21,945</td><td>5,730</td>

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照**做不了**，按纪律记缺口（不倒推我方值）。可做的是本件自带的一组对照——**他对共识**：

| 口径 | 他 | 共识 | 差 |
|---|---|---|---|
| 2026 云 capex 增速 | **+31%** | **+16%** | **+15pt** |
| 2026 云 capex 绝对额 | US\$582bn（图内注：较共识高 12%，图像层读数） | 按 +16% 推约 516bn（复算） | 约 +66bn |
| 2025 基数增速 | +59%（自述） | — | — |

- **差在哪一年**：全部在 **2026**，2025 是共同基数。
- **差在收入端还是利润率端**：**纯收入端（需求侧）**。全篇没有任何利润率或 EPS 假设，逻辑上不可能在利润率端产生分歧。
- **差多少算不算红灯**：按手册第 4.6 节的替代判法②（对共识/指引），15pt 的偏离且共识方向相反（共识减速 40 个点、他加速），已过一个档位 ⇒ 应按**红灯**处理。他的辩护只有一句"we believe there is upward pressure"，没有书面桥（没说共识哪一年、哪一项低估）。

另有一处**内部口径差**需点出（不是他与我的差）：同一 2026E CoWoS 总量，需求表给 1,154k 片、明细表合计 1,109k 片，差 45k 恰为 Marvell 一行。引用时必须写明取的是哪张表，否则下游会当成两个来源打架。

### 依据

- p.10｜According to our US hardware analyst Erik Woodring's Global Cloud Capex Tracker, MS expects 2026 cloud capex to increase to US\$582bn, implying 31% Y/Y growth (vs. consensus now only +16% Y/Y).
- p.10｜While consensus estimates indicate a 40-point deceleration in 2026 cloud capex growth, we believe there is upward pressure to consensus 2026 estimates – Morgan Stanley is now looking at 31% Y/Y growth in 2026 following 59% Y/Y growth in 2025.
- p.7｜<tr><td>Total demand</td><td>20 117</td><td>10 370</td><td>19 680</td><td>15 1,154</td><td>100%</td><td>100%</td><td>100%</td><td>100%</td></tr>
- p.8｜<tr><td>Total</td><td></td><td>1,109</td><td></td><td></td><td></td><td></td><td></td><td></td><td>Hynix/Samsung</td><td>3,285,296</td></tr>

## Q3 · 他的**财年是谁的财年**？

**行业口径按日历年；公司财年未标**。

- 估计表列头只有 `2023 / 2024 / 2025e / 2026e`，**无月末标注** ⇒ 按手册规则**推定为日历年**，并注明是推定而非明示。
- 佐证一：2026 年云 capex 那张图的图内注写 `CY26`（图像层，文本层无此串），与推定一致。
- 佐证二：报告并非不分财年——涉及微软时明确写 `F2025 (year end June 2025)`，说明遇到六月结账会主动标注；其余处不标，即按日历年处理。
- 落到本件实际用途：TSMC、MediaTek、ASE、KYEC、Aspeed 等台系公司本身十二月结账，日历年＝公司财年，无错位；三星亦为十二月结账。且报告**没有给这些公司的收入或 EPS 预测**，故不存在"财年错位导致整张表不可比"的问题。

结论：可比性风险低，但原因不是他标得清，而是他**几乎不给公司级财务预测**。一旦把他引作"某公司 2026 年收入 +X%"，须先确认那是不是行业合计口径。

### 依据

- p.7｜<tr><td>(kwafer)</td><td>2023</td><td>2024</td><td>2025e</td><td>2026e</td>
- p.11｜Microsoft processed over 500trn tokens through its Foundry APIs in F2025 (year end June 2025), up over 7x Y/Y.
- p.8｜<tr><td>AI GPU (2026e)</td><td></td><td></td><td>14</td><td>3,290</td>

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

**明示不改，旧值＝新值**。原文两句：CoWoS 供需模型**未动**（理由：TSMC 扩 CoWoS 只需 6 个月前置期），4nm/3nm 晶圆产能也**保持原样**（理由：AI 半导体优先级高于矿机 ASIC 与安卓手机 SoC）。故不存在任何 old→new、prior→current 的修订行。

分层判定：

- **假设层**：没改。CoWoS 需求 1,154k 片、供给拆分、晶圆产能全部沿用。
- **结论层**：没改。行业观点 Attractive（大中华半导体），个股 OW TSMC / Samsung / Alchip / MediaTek / Aspeed / KYEC。
- **变的是信息集**：TSMC 电话会口径（"AI 需求比三个月前更强"）与 NVIDIA NDR 口径（半导体产能不再是限制）被并入论证。

**要避开的坑**：往期报告清单里有一篇标题含 `AI capex revised up`（2025-08-05），那是**上一份**报告的修正，不是本件。本件对 capex 只给了新水平（2026 年 582bn / +31%），**没给上一版数值**，即便真有上调也只能记"仅方向、无幅度"，不得自己补基数。

判定：**不重要**（假设没动、结论没动，只是把两条产业链口径写进了论证）。

### 依据

- p.1｜We keep our CoWoS capacity demand and supply models unchanged in this report, since TSMC only needs 6 months' lead time to expand CoWoS capacity. For wafer front-end (4nm and 3nm), TSMC’s capacity is tight, but it seems AI semi will have a higher priority than crypto mining ASIC and Android smartphone SoC, so we keep our 4nm/3nm wafer capacity the same.
- p.1｜TSMC commented “AI demand is stronger than we thought 3 months ago”: At its recent earnings call, TSMC said it continues to work hard to "narrow the gap" between demand and supply (both CoWoS and wafer front-end capacity).
- p.14｜Global Technology: AI Supply Chain: AI capex revised up, while TSMC 2026 CoWoS supply unchanged (5 Aug 2025)
- p.10｜This underscores our Attractive industry view on Greater China Semis – we see AI demand remaining strong. In AI semis, we are OW TSMC, Samsung, Alchip, MediaTek, Aspeed and KYEC.

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**无情景**：没有 Bull/Base/Bear，没有三档目标价（本件根本没有目标价），也没有敏感度表。全篇只有**一个条件依赖**：

> 2026 仍是 AI 半导体的强年，但瓶颈可能来自 niche memory 与服务器机柜，而不是 TSMC 产能。

这句是本件唯一的分情形结构，可读成两条分支：

- **分支 A（他的基准）**：TSMC 产能不是约束——扩 CoWoS 只需 6 个月前置期；4nm/3nm 紧张，但 AI 半导体优先级高于矿机与手机 SoC。
- **分支 B（他点出的风险）**：约束下移到 HBM/niche memory 与机柜集成，再往下是电力与机房空间。

但他**没有**把分支 B 量化：没说 HBM 缺口多少、机柜交付延迟几个季度、对应哪一年收入减多少。故按手册记"**无情景**"，不强行拆三档。

另有一处方向性表述可当"上行情形"的替代品：他认为共识 2026 云 capex 有上行压力（他 31% vs 共识 16%）。但这只是对共识的方向判断，不是自己的情景，也不能当目标价区间用。

### 依据

- p.1｜2026 looks like being another strong year for AI semis, but a bottleneck could come from niche memory and/or server racks, not TSMC’s capacity.
- p.1｜We keep our CoWoS capacity demand and supply models unchanged in this report, since TSMC only needs 6 months' lead time to expand CoWoS capacity.
- p.10｜While consensus estimates indicate a 40-point deceleration in 2026 cloud capex growth, we believe there is upward pressure to consensus 2026 estimates – Morgan Stanley is now looking at 31% Y/Y growth in 2026 following 59% Y/Y growth in 2025.
- p.5｜The greater constraints now sit further downstream – in the availability of data center space, power, and supporting infrastructure – areas that operate on longer planning cycles.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**一种都没有**。本件是行业观点件：个股只给评级（OW / E），**不给目标价、不给倍数、不给折现率**。评级表只有三列——公司（代码）、评级（生效日）、价格——**没有目标价列**，所以连"倍数×指标"的复算起点都不存在。

唯一的"尺子"是一张 P/E 倍数带图（2022-11 至 2025-08，三组篮子：GP GPU、Alternative AI Semis、AI Semi Enablers，纵轴 10–50x）。读图：2025 年 8 月末三条线落在 30–34x，2024 年 2 月高点约 44–49x。这是**相对估值的历史区间**，用来讲"贵不贵"，不是用来推目标价——图上没有任何一条线对应本件所评的某只个股。

因此：

- **方法**：无（无 DCF、无 SOTP、无目标倍数）。
- **倍数**：只有篮子层面的历史 P/E 带，无个股选取倍数与选取理由。
- **交叉验证**：不适用——零种方法，谈不上互证。

他用"行业配置（Attractive）＋ 个股评级（OW/E）"替代了个股目标价。对下游的含义：**这份材料能提供假设与量的框架，不能提供任何价格锚**；要价格锚得去他的个股报告。

### 依据

- p.12｜AI semis – Stock Implications, P/E Multiples, Revenue Exposure
- p.12｜• In Asia semis, we are OW TSMC, KYEC, ASE, Samsung and Aspeed.
- p.20｜<table><tr><td>COMPANY (TICKER)</td><td>RATING (AS OF)</td><td>PRICE*(10/20/2025)</td></tr>
- p.17｜Unless otherwise specified, the time frame for price targets included in Morgan Stanley Research is 12 to 18 months.

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件逐条，结论是**三件全缺**，但要分清性质：

1. **目标价由哪个方法算出**：**无目标价**。评级表只有 RATING 与 PRICE 两列，无 PT 列；正文也没有任何"我们的目标价是 X"的句子。缺的不是公式，是目标价本身。
2. **方法的关键输入**：**未见**。全篇无折现率、无目标倍数、无永续增长率。披露页只留了一句"如需本报告所引评级/目标价的估值方法与风险，请联系客户支持团队"，并给出各地区电话——即方法**不在本文档内披露**。
3. **可能阻碍目标价的风险列示**：**未见**。全篇无风险章（详见 Q11）。

判：按 2241(c)(1) 的口径，**形式三件均缺，按"未见依据"记，上报，可信度降一档**。

但要说明白：这是 MS 的「Idea」产品，目标价由个股报告承载，本件按产品设计就不含 PT——**作为"研报"它并不违规，作为"可复算的估值件"它不可用**。下游若需要价格锚与风险量化，必须回到 TSMC / MediaTek / ASE 等个股报告，不能拿本件的行业观点代替。

### 依据

- p.20｜<table><tr><td>COMPANY (TICKER)</td><td>RATING (AS OF)</td><td>PRICE*(10/20/2025)</td></tr>
- p.16｜For valuation methodology and risks associated with any recommendation, rating or price target referenced in this research report, please contact the Client Support Team as follows: US/Canada +1 800 303-2495; Hong Kong +852 2848-5999; Latin America +1 718 754-5444 (U.S.); London +44 (0)20-7425-8169; Singapore +65 6834-6860; Sydney +61 (0)2-9770-1505; Tokyo +81 (0)3-6836-9000.
- p.1｜For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

**三件齐**，取自披露页的 Global Stock Ratings Distribution 表：

| 档（对应买卖/持有） | 只数 | 占比 | 投行客户只数 | 占该档比例 | 其他重要服务客户占比 |
|---|---|---|---|---|---|
| Overweight / Buy | 1,499 | 41% | 389 | **26%** | 41% |
| Equal-weight / Hold | 1,618 | 44% | 375 | **23%** | 45% |
| Not-Rated / Hold | 4 | 0% | 1 | 25% | 0% |
| Underweight / Sell | 577 | 16% | 88 | **15%** | 14% |
| 合计 | 3,698 | — | 853 | — | 1,719 |

- **三档占比**：41 / 44 / 16（另有 NR 4 只、0%，四舍五入后合计 101%，报告自己注明了这一点）。
- **投行关系占比**：按档 26 / 23 / 25 / 15；脚注定义为"过去 12 个月从摩根士丹利获得投行报酬的公司"。
- **观测时点**：2025-09-30。发布日 2025-10-20，距季末 20 天（>15 天）⇒ 用最近一个已结束季末，**合规**。

两个要点：① OW 档的投行关系占比（26%）是四档最高，看多档与投行客户重合度最高，引用其看多名单时须打折；② NR 档只有 4 只、其中 1 只有投行关系即 25%，样本极小，**不能引作趋势**。

### 依据

- p.17｜<tr><td>Overweight/Buy</td><td>1499</td><td>41%</td><td>389</td><td>46%</td><td>26%</td><td>702</td><td>41%</td></tr>
- p.17｜<tr><td>Equal-weight/Hold</td><td>1618</td><td>44%</td><td>375</td><td>44%</td><td>23%</td><td>782</td><td>45%</td></tr>
- p.17｜<tr><td>Underweight/Sell</td><td>577</td><td>16%</td><td>88</td><td>10%</td><td>15%</td><td>234</td><td>14%</td></tr>
- p.17｜(as of September 30, 2025)
- p.17｜Data include common stock and ADRs currently assigned ratings. Investment Banking Clients are companies from whom Morgan Stanley received investment banking compensation in the last 12 months.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**有图，但只覆盖一只标的**。

- **有**：披露页有专节标题 `Stock Price, Price Target and Rating History`，下一页即是该图——价格折线（2022-10 至 2025-10）＋ 阶梯状目标价线 ＋ 评级标记（O/I、O/C 一类）。
- **赋改日期可读**：图下文本层保留了完整的目标价变动序列（OCR 有粘连，但日期与数值成对可辨），可读出十余次赋/改，最近的一次是 2025-10-08。
- **覆盖期间**：图轴自 2022-10 起，约三年，满足"满一年即须附、取三年"的要求。
- **缺**：图**只有一张**，而覆盖清单列了 50+ 家公司（TSMC、MediaTek、ASE、KYEC、Aspeed、Alchip 等全在内）⇒ 其余标的不附历史图，按标的逐只要求属**形式瑕疵**。
- **不可核**：这张图的公司名在图像层没有被保留（OCR 未留标题），无法确认它对应哪一只标的；因此"本件所评公司的历史图是否齐"只能判**不齐**，不能判"齐"。

### 依据

- p.17｜Stock Price, Price Target and Rating History (See Rating Definitions)
- p.18｜12/18/24:65000；3/19/25:70000；8/1/25:86000；9/21/25:97000:10/8/2511000
- p.18｜Source: Morgan Stanley Research Date Format : MM/DD/YY Price Target No Price Target Assigned (NA)
- p.20｜<table><tr><td>COMPANY (TICKER)</td><td>RATING (AS OF)</td><td>PRICE*(10/20/2025)</td></tr>

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

**首页只有通用声明，逐项在披露页（第 16–18 页）**，且属"逐票列名型"。核对口径：本件的被覆盖标的是**一篮子亚太多家半导体**，META 只是 CSP 需求方、不在任何披露名单里，故逐项按"本件被覆盖公司"核，并逐条注明 META 是否在内。

| 项 | 有/无 | 内容与判据 |
|---|---|---|
| ① 分析师及家庭持仓 | **未见** | 认证段只声明"观点准确表达、未因特定推荐收取直接或间接报酬"，全篇无"分析师本人/家庭成员持有某证券"的句子。查过披露页全节与图表页。META 亦无。 |
| ② 报酬是否挂钩投行收入 | **有（分层表述）** | 报酬基数含"firm revenues and overall investment banking revenues"，但明确"不与投行/资本市场交易、不与特定交易台盈利挂钩"。即**公司层面含投行收入、交易层面不挂钩**。 |
| ③ 近 12 个月主/副承销或投行报酬 | **有** | 列名 Alchip、Andes、AP Memory、ASE、ASMedia、ASMPT、TSMC、Samsung、MediaTek、KYEC、Himax 等约 27 家；**不含 META**。 |
| ④ 未来 3 个月是否寻求投行费 | **有** | 同上一份名单（"expects to receive or intends to seek"），期间为未来三个月；**不含 META**。 |
| ⑤ 近 12 个月非投行服务报酬 | **有** | ASE、KYEC、MediaTek、Nanya、Novatek、Nuvoton、TSMC、UMC 等；**不含 META**。 |
| ⑥ 是否客户及服务类型 | **有** | 另有专段列出"提供非投行、证券相关服务，或曾签订服务协议，或存在客户关系"的公司（ASE、KYEC、MediaTek、TSMC 等），即上述公司同时是客户；**不含 META**。 |
| ⑦ 实益持股 ≥1% | **有** | 截至 2025-09-30，含 TSMC、Alchip、ASE、Aspeed、KYEC、Himax、Phison、GUC 等约 23 家；**不含 META**。 |
| ⑧ 是否做市 | **有（限定）** | 只写"对 Silicon Motion 的证券做市"一家；**不含 META**，也不含本件 AI 主线多数标的。另有香港子公司对华虹半导体做流动性提供。 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | **未见** | 只有"未因表达特定推荐而收取报酬"的认证句，无"from the subject company"表述。 |
| ⑩ 其他重大冲突 | **有** | 公司与关联方对本件覆盖公司做市、提供流动性、基金管理、商业银行、授信、投行等业务，并以本金（principal）与客户买卖本件所涉证券，另可能持有其债务头寸。 |

**红旗**：他给 OW 的名单（TSMC、Samsung、Alchip、MediaTek、KYEC）与"12 个月投行服务＋未来 3 个月寻求投行费"名单高度重合，且其中多家同时是 ≥1% 持股对象——**看多名单与投行关系名单三重叠加**。引用其 OW 结论时须立场折价；相对"干净"的是：META 不在任何名单内（因为它不是被覆盖标的，这不代表"无冲突"，只代表"无披露义务"）。

### 依据

- p.16｜Within the last 12 months, Morgan Stanley has either provided or is providing non-investment banking, securities-related services to and/or in the past has entered into an agreement to provide services or has a client relationship with the following company: ASE Technology Holding Co. Ltd.
- p.16｜As of September 30, 2025, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research: ACM Research Inc, Advanced Wireless Semiconductor Co, Alchip Technologies Ltd, AllRing Tech Co., ASE Technology Holding Co. Ltd.
- p.16｜In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services from Alchip Technologies Ltd, Andes Technology Corp, AP Memory Technology Corp, ASE Technology Holding Co. Ltd.
- p.16｜Within the last 12 months, Morgan Stanley has received compensation for products and services other than investment banking services from ASE Technology Holding Co. Ltd., King Yuan Electronics Co Ltd, MediaTek, Nanya Technology Corp., Novatek
- p.16｜Morgan Stanley & Co. LLC makes a market in the securities of Silicon Motion.
- p.16｜The equity research analysts or strategists principally responsible for the preparation of Morgan Stanley Research have received compensation based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues. Equity Research analysts' or strategists' compensation is not linked to investment banking or capital markets transactions performed by Morgan Stanley or the profitability or revenues of particular trading desks.
- p.16｜Morgan Stanley and its affiliates do business that relates to companies/instruments covered in Morgan Stanley Research, including market making, providing liquidity, fund management, commercial banking, extension of credit, investment services and investment banking.

## Q11 · 他的**风险章**挂了数字吗？

**没有风险章**——不是"样板风险"，是**该项缺失**。全篇唯一带条件性的句子是开头那句瓶颈判断，以及"约束下移到电力、机房空间与配套设施"的转述。两者都写不成"若 X 变则 Y 变"：没有百分点、没有 EPS、没有目标价敏感度。

本件最该给敏感度的地方也没有给：P/E 倍数带只画了历史区间（10–50x），没有说"倍数从 31x 回到 25x，隐含下行多少"。

判：**风险列示缺失**（2241(c)(1) 第三件），与 Q7 是同一处形式缺口，一并上报。

若一定要做量化替代，只能自己搭，且必须标明是我方推算而非他给的：以 2026 云 capex 582bn 为基数，±5% 即 ±29bn（复算）；或按他对 2026 云 capex 增速的 31% 与共识 16% 之差反推敏感带。这些都进不了"他的风险章"，只能进我方的对照表。

### 依据

- p.1｜2026 looks like being another strong year for AI semis, but a bottleneck could come from niche memory and/or server racks, not TSMC’s capacity.
- p.5｜The greater constraints now sit further downstream – in the availability of data center space, power, and supporting infrastructure – areas that operate on longer planning cycles.
- p.10｜While consensus estimates indicate a 40-point deceleration in 2026 cloud capex growth, we believe there is upward pressure to consensus 2026 estimates – Morgan Stanley is now looking at 31% Y/Y growth in 2026 following 59% Y/Y growth in 2025.

## Q12 · 这份报告落在**静默期窗口**内吗？

**否，不落窗**。

- **发布日期**：2025-10-20 20:00 GMT（归档日 2025-10-21，为时区/入库日差，引用时用 2025-10-20）。
- **性质**：行业综述（Idea），非首评、非发行相关、非评级变动通知。
- **窗口起算**：全篇无 IPO、无二次发行/增发、无承销团名单（Manager / Co-Manager / underwriting / follow-on 零命中）、无发行定价日，10 天/3 天窗口**无从起算** ⇒ 判不落窗。
- **易混淆处**：披露页有一份"近 12 个月提供投行服务"的名单（含 TSMC、Alchip、ASE、KYEC、MediaTek、Samsung 等）。那是**关系披露**，不是本件发布所对应的发行事件，**不能**当静默期锚点——把"有投行关系"读成"正在静默期"是本类常见误判。
- **反向提示**：若上述标的自此进入发行窗口，该机构在这些标的上的发布节奏才受 10 天/3 天约束；这与本件的合规性无关。

### 依据

- p.1｜October 20, 2025 08:00 PM GMT
- p.1｜Morgan Stanley does and seeks to do business with companies covered in Morgan Stanley Research.
- p.16｜Within the last 12 months, Morgan Stanley has provided or is providing investment banking services to, or has an investment banking client relationship with, the following company: Alchip Technologies Ltd, Andes Technology Corp, AP Memory Technology Corp, ASE

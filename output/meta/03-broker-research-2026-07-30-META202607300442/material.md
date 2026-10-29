---
id: 03-broker-research-2026-07-30-META202607300442
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-07-30
time: "00:00"
title: "03-broker-research-2026-07-30-META202607300442"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 16
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-07-30-META202607300442/full.md`（16 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

Morgan Stanley 个股件（OW，Top Pick，目标价 775 美元，7 月 29 日收盘 585.61 美元），六项假设齐全，均为公司财年、GAAP 口径（收入与毛利率为 ex-SBC 成本口径）：

- **收入增速**：2025A 200,965 百万美元 → 2026E 255,872（+27.3%）、2027E 312,218（+22.0%）、2028E 375,491（+20.3%），三年 CAGR 23.2%；按固定汇率口径则为 22.5% / 26.6% / 22.2% / 19.9%，即 2026 年是增速高点。
- **毛利率**：2025A 82.6% → 2026E 80.7%、2027E 76.0%、2028E 73.5%（成本含 AI 基础设施折旧，逐年下压）。
- **营业利润率（GAAP）**：2025A 41.4% → 2026E 34.8%、2027E 33.1%、2028E 29.6%；调整后 EBITDA 利润率 60.9% → 57.2% / 60.3% / 63.5%。
- **资本开支**：2026E 144,654、2027E 225,154、2028E 250,154 百万美元（三年翻近一倍，折旧 31,491 → 58,977 → 98,679）。
- **实际税率（GAAP）**：2025A 29.6% → 2026E 6.4%（异常低点）、2027E 13.0%、2028E 13.0%；调整后口径 2026 年二季度实际为 16.0%。
- **摊薄股数**：2026E 2,589.9、2027E 2,635.2、2028E 2,662.8 百万股（逐年小幅回升，回购未完全抵消 SBC）；对应 EPS（GAAP）31.80 / 34.13 / 35.34 美元。

口径提醒：同一组 2027/2028 年 EPS，附表（Prior vs Current）记 33.74 / 34.59，利润表记 34.13 / 35.34，两处不一致；收入亦为 255,888 与 255,872 之差。估值用的是附表那一组（均值 34.17），引用时须指明取哪张表。

### 依据

- p.7｜<tr><td>Total net revenue</td><td>$200,965</td><td>$255,872</td><td>$312,218</td><td>$375,491</td><td>23.2%</td></tr>
- p.7｜<tr><td>Gross margin</td><td>82.6%</td><td>80.7%</td><td>76.0%</td><td>73.5%</td><td></td></tr>
- p.7｜<tr><td>GAAP operating margin</td><td>41.4%</td><td>34.8%</td><td>33.1%</td><td>29.6%</td><td></td></tr>
- p.7｜<tr><td>Tax rate (GAAP)</td><td>29.6%</td><td>6.4%</td><td>13.0%</td><td>13.0%</td><td></td></tr>
- p.3｜<tr><td>144,654.0</td><td>225,154.0</td><td>250,154.0</td></tr>
- p.3｜<tr><td>2,589.9</td><td>2,635.2</td><td>2,662.8</td></tr>
- p.6｜<tr><td>Drivers</td><td colspan="4">Dec2025 Dec2026e Dec2027e Dec2028e</td></tr>

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行「他 vs 我」的对照需跨批（交主控）。本件附了「MS Estimates vs. Consensus」表（FY Dec 2026e，来源 Refinitiv，附低/高区间），可做「他 vs 共识」：

| 项目（2026E） | MS | 共识 | 差额 | 共识区间 |
|---|---|---|---|---|
| 收入（百万美元） | 255,888 | 253,077 | +2,811（+1.1%） | 237,140–269,079 |
| EBITDA | 146,354 | 142,872 | +3,482（+2.4%） | 114,318–170,068 |
| 净利润 | 82,353 | 84,280 | −1,927（−2.3%） | 74,800–94,600 |
| EPS（美元） | 31.80 | 32.91 | −1.11（−3.4%） | 28.74–38.62 |

结论：**差异不在收入端，在利润率与费用端**——他的收入比共识高 1.1%、EBITDA 高 2.4%，但净利润低 2.3%、EPS 低 3.4%，缺口只能来自折旧摊销与税率假设（2026E 折旧 31,491、GAAP 税率 6.4% 这两个数都极不常态）。共识 EPS 区间 28.74–38.62 宽达 34%，说明卖方对 AI 资本化的会计处理分歧很大。

### 依据

- p.6｜<tr><td rowspan="2">Sales / Revenue ($, mm)</td><td rowspan="2">237,140</td><td>255,888</td><td rowspan="2">269,079</td></tr>
- p.6｜<tr><td>253,077</td></tr>
- p.6｜<tr><td rowspan="2">EBITDA ($, mm)</td><td rowspan="2">114,318</td><td>146,354</td><td rowspan="2">170,068</td></tr>
- p.6｜<tr><td>142,872</td></tr>
- p.6｜<tr><td rowspan="2">EPS ($)</td><td rowspan="2">28.74</td><td>31.80</td><td rowspan="2">38.62</td></tr>
- p.6｜<tr><td>32.91</td></tr>

## Q3 · 他的**财年是谁的财年**？

公司财年，**十二月结账，等于日历年**。驱动表列头写 `Dec2025 Dec2026e Dec2027e Dec2028e`，共识对照表写 `FY Dec 2026e`，两处都明示 12 月年结，可直接与日历年末共识比。

判断：无需换口径。唯一的时点注意点是价格——目标价 775 美元对 7 月 29 日收盘 585.61 美元，属 12–18 个月时窗（评级定义段写明），不是本财年末。也因如此，报告用「'27/'28 平均 EPS」而非单一财年做估值锚。

### 依据

- p.6｜<tr><td>Drivers</td><td colspan="4">Dec2025 Dec2026e Dec2027e Dec2028e</td></tr>
- p.6｜<tr><td colspan="4">FY Dec 2026e</td></tr>
- p.12｜Unless otherwise specified, the time frame for price targets included in Morgan Stanley Research is 12 to 18 months.

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

逐行给旧值 → 新值（附表 Prior vs Current，Revision 列为原文口径）：

| 项目 | 2026E | 2027E | 2028E |
|---|---|---|---|
| 总收入 | 254,652.9 → 255,888.3（+0.5%） | 309,659.1 → 312,245.8（+0.8%） | 371,363.2 → 375,533.7（+1.1%） |
| 毛利率 | 74.0% → 80.7%（+671bp） | 69.6% → 76.0%（+641bp） | 66.4% → 73.5%（+708bp） |
| 营业利润（GAAP） | 92,215.7 → 89,132.8（−3.3%） | 101,748.3 → 103,423.7（+1.6%） | 104,840.6 → 111,209.7（+6.1%） |
| EPS（GAAP） | 32.49 → 31.80（−2.1%） | 32.99 → 33.74（+2.3%） | 33.41 → 34.59（+3.5%） |
| 资本开支 | 144,988.0 → 144,654.0（−0.2%） | 225,488.0 → 225,154.0（−0.1%） | 250,488.0 → 250,154.0（−0.1%） |

**改的是假设，不是结论**：目标价 775 美元维持（价格目标史上最近一次变动是 3 月 29 日的 775），评级 OW 维持，正文只用 "ests nudge higher" 描述。但假设层的改动方向值得注意——收入仅上调 0.5%–1.1%，毛利率却上调 641–708bp，而同期研发费用率由 20.5%→26.7%（2026E）、19.6%→18.9%（2027E）大幅变动、营业利润率反而由 36%→35%（2026E）。这不是经营改善，更像**成本重分类**（把 AI 算力成本从营业成本挪到研发/折旧），故「毛利率上修」不能当利好读。

### 依据

- p.3｜<tr><td>Total revenue</td><td>254,652.9</td><td>309,659.1</td><td>371,363.2</td></tr>
- p.3｜<tr><td>255,888.3</td><td>312,245.8</td><td>375,533.7</td></tr>
- p.3｜<tr><td>Gross margin</td><td>74.0%</td><td>69.6%</td><td>66.4%</td></tr>
- p.3｜<tr><td>80.7%</td><td>76.0%</td><td>73.5%</td></tr>
- p.3｜<tr><td>EPS (GAAP)</td><td>$32.49</td><td>$32.99</td><td>$33.41</td></tr>
- p.3｜<tr><td>$31.80</td><td>$33.74</td><td>$34.59</td></tr>
- p.3｜<tr><td>Capex</td><td>144,988.0</td><td>225,488.0</td><td>250,488.0</td></tr>
- p.1｜META remains Top Pick as ests nudge higher; look for further product scaling in 2H:26, with META potentially at 14X '28 EPS.

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

三档齐，且每档都给了「倍数 × EPS」的两个输入：

| 情景 | 目标价 | 隐含倍数 | '27/'28 平均 EPS | 触发假设 |
|---|---|---|---|---|
| Bull | 1,000 美元 | ~28x | 35.58 美元 | AI 投入带动参与度并催生新产品，广告变现超预期；click-to-message、订阅、Meta Business AI 落地；Reels 变现差距收窄 |
| Base | 775 美元 | ~23x | 34.17 美元 | 2026 年广告收入增约 27%，AI 改善 Reels 参与度与广告测量；继续提效并盘活数据中心产能 |
| Bear | 450 美元 | ~15x | 30.88 美元 | 参与度下滑或 Reels 变现慢于预期；宏观与广告定向监管；数据中心建设失误推高资本强度、ROIC 偏低 |

差别落点：**杠杆主要在倍数，不在经营**。EPS 从 30.88 到 35.58 只差 15%，倍数却从 15x 到 28x 差 87%；目标价 450→1,000 的 2.2 倍跨度基本由倍数解释。

另需注意口径矛盾：附表把 base 775 标为 43% 上行，但按页面披露的收盘价 585.61 复算为 +32.3%（775/585.61−1），bear 与 bull 同理对不上（应为 −23.2% / +70.8%）。三档方向可用，百分比不可直接引用。

### 依据

- p.2｜<tr><td>META Valuation Bear Base Bull '27/'28 Avg. EPS $30.88 $34.17 $35.58 (X) P/E 15X 23X 28X (=) Price Per Share $450 $775 $1,000</td></tr>
- p.5｜Implied ~28x blended '27/'28 P/E
- p.5｜Implied ~15x blended '27/'28 P/E
- p.5｜Ad revenue grows ~27% in '26 as META's AI investments drive incremental Reels engagement/monetization and support improved performance and ad measurement/attribution across the Family of Apps.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**只给一种方法：P/E 相对估值**，且是「跨两个财年的平均 EPS」这一非常规口径——775 美元 = ~23x × ('27/'28 平均 EPS 34/35 美元)，复算 775/34.17 = 22.7x，与文中「~23X」一致，可复现。文中另引长期均值 20x NTM PE 作参照，说明 23x 是「高于自身历史均值」的主动溢价，但仍是同一方法内部的倍数选择，不构成第二种方法。

没有 DCF、没有 WACC、没有永续增长率、没有 SOTP、没有 EV/EBITDA 交叉检验。判断：**只有一法，无法互证**；能做的只是「同一法内部的倍数合理性检查」（23x vs 历史 20x），而这属于假设而非印证。

### 依据

- p.5｜Our $775 PT is based on applying a ~23X P/E multiple to the average of our $34/$35 EPS in '27/'28.
- p.2｜Our $775 PT implies paying 23X ‘28 EPS, vs META’s long-term average multiple of 20X NTM PE.
- p.11｜For valuation methodology and risks associated with any recommendation, rating or price target referenced in this research report, please contact the Client Support Team as follows:

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件齐：

1. **方法**：~23x P/E × '27/'28 平均 EPS（34/35 美元）= 775 美元，公式可复算，落在 Risk Reward 页顶部一句。
2. **关键输入**：EPS 34 与 35 美元、倍数 23x、以及作为参照的长期均值 20x NTM PE；溢价理由写明为「新产品 call options 尚未计入价格」——报告测算这些产品可加约 9 美元（约 25%）到 35 美元基准 EPS。
3. **风险列示**：给了双向清单且条目具体——上行（Reels 变现快于预期、AI 投资收益、订阅与 click-to-message 贡献、提效推高 FCF）、下行（执行失误导致长期资本强度上升、宏观与消费走弱、广告定向监管、Reality Labs 亏损扩大），Bear 情景另给 450 美元与 15x 的量化落点。

判断：形式合规，无缺件。唯一瑕疵是风险条目未给逐项概率或 EPS 影响幅度（见风险题）。

### 依据

- p.5｜Our $775 PT is based on applying a ~23X P/E multiple to the average of our $34/$35 EPS in '27/'28.
- p.1｜As shown below, in all, we estimate these call options could add as much as $9 (or ~25%) to our new base case $35 EPS.
- p.6｜Macro pressures/weaker consumer spendRegulation impacts ability to target adsReality labs losses widen further
- p.6｜Mis-execution risk could result in higher LT capital intensity

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，全部取自披露附录的 Global Stock Ratings Distribution 表：

- **三档占比**（Coverage Universe）：Overweight/Buy 1,544 家、42%；Equal-weight/Hold 1,577 家、43%；Not-Rated/Hold 3 家、0%；Underweight/Sell 544 家、15%；合计 3,668 家。
- **各档中投行客户占比**：IBC 列的「% of Rating Category」为 OW 29%、EW 25%、NR 33%、UW 16%；投行客户总数 933 家。另有 Other MISC 客户一栏（757/769/1/204）。
- **观测时点**：`as of June 30, 2026`，即 2026 年二季度末；发布日 7 月 30 日距季末一个月，已逾 15 天，用最近季末正确。

判断：可直接引用，无需自行统计报告内个股条数。

### 依据

- p.12｜Global Stock Ratings Distribution
- p.12｜<tr><td>Overweight/Buy</td><td>1544</td><td>42%</td><td>453</td><td>49%</td><td>29%</td><td>757</td><td>44%</td></tr>
- p.12｜<tr><td>Equal-weight/Hold</td><td>1577</td><td>43%</td><td>390</td><td>42%</td><td>25%</td><td>769</td><td>44%</td></tr>
- p.12｜<tr><td>Underweight/Sell</td><td>544</td><td>15%</td><td>89</td><td>10%</td><td>16%</td><td>204</td><td>12%</td></tr>
- p.12｜(as of June 30, 2026)

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

在，文本层有完整的两行序列（图本身未渲染，但日期与数值齐全）：

- **评级史**：2021/7/1 O/I → 2022/10/27 E/I → 2023/3/20 O/I → 2023/10/22 O/A，共 4 条变动；最近一次是 **2023 年 10 月 22 日升至 Overweight、行业观点转 Attractive**，之后未再动。
- **目标价史**：2021/4/29 起 375 美元 … 2023/7/27 375 → 2024/2/2 550 → 2024/7/31 575 → 2024/10/20 600 → 2025/1/12 660 → 2025/4/16 615 → 2025/5/1 650 → 2025/7/20 750 → 2025/7/31 850 → 2025/10/30 820 → 2025/12/10 750 → 2026/1/29 825 → **2026/3/29 775**，共 31 个时点。
- **覆盖期间**：2021 年 4 月至 2026 年 3 月，近 5 年，远超一年要求；本件发布时目标价维持 775，未新增变动点。

### 依据

- p.13｜Stock Rating History: 7/1/21:0/I; 10/27/22: E/I; 3/20/23:0/I; 10/22/23:0/A
- p.13｜Price Target History: 4/29/21 : 375;7/28/21 :400; 10/26/21 :365; 1/19/22: 395; 2/3/22 :360; 3/2/22 :325; 4/28/22 :330;

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页以样板句指向披露附录（"For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report."），逐项集中在 Disclosure Section 的 Important Regulatory Disclosures on Subject Companies。**本标的 META 被点名多次**，逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | **有，含本标的** | 「The analyst or strategist (or a household member) identified below owns the following securities」——点名 Gregory Gao（研究助理）持有 Alphabet、Amazon、**Meta Platforms Inc**、Reddit、Uber 的普通股或优先股及衍生品 |
| ② 报酬是否挂钩投行收入 | 有（间接） | 报酬「based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues」，但紧接一句「not linked to investment banking or capital markets transactions」 |
| ③ 近 12 个月主/副承销或收投行报酬 | **有，含本标的** | 「managed or co-managed a public offering (or 144A offering)」名单含 Meta Platforms Inc；「received compensation for investment banking services」名单亦含 Meta |
| ④ 未来 3 个月是否寻求投行费 | **有，含本标的** | 「In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services from …」名单含 Meta Platforms Inc |
| ⑤ 近 12 个月非投行服务报酬 | **有，含本标的** | 「received compensation for products and services other than investment banking services」名单含 Meta Platforms Inc |
| ⑥ 是否客户及服务类型 | **有，含本标的、两类** | 投行客户关系名单含 Meta；非投行、证券相关服务名单亦含 Meta |
| ⑦ 实益持有该类普通股 ≥1% | **有，含本标的** | 「As of June 30, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of …」名单含 Meta Platforms Inc |
| ⑧ 是否做市 | 有，**不含本标的** | 做市名单为 DoubleVerify、FIGS、Grindr、Playtika、Revolve、Webtoon、Yelp；META 不在，但另有泛述「Morgan Stanley and its affiliates do business that relates to companies/instruments covered … including market making」——泛述不落到本标的，故本项按「未见单票做市」处理 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 附录无该句；最接近的是认证段「have not received and will not receive direct or indirect compensation in exchange for expressing specific recommendations」，讲的是「为观点收酬」，不是「从标的公司收酬」，故不算 |
| ⑩ 其他重大冲突 | 有 | 「An employee, director or consultant of Morgan Stanley is a director of eBay Inc.」（非本标的）；另有一名可提前接触报告的 Research 成员持有 Uber 证券 |

红旗提示：MS 对 META 同时具备 ①分析师持仓 ③承销 ④拟收费 ⑤非投行收费 ⑦≥1% 实益持股 四重以上关系 ⇒ 引用其 775 美元目标价与 OW 评级时立场折价，尤其「新产品可加 9 美元 EPS」这类乐观测算。

### 依据

- p.11｜The analyst or strategist (or a household member) identified below owns the following securities (or related derivatives): Gregory Gao - Alphabet Inc.(common or preferred stock), Amazon.com Inc(common or preferred stock), Meta Platforms Inc(common or preferred stock), Reddit Inc(common or preferred stock), Uber Technologies Inc(common or preferred stock).
- p.11｜As of June 30, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research:
- p.11｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Airbnb Inc, Alphabet Inc., Amazon.com Inc, Compass, Inc., eBay Inc, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Uber Technologies Inc.
- p.11｜Within the last 12 months, Morgan Stanley has received compensation for investment banking services from Airbnb Inc, Alphabet Inc., Amazon.com Inc, Chewy Inc, eBay Inc, Instacart, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Uber Technologies Inc.
- p.11｜Within the last 12 months, Morgan Stanley has received compensation for products and services other than investment banking services from Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp, Booking Holdings Inc, Chewy Inc, DoorDash Inc, eBay Inc, Electronic Arts Inc, Expedia Inc., Instacart, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Peloton Interactive, Inc., Pinterest Inc, Playtika Holding Corp, Reddit Inc, Revolve Group Inc, Snap Inc., Take-Two Interactive Software, Uber Technologies Inc, Unity Software Inc, WW International Inc, Zillow Group Inc.
- p.11｜Morgan Stanley & Co. LLC makes a market in the securities of DoubleVerify Holdings Inc, FIGS, Inc., Grindr Inc., Playtika Holding Corp, Revolve Group Inc, Webtoon Entertainment Inc, Yelp Inc.
- p.11｜The equity research analysts or strategists principally responsible for the preparation of Morgan Stanley Research have received compensation based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues.
- p.11｜An employee, director or consultant of Morgan Stanley is a director of eBay Inc. This person is not a research analyst or a member of a research analyst's household.

## Q11 · 他的**风险章**挂了数字吗？

**部分挂了数字，但只到情景层，没有逐项敏感度**。可写成量化句的只有两处：

- 「这些 call options 合计可加约 9 美元（约 25%）到 35 美元基准 EPS」——可写成：若新产品全部兑现 ⇒ 2028 年 EPS 由 35 增至 44（+25%）。
- 「若只兑现 50%（约 5 美元 EPS），当前股价对应约 14x 该 '28 EPS」——可写成：EPS +5 美元 ⇒ 现价倍数由 16x 降至 14x。

但风险章本身（RISKS TO PT/RATING 的上行/下行清单、Bear 情景）全部是方向句：执行失误推高长期资本强度、宏观走弱、广告定向监管、Reality Labs 亏损扩大——没有一条附「若 X 变多少 ⇒ EPS/PT 变 Y%」的敏感表，也没有 WACC/倍数 ±1x 的换算表。

判断：不算纯样板，也不算合格敏感度；记「情景层有数、逐项无敏感度」。

### 依据

- p.1｜As shown below, in all, we estimate these call options could add as much as $9 (or ~25%) to our new base case $35 EPS.
- p.2｜And if META can realize even 50% of the call options above (~$5 of EPS) the name is currently trading at ~14X that ‘28 EPS.
- p.6｜Macro pressures/weaker consumer spendRegulation impacts ability to target adsReality labs losses widen further

## Q12 · 这份报告落在**静默期窗口**内吗？

**无法判定，倾向于否**。发布日 2026 年 7 月 30 日 04:42 GMT；本件是常规覆盖更新（Top Pick 维持、目标价维持），不是发行相关文件。全文未见 IPO 或二次发行的定价日、上市日、发行规模与时间线。

披露里确有承销关系句：过去 12 个月曾 managed or co-managed a public offering (or 144A offering) of securities of … Meta Platforms Inc——**但未给发行日**，无法与「IPO 后 10 天 / 二次发行后 3 天」比对。META 是成熟上市公司，本件亦非发行启动后的首篇覆盖。

判断：不落在可核的窗口内；按纪律记为「发行日不可得 ⇒ 无法比」，而不是「未见静默期声明」。

### 依据

- p.1｜July 30, 2026 04:42 AM GMT
- p.11｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Airbnb Inc, Alphabet Inc., Amazon.com Inc, Compass, Inc., eBay Inc, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Uber Technologies Inc.

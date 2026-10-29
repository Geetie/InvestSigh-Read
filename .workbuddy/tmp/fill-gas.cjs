const fs = require("fs");

const ID = "03-independent-research-2025-12-31-人工智能实验室如何解决电力危机现场天然气深度剖析Ho";
const TAG = "gas";
const TITLE = "SemiAnalysis：AI 实验室如何绕开电网——现场燃气的技术路线与 TCO 拆解（2025-12-31）";
const ISSUER = "SemiAnalysis / Ajey Pandey、Jeremie Eliahou Ontiveros、Dylan Patel";

const q = {};

q[1] = {
  ans: `本件主体是「AI 数据中心供电」这个行业，不是 Meta。全文的数都是作者的建模结果，一律标「外部估算」（SemiAnalysis 自建 Datacenter Model，非任何公司披露）：

1. **七类发电技术横向参数表**（1,000 MW IT 口径）：全口径 capex $1,000–4,000/kW、交付周期 3–60 个月、土地 5–100 MW/acre、电效率 35–60%、含维护 LCOE $65–200/MWh。例：工业燃机 1,000–1,300 $/kW、LCOE 65–110 $/MWh；航改 1,500–1,800 $/kW、80–130 $/MWh；燃料电池 3,000–4,000 $/kW、100–200 $/MWh。
2. **现场燃气 TCO**（同一 1,000 MW IT、峰值 PUE 过建 1.4–1.5、N+1+1 过建 1.05–1.30）：五种技术的「拥有成本 = 盈亏平衡电价」$98.71–232.77/MWh，工业燃机最低（98.71–157.45），燃料电池最高（130.30–232.77）。
3. **AI 云单位收入**：$10–12M/MW/年，即 1GW 级 $10–12B/年——这是全篇最值钱的一条，因为它把电的物理量直接换成了收入。
4. **桥接电力的时间价值**：200MW 提前六个月投产 = $1.0–1.2B 收入。
5. **市场增速**：现场燃气进入「三位数年增长」；美国已有 12 家供应商各自拿到 >400MW 订单。
6. **建设成本**：EPC 从常态 $1,000/kW 涨到 $2,200–2,500/kW。
7. **厂商名义产能**：Bloom 2026 年底 2GW/年、Boom 2028 年底 2GW/年。

代理变量与目标量之间没有换算桥的两处：$/MWh 是「过建后的自发电成本」，只能与电网批发电价同口径比，不能直接当公司披露的电力成本；订单 MW 不是交付 MW。故第 5、7 项只能当量级，不能入格。略读说明：LM6000/Titan 等机型额定功率清单与电网互联的行政流程约 12 页，与成本、产能结论无关，仅扫读。`,
  blocks: [
    ["p.19", "<tr><td>Industrial GT</td><td>5-50</td><td>1,000-1,300</td><td>12-36</td><td>20-30</td><td>20-40</td><td>35-40%</td><td>65-110</td></tr>"],
    ["p.70", "The cost of ownership for generation resources can roughly be split into $/kW for capital expenditure and $/MWh for operating expenditure, with upfront fixed costs for permitting:"],
    ["p.70", "<tr><td>Total Ownership Cost per MWh (Breakeven)</td><td>$/MWh</td><td>$ 98.71</td><td>$ 157.45</td><td>$ 106.09</td><td>$ 165.43</td><td>$ 111.53</td><td>$ 210.96</td><td>$ 110.05</td><td>$ 196.68</td><td>$ 130.30</td><td>$ 232.77</td></tr>"],
    ["p.46", "AI cloud revenue can net $10-12M per MW annually, meaning that getting 200 MW of datacenter powered and online even six months earlier can net $1-1.2 billion in revenue."],
    ["p.4", "The market for onsite gas generation is entering an era of triple-digit growth annual growth."],
    ["p.5", "The results surprised us: 12 different suppliers have now secured >400 MW of datacenter orders each in the US alone, for onsite gas generation."],
    ["p.80", "Build costs have risen from a normalized $1,000/kW to $2,200–$2,500/kW in recent projects."],
    ["p.62", "Bloom Energy has claimed they can reach 2 GW/year of production capacity by end of 2026, and Boom Supersonic plans to reach 2 GW/year by end of 2028."],
  ],
};

q[2] = {
  ans: `全部物理量都是电力口径（MW/GW），没有机柜数、GPU 张数、晶圆产能。逐项给时点与来源状态：

- **xAI 已部署 >500MW 涡轮机**：可回溯到卫星影像（材料给了苏格拉底南部 2025-11-11 卫星图），但「500MW」本身没有逐站清单，记来源不可回溯，降为旁证。
- **订单类**：OpenAI/Oracle 德州 2.3GW（2025-10，史上最大现场燃气订单）、Doosan 1.9GW 供 xAI（前两台 2026 年底交付）、Wärtsilä 800MW 美国合同、Boom 与 Crusoe 1.2GW、Everllence 600MW——可回溯到合同或公告，但都是订单口径，不是交付。
- **Vantage 德州 Shackelford**：1.4GW IT 配 2.3GW VoltaGrid，过建 64%。
- **Meta + Williams「Socrates South」**：两座 200MW 表后电厂供 Meta 新奥尔巴尼枢纽，园内铭牌 306MW（约 260MW 燃机 + 46MW 内燃机），N+1+1——本件唯一与 Meta 直接相关的物理量。
- **Nexus**：30 台 ×20.4MW = 613MW，另配 152MW 柴油备用——可回溯到空气排放许可申请，是全篇最硬的一条。
- **Crusoe 阿比林**：10 台机组 360MW 铭牌（5×LM2500XPRESS + 5×Titan 350）。

判断：许可类（Nexus）可回溯；订单类只能回溯到「宣布」，不含交付时点；xAI 500MW 与「12 家 >400MW」只给汇总结论、无中间清单，按来源不可回溯处理——这三条都不许当已装机事实入格。`,
  blocks: [
    ["p.3", "As shown below, xAI has already deployed over 500MW of turbines near its datacenters."],
    ["p.4", "in October 2025, OpenAI and Oracle placed the largest order ever for onsite gas generation, with a 2.3GW plant in Texas."],
    ["p.4", "It already booked a 1.9GW order to serve Elon’s xAI"],
    ["p.4", "It has already signed 800MW of US datacenter contracts."],
    ["p.49", "For example, the 1.4GW Vantage DC campus in Shackelford County, TX will deploy 2.3GW of VoltaGrid systems."],
    ["p.52", "Meta and Williams are building a pair of 200 MW behind-the-meter gas plants to power Meta’s New Albany Hub"],
    ["p.54", "Nameplate capacity inside the fence is 306 MW: roughly 260 MW from turbines and 46 MW from engines."],
    ["p.50", "they have recently applied for an air permit for a fleet of thirty Everllence 18V51/60G gas engines, each good for 20.4 MW,"],
    ["p.51", "for a total of 613 MW of generation. This site will also include 152 MW of diesel backup generation, which likely fulfills the N+1 redundancy requirements for the total site."],
    ["p.52", "Crusoe’s Abilene site for Oracle and OpenAI uses a version of this setup, with a deployed fleet of ten turbines, with five GE Vernova LM2500XPRESS aeroderivative gas turbines and five Titan 350, good for 360MW of nameplate generation."],
  ],
};

q[3] = {
  ans: `本份是 \`bilingual\`（原文＋译文合并的双语稿）。判断依据有三：页首标题与副标题中英各一行并列（英文标题下一行即中文标题，英文副标题下一行即中文副标题）；正文每一段英文之后紧跟同一段的中文译文（如「The Grid is Old and Tired电网老化不堪重负」这种标题内嵌对照）；英文原文完整保留、没有被压成条目，也没有只有 KEY POINTS 的摘要页——所以既不是 summary，也不是纯 translation。

同源组：按同源对照表，「现场制气解决电力危机（2025-12-31）」这个根来源在库只有本 id 一件，没有 original / summary / translation 对照件，因此不存在把同一原文计成多个独立源的风险。但它与 SemiAnalysis 其它数据中心能源篇共用同一套 Datacenter Model 底座（本文开篇即引用自家《AI Datacenter Energy Dilemma》的 3GW→28GW 预测），引用其中的数字时仍应记作同一来源，不得当第二次独立观测。

译名不一致一处：英文标题写 Onsite Gas（现场制气），中文页首写「能源危机」，而材料标题写「电力危机」；正文数字未受影响，中英两版 GW 数逐一对得上（1.9GW 对应「19 亿瓦特」、800MW 对应「8 亿瓦特」）。`,
  blocks: [
    ["p.1", "How AI Labs Are Solving the Power Crisis: The Onsite Gas Deep Dive"],
    ["p.1", "AI 实验室如何解决能源危机:现场制气深度解读"],
    ["p.1", "Bring Your Own Generation, Sayonara Electric Grid, Turbines vs. Recips. vs. Fuel Cells, Why Not Build More CCGTs?, Onsite Power TCO"],
    ["p.1", "自带发电，告别电网，涡轮机对比往复式发动机对比燃料电池，为何不多建联合循环燃气轮机？现场发电总拥有成本分析"],
    ["p.1", "The Grid is Old and Tired电网老化不堪重负"],
  ],
};

q[4] = {
  ans: `能复算，TCO 表逐列对得上。以工业燃机低案为例，四步都能自算：

- **过建**：1,000 MW IT × PUE 1.4 × N+1+1 冗余 1.2 = 1,680 MW 电厂（高案 1.5 × 1.3 = 1,950 MW），与表列 1,680 / 1,950 一致。
- **年均利用率**：1,000 × 80% × 平均 PUE 1.25 ÷ 1,680 = 59.5%（高案 1,000 × 70% × 1.35 ÷ 1,950 = 48.5%），与表一致。
- **燃料**：热耗 8,500 BTU/kWh ⇒ 8.5 MMBTU/MWh × 气价 $4/MMBTU = $34.00/MWh，与表一致。
- **加总**：50.32（摊资本）+ 34.00（燃料）+ 14.38（维护）= 98.70，表列 98.71，差 $0.01 系四舍五入；高案 93.41 + 40.00 + 24.04 = 157.45 完全吻合；燃料电池低案 81.13 + 24.00 + 25.17 = 130.30 亦吻合。
- **时间价值**：200 MW × $10–12M/MW-年 ÷ 2 = $1.0–1.2B，与正文一致；1 GW × $10–12M = $10–12B，与「千兆瓦级 AI 云年收入 100–120 亿美元」一致，两处互为交叉验证。

不能复算的缺口在资本项：反解表内「年摊资本」——$262,402/MW-年 ÷ 1.68 过建 ÷ 年金系数 0.1041（8%、19 年）= $1,500/kW，正好等于表头那格机组 capex，说明资本项只填了发电机本体；而 EPC 建设成本另报 $2,200–2,500/kW。所以 $98.71/MWh 是未含 EPC 的下限，不能当全口径自发电成本用。这也是本件最有价值的一条可复算估算：**1GW 级园区自发电的燃料+资本+维护下限约 $99/MWh，若把 EPC 计进去必然更高，与「电网供电便宜得多」的定性结论方向一致**。`,
  blocks: [
    ["p.70", "<tr><td>Total Power Plant size</td><td>MW</td><td>1,680</td><td>1,950</td><td>1,680</td><td>1,950</td><td>1,540</td><td>1,800</td><td>1,610</td><td>1,875</td><td>1,470</td><td>1,650</td></tr>"],
    ["p.70", "<tr><td>Cost of Natural Gas</td><td>$/MMBTU</td><td>$4.00</td><td>$4.00</td><td>$4.00</td><td>$4.00</td><td>$4.00</td><td>$4.00</td><td>$4.00</td><td>$4.00</td><td>$4.00</td><td>$4.00</td></tr>"],
    ["p.70", "<tr><td>Amortized Capex Per Year</td><td>$/MW-yr</td><td>$ 262,402</td><td>$ 396,549</td><td>$ 290,890</td><td>$ 427,555</td><td>$ 390,159</td><td>$ 689,098</td><td>$ 336,412</td><td>$ 553,821</td><td>$ 483,466</td><td>$ 800,559</td></tr>"],
    ["p.3", "一个千兆瓦级的人工智能云每年可产生 100 亿至 120 亿美元的收入。"],
    ["p.81", "近年来，建设成本已从正常的每千瓦 1,000 美元上升至每千瓦 2,200 至 2,500 美元。"],
  ],
};

q[5] = {
  ans: `关键数字的出处分三层，指向很清楚：

- **两张核心表**（七技术横比表、现场燃气 TCO 表）与几乎全部 GW 级部署数字，来源行统一写「Source: SemiAnalysis Datacenter Model」——自建模型，属自估/二手，只能记 Ⅱ 档，不可升 Ⅰ。
- **燃气轮机出货史**（GE 2001 年 >60GW、西门子 2002 年 20+GW、2006–2016 年 20 / 15 GW/年）标「Source: Energy Information Administration」——一手行业统计，是本件唯一可为 Ⅰ 档的一组，但只覆盖交付量，不覆盖价格、份额与成本。
- **图片与卫星图**另注 Tom's Hardware、Baldor.com、Knoxville News Sentinel——媒体或厂商图，Ⅱ 档；图内数字不作为文字依据。
- **厂商产能与订单**：三菱「+30%」出自近期财报电话会（一手转述），「2027 年产能翻倍」明标为彭博报道（二手）且材料自陈两者矛盾；Bloom / Boom 的 2GW/年 是公司自述目标，属公司口径而非第三方核验。
- **燃料电池 TCO**：正文直接写「We provide TCO estimates for Bloom fuel cells behind the paywall」——这部分数字本件没给，属载体缺失，不能记成「材料说没有」。

结论：可升 Ⅰ 的只有 EIA 那组出货量；占篇幅最大、被用来下结论的 TCO 与份额类全是 Ⅱ。`,
  blocks: [
    ["p.71", "Source: SemiAnalysis Datacenter Model"],
    ["p.4", "Doosan Enerbility, the Korean industrial giant, timing its H-class turbine launch perfectly."],
    ["p.64", "Source: Energy Information Administration"],
    ["p.17", "Source: Tom’s Hardware 原文来源:Tom's Hardware"],
    ["p.62", "Mitsubishi Heavy Industries has guided to increase gas turbine & combined-cycle production by 30% in recent earnings calls, contrary to Bloomberg reporting about plans to double capacity by 2027."],
    ["p.41", "We provide TCO estimates for Bloom fuel cells behind the paywall."],
  ],
};

q[6] = {
  ans: `本件唯一的自建尺子是「现场燃气 TCO」，定义与参数全在表头：资本按 $/kW、运营按 $/MWh；标的口径 1,000 MW IT；峰值 PUE 过建 1.40–1.50；冗余过建 1.05–1.30（工业燃机 1.20/1.30、航改 1.20/1.30、高速内燃机 1.10/1.20、中速 1.15/1.25、燃料电池 1.05/1.10）；IT 利用率 80%/70%；平均 PUE 1.25/1.35；气价 $4/MMBTU；WACC 8%；年 8,760 小时。结果不叫 LCOE，叫「Total Ownership Cost per MWh (Breakeven)」，即与电网电价对比的盈亏平衡点。

与公司口径的差异有三处，都是方向性的：

1. **过建系数**：材料自陈「我们假设 140% 的 PUE 过建，但网络完善的超大规模园区可做到 120%」——同一 1GW 园区按 1.2 还是 1.4 算，电厂规模差 14%，$/MWh 同比例偏高，公司实际口径更低。
2. **资本项口径漂移**：表头写「Base Generator CaPEX」，正文却称同一 $1,500–1,800/kW 是「all-in capital expenditure」，而 EPC 建设成本另报 $2,200–2,500/kW——同一格数字两种口径。
3. **同技术两套 $/MWh**：横向表给工业燃机 LCOE 65–110，TCO 表给 98.71–157.45，差约 40–50%，因为前者不含过建。

所以这个尺子只能用于横向排序（燃料电池 > 中速内燃机 > 高速内燃机 > 航改 > 工业燃机），不得用于绝对值入格，也不得与公司披露的电力成本直接相减。`,
  blocks: [
    ["p.71", "These TCO estimates assume a doubly-redundant “overbuild.” The first overbuild factor is for PUE, converting IT load into all-in datacenter load. Our estimate assumes a PUE of 1.4."],
    ["p.72", "Our attached TCO estimates assume a 140% PUE overbuild, but a wellnetworked hyperscaler campus could get away with a 120% PUE overbuild, and a gutsy developer could reduce that margin even further."],
    ["p.70", "<tr><td>Redundancy Overbuild</td><td>%</td><td>120%</td><td>130%</td><td>120%</td><td>130%</td><td>110%</td><td>120%</td><td>115%</td><td>125%</td><td>105%</td><td>110%</td></tr>"],
    ["p.70", "<tr><td>Base Generator CaPEX</td><td>$/kW</td><td>$1,500</td><td>$1,800</td><td>$1,700</td><td>$2,000</td><td>$1,700</td><td>$2,200</td><td>$2,200</td><td>$2,900</td><td>$3,000</td><td>$4,000</td></tr>"],
    ["p.29", "At current rates, IGTs cost $1,500-1,800/kW in all-in capital expenditure, with lead times of approximately 12-36 months, similar to aeros."],
    ["p.19", "<tr><td>Aeroderivative GT</td><td>30-60</td><td>1,500-1,800</td><td>18-36</td><td>10</td><td>30-50</td><td>35-40%</td><td>80-130</td></tr>"],
  ],
};

q[7] = {
  ans: `三项分开看，结论是「关系不明」，不能假定独立：

- **是否收费顾问 / 是否有投行关系**：未声明。全文没有 Disclosure、利益冲突或分析师独立性段落；末页只有「Recommend SemiAnalysis to your readers」、点赞与转发数，没有任何证券业务声明。
- **是否持仓 / 是否受资助**：未声明，也没有作者简介里的持仓披露。
- **PAID 标记**：页首「DEC 31, 2025 ∙ PAID 付费内容」是付费墙标记，按规则不能当作「无投行关系」的证据。

能确认的商业关系只有一种：作者把独家订单消息优先给自家付费产品（Doosan 1.9GW 订单「数周前已向 Datacenter Industry Model 订阅用户拆解」），并称模型追踪数十个 2026 年及以后交付的集群项目（开工日期、总容量、最终用户、能源策略）。这说明本件是订阅制卖方内容的一部分，存在明确的变现动机，但不等于投行关系，也不构成持仓披露。

处理方式：按「关系不明」登记，引用其数字时不加「独立第三方」的信任加成。`,
  blocks: [
    ["p.1", "DEC 31, 2025 2025 年 12 月 31 日 ∙ PAID 付费内容"],
    ["p.4", "as we exclusively unpacked to our Datacenter Industry Model subscribers several weeks ago."],
    ["p.81", "Recommend SemiAnalysis to your readers推荐 SemiAnalysis 给您的读者"],
    ["p.81", "Bridging the gap between the world's most important industry, semiconductors, and business."],
    ["p.10", "我们的模型还追踪着数十个计划于 2026 年及之后交付的大型集群建设项目——包括其确切的开工日期、总容量、最终用户以及能源策略。"],
  ],
};

q[8] = {
  ans: `产能与份额的断言分两层：一层有读数，一层只有结论。

**有读数（口径均为交付/出货）**：
- 燃气轮机出货史：GE 2001 年 >60GW、西门子 2002 年 20+GW；2006–2016 年 GE 约 20GW/年、西门子约 15GW/年；2017–2022 年两家都跌破 10GW/年。出处 EIA，可回溯，是本件唯一能入格的行业读数。
- 卡特彼勒 Solar 品牌涡轮 2020–2024 年均约 600MW/年，2022 年峰值 1.2GW；计划 2024–2030 发动机翻倍、涡轮 2.5 倍——公司指引，可回溯到公告。
- 三菱重工指引燃机与联合循环产能「+30%」，材料明说与彭博「2027 年翻倍」矛盾——这条本身是「两个二手源打架」，只能记观点。

**只有结论**：
- 「美国 12 家供应商各自拿到 >400MW 现场燃气订单」——无名单、无逐家 MW，是自建跟踪器的汇总，只能当量级。
- 「现场燃气进入三位数年增长」——无基数、无年份区间。
- 份额判断全为定性：GEV 与西门子订单排到 2029 年、斗山被低估、Bloom 通电最快、叶片与导叶集中在四家（PCC、Howmet、CPP、Doncasters）、重型燃机核心 300–500 吨且需 24–30 个月建造安装。

判断：出货量与产能指引可核，份额与增速是观点，不是读数。补充读法交代：机型额定功率清单与电网互联行政流程两节约 12 页略读，因不产出产能或份额结论。`,
  blocks: [
    ["p.63", "GE shipped more than 60 GW of gas turbines in 2001; Siemens peaked at 20+ GW in 2002."],
    ["p.64", "Between 2006 and 2016, GE averaged about 20 GW/year of turbine shipments, and Siemens about 15 GW/year."],
    ["p.62", "Caterpillar plans to double engine production and 2.5x turbine production between 2024 and 2030, but their Solar-branded turbine production averaged ~600 MW/year between 2020–2024, with a 2022 peak production of 1.2 GW."],
    ["p.77", "GE Vernova (GEV) and Siemens Energy (ENR.DE) are the big players, but they’re playing it safe."],
    ["p.78", "As of December 2025, Doosan has signed contracts to produce 5 H-class turbines for xAI, with the first two turbines shipped by end of 2026."],
    ["p.66", "All except CPP have vertically-integrated metals supply, but they are a fraction of the size of their customers, and thus much more vulnerable to market shocks."],
  ],
};

module.exports = { ID, TAG, TITLE, ISSUER, q };

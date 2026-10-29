---
id: 03-broker-research-2026-09-15-CHINA202609142133
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-09-15
time: "00:00"
title: "03-broker-research-2026-09-15-CHINA202609142133"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 57
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-09-15-CHINA202609142133/full.md`（57 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是大摩亚太行业主题研究（China Internet and Other Services，行业观点 Attractive），没有公司损益估计表，因此"收入增速／毛利率／营业利润率／资本开支／实际税率／摊薄股数"六行中只有第一行可由 TAM 表推算，其余四类科目本件根本不产出。它真正在用的假设链是"TAM 分项加总 + 单位经济公式"，逐项如下：

- **可货币化 TAM 总量**：中国 2C AI 可货币化收入 2030E Base 294 十亿元人民币；2040E Base 1,593、Bear 769、Bull 3,523。2030E 结构中订阅 3、AI 广告 10、交易佣金 281，即 99% 来自商户侧意图变现。
- **收入增速（按节点推算）**：按 294→1,593 复利推算 2030–2040 年 CAGR 约 18.4%（本文未直接给增速，按两节点自算，非表内值）。
- **广告侧单位经济公式（假设链①）**：Ad-exposed DAU × queries/day × commercial query mix × monetized commercial query rate × ad units per monetized commercial query × 365 × eCPM / 1,000。
- **交易侧单位经济公式（假设链②）**：Addressable online GMV × AI-assisted GMV share × closed-loop attribution/conversion rate × effective AI take rate。两池相加前另有"避免重复计算"边界规则：曝光/点击/线索触发计广告，闭环成交后的 take rate/CPS 计佣金。
- **用户规模输入**：QuestMobile 7 月 Doubao 约 399mn MAU、Qwen 约 161mn、DeepSeek 约 124mn、Yuanbao 约 51mn；中国生成式 AI 用户由 2024 年 12 月的约 249mn 增至 2025 年 12 月的约 602mn。
- **互动强度输入（决定变现率的分母）**：DAU/MAU 为 Qwen 17%、DeepSeek 25%、Doubao 42%；人均日时长 Qwen 4 分钟 vs 同业 10–17 分钟，月会话 Qwen 17 次 vs Doubao 69、DeepSeek 61、Yuanbao 29。
- **毛利率／营业利润率／资本开支／实际税率／摊薄股数**：材料未给出此项——本件无公司损益表，全文不出现这三张表的任何一行，仅有 TAM 与用户指标。

### 依据

- p.1｜We size China's 2C AI monetizable TAM of ~Rmb300bn by 2030, with 99% coming from merchant-side intent monetization.
- p.29｜<tr><td>AI Advertising</td><td>10</td><td>319</td><td>25</td><td>1,534</td></tr>
- p.29｜Together, advertising and commissions form AI intent monetization, which contributes ~99% of our 2030E base-case monetizable revenue.
- p.30｜<tr><td>Total 2C AI monetizable revenue</td><td>294</td><td>1,593</td><td>769</td><td>3,523</td></tr>
- p.30｜Ad-exposed DAU x queries/day x commercial query mix x monetized commercial query rate x ad units per monetized commercial query x 365 x eCPM / 1,000
- p.30｜Addressable online GMV x AI-assisted GMV share x closed-loop attribution/conversion rate x effective AI take rate
- p.3｜QuestMobile July data show Doubao at ~399mn monthly average users (MAU), Qwen ~161mn, DeepSeek ~124mn and Yuanbao ~51mn
- p.37｜average daily time spent per user was 4min (vs. peers at 10-17min), monthly sessions was 17 (vs. Doubao at 69, Deepseek at 61, Yuanbao at 29), and DAU to MAU was 17% (vs. Deepseek at 25% and Doubao at 42%).

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。本材料内能做的是"他本期 vs 他上期"的对照——本件不附任何共识表（全文无 FirstCall／Visible Alpha／FactSet／Bloomberg consensus 字样），也不引用公司指引，因此只能拿 AlphaWise 调查两期数据对比：

| 指标 | 上期 | 本期 | 差额（我自算） |
|---|---|---|---|
| 中国个人 AI 周使用率 | 75%（两个月前） | 80% | +5pp |
| 中国工作相关 AI 周使用率 | 74%（三个月前） | 77% | +3pp |
| 美国个人与工作 AI 周使用率（同期横截面） | — | ~54% | 中美差 26pp |

差在哪一项：两处更新都落在**需求侧采用率**这一项，不落在收入端或利润率端——本件不产出任何公司的收入与利润率估计，故"预测差异"在本件没有对应物。差在哪一年：调查是当期横截面（2026 年 7 月前后两波），不指某个财年，因此无法折算成 FY25/FY26 的金额差。报告自己也提示该对比"is not perfectly like-for-like across market structure and survey timing"。我方该项未定 ⇒ 记缺口。

### 依据

- p.4｜Our latest AlphaWise survey shows China's weekly personal AI usage rising to 80% from 75% in two months, and weekly work-related usage to 77% from 74% in three months.
- p.4｜The latest US wave is ~54% for work and personal AI usage. The comparison is not perfectly like-for-like across market structure and survey timing, but the direction is clear
- p.3｜AI-native apps are efficient at user education and top-of-funnel intent capture, but multi-homing is accelerating rather than fading.
- p.30｜<tr><td>Model scope</td><td>Broader AI-enabled consumer internet monetization pool, including AI-native apps, in-app AI assistants, OS-level assistants, AI search, AI shopping agents, travel agents, local-services agents, and super-app AI surfaces. It is not a standalone chatbot-only TAM.</td></tr>

## Q3 · 他的**财年是谁的财年**？

本件没有公司财年损益表，唯一带年度标号的估计是 TAM 表的列头：2030E Base／2040E Base／2040E Bear／2040E Bull。列头只标年份、不标月末（无 FYE、无 Dec-25A 之类的标记），按日历年处理并注明"推定"，不得当作已确认。

正文引用的公司期间一律是日历季度口径（2Q26＝2026 年 6 月止季度，如百度在线营销收入 2Q26 同比 −19%），与日历年季度对齐；但个股层面的财年截止月本件一个都没标，所以"公司财年是否等于日历年"在本件内核不出来。结论：本件的年份是**报告自建的模型年（日历口径，推定）**，不是任何一家公司的财年；若后续与公司损益表或日历年末共识对接，需先按各公司 FYE 换口径，不可直接比。

### 依据

- p.29｜<table><tr><td>Rmb bn</td><td>2030E Base</td><td>2040E Base</td><td>2040E Bear</td><td>2040E Bull</td></tr>
- p.30｜<tr><td>Transaction commission definition</td><td>Revenue from take rate, CPS, affiliate/referral fee, or platform commission when an AI workflow participates in a closed-loop transaction such as completed shopping, food delivery, hotel, ticket or local-services booking.</td></tr>
- p.37｜Baidu's online marketing revenue fell 19% YoY in 2Q26 while management prioritized AI-search experience over monetization, illustrating the near-term transition pressure.

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

本件无预测修正可记。全文不出现 old/new、prior/current、"from X to Y"、"raise/lower our … estimate" 任何一类句式，也没有上一版估计表并列，因此既不能登记"旧值 → 新值"，也不该硬凑"仅方向无幅度"。

唯一可称"更新"的是调查数据的换版：中国个人 AI 周使用率由 75% 改为 80%（+5pp，原文口径"in two months"），工作相关由 74% 改为 77%（+3pp，原文口径"in three months"）。这改的是**观测输入**，不是收入/利润率/资本开支/EPS 估计，也不是评级或目标价，判"不重要（数据换新，假设与结论均未改）"。

另需说明：本件既非首次覆盖（无 Initiation 标记）、也非评级变动通知，所以"首次覆盖、无上一版可比"这句也不适用；正确表述是本件产品型不含可修正的公司估计。

### 依据

- p.4｜Our latest AlphaWise survey shows China's weekly personal AI usage rising to 80% from 75% in two months, and weekly work-related usage to 77% from 74% in three months.
- p.30｜<tr><td>Total 2C AI monetizable revenue</td><td>294</td><td>1,593</td><td>769</td><td>3,523</td></tr>
- p.54｜Morgan Stanley Research policy is to update research reports as and when the Research Analyst and Research Management deem appropriate, based on developments with the issuer, the sector, or the market that may have a material impact on the research views or opinions stated therein.

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

有三档情景，但作用在 TAM 上，不在目标价上（本件不设个股目标价，故不存在三档 PT）。

| 情景 | 2040E 订阅 | 2040E AI 广告 | 2040E 交易佣金 | 2040E 合计 |
|---|---|---|---|---|
| Bear | 9 | 25 | 735 | 769 |
| Base | 33 | 319 | 1,241 | 1,593 |
| Bull | 84 | 1,534 | 1,905 | 3,523 |

驱动假设与差在哪一端：差别主要落在**广告端**，不在交易闭环规模。Bull 的广告 1,534 是 Base 319 的 4.8 倍、是 Bear 25 的 61 倍；佣金端 Bull 对 Bear 只有 2.6 倍（1,905 对 735）。也就是说，情景杠杆押在"广告可货币化率 × eCPM × 商业 query 占比"这条链上（见广告公式六项输入），而交易佣金这一池在三档里都已是主量（Bear 情景下佣金仍占 769 的 96%），下行保护来自既有电商/本地生活闭环，上行弹性来自广告。2030E 只给 Base 单点 294，未给 2030E 牛熊，故短端无情景。

### 依据

- p.29｜<tr><td>AI transaction commissions</td><td>281</td><td>1,241</td><td>735</td><td>1,905</td></tr>
- p.29｜<tr><td>Subscription</td><td>3</td><td>33</td><td>9</td><td>84</td></tr>
- p.30｜<tr><td>Total 2C AI monetizable revenue</td><td>294</td><td>1,593</td><td>769</td><td>3,523</td></tr>
- p.29｜We separate the opportunity into three revenue pools to avoid double counting:

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

本件不设目标价，因此没有"目标价＝倍数×指标"或 DCF 这类估值法，也就没有 WACC、永续增长率、目标倍数可查。它用的是一种方法：**自下而上的 TAM 分项加总**，三个池各自有可复算公式——

1. 广告 TAM＝Ad-exposed DAU × queries/day × commercial query mix × monetized commercial query rate × ad units per monetized commercial query × 365 × eCPM / 1,000；
2. 交易佣金 TAM＝Addressable online GMV × AI-assisted GMV share × closed-loop attribution/conversion rate × effective AI take rate；
3. 订阅 TAM 按"可付费 AI MAU"窄口径单列，三池相加得总量。

能不能互相印证：无第二方法（无 DCF、无可比公司倍数、无 SOTP），所以**只给一种方法，无法交叉印证**，只能做内部一致性检查：2030E 3＋10＋281＝294 与总量行一致；2040E Base 33＋319＋1,241＝1,593、Bear 9＋25＋735＝769、Bull 84＋1,534＋1,905＝3,523 亦各自与总量行吻合。加总自洽说明表内无算术矛盾，但不构成方法间印证。

### 依据

- p.30｜Ad-exposed DAU x queries/day x commercial query mix x monetized commercial query rate x ad units per monetized commercial query x 365 x eCPM / 1,000
- p.30｜Addressable online GMV x AI-assisted GMV share x closed-loop attribution/conversion rate x effective AI take rate
- p.30｜<tr><td>AI intent monetization</td><td>AI advertising TAM + AI transaction commission TAM. This captures the shift from monetizing attention to monetizing commercial intent.</td></tr>
- p.56｜<tr><td>Company (Ticker)</td><td>Rating (As Of)</td><td>Price* (09/11/2026)</td></tr>

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

按 2241(c)(1) 三件逐条判：

1. **目标价由哪个方法算出**——不适用（产品型不符）。全文无个股目标价；附录行业覆盖表只有三列 Company/Ticker、Rating (As Of)、Price，没有 PT 列，也没有"PT 由 X 法得出"的句子。
2. **方法的关键输入**——个股侧输入（EPS、目标倍数、WACC、永续增长率、溢价理由）材料未给出此项；TAM 侧输入倒是齐的：广告公式六项、佣金公式四项，可完整复算（见前题）。
3. **可能阻碍目标价达成的风险列示**——无独立风险章，但有实质风险条目，以"个股含义"叙事逐票散列，且不是"竞争加剧"式模板句：腾讯的 ROI 纪律（新 AI 产品与算力采购使含 New AI Products 的营业利润更低）、阿里独立 Qwen app 投入经济性（DAU 自 2/7/2026 峰值 74mn 回落至 3 月 29mn，人均时长 4 分钟对同业 10–17 分钟）、百度搜索被答案引擎替代（2Q26 在线营销收入 −19% YoY）、TME 版权护城河被 AI 混音侵蚀、iQIYI 供给扩张摊薄份额。全部为方向句，无一条挂百分点或金额。

结论：第 1、2 件因本件无目标价而不适用，不构成形式不合规；但若按个股研报口径引用，本件不具备"可复算的目标价依据"，只能作主题依据使用。

### 依据

- p.56｜<tr><td>Company (Ticker)</td><td>Rating (As Of)</td><td>Price* (09/11/2026)</td></tr>
- p.36｜Tencent's new AI products and compute procurement are significant investments, and the company separately disclosed lower operating profit when including New AI Products.
- p.37｜Qwen's DAU peaked at 74mn on Feb 7, 2026, and has now stabilized at 29mn (March 2026)
- p.37｜Baidu's online marketing revenue fell 19% YoY in 2Q26 while management prioritized AI-search experience over monetization, illustrating the near-term transition pressure.
- p.37｜AI-generated video sharply lowers the cost and time of content creation, expands supply across short-form and long-form formats, and increases competition for consumer time.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，全部取自机构级披露表（Global Stock Ratings Distribution），不是数报告里的个股条数得来。

1. **三档占比**（Coverage Universe 合计 3,694 只）：Overweight/Buy 1,555 只＝42%；Equal-weight/Hold 1,577 只＝43%；Not-Rated/Hold 3 只＝0%；Underweight/Sell 559 只＝15%。
2. **各类别中过去 12 个月有投行关系的占比**（"% of Rating Category" 列，IBC 合计 939 家）：OW 29%（450/1,555）、EW 25%（395/1,577）、NR 33%（1/3）、UW 17%（93/559）。同表另列 Other Material Investment Services Clients 占比：OW 44%、EW 44%、NR 0%、UW 12%，合计 1,754。
3. **观测时点**：截至 2026 年 8 月 31 日。发布日为 2026-09-14，与 8 月 31 日相隔 14 天（<15 天），按规则可用上上个季末，本表用的正是 8 月底这一观测点，表头原文标明 as of August 31, 2026。

口径提示：表下注明数据含当前有评级的普通股与 ADR；IBC 指过去 12 个月从大摩获得投行报酬的公司；因四舍五入，"% of total" 列相加可能不等于 100%。

### 依据

- p.54｜<tr><td>Overweight/Buy</td><td>1555</td><td>42%</td><td>450</td><td>48%</td><td>29%</td><td>767</td><td>44%</td></tr>
- p.54｜<tr><td>Equal-weight/Hold</td><td>1577</td><td>43%</td><td>395</td><td>42%</td><td>25%</td><td>770</td><td>44%</td></tr>
- p.54｜<tr><td>Underweight/Sell</td><td>559</td><td>15%</td><td>93</td><td>10%</td><td>17%</td><td>216</td><td>12%</td></tr>
- p.54｜<tr><td>Total</td><td>3,694</td><td></td><td>939</td><td></td><td></td><td>1754</td><td></td></tr>
- p.54｜Data include common stock and ADRs currently assigned ratings. Investment Banking Clients are companies from whom Morgan Stanley received investment banking compensation in the last 12 months.
- p.54｜Global Stock Ratings Distribution

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

声明有、文本层无数据，判**未见**。披露段只有一句把图表指向外部网站（stock price charts and equity rating histories … see the Morgan Stanley Research Disclosure Website），正文、附录、末页均无走势图，也无评级/目标价变动序列表。

本件能提供的替代信息是附录的行业覆盖表：三列 Company (Ticker)、Rating (As Of)、Price (09/11/2026)，共 18 只票，只有"最近一次评级＋生效日"这一个点，没有变动条数、没有目标价变动序列。可读出的点位例：Tencent O (03/19/2020)、Alibaba O (02/24/2025)、Meituan O (08/29/2024)、Baidu U (08/19/2026)、Kuaishou E (08/20/2026)、iQIYI E (01/19/2023)、JD U (11/10/2025)。

覆盖期间：以 Tencent 计自 2020-03-19 起维持 O，已远超一年，按规则本应附走势图；但材料内确实没有图与历史数据，故判"声明有图、文本层无数据，未见"，不能写成"覆盖不足一年，无须附"。

### 依据

- p.53｜For important disclosures, stock price charts and equity rating histories regarding companies that are the subject of this report, please see the Morgan Stanley Research Disclosure Website at www.morganstanley.com/eqr/disclosures/webapp/generalresearch
- p.56｜INDUSTRY COVERAGE: China Internet and Other Services
- p.57｜<tr><td>Tencent Holdings Ltd. (0700.HK)</td><td>O (03/19/2020)</td><td>HK$430.60</td></tr>
- p.56｜<tr><td>Baidu Inc (BIDU.O)</td><td>U (08/19/2026)</td><td>US$91.40</td></tr>
- p.57｜Stock Ratings are subject to change. Please see latest research for each company.

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页只给一句样板指路："for analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report."——指明在报告末尾、不给页码。逐项内容全在 Disclosure Section 的 "Important Regulatory Disclosures on Subject Companies" 与 "Other Important Disclosures"。逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有 | 披露附录逐票列名：Andy Meng, CFA 持 Alibaba(GDR)、Kuaishou、Meituan、NetEase(GDR)、PDD(GDR)、Trip.com(GDR)、Vipshop(GDR)；Kathy Zhu 持 Meituan、Tencent。名单**含**本文标的 Alibaba、Meituan、Tencent、NetEase、Trip.com、Kuaishou，**不含** Baidu、TME、iQIYI |
| ② 报酬是否挂钩投行收入 | 有（部分挂钩） | 同节称报酬基于 quality of research、investor client feedback、stock picking、competitive factors、firm revenues 与 overall investment banking revenues；紧接一句限定"not linked to investment banking or capital markets transactions"，即挂钩公司整体投行收入、不挂钩具体交易 |
| ③ 近 12 个月主/副承销或收投行报酬 | 有 | 承销名单：Alibaba、Kanzhun、Tencent（含本文标的 Tencent、Alibaba）；另句列 received compensation for investment banking services from Alibaba、Bilibili、Meituan、Tencent |
| ④ 未来 3 个月是否寻求投行费 | 有 | 19 家名单含 Alibaba、Autohome、Baidu、Bilibili、Full Truck Alliance、iQIYI、JD、JOYY、Kanzhun、KE Holdings、Kuaishou、Meituan、NetEase、PDD、Tencent、Tongcheng、Trip.com、Vipshop、Weibo；本文标的 Tencent、Alibaba、Baidu、Meituan、iQIYI 均在列 |
| ⑤ 近 12 个月非投行服务报酬 | 有 | products and services other than investment banking 名单含 Alibaba、Baidu、Bilibili、Full Truck Alliance、HUYA、JOYY、Kanzhun、KE Holdings、Meituan、NetEase、Tencent、Tongcheng、Trip.com、Vipshop、Weibo；**不含** TME、iQIYI |
| ⑥ 是否客户及服务类型 | 有 | 两类分列：投行客户关系名单（19 家，含 Tencent、Alibaba、Baidu、Meituan、iQIYI、Kuaishou）；non-investment banking, securities-related services 名单（15 家，含 Tencent、Alibaba、Baidu、Meituan、NetEase、Trip.com） |
| ⑦ 实益持有该类普通股 ≥1% | 有 | 截至 2026-08-31 共 13 家：Alibaba、Baidu、Bilibili、Full Truck Alliance、HUYA、iQIYI、JD、JOYY、Kanzhun、Kuaishou、Meituan、PDD、Trip.com。名单**含**本文标的 Alibaba、Baidu、Meituan、iQIYI，**不含 Tencent、TME、NetEase**——本文最看多的 Tencent 不在 1% 名单内 |
| ⑧ 是否做市 | 有 | 两处：Morgan Stanley & Co. LLC 为 Autohome、iQIYI、JOYY、NetEase、Weibo 做市；Morgan Stanley Hong Kong Securities Limited 为 Alibaba、Baidu、Bilibili、JD、Kuaishou、Meituan、NetEase、Tencent、Trip.com 的港股流动性提供者/做市商。**含 Tencent（港股）**，美股做市名单不含 Tencent |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 披露附录只有 Analyst Certification 一句"have not received and will not receive direct or indirect compensation in exchange for expressing specific recommendations or views"——讲的是"不为特定推荐收取报酬"，不是"过去 12 个月是否从标的公司收取报酬"；事由与口径均不符，故判未见 |
| ⑩ 其他重大冲突 | 有 | "A member of Research who had or could have had access to the research prior to completion owns securities (or related derivatives) in the Alibaba Group Holding, Baidu Inc."——非分析师本人，但属可提前接触报告的研究人员，持本文两个标的；另有 Tactical Idea 观点可能与正式评级相反的一般声明 |

红旗提示：该机构实益持有 Alibaba／Baidu／Meituan／iQIYI ≥1% 普通股 ＋ 对 Tencent 等 9 只港股做市 ＋ 近 12 个月从 Tencent／Alibaba／Meituan 收投行费 ＋ 未来 3 个月向同一批公司寻求投行费 ⇒ 引用其"看多腾讯、BABA 首选"的观点时应作立场折价。

### 依据

- p.1｜For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report.
- p.53｜The analyst or strategist (or a household member) identified below owns the following securities (or related derivatives): Andy Meng, CFA - Alibaba Group Holding(GDR), Kuaishou Technology(common or preferred stock), Meituan(common or preferred stock), NetEase, Inc(GDR), PDD Holdings Inc(GDR), Trip.com Group Ltd(GDR), Vipshop Holdings Ltd(GDR); Kathy Zhu - Meituan(common or preferred stock), Tencent Holdings Ltd.(common or preferred stock).
- p.53｜The equity research analysts or strategists principally responsible for the preparation of Morgan Stanley Research have received compensation based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues.
- p.53｜As of August 31, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research: Alibaba Group Holding, Baidu Inc, Bilibili Inc, Full Truck Alliance Co. Ltd, HUYA Inc, IQIYI Inc, JD.com, Inc., JOYY Inc., Kanzhun Ltd, Kuaishou Technology, Meituan, PDD Holdings Inc, Trip.com Group Ltd.
- p.53｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Alibaba Group Holding, Kanzhun Ltd, Tencent Holdings Ltd..
- p.53｜Within the last 12 months, Morgan Stanley has received compensation for investment banking services from Alibaba Group Holding, Bilibili Inc, Meituan, Tencent Holdings Ltd..
- p.53｜Morgan Stanley & Co. LLC makes a market in the securities of Autohome Inc, IQIYI Inc, JOYY Inc., NetEase, Inc, Weibo Corp.
- p.56｜Morgan Stanley Hong Kong Securities Limited is the liquidity provider/market maker for securities of Alibaba Group Holding, Baidu Inc, Bilibili Inc, JD.com, Inc., Kuaishou Technology, Meituan, NetEase, Inc, Tencent Holdings Ltd., Trip.com Group Ltd listed on the Stock Exchange of Hong Kong Limited.

## Q11 · 他的**风险章**挂了数字吗？

没有独立风险章，也没有估值敏感度附表（本件不设目标价，无 WACC ±1%、永续增长率 ±0.5%、目标倍数 ±1x 对 PT 的影响表）。判**样板风险（不是缺口）**：风险共 5 条，全部为方向句，无一条附百分点或金额——

1. 腾讯：新 AI 产品与算力采购使"含 New AI Products"的营业利润更低，风险在 ROI 纪律而非经营；
2. 阿里：独立 Qwen app 重投入的经济性，附了用户数据（DAU 74mn→29mn、人均 4 分钟、DAU/MAU 17%）但未折算到利润或目标价；
3. 百度：答案引擎替代传统结果页，2Q26 在线营销收入 −19% YoY，是全文唯一带财务跌幅的风险句；
4. TME：AI 混音降低侵权成本，侵蚀版权护城河；
5. iQIYI：AI 视频扩大供给、摊薄份额。

能不能写成"若〔变量〕变 X ⇒〔某年〕EPS 或 PT 变 Y%"：不能。本件没有可挂的 EPS 或 PT，唯一带数字的是需求侧指标（使用率、MAU、DAU/MAU），属反向证据而非风险量化。

### 依据

- p.36｜Tencent's new AI products and compute procurement are significant investments, and the company separately disclosed lower operating profit when including New AI Products.
- p.37｜Qwen's DAU peaked at 74mn on Feb 7, 2026, and has now stabilized at 29mn (March 2026)
- p.37｜Baidu's online marketing revenue fell 19% YoY in 2Q26 while management prioritized AI-search experience over monetization, illustrating the near-term transition pressure.
- p.37｜Put another way, AI could become a powerful tool for music piracy in China.
- p.37｜We therefore see a real cost-efficiency benefit but a more negative competitive read-through as AI broadens

## Q12 · 这份报告落在**静默期窗口**内吗？

否。发布日为 2026-09-14 21:33 GMT（封面时间戳），本件是行业主题报告（China Internet and Other Services，Industry View: Attractive），不对应任何 IPO、二次发行或大宗配售的定价，全文无发行时间线、无承销团名单与定价日，也没有 Initiation 或任何目标价——因此不存在"作为承销商在发行后 N 天内发布"的适用前提。

披露段确有承销记录：近 12 个月主/副承销 Alibaba、Kanzhun、Tencent 的公开或 144A 发行。但该披露只给相对时窗"within the last 12 months"，不给具体发行日，无法与 9 月 14 日相减判窗；且这些记录与"本件是否为该发行的承销商研究"是两件事，本件形态上属常规行业主题更新，不落窗。

结论：不在静默期窗口内；也无 IPO 后 ≥10 天、二次发行后 ≥3 天的窗口需要核对。

### 依据

- p.1｜September 14, 2026 09:33 PM GMT
- p.1｜Asia Pacific Industry View Attractive
- p.53｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Alibaba Group Holding, Kanzhun Ltd, Tencent Holdings Ltd..
- p.56｜<tr><td>Company (Ticker)</td><td>Rating (As Of)</td><td>Price* (09/11/2026)</td></tr>

---
# ── 材料身份（解析成 Material 的字段，键名不要改） ──
id: 01-10-q-2026-09-30-meta-20260930
cat: 01
sub: 10-Q
# ── 模板身份：这份材料是用哪一版问法生成的 ──
template: 10-Q
template_version: 2
# ── 材料元信息 ──
date: 2026-10-22
time: "08:00"
title: "Meta Platforms 2026Q3 季报（10-Q）"
kind: "10-Q"
issuer: "Meta Platforms, Inc."
ticker: META
source_pages: 12
---

> 本件为 Meta Platforms 2026 财年第三季度 10-Q，覆盖 2026-07-01 至 2026-09-30，2026-10-22 提交。
> 页码口径：`p.N` 是按 `Item` 切出的逻辑块号（全篇 12 块），不是物理页；正文不写页码，页码只出现在依据区。
> **抽取完整性（已核）**：本件 12 块，同期另一份抽取件 `01-10-Q-2026-10-22-meta20260930` 为 17 块。差额 5 块**不是正文缺口**——那 5 块只是目录行（`Item 3`、`Item 4`、`Part II Item 1 / 1A`、`Part II Item 2`、`Part II Item 5` 各自的目录条目，合计约 300 字）。本件的正文 9 个 `Item` 块齐全，与同期件逐块对应、字数一致（财务报表块 92,792 字对 96,067 字，差额来自同期件把 18 张插图写成图片链接）。缺的是：①上述 5 条目录行被并入了本件的目录块，块索引里不再单独成块；②封面页在正文里存在，但没有被切成块，因此封面信息无法作为依据引用；③本件 `figureCount=0`、无 `figures/` 目录，同期件有 18 张图——插图里的 DAP、ARPP、展示次数、单价的分季度柱状图在本件只剩标题与注释，**图内数值取不到**（正文另给的同比百分比不受影响）。
> 报表未经审计，全文无"已由独立会计师审阅"的声明，也未附审阅报告（按手册属"本期未附"，不是缺口）。会计政策段没有 `except for`，本期无政策变更。

## Q1 · **本季**（**不是年初至今**）的收入与成本各是多少？**累计**又是多少？

结论：本季（2026 年 7—9 月）收入 646.01 亿美元、营业成本 133.69 亿美元；年初至今（1—9 月）收入 1,817.12 亿美元、营业成本 349.17 亿美元。两套口径并列，不能互相加减。

具体：本季收入同比增 26.1%（512.42 亿→646.01 亿），营业成本增 45.2%（92.06 亿→133.69 亿），成本增速比收入快 19 个百分点；累计收入增 28.8%（1,410.73 亿→1,817.12 亿），成本增 38.2%（252.69 亿→349.17 亿，增速均计算值）。成本只取利润表的 cost of revenue，不含研发与销售——本季总成本费用 516.13 亿美元（同比 +68.1%），其中研发 200.54 亿（+32.4%）、营销 33.33 亿（+17.2%）、管理 148.57 亿（+323%）。管理费用的暴涨几乎全部是法务：公司明说本季含 2026 年 8 月多州总检察长和解相关的 98.9 亿美元费用，前九个月该笔为 118.9 亿。成本端：营业成本增 45% 主要来自数据中心、技术基础设施与第三方云服务的运营费用，研发增 32% 同样来自这三项加员工薪酬与第三方 AI token 成本。

收入拆解：本季广告收入 630.61 亿美元（+25.9%）、其他收入 10.97 亿（+59.2%）、Reality Labs 4.43 亿（−5.7%）；累计广告 1,774.49 亿（+28.6%）、其他 29.87 亿（+66.8%）、RL 12.76 亿（+1.9%，增速均计算值）。

判断：毛利率在退——本季 79.3%、上年同期 82.0%；累计 80.8% 对 82.1%（计算值），退的 2.7 个百分点来自基础设施折旧与云成本跑在收入前面。营业利润率更陡：本季 20.1% 对 40.1%，累计 30.1% 对 41.5%（计算值）。但两者成因不同，必须拆开看：**本季利润腰斩主要是那笔 98.9 亿美元和解费**，剔掉它本季营业利润 228.77 亿、利润率 35.4%（计算值）；而毛利率的 2.7 个百分点退坡剔不掉，那是结构性的。换句话说，"成本控制住了"在本季只对营业成本以外的三费成立（营销费用增速 17% 低于收入增速），对营业成本不成立。

### 依据
- p.4｜Revenue | $ | 64,601 | $ | 51,242 | $ | 181,712 | $ | 141,073
- p.4｜Cost of revenue | 13,369 | 9,206 | 34,917 | 25,269
- p.4｜Research and development | 20,054 | 15,144 | 59,409 | 40,237
- p.4｜Marketing and sales | 3,333 | 2,845 | 9,672 | 8,581
- p.4｜General and administrative | 14,857 | 3,512 | 23,079 | 8,455
- p.4｜Total costs and expenses | 51,613 | 30,707 | 127,077 | 82,542
- p.4｜Income from operations | 12,988 | 20,535 | 54,635 | 58,531
- p.4｜Net income | $ | 9,860 | $ | 2,709 | $ | 52,481 | $ | 37,690
- p.4｜Advertising | $ | 63,061 | $ | 50,082 | $ | 177,449 | $ | 138,037
- p.4｜Other revenue | 1,097 | 690 | 2,987 | 1,784
- p.4｜Reality Labs | 443 | 470 | 1,276 | 1,252
- p.5｜Total revenue for the third quarter of 2026 was $64.60 billion, an increase of 26% compared to the third quarter of 2025, due to an increase in advertising revenue.
- p.5｜Income from operations for the third quarter of 2026 was $12.99 billion, a decrease of $7.55 billion, or 37%, compared to the third quarter of 2025, driven by higher costs and expenses. The increase in costs and expenses was primarily due to increases in legal-related costs, including the $9.89 billion charge related to the August 2026 multistate attorneys general agreement; infrastructure expenses related to our data centers, technical infrastructure, and third-party cloud services; and third-party AI token costs.
- p.5｜Cost of revenue in the three and nine months ended September 30, 2026 increased $4.16 billion, or 45%, and $9.65 billion, or 38%, respectively, compared to the same periods in 2025. The increases were primarily due to higher infrastructure expenses related to our data centers, technical infrastructure, and third-party cloud services.
- p.5｜Research and development expenses in the three and nine months ended September 30, 2026 increased $4.91 billion, or 32%, and $19.17 billion, or 48%, respectively, compared to the same periods in 2025. The increases were primarily due to higher infrastructure expenses related to our data centers, technical infrastructure, and third-party cloud services, employee compensation, and third-party AI token costs.
- p.5｜Marketing and sales expenses in the three and nine months ended September 30, 2026 increased $488 million, or 17%, and $1.09 billion, or 13%, respectively, compared to the same periods in 2025. The increases were mostly due to higher marketing and promotional expenses and third-party AI token costs.
- p.5｜General and administrative expenses in the three and nine months ended September 30, 2026 increased $11.35 billion, or 323%, and $14.62 billion, or 173%, respectively, compared to the same periods in 2025. The increases were mostly due to higher legal-related costs, including charges related to the August 2026 multistate attorneys general agreement of $9.89 billion in the three months ended September 30, 2026 and $11.89 billion in the nine months ended September 30, 2026.

## Q2 · 变化里**量 / 价 / 新产品**各贡献多少？

结论：本季量与价同时加速，量 +10%、价 +14%；公司只给两个同比百分比，没有给金额拆分，也没有给单价的美元绝对值。

具体：本季广告展示次数同比 +10%、平均单价 +14%，广告收入 630.61 亿美元、+25.9%；前九个月展示次数 +14%、单价 +13%，广告收入 1,774.49 亿、+28.6%。上年同期基数是单季 +14%/+10%、累计 +10%/+10%——量价互换：本季是"价提速（10%→14%）、量减速（14%→10%）"，累计则是"量提速（10%→14%）、价提速（10%→13%）"。两个百分比相乘得 +25.4%（本季）与 +28.8%（累计），与实际的 +25.9% 和 +28.6% 相差不到 0.5 个百分点，说明没有大额的量价交叉项，但不能据此反推各自的美元金额（公司未给）。

价格为什么涨：广告需求上升，公司归因于投放与衡量工具的改进；九个月口径另有一项有利汇率。量为什么涨：各地区展示次数都增，亚太最突出，来自用户数、参与度与展示频次。公司同时明说，增量展示集中在亚太这类低变现地区、以及 Reels 这类低变现产品，**部分抵消了涨价**——所以 +14% 是"提价能力扣掉结构稀释"后的净数。

新产品与其他收入：FoA 其他收入本季增 4.07 亿美元（+59%）、累计增 12.0 亿（+67%），来自 WhatsApp 付费消息与订阅；Reality Labs 本季减 0.27 亿（−6%），Meta Quest 销量下降、被 AI 眼镜增长部分抵消，累计只增 0.24 亿（+2%）。也就是说 RL 的"新产品"（AI 眼镜）只够对冲 Quest 的下滑，还没形成增量。

汇率与地区：本季汇率对收入是逆风，按不变汇率收入应为 647.1 亿、实际 646.0 亿，差 1.13 亿（即汇率拖累约 0.17%，计算值）；累计是顺风 23.2 亿。按用户所在地，本季美加 +33%、欧洲 +18%、亚太 +16%、世界其他 +34%；按客户地址（附注口径），本季美加 262.17 亿（+33.0%）、欧洲 140.23 亿（+21.2%）、亚太 169.93 亿（+18.8%）、其他 73.68 亿（+30.1%，增速计算值）。两套口径原文明确不同、不可互换：欧洲差 3.2 个百分点、亚太差 2.8 个百分点，混用会把欧洲读低、亚太读高。

用户口径：9 月全球 DAP 36.4 亿（+3%，是 9 月单月均值，不是本季季均）；ARPP 17.72 美元（+23%，按 FoA 收入除以季初季末 DAP 均值算）。DAP 只增 3% 而 ARPP 增 23%，说明本季增长几乎全靠人均变现，不是靠人头。

判断：量的含金量在下降——同样的收入增速，本季靠价、上年同期靠量；而价的部分被公司自己承认有结构稀释。所以"广告需求强劲"与"增量库存越来越难变现"同时成立。要留意 ARPP 的 23% 里有多少是汇率与地区结构，本件没拆，不敢外推。

### 依据
- p.5｜During the three and nine months ended September 30, 2026, ad impressions delivered increased by 10% and 14%, respectively, year-over-year, as compared with increases of 14% and 10%, respectively, in the same periods in 2025.
- p.5｜During the three and nine months ended September 30, 2026, the average price per ad increased by 14% and 13%, respectively, year-over-year, as compared with increases of 10% in both periods in 2025.
- p.5｜Advertising revenue in the three and nine months ended September 30, 2026 increased $12.98 billion, or 26%, and $39.41 billion, or 29%, respectively, compared to the same periods in 2025, due to increases in ad impressions delivered and average price per ad.
- p.5｜Ad impressions delivered during the three and nine months ended September 30, 2026 grew in all regions, especially in Asia-Pacific, which was driven by increases in users and their engagement as well as the frequency of ads shown on our products.
- p.5｜The increases in average price per ad in the three and nine months ended September 30, 2026 were driven by an increase in advertising demand, which we believe is mostly due to ongoing improvements to our ad performance from our ad targeting and measurement tools.
- p.5｜These increases were partially offset by a higher number of ad impressions delivered, especially in geographies and in products, such as Reels, that monetize at lower rates.
- p.5｜FoA other revenue in the three and nine months ended September 30, 2026 increased $407 million, or 59%, and $1.20 billion, or 67%, respectively, compared to the same periods in 2025. The increases were primarily driven by paid messaging from WhatsApp and subscriptions.
- p.5｜RL revenue in the three months ended September 30, 2026 decreased $27 million, or 6%, compared to the same period in 2025. The decrease was driven by lower Meta Quest sales, partially offset by higher sales of AI glasses.
- p.5｜RL revenue in the nine months ended September 30, 2026 increased $24 million, or 2%, compared to the same period in 2025. The increase was driven by higher sales of AI glasses, partially offset by lower Meta Quest sales.
- p.5｜Using these constant rates, for the three months ended September 30, 2026, our total revenue and advertising revenue would have been $64.71 billion and $63.16 billion, which were $113 million and $96 million higher than actual total revenue and advertising revenue, respectively.
- p.5｜In the third quarter of 2026, revenue increased by 33% in United States & Canada, 18% in Europe, 16% in Asia-Pacific, and 34% in Rest of World, in each case relative to the same period in 2025.
- p.4｜United States and Canada | $ | 26,217 | $ | 19,708 | $ | 71,346 | $ | 55,031
- p.4｜Europe (1)
| 14,023 | 11,566 | 41,272 | 32,315
- p.4｜Asia-Pacific | 16,993 | 14,304 | 48,511 | 38,401
- p.4｜Rest of World (1)
| 7,368 | 5,664 | 20,583 | 15,326
- p.5｜Worldwide DAP increased 3% to 3.64 billion on average during September 2026 from 3.54 billion during September 2025.
- p.5｜During the third quarter of 2026, worldwide ARPP was $17.72, an increase of 23% from the third quarter of 2025.

## Q3 · **会计政策比年报改了哪一项**？（只看"除〔某项〕外无重大变化"里的**那一项**）

结论：本期无政策变更——会计政策段没有"除〔某项〕外"的句式，直接写"与 2025 年报相比无重大变化"；关键会计估计也写明无重大变化。所以这一题的正解是"无变化"，不是"找不到"。

具体：政策段原话是"我们的重大会计政策相比 2025 年 12 月 31 日年报没有重大变化"，全句无例外项，与上一份 10-Q（2025 年三季报）里"除所得税会计政策更新外"的写法不同——那一次的那一项是税，本期没有。估计段同样一句话到底：关键会计估计自 2025 年报以来无重大变化。

唯一带"将来时"的会计事项是新准则未采用：2026 年 5 月 FASB 发布 ASU 2026-02（环境信用与环境信用义务，Topic 818），2028 年 12 月 31 日止年度起生效、允许提前采用、采用时须追溯适用；公司只说"正在评估影响"，未计量、未采用。这不算本期变更。

另有两件常被误当"政策变更"的事，本期都有、但都不是：①2026 年一季度确认的 80.3 亿美元 CAMT 过渡救济（依 Treasury Notice 2026-7），这是税法变化带来的一次性税收利益，走利润表、不改政策；②2026 年 5 月裁员约 8,000 人、前九个月计入 11.8 亿美元遣散费，这是重组成本，不改政策。

判断：本季会计层面"干净"，但也意味着利润的同比可比性没有被会计手法干扰——本季利润下滑 37% 全是真实的费用与和解，不是估计变更做出来的。反过来说，读这一季不能指望从"except for"里拿到信号，信号在法务与税这两处。

### 依据
- p.4｜There have been no material changes to our significant accounting policies from our Annual Report on Form 10-K for the year ended December 31, 2025.
- p.4｜In May 2026, the FASB issued Accounting Standards Update (ASU) No. 2026-02, Environmental Credits and Environmental Credit Obligations (Topic 818). This standard establishes guidance for the recognition, measurement and disclosure of environmental credits and environmental credit obligations.
- p.4｜The guidance will be effective for the annual periods beginning the year ending December 31, 2028 and interim periods within those annual periods. Early adoption is permitted. Upon adoption, the guidance is required to be applied on a retrospective basis. We are evaluating the effect that this guidance will have on our consolidated financial statements and related disclosures.
- p.5｜There have been no material changes to our critical accounting estimates since our Annual Report on Form 10-K for the year ended December 31, 2025.
- p.4｜The rate was lower than the statutory rate primarily due to a discrete income tax benefit of $8.03 billion recognized in the first quarter of 2026 in connection with U.S. Corporate Alternative Minimum Tax (CAMT) transitional relief provided under Treasury Notice 2026-7, tax effects from share-based compensation, research tax credits, and U.S. tax benefits from foreign-derived deduction eligible income.
- p.4｜Employee compensation for the nine months ended September 30, 2026 also includes $1.18 billion of severance expenses related to the May 2026 headcount reduction of approximately 8,000 employees which impacted both FoA and RL segments.
- p.4｜The accompanying condensed consolidated financial statements reflect all normal recurring adjustments that are necessary to present fairly the results for the interim periods presented. Interim results are not necessarily indicative of the results for the full year.

## Q4 · **流动性**当期怎么动？**短期（12 个月内）与长期**的现金需求各是什么？

结论：现金总盘 824.49 亿美元（计算值），比 2025 年末多 8.57 亿——几乎没动，但结构大变：经营现金流 968.73 亿被 858.2 亿资本开支和 249.1 亿新发债一进一出抵平。12 个月内不缺钱，压力在 12 个月之后的承诺。

具体：期末现金及等价物 112.22 亿、有价证券 712.27 亿，合计 824.49 亿，较 2025-12-31 的 815.92 亿增 8.57 亿（计算值；公司披露写作 824.5 亿）。增量来源是经营现金流 968.73 亿（累计口径，上年同期 795.86 亿）与 2026 年 5 月发债净额 249.10 亿；减项是资本开支 858.20 亿（含融资租赁本金）、RSU 净额结算税款 127.70 亿、分红 40.60 亿、其他筹资 26.30 亿。另外有 108.0 亿货币基金因多年期基础设施采购协议的托管要求被划为受限现金，2028—2030 年分批释放，不能当可动用现金。经营现金流是现金流量表的累计口径，本季单季数**本件未披露**，也不许用累计数拆。

短期（12 个月内）：硬性支出三块。①合同采购承诺 2026 年剩余到期 458.5 亿美元（只剩三个月）；②资本开支指引 1,350—1,450 亿减已花 858.2 亿，本季之后还需 491.8—591.8 亿（计算值）；③债务利息短期 44.0 亿，加上季度分红约 14 亿。合计约 1,008—1,108 亿美元（计算值），对 824.49 亿现金的覆盖率约 1.2—1.3 倍（计算值）——**静态看有 184—284 亿缺口**，但四季度经营现金流按前九个月均值约 323 亿/季（计算值）足以补上，所以 12 个月内没有真实缺口。债务本金 12 个月内零到期，最近一笔 27.5 亿在 2027 年 8 月。

长期：已签未起租的租赁义务 3,557.30 亿美元（2026 年余下至 2036 年起租，租期最长 30 年）；不可撤销合同承诺 4,545.20 亿（其中 2027 年到期 1,214.1 亿，其余约 2,872.6 亿更晚，计算值）；债务本金 840.00 亿，未来利息 845.1 亿；多州和解 127 亿分 10 年支付。合计约 9,914.6 亿美元（计算值），约为当前现金的 12 倍，只能靠经营现金流逐年兑付。另有两项表外敞口要并读：数据中心合营的最大损失敞口 684.04 亿美元（其中残值担保上限 414.93 亿），以及最多 147.2 亿美元的云容量或有采购义务。

判断：这份流动性表最容易被误读的一点是"现金没变"。现金没变不是因为不缺钱，而是因为**把未来三年的资本开支提前用发债和经营现金流垫上了**——负债从 590 亿面值升到 840 亿，未起租租赁从零头变成 3,557 亿。管理层说"至少未来 12 个月及以后可预见期间足够"，这句话的边界在"可预见"，而 12 个月之外那 9,900 亿的刚性承诺，弹性只在经营现金流一侧。真正的风险点不是偿付能力，是**承诺的期限结构**：2026 年剩余三个月要落地 458.5 亿，2027 年 1,214 亿，这两年合计就超过当前全部现金。

### 依据
- p.5｜Cash, cash equivalents, and marketable securities were $82.45 billion as of September 30, 2026, an increase of $857 million from December 31, 2025. The increase was mainly due to $96.87 billion of cash generated from operations and $24.91 billion of net proceeds from the issuance of fixed-rate senior unsecured notes (the Notes) in May 2026. These increases were partially offset by $85.82 billion of capital expenditures, which includes purchases of property and equipment and principal payments on finance leases; $12.77 billion of taxes paid related to net share settlement of employee restricted stock unit (RSU) awards; $4.06 billion of payments of dividends and dividend equivalents; and $2.63 billion of cash used in other financing activities.
- p.5｜Net cash provided by operating activities | $ | 96,873 | $ | 79,586
- p.5｜Capital expenditures, including principal payments on finance leases, were $34.91 billion for the three months ended September 30, 2026.
- p.5｜We anticipate making capital expenditures of approximately $135 billion to $145 billion in 2026 to support our AI efforts and core business.
- p.5｜We currently anticipate that our available funds and cash flow from operations and financing activities will be sufficient to meet our operational cash needs and fund our cash commitments for investing and financing activities, including investments in infrastructure and AI initiatives, as well as any return of capital to stockholders over the next 12 months and thereafter for the foreseeable future.
- p.4｜As of September 30, 2026, we had $454.52 billion of non-cancelable contractual commitments, comprising both short-term and long-term arrangements. These commitments mostly relate to third-party cloud capacity arrangements and investments in servers and network infrastructure, energy service agreements for data centers, and consumer hardware products in Reality Labs, with approximately $45.85 billion and $121.41 billion due in 2026 and 2027, respectively.
- p.4｜These lease obligations were approximately $355.73 billion, consisting of data centers, energy-related infrastructure, colocations, and certain network infrastructure, which will commence during the remainder of 2026 through 2036 with lease terms ranging from greater than one year to 30 years.
- p.5｜As of September 30, 2026, we had $84.00 billion aggregate principal amount of Notes outstanding, of which $2.75 billion matures in August 2027, with the remainder maturing through 2066. Short-term and long-term future interest payments obligations as of September 30, 2026 were $4.40 billion and $84.51 billion, respectively.
- p.4｜As of September 30, 2026, our restricted cash equivalents of $12.83 billion include $10.80 billion of money market funds related to escrow requirements under certain multi-year infrastructure purchase agreements.
- p.4｜Maximum residual value guarantees | 41,493 | 28,091
- p.4｜Total | $ | 68,404 | $ | 45,952
- p.4｜In addition, as of September 30, 2026, we have contingent obligations to purchase up to $14.72 billion of cloud capacity over a five-year period, which may be reduced if the cloud service provider is able to sell such capacity to other customers.
- p.5｜In August 2026, as part of the multistate attorneys general agreement related to teen mental health and social media, approximately $12.7 billion is payable to participating states in annual installments over a 10-year period. We have not recognized a liability for the $5.3 billion contingent amounts and may recognize additional expenses in future periods.

## Q5 · **回购 / 发债 / 现金**当期怎么动（**为 0 也是答案**）？

结论：本季与累计回购都是 0（授权余额 250.3 亿一分未动）；发债是本期最大的资本动作，5 月一次发 250 亿美元；分红本季 13.6 亿、累计 40.6 亿。

具体：回购——本季无任何回购，前九个月也未回购任何 A 类股，授权余额自 2025 年末到本季末一直是 250.3 亿；上年同期是回购 4,000 万股、262.48 亿美元（现金流量表口径）。发债——2026 年 5 月一次发行六档、合计面值 250.00 亿美元的固定利率高级无担保票据，净额 249.10 亿；债务面值从 590 亿升到 840 亿，账面 836.69 亿（计算值：长期 809.22 亿 + 一年内到期 27.47 亿），利息费用本季 9.77 亿（上年同期 2.27 亿，+330%）、累计 23.22 亿。分红——每股 0.525 美元，本季实付 13.6 亿（A 类 11.8 亿 + B 类 1.79 亿，计算值合计 13.59 亿）、累计实付 40.6 亿；权益表口径本季宣告 13.97 亿、累计宣告 41.52 亿，比实付多，差额是宣告与支付的时间差。现金——期末现金及等价物 112.22 亿（2025 年末 358.73 亿），有价证券 712.27 亿（457.19 亿）；含受限现金的总口径 243.54 亿（上年末 391.00 亿）。另有 108.0 亿货币基金被划为受限，计入其他资产 125.35 亿与预付费用 5.97 亿。

判断：资本配置的顺序变了——2025 年是"回购 + 分红 + 发债"，2026 年是"停回购 + 分红照付 + 大幅发债 + 全押资本开支"。停回购不是没钱，是把 250 亿授权额度留着当缓冲；发债 250 亿则是明确表态：资本开支的增速已经超过内生现金流的承受度。这条线索与本季 858 亿资本开支、1,350—1,450 亿全年指引是同一件事。期后还有一笔非现金的股本动作：10 月章程修订设无投票权 C 类股，按每股送一股的形式派发，会计上按股票分割处理、不改变权益总额，但会使前期的股数与每股金额追溯调整——这会让"每股"口径在 2027 年一季度前后不可比，引用历史 EPS 时必须注明。

### 依据
- p.10｜There was no share repurchase activity during the three months ended September 30, 2026.
- p.4｜We did not repurchase any shares of Class A common stock during the nine months ended September 30, 2026. As of both December 31, 2025 and September 30, 2026, $25.03 billion remained available and authorized for repurchases under this program.
- p.4｜Repurchases of Class A common stock | &#8212; | (26,248)
- p.4｜Proceeds from issuance of long-term debt, net | 24,910 | &#8212;
- p.4｜Payments for dividends and dividend equivalents | (4,060) | (3,986)
- p.4｜In May 2026, we issued an aggregate of $25.00 billion of fixed-rate senior unsecured notes in six series.
- p.4｜Total face value of long-term debt | 84,000 | 59,000
- p.4｜Interest expense, net of capitalized interest, recognized on the Notes was $882 million and $205 million for the three months ended September 30, 2026 and 2025, respectively, and $2.17 billion and $668 million for the nine months ended September 30, 2026 and 2025, respectively.
- p.4｜We paid quarterly dividends and dividend equivalents of $0.525 per share of common stock. For the three months ended September 30, 2026 and 2025, payments totaled $1.18 billion and $1.15 billion for Class A common stock and $179 million and $180 million for Class B common stock, respectively.
- p.5｜Dividend and dividend equivalent payments were $1.36 billion for the three months ended September 30, 2026.
- p.4｜Cash and cash equivalents | $ | 11,222 | $ | 35,873
- p.4｜Marketable securities | 71,227 | 45,719
- p.4｜Total cash, cash equivalents, restricted cash, and restricted cash equivalents | $ | 24,354 | $ | 11,941
- p.4｜In October 2026, we filed an amended and restated certificate of incorporation (the Restated Charter) to, among other things, establish a new class of non-voting Class C common stock (the Recapitalization), with an effective date of January 19, 2027.

## Q6 · **ICFR 有无变化**？披露控制的结论是什么？

结论：披露控制与程序在期末被判有效；本期内控**无变化**。季报问的是"变化"，不是年报的"内控有效"。

具体：期末结论——CEO 与 CFO 参与评估后认为，截至 2026-09-30，披露控制与程序"设计在合理保证水平并有效"，能在 SEC 规定期限内记录、处理、汇总、报告应披露信息，并汇总传达至管理层以便及时决策。变化结论——按 13a-15(d)/15d-15(d) 评估，本季内没有已识别、且已经或合理可能重大影响内控的变化。本件未对 ICFR 整体有效性下年度结论，也未披露任何重大缺陷。

判断：本季内控"无变化"与"利润表被一笔 98.9 亿美元和解费砸出大坑"并不矛盾——和解计提是**判断与估计**的结果，属于内控所处理的对象，不是控制本身变了。反过来也不能把"无变化"读成"本期没有重大会计事项"：本季同时有 98.9 亿和解计提、11.8 亿遣散费、以及 9 月税务法院补充意见引起的未确认税收利益重新计量，三件都动了利润，但三件都没有被认定为内控变化。还有一处需要盯：受限现金 108 亿的科目重分类（从货币基金到受限现金等价物、从预付费用到其他资产）属于列报调整，本件也未将其列为内控变化。

### 依据
- p.7｜Based on such evaluation, our CEO and CFO have concluded that as of September 30, 2026, our disclosure controls and procedures are designed at a reasonable assurance level and are effective to provide reasonable assurance that information we are required to disclose in reports that we file or submit under the Exchange Act is recorded, processed, summarized, and reported within the time periods specified in the rules and forms of the Securities and Exchange Commission, and that such information is accumulated and communicated to our management, including our CEO and CFO, as appropriate, to allow timely decisions regarding required disclosure.
- p.7｜There were no changes in our internal control over financial reporting identified in management's evaluation pursuant to Rules 13a-15(d) or 15d-15(d) of the Exchange Act during the period covered by this Quarterly Report on Form 10-Q that materially affected, or are reasonably likely to materially affect, our internal control over financial reporting.

## Q7 · **诉讼与风险**相比年报有没有**实质更新**？

诉讼：有实质更新，而且量级变了。本件没有写"与年报无重大变化"，是逐案重述；本件自身标注为 2026 年 7—9 月新发生的进展如下（与上年报的逐条比对需年报在手，本件不含年报，故只报本件自证的新事实）。

①**多州总检察长和解（本季最大事件）**：2026 年 8 月与 52 个州/属地/哥伦比亚特区达成协议，总付款上限约 185.9 亿美元，分 10 年支付，另付 7,500 万美元调查与诉讼费用；其中约 127 亿（约 70%）为确定付款，剩余约 53 亿（约 30%）为**或有**，只有在 YouTube、TikTok 等同行也实施同类青少年保护并按其规模付款时才触发，期末条件未满足、**未计提**。和解不含佛罗里达、新墨西哥、美属维尔京群岛的案件。本季因此计提 98.9 亿（前九个月 118.9 亿），法务准备金从流动 68.67 亿升至 115.77 亿、非流动从 4.50 亿升至 83.04 亿。

②**新墨西哥州总检察长案已判决**：2026-02-02 开庭，2026-03-24 陪审团判 3.75 亿美元民事罚款；2026-08-06 法院认定构成公共妨害，判约 5.67 亿美元治理费用加禁令救济；2026-09-08 公司申请撤销判决并获中止执行。

③**青少年个人伤害 bellwether**：2026-01-27 首案开庭（JCCP 5255），2026-03-25 陪审团判 600 万美元惩罚性/补偿性赔偿、Meta 承担 70%、YouTube 30%，已上诉；第二案原告撤诉、第三案 2026-08-20 撤诉；下两案合并审约定 2026-10-28（期后）；后续两批排期 2027-03-16、2027-08-06。学区 bellwether 首案 2026 年 5 月和解，下一案 2027 年 2 月。另有 20 万以上个人索赔人发起批量仲裁。

④**反垄断主案转向上诉**：2025-11-18 法院判 Meta 胜诉，2026-01-20 FTC 提起上诉（时点跨在年报提交前后，年报是否已载需核对）；FTC 行政程序仍中止，等两案终局。同院宪法挑战案须在 2026-12-07 或管辖权案判决后 30 日内提交状态报告；地区法院定于 2026-11-12 就动议开庭。

⑤**欧洲**：西班牙 AMI 案 2025-11-19 判赔约 5.42 亿欧元（不公平竞争成立、滥用支配地位不成立），已上诉；UTECA 案 2026-10-21 开庭（期后），判决预计 2027 年上半年；Marketplace 7.98 亿欧元罚款（2024-11 决定）已于 2025-01-28 上诉，本季无新进展；DMA 2 亿欧元罚款已于 2025-07-04 上诉；2026 年 6 月欧委会就 WhatsApp Business API 下达临时措施（要求向通用 AI 提供方免费开放），公司拟上诉；DSA 未成年人事项 2026-04-29 与 2026-07-10 两次初步认定。

⑥**其他在动**：Flo Health 案（2025-08-01 陪审团作不利认定）集体成员数由上一版的约 160 万改为**最多约 125 万**，按每人 5,000 美元计约 62.5 亿美元（计算值），公司称金额尚不确定；Kadrey 版权案 2025-06-25 获部分即决胜诉（合理使用），下次即决动议 2027-02-25、开庭 2027-05-24；IRS 2017—2019 年度 158.9 亿美元欠税通知已于 2025-12 向税务法院起诉。

⑦**金额量级**：本件写"原告主张的赔偿、返还与罚款在各案之间差异极大，某些案件曾主张超过 1 万亿美元"，同时保留"未注明金额的事项无法估计或单项不重大但合计可能重大"的口径。这比上一份季报"数千亿美元"的措辞又高了一个量级。

风险因素：正文有系统性改写，且新增的是**已落地的事实**而不是假设。可辨认的新增至少四组：①2026 年 9 月与美国政府及其他前沿 AI 开发者签署《超级智能协定》（Accord on Super Intelligence），含内部管控、第三方审计等承诺，公司明说这会增加合规成本、拖慢模型发布；②2026 年 8 月按中国国家发改委要求完成 Manus 的剥离（与 2023 年按英国 CMA 要求剥离 Giphy 并列），即"交割后被强制回退"的风险已经实现过一次；③2026 年 8 月与 52 个州总检察长的和解（含产品功能改造与独立审计）；④2026 年一季度 DAP 环比下滑（伊朗断网、俄罗斯限制 WhatsApp）首次被写进指标口径。此外澳大利亚 16 岁以下社媒禁令、巴西 2025 年 6 月中介责任框架被部分推翻、欧盟成员国年龄验证立法等仍在正文中，属延续项。

判断：三条线要分开读。**诉讼**是"从程序转向金额"——2026 年第一次出现可执行的判决金额（新墨西哥 3.75 亿 + 5.67 亿）和一次性 185.9 亿的和解框架，诉讼不再是"结果未定"，而是"已经定价，只是分期"；53 亿或有部分未计提，是唯一还没进表的口子。**风险因素**是"从法规风险转向执行风险"——超级智能协定、Manus 被强制剥离、52 州和解的产品改造，这三件都不是"可能被立法影响"，而是"已经被要求做"。**两者共同的指向**是 2027 年：bellwether 后续庭审、Kadrey 庭审、UTECA 判决、C 类股生效，全部落在 2027 年上半年。

### 依据
- p.8｜In August 2026, we reached agreement with 52 attorneys general across U.S. states, territories, and the District of Columbia to resolve litigation related to teen mental health and social media (with the exception of cases brought by Attorneys General in Florida, New Mexico, and the U.S. Virgin Islands). The agreement provides for payments of up to approximately $18.59 billion, which may be used to fund youth online safety initiatives, among other state priorities, as well as certain changes to our product features for users under 18 years old on Facebook and Instagram in the United States.
- p.8｜Approximately $12.7 billion, representing approximately 70% of the total payments under the agreement related to the teen mental health and social media litigation, is payable to participating states in annual installments over a 10-year period. An additional $75 million is payable to a committee of the settling states for investigatory and litigation costs.
- p.8｜As of September 30, 2026, these conditions were not satisfied and, accordingly, the contingent payments of approximately $5.3 billion were not accrued.
- p.8｜On March 24, 2026, a jury returned a verdict against us and ordered that we pay a civil penalty of $375 million.
- p.8｜On August 6, 2026, the court issued a judgment finding that our platforms constitute a public nuisance, awarding approximately $567 million in abatement costs and injunctive relief including certain changes to the manner in which we provide our services in New Mexico. On September 8, 2026, we filed motions seeking to vacate the judgments, and the court issued a stay of the judgment.
- p.8｜On March 25, 2026, a jury returned a verdict in the first bellwether trial and awarded $6 million in compensatory and punitive damages between us and YouTube, allocated 70% to us and 30% to YouTube. We have filed a notice of appeal.
- p.8｜The next two user bellwether plaintiffs are scheduled to try their cases in a consolidated trial scheduled to begin on October 28, 2026.
- p.8｜Across the cases described above, the damages, disgorgement, or penalties that plaintiffs have indicated they could seek range widely in amount, and have at times in certain cases amounted to more than a trillion dollars.
- p.8｜On November 18, 2025, the court granted judgment in our favor. On January 20, 2026, the FTC filed a notice of appeal of that ruling.
- p.8｜The parties are due to file a status report with the district court by the earlier of December 7, 2026, or 30 days after a decision in the jurisdictional case.
- p.8｜On November 19, 2025, the court issued judgment against us, finding that AMI had failed to establish abuse of dominance but upholding its case on unfair competition and awarding damages of approximately EUR &#8364;542 million. We have appealed the decision.
- p.8｜Trial took place on October 21, 2026, and judgment is expected in the first half of 2027.
- p.8｜While its investigation remains ongoing, in June 2026, the European Commission imposed an interim measure requiring WhatsApp to offer access to the API for free for such general purpose AI providers. We intend to appeal that interim measure.
- p.8｜On April 29, 2026 and July 10, 2026, respectively, the Commission issued preliminary findings with respect to some of these topics, reflecting its preliminary view that users under 13 years of age are present on Facebook and Instagram and that both platforms present potentially addictive design features
- p.8｜Plaintiffs are seeking $5,000 in statutory damages per class member and have asserted that there are up to approximately 1.25 million class members. The amount of potential damages is uncertain at this time.
- p.4｜Legal-related accruals, current (1)
| $ | 11,577 | $ | 6,867
- p.4｜Legal-related accruals, non-current (1)
| $ | 8,304 | $ | 450
- p.9｜In September 2026, we signed the Accord on Super Intelligence with the U.S. government and other developers of frontier AI technologies, which includes principles and commitments around maintaining robust internal controls and oversight, including engaging third-party auditors.
- p.9｜For example, we completed our divestiture of Manus in August 2026 following an order from China's National Development and Reform Commission ordering us to unwind the transaction, and we completed our divestiture of Giphy in 2023 following the United Kingdom Competition and Markets Authority's order directing us to divest Giphy post-acquisition.
- p.9｜For example, in the first quarter of 2026, we experienced a slight decline on a quarter-over-quarter basis in the total number of Family daily active people that was driven by internet disruptions in Iran, as well as a restriction on access to WhatsApp in Russia.

## Q8 · 期间的调整**是不是全部"正常经常性"**？**有没有非经常性调整**、多少？

结论：报表层面声明"全部为正常经常性调整"，但本期确实有多笔非经常性项目——最大的一笔是 98.9 亿美元的和解计提（累计 118.9 亿），其次是 11.8 亿遣散费与 80.3 亿一次性税收利益。声明与事实不矛盾，两句话说的不是一件事。

具体：声明的原话是"合并财务报表反映了为公允列示中期业绩所必需的全部正常经常性调整"。与之并存的一次性项目（按量级排）：

①**法务和解**——2026 年 8 月多州总检察长和解，本季计入管理费用 98.9 亿美元、前九个月 118.9 亿；另含新墨西哥州 3.75 亿罚款（3 月）与 5.67 亿治理费用（8 月），是否已包含在上述 118.9 亿内，本件未拆，记为待核。约 53 亿或有部分未计提。

②**遣散费**——2026 年 5 月裁员约 8,000 人，前九个月计入员工薪酬 11.8 亿美元（分摊 FoA 与 RL）；员工总数降至 66,775 人（同比 −15%），研发岗 −16%、营销岗 −18%。

③**税**——2026 年一季度依 Treasury Notice 2026-7 确认 80.3 亿美元 CAMT 过渡救济的一次性税收利益，与 2025 年三季度 159.3 亿美元 OBBBA 一次性费用正反对冲；本季所得税费用 31.41 亿、有效税率 24%（上年同期 189.54 亿、87%），累计 10.28 亿、2%（上年 228.88 亿、38%）。另 2026-09-29 税务法院就 2010 年度案的补充意见解决了特许权使用费的换算方法，公司据此重新计量未确认税收利益、税费因此增加，**金额未披露**。

④**投资收益**——可交易权益证券本季未实现损失 3.84 亿美元（上年同期为收益 9.22 亿），累计未实现损失 26.8 亿（上年为收益 5.48 亿），这直接解释了"利息及其他收入净额"从 11.28 亿掉到 0.13 亿。

未见：重组（除遣散）、资产减值、会计差错更正、追溯重述。资产剥离方面，Manus 剥离已 2026 年 8 月完成，本件称处置收益不重大；商誉处置 12.66 亿系转持有待售后再出售，未确认减值。

判断："全部正常经常性"讲的是**权责发生制下有没有需要跨期调整的非常分录**（差错更正、追溯重述），答案是"没有"；而和解计提、遣散费、税项利益、未实现损益都是当期真实发生的交易与事件，直接进了利润表，不需要"调整"。要算同比必须自己剔：剔掉和解费后的本季营业利润 228.77 亿、营业利润率 35.4%；剔掉税收利益后的累计税率约（10.28+80.3）/535.09 = 16.9%（计算值），正好落在管理层给的四季度 15%—17% 区间内，说明 2% 是那笔 80.3 亿顶下来的、不可外推。10-Q 没有给非 GAAP 净利润，任何"正常化利润"都是读者自己算的。

### 依据
- p.4｜The accompanying condensed consolidated financial statements reflect all normal recurring adjustments that are necessary to present fairly the results for the interim periods presented. Interim results are not necessarily indicative of the results for the full year.
- p.5｜General and administrative expenses in the three and nine months ended September 30, 2026 increased $11.35 billion, or 323%, and $14.62 billion, or 173%, respectively, compared to the same periods in 2025. The increases were mostly due to higher legal-related costs, including charges related to the August 2026 multistate attorneys general agreement of $9.89 billion in the three months ended September 30, 2026 and $11.89 billion in the nine months ended September 30, 2026.
- p.4｜Employee compensation for the nine months ended September 30, 2026 also includes $1.18 billion of severance expenses related to the May 2026 headcount reduction of approximately 8,000 employees which impacted both FoA and RL segments.
- p.5｜Headcount was 66,775 as of September 30, 2026, a decrease of 15% year-over-year.
- p.5｜The higher employee compensation was mainly from increases in share-based compensation expense during the three and nine months ended September 30, 2026, partially offset by a 16% decrease in employee headcount in our engineering and other technical functions.
- p.4｜The income tax benefit of $8.03 billion partially offsets the $15.93 billion discrete charge recognized in the third quarter of 2025 upon enactment of the One Big Beautiful Bill Act.
- p.4｜Provision for income taxes | 3,141 | 18,954 | 1,028 | 22,888
- p.5｜Effective tax rate | 24 | % | 87 | % | 2 | % | 38 | %
- p.5｜Provision for income taxes and our effective tax rate in the three months ended September 30, 2026 decreased compared to the same period in 2025, mostly due to the effects of the enactment of the One Big Beautiful Bill Act (OBBBA) in the third quarter of 2025, partially offset by the effects of the portion of the August 2026 multistate attorneys general agreement charge that is not expected to be tax-deductible.
- p.5｜Absent any changes to our tax landscape, we expect our fourth quarter 2026 effective tax rate to be between 15-17%.
- p.4｜On September 29, 2026, the Tax Court issued a supplemental opinion resolving the remaining disputes over how the value determined in its May 2025 opinion translates into royalty payments. We estimated the net tax effects based on the supplemental opinion, and our provision for income taxes increased due to the remeasurement of unrecognized tax benefits.
- p.4｜The net unrealized losses on our marketable equity securities were $384 million, and the net unrealized gains were $922 million for the three months ended September 30, 2026 and 2025, respectively. The net unrealized losses were $2.68 billion, and the net unrealized gains were $548 million for the nine months ended September 30, 2026 and 2025, respectively.
- p.4｜Interest and other income (expense), net | 13 | 1,128 | (1,126) | 2,047
- p.4｜During the third quarter of 2026, we completed the sale and derecognized the related goodwill. The gain recognized on the sale was not material.

## Q9 · **分部**的收入与营业利润（本季 / 累计）？**定义变了吗**？

结论：分部口径未变，仍是 Family of Apps（FoA）与 Reality Labs（RL）两个报告分部，原文明确经营分部与报告分部相同。

具体：本季 FoA 收入 641.58 亿美元、营业利润 171.17 亿；RL 收入 4.43 亿、营业亏损 41.29 亿。累计九个月 FoA 收入 1,804.36 亿美元、营业利润 674.10 亿；RL 收入 12.76 亿、营业亏损 127.75 亿。两分部相加等于合并数：收入本季 646.01 亿、累计 1,817.12 亿；营业利润本季 129.88 亿、累计 546.35 亿。FoA 含 Facebook、Instagram、Messenger、WhatsApp 及其他服务，RL 含虚拟/增强现实消费硬件、软件与内容；上一年同期仍按两分部列示，未见重分类或重述。

分部内的费用结构也给了：本季 FoA 员工薪酬 121.92 亿、其他成本费用 348.49 亿（上年同期 106.45 亿、151.60 亿，其他成本费用增 130%）；RL 员工薪酬 19.70 亿、其他成本 26.02 亿。

判断：FoA 仍是唯一利润来源，但利润率塌了——本季 26.7%，上年同期 49.2%（降 22.5 个百分点，计算值）；累计 37.4% 对 51.3%。塌的原因不是收入（+26%）而是"其他成本费用"翻倍：本季比去年同期多花 193 亿，其中 98.9 亿是和解费，剩下的约 94 亿是基础设施、云、AI token 与法务常规支出（计算值）。所以 FoA 的问题要分两层：一层是**一次性的**（和解 98.9 亿，剔掉后 FoA 利润率约 42%，计算值），一层是**结构性的**（基础设施与云，剔不掉）。

RL 这一季是"减亏"：亏损 41.29 亿，比去年同期少亏 3.03 亿（−6.8%，计算值），累计亏 127.75 亿、比去年同期少亏 3.96 亿（−3.0%），原因是员工薪酬下降（25.94 亿→19.70 亿）、被第三方 AI token 成本上升与库存成本增加部分抵消。但公司同时把全年 RL 亏损指引放在 180—190 亿美元，比 2025 年的 191.9 亿只降一点——也就是说**下半年的亏损会比上半年大**，本季的"减亏"不可年化。

### 依据
- p.4｜We report our financial results for our two reportable segments: Family of Apps (FoA) and Reality Labs (RL).
- p.4｜Our operating segments are the same as our reportable segments.
- p.4｜Revenue | $ | 64,158 | $ | 50,772 | $ | 180,436 | $ | 139,821
- p.4｜Income from operations | $ | 17,117 | $ | 24,967 | $ | 67,410 | $ | 71,702
- p.4｜Revenue | $ | 443 | $ | 470 | $ | 1,276 | $ | 1,252
- p.4｜Loss from operations | $ | (4,129) | $ | (4,432) | $ | (12,775) | $ | (13,171)
- p.4｜Employee compensation (1)
| (12,192) | (10,645) | (38,843) | (29,011)
- p.4｜Other costs and expenses (2)
| (34,849) | (15,160) | (74,183) | (39,108)
- p.5｜Family of Apps | $ | 17,117 | $ | 24,967 | (31) | % | $ | 67,410 | $ | 71,702 | (6) | %
- p.5｜Reality Labs | (4,129) | (4,432) | 7 | % | (12,775) | (13,171) | 3 | %
- p.5｜FoA income from operations in the three and nine months ended September 30, 2026 decreased $7.85 billion, or 31%, and $4.29 billion, or 6%, respectively, compared to the same periods in 2025, driven by higher FoA costs and expenses partially offset by an increase in revenue.
- p.5｜RL loss from operations in the three and nine months ended September 30, 2026 decreased $303 million, or 7%, and $396 million, or 3%, respectively, compared to the same periods in 2025, driven by decreases in RL costs and expenses. RL costs and expenses decreased primarily due to lower employee compensation, partially offset by an increase in third-party AI token costs. In the three months ended September 30, 2026, RL inventory costs also increased.
- p.5｜During the nine months ended September 30, 2026, our RL segment reduced our overall operating profit by approximately $12.78 billion, and we expect our full-year 2026 RL operating losses to be approximately $18 billion to $19 billion.
- p.9｜For example, our investments in Reality Labs reduced our 2025 overall operating profit by approximately $19.19 billion, and we expect our full-year 2026 Reality Labs operating losses to be approximately $18 billion to $19 billion.

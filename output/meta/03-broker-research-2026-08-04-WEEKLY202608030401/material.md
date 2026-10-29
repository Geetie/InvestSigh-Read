---
id: 03-broker-research-2026-08-04-WEEKLY202608030401
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-08-04
time: "00:00"
title: "03-broker-research-2026-08-04-WEEKLY202608030401"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 42
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-08-04-WEEKLY202608030401/full.md`（42 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是**美股策略周报**（US Equity Strategy，Michael Wilson 团队），不是个股模型：没有收入/毛利/营业利润/资本开支/税率/股数六行损益表，只有**指数级**的自上而下假设 + 一条 META 的个股经营假设链。所以下表前六项按指数口径登记，缺的四项直说缺，不用 EPS 反推。

| 量名 | 本件取值 | 期间 | 口径 |
|---|---|---|---|
| 收入增速 | 2Q +11%；2026 年 +10% | 2Q26 / FY2026 | 市场共识（consensus），非 MS 自估；指数级 |
| 毛利率 | 未给该行 | — | 全篇无指数毛利率，只有 EBIT/净利率两种口径 |
| 营业利润率 | LTM 19.4% → FY2026E 20.4% → FY2027E 22.1% | 2026 / 2027 | 已实现（realized LTM）与预测分列，S&P 500 口径 |
| 资本开支 | 未给该行 | — | 指数级无 capex 行；仅在正文以"capex/sales 因子"定性讨论超大规模厂商 |
| 实际税率 | 未给该行 | — | 无税率行；给了净利率路径（14.9% → 15.9% → 16.7%）替代 |
| 摊薄股数 | 未给该行 | — | 指数级无股数列 |

他自己那套数（MS Top Down EPS）：2026 $339、2027 $380、2028 $429；目标 P/E 20.5x；当前 19.6x。共识列同期为 $356 / $404 / $462（见 Q2）。

META 这条线只有经营假设、没有财务预测，但四条能进模型：

1. **人效**：2025 年初以来每工程师产出 +30%（agentic coding 驱动）。
2. **减员**：潜在裁减约 1.6 万人，年省 30–130 亿美元，对应 2027 年 EBIT +5–10%。
3. **期权**：NeoCloud、Meta AI Search、API 收入、订阅、广告上行五项合计约 **+$10 的 2028 年 EPS（约为其基准情形的 +30%）**。
4. **判读**：+30% 是"对基准情形的上行"，不是他对 2028 年 EPS 的预测值；分母（基准 EPS）本件未给，故不能反推绝对 EPS。

口径提醒两处：其一，共识的 2027 年 EPS 增速在本件内自相矛盾——销售段落写 8%，EPS 段落写 15%，引用时须指明取自哪一段；其二，指数口径的"营业利润率"是 EBIT margin，与个股 GAAP 营业利润率不同源，不能横向比。

### 依据

- p.23｜Consensus expects 11% sales growth in 2Q.
- p.23｜Consensus expects 10% 2026 Sales growth and 8% 2027 EPS growth
- p.24｜Consensus expects 28% 2026 EPS growth and 15% 2027 EPS growth.
- p.25｜Realized (LTM) EBIT margins are at 19.4% today and are expected to be 20.4% for FY2026 and 22.1% for FY2027.
- p.25｜Realized (LTM) net margins are at 14.9% today and are projected at 15.9% for FY2026 and 16.7% for FY2027.
- p.34｜Base Growth</td><td rowspan="2">7,490</td><td rowspan="2">8,300</td><td rowspan="2">11%</td><td rowspan="2">19.6x</td><td rowspan="2">20.5x</td><td>$339</td><td>$380</td><td>$404</td><td>$429</td><td>$356</td><td>$404</td><td>$428</td><td>$462</td></tr><tr><td>23%</td><td>12%</td><td>13%</td><td>13%</td><td>30%</td><td>13%</td><td>14%</td><td>14%</td>
- p.9｜Management has reported a 30% increase in output per engineer since the start of 2025 driven by agentic coding adoption, and we believe META is pushing nextgeneration tools across engineers, G&A, sales, and marketing to drive productivity, with potential workforce reductions of ~16k representing a structural pivot toward efficiency that could drive $3–13bn in savings and 5–10% upside to '27 EBIT.
- p.10｜aggregate could represent ~$10 of incremental '28 EPS (~30% upside to our base case).

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。本件能做的是**他 vs 报告自带共识列**的对照——这张表把 MS Top Down 与 Bottom Up Consensus 并排放，是很少见的可直接对账结构。

| 财年 | MS 自上而下 | 共识（自下而上） | 差额 |
|---|---|---|---|
| 2026 | $339 | $356 | −4.8% |
| 2027 | $380 | $404 | −5.9% |
| 2028 | $429 | $462 | −7.1% |

三条判断：

1. **方向一致、幅度递增**：三年都低于共识，且缺口从 −4.8% 扩到 −7.1%。这不是"差一年"，是**逐年放大**的路径差——他对 2027/2028 的复利更保守。
2. **差在 EPS 水平，不在利润率**：本件只给了自己的 EBIT/净利率路径（20.4% → 22.1%），没有共识利润率列，故**无法判定差异落在收入端还是利润率端**，只能确认落在"指数 EPS 水平"这一层。
3. **越往远期越没把握**：2028 年 −7.1% 的缺口，与他同时给出的"AI 采用者 +$10/股（约 +30%）"上行期权并不矛盾——期权是**未计入基准**的，正因为没计入，基准才低。

口径要分清：MS 是自上而下（宏观驱动、行业权重推导），共识是自下而上（个股加总），两者本就不完全同源，−5% 上下的缺口有一部分是方法论差而非观点差；引用时不能当成"他比市场看空 5%"。

另外，META 个股层面本件没有 MS 的 EPS 估计，只有"约 +$10 的 2028 年 EPS（对基准 +30%）"，故 META 的"他 vs 我"在本份内**无法起步**，只能记缺口。

### 依据

- p.34｜Bear Growth</td><td rowspan="2">7,490</td><td rowspan="2">5,900</td><td rowspan="2">-21%</td><td rowspan="2">19.6x</td><td rowspan="2">19.0x</td><td>$299</td><td>$300</td><td>$311</td><td>$322</td><td>$356</td><td>$404</td><td>$428</td><td>$462</td></tr><tr><td>9%</td><td>0%</td><td>4%</td><td>7%</td><td>30%</td><td>13%</td><td>14%</td><td>14%</td>
- p.34｜Bull Growth</td><td rowspan="2">7,490</td><td rowspan="2">9,400</td><td rowspan="2">26%</td><td rowspan="2">19.6x</td><td rowspan="2">21.0x</td><td>$352</td><td>$416</td><td>$448</td><td>$480</td><td>$356</td><td>$404</td><td>$428</td><td>$462</td></tr><tr><td>28%</td><td>18%</td><td>17%</td><td>16%</td><td>30%</td><td>13%</td><td>14%</td><td>14%</td>
- p.24｜Consensus expects 28% 2026 EPS growth and 15% 2027 EPS growth.
- p.10｜aggregate could represent ~$10 of incremental '28 EPS (~30% upside to our base case).

## Q3 · 他的**财年是谁的财年**？

**日历年，且是标的指数的日历年，不是哪家公司的财年**——本件标的是 S&P 500 指数，指数没有财年，其 EPS 按日历年聚合。

列头证据：预测表分 `2026`、`2027`、`June 2028`、`2028` 四列，前两列与最后一列都是整年，第三列标到月份。利润率段用 `FY2026`、`FY2027`，即日历年结账。所以与日历年末的共识可以直接比，不需要换口径。

但这里有一个**必须点明的口径疑点**：目标价复算只在"June 2028"那一列对得上（见 Q6），而该列表头写的是 2028 年 6 月，与"未来 12 个月"的窗口（自 2026 年 8 月起算应落在 2027 年中）**相差约一年**。两种可能：一是该列实为"12 个月远期 EPS"而月份标错，二是表确实用了 2028 年中口径的超前 EPS。本件无文字解释，**按表读、不替他修正**，并把这一点登记为口径待核——凡引用"$404 是 2027 年还是 2028 年 EPS"的说法，都必须回到这列。

另有一处同期不平：capex 讨论、动量分析用周度/季度窗口（截至 7 月 31 日），盈利预测用年度窗口，两者不能混算"今年"。

### 依据

- p.34｜MS Next 12M P/E Target</td><td colspan="4">MS Top Down EPS Estimates</td><td colspan="4">Bottom Up Consensus EPS Estimates</td></tr><tr><td>2026</td><td>2027</td><td>June 2028</td><td>2028</td><td>2026</td><td>2027</td><td>June 2028</td><td>2028</td>
- p.25｜Realized (LTM) EBIT margins are at 19.4% today and are expected to be 20.4% for FY2026 and 22.1% for FY2027.
- p.23｜Consensus expects 10% 2026 Sales growth and 8% 2027 EPS growth

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

本件**没有旧值→新值的修正表**：无 old/new、无 prior/current、无 from X to Y，通篇也没有"上调/下调我们的估计"这类动作句。MS 的估计表本身就是单点，没有对照列。

能算作"修正信息"的只有两处，且都不是他改自己的模型：

1. **全市场修正广度**：S&P 500 的 FY2 盈利修正广度 **+16%**（绝对值强，但受季节性走弱）。
2. **MS 覆盖内的业绩后修正**：645 家公司已报，净修正 **+29%**，除公用事业（0%）外各行业 NTM EPS 均为正修正；行业层面净修正最高的是 Info. Tech. 56%、Energy 47%、Industrials 41%，最低是 Cons. Staples 3%、Cons. Disc. 9%。

分层判定：

- **假设层**：没改。EBIT 利润率路径（20.4%/22.1%）、EPS（339/380/429）、目标 P/E（20.5x）都只有一个值，没有"从多少改到"。
- **结论层**：有一处**并存两个点位**——正文说"年底 8,000"，预测表写"未来 12 个月目标 8,300"。两者口径不同（年底 vs 12 个月），不构成矛盾，但**本件没有说明 8,300 是否由 8,000 上调而来**，故只能记"仅方向、无幅度"，不替他补旧值。
- **结论**：本份不改假设，也不构成一次可量化的修正 ⇒ 对建模**不重要**；真正要跟的是他给的条件——若超大规模厂商在 capex 指引上转保守，会拖累 capex 受益股的修正广度。

### 依据

- p.21｜S&P 500 earnings revisions breadth (FY2 estimates) is strong in absolute terms at +16% but softened due to seasonal weakness.
- p.28｜Results: Results at +29% across MS Coverage. All sectors except Utilities (0%) have reported positive revisions to NTM EPS post earnings.
- p.31｜MS US Coverage</td><td>645</td><td>29%</td><td>4%</td><td>10%</td><td>43%</td><td>36%</td><td>7%</td><td>79%</td><td>3%</td><td>10%</td><td>21%</td><td>49%</td><td>18%</td></tr></table>
- p.1｜the setup should support greater index resilience, broader participation and 8,000 on the S&P by year-end, in our view.

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**给了三档**，而且是完整的点位 + 倍数 + EPS 三件套，可直接复算（全文少见的完整结构）。

| 情景 | 目标点位 | 距现价 | 目标 P/E | 12M 远期 EPS | 2028 EPS | EPS 增速路径 |
|---|---|---|---|---|---|---|
| Bear | 5,900 | −21% | 19.0x | $311 | $322 | 9% / 0% / 4% / 7% |
| Base | 8,300 | +11% | 20.5x | $404 | $429 | 23% / 12% / 13% / 13% |
| Bull | 9,400 | +26% | 21.0x | $448 | $480 | 28% / 18% / 17% / 16% |

现价 7,490、当前 P/E 19.6x（隐含 12M EPS 约 $382）。

**差别落在哪**——按乘法拆（Bear → Bull，点位 ×1.59）：

- EPS：311 → 448，**×1.44**；
- 目标 P/E：19.0 → 21.0，**×1.11**；
- 1.44 × 1.11 = 1.59，与点位倍数吻合。

⇒ **杠杆主要在 EPS（贡献约四分之三），倍数只挪 2 个 x**。这与他全篇的立论一致：他不靠"给更高倍数"看多，而靠盈利路径的修复；反过来说，**若 EPS 走 Bear 路径，靠倍数救不回来**——Bear 的倍数 19.0x 只比当前 19.6x 低 3%，点位却低 21%，几乎全由 EPS 差（−19% 对 2028 年）造成。

三档的触发假设，本件写得较散，可归成：Bear＝盈利增速掉到个位数（2026 +9%、2027 0%）且倍数压缩；Base＝中周期转换、质量因子占优、EPS 三年复合 13%；Bull＝AI 资本开支周期延续 + 利润率扩张（2028 年 EBIT 路径隐含 22% 以上）且倍数给到 21x。**没有一条给出明确的宏观触发阈值**（如收益率到多少、油价到多少），这是他情景框架的薄弱处——正文只说风险是"油价加速上行或长端收益率"，未与三档挂钩。

### 依据

- p.34｜Bear Growth</td><td rowspan="2">7,490</td><td rowspan="2">5,900</td><td rowspan="2">-21%</td><td rowspan="2">19.6x</td><td rowspan="2">19.0x</td><td>$299</td><td>$300</td><td>$311</td><td>$322</td><td>$356</td><td>$404</td><td>$428</td><td>$462</td></tr><tr><td>9%</td><td>0%</td><td>4%</td><td>7%</td><td>30%</td><td>13%</td><td>14%</td><td>14%</td>
- p.34｜Bull Growth</td><td rowspan="2">7,490</td><td rowspan="2">9,400</td><td rowspan="2">26%</td><td rowspan="2">19.6x</td><td rowspan="2">21.0x</td><td>$352</td><td>$416</td><td>$448</td><td>$480</td><td>$356</td><td>$404</td><td>$428</td><td>$462</td></tr><tr><td>28%</td><td>18%</td><td>17%</td><td>16%</td><td>30%</td><td>13%</td><td>14%</td><td>14%</td>
- p.34｜Exhibit 84: Morgan Stanley US Equity Strategy Forecast Table<table><tr><td rowspan="2"></td><td rowspan="2">Current Price</td><td rowspan="2">MS Next 12M Price Target</td>
- p.2｜Equity risks remain a clear acceleration in oil prices or long-end yields.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**只给一种方法：目标 P/E × 12 个月远期 EPS**。无 DCF、无 WACC、无永续增长、无 EV/EBITDA，也没有股息折现或 ERP 分解——对策略件来说这是标准做法，但对"能不能互证"这个问题，答案就是**无法互证**（单一方法不存在第二种口径）。

复算（用表内"June 2028"那一列 EPS × 目标 P/E）：

| 情景 | 公式 | 结果 | 表内点位 | 偏差 |
|---|---|---|---|---|
| Bear | 311 × 19.0 | 5,909 | 5,900 | +0.2% |
| Base | 404 × 20.5 | 8,282 | 8,300 | −0.2% |
| Bull | 448 × 21.0 | 9,408 | 9,400 | +0.1% |

三档全部吻合到 0.2% 以内 ⇒ **方法确认为"目标倍数 × 远期 EPS"，两个输入都落在表上，可复算**。当前价也可反推：7,490 ÷ 19.6 = $382，正是 2027 与 2028 EPS 之间的远期值。

两点必须登记的口径问题：

1. **表头与窗口错位**：列名是"June 2028"，但目标价标称"未来 12 个月"。若严格按 12 个月（2027 年中）取 EPS，则应用 2027 与 2028 之间的插值，而非 2028 年 6 月的 $404；本件未解释，**只能按表复算并注明是 2028 年中口径**。
2. **正文与表格两个点位**：正文反复说"年底 8,000"，表格给 12 个月 8,300。若 8,000 是年底、8,300 是 12 个月，两者相容；但本件没有把 8,000 纳入任何计算，也没有说明两者的倍数关系 ⇒ 引用时以表格为准，正文点位只作方向。

置信度评级：方法透明、可复算，**但单方法、无交叉验证，且目标倍数（19–21x）的选取理由没有给**——为什么中周期该给 20.5x 而不是 18x 或 23x，全篇只有"质量因子支撑"的定性话，没有历史分位或 ERP 对照。这是本件估值段最大的缺口。

### 依据

- p.34｜Exhibit 84: Morgan Stanley US Equity Strategy Forecast Table<table><tr><td rowspan="2"></td><td rowspan="2">Current Price</td><td rowspan="2">MS Next 12M Price Target</td><td rowspan="2">MS Next 12M Price Target % to Current</td><td rowspan="2">Current P/E</td><td rowspan="2">MS Next 12M P/E Target</td>
- p.34｜Base Growth</td><td rowspan="2">7,490</td><td rowspan="2">8,300</td><td rowspan="2">11%</td><td rowspan="2">19.6x</td><td rowspan="2">20.5x</td><td>$339</td><td>$380</td><td>$404</td><td>$429</td><td>$356</td><td>$404</td><td>$428</td><td>$462</td></tr><tr><td>23%</td><td>12%</td><td>13%</td><td>13%</td><td>30%</td><td>13%</td><td>14%</td><td>14%</td>
- p.34｜</table>Source: FactSet, Morgan Stanley Research.

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件逐条，**2.5 / 3**：

1. **方法（有）**：目标 P/E × 12 个月远期 EPS，三档可复算到 0.2% 以内（见 Q6）。但**目标倍数的选取理由缺失**——只给"质量因子、中周期"的定性话，无历史分位、无 ERP、无与当前 19.6x 的桥接推导。
2. **关键输入（有）**：目标 P/E 19.0/20.5/21.0x，远期 EPS $311/$404/$448，当前价 7,490、当前 P/E 19.6x，全部落在同一张表上，两个输入都不缺。
3. **风险列示（半件）**：正文有两句真风险——"油价加速上行或长端收益率"以及 FOMC 后长端利率"接近二十年高位"；但**没有一段把这些风险与目标点位挂钩**（哪条风险对应 Bear 档、触发阈值多少、对 EPS 或倍数各影响多少，全无）。而披露节明确写"与本报告任何建议、评级或目标价相关的估值方法与风险，请联系客户支持团队"——等于**把风险列示移出正文**。

所以按 2241(c)(1) 口径，第 3 件**未见随文提供的正式列示**，属形式不合规，须上报。但性质要写准：这是 MS 的**通行做法**（把个股级方法与风险放到"客户支持/披露网站"），不是遗漏；对使用者而言后果是一样的——**本件不可用于复算个股目标价，也没有可审计的风险量化**。

补一句本件的特殊之处：它是策略件，目标价挂的是指数而非个股，2241(c)(1) 的三件本应按个股口径要求；本件在指数层面给了方法与输入，这一点比多数策略周报完整。

### 依据

- p.38｜For valuation methodology and risks associated with any recommendation, rating or price target referenced in this research report, please contact the Client Support Team as follows: US/Canada +1 800 303-2495; Hong Kong +852 2848-5999; Latin America +1 718 754-5444 (U.S.); London +44 (0)20-7425-8169; Singapore +65 6834-6860; Sydney +61 (0)2-9770-1505; Tokyo +81 (0)3-6836-9000.
- p.32｜For valuation methodology and risks associated with any price targets referenced in this research report, please contact the Client Support Team as follows: US/Canada +1 800 303-2495; Hong Kong +852 2848-5999; Latin America +1 718 754-5444 (U.S.); London +44 (0)20-7425-8169; Singapore +65 6834-6860; Sydney +61 (0)2-9770-1505; Tokyo +81 (0)3-5424-4349.
- p.2｜Equity risks remain a clear acceleration in oil prices or long-end yields.
- p.2｜The latter rose more than expected post the FOMC meeting, reaching almost two decade highs.
- p.34｜Base Growth</td><td rowspan="2">7,490</td><td rowspan="2">8,300</td><td rowspan="2">11%</td><td rowspan="2">19.6x</td><td rowspan="2">20.5x</td><td>$339</td><td>$380</td><td>$404</td><td>$429</td><td>$356</td><td>$404</td><td>$428</td><td>$462</td></tr><tr><td>23%</td><td>12%</td><td>13%</td><td>13%</td><td>30%</td><td>13%</td><td>14%</td><td>14%</td>

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

**三件齐全**，且是机构级披露表（不是从报告里数股票条数聚合的）：

| 档位 | 覆盖家数 | 占比 | 其中投行客户 | 占该档比例 |
|---|---|---|---|---|
| Overweight/Buy | 1,529 | 42% | 442 | 29% |
| Equal-weight/Hold | 1,582 | 43% | 396 | 25% |
| Not-Rated/Hold | 3 | 0% | 1 | 33% |
| Underweight/Sell | 560 | 15% | 97 | 17% |
| 合计 | 3,674 | — | 936 | — |

- **观测时点**：as of July 31, 2026（发布日 8 月 3 日，距 7 月 31 日仅 3 天 ⇒ 用的是**刚过去的 7 月末**，不是上上季末）。
- **投行关系口径**：IBC = 过去 12 个月从 MS 取得投行报酬的公司，写在对表脚注里，不是"评级分布"表内的另一行标签。
- **另有第三列**：Other Material Investment Services Clients（MISC）——OW 43%、EW 44%、NR 0%、UW 12%，合计 1,741 家。

两点判读：其一，MS 明确声明**不发 Buy/Hold/Sell，只发相对评级**，表中 Buy/Hold/Sell 是为满足 FINRA 而做的对应，不能当绝对买卖建议读；其二，OW 档中投行客户占比 29%，高于 UW 档的 17%——**看多档与投行关系正相关**，这是评级分布里最值得记一笔的结构性事实（不是违规，但引用 OW 观点时应折价）。

### 依据

- p.39｜Global Stock Ratings Distribution
- p.39｜Overweight/Buy</td><td>1529</td><td>42%</td><td>442</td><td>47%</td><td>29%</td><td>750</td><td>43%</td></tr><tr><td>Equal-weight/Hold</td><td>1582</td><td>43%</td><td>396</td><td>42%</td><td>25%</td><td>773</td><td>44%</td></tr>
- p.39｜Underweight/Sell</td><td>560</td><td>15%</td><td>97</td><td>10%</td><td>17%</td><td>217</td><td>12%</td></tr><tr><td>Total</td><td>3,674</td><td></td><td>936</td><td></td><td></td><td>1741</td><td></td></tr></table>
- p.39｜Data include common stock and ADRs currently assigned ratings. Investment Banking Clients are companies from whom Morgan Stanley received investment banking compensation in the last 12 months.
- p.39｜Morgan Stanley does not assign ratings of Buy, Hold or Sell to the stocks we cover.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**未见图，只有一句转引声明**。全篇 42 页的图表都是策略图表（动量、修正广度、业绩记分卡、板块轮动、Fresh Money 名单表现），**没有任何一张"股价 + 目标价 + 评级"的时间序列图**，也没有赋评/改价日期表。

披露节给的是**指向外部网站的声明**："关于本报告所涉公司的股价图与评级历史，请见 MS 研究披露网站"。按判定口径：**声明有图、文本层无数据，判未见**——不能因为这句话就记"有"。

对本件的特殊性要说清：标的若按指数算，**指数没有评级、没有目标价历史**，本就不存在这张图；META 只在"AI 采用者筛选"里作为成分出现（标签 Enabler/Adopter，附最近价 547.59），本件**没有给 META 评级或目标价**，因此也无从画它的历史。

覆盖期间与变动条数：**均无法给出**（无图、无表、无日期）。

### 依据

- p.38｜For important disclosures, stock price charts and equity rating histories regarding companies that are the subject of this report, please see the Morgan Stanley Research Disclosure Website at www.morganstanley.com/eqr/disclosures/webapp/generalresearch, or contact your investment representative or Morgan Stanley Research at 1585 Broadway, (Attention: Research Management), New York, NY, 10036 USA.
- p.9｜META Meta Platforms Inc Class A Communication Services Media &amp; Entertainment Enabler/Adopter 547.59

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页以样板句指向披露节——"For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report." 逐项内容在披露节的 Important Regulatory Disclosures on Subject Companies 各段。逐项核对（**本文标的 META 在多数名单内**，这一点比"有/无"更重要）：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | **有（直指本标的）** | 披露节首段列名：Diane Ding, Ph.D. 持有 **Meta Platforms Inc**（普通股或优先股）；同段还列 Nicholas Lentini 持 Delta、Andrew B Pauker 持 Bank of America。四要素齐：谁（Diane Ding）· 何时（报告发布时）· 什么（META 普通股）· 原文如何说（"owns the following securities"） |
| ② 报酬是否挂钩投行收入 | 有（间接） | 报酬段：基于研究质量、客户反馈、选股、竞争、"firm revenues and overall investment banking revenues"，但紧接一句"不与投行或资本市场交易挂钩"。即**分子含投行总收入、分母不含单笔交易**，属间接关联，非直接挂钩 |
| ③ 近 12 个月主/副承销或收投行报酬 | **有，名单含 META** | 两段并列：主/副承销（或 144A）名单含 Meta Platforms Inc；收取投行服务报酬名单亦含 Meta Platforms Inc |
| ④ 未来 3 个月是否寻求投行费 | **有，名单含 META** | "In the next 3 months… expects to receive or intends to seek compensation for investment banking services"名单含 Meta Platforms Inc |
| ⑤ 近 12 个月非投行服务报酬 | **有，名单含 META** | "compensation for products and services other than investment banking services"名单含 Meta Platforms Inc |
| ⑥ 是否客户及服务类型 | **有，名单含 META** | 客户关系两类都列：投行客户关系名单含 Meta；非投行证券相关服务客户名单亦含 Meta（服务类型即"投行服务"与"非投行证券相关服务"两类） |
| ⑦ 实益持有该类普通股 ≥1% | **有，名单含 META** | "As of June 30, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies…"，META 在列。四要素齐：主体（MS 母公司）· 时点（2026-06-30）· 证券（一类普通股）· 比例（≥1%） |
| ⑧ 是否做市 | **有，但名单不含 META** | "Morgan Stanley & Co. LLC makes a market in the securities of…"共 26 家（Amplitude、BofA、Cardinal、Celanese、Cencora、Clearway、Cummins、Cushman、Grindr、Hinge、IDEXX、IFF、Kennametal、LifeStance、McKesson、Navient、Northrop、Perimeter、Red Rock、Sonida、Talen、Targa、TKO、Twilio、Westlake），**META 不在其中** ⇒ 本标的无做市声明 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见独立条目 | 认证段只说"未因表达特定建议而收取直接或间接报酬"，那是**报酬与观点**的切割，不是"过去 12 个月是否从 META 收酬"；全文无该项披露 ⇒ 判未见，不能拿认证段顶替 |
| ⑩ 其他重大冲突 | 有（不含 META） | 董事交叉：MS 员工/董事/顾问担任 Cencora、Cummins、eBay、Walmart 的董事，且声明此人非分析师 ⇒ **名单不含 META**；另有"可能持有标的债务证券"的通用句，主体与标的不同，不构成本项 |

**红旗提示**：MS 实益持有 META ≥1% 普通股 + 分析师 Diane Ding 本人/家庭持有 META + 近 12 个月为 META 主承销或副承销 + 已收投行费 + 未来 3 个月拟再寻求投行费 ⇒ 本件对 META 的任何正面表述（含"+$10 EPS、+30% 上行"）应按立场折价引用；另注意本件对 META **未给评级、未给目标价**，却给了最乐观的期权测算，这一组合本身值得记录。

### 依据

- p.1｜For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report.
- p.38｜The analyst or strategist (or a household member) identified below owns the following securities (or related derivatives): Diane Ding, Ph.D. - Meta Platforms Inc(common or preferred stock); Nicholas Lentini, CFA - Delta Air Lines, Inc.(common or preferred stock); Andrew B Pauker - Bank of America(common or preferred stock).
- p.38｜As of June 30, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research:
- p.38｜Marriott International Inc, McKesson Corporation, Meta Platforms Inc, Microsoft, MKS Inc., monday.com Ltd, Murphy Oil Corporation
- p.38｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Abbvie Inc., Alphabet Inc., Amazon.com Inc, American Tower Corp., Bank of America, Bank of New York Mellon, Blackstone Inc., Celanese Corp., Cencora Inc, CenterPoint Energy Inc, Cheniere Energy Inc, Clearway Energy Inc, Constellation Energy Corporation, CVS Health Corp, Delta Air Lines, Inc., eBay Inc, HawkEye 360 Inc, Heartflow, Inc., Marathon Petroleum Corp, Meta Platforms Inc, MKS Inc., Murphy Oil Corporation, Navan Inc, NextEra Energy Inc, Northern Oil & Gas Inc., Perimeter Solutions, Rocket Cos Inc, Talen Energy Corp, Targa Resources Corp., Via Transportation Inc, Vistra Corp, Walmart Inc, Wix.Com Ltd.
- p.39｜The equity research analysts or strategists principally responsible for the preparation of Morgan Stanley Research have received compensation based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues. Equity Research analysts' or strategists' compensation is not linked to investment banking or capital markets transactions performed by Morgan Stanley or the profitability or revenues of particular trading desks.
- p.39｜Morgan Stanley & Co. LLC makes a market in the securities of Amplitude Inc., Ardent Health Partners Inc, Bank of America, Cardinal Health Inc, Celanese Corp., Cencora Inc, Clearway Energy Inc, Cummins Inc, Cushman & Wakefield PLC, Grindr Inc., Hinge Health Inc, IDEXX Laboratories, Inc., International Flavors & Fragrances, Kennametal Inc., LifeStance Health Group, Inc., McKesson Corporation, Navient Corp, Northrop Grumman Corp., Perimeter Solutions, Red Rock Resorts Inc, Sonida Senior Living, Inc., Talen Energy Corp, Targa Resources Corp., TKO Group Holdings Inc, Twilio Inc, Westlake Corp.
- p.39｜An employee, director or consultant of Morgan Stanley is a director of Cencora Inc, Cummins Inc, eBay Inc, Walmart Inc. This person is not a research analyst or a member of a research analyst's household.

## Q11 · 他的**风险章**挂了数字吗？

**没有风险章，只有散在正文的方向句；属样板风险（不是缺口，但也没有可用的敏感度）**。共五条：

1. 油价加速上行（无阈值、无幅度）；
2. 长端收益率上行，FOMC 后"接近二十年高位"（有事实数字，无对点位的影响）；
3. 超大规模厂商 capex 指引转保守 ⇒ 拖累 capex 受益股的修正广度（无幅度）；
4. 动量因子仍在出清，"大型玩家退出组合"式的抛售可能重演（无幅度）；
5. 新任主席沟通风格未明 ⇒ 债市波动可能被迫升级（无幅度）。

**没有一条能写成"若 X 变 ⇒ 某年 EPS 或点位变 Y%"**，本件也没有 WACC、永续增长、目标倍数 ±1x 的敏感性表。

能自己补的只有两条，且必须标明是**按表复算**而非他给的：

- **倍数敏感度**：目标 P/E ±1x ⇒ 点位 ±404 点（404 × 1），相对 8,300 为 **±4.9%**；
- **EPS 敏感度**：远期 EPS ±1% ⇒ 点位 ±0.83%（线性）。

这两条虽能算，但**不足以替代风险章**：真正决定 Bear 档的风险（盈利增速掉到 0%）本件没有量化触发条件，也没有概率，故仍判样板风险。

### 依据

- p.2｜Equity risks remain a clear acceleration in oil prices or long-end yields.
- p.2｜The latter rose more than expected post the FOMC meeting, reaching almost two decade highs.
- p.1｜Whether this leads to a more conservative stance on capex guidance remains to be seen, but that risk is a potential overhang to revisions breadth for certain capex beneficiaries, in our view.
- p.1｜Momentum extended its decline through the first three days of last week, bottoming as a large player reportedly exited most of its public-equities portfolio—a typical endpoint for this kind of unwind.
- p.34｜Base Growth</td><td rowspan="2">7,490</td><td rowspan="2">8,300</td><td rowspan="2">11%</td><td rowspan="2">19.6x</td><td rowspan="2">20.5x</td><td>$339</td><td>$380</td><td>$404</td><td>$429</td><td>$356</td><td>$404</td><td>$428</td><td>$462</td></tr><tr><td>23%</td><td>12%</td><td>13%</td><td>13%</td><td>30%</td><td>13%</td><td>14%</td><td>14%</td>

## Q12 · 这份报告落在**静默期窗口**内吗？

**判"否"，但这一否定是"无发行事件可起算"，不是正面核实过时间线。**

- **发布时点**：2026 年 8 月 3 日 04:01 GMT（周一盘前），常规周度策略更新。
- **本件性质**：策略周报，讲指数点位与因子轮动，**不承销、不定价、不涉及任何证券发行**；全文无 IPO、无二次发行、无增发、无承销团名单、无定价日 ⇒ 10 日/3 日窗口无处起算。
- **但要留一层**：披露节确有"近 12 个月 MS 主/副承销（或 144A）META 证券"的名单，且"未来 3 个月拟寻求投行费"名单也含 META。**这两句都没有日期**，所以严格说：**存在承销关系、但无法据本件算出那次发行落在何时、是否在发布前 3 天内**。要正面判窗，须回 MS 的发行记录核定价日。
- **结论分两层**：作为一篇不涉及发行的策略周报，它不构成静默期违规（否）；作为"MS 与 META 存在近期承销关系"的事实，它成立，且与 Q10 的持仓、做市、收酬三条叠在一起，构成**立场折价的完整证据链**。

另注：本件对 META 无评级、无目标价，严格说不属于"承销商对标的发布研究"，静默期规则对它的约束力更弱——但这不改变"引用其 META 观点须折价"的结论。

### 依据

- p.1｜August 3, 2026 04:01 AM GMT
- p.1｜US Equity Strategy | North America
- p.38｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Abbvie Inc., Alphabet Inc., Amazon.com Inc, American Tower Corp., Bank of America, Bank of New York Mellon, Blackstone Inc., Celanese Corp., Cencora Inc, CenterPoint Energy Inc, Cheniere Energy Inc, Clearway Energy Inc, Constellation Energy Corporation, CVS Health Corp, Delta Air Lines, Inc., eBay Inc, HawkEye 360 Inc, Heartflow, Inc., Marathon Petroleum Corp, Meta Platforms Inc, MKS Inc., Murphy Oil Corporation, Navan Inc, NextEra Energy Inc, Northern Oil & Gas Inc., Perimeter Solutions, Rocket Cos Inc, Talen Energy Corp, Targa Resources Corp., Via Transportation Inc, Vistra Corp, Walmart Inc, Wix.Com Ltd.

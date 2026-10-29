## S03 · 激励池还剩多少？稀释到什么程度？

池子不是"再批 N 百万股"。材料没给一个固定新增股数（材料未给出此项：议案三一节与附录 A 第 2 条都只给结转公式），2025 计划生效日的授权池等于 2012 计划当时未授出的预留股，加上之后因作废而回流的股、因行权付价或代扣税而回收的股。

三件套第一件是余额：截至 2024 年 12 月 31 日，"股权激励计划下已授权证券表"列 482,623,871 股尚可供未来发行（股东已批准的计划一行；"未经股东批准的计划"一行三格全为 N/A，说明没有暗池）。第二件是在外：同行 122,632,145 股待发行，材料写明"除 RSU 外没有任何在外期权、认股权证或权利"，加权平均行权价一栏填 N/A（RSU 无行权价）。"没有期权"本身就是读数：本件不存在价内/价外期权，稀释只有"归属即发股"一条路，也不会有行权现金流入。第三件是基本股本：持股表脚注给 2,181,270,402 股 Class A 与 343,179,151 股 Class B，截至 2025 年 4 月 1 日，合计 2,524,449,553 股。

悬垂度（计算值，操作数照抄）：(122,632,145 + 482,623,871) ÷ (2,524,449,553 + 122,632,145 + 482,623,871) = 605,256,016 ÷ 3,129,705,569 = 19.34%。拆开看：在外 RSU 占完全稀释股本的 3.92%，未授池占 15.42%。分子是 2024 年末的数、分母的股本部分是 2025 年 4 月 1 日的数，所以 19.34% 属于跨日拼接的近似值。

每年自动增加额度单列一句：每年 1 月 1 日加注，基数是加注前一年 12 月 31 日已发行在外的 Class A 股数，额度取"该基数的 2.5%"与"董事会另定股数"二者之较低者，连续 10 年。以 2,181,270,402 股作代理基数，2.5% = 54,531,760 股（计算值），约当完全稀释股本的 1.74%；基数只算 Class A、不含 Zuckerberg 名下 3.43 亿股 Class B，所以年度加注额度会小于按全部股本计算的结果。

判断：19.3% 的存量悬垂叠加每年 1.7% 的自动加注，等于给股本装了一部每年自动上行的扶梯——每股指标要在股本自然膨胀的逆风里跑，若不用回购注销同等股数，收入与利润的增长有一部分会被股本摊掉。材料未给出任何回购抵消承诺，此项核不到。

### 依据

- p.1｜Equity compensation plans approved by security holders (2) 122,632,145 N/A 482,623,871
- p.1｜Other than RSUs, there were no outstanding options, warrants, or rights under our equity compensation plans as of December 31, 2024.
- p.1｜Applicable percentage ownership is based on 2,181,270,402 shares of Class A common stock and 343,179,151 shares of Class B common stock outstanding at April&#160;1, 2025.
- p.1｜Subject to adjustment (as described below), the number of common shares that may be subject to awards granted under the 2025 Plan as of the Effective Date will equal (i) any reserved shares not issued or subject to outstanding grants under the 2012 Plan on the Effective Date, plus (ii) shares that are subject to awards granted under the 2012 Plan that cease to be subject to such award by forfeiture or otherwise after the Effective Date
- p.1｜The number of shares available for grant and issuance under the 2025 Plan shall be increased on January 1, of each of the 10 calendar years during the term of the 2025 Plan following the Effective Date, by the lesser of (i) 2.5% of the number of shares of Class A common stock issued and outstanding on each December 31 immediately prior to the date of increase or (ii) such number of shares determined by the board.

## S10 · 持股指引 / 对冲与质押政策是怎么写的？

持股指引由董事会在 2018 年 9 月通过，分三档，每一档都是"股数与金额二者之较低者"，不是较高者：

- 高管：24,400 股 与 400 万美元等值股，二者之较低者；期限取"2023 年 9 月"与"成为高管满五年"之较晚者。
- 外部董事：4,570 股 与 75 万美元等值股，二者之较低者；期限取"2025 年 5 月"与"成为外部董事满五年"之较晚者。
- 2020 年 5 月已在任的外部董事沿用旧标准：3,050 股 与 50 万美元等值股，二者之较低者，期限同上。

"较低者"这个方向是关键：股价越高，400 万美元折出来的股数越少，指引自动变松，所以它不是"至少持 24,400 股"的硬地板。跌破了有约束但很轻：因股价下跌等不可控原因跌破的，在重新达标前只能卖出跌破之后所取得股份的 50%（公司代扣缴税的股份不计入）。截至 2024 年 12 月 31 日，全体高管与外部董事要么已达标、要么仍在允许的达标期内。

未归属 RSU 算不算进指引：材料未给出此项。持股指引一节只写"required to own"，没有定义计数口径；唯一相近的是持股表脚注把"60 天内可释放的 RSU"计入实益持股，但那是持股表的口径，不能当指引的达标口径用。所以"高管是否靠未归属 RSU 达标"在本件核不出来。

对冲是硬禁止：期货与衍生品、交易所期权、看跌与看涨、领口、远期售股合约、股权互换、交易所基金，以及任何用以对冲或抵消证券市值下跌的安排，一并禁止；另禁做空、禁以保证金账户持有。这一条没有"经批准可例外"的尾巴。

质押不是禁止，是"除经薪酬、提名与治理委员会另行批准外"禁止，原话是 "and pledging our securities as collateral for loans unless otherwise approved by our compensation, nominating & governance committee"。这是弱约束：委员会可一案一批，而且已经批了一例——把"禁"写进政策、把口子留给委员会，实际约束力取决于委员会。

Zuckerberg 的质押安排单独一句：董事会与委员会批准了一个框架，两道阀门——质押股数不超过其实益持有普通股的 20%，以质押股担保的借款总额不超过借款时其持有普通股公允市值的 5%；实际已质押 12,000,000 股 Class B，约占其实益持股 3.5%、总在外股本 0.5%、总投票权 2.1%（2025 年 4 月 1 日）。制度上写"禁"、执行上给控制性股东开了带阀门的例外，是本件治理条款里最实质的一处松绑。

### 依据

- p.1｜Under these guidelines, our executive officers are required to own the lesser of (x) 24,400 shares and (y) shares with an equivalent value of $4.0 million by the later of (i) September 2023 or (ii) five years from becoming an executive officer
- p.1｜and our non-employee directors are required to own the lesser of (x) 4,570 shares and (y) shares with an equivalent value of $750,000 by the later of (i) May 2025 or (ii) five years from becoming a non-employee director; provided, that non-employee directors who were serving as of May 2020 continue to be subject to the prior minimum stock ownership guidelines and are required to own the lesser of (x) 3,050 shares and (y) shares with an equivalent value of $500,000 by the later of (i) September 2023 or (ii) five years from becoming a non-employee director.
- p.1｜The stock ownership guidelines also provide that if an executive officer or director&#8217;s stock ownership falls below the target ownership levels described above due to circumstances beyond his or her control (such as significant declines in our stock price), he or she will be limited to selling no more than 50% of shares acquired by him or her following the time that his or her stock ownership dropped below the target ownership levels
- p.1｜Our policies prohibit the following transactions: trading in futures and derivative securities and engaging in hedging activities relating to our securities, including exchange traded options, puts, calls, collars, forward sale contracts, equity swaps, exchange funds, or other arrangements or instruments designed to hedge or offset decreases in the market value of our securities; engaging in short sales of our securities; holding our securities in margin accounts;
- p.1｜and pledging our securities as collateral for loans unless otherwise approved by our compensation, nominating & governance committee. The compensation, nominating & governance committee and our board of directors have approved a framework for a pledging arrangement by Mark Zuckerberg that is designed to mitigate the risk of a forced stock sale. Under the terms of the arrangement, (i) the total number of shares of our common stock pledged must not exceed 20% of the total number of shares of our common stock beneficially owned by Mr. Zuckerberg, and (ii) the aggregate loan amount collateralized by such pledged shares must not exceed 5% of the fair market value of the total number of shares of our common stock beneficially owned by Mr. Zuckerberg at the time of any borrowing.
- p.1｜Mr. Zuckerberg has pledged 12,000,000 shares of Class B common stock, representing approximately 3.5% of the total shares beneficially owned by Mr. Zuckerberg and 0.5% of the total outstanding shares of our common stock, and approximately 2.1% of the total voting power of the outstanding shares of our common stock, in each case as of April&#160;1, 2025.

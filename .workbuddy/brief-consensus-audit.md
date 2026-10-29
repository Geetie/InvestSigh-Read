# 复核作业书 · 共识与评级档位（2026-10-28）

> 你是**复核员**，不是写作者。你的输出是数据，不是散文。
> 对象是 18 份 Morgan Stanley 研报，每份的第 N 页有一块「Risk Reward」面板，
> 面板里有两件东西：**Consensus Price Target Distribution**（一致目标价分布图，来源 Refinitiv）
> 与 **Consensus Rating Distribution**（一致评级分布饼图，来源 Refinitiv）。

## 0. 为什么现在能读到这些数

`pages.json` 原先是 MinerU 的产物，它把这块图当图片，只留了标题，把图里的文字
（`87% Overweight` / `$616.00` / `$1,086.00` 等）整段丢了。
今天用 `tools/recover-pdf-layer.py` 把 PDF 矢量层的这段文字补回了 `pages.json` 的 `text` 末尾。
**补回来的那段在原 text 之后**，所以：面板读数在 `text` 的**末尾**，而不是在标题下面。

## 1. 你要交什么（每人 4–5 份，逐份一段 JSON）

```json
{
  "id": "<材料 id>",
  "panelPage": 13,
  "rating": {                      // Consensus Rating Distribution
    "overweight": "87%",           // 原样，带 %
    "equalWeight": "12%",
    "underweight": "1%",
    "verbatim": ["87% Overweight", "12% Equal-weight", "1%", "Underweight"]
  },
  "pt": {                          // Consensus Price Target Distribution
    "ends": ["$616.00", "$1,086.00"],   // 图上标出的两个端点，按出现顺序
    "labels": "这两个数各是什么（轴端/最高/最低/均值标注）—— 看不出来就写「未标注」",
    "mean": "$861.07 或 null",          // 若出现 Mean 标注，给它的值
    "msPT": "$820.00 或 null",          // 同页 MS 自己的目标价（标注 MS PT 的那个）
    "msRating": "OVERWEIGHT 或 null"
  },
  "asOf": "该页有没有出现 as of 之类的时间锚（有就原样抄，没有写 null）",
  "surprise": "与我给的数不一致、或你觉得像陷阱的地方；没有写 null"
}
```

**纪律**
- 逐字抄：`87% Overweight` 就写 `87% Overweight`，不要写「87% 增持」。
- 只认 `pages.json` 的 `text`，不许从 PDF 另行 OCR、不许推断。
- 读不出来就写 `null`，**不要填一个好看的值**。`null` 是有用信息，编的数会毁掉整条台账。
- 一页里若出现**多个股票**的面板（有的页脚还带别的公司），只取 **Meta Platforms** 那块。

## 2. 怎么读

```bash
cd /d/InvestSigh/InvestSigh-Read
node -e "
const fs=require('fs');const id='<材料 id>';
const p=JSON.parse(fs.readFileSync('corpus/materials/'+id+'/pages.json','utf8'));
const g=p.pages.find(x=>x.n===<面板页>);
console.log(g.text.slice(-1400));
"
```

面板页号我已给出（见派给你的清单）。看 `text` 的**末尾 1400 字符**即可。
若末尾没看到面板读数，再整页读一遍——别只看开头就下结论。

## 3. 你不需要做的事

- 不写 material.md、不改任何文件（**只读**）。
- 不评价这家机构的评级好不好、目标价高不高。
- 不合并多份材料、不算占比、不做平均。你只负责「这一页上写了什么」。

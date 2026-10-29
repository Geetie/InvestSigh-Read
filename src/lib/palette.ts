/**
 * 七类的「印刷墨色」—— 只作分类索引，不作装饰。
 *
 * 用色纪律（写死在设计规范里）：
 *  · 墨色只出现在三处：左栏 6px 方块 / 上横栏 1px 底线 / 卡片左缘 3px 条
 *  · 选中态永远是 accent 红，与墨色解耦 —— 红是「交互位」，墨是「分类位」
 *  · 墨色不做文字色以外的填充，不做渐变，不做发光
 *
 * 对比度均以白底 #FFFFFF 计算，全部 ≥ 7.3:1（AA 正文达标）。
 */
export interface CatInk {
  ink: string;
  pale: string;
}

export const CAT_INK: Record<string, CatInk> = {
  "01": { ink: "#14556B", pale: "#E7EFF1" }, // 监管一手披露 8.3
  "02": { ink: "#0C5C4A", pale: "#E6EFEC" }, // 业绩与沟通 7.9
  "03": { ink: "#4A3C8C", pale: "#EBE8F3" }, // 卖方与共识 9.1
  "04": { ink: "#7A4B0F", pale: "#F3EDE3" }, // 资金与持仓 7.4
  "05": { ink: "#1F4E79", pale: "#E7EDF2" }, // 产业链与另类 8.7
  "06": { ink: "#8A2B22", pale: "#F4E9E7" }, // 宏观与政策 8.6
  "07": { ink: "#6A2350", pale: "#F1E8ED" }, // 情绪与预期 10.7
};

export const catInk = (id: string): CatInk => CAT_INK[id] ?? CAT_INK["01"];

/* ============================================================
   文本块高亮 —— 用于「把答案分段」，不是逐词标词性。

   色板取 Radix Colors（专为 UI 设计的 12 阶色板）：
   底色用 step-4（UI 元素背景，白底上够区分又不刺眼），
   标记条用 step-9（实色，做行首短杠）。
   字始终是 ink-900，颜色只承担「这一段是什么」的分隔功能。
   ============================================================ */

export type HlTone = "conclusion" | "metric" | "hedge";

export interface HlStyle {
  /** 分隔底色 */
  bg: string;
  /** 行首短杠 */
  bar: string;
  label: string;
}

export const HL: Record<HlTone, HlStyle> = {
  // Radix amber 4 / amber 9 —— 判断句
  conclusion: { bg: "#ffecbc", bar: "#ffb224", label: "结论" },
  // Radix blue 4 / blue 9 —— 量化
  metric: { bg: "#e1f0ff", bar: "#0090ff", label: "数据" },
  // Radix orange 4 / orange 9 —— 限定与存疑
  hedge: { bg: "#ffe8d7", bar: "#f76808", label: "限定" },
};

export const HL_ORDER: HlTone[] = ["conclusion", "metric", "hedge"];

/** 页码芯片（不是高亮档，是出处标记） */
export const CITE_CHIP = { bg: "#f3f3f3", ink: "#3d3d3d" };

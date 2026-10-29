/** 内置读法底稿：按行类型给一句默认约束（与前端 prompts.local.ts 一致） */
export const DEFAULT_READING = {
  question: "只读材料明确写出的判断：谁在什么时点说了什么，句末带页码；材料没说的不补、不推论。",
  data: "只抄材料给出的数字，连同口径、单位、财年；没给这一项就留空，不要估算。",
};

/** 类 / 型的展示用色（前端自己有一份，这里只用 main 之外的场合） */
export const BASELINE = "2000-01-01";

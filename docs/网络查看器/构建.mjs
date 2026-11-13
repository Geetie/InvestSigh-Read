// 构建交互版网络查看器：node docs/网络查看器/构建.mjs
// 修改指引：
//   加/删节点或边 → 改 数据.json（布局由 cytoscape-dagre 插件自动重算，无需手改坐标）
//   改配色/样式/交互 → 改 模板.html（G6 默认调色板规范，见模板 style 段）
//   本脚本只负责把数据＋三库（base64 内嵌，零网络依赖）注入模板，产出单文件 HTML。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(dir, "../通用探测器网络_交互版.html");

const { NODES, EDGES, NUTRIENT } = JSON.parse(fs.readFileSync(path.join(dir, "数据.json"), "utf-8"));
const tpl = fs.readFileSync(path.join(dir, "模板.html"), "utf-8");

// 三个库以 base64 data URI 内嵌：base64 无 HTML 特殊字符，不会截断 script 标签
const b64 = (f) => fs.readFileSync(path.join(dir, "lib", f)).toString("base64");
const libs = ["dagre.min.js", "cytoscape.min.js", "cytoscape-dagre.js"]
  .map((f) => `<script src="data:text/javascript;base64,${b64(f)}"></script>`)
  .join("\n");

const html = tpl
  .replace("__LIBS__", libs + `\n<script>if(typeof cytoscape==="undefined"){document.getElementById("detail").textContent="库加载失败";}</script>`)
  .replace("__DATA_NODES__", JSON.stringify(NODES))
  .replace("__DATA_EDGES__", JSON.stringify(EDGES))
  .replace("__DATA_NUTRIENT__", JSON.stringify(NUTRIENT));

if (html.includes("__DATA_") || html.includes("__LIBS__")) throw new Error("模板占位符未全部替换");
if (/fontStyle:\{enums/.test(html)) throw new Error("检测到明文库源码（base64 编码失败）");

fs.writeFileSync(out, html);
console.log(`已生成 ${out}（${NODES.length + 1} 节点 / ${EDGES.length + 17} 边 / ${(html.length / 1024).toFixed(0)}KB）`);

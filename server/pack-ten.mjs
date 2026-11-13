// 十型测试包打包脚本：每型一个独立子包（0-提示词/1-投喂材料/2-kit清单/3-产出/README），汇总一个总 ZIP
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
const R = "/Users/leilabot/InvestSigh-Read";
const OUT = path.join(R, "十型重跑包_新规范_2026-11-08");
const M = path.join(R, "corpus/materials");
const PR = path.join(R, "corpus/prompts");
const TP = path.join(R, "corpus/templates");

const SPEC = [
  {
    no: "01", name: "01-10-K-年报", id: "01-10-K-2026-01-29-meta20251231",
    booklet: "01-型/10-K.md", tpl: "01-10-K 年报.md",
    main: "01-10-K-2026-01-29-meta20251231",
    mates: [["配套-上年10K口径基线", "01-10-K-2025-01-30-meta20241231"]],
    ledger: false,
    src: "EDGAR 0001628280-26-003942（2026-01-29 提交，2.37MB htm→16 页/545K 字符）",
    result: "15/15 全答，78 条依据；check ✓ 守卫 0",
  },
  {
    no: "02", name: "01-10-Q-季报", id: "01-10-Q-2026-10-22-meta20260930",
    booklet: "01-型/10-Q.md", tpl: "01-10-Q 季报.md",
    main: "01-10-Q-2026-10-22-meta20260930",
    mates: [["配套-上季10Q口径基线", "01-10-Q-2026-07-30-meta20260630"]],
    ledger: false,
    src: "EDGAR 0001628280-26-066773（2026-10-22 提交，1.83MB htm→14 页/444K 字符）",
    result: "12/12 全答，53 条依据；check ✓ 守卫 0",
  },
  {
    no: "03", name: "01-8K与EX991-业绩件", id: "01-8-K与EX-99.1-2026-04-29-meta20260429",
    booklet: "01-型/8-K与EX-99.1.md", tpl: "01-8-K 与 EX-99.1 业绩件.md",
    main: "01-8-K与EX-99.1-2026-04-29-meta20260429",
    mates: [["配套-同类跨型上年10K分部回购基线", "01-10-K-2026-01-29-meta20251231"],
            ["配套-上季同型业绩稿-上季指引来源", "01-8-K与EX-99.1-2026-01-28-meta20260128"]],
    ledger: true,
    src: "EDGAR 0001628280-26-028364（2026-04-29，主文档+EX-99.1 全文+图→4 逻辑页）",
    result: "10/10 全答，61 条依据；check ✓ 守卫 0；账本 2025Q3 行算术矛盾被卡面如实标注",
  },
  {
    no: "04", name: "04-内部人申报-Form4", id: "01-内部人申报-2026-11-06-meta-form4-zuckerberg",
    booklet: "04-型/内部人申报.md", tpl: "04-内部人申报.md",
    main: "01-内部人申报-2026-11-06-meta-form4-zuckerberg",
    mates: [],
    ledger: false,
    src: "EDGAR 0000950103-26-017123（Zuckerberg Form 4，2026-11-06 提交，ownership.xml 25KB→1 页）",
    result: "5/9 答＋4 题空格死命令（跨期/行情/薪酬缺口），41 条依据；check ✓；code J＋脚注 F3＝遗产规划转让，纠'卖出'误读",
  },
  {
    no: "05", name: "04-机构持仓申报-13GA", id: "01-机构持仓申报-2026-08-06-blackrock13ga",
    booklet: "04-型/机构持仓申报.md", tpl: "04-机构持仓申报.md",
    main: "01-机构持仓申报-2026-08-06-blackrock13ga",
    mates: [["配套-跨类01流通股分母", "01-10-Q-2026-07-30-meta20260630"]],
    ledger: false,
    src: "EDGAR 0000315066-26-002069（SCHEDULE 13G/A 第 6 号修正，primary_doc.xml＋exhibit99→1 页；申报人原文 FMR LLC 富达系——agent 按原文登记纠我预设错误）",
    result: "5/7 答＋2 题空格死命令，24 条依据；check ✓ 守卫 0",
  },
  {
    no: "06", name: "03-投行研报-三态归位首测", id: "03-broker-research-2026-07-27-GLOBAL202607270630",
    booklet: "03-型/投行研报.md", tpl: "03-投行研报.md",
    main: "03-broker-research-2026-07-27-GLOBAL202607270630",
    mates: [["配套-印证基石02公司口径", "02-company-voice-2026-07-29-meta-20260729"],
            ["配套-印证基石01法定披露", "01-10-Q-2026-07-30-meta20260630"]],
    mainBooklet: "03-卖方与共识.md",
    ledger: true,
    src: "库内真材料（Morgan Stanley Global Thematics，2026-07-27，118 页/390K 字符）",
    result: "13/15 答＋2 删（同机构上版/我方假设账缺口），65 依据；check ✓ 守卫 0；Q15 三态归位：复述 1/加工 6/冲突未见，红灯（Blackwell 毛利同报告两处不一致、MS 持 Meta≥1% 立场）",
  },
  {
    no: "07", name: "02-别人的解读", id: "02-third-party-2026-11-06-bc43de8f04",
    booklet: "02-型/别人的解读.md", tpl: "02-别人的解读.md",
    main: "02-third-party-2026-11-06-bc43de8f04",
    mates: [],
    ledger: false,
    src: "库内真材料（tikr.com 转述 Ackman 观点，2026-11-06，2 页）",
    result: "6/10 答＋4 删（无模型/无我方账），22 条依据；check ✓ 守卫 0；形态定性'闪评/只有结论'只当情绪旁证",
  },
  {
    no: "08", name: "07-预测市场-Polymarket", id: "07-预测市场-2026-11-08-meta-polymarket-218952",
    booklet: "07-型/预测市场与事件概率.md", tpl: "07-预测市场与事件概率.md",
    main: "07-预测市场-2026-11-08-meta-polymarket-218952",
    mates: [],
    ledger: false,
    src: "Polymarket gamma-api /events/218952 真抓（Meta close-above 系列 5 子市场，已结算，快照 9.8K 字符）",
    result: "3/9 答＋6 删（E 档全缺），22 条依据；check ✓ 守卫 0；结算规则照抄原句＋人话翻译，收盘区间反推亮算法",
  },
  {
    no: "09", name: "04-做空-三态登记", id: "04-做空与期权读数-2026-11-08-meta-finra-probe",
    booklet: "04-型/做空与期权读数.md", tpl: "04-做空与期权读数.md",
    main: "04-做空与期权读数-2026-11-08-meta-finra-probe",
    mates: [],
    ledger: false,
    src: "FINRA API 源探查回执（equity 组 401 认证墙原文＋OTC 匿名 200＋META 0 行命中，1 页）——'无源型三态登记'设计首测",
    result: "2/7 答＋5 删（无读数即空），9 条依据；check ✓ 守卫 0；Q1 三态：有源未接通/尚未接入/尚未接入",
  },
  {
    no: "10", name: "02-公司自己的话-追问会", id: "02-company-voice-2026-04-30-METAQ12026followupcall会议记录",
    booklet: "02-型/公司自己的话.md", tpl: "02-公司自己的话.md",
    main: "02-company-voice-2026-04-30-METAQ12026followupcall会议记录",
    mates: [["配套-同日新闻稿EX991", "01-8-K与EX-99.1-2026-04-29-meta20260429"],
            ["配套-上季同型", "02-company-voice-2026-01-28-METAQ42025EarningsCallTran"],
            ["配套-上上季同型", "02-company-voice-2025-10-29-METAQ32025EarningsCallTran"],
            ["配套-同日10Q", "01-10-Q-2026-04-30-meta20260331"]],
    ledger: true,
    src: "Meta IR 英文原件 Follow-Up-Call-Transcript.pdf（q4cdn 直链下载，104KB/10 页）",
    result: "12/12 全答（问句表 12 题版），33 条依据；check ✓ 守卫 0；算力主角 3 人追问、Meta AI 4 人零基数、兑现查账一贯保守、四样消失全中",
  },
];

function cp(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}
function cpDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    const s = path.join(src, f);
    if (fs.statSync(s).isFile()) fs.copyFileSync(s, path.join(dest, f));
  }
}
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
for (const s of SPEC) {
  const pkg = path.join(OUT, s.no + "-" + s.name);
  // 0-提示词
  cp(path.join(PR, "写法规范.md"), path.join(pkg, "0-提示词/写法规范.md"));
  cp(path.join(PR, "RUN-PARALLEL.md"), path.join(pkg, "0-提示词/RUN-PARALLEL.md"));
  if (s.mainBooklet) cp(path.join(PR, s.mainBooklet), path.join(pkg, "0-提示词/类主件-" + s.mainBooklet));
  cp(path.join(PR, s.booklet), path.join(pkg, "0-提示词/型问句表-" + path.basename(s.booklet)));
  cp(path.join(TP, s.tpl), path.join(pkg, "0-提示词/卡片模板-" + s.tpl));
  // 1-投喂材料
  cpDir(path.join(M, s.main), path.join(pkg, "1-投喂材料/主材料-" + s.main));
  for (const [label, id] of s.mates) cpDir(path.join(M, id), path.join(pkg, "1-投喂材料/" + label + "-" + id));
  if (s.ledger) cp(path.join(R, "output/meta/_ledger-guidance.md"), path.join(pkg, "1-投喂材料/账本-_ledger-guidance.md"));
  // 2-kit 清单
  const kit = path.join(R, "runs/kits", s.id + ".json");
  if (fs.existsSync(kit)) cp(kit, path.join(pkg, "2-kit清单/" + s.id + ".json"));
  // 3-产出
  cp(path.join(R, "output/meta", s.id, "material.md"), path.join(pkg, "3-产出/material.md"));
  // README
  const readme = [
    `# ${s.no} · ${s.name}`,
    "",
    `- **型**：${s.booklet.replace("0X-型/", "").replace(/^0\\d-型\//, "")}（问句表与模板见 0-提示词/）`,
    `- **主材料**：${s.id}`,
    `- **来源**：${s.src}`,
    `- **kit 配套**：${s.mates.length ? s.mates.map(([l, i]) => l + "＝" + i).join("；") : "无（kit 缺口如实登记）"}${s.ledger ? "；指引账 _ledger-guidance.md" : ""}`,
    `- **产出**：3-产出/material.md —— ${s.result}`,
    "",
    "## 复跑方法",
    "",
    "```",
    `# 1. 物化：主材料目录已含 content.md/pages.json/meta.json（本包 1-投喂材料/主材料-*/）`,
    `#    复制到 <repo>/corpus/materials/${s.id}/`,
    `# 2. 组装：node server/kit.mjs ${s.id} --ticker ${s.no === "04" || s.no === "09" ? "meta" : "meta"}`,
    `# 3. 填卡：按 0-提示词/ 的四份文件约束 agent，白名单＝主材料＋kit 配套＋账本`,
    `# 4. 验收：node server/check.mjs <标的>/<材料id>`,
    "```",
    "",
    "agent 白名单纪律：只读本包 0-提示词 与 1-投喂材料；禁读其他卡、docs/、git、联网。",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(pkg, "README.md"), readme);
}
// 总 README
const totalReadme = [
  "# 十型重跑包 · 新规范版 · 总说明（2026-11-08）",
  "",
  "十个子目录＝十个型，各自独立可复现，结构统一：",
  "- `0-提示词/`——写法规范（唯一真源）＋RUN-PARALLEL＋（03 型多一份类主件）＋型问句表＋卡片模板",
  "- `1-投喂材料/`——主材料＋kit 配套（目录名前缀标明解析角色）＋（涉及指引兑现的型含 _ledger-guidance.md）",
  "- `2- kit清单/`——kit.mjs 解析产出的机器白名单（含 source_fingerprint）",
  "- `3-产出/`——干净上下文 agent 填出的卡（唯一产物）",
  "- `README.md`——本型来源、结果、复跑命令",
  "",
  "## 十型清单",
  "",
  ...SPEC.map(s => `| ${s.no} | ${s.name} | ${s.id.slice(0, 40)}… | ${s.result.split("；")[0]} |`),
  "",
  "## 共同纪律",
  "",
  "- 全部 agent 为干净上下文：白名单＝写法规范＋RUN-PARALLEL＋问句表＋模板＋主材料＋kit 配套（＋账本）；禁读 output 其他卡、docs/、git、联网。",
  "- 空格死命令全程执行：四批真实缺料场景（Form 4 删 4 题、13G 删 2 题、预测市场删 5 题、做空删 5 题）零'未给/未见'字样。",
  "- 验收：check.mjs（依据逐字＋框架词守卫）十卡全过；stale 434 全 OK。",
  "- 覆盖：七类中十型（01×3、02×2、03×1、04×3、07×1）。",
  "- **本包为新规范重跑版**：写法规范已重写为人话版（41 个规则点对照旧版零缺失）；旧版产出（run1）已归档至项目外 ~/InvestSigh-Archive/ten-type-run1-20261108/，本包产出全部为干净上下文 agent 在新规范下的重跑结果。",
  "- 语义违例对比：上一轮 17 处（流程语泄漏/翻译冒充引语/使用指令）→ 本轮 4 处（已修）；引文机械病（外层引号/页码体系/实体差异）由 check.mjs 全部拦截并修复。",
].join("\n");
fs.writeFileSync(path.join(OUT, "README.md"), totalReadme);
console.log("打包目录完成，zip 中…");
execSync(`cd "${R}" && zip -qr "十型重跑包_新规范_2026-11-08.zip" "十型重跑包_新规范_2026-11-08" -x "*.DS_Store" && rm -rf "十型全流程测试包_2026-11-08"`, { stdio: "inherit" });
const sz = fs.statSync(path.join(R, "十型重跑包_新规范_2026-11-08.zip")).size;
console.log(`ZIP 完成: ${(sz / 1024 / 1024).toFixed(2)} MB`);

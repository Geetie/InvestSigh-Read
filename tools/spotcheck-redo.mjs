import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter, parseSections } from "../server/parse-md.mjs";

/* 与 validate.mjs 同一归一化：去空白、弯引号转直引号 */
const norm = (s) =>
  String(s).replace(/\s+/g, "").replace(/[“”„‟"＂]/g, '"').replace(/[‘’]/g, "'");

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const list = fs.readFileSync("/tmp/stale-list.txt", "utf8").trim().split("\n").map((l) => l.split(/\s+/));

const violations = [];
let evTotal = 0, evFail = 0, emptyRows = 0, ansRows = 0;

for (const [t, id] of list) {
  const f = path.join(ROOT, "output", t, id, "material.md");
  const src = fs.readFileSync(f, "utf8");
  const { meta, body } = parseFrontmatter(src);

  if (!meta.title || /^<.*>$/.test(meta.title)) violations.push(`${t}/${id}: title 未填或占位`);
  if (!meta.kind || /^<.*>$/.test(meta.kind)) violations.push(`${t}/${id}: kind 未填`);
  if (!meta.source_pages || /^<.*>$/.test(meta.source_pages)) violations.push(`${t}/${id}: source_pages 未填`);

  const content = fs.readFileSync(path.join(ROOT, "corpus", "materials", id, "content.md"), "utf8");
  const nContent = norm(content);

  for (const s of parseSections(body)) {
    if ((s.answer ?? "").trim()) {
      ansRows++;
      if (!(s.blocks ?? []).length) violations.push(`${t}/${id} [${s.id}]: 有答案但依据区为空`);
    } else {
      emptyRows++;
    }
    for (const b of s.blocks ?? []) {
      evTotal++;
      if (!nContent.includes(norm(b.quote))) {
        evFail++;
        violations.push(`${t}/${id} [${s.id}] p.${b.page}: content.md 搜不到「${b.quote.slice(0, 40)}…」`);
      }
    }
  }
}

console.log(`材料 ${list.length} 份 · 有答案行 ${ansRows} · 空行 ${emptyRows} · 依据块 ${evTotal} · content.md 搜不到 ${evFail}`);
console.log(violations.length ? "\n违规清单：\n" + violations.join("\n") : "抽验通过");

import fs from "node:fs";
import path from "node:path";
import { PATHS, listTickerDirs } from "../server/store.mjs";
import { readPromptSet } from "../server/promptsource.mjs";

for (const t of listTickerDirs()) {
  const dir = path.join(PATHS.output, t);
  for (const id of fs.readdirSync(dir)) {
    const f = path.join(dir, id, "material.md");
    if (!fs.existsSync(f)) continue;
    const src = fs.readFileSync(f, "utf8");
    const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(src)?.[1] ?? "";
    const sub = /^sub:\s*"?([\w-]+)/m.exec(fm)?.[1];
    if (!sub) continue;
    let rows;
    try { rows = readPromptSet(sub)?.rows ?? []; } catch { continue; }
    if (!rows.length) continue;
    const heads = new Set(
      [...src.matchAll(/^## ([^\n#]+)/gm)].map((m) => m[1].trim().split(/[\s·:：-]+/)[0]),
    );
    if (!rows.some((r) => heads.has(r.id))) console.log(t, id, sub);
  }
}

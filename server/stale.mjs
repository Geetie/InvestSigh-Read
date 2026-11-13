#!/usr/bin/env node
// stale.mjs —— 材料指纹/时间 vs 卡：过期检测（跨材料聚合重构·第二步）
//
// 用法：
//   node server/stale.mjs [标的] [--json] [--init]
// 逻辑：
//   对 output/<标的>/<材料id>/material.md 逐张卡：
//     fingerprint = sha256(content.md + "\n" + pages.json)   （材料当前内容）
//     卡记录了 source_fingerprint 且与当前不符      → STALE(指纹不符)
//     未记录指纹，但材料 mtime 晚于卡 mtime（容差 2s）→ STALE(材料晚于卡)
//     材料目录缺失                                   → MISSING
//     其余                                           → OK
//   --init：把当前指纹写进每张卡的 frontmatter（source_fingerprint: ...），作为基准
import fs from "fs";
import path from "path";
import crypto from "crypto";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2);
const json = args.includes("--json");
const init = args.includes("--init");
const tickerFilter = args.find(a => !a.startsWith("--"));

const MAT = path.join(ROOT, "corpus/materials");
const OUT = path.join(ROOT, "output");

function sha(t) { return crypto.createHash("sha256").update(t).digest("hex").slice(0, 16); }
function mtime(p) { try { return fs.statSync(p).mtimeMs; } catch { return 0; } }

function materialState(id) {
  const dir = path.join(MAT, id);
  if (!fs.existsSync(dir)) return null;
  const c = path.join(dir, "content.md"), p = path.join(dir, "pages.json"), m = path.join(dir, "meta.json"), s = path.join(dir, "source.htm");
  let fp = null;
  if (fs.existsSync(c) && fs.existsSync(p)) fp = sha(fs.readFileSync(c, "utf8") + "\n" + fs.readFileSync(p, "utf8"));
  const mt = Math.max(mtime(c), mtime(p), mtime(m), mtime(s));
  // HTML 实体守卫：pages.json 里残留 `&#123;` ⇒ 物化层漏解码（2026-11-08 事故的永久哨兵）
  let ent = 0;
  try { const mm = fs.readFileSync(p, "utf8").match(/&#\d+;/g); ent = mm ? mm.length : 0; } catch {}
  return { fp, mt, ent };
}

const rows = [];
const tickers = tickerFilter ? [tickerFilter] : fs.readdirSync(OUT).filter(d => fs.statSync(path.join(OUT, d)).isDirectory());
for (const t of tickers) {
  const tdir = path.join(OUT, t);
  for (const id of fs.readdirSync(tdir)) {
    const cardPath = path.join(tdir, id, "material.md");
    if (!fs.existsSync(cardPath)) continue;
    const card = fs.readFileSync(cardPath, "utf8");
    const fpM = card.match(/^source_fingerprint:\s*(\S+)/m);
    const recorded = fpM ? fpM[1] : null;
    const st = materialState(id);
    const cardMt = mtime(cardPath);
    let status, reason = "";
    if (!st) { status = "MISSING"; reason = "材料目录缺失"; }
    else if (recorded && st.fp && recorded !== st.fp) { status = "STALE"; reason = "指纹不符"; }
    else if (!recorded && st.mt > cardMt + 2000) { status = "STALE"; reason = "材料晚于卡(未记指纹)"; }
    else { status = "OK"; reason = recorded ? "" : "未记指纹"; }
    const ents = st ? (st.ent || 0) : 0;
    if (ents > 0) {
      if (status === "OK") { status = "ENTITY"; reason = `材料含 HTML 实体 ×${ents}（物化缺陷，跑 --fix-entities）`; }
      else reason += `；含实体 ×${ents}`;
    }
    if (init && st && st.fp && recorded !== st.fp) {
      const fmEnd = card.indexOf("\n---", 3);
      if (card.startsWith("---") && fmEnd > 0) {
        fs.writeFileSync(cardPath, card.slice(0, fmEnd) + `\nsource_fingerprint: ${st.fp}` + card.slice(fmEnd));
        status = "INIT"; reason = `已写入指纹 ${st.fp}`;
      }
    }
    rows.push({ ticker: t, id, status, reason, fp: st ? st.fp : null, cardMt, matMt: st ? st.mt : 0, entCount: ents });
  }
}

const stale = rows.filter(r => r.status === "STALE");
const missing = rows.filter(r => r.status === "MISSING");
const ent = rows.filter(r => r.entCount > 0);

// --fix-entities：就地修复物化缺陷（parse→值内解码→重序列化），并同步引用它的卡引文与指纹
if (args.includes("--fix-entities") && ent.length) {
  const decode = s => String(s).replace(/&#(\d+);/g, (m0, n) => {
    const c = Number(n);
    if (c === 160 || c === 8194 || c === 8195 || c === 8199 || c === 8201 || c === 8203) return " ";
    return String.fromCodePoint(c);
  });
  let fixedMat = 0, fixedCard = 0;
  for (const r of ent) {
    try {
      const dir = path.join(MAT, r.id);
      const pj = JSON.parse(fs.readFileSync(path.join(dir, "pages.json"), "utf8"));
      let ch = false;
      for (const p of pj.pages ?? []) { const d = decode(p.text ?? ""); if (d !== p.text) { p.text = d; if (p.chars != null) p.chars = d.length; ch = true; } }
      if (!ch) continue;
      fs.writeFileSync(path.join(dir, "pages.json"), JSON.stringify(pj, null, 1));
      const cm = path.join(dir, "content.md");
      if (fs.existsSync(cm)) fs.writeFileSync(cm, pj.pages.map(p => p.text).join("\n\n"));
      fixedMat++;
      const fp2 = sha(fs.readFileSync(path.join(dir, "content.md"), "utf8") + "\n" + fs.readFileSync(path.join(dir, "pages.json"), "utf8"));
      const cardP = path.join(OUT, r.ticker, r.id, "material.md");
      if (fs.existsSync(cardP)) {
        let t = fs.readFileSync(cardP, "utf8");
        const d2 = decode(t);
        const nt = d2.replace(/source_fingerprint: [a-f0-9]+/, "source_fingerprint: " + fp2);
        if (nt !== t) { fs.writeFileSync(cardP, nt); fixedCard++; }
      }
    } catch (e) { console.log(`✗ 修复失败 ${r.id}: ${e.message.slice(0, 80)}`); }
  }
  console.log(`—— ENTITY 修复：材料 ${fixedMat} 份、卡 ${fixedCard} 张（指纹已刷新，重跑本命令确认归零）`);
}

if (json) { console.log(JSON.stringify({ stale, missing, entity: ent, total: rows.length }, null, 2)); }
else {
  for (const r of rows.filter(r => r.status !== "OK")) console.log(`${r.status.padEnd(8)} ${r.ticker}/${r.id}  ${r.reason}`);
  console.log(`—— 共 ${rows.length} 张卡：OK ${rows.length - stale.length - missing.length - ent.filter(r => r.status === "ENTITY").length}，STALE ${stale.length}，MISSING ${missing.length}，ENTITY ${ent.length}`);
}

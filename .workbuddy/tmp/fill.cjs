const fs = require("fs");
const path = require("path");

const specPath = process.argv[2];
const spec = require(path.resolve(specPath));

const mdPath = path.join("output/meta", spec.ID, "material.md");
const pgDir = path.join(".workbuddy/tmp/pg", spec.TAG);

// 1) verify every quote verbatim against its page text
const norm = (s) => s.replace(/\s+/g, "");
let bad = 0;
for (const k of Object.keys(spec.q)) {
  for (const [pg, quote] of spec.q[k].blocks) {
    const n = pg.replace("p.", "");
    const f = path.join(pgDir, "p" + String(n).padStart(3, "0") + ".txt");
    if (!fs.existsSync(f)) { console.log(`MISSING PAGE ${pg} (Q${k})`); bad++; continue; }
    const txt = fs.readFileSync(f, "utf8");
    if (!norm(txt).includes(norm(quote))) {
      console.log(`UNVERIFIED Q${k} ${pg} :: ${quote.slice(0, 90)}`);
      bad++;
    }
  }
}
if (bad) { console.log(`\n${bad} bad quote(s) — abort`); process.exit(1); }

// 2) rebuild
let src = fs.readFileSync(mdPath, "utf8");

// frontmatter
src = src.replace(/^title: .*$/m, `title: ${JSON.stringify(spec.TITLE)}`);
src = src.replace(/^issuer: .*$/m, `issuer: ${JSON.stringify(spec.ISSUER)}`);

// drop skeleton quote block
src = src.replace(/^> 骨架已生成.*\r?\n/m, "").replace(/^> 填写纪律见.*\r?\n/m, "");

// split sections
const lines = src.split(/\r?\n/);
const out = [];
let i = 0;
// header part until first "## Q"
while (i < lines.length && !/^## Q\d/.test(lines[i])) { out.push(lines[i]); i++; }
// trim trailing blanks of header
while (out.length && out[out.length - 1].trim() === "") out.pop();
out.push("");

while (i < lines.length) {
  const head = lines[i];
  const m = /^## Q(\d)/.exec(head);
  if (!m) { i++; continue; }
  const k = m[1];
  const s = spec.q[k];
  if (!s) { console.log("no spec for Q" + k); process.exit(1); }
  out.push(head, "", s.ans.trim(), "", "### 依据", "");
  for (const [pg, quote] of s.blocks) out.push(`- ${pg}｜${quote}`);
  out.push("");

  // skip until next "## Q"
  i++;
  while (i < lines.length && !/^## Q\d/.test(lines[i])) i++;
}

let text = out.join("\n");
// collapse 3+ newlines
text = text.replace(/\n{3,}/g, "\n\n").replace(/\s+$/, "\n");
fs.writeFileSync(mdPath, text, "utf8");
console.log("written", mdPath, text.length, "chars");

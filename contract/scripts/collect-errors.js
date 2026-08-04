import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ARTIFACTS = path.join(__dirname, "../artifacts/src");
const OUT = path.join(__dirname, "../../client/src/abi/Errors.json");

const seen = new Set();
const errors = [];

(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { walk(full); continue; }
    if (!e.name.endsWith(".json") || e.name.endsWith(".dbg.json")) continue;

    const { abi } = JSON.parse(fs.readFileSync(full, "utf8"));
    if (!Array.isArray(abi)) continue;

    for (const f of abi) {
      if (f.type !== "error") continue;
      const sig = `${f.name}(${f.inputs.map(i => i.type).join(",")})`;
      if (seen.has(sig)) continue;
      seen.add(sig);
      errors.push(f);
    }
  }
})(ARTIFACTS);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(errors, null, 2));
console.log(`Wrote ${errors.length} error fragments → ${OUT}`);
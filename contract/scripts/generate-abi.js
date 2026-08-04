import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTIFACTS = path.join(__dirname, "../artifacts/src");
const OUT_DIR = path.join("__dirname", "../../client/src/abi");
const SKIP = new Set(["AccessManager.sol", "Struct.sol", "Structs.sol"]);

(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (
        SKIP.has(entry.name) ||
        entry.name.startsWith("I") 
      ) {
        continue;
      }

      walk(fullPath);
      continue;
    }

    if (!entry.name.endsWith(".json") || entry.name.endsWith(".dbg.json")) {
      continue;
    }

    const artifact = JSON.parse(fs.readFileSync(fullPath, "utf8"));

    if (!Array.isArray(artifact.abi)) {
      continue;
    }

    const contractName = path.basename(entry.name, ".json");
    const outputPath = path.join(OUT_DIR, `${contractName}.json`);

    fs.mkdirSync(OUT_DIR, { recursive: true });

    fs.writeFileSync(outputPath, JSON.stringify(artifact.abi, null, 2));

    console.log(`✓ ${contractName}`);
  }
})(ARTIFACTS);

console.log("✅ ABI generation completed.");

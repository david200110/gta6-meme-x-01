// Entrypoint for the gta6-meme-x-01 entry.
// Copies POST.json from the repository root into the output directory,
// so the entry's X post link is part of the built output.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

if (!existsSync("POST.json")) {
  console.error("POST.json not found in the repository root — nothing to copy.");
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync("POST.json", join(outDir, "POST.json"));
  console.log(`Copied POST.json to ${join(outDir, "POST.json")}`);
} catch (error) {
  console.error(`Failed to copy POST.json to ${outDir}:`, error);
  process.exit(1);
}

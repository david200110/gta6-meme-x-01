// Entrypoint for the gta6-meme-x-01 entry.
// Copies POST.json from the repository directory into the output directory,
// so the entry's X post link is part of the built output.
// The repository directory is MAKEFUN_BOT_DIR when set, otherwise the
// directory that holds this file, otherwise the working directory.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const botDir =
  process.env.MAKEFUN_BOT_DIR ||
  dirname(fileURLToPath(import.meta.url)) ||
  ".";

const postPath = join(botDir, "POST.json");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

if (!existsSync(postPath)) {
  console.error(`POST.json not found in ${botDir} — nothing to copy.`);
  process.exit(1);
}

// Fail fast if the post link file is not valid JSON.
try {
  JSON.parse(readFileSync(postPath, "utf8"));
} catch (error) {
  console.error(`POST.json in ${botDir} is not valid JSON:`, error);
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(postPath, join(outDir, "POST.json"));
  console.log(`Copied ${postPath} to ${join(outDir, "POST.json")}`);
} catch (error) {
  console.error(`Failed to copy POST.json to ${outDir}:`, error);
  process.exit(1);
}

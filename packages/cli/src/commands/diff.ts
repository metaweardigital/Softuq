import path from "node:path";
import fs from "fs-extra";
import pc from "picocolors";
import { detectProject } from "../utils/detect.js";
import { getSourceDir, loadRegistry } from "../utils/registry.js";

interface DiffOptions {
  framework?: string;
}

export async function diff(options: DiffOptions) {
  const cwd = process.cwd();
  const configPath = path.join(cwd, "designystem.json");

  if (!(await fs.pathExists(configPath))) {
    console.log(pc.red("\n  No designystem.json found. Run `designystem init` first.\n"));
    process.exit(1);
  }

  const config = await fs.readJson(configPath);
  const detected = await detectProject(cwd);
  if (!detected) {
    console.log(pc.red("\n  No package.json found.\n"));
    process.exit(1);
  }

  const framework = (options.framework as "react" | "svelte") || config.framework;
  const registry = loadRegistry(framework);
  const sourceDir = getSourceDir(framework);
  const componentDir = config.componentDir;

  console.log(pc.bold("\n  DesignYstem Diff\n"));

  let changed = 0;
  let unchanged = 0;
  let missing = 0;

  for (const [name, entry] of Object.entries(registry.components)) {
    for (const file of entry.files) {
      const localPath = path.join(cwd, file.startsWith("lib/") ? config.libDir : componentDir, path.basename(file));
      const sourcePath = path.join(sourceDir, file);

      if (!(await fs.pathExists(localPath))) {
        continue; // not installed, skip
      }

      if (!(await fs.pathExists(sourcePath))) {
        console.log(pc.yellow(`  ? ${name}`) + pc.dim(` — source not found`));
        missing++;
        continue;
      }

      const local = await fs.readFile(localPath, "utf-8");
      const source = await fs.readFile(sourcePath, "utf-8");

      // Normalize: strip import path rewrites for comparison
      const normalizedLocal = normalizeForDiff(local);
      const normalizedSource = normalizeForDiff(source);

      if (normalizedLocal === normalizedSource) {
        unchanged++;
      } else {
        const localLines = local.split("\n").length;
        const sourceLines = source.split("\n").length;
        const lineDiff = sourceLines - localLines;
        const diffLabel = lineDiff > 0 ? `+${lineDiff}` : lineDiff < 0 ? `${lineDiff}` : "~";
        console.log(pc.yellow(`  ↻ ${name}`) + pc.dim(` — updated upstream (${diffLabel} lines)`));
        changed++;
      }
    }
  }

  // Check utils
  const utilsLocal = path.join(cwd, config.libDir, "utils.ts");
  const utilsSource = path.join(sourceDir, "lib/utils.ts");
  if ((await fs.pathExists(utilsLocal)) && (await fs.pathExists(utilsSource))) {
    const l = await fs.readFile(utilsLocal, "utf-8");
    const s = await fs.readFile(utilsSource, "utf-8");
    if (l !== s) {
      console.log(pc.yellow("  ↻ utils.ts") + pc.dim(" — updated upstream"));
      changed++;
    }
  }

  if (changed === 0 && missing === 0) {
    console.log(pc.green("  ✓ Everything up to date"));
  }

  console.log(pc.dim(`\n  ${changed} changed, ${unchanged} up to date\n`));

  if (changed > 0) {
    console.log(pc.dim(`  Run ${pc.white("designystem update")} to pull changes.\n`));
  }
}

function normalizeForDiff(content: string): string {
  return content
    .replace(/from\s+["']@\/lib\/utils["']/g, 'from "../../lib/utils"')
    .replace(/from\s+["']@\/lib\/squircle["']/g, 'from "../../lib/squircle"');
}

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
  const configPath = path.join(cwd, "softuq.json");

  if (!(await fs.pathExists(configPath))) {
    console.log(pc.red("\n  No softuq.json found. Run `softuq init` first.\n"));
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

  console.log(pc.bold("\n  Softuq Diff\n"));

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

  // Check tokens.ts
  const tokensJsLocal = path.join(cwd, config.libDir, "tokens.ts");
  const tokensJsSource = path.resolve(sourceDir, "../../tokens/src/index.ts");
  if ((await fs.pathExists(tokensJsLocal)) && (await fs.pathExists(tokensJsSource))) {
    const l = await fs.readFile(tokensJsLocal, "utf-8");
    const s = await fs.readFile(tokensJsSource, "utf-8");
    if (l !== s) {
      console.log(pc.yellow("  ↻ tokens.ts") + pc.dim(" — updated upstream"));
      changed++;
    }
  }

  // Check CSS token/theme files (safe to overwrite — user code is in globals.css)
  const cssDir = detected.cssFile ? path.dirname(path.join(cwd, detected.cssFile)) : path.join(cwd, "src/app");
  const tokensDir = path.resolve(sourceDir, "../../tokens/src");
  const cssFiles = [
    { local: "softuq-tokens.css", source: ["primitives.css", "semantic.css"], label: "tokens CSS" },
    { local: "softuq-theme.css", source: ["tailwind-theme.css"], label: "theme CSS" },
  ];
  for (const { local, source, label } of cssFiles) {
    const localPath = path.join(cssDir, local);
    if (!(await fs.pathExists(localPath))) continue;
    const localContent = await fs.readFile(localPath, "utf-8");
    let sourceContent = "";
    for (const f of source) {
      const fp = path.join(tokensDir, f);
      if (await fs.pathExists(fp)) sourceContent += `${await fs.readFile(fp, "utf-8")}\n\n`;
    }
    if (local === "softuq-tokens.css") sourceContent = `/* Softuq */\n${sourceContent}`;
    if (localContent.trim() !== sourceContent.trim()) {
      console.log(pc.yellow(`  ↻ ${local}`) + pc.dim(` — ${label} updated upstream`));
      changed++;
    }
  }

  if (changed === 0 && missing === 0) {
    console.log(pc.green("  ✓ Everything up to date"));
  }

  console.log(pc.dim(`\n  ${changed} changed, ${unchanged} up to date\n`));

  if (changed > 0) {
    console.log(pc.dim(`  Run ${pc.white("softuq update")} to pull changes.\n`));
  }
}

function normalizeForDiff(content: string): string {
  return content
    .replace(/from\s+["']@\/lib\/utils["']/g, 'from "../../lib/utils"')
    .replace(/from\s+["']@\/lib\/squircle["']/g, 'from "../../lib/squircle"');
}

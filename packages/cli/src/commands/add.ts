import path from "node:path";
import fs from "fs-extra";
import pc from "picocolors";
import { installDeps } from "../utils/deps.js";
import { detectProject } from "../utils/detect.js";
import { getSourceDir, loadRegistry, resolveAllDeps } from "../utils/registry.js";

interface AddOptions {
  all?: boolean;
  overwrite?: boolean;
  dir?: string;
}

export async function add(components: string[], options: AddOptions) {
  const cwd = process.cwd();

  // Load config
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

  const registry = await loadRegistry(config.framework);
  const sourceDir = getSourceDir(config.framework);
  const componentDir = options.dir || config.componentDir;

  // Resolve components
  let names = components;
  if (options.all) {
    names = Object.keys(registry.components);
  }

  if (names.length === 0) {
    console.log(pc.yellow("\n  No components specified. Usage: designystem add button card\n"));
    process.exit(1);
  }

  // Validate
  const invalid = names.filter((n) => !registry.components[n]);
  if (invalid.length > 0) {
    console.log(pc.red(`\n  Unknown components: ${invalid.join(", ")}`));
    console.log(pc.dim("  Run `designystem list` to see available components.\n"));
    process.exit(1);
  }

  console.log(pc.bold("\n  Adding components...\n"));

  // Resolve all deps (including transitive registry deps)
  const { components: allComponents, dependencies } = resolveAllDeps(registry, names);

  // Copy component files
  let copied = 0;
  let skipped = 0;
  for (const name of allComponents) {
    const entry = registry.components[name];
    for (const file of entry.files) {
      const src = path.join(sourceDir, file);
      const dest = path.join(cwd, file.startsWith("lib/") ? config.libDir : componentDir, path.basename(file));

      if ((await fs.pathExists(dest)) && !options.overwrite) {
        console.log(pc.gray("  ○ ") + pc.dim(`${path.basename(file)} (exists, use --overwrite)`));
        skipped++;
        continue;
      }

      await fs.ensureDir(path.dirname(dest));

      // Read source and rewrite import paths
      let content = await fs.readFile(src, "utf-8");
      content = rewriteImports(content);

      await fs.writeFile(dest, content);
      console.log(pc.green("  ✓ ") + pc.dim(path.basename(file)));
      copied++;
    }
  }

  // Install dependencies
  if (dependencies.length > 0) {
    // Filter out already installed
    const pkgPath = path.join(cwd, "package.json");
    const pkg = await fs.readJson(pkgPath);
    const installed = { ...pkg.dependencies, ...pkg.devDependencies };
    const missing = dependencies.filter((d) => !installed[d]);

    if (missing.length > 0) {
      console.log(pc.dim("\n  Installing dependencies..."));
      installDeps(missing, cwd, detected.packageManager);
      console.log(pc.green("  ✓ ") + pc.dim(missing.join(", ")));
    }
  }

  console.log(pc.bold(pc.green(`\n  Done! `)) + pc.dim(`${copied} added, ${skipped} skipped.\n`));
}

function rewriteImports(content: string): string {
  // Rewrite relative imports from ../../lib/utils to the project's lib path
  // In source: import { cn } from "../../lib/utils"
  // In target: import { cn } from "@/lib/utils" (or relative)
  return content
    .replace(/from\s+["']\.\.\/\.\.\/lib\/utils["']/g, `from "@/lib/utils"`)
    .replace(/from\s+["']\.\.\/\.\.\/lib\/squircle["']/g, `from "@/lib/squircle"`)
    .replace(/from\s+["']\.\/([^"']+)["']/g, `from "./$1"`);
}

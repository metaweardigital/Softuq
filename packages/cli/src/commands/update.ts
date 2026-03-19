import path from "node:path";
import fs from "fs-extra";
import pc from "picocolors";
import prompts from "prompts";
import { installDeps } from "../utils/deps.js";
import { detectProject } from "../utils/detect.js";
import { getSourceDir, loadRegistry, resolveAllDeps } from "../utils/registry.js";

interface UpdateOptions {
  all?: boolean;
  yes?: boolean;
}

export async function update(components: string[], options: UpdateOptions) {
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

  const registry = loadRegistry(config.framework);
  const sourceDir = getSourceDir(config.framework);
  const componentDir = config.componentDir;

  // Find which installed components have changed
  const updatable: string[] = [];

  for (const [name, entry] of Object.entries(registry.components)) {
    for (const file of entry.files) {
      const localPath = path.join(cwd, file.startsWith("lib/") ? config.libDir : componentDir, path.basename(file));
      const sourcePath = path.join(sourceDir, file);

      if (!(await fs.pathExists(localPath)) || !(await fs.pathExists(sourcePath))) continue;

      const local = normalizeForDiff(await fs.readFile(localPath, "utf-8"));
      const source = normalizeForDiff(await fs.readFile(sourcePath, "utf-8"));

      if (local !== source) {
        updatable.push(name);
        break;
      }
    }
  }

  if (updatable.length === 0) {
    console.log(pc.green("\n  ✓ Everything up to date. Nothing to update.\n"));
    return;
  }

  // Filter by requested components or show all
  const toUpdate = options.all
    ? updatable
    : components.length > 0
      ? components.filter((c) => updatable.includes(c))
      : updatable;

  console.log(pc.bold("\n  Components with updates:\n"));
  for (const name of toUpdate) {
    console.log(`  ${pc.yellow("↻")} ${name}`);
  }

  if (!options.yes) {
    const { confirm } = await prompts({
      type: "confirm",
      name: "confirm",
      message: `Update ${toUpdate.length} component${toUpdate.length > 1 ? "s" : ""}?`,
      initial: true,
    });
    if (!confirm) {
      console.log(pc.gray("\n  Cancelled.\n"));
      return;
    }
  }

  // Resolve deps and update
  const { components: allComponents, dependencies } = resolveAllDeps(registry, toUpdate);
  // Only update ones that are already installed
  let updated = 0;

  for (const name of allComponents) {
    const entry = registry.components[name];
    for (const file of entry.files) {
      const localPath = path.join(cwd, file.startsWith("lib/") ? config.libDir : componentDir, path.basename(file));
      const sourcePath = path.join(sourceDir, file);

      if (!(await fs.pathExists(localPath))) continue;

      let content = await fs.readFile(sourcePath, "utf-8");
      content = rewriteImports(content);
      await fs.writeFile(localPath, content);
      console.log(pc.green("  ✓ ") + pc.dim(path.basename(file)));
      updated++;
    }
  }

  // Check for new deps
  const pkgPath = path.join(cwd, "package.json");
  const pkg = await fs.readJson(pkgPath);
  const installed = { ...pkg.dependencies, ...pkg.devDependencies };
  const missing = dependencies.filter((d) => !installed[d]);
  if (missing.length > 0) {
    console.log(pc.dim("\n  Installing new dependencies..."));
    installDeps(missing, cwd, detected.packageManager);
    console.log(pc.green("  ✓ ") + pc.dim(missing.join(", ")));
  }

  console.log(pc.bold(pc.green(`\n  Done! `)) + pc.dim(`${updated} files updated.\n`));
}

function normalizeForDiff(content: string): string {
  return content
    .replace(/from\s+["']@\/lib\/utils["']/g, 'from "../../lib/utils"')
    .replace(/from\s+["']@\/lib\/squircle["']/g, 'from "../../lib/squircle"');
}

function rewriteImports(content: string): string {
  return content
    .replace(/from\s+["']\.\.\/\.\.\/lib\/utils["']/g, `from "@/lib/utils"`)
    .replace(/from\s+["']\.\.\/\.\.\/lib\/squircle["']/g, `from "@/lib/squircle"`)
    .replace(/from\s+["']\.\/([^"']+)["']/g, `from "./$1"`);
}

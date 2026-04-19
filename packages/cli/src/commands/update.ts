import path from "node:path";
import fs from "fs-extra";
import pc from "picocolors";
import prompts from "prompts";
import { installDeps } from "../utils/deps.js";
import { detectProject } from "../utils/detect.js";
import { getSourceDir, getTokensDir, loadRegistry, resolveAllDeps } from "../utils/registry.js";

interface UpdateOptions {
  all?: boolean;
  yes?: boolean;
}

export async function update(components: string[], options: UpdateOptions) {
  const cwd = process.cwd();
  const configPath = path.join(cwd, "softuq.json");

  if (!(await fs.pathExists(configPath))) {
    process.stderr.write(pc.red("\n  No softuq.json found. Run `softuq init` first.\n\n"));
    process.exit(1);
  }

  const config = await fs.readJson(configPath);
  const detected = await detectProject(cwd);
  if (!detected) {
    process.stderr.write(pc.red("\n  No package.json found.\n\n"));
    process.exit(1);
  }

  const registry = await loadRegistry(config.framework);
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

  let updated = 0;

  // Update CSS token/theme files first (always safe — user code is in globals.css)
  const cssDir = detected.cssFile ? path.dirname(path.join(cwd, detected.cssFile)) : path.join(cwd, "src/app");
  const tokensDir = getTokensDir();

  const primitives = await fs.readFile(path.join(tokensDir, "primitives.css"), "utf-8");
  const semantic = await fs.readFile(path.join(tokensDir, "semantic.css"), "utf-8");
  const tailwindTheme = await fs.readFile(path.join(tokensDir, "tailwind-theme.css"), "utf-8");

  const tokensPath = path.join(cssDir, "softuq-tokens.css");
  if (await fs.pathExists(tokensPath)) {
    const local = await fs.readFile(tokensPath, "utf-8");
    const source = `/* Softuq */\n${primitives}\n\n${semantic}\n`;
    if (local.trim() !== source.trim()) {
      await fs.writeFile(tokensPath, source);
      console.log(pc.green("  ✓ ") + pc.dim("softuq-tokens.css"));
      updated++;
    }
  }

  const themePath = path.join(cssDir, "softuq-theme.css");
  if (await fs.pathExists(themePath)) {
    const local = await fs.readFile(themePath, "utf-8");
    if (local.trim() !== tailwindTheme.trim()) {
      await fs.writeFile(themePath, tailwindTheme);
      console.log(pc.green("  ✓ ") + pc.dim("softuq-theme.css"));
      updated++;
    }
  }

  // Update lib/tokens.ts
  const tokensJsDest = path.join(cwd, config.libDir, "tokens.ts");
  if (await fs.pathExists(tokensJsDest)) {
    const local = await fs.readFile(tokensJsDest, "utf-8");
    const source = await fs.readFile(path.join(tokensDir, "index.ts"), "utf-8");
    if (local !== source) {
      await fs.writeFile(tokensJsDest, source);
      console.log(pc.green("  ✓ ") + pc.dim("tokens.ts"));
      updated++;
    }
  }

  // Update components
  if (updatable.length > 0) {
    const toUpdate = options.all
      ? updatable
      : components.length > 0
        ? components.filter((c) => updatable.includes(c))
        : updatable;

    if (toUpdate.length > 0) {
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

      const { components: allComponents, dependencies } = resolveAllDeps(registry, toUpdate);

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
    }
  }

  if (updated === 0) {
    console.log(pc.green("\n  ✓ Everything up to date.\n"));
  } else {
    console.log(pc.bold(pc.green(`\n  Done! `)) + pc.dim(`${updated} files updated.\n`));
  }
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

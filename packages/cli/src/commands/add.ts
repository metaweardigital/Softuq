import path from "node:path";
import fs from "fs-extra";
import pc from "picocolors";
import { markInstalled } from "../utils/config.js";
import { installDeps } from "../utils/deps.js";
import { detectProject } from "../utils/detect.js";
import { loadRegistry, readSource, resolveAllDeps } from "../utils/registry.js";

interface AddOptions {
  all?: boolean;
  overwrite?: boolean;
  dir?: string;
}

export async function add(components: string[], options: AddOptions) {
  const cwd = process.cwd();

  // Load config
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
  const componentDir = options.dir || config.componentDir;

  // Resolve components
  let names = components;
  if (options.all) {
    names = Object.keys(registry.components);
  }

  if (names.length === 0) {
    process.stderr.write(pc.yellow("\n  No components specified. Usage: softuq add button card\n\n"));
    process.exit(1);
  }

  // Validate
  const invalid = names.filter((n) => !registry.components[n]);
  if (invalid.length > 0) {
    process.stderr.write(pc.red(`\n  Unknown components: ${invalid.join(", ")}\n`));
    process.stderr.write(pc.dim("  Run `softuq list` to see available components.\n\n"));
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
      const dest = path.join(cwd, file.startsWith("lib/") ? config.libDir : componentDir, path.basename(file));

      if ((await fs.pathExists(dest)) && !options.overwrite) {
        console.log(pc.gray("  ○ ") + pc.dim(`${path.basename(file)} (exists, use --overwrite)`));
        skipped++;
        continue;
      }

      await fs.ensureDir(path.dirname(dest));

      let content = await readSource(config.framework, file);
      content = rewriteImports(content);

      await fs.writeFile(dest, content);
      console.log(pc.green("  ✓ ") + pc.dim(path.basename(file)));
      copied++;
    }
  }

  // Track installed components
  await markInstalled(cwd, allComponents);

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

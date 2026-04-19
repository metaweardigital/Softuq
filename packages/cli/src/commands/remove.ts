import path from "node:path";
import fs from "fs-extra";
import pc from "picocolors";
import prompts from "prompts";
import { markUninstalled, readConfig } from "../utils/config.js";
import { loadRegistry } from "../utils/registry.js";

interface RemoveOptions {
  force?: boolean;
  yes?: boolean;
}

export async function remove(components: string[], options: RemoveOptions) {
  const cwd = process.cwd();
  const config = await readConfig(cwd);

  if (!config) {
    process.stderr.write(pc.red("\n  No softuq.json found. Run `softuq init` first.\n\n"));
    process.exit(1);
  }

  if (components.length === 0) {
    process.stderr.write(pc.yellow("\n  No components specified. Usage: softuq remove button card\n\n"));
    process.exit(1);
  }

  const registry = await loadRegistry(config.framework);

  const notInstalled = components.filter((c) => !config.components[c]);
  if (notInstalled.length > 0) {
    process.stderr.write(pc.red(`\n  Not installed: ${notInstalled.join(", ")}\n`));
    process.stderr.write(pc.dim("  Run `softuq list --installed` to see what's installed.\n\n"));
    process.exit(1);
  }

  const toRemove = new Set(components);

  // Reverse-dependency check: warn if another installed component depends on one being removed.
  const blockers: { blocker: string; requires: string }[] = [];
  for (const installedName of Object.keys(config.components)) {
    if (toRemove.has(installedName)) continue;
    const entry = registry.components[installedName];
    if (!entry) continue;
    for (const dep of entry.registryDeps) {
      if (toRemove.has(dep)) blockers.push({ blocker: installedName, requires: dep });
    }
  }

  if (blockers.length > 0 && !options.force) {
    process.stderr.write(pc.yellow("\n  Cannot remove — other installed components depend on these:\n\n"));
    for (const { blocker, requires } of blockers) {
      process.stderr.write(`  ${pc.yellow("!")} ${blocker} requires ${pc.white(requires)}\n`);
    }
    process.stderr.write(pc.dim("\n  Pass --force to remove anyway (may break dependents).\n\n"));
    process.exit(1);
  }

  console.log(pc.bold("\n  Removing components...\n"));

  const filesToDelete: string[] = [];
  for (const name of components) {
    const entry = registry.components[name];
    if (!entry) continue;
    for (const file of entry.files) {
      const dest = path.join(cwd, file.startsWith("lib/") ? config.libDir : config.componentDir, path.basename(file));
      if (await fs.pathExists(dest)) filesToDelete.push(dest);
    }
  }

  if (filesToDelete.length === 0) {
    console.log(pc.gray("  No files to delete. Clearing from softuq.json.\n"));
    await markUninstalled(cwd, components);
    return;
  }

  for (const f of filesToDelete) {
    console.log(pc.dim(`  - ${path.relative(cwd, f)}`));
  }

  if (!options.yes) {
    const { confirm } = await prompts({
      type: "confirm",
      name: "confirm",
      message: `Delete ${filesToDelete.length} file${filesToDelete.length > 1 ? "s" : ""}?`,
      initial: false,
    });
    if (!confirm) {
      console.log(pc.gray("\n  Cancelled.\n"));
      return;
    }
  }

  for (const f of filesToDelete) {
    await fs.remove(f);
    console.log(pc.green("  ✓ ") + pc.dim(path.basename(f)));
  }

  await markUninstalled(cwd, components);

  console.log(
    pc.bold(pc.green("\n  Done! ")) +
      pc.dim(`${components.length} component${components.length > 1 ? "s" : ""} removed.`),
  );
  console.log(pc.dim("  npm dependencies left in package.json — remove manually if unused.\n"));
}

import pc from "picocolors";
import { readConfig } from "../utils/config.js";
import { detectProject } from "../utils/detect.js";
import { loadRegistry } from "../utils/registry.js";

interface ListOptions {
  framework?: string;
  installed?: boolean;
}

export async function list(options: ListOptions) {
  const cwd = process.cwd();
  const config = await readConfig(cwd);

  let framework = options.framework;
  if (!framework) {
    if (config) {
      framework = config.framework;
    } else {
      const detected = await detectProject(cwd);
      framework = detected?.framework || "react";
    }
  }

  if (options.installed) {
    if (!config) {
      process.stderr.write(pc.red("\n  No softuq.json found. Run `softuq init` first.\n\n"));
      process.exit(1);
    }
    const installed = Object.keys(config.components).sort();
    console.log(pc.bold(`\n  Softuq — installed components\n`));
    if (installed.length === 0) {
      console.log(pc.dim("  No components installed yet. Run `softuq add <name>`.\n"));
      return;
    }
    for (const name of installed) {
      const entry = config.components[name];
      console.log(`  ${pc.green("●")} ${name}${pc.dim(` — installed ${entry.installedAt}`)}`);
    }
    console.log(pc.dim(`\n  ${installed.length} installed\n`));
    return;
  }

  const registry = await loadRegistry(framework as "react" | "svelte");
  const names = Object.keys(registry.components).sort();

  console.log(pc.bold(`\n  Softuq — ${framework} components\n`));

  for (const name of names) {
    const entry = registry.components[name];
    const deps = entry.registryDeps.length > 0 ? pc.dim(` (requires: ${entry.registryDeps.join(", ")})`) : "";
    const installedMark = config?.components[name] ? pc.green(" ✓") : "";
    console.log(`  ${pc.green("●")} ${name}${installedMark}${deps}`);
  }

  console.log(pc.dim(`\n  ${names.length} components available`));
  console.log(pc.dim(`  Usage: softuq add ${names.slice(0, 3).join(" ")}\n`));
}

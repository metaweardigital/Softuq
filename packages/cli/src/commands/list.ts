import path from "node:path";
import fs from "fs-extra";
import pc from "picocolors";
import { detectProject } from "../utils/detect.js";
import { loadRegistry } from "../utils/registry.js";

interface ListOptions {
  framework?: string;
}

export async function list(options: ListOptions) {
  const cwd = process.cwd();

  // Try to load config, fallback to detection
  let framework = options.framework;
  if (!framework) {
    const configPath = path.join(cwd, "softuq.json");
    if (await fs.pathExists(configPath)) {
      const config = await fs.readJson(configPath);
      framework = config.framework;
    } else {
      const detected = await detectProject(cwd);
      framework = detected?.framework || "react";
    }
  }

  const registry = await loadRegistry(framework as "react" | "svelte");
  const names = Object.keys(registry.components).sort();

  console.log(pc.bold(`\n  Softuq — ${framework} components\n`));

  for (const name of names) {
    const entry = registry.components[name];
    const deps = entry.registryDeps.length > 0 ? pc.dim(` (requires: ${entry.registryDeps.join(", ")})`) : "";
    console.log(`  ${pc.green("●")} ${name}${deps}`);
  }

  console.log(pc.dim(`\n  ${names.length} components available`));
  console.log(pc.dim(`  Usage: softuq add ${names.slice(0, 3).join(" ")}\n`));
}

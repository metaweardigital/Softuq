import path from "node:path";
import { fileURLToPath } from "node:url";
import reactRegistry from "../registry/react.json";
import type { Framework } from "./detect.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface ComponentEntry {
  files: string[];
  dependencies: string[];
  registryDeps: string[];
}

export interface Registry {
  framework: string;
  utils: Record<string, { file: string; dependencies: string[] }>;
  provider: { file: string; dependencies: string[] };
  components: Record<string, ComponentEntry>;
}

const registries: Record<string, Registry> = {
  react: reactRegistry as Registry,
};

export function loadRegistry(framework: Framework): Registry {
  const reg = registries[framework];
  if (!reg) {
    throw new Error(`No registry for framework: ${framework}. Available: ${Object.keys(registries).join(", ")}`);
  }
  return reg;
}

export function resolveAllDeps(registry: Registry, names: string[]): { components: string[]; dependencies: string[] } {
  const resolved = new Set<string>();
  const deps = new Set<string>();

  function resolve(name: string) {
    if (resolved.has(name)) return;
    const entry = registry.components[name];
    if (!entry) return;
    resolved.add(name);
    for (const d of entry.dependencies) deps.add(d);
    for (const rd of entry.registryDeps) resolve(rd);
  }

  for (const n of names) resolve(n);

  // Always include cn() utils deps
  for (const d of registry.utils.cn.dependencies) deps.add(d);

  return {
    components: Array.from(resolved),
    dependencies: Array.from(deps),
  };
}

export function getSourceDir(framework: Framework): string {
  // __dirname points to dist/ in bundled output, so go up to packages/cli/ then to sibling package
  const cliRoot = path.resolve(__dirname, "..");
  return path.resolve(cliRoot, `../${framework}/src`);
}

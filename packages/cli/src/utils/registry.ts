import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import reactRegistry from "../registry/react.json";
import type { Framework } from "./detect.js";
import { fetchRemoteFile, fetchRemoteManifest } from "./remote.js";

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

const bundledRegistries: Record<string, Registry> = {
  react: reactRegistry as Registry,
};

export async function loadRegistry(framework: Framework): Promise<Registry> {
  const manifest = await fetchRemoteManifest();
  const remote = manifest?.frameworks[framework];
  if (remote) return remote;

  const bundled = bundledRegistries[framework];
  if (!bundled) {
    throw new Error(`No registry for framework: ${framework}. Available: ${Object.keys(bundledRegistries).join(", ")}`);
  }
  return bundled;
}

/**
 * Read a component/token source file. Prefers bundled templates (fast, offline-safe);
 * falls back to the remote registry when a file is absent locally — this is how new
 * components shipped via `softuq.com/registry.json` reach users without a CLI bump.
 */
export async function readSource(framework: Framework, relPath: string): Promise<string> {
  const bundledPath = path.join(getSourceDir(framework), relPath);
  if (existsSync(bundledPath)) {
    return readFile(bundledPath, "utf-8");
  }
  const remote = await fetchRemoteFile(framework, relPath);
  if (remote !== null) return remote;
  throw new Error(`Source file not found locally or remotely: ${framework}/${relPath}`);
}

export async function readTokenFile(relPath: string): Promise<string> {
  const bundledPath = path.join(getTokensDir(), relPath);
  if (existsSync(bundledPath)) {
    return readFile(bundledPath, "utf-8");
  }
  const remote = await fetchRemoteFile("tokens", relPath);
  if (remote !== null) return remote;
  throw new Error(`Token file not found locally or remotely: tokens/${relPath}`);
}

export function resolveAllDeps(registry: Registry, names: string[]): { components: string[]; dependencies: string[] } {
  const resolved = new Set<string>();
  const deps = new Set<string>();
  const missing = new Set<string>();

  function resolve(name: string, requestedBy?: string) {
    if (resolved.has(name)) return;
    const entry = registry.components[name];
    if (!entry) {
      if (requestedBy) missing.add(`${name} (required by ${requestedBy})`);
      return;
    }
    resolved.add(name);
    for (const d of entry.dependencies) deps.add(d);
    for (const rd of entry.registryDeps) resolve(rd, name);
  }

  for (const n of names) resolve(n);

  if (missing.size > 0) {
    process.stderr.write(`  Warning: unknown registryDeps: ${Array.from(missing).join(", ")}\n`);
  }

  // Always include cn() utils deps
  for (const d of registry.utils.cn.dependencies) deps.add(d);

  return {
    components: Array.from(resolved),
    dependencies: Array.from(deps),
  };
}

export function getTokensDir(): string {
  const cliRoot = path.resolve(__dirname, "..");
  const bundled = path.resolve(cliRoot, "templates", "tokens");
  if (existsSync(bundled)) return bundled;
  return path.resolve(cliRoot, "../tokens/src");
}

export function getSourceDir(framework: Framework): string {
  // __dirname points to dist/ in bundled output → cliRoot = packages/cli/
  const cliRoot = path.resolve(__dirname, "..");

  // Published state: bundled templates inside the CLI package
  const bundled = path.resolve(cliRoot, "templates", framework);
  if (existsSync(bundled)) return bundled;

  // Monorepo dev fallback: read directly from sibling framework package
  return path.resolve(cliRoot, `../${framework}/src`);
}

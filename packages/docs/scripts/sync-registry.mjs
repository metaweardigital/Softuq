#!/usr/bin/env node
/**
 * Generates the remote registry served at softuq.com/registry.json
 * plus the raw component/token files at softuq.com/r/...
 *
 * Run before docs build so Railway ships them.
 */
import { existsSync } from "node:fs";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(docsRoot, "../..");
const publicDir = path.join(docsRoot, "public");
const rawDir = path.join(publicDir, "r");

const cliPkg = JSON.parse(await readFile(path.join(repoRoot, "packages/cli/package.json"), "utf-8"));
const reactRegistry = JSON.parse(await readFile(path.join(repoRoot, "packages/cli/src/registry/react.json"), "utf-8"));

const reactSrc = path.join(repoRoot, "packages/react/src");
const tokensSrc = path.join(repoRoot, "packages/tokens/src");

const filter = (src) => {
  const base = path.basename(src);
  if (base === ".DS_Store") return false;
  if (base.endsWith(".tsbuildinfo")) return false;
  return true;
};

if (existsSync(rawDir)) {
  await rm(rawDir, { recursive: true, force: true });
}
await mkdir(path.join(rawDir, "react"), { recursive: true });
await mkdir(path.join(rawDir, "tokens"), { recursive: true });

await cp(reactSrc, path.join(rawDir, "react"), { recursive: true, filter });
console.log(`[sync-registry] react: ${path.relative(repoRoot, reactSrc)} → public/r/react`);

await cp(tokensSrc, path.join(rawDir, "tokens"), { recursive: true, filter });
console.log(`[sync-registry] tokens: ${path.relative(repoRoot, tokensSrc)} → public/r/tokens`);

const manifest = {
  version: cliPkg.version,
  generatedAt: new Date().toISOString(),
  frameworks: {
    react: reactRegistry,
  },
};

await writeFile(path.join(publicDir, "registry.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`[sync-registry] manifest → public/registry.json (cli ${cliPkg.version})`);

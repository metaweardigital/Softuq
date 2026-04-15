#!/usr/bin/env node
/**
 * Copies framework source packages and the design skill into packages/cli/
 * so they ship inside the CLI npm tarball. Runs before build and before publish.
 */
import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(cliRoot, "../..");
const templatesDir = path.join(cliRoot, "templates");
const skillDir = path.join(cliRoot, "skill");

const frameworks = [{ name: "react", src: path.join(repoRoot, "packages/react/src") }];

const filter = (src) => {
  const base = path.basename(src);
  if (base === ".DS_Store") return false;
  if (base.endsWith(".tsbuildinfo")) return false;
  return true;
};

// 1. Frameworks → templates/
if (existsSync(templatesDir)) {
  rmSync(templatesDir, { recursive: true, force: true });
}
fs.ensureDirSync(templatesDir);

for (const fw of frameworks) {
  if (!existsSync(fw.src)) {
    console.error(`[sync-templates] Missing source for "${fw.name}": ${fw.src}`);
    process.exit(1);
  }
  const dest = path.join(templatesDir, fw.name);
  fs.copySync(fw.src, dest, { filter });
  console.log(`[sync-templates] ${fw.name}: ${path.relative(repoRoot, fw.src)} → ${path.relative(repoRoot, dest)}`);
}

// 2. Design skill → skill/
const skillSrc = path.join(repoRoot, "skills/softuq");
if (!existsSync(skillSrc)) {
  console.error(`[sync-templates] Missing skill source: ${skillSrc}`);
  process.exit(1);
}
if (existsSync(skillDir)) {
  rmSync(skillDir, { recursive: true, force: true });
}
fs.copySync(skillSrc, skillDir, { filter });
console.log(`[sync-templates] skill: ${path.relative(repoRoot, skillSrc)} → ${path.relative(repoRoot, skillDir)}`);

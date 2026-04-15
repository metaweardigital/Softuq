#!/usr/bin/env node
/**
 * Copies framework source packages into packages/cli/templates/ so they ship
 * inside the CLI npm tarball. Runs before build and before publish.
 */
import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(cliRoot, "../..");
const templatesDir = path.join(cliRoot, "templates");

const frameworks = [{ name: "react", src: path.join(repoRoot, "packages/react/src") }];

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
  fs.copySync(fw.src, dest, {
    filter: (src) => {
      const base = path.basename(src);
      // Skip TS declaration outputs and OS junk
      if (base === ".DS_Store") return false;
      if (base.endsWith(".tsbuildinfo")) return false;
      return true;
    },
  });
  console.log(`[sync-templates] ${fw.name}: ${path.relative(repoRoot, fw.src)} → ${path.relative(repoRoot, dest)}`);
}

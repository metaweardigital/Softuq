import path from "node:path";
import fs from "fs-extra";

export type Framework = "react" | "svelte";

export interface DetectedProject {
  framework: Framework;
  srcDir: string;
  appDir: string;
  cssFile: string | null;
  packageManager: "pnpm" | "yarn" | "npm" | "bun";
  isNextjs: boolean;
  isVite: boolean;
}

export async function detectProject(cwd: string): Promise<DetectedProject | null> {
  const pkgPath = path.join(cwd, "package.json");
  if (!(await fs.pathExists(pkgPath))) return null;

  const pkg = await fs.readJson(pkgPath);
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

  // Detect framework
  let framework: Framework = "react";
  if (allDeps.svelte || allDeps["@sveltejs/kit"]) {
    framework = "svelte";
  }

  // Detect meta-framework
  const isNextjs = !!allDeps.next;
  const isVite = !!allDeps.vite;

  // Detect src dir + Next.js app-router dir
  // srcDir = where components/lib/provider live ("" = project root for --no-src-dir Next)
  // appDir = Next.js app-router location (layout.tsx, page.tsx, globals.css)
  let srcDir = "src";
  let appDir = "";
  if (isNextjs && (await fs.pathExists(path.join(cwd, "app")))) {
    // --no-src-dir Next: @/* → ./*, everything at root
    srcDir = "";
    appDir = "app";
  } else if (isNextjs && (await fs.pathExists(path.join(cwd, "src/app")))) {
    srcDir = "src";
    appDir = "src/app";
  }

  // Detect CSS file
  const cssCandidates = [
    appDir && `${appDir}/globals.css`,
    srcDir && `${srcDir}/index.css`,
    srcDir && `${srcDir}/styles/globals.css`,
    "index.css",
  ].filter(Boolean) as string[];
  let cssFile: string | null = null;
  const candidates = cssCandidates;
  for (const c of candidates) {
    const fullPath = path.join(cwd, c);
    if (await fs.pathExists(fullPath)) {
      const content = await fs.readFile(fullPath, "utf-8");
      if (content.includes("tailwindcss")) {
        cssFile = c;
        break;
      }
    }
  }

  // Detect package manager
  let packageManager: DetectedProject["packageManager"] = "npm";
  if (await fs.pathExists(path.join(cwd, "pnpm-lock.yaml"))) packageManager = "pnpm";
  else if (await fs.pathExists(path.join(cwd, "yarn.lock"))) packageManager = "yarn";
  else if (await fs.pathExists(path.join(cwd, "bun.lockb"))) packageManager = "bun";

  return { framework, srcDir, appDir, cssFile, packageManager, isNextjs, isVite };
}

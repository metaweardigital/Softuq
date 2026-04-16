import path from "node:path";
import fs from "fs-extra";

export type Framework = "react" | "svelte";

interface DetectedProject {
  framework: Framework;
  srcDir: string;
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

  // Detect src dir
  let srcDir = "src";
  if (isNextjs && (await fs.pathExists(path.join(cwd, "app")))) {
    srcDir = "app";
  } else if (isNextjs && (await fs.pathExists(path.join(cwd, "src/app")))) {
    srcDir = "src";
  }

  // Detect CSS file
  let cssFile: string | null = null;
  const candidates = [
    `${srcDir}/app/globals.css`,
    `${srcDir}/globals.css`,
    `${srcDir}/index.css`,
    `${srcDir}/styles/globals.css`,
  ];
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

  return { framework, srcDir, cssFile, packageManager, isNextjs, isVite };
}

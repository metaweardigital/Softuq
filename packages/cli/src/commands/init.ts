import path from "node:path";
import fs from "fs-extra";
import pc from "picocolors";
import prompts from "prompts";
import { installDeps } from "../utils/deps.js";
import { detectProject, type Framework } from "../utils/detect.js";
import { getSourceDir, loadRegistry } from "../utils/registry.js";

interface InitOptions {
  framework?: string;
  dir?: string;
  yes?: boolean;
}

export async function init(options: InitOptions) {
  const cwd = process.cwd();
  console.log(pc.bold("\n  Softuq Init\n"));

  // Detect project
  const detected = await detectProject(cwd);
  if (!detected) {
    console.log(pc.red("  No package.json found. Run this in a project root."));
    process.exit(1);
  }

  console.log(
    pc.gray(
      `  Detected: ${detected.framework} | ${detected.packageManager} | ${detected.isNextjs ? "Next.js" : detected.isVite ? "Vite" : "other"}`,
    ),
  );

  // Resolve framework
  let framework: Framework = (options.framework as Framework) || detected.framework;
  const componentDir = options.dir || `${detected.srcDir}/components/ui`;
  const libDir = `${detected.srcDir}/lib`;

  if (!options.yes) {
    const answers = await prompts([
      {
        type: "select",
        name: "framework",
        message: "Framework",
        choices: [
          { title: "React", value: "react" },
          { title: "Svelte (coming soon)", value: "svelte", disabled: true },
        ],
        initial: framework === "svelte" ? 1 : 0,
      },
      {
        type: "text",
        name: "componentDir",
        message: "Component directory",
        initial: componentDir,
      },
    ]);
    if (!answers.framework) {
      console.log(pc.gray("  Cancelled."));
      process.exit(0);
    }
    framework = answers.framework;
  }

  const registry = await loadRegistry(framework);
  const sourceDir = getSourceDir(framework);

  // 1. Copy cn() utility
  const utilsSrc = path.join(sourceDir, registry.utils.cn.file);
  const utilsDest = path.join(cwd, libDir, "utils.ts");
  await fs.ensureDir(path.dirname(utilsDest));
  await fs.copy(utilsSrc, utilsDest);
  console.log(pc.green("  ✓ ") + pc.dim(`${libDir}/utils.ts`));

  // 2. Copy JS tokens (used by provider at runtime)
  const tokensSrc = path.resolve(sourceDir, "../../tokens/src/index.ts");
  const tokensDest = path.join(cwd, libDir, "tokens.ts");
  await fs.copy(tokensSrc, tokensDest);
  console.log(pc.green("  ✓ ") + pc.dim(`${libDir}/tokens.ts`));

  // 3. Copy provider (rewrite token import)
  const providerSrc = path.join(sourceDir, registry.provider.file);
  const providerDest = path.join(cwd, componentDir, "../softuq-provider.tsx");
  await fs.ensureDir(path.dirname(providerDest));
  let providerContent = await fs.readFile(providerSrc, "utf-8");
  providerContent = providerContent.replace(/from\s+["']@softuq\/tokens["']/g, `from "@/lib/tokens"`);
  await fs.writeFile(providerDest, providerContent);
  console.log(pc.green("  ✓ ") + pc.dim("softuq-provider.tsx"));

  // 3. Append tokens + theme to globals.css (like shadcn does)
  const cssPath = detected.cssFile || `${detected.srcDir}/app/globals.css`;
  await setupCSS(cwd, cssPath, sourceDir);

  // 4. Install deps
  const allDeps = [...registry.utils.cn.dependencies];
  console.log(pc.dim("\n  Installing dependencies..."));
  installDeps(allDeps, cwd, detected.packageManager);
  console.log(pc.green("  ✓ ") + pc.dim(allDeps.join(", ")));

  // 5. Write config
  const config = {
    framework,
    componentDir,
    libDir,
  };
  await fs.writeJson(path.join(cwd, "softuq.json"), config, { spaces: 2 });
  console.log(pc.green("  ✓ ") + pc.dim("softuq.json"));

  console.log(pc.bold(pc.green("\n  Done! ")) + pc.dim("Run `softuq add button card` to add components.\n"));
}

async function setupCSS(cwd: string, cssPath: string, sourceDir: string) {
  const fullPath = path.join(cwd, cssPath);
  const cssDir = path.dirname(fullPath);
  const marker = "/* Softuq */";

  // Read token + theme files
  const tokensDir = path.resolve(sourceDir, "../../tokens/src");
  const primitives = await fs.readFile(path.join(tokensDir, "primitives.css"), "utf-8");
  const semantic = await fs.readFile(path.join(tokensDir, "semantic.css"), "utf-8");
  const tailwindTheme = await fs.readFile(path.join(tokensDir, "tailwind-theme.css"), "utf-8");

  // Write tokens to separate file (must be @imported before @theme so var() refs resolve)
  const tokensFile = path.join(cssDir, "softuq-tokens.css");
  await fs.writeFile(tokensFile, `${marker}\n${primitives}\n\n${semantic}\n`);
  console.log(pc.green("  ✓ ") + pc.dim("softuq-tokens.css"));

  // Write theme to separate file
  const themeFile = path.join(cssDir, "softuq-theme.css");
  await fs.writeFile(themeFile, tailwindTheme);
  console.log(pc.green("  ✓ ") + pc.dim("softuq-theme.css"));

  // Update globals.css with imports + @source
  const sourceDirective = `@source "../components/ui";`;
  const tokenImport = `@import "./softuq-tokens.css";`;
  const themeImport = `@import "./softuq-theme.css";`;

  if (await fs.pathExists(fullPath)) {
    const content = await fs.readFile(fullPath, "utf-8");
    if (content.includes(marker) || content.includes("softuq-tokens")) {
      console.log(pc.gray("  ○ ") + pc.dim(`${cssPath} (already configured)`));
      return;
    }
    const lines = content.split("\n");
    const twIndex = lines.findIndex((l) => l.includes("tailwindcss"));
    if (twIndex !== -1) {
      // Insert after @import "tailwindcss": @source, token import, theme import
      lines.splice(twIndex + 1, 0, sourceDirective, tokenImport, themeImport);
    }
    await fs.writeFile(fullPath, `${lines.join("\n")}\n`);
  } else {
    await fs.ensureDir(cssDir);
    await fs.writeFile(fullPath, `@import "tailwindcss";\n${sourceDirective}\n${tokenImport}\n${themeImport}\n`);
  }
  console.log(pc.green("  ✓ ") + pc.dim(`${cssPath}`));
}

import path from "node:path";
import fs from "fs-extra";
import pc from "picocolors";
import prompts from "prompts";
import { renderStarter, STARTER_COMPONENTS } from "../templates/starter.js";
import { installDeps } from "../utils/deps.js";
import { type DetectedProject, detectProject, type Framework } from "../utils/detect.js";
import { getSourceDir, getTokensDir, loadRegistry, resolveAllDeps } from "../utils/registry.js";

// Join srcDir + subpath for path construction and display.
// srcDir="" (no-src Next) collapses to just subpath — no leading slash.
function srcPath(srcDir: string, sub: string): string {
  return srcDir ? `${srcDir}/${sub}` : sub;
}

interface InitOptions {
  framework?: string;
  dir?: string;
  yes?: boolean;
  starter?: boolean;
}

export async function init(options: InitOptions) {
  const cwd = process.cwd();
  console.log(pc.bold("\n  Softuq Init\n"));

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

  let framework: Framework = (options.framework as Framework) || detected.framework;
  const componentDir = options.dir || srcPath(detected.srcDir, "components/ui");
  const libDir = srcPath(detected.srcDir, "lib");
  const withStarter = options.starter !== false;

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
  const tokensDir = getTokensDir();
  const tokensSrc = path.join(tokensDir, "index.ts");
  const tokensDest = path.join(cwd, libDir, "tokens.ts");
  await fs.copy(tokensSrc, tokensDest);
  console.log(pc.green("  ✓ ") + pc.dim(`${libDir}/tokens.ts`));

  // 3. Copy provider + its presets dependency to src root
  const providerSrc = path.join(sourceDir, registry.provider.file);
  const providerDest = path.join(cwd, detected.srcDir, "softuq-provider.tsx");
  await fs.ensureDir(path.dirname(providerDest));
  let providerContent = await fs.readFile(providerSrc, "utf-8");
  providerContent = providerContent.replace(/from\s+["']@softuq\/tokens["']/g, `from "@/lib/tokens"`);
  await fs.writeFile(providerDest, providerContent);
  console.log(pc.green("  ✓ ") + pc.dim(srcPath(detected.srcDir, "softuq-provider.tsx")));

  const presetsSrc = path.join(sourceDir, "presets.ts");
  if (await fs.pathExists(presetsSrc)) {
    const presetsDest = path.join(cwd, detected.srcDir, "presets.ts");
    let presetsContent = await fs.readFile(presetsSrc, "utf-8");
    presetsContent = presetsContent.replace(/from\s+["']@softuq\/tokens["']/g, `from "@/lib/tokens"`);
    await fs.writeFile(presetsDest, presetsContent);
    console.log(pc.green("  ✓ ") + pc.dim(srcPath(detected.srcDir, "presets.ts")));
  }

  // 4. CSS: tokens + theme imports
  const defaultCssPath = detected.appDir
    ? `${detected.appDir}/globals.css`
    : srcPath(detected.srcDir, "index.css");
  const cssPath = detected.cssFile || defaultCssPath;
  await setupCSS(cwd, cssPath, detected);

  // 5. Vite needs @ alias (Next has it by default)
  if (detected.isVite) {
    await setupViteAlias(cwd);
  }

  // 5b. Fonts — next/font for Next.js, @fontsource for Vite
  await setupFonts(cwd, detected);

  // 6. Install base deps (cn)
  const baseDeps = [...registry.utils.cn.dependencies];
  console.log(pc.dim("\n  Installing base dependencies..."));
  installDeps(baseDeps, cwd, detected.packageManager);
  console.log(pc.green("  ✓ ") + pc.dim(baseDeps.join(", ")));

  // 7. Write softuq.json (before add(), which requires it)
  const config = { framework, componentDir, libDir };
  await fs.writeJson(path.join(cwd, "softuq.json"), config, { spaces: 2 });
  console.log(pc.green("  ✓ ") + pc.dim("softuq.json"));

  // 8. Wire SoftuqProvider into entry file + data-theme="dark"
  await setupProvider(cwd, detected);

  // 9. Starter landing page (opt-out via --no-starter)
  if (withStarter && framework === "react") {
    console.log(pc.dim("\n  Scaffolding starter page..."));
    await addStarterComponents(cwd, detected, componentDir);
    await writeStarterPage(cwd, detected);
  }

  const nextSteps = withStarter
    ? "Run `npm run dev` and open your browser."
    : "Run `softuq add button card` to add components.";
  console.log(pc.bold(pc.green("\n  Done! ")) + pc.dim(nextSteps) + "\n");
}

/* ============================================
   CSS setup
   ============================================ */

async function setupCSS(cwd: string, cssPath: string, detected: DetectedProject) {
  const fullPath = path.join(cwd, cssPath);
  const cssDir = path.dirname(fullPath);
  const marker = "/* Softuq */";

  const tokensDir = getTokensDir();
  const primitives = await fs.readFile(path.join(tokensDir, "primitives.css"), "utf-8");
  const semantic = await fs.readFile(path.join(tokensDir, "semantic.css"), "utf-8");
  const tailwindTheme = await fs.readFile(path.join(tokensDir, "tailwind-theme.css"), "utf-8");

  const tokensFile = path.join(cssDir, "softuq-tokens.css");
  await fs.writeFile(tokensFile, `${marker}\n${primitives}\n\n${semantic}\n\n${BASE_TYPOGRAPHY_CSS}`);
  console.log(pc.green("  ✓ ") + pc.dim("softuq-tokens.css"));

  const themeFile = path.join(cssDir, "softuq-theme.css");
  await fs.writeFile(themeFile, tailwindTheme);
  console.log(pc.green("  ✓ ") + pc.dim("softuq-theme.css"));

  // Vite: define --font-* vars pointing at @fontsource-variable names (imported in main.tsx).
  // Next.js: next/font injects vars automatically via <html className>, no CSS needed.
  const needsFontsCss = detected.isVite;
  if (needsFontsCss) {
    const fontsFile = path.join(cssDir, "softuq-fonts.css");
    await fs.writeFile(fontsFile, VITE_FONTS_CSS);
    console.log(pc.green("  ✓ ") + pc.dim("softuq-fonts.css"));
  }

  const fontsImport = `@import "./softuq-fonts.css";`;
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
      // Insert AFTER tailwindcss first so twIndex stays valid, then BEFORE for fonts (Vite only).
      lines.splice(twIndex + 1, 0, sourceDirective, tokenImport, themeImport);
      if (needsFontsCss) lines.splice(twIndex, 0, fontsImport);
    }
    await fs.writeFile(fullPath, `${lines.join("\n")}\n`);
  } else {
    await fs.ensureDir(cssDir);
    const head = needsFontsCss ? `${fontsImport}\n@import "tailwindcss";\n` : `@import "tailwindcss";\n`;
    await fs.writeFile(fullPath, `${head}${sourceDirective}\n${tokenImport}\n${themeImport}\n`);
  }
  console.log(pc.green("  ✓ ") + pc.dim(`${cssPath}`));
}

/* ============================================
   Fonts — next/font (Next.js) or @fontsource-variable (Vite)
   ============================================ */

/**
 * Base typography — applies --font-sans / --font-heading so provider-driven
 * font switching actually takes effect on body & headings. Matches docs site globals.css.
 */
const BASE_TYPOGRAPHY_CSS = `/* Softuq — base typography (applies font CSS vars) */
body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}
`;

const VITE_FONTSOURCE_DEPS = [
  "@fontsource-variable/inter",
  "@fontsource-variable/geist",
  "@fontsource-variable/geist-mono",
  "@fontsource-variable/lora",
  "@fontsource-variable/playfair-display",
  "@fontsource-variable/fraunces",
];

const VITE_FONTS_CSS = `/* Softuq fonts — @fontsource-variable packages imported in main.tsx */
:root {
  --font-inter: "Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-geist-sans: "Geist Variable", "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-geist-mono: "Geist Mono Variable", "Geist Mono", ui-monospace, monospace;
  --font-lora: "Lora Variable", "Lora", Georgia, serif;
  --font-playfair: "Playfair Display Variable", "Playfair Display", Georgia, serif;
  --font-fraunces: "Fraunces Variable", "Fraunces", Georgia, serif;
}
`;

const NEXT_FONTS_TS = `import { Fraunces, Inter, Lora, Playfair_Display } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });

export const softuqFontVariables = [inter.variable, lora.variable, playfair.variable, fraunces.variable].join(" ");
`;

async function setupFonts(cwd: string, detected: DetectedProject) {
  if (detected.isNextjs) {
    const fontsPath = path.join(cwd, detected.srcDir, "softuq-fonts.ts");
    if (!(await fs.pathExists(fontsPath))) {
      await fs.writeFile(fontsPath, NEXT_FONTS_TS);
      console.log(pc.green("  ✓ ") + pc.dim(srcPath(detected.srcDir, "softuq-fonts.ts")));
    }
  } else if (detected.isVite) {
    console.log(pc.dim("\n  Installing font packages..."));
    installDeps(VITE_FONTSOURCE_DEPS, cwd, detected.packageManager);
    console.log(pc.green("  ✓ ") + pc.dim("fontsource-variable packages"));
    await wireViteFontImports(cwd);
  }
}

async function wireViteFontImports(cwd: string) {
  const mainPath = path.join(cwd, "src/main.tsx");
  if (!(await fs.pathExists(mainPath))) return;
  let content = await fs.readFile(mainPath, "utf-8");
  if (content.includes("@fontsource-variable/inter")) return;
  const fontImports = VITE_FONTSOURCE_DEPS.map((pkg) => `import "${pkg}";`).join("\n");
  content = `${fontImports}\n${content}`;
  await fs.writeFile(mainPath, content);
  console.log(pc.green("  ✓ ") + pc.dim("src/main.tsx (font imports)"));
}

/* ============================================
   Vite @ alias
   ============================================ */

async function setupViteAlias(cwd: string) {
  // tsconfig.app.json — add baseUrl + paths into compilerOptions
  const tsconfigPath = path.join(cwd, "tsconfig.app.json");
  if (await fs.pathExists(tsconfigPath)) {
    let content = await fs.readFile(tsconfigPath, "utf-8");
    if (!content.includes('"@/*"')) {
      content = content.replace(
        /"compilerOptions":\s*\{/,
        `"compilerOptions": {\n    "baseUrl": ".",\n    "paths": { "@/*": ["./src/*"] },`,
      );
      await fs.writeFile(tsconfigPath, content);
      console.log(pc.green("  ✓ ") + pc.dim("tsconfig.app.json"));
    }
  }

  // vite.config.ts — add resolve.alias
  const viteConfigPath = path.join(cwd, "vite.config.ts");
  if (await fs.pathExists(viteConfigPath)) {
    let content = await fs.readFile(viteConfigPath, "utf-8");
    const hasAlias = content.includes('"@":') || content.includes("'@':");
    if (!hasAlias) {
      if (!content.includes("fileURLToPath")) {
        content = `import { fileURLToPath, URL } from "node:url";\n${content}`;
      }
      content = content.replace(
        /defineConfig\(\{/,
        `defineConfig({\n  resolve: {\n    alias: {\n      "@": fileURLToPath(new URL("./src", import.meta.url)),\n    },\n  },`,
      );
      await fs.writeFile(viteConfigPath, content);
      console.log(pc.green("  ✓ ") + pc.dim("vite.config.ts"));
    }
  }
}

/* ============================================
   Provider wiring
   ============================================ */

async function setupProvider(cwd: string, detected: DetectedProject) {
  if (detected.isNextjs) {
    await wireNextLayout(cwd, detected.appDir);
  } else if (detected.isVite) {
    await wireViteMain(cwd);
    await wireViteIndexHtml(cwd);
  } else {
    console.log(pc.gray("  ○ ") + pc.dim("provider wiring skipped (unknown meta-framework)"));
  }
}

async function wireNextLayout(cwd: string, appDir: string) {
  const layoutPath = path.join(cwd, `${appDir}/layout.tsx`);
  if (!(await fs.pathExists(layoutPath))) {
    console.log(pc.gray("  ○ ") + pc.dim("layout.tsx not found — wire SoftuqProvider manually"));
    return;
  }
  let content = await fs.readFile(layoutPath, "utf-8");
  const alreadyWired = content.includes("SoftuqProvider");
  if (!alreadyWired) {
    content = addImport(content, `import { SoftuqProvider } from "@/softuq-provider";`);
    content = addDataThemeAttr(content);
    content = content.replace(/\{children\}/, "<SoftuqProvider>{children}</SoftuqProvider>");
  }
  if (!content.includes("softuqFontVariables")) {
    content = addImport(content, `import { softuqFontVariables } from "@/softuq-fonts";`);
    content = mergeHtmlClassName(content, "${softuqFontVariables}");
  }
  await fs.writeFile(layoutPath, content);
  console.log(pc.green("  ✓ ") + pc.dim(`${appDir}/layout.tsx`));
}

async function wireViteMain(cwd: string) {
  const mainPath = path.join(cwd, "src/main.tsx");
  if (!(await fs.pathExists(mainPath))) {
    console.log(pc.gray("  ○ ") + pc.dim("src/main.tsx not found — wire SoftuqProvider manually"));
    return;
  }
  let content = await fs.readFile(mainPath, "utf-8");
  if (content.includes("SoftuqProvider")) {
    console.log(pc.gray("  ○ ") + pc.dim("main.tsx (provider already wired)"));
    return;
  }
  content = addImport(content, `import { SoftuqProvider } from "@/softuq-provider";`);
  content = content.replace(/<App\s*\/>/, "<SoftuqProvider>\n      <App />\n    </SoftuqProvider>");
  await fs.writeFile(mainPath, content);
  console.log(pc.green("  ✓ ") + pc.dim("src/main.tsx"));
}

async function wireViteIndexHtml(cwd: string) {
  const htmlPath = path.join(cwd, "index.html");
  if (!(await fs.pathExists(htmlPath))) return;
  let content = await fs.readFile(htmlPath, "utf-8");
  const next = addDataThemeAttr(content);
  if (next === content) return;
  await fs.writeFile(htmlPath, next);
  console.log(pc.green("  ✓ ") + pc.dim("index.html"));
}

function addImport(content: string, importLine: string): string {
  const lines = content.split("\n");
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^import\s/.test(lines[i])) lastImportIdx = i;
  }
  if (lastImportIdx === -1) {
    return `${importLine}\n${content}`;
  }
  lines.splice(lastImportIdx + 1, 0, importLine);
  return lines.join("\n");
}

function addDataThemeAttr(content: string): string {
  return content.replace(/<html([^>]*)>/, (match, attrs) => {
    if (attrs.includes("data-theme=")) return match;
    return `<html data-theme="dark"${attrs}>`;
  });
}

/**
 * Prepend a token to the <html> element's className. Handles:
 *  - template literal: className={`foo bar`} → className={`${token} foo bar`}
 *  - plain string:     className="foo bar"  → className={`${token} foo bar`}
 *  - missing:          <html ...>           → <html className={`${token}`} ...>
 */
function mergeHtmlClassName(content: string, token: string): string {
  const htmlMatch = content.match(/<html([^>]*)>/);
  if (!htmlMatch) return content;
  const attrs = htmlMatch[1];

  const tmpl = attrs.match(/className=\{`([^`]*)`\}/);
  if (tmpl) {
    const next = attrs.replace(tmpl[0], `className={\`${token} ${tmpl[1]}\`}`);
    return content.replace(htmlMatch[0], `<html${next}>`);
  }

  const str = attrs.match(/className="([^"]*)"/);
  if (str) {
    const next = attrs.replace(str[0], `className={\`${token} ${str[1]}\`}`);
    return content.replace(htmlMatch[0], `<html${next}>`);
  }

  return content.replace(htmlMatch[0], `<html${attrs} className={\`${token}\`}>`);
}

/* ============================================
   Starter page
   ============================================ */

async function addStarterComponents(cwd: string, detected: DetectedProject, componentDir: string) {
  const registry = await loadRegistry("react");
  const sourceDir = getSourceDir("react");
  const { components, dependencies } = resolveAllDeps(registry, STARTER_COMPONENTS);

  for (const name of components) {
    const entry = registry.components[name];
    for (const file of entry.files) {
      const src = path.join(sourceDir, file);
      const dest = path.join(cwd, componentDir, path.basename(file));
      if (await fs.pathExists(dest)) continue;
      await fs.ensureDir(path.dirname(dest));
      let fileContent = await fs.readFile(src, "utf-8");
      fileContent = fileContent
        .replace(/from\s+["']\.\.\/\.\.\/lib\/utils["']/g, `from "@/lib/utils"`)
        .replace(/from\s+["']\.\.\/\.\.\/lib\/squircle["']/g, `from "@/lib/squircle"`);
      await fs.writeFile(dest, fileContent);
      console.log(pc.green("  ✓ ") + pc.dim(`${componentDir}/${path.basename(file)}`));
    }
  }

  const pkgPath = path.join(cwd, "package.json");
  const pkg = await fs.readJson(pkgPath);
  const installed = { ...pkg.dependencies, ...pkg.devDependencies };
  const missing = dependencies.filter((d) => !installed[d]);
  if (missing.length > 0) {
    installDeps(missing, cwd, detected.packageManager);
    console.log(pc.green("  ✓ ") + pc.dim(missing.join(", ")));
  }
}

async function writeStarterPage(cwd: string, detected: DetectedProject) {
  if (detected.isNextjs) {
    const pagePath = path.join(cwd, `${detected.appDir}/page.tsx`);
    const content = renderStarter({ useClient: true, exportName: "Home" });
    await fs.writeFile(pagePath, content);
    console.log(pc.green("  ✓ ") + pc.dim(`${detected.appDir}/page.tsx`));
  } else if (detected.isVite) {
    const appPath = path.join(cwd, "src/App.tsx");
    const content = renderStarter({ useClient: false, exportName: "App" });
    await fs.writeFile(appPath, content);
    console.log(pc.green("  ✓ ") + pc.dim("src/App.tsx"));
    // Vite template ships App.css — unused now that App.tsx no longer imports it
    const appCssPath = path.join(cwd, "src/App.css");
    if (await fs.pathExists(appCssPath)) {
      await fs.remove(appCssPath);
    }
  }
}

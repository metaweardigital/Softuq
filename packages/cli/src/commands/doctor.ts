import path from "node:path";
import fs from "fs-extra";
import pc from "picocolors";
import { readConfig } from "../utils/config.js";
import { detectProject } from "../utils/detect.js";

interface CheckResult {
  status: "ok" | "warn" | "fail";
  label: string;
  detail?: string;
  hint?: string;
}

export async function doctor() {
  const cwd = process.cwd();
  console.log(pc.bold("\n  Softuq Doctor\n"));

  const checks: CheckResult[] = [];

  const config = await readConfig(cwd);
  if (!config) {
    process.stderr.write(pc.red("  No softuq.json found. Run `softuq init` first.\n\n"));
    process.exit(1);
  }

  const detected = await detectProject(cwd);
  if (!detected) {
    process.stderr.write(pc.red("  No package.json found.\n\n"));
    process.exit(1);
  }

  checks.push(...(await checkTsconfig(cwd, detected)));
  checks.push(...(await checkViteConfig(cwd, detected)));
  checks.push(...(await checkCSS(cwd, detected)));
  checks.push(...(await checkProvider(cwd, detected)));
  checks.push(...(await checkDataTheme(cwd, detected)));
  checks.push(...(await checkFonts(cwd, detected)));
  checks.push(...checkProviderDeps(cwd, config));

  for (const c of checks) {
    const icon = c.status === "ok" ? pc.green("✓") : c.status === "warn" ? pc.yellow("!") : pc.red("✗");
    const detail = c.detail ? pc.dim(` — ${c.detail}`) : "";
    console.log(`  ${icon} ${c.label}${detail}`);
    if (c.hint && c.status !== "ok") console.log(pc.dim(`      ${c.hint}`));
  }

  const fails = checks.filter((c) => c.status === "fail").length;
  const warns = checks.filter((c) => c.status === "warn").length;

  console.log();
  if (fails === 0 && warns === 0) {
    console.log(pc.green("  All checks passed.\n"));
    return;
  }
  if (fails > 0) {
    process.stderr.write(pc.red(`  ${fails} failed, ${warns} warning${warns === 1 ? "" : "s"}.\n\n`));
    process.exit(1);
  }
  console.log(pc.yellow(`  ${warns} warning${warns === 1 ? "" : "s"}.\n`));
}

async function checkTsconfig(cwd: string, detected: Awaited<ReturnType<typeof detectProject>>): Promise<CheckResult[]> {
  if (!detected) return [];
  const candidates = detected.isNextjs
    ? ["tsconfig.json"]
    : detected.isVite
      ? ["tsconfig.app.json", "tsconfig.json"]
      : ["tsconfig.json"];

  for (const name of candidates) {
    const p = path.join(cwd, name);
    if (!(await fs.pathExists(p))) continue;
    const content = await fs.readFile(p, "utf-8");
    if (content.includes('"@/*"')) {
      return [{ status: "ok", label: `${name} has @/* alias` }];
    }
    return [
      {
        status: "fail",
        label: `${name} missing @/* alias`,
        hint: `Add "paths": { "@/*": ["./src/*"] } to compilerOptions.`,
      },
    ];
  }
  return [{ status: "warn", label: "tsconfig.json not found", hint: "Can't verify @/* alias." }];
}

async function checkViteConfig(
  cwd: string,
  detected: Awaited<ReturnType<typeof detectProject>>,
): Promise<CheckResult[]> {
  if (!detected?.isVite) return [];
  const p = path.join(cwd, "vite.config.ts");
  if (!(await fs.pathExists(p))) {
    return [{ status: "warn", label: "vite.config.ts not found" }];
  }
  const content = await fs.readFile(p, "utf-8");
  const results: CheckResult[] = [];

  if (content.includes("@tailwindcss/vite") && content.includes("tailwindcss()")) {
    results.push({ status: "ok", label: "vite.config.ts has Tailwind v4 plugin" });
  } else {
    results.push({
      status: "fail",
      label: "vite.config.ts missing Tailwind v4 plugin",
      hint: 'Add `import tailwindcss from "@tailwindcss/vite"` and include `tailwindcss()` in plugins.',
    });
  }

  if (content.includes('"@":') || content.includes("'@':")) {
    results.push({ status: "ok", label: "vite.config.ts has @ alias" });
  } else {
    results.push({
      status: "fail",
      label: "vite.config.ts missing @ alias",
      hint: 'Add resolve.alias with "@" → fileURLToPath(new URL("./src", import.meta.url)).',
    });
  }
  return results;
}

async function checkCSS(cwd: string, detected: Awaited<ReturnType<typeof detectProject>>): Promise<CheckResult[]> {
  if (!detected?.cssFile) {
    return [
      {
        status: "warn",
        label: "No CSS file detected",
        hint: "Expected globals.css or index.css with tailwindcss import.",
      },
    ];
  }
  const p = path.join(cwd, detected.cssFile);
  const content = await fs.readFile(p, "utf-8");
  const results: CheckResult[] = [];

  const hasTokens = content.includes("softuq-tokens");
  const hasTheme = content.includes("softuq-theme");
  if (hasTokens && hasTheme) {
    results.push({ status: "ok", label: `${detected.cssFile} imports softuq tokens + theme` });
  } else {
    results.push({
      status: "fail",
      label: `${detected.cssFile} missing softuq imports`,
      hint: 'Re-run `softuq init` or manually add @import "./softuq-tokens.css" and @import "./softuq-theme.css".',
    });
  }

  const twIdx = content.indexOf('"tailwindcss"');
  const tokensIdx = content.indexOf("softuq-tokens");
  const themeIdx = content.indexOf("softuq-theme");
  if (twIdx !== -1 && tokensIdx !== -1 && themeIdx !== -1) {
    if (twIdx < tokensIdx && tokensIdx < themeIdx) {
      results.push({ status: "ok", label: "CSS import order: tailwindcss → tokens → theme" });
    } else {
      results.push({
        status: "fail",
        label: "CSS import order is wrong",
        hint: 'Order must be: @import "tailwindcss" → softuq-tokens.css → softuq-theme.css.',
      });
    }
  }
  return results;
}

async function checkProvider(cwd: string, detected: Awaited<ReturnType<typeof detectProject>>): Promise<CheckResult[]> {
  if (!detected) return [];
  const entry = detected.isNextjs
    ? path.join(cwd, detected.appDir, "layout.tsx")
    : detected.isVite
      ? path.join(cwd, "src/main.tsx")
      : null;
  if (!entry) return [];
  if (!(await fs.pathExists(entry))) {
    return [{ status: "warn", label: `Entry file not found`, detail: path.relative(cwd, entry) }];
  }
  const content = await fs.readFile(entry, "utf-8");
  if (content.includes("SoftuqProvider")) {
    return [{ status: "ok", label: "SoftuqProvider wired", detail: path.relative(cwd, entry) }];
  }
  return [
    {
      status: "fail",
      label: "SoftuqProvider not wired",
      detail: path.relative(cwd, entry),
      hint: "Wrap your app in <SoftuqProvider> from @/softuq-provider.",
    },
  ];
}

async function checkDataTheme(
  cwd: string,
  detected: Awaited<ReturnType<typeof detectProject>>,
): Promise<CheckResult[]> {
  if (!detected) return [];
  const target = detected.isNextjs
    ? path.join(cwd, detected.appDir, "layout.tsx")
    : detected.isVite
      ? path.join(cwd, "index.html")
      : null;
  if (!target || !(await fs.pathExists(target))) return [];
  const content = await fs.readFile(target, "utf-8");
  if (content.includes("data-theme=")) {
    return [{ status: "ok", label: "<html> has data-theme attribute" }];
  }
  return [
    {
      status: "fail",
      label: "<html> missing data-theme",
      hint: 'Add data-theme="dark" (or "light") to the <html> element.',
    },
  ];
}

async function checkFonts(cwd: string, detected: Awaited<ReturnType<typeof detectProject>>): Promise<CheckResult[]> {
  if (!detected) return [];
  if (detected.isNextjs) {
    const fontsPath = path.join(cwd, detected.srcDir, "softuq-fonts.ts");
    if (await fs.pathExists(fontsPath)) {
      return [{ status: "ok", label: "softuq-fonts.ts present (next/font)" }];
    }
    return [
      {
        status: "warn",
        label: "softuq-fonts.ts missing",
        hint: "Re-run `softuq init` to regenerate next/font wiring.",
      },
    ];
  }
  if (detected.isVite) {
    const mainPath = path.join(cwd, "src/main.tsx");
    if (!(await fs.pathExists(mainPath))) return [];
    const content = await fs.readFile(mainPath, "utf-8");
    if (content.includes("@fontsource-variable/inter")) {
      return [{ status: "ok", label: "main.tsx imports @fontsource-variable packages" }];
    }
    return [
      {
        status: "warn",
        label: "main.tsx missing fontsource-variable imports",
        hint: "Re-run `softuq init` or add imports for @fontsource-variable/{inter,geist,...}.",
      },
    ];
  }
  return [];
}

function checkProviderDeps(_cwd: string, config: NonNullable<Awaited<ReturnType<typeof readConfig>>>): CheckResult[] {
  const results: CheckResult[] = [];

  // Orphaned tracking — softuq.json references a framework we don't support.
  if (config.framework !== "react") {
    results.push({
      status: "fail",
      label: `framework "${config.framework}" not supported yet`,
      hint: "Only React is supported today. Follow https://softuq.com for updates.",
    });
  }
  return results;
}

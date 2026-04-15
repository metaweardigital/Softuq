import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import pc from "picocolors";
import prompts from "prompts";

interface SkillOptions {
  global?: boolean;
  dir?: string;
  overwrite?: boolean;
  yes?: boolean;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getSkillSource(): string {
  // __dirname points at dist/ after bundle → cliRoot = packages/cli/
  const cliRoot = path.resolve(__dirname, "..");

  // Published: bundled inside the CLI tarball
  const bundled = path.join(cliRoot, "skill");
  if (fs.existsSync(bundled)) return bundled;

  // Monorepo dev: read directly from repo skills/
  return path.resolve(cliRoot, "../../skills/softuq");
}

function getTargetDir(options: SkillOptions): string {
  if (options.dir) return path.resolve(process.cwd(), options.dir);
  if (options.global) return path.join(os.homedir(), ".claude", "skills", "softuq");
  return path.join(process.cwd(), ".claude", "skills", "softuq");
}

export async function skill(options: SkillOptions) {
  const source = getSkillSource();

  if (!fs.existsSync(source)) {
    console.error(pc.red(`\n  ✖ Skill source not found: ${source}\n`));
    process.exit(1);
  }

  const target = getTargetDir(options);
  const scope = options.global ? "global" : "project";

  console.log(pc.bold(`\n  Installing softuq skill (${scope})\n`));
  console.log(`  ${pc.dim("target")} ${target}`);

  if (fs.existsSync(target) && !options.overwrite) {
    if (options.yes) {
      await fs.remove(target);
    } else {
      const { confirm } = await prompts({
        type: "confirm",
        name: "confirm",
        message: `Target already exists. Overwrite?`,
        initial: false,
      });
      if (!confirm) {
        console.log(pc.dim("\n  Cancelled.\n"));
        return;
      }
      await fs.remove(target);
    }
  }

  await fs.ensureDir(path.dirname(target));
  await fs.copy(source, target, {
    filter: (src) => {
      const base = path.basename(src);
      if (base === ".DS_Store") return false;
      if (base.endsWith(".tsbuildinfo")) return false;
      return true;
    },
  });

  console.log(pc.green(`\n  ✓ Skill installed\n`));
  console.log(
    `  Claude Code will pick it up automatically in ${scope === "global" ? "all projects" : "this project"}.`,
  );
  console.log(pc.dim(`  Triggers on: UI, landing, hero, block, template, component, styling, CSS.\n`));
}

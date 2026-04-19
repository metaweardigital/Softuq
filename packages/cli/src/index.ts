#!/usr/bin/env node
import { createRequire } from "node:module";
import { Command } from "commander";
import { add } from "./commands/add.js";
import { diff } from "./commands/diff.js";
import { doctor } from "./commands/doctor.js";
import { init } from "./commands/init.js";
import { list } from "./commands/list.js";
import { remove } from "./commands/remove.js";
import { skill } from "./commands/skill.js";
import { update } from "./commands/update.js";

const require = createRequire(import.meta.url);
const pkg = require("../package.json") as { version: string };

const program = new Command();

program.name("softuq").description("Add Softuq components to your project").version(pkg.version);

program
  .command("init")
  .description("Initialize Softuq in your project")
  .option("-f, --framework <framework>", "Framework to use (react, svelte)")
  .option("-d, --dir <dir>", "Component directory (default: src/components/ui)")
  .option("-y, --yes", "Skip prompts and use defaults")
  .option("--no-starter", "Skip the starter landing page (provider is still wired)")
  .action(init);

program
  .command("add")
  .description("Add components to your project")
  .argument("[components...]", "Components to add")
  .option("--all", "Add all components")
  .option("--overwrite", "Overwrite existing files")
  .option("-d, --dir <dir>", "Component directory override")
  .action(add);

program
  .command("remove")
  .description("Remove installed components")
  .argument("[components...]", "Components to remove")
  .option("--force", "Remove even if other components depend on them")
  .option("-y, --yes", "Skip confirmation")
  .action(remove);

program
  .command("list")
  .description("List all available components")
  .option("-f, --framework <framework>", "Framework (default: auto-detect)")
  .option("-i, --installed", "Show only installed components")
  .action(list);

program
  .command("diff")
  .description("Show which components have upstream updates")
  .option("-f, --framework <framework>", "Framework override")
  .action(diff);

program
  .command("update")
  .description("Update components to latest version")
  .argument("[components...]", "Components to update (default: all changed)")
  .option("--all", "Update all changed components")
  .option("-y, --yes", "Skip confirmation")
  .action(update);

program.command("doctor").description("Diagnose your Softuq setup").action(doctor);

program
  .command("skill")
  .description("Install the Softuq design skill for Claude Code / AI agents")
  .option("-g, --global", "Install globally to ~/.claude/skills/ (default: project-level)")
  .option("-d, --dir <dir>", "Custom install directory")
  .option("--overwrite", "Overwrite existing skill without prompt")
  .option("-y, --yes", "Skip confirmation")
  .action(skill);

program.parse();

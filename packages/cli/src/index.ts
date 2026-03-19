#!/usr/bin/env node
import { Command } from "commander";
import { add } from "./commands/add.js";
import { diff } from "./commands/diff.js";
import { init } from "./commands/init.js";
import { list } from "./commands/list.js";
import { update } from "./commands/update.js";

const program = new Command();

program.name("designystem").description("Add DesignYstem components to your project").version("0.1.0");

program
  .command("init")
  .description("Initialize DesignYstem in your project")
  .option("-f, --framework <framework>", "Framework to use (react, svelte)")
  .option("-d, --dir <dir>", "Component directory (default: src/components/ui)")
  .option("-y, --yes", "Skip prompts and use defaults")
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
  .command("list")
  .description("List all available components")
  .option("-f, --framework <framework>", "Framework (default: auto-detect)")
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

program.parse();

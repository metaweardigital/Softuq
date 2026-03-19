import { execSync } from "node:child_process";
import pc from "picocolors";

type PM = "pnpm" | "yarn" | "npm" | "bun";

export function installDeps(deps: string[], cwd: string, pm: PM, dev = false) {
  if (deps.length === 0) return;

  const flag = dev ? { pnpm: "-D", yarn: "-D", npm: "--save-dev", bun: "-D" }[pm] : "";
  const cmd = {
    pnpm: `pnpm add ${flag} ${deps.join(" ")}`,
    yarn: `yarn add ${flag} ${deps.join(" ")}`,
    npm: `npm install ${flag} ${deps.join(" ")}`,
    bun: `bun add ${flag} ${deps.join(" ")}`,
  }[pm];

  console.log(pc.gray(`  $ ${cmd}`));
  execSync(cmd, { cwd, stdio: "pipe" });
}

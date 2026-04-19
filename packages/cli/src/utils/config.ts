import path from "node:path";
import fs from "fs-extra";
import type { Framework } from "./detect.js";

export interface InstalledComponent {
  installedAt: string;
}

export interface SoftuqConfig {
  framework: Framework;
  componentDir: string;
  libDir: string;
  components: Record<string, InstalledComponent>;
}

const FILE = "softuq.json";

export async function readConfig(cwd: string): Promise<SoftuqConfig | null> {
  const p = path.join(cwd, FILE);
  if (!(await fs.pathExists(p))) return null;
  const raw = await fs.readJson(p);
  return { components: {}, ...raw };
}

export async function writeConfig(cwd: string, config: SoftuqConfig): Promise<void> {
  await fs.writeJson(path.join(cwd, FILE), config, { spaces: 2 });
}

export async function markInstalled(cwd: string, names: string[]): Promise<void> {
  if (names.length === 0) return;
  const config = await readConfig(cwd);
  if (!config) return;
  const today = new Date().toISOString().slice(0, 10);
  for (const name of names) {
    if (!config.components[name]) {
      config.components[name] = { installedAt: today };
    }
  }
  await writeConfig(cwd, config);
}

export async function markUninstalled(cwd: string, names: string[]): Promise<void> {
  if (names.length === 0) return;
  const config = await readConfig(cwd);
  if (!config) return;
  for (const name of names) {
    delete config.components[name];
  }
  await writeConfig(cwd, config);
}

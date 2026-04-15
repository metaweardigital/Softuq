import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { SkillPage } from "./_components/skill-page";

export const metadata: Metadata = {
  title: "Design Skill — Softuq",
  description:
    "A Claude Code skill that teaches AI coding agents the Softuq design system rules. Typography, spacing, tokens, and component patterns — enforced before any UI is written.",
};

async function readSkillContent(): Promise<string> {
  // In dev: packages/docs/ cwd → ../../skills/softuq/SKILL.md
  // In build: same — Next runs from the docs package root.
  const repoRoot = path.resolve(process.cwd(), "..", "..");
  const skillPath = path.join(repoRoot, "skills", "softuq", "SKILL.md");
  return fs.readFile(skillPath, "utf8");
}

export default async function Page() {
  const skillContent = await readSkillContent();
  return <SkillPage skillContent={skillContent} />;
}

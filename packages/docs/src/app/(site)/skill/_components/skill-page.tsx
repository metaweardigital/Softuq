"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Code,
  CodeBlock,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@softuq/react";
import { BookOpen, Bot, FileText, Shield, Sparkles, Zap } from "lucide-react";

const REFERENCES = [
  {
    file: "SKILL.md",
    title: "Pre-flight checklist & red flags",
    desc: "The entry point Claude reads first. 7 rules, mobile-first patterns, 13 anti-patterns.",
  },
  {
    file: "references/typography.md",
    title: "Typography",
    desc: "Body scale, heading rules (H1/H2 text-balance), paragraph hierarchy, input 16px floor.",
  },
  {
    file: "references/spacing.md",
    title: "Spacing",
    desc: "4px grid, stack hierarchy, page rhythm, app vs web, decision tree.",
  },
  {
    file: "references/tokens.md",
    title: "Tokens & colors",
    desc: "Three-layer architecture, semantic utilities, OKLCH, radius, shadows.",
  },
  {
    file: "references/icons.md",
    title: "Icons",
    desc: "Lucide vs Simple Icons split, sizing, currentColor rules.",
  },
  {
    file: "references/components.md",
    title: "Components",
    desc: "Full CVA template, forwardRef pattern, composable APIs.",
  },
  {
    file: "examples/component.tsx",
    title: "Canonical component",
    desc: "Working Badge component — copy-paste template for new components.",
  },
];

const PRINCIPLES = [
  {
    icon: Zap,
    title: "Pre-flight, not post-hoc",
    desc: "Agent runs a checklist before writing any UI — catches mistakes at source, not in review.",
  },
  {
    icon: Shield,
    title: "Enforces, doesn't suggest",
    desc: "7 hard rules + 9 red flags. Not guidelines — requirements.",
  },
  {
    icon: FileText,
    title: "Lazy-loaded context",
    desc: "Core SKILL.md is ~8KB. Deep references pulled on-demand. Agent's context stays lean.",
  },
  {
    icon: Bot,
    title: "Works with any AI",
    desc: "Standard skill format — Claude Code, Cursor rules, Copilot. Copy-paste, no runtime.",
  },
];

interface SkillPageProps {
  skillContent: string;
}

export function SkillPage({ skillContent }: SkillPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at top, color-mix(in oklch, var(--accent) 15%, transparent), transparent 65%)",
          }}
        />
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="gap-1.5">
            <Sparkles className="size-3" />
            New — v0.5.0
          </Badge>
          <h1 className="mt-[var(--ds-space-stack)] text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance text-fg-primary">
            Your AI assistant, now fluent in your design system.
          </h1>
          <p className="mt-[var(--ds-space-stack)] text-base sm:text-lg text-fg-secondary max-w-2xl mx-auto">
            A Claude Code skill that teaches Claude, Cursor, and Copilot the Softuq rules before they write a single
            line of UI. Typography, spacing, tokens, components — enforced, not suggested.
          </p>
          <div className="mt-[var(--ds-space-stack-lg)] max-w-xl mx-auto">
            <CodeBlock title="terminal">{"npx softuq skill"}</CodeBlock>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)] border-t border-edge-subtle">
        <div className="mx-auto max-w-6xl">
          <div className="mb-[var(--ds-space-stack-lg)] text-center">
            <p className="text-sm font-medium text-accent-text uppercase tracking-wide">Why a skill</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-balance text-fg-primary">
              CLAUDE.md is a long doc. A skill is a checklist.
            </h2>
            <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-secondary max-w-2xl mx-auto">
              Same rules, different delivery. Agents read the skill before writing code — not in passing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--ds-space-gap)]">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="space-y-[var(--ds-space-stack-sm)]">
                <div className="flex items-center justify-center size-10 rounded-[var(--ds-radius-card)] bg-bg-card border border-edge-subtle">
                  <p.icon className="size-5 text-accent-text" />
                </div>
                <h3 className="text-base font-semibold text-fg-primary">{p.title}</h3>
                <p className="text-sm text-fg-secondary leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Install */}
      <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)] border-t border-edge-subtle">
        <div className="mx-auto max-w-3xl">
          <div className="mb-[var(--ds-space-stack-lg)] text-center">
            <p className="text-sm font-medium text-accent-text uppercase tracking-wide">Install</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-balance text-fg-primary">Pick your scope.</h2>
            <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-secondary">
              Three ways to install. Skill activates automatically once it's in <Code>.claude/skills/</Code>.
            </p>
          </div>

          <Tabs defaultValue="cli-project">
            <TabsList>
              <TabsTrigger value="cli-project">CLI (project)</TabsTrigger>
              <TabsTrigger value="cli-global">CLI (global)</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>

            <TabsContent value="cli-project">
              <div className="mt-[var(--ds-space-stack)]">
                <CodeBlock title="terminal">{"npx softuq skill"}</CodeBlock>
                <p className="text-sm text-fg-secondary mt-[var(--ds-space-stack-sm)] leading-relaxed">
                  Installs to <Code>.claude/skills/softuq/</Code> in the current directory. Active only in this project.
                  Recommended for Softuq-based apps.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="cli-global">
              <div className="mt-[var(--ds-space-stack)]">
                <CodeBlock title="terminal">{"npx softuq skill --global"}</CodeBlock>
                <p className="text-sm text-fg-secondary mt-[var(--ds-space-stack-sm)] leading-relaxed">
                  Installs to <Code>~/.claude/skills/softuq/</Code>. Active in every project on your machine. Use if you
                  work across multiple Softuq repos.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="manual">
              <div className="mt-[var(--ds-space-stack)]">
                <CodeBlock title="terminal">
                  {`# Download the skill folder directly
curl -fsSL https://softuq.com/skill/download -o softuq.tar.gz
mkdir -p .claude/skills
tar -xzf softuq.tar.gz -C .claude/skills
rm softuq.tar.gz`}
                </CodeBlock>
                <p className="text-sm text-fg-secondary mt-[var(--ds-space-stack-sm)] leading-relaxed">
                  No CLI needed. Grab the tarball, extract to <Code>.claude/skills/softuq/</Code>, done.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* What's inside */}
      <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)] border-t border-edge-subtle">
        <div className="mx-auto max-w-4xl">
          <div className="mb-[var(--ds-space-stack-lg)] text-center">
            <p className="text-sm font-medium text-accent-text uppercase tracking-wide">What's inside</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-balance text-fg-primary">
              One checklist, six reference files.
            </h2>
            <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-secondary">
              The agent reads <Code>SKILL.md</Code> first. Deep references load on demand.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-gap)]">
            {REFERENCES.map((r) => (
              <Card key={r.file}>
                <CardHeader>
                  <div className="flex items-center gap-[var(--ds-space-stack-sm)]">
                    <BookOpen className="size-4 text-accent-text" />
                    <Code className="text-xs">{r.file}</Code>
                  </div>
                  <CardTitle className="mt-[var(--ds-space-stack-sm)] text-base">{r.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{r.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SKILL.md preview */}
      <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)] border-t border-edge-subtle">
        <div className="mx-auto max-w-4xl">
          <div className="mb-[var(--ds-space-stack-lg)]">
            <p className="text-sm font-medium text-accent-text uppercase tracking-wide">Preview</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-balance text-fg-primary">The skill, in full.</h2>
            <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-secondary">
              Nothing hidden. This is exactly what Claude reads.
            </p>
          </div>
          <CodeBlock title="SKILL.md" language="md">
            {skillContent}
          </CodeBlock>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)] border-t border-edge-subtle">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance text-fg-primary">
            Own the rules, like you own the code.
          </h2>
          <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-secondary max-w-2xl mx-auto">
            The skill is a markdown file. Fork it, edit it, add your team's conventions — or strip it down to just what
            matters to you.
          </p>
          <div className="mt-[var(--ds-space-stack-lg)] flex flex-col sm:flex-row items-center justify-center gap-[var(--ds-space-gap)]">
            <Button size="lg" asChild>
              <a href="/skill/download">Download tarball</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://www.npmjs.com/package/softuq" target="_blank" rel="noopener noreferrer">
                CLI on npm
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

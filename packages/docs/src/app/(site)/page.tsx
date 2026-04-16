"use client";

import { Badge, Code } from "@softuq/react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import FaqAccordion, { type FaqItem } from "@/blocks/web/faq/faq-accordion";
import cliPkg from "../../../../cli/package.json";

const VERSION = cliPkg.version;

const HERO_LINES = [
  { id: "cmd-init", text: "$ npx softuq init", tone: "cmd" as const },
  { id: "ok-init", text: `✔ Softuq v${VERSION} configured.`, tone: "ok" as const },
  { id: "blank", text: "", tone: "blank" as const },
  { id: "cmd-add", text: "$ npx softuq add button card input", tone: "cmd" as const },
  { id: "ok-add", text: "✔ 3 components added.", tone: "ok" as const },
  { id: "ready", text: "Ready.", tone: "dim" as const },
];

const LINE_DELAY_MS = 420;

const LAYERS = [
  {
    num: "01",
    label: "Components",
    stat: "37 primitives",
    desc: "Buttons, dialogs, inputs, menus, tables. CVA variants, full types, accessible — copy into your components/ui/ and own every line.",
    href: "/components",
  },
  {
    num: "02",
    label: "Blocks",
    stat: "40+ sections",
    desc: "Composed page sections — heroes, pricing, testimonials, FAQ, footers. Fork and customize to match your brand.",
    href: "/blocks",
  },
  {
    num: "03",
    label: "Templates",
    stat: "Full pages",
    desc: "Landing pages, dashboards, auth flows — assembled from blocks, ready to ship in an afternoon.",
    href: "/templates",
  },
];

const SOFTUQ_FAQS: FaqItem[] = [
  {
    q: "What makes Softuq different?",
    a: "Copy-paste distribution with a skill for AI coding agents. You own every line — tokens are the only runtime dep, components and blocks live in your repo.",
  },
  {
    q: "How do I install it?",
    a: (
      <p className="text-sm text-fg-muted leading-relaxed">
        Run <Code>npx softuq init</Code> to wire up tokens and the provider, then{" "}
        <Code>npx softuq add button card</Code> to copy components.
      </p>
    ),
  },
  {
    q: "Does it work with my AI assistant?",
    a: (
      <p className="text-sm text-fg-muted leading-relaxed">
        Run <Code>npx softuq skill</Code> to install the Softuq design skill into <Code>.claude/skills/</Code>. Claude
        Code auto-activates it whenever you touch UI.
      </p>
    ),
  },
  {
    q: "Can I customize the tokens?",
    a: "Every token is a CSS variable. Override at the :root level or scope per component via className. Presets cover palette, accent, radius, spacing, and font.",
  },
  {
    q: "Is it accessible?",
    a: "Components ship with keyboard navigation, focus rings, and semantic ARIA. Target is WCAG 2.1 AA contrast in both dark and light modes.",
  },
  {
    q: "What's the license?",
    a: "MIT. Use in personal and commercial projects without attribution.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes Softuq different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Copy-paste distribution with a skill for AI coding agents. You own every line — tokens are the only runtime dep, components and blocks live in your repo.",
      },
    },
    {
      "@type": "Question",
      name: "How do I install it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Run npx softuq init to wire up tokens and the provider, then npx softuq add button card to copy components.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work with my AI assistant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Run npx softuq skill to install the Softuq design skill into .claude/skills/. Claude Code auto-activates it whenever you touch UI.",
      },
    },
    {
      "@type": "Question",
      name: "Can I customize the tokens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every token is a CSS variable. Override at the :root level or scope per component via className. Presets cover palette, accent, radius, spacing, and font.",
      },
    },
    {
      "@type": "Question",
      name: "Is it accessible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Components ship with keyboard navigation, focus rings, and semantic ARIA. Target is WCAG 2.1 AA contrast in both dark and light modes.",
      },
    },
    {
      "@type": "Question",
      name: "What's the license?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MIT. Use in personal and commercial projects without attribution.",
      },
    },
  ],
};

function AnimatedTerminal() {
  return (
    <div
      data-theme="dark"
      className="group relative rounded-[var(--ds-radius-card)] border overflow-hidden"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div
        className="flex items-center justify-between px-[var(--ds-space-card)] py-2"
        style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ background: "var(--text-muted)", opacity: 0.35 }} />
          <span className="size-2.5 rounded-full" style={{ background: "var(--text-muted)", opacity: 0.35 }} />
          <span className="size-2.5 rounded-full" style={{ background: "var(--text-muted)", opacity: 0.35 }} />
        </div>
        <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
          terminal
        </span>
        <span className="w-12" />
      </div>
      <pre
        className="p-[var(--ds-space-card)] overflow-x-auto text-xs leading-relaxed font-mono scrollbar-thin"
        style={{ background: "var(--bg-base)", color: "var(--text-secondary)" }}
      >
        {HERO_LINES.map((line, i) => {
          const color =
            line.tone === "cmd"
              ? "var(--text-primary)"
              : line.tone === "ok"
                ? "var(--accent-text)"
                : line.tone === "dim"
                  ? "var(--text-muted)"
                  : "var(--text-secondary)";
          return (
            <span
              key={line.id}
              className="block animate-fade-up"
              style={{
                color,
                animationDelay: `${i * LINE_DELAY_MS}ms`,
                animationDuration: "0.5s",
                animationFillMode: "both",
                minHeight: "1.4em",
              }}
            >
              {line.text || "\u00A0"}
            </span>
          );
        })}
        <span
          className="inline-block w-[0.55em] h-[1em] align-middle"
          style={{
            background: "var(--text-muted)",
            animation: `fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${HERO_LINES.length * LINE_DELAY_MS}ms both, blink 1.1s steps(1) ${(HERO_LINES.length + 1) * LINE_DELAY_MS}ms infinite`,
          }}
        />
      </pre>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      {/* Hero */}
      <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)] border-b border-edge-subtle">
        <div className="mx-auto max-w-4xl">
          <Badge variant="outline" className="gap-1.5">
            <Sparkles className="size-3" />
            softuq@{VERSION}
          </Badge>
          <h1 className="mt-[var(--ds-space-stack)] text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance text-fg-primary">
            A design system for AI-era projects.
          </h1>
          <p className="mt-[var(--ds-space-stack)] text-base sm:text-lg text-fg-secondary max-w-2xl">
            Components, blocks, and full page templates in one place. Copy-paste distribution. Own the code, theme via
            tokens, deploy today.
          </p>
          <div className="mt-[var(--ds-space-stack-lg)] max-w-xl">
            <AnimatedTerminal />
            <div className="mt-[var(--ds-space-stack)] flex flex-wrap items-center gap-1.5">
              <Badge variant="secondary">React</Badge>
              <Badge variant="ghost" className="text-fg-muted">Vue — soon</Badge>
              <Badge variant="ghost" className="text-fg-muted">Svelte — soon</Badge>
              <Badge variant="ghost" className="text-fg-muted">Astro — soon</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Three layers */}
      <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)] border-b border-edge-subtle">
        <div className="mx-auto max-w-4xl">
          <div className="mb-[var(--ds-space-stack-lg)]">
            <Badge variant="outline">Three layers</Badge>
            <h2 className="mt-[var(--ds-space-stack)] text-3xl sm:text-4xl font-bold tracking-tight text-balance text-fg-primary">
              Copy what you need. Stack what you want.
            </h2>
            <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-secondary max-w-2xl">
              Three layers of distribution. Each one sits on the one below — you pick how deep you go.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {LAYERS.map((l) => (
              <Link
                key={l.num}
                href={l.href}
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-[var(--ds-space-gap)] p-[var(--ds-space-card)] rounded-[var(--ds-radius-card)] border border-edge-subtle hover:border-edge-strong hover:bg-surface-card/60 transition-colors"
              >
                <span className="font-mono text-xs text-fg-dimmed tabular-nums">{l.num}</span>
                <div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-xl font-semibold text-fg-primary">{l.label}</span>
                    <span className="text-sm text-fg-muted">{l.stat}</span>
                  </div>
                  <p className="mt-1 text-sm text-fg-secondary leading-relaxed">{l.desc}</p>
                </div>
                <ArrowRight className="size-4 text-fg-muted group-hover:text-accent-text group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion
        badge="FAQ"
        title="Questions, answered."
        description="Everything you need to know before copy-pasting."
        faqs={SOFTUQ_FAQS}
      />
    </>
  );
}

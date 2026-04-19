"use client";

import { Aurora, Button, Card, CardContent, CodeBlock, Dots, Halo } from "@softuq/react";
import { PageShell } from "../../_components/page-shell";

const HUE_TOKENS = [
  { name: "--ai-hue-1", value: "oklch(0.78 0.12 330)", label: "magenta" },
  { name: "--ai-hue-2", value: "oklch(0.76 0.12 20)", label: "warm red" },
  { name: "--ai-hue-3", value: "oklch(0.80 0.11 150)", label: "emerald" },
  { name: "--ai-hue-4", value: "oklch(0.85 0.08 200)", label: "cyan" },
  { name: "--ai-hue-5", value: "oklch(0.72 0.13 260)", label: "blue" },
  { name: "--ai-hue-6", value: "oklch(0.68 0.14 300)", label: "violet" },
];

const SEMANTIC_TOKENS = [
  { name: "--ai-glow-color", desc: "Ambient glow color used for AI-tinted box-shadows" },
  { name: "--ai-aurora-from", desc: "Aurora left blob color (magenta anchor)" },
  { name: "--ai-aurora-via", desc: "Aurora center blob color (emerald anchor)" },
  { name: "--ai-aurora-to", desc: "Aurora right blob color (violet anchor)" },
];

const COMPONENT_VARS = [
  { name: "--ds-ai-halo-width", default: "1px", controls: "<Halo> ring thickness" },
  { name: "--ds-ai-halo-speed", default: "3s", controls: "<Halo> rotation period" },
  { name: "--ds-ai-halo-bloom-size", default: "10px", controls: "<Halo> blur bloom radius" },
  { name: "--ds-ai-halo-bloom-opacity", default: "0.55", controls: "<Halo> bloom opacity" },
  { name: "--ds-ai-dots-size", default: "8px", controls: "<Dots> dot diameter" },
  { name: "--ds-ai-dots-gap", default: "6px", controls: "<Dots> inter-dot spacing" },
  { name: "--ds-ai-dots-speed", default: "1.2s", controls: "<Dots> bounce period" },
  { name: "--ds-ai-aurora-blur", default: "40px", controls: "<Aurora> blur radius" },
  { name: "--ds-ai-aurora-opacity", default: "0.45", controls: "<Aurora> overall opacity" },
  { name: "--ds-ai-aurora-speed", default: "12s", controls: "<Aurora> drift period" },
  { name: "--ds-ai-aurora-blend", default: "auto", controls: "<Aurora> blend mode — screen (dark) / multiply (light)" },
];

const USE_BULLETS = [
  "Active generation — spinner / dots while the model streams",
  "AI-powered UI surfaces — panels, sidebars, chat windows",
  "Contextual AI entry points — buttons that trigger a model call",
  "Onboarding moments that introduce AI capability",
];

const DO_NOT_USE_BULLETS = [
  "Decorative polish on non-AI features — the iridescent palette carries meaning",
  "Error or destructive states — use status red instead",
  "Always-on ambient decoration — reserve for transient AI states",
  "Dense data tables or form-heavy screens where motion distracts",
];

const CODE_LOADING_BUTTON = `// Loading button with Halo + Dots
function AiButton({ loading }: { loading: boolean }) {
  return (
    <Halo tone="iridescent" active={loading}>
      <Button disabled={loading}>
        {loading ? (
          <>
            Generating
            <Dots size="sm" className="ml-2" />
          </>
        ) : (
          "Ask AI"
        )}
      </Button>
    </Halo>
  );
}`;

const CODE_AI_PANEL = `// AI response panel with Aurora background
function AiPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden p-6">
      <Aurora intensity="subtle" />
      <div className="relative">{children}</div>
    </div>
  );
}`;

const CODE_THINKING_ROW = `// Thinking row in a message list
function ThinkingRow() {
  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-[var(--ds-radius-card)] bg-surface-elevated">
      <Dots size="md" tone="iridescent" />
      <span className="text-sm text-fg-muted">AI is thinking…</span>
    </div>
  );
}`;

export default function AiLayerFoundationPage() {
  return (
    <div className="max-w-6xl mx-auto px-[var(--ds-space-page-x)] py-12">
      <PageShell
        title="AI Layer"
        description="Primitives and semantic tokens for AI-powered states. Aurora, Halo, and Dots share a consistent OKLCH color identity that does not flip with theme."
        crumbs={[{ label: "Foundations", href: "/foundations" }, { label: "AI Layer" }]}
      >
        <div className="space-y-12">
          {/* Hero preview */}
          <section className="relative rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden h-[320px]">
            <Aurora intensity="intense" />
            <div className="relative h-full flex flex-col items-center justify-center gap-5">
              <Halo tone="iridescent" size="lg">
                <Button size="lg">
                  Generate
                  <Dots size="sm" className="ml-2" />
                </Button>
              </Halo>
              <p className="text-sm text-fg-muted">AI is drafting a response…</p>
            </div>
          </section>

          {/* Hue anchors */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-fg-primary">Hue anchors (primitives)</h2>
            <p className="text-sm text-fg-muted">
              Six OKLCH values. Identical in dark and light — AI identity does not flip with theme.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {HUE_TOKENS.map((t) => (
                <div key={t.name} className="space-y-2">
                  <div
                    className="h-20 rounded-[var(--ds-radius-card)] border border-edge-subtle"
                    style={{ background: `var(${t.name})` }}
                  />
                  <div className="text-xs font-mono text-fg-muted">{t.name}</div>
                  <div className="text-[11px] text-fg-dimmed">{t.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Semantic tokens */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-fg-primary">Semantic tokens</h2>
            <p className="text-sm text-fg-muted">
              Composed from hue anchors. Consumed by components — do not use raw hue vars in component code.
            </p>
            <Card>
              <CardContent className="pt-[var(--ds-space-card)]">
                <div className="divide-y divide-edge-subtle">
                  {SEMANTIC_TOKENS.map((t) => (
                    <div key={t.name} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3">
                      <span className="text-sm font-mono text-fg-primary shrink-0">{t.name}</span>
                      <span className="text-sm text-fg-muted">{t.desc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Component vars */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-fg-primary">Component vars</h2>
            <p className="text-sm text-fg-muted">
              Override any <code className="text-xs font-mono bg-surface-elevated px-1 py-0.5 rounded">--ds-ai-*</code>{" "}
              var on a parent element to adjust a single instance without touching the component source.
            </p>
            <Card>
              <CardContent className="pt-[var(--ds-space-card)]">
                <div className="divide-y divide-edge-subtle">
                  {COMPONENT_VARS.map((v) => (
                    <div
                      key={v.name}
                      className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_80px_1fr] items-center gap-3 py-3"
                    >
                      <span className="text-xs font-mono text-fg-primary">{v.name}</span>
                      <span className="text-xs font-mono text-fg-secondary text-right sm:text-center">{v.default}</span>
                      <span className="hidden sm:block text-xs text-fg-muted">{v.controls}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* When to use / do not use */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-fg-primary">Usage guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-gap)]">
              <Card>
                <CardContent className="pt-[var(--ds-space-card)]">
                  <h3 className="text-sm font-semibold text-fg-primary mb-3">When to use</h3>
                  <ul className="space-y-2">
                    {USE_BULLETS.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-fg-secondary">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-[var(--ds-space-card)]">
                  <h3 className="text-sm font-semibold text-fg-primary mb-3">Do not use</h3>
                  <ul className="space-y-2">
                    {DO_NOT_USE_BULLETS.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-fg-secondary">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How to apply */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-fg-primary">How to apply to existing components</h2>
            <p className="text-sm text-fg-muted">
              Three common patterns: a loading button, an AI response panel, and a thinking row.
            </p>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-fg-muted uppercase tracking-wide">Loading button</p>
                <CodeBlock language="auto">{CODE_LOADING_BUTTON}</CodeBlock>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-fg-muted uppercase tracking-wide">AI panel</p>
                <CodeBlock language="auto">{CODE_AI_PANEL}</CodeBlock>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-fg-muted uppercase tracking-wide">Thinking row</p>
                <CodeBlock language="auto">{CODE_THINKING_ROW}</CodeBlock>
              </div>
            </div>
          </section>

          {/* Motion */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-fg-primary">Motion</h2>
            <p className="text-sm text-fg-secondary">
              All AI animations — halo spin, dots bounce, aurora drift — are wrapped in{" "}
              <code className="text-xs font-mono bg-surface-elevated px-1 py-0.5 rounded">
                @media (prefers-reduced-motion: reduce)
              </code>{" "}
              guards in the token CSS. When reduced motion is active, animations are set to{" "}
              <code className="text-xs font-mono bg-surface-elevated px-1 py-0.5 rounded">none</code> and the halo
              renders as a static iridescent border. Dots remain visible but stationary. Aurora opacity is halved to
              reduce visual noise.
            </p>
          </section>
        </div>
      </PageShell>
    </div>
  );
}

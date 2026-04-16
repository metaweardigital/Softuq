"use client";

import { Badge, Button, Card, CardContent, useSoftuq } from "@softuq/react";
import { Zap } from "lucide-react";
import * as React from "react";
import { PageShell } from "../../_components/page-shell";

function Computed({ name }: { name: string }) {
  const [display, setDisplay] = React.useState<string>("—");

  React.useEffect(() => {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!val) {
      setDisplay("—");
      return;
    }
    if (val.startsWith("clamp(")) {
      const parts = val.match(/clamp\(([^,]+),\s*([^,]+),\s*([^)]+)\)/);
      if (parts) {
        setDisplay(`${parts[1]} → ${parts[3]}`);
        return;
      }
    }
    setDisplay(val);
  }, [name]);

  return <span>{display}</span>;
}

function SpacerBar({ token, label, className }: { token: string; label: string; className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        className="w-full bg-[color-mix(in_oklch,var(--accent)_12%,transparent)] border border-dashed border-[color-mix(in_oklch,var(--accent)_30%,transparent)] rounded-sm flex items-center justify-center"
        style={{ height: `var(${token})` }}
      >
        <span className="text-[10px] font-mono text-accent-text">{label}</span>
      </div>
    </div>
  );
}

function WebSectionDemo() {
  return (
    <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden flex flex-col">
      <div className="px-5 py-3 border-b border-edge-subtle">
        <h3 className="text-sm font-medium text-fg-primary">Web section pattern</h3>
        <p className="text-xs text-fg-muted">Badge → Title → Description → Content grid</p>
      </div>
      <div className="p-[var(--ds-space-card)] flex-1 flex items-center justify-center">
        <div className="max-w-sm w-full">
          <Badge variant="outline">Badge</Badge>

          <SpacerBar token="--ds-space-stack" label="stack" />

          <h2 className="text-2xl font-bold tracking-tight text-fg-primary">Section title</h2>

          <SpacerBar token="--ds-space-stack-sm" label="stack-sm" />

          <p className="text-fg-muted text-sm">Description text lives close to the title — they form a visual unit.</p>

          <SpacerBar token="--ds-space-stack-lg" label="stack-lg" />

          <div className="grid grid-cols-3 gap-[var(--ds-space-gap)]">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-[var(--ds-space-card)]">
                  <div className="h-8 rounded-sm bg-surface-elevated" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AppLayoutDemo() {
  return (
    <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
      <div className="px-5 py-3 border-b border-edge-subtle">
        <h3 className="text-sm font-medium text-fg-primary">App layout pattern</h3>
        <p className="text-xs text-fg-muted">Page padding → Header → Cards with stack gap</p>
      </div>
      <div className="bg-surface-base overflow-hidden">
        <div
          className="relative p-[var(--ds-space-page-x)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklch, var(--accent) 8%, transparent) var(--ds-space-page-x), transparent var(--ds-space-page-x), transparent calc(100% - var(--ds-space-page-x)), color-mix(in oklch, var(--accent) 8%, transparent) calc(100% - var(--ds-space-page-x)))",
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-mono text-accent-text">← page-x</span>
            <span className="text-[10px] font-mono text-accent-text">page-x →</span>
          </div>
          <div>
            <header>
              <h2 className="text-lg font-semibold text-fg-primary">Page title</h2>
              <p className="text-xs text-fg-muted">Subtitle uses tight coupling</p>
            </header>

            <SpacerBar token="--ds-space-stack" label="stack" />

            <Card>
              <CardContent className="pt-[var(--ds-space-card)]">
                <div className="h-6 w-3/4 rounded-sm bg-surface-elevated" />
              </CardContent>
            </Card>

            <SpacerBar token="--ds-space-stack" label="stack" />

            <Card>
              <CardContent className="pt-[var(--ds-space-card)]">
                <div className="h-6 w-1/2 rounded-sm bg-surface-elevated" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonAnatomyDemo() {
  const sizes = [
    { label: "sm", heightPx: "32px", gapPx: "6px", padding: "--ds-space-button-sm", textSize: "text-xs" },
    { label: "md", heightPx: "40px", gapPx: "8px", padding: "--ds-space-button-md", textSize: "text-sm" },
    { label: "lg", heightPx: "48px", gapPx: "10px", padding: "--ds-space-button-lg", textSize: "text-base" },
  ];

  return (
    <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
      <div className="px-5 py-3 border-b border-edge-subtle">
        <h3 className="text-sm font-medium text-fg-primary">Button anatomy</h3>
        <p className="text-xs text-fg-muted">Padding scales per size, gap is always smaller than padding</p>
      </div>
      <div className="p-[var(--ds-space-card)] space-y-6">
        {sizes.map((s) => (
          <div key={s.label} className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" size="sm">
                {s.label}
              </Badge>
              <span className="text-xs text-fg-muted">
                padding: <Computed name={s.padding} /> · gap: {s.gapPx}
              </span>
            </div>
            {/* Simulated anatomy */}
            <div className="flex items-center" style={{ height: s.heightPx }}>
              {/* Left padding */}
              <div
                className="shrink-0 h-full bg-[color-mix(in_oklch,var(--accent)_12%,transparent)] border-y border-l border-dashed border-[color-mix(in_oklch,var(--accent)_30%,transparent)] rounded-l-[var(--ds-radius-button)] flex items-center justify-center"
                style={{ width: `var(${s.padding})` }}
              >
                <span className="text-[9px] font-mono text-accent-text">px</span>
              </div>
              {/* Icon placeholder */}
              <div className="shrink-0 bg-surface-elevated border border-edge-subtle rounded-sm flex items-center justify-center size-5">
                <Zap className="size-3 text-fg-muted" />
              </div>
              {/* Gap */}
              <div
                className="shrink-0 h-full bg-[color-mix(in_oklch,var(--accent)_8%,transparent)] border-y border-dashed border-[color-mix(in_oklch,var(--accent)_20%,transparent)] flex items-center justify-center"
                style={{ width: s.gapPx }}
              >
                <span className="text-[8px] font-mono text-accent-text leading-none">g</span>
              </div>
              {/* Text */}
              <div className={`shrink-0 ${s.textSize} font-medium text-fg-primary`}>Label</div>
              {/* Right padding */}
              <div
                className="shrink-0 h-full bg-[color-mix(in_oklch,var(--accent)_12%,transparent)] border-y border-r border-dashed border-[color-mix(in_oklch,var(--accent)_30%,transparent)] rounded-r-[var(--ds-radius-button)] flex items-center justify-center"
                style={{ width: `var(${s.padding})` }}
              >
                <span className="text-[9px] font-mono text-accent-text">px</span>
              </div>
            </div>
            {/* Real button */}
            <Button size={s.label as "sm" | "md" | "lg"}>
              <Zap />
              Label
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TokenTable() {
  const tokens = [
    { name: "--ds-space-page-x", desc: "Page horizontal padding", type: "fluid" },
    { name: "--ds-space-section-y", desc: "Web section vertical spacing", type: "fluid" },
    { name: "--ds-space-stack-sm", desc: "Title ↔ description", type: "static" },
    { name: "--ds-space-stack", desc: "Default group gap", type: "static" },
    { name: "--ds-space-stack-lg", desc: "Section header → content", type: "static" },
    { name: "--ds-space-gap", desc: "Grid / inline gap", type: "static" },
    { name: "--ds-space-card", desc: "Card inner padding", type: "static" },
  ];

  return (
    <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
      <div className="px-5 py-3 border-b border-edge-subtle">
        <h3 className="text-sm font-medium text-fg-primary">Token reference</h3>
      </div>
      <div className="divide-y divide-edge-subtle">
        {tokens.map((t) => (
          <div key={t.name} className="px-5 py-3 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-mono text-fg-primary truncate">{t.name}</p>
              <p className="text-xs text-fg-muted">{t.desc}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {t.type === "fluid" && (
                <Badge variant="outline" size="sm">
                  fluid
                </Badge>
              )}
              <span className="text-xs font-mono text-fg-secondary">
                <Computed name={t.name} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionYDemo() {
  return (
    <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
      <div className="px-5 py-3 border-b border-edge-subtle">
        <h3 className="text-sm font-medium text-fg-primary">section-y: web section breathing</h3>
        <p className="text-xs text-fg-muted">
          Fluid vertical spacing between marketing sections — scales with viewport
        </p>
      </div>
      <div className="p-[var(--ds-space-card)]">
        <div className="max-w-sm mx-auto">
          <div className="rounded-sm bg-surface-elevated border border-edge-subtle p-3 text-center">
            <span className="text-xs text-fg-muted">Hero section</span>
          </div>
          <SpacerBar token="--ds-space-section-y" label="section-y" />
          <div className="rounded-sm bg-surface-elevated border border-edge-subtle p-3 text-center">
            <span className="text-xs text-fg-muted">Features section</span>
          </div>
          <SpacerBar token="--ds-space-section-y" label="section-y" />
          <div className="rounded-sm bg-surface-elevated border border-edge-subtle p-3 text-center">
            <span className="text-xs text-fg-muted">CTA section</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SpacingFoundationPage() {
  const { spacing } = useSoftuq();

  return (
    <div className="max-w-6xl mx-auto px-[var(--ds-space-page-x)] py-12">
      <PageShell
        title="Spacing"
        description={`Layout tokens for vertical rhythm and page structure. Current preset: ${spacing}.`}
        crumbs={[{ label: "Foundations", href: "/foundations" }, { label: "Spacing" }]}
      >
        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-4">Stack hierarchy</h2>
            <p className="text-sm text-fg-muted mb-6">
              Three tiers of vertical spacing. <strong>stack-sm</strong> couples related text (title + description).{" "}
              <strong>stack</strong> separates groups. <strong>stack-lg</strong> creates visual breaks between header
              and content.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--ds-space-gap)]">
              <WebSectionDemo />
              <AppLayoutDemo />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-4">Button spacing</h2>
            <p className="text-sm text-fg-muted mb-6">
              Padding scales per size via tokens. Gap between icon and text is always smaller than side padding — keeps
              content visually centered.
            </p>
            <ButtonAnatomyDemo />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-4">Fluid section spacing</h2>
            <p className="text-sm text-fg-muted mb-6">
              <strong>page-x</strong> and <strong>section-y</strong> use{" "}
              <code className="text-xs bg-surface-elevated px-1 py-0.5 rounded">clamp()</code> — they scale smoothly
              with viewport width. Smaller screens get tighter padding, larger screens breathe.
            </p>
            <SectionYDemo />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-4">All spacing tokens</h2>
            <TokenTable />
          </section>
        </div>
      </PageShell>
    </div>
  );
}

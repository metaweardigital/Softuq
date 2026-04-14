"use client";

import { Badge, Card, CardContent, Code, useDesignYstem } from "@designystem/react";
import * as React from "react";
import { PageShell } from "../../_components/page-shell";

const TYPE_SCALE = [
  { token: "--text-xs", label: "xs", use: "Captions, fine print" },
  { token: "--text-sm", label: "sm", use: "Labels, helper text" },
  { token: "--text-base", label: "base", use: "Body text (default)" },
  { token: "--text-lg", label: "lg", use: "Lead paragraphs" },
  { token: "--text-xl", label: "xl", use: "Section headings" },
  { token: "--text-2xl", label: "2xl", use: "Page sub-headings" },
  { token: "--text-3xl", label: "3xl", use: "Page headings" },
  { token: "--text-4xl", label: "4xl", use: "Hero / display" },
];

const LEADING = [
  { token: "--leading-tight", value: "1.25", use: "Headings, card titles" },
  { token: "--leading-normal", value: "1.5", use: "Body text, paragraphs" },
  { token: "--leading-relaxed", value: "1.75", use: "Long-form content" },
];

const TRACKING = [
  { token: "--tracking-tight", value: "-0.025em", use: "Large headings (2xl+)" },
  { token: "--tracking-normal", value: "0em", use: "Default" },
  { token: "--tracking-wide", value: "0.025em", use: "Uppercase labels, badges" },
];

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

function TypeScaleDemo() {
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)]">
        <div className="divide-y divide-edge-subtle">
          {TYPE_SCALE.map((t) => (
            <div key={t.token} className="flex items-baseline gap-4 py-3">
              <span className="text-xs font-mono text-fg-muted shrink-0 w-16">{t.label}</span>
              <span className="flex-1 text-fg-primary font-semibold truncate" style={{ fontSize: `var(${t.token})` }}>
                The quick brown fox
              </span>
              <span className="text-xs font-mono text-fg-secondary shrink-0">
                <Computed name={t.token} />
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function FluidScaleDemo() {
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)]">
        <h3 className="text-sm font-semibold text-fg-primary mb-3">Fluid clamp() values</h3>
        <p className="text-xs text-fg-muted mb-4">
          Every size uses{" "}
          <code className="text-xs bg-surface-elevated px-1 py-0.5 rounded">clamp(min, preferred, max)</code> — scales
          smoothly between mobile and desktop.
        </p>
        <div className="divide-y divide-edge-subtle">
          {TYPE_SCALE.map((t) => (
            <div key={t.token} className="flex items-center justify-between gap-4 py-2">
              <div className="min-w-0">
                <p className="text-sm font-mono text-fg-primary">{t.token}</p>
                <p className="text-xs text-fg-muted">{t.use}</p>
              </div>
              <Badge variant="outline" size="sm">
                fluid
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function FontPresetsDemo() {
  const { font } = useDesignYstem();
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)]">
        <h3 className="text-sm font-semibold text-fg-primary mb-3">Font presets</h3>
        <p className="text-xs text-fg-muted mb-4">
          Active preset: <strong>{font}</strong>. Change via Theme popover.
        </p>
        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-mono text-fg-muted mb-1">--font-sans</p>
            <p className="text-lg font-sans text-fg-primary">Pack my box with five dozen liquor jugs.</p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-fg-muted mb-1">--font-mono</p>
            <p className="text-lg font-mono text-fg-primary">Pack my box with five dozen liquor jugs.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LeadingDemo() {
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)]">
        <h3 className="text-sm font-semibold text-fg-primary mb-3">Line height</h3>
        <div className="space-y-4">
          {LEADING.map((l) => (
            <div key={l.token}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-fg-primary">{l.token}</span>
                <span className="text-xs text-fg-muted">({l.value})</span>
              </div>
              <p
                className="text-sm text-fg-secondary bg-surface-elevated rounded-[var(--ds-radius-card)] p-3"
                style={{ lineHeight: `var(${l.token})` }}
              >
                This copies design tokens, Tailwind theme, <Code>cn()</Code> utility, and the theme provider into your
                project. It also installs <Code>clsx</Code> and <Code>tailwind-merge</Code> as dependencies. Components
                use <Code>cva()</Code> for variants and <Code>React.forwardRef</Code> for ref forwarding. Use{" "}
                <Code>rounded-[var(--ds-radius-card)]</Code> for cards and <Code>p-[var(--ds-space-card)]</Code> for
                padding.
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TrackingDemo() {
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)]">
        <h3 className="text-sm font-semibold text-fg-primary mb-3">Letter spacing</h3>
        <div className="space-y-3">
          {TRACKING.map((t) => (
            <div key={t.token} className="flex items-center gap-4">
              <span className="text-xs font-mono text-fg-muted shrink-0 w-32">{t.token}</span>
              <span className="text-lg font-semibold text-fg-primary" style={{ letterSpacing: `var(${t.token})` }}>
                DESIGN SYSTEM
              </span>
              <span className="text-xs text-fg-muted ml-auto shrink-0">{t.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RatioDemo() {
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)]">
        <h3 className="text-sm font-semibold text-fg-primary mb-3">Progressive ratio</h3>
        <p className="text-xs text-fg-muted mb-4">
          Smaller steps for body text (~1.15), larger jumps for headings (~1.33). Not a fixed ratio — progressive
          scaling feels more natural.
        </p>
        <div className="flex items-end gap-1">
          {TYPE_SCALE.map((t, i) => {
            const heights = [16, 20, 24, 30, 38, 48, 60, 76];
            return (
              <div key={t.token} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-sm bg-[color-mix(in_oklch,var(--accent)_20%,transparent)]"
                  style={{ height: `${heights[i]}px` }}
                />
                <span className="text-[9px] font-mono text-fg-muted">{t.label}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function TypographyFoundationPage() {
  const { font } = useDesignYstem();

  return (
    <div className="max-w-6xl mx-auto px-[var(--ds-space-page-x)] py-12">
      <PageShell
        title="Typography"
        description={`Major Third scale with fluid clamp() sizing. Current font: ${font}.`}
        crumbs={[{ label: "Foundations", href: "/foundations" }, { label: "Typography" }]}
      >
        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Type scale</h2>
            <p className="text-sm text-fg-muted mb-6">
              8 fluid sizes from <strong>xs</strong> to <strong>4xl</strong>. Each uses{" "}
              <code className="text-xs bg-surface-elevated px-1 py-0.5 rounded">clamp()</code> to scale between mobile
              and desktop. Resize the window to see them change.
            </p>
            <TypeScaleDemo />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Scale ratio</h2>
            <p className="text-sm text-fg-muted mb-6">
              Progressive ratio — body text steps are tight (~1.15), heading jumps are larger (~1.33).
            </p>
            <div className="space-y-[var(--ds-space-gap)]">
              <RatioDemo />
              <FluidScaleDemo />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Font presets</h2>
            <p className="text-sm text-fg-muted mb-6">
              Three presets: <strong>system</strong> (SF Pro), <strong>inter</strong>, and <strong>geist</strong>.
              Switch via the Theme popover.
            </p>
            <FontPresetsDemo />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Line height & letter spacing</h2>
            <p className="text-sm text-fg-muted mb-6">
              Three tiers each. Tight for headings, normal for body, relaxed for long-form.
            </p>
            <div className="space-y-[var(--ds-space-gap)]">
              <LeadingDemo />
              <TrackingDemo />
            </div>
          </section>
        </div>
      </PageShell>
    </div>
  );
}

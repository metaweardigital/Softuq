"use client";

import { Button, Card, CardContent, useSoftuq } from "@softuq/react";
import * as React from "react";
import { PageShell } from "../../_components/page-shell";

const SHADOW_TOKENS = [
  { name: "sm", var: "--shadow-sm", use: "Cards, buttons" },
  { name: "md", var: "--shadow-md", use: "Elevated cards, dropdowns" },
  { name: "lg", var: "--shadow-lg", use: "Modals, popovers, sheets" },
  { name: "inset", var: "--shadow-inset", use: "Pressed / sunken states" },
];

const RADIUS_COMPONENTS = [
  { name: "button", var: "--ds-radius-button" },
  { name: "input", var: "--ds-radius-input" },
  { name: "textarea", var: "--ds-radius-textarea" },
  { name: "card", var: "--ds-radius-card" },
  { name: "checkbox", var: "--ds-radius-checkbox" },
  { name: "tooltip", var: "--ds-radius-tooltip" },
  { name: "avatar", var: "--ds-radius-avatar" },
];

const EASING = [
  { name: "soft", var: "--ease-soft", curve: "cubic-bezier(0.4, 0, 0.2, 1)", use: "Default transitions" },
  { name: "bounce", var: "--ease-bounce", curve: "cubic-bezier(0.34, 1.56, 0.64, 1)", use: "Toggles, checkboxes" },
  { name: "smooth", var: "--ease-smooth", curve: "cubic-bezier(0.16, 1, 0.3, 1)", use: "Modals, sheets" },
];

const DURATIONS = [
  { name: "fast", var: "--duration-fast", value: "150ms", use: "Hover, focus" },
  { name: "normal", var: "--duration-normal", value: "250ms", use: "Color, border, opacity" },
  { name: "slow", var: "--duration-slow", value: "400ms", use: "Layout, transform, slide" },
];

const ANIMATIONS = [
  { name: "fade-up", desc: "Opacity 0→1, Y 8→0" },
  { name: "fade-down", desc: "Opacity 0→1, Y -8→0" },
  { name: "scale-in", desc: "Opacity 0→1, scale 0.95→1" },
  { name: "slide-in-right", desc: "X 100%→0" },
  { name: "slide-in-left", desc: "X -100%→0" },
  { name: "fade-out", desc: "Opacity 1→0, scale 1→0.95" },
  { name: "shimmer", desc: "Gradient sweep (skeleton)" },
  { name: "pulse", desc: "Opacity 1→0.5→1 (loading)" },
];

const DENSITY_TOKENS = [
  { name: "--ds-space-card", desc: "Card padding" },
  { name: "--ds-space-card-sm", desc: "Compact card padding" },
  { name: "--ds-space-input-x", desc: "Input horizontal" },
  { name: "--ds-space-input-y", desc: "Input vertical" },
  { name: "--ds-space-button-sm", desc: "Button sm padding" },
  { name: "--ds-space-button-md", desc: "Button md padding" },
  { name: "--ds-space-button-lg", desc: "Button lg padding" },
];

const Z_INDEX = [
  { name: "dropdown", value: 50 },
  { name: "sticky", value: 100 },
  { name: "overlay", value: 200 },
  { name: "modal", value: 300 },
  { name: "popover", value: 400 },
  { name: "toast", value: 500 },
];

function Computed({ name }: { name: string }) {
  const [display, setDisplay] = React.useState<string>("—");

  React.useEffect(() => {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    setDisplay(val || "—");
  }, [name]);

  return <span>{display}</span>;
}

function ShadowDemo() {
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)]">
        <h3 className="text-sm font-semibold text-fg-primary mb-4">Shadow scale</h3>
        <div className="grid grid-cols-2 gap-4">
          {SHADOW_TOKENS.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <div
                className="w-full h-16 rounded-[var(--ds-radius-card)] bg-surface-card border border-edge-subtle"
                style={{ boxShadow: `var(${s.var})` }}
              />
              <div className="text-center">
                <p className="text-xs font-mono text-fg-primary">{s.name}</p>
                <p className="text-[10px] text-fg-muted">{s.use}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function GlassDemo() {
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)] h-full flex flex-col">
        <h3 className="text-sm font-semibold text-fg-primary mb-4">Glassmorphism</h3>
        <div
          className="relative flex-1 min-h-32 rounded-[var(--ds-radius-card)] overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--accent) 0%, color-mix(in oklch, var(--accent) 40%, var(--bg-base)) 100%)",
          }}
        >
          <div className="absolute inset-4 flex items-center justify-center">
            <div
              className="px-6 py-3 rounded-[var(--ds-radius-card)] border"
              style={{
                backgroundColor: "var(--glass-bg)",
                borderColor: "var(--glass-border)",
                backdropFilter: "blur(var(--glass-blur))",
              }}
            >
              <p className="text-sm font-medium text-fg-primary">Glass panel</p>
              <p className="text-xs text-fg-muted">blur: 20px</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RadiusPresetsDemo() {
  const { radius } = useSoftuq();
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)]">
        <h3 className="text-sm font-semibold text-fg-primary mb-1">Radius presets</h3>
        <p className="text-xs text-fg-muted mb-4">
          Active: <strong>{radius}</strong>. Each component gets its own radius token.
        </p>
        <div className="divide-y divide-edge-subtle">
          {RADIUS_COMPONENTS.map((r) => (
            <div key={r.name} className="flex items-center gap-3 py-2">
              <div
                className="size-8 shrink-0 bg-[color-mix(in_oklch,var(--accent)_20%,transparent)] border border-accent"
                style={{ borderRadius: `var(${r.var})` }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-fg-primary">{r.name}</p>
              </div>
              <span className="text-xs font-mono text-fg-secondary shrink-0">
                <Computed name={r.var} />
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RadiusNestedRule() {
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)] h-full flex flex-col">
        <h3 className="text-sm font-semibold text-fg-primary mb-1">Nested radius rule</h3>
        <p className="text-xs text-fg-muted mb-4">
          Inner radius = outer radius - padding gap. Keeps consistent visual curvature.
        </p>
        <div className="flex-1 flex items-center justify-center">
          <div className="relative rounded-3xl border-2 border-dashed border-accent p-4">
            <span className="absolute -top-2.5 left-4 bg-surface-card px-1 text-[10px] font-mono text-accent-text">
              outer: 24px
            </span>
            <span className="absolute -top-2.5 right-4 bg-surface-card px-1 text-[10px] font-mono text-fg-muted">
              gap: 16px
            </span>
            <div className="rounded-lg border-2 border-dashed border-fg-muted px-8 py-6">
              <span className="text-[10px] font-mono text-fg-muted">inner: 8px (24 - 16)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EasingDemo() {
  const [playing, setPlaying] = React.useState(false);

  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-fg-primary">Easing curves</h3>
          <Button variant="outline" size="sm" onClick={() => setPlaying((p) => !p)}>
            {playing ? "Reset" : "Play"}
          </Button>
        </div>
        <div className="space-y-3">
          {EASING.map((e) => (
            <div key={e.name} className="flex items-center gap-3">
              <span className="text-xs font-mono text-fg-muted shrink-0 w-14">{e.name}</span>
              <div className="flex-1 h-8 bg-surface-elevated rounded-[var(--ds-radius-card)] relative overflow-hidden">
                <div
                  className="absolute top-1 bottom-1 w-6 rounded-sm bg-accent"
                  style={{
                    left: playing ? "calc(100% - 28px)" : "4px",
                    transition: `left 800ms ${e.curve}`,
                  }}
                />
              </div>
              <span className="text-[10px] text-fg-muted shrink-0 hidden sm:block">{e.use}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DurationDemo() {
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)] h-full flex flex-col">
        <h3 className="text-sm font-semibold text-fg-primary mb-4">Duration tokens</h3>
        <div className="flex-1 flex flex-col justify-center space-y-3">
          {DURATIONS.map((d) => (
            <div key={d.name} className="flex items-center gap-3">
              <span className="text-xs font-mono text-fg-muted shrink-0 w-14">{d.name}</span>
              <div className="flex-1 h-2 bg-surface-elevated rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${(parseInt(d.value, 10) / 400) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono text-fg-secondary shrink-0 w-12 text-right">{d.value}</span>
              <span className="text-[10px] text-fg-muted shrink-0 hidden sm:block">{d.use}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const ANIM_CSS: Record<string, string> = {
  "fade-up": "fade-up 0.3s var(--ease-smooth)",
  "fade-down": "fade-down 0.3s var(--ease-smooth)",
  "scale-in": "scale-in 0.2s var(--ease-smooth)",
  "slide-in-right": "slide-in-right 0.3s var(--ease-smooth)",
  "slide-in-left": "slide-in-left 0.3s var(--ease-smooth)",
};

function AnimationsDemo() {
  const [activeAnim, setActiveAnim] = React.useState<string | null>(null);
  const previewableNames = Object.keys(ANIM_CSS);

  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)]">
        <h3 className="text-sm font-semibold text-fg-primary mb-4">Keyframe animations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {previewableNames.map((name) => (
            <button
              key={name}
              type="button"
              className="flex flex-col items-center gap-2 p-3 rounded-[var(--ds-radius-card)] bg-surface-elevated border border-edge-subtle hover:border-accent transition-colors cursor-pointer"
              onClick={() => {
                setActiveAnim(null);
                requestAnimationFrame(() => setActiveAnim(name));
              }}
            >
              <div
                className="size-8 rounded-[var(--ds-radius-checkbox)] bg-accent"
                style={activeAnim === name ? { animation: ANIM_CSS[name] } : undefined}
              />
              <span className="text-[10px] font-mono text-fg-muted">{name}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 divide-y divide-edge-subtle">
          {ANIMATIONS.map((a) => (
            <div key={a.name} className="flex items-center justify-between gap-3 py-2">
              <span className="text-xs font-mono text-fg-primary">{a.name}</span>
              <span className="text-xs text-fg-muted">{a.desc}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DensityDemo() {
  const { spacing } = useSoftuq();
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)]">
        <h3 className="text-sm font-semibold text-fg-primary mb-1">Component density</h3>
        <p className="text-xs text-fg-muted mb-4">
          Active spacing preset: <strong>{spacing}</strong>. Controls internal padding of inputs, buttons, and cards.
        </p>
        <div className="divide-y divide-edge-subtle">
          {DENSITY_TOKENS.map((t) => (
            <div key={t.name} className="flex items-center justify-between gap-4 py-2">
              <div className="min-w-0">
                <p className="text-xs font-mono text-fg-primary">{t.name}</p>
                <p className="text-[10px] text-fg-muted">{t.desc}</p>
              </div>
              <span className="text-xs font-mono text-fg-secondary shrink-0">
                <Computed name={t.name} />
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ZIndexDemo() {
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)]">
        <h3 className="text-sm font-semibold text-fg-primary mb-4">Z-index layers</h3>
        <div className="flex items-end gap-1">
          {Z_INDEX.map((z) => (
            <div key={z.name} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-sm bg-[color-mix(in_oklch,var(--accent)_20%,transparent)] border border-[color-mix(in_oklch,var(--accent)_30%,transparent)]"
                style={{ height: `${(z.value / 500) * 64 + 16}px` }}
              />
              <span className="text-[9px] font-mono text-fg-muted">{z.name}</span>
              <span className="text-[9px] text-fg-dimmed">{z.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function EffectsFoundationPage() {
  const { radius, spacing } = useSoftuq();

  return (
    <div className="max-w-6xl mx-auto px-[var(--ds-space-page-x)] py-12">
      <PageShell
        title="Effects"
        description={`Shadows, radius, animation, and component density. Radius: ${radius}, spacing: ${spacing}.`}
        crumbs={[{ label: "Foundations", href: "/foundations" }, { label: "Effects" }]}
      >
        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Shadows</h2>
            <p className="text-sm text-fg-muted mb-6">
              Palette-tinted in light mode (shadow hue shifts with palette), high-opacity black in dark. Flip theme to
              compare.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-gap)]">
              <ShadowDemo />
              <GlassDemo />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Border radius</h2>
            <p className="text-sm text-fg-muted mb-6">
              5 presets (<strong>none → full</strong>). Each component maps to its own radius token — changing the
              preset updates everything at once.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-gap)]">
              <RadiusPresetsDemo />
              <RadiusNestedRule />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Animation</h2>
            <p className="text-sm text-fg-muted mb-6">
              3 easing curves, 3 duration tiers, and 8 keyframe animations. Click to preview.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-gap)]">
              <EasingDemo />
              <DurationDemo />
            </div>
            <div className="mt-[var(--ds-space-gap)]">
              <AnimationsDemo />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Component density</h2>
            <p className="text-sm text-fg-muted mb-6">
              Internal padding for inputs, buttons, and cards. Changes with the spacing preset. See also:{" "}
              <a href="/foundations/spacing" className="text-accent-text hover:underline">
                Spacing
              </a>{" "}
              for layout tokens.
            </p>
            <div className="space-y-[var(--ds-space-gap)]">
              <DensityDemo />
              <ZIndexDemo />
            </div>
          </section>
        </div>
      </PageShell>
    </div>
  );
}

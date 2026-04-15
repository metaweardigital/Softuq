"use client";

import { Card, CardContent, ToastProvider, Tooltip, useSoftuq, useToast } from "@softuq/react";
import { PageShell } from "../../_components/page-shell";

const GRAY_SHADES = [
  "50",
  "100",
  "150",
  "200",
  "250",
  "300",
  "400",
  "500",
  "600",
  "700",
  "750",
  "800",
  "850",
  "900",
  "920",
  "940",
  "960",
  "980",
];
const ACCENT_SHADES = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
const ACCENT_COLORS = ["blue", "red", "green", "amber", "emerald", "violet"];
const PALETTES = ["gray", "zinc", "stone", "slate", "mauve", "olive"];

function ColorSwatch({
  prefix,
  shade,
  label,
  compact,
}: {
  prefix: string;
  shade: string;
  label?: string;
  compact?: boolean;
}) {
  const { addToast } = useToast();
  const cssVar = `${prefix}-${shade}`;
  return (
    <Tooltip
      content={label ? `var(${label}-${shade})` : `var(${cssVar})`}
      delay={100}
      wrapperClassName={compact ? "flex-1 min-w-0" : "flex-1 min-w-[48px]"}
    >
      <button
        type="button"
        className="w-full flex flex-col items-center gap-0.5 cursor-pointer"
        onClick={() => {
          const el = document.createElement("span");
          el.style.color = `var(${cssVar})`;
          document.body.appendChild(el);
          const computed = getComputedStyle(el).color;
          document.body.removeChild(el);
          navigator.clipboard.writeText(computed);
          addToast({ title: `Copied ${computed}`, variant: "success", duration: 1500 });
        }}
      >
        <div
          className="w-full h-8 rounded-[var(--ds-radius-checkbox)] border border-edge-subtle transition-shadow hover:shadow-lg"
          style={{ backgroundColor: `var(${cssVar})` }}
        />
        <span className="text-[9px] text-fg-muted">{shade}</span>
      </button>
    </Tooltip>
  );
}

function ActivePaletteLabel() {
  const { palette } = useSoftuq();
  return <>{palette.charAt(0).toUpperCase() + palette.slice(1)}</>;
}

function GraySwatches({ shades, compact }: { shades: string[]; compact?: boolean }) {
  const { palette } = useSoftuq();
  return (
    <>
      {shades.map((shade) => (
        <ColorSwatch key={shade} prefix="--gray" shade={shade} label={`--${palette}`} compact={compact} />
      ))}
    </>
  );
}

function PaletteStrip({ name }: { name: string }) {
  const isGray = name === "gray";
  return (
    <div>
      <h4 className="text-xs font-semibold text-fg-primary mb-2 capitalize">
        {isGray ? <ActivePaletteLabel /> : name}
      </h4>
      <div className="flex flex-wrap gap-1">
        {isGray ? (
          <GraySwatches shades={GRAY_SHADES} compact />
        ) : (
          GRAY_SHADES.map((shade) => <ColorSwatch key={shade} prefix={`--${name}`} shade={shade} compact />)
        )}
      </div>
    </div>
  );
}

function AccentStrip({ name }: { name: string }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-fg-primary mb-2 capitalize">{name}</h4>
      <div className="flex flex-wrap gap-1">
        {ACCENT_SHADES.map((shade) => (
          <ColorSwatch key={shade} prefix={`--${name}`} shade={shade} />
        ))}
      </div>
    </div>
  );
}

type SemanticToken = { name: string; var: string; desc: string };

const BG_TOKENS: SemanticToken[] = [
  { name: "base", var: "var(--bg-base)", desc: "Page background" },
  { name: "input", var: "var(--bg-input)", desc: "Input fields" },
  { name: "card", var: "var(--bg-card)", desc: "Card surfaces" },
  { name: "elevated", var: "var(--bg-elevated)", desc: "Raised elements" },
  { name: "popover", var: "var(--bg-popover)", desc: "Popovers, tooltips" },
  { name: "hover", var: "var(--bg-hover)", desc: "Hover state" },
  { name: "selected", var: "var(--bg-selected)", desc: "Selected items" },
];

const TEXT_TOKENS: SemanticToken[] = [
  { name: "primary", var: "var(--text-primary)", desc: "Headings, labels" },
  { name: "secondary", var: "var(--text-secondary)", desc: "Body text" },
  { name: "muted", var: "var(--text-muted)", desc: "Helper text" },
  { name: "dimmed", var: "var(--text-dimmed)", desc: "Placeholders" },
  { name: "inverse", var: "var(--text-inverse)", desc: "On filled buttons" },
];

const STATUS_TOKENS = [
  {
    name: "accent",
    color: "var(--accent)",
    text: "var(--accent-text)",
    muted: "var(--accent-muted)",
    border: "var(--accent-border)",
  },
  {
    name: "destructive",
    color: "var(--destructive)",
    text: "var(--destructive-text)",
    muted: "var(--destructive-muted)",
    border: "var(--destructive-border)",
  },
  {
    name: "success",
    color: "var(--success)",
    text: "var(--success-text)",
    muted: "var(--success-muted)",
    border: "var(--success-border)",
  },
  {
    name: "warning",
    color: "var(--warning)",
    text: "var(--warning-text)",
    muted: "var(--warning-muted)",
    border: "var(--warning-border)",
  },
];

const BORDER_TOKENS: SemanticToken[] = [
  { name: "subtle", var: "var(--border-subtle)", desc: "Dividers, card borders" },
  { name: "default", var: "var(--border-default)", desc: "Input borders" },
  { name: "strong", var: "var(--border-strong)", desc: "Emphasis borders" },
  { name: "accent", var: "var(--border-accent)", desc: "Focus, active" },
];

function SemanticRow({ token }: { token: SemanticToken }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div
        className="size-8 shrink-0 rounded-[var(--ds-radius-button)] border border-edge-subtle"
        style={{ background: token.var }}
      />
      <div className="min-w-0">
        <p className="text-sm font-mono text-fg-primary">{token.name}</p>
        <p className="text-xs text-fg-muted">{token.desc}</p>
      </div>
    </div>
  );
}

function NonChangingScales() {
  return (
    <div className="space-y-3">
      {[
        { name: "dark", prefix: "--dark" },
        { name: "light", prefix: "--light" },
      ].map((scale) => (
        <div key={scale.name} className="flex items-center gap-2">
          <span className="text-xs font-mono text-fg-muted shrink-0 w-10">{scale.name}</span>
          {[5, 10, 20, 40, 70, 90, 100].map((step) => (
            <div key={step} className="flex-1 flex items-center gap-1.5">
              <div
                className="h-6 w-6 shrink-0 rounded-[var(--ds-radius-checkbox)] border border-edge-subtle overflow-hidden"
                style={{
                  backgroundImage: "repeating-conic-gradient(var(--border-default) 0% 25%, transparent 0% 50%)",
                  backgroundSize: "6px 6px",
                }}
              >
                <div className="h-full w-full" style={{ backgroundColor: `var(${scale.prefix}-${step})` }} />
              </div>
              <span className="text-xs text-fg-secondary">{step}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ColorsContent() {
  const { palette, accent } = useSoftuq();

  return (
    <div className="max-w-6xl mx-auto px-[var(--ds-space-page-x)] py-12">
      <PageShell
        title="Colors"
        description={`All colors in OKLCH. Current palette: ${palette}, accent: ${accent}. Change via Theme popover.`}
        crumbs={[{ label: "Foundations", href: "/foundations" }, { label: "Colors" }]}
      >
        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Palette scales</h2>
            <p className="text-sm text-fg-muted mb-6">
              Gray (active: <strong>{palette}</strong>) has 18 shades. Click any swatch to copy its computed OKLCH
              value.
            </p>
            <Card>
              <CardContent className="pt-[var(--ds-space-card)] space-y-4">
                {PALETTES.map((p) => (
                  <PaletteStrip key={p} name={p} />
                ))}
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Accent colors</h2>
            <p className="text-sm text-fg-muted mb-6">
              10-shade scales for brand and status. Active accent: <strong>{accent}</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--ds-space-gap)]">
              {ACCENT_COLORS.map((name) => (
                <Card key={name}>
                  <CardContent className="pt-[var(--ds-space-card)]">
                    <AccentStrip name={name} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Semantic tokens</h2>
            <p className="text-sm text-fg-muted mb-6">
              Purpose-driven tokens mapped from primitives. Flip dark/light with the theme toggle.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-gap)]">
              <Card>
                <CardContent className="pt-[var(--ds-space-card)]">
                  <h3 className="text-sm font-semibold text-fg-primary mb-3">Backgrounds</h3>
                  <div className="divide-y divide-edge-subtle">
                    {BG_TOKENS.map((t) => (
                      <SemanticRow key={t.name} token={t} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-[var(--ds-space-card)]">
                  <h3 className="text-sm font-semibold text-fg-primary mb-3">Text</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                      Primary heading
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Secondary body text
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Muted helper text
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-dimmed)" }}>
                      Dimmed placeholder
                    </p>
                  </div>
                  <div className="divide-y divide-edge-subtle">
                    {TEXT_TOKENS.map((t) => (
                      <SemanticRow key={t.name} token={t} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-[var(--ds-space-card)]">
                  <h3 className="text-sm font-semibold text-fg-primary mb-3">Status colors</h3>
                  <div className="space-y-3">
                    {STATUS_TOKENS.map((s) => (
                      <div key={s.name} className="flex items-center gap-3">
                        <div
                          className="h-8 flex-1 rounded-[var(--ds-radius-button)] border flex items-center px-3"
                          style={{ background: s.muted, borderColor: s.border }}
                        >
                          <span className="text-xs font-medium" style={{ color: s.text }}>
                            {s.name}
                          </span>
                        </div>
                        <div className="size-8 rounded-[var(--ds-radius-button)]" style={{ background: s.color }} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-[var(--ds-space-card)]">
                  <h3 className="text-sm font-semibold text-fg-primary mb-3">Borders</h3>
                  <div className="space-y-3">
                    {BORDER_TOKENS.map((t) => (
                      <div key={t.name} className="flex items-center gap-3">
                        <div
                          className="h-8 flex-1 rounded-[var(--ds-radius-button)] bg-surface-card"
                          style={{ border: `2px solid ${t.var}` }}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-mono text-fg-primary">{t.name}</p>
                          <p className="text-[10px] text-fg-muted">{t.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Non-changing scales</h2>
            <p className="text-sm text-fg-muted mb-6">
              Fixed-alpha scales that never flip with theme. Palette-aware but theme-independent. 100 = solid.
            </p>
            <Card>
              <CardContent className="pt-[var(--ds-space-card)]">
                <NonChangingScales />
              </CardContent>
            </Card>
          </section>
        </div>
      </PageShell>
    </div>
  );
}

export default function ColorsFoundationPage() {
  return (
    <ToastProvider position="center">
      <ColorsContent />
    </ToastProvider>
  );
}

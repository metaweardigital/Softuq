"use client";

import { Badge, Card, CardContent } from "@designystem/react";
import { Gauge, Layers, Palette, Shield, Sparkles, Zap } from "lucide-react";

type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "Fast by default",
    description: "Tree-shakeable copy-paste components keep your bundle lean.",
  },
  {
    icon: Palette,
    title: "Themable",
    description: "Six palettes, eight accents, and fluid radius and spacing presets.",
  },
  {
    icon: Layers,
    title: "Token-driven",
    description: "One source of truth in OKLCH — every component stays in sync.",
  },
  {
    icon: Shield,
    title: "Accessible",
    description: "Keyboard-first primitives, focus rings, and semantic tokens.",
  },
  {
    icon: Gauge,
    title: "Tuned",
    description: "Motion, shadows, and typography calibrated for a soft feel.",
  },
  {
    icon: Sparkles,
    title: "Crafted",
    description: "Small details that make the UI feel deliberate, not generic.",
  },
];

export default function Features01() {
  return (
    <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <Badge variant="outline" className="mb-[var(--ds-space-stack)]">
            Why DesignYstem
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">
            Everything you need, nothing you don't
          </h2>
          <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-muted">
            A compact set of primitives and blocks. Tokens do the heavy lifting so your product stays consistent as it
            grows.
          </p>
        </div>
        <div className="mt-[var(--ds-space-stack-lg)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[var(--ds-space-gap)]">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title}>
                <CardContent className="pt-[var(--ds-space-card)] space-y-[var(--ds-space-gap)]">
                  <div className="size-10 rounded-[var(--ds-radius-checkbox)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-fg-primary">{f.title}</h3>
                    <p className="text-sm text-fg-muted">{f.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

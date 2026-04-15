"use client";

import { Badge, Button, Placeholder } from "@designystem/react";
import { ArrowRight, Check, Layers, Palette } from "lucide-react";

type Row = {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
};

const ROWS: Row[] = [
  {
    icon: Palette,
    eyebrow: "Theming",
    title: "Change one token. Update the entire system.",
    description:
      "Every surface, shadow, and border derives from a single palette. Pick a tint, choose an accent, and the UI adapts everywhere.",
    bullets: ["Six gray palettes", "Eight accent colors", "Fluid radius and spacing presets"],
  },
  {
    icon: Layers,
    eyebrow: "Composition",
    title: "Primitives that compose without fighting you.",
    description:
      "Every component is a composable primitive: forwardRef, CVA variants, sensible defaults. Layer them however your product needs.",
    bullets: ["CVA-driven variants", "Accessible by default", "Framework-agnostic tokens"],
  },
];

export default function FeaturesAlternating() {
  return (
    <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-5xl space-y-[var(--ds-space-stack-lg)]">
        {ROWS.map((row, i) => {
          const Icon = row.icon;
          const reverse = i % 2 === 1;
          return (
            <div
              key={row.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-stack-lg)] items-center ${
                reverse ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <Badge variant="outline" className="mb-[var(--ds-space-stack)] gap-1.5">
                  <Icon className="size-3" />
                  {row.eyebrow}
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-fg-primary">{row.title}</h3>
                <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-muted">{row.description}</p>
                <ul className="mt-[var(--ds-space-stack)] space-y-2">
                  {row.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-fg-secondary">
                      <Check className="size-4 text-accent-text" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" size="sm" className="mt-[var(--ds-space-stack)]">
                  Learn more
                  <ArrowRight />
                </Button>
              </div>
              <Placeholder ratio="classic" icon={Icon} label={row.eyebrow} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

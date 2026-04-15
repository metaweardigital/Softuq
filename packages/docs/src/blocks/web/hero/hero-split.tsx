"use client";

import { Badge, Button, Placeholder } from "@designystem/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const BULLETS = ["Tokens in OKLCH", "Copy-paste CLI", "Five fluid presets"];

export default function HeroSplit() {
  return (
    <section className="relative overflow-hidden px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top right, color-mix(in oklch, var(--accent) 16%, transparent), transparent 55%)",
        }}
      />
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-stack-lg)] items-center">
        <div>
          <Badge variant="outline" className="mb-[var(--ds-space-stack)] gap-1.5">
            <Sparkles className="size-3" />
            New — v1.0 is live
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-fg-primary">
            Design systems that feel like yours
          </h1>
          <p className="mt-[var(--ds-space-stack-sm)] text-base sm:text-lg text-fg-secondary max-w-xl">
            A soft, tactile component library with tokens, primitives, and blocks. Copy what you need, theme what you
            ship.
          </p>
          <ul className="mt-[var(--ds-space-stack)] space-y-2">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-fg-secondary">
                <Check className="size-4 text-accent-text" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-[var(--ds-space-stack-lg)] flex flex-col sm:flex-row items-start sm:items-center gap-[var(--ds-space-gap)]">
            <Button size="md" className="sm:hidden">
              Get started
              <ArrowRight />
            </Button>
            <Button size="lg" className="hidden sm:inline-flex">
              Get started
              <ArrowRight />
            </Button>
            <Button size="md" variant="outline" className="sm:hidden">
              View components
            </Button>
            <Button size="lg" variant="outline" className="hidden sm:inline-flex">
              View components
            </Button>
          </div>
        </div>
        <Placeholder ratio="classic" label="Product preview" />
      </div>
    </section>
  );
}

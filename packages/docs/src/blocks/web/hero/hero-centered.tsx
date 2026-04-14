"use client";

import { Badge, Button } from "@designystem/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero01() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, color-mix(in oklch, var(--accent) 18%, transparent), transparent 60%), radial-gradient(ellipse at bottom, color-mix(in oklch, var(--accent) 10%, transparent), transparent 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Badge variant="outline" className="mb-[var(--ds-space-stack)] gap-1.5">
          <Sparkles className="size-3" />
          New — v1.0 is live
        </Badge>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-fg-primary">
          Build interfaces that feel crafted, not configured
        </h1>
        <p className="mt-[var(--ds-space-stack-sm)] text-base sm:text-lg text-fg-secondary max-w-2xl mx-auto">
          A soft, tactile design system with tokens, components, and a CLI. Copy what you need, own what you ship.
        </p>
        <div className="mt-[var(--ds-space-stack-lg)] flex flex-col sm:flex-row items-center justify-center gap-[var(--ds-space-gap)]">
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
    </section>
  );
}

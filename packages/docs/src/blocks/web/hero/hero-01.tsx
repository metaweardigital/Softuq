"use client";

import { Badge, Button } from "@designystem/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero01() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, color-mix(in oklch, var(--accent) 18%, transparent), transparent 60%), radial-gradient(ellipse at bottom, color-mix(in oklch, var(--accent) 10%, transparent), transparent 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Badge variant="outline" className="mb-6 gap-1.5">
          <Sparkles className="size-3" />
          New — v1.0 is live
        </Badge>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary">
          Build interfaces that feel crafted, not configured
        </h1>
        <p className="mt-6 text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
          A soft, tactile design system with tokens, components, and a CLI. Copy what you need, own what you ship.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg">
            Get started
            <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="outline">
            View components
          </Button>
        </div>
      </div>
    </section>
  );
}

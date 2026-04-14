"use client";

import { Button } from "@designystem/react";
import { ArrowRight } from "lucide-react";

export default function Cta01() {
  return (
    <section className="px-[var(--ds-space-section-x)] py-[var(--ds-space-section-y)]">
      <div
        className="relative mx-auto max-w-4xl rounded-[var(--ds-radius-card)] border border-edge-subtle overflow-hidden px-[var(--ds-space-section-x)] py-[var(--ds-space-section-y)] text-center"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklch, var(--accent) 22%, transparent), color-mix(in oklch, var(--accent) 8%, transparent) 60%, transparent)",
        }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">
          Ship something you're proud of
        </h2>
        <p className="mt-[var(--ds-space-stack)] text-fg-muted max-w-xl mx-auto">
          Copy the components, own the code. No lock-in, no package sprawl — just a system that scales with you.
        </p>
        <div className="mt-[var(--ds-space-stack)] flex flex-col sm:flex-row items-center justify-center gap-[var(--ds-space-gap)]">
          <Button size="lg">
            Start building
            <ArrowRight />
          </Button>
          <Button size="lg" variant="outline">
            Read the docs
          </Button>
        </div>
      </div>
    </section>
  );
}

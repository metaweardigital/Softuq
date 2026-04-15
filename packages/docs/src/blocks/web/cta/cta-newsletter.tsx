"use client";

import { Badge, Button, Input } from "@softuq/react";
import { ArrowRight, Mail } from "lucide-react";

export default function CtaNewsletter() {
  return (
    <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div
        className="relative mx-auto max-w-4xl rounded-[var(--ds-radius-card)] border border-edge-subtle bg-clip-padding overflow-hidden p-[var(--ds-space-card)] sm:p-12"
        style={{
          background:
            "radial-gradient(ellipse at top right, color-mix(in oklch, var(--accent) 20%, transparent), transparent 60%), var(--bg-card)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[var(--ds-space-stack-lg)] items-center">
          <div>
            <Badge variant="outline" className="mb-[var(--ds-space-stack)] gap-1.5">
              <Mail className="size-3" />
              Monthly newsletter
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-fg-primary">
              One email a month. No spam, no fluff.
            </h2>
            <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-secondary max-w-md">
              New components, token releases, and deep-dives on theming — written by the team building it.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-[var(--ds-space-stack-sm)] w-full md:w-80"
          >
            <Input type="email" placeholder="you@company.com" className="w-full sm:flex-1" aria-label="Email address" />
            <Button type="submit" size="md">
              Subscribe
              <ArrowRight />
            </Button>
          </form>
        </div>
        <p className="mt-[var(--ds-space-stack-sm)] text-xs text-fg-dimmed">
          Join 4,200+ designers and engineers. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

"use client";

import { Avatar, Badge, Card, CardContent } from "@designystem/react";
import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Shipping a polished product UI used to take weeks. With DesignYstem we moved from wireframe to production in a weekend.",
    name: "Ava Pollard",
    role: "Staff Engineer, Northwind",
    initials: "AP",
  },
  {
    quote:
      "The tokens are what sold me. Changing one variable cascades through the entire app — theming finally feels solved.",
    name: "Noah Chen",
    role: "Design Lead, Lumen",
    initials: "NC",
  },
  {
    quote:
      "Copy-paste components mean I own the code. No lock-in, no breaking upgrades, no weird abstractions to fight.",
    name: "Leo Marín",
    role: "Founder, Otter",
    initials: "LM",
  },
];

export default function Testimonials01() {
  return (
    <section className="px-[var(--ds-space-section-x)] py-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-[var(--ds-space-stack)]">
            Loved by builders
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">What teams are saying</h2>
          <p className="mt-[var(--ds-space-stack)] text-fg-muted">
            Real feedback from designers and engineers shipping production apps.
          </p>
        </div>
        <div className="mt-[var(--ds-space-stack)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[var(--ds-space-gap)]">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name}>
              <CardContent className="pt-[var(--ds-space-card)] space-y-[var(--ds-space-gap)]">
                <Quote className="size-5 text-accent-text" aria-hidden />
                <p className="text-sm text-fg-secondary leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-edge-subtle">
                  <Avatar size="sm" fallback={t.initials} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-fg-primary truncate">{t.name}</p>
                    <p className="text-xs text-fg-muted truncate">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

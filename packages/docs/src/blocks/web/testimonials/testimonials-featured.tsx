"use client";

import { Avatar, Badge, Card, CardContent } from "@designystem/react";
import { Quote, Star } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

const FEATURED: Testimonial = {
  quote:
    "DesignYstem is the first system that feels like it was built by people who actually ship products. The tokens are sharp, the components compose, and the CLI respects our codebase. We replaced three libraries with it in a week.",
  name: "Ava Pollard",
  role: "Staff Engineer, Northwind",
  initials: "AP",
};

const QUOTES: Testimonial[] = [
  {
    quote: "Theming stopped being a project. One accent change cascades everywhere.",
    name: "Noah Chen",
    role: "Design Lead, Lumen",
    initials: "NC",
  },
  {
    quote: "I own the code. No more breaking package updates at 2am.",
    name: "Leo Marín",
    role: "Founder, Otter",
    initials: "LM",
  },
  {
    quote: "Our Figma and code finally agree on what a button looks like.",
    name: "Iris Halvorsen",
    role: "Design Engineer, Vertex",
    initials: "IH",
  },
];

export default function TestimonialsFeatured() {
  return (
    <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-[var(--ds-space-stack)]">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">Teams shipping faster</h2>
        </div>
        <div className="mt-[var(--ds-space-stack-lg)]">
          <div
            className="relative rounded-[var(--ds-radius-card)] border border-edge-subtle overflow-hidden p-[var(--ds-space-card)] sm:p-10"
            style={{
              background:
                "radial-gradient(ellipse at top, color-mix(in oklch, var(--accent) 18%, transparent), transparent 60%), var(--bg-card)",
            }}
          >
            <Quote className="size-10 text-accent-text/70" aria-hidden />
            <p className="mt-[var(--ds-space-stack-sm)] text-xl sm:text-2xl font-medium text-fg-primary leading-snug">
              "{FEATURED.quote}"
            </p>
            <div className="mt-[var(--ds-space-stack)] flex items-center justify-between gap-[var(--ds-space-gap)] flex-wrap">
              <div className="flex items-center gap-3">
                <Avatar size="md" fallback={FEATURED.initials} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-fg-primary">{FEATURED.name}</p>
                  <p className="text-xs text-fg-muted">{FEATURED.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-accent-text">
                {["s1", "s2", "s3", "s4", "s5"].map((s) => (
                  <Star key={s} className="size-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[var(--ds-space-gap)] grid grid-cols-1 md:grid-cols-3 gap-[var(--ds-space-gap)]">
          {QUOTES.map((q) => (
            <Card key={q.name}>
              <CardContent className="pt-[var(--ds-space-card)] space-y-[var(--ds-space-gap)]">
                <p className="text-sm text-fg-secondary leading-relaxed">"{q.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-edge-subtle">
                  <Avatar size="sm" fallback={q.initials} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-fg-primary truncate">{q.name}</p>
                    <p className="text-xs text-fg-muted truncate">{q.role}</p>
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

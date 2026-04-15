"use client";

import { Badge, Button } from "@softuq/react";
import { ArrowRight, MessageCircle } from "lucide-react";

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "How is Softuq distributed?",
    a: "Tokens ship as an npm package. Components are copied into your project via the CLI, so you own the code and can customize it freely.",
  },
  {
    q: "Does it work with my framework?",
    a: "Today we support React 19 with Next.js and Vite. A Svelte target is on the roadmap. The token layer is framework-agnostic CSS variables.",
  },
  {
    q: "Can I customize the tokens?",
    a: "Yes — every token is a CSS variable. Override them at the :root level or scope them per component with className.",
  },
  {
    q: "Is it accessible?",
    a: "Components ship with keyboard support, focus rings, and semantic ARIA roles. We test against WCAG 2.1 AA for color contrast.",
  },
  {
    q: "What's the license?",
    a: "MIT. Use it in personal and commercial projects without attribution requirements.",
  },
  {
    q: "How do I get updates?",
    a: "Run `npx softuq diff` to see which components have upstream changes, then `update` to pull them in with a confirmation prompt.",
  },
];

export default function FaqTwoColumn() {
  return (
    <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-[var(--ds-space-stack)]">
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">Questions, answered</h2>
          <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-muted">
            The short answers to the things we're asked most often.
          </p>
        </div>
        <div className="mt-[var(--ds-space-stack-lg)] grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-gap)]">
          {FAQS.map((f) => (
            <div
              key={f.q}
              className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-[var(--ds-space-card)]"
            >
              <h3 className="text-base font-semibold text-fg-primary">{f.q}</h3>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-[var(--ds-space-stack-lg)] flex flex-col sm:flex-row items-center justify-center gap-[var(--ds-space-gap)] text-center">
          <p className="text-sm text-fg-secondary inline-flex items-center gap-2">
            <MessageCircle className="size-4 text-accent-text" />
            Still have questions?
          </p>
          <Button variant="outline" size="sm">
            Contact support
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}

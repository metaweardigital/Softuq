"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Badge } from "@softuq/react";
import type * as React from "react";

export interface FaqItem {
  q: string;
  a: React.ReactNode;
}

export interface FaqAccordionProps {
  badge?: string;
  title?: string;
  description?: string;
  faqs?: FaqItem[];
}

const DEFAULT_FAQS: FaqItem[] = [
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
    a: "Yes — every token is a CSS variable. Override them at the :root level or scope them per component with className. Presets cover the common cases.",
  },
  {
    q: "Is it accessible?",
    a: "Components ship with keyboard support, focus rings, and semantic ARIA roles. We test against WCAG 2.1 AA targets for color contrast.",
  },
  {
    q: "What's the license?",
    a: "MIT. Use it in personal and commercial projects without attribution requirements.",
  },
];

export default function FaqAccordion({
  badge = "FAQ",
  title = "Questions, answered",
  description = "Can't find what you're looking for? Reach out and we'll help.",
  faqs = DEFAULT_FAQS,
}: FaqAccordionProps = {}) {
  return (
    <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          {badge ? (
            <Badge variant="outline" className="mb-[var(--ds-space-stack)]">
              {badge}
            </Badge>
          ) : null}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance text-fg-primary">{title}</h2>
          {description ? <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-muted">{description}</p> : null}
        </div>
        <div className="mt-[var(--ds-space-stack-lg)]">
          <Accordion type="single">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>
                  {typeof f.a === "string" ? <p className="text-sm text-fg-muted leading-relaxed">{f.a}</p> : f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

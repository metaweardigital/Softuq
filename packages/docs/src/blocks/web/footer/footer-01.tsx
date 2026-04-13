"use client";

import { Separator } from "@designystem/react";
import { Github, Sparkles, Twitter } from "lucide-react";

type FooterColumn = { title: string; links: { label: string; href: string }[] };

const COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "#" },
      { label: "Blocks", href: "#" },
      { label: "Tokens", href: "#" },
      { label: "CLI", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#" },
      { label: "Getting started", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

export default function Footer01() {
  return (
    <footer className="px-[var(--ds-space-section-x)] py-[var(--ds-space-section-y)] bg-bg-base border-t border-border-subtle">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[var(--ds-space-stack)]">
          <div className="space-y-[var(--ds-space-gap)]">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
                <Sparkles className="size-4" />
              </div>
              <span className="text-sm font-semibold text-text-primary">DesignYstem</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              A soft, tactile design system for modern products.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} className="space-y-[var(--ds-space-gap)]">
              <h3 className="text-xs font-semibold tracking-wide uppercase text-text-dimmed">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-text-secondary hover:text-accent transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-[var(--ds-space-stack)]" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-[var(--ds-space-gap)]">
          <p className="text-xs text-text-muted">© 2026 DesignYstem. MIT licensed.</p>
          <div className="flex items-center gap-[var(--ds-space-gap)]">
            <a href="#" aria-label="GitHub" className="text-text-muted hover:text-accent transition-colors">
              <Github className="size-4" />
            </a>
            <a href="#" aria-label="Twitter" className="text-text-muted hover:text-accent transition-colors">
              <Twitter className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

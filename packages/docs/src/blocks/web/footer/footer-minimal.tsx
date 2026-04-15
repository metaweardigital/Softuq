"use client";

import { Button } from "@designystem/react";
import { SiDiscord, SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { Sparkles } from "lucide-react";

const LINKS = [
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Changelog", href: "#" },
];

export default function FooterMinimal() {
  return (
    <footer className="px-[var(--ds-space-page-x)] py-[var(--ds-space-stack-lg)] bg-surface-base border-t border-edge-subtle">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-[var(--ds-space-stack-sm)]">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
            <Sparkles className="size-4" />
          </div>
          <span className="text-sm font-semibold text-fg-primary">DesignYstem</span>
          <span className="text-xs text-fg-dimmed hidden sm:inline">© 2026</span>
        </div>
        <nav className="flex items-center gap-[var(--ds-space-gap)]">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-fg-secondary hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" asChild>
            <a href="#" aria-label="GitHub">
              <SiGithub />
            </a>
          </Button>
          <Button variant="ghost" size="icon-sm" asChild>
            <a href="#" aria-label="X">
              <SiX />
            </a>
          </Button>
          <Button variant="ghost" size="icon-sm" asChild>
            <a href="#" aria-label="Discord">
              <SiDiscord />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}

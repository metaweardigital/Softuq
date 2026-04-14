"use client";

import { Button, SearchInput, Separator, Sheet } from "@designystem/react";
import { Menu, Sparkles } from "lucide-react";
import * as React from "react";

const NAV_LINKS = [
  { label: "Docs", href: "#docs" },
  { label: "Guides", href: "#guides" },
  { label: "API", href: "#api" },
  { label: "Changelog", href: "#changelog" },
];

function SearchField({ className }: { className?: string }) {
  return (
    <div className={className}>
      <SearchInput placeholder="Search docs..." inputSize="sm" shortcut={["⌘", "K"]} />
    </div>
  );
}

export default function NavbarSearch() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-sticky border-b border-border-subtle bg-bg-base/80 backdrop-blur-glass">
        <div className="mx-auto max-w-6xl h-16 px-[var(--ds-space-section-x)] flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="size-8 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <span className="text-sm font-semibold text-text-primary">Acme</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 h-9 inline-flex items-center rounded-[var(--ds-radius-button)] text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <SearchField className="hidden md:block ml-auto w-64" />

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button size="sm">Get started</Button>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            className="ml-auto md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </Button>
        </div>
      </header>

      <Sheet open={open} onClose={() => setOpen(false)} side="right" size="sm">
        <div className="flex flex-col gap-[var(--ds-space-gap)]">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <span className="text-sm font-semibold text-text-primary">Acme</span>
          </div>
          <SearchField />
          <Separator />
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="h-10 px-3 flex items-center rounded-[var(--ds-radius-button)] text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Separator />
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm">
              Sign in
            </Button>
            <Button size="sm">Get started</Button>
          </div>
        </div>
      </Sheet>
    </>
  );
}

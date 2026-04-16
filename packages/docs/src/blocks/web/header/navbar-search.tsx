"use client";

import { Button, SearchInput, Separator, Sheet } from "@softuq/react";
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
      <header className="sticky top-0 z-sticky border-b border-edge-subtle bg-surface-base/80 backdrop-blur-glass">
        <div className="mx-auto max-w-6xl h-16 px-4 sm:px-[var(--ds-space-page-x)] flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="size-8 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <span className="text-base font-semibold text-fg-primary tracking-[0.1em]">
              softuq<span className="text-xs font-normal text-fg-muted tracking-normal">.com</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Button key={link.label} variant="ghost" size="sm" asChild>
                <a href={link.href}>{link.label}</a>
              </Button>
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
            <span className="text-base font-semibold text-fg-primary tracking-[0.1em]">
              softuq<span className="text-xs font-normal text-fg-muted tracking-normal">.com</span>
            </span>
          </div>
          <SearchField />
          <Separator />
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Button key={link.label} variant="ghost" size="sm" asChild className="justify-start">
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </Button>
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

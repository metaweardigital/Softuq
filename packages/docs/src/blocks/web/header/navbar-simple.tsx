"use client";

import { Button, Separator, Sheet } from "@softuq/react";
import { Menu, Sparkles } from "lucide-react";
import * as React from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Blog", href: "#blog" },
];

export default function NavbarSimple() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-sticky border-b border-edge-subtle bg-surface-base/80 backdrop-blur-glass">
        <div className="mx-auto max-w-6xl h-16 px-4 sm:px-[var(--ds-space-page-x)] grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <a href="#" className="col-start-1 flex items-center gap-2 justify-self-start">
            <div className="size-8 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <span className="text-sm font-semibold text-fg-primary">Acme</span>
          </a>

          <nav className="col-start-2 hidden md:flex items-center gap-1 justify-self-center">
            {NAV_LINKS.map((link) => (
              <Button key={link.label} variant="ghost" size="sm" asChild>
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </nav>

          <div className="col-start-3 justify-self-end flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
              <Button size="sm">Get started</Button>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      <Sheet open={open} onClose={() => setOpen(false)} side="right" size="sm">
        <div className="flex flex-col gap-[var(--ds-space-gap)]">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <span className="text-sm font-semibold text-fg-primary">Acme</span>
          </div>
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

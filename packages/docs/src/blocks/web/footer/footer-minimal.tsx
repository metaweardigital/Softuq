"use client";

import { SiDiscord, SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { Button } from "@softuq/react";
import { Sparkles } from "lucide-react";
import type * as React from "react";

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterSocialItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterMinimalProps {
  /** Full brand slot (already rendered, e.g. logo + wordmark). Defaults to a Softuq demo brand. */
  brand?: React.ReactNode;
  /** Copyright/notice shown beside the brand. Pass `null` to hide. */
  copyright?: string | null;
  /** Footer nav links. */
  links?: FooterLinkItem[];
  /** Social icon buttons. Pass empty array to hide. */
  socials?: FooterSocialItem[];
  /** Component used to render nav links. Default `"a"`. Pass Next.js `Link` for client-side routing. */
  linkComponent?: React.ElementType;
}

function DefaultBrand() {
  return (
    <>
      <div className="size-8 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
        <Sparkles className="size-4" />
      </div>
      <span className="text-sm font-semibold text-fg-primary tracking-[0.1em]">
        softuq<span className="text-xs font-normal text-fg-muted tracking-normal">.com</span>
      </span>
    </>
  );
}

const DEFAULT_LINKS: FooterLinkItem[] = [
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Changelog", href: "#" },
];

const DEFAULT_SOCIALS: FooterSocialItem[] = [
  { label: "GitHub", href: "#", icon: <SiGithub /> },
  { label: "X", href: "#", icon: <SiX /> },
  { label: "Discord", href: "#", icon: <SiDiscord /> },
];

export default function FooterMinimal({
  brand,
  copyright = "© 2026",
  links = DEFAULT_LINKS,
  socials = DEFAULT_SOCIALS,
  linkComponent: LinkComponent = "a",
}: FooterMinimalProps = {}) {
  return (
    <footer className="px-[var(--ds-space-page-x)] py-[var(--ds-space-stack-lg)] bg-surface-base border-t border-edge-subtle">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-[var(--ds-space-stack-sm)]">
        <div className="flex items-center gap-2">
          {brand ?? <DefaultBrand />}
          {copyright ? <span className="text-xs text-fg-dimmed hidden sm:inline">{copyright}</span> : null}
        </div>
        {links.length > 0 ? (
          <nav className="flex items-center gap-[var(--ds-space-gap)]">
            {links.map((l) => (
              <LinkComponent
                key={l.label}
                href={l.href}
                className="text-sm text-fg-secondary hover:text-accent transition-colors"
              >
                {l.label}
              </LinkComponent>
            ))}
          </nav>
        ) : null}
        {socials.length > 0 ? (
          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <Button key={s.label} variant="ghost" size="icon-sm" asChild>
                <a href={s.href} aria-label={s.label}>
                  {s.icon}
                </a>
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </footer>
  );
}

"use client";

import { Button, buttonVariants, cn, Separator, Sheet } from "@softuq/react";
import { Menu, Sparkles } from "lucide-react";
import * as React from "react";

export interface NavLinkItem {
  label: string;
  href: string;
  /** If set, link is active when `currentPath` equals it or starts with `${matchPrefix}/`. Otherwise exact href match. */
  matchPrefix?: string;
}

export interface NavbarSimpleProps {
  /** Full logo slot (already wrapped in a link). Defaults to a demo brand. */
  logo?: React.ReactNode;
  /** Nav link items. Block renders each with `linkComponent`. */
  links?: NavLinkItem[];
  /** Desktop-right actions (rendered in both desktop header and mobile sheet). */
  actions?: React.ReactNode;
  /** Component used to render links. Default `"a"`. Pass Next.js `Link` for client-side routing. */
  linkComponent?: React.ElementType;
  /** Current pathname (e.g. from `usePathname()`). Required for active-link styling. */
  currentPath?: string;
}

const DEFAULT_LINKS: NavLinkItem[] = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Blog", href: "#blog" },
];

const ACTIVE_LINK_CLASS =
  "text-accent-text hover:text-accent-text bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] hover:bg-[color-mix(in_oklch,var(--accent)_18%,transparent)]";

function DefaultLogo() {
  return (
    <a href="#" className="flex items-center gap-2">
      <div className="size-8 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
        <Sparkles className="size-4" />
      </div>
      <span className="text-sm font-semibold text-fg-primary">Acme</span>
    </a>
  );
}

function DefaultActions() {
  return (
    <>
      <Button variant="ghost" size="sm">
        Sign in
      </Button>
      <Button size="sm">Get started</Button>
    </>
  );
}

function isLinkActive(link: NavLinkItem, pathname?: string): boolean {
  if (!pathname) return false;
  if (link.matchPrefix) return pathname === link.matchPrefix || pathname.startsWith(`${link.matchPrefix}/`);
  return pathname === link.href;
}

export default function NavbarSimple({
  logo,
  links = DEFAULT_LINKS,
  actions,
  linkComponent: LinkComponent = "a",
  currentPath,
}: NavbarSimpleProps = {}) {
  const [open, setOpen] = React.useState(false);
  const resolvedLogo = logo ?? <DefaultLogo />;
  const resolvedActions = actions ?? <DefaultActions />;

  const renderLink = (link: NavLinkItem, mobile = false) => {
    const active = isLinkActive(link, currentPath);
    return (
      <LinkComponent
        key={link.href}
        href={link.href}
        aria-current={active ? "page" : undefined}
        onClick={mobile ? () => setOpen(false) : undefined}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "font-sans",
          mobile && "justify-start",
          active && ACTIVE_LINK_CLASS,
        )}
      >
        {link.label}
      </LinkComponent>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-sticky border-b border-edge-subtle bg-surface-base/80 backdrop-blur-glass">
        <div className="mx-auto max-w-6xl h-16 px-4 sm:px-[var(--ds-space-page-x)] grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <div className="col-start-1 justify-self-start">{resolvedLogo}</div>

          <nav className="col-start-2 hidden md:flex items-center gap-1 justify-self-center">
            {links.map((link) => renderLink(link))}
          </nav>

          <div className="col-start-3 justify-self-end flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">{resolvedActions}</div>
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
          <div>{resolvedLogo}</div>
          <Separator />
          <nav className="flex flex-col">{links.map((link) => renderLink(link, true))}</nav>
          <Separator />
          <div className="flex flex-col gap-2">{resolvedActions}</div>
        </div>
      </Sheet>
    </>
  );
}

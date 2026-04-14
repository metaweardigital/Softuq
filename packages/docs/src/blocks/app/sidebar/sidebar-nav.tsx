"use client";

import { Avatar, Badge, Button, cn, SearchInput, Separator } from "@designystem/react";
import { Bell, CreditCard, FolderKanban, Home, Inbox, Plus, Settings, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import type * as React from "react";

type NavItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: string;
};

const PRIMARY: NavItem[] = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: Inbox, label: "Inbox", href: "#inbox", badge: "4" },
  { icon: FolderKanban, label: "Projects", href: "#projects" },
  { icon: Users, label: "Team", href: "#team" },
];

const SECONDARY: NavItem[] = [
  { icon: Bell, label: "Notifications", href: "#notifications" },
  { icon: CreditCard, label: "Billing", href: "#billing" },
  { icon: Settings, label: "Settings", href: "#settings" },
];

function NavLinkItem({ item, active }: { item: NavItem; active?: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "w-full flex items-center gap-2.5 px-2.5 h-8 rounded-[var(--ds-radius-button)] text-sm transition-colors",
        active
          ? "bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text font-medium"
          : "text-fg-secondary hover:bg-surface-hover hover:text-fg-primary",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="flex-1 text-left truncate">{item.label}</span>
      {item.badge && (
        <Badge variant={active ? "default" : "secondary"} size="sm">
          {item.badge}
        </Badge>
      )}
    </Link>
  );
}

type SidebarNavProps = {
  children?: React.ReactNode;
  primaryItems?: NavItem[];
  secondaryItems?: NavItem[];
  activeHref?: string;
};

export default function SidebarNav({
  children,
  primaryItems = PRIMARY,
  secondaryItems = SECONDARY,
  activeHref,
}: SidebarNavProps) {
  const effectiveActive = activeHref ?? primaryItems[0]?.href;

  return (
    <div className="min-h-screen bg-surface-base flex">
      <aside className="w-60 shrink-0 border-r border-edge-subtle flex flex-col p-[var(--ds-space-gap)] gap-[var(--ds-space-gap)]">
        <div className="flex items-center gap-2 px-1">
          <div className="size-7 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
            <Sparkles className="size-4" />
          </div>
          <span className="text-sm font-semibold text-fg-primary">DesignYstem</span>
        </div>

        <SearchInput placeholder="Search..." inputSize="sm" />

        <nav className="flex flex-col gap-0.5">
          {primaryItems.map((item) => (
            <NavLinkItem key={item.label} item={item} active={item.href === effectiveActive} />
          ))}
        </nav>

        <Separator />

        <nav className="flex flex-col gap-0.5">
          {secondaryItems.map((item) => (
            <NavLinkItem key={item.label} item={item} active={item.href === effectiveActive} />
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2.5 p-1.5 rounded-[var(--ds-radius-button)] hover:bg-surface-hover transition-colors">
          <Avatar size="sm" fallback="AP" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-fg-primary truncate">Ava Pollard</p>
            <p className="text-[11px] text-fg-muted truncate">ava@example.com</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {children ?? (
          <div className="p-[var(--ds-space-section-x)]">
            <div className="mx-auto max-w-6xl space-y-[var(--ds-space-stack)]">
              <header className="flex items-start justify-between gap-[var(--ds-space-gap)]">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-fg-primary">Home</h1>
                  <p className="text-sm text-fg-muted">Your workspace at a glance.</p>
                </div>
                <Button size="sm">
                  <Plus />
                  Quick add
                </Button>
              </header>

              <div className="rounded-[var(--ds-radius-card)] border border-dashed border-edge-subtle bg-surface-card p-[var(--ds-space-section-x)] text-center">
                <p className="text-sm text-fg-muted">Your recent activity will appear here.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

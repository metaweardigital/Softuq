"use client";

import { Avatar, Badge, Button, cn, Input, Separator } from "@designystem/react";
import { Bell, CreditCard, FolderKanban, Home, Inbox, Plus, Search, Settings, Sparkles, Users } from "lucide-react";
import type * as React from "react";

type NavItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string;
};

const PRIMARY: NavItem[] = [
  { icon: Home, label: "Home" },
  { icon: Inbox, label: "Inbox", badge: "4" },
  { icon: FolderKanban, label: "Projects" },
  { icon: Users, label: "Team" },
];

const SECONDARY: NavItem[] = [
  { icon: Bell, label: "Notifications" },
  { icon: CreditCard, label: "Billing" },
  { icon: Settings, label: "Settings" },
];

function NavButton({ item, active }: { item: NavItem; active?: boolean }) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      className={cn(
        "w-full flex items-center gap-2.5 px-2.5 h-8 rounded-[var(--ds-radius-button)] text-sm transition-colors",
        active
          ? "bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text"
          : "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="flex-1 text-left truncate">{item.label}</span>
      {item.badge && (
        <Badge variant={active ? "default" : "secondary"} size="sm">
          {item.badge}
        </Badge>
      )}
    </button>
  );
}

export default function Sidebar01({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-base flex">
      <aside className="w-60 shrink-0 border-r border-border-subtle flex flex-col p-[var(--ds-space-gap)] gap-[var(--ds-space-gap)]">
        <div className="flex items-center gap-2 px-1">
          <div className="size-7 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
            <Sparkles className="size-4" />
          </div>
          <span className="text-sm font-semibold text-text-primary">DesignYstem</span>
        </div>

        <div className="relative">
          <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-text-dimmed pointer-events-none" />
          <Input placeholder="Search..." className="h-8 pl-8 text-xs" />
        </div>

        <nav className="flex flex-col gap-0.5">
          {PRIMARY.map((item, i) => (
            <NavButton key={item.label} item={item} active={i === 0} />
          ))}
        </nav>

        <Separator />

        <nav className="flex flex-col gap-0.5">
          {SECONDARY.map((item) => (
            <NavButton key={item.label} item={item} />
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2.5 p-1.5 rounded-[var(--ds-radius-button)] hover:bg-bg-hover transition-colors">
          <Avatar size="sm" fallback="AP" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-text-primary truncate">Ava Pollard</p>
            <p className="text-[11px] text-text-muted truncate">ava@example.com</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {children ?? (
          <div className="p-[var(--ds-space-section-x)]">
            <div className="mx-auto max-w-4xl space-y-[var(--ds-space-stack)]">
              <header className="flex items-start justify-between gap-[var(--ds-space-gap)]">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-text-primary">Home</h1>
                  <p className="text-sm text-text-muted">Your workspace at a glance.</p>
                </div>
                <Button size="sm">
                  <Plus />
                  Quick add
                </Button>
              </header>

              <div className="rounded-[var(--ds-radius-card)] border border-dashed border-border-subtle bg-bg-card p-[var(--ds-space-section-x)] text-center">
                <p className="text-sm text-text-muted">Your recent activity will appear here.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

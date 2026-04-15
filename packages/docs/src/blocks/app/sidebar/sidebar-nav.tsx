"use client";

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  cn,
  SearchInput,
  Separator,
  Sheet,
} from "@softuq/react";
import {
  ArrowUpRight,
  Bell,
  CreditCard,
  DollarSign,
  FolderKanban,
  Home,
  Inbox,
  Menu,
  Plus,
  Settings,
  Sparkles,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

/* === Sidebar Context === */

type SidebarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within <SidebarProvider>");
  return ctx;
}

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>;
}

/* === Sidebar === */

function SidebarPanel({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useSidebar();

  return (
    <>
      <aside className="hidden md:flex w-60 shrink-0 border-r border-edge-subtle flex-col p-[var(--ds-space-app-gap)] gap-[var(--ds-space-app-gap)]">
        {children}
      </aside>
      <Sheet open={open} onClose={() => setOpen(false)} side="left" size="sm">
        <div className="flex flex-col gap-[var(--ds-space-app-gap)]">{children}</div>
      </Sheet>
    </>
  );
}

/* === SidebarTrigger === */

function SidebarTrigger({ className }: { className?: string }) {
  const { setOpen } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={cn("md:hidden", className)}
      aria-label="Open menu"
      onClick={() => setOpen(true)}
    >
      <Menu />
    </Button>
  );
}

/* === Nav items === */

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

function SidebarNavContent({
  primaryItems,
  secondaryItems,
  activeHref,
}: {
  primaryItems: NavItem[];
  secondaryItems: NavItem[];
  activeHref: string;
}) {
  return (
    <>
      <div className="flex items-center gap-2 px-1">
        <div className="size-7 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
          <Sparkles className="size-4" />
        </div>
        <span className="text-sm font-semibold text-fg-primary">Softuq</span>
      </div>

      <SearchInput placeholder="Search..." inputSize="sm" />

      <nav className="flex flex-col gap-0.5">
        {primaryItems.map((item) => (
          <NavLinkItem key={item.label} item={item} active={item.href === activeHref} />
        ))}
      </nav>

      <Separator />

      <nav className="flex flex-col gap-0.5">
        {secondaryItems.map((item) => (
          <NavLinkItem key={item.label} item={item} active={item.href === activeHref} />
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-2.5 p-1.5 rounded-[var(--ds-radius-button)] hover:bg-surface-hover transition-colors">
        <Avatar size="sm" fallback="AP" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-fg-primary truncate">Ava Pollard</p>
          <p className="text-[11px] text-fg-muted truncate">ava@example.com</p>
        </div>
      </div>
    </>
  );
}

/* === Default main content (standalone preview) === */

const STATS = [
  { label: "Revenue", value: "$48,210", delta: "+12.4%", icon: DollarSign },
  { label: "Active users", value: "2,847", delta: "+4.1%", icon: Users },
  { label: "Conversion", value: "3.62%", delta: "-0.8%", icon: Zap },
  { label: "Avg. deal", value: "$1,240", delta: "+2.2%", icon: Wallet },
];

function DefaultContent() {
  return (
    <div className="p-[var(--ds-space-app-page-x)]">
      <div className="mx-auto max-w-6xl space-y-[var(--ds-space-app-stack)]">
        <header className="flex items-start justify-between gap-[var(--ds-space-app-gap)]">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-fg-primary">Overview</h1>
            <p className="text-sm text-fg-muted">Snapshot of your workspace for the last 30 days.</p>
          </div>
          <Button size="sm">
            <Plus />
            New project
          </Button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--ds-space-app-gap)]">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardDescription>{s.label}</CardDescription>
                    <div className="size-8 rounded-[var(--ds-radius-checkbox)] bg-surface-elevated border border-edge-subtle flex items-center justify-center text-fg-muted">
                      <Icon className="size-4" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tracking-tight text-fg-primary">{s.value}</div>
                  <div className="mt-1 inline-flex items-center gap-1 text-xs text-success">
                    <ArrowUpRight className="size-3" />
                    {s.delta}
                    <span className="text-fg-muted">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* === Main export — supports both standalone and wrapper usage === */

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
    <SidebarProvider>
      <div className="min-h-screen bg-surface-base flex">
        <SidebarPanel>
          <SidebarNavContent primaryItems={primaryItems} secondaryItems={secondaryItems} activeHref={effectiveActive} />
        </SidebarPanel>

        <main className="flex-1 min-w-0">
          <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-edge-subtle bg-surface-base px-[var(--ds-space-app-gap)] h-12 md:hidden">
            <SidebarTrigger />
            <div className="size-6 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
              <Sparkles className="size-3.5" />
            </div>
            <span className="text-sm font-semibold text-fg-primary">Softuq</span>
          </div>
          {children ?? <DefaultContent />}
        </main>
      </div>
    </SidebarProvider>
  );
}

export { SidebarPanel, SidebarProvider };

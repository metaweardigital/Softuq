"use client";

import { Badge, Button, Popover, PopoverContent, PopoverTrigger, Separator, Sheet } from "@softuq/react";
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  FileText,
  LifeBuoy,
  Menu,
  MessageCircle,
  Package,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import * as React from "react";

type MegaItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge?: string;
};

type MegaGroup = { label: string; items: MegaItem[] };

const PRODUCT_GROUP: MegaGroup = {
  label: "Product",
  items: [
    { icon: Zap, title: "Automation", description: "Workflows that run on their own" },
    { icon: BarChart3, title: "Analytics", description: "Real-time dashboards and reports" },
    { icon: Shield, title: "Security", description: "Enterprise-grade access control", badge: "New" },
    { icon: Package, title: "Integrations", description: "100+ apps, out of the box" },
  ],
};

const RESOURCES_GROUP: MegaGroup = {
  label: "Resources",
  items: [
    { icon: BookOpen, title: "Documentation", description: "Guides, references, and API docs" },
    { icon: FileText, title: "Changelog", description: "What shipped this week" },
    { icon: MessageCircle, title: "Community", description: "Discord, forums, and events" },
    { icon: LifeBuoy, title: "Support", description: "Chat with our team" },
  ],
};

function MegaPanel({ group }: { group: MegaGroup }) {
  return (
    <div className="grid grid-cols-2 gap-1 p-2">
      {group.items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.title}
            href="#"
            className="flex items-start gap-3 p-3 rounded-[calc(var(--ds-radius-card)-8px)] hover:bg-surface-hover transition-colors"
          >
            <div className="size-8 shrink-0 rounded-[var(--ds-radius-checkbox)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
              <Icon className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium text-fg-primary">{item.title}</p>
                {item.badge && (
                  <Badge variant="default" size="sm">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-fg-muted mt-0.5">{item.description}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
}

function MobileGroup({ group, onNavigate }: { group: MegaGroup; onNavigate: () => void }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-fg-muted uppercase tracking-wide px-3 pt-2">{group.label}</p>
      {group.items.map((item) => {
        const Icon = item.icon;
        return (
          <Button key={item.title} variant="ghost" size="sm" asChild className="justify-start gap-3">
            <a href="#" onClick={onNavigate}>
              <Icon className="size-4 text-fg-dimmed" />
              {item.title}
            </a>
          </Button>
        );
      })}
    </div>
  );
}

export default function NavbarMega() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-sticky border-b border-edge-subtle bg-surface-base/80 backdrop-blur-glass">
        <div className="mx-auto max-w-6xl h-16 px-4 sm:px-[var(--ds-space-page-x)] flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="size-8 rounded-[var(--ds-radius-button)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <span className="text-sm font-semibold text-fg-primary">Acme</span>
          </a>

          <nav className="hidden md:flex items-center gap-1 flex-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  Product
                  <ChevronDown className="size-3.5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[480px] p-0">
                <MegaPanel group={PRODUCT_GROUP} />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  Resources
                  <ChevronDown className="size-3.5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[480px] p-0">
                <MegaPanel group={RESOURCES_GROUP} />
              </PopoverContent>
            </Popover>
            <Button variant="ghost" size="sm" asChild>
              <a href="#pricing">Pricing</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#customers">Customers</a>
            </Button>
          </nav>

          <div className="ml-auto hidden md:flex items-center gap-2">
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
            <span className="text-sm font-semibold text-fg-primary">Acme</span>
          </div>
          <Separator />
          <MobileGroup group={PRODUCT_GROUP} onNavigate={() => setOpen(false)} />
          <MobileGroup group={RESOURCES_GROUP} onNavigate={() => setOpen(false)} />
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

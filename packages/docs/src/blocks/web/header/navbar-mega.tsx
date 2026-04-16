"use client";

import {
  Badge,
  Button,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuActiveClass,
  navigationMenuTriggerStyle,
  Separator,
  Sheet,
} from "@softuq/react";
import {
  BarChart3,
  BookOpen,
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

/* ===  Types  === */

export interface MegaMenuItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

export interface MegaMenuGroup {
  label: string;
  description?: string;
  items: MegaMenuItem[];
  /** "View all" link shown at the bottom of the group column. */
  viewAllHref?: string;
  viewAllLabel?: string;
}

/** Standalone nav link. */
export interface NavMegaLink {
  type: "link";
  label: string;
  href: string;
  matchPrefix?: string;
}

/** Nav item with mega dropdown. */
export interface NavMegaDropdown {
  type: "dropdown";
  label: string;
  /** Groups rendered as columns inside the mega panel. */
  groups: MegaMenuGroup[];
  /** Active state matching — dropdown trigger highlights when path matches. */
  matchPrefix?: string;
}

export type NavMegaItem = NavMegaLink | NavMegaDropdown;

export interface NavbarMegaProps {
  /** Full logo slot (already wrapped in a link). Defaults to a demo brand. */
  logo?: React.ReactNode;
  /** Nav items — links and/or mega dropdowns. */
  items?: NavMegaItem[];
  /** Actions shown in the header bar on all breakpoints. On mobile, placed before the hamburger. */
  actions?: React.ReactNode;
  /** Component used to render links. Default `"a"`. Pass Next.js `Link` for client-side routing. */
  linkComponent?: React.ElementType;
  /** Current pathname for active-link styling. */
  currentPath?: string;
}

/* ===  Defaults  === */

const DEFAULT_PRODUCT: MegaMenuGroup = {
  label: "Product",
  items: [
    { icon: Zap, title: "Automation", description: "Workflows that run on their own", href: "#" },
    { icon: BarChart3, title: "Analytics", description: "Real-time dashboards and reports", href: "#" },
    { icon: Shield, title: "Security", description: "Enterprise-grade access control", href: "#", badge: "New" },
    { icon: Package, title: "Integrations", description: "100+ apps, out of the box", href: "#" },
  ],
};

const DEFAULT_RESOURCES: MegaMenuGroup = {
  label: "Resources",
  items: [
    { icon: BookOpen, title: "Documentation", description: "Guides, references, and API docs", href: "#" },
    { icon: FileText, title: "Changelog", description: "What shipped this week", href: "#" },
    { icon: MessageCircle, title: "Community", description: "Discord, forums, and events", href: "#" },
    { icon: LifeBuoy, title: "Support", description: "Chat with our team", href: "#" },
  ],
};

const DEFAULT_ITEMS: NavMegaItem[] = [
  { type: "dropdown", label: "Product", groups: [DEFAULT_PRODUCT] },
  { type: "dropdown", label: "Resources", groups: [DEFAULT_RESOURCES] },
  { type: "link", label: "Pricing", href: "#pricing" },
  { type: "link", label: "Customers", href: "#customers" },
];

/* ===  Helpers  === */

function isLinkActive(item: NavMegaLink | NavMegaDropdown, pathname?: string): boolean {
  if (!pathname || !item.matchPrefix) return false;
  return pathname === item.matchPrefix || pathname.startsWith(`${item.matchPrefix}/`);
}

/* ===  Subcomponents  === */

function MegaPanel({
  groups,
  linkComponent: LinkComponent = "a",
  onNavigate,
}: {
  groups: MegaMenuGroup[];
  linkComponent?: React.ElementType;
  onNavigate?: () => void;
}) {
  const cols = groups.length;
  return (
    <div className="grid gap-0 p-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(200px, 1fr))` }}>
      {groups.map((group) => (
        <div key={group.label} className="space-y-1 p-2">
          <div className="px-3 pt-1 pb-2">
            <p className="text-xs font-semibold text-fg-primary uppercase tracking-wide">{group.label}</p>
            {group.description && <p className="text-xs text-fg-muted mt-0.5">{group.description}</p>}
          </div>
          {group.items.map((item) => {
            const Icon = item.icon;
            return (
              <NavigationMenuLink key={item.title} asChild>
                <LinkComponent
                  href={item.href}
                  onClick={onNavigate}
                  className="flex items-start gap-3 p-3 rounded-[var(--ds-radius-checkbox)] hover:bg-surface-hover transition-colors"
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
                    <p className="text-xs text-fg-muted mt-0.5 line-clamp-2">{item.description}</p>
                  </div>
                </LinkComponent>
              </NavigationMenuLink>
            );
          })}
          {group.viewAllHref && (
            <LinkComponent
              href={group.viewAllHref}
              onClick={onNavigate}
              className="block px-3 pt-2 text-xs font-medium text-accent-text hover:underline"
            >
              {group.viewAllLabel ?? "View all →"}
            </LinkComponent>
          )}
        </div>
      ))}
    </div>
  );
}

function MobileGroup({
  group,
  linkComponent: LinkComponent = "a",
  onNavigate,
}: {
  group: MegaMenuGroup;
  linkComponent?: React.ElementType;
  onNavigate: () => void;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-fg-muted uppercase tracking-wide px-3 pt-2">{group.label}</p>
      {group.items.map((item) => {
        const Icon = item.icon;
        return (
          <Button key={item.title} variant="ghost" size="sm" asChild className="justify-start">
            <LinkComponent href={item.href} onClick={onNavigate}>
              <Icon className="size-4 text-fg-dimmed" />
              {item.title}
            </LinkComponent>
          </Button>
        );
      })}
      {group.viewAllHref && (
        <LinkComponent
          href={group.viewAllHref}
          onClick={onNavigate}
          className="block px-3 pt-1 text-xs font-medium text-accent-text hover:underline"
        >
          {group.viewAllLabel ?? "View all →"}
        </LinkComponent>
      )}
    </div>
  );
}

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

/* ===  NavbarMega  === */

export default function NavbarMega({
  logo,
  items = DEFAULT_ITEMS,
  actions,
  linkComponent: LinkComponent = "a",
  currentPath,
}: NavbarMegaProps = {}) {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const resolvedLogo = logo ?? <DefaultLogo />;
  const resolvedActions = actions ?? <DefaultActions />;

  const allGroups = items.flatMap((item) => (item.type === "dropdown" ? item.groups : []));

  return (
    <>
      <header className="sticky top-0 z-sticky border-b border-edge-subtle bg-surface-base/80 backdrop-blur-glass">
        <div className="mx-auto max-w-6xl h-16 px-4 sm:px-[var(--ds-space-page-x)] grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <div className="col-start-1 justify-self-start">{resolvedLogo}</div>

          <NavigationMenu className="col-start-2 hidden md:block">
            <NavigationMenuList>
              {items.map((item) =>
                item.type === "link" ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      asChild
                      active={isLinkActive(item, currentPath)}
                      className={navigationMenuTriggerStyle()}
                    >
                      <LinkComponent href={item.href}>{item.label}</LinkComponent>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.label} value={item.label}>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <MegaPanel groups={item.groups} linkComponent={LinkComponent} />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>

          <div className="col-start-3 justify-self-end flex items-center gap-2">
            {resolvedActions}
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              aria-label="Open menu"
              onClick={() => setSheetOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} side="right" size="sm">
        <div className="flex flex-col gap-2">
          <div>{resolvedLogo}</div>
          <Separator />
          <div className="flex flex-col gap-0.5">
            {items.map((item) =>
              item.type === "link" ? (
                <Button
                  key={item.label}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={`justify-start ${isLinkActive(item, currentPath) ? navigationMenuActiveClass : ""}`}
                >
                  <LinkComponent href={item.href} onClick={() => setSheetOpen(false)}>
                    {item.label}
                  </LinkComponent>
                </Button>
              ) : null,
            )}
          </div>
          {allGroups.length > 0 && <Separator />}
          <div className="flex flex-col gap-3">
            {allGroups.map((group) => (
              <MobileGroup
                key={group.label}
                group={group}
                linkComponent={LinkComponent}
                onNavigate={() => setSheetOpen(false)}
              />
            ))}
          </div>
        </div>
      </Sheet>
    </>
  );
}

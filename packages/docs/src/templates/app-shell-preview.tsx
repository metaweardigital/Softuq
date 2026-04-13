"use client";

import { Bell, CreditCard, FolderKanban, Home, Inbox, type LucideIcon, Settings, Users } from "lucide-react";
import SidebarNav from "@/blocks/app/sidebar/sidebar-nav";
import type { BlockType } from "@/blocks/registry";
import { blockRefToString, resolveBlockRef, type TemplateMeta, type TemplatePage } from "./registry";

const PAGE_ICON: Record<string, LucideIcon> = {
  home: Home,
  inbox: Inbox,
  projects: FolderKanban,
  team: Users,
  notifications: Bell,
  billing: CreditCard,
  settings: Settings,
};

const SECONDARY_SLUGS = new Set(["notifications", "billing", "settings"]);

export function AppShellPreview({
  type,
  template,
  activePage,
}: {
  type: BlockType;
  template: TemplateMeta;
  activePage: TemplatePage;
}) {
  const pages = template.pages ?? [];
  const basePath = `/templates-preview/${type}/${template.slug}`;

  const primary = pages
    .filter((p) => !SECONDARY_SLUGS.has(p.slug))
    .map((p) => ({
      icon: PAGE_ICON[p.slug] ?? Home,
      label: p.label,
      href: `${basePath}/${p.slug}`,
      badge: p.slug === "inbox" ? "4" : undefined,
    }));

  const secondary = pages
    .filter((p) => SECONDARY_SLUGS.has(p.slug))
    .map((p) => ({
      icon: PAGE_ICON[p.slug] ?? Home,
      label: p.label,
      href: `${basePath}/${p.slug}`,
    }));

  const activeHref = `${basePath}/${activePage.slug}`;

  const pageMeta = resolveBlockRef(activePage.block);
  if (!pageMeta) return null;
  const Page = pageMeta.component;
  const pageKey = blockRefToString(activePage.block);

  return (
    <SidebarNav primaryItems={primary} secondaryItems={secondary} activeHref={activeHref}>
      <div data-block-ref={pageKey}>
        <Page />
      </div>
    </SidebarNav>
  );
}

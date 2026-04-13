import type { ComponentType } from "react";
import Dashboard01 from "./app/dashboard/dashboard-01";
import Empty01 from "./app/empty-states/empty-01";
import Settings01 from "./app/settings/settings-01";
import Sidebar01 from "./app/sidebar/sidebar-01";
import Cta01 from "./web/cta/cta-01";
import Faq01 from "./web/faq/faq-01";
import Features01 from "./web/features/features-01";
import Footer01 from "./web/footer/footer-01";
import Hero01 from "./web/hero/hero-01";
import Logos01 from "./web/logos/logos-01";
import Pricing01 from "./web/pricing/pricing-01";
import Testimonials01 from "./web/testimonials/testimonials-01";

export type BlockType = "web" | "app";

export type BlockCategory = {
  type: BlockType;
  slug: string;
  name: string;
  description: string;
};

export type BlockMeta = {
  type: BlockType;
  category: string;
  slug: string;
  name: string;
  component: ComponentType;
};

export const WEB_CATEGORIES: BlockCategory[] = [
  { type: "web", slug: "hero", name: "Hero", description: "Headlines, CTAs, background patterns" },
  { type: "web", slug: "features", name: "Features", description: "Feature grids, icon lists, comparison tables" },
  { type: "web", slug: "pricing", name: "Pricing", description: "Pricing tables, billing toggles, tier comparison" },
  { type: "web", slug: "testimonials", name: "Testimonials", description: "Quote cards, carousels, social proof" },
  { type: "web", slug: "cta", name: "CTA", description: "Call-to-action sections, newsletter signup" },
  { type: "web", slug: "footer", name: "Footer", description: "Multi-column footers, legal links, social" },
  { type: "web", slug: "header", name: "Header", description: "Marketing navbars, mega menus" },
  { type: "web", slug: "stats", name: "Stats", description: "Metrics showcase, counters" },
  { type: "web", slug: "team", name: "Team", description: "Team member grids, bio cards" },
  { type: "web", slug: "faq", name: "FAQ", description: "Accordion FAQ sections" },
  { type: "web", slug: "contact", name: "Contact", description: "Contact forms, office info, maps" },
  { type: "web", slug: "blog", name: "Blog", description: "Blog post grids, article cards" },
  { type: "web", slug: "logos", name: "Logo Cloud", description: "Customer logo walls" },
];

export const APP_CATEGORIES: BlockCategory[] = [
  {
    type: "app",
    slug: "dashboard",
    name: "Dashboard",
    description: "Overview layouts with stats, charts, activity feeds, and quick actions",
  },
  {
    type: "app",
    slug: "sidebar",
    name: "Sidebar",
    description: "Navigation sidebars with collapsible sections, icons, and user menus",
  },
  {
    type: "app",
    slug: "settings",
    name: "Settings",
    description: "User preferences, account settings, and configuration panels",
  },
  {
    type: "app",
    slug: "profile",
    name: "Profile",
    description: "User profile pages with avatars, bios, and activity history",
  },
  {
    type: "app",
    slug: "notifications",
    name: "Notifications",
    description: "Notification centers, alert lists, and preference management",
  },
  {
    type: "app",
    slug: "activity-feed",
    name: "Activity Feed",
    description: "Timeline displays for user actions, system events, and updates",
  },
  {
    type: "app",
    slug: "data-tables",
    name: "Data Tables",
    description: "Advanced tables with sorting, filtering, pagination, and bulk actions",
  },
  {
    type: "app",
    slug: "kanban",
    name: "Kanban",
    description: "Drag-and-drop boards for project management and task organization",
  },
  {
    type: "app",
    slug: "file-manager",
    name: "File Manager",
    description: "File browsing, upload interfaces, and folder navigation",
  },
  {
    type: "app",
    slug: "calendar",
    name: "Calendar Views",
    description: "Event calendars, scheduling interfaces, and date management",
  },
  {
    type: "app",
    slug: "search",
    name: "Search Results",
    description: "Search interfaces with filters, facets, and result displays",
  },
  {
    type: "app",
    slug: "onboarding",
    name: "Onboarding",
    description: "User onboarding flows, setup wizards, and welcome screens",
  },
  {
    type: "app",
    slug: "empty-states",
    name: "Empty States",
    description: "Placeholder content for empty data, first-run experiences",
  },
  {
    type: "app",
    slug: "command-palette",
    name: "Command Palette",
    description: "Keyboard-driven command interfaces and quick actions",
  },
  {
    type: "app",
    slug: "user-management",
    name: "User Management",
    description: "Team member lists, role assignment, and invitation flows",
  },
  {
    type: "app",
    slug: "integrations",
    name: "Integrations",
    description: "Third-party app connections and API key management",
  },
  {
    type: "app",
    slug: "billing",
    name: "Billing",
    description: "Subscription management, invoices, and payment history",
  },
  {
    type: "app",
    slug: "audit-logs",
    name: "Audit Logs",
    description: "Activity tracking, security logs, and compliance records",
  },
];

export const BLOCKS: BlockMeta[] = [
  {
    type: "web",
    category: "hero",
    slug: "hero-01",
    name: "Centered hero with dual CTA",
    component: Hero01,
  },
  {
    type: "web",
    category: "features",
    slug: "features-01",
    name: "Three-column feature grid",
    component: Features01,
  },
  {
    type: "web",
    category: "cta",
    slug: "cta-01",
    name: "Centered CTA with accent glow",
    component: Cta01,
  },
  {
    type: "web",
    category: "pricing",
    slug: "pricing-01",
    name: "Three-tier pricing with featured plan",
    component: Pricing01,
  },
  {
    type: "web",
    category: "testimonials",
    slug: "testimonials-01",
    name: "Three-column quote grid",
    component: Testimonials01,
  },
  {
    type: "web",
    category: "faq",
    slug: "faq-01",
    name: "Single-open accordion FAQ",
    component: Faq01,
  },
  {
    type: "web",
    category: "logos",
    slug: "logos-01",
    name: "Six-column wordmark cloud",
    component: Logos01,
  },
  {
    type: "web",
    category: "footer",
    slug: "footer-01",
    name: "Four-column footer with socials",
    component: Footer01,
  },
  {
    type: "app",
    category: "sidebar",
    slug: "sidebar-01",
    name: "Sidebar nav with search and user card",
    component: Sidebar01,
  },
  {
    type: "app",
    category: "dashboard",
    slug: "dashboard-01",
    name: "Stats with activity feed",
    component: Dashboard01,
  },
  {
    type: "app",
    category: "settings",
    slug: "settings-01",
    name: "Profile, preferences, and danger zone",
    component: Settings01,
  },
  {
    type: "app",
    category: "empty-states",
    slug: "empty-01",
    name: "No projects with dual action",
    component: Empty01,
  },
];

export function getCategories(type: BlockType): BlockCategory[] {
  return type === "web" ? WEB_CATEGORIES : APP_CATEGORIES;
}

export function getCategory(type: BlockType, slug: string): BlockCategory | undefined {
  return getCategories(type).find((c) => c.slug === slug);
}

export function getBlocksForCategory(type: BlockType, category: string): BlockMeta[] {
  return BLOCKS.filter((b) => b.type === type && b.category === category);
}

export function getBlock(type: BlockType, category: string, slug: string): BlockMeta | undefined {
  return BLOCKS.find((b) => b.type === type && b.category === category && b.slug === slug);
}

export function getBlockCount(type: BlockType, category: string): number {
  return getBlocksForCategory(type, category).length;
}

export function isBlockType(value: string): value is BlockType {
  return value === "web" || value === "app";
}

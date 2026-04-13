import type { ComponentType } from "react";
import BillingPlans from "./app/billing/billing-plans";
import DashboardStats from "./app/dashboard/dashboard-stats";
import EmptyProjects from "./app/empty-states/empty-projects";
import InboxSplit from "./app/inbox/inbox-split";
import NotificationsCenter from "./app/notifications/notifications-center";
import ProjectsGrid from "./app/projects/projects-grid";
import SettingsProfile from "./app/settings/settings-profile";
import SidebarNav from "./app/sidebar/sidebar-nav";
import TeamList from "./app/user-management/team-list";
import CtaCentered from "./web/cta/cta-centered";
import FaqAccordion from "./web/faq/faq-accordion";
import FeaturesGrid from "./web/features/features-grid";
import FooterColumns from "./web/footer/footer-columns";
import NavbarMega from "./web/header/navbar-mega";
import NavbarSearch from "./web/header/navbar-search";
import NavbarSimple from "./web/header/navbar-simple";
import HeroCentered from "./web/hero/hero-centered";
import LogosCloud from "./web/logos/logos-cloud";
import PricingTiers from "./web/pricing/pricing-tiers";
import TestimonialsGrid from "./web/testimonials/testimonials-grid";

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
    slug: "inbox",
    name: "Inbox",
    description: "Email-style split views with message list and preview pane",
  },
  {
    type: "app",
    slug: "projects",
    name: "Projects",
    description: "Project cards with status, progress, and member assignments",
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
    category: "header",
    slug: "navbar-simple",
    name: "Simple navbar with center nav and CTAs",
    component: NavbarSimple,
  },
  {
    type: "web",
    category: "header",
    slug: "navbar-mega",
    name: "Navbar with mega menu dropdowns",
    component: NavbarMega,
  },
  {
    type: "web",
    category: "header",
    slug: "navbar-search",
    name: "Navbar with inline search and command hint",
    component: NavbarSearch,
  },
  {
    type: "web",
    category: "hero",
    slug: "hero-centered",
    name: "Centered hero with dual CTA",
    component: HeroCentered,
  },
  {
    type: "web",
    category: "features",
    slug: "features-grid",
    name: "Three-column feature grid",
    component: FeaturesGrid,
  },
  {
    type: "web",
    category: "cta",
    slug: "cta-centered",
    name: "Centered CTA with accent glow",
    component: CtaCentered,
  },
  {
    type: "web",
    category: "pricing",
    slug: "pricing-tiers",
    name: "Three-tier pricing with featured plan",
    component: PricingTiers,
  },
  {
    type: "web",
    category: "testimonials",
    slug: "testimonials-grid",
    name: "Three-column quote grid",
    component: TestimonialsGrid,
  },
  {
    type: "web",
    category: "faq",
    slug: "faq-accordion",
    name: "Single-open accordion FAQ",
    component: FaqAccordion,
  },
  {
    type: "web",
    category: "logos",
    slug: "logos-cloud",
    name: "Six-column wordmark cloud",
    component: LogosCloud,
  },
  {
    type: "web",
    category: "footer",
    slug: "footer-columns",
    name: "Four-column footer with socials",
    component: FooterColumns,
  },
  {
    type: "app",
    category: "sidebar",
    slug: "sidebar-nav",
    name: "Sidebar nav with search and user card",
    component: SidebarNav,
  },
  {
    type: "app",
    category: "dashboard",
    slug: "dashboard-stats",
    name: "Stats with activity feed",
    component: DashboardStats,
  },
  {
    type: "app",
    category: "inbox",
    slug: "inbox-split",
    name: "Inbox with split message list and preview",
    component: InboxSplit,
  },
  {
    type: "app",
    category: "projects",
    slug: "projects-grid",
    name: "Project cards with status and progress",
    component: ProjectsGrid,
  },
  {
    type: "app",
    category: "user-management",
    slug: "team-list",
    name: "Team table with roles and invites",
    component: TeamList,
  },
  {
    type: "app",
    category: "notifications",
    slug: "notifications-center",
    name: "Notification center with tabbed filters",
    component: NotificationsCenter,
  },
  {
    type: "app",
    category: "billing",
    slug: "billing-plans",
    name: "Subscription plans with invoice history",
    component: BillingPlans,
  },
  {
    type: "app",
    category: "settings",
    slug: "settings-profile",
    name: "Profile, preferences, and danger zone",
    component: SettingsProfile,
  },
  {
    type: "app",
    category: "empty-states",
    slug: "empty-projects",
    name: "No projects with dual action",
    component: EmptyProjects,
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

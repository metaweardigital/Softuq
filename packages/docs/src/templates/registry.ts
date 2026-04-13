import { type BlockMeta, type BlockType, getBlock } from "@/blocks/registry";

export type BlockRef = {
  type: BlockType;
  category: string;
  slug: string;
};

export type TemplateLayout = "stack" | "app-shell";

export type TemplatePage = {
  slug: string;
  label: string;
  block: BlockRef;
};

export type TemplateMeta = {
  type: BlockType;
  slug: string;
  name: string;
  description: string;
  layout: TemplateLayout;
  blocks: BlockRef[];
  pages?: TemplatePage[];
};

export type TemplateCategory = {
  type: BlockType;
  name: string;
  description: string;
};

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    type: "web",
    name: "Web Templates",
    description: "Full marketing pages. Landing, pricing, about.",
  },
  {
    type: "app",
    name: "App Templates",
    description: "Complete app shells. Dashboard, admin, settings.",
  },
];

export const TEMPLATES: TemplateMeta[] = [
  {
    type: "web",
    slug: "landing-01",
    name: "SaaS landing page",
    description: "Hero, logos, features, pricing, testimonials, FAQ, CTA, footer.",
    layout: "stack",
    blocks: [
      { type: "web", category: "header", slug: "navbar-simple" },
      { type: "web", category: "hero", slug: "hero-centered" },
      { type: "web", category: "logos", slug: "logos-cloud" },
      { type: "web", category: "features", slug: "features-grid" },
      { type: "web", category: "pricing", slug: "pricing-tiers" },
      { type: "web", category: "testimonials", slug: "testimonials-grid" },
      { type: "web", category: "faq", slug: "faq-accordion" },
      { type: "web", category: "cta", slug: "cta-centered" },
      { type: "web", category: "footer", slug: "footer-columns" },
    ],
  },
  {
    type: "app",
    slug: "app-shell-01",
    name: "Dashboard app shell",
    description:
      "Sidebar navigation with seven linked pages: home, inbox, projects, team, notifications, billing, settings.",
    layout: "app-shell",
    blocks: [
      { type: "app", category: "sidebar", slug: "sidebar-nav" },
      { type: "app", category: "dashboard", slug: "dashboard-stats" },
      { type: "app", category: "inbox", slug: "inbox-split" },
      { type: "app", category: "projects", slug: "projects-grid" },
      { type: "app", category: "user-management", slug: "team-list" },
      { type: "app", category: "notifications", slug: "notifications-center" },
      { type: "app", category: "billing", slug: "billing-plans" },
      { type: "app", category: "settings", slug: "settings-profile" },
    ],
    pages: [
      { slug: "home", label: "Home", block: { type: "app", category: "dashboard", slug: "dashboard-stats" } },
      { slug: "inbox", label: "Inbox", block: { type: "app", category: "inbox", slug: "inbox-split" } },
      { slug: "projects", label: "Projects", block: { type: "app", category: "projects", slug: "projects-grid" } },
      { slug: "team", label: "Team", block: { type: "app", category: "user-management", slug: "team-list" } },
      {
        slug: "notifications",
        label: "Notifications",
        block: { type: "app", category: "notifications", slug: "notifications-center" },
      },
      { slug: "billing", label: "Billing", block: { type: "app", category: "billing", slug: "billing-plans" } },
      { slug: "settings", label: "Settings", block: { type: "app", category: "settings", slug: "settings-profile" } },
    ],
  },
];

export function getTemplate(type: BlockType, slug: string): TemplateMeta | undefined {
  return TEMPLATES.find((t) => t.type === type && t.slug === slug);
}

export function getTemplatesByType(type: BlockType): TemplateMeta[] {
  return TEMPLATES.filter((t) => t.type === type);
}

export function getTemplateCategory(type: BlockType): TemplateCategory | undefined {
  return TEMPLATE_CATEGORIES.find((c) => c.type === type);
}

export function resolveBlockRef(ref: BlockRef): BlockMeta | undefined {
  return getBlock(ref.type, ref.category, ref.slug);
}

export function blockRefToString(ref: BlockRef): string {
  return `${ref.type}/${ref.category}/${ref.slug}`;
}

export function parseBlockRef(str: string): BlockRef | undefined {
  const [type, category, slug] = str.split("/");
  if (!type || !category || !slug) return undefined;
  if (type !== "web" && type !== "app") return undefined;
  return { type, category, slug };
}

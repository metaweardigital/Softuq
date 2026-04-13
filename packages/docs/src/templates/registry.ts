import { type BlockMeta, type BlockType, getBlock } from "@/blocks/registry";

export type BlockRef = {
  type: BlockType;
  category: string;
  slug: string;
};

export type TemplateLayout = "stack" | "app-shell";

export type TemplateMeta = {
  type: BlockType;
  slug: string;
  name: string;
  description: string;
  layout: TemplateLayout;
  blocks: BlockRef[];
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
      { type: "web", category: "hero", slug: "hero-01" },
      { type: "web", category: "logos", slug: "logos-01" },
      { type: "web", category: "features", slug: "features-01" },
      { type: "web", category: "pricing", slug: "pricing-01" },
      { type: "web", category: "testimonials", slug: "testimonials-01" },
      { type: "web", category: "faq", slug: "faq-01" },
      { type: "web", category: "cta", slug: "cta-01" },
      { type: "web", category: "footer", slug: "footer-01" },
    ],
  },
  {
    type: "app",
    slug: "app-shell-01",
    name: "Dashboard app shell",
    description: "Sidebar navigation with dashboard content.",
    layout: "app-shell",
    blocks: [
      { type: "app", category: "sidebar", slug: "sidebar-01" },
      { type: "app", category: "dashboard", slug: "dashboard-01" },
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

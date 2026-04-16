import type { MetadataRoute } from "next";
import { APP_CATEGORIES, BLOCKS, WEB_CATEGORIES } from "@/blocks/registry";
import { TEMPLATES } from "@/templates/registry";

const BASE = "https://softuq.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { url: `${BASE}`, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE}/components`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE}/blocks`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/templates`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/getting-started`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE}/skill`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/foundations`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/foundations/colors`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/foundations/typography`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/foundations/spacing`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/foundations/effects`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/foundations/icons`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/foundations/layout`, changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const blockTypeRoutes = [
    { url: `${BASE}/blocks/web`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE}/blocks/app`, changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  const categoryHasBlocks = (type: "web" | "app", slug: string) =>
    BLOCKS.some((b) => b.type === type && b.category === slug);

  const blockCategoryRoutes = [
    ...WEB_CATEGORIES.filter((c) => categoryHasBlocks("web", c.slug)).map((c) => ({
      url: `${BASE}/blocks/web/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...APP_CATEGORIES.filter((c) => categoryHasBlocks("app", c.slug)).map((c) => ({
      url: `${BASE}/blocks/app/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const blockRoutes = BLOCKS.map((b) => ({
    url: `${BASE}/blocks/${b.type}/${b.category}/${b.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const templateTypeRoutes = [
    { url: `${BASE}/templates/web`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE}/templates/app`, changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  const templateRoutes = TEMPLATES.map((t) => ({
    url: `${BASE}/templates/${t.type}/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...blockTypeRoutes,
    ...blockCategoryRoutes,
    ...blockRoutes,
    ...templateTypeRoutes,
    ...templateRoutes,
  ].map((route) => ({ ...route, lastModified: now }));
}

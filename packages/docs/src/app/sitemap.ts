import type { MetadataRoute } from "next";

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

  return staticRoutes.map((route) => ({
    ...route,
    lastModified: now,
  }));
}

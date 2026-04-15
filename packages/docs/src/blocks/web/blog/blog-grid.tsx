"use client";

import { Avatar, Badge, Placeholder } from "@softuq/react";
import { ArrowUpRight } from "lucide-react";

type Post = {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  initials: string;
  date: string;
  readTime: string;
};

const POSTS: Post[] = [
  {
    category: "Tokens",
    title: "Why we moved the entire system to OKLCH",
    excerpt:
      "HSL lies about perceptual lightness and hex is a black box. OKLCH gives us a color space where the math matches the eye.",
    author: "Noah Chen",
    initials: "NC",
    date: "Apr 12, 2026",
    readTime: "6 min read",
  },
  {
    category: "Engineering",
    title: "Copy-paste is a distribution strategy",
    excerpt:
      "Why shipping source instead of a package means fewer breaking changes, better debugging, and real ownership.",
    author: "Leo Marín",
    initials: "LM",
    date: "Apr 3, 2026",
    readTime: "8 min read",
  },
  {
    category: "Design",
    title: "The case for soft UI in 2026",
    excerpt:
      "Neumorphism got a bad rap for the wrong reasons. Here's how we make tactile interfaces that still pass WCAG AA.",
    author: "Ava Pollard",
    initials: "AP",
    date: "Mar 24, 2026",
    readTime: "5 min read",
  },
];

export default function BlogGrid() {
  return (
    <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-[var(--ds-space-stack-sm)]">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-[var(--ds-space-stack)]">
              Blog
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">Notes from the workshop</h2>
            <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-muted">
              Essays on tokens, theming, and the craft of building soft, tactile interfaces.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:text-accent transition-colors"
          >
            View all posts
            <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="mt-[var(--ds-space-stack-lg)] grid grid-cols-1 md:grid-cols-3 gap-[var(--ds-space-gap)]">
          {POSTS.map((p) => (
            <a
              key={p.title}
              href="#"
              className="group flex flex-col rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-[var(--ds-space-card)] hover:border-edge-accent transition-colors"
            >
              <Placeholder ratio="landscape" className="mb-[var(--ds-space-stack-sm)]" />
              <Badge variant="outline" size="sm" className="self-start">
                {p.category}
              </Badge>
              <h3 className="mt-[var(--ds-space-stack-sm)] text-lg font-semibold text-fg-primary leading-tight group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed line-clamp-3">{p.excerpt}</p>
              <div className="mt-auto pt-[var(--ds-space-stack-sm)] flex items-center gap-2">
                <Avatar size="sm" fallback={p.initials} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-fg-primary truncate">{p.author}</p>
                  <p className="text-xs text-fg-dimmed truncate">
                    {p.date} · {p.readTime}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

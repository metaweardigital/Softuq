"use client";

import { ArrowRight, LayoutDashboard, Monitor } from "lucide-react";
import Link from "next/link";
import { APP_CATEGORIES, BLOCKS, WEB_CATEGORIES } from "@/blocks/registry";
import { BlocksShell } from "./_components/blocks-shell";

type TypeCard = {
  href: string;
  title: string;
  description: string;
  categoryCount: number;
  blockCount: number;
  icon: React.ComponentType<{ className?: string }>;
};

const TYPES: TypeCard[] = [
  {
    href: "/blocks/web",
    title: "Web Blocks",
    description: "Marketing sections for landing pages, product sites, and docs.",
    categoryCount: WEB_CATEGORIES.length,
    blockCount: BLOCKS.filter((b) => b.type === "web").length,
    icon: Monitor,
  },
  {
    href: "/blocks/app",
    title: "App Blocks",
    description: "Product UI sections for dashboards, settings, and admin tools.",
    categoryCount: APP_CATEGORIES.length,
    blockCount: BLOCKS.filter((b) => b.type === "app").length,
    icon: LayoutDashboard,
  },
];

export default function BlocksLandingPage() {
  return (
    <BlocksShell
      title="Blocks"
      description="Ready-made compositions built from DesignYstem components. Preview and adapt."
      crumbs={[{ label: "Blocks" }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TYPES.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="group relative rounded-[var(--ds-radius-card)] border border-border-subtle bg-bg-card p-8 transition-all hover:border-accent hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="size-12 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-center text-accent">
                  <Icon className="size-6" />
                </div>
                <ArrowRight className="size-5 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-text-primary">{t.title}</h2>
              <p className="mt-2 text-sm text-text-muted">{t.description}</p>
              <div className="mt-6 flex items-center gap-4 text-xs text-text-dimmed">
                <span>{t.categoryCount} categories</span>
                <span className="size-1 rounded-full bg-border-default" />
                <span>
                  {t.blockCount} {t.blockCount === 1 ? "block" : "blocks"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </BlocksShell>
  );
}

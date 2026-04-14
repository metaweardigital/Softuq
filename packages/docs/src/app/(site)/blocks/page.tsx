"use client";

import { ArrowRight, LayoutDashboard, Monitor } from "lucide-react";
import Link from "next/link";
import { APP_CATEGORIES, BLOCKS, WEB_CATEGORIES } from "@/blocks/registry";
import { PageShell } from "../_components/page-shell";

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
    <PageShell
      title="Blocks"
      description="Ready-made compositions built from DesignYstem components. Preview and adapt."
      crumbs={[{ label: "Blocks" }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-gap)]">
        {TYPES.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="group relative rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-[var(--ds-space-card)] transition-all hover:border-accent hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="size-12 rounded-[var(--ds-radius-button)] bg-surface-elevated border border-edge-subtle flex items-center justify-center text-accent">
                  <Icon className="size-6" />
                </div>
                <ArrowRight className="size-5 text-fg-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-fg-primary">{t.title}</h2>
              <p className="mt-2 text-sm text-fg-muted">{t.description}</p>
              <div className="mt-6 flex items-center gap-4 text-xs text-fg-dimmed">
                <span>{t.categoryCount} categories</span>
                <span className="size-1 rounded-full bg-edge-default" />
                <span>
                  {t.blockCount} {t.blockCount === 1 ? "block" : "blocks"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}

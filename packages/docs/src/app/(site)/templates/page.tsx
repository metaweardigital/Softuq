"use client";

import { ArrowRight, LayoutDashboard, Monitor } from "lucide-react";
import Link from "next/link";
import { TEMPLATE_CATEGORIES, TEMPLATES } from "@/templates/registry";
import { PageShell } from "../_components/page-shell";

const TYPE_ICONS = {
  web: Monitor,
  app: LayoutDashboard,
} as const;

export default function TemplatesLandingPage() {
  return (
    <PageShell
      title="Templates"
      description="Complete page compositions built from Softuq blocks. Preview, theme, and adapt."
      crumbs={[{ label: "Templates" }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-gap)]">
        {TEMPLATE_CATEGORIES.map((c) => {
          const Icon = TYPE_ICONS[c.type];
          const count = TEMPLATES.filter((t) => t.type === c.type).length;
          return (
            <Link
              key={c.type}
              href={`/templates/${c.type}`}
              className="group relative rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-[var(--ds-space-card)] transition-all hover:border-accent hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="size-12 rounded-[var(--ds-radius-button)] bg-surface-elevated border border-edge-subtle flex items-center justify-center text-accent">
                  <Icon className="size-6" />
                </div>
                <ArrowRight className="size-5 text-fg-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-fg-primary">{c.name}</h2>
              <p className="mt-2 text-sm text-fg-muted">{c.description}</p>
              <div className="mt-6 text-xs text-fg-dimmed">
                {count} {count === 1 ? "template" : "templates"}
              </div>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}

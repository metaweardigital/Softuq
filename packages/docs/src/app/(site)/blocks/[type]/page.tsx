"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getBlockCount, getCategories, isBlockType } from "@/blocks/registry";
import { PageShell } from "../../_components/page-shell";

export default function BlocksTypePage() {
  const params = useParams<{ type: string }>();

  if (!isBlockType(params.type)) {
    notFound();
  }

  const type = params.type;
  const categories = getCategories(type);
  const typeLabel = type === "web" ? "Web Blocks" : "App Blocks";
  const typeDescription =
    type === "web"
      ? "Marketing sections for landing pages, product sites, and docs."
      : "Product UI sections for dashboards, settings, and admin tools.";

  return (
    <PageShell
      title={typeLabel}
      description={typeDescription}
      crumbs={[{ label: "Blocks", href: "/blocks" }, { label: typeLabel }]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => {
          const count = getBlockCount(type, c.slug);
          const empty = count === 0;
          return (
            <Link
              key={c.slug}
              href={`/blocks/${type}/${c.slug}`}
              className="group rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-5 transition-all hover:border-accent hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-fg-primary">{c.name}</h3>
                <ArrowRight className="size-4 text-fg-dimmed group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
              <p className="mt-1.5 text-sm text-fg-muted line-clamp-2">{c.description}</p>
              <div className="mt-4 text-xs text-fg-dimmed">
                {empty ? "Coming soon" : `${count} ${count === 1 ? "block" : "blocks"}`}
              </div>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}

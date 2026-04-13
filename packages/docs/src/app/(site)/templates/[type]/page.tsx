"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { isBlockType } from "@/blocks/registry";
import { getTemplateCategory, getTemplatesByType, type TemplateMeta } from "@/templates/registry";
import { PageShell } from "../../_components/page-shell";

function TemplateCard({ template }: { template: TemplateMeta }) {
  const detailHref = `/templates/${template.type}/${template.slug}`;
  const previewHref = `/templates-preview/${template.type}/${template.slug}`;
  return (
    <Link
      href={detailHref}
      className="group rounded-[var(--ds-radius-card)] border border-border-subtle bg-bg-card overflow-hidden flex flex-col transition-colors hover:border-accent"
    >
      <div className="relative border-b border-border-subtle bg-bg-base">
        <iframe
          src={previewHref}
          title={template.name}
          className="w-full block pointer-events-none"
          style={{ height: "360px", border: "0" }}
          loading="lazy"
          scrolling="no"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-card/40 pointer-events-none" />
      </div>
      <div className="p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-mono text-text-dimmed">{template.slug}</div>
          <h3 className="text-sm font-semibold text-text-primary truncate">{template.name}</h3>
          <p className="mt-1 text-xs text-text-muted line-clamp-2">{template.description}</p>
        </div>
        <ExternalLink className="size-4 text-text-dimmed group-hover:text-accent shrink-0 mt-0.5" />
      </div>
    </Link>
  );
}

function EmptyState({ typeLabel }: { typeLabel: string }) {
  return (
    <div className="rounded-[var(--ds-radius-card)] border border-dashed border-border-default bg-bg-card p-12 text-center">
      <h3 className="text-base font-medium text-text-primary">No {typeLabel.toLowerCase()} yet</h3>
      <p className="mt-1 text-sm text-text-muted">New templates are on the roadmap.</p>
    </div>
  );
}

export default function TemplatesTypePage() {
  const params = useParams<{ type: string }>();

  if (!isBlockType(params.type)) {
    notFound();
  }

  const category = getTemplateCategory(params.type);
  if (!category) {
    notFound();
  }

  const templates = getTemplatesByType(params.type);

  return (
    <PageShell
      title={category.name}
      description={category.description}
      crumbs={[{ label: "Templates", href: "/templates" }, { label: category.name }]}
    >
      {templates.length === 0 ? (
        <EmptyState typeLabel={category.name} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {templates.map((t) => (
            <TemplateCard key={t.slug} template={t} />
          ))}
        </div>
      )}
    </PageShell>
  );
}

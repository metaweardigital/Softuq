"use client";

import { ExternalLink } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { type BlockMeta, type BlockType, getBlocksForCategory, getCategory, isBlockType } from "@/blocks/registry";
import { BlocksShell } from "../../_components/blocks-shell";

function BlockPreview({ block }: { block: BlockMeta }) {
  const previewHref = `/blocks-preview/${block.type}/${block.category}/${block.slug}`;
  return (
    <section className="rounded-[var(--ds-radius-card)] border border-border-subtle bg-bg-card overflow-hidden">
      <header className="flex items-center justify-between px-5 py-3 border-b border-border-subtle">
        <div className="min-w-0">
          <div className="text-xs font-mono text-text-dimmed">{block.slug}</div>
          <h3 className="text-sm font-medium text-text-primary truncate">{block.name}</h3>
        </div>
        <a
          href={previewHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-accent transition-colors"
        >
          Open
          <ExternalLink className="size-3.5" />
        </a>
      </header>
      <iframe
        src={previewHref}
        title={block.name}
        className="w-full block bg-bg-base"
        style={{ height: "720px", border: "0" }}
        loading="lazy"
      />
    </section>
  );
}

function EmptyState({ categoryName }: { categoryName: string }) {
  return (
    <div className="rounded-[var(--ds-radius-card)] border border-dashed border-border-default bg-bg-card p-12 text-center">
      <h3 className="text-base font-medium text-text-primary">No {categoryName} blocks yet</h3>
      <p className="mt-1 text-sm text-text-muted">This category is on the roadmap. Check back soon.</p>
    </div>
  );
}

export default function BlocksCategoryPage() {
  const params = useParams<{ type: string; category: string }>();

  if (!isBlockType(params.type)) {
    notFound();
  }

  const type: BlockType = params.type;
  const category = getCategory(type, params.category);
  if (!category) {
    notFound();
  }

  const blocks = getBlocksForCategory(type, category.slug);
  const typeLabel = type === "web" ? "Web Blocks" : "App Blocks";

  return (
    <BlocksShell
      title={category.name}
      description={category.description}
      crumbs={[
        { label: "Blocks", href: "/blocks" },
        { label: typeLabel, href: `/blocks/${type}` },
        { label: category.name },
      ]}
    >
      {blocks.length === 0 ? (
        <EmptyState categoryName={category.name} />
      ) : (
        <div className="space-y-8">
          {blocks.map((b) => (
            <BlockPreview key={b.slug} block={b} />
          ))}
        </div>
      )}
    </BlocksShell>
  );
}

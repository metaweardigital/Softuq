"use client";

import { ExternalLink } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import * as React from "react";
import { type BlockMeta, type BlockType, getBlocksForCategory, getCategory, isBlockType } from "@/blocks/registry";
import { PageShell } from "../../../_components/page-shell";

const MIN_HEIGHT = 280;
const MAX_HEIGHT = 960;

function BlockPreview({ block }: { block: BlockMeta }) {
  const previewHref = `/blocks-preview/${block.type}/${block.category}/${block.slug}`;
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = React.useState(MIN_HEIGHT);

  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const measure = () => {
      const doc = iframe.contentDocument;
      if (!doc?.body) return;
      const h = doc.body.scrollHeight;
      setHeight(Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, h)));
    };

    const onLoad = () => {
      measure();
      const win = iframe.contentWindow;
      const doc = iframe.contentDocument;
      if (!win || !doc?.body) return;
      win.addEventListener("resize", measure);
      const ro = new ResizeObserver(measure);
      ro.observe(doc.body);
      iframe.dataset.cleanup = "1";
      (iframe as HTMLIFrameElement & { _cleanup?: () => void })._cleanup = () => {
        win.removeEventListener("resize", measure);
        ro.disconnect();
      };
    };

    iframe.addEventListener("load", onLoad);
    if (iframe.contentDocument?.readyState === "complete") onLoad();

    return () => {
      iframe.removeEventListener("load", onLoad);
      const withCleanup = iframe as HTMLIFrameElement & { _cleanup?: () => void };
      withCleanup._cleanup?.();
    };
  }, []);

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
        ref={iframeRef}
        src={previewHref}
        title={block.name}
        className="w-full block bg-bg-base transition-[height] duration-200"
        style={{ height, border: "0" }}
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
    <PageShell
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
    </PageShell>
  );
}

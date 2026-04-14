"use client";

import { ExternalLink } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import * as React from "react";
import { type BlockType, getBlock, getCategory, isBlockType } from "@/blocks/registry";
import { PageShell } from "../../../../_components/page-shell";

const MIN_HEIGHT = 280;
const MAX_HEIGHT = 1600;

export default function BlockDetailPage() {
  const params = useParams<{ type: string; category: string; slug: string }>();

  if (!isBlockType(params.type)) {
    notFound();
  }

  const type: BlockType = params.type;
  const category = getCategory(type, params.category);
  const block = getBlock(type, params.category, params.slug);
  if (!category || !block) {
    notFound();
  }

  const typeLabel = type === "web" ? "Web Blocks" : "App Blocks";
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
    <PageShell
      title={block.name}
      description={category.description}
      crumbs={[
        { label: "Blocks", href: "/blocks" },
        { label: typeLabel, href: `/blocks/${type}` },
        { label: category.name, href: `/blocks/${type}/${category.slug}` },
        { label: block.slug },
      ]}
    >
      <section className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
        <header className="flex items-center justify-between px-5 py-3 border-b border-edge-subtle">
          <div className="min-w-0">
            <div className="text-xs font-mono text-fg-dimmed">{block.slug}</div>
            <h3 className="text-sm font-medium text-fg-primary truncate">{block.name}</h3>
          </div>
          <a
            href={previewHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-accent transition-colors"
          >
            Open
            <ExternalLink className="size-3.5" />
          </a>
        </header>
        <iframe
          ref={iframeRef}
          src={previewHref}
          title={block.name}
          className="w-full block bg-surface-base transition-[height] duration-200"
          style={{ height, border: "0" }}
        />
      </section>
    </PageShell>
  );
}

"use client";

import { buttonVariants, cn, ToggleGroup, ToggleGroupItem } from "@softuq/react";
import { ExternalLink, Monitor, Smartphone, Tablet } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import * as React from "react";
import { type BlockMeta, type BlockType, getBlocksForCategory, getCategory, isBlockType } from "@/blocks/registry";
import { PageShell } from "../../../_components/page-shell";

type Viewport = "desktop" | "tablet" | "mobile";

const VIEWPORT_WIDTH: Record<Viewport, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

const MIN_HEIGHT = 280;

function BlockPreview({ block }: { block: BlockMeta }) {
  const previewHref = `/blocks-preview/${block.type}/${block.category}/${block.slug}`;
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = React.useState(MIN_HEIGHT);
  const [viewport, setViewport] = React.useState<Viewport>(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop",
  );

  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const measure = () => {
      const doc = iframe.contentDocument;
      if (!doc?.body) return;
      const h = doc.body.scrollHeight;
      setHeight(Math.max(MIN_HEIGHT, h));
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
    <section className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
      <header className="flex items-center justify-between px-5 py-3 border-b border-edge-subtle">
        <div className="min-w-0">
          <div className="text-xs font-mono text-fg-dimmed">{block.slug}</div>
          <h3 className="text-sm font-medium text-fg-primary truncate">{block.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <ToggleGroup
            type="single"
            size="sm"
            variant="outline"
            value={viewport}
            onValueChange={(v) => v && setViewport(v as Viewport)}
            aria-label="Viewport"
            className="hidden md:flex"
          >
            <ToggleGroupItem value="desktop" aria-label="Desktop">
              <Monitor className="size-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="tablet" aria-label="Tablet">
              <Tablet className="size-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="mobile" aria-label="Mobile">
              <Smartphone className="size-3.5" />
            </ToggleGroupItem>
          </ToggleGroup>
          <a
            href={previewHref}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
            aria-label="Open preview in new tab"
          >
            <ExternalLink className="size-4" />
          </a>
        </div>
      </header>
      <div className="bg-surface-input flex justify-center">
        <div
          className="w-full transition-[max-width] duration-300 ease-out"
          style={{ maxWidth: VIEWPORT_WIDTH[viewport] }}
        >
          <iframe
            ref={iframeRef}
            src={previewHref}
            title={block.name}
            className="w-full block bg-surface-base transition-[height] duration-200"
            style={{ height, border: "0" }}
          />
        </div>
      </div>
    </section>
  );
}

function EmptyState({ categoryName }: { categoryName: string }) {
  return (
    <div className="rounded-[var(--ds-radius-card)] border border-dashed border-edge-default bg-surface-card p-12 text-center">
      <h3 className="text-base font-medium text-fg-primary">No {categoryName} blocks yet</h3>
      <p className="mt-1 text-sm text-fg-muted">This category is on the roadmap. Check back soon.</p>
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

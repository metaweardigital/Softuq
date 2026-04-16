"use client";

import { buttonVariants, cn, ToggleGroup, ToggleGroupItem } from "@softuq/react";
import { ExternalLink, Monitor, Smartphone, Tablet } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import * as React from "react";
import { isBlockType } from "@/blocks/registry";
import { blockRefToString, getTemplate, getTemplateCategory, resolveBlockRef } from "@/templates/registry";
import { PageShell } from "../../../_components/page-shell";

type Viewport = "desktop" | "tablet" | "mobile";

const VIEWPORT_WIDTH: Record<Viewport, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

const FRAME_HEIGHT = 720;

type Region = { ref: string; top: number; height: number };

export default function TemplateDetailPage() {
  const params = useParams<{ type: string; slug: string }>();

  if (!isBlockType(params.type)) {
    notFound();
  }

  const template = getTemplate(params.type, params.slug);
  if (!template) {
    notFound();
  }

  const category = getTemplateCategory(params.type);
  const typeLabel = category?.name ?? (params.type === "web" ? "Web Templates" : "App Templates");

  const [viewport, setViewport] = React.useState<Viewport>(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop",
  );
  const [regions, setRegions] = React.useState<Region[]>([]);
  const [hoveredRef, setHoveredRef] = React.useState<string | null>(null);
  const [scrollTop, setScrollTop] = React.useState(0);

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const previewSrc = `/templates-preview/${template.type}/${template.slug}`;

  // Measure block regions in the iframe. Re-measure on load, scroll, resize.
  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let rafId = 0;
    const measure = () => {
      const doc = iframe.contentDocument;
      const win = iframe.contentWindow;
      if (!doc || !win) return;
      const nodes = doc.querySelectorAll<HTMLElement>("[data-block-ref]");
      const rects: Region[] = Array.from(nodes).flatMap((el) => {
        // Wrapper uses display:contents so sticky inside blocks can anchor to the page.
        // Measure via children's offset so the region still reflects the block bounds.
        const first = el.firstElementChild as HTMLElement | null;
        const last = el.lastElementChild as HTMLElement | null;
        if (!first || !last) return [];
        const top = first.offsetTop;
        const height = last.offsetTop + last.offsetHeight - top;
        return [{ ref: el.dataset.blockRef ?? "", top, height }];
      });
      setRegions(rects);
      setScrollTop(win.scrollY || 0);
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };

    const onLoad = () => {
      scheduleMeasure();
      const win = iframe.contentWindow;
      if (!win) return;
      win.addEventListener("scroll", () => setScrollTop(win.scrollY || 0));
      win.addEventListener("resize", scheduleMeasure);
      setTimeout(scheduleMeasure, 200);
    };

    iframe.addEventListener("load", onLoad);
    if (iframe.contentDocument?.readyState === "complete") onLoad();

    return () => {
      iframe.removeEventListener("load", onLoad);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Re-measure when viewport changes content layout.
  // biome-ignore lint/correctness/useExhaustiveDependencies: viewport is the trigger, not read inside
  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const t = setTimeout(() => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      const nodes = doc.querySelectorAll<HTMLElement>("[data-block-ref]");
      setRegions(
        Array.from(nodes).flatMap((el) => {
          const first = el.firstElementChild as HTMLElement | null;
          const last = el.lastElementChild as HTMLElement | null;
          if (!first || !last) return [];
          const top = first.offsetTop;
          const height = last.offsetTop + last.offsetHeight - top;
          return [{ ref: el.dataset.blockRef ?? "", top, height }];
        }),
      );
    }, 350);
    return () => clearTimeout(t);
  }, [viewport]);

  // Track hover via iframe's mousemove (same-origin).
  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;
    const onMove = (e: MouseEvent) => {
      const y = e.clientY + (iframe.contentWindow?.scrollY ?? 0);
      const hit = regions.find((r) => y >= r.top && y <= r.top + r.height);
      setHoveredRef(hit?.ref ?? null);
    };
    // Do not clear on mouseleave: moving cursor onto the in-parent badge counts as
    // leaving the iframe doc, and clearing here causes the badge to flicker.
    doc.addEventListener("mousemove", onMove);
    return () => {
      doc.removeEventListener("mousemove", onMove);
    };
  }, [regions]);

  const blocks = template.blocks.flatMap((ref) => {
    const meta = resolveBlockRef(ref);
    return meta ? [{ ref, key: blockRefToString(ref), meta }] : [];
  });

  return (
    <PageShell
      title={template.name}
      description={template.description}
      crumbs={[
        { label: "Templates", href: "/templates" },
        { label: typeLabel, href: `/templates/${template.type}` },
        { label: template.name },
      ]}
    >
      <section className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
        <header className="flex items-center gap-3 px-4 py-3 border-b border-edge-subtle">
          <p className="text-xs text-fg-muted">Tune theme in the top navbar — changes sync here in real time.</p>
          <div className="ml-auto flex items-center gap-2">
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
              href={previewSrc}
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
            className="relative w-full transition-[max-width] duration-300 ease-out"
            style={{ maxWidth: VIEWPORT_WIDTH[viewport] }}
          >
            <iframe
              ref={iframeRef}
              src={previewSrc}
              title={template.name}
              className="w-full block bg-surface-base"
              style={{ height: FRAME_HEIGHT, border: 0 }}
            />
            <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
              {regions.map((r) => {
                const isHovered = r.ref === hoveredRef;
                const top = r.top - scrollTop;
                if (top + r.height <= 0 || top >= FRAME_HEIGHT) return null;
                return (
                  <div
                    key={r.ref}
                    className={cn(
                      "absolute inset-x-0 border-2 transition-colors",
                      isHovered ? "border-dark-70" : "border-transparent",
                    )}
                    style={{ top, height: r.height }}
                  >
                    {isHovered && (
                      <Link
                        href={`/blocks/${r.ref}`}
                        target="_blank"
                        className="pointer-events-auto absolute top-2 right-2 inline-flex items-center gap-1.5 px-2.5 h-7 rounded-[var(--ds-radius-button)] bg-dark-70 text-white text-xs font-medium shadow-md hover:bg-dark-90"
                      >
                        {r.ref}
                        <ExternalLink className="size-3" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-fg-primary">Blocks in this template</h2>
        <p className="text-sm text-fg-muted mt-1">
          {blocks.length} block{blocks.length === 1 ? "" : "s"} composed in order.
        </p>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {blocks.map((b) => (
            <li key={b.key}>
              <Link
                href={`/blocks/${b.key}`}
                className="group flex items-center justify-between gap-3 rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card px-4 py-3 transition-colors hover:border-accent"
              >
                <div className="min-w-0">
                  <div className="text-xs font-mono text-fg-dimmed">{b.key}</div>
                  <div className="text-sm font-medium text-fg-primary truncate">{b.meta.name}</div>
                </div>
                <ExternalLink className="size-3.5 text-fg-dimmed group-hover:text-accent shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}

"use client";

import { Badge, Button } from "@designystem/react";
import { ArrowRight, Monitor, Smartphone, Tablet } from "lucide-react";
import * as React from "react";
import { PageShell } from "../../_components/page-shell";

const BREAKPOINTS = [
  { name: "base", min: "0px", label: "Mobile", icon: Smartphone },
  { name: "sm", min: "640px", label: "Large phone", icon: Smartphone },
  { name: "md", min: "768px", label: "Tablet", icon: Tablet },
  { name: "lg", min: "1024px", label: "Laptop", icon: Monitor },
  { name: "xl", min: "1280px", label: "Desktop", icon: Monitor },
  { name: "2xl", min: "1536px", label: "Large desktop", icon: Monitor },
];

function ActiveBreakpoint() {
  const [active, setActive] = React.useState("base");

  React.useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w >= 1536) setActive("2xl");
      else if (w >= 1280) setActive("xl");
      else if (w >= 1024) setActive("lg");
      else if (w >= 768) setActive("md");
      else if (w >= 640) setActive("sm");
      else setActive("base");
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
      <div className="px-5 py-3 border-b border-edge-subtle">
        <h3 className="text-sm font-medium text-fg-primary">Breakpoints</h3>
        <p className="text-xs text-fg-muted">Tailwind v4 defaults. Resize the window to see the active breakpoint.</p>
      </div>
      <div className="divide-y divide-edge-subtle">
        {BREAKPOINTS.map((bp) => {
          const Icon = bp.icon;
          const isActive = bp.name === active;
          return (
            <div
              key={bp.name}
              className={`px-5 py-3 flex items-center justify-between gap-4 transition-colors ${isActive ? "bg-[color-mix(in_oklch,var(--accent)_8%,transparent)]" : ""}`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`size-4 ${isActive ? "text-accent" : "text-fg-dimmed"}`} />
                <div>
                  <p className={`text-sm font-mono ${isActive ? "text-accent-text font-semibold" : "text-fg-primary"}`}>
                    {bp.name}
                  </p>
                  <p className="text-xs text-fg-muted">{bp.label}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-fg-secondary">{bp.min === "0px" ? "—" : `≥ ${bp.min}`}</span>
                {isActive && (
                  <Badge variant="default" size="sm">
                    active
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WebGridDemo() {
  return (
    <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
      <div className="px-5 py-3 border-b border-edge-subtle">
        <h3 className="text-sm font-medium text-fg-primary">Web blocks</h3>
        <p className="text-xs text-fg-muted">Centered container, responsive columns: 1 → 2 → 3</p>
      </div>
      <div className="p-[var(--ds-space-card)]">
        <div className="mx-auto max-w-md">
          <div className="text-center mb-4">
            <span className="text-[10px] font-mono text-accent-text">max-w-6xl centered</span>
          </div>
          <div className="rounded-sm border border-dashed border-[color-mix(in_oklch,var(--accent)_30%,transparent)] p-3">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-sm bg-surface-elevated border border-edge-subtle p-2 text-center">
                  <span className="text-[10px] text-fg-muted">col</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] font-mono text-fg-dimmed">1 col mobile</span>
              <span className="text-[10px] font-mono text-fg-dimmed">2 col sm</span>
              <span className="text-[10px] font-mono text-fg-dimmed">3 col lg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppGridDemo() {
  return (
    <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
      <div className="px-5 py-3 border-b border-edge-subtle">
        <h3 className="text-sm font-medium text-fg-primary">App blocks</h3>
        <p className="text-xs text-fg-muted">Sidebar + content area, sidebar hidden on mobile</p>
      </div>
      <div className="p-[var(--ds-space-card)]">
        <div className="mx-auto max-w-md">
          <div className="rounded-sm border border-dashed border-[color-mix(in_oklch,var(--accent)_30%,transparent)] overflow-hidden flex">
            <div className="w-16 shrink-0 border-r border-dashed border-[color-mix(in_oklch,var(--accent)_30%,transparent)] bg-[color-mix(in_oklch,var(--accent)_6%,transparent)] p-2 flex flex-col items-center gap-2">
              <span
                className="text-[10px] font-mono text-accent-text writing-mode-vertical"
                style={{ writingMode: "vertical-rl" }}
              >
                sidebar
              </span>
            </div>
            <div className="flex-1 p-3 space-y-2">
              <div className="rounded-sm bg-surface-elevated border border-edge-subtle p-2">
                <span className="text-[10px] text-fg-muted">header</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-sm bg-surface-elevated border border-edge-subtle p-2">
                  <span className="text-[10px] text-fg-muted">card</span>
                </div>
                <div className="rounded-sm bg-surface-elevated border border-edge-subtle p-2">
                  <span className="text-[10px] text-fg-muted">card</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] font-mono text-fg-dimmed">sidebar hidden mobile</span>
            <span className="text-[10px] font-mono text-fg-dimmed">visible md+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResponsiveButtonDemo() {
  return (
    <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
      <div className="px-5 py-3 border-b border-edge-subtle">
        <h3 className="text-sm font-medium text-fg-primary">Responsive button sizing</h3>
        <p className="text-xs text-fg-muted">
          Dual render pattern — two elements, one hidden per breakpoint. No fragile className overrides.
        </p>
      </div>
      <div className="p-[var(--ds-space-card)] space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-medium text-fg-secondary">Three tiers based on context:</p>
          <div className="flex items-center gap-[var(--ds-space-gap)]">
            <div className="space-y-1 text-center">
              <Button size="sm">Action</Button>
              <p className="text-[10px] font-mono text-fg-dimmed">sm</p>
              <p className="text-[10px] text-fg-muted">tight spaces</p>
            </div>
            <span className="text-fg-dimmed text-xs">→</span>
            <div className="space-y-1 text-center">
              <Button size="md">
                Get started
                <ArrowRight />
              </Button>
              <p className="text-[10px] font-mono text-fg-dimmed">md</p>
              <p className="text-[10px] text-fg-muted">mobile default</p>
            </div>
            <span className="text-fg-dimmed text-xs">→</span>
            <div className="space-y-1 text-center">
              <Button size="lg">
                Get started
                <ArrowRight />
              </Button>
              <p className="text-[10px] font-mono text-fg-dimmed">lg</p>
              <p className="text-[10px] text-fg-muted">desktop hero/CTA</p>
            </div>
          </div>
        </div>
        <div className="rounded-[var(--ds-radius-card)] bg-surface-base border border-edge-subtle p-4">
          <p className="text-xs font-mono text-fg-secondary mb-2">Pattern:</p>
          <pre className="text-xs font-mono text-fg-muted leading-relaxed overflow-x-auto">
            {`<Button size="md" className="sm:hidden">
  Get started <ArrowRight />
</Button>
<Button size="lg" className="hidden sm:inline-flex">
  Get started <ArrowRight />
</Button>`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function ConventionsTable() {
  const conventions = [
    { breakpoint: "all", component: "Button (app)", rule: 'size="sm" — toolbars, card footers, headers' },
    { breakpoint: "base → sm", component: "Button (web)", rule: 'size="md"' },
    { breakpoint: "sm+", component: "Button (web)", rule: 'size="lg"' },
    { breakpoint: "base", component: "Grid (web)", rule: "1 column" },
    { breakpoint: "sm+", component: "Grid (web)", rule: "2 columns" },
    { breakpoint: "lg+", component: "Grid (web)", rule: "3 columns" },
    { breakpoint: "base", component: "Sidebar (app)", rule: "Hidden (Sheet)" },
    { breakpoint: "md+", component: "Sidebar (app)", rule: "Visible" },
    { breakpoint: "base", component: "TabsList", rule: "Full width, flex-1 triggers" },
    { breakpoint: "sm+", component: "TabsList", rule: "w-fit, hug content" },
  ];

  return (
    <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
      <div className="px-5 py-3 border-b border-edge-subtle">
        <h3 className="text-sm font-medium text-fg-primary">Responsive conventions</h3>
      </div>
      <div className="divide-y divide-edge-subtle">
        {conventions.map((c) => (
          <div key={c.breakpoint} className="px-5 py-3 grid grid-cols-3 gap-4 items-center">
            <span className="text-xs font-mono text-accent-text">{c.breakpoint}</span>
            <span className="text-sm text-fg-primary">{c.component}</span>
            <span className="text-xs font-mono text-fg-secondary">{c.rule}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LayoutFoundationPage() {
  return (
    <div className="max-w-6xl mx-auto px-[var(--ds-space-page-x)] py-12">
      <PageShell
        title="Layout"
        description="Breakpoints, grid patterns, and responsive conventions. Fluid tokens are covered in Spacing."
        crumbs={[{ label: "Foundations", href: "/foundations" }, { label: "Layout" }]}
      >
        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-4">Breakpoints</h2>
            <p className="text-sm text-fg-muted mb-6">
              Standard Tailwind v4 breakpoints — no custom values. Mobile-first: styles apply from the breakpoint
              upward.
            </p>
            <ActiveBreakpoint />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-4">Grid patterns</h2>
            <p className="text-sm text-fg-muted mb-6">
              Two layout modes. <strong>Web blocks</strong> use a centered container with responsive column counts.{" "}
              <strong>App blocks</strong> use a sidebar + content split with the sidebar collapsing to a Sheet on
              mobile.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--ds-space-gap)]">
              <WebGridDemo />
              <AppGridDemo />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-4">Responsive component sizing</h2>
            <p className="text-sm text-fg-muted mb-6">
              Components with size props (Button, etc.) don't support responsive values. Use the dual render pattern:
              render both sizes, toggle visibility with breakpoint utilities.
            </p>
            <ResponsiveButtonDemo />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-4">All conventions</h2>
            <ConventionsTable />
          </section>
        </div>
      </PageShell>
    </div>
  );
}

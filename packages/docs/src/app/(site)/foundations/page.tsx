import { ArrowRight, LayoutGrid, Palette, Shapes, Space, Sparkles, Type } from "lucide-react";
import Link from "next/link";
import { PageShell } from "../_components/page-shell";

type FoundationCard = {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  ready: boolean;
};

const FOUNDATIONS: FoundationCard[] = [
  {
    href: "/foundations/spacing",
    title: "Spacing",
    description: "Vertical rhythm, stack hierarchy, fluid page padding, and section gaps.",
    icon: Space,
    ready: true,
  },
  {
    href: "/foundations/colors",
    title: "Colors",
    description: "All colors in OKLCH. Palette & accent change via sidebar.",
    icon: Palette,
    ready: true,
  },
  {
    href: "/foundations/typography",
    title: "Typography",
    description: "Major Third scale, fluid clamp() sizes, font presets, and line heights.",
    icon: Type,
    ready: true,
  },
  {
    href: "/foundations/layout",
    title: "Layout",
    description: "Breakpoints, grid patterns, and responsive conventions for web and app blocks.",
    icon: LayoutGrid,
    ready: true,
  },
  {
    href: "/foundations/ai-layer",
    title: "AI Layer",
    description: "Pastel iridescent palette and motion primitives for AI-driven UI.",
    icon: Sparkles,
    ready: true,
  },
  {
    href: "/foundations/effects",
    title: "Effects",
    description: "Shadows, border radius presets, animation curves, and component density.",
    icon: Sparkles,
    ready: true,
  },
  {
    href: "/foundations/icons",
    title: "Icons",
    description: "Lucide for UI primitives, Simple Icons for brand logos. Per-framework packages.",
    icon: Shapes,
    ready: true,
  },
];

export default function FoundationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-[var(--ds-space-page-x)] py-12">
      <PageShell
        title="Foundations"
        description="The building blocks behind every component. Tokens, scales, and layout primitives."
        crumbs={[{ label: "Foundations" }]}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-gap)]">
          {FOUNDATIONS.map((f) => {
            const Icon = f.icon;
            const Wrapper = f.ready ? Link : "div";
            return (
              <Wrapper
                key={f.href}
                href={f.href}
                className={`group relative rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-[var(--ds-space-card)] transition-all ${f.ready ? "hover:border-accent hover:shadow-md" : "opacity-50 cursor-default"}`}
              >
                <div className="flex items-start justify-between">
                  <div className="size-12 rounded-[var(--ds-radius-button)] bg-surface-elevated border border-edge-subtle flex items-center justify-center text-accent">
                    <Icon className="size-6" />
                  </div>
                  {f.ready ? (
                    <ArrowRight className="size-5 text-fg-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                  ) : (
                    <span className="text-xs text-fg-dimmed">Coming soon</span>
                  )}
                </div>
                <h2 className="mt-6 text-xl font-semibold text-fg-primary">{f.title}</h2>
                <p className="mt-2 text-sm text-fg-muted">{f.description}</p>
              </Wrapper>
            );
          })}
        </div>
      </PageShell>
    </div>
  );
}

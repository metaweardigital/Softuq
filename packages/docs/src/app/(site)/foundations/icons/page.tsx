"use client";

import {
  SiDiscord,
  SiFigma,
  SiGithub,
  SiLinear,
  SiNotion,
  SiStripe,
  SiVercel,
  SiX,
} from "@icons-pack/react-simple-icons";
import { Alert, AlertDescription, AlertTitle, Card, CardContent, CodeBlock } from "@softuq/react";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  Heart,
  Info,
  type LucideIcon,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import type * as React from "react";
import { PageShell } from "../../_components/page-shell";

const UI_ICONS: { name: string; Icon: LucideIcon }[] = [
  { name: "ArrowRight", Icon: ArrowRight },
  { name: "Bell", Icon: Bell },
  { name: "Check", Icon: Check },
  { name: "ChevronDown", Icon: ChevronDown },
  { name: "Heart", Icon: Heart },
  { name: "Menu", Icon: Menu },
  { name: "Plus", Icon: Plus },
  { name: "Search", Icon: Search },
  { name: "Settings", Icon: Settings },
  { name: "Sparkles", Icon: Sparkles },
  { name: "Trash2", Icon: Trash2 },
  { name: "User", Icon: User },
];

type BrandIconComponent = React.ComponentType<{ className?: string; size?: number | string }>;

const BRAND_ICONS: { name: string; Icon: BrandIconComponent }[] = [
  { name: "SiGithub", Icon: SiGithub as BrandIconComponent },
  { name: "SiX", Icon: SiX as BrandIconComponent },
  { name: "SiFigma", Icon: SiFigma as BrandIconComponent },
  { name: "SiNotion", Icon: SiNotion as BrandIconComponent },
  { name: "SiDiscord", Icon: SiDiscord as BrandIconComponent },
  { name: "SiStripe", Icon: SiStripe as BrandIconComponent },
  { name: "SiVercel", Icon: SiVercel as BrandIconComponent },
  { name: "SiLinear", Icon: SiLinear as BrandIconComponent },
];

const FRAMEWORK_MAP = [
  { framework: "React", ui: "lucide-react", brand: "@icons-pack/react-simple-icons" },
  { framework: "Vue", ui: "lucide-vue-next", brand: "@icons-pack/vue-simple-icons" },
  { framework: "Svelte", ui: "lucide-svelte", brand: "@icons-pack/svelte-simple-icons" },
];

function IconGrid({ icons }: { icons: { name: string; Icon: React.ComponentType<{ className?: string }> }[] }) {
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)]">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-[var(--ds-space-gap)]">
          {icons.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 p-3 rounded-[var(--ds-radius-card)] bg-surface-elevated border border-edge-subtle"
            >
              <div className="size-10 flex items-center justify-center text-fg-primary">
                <Icon className="size-5" />
              </div>
              <span className="text-[10px] font-mono text-fg-muted text-center break-all">{name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function FrameworkTable() {
  return (
    <Card>
      <CardContent className="pt-[var(--ds-space-card)] p-0">
        <div className="px-5 py-3 grid grid-cols-3 gap-4 text-[11px] font-semibold tracking-wide uppercase text-fg-dimmed border-b border-edge-subtle">
          <span>Framework</span>
          <span>UI icons</span>
          <span>Brand logos</span>
        </div>
        <div className="divide-y divide-edge-subtle">
          {FRAMEWORK_MAP.map((row) => (
            <div key={row.framework} className="px-5 py-3 grid grid-cols-3 gap-4 items-center">
              <span className="text-sm font-medium text-fg-primary">{row.framework}</span>
              <span className="text-xs font-mono text-accent-text">{row.ui}</span>
              <span className="text-xs font-mono text-accent-text">{row.brand}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function IconsFoundationPage() {
  return (
    <div className="max-w-6xl mx-auto px-[var(--ds-space-page-x)] py-12">
      <PageShell
        title="Icons"
        description="Two complementary libraries — lucide for UI, simple-icons for brand logos. Per-framework packages."
        crumbs={[{ label: "Foundations", href: "/foundations" }, { label: "Icons" }]}
      >
        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Two libraries, zero overlap</h2>
            <p className="text-sm text-fg-muted mb-6 max-w-3xl leading-relaxed">
              Lucide v1.0 removed brand logos (trademark, maintenance). Simple Icons ships only brand logos, no UI
              primitives. The two packages cover disjoint domains — you always know which one to reach for.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-gap)]">
              <Card>
                <CardContent className="pt-[var(--ds-space-card)]">
                  <h3 className="text-sm font-semibold text-fg-primary mb-1">Lucide</h3>
                  <p className="text-xs text-fg-muted mb-4">UI primitives — arrows, form states, navigation, status.</p>
                  <div className="flex items-center gap-4 text-fg-primary">
                    <ArrowRight className="size-5" />
                    <Bell className="size-5" />
                    <Check className="size-5" />
                    <Menu className="size-5" />
                    <Search className="size-5" />
                    <Settings className="size-5" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-[var(--ds-space-card)]">
                  <h3 className="text-sm font-semibold text-fg-primary mb-1">Simple Icons</h3>
                  <p className="text-xs text-fg-muted mb-4">Brand logos — GitHub, X, Figma, Stripe, and ~3200 more.</p>
                  <div className="flex items-center gap-4 text-fg-primary">
                    <SiGithub className="size-5" />
                    <SiX className="size-5" />
                    <SiFigma className="size-5" />
                    <SiStripe className="size-5" />
                    <SiVercel className="size-5" />
                    <SiDiscord className="size-5" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">UI icons — Lucide</h2>
            <p className="text-sm text-fg-muted mb-6">
              Import individually for tree-shaking. Default size is <code className="text-accent-text">1em</code> —
              override with <code className="text-accent-text">size-4</code> or{" "}
              <code className="text-accent-text">size-5</code> utilities.
            </p>
            <IconGrid icons={UI_ICONS} />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Brand logos — Simple Icons</h2>
            <p className="text-sm text-fg-muted mb-6">
              Prefixed with <code className="text-accent-text">Si</code>. Single-color logos — colored variants exist
              with a <code className="text-accent-text">Hex</code> suffix (
              <code className="text-accent-text">SiGithubHex</code>).
            </p>
            <IconGrid icons={BRAND_ICONS} />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Per-framework packages</h2>
            <p className="text-sm text-fg-muted mb-6">
              Both libraries ship framework-specific packages with identical icon names. Blocks and components are
              copy-paste per framework — imports swap automatically.
            </p>
            <FrameworkTable />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Coloring</h2>
            <p className="text-sm text-fg-muted mb-6 max-w-3xl leading-relaxed">
              Icons inherit color via <code className="text-accent-text">currentColor</code>. The parent element sets
              the text color — the icon follows. Variants (info, success, warning, destructive) simply swap the parent's
              text utility via the <code className="text-accent-text">[&amp;&gt;svg]:text-*</code> selector. The icon
              itself stays untouched.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-gap)]">
              <Card>
                <CardContent className="pt-[var(--ds-space-card)] space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-fg-primary mb-1">Five variants, one pattern</h3>
                    <p className="text-xs text-fg-muted">
                      Each Alert passes a Lucide icon as child. The variant class paints it via{" "}
                      <code className="text-accent-text">[&amp;&gt;svg]:text-*</code>.
                    </p>
                  </div>
                  <Alert>
                    <Bell />
                    <AlertTitle>Default</AlertTitle>
                    <AlertDescription>Icon inherits fg-secondary from the variant.</AlertDescription>
                  </Alert>
                  <Alert variant="info">
                    <Info />
                    <AlertTitle>Info</AlertTitle>
                    <AlertDescription>Tint follows the active accent token.</AlertDescription>
                  </Alert>
                  <Alert variant="success">
                    <CheckCircle2 />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Pointing at semantic success token.</AlertDescription>
                  </Alert>
                  <Alert variant="warning">
                    <AlertTriangle />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>No prop on the icon — parent drives it.</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertCircle />
                    <AlertTitle>Destructive</AlertTitle>
                    <AlertDescription>Same Lucide import, different wrapper.</AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-[var(--ds-space-card)] space-y-[var(--ds-space-gap)]">
                  <div>
                    <h3 className="text-sm font-semibold text-fg-primary mb-1">How it's wired</h3>
                    <p className="text-xs text-fg-muted">
                      The selector lives on the wrapper's CVA — the icon stays prop-free.
                    </p>
                  </div>
                  <CodeBlock title="alert.tsx">
                    {`const alertVariants = cva(
  "... [&>svg]:size-4",
  {
    variants: {
      variant: {
        default:     "[&>svg]:text-fg-secondary",
        info:        "[&>svg]:text-accent",
        success:     "[&>svg]:text-success",
        warning:     "[&>svg]:text-warning",
        destructive: "[&>svg]:text-destructive",
      },
    },
  },
);`}
                  </CodeBlock>
                  <CodeBlock title="usage.tsx">
                    {`<Alert variant="success">
  <CheckCircle2 />
  <AlertTitle>Saved</AlertTitle>
</Alert>`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </div>
            <div className="mt-[var(--ds-space-gap)]">
              <CodeBlock title="coloring.tsx">
                {`// Wrong — hardcoded on the icon
<Bell stroke="#3b82f6" className="size-5" />

// Right — parent drives color, icon inherits
<div className="text-accent">
  <Bell className="size-5" />
</div>

// Or shorthand (same thing — Bell is just a span with currentColor SVG)
<Bell className="size-5 text-accent" />`}
              </CodeBlock>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-fg-primary mb-2">Usage</h2>
            <p className="text-sm text-fg-muted mb-6">
              Never inline raw SVG. Always import from the right package. Never mix a brand logo into a component that
              the design system publishes (blocks only).
            </p>
            <div className="space-y-[var(--ds-space-gap)]">
              <CodeBlock title="import.tsx">
                {`import { Search, Settings } from "lucide-react";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";

<Search className="size-4" />
<SiGithub className="size-4" />`}
              </CodeBlock>
              <CodeBlock title="install.sh">{`pnpm add lucide-react @icons-pack/react-simple-icons`}</CodeBlock>
            </div>
          </section>
        </div>
      </PageShell>
    </div>
  );
}

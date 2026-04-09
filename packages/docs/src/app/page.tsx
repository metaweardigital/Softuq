"use client";

import type { AccentPreset, FontPreset, PalettePreset, RadiusPreset, SpacingPreset } from "@designystem/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Code,
  DesignYstemProvider,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormDescription,
  FormField,
  FormMessage,
  Input,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  Separator,
  Sheet,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Textarea,
  ToastProvider,
  Toggle,
  Tooltip,
  useDesignYstem,
  useToast,
} from "@designystem/react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, Plus, Terminal } from "lucide-react";
import React from "react";

/* --------------------------------------------------------- */
/* ASCII Gradient Canvas                                     */
/* --------------------------------------------------------- */
function AsciiGradientCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CELL = 7;
    const CHARS = " .,·:;!|+=oxOX$#%&@█";
    let cols = 0;
    let rows = 0;
    let animId = 0;

    const chrR = (t: number) => 0.5 + 0.5 * Math.cos(6.28318 * (t + 0.0));
    const chrG = (t: number) => 0.5 + 0.5 * Math.cos(6.28318 * (t + 0.1));
    const chrB = (t: number) => 0.5 + 0.5 * Math.cos(6.28318 * (t + 0.2));

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      cols = Math.ceil(rect.width / CELL);
      rows = Math.ceil(rect.height / (CELL * 1.6));
    }

    resize();
    window.addEventListener("resize", resize);
    const start = performance.now();

    function frame() {
      if (!canvas || !ctx) return;
      const t = (performance.now() - start) / 1000;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const lineH = CELL * 1.6;

      ctx.clearRect(0, 0, w, canvas.height / dpr);
      ctx.font = `${CELL}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / cols;
          const ny = y / rows;
          const w1 = Math.sin(nx * 6.0 + t * 0.08) * Math.cos(ny * 4.0 + t * 0.06);
          const w2 = Math.sin(nx * 3.0 - t * 0.12 + ny * 5.0) * 0.5;
          const w3 = Math.cos(nx * 8.0 + ny * 3.0 + t * 0.04) * 0.3;
          const w4 = Math.sin(nx * 12.0 + ny * 8.0 - t * 0.1) * 0.2;
          const w5 = Math.cos(nx * 4.0 - ny * 6.0 + t * 0.07) * 0.35;
          const cx = nx - 0.5;
          const cy = ny - 0.5;
          const dist = Math.sqrt(cx * cx + cy * cy);
          const pulse = Math.sin(dist * 12.0 - t * 0.2) * 0.4;

          const raw = (w1 + w2 + w3 + w4 + w5 + pulse) * 0.4 + 0.5;
          const val = raw * raw * (3 - 2 * raw);
          const idx = Math.floor(val * (CHARS.length - 1));
          const ch = CHARS[idx];

          const colorT = nx * 0.6 + ny * 0.4 + t * 0.025 + val * 0.3;
          const r = Math.floor(chrR(colorT) * 255);
          const g = Math.floor(chrG(colorT) * 255);
          const b = Math.floor(chrB(colorT) * 255);
          const alpha = 0.15 + val * 0.85;

          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fillText(ch, x * CELL, y * lineH);
        }
      }
      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* --------------------------------------------------------- */
/* Theme switcher                                            */
/* --------------------------------------------------------- */
const RADIUS_OPTIONS: RadiusPreset[] = ["none", "sm", "md", "lg", "full"];
const SPACING_OPTIONS: SpacingPreset[] = ["sm", "md", "lg"];
const PALETTE_OPTIONS: PalettePreset[] = ["neutral", "zinc", "stone", "slate", "mauve", "olive"];
const ACCENT_OPTIONS: AccentPreset[] = ["blue", "violet", "emerald", "amber", "red", "rose", "cyan", "orange"];
const FONT_OPTIONS: FontPreset[] = ["system", "inter", "geist"];

function SidebarSelect<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <FormField size="sm">
      <Label>{label}</Label>
      <Select size="sm" value={value} onValueChange={(v) => onChange(v as T)}>
        <SelectTrigger placeholder={label} />
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}

function ThemeSidebar({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  const { radius, setRadius, spacing, setSpacing, palette, setPalette, accent, setAccent, font, setFont } =
    useDesignYstem();
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-48 border-r border-border-subtle bg-bg-base/80 backdrop-blur-glass overflow-y-auto scrollbar-thin z-sticky">
      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-lg font-bold tracking-tight">DesignYstem</h1>
          <p className="text-xs text-text-muted">Component Preview</p>
        </div>
        <Separator />
        <SidebarSelect label="Font" options={FONT_OPTIONS} value={font} onChange={setFont} />
        <SidebarSelect label="Accent" options={ACCENT_OPTIONS} value={accent} onChange={setAccent} />
        <SidebarSelect label="Palette" options={PALETTE_OPTIONS} value={palette} onChange={setPalette} />
        <SidebarSelect label="Radius" options={RADIUS_OPTIONS} value={radius} onChange={setRadius} />
        <SidebarSelect label="Spacing" options={SPACING_OPTIONS} value={spacing} onChange={setSpacing} />
        <Separator />
        <div className="flex items-center justify-between">
          <Label size="sm">Mode</Label>
          <div className="flex items-center gap-2">
            <Toggle checked={theme === "light"} onCheckedChange={toggleTheme} size="sm" />
            <span className="text-xs text-text-secondary">{theme}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* --------------------------------------------------------- */
/* Section wrapper                                           */
/* --------------------------------------------------------- */
function SectionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-12">
      <h2 className="text-[11px] font-medium text-text-muted uppercase tracking-widest border-b border-border-subtle pb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      {children}
    </section>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      {label && <p className="text-xs font-medium text-text-muted uppercase tracking-wide">{label}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/* --------------------------------------------------------- */
/* Toast demo (needs context)                                */
/* --------------------------------------------------------- */
function ToastDemo() {
  const { addToast } = useToast();
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Variants</p>
        <div className="flex flex-wrap gap-3">
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              addToast({ title: "Heads up!", description: "You can add components to your app using the CLI." })
            }
          >
            Default
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              addToast({
                title: "Information",
                description: "This is an informational alert message.",
                variant: "info",
              })
            }
          >
            Info
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              addToast({
                title: "Success",
                description: "Your changes have been saved successfully.",
                variant: "success",
              })
            }
          >
            Success
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              addToast({
                title: "Warning",
                description: "Please review your settings before proceeding.",
                variant: "warning",
              })
            }
          >
            Warning
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              addToast({ title: "Error", description: "Something went wrong. Please try again.", variant: "error" })
            }
          >
            Error
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Title only</p>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" variant="ghost" onClick={() => addToast({ title: "Saved", variant: "success" })}>
            Short
          </Button>
          <Button size="sm" variant="ghost" onClick={() => addToast({ title: "Connection lost", variant: "error" })}>
            Error title
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Long content (truncated)</p>
        <div className="flex flex-wrap gap-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              addToast({
                title: "Breaking changes in v2.0",
                description:
                  "The API has been completely redesigned. All existing endpoints will be deprecated on March 31st. Please migrate your application to the new endpoints before the deadline.",
                variant: "warning",
              })
            }
          >
            Long text
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Custom duration</p>
        <div className="flex flex-wrap gap-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              addToast({
                title: "Quick flash",
                description: "This disappears in 1.5s.",
                variant: "info",
                duration: 1500,
              })
            }
          >
            1.5s
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              addToast({
                title: "Sticky toast",
                description: "This stays for 10 seconds.",
                variant: "warning",
                duration: 10000,
              })
            }
          >
            10s
          </Button>
        </div>
      </div>
    </div>
  );
}

function ColorSwatch({ prefix, shade }: { prefix: string; shade: string }) {
  const { addToast } = useToast();
  const cssVar = `${prefix}-${shade}`;
  return (
    <Tooltip content={`var(${cssVar})`} delay={100} wrapperClassName="flex-1 min-w-[48px]">
      <button
        type="button"
        className="w-full flex flex-col items-center gap-0.5 cursor-pointer"
        onClick={() => {
          const el = document.createElement("span");
          el.style.color = `var(${cssVar})`;
          document.body.appendChild(el);
          const computed = getComputedStyle(el).color;
          document.body.removeChild(el);
          navigator.clipboard.writeText(computed);
          addToast({ title: `Copied ${computed}`, variant: "success", duration: 1500 });
        }}
      >
        <div
          className="w-full h-8 rounded-[var(--ds-radius-checkbox)] border border-border-subtle transition-shadow hover:shadow-neu-floating"
          style={{ backgroundColor: `var(${cssVar})` }}
        />
        <span className="text-[9px] text-text-muted">{shade}</span>
      </button>
    </Tooltip>
  );
}

/* --------------------------------------------------------- */
/* Main page                                                 */
/* --------------------------------------------------------- */
export default function ComponentPreview() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const [toggleChecked, setToggleChecked] = React.useState(false);
  const [toggleChecked2, setToggleChecked2] = React.useState(true);
  const [radioValue, setRadioValue] = React.useState("option1");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(45);
  const [toastPosition, setToastPosition] = React.useState<"left" | "center" | "right">("center");

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <DesignYstemProvider>
      <ToastProvider position={toastPosition}>
        <div className="min-h-screen bg-bg-base">
          <ThemeSidebar theme={theme} toggleTheme={toggleTheme} />

          {/* Brand Banner */}
          <div className="ml-48 relative flex items-center justify-center h-56 overflow-hidden">
            <AsciiGradientCanvas />
            <div className="relative text-center z-10">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">DesignYstem</h1>
              <Button size="sm" className="mt-4" onClick={() => (window.location.href = "/getting-started")}>
                Getting Started →
              </Button>
            </div>
            <div className="fade-edge-b absolute inset-x-0 bottom-0" style={{ backgroundColor: "var(--bg-base)" }} />
          </div>

          <main className="ml-48 px-8 py-10 space-y-12">
            <SectionGroup title="Foundations">
              {/* Colors */}
              <Section title="Colors">
                <div className="space-y-6">
                  <p className="text-sm text-text-secondary">
                    All colors in OKLCH. Palette & accent change via sidebar.
                  </p>
                  {[
                    {
                      name: "Gray",
                      prefix: "--gray",
                      shades: [
                        "50",
                        "100",
                        "200",
                        "300",
                        "400",
                        "500",
                        "600",
                        "700",
                        "800",
                        "900",
                        "920",
                        "940",
                        "960",
                        "980",
                      ],
                    },
                    {
                      name: "Blue",
                      prefix: "--blue",
                      shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
                    },
                    {
                      name: "Red",
                      prefix: "--red",
                      shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
                    },
                    {
                      name: "Green",
                      prefix: "--green",
                      shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
                    },
                    {
                      name: "Amber",
                      prefix: "--amber",
                      shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
                    },
                    {
                      name: "Emerald",
                      prefix: "--emerald",
                      shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
                    },
                    {
                      name: "Violet",
                      prefix: "--violet",
                      shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
                    },
                  ].map((palette) => (
                    <div key={palette.name} className="space-y-1.5">
                      <p className="text-xs font-medium text-text-muted uppercase tracking-wide">{palette.name}</p>
                      <div className="flex flex-wrap gap-1">
                        {palette.shades.map((shade) => (
                          <ColorSwatch key={shade} prefix={palette.prefix} shade={shade} />
                        ))}
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Semantic</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "accent", var: "--accent" },
                      { label: "accent-hover", var: "--accent-hover" },
                      { label: "accent-muted", var: "--accent-muted" },
                      { label: "destructive", var: "--destructive" },
                      { label: "success", var: "--success" },
                      { label: "warning", var: "--warning" },
                    ].map((token) => (
                      <div key={token.label} className="flex items-center gap-2">
                        <div
                          className="h-6 w-6 rounded-[var(--ds-radius-checkbox)] border border-border-subtle"
                          style={{ backgroundColor: `var(${token.var})` }}
                        />
                        <span className="text-xs text-text-secondary">{token.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>

              {/* Theming Overview */}
              <Section title="Theming">
                <div className="space-y-4">
                  <p className="text-sm text-text-secondary">
                    5 theme axes controlled via sidebar. All values are CSS custom properties on <Code>:root</Code> — no
                    re-renders.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Card>
                      <CardContent className="pt-4">
                        <p className="text-xs text-text-muted uppercase tracking-wide">Palette</p>
                        <p className="text-sm font-medium mt-1">Gray tinting</p>
                        <p className="text-xs text-text-secondary mt-0.5">6 options</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <p className="text-xs text-text-muted uppercase tracking-wide">Accent</p>
                        <p className="text-sm font-medium mt-1">Brand color</p>
                        <p className="text-xs text-text-secondary mt-0.5">8 options</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <p className="text-xs text-text-muted uppercase tracking-wide">Radius</p>
                        <p className="text-sm font-medium mt-1">Border radius</p>
                        <p className="text-xs text-text-secondary mt-0.5">5 options</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <p className="text-xs text-text-muted uppercase tracking-wide">Spacing</p>
                        <p className="text-sm font-medium mt-1">Density</p>
                        <p className="text-xs text-text-secondary mt-0.5">3 options</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <p className="text-xs text-text-muted uppercase tracking-wide">Font</p>
                        <p className="text-sm font-medium mt-1">Typeface</p>
                        <p className="text-xs text-text-secondary mt-0.5">3 options</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <p className="text-xs text-text-muted uppercase tracking-wide">Mode</p>
                        <p className="text-sm font-medium mt-1">Dark / Light</p>
                        <p className="text-xs text-text-secondary mt-0.5">data-theme</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="bg-bg-elevated border border-border-subtle rounded-[var(--ds-radius-card)] p-4">
                    <p className="text-xs font-mono text-text-secondary">
                      {'<DesignYstemProvider palette="zinc" accent="violet" radius="lg" spacing="md" font="geist">'}
                    </p>
                  </div>
                </div>
              </Section>

              {/* Typography */}
              <Section title="Typography">
                <div className="space-y-4">
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Font scale</p>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold tracking-tight">Heading 4XL</p>
                    <p className="text-3xl font-bold tracking-tight">Heading 3XL</p>
                    <p className="text-2xl font-semibold tracking-tight">Heading 2XL</p>
                    <p className="text-xl font-semibold">Heading XL</p>
                    <p className="text-lg font-medium">Text Large</p>
                    <p className="text-base">Text Base — The quick brown fox jumps over the lazy dog.</p>
                    <p className="text-sm text-text-secondary">
                      Text Small — Secondary body text for descriptions and labels.
                    </p>
                    <p className="text-xs text-text-muted">Text XS — Fine print, captions, and metadata.</p>
                  </div>
                  <Separator />
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Monospace</p>
                  <div className="space-y-1">
                    <p className="font-mono text-sm">const theme = useDesignYstem();</p>
                    <p className="font-mono text-xs text-text-secondary">
                      {'<DesignYstemProvider font="geist" accent="violet">'}
                    </p>
                  </div>
                </div>
              </Section>
            </SectionGroup>

            <SectionGroup title="Components">
              {/* Accordion */}
              <Section title="Accordion">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Default</p>
                    <Accordion variant="default">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>What is DesignYstem?</AccordionTrigger>
                        <AccordionContent>
                          A custom design system library with a{" "}
                          <span className="text-accent">soft UI / neumorphic</span> aesthetic. Built as a monorepo with
                          tokens, a Tailwind preset, and copy-paste components you fully own.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>How do I install it?</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Run <Code>npx designystem init</Code> to set up your project, then add individual
                            components:
                          </p>
                          <p className="mt-2">
                            <Code>npx designystem add button card input</Code>
                          </p>
                          <p className="mt-2">
                            Components are copied directly into your project — no runtime dependency, full control over
                            the source.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Which frameworks are supported?</AccordionTrigger>
                        <AccordionContent>
                          Currently{" "}
                          <Badge variant="default" size="sm">
                            React
                          </Badge>{" "}
                          is fully supported.{" "}
                          <Badge variant="secondary" size="sm">
                            Svelte 5
                          </Badge>{" "}
                          and{" "}
                          <Badge variant="outline" size="sm">
                            Astro
                          </Badge>{" "}
                          components are planned for v0.2.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>Is it customizable?</AccordionTrigger>
                        <AccordionContent>
                          Yes! The token system uses three layers: <span className="text-success-text">primitive</span>{" "}
                          → <span className="text-warning-text">semantic</span> →{" "}
                          <span className="text-accent">component</span>. All tokens are CSS custom properties you can
                          override. Dark mode is default, switch to light with <Code>data-theme=&quot;light&quot;</Code>{" "}
                          on your root element.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Bordered</p>
                    <Accordion variant="bordered" type="multiple">
                      <AccordionItem value="b1">
                        <AccordionTrigger>Can I use it with Tailwind v4?</AccordionTrigger>
                        <AccordionContent>
                          Absolutely. The design system is built for{" "}
                          <span className="text-accent">Tailwind CSS v4</span> — tokens are mapped via{" "}
                          <Code>@theme</Code> in your CSS, no config file needed.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="b2">
                        <AccordionTrigger>What about accessibility?</AccordionTrigger>
                        <AccordionContent>
                          All interactive components include proper <span className="text-accent">ARIA attributes</span>
                          , keyboard navigation, and focus management. Buttons, dialogs, tabs, and accordions follow
                          WAI-ARIA patterns. Color contrast meets <span className="text-success-text">WCAG AA</span>{" "}
                          standards in both dark and light themes.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="b3">
                        <AccordionTrigger>Where can I report bugs?</AccordionTrigger>
                        <AccordionContent>Short answer: GitHub Issues.</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </Section>

              {/* Alert */}
              <Section title="Alert">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Variants</p>
                  <Alert>
                    <Terminal />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
                  </Alert>
                  <Alert variant="info">
                    <Info />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>This is an informational alert message.</AlertDescription>
                  </Alert>
                  <Alert variant="success">
                    <CheckCircle2 />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Your changes have been saved successfully.</AlertDescription>
                  </Alert>
                  <Alert variant="warning">
                    <AlertTriangle />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>Please review your settings before proceeding.</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertCircle />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                  </Alert>

                  <p className="text-xs font-medium text-text-muted uppercase tracking-wide pt-4">Without icon</p>
                  <Alert>
                    <AlertTitle>No icon alert</AlertTitle>
                    <AlertDescription>This alert has no icon, just title and description.</AlertDescription>
                  </Alert>

                  <p className="text-xs font-medium text-text-muted uppercase tracking-wide pt-4">Title only</p>
                  <Alert variant="info">
                    <Info />
                    <AlertTitle>Quick note — no description needed.</AlertTitle>
                  </Alert>

                  <p className="text-xs font-medium text-text-muted uppercase tracking-wide pt-4">Long content</p>
                  <Alert variant="warning">
                    <AlertTriangle />
                    <AlertTitle>Breaking changes in v2.0</AlertTitle>
                    <AlertDescription className="line-clamp-2">
                      Refer to the{" "}
                      <a href="#" className="font-medium text-accent underline underline-offset-2">
                        migration guide
                      </a>{" "}
                      for detailed instructions. The API has been completely redesigned. All existing endpoints will be
                      deprecated on March 31st. Please migrate your application to the new endpoints before the
                      deadline.
                    </AlertDescription>
                  </Alert>

                  <p className="text-xs font-medium text-text-muted uppercase tracking-wide pt-4">
                    Fit width (hug content)
                  </p>
                  <Alert variant="success" size="fit">
                    <CheckCircle2 />
                    <AlertTitle>Saved</AlertTitle>
                  </Alert>
                  <Alert variant="info" size="fit">
                    <Info />
                    <AlertTitle>3 items selected</AlertTitle>
                    <AlertDescription>Click to manage selection.</AlertDescription>
                  </Alert>

                  <p className="text-xs font-medium text-text-muted uppercase tracking-wide pt-4">Rich content</p>
                  <Alert variant="success">
                    <CheckCircle2 />
                    <AlertTitle>Deployment complete</AlertTitle>
                    <AlertDescription>
                      Your app is live at <Code>production-abc123</Code>. Version{" "}
                      <Badge size="sm" variant="success">
                        v1.4.2
                      </Badge>{" "}
                      is now serving traffic.
                    </AlertDescription>
                  </Alert>
                </div>
              </Section>

              {/* Avatar */}
              <Section title="Avatar">
                <Row label="Sizes & Fallback">
                  <Avatar size="sm" fallback="SM" />
                  <Avatar size="md" fallback="MD" />
                  <Avatar size="lg" fallback="LG" />
                  <Avatar size="md" alt="John Doe" />
                  <Avatar size="md" src="https://i.pravatar.cc/100?u=demo" alt="User" />
                </Row>
              </Section>

              {/* Badge */}
              <Section title="Badge">
                <Row label="Variants">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                </Row>
                <Row label="Sizes">
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                </Row>
              </Section>

              {/* Button */}
              <Section title="Button">
                <Row label="Variants">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="link">Link</Button>
                </Row>
                <Row label="Sizes">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </Row>
                <Row label="States">
                  <Button disabled>Disabled</Button>
                </Row>
              </Section>

              {/* Code */}
              <Section title="Code">
                <Row label="Inline code">
                  <p className="text-sm text-text-secondary">
                    Run <Code>npx designystem init</Code> to set up your project.
                  </p>
                </Row>
                <Row label="In context">
                  <p className="text-sm text-text-secondary">
                    Set <Code>data-theme=&quot;light&quot;</Code> on <Code>&lt;html&gt;</Code> to enable light mode. All
                    tokens use <Code>oklch()</Code> color space.
                  </p>
                </Row>
                <Row label="Command">
                  <p className="text-sm text-text-secondary">
                    Install dependencies with <Code>pnpm install</Code> then run <Code>pnpm dev</Code> to start the dev
                    server.
                  </p>
                </Row>
              </Section>

              {/* Card */}
              <Section title="Card">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card variant="default">
                    <CardHeader>
                      <CardTitle>Default Card</CardTitle>
                      <CardDescription>Basic card with subtle shadow</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-text-secondary">Card content goes here.</p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm">Action</Button>
                    </CardFooter>
                  </Card>
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>Elevated Card</CardTitle>
                      <CardDescription>Neumorphic raised shadow</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-text-secondary">More prominent elevation.</p>
                    </CardContent>
                  </Card>
                  <Card variant="interactive">
                    <CardHeader>
                      <CardTitle>Interactive Card</CardTitle>
                      <CardDescription>Hover to see floating effect</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-text-secondary">Cursor pointer, hover elevation.</p>
                    </CardContent>
                  </Card>
                </div>
              </Section>

              {/* Checkbox */}
              <Section title="Checkbox">
                <Row>
                  <div className="flex items-center gap-2">
                    <Checkbox defaultChecked />
                    <Label size="sm">Checked</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <Label size="sm">Unchecked</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox size="sm" defaultChecked />
                    <Label size="sm">Small</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox disabled />
                    <Label size="sm">Disabled</Label>
                  </div>
                </Row>
              </Section>

              {/* Dialog */}
              <Section title="Dialog">
                <Row>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <Button variant="secondary" onClick={() => setDialogOpen(true)}>
                      Open Dialog
                    </Button>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your data.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={() => setDialogOpen(false)}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Row>
              </Section>

              {/* Input & Textarea */}
              <Section title="Input & Textarea">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField>
                    <Label>Default Input</Label>
                    <Input placeholder="Type something..." />
                    <FormDescription>This is a help text below the input.</FormDescription>
                  </FormField>
                  <FormField>
                    <Label variant="required">Required Input</Label>
                    <Input placeholder="Required field" />
                  </FormField>
                  <FormField>
                    <Label>Error State</Label>
                    <Input variant="error" placeholder="Invalid value" />
                    <FormMessage>This field is required.</FormMessage>
                  </FormField>
                  <FormField>
                    <Label>Success State</Label>
                    <Input variant="success" placeholder="Looks good" />
                    <FormMessage variant="success">Username is available.</FormMessage>
                  </FormField>
                  <FormField size="sm">
                    <Label>Small Input</Label>
                    <Input inputSize="sm" placeholder="Small size" />
                  </FormField>
                  <FormField>
                    <Label>Disabled</Label>
                    <Input disabled placeholder="Disabled input" />
                  </FormField>
                </div>
                <FormField>
                  <Label>Textarea</Label>
                  <Textarea placeholder="Write your message here..." />
                </FormField>
                <FormField>
                  <Label>Textarea (Error)</Label>
                  <Textarea variant="error" placeholder="Invalid content..." />
                  <FormMessage>Content must be at least 10 characters.</FormMessage>
                </FormField>
              </Section>

              {/* Label */}
              <Section title="Label">
                <Row>
                  <Label>Default Label</Label>
                  <Label variant="required">Required Label</Label>
                  <Label size="sm">Small Label</Label>
                </Row>
              </Section>

              {/* Form Text */}
              <Section title="Form Text">
                <div className="space-y-4">
                  <FormField>
                    <Label>FormDescription</Label>
                    <Input placeholder="you@example.com" />
                    <FormDescription>We&apos;ll never share your email with anyone.</FormDescription>
                  </FormField>
                  <FormField>
                    <Label variant="required">FormMessage — Error</Label>
                    <Input variant="error" placeholder="Username" />
                    <FormMessage>Username is already taken.</FormMessage>
                  </FormField>
                  <FormField>
                    <Label>FormMessage — Success</Label>
                    <Input variant="success" placeholder="Username" />
                    <FormMessage variant="success">Username is available!</FormMessage>
                  </FormField>
                  <FormField>
                    <Label>FormMessage — Warning</Label>
                    <Input placeholder="Password" />
                    <FormMessage variant="warning">Password is weak.</FormMessage>
                  </FormField>
                </div>
              </Section>

              {/* Progress */}
              <Section title="Progress">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-text-muted">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} size="md" />
                  </div>
                  <Progress value={75} size="sm" />
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setProgress(Math.max(0, progress - 10))}>
                      -10
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setProgress(Math.min(100, progress + 10))}>
                      +10
                    </Button>
                  </div>
                </div>
              </Section>

              {/* Radio */}
              <Section title="Radio">
                <Row>
                  <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="option1" />
                      <Label size="sm">Option 1</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="option2" />
                      <Label size="sm">Option 2</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="option3" />
                      <Label size="sm">Option 3</Label>
                    </div>
                  </RadioGroup>
                </Row>
              </Section>

              {/* Select */}
              <Section title="Select">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField>
                    <Label>Default</Label>
                    <Select>
                      <SelectTrigger placeholder="Choose a framework..." />
                      <SelectContent>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="svelte">Svelte</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="solid">SolidJS</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField size="sm">
                    <Label>Small</Label>
                    <Select size="sm">
                      <SelectTrigger placeholder="Size..." />
                      <SelectContent>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField>
                    <Label>Long labels</Label>
                    <Select>
                      <SelectTrigger placeholder="Choose a technology..." />
                      <SelectContent>
                        <SelectItem value="next">Next.js App Router with Server Components and Streaming</SelectItem>
                        <SelectItem value="react-query">TanStack React Query v5 with Suspense Integration</SelectItem>
                        <SelectItem value="prisma">Prisma ORM with PostgreSQL and Edge Runtime Support</SelectItem>
                        <SelectItem value="playwright">Playwright End-to-End Testing with Visual Regression</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField>
                    <Label>Grouped</Label>
                    <Select>
                      <SelectTrigger placeholder="Choose a fruit..." />
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Citrus</SelectLabel>
                          <SelectItem value="orange">Orange</SelectItem>
                          <SelectItem value="lemon">Lemon</SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                          <SelectLabel>Berries</SelectLabel>
                          <SelectItem value="strawberry">Strawberry</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField>
                    <Label>Error</Label>
                    <Select variant="error">
                      <SelectTrigger placeholder="Required field..." />
                      <SelectContent>
                        <SelectItem value="a">Option A</SelectItem>
                        <SelectItem value="b">Option B</SelectItem>
                        <SelectItem value="c" disabled>
                          Option C (disabled)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField className="md:col-span-2">
                    <Label>Multi-select</Label>
                    <Select multiple>
                      <SelectTrigger placeholder="Choose tags..." />
                      <SelectContent>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="tailwind">Tailwind CSS</SelectItem>
                        <SelectItem value="nodejs">Node.js</SelectItem>
                        <SelectItem value="graphql">GraphQL</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>
              </Section>

              {/* Separator */}
              <Section title="Separator">
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary">Content above</p>
                  <Separator />
                  <p className="text-sm text-text-secondary">Content below</p>
                </div>
                <div className="flex items-center gap-3 h-8">
                  <span className="text-sm text-text-secondary">Left</span>
                  <Separator orientation="vertical" />
                  <span className="text-sm text-text-secondary">Right</span>
                </div>
              </Section>

              {/* Sheet */}
              <Section title="Sheet">
                <Row>
                  <Button variant="secondary" onClick={() => setSheetOpen(true)}>
                    Open Sheet (Right)
                  </Button>
                  <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} side="right" size="md">
                    <h3 className="text-lg font-semibold mb-4">Sheet Title</h3>
                    <p className="text-sm text-text-secondary">
                      This is a sheet / drawer component. It slides in from the edge of the screen.
                    </p>
                    <div className="mt-6">
                      <Button onClick={() => setSheetOpen(false)}>Close</Button>
                    </div>
                  </Sheet>
                </Row>
              </Section>

              {/* Skeleton */}
              <Section title="Skeleton">
                <div className="flex items-center gap-4">
                  <Skeleton variant="circle" className="h-12 w-12" />
                  <div className="space-y-2 flex-1">
                    <Skeleton variant="text" className="w-3/4" />
                    <Skeleton variant="text" className="w-1/2" />
                  </div>
                </div>
                <Skeleton variant="default" className="h-32 w-full" />
              </Section>

              {/* Tabs */}
              <Section title="Tabs">
                <Row label="Default">
                  <Tabs defaultValue="tab1">
                    <TabsList>
                      <TabsTrigger value="tab1">Account</TabsTrigger>
                      <TabsTrigger value="tab2">Settings</TabsTrigger>
                      <TabsTrigger value="tab3">Billing</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">
                      <p className="text-sm text-text-secondary p-2">Account settings content.</p>
                    </TabsContent>
                    <TabsContent value="tab2">
                      <p className="text-sm text-text-secondary p-2">General settings content.</p>
                    </TabsContent>
                    <TabsContent value="tab3">
                      <p className="text-sm text-text-secondary p-2">Billing information.</p>
                    </TabsContent>
                  </Tabs>
                </Row>
                <Row label="Pills">
                  <Tabs defaultValue="a" variant="pills">
                    <TabsList>
                      <TabsTrigger value="a">All</TabsTrigger>
                      <TabsTrigger value="b">Active</TabsTrigger>
                      <TabsTrigger value="c">Archived</TabsTrigger>
                    </TabsList>
                    <TabsContent value="a">
                      <p className="text-sm text-text-secondary p-2">All items.</p>
                    </TabsContent>
                    <TabsContent value="b">
                      <p className="text-sm text-text-secondary p-2">Active items.</p>
                    </TabsContent>
                    <TabsContent value="c">
                      <p className="text-sm text-text-secondary p-2">Archived items.</p>
                    </TabsContent>
                  </Tabs>
                </Row>
                <Row label="Underline">
                  <Tabs defaultValue="x" variant="underline">
                    <TabsList>
                      <TabsTrigger value="x">Overview</TabsTrigger>
                      <TabsTrigger value="y">Analytics</TabsTrigger>
                      <TabsTrigger value="z">Reports</TabsTrigger>
                    </TabsList>
                    <TabsContent value="x">
                      <p className="text-sm text-text-secondary p-2">Overview dashboard.</p>
                    </TabsContent>
                    <TabsContent value="y">
                      <p className="text-sm text-text-secondary p-2">Analytics data.</p>
                    </TabsContent>
                    <TabsContent value="z">
                      <p className="text-sm text-text-secondary p-2">Generated reports.</p>
                    </TabsContent>
                  </Tabs>
                </Row>
              </Section>

              {/* Tag */}
              <Section title="Tag">
                <Row label="Variants">
                  <Tag>Default</Tag>
                  <Tag variant="accent">Accent</Tag>
                  <Tag variant="success">Success</Tag>
                  <Tag variant="warning">Warning</Tag>
                  <Tag variant="destructive">Destructive</Tag>
                </Row>
                <Row label="Dismissible">
                  <Tag onDismiss={() => {}}>Removable</Tag>
                  <Tag variant="accent" onDismiss={() => {}}>
                    Accent
                  </Tag>
                  <Tag variant="success" onDismiss={() => {}}>
                    Success
                  </Tag>
                  <Tag variant="destructive" onDismiss={() => {}}>
                    Error
                  </Tag>
                </Row>
                <Row label="Sizes">
                  <Tag size="sm" onDismiss={() => {}}>
                    Small
                  </Tag>
                  <Tag size="md" onDismiss={() => {}}>
                    Medium
                  </Tag>
                </Row>
                <Row label="Disabled">
                  <Tag disabled>Disabled</Tag>
                  <Tag disabled onDismiss={() => {}}>
                    Disabled dismiss
                  </Tag>
                </Row>
              </Section>

              {/* Toast */}
              <Section title="Toast">
                <ToastDemo />
                <div className="space-y-2">
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Position</p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      size="sm"
                      variant={toastPosition === "left" ? "default" : "outline"}
                      onClick={() => setToastPosition("left")}
                    >
                      Left
                    </Button>
                    <Button
                      size="sm"
                      variant={toastPosition === "center" ? "default" : "outline"}
                      onClick={() => setToastPosition("center")}
                    >
                      Center
                    </Button>
                    <Button
                      size="sm"
                      variant={toastPosition === "right" ? "default" : "outline"}
                      onClick={() => setToastPosition("right")}
                    >
                      Right
                    </Button>
                  </div>
                </div>
              </Section>

              {/* Toggle */}
              <Section title="Toggle">
                <Row>
                  <Toggle checked={toggleChecked} onCheckedChange={setToggleChecked} />
                  <Toggle checked={toggleChecked2} onCheckedChange={setToggleChecked2} />
                  <Toggle size="sm" checked={toggleChecked} onCheckedChange={setToggleChecked} />
                  <Toggle disabled checked={false} onCheckedChange={() => {}} />
                </Row>
              </Section>

              {/* Tooltip */}
              <Section title="Tooltip">
                <Row>
                  <Tooltip content="Top tooltip" side="top">
                    <Button variant="outline" size="sm">
                      Hover me (top)
                    </Button>
                  </Tooltip>
                  <Tooltip content="Bottom tooltip" side="bottom">
                    <Button variant="outline" size="sm">
                      Bottom
                    </Button>
                  </Tooltip>
                  <Tooltip content="Left tooltip" side="left">
                    <Button variant="outline" size="sm">
                      Left
                    </Button>
                  </Tooltip>
                  <Tooltip content="Right tooltip" side="right">
                    <Button variant="outline" size="sm">
                      Right
                    </Button>
                  </Tooltip>
                </Row>
              </Section>
            </SectionGroup>
          </main>

          {/* Footer */}
          <footer className="border-t border-border-subtle py-8 text-center text-xs text-text-muted">
            DesignYstem v0.1.0 — Soft UI Design System
          </footer>
        </div>
      </ToastProvider>
    </DesignYstemProvider>
  );
}

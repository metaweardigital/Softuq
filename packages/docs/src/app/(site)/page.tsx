"use client";

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
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Code,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
  FormDescription,
  FormField,
  FormMessage,
  Input,
  Kbd,
  Label,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Search,
  SearchContent,
  SearchGroup,
  SearchInput,
  SearchItem,
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
  Slider,
  Spinner,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Textarea,
  ToastProvider,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  useDesignYstem,
  useToast,
} from "@designystem/react";
import {
  AlertCircle,
  AlertTriangle,
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowRight,
  Bold,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  Inbox,
  Info,
  Italic,
  LogOut,
  MoreHorizontal,
  Plus,
  Search as SearchLucide,
  Settings,
  Terminal,
  Trash2,
  Underline,
  User,
} from "lucide-react";
import React from "react";

/* --------------------------------------------------------- */
/* Section wrapper                                           */
/* --------------------------------------------------------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h3 className="text-base font-semibold text-fg-primary">{title}</h3>
      <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-6 space-y-6">
        {children}
      </div>
    </section>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      {label && <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">{label}</p>}
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
        <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Variants</p>
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
        <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Title only</p>
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
        <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Long content (truncated)</p>
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
        <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Custom duration</p>
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

function ColorSwatch({ prefix, shade, label }: { prefix: string; shade: string; label?: string }) {
  const { addToast } = useToast();
  const cssVar = `${prefix}-${shade}`;
  return (
    <Tooltip
      content={label ? `var(${label}-${shade})` : `var(${cssVar})`}
      delay={100}
      wrapperClassName="flex-1 min-w-[48px]"
    >
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
          className="w-full h-8 rounded-[var(--ds-radius-checkbox)] border border-edge-subtle transition-shadow hover:shadow-lg"
          style={{ backgroundColor: `var(${cssVar})` }}
        />
        <span className="text-[9px] text-fg-muted">{shade}</span>
      </button>
    </Tooltip>
  );
}

function ActivePaletteLabel() {
  const { palette } = useDesignYstem();
  return <>{palette.charAt(0).toUpperCase() + palette.slice(1)}</>;
}

function GraySwatches({ shades }: { shades: string[] }) {
  const { palette } = useDesignYstem();
  return (
    <>
      {shades.map((shade) => (
        <ColorSwatch key={shade} prefix="--gray" shade={shade} label={`--${palette}`} />
      ))}
    </>
  );
}

/* --------------------------------------------------------- */
/* Main page                                                 */
/* --------------------------------------------------------- */
export default function ComponentPreview() {
  const [toggleChecked, setToggleChecked] = React.useState(false);
  const [toggleChecked2, setToggleChecked2] = React.useState(true);
  const [radioValue, setRadioValue] = React.useState("option1");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(45);
  const [toastPosition, setToastPosition] = React.useState<"left" | "center" | "right">("center");
  const [page, setPage] = React.useState(1);
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState<number>(40);
  const [rangeValue, setRangeValue] = React.useState<[number, number]>([25, 75]);
  const [alignValue, setAlignValue] = React.useState<string>("center");
  const [styleValues, setStyleValues] = React.useState<string[]>(["bold"]);

  return (
    <ToastProvider position={toastPosition}>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Colors */}
        <Section title="Colors">
          <div className="space-y-6">
            <p className="text-sm text-fg-secondary">All colors in OKLCH. Palette & accent change via sidebar.</p>
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
            ].map((group) => (
              <div key={group.name} className="space-y-1.5">
                <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">
                  {group.prefix === "--gray" ? <ActivePaletteLabel /> : group.name}
                </p>
                <div className="flex flex-wrap gap-1">
                  {group.prefix === "--gray" ? (
                    <GraySwatches shades={group.shades} />
                  ) : (
                    group.shades.map((shade) => <ColorSwatch key={shade} prefix={group.prefix} shade={shade} />)
                  )}
                </div>
              </div>
            ))}
            <Separator />
            <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Semantic</p>
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
                    className="h-6 w-6 rounded-[var(--ds-radius-checkbox)] border border-edge-subtle"
                    style={{ backgroundColor: `var(${token.var})` }}
                  />
                  <span className="text-xs text-fg-secondary">{token.label}</span>
                </div>
              ))}
            </div>
            <Separator />
            <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">
              Non-changing{" "}
              <span className="text-fg-dimmed font-normal normal-case">
                — fixed scales, no theme flip (100 = solid)
              </span>
            </p>
            {[
              { name: "dark", prefix: "--dark" },
              { name: "light", prefix: "--light" },
            ].map((scale) => (
              <div key={scale.name} className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-fg-muted w-10">{scale.name}</span>
                {[5, 10, 20, 40, 70, 90, 100].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div
                      className="h-6 w-6 rounded-[var(--ds-radius-checkbox)] border border-edge-subtle overflow-hidden"
                      style={{
                        backgroundImage: "repeating-conic-gradient(var(--border-default) 0% 25%, transparent 0% 50%)",
                        backgroundSize: "6px 6px",
                      }}
                    >
                      <div className="h-full w-full" style={{ backgroundColor: `var(${scale.prefix}-${step})` }} />
                    </div>
                    <span className="text-xs text-fg-secondary">{step}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>

        {/* Theming Overview */}
        <Section title="Theming">
          <div className="space-y-4">
            <p className="text-sm text-fg-secondary">
              5 theme axes controlled via sidebar. All values are CSS custom properties on <Code>:root</Code> — no
              re-renders.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-fg-muted uppercase tracking-wide">Palette</p>
                  <p className="text-sm font-medium mt-1">Gray tinting</p>
                  <p className="text-xs text-fg-secondary mt-0.5">6 options</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-fg-muted uppercase tracking-wide">Accent</p>
                  <p className="text-sm font-medium mt-1">Brand color</p>
                  <p className="text-xs text-fg-secondary mt-0.5">8 options</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-fg-muted uppercase tracking-wide">Radius</p>
                  <p className="text-sm font-medium mt-1">Border radius</p>
                  <p className="text-xs text-fg-secondary mt-0.5">5 options</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-fg-muted uppercase tracking-wide">Spacing</p>
                  <p className="text-sm font-medium mt-1">Density</p>
                  <p className="text-xs text-fg-secondary mt-0.5">3 options</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-fg-muted uppercase tracking-wide">Font</p>
                  <p className="text-sm font-medium mt-1">Typeface</p>
                  <p className="text-xs text-fg-secondary mt-0.5">3 options</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-fg-muted uppercase tracking-wide">Mode</p>
                  <p className="text-sm font-medium mt-1">Dark / Light</p>
                  <p className="text-xs text-fg-secondary mt-0.5">data-theme</p>
                </CardContent>
              </Card>
            </div>
            <div className="bg-surface-elevated border border-edge-subtle rounded-[var(--ds-radius-card)] p-4">
              <p className="text-xs font-mono text-fg-secondary">
                {'<DesignYstemProvider palette="zinc" accent="violet" radius="lg" spacing="md" font="geist">'}
              </p>
            </div>
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <div className="space-y-4">
            <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Font scale</p>
            <div className="space-y-2">
              <p className="text-4xl font-bold tracking-tight">Heading 4XL</p>
              <p className="text-3xl font-bold tracking-tight">Heading 3XL</p>
              <p className="text-2xl font-semibold tracking-tight">Heading 2XL</p>
              <p className="text-xl font-semibold">Heading XL</p>
              <p className="text-lg font-medium">Text Large</p>
              <p className="text-base">Text Base — The quick brown fox jumps over the lazy dog.</p>
              <p className="text-sm text-fg-secondary">Text Small — Secondary body text for descriptions and labels.</p>
              <p className="text-xs text-fg-muted">Text XS — Fine print, captions, and metadata.</p>
            </div>
            <Separator />
            <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Monospace</p>
            <div className="space-y-1">
              <p className="font-mono text-sm">const theme = useDesignYstem();</p>
              <p className="font-mono text-xs text-fg-secondary">
                {'<DesignYstemProvider font="geist" accent="violet">'}
              </p>
            </div>
          </div>
        </Section>

        {/* Accordion */}
        <Section title="Accordion">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Default</p>
              <Accordion variant="default">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is DesignYstem?</AccordionTrigger>
                  <AccordionContent>
                    A custom design system library with a <span className="text-accent">soft UI / neumorphic</span>{" "}
                    aesthetic. Built as a monorepo with tokens, a Tailwind preset, and copy-paste components you fully
                    own.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I install it?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Run <Code>npx designystem init</Code> to set up your project, then add individual components:
                    </p>
                    <p className="mt-2">
                      <Code>npx designystem add button card input</Code>
                    </p>
                    <p className="mt-2">
                      Components are copied directly into your project — no runtime dependency, full control over the
                      source.
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
                    Yes! The token system uses three layers: <span className="text-success-text">primitive</span> →{" "}
                    <span className="text-warning-text">semantic</span> → <span className="text-accent">component</span>
                    . All tokens are CSS custom properties you can override. Dark mode is default, switch to light with{" "}
                    <Code>data-theme=&quot;light&quot;</Code> on your root element.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Bordered</p>
              <Accordion variant="bordered" type="multiple">
                <AccordionItem value="b1">
                  <AccordionTrigger>Can I use it with Tailwind v4?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely. The design system is built for <span className="text-accent">Tailwind CSS v4</span> —
                    tokens are mapped via <Code>@theme</Code> in your CSS, no config file needed.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="b2">
                  <AccordionTrigger>What about accessibility?</AccordionTrigger>
                  <AccordionContent>
                    All interactive components include proper <span className="text-accent">ARIA attributes</span>,
                    keyboard navigation, and focus management. Buttons, dialogs, tabs, and accordions follow WAI-ARIA
                    patterns. Color contrast meets <span className="text-success-text">WCAG AA</span> standards in both
                    dark and light themes.
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
            <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Variants</p>
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

            <p className="text-xs font-medium text-fg-muted uppercase tracking-wide pt-4">Without icon</p>
            <Alert>
              <AlertTitle>No icon alert</AlertTitle>
              <AlertDescription>This alert has no icon, just title and description.</AlertDescription>
            </Alert>

            <p className="text-xs font-medium text-fg-muted uppercase tracking-wide pt-4">Title only</p>
            <Alert variant="info">
              <Info />
              <AlertTitle>Quick note — no description needed.</AlertTitle>
            </Alert>

            <p className="text-xs font-medium text-fg-muted uppercase tracking-wide pt-4">Long content</p>
            <Alert variant="warning">
              <AlertTriangle />
              <AlertTitle>Breaking changes in v2.0</AlertTitle>
              <AlertDescription className="line-clamp-2">
                Refer to the{" "}
                <a href="#" className="font-medium text-accent underline underline-offset-2">
                  migration guide
                </a>{" "}
                for detailed instructions. The API has been completely redesigned. All existing endpoints will be
                deprecated on March 31st. Please migrate your application to the new endpoints before the deadline.
              </AlertDescription>
            </Alert>

            <p className="text-xs font-medium text-fg-muted uppercase tracking-wide pt-4">Fit width (hug content)</p>
            <Alert variant="success" size="fit">
              <CheckCircle2 />
              <AlertTitle>Saved</AlertTitle>
            </Alert>
            <Alert variant="info" size="fit">
              <Info />
              <AlertTitle>3 items selected</AlertTitle>
              <AlertDescription>Click to manage selection.</AlertDescription>
            </Alert>

            <p className="text-xs font-medium text-fg-muted uppercase tracking-wide pt-4">Rich content</p>
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

        {/* Breadcrumb */}
        <Section title="Breadcrumb">
          <Row label="Default">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Row>
          <Row label="With ellipsis">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Account</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
            <Button size="icon-sm">
              <Plus />
            </Button>
            <Button size="icon">
              <Plus />
            </Button>
            <Button size="icon-lg">
              <Plus />
            </Button>
          </Row>
          <Row label="With icon">
            <Button>
              <Plus />
              Create
            </Button>
            <Button variant="secondary">
              <Download />
              Download
            </Button>
            <Button variant="destructive">
              <Trash2 />
              Delete
            </Button>
            <Button variant="outline">
              Next
              <ArrowRight />
            </Button>
          </Row>
          <Row label="Loading">
            <Button disabled>
              <Spinner size="sm" />
              Saving...
            </Button>
            <Button variant="secondary" disabled>
              <Spinner size="sm" />
              Loading
            </Button>
          </Row>
          <Row label="States">
            <Button disabled>Disabled</Button>
          </Row>
        </Section>

        {/* Code */}
        <Section title="Code">
          <Row label="Inline code">
            <p className="text-sm text-fg-secondary">
              Run <Code>npx designystem init</Code> to set up your project.
            </p>
          </Row>
          <Row label="In context">
            <p className="text-sm text-fg-secondary">
              Set <Code>data-theme=&quot;light&quot;</Code> on <Code>&lt;html&gt;</Code> to enable light mode. All
              tokens use <Code>oklch()</Code> color space.
            </p>
          </Row>
          <Row label="Command">
            <p className="text-sm text-fg-secondary">
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
                <p className="text-sm text-fg-secondary">Card content goes here.</p>
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
                <p className="text-sm text-fg-secondary">More prominent elevation.</p>
              </CardContent>
            </Card>
            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover to see floating effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-fg-secondary">Cursor pointer, hover elevation.</p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Checkbox */}
        <Section title="Checkbox">
          <Row>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <Checkbox defaultChecked />
              <span className="text-xs text-fg-secondary">Checked</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <Checkbox />
              <span className="text-xs text-fg-secondary">Unchecked</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <Checkbox size="sm" defaultChecked />
              <span className="text-xs text-fg-secondary">Small</span>
            </label>
            <label className="flex items-center gap-2 cursor-not-allowed select-none">
              <Checkbox disabled />
              <span className="text-xs text-fg-secondary">Disabled</span>
            </label>
            <label className="flex items-center gap-2 cursor-not-allowed select-none">
              <Checkbox defaultChecked disabled />
              <span className="text-xs text-fg-secondary">Locked</span>
            </label>
          </Row>
        </Section>

        {/* Radio */}
        <Section title="Radio">
          <Row>
            <RadioGroup value={radioValue} onValueChange={setRadioValue} orientation="horizontal">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <RadioGroupItem value="option1" />
                <span className="text-xs text-fg-secondary">Option 1</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <RadioGroupItem value="option2" />
                <span className="text-xs text-fg-secondary">Option 2</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <RadioGroupItem value="option3" />
                <span className="text-xs text-fg-secondary">Option 3</span>
              </label>
            </RadioGroup>
            <label className="flex items-center gap-2 cursor-not-allowed select-none">
              <RadioGroupItem value="disabled" disabled />
              <span className="text-xs text-fg-secondary">Disabled</span>
            </label>
            <RadioGroup value="locked">
              <label className="flex items-center gap-2 cursor-not-allowed select-none">
                <RadioGroupItem value="locked" disabled />
                <span className="text-xs text-fg-secondary">Locked</span>
              </label>
            </RadioGroup>
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

        {/* Dropdown Menu */}
        <Section title="Dropdown Menu">
          <Row>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Open menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User />
                  Profile
                  <Kbd size="sm" className="ml-auto">
                    ⇧⌘P
                  </Kbd>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                  <Kbd size="sm" className="ml-auto">
                    ⌘B
                  </Kbd>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  Settings
                  <Kbd size="sm" className="ml-auto">
                    ⌘,
                  </Kbd>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="More">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>Archive</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">View</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
                  Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
                  Activity Bar
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Row>
        </Section>

        {/* Empty */}
        <Section title="Empty">
          <Empty>
            <EmptyIcon>
              <Inbox />
            </EmptyIcon>
            <EmptyContent>
              <EmptyTitle>No messages</EmptyTitle>
              <EmptyDescription>You're all caught up. New messages will appear here.</EmptyDescription>
            </EmptyContent>
            <EmptyActions>
              <Button size="sm" variant="secondary">
                Refresh
              </Button>
              <Button size="sm">
                <Plus />
                New message
              </Button>
            </EmptyActions>
          </Empty>
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

        {/* Kbd */}
        <Section title="Kbd">
          <Row label="Sizes">
            <Kbd size="sm">⌘</Kbd>
            <Kbd size="md">⌘</Kbd>
            <Kbd size="lg">⌘</Kbd>
          </Row>
          <Row label="Combos">
            <span className="inline-flex items-center gap-1">
              <Kbd>⌘</Kbd>
              <span className="text-fg-muted text-xs">+</span>
              <Kbd>K</Kbd>
            </span>
            <span className="inline-flex items-center gap-1">
              <Kbd>Ctrl</Kbd>
              <span className="text-fg-muted text-xs">+</span>
              <Kbd>Shift</Kbd>
              <span className="text-fg-muted text-xs">+</span>
              <Kbd>P</Kbd>
            </span>
            <span className="inline-flex items-center gap-1">
              <Kbd size="sm">Esc</Kbd>
              <span className="text-fg-muted text-xs">to close</span>
            </span>
          </Row>
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

        {/* Pagination */}
        <Section title="Pagination">
          <Row label="Sizes">
            <Pagination page={page} pageCount={10} onPageChange={setPage} size="sm" />
            <Pagination page={page} pageCount={10} onPageChange={setPage} size="md" />
            <Pagination page={page} pageCount={10} onPageChange={setPage} size="lg" />
          </Row>
          <Row label="Few pages">
            <Pagination page={page > 3 ? 3 : page} pageCount={3} onPageChange={setPage} />
          </Row>
        </Section>

        {/* Popover */}
        <Section title="Popover">
          <Row>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">Open popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-fg-primary">Dimensions</h4>
                    <p className="text-xs text-fg-muted">Set the dimensions for the layer.</p>
                  </div>
                  <div className="space-y-2">
                    <FormField size="sm">
                      <Label>Width</Label>
                      <Input defaultValue="100%" />
                    </FormField>
                    <FormField size="sm">
                      <Label>Height</Label>
                      <Input defaultValue="25px" />
                    </FormField>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Info">
                  <Info />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <p className="text-sm text-fg-secondary">
                  Popovers are richer than tooltips — they can contain forms, buttons, or any interactive content.
                </p>
              </PopoverContent>
            </Popover>
          </Row>
        </Section>

        {/* Progress */}
        <Section title="Progress">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-fg-muted">
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

        {/* Search */}
        <Section title="Search">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Standalone</p>
              <SearchInput placeholder="Search..." />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Loading</p>
              <SearchInput placeholder="Searching..." loading />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Small</p>
              <SearchInput placeholder="Search..." inputSize="sm" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Shortcut</p>
              <SearchInput placeholder="Search docs..." shortcut={["⌘", "K"]} />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">With tags</p>
              <SearchInput placeholder="Search in tag..." tags={[{ label: "Design", onDismiss: () => {} }]} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">With whisper</p>
              <Search>
                <SearchInput placeholder="Search anything..." />
                <SearchContent>
                  <SearchGroup heading="Recent">
                    <SearchItem icon={<Clock className="h-4 w-4" />} onSelect={() => {}}>
                      tiktok
                    </SearchItem>
                    <SearchItem icon={<Clock className="h-4 w-4" />} onSelect={() => {}}>
                      bonsai
                    </SearchItem>
                  </SearchGroup>
                  <SearchGroup heading="Suggestions">
                    <SearchItem icon={<SearchLucide className="h-4 w-4" />} onSelect={() => {}}>
                      indian food
                    </SearchItem>
                    <SearchItem icon={<SearchLucide className="h-4 w-4" />} onSelect={() => {}}>
                      toktok 2025
                    </SearchItem>
                  </SearchGroup>
                </SearchContent>
              </Search>
            </div>
          </div>
        </Section>

        {/* Separator */}
        <Section title="Separator">
          <div className="space-y-2">
            <p className="text-sm text-fg-secondary">Content above</p>
            <Separator />
            <p className="text-sm text-fg-secondary">Content below</p>
          </div>
          <div className="flex items-center gap-3 h-8">
            <span className="text-sm text-fg-secondary">Left</span>
            <Separator orientation="vertical" />
            <span className="text-sm text-fg-secondary">Right</span>
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
              <p className="text-sm text-fg-secondary">
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

        {/* Slider */}
        <Section title="Slider">
          <Row label="Single">
            <div className="flex-1 max-w-md flex items-center gap-4">
              <Slider value={sliderValue} onValueChange={(v) => setSliderValue(v as number)} />
              <span className="w-8 text-xs text-fg-muted tabular-nums">{sliderValue}</span>
            </div>
          </Row>
          <Row label="Range">
            <div className="flex-1 max-w-md flex items-center gap-4">
              <Slider value={rangeValue} onValueChange={(v) => setRangeValue(v as [number, number])} />
              <span className="w-14 text-xs text-fg-muted tabular-nums whitespace-nowrap">
                {String(rangeValue[0]).padStart(2, "0")}–{String(rangeValue[1]).padStart(2, "0")}
              </span>
            </div>
          </Row>
          <Row label="Sizes">
            <div className="flex-1 max-w-md space-y-4">
              <Slider defaultValue={30} size="sm" />
              <Slider defaultValue={50} size="md" />
              <Slider defaultValue={70} size="lg" />
            </div>
          </Row>
          <Row label="Disabled">
            <div className="flex-1 max-w-md">
              <Slider defaultValue={40} disabled />
            </div>
          </Row>
        </Section>

        {/* Spinner */}
        <Section title="Spinner">
          <Row label="Sizes">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </Row>
          <Row label="With color">
            <Spinner className="text-accent" />
            <Spinner className="text-fg-muted" />
            <Spinner className="text-destructive" />
            <Spinner className="text-success" />
          </Row>
          <Row label="In context">
            <Button disabled>
              <Spinner size="sm" /> Loading
            </Button>
            <span className="inline-flex items-center gap-2 text-sm text-fg-secondary">
              <Spinner size="sm" /> Fetching data...
            </span>
          </Row>
        </Section>

        {/* Table */}
        <Section title="Table">
          <Table>
            <TableCaption>A list of recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>
                  <Badge variant="success">Paid</Badge>
                </TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right tabular-nums">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV002</TableCell>
                <TableCell>
                  <Badge variant="warning">Pending</Badge>
                </TableCell>
                <TableCell>PayPal</TableCell>
                <TableCell className="text-right tabular-nums">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV003</TableCell>
                <TableCell>
                  <Badge variant="destructive">Unpaid</Badge>
                </TableCell>
                <TableCell>Bank Transfer</TableCell>
                <TableCell className="text-right tabular-nums">$350.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV004</TableCell>
                <TableCell>
                  <Badge variant="success">Paid</Badge>
                </TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right tabular-nums">$450.00</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right tabular-nums">$1,200.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
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
                <p className="text-sm text-fg-secondary p-2">Account settings content.</p>
              </TabsContent>
              <TabsContent value="tab2">
                <p className="text-sm text-fg-secondary p-2">General settings content.</p>
              </TabsContent>
              <TabsContent value="tab3">
                <p className="text-sm text-fg-secondary p-2">Billing information.</p>
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
                <p className="text-sm text-fg-secondary p-2">All items.</p>
              </TabsContent>
              <TabsContent value="b">
                <p className="text-sm text-fg-secondary p-2">Active items.</p>
              </TabsContent>
              <TabsContent value="c">
                <p className="text-sm text-fg-secondary p-2">Archived items.</p>
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
                <p className="text-sm text-fg-secondary p-2">Overview dashboard.</p>
              </TabsContent>
              <TabsContent value="y">
                <p className="text-sm text-fg-secondary p-2">Analytics data.</p>
              </TabsContent>
              <TabsContent value="z">
                <p className="text-sm text-fg-secondary p-2">Generated reports.</p>
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
            <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Position</p>
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
          <Row label="With label">
            <Toggle label="Airplane mode" checked={toggleChecked} onCheckedChange={setToggleChecked} />
            <Toggle
              label="Notifications"
              description="Receive push alerts on this device."
              checked={toggleChecked2}
              onCheckedChange={setToggleChecked2}
            />
            <Toggle size="sm" label="Compact" checked={toggleChecked} onCheckedChange={setToggleChecked} />
            <Toggle
              label="Label on left"
              labelPosition="left"
              checked={toggleChecked2}
              onCheckedChange={setToggleChecked2}
            />
          </Row>
        </Section>

        {/* Toggle Group */}
        <Section title="Toggle Group">
          <Row label="Single (alignment)">
            <ToggleGroup type="single" value={alignValue} onValueChange={(v) => setAlignValue(v)}>
              <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeft />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenter />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRight />
              </ToggleGroupItem>
            </ToggleGroup>
          </Row>
          <Row label="Multiple (text style)">
            <ToggleGroup type="multiple" value={styleValues} onValueChange={(v) => setStyleValues(v)}>
              <ToggleGroupItem value="bold" aria-label="Bold">
                <Bold />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <Italic />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <Underline />
              </ToggleGroupItem>
            </ToggleGroup>
          </Row>
          <Row label="Outline variant">
            <ToggleGroup type="single" variant="outline" defaultValue="day">
              <ToggleGroupItem value="day">Day</ToggleGroupItem>
              <ToggleGroupItem value="week">Week</ToggleGroupItem>
              <ToggleGroupItem value="month">Month</ToggleGroupItem>
              <ToggleGroupItem value="year">Year</ToggleGroupItem>
            </ToggleGroup>
          </Row>
          <Row label="Sizes">
            <ToggleGroup type="single" variant="outline" size="sm" defaultValue="a">
              <ToggleGroupItem value="a">Sm</ToggleGroupItem>
              <ToggleGroupItem value="b">Sm</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" variant="outline" size="md" defaultValue="a">
              <ToggleGroupItem value="a">Md</ToggleGroupItem>
              <ToggleGroupItem value="b">Md</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" variant="outline" size="lg" defaultValue="a">
              <ToggleGroupItem value="a">Lg</ToggleGroupItem>
              <ToggleGroupItem value="b">Lg</ToggleGroupItem>
            </ToggleGroup>
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
      </div>

      <footer className="border-t border-edge-subtle py-8 text-center text-xs text-fg-muted">
        DesignYstem v0.1.0 — Soft UI Design System
      </footer>
    </ToastProvider>
  );
}

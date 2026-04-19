"use client";

import {
  type AccentPreset,
  Badge,
  Button,
  type FontPreset,
  FormField,
  type HeadingFontPreset,
  Label,
  type PalettePreset,
  Popover,
  PopoverContent,
  PopoverTrigger,
  type RadiusPreset,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Separator,
  type SpacingPreset,
  useSoftuq,
} from "@softuq/react";
import {
  BarChart3,
  Blocks,
  Component,
  Fingerprint,
  LayoutGrid,
  LayoutList,
  ListFilter,
  Moon,
  Palette,
  PanelBottom,
  PanelLeft,
  Settings2,
  Shapes,
  Space,
  Sparkles,
  Sun,
  Table2,
  Type,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarMega, { type MegaMenuGroup, type NavMegaItem } from "@/blocks/web/header/navbar-mega";
import { useTheme } from "./providers";

/* ===  Theme Controls  === */

const RADIUS_OPTIONS: RadiusPreset[] = ["none", "sm", "md", "lg", "full"];
const SPACING_OPTIONS: SpacingPreset[] = ["sm", "md", "lg"];
const PALETTE_OPTIONS: PalettePreset[] = ["neutral", "zinc", "stone", "slate", "mauve", "olive"];
const ACCENT_OPTIONS: AccentPreset[] = ["blue", "violet", "emerald", "amber", "red", "rose", "cyan", "orange"];
const FONT_OPTIONS: FontPreset[] = ["system", "inter", "geist"];
const HEADING_FONT_OPTIONS: HeadingFontPreset[] = ["sans", "lora", "playfair", "fraunces"];

function ThemeSelect<T extends string>({
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

function ThemeSettingsPopover() {
  const {
    radius,
    setRadius,
    spacing,
    setSpacing,
    palette,
    setPalette,
    accent,
    setAccent,
    font,
    setFont,
    headingFont,
    setHeadingFont,
  } = useSoftuq();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Theme settings">
          <Settings2 className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-[var(--ds-space-card)] space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-fg-primary">Theme</h3>
          <p className="text-xs text-fg-muted mt-0.5">Tune tokens in real time.</p>
        </div>
        <Separator />
        <ThemeSelect label="Font" options={FONT_OPTIONS} value={font} onChange={setFont} />
        <ThemeSelect label="Heading" options={HEADING_FONT_OPTIONS} value={headingFont} onChange={setHeadingFont} />
        <ThemeSelect label="Accent" options={ACCENT_OPTIONS} value={accent} onChange={setAccent} />
        <ThemeSelect label="Palette" options={PALETTE_OPTIONS} value={palette} onChange={setPalette} />
        <ThemeSelect label="Radius" options={RADIUS_OPTIONS} value={radius} onChange={setRadius} />
        <ThemeSelect label="Spacing" options={SPACING_OPTIONS} value={spacing} onChange={setSpacing} />
      </PopoverContent>
    </Popover>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      {isLight ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}

/* ===  Menu Structure  === */

const LIBRARY_COMPONENTS: MegaMenuGroup = {
  label: "Components",
  description: "37 primitives",
  viewAllHref: "/components",
  viewAllLabel: "View all components →",
  items: [
    {
      icon: Component,
      title: "Button",
      description: "Primary actions, CTAs, and icon triggers",
      href: "/components#button",
    },
    {
      icon: Fingerprint,
      title: "Dialog",
      description: "Modal overlays, confirms, and alerts",
      href: "/components#dialog",
    },
    {
      icon: ListFilter,
      title: "Select",
      description: "Single & multi-select dropdown menus",
      href: "/components#select",
    },
    { icon: Table2, title: "Table", description: "Data grids with sorting and pagination", href: "/components#table" },
    { icon: LayoutList, title: "Tabs", description: "Tabbed content panels and navigation", href: "/components#tabs" },
  ],
};

const LIBRARY_BLOCKS: MegaMenuGroup = {
  label: "Blocks",
  description: "40+ sections",
  viewAllHref: "/blocks",
  viewAllLabel: "View all blocks →",
  items: [
    {
      icon: Sparkles,
      title: "Hero",
      description: "Headlines, CTAs, and background patterns",
      href: "/blocks/web#hero",
    },
    { icon: Blocks, title: "Pricing", description: "Tiers, toggles, and plan comparison", href: "/blocks/web#pricing" },
    { icon: PanelBottom, title: "Footer", description: "Multi-column and minimal layouts", href: "/blocks/web#footer" },
    {
      icon: PanelLeft,
      title: "Sidebar",
      description: "App navigation with collapsible search",
      href: "/blocks/app#sidebar",
    },
    {
      icon: BarChart3,
      title: "Dashboard",
      description: "Stats, charts, and activity feeds",
      href: "/blocks/app#dashboard",
    },
  ],
};

const LIBRARY_TEMPLATES: MegaMenuGroup = {
  label: "Templates",
  description: "Full pages",
  viewAllHref: "/templates",
  viewAllLabel: "View all templates →",
  items: [
    {
      icon: LayoutGrid,
      title: "Landing",
      description: "Marketing page with hero and CTA",
      href: "/templates/web#landing",
    },
    {
      icon: BarChart3,
      title: "Dashboard",
      description: "App overview with stats and charts",
      href: "/templates/app#dashboard",
    },
  ],
};

const FOUNDATIONS_GROUP: MegaMenuGroup = {
  label: "Design Tokens",
  viewAllHref: "/foundations",
  viewAllLabel: "All foundations →",
  items: [
    { icon: Palette, title: "Colors", description: "Color tokens", href: "/foundations/colors" },
    { icon: Type, title: "Typography", description: "Fluid type scale", href: "/foundations/typography" },
    { icon: Space, title: "Spacing", description: "Grid & stack tokens", href: "/foundations/spacing" },
    { icon: LayoutGrid, title: "Layout", description: "Responsive patterns", href: "/foundations/layout" },
    { icon: Sparkles, title: "Effects", description: "Shadows & motion", href: "/foundations/effects" },
    { icon: Shapes, title: "Icons", description: "UI & brand packs", href: "/foundations/icons" },
  ],
};

const NAV_ITEMS: NavMegaItem[] = [
  { type: "link", label: "Getting Started", href: "/getting-started", matchPrefix: "/getting-started" },
  {
    type: "dropdown",
    label: "Library",
    groups: [LIBRARY_COMPONENTS, LIBRARY_BLOCKS, LIBRARY_TEMPLATES],
    matchPrefix: "/components",
  },
  { type: "dropdown", label: "Foundations", groups: [FOUNDATIONS_GROUP], matchPrefix: "/foundations" },
  { type: "link", label: "Skill", href: "/skill", matchPrefix: "/skill" },
];

/* ===  Navbar  === */

function SoftuqBrand() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 font-sans text-base font-semibold tracking-[0.1em] text-fg-primary"
    >
      <span>
        softuq<span className="text-xs font-normal text-fg-muted tracking-normal">.com</span>
      </span>
      <Badge variant="secondary" size="sm" className="font-normal tracking-normal">
        Beta
      </Badge>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  return (
    <NavbarMega
      logo={<SoftuqBrand />}
      items={NAV_ITEMS}
      linkComponent={Link}
      currentPath={pathname}
      actions={
        <>
          <ThemeSettingsPopover />
          <ThemeToggle />
        </>
      }
    />
  );
}

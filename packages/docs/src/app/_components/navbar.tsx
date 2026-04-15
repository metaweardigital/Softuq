"use client";

import {
  type AccentPreset,
  Button,
  type FontPreset,
  FormField,
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
import { Moon, Settings2, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarSimple, { type NavLinkItem } from "@/blocks/web/header/navbar-simple";
import { useTheme } from "./providers";

const RADIUS_OPTIONS: RadiusPreset[] = ["none", "sm", "md", "lg", "full"];
const SPACING_OPTIONS: SpacingPreset[] = ["sm", "md", "lg"];
const PALETTE_OPTIONS: PalettePreset[] = ["neutral", "zinc", "stone", "slate", "mauve", "olive"];
const ACCENT_OPTIONS: AccentPreset[] = ["blue", "violet", "emerald", "amber", "red", "rose", "cyan", "orange"];
const FONT_OPTIONS: FontPreset[] = ["system", "inter", "geist"];

const NAV_LINKS: NavLinkItem[] = [
  { href: "/getting-started", label: "Getting Started", matchPrefix: "/getting-started" },
  { href: "/components", label: "Components", matchPrefix: "/components" },
  { href: "/foundations", label: "Foundations", matchPrefix: "/foundations" },
  { href: "/blocks", label: "Blocks", matchPrefix: "/blocks" },
  { href: "/templates", label: "Templates", matchPrefix: "/templates" },
  { href: "/skill", label: "Skill", matchPrefix: "/skill" },
];

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
  const { radius, setRadius, spacing, setSpacing, palette, setPalette, accent, setAccent, font, setFont } = useSoftuq();
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

function SoftuqBrand() {
  return (
    <Link href="/" className="font-sans text-base font-medium tracking-[0.2em] text-fg-primary">
      softuq
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  return (
    <NavbarSimple
      logo={<SoftuqBrand />}
      links={NAV_LINKS}
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

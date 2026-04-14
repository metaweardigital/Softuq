"use client";

import {
  type AccentPreset,
  Button,
  buttonVariants,
  cn,
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
  useDesignYstem,
} from "@designystem/react";
import { Moon, Settings2, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./providers";

const RADIUS_OPTIONS: RadiusPreset[] = ["none", "sm", "md", "lg", "full"];
const SPACING_OPTIONS: SpacingPreset[] = ["sm", "md", "lg"];
const PALETTE_OPTIONS: PalettePreset[] = ["neutral", "zinc", "stone", "slate", "mauve", "olive"];
const ACCENT_OPTIONS: AccentPreset[] = ["blue", "violet", "emerald", "amber", "red", "rose", "cyan", "orange"];
const FONT_OPTIONS: FontPreset[] = ["system", "inter", "geist"];

type NavLink = { href: string; label: string; matchPrefix?: string };

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Components" },
  { href: "/getting-started", label: "Getting Started", matchPrefix: "/getting-started" },
  { href: "/blocks", label: "Blocks", matchPrefix: "/blocks" },
  { href: "/templates", label: "Templates", matchPrefix: "/templates" },
];

function isActive(pathname: string, link: NavLink): boolean {
  if (link.matchPrefix) return pathname === link.matchPrefix || pathname.startsWith(`${link.matchPrefix}/`);
  return pathname === link.href;
}

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
  const { radius, setRadius, spacing, setSpacing, palette, setPalette, accent, setAccent, font, setFont } =
    useDesignYstem();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Theme settings">
          <Settings2 className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-4 space-y-3">
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

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-sticky border-b border-edge-subtle bg-surface-base/80 backdrop-blur-glass">
      <div className="max-w-6xl mx-auto h-14 px-6 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0 font-sans">
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-fg-primary">DesignYstem</div>
            <div className="text-[10px] text-fg-muted">Component Preview</div>
          </div>
        </Link>

        <nav className="flex-1 flex items-center justify-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "font-sans",
                  active &&
                    "text-accent-text hover:text-accent-text bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] hover:bg-[color-mix(in_oklch,var(--accent)_18%,transparent)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <ThemeSettingsPopover />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

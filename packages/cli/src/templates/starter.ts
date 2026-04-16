/**
 * Starter landing page — rendered into src/app/page.tsx (Next) or src/App.tsx (Vite).
 * Preview that exercises all 6 Softuq theme axes so a fresh install shows real output.
 */
interface StarterOpts {
  useClient: boolean;
  exportName: string;
}

export function renderStarter({ useClient, exportName }: StarterOpts): string {
  const clientDirective = useClient ? '"use client";\n\n' : "";
  return `${clientDirective}import { useEffect, useState } from "react";
import { ArrowRight, Moon, Sparkles, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-text";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  type AccentPreset,
  type FontPreset,
  type HeadingFontPreset,
  type PalettePreset,
  type RadiusPreset,
  type SpacingPreset,
  useSoftuq,
} from "@/softuq-provider";

const PALETTE_OPTIONS: PalettePreset[] = ["neutral", "zinc", "stone", "slate", "mauve", "olive"];
const ACCENT_OPTIONS: AccentPreset[] = ["blue", "violet", "emerald", "amber", "red", "rose", "cyan", "orange"];
const RADIUS_OPTIONS: RadiusPreset[] = ["none", "sm", "md", "lg", "full"];
const SPACING_OPTIONS: SpacingPreset[] = ["sm", "md", "lg"];
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

function useDarkLightToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return {
    theme,
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

export default function ${exportName}() {
  const {
    palette,
    setPalette,
    accent,
    setAccent,
    radius,
    setRadius,
    spacing,
    setSpacing,
    font,
    setFont,
    headingFont,
    setHeadingFont,
  } = useSoftuq();
  const { theme, toggleTheme } = useDarkLightToggle();
  const isLight = theme === "light";

  return (
    <div className="min-h-screen bg-surface-base text-fg-primary">
      <header className="flex items-center justify-between px-[var(--ds-space-page-x)] py-4 border-b border-edge-subtle">
        <div className="text-base font-semibold tracking-[0.1em]">
          softuq
          <span className="text-xs font-normal text-fg-muted tracking-normal">.starter</span>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={toggleTheme} aria-label="Toggle theme">
          {isLight ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </header>

      <main className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)] max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-edge-subtle text-xs text-fg-muted">
            <Sparkles className="size-3" /> Softuq is installed
          </div>
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-balance max-w-[16ch] mx-auto">
            Your design system, ready to go.
          </h1>
          <p className="text-base sm:text-lg text-fg-muted max-w-xl mx-auto text-balance">
            Tune the tokens below — palette, accent, radius, spacing, fonts. Everything updates in real time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button size="lg" asChild>
              <a href="https://softuq.com" target="_blank" rel="noreferrer">
                Documentation <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://softuq.com/components" target="_blank" rel="noreferrer">
                View components
              </a>
            </Button>
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Theme playground</CardTitle>
            <CardDescription>Six axes, all live.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ThemeSelect label="Font" options={FONT_OPTIONS} value={font} onChange={setFont} />
            <ThemeSelect label="Heading" options={HEADING_FONT_OPTIONS} value={headingFont} onChange={setHeadingFont} />
            <ThemeSelect label="Accent" options={ACCENT_OPTIONS} value={accent} onChange={setAccent} />
            <ThemeSelect label="Palette" options={PALETTE_OPTIONS} value={palette} onChange={setPalette} />
            <ThemeSelect label="Radius" options={RADIUS_OPTIONS} value={radius} onChange={setRadius} />
            <ThemeSelect label="Spacing" options={SPACING_OPTIONS} value={spacing} onChange={setSpacing} />
          </CardContent>
        </Card>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-balance">Components</h2>
          <p className="text-sm text-fg-muted">Buttons react to accent, radius, and spacing.</p>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
`;
}

/**
 * Components required by the starter template.
 * Kept in sync with imports above — used by init to auto-install.
 */
export const STARTER_COMPONENTS = [
  "button",
  "card",
  "form-text",
  "label",
  "select",
  "separator",
];

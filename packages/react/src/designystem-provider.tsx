"use client";
import { colors, fontFamily, radius, spacing } from "@designystem/tokens";
import * as React from "react";

/* ============================================
   Types
   ============================================ */
type PalettePreset = "neutral" | "zinc" | "stone" | "slate" | "mauve" | "olive";
type AccentPreset = "blue" | "violet" | "emerald" | "amber" | "red" | "rose" | "cyan" | "orange";
type RadiusPreset = "none" | "sm" | "md" | "lg" | "full";
type SpacingPreset = "sm" | "md" | "lg";
type FontPreset = "system" | "inter" | "geist";

/* ============================================
   Palette presets — gray scale tinting
   ============================================ */
function paletteFrom(scale: Record<string | number, string>) {
  return Object.fromEntries(Object.entries(scale).map(([shade, value]) => [`--gray-${shade}`, value]));
}

const PALETTE_PRESETS: Record<PalettePreset, Record<string, string>> = {
  neutral: paletteFrom(colors.gray),
  zinc: paletteFrom(colors.zinc),
  stone: paletteFrom(colors.stone),
  slate: paletteFrom(colors.slate),
  mauve: paletteFrom(colors.mauve),
  olive: paletteFrom(colors.olive),
};

/* ============================================
   Accent presets — brand color
   ============================================ */
function accentFrom(palette: keyof typeof colors) {
  const p = colors[palette];
  return {
    "--accent": p[500],
    "--accent-hover": p[400],
    "--accent-muted": p[600],
    "--accent-text": p[400],
  };
}

const ACCENT_PRESETS: Record<AccentPreset, Record<string, string>> = {
  blue: accentFrom("blue"),
  violet: accentFrom("violet"),
  emerald: accentFrom("emerald"),
  amber: accentFrom("amber"),
  red: accentFrom("red"),
  rose: accentFrom("rose"),
  cyan: accentFrom("cyan"),
  orange: accentFrom("orange"),
};

/* ============================================
   Radius presets — border radius per component
   ============================================ */
const RADIUS_PRESETS: Record<RadiusPreset, Record<string, string>> = {
  none: {
    "--ds-radius-button": "0px",
    "--ds-radius-input": "0px",
    "--ds-radius-textarea": "0px",
    "--ds-radius-card": "0px",
    "--ds-radius-checkbox": "0px",
    "--ds-radius-tooltip": "0px",
    "--ds-radius-avatar": "0px",
  },
  sm: {
    "--ds-radius-button": radius.sm,
    "--ds-radius-input": radius.sm,
    "--ds-radius-textarea": radius.sm,
    "--ds-radius-card": radius.sm,
    "--ds-radius-checkbox": radius.xs,
    "--ds-radius-tooltip": radius.xs,
    "--ds-radius-avatar": radius.sm,
  },
  md: {
    "--ds-radius-button": radius.md,
    "--ds-radius-input": radius.md,
    "--ds-radius-textarea": radius.md,
    "--ds-radius-card": radius.md,
    "--ds-radius-checkbox": radius.sm,
    "--ds-radius-tooltip": radius.sm,
    "--ds-radius-avatar": radius.lg,
  },
  lg: {
    "--ds-radius-button": radius.lg,
    "--ds-radius-input": radius.lg,
    "--ds-radius-textarea": radius.lg,
    "--ds-radius-card": radius.lg,
    "--ds-radius-checkbox": radius.sm,
    "--ds-radius-tooltip": radius.md,
    "--ds-radius-avatar": radius.full,
  },
  full: {
    "--ds-radius-button": radius.full,
    "--ds-radius-input": radius.full,
    "--ds-radius-textarea": radius["2xl"],
    "--ds-radius-card": radius["2xl"],
    "--ds-radius-checkbox": radius.sm,
    "--ds-radius-tooltip": radius.lg,
    "--ds-radius-avatar": radius.full,
  },
};

/* ============================================
   Spacing presets — padding & gaps
   ============================================ */
const SPACING_PRESETS: Record<SpacingPreset, Record<string, string>> = {
  sm: {
    "--ds-space-card": spacing[4],
    "--ds-space-card-sm": spacing[3],
    "--ds-space-input-x": spacing[3],
    "--ds-space-input-y": spacing[2],
    "--ds-space-button-sm": spacing[2],
    "--ds-space-button-md": spacing[3],
    "--ds-space-button-lg": spacing[4],
  },
  md: {
    "--ds-space-card": spacing[6],
    "--ds-space-card-sm": spacing[4],
    "--ds-space-input-x": spacing[4],
    "--ds-space-input-y": spacing[3],
    "--ds-space-button-sm": spacing[3],
    "--ds-space-button-md": spacing[4],
    "--ds-space-button-lg": spacing[6],
  },
  lg: {
    "--ds-space-card": spacing[8],
    "--ds-space-card-sm": spacing[5],
    "--ds-space-input-x": spacing[5],
    "--ds-space-input-y": spacing[4],
    "--ds-space-button-sm": spacing[4],
    "--ds-space-button-md": spacing[5],
    "--ds-space-button-lg": spacing[8],
  },
};

/* ============================================
   Font presets — typeface
   ============================================ */
const FONT_PRESETS: Record<FontPreset, Record<string, string>> = {
  system: {
    "--font-sans": fontFamily.sans,
    "--font-mono": fontFamily.mono,
  },
  inter: {
    "--font-sans": "var(--font-inter), 'Inter', ui-sans-serif, system-ui, sans-serif",
    "--font-mono": fontFamily.mono,
  },
  geist: {
    "--font-sans": "var(--font-geist-sans), 'Geist', ui-sans-serif, system-ui, sans-serif",
    "--font-mono": "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace",
  },
};

/* ============================================
   Context & Hook
   ============================================ */
interface DesignYstemContextValue {
  palette: PalettePreset;
  setPalette: (p: PalettePreset) => void;
  accent: AccentPreset;
  setAccent: (a: AccentPreset) => void;
  radius: RadiusPreset;
  setRadius: (r: RadiusPreset) => void;
  spacing: SpacingPreset;
  setSpacing: (s: SpacingPreset) => void;
  font: FontPreset;
  setFont: (f: FontPreset) => void;
}

const DesignYstemContext = React.createContext<DesignYstemContextValue>({
  palette: "neutral",
  setPalette: () => {},
  accent: "blue",
  setAccent: () => {},
  radius: "lg",
  setRadius: () => {},
  spacing: "md",
  setSpacing: () => {},
  font: "system",
  setFont: () => {},
});

function useDesignYstem() {
  return React.useContext(DesignYstemContext);
}

/* ============================================
   Provider
   ============================================ */
interface DesignYstemProviderProps {
  palette?: PalettePreset;
  accent?: AccentPreset;
  radius?: RadiusPreset;
  spacing?: SpacingPreset;
  font?: FontPreset;
  children: React.ReactNode;
}

function DesignYstemProvider({
  palette: initialPalette = "neutral",
  accent: initialAccent = "blue",
  radius: initialRadius = "lg",
  spacing: initialSpacing = "md",
  font: initialFont = "system",
  children,
}: DesignYstemProviderProps) {
  const [palette, setPalette] = React.useState<PalettePreset>(initialPalette);
  const [accent, setAccent] = React.useState<AccentPreset>(initialAccent);
  const [radius, setRadius] = React.useState<RadiusPreset>(initialRadius);
  const [spacing, setSpacing] = React.useState<SpacingPreset>(initialSpacing);
  const [font, setFont] = React.useState<FontPreset>(initialFont);

  React.useEffect(() => {
    const root = document.documentElement;
    const vars = {
      ...PALETTE_PRESETS[palette],
      ...ACCENT_PRESETS[accent],
      ...RADIUS_PRESETS[radius],
      ...SPACING_PRESETS[spacing],
      ...FONT_PRESETS[font],
    };
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
  }, [palette, accent, radius, spacing, font]);

  const value = React.useMemo(
    () => ({ palette, setPalette, accent, setAccent, radius, setRadius, spacing, setSpacing, font, setFont }),
    [palette, accent, radius, spacing, font],
  );

  return <DesignYstemContext.Provider value={value}>{children}</DesignYstemContext.Provider>;
}

/* ============================================
   Exports
   ============================================ */
export type { AccentPreset, DesignYstemProviderProps, FontPreset, PalettePreset, RadiusPreset, SpacingPreset };
export {
  ACCENT_PRESETS,
  DesignYstemProvider,
  FONT_PRESETS,
  PALETTE_PRESETS,
  RADIUS_PRESETS,
  SPACING_PRESETS,
  useDesignYstem,
};

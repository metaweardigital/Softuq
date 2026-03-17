"use client";
import { colors } from "@designystem/tokens";
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
const PALETTE_PRESETS: Record<PalettePreset, Record<string, string>> = {
  neutral: Object.fromEntries(Object.entries(colors.gray).map(([shade, value]) => [`--gray-${shade}`, value])),
  zinc: {
    "--gray-50": "oklch(0.985 0.002 240)",
    "--gray-100": "oklch(0.967 0.003 264.54)",
    "--gray-150": "oklch(0.946 0.004 264.54)",
    "--gray-200": "oklch(0.92 0.004 264.54)",
    "--gray-250": "oklch(0.871 0.006 264.54)",
    "--gray-300": "oklch(0.81 0.007 264.54)",
    "--gray-400": "oklch(0.705 0.012 264.54)",
    "--gray-500": "oklch(0.609 0.014 264.54)",
    "--gray-600": "oklch(0.552 0.016 264.54)",
    "--gray-700": "oklch(0.442 0.017 264.54)",
    "--gray-750": "oklch(0.395 0.017 264.54)",
    "--gray-800": "oklch(0.316 0.015 264.54)",
    "--gray-850": "oklch(0.258 0.012 264.54)",
    "--gray-900": "oklch(0.21 0.012 264.54)",
    "--gray-920": "oklch(0.18 0.01 264.54)",
    "--gray-940": "oklch(0.16 0.009 264.54)",
    "--gray-960": "oklch(0.13 0.007 264.54)",
    "--gray-980": "oklch(0.12 0.006 264.54)",
  },
  stone: {
    "--gray-50": "oklch(0.985 0.002 75)",
    "--gray-100": "oklch(0.97 0.003 75)",
    "--gray-150": "oklch(0.946 0.004 75)",
    "--gray-200": "oklch(0.923 0.005 75)",
    "--gray-250": "oklch(0.869 0.007 75)",
    "--gray-300": "oklch(0.813 0.008 75)",
    "--gray-400": "oklch(0.709 0.01 56)",
    "--gray-500": "oklch(0.617 0.013 56)",
    "--gray-600": "oklch(0.553 0.013 58)",
    "--gray-700": "oklch(0.444 0.011 73)",
    "--gray-750": "oklch(0.4 0.01 73)",
    "--gray-800": "oklch(0.322 0.009 75)",
    "--gray-850": "oklch(0.266 0.008 75)",
    "--gray-900": "oklch(0.216 0.006 56)",
    "--gray-920": "oklch(0.186 0.005 56)",
    "--gray-940": "oklch(0.166 0.004 56)",
    "--gray-960": "oklch(0.136 0.003 56)",
    "--gray-980": "oklch(0.126 0.003 56)",
  },
  slate: {
    "--gray-50": "oklch(0.984 0.003 247.86)",
    "--gray-100": "oklch(0.968 0.007 247.86)",
    "--gray-150": "oklch(0.946 0.01 247.86)",
    "--gray-200": "oklch(0.929 0.013 255.51)",
    "--gray-250": "oklch(0.869 0.022 252.89)",
    "--gray-300": "oklch(0.809 0.026 256.85)",
    "--gray-400": "oklch(0.704 0.032 261.26)",
    "--gray-500": "oklch(0.606 0.036 264.05)",
    "--gray-600": "oklch(0.554 0.033 264.36)",
    "--gray-700": "oklch(0.446 0.03 256.8)",
    "--gray-750": "oklch(0.398 0.026 256.8)",
    "--gray-800": "oklch(0.324 0.022 264.18)",
    "--gray-850": "oklch(0.262 0.018 264.18)",
    "--gray-900": "oklch(0.208 0.042 265.75)",
    "--gray-920": "oklch(0.178 0.036 265.75)",
    "--gray-940": "oklch(0.158 0.03 265.75)",
    "--gray-960": "oklch(0.128 0.024 265.75)",
    "--gray-980": "oklch(0.118 0.022 265.75)",
  },
  mauve: {
    "--gray-50": "oklch(0.985 0.004 310)",
    "--gray-100": "oklch(0.968 0.007 310)",
    "--gray-150": "oklch(0.946 0.009 310)",
    "--gray-200": "oklch(0.923 0.011 310)",
    "--gray-250": "oklch(0.869 0.014 310)",
    "--gray-300": "oklch(0.813 0.016 310)",
    "--gray-400": "oklch(0.706 0.019 310)",
    "--gray-500": "oklch(0.611 0.02 310)",
    "--gray-600": "oklch(0.553 0.02 310)",
    "--gray-700": "oklch(0.444 0.018 310)",
    "--gray-750": "oklch(0.4 0.016 310)",
    "--gray-800": "oklch(0.322 0.013 310)",
    "--gray-850": "oklch(0.266 0.011 310)",
    "--gray-900": "oklch(0.216 0.009 310)",
    "--gray-920": "oklch(0.186 0.008 310)",
    "--gray-940": "oklch(0.166 0.007 310)",
    "--gray-960": "oklch(0.136 0.005 310)",
    "--gray-980": "oklch(0.126 0.005 310)",
  },
  olive: {
    "--gray-50": "oklch(0.985 0.004 128)",
    "--gray-100": "oklch(0.968 0.007 128)",
    "--gray-150": "oklch(0.946 0.009 128)",
    "--gray-200": "oklch(0.923 0.011 128)",
    "--gray-250": "oklch(0.869 0.014 128)",
    "--gray-300": "oklch(0.813 0.016 128)",
    "--gray-400": "oklch(0.706 0.019 128)",
    "--gray-500": "oklch(0.611 0.02 128)",
    "--gray-600": "oklch(0.553 0.02 128)",
    "--gray-700": "oklch(0.444 0.018 128)",
    "--gray-750": "oklch(0.4 0.016 128)",
    "--gray-800": "oklch(0.322 0.013 128)",
    "--gray-850": "oklch(0.266 0.011 128)",
    "--gray-900": "oklch(0.216 0.009 128)",
    "--gray-920": "oklch(0.186 0.008 128)",
    "--gray-940": "oklch(0.166 0.007 128)",
    "--gray-960": "oklch(0.136 0.005 128)",
    "--gray-980": "oklch(0.126 0.005 128)",
  },
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
    "--ds-radius-button": "8px",
    "--ds-radius-input": "8px",
    "--ds-radius-textarea": "8px",
    "--ds-radius-card": "8px",
    "--ds-radius-checkbox": "4px",
    "--ds-radius-tooltip": "4px",
    "--ds-radius-avatar": "8px",
  },
  md: {
    "--ds-radius-button": "12px",
    "--ds-radius-input": "12px",
    "--ds-radius-textarea": "12px",
    "--ds-radius-card": "12px",
    "--ds-radius-checkbox": "8px",
    "--ds-radius-tooltip": "8px",
    "--ds-radius-avatar": "16px",
  },
  lg: {
    "--ds-radius-button": "16px",
    "--ds-radius-input": "16px",
    "--ds-radius-textarea": "16px",
    "--ds-radius-card": "16px",
    "--ds-radius-checkbox": "8px",
    "--ds-radius-tooltip": "12px",
    "--ds-radius-avatar": "9999px",
  },
  full: {
    "--ds-radius-button": "9999px",
    "--ds-radius-input": "9999px",
    "--ds-radius-textarea": "24px",
    "--ds-radius-card": "24px",
    "--ds-radius-checkbox": "8px",
    "--ds-radius-tooltip": "16px",
    "--ds-radius-avatar": "9999px",
  },
};

/* ============================================
   Spacing presets — padding & gaps
   ============================================ */
const SPACING_PRESETS: Record<SpacingPreset, Record<string, string>> = {
  sm: {
    "--ds-space-card": "16px",
    "--ds-space-card-sm": "12px",
    "--ds-space-input-x": "10px",
    "--ds-space-input-y": "8px",
    "--ds-space-button-sm": "8px",
    "--ds-space-button-md": "12px",
    "--ds-space-button-lg": "16px",
  },
  md: {
    "--ds-space-card": "24px",
    "--ds-space-card-sm": "16px",
    "--ds-space-input-x": "16px",
    "--ds-space-input-y": "12px",
    "--ds-space-button-sm": "12px",
    "--ds-space-button-md": "16px",
    "--ds-space-button-lg": "24px",
  },
  lg: {
    "--ds-space-card": "32px",
    "--ds-space-card-sm": "20px",
    "--ds-space-input-x": "20px",
    "--ds-space-input-y": "16px",
    "--ds-space-button-sm": "16px",
    "--ds-space-button-md": "20px",
    "--ds-space-button-lg": "32px",
  },
};

/* ============================================
   Font presets — typeface
   ============================================ */
const FONT_PRESETS: Record<FontPreset, Record<string, string>> = {
  system: {
    "--font-sans": "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif",
    "--font-mono": "'SF Mono', ui-monospace, SFMono-Regular, 'Cascadia Code', monospace",
  },
  inter: {
    "--font-sans": "var(--font-inter), 'Inter', ui-sans-serif, system-ui, sans-serif",
    "--font-mono": "'SF Mono', ui-monospace, SFMono-Regular, 'Cascadia Code', monospace",
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

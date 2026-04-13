import { colors, fontFamily, radius, spacing } from "@designystem/tokens";

/* ============================================
   Types
   ============================================ */
export type PalettePreset = "neutral" | "zinc" | "stone" | "slate" | "mauve" | "olive";
export type AccentPreset = "blue" | "violet" | "emerald" | "amber" | "red" | "rose" | "cyan" | "orange";
export type RadiusPreset = "none" | "sm" | "md" | "lg" | "full";
export type SpacingPreset = "sm" | "md" | "lg";
export type FontPreset = "system" | "inter" | "geist";

/* ============================================
   Palette presets — gray scale tinting
   ============================================ */
function paletteFrom(scale: Record<string | number, string>) {
  return Object.fromEntries(Object.entries(scale).map(([shade, value]) => [`--gray-${shade}`, value]));
}

export const PALETTE_PRESETS: Record<PalettePreset, Record<string, string>> = {
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

export const ACCENT_PRESETS: Record<AccentPreset, Record<string, string>> = {
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
export const RADIUS_PRESETS: Record<RadiusPreset, Record<string, string>> = {
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
export const SPACING_PRESETS: Record<SpacingPreset, Record<string, string>> = {
  sm: {
    "--ds-space-card": spacing[4],
    "--ds-space-card-sm": spacing[3],
    "--ds-space-input-x": spacing[3],
    "--ds-space-input-y": spacing[2],
    "--ds-space-button-sm": spacing[2],
    "--ds-space-button-md": spacing[3],
    "--ds-space-button-lg": spacing[4],
    "--ds-space-section-x": spacing[6],
    "--ds-space-section-y": spacing[16],
    "--ds-space-stack": spacing[4],
    "--ds-space-gap": spacing[3],
  },
  md: {
    "--ds-space-card": spacing[6],
    "--ds-space-card-sm": spacing[4],
    "--ds-space-input-x": spacing[4],
    "--ds-space-input-y": spacing[3],
    "--ds-space-button-sm": spacing[3],
    "--ds-space-button-md": spacing[4],
    "--ds-space-button-lg": spacing[6],
    "--ds-space-section-x": spacing[8],
    "--ds-space-section-y": "96px",
    "--ds-space-stack": spacing[6],
    "--ds-space-gap": spacing[4],
  },
  lg: {
    "--ds-space-card": spacing[8],
    "--ds-space-card-sm": spacing[5],
    "--ds-space-input-x": spacing[5],
    "--ds-space-input-y": spacing[4],
    "--ds-space-button-sm": spacing[4],
    "--ds-space-button-md": spacing[5],
    "--ds-space-button-lg": spacing[8],
    "--ds-space-section-x": spacing[12],
    "--ds-space-section-y": "128px",
    "--ds-space-stack": spacing[8],
    "--ds-space-gap": spacing[6],
  },
};

/* ============================================
   Font presets — typeface
   ============================================ */
export const FONT_PRESETS: Record<FontPreset, Record<string, string>> = {
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

export const VALID_PALETTES: PalettePreset[] = ["neutral", "zinc", "stone", "slate", "mauve", "olive"];
export const VALID_ACCENTS: AccentPreset[] = ["blue", "violet", "emerald", "amber", "red", "rose", "cyan", "orange"];
export const VALID_RADII: RadiusPreset[] = ["none", "sm", "md", "lg", "full"];
export const VALID_SPACINGS: SpacingPreset[] = ["sm", "md", "lg"];
export const VALID_FONTS: FontPreset[] = ["system", "inter", "geist"];

"use client";
import * as React from "react";
import {
  ACCENT_PRESETS,
  type AccentPreset,
  FONT_PRESETS,
  type FontPreset,
  PALETTE_PRESETS,
  type PalettePreset,
  RADIUS_PRESETS,
  type RadiusPreset,
  SPACING_PRESETS,
  type SpacingPreset,
  VALID_ACCENTS,
  VALID_FONTS,
  VALID_PALETTES,
  VALID_RADII,
  VALID_SPACINGS,
} from "./presets";

/* ============================================
   Context & Hook
   ============================================ */
interface SoftuqContextValue {
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

const SoftuqContext = React.createContext<SoftuqContextValue>({
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

function useSoftuq() {
  return React.useContext(SoftuqContext);
}

/* ============================================
   Provider
   ============================================ */
interface SoftuqProviderProps {
  palette?: PalettePreset;
  accent?: AccentPreset;
  radius?: RadiusPreset;
  spacing?: SpacingPreset;
  font?: FontPreset;
  storageKey?: string;
  children: React.ReactNode;
}

type StoredSettings = {
  palette?: PalettePreset;
  accent?: AccentPreset;
  radius?: RadiusPreset;
  spacing?: SpacingPreset;
  font?: FontPreset;
};

function readStored(storageKey?: string): StoredSettings {
  if (!storageKey || typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredSettings;
    const out: StoredSettings = {};
    if (parsed.palette && VALID_PALETTES.includes(parsed.palette)) out.palette = parsed.palette;
    if (parsed.accent && VALID_ACCENTS.includes(parsed.accent)) out.accent = parsed.accent;
    if (parsed.radius && VALID_RADII.includes(parsed.radius)) out.radius = parsed.radius;
    if (parsed.spacing && VALID_SPACINGS.includes(parsed.spacing)) out.spacing = parsed.spacing;
    if (parsed.font && VALID_FONTS.includes(parsed.font)) out.font = parsed.font;
    return out;
  } catch {
    return {};
  }
}

function SoftuqProvider({
  palette: initialPalette = "neutral",
  accent: initialAccent = "blue",
  radius: initialRadius = "lg",
  spacing: initialSpacing = "md",
  font: initialFont = "system",
  storageKey,
  children,
}: SoftuqProviderProps) {
  // Init with defaults so SSR and client first render match exactly (no hydration mismatch).
  // Stored values are read in useEffect below; CSS vars are already applied
  // by the pre-hydration script, so there's no visual flash during this catch-up.
  const [palette, setPalette] = React.useState<PalettePreset>(initialPalette);
  const [accent, setAccent] = React.useState<AccentPreset>(initialAccent);
  const [radius, setRadius] = React.useState<RadiusPreset>(initialRadius);
  const [spacing, setSpacing] = React.useState<SpacingPreset>(initialSpacing);
  const [font, setFont] = React.useState<FontPreset>(initialFont);
  // useState (not useRef) so the Write effect only fires AFTER the Read effect's
  // state updates have committed. A synchronous ref flip would let Write run in
  // the same effect pass with stale (default) state, overwriting localStorage
  // with defaults — which cross-iframe storage events then propagate.
  const [hydrated, setHydrated] = React.useState(false);

  // One-shot: read localStorage after mount and sync state.
  // Pre-hydration script already applied the matching CSS vars, so no flash.
  React.useEffect(() => {
    const stored = readStored(storageKey);
    if (stored.palette) setPalette(stored.palette);
    if (stored.accent) setAccent(stored.accent);
    if (stored.radius) setRadius(stored.radius);
    if (stored.spacing) setSpacing(stored.spacing);
    if (stored.font) setFont(stored.font);
    setHydrated(true);
  }, [storageKey]);

  // Tracks whether the pending state update was triggered by a cross-window
  // storage event. If so, don't persist it back to localStorage — we'd just
  // be writing the value that another window already wrote, and in rare
  // browser timings this can produce feedback flicker.
  const fromStorageRef = React.useRef(false);

  // Write CSS vars on state change. Skip first mount — the pre-hydration script
  // already wrote the correct (stored) values; running this with defaults would
  // briefly overwrite them and cause a visible flash.
  React.useEffect(() => {
    if (!hydrated) return;
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
    if (storageKey && !fromStorageRef.current) {
      try {
        const next = JSON.stringify({ palette, accent, radius, spacing, font });
        if (window.localStorage.getItem(storageKey) !== next) {
          window.localStorage.setItem(storageKey, next);
        }
      } catch {
        // ignore quota / unavailable storage
      }
    }
    fromStorageRef.current = false;
  }, [hydrated, storageKey, palette, accent, radius, spacing, font]);

  // Sync across windows (iframe previews <-> parent navbar)
  React.useEffect(() => {
    if (!storageKey) return;
    const onStorage = (e: StorageEvent) => {
      if (e.key !== storageKey || !e.newValue) return;
      try {
        const s = JSON.parse(e.newValue) as StoredSettings;
        fromStorageRef.current = true;
        if (s.palette && VALID_PALETTES.includes(s.palette)) setPalette(s.palette);
        if (s.accent && VALID_ACCENTS.includes(s.accent)) setAccent(s.accent);
        if (s.radius && VALID_RADII.includes(s.radius)) setRadius(s.radius);
        if (s.spacing && VALID_SPACINGS.includes(s.spacing)) setSpacing(s.spacing);
        if (s.font && VALID_FONTS.includes(s.font)) setFont(s.font);
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey]);

  const value = React.useMemo(
    () => ({ palette, setPalette, accent, setAccent, radius, setRadius, spacing, setSpacing, font, setFont }),
    [palette, accent, radius, spacing, font],
  );

  return <SoftuqContext.Provider value={value}>{children}</SoftuqContext.Provider>;
}

/* ============================================
   Exports
   ============================================ */
export type { AccentPreset, FontPreset, PalettePreset, RadiusPreset, SoftuqProviderProps, SpacingPreset };
export { ACCENT_PRESETS, FONT_PRESETS, PALETTE_PRESETS, RADIUS_PRESETS, SoftuqProvider, SPACING_PRESETS, useSoftuq };

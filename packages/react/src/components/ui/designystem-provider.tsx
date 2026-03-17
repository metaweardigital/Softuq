"use client";
import * as React from "react";

type RadiusPreset = "none" | "sm" | "md" | "lg" | "full";
type SpacingPreset = "compact" | "default" | "spacious";

/* ---- Radius preset maps ---- */
const RADIUS_PRESETS: Record<RadiusPreset, Record<string, string>> = {
  none: {
    "--ds-radius-button": "0px",
    "--ds-radius-input": "0px",
    "--ds-radius-card": "0px",
    "--ds-radius-checkbox": "0px",
    "--ds-radius-tooltip": "0px",
    "--ds-radius-avatar": "0px",
  },
  sm: {
    "--ds-radius-button": "8px",
    "--ds-radius-input": "8px",
    "--ds-radius-card": "8px",
    "--ds-radius-checkbox": "4px",
    "--ds-radius-tooltip": "4px",
    "--ds-radius-avatar": "8px",
  },
  md: {
    "--ds-radius-button": "12px",
    "--ds-radius-input": "12px",
    "--ds-radius-card": "12px",
    "--ds-radius-checkbox": "8px",
    "--ds-radius-tooltip": "8px",
    "--ds-radius-avatar": "16px",
  },
  lg: {
    "--ds-radius-button": "16px",
    "--ds-radius-input": "16px",
    "--ds-radius-card": "16px",
    "--ds-radius-checkbox": "8px",
    "--ds-radius-tooltip": "12px",
    "--ds-radius-avatar": "9999px",
  },
  full: {
    "--ds-radius-button": "9999px",
    "--ds-radius-input": "9999px",
    "--ds-radius-card": "24px",
    "--ds-radius-checkbox": "8px",
    "--ds-radius-tooltip": "16px",
    "--ds-radius-avatar": "9999px",
  },
};

/* ---- Spacing preset maps ---- */
const SPACING_PRESETS: Record<SpacingPreset, Record<string, string>> = {
  compact: {
    "--ds-spacing-card": "16px",
    "--ds-spacing-card-sm": "12px",
    "--ds-spacing-input-x": "10px",
    "--ds-spacing-input-y": "8px",
    "--ds-spacing-button-sm": "8px",
    "--ds-spacing-button-md": "12px",
    "--ds-spacing-button-lg": "16px",
  },
  default: {
    "--ds-spacing-card": "24px",
    "--ds-spacing-card-sm": "16px",
    "--ds-spacing-input-x": "16px",
    "--ds-spacing-input-y": "12px",
    "--ds-spacing-button-sm": "12px",
    "--ds-spacing-button-md": "16px",
    "--ds-spacing-button-lg": "24px",
  },
  spacious: {
    "--ds-spacing-card": "32px",
    "--ds-spacing-card-sm": "20px",
    "--ds-spacing-input-x": "20px",
    "--ds-spacing-input-y": "16px",
    "--ds-spacing-button-sm": "16px",
    "--ds-spacing-button-md": "20px",
    "--ds-spacing-button-lg": "32px",
  },
};

/* ---- Context ---- */
interface DesignYstemContextValue {
  radius: RadiusPreset;
  setRadius: (r: RadiusPreset) => void;
  spacing: SpacingPreset;
  setSpacing: (s: SpacingPreset) => void;
}

const DesignYstemContext = React.createContext<DesignYstemContextValue>({
  radius: "lg",
  setRadius: () => {},
  spacing: "default",
  setSpacing: () => {},
});

function useDesignYstem() {
  return React.useContext(DesignYstemContext);
}

/* ---- Provider ---- */
interface DesignYstemProviderProps {
  radius?: RadiusPreset;
  spacing?: SpacingPreset;
  children: React.ReactNode;
}

function DesignYstemProvider({
  radius: initialRadius = "lg",
  spacing: initialSpacing = "default",
  children,
}: DesignYstemProviderProps) {
  const [radius, setRadius] = React.useState<RadiusPreset>(initialRadius);
  const [spacing, setSpacing] = React.useState<SpacingPreset>(initialSpacing);

  React.useEffect(() => {
    const root = document.documentElement;
    const vars = { ...RADIUS_PRESETS[radius], ...SPACING_PRESETS[spacing] };
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
  }, [radius, spacing]);

  const value = React.useMemo(() => ({ radius, setRadius, spacing, setSpacing }), [radius, spacing]);

  return <DesignYstemContext.Provider value={value}>{children}</DesignYstemContext.Provider>;
}

export type { DesignYstemProviderProps, RadiusPreset, SpacingPreset };
export { DesignYstemProvider, RADIUS_PRESETS, SPACING_PRESETS, useDesignYstem };

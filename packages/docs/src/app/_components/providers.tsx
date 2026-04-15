"use client";

import { DesignYstemProvider } from "@designystem/react";
import * as React from "react";
import { SETTINGS_STORAGE_KEY, THEME_STORAGE_KEY } from "./storage-keys";

type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function useTheme() {
  return React.useContext(ThemeContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Init with default so SSR and client first render match exactly.
  // Pre-hydration script already applied the correct data-theme attribute,
  // so there's no visual flash while React catches up via the effect below.
  const [theme, setThemeState] = React.useState<Theme>("dark");
  // useState (not useRef) so the Write effect only fires AFTER the Read effect's
  // state updates have committed. A synchronous ref flip would let Write run in
  // the same effect pass with stale (default) state, overwriting localStorage.
  const [hydrated, setHydrated] = React.useState(false);

  // One-shot: read localStorage after mount and sync state.
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark" || stored === "light") setThemeState(stored);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Don't persist updates that arrived via a cross-window storage event —
  // another window already wrote that value, and echoing it can cause flicker.
  const fromStorageRef = React.useRef(false);

  // Apply attribute + persist on state change. Skip first mount — the pre-hydration
  // script already set the correct attribute; overriding it here with the default
  // would briefly flash the wrong theme.
  React.useEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute("data-theme", theme);
    if (!fromStorageRef.current) {
      try {
        if (window.localStorage.getItem(THEME_STORAGE_KEY) !== theme) {
          window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        }
      } catch {
        // ignore
      }
    }
    fromStorageRef.current = false;
  }, [hydrated, theme]);

  // Sync across windows (iframe previews <-> parent navbar)
  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_STORAGE_KEY || !e.newValue) return;
      if (e.newValue === "dark" || e.newValue === "light") {
        fromStorageRef.current = true;
        setThemeState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: setThemeState,
      toggleTheme: () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <DesignYstemProvider storageKey={SETTINGS_STORAGE_KEY}>{children}</DesignYstemProvider>
    </ThemeContext.Provider>
  );
}

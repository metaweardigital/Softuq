import type { Config } from "tailwindcss";

const softuqPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        // Semantic colors from CSS variables
        bg: {
          base: "var(--bg-base)",
          elevated: "var(--bg-elevated)",
          card: "var(--bg-card)",
          input: "var(--bg-input)",
          hover: "var(--bg-hover)",
          selected: "var(--bg-selected)",
          overlay: "var(--bg-overlay)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          dimmed: "var(--text-dimmed)",
          inverse: "var(--text-inverse)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          muted: "var(--accent-muted)",
          text: "var(--accent-text)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          hover: "var(--destructive-hover)",
          muted: "var(--destructive-muted)",
          text: "var(--destructive-text)",
        },
        success: {
          DEFAULT: "var(--success)",
          hover: "var(--success-hover)",
          muted: "var(--success-muted)",
          text: "var(--success-text)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          hover: "var(--warning-hover)",
          muted: "var(--warning-muted)",
          text: "var(--warning-text)",
        },
        border: {
          subtle: "var(--border-subtle)",
          DEFAULT: "var(--border-default)",
          strong: "var(--border-strong)",
          accent: "var(--border-accent)",
        },
        ring: {
          DEFAULT: "var(--ring-color)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        inset: "var(--shadow-inset)",
      },
      transitionTimingFunction: {
        soft: "var(--ease-soft)",
        bounce: "var(--ease-bounce)",
        smooth: "var(--ease-smooth)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
      },
      zIndex: {
        dropdown: "50",
        sticky: "100",
        overlay: "200",
        modal: "300",
        popover: "400",
        toast: "500",
      },
      backdropBlur: {
        glass: "var(--glass-blur)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.3s var(--ease-smooth)",
        "fade-down": "fade-down 0.3s var(--ease-smooth)",
        "scale-in": "scale-in 0.2s var(--ease-smooth)",
        "slide-in-right": "slide-in-right 0.3s var(--ease-smooth)",
        "slide-in-left": "slide-in-left 0.3s var(--ease-smooth)",
        "slide-in-up": "slide-in-up 0.3s var(--ease-smooth)",
        "slide-in-down": "slide-in-down 0.3s var(--ease-smooth)",
        shimmer: "shimmer 1.5s infinite linear",
        pulse: "pulse 2s infinite var(--ease-soft)",
      },
    },
  },
};

export default softuqPreset;

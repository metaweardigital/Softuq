# Tailwind v4 Integration

Tailwind v4 uses CSS-based configuration instead of `tailwind.config.js`.

## Setup

```css
@import "tailwindcss";

/* Scan component source files for utility classes */
@source "../../../../packages/react/src/**/*.tsx";

/* Import design tokens (CSS variables) */
@import "@designystem/tokens/css";

/* Map tokens to Tailwind utilities */
@theme {
  --color-bg-base: var(--bg-base);
  --color-accent: var(--accent);
  --shadow-neu-raised: var(--shadow-neu-raised);
  --animate-fade-up: fade-up 0.3s var(--ease-smooth);
  /* ... */
}
```

## Key differences from v3

- No `tailwind.config.js` — use `@theme` block in CSS
- `@source` directives required for scanning workspace packages
- Color utilities map from `--color-*` (e.g. `--color-bg-base` → `bg-bg-base`)
- Shadow utilities map from `--shadow-*`
- Animation utilities map from `--animate-*`
- Duration: `--transition-duration-*`
- Easing: `--transition-timing-function-*`

## Full theme reference

See `packages/docs/src/app/globals.css` for the complete `@theme` block.

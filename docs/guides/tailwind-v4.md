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

## Custom utility classes

Defined in `globals.css` alongside the `@theme` block:

### Scrollbar utilities
- `.scrollbar-thin` — 4px styled scrollbar (track transparent, thumb gray)
- `.scrollbar-hidden` — hides scrollbar completely

### Fade-edge utilities
Theme-transitioning gradient masks for overflow fade effects. Use with a `background-color` that matches the container's background — the mask creates the fade, and `background-color` transitions smoothly on theme change (unlike `background-image` gradients).

- `.fade-edge-r` — fade right edge (2rem wide)
- `.fade-edge-l` — fade left edge (2rem wide)
- `.fade-edge-t` — fade top edge (2rem tall)
- `.fade-edge-b` — fade bottom edge (2rem tall)

All include `pointer-events: none`, `position: absolute`, and theme transition.

```tsx
<span className="relative overflow-hidden">
  {content}
  <span className="fade-edge-r" style={{ backgroundColor: "var(--bg-input)" }} />
</span>
```

## Full theme reference

See `packages/docs/src/app/globals.css` for the complete `@theme` block.

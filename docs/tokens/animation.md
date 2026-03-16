# Animation

## Easing

| Token | Curve | Use |
|---|---|---|
| `--ease-soft` | cubic-bezier(0.4, 0, 0.2, 1) | Default for most transitions |
| `--ease-bounce` | cubic-bezier(0.34, 1.56, 0.64, 1) | Toggles, checkboxes, playful elements |
| `--ease-smooth` | cubic-bezier(0.16, 1, 0.3, 1) | Modals, sheets, fade animations |

## Duration

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 150ms | Hover, focus, micro interactions |
| `--duration-normal` | 250ms | Color, border, opacity changes |
| `--duration-slow` | 400ms | Layout, transform, slide animations |

## Keyframes

| Animation | Description | Timing |
|---|---|---|
| `fade-up` | Opacity 0→1, Y 8→0 | 300ms ease-smooth |
| `fade-down` | Opacity 0→1, Y -8→0 | 300ms ease-smooth |
| `scale-in` | Opacity 0→1, scale 0.95→1 | 200ms ease-smooth |
| `slide-in-right` | X 100%→0 | 300ms ease-smooth |
| `slide-in-left` | X -100%→0 | 300ms ease-smooth |
| `slide-in-up` | Y 100%→0 | 300ms ease-smooth |
| `slide-in-down` | Y -100%→0 | 300ms ease-smooth |
| `shimmer` | Gradient sweep for skeleton loading | 1.5s infinite linear |
| `pulse` | Opacity 1→0.5→1 | 2s infinite ease-soft |

## Z-index

| Token | Value | Use |
|---|---|---|
| dropdown | 50 | Dropdowns, selects |
| sticky | 100 | Sticky headers, navs |
| overlay | 200 | Backdrops |
| modal | 300 | Dialogs, sheets |
| popover | 400 | Tooltips, context menus |
| toast | 500 | Toast notifications (always on top) |

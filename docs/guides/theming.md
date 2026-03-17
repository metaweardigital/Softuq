# Theming

Runtime theming via `DesignYstemProvider`. Five axes: palette, accent, radius, spacing, font. All values applied as CSS custom properties on `:root`.

## DesignYstemProvider

```tsx
import { DesignYstemProvider } from "@designystem/react";

<DesignYstemProvider
  palette="zinc"
  accent="violet"
  radius="lg"
  spacing="md"
  font="geist"
>
  <App />
</DesignYstemProvider>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `palette` | `PalettePreset` | `"neutral"` | Gray scale tinting |
| `accent` | `AccentPreset` | `"blue"` | Brand / accent color |
| `radius` | `RadiusPreset` | `"lg"` | Border radius per component |
| `spacing` | `SpacingPreset` | `"md"` | Padding & gaps per component |
| `font` | `FontPreset` | `"system"` | Typeface (sans + mono) |
| `children` | `ReactNode` | required | App content |

### Hook

```tsx
const { palette, setPalette, accent, setAccent, radius, setRadius, spacing, setSpacing, font, setFont } = useDesignYstem();
```

## Palette presets

Overrides the `--gray-*` scale with a tinted variant. Each preset defines all 18 gray shades (50–980) in OKLCH.

| Preset | Hue | Description |
|---|---|---|
| `neutral` | 0 (achromatic) | Pure gray, no tint |
| `zinc` | ~264 | Cool blue-gray |
| `stone` | ~75 | Warm beige-gray |
| `slate` | ~248–266 | Blue-tinted gray |
| `mauve` | ~310 | Purple-tinted gray |
| `olive` | ~128 | Green-tinted gray |

## Accent presets

Sets `--accent`, `--accent-hover`, `--accent-muted`, `--accent-text`.

| Preset | OKLCH (base) | Hue |
|---|---|---|
| `blue` | `oklch(0.623 0.188 259.82)` | ~260 |
| `violet` | `oklch(0.606 0.219 292.72)` | ~293 |
| `emerald` | `oklch(0.696 0.149 162.51)` | ~163 |
| `amber` | `oklch(0.769 0.165 70.08)` | ~70 |
| `red` | `oklch(0.637 0.208 25.32)` | ~25 |
| `rose` | `oklch(0.645 0.196 12.2)` | ~12 |
| `cyan` | `oklch(0.715 0.143 194.77)` | ~195 |
| `orange` | `oklch(0.705 0.175 47.6)` | ~48 |

## Font presets

Sets `--font-sans` and `--font-mono`. Requires fonts to be loaded in the host app (via `next/font` or `<link>`).

| Preset | Sans | Mono |
|---|---|---|
| `system` | SF Pro, system-ui | SF Mono, ui-monospace |
| `inter` | Inter | SF Mono, ui-monospace |
| `geist` | Geist | Geist Mono |

See [Typography](../tokens/typography.md) for font loading details.

## Radius presets

Sets per-component radius variables.

| Variable | none | sm | md | lg | full |
|---|---|---|---|---|---|
| `--ds-radius-button` | 0px | 8px | 12px | 16px | 9999px |
| `--ds-radius-input` | 0px | 8px | 12px | 16px | 9999px |
| `--ds-radius-textarea` | 0px | 8px | 12px | 16px | 24px |
| `--ds-radius-card` | 0px | 8px | 12px | 16px | 24px |
| `--ds-radius-checkbox` | 0px | 4px | 8px | 8px | 8px |
| `--ds-radius-tooltip` | 0px | 4px | 8px | 12px | 16px |
| `--ds-radius-avatar` | 0px | 8px | 16px | 9999px | 9999px |

## Spacing presets

Sets per-component spacing variables.

| Variable | sm | md | lg |
|---|---|---|---|
| `--ds-space-card` | 16px | 24px | 32px |
| `--ds-space-card-sm` | 12px | 16px | 20px |
| `--ds-space-input-x` | 10px | 16px | 20px |
| `--ds-space-input-y` | 8px | 12px | 16px |
| `--ds-space-button-sm` | 8px | 12px | 16px |
| `--ds-space-button-md` | 12px | 16px | 20px |
| `--ds-space-button-lg` | 16px | 24px | 32px |

## Per-component override

Do not add extra props for radius/spacing. Use `className` — `cn()` with `tailwind-merge` handles conflicts:

```tsx
{/* Global preset is lg, but this card uses small radius + compact padding */}
<Card className="rounded-lg p-3">
  ...
</Card>
```

Global theming via provider, local override via className.

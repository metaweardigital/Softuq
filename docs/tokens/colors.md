# Colors

All color values use **OKLCH** — `oklch(lightness chroma hue)`:

- **Lightness** (L): 0–1. 0 = black, 1 = white.
- **Chroma** (C): 0–0.4. 0 = gray, higher = more saturated.
- **Hue** (H): 0–360 degrees on the color wheel.

## Primitive palettes

12 color scales defined in `packages/tokens/src/primitives.css`. Gray + 5 tinted variants have 18 shades (50–980) for fine-grained dark UI control. Accent colors have 10 shades (50–900).

### Gray

Achromatic (chroma 0, hue 0). Lightness range: 0.134–0.985.

| Token | Value |
|---|---|
| `--gray-50` | `oklch(0.985 0 0)` |
| `--gray-100` | `oklch(0.97 0 0)` |
| `--gray-150` | `oklch(0.946 0 0)` |
| `--gray-200` | `oklch(0.922 0 0)` |
| `--gray-250` | `oklch(0.87 0 0)` |
| `--gray-300` | `oklch(0.808 0 0)` |
| `--gray-400` | `oklch(0.715 0 0)` |
| `--gray-500` | `oklch(0.633 0 0)` |
| `--gray-600` | `oklch(0.551 0 0)` |
| `--gray-700` | `oklch(0.45 0 0)` |
| `--gray-750` | `oklch(0.409 0 0)` |
| `--gray-800` | `oklch(0.321 0 0)` |
| `--gray-850` | `oklch(0.264 0 0)` |
| `--gray-900` | `oklch(0.218 0 0)` |
| `--gray-920` | `oklch(0.191 0 0)` |
| `--gray-940` | `oklch(0.178 0 0)` |
| `--gray-960` | `oklch(0.145 0 0)` |
| `--gray-980` | `oklch(0.134 0 0)` |

### Blue

Hue ~255–265. Primary accent color.

| Token | Value |
|---|---|
| `--blue-50` | `oklch(0.97 0.014 254.66)` |
| `--blue-100` | `oklch(0.932 0.032 255.61)` |
| `--blue-200` | `oklch(0.882 0.057 254.14)` |
| `--blue-300` | `oklch(0.809 0.096 251.83)` |
| `--blue-400` | `oklch(0.714 0.143 254.63)` |
| `--blue-500` | `oklch(0.623 0.188 259.82)` |
| `--blue-600` | `oklch(0.546 0.215 262.89)` |
| `--blue-700` | `oklch(0.488 0.217 264.38)` |
| `--blue-800` | `oklch(0.424 0.181 265.64)` |
| `--blue-900` | `oklch(0.379 0.138 265.53)` |

### Red

Hue ~17–27. Destructive / error states.

| Token | Value |
|---|---|
| `--red-50` | `oklch(0.971 0.013 17.04)` |
| `--red-100` | `oklch(0.936 0.031 17.58)` |
| `--red-200` | `oklch(0.885 0.059 18.27)` |
| `--red-300` | `oklch(0.808 0.103 19.54)` |
| `--red-400` | `oklch(0.711 0.166 22.2)` |
| `--red-500` | `oklch(0.637 0.208 25.32)` |
| `--red-600` | `oklch(0.577 0.215 27.32)` |
| `--red-700` | `oklch(0.505 0.19 27.51)` |
| `--red-800` | `oklch(0.444 0.161 26.89)` |
| `--red-900` | `oklch(0.396 0.133 25.71)` |

### Green

Hue ~150–156. Success states.

| Token | Value |
|---|---|
| `--green-50` | `oklch(0.982 0.018 156.09)` |
| `--green-100` | `oklch(0.962 0.043 156.85)` |
| `--green-200` | `oklch(0.925 0.081 156.05)` |
| `--green-300` | `oklch(0.871 0.136 154.48)` |
| `--green-400` | `oklch(0.8 0.182 151.73)` |
| `--green-500` | `oklch(0.723 0.192 149.6)` |
| `--green-600` | `oklch(0.627 0.17 149.23)` |
| `--green-700` | `oklch(0.527 0.137 150.09)` |
| `--green-800` | `oklch(0.448 0.108 151.35)` |
| `--green-900` | `oklch(0.393 0.09 152.56)` |

### Amber

Hue ~46–96. Warning states.

| Token | Value |
|---|---|
| `--amber-50` | `oklch(0.987 0.021 95.33)` |
| `--amber-100` | `oklch(0.962 0.058 95.64)` |
| `--amber-200` | `oklch(0.924 0.115 95.76)` |
| `--amber-300` | `oklch(0.879 0.153 91.61)` |
| `--amber-400` | `oklch(0.837 0.164 84.43)` |
| `--amber-500` | `oklch(0.769 0.165 70.08)` |
| `--amber-600` | `oklch(0.666 0.157 58.31)` |
| `--amber-700` | `oklch(0.555 0.145 48.99)` |
| `--amber-800` | `oklch(0.473 0.125 46.19)` |
| `--amber-900` | `oklch(0.414 0.105 45.89)` |

### Emerald

Hue ~162–169. Alternative success (badges, checks).

| Token | Value |
|---|---|
| `--emerald-50` | `oklch(0.979 0.021 166.35)` |
| `--emerald-100` | `oklch(0.95 0.051 163.15)` |
| `--emerald-200` | `oklch(0.905 0.089 164.2)` |
| `--emerald-300` | `oklch(0.845 0.13 165.01)` |
| `--emerald-400` | `oklch(0.773 0.153 163.25)` |
| `--emerald-500` | `oklch(0.696 0.149 162.51)` |
| `--emerald-600` | `oklch(0.596 0.127 163.25)` |
| `--emerald-700` | `oklch(0.508 0.105 165.64)` |
| `--emerald-800` | `oklch(0.432 0.086 166.94)` |
| `--emerald-900` | `oklch(0.378 0.073 168.97)` |

### Violet

Hue ~293. Secondary accent.

| Token | Value |
|---|---|
| `--violet-50` | `oklch(0.969 0.016 293.61)` |
| `--violet-100` | `oklch(0.943 0.028 294.51)` |
| `--violet-200` | `oklch(0.894 0.055 293.25)` |
| `--violet-300` | `oklch(0.811 0.101 293.55)` |
| `--violet-400` | `oklch(0.709 0.159 293.53)` |
| `--violet-500` | `oklch(0.606 0.219 292.72)` |
| `--violet-600` | `oklch(0.541 0.247 293.01)` |
| `--violet-700` | `oklch(0.491 0.241 292.58)` |
| `--violet-800` | `oklch(0.432 0.211 292.76)` |
| `--violet-900` | `oklch(0.38 0.178 293.74)` |

### Rose

Hue ~10–17. Soft red accent.

| Token | Value |
|---|---|
| `--rose-50` | `oklch(0.969 0.015 12.12)` |
| `--rose-100` | `oklch(0.941 0.03 12.44)` |
| `--rose-200` | `oklch(0.892 0.056 9.93)` |
| `--rose-300` | `oklch(0.81 0.106 11.61)` |
| `--rose-400` | `oklch(0.719 0.169 13.41)` |
| `--rose-500` | `oklch(0.645 0.215 16.43)` |
| `--rose-600` | `oklch(0.586 0.222 17.58)` |
| `--rose-700` | `oklch(0.514 0.198 16.93)` |
| `--rose-800` | `oklch(0.455 0.171 13.69)` |
| `--rose-900` | `oklch(0.41 0.15 10.26)` |

### Cyan

Hue ~201–227. Cool blue-green accent.

| Token | Value |
|---|---|
| `--cyan-50` | `oklch(0.984 0.019 201.11)` |
| `--cyan-100` | `oklch(0.956 0.044 203.48)` |
| `--cyan-200` | `oklch(0.917 0.077 205.09)` |
| `--cyan-300` | `oklch(0.865 0.115 207.11)` |
| `--cyan-400` | `oklch(0.797 0.134 211.56)` |
| `--cyan-500` | `oklch(0.715 0.126 215.24)` |
| `--cyan-600` | `oklch(0.609 0.111 221.74)` |
| `--cyan-700` | `oklch(0.52 0.094 223.15)` |
| `--cyan-800` | `oklch(0.45 0.077 224.3)` |
| `--cyan-900` | `oklch(0.398 0.066 227.41)` |

### Orange

Hue ~38–74. Warm accent.

| Token | Value |
|---|---|
| `--orange-50` | `oklch(0.98 0.016 73.64)` |
| `--orange-100` | `oklch(0.954 0.037 75.15)` |
| `--orange-200` | `oklch(0.901 0.073 70.69)` |
| `--orange-300` | `oklch(0.837 0.116 66.28)` |
| `--orange-400` | `oklch(0.758 0.159 55.93)` |
| `--orange-500` | `oklch(0.705 0.187 47.6)` |
| `--orange-600` | `oklch(0.646 0.194 41.11)` |
| `--orange-700` | `oklch(0.553 0.174 38.39)` |
| `--orange-800` | `oklch(0.47 0.143 37.29)` |
| `--orange-900` | `oklch(0.408 0.116 38.16)` |

## Tinted gray palettes

5 tinted variants of the gray scale, used by `<SoftuqProvider palette="...">`. Each has the same 18 shades as gray but with added chroma and hue. Low chroma keeps them neutral-feeling while adding warmth or coolness.

### Zinc

Hue ~264. Cool blue-gray. Low chroma (0.002–0.017).

| Token | Value |
|---|---|
| `--zinc-50` | `oklch(0.985 0.002 240)` |
| `--zinc-500` | `oklch(0.609 0.014 264.54)` |
| `--zinc-980` | `oklch(0.12 0.006 264.54)` |

### Stone

Hue ~56–75. Warm beige-gray. Low chroma (0.002–0.013).

| Token | Value |
|---|---|
| `--stone-50` | `oklch(0.985 0.002 75)` |
| `--stone-500` | `oklch(0.617 0.013 56)` |
| `--stone-980` | `oklch(0.126 0.003 56)` |

### Slate

Hue ~248–266. Saturated blue-gray. Higher chroma (0.003–0.042).

| Token | Value |
|---|---|
| `--slate-50` | `oklch(0.984 0.003 247.86)` |
| `--slate-500` | `oklch(0.606 0.036 264.05)` |
| `--slate-980` | `oklch(0.118 0.022 265.75)` |

### Mauve

Hue ~310. Purple-gray. Low chroma (0.004–0.02).

| Token | Value |
|---|---|
| `--mauve-50` | `oklch(0.985 0.004 310)` |
| `--mauve-500` | `oklch(0.611 0.02 310)` |
| `--mauve-980` | `oklch(0.126 0.005 310)` |

### Olive

Hue ~128. Green-gray. Low chroma (0.004–0.02).

| Token | Value |
|---|---|
| `--olive-50` | `oklch(0.985 0.004 128)` |
| `--olive-500` | `oklch(0.611 0.02 128)` |
| `--olive-980` | `oklch(0.126 0.005 128)` |

Full 18-shade tables for each tinted palette are in `packages/tokens/src/primitives.css`.

## Semantic mapping

Theme switching via `data-theme="dark"` (default) or `data-theme="light"` on `<html>`. Defined in `packages/tokens/src/semantic.css`.

### Backgrounds

| Token | Dark | Light |
|---|---|---|
| `--bg-base` | gray-980 | gray-50 |
| `--bg-input` | gray-960 | gray-100 |
| `--bg-card` | gray-940 | `oklch(1 0 0)` |
| `--bg-elevated` | gray-920 | `oklch(1 0 0)` |
| `--bg-popover` | gray-900 | `oklch(1 0 0)` |
| `--bg-hover` | `oklch(1 0 0 / 0.04)` | `color-mix(in oklch, var(--gray-500) 8%, transparent)` |
| `--bg-selected` | gray-850 | gray-150 |
| `--bg-overlay` | `oklch(0 0 0 / 0.6)` | `oklch(0 0 0 / 0.4)` |

### Text

| Token | Dark | Light |
|---|---|---|
| `--text-primary` | gray-100 | gray-980 |
| `--text-secondary` | gray-500 | gray-600 |
| `--text-muted` | gray-700 | gray-400 |
| `--text-dimmed` | gray-750 | gray-300 |
| `--text-inverse` | gray-980 | gray-50 |

### Accent & status

Each status color has 5 variants: `base`, `-hover`, `-muted` (background tint), `-border` (tinted border), `-text`.

| Base token | Dark | Light |
|---|---|---|
| `--accent` | blue-500 | blue-600 |
| `--destructive` | red-500 | red-600 |
| `--success` | emerald-500 | emerald-600 |
| `--warning` | amber-500 | amber-600 |

Muted and border variants derive from the base via `color-mix`:

- `-muted`: base at 12% (dark) / 8% (light) — for tinted backgrounds (badges, alerts).
- `-border`: base at 30% (dark) / 25% (light) — for tinted borders on muted surfaces.

Example: `bg-destructive-muted text-destructive-text border border-destructive-border` for a tinted error badge.

### Borders

Neutral borders for chrome, dividers, inputs.

| Token | Dark | Light |
|---|---|---|
| `--border-subtle` | `oklch(1 0 0 / 0.08)` | `oklch(0 0 0 / 0.06)` |
| `--border-default` | `oklch(1 0 0 / 0.12)` | `oklch(0 0 0 / 0.1)` |
| `--border-strong` | gray-800 | gray-250 |
| `--border-accent` | `var(--accent)` | `var(--accent)` |

Status-tinted borders (`--accent-border`, `--destructive-border`, `--success-border`, `--warning-border`) live alongside the base colors above.

## Non-changing scales

Fixed-alpha scales that **never flip with theme** — always render as dark or light regardless of `data-theme`. Defined in a separate `:root {}` block in `semantic.css`, outside the theme blocks.

Use them for overlays, scrims, hover states on imagery, or any UI that must keep a consistent dark/light tint across both themes.

### Dark scale

Based on `--gray-980` (always the darkest gray in the active palette).

| Token | Value |
|---|---|
| `--dark-5` | `color-mix(in oklch, var(--gray-980) 5%, transparent)` |
| `--dark-10` | `color-mix(in oklch, var(--gray-980) 10%, transparent)` |
| `--dark-20` | `color-mix(in oklch, var(--gray-980) 20%, transparent)` |
| `--dark-40` | `color-mix(in oklch, var(--gray-980) 40%, transparent)` |
| `--dark-70` | `color-mix(in oklch, var(--gray-980) 70%, transparent)` |
| `--dark-90` | `color-mix(in oklch, var(--gray-980) 90%, transparent)` |
| `--dark-100` | `var(--gray-980)` — solid |

### Light scale

Based on `--gray-50` (always the lightest gray in the active palette).

| Token | Value |
|---|---|
| `--light-5` | `color-mix(in oklch, var(--gray-50) 5%, transparent)` |
| `--light-10` | `color-mix(in oklch, var(--gray-50) 10%, transparent)` |
| `--light-20` | `color-mix(in oklch, var(--gray-50) 20%, transparent)` |
| `--light-40` | `color-mix(in oklch, var(--gray-50) 40%, transparent)` |
| `--light-70` | `color-mix(in oklch, var(--gray-50) 70%, transparent)` |
| `--light-90` | `color-mix(in oklch, var(--gray-50) 90%, transparent)` |
| `--light-100` | `var(--gray-50)` — solid |

### Tailwind utilities

Mapped via `@theme` in `packages/docs/src/app/globals.css` as `--color-dark-*` / `--color-light-*`:

```tsx
<div className="bg-dark-70 text-white">Overlay chip</div>
<div className="border border-light-20">Muted divider on dark imagery</div>
<span className="bg-dark-100">Solid dark background</span>
```

Note: the scales are palette-aware (they track the selected tinted gray) but **not theme-aware** — they stay dark/light whichever theme is active.

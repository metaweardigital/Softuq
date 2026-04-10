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

## Tinted gray palettes

5 tinted variants of the gray scale, used by `<DesignYstemProvider palette="...">`. Each has the same 18 shades as gray but with added chroma and hue. Low chroma keeps them neutral-feeling while adding warmth or coolness.

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
| `--bg-elevated` | gray-940 | `oklch(1 0 0)` |
| `--bg-card` | gray-920 | `oklch(1 0 0)` |
| `--bg-input` | gray-960 | gray-100 |
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

Each status color has 4 variants: base, hover, muted (background tint), text.

| Token | Dark | Light |
|---|---|---|
| `--accent` | blue-500 | blue-600 |
| `--destructive` | red-500 | red-600 |
| `--success` | emerald-500 | emerald-600 |
| `--warning` | amber-500 | amber-600 |

### Borders

| Token | Dark | Light |
|---|---|---|
| `--border-subtle` | `oklch(1 0 0 / 0.08)` | `oklch(0 0 0 / 0.06)` |
| `--border-default` | `oklch(1 0 0 / 0.12)` | `oklch(0 0 0 / 0.1)` |
| `--border-strong` | gray-800 | gray-250 |
| `--border-accent` | blue-500 | blue-600 |

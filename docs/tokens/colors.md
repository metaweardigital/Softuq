# Colors

## Primitive palettes

7 color scales, each with 10 shades (50–900). Gray has 18 shades (50–980) for fine-grained dark mode control.

| Palette | Role |
|---|---|
| Gray | Backgrounds, text, borders |
| Blue | Primary accent |
| Red | Destructive / error |
| Green | Success states |
| Amber | Warning states |
| Emerald | Alternative success (badges, checks) |
| Violet | Secondary accent (future theming) |

## Semantic mapping

Theme switching via `data-theme="dark"` (default) or `data-theme="light"` on `<html>`.

### Backgrounds

| Token | Dark | Light |
|---|---|---|
| `--bg-base` | #080808 (gray-980) | #fafafa (gray-50) |
| `--bg-elevated` | #111111 (gray-940) | white |
| `--bg-card` | #141414 (gray-920) | white |
| `--bg-input` | #0a0a0a (gray-960) | #f5f5f5 (gray-100) |
| `--bg-hover` | rgba(255,255,255,0.04) | rgba(0,0,0,0.04) |
| `--bg-selected` | #252525 (gray-850) | #ededed (gray-150) |
| `--bg-overlay` | rgba(0,0,0,0.6) | rgba(0,0,0,0.4) |

### Text

| Token | Dark | Light |
|---|---|---|
| `--text-primary` | #f5f5f5 (gray-100) | #080808 (gray-980) |
| `--text-secondary` | #8a8a8a (gray-500) | #6b7280 (gray-600) |
| `--text-muted` | #555555 (gray-700) | #a3a3a3 (gray-400) |
| `--text-dimmed` | #4a4a4a (gray-750) | #c0c0c0 (gray-300) |
| `--text-inverse` | #080808 (gray-980) | #fafafa (gray-50) |

### Accent & status

Each status color has 4 variants: base, hover, muted (background tint), text.

| Token | Dark | Light |
|---|---|---|
| `--accent` | blue-500 (#3b82f6) | blue-600 (#2563eb) |
| `--destructive` | red-500 (#ef4444) | red-600 (#dc2626) |
| `--success` | emerald-500 (#10b981) | emerald-600 (#059669) |
| `--warning` | amber-500 (#f59e0b) | amber-600 (#d97706) |

### Borders

| Token | Dark | Light |
|---|---|---|
| `--border-subtle` | rgba(255,255,255,0.08) | rgba(0,0,0,0.06) |
| `--border-default` | rgba(255,255,255,0.12) | rgba(0,0,0,0.10) |
| `--border-strong` | #333333 (gray-800) | #d4d4d4 (gray-250) |
| `--border-accent` | blue-500 | blue-600 |

# Spacing

4px base grid. All spacing is a multiple of 4px.

## Primitive scale

| Token | px | Tailwind | Grid |
|---|---|---|---|
| `--space-0` | 0 | `p-0` | 0x |
| `--space-1` | 4px | `p-1` | 1x |
| `--space-2` | 8px | `p-2` | 2x |
| `--space-3` | 12px | `p-3` | 3x |
| `--space-4` | 16px | `p-4` | 4x |
| `--space-5` | 20px | `p-5` | 5x |
| `--space-6` | 24px | `p-6` | 6x |
| `--space-8` | 32px | `p-8` | 8x |
| `--space-10` | 40px | `p-10` | 10x |
| `--space-12` | 48px | `p-12` | 12x |
| `--space-16` | 64px | `p-16` | 16x |

Micro spacing (`p-0.5` = 2px) is an exception for badge padding, icon offsets, and label gaps.

## Component spacing variables

Components use `--ds-space-*` variables instead of hardcoded values (e.g. `p-[var(--ds-space-card)]`). Controlled globally via `<DesignYstemProvider spacing="...">`.

| Variable | Component |
|---|---|
| `--ds-space-card` | Card padding |
| `--ds-space-card-sm` | Compact card padding |
| `--ds-space-input-x` | Input horizontal padding |
| `--ds-space-input-y` | Input vertical padding |
| `--ds-space-button-sm` | Button sm horizontal padding |
| `--ds-space-button-md` | Button md horizontal padding |
| `--ds-space-button-lg` | Button lg horizontal padding |

## Preset values

| Variable | sm | md | lg |
|---|---|---|---|
| `--ds-space-card` | 16px | 24px | 32px |
| `--ds-space-card-sm` | 12px | 16px | 20px |
| `--ds-space-input-x` | 12px | 16px | 20px |
| `--ds-space-input-y` | 8px | 12px | 16px |
| `--ds-space-button-sm` | 8px | 12px | 16px |
| `--ds-space-button-md` | 12px | 16px | 20px |
| `--ds-space-button-lg` | 16px | 24px | 32px |

Default preset: `md`.

## Usage

| Context | Recommended |
|---|---|
| Inline gap (icon + text) | 8px (`gap-2`) |
| Component padding | 16px (`p-4`) |
| Card padding | 24px (`p-6`) |
| Section spacing | 24-48px (`py-6` - `py-12`) |
| Page padding | 24px mobile, 48px desktop |

## Component heights

Always on grid:

| Size | Height | Tailwind |
|---|---|---|
| sm | 32px | `h-8` |
| md | 40px | `h-10` |
| lg | 48px | `h-12` |

Minimum touch target: 44x44px.

# Spacing

4px base grid. All spacing is a multiple of 4px.

## Scale

| Token | px | Tailwind | Grid |
|---|---|---|---|
| `--space-0` | 0 | `p-0` | 0× |
| `--space-1` | 4px | `p-1` | 1× |
| `--space-2` | 8px | `p-2` | 2× |
| `--space-3` | 12px | `p-3` | 3× |
| `--space-4` | 16px | `p-4` | 4× |
| `--space-5` | 20px | `p-5` | 5× |
| `--space-6` | 24px | `p-6` | 6× |
| `--space-8` | 32px | `p-8` | 8× |
| `--space-10` | 40px | `p-10` | 10× |
| `--space-12` | 48px | `p-12` | 12× |
| `--space-16` | 64px | `p-16` | 16× |

Micro spacing (`p-0.5` = 2px) is an exception for badge padding, icon offsets, and label gaps.

## Usage

| Context | Recommended |
|---|---|
| Inline gap (icon + text) | 8px (`gap-2`) |
| Component padding | 16px (`p-4`) |
| Card padding | 24px (`p-6`) |
| Section spacing | 24–48px (`py-6` – `py-12`) |
| Page padding | 24px mobile, 48px desktop |

## Component heights

Always on grid:

| Size | Height | Tailwind |
|---|---|---|
| sm | 32px | `h-8` |
| md | 40px | `h-10` |
| lg | 48px | `h-12` |

Minimum touch target: 44×44px.

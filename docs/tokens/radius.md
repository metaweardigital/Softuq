# Border Radius

## Primitive scale

| Token | Value | Use |
|---|---|---|
| `--radius-xs` | 4px | Checkboxes, small badges |
| `--radius-sm` | 8px | Small buttons, toggles |
| `--radius-md` | 12px | Medium buttons, inputs |
| `--radius-lg` | 16px | Cards, dialogs |
| `--radius-xl` | 20px | Large cards |
| `--radius-2xl` | 24px | Sheets, large panels |
| `--radius-3xl` | 32px | Special elements |
| `--radius-full` | 9999px | Pills, avatars, badges |

## Component radius variables

Components use `--ds-radius-*` variables instead of hardcoded values (e.g. `rounded-[var(--ds-radius-card)]`). Controlled globally via `<DesignYstemProvider radius="...">`.

| Variable | Component |
|---|---|
| `--ds-radius-button` | Button |
| `--ds-radius-input` | Input, Select |
| `--ds-radius-textarea` | Textarea |
| `--ds-radius-card` | Card, Alert, Dialog |
| `--ds-radius-checkbox` | Checkbox |
| `--ds-radius-tooltip` | Tooltip |
| `--ds-radius-avatar` | Avatar |

## Preset values

| Variable | none | sm | md | lg | full |
|---|---|---|---|---|---|
| `--ds-radius-button` | 0px | 8px | 12px | 16px | 9999px |
| `--ds-radius-input` | 0px | 8px | 12px | 16px | 9999px |
| `--ds-radius-textarea` | 0px | 8px | 12px | 16px | 24px |
| `--ds-radius-card` | 0px | 8px | 12px | 16px | 24px |
| `--ds-radius-checkbox` | 0px | 4px | 8px | 8px | 8px |
| `--ds-radius-tooltip` | 0px | 4px | 8px | 12px | 16px |
| `--ds-radius-avatar` | 0px | 8px | 16px | 9999px | 9999px |

Default preset: `lg`.

## Nested radius rule

Inner element radius should be: `inner = outer - gap`

Example: a card with `rounded-2xl` (24px) and `p-4` (16px) padding should have inner elements with `rounded-lg` (8px = 24 - 16).

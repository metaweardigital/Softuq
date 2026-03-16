# Border Radius

## Scale

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

## Nested radius rule

Inner element radius should be: `inner = outer - gap`

Example: a card with `rounded-2xl` (24px) and `p-4` (16px) padding should have inner elements with `rounded-lg` (8px = 24 - 16).

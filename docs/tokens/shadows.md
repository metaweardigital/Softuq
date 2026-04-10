# Shadows

## Tokens

| Token | Use |
|---|---|
| `--shadow-sm` | Subtle depth (cards default, buttons) |
| `--shadow-md` | Medium depth (elevated cards, dropdowns) |
| `--shadow-lg` | High depth (modals, popovers, sheets) |
| `--shadow-inset` | Inset depth (pressed/sunken states) |

## Dark mode

High opacity black — palette tinting is invisible on dark backgrounds.

```css
--shadow-sm: 0 1px 2px oklch(0 0 0 / 0.5);
--shadow-md: 0 4px 12px oklch(0 0 0 / 0.6);
--shadow-lg: 0 12px 32px oklch(0 0 0 / 0.7);
--shadow-inset: inset 0 2px 6px oklch(0 0 0 / 0.5);
```

## Light mode

Palette-tinted via `color-mix` with `--gray-500` — shadow hue shifts with palette (slate → blue tint, stone → warm tint, mauve → purple tint).

```css
--shadow-sm: 0 2px 6px color-mix(in oklch, var(--gray-500) 8%, transparent);
--shadow-md: 0 4px 12px color-mix(in oklch, var(--gray-500) 12%, transparent);
--shadow-lg: 0 12px 32px color-mix(in oklch, var(--gray-500) 18%, transparent);
--shadow-inset: inset 0 2px 6px color-mix(in oklch, var(--gray-500) 8%, transparent);
```

## Glassmorphism

```css
--glass-bg: oklch(0.218 0 0 / 0.7)   /* dark */  | oklch(1 0 0 / 0.7)       /* light */
--glass-border: oklch(1 0 0 / 0.08)   /* dark */  | oklch(0 0 0 / 0.08)      /* light */
--glass-blur: 20px
```

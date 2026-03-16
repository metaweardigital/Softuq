# Shadows

## Standard

| Token | Use |
|---|---|
| `--shadow-sm` | Subtle depth (cards default) |
| `--shadow-md` | Medium depth (dropdowns) |
| `--shadow-lg` | High depth (floating elements) |

## Neumorphic

Three elevation levels. Both dark and light mode variants defined in semantic tokens.

### Raised (default elevation)

Light highlight top-left + dark shadow bottom-right. Used on cards, buttons.

```css
/* Dark */
-2px -2px 8px rgba(255,255,255,0.03), 6px 6px 12px rgba(0,0,0,0.4)
/* Light */
-2px -2px 8px rgba(255,255,255,0.7), 4px 4px 10px rgba(0,0,0,0.08)
```

### Pressed (inset)

Inset variant for active/pressed states.

```css
/* Dark */
inset 4px 4px 8px rgba(0,0,0,0.4), inset -2px -2px 6px rgba(255,255,255,0.02)
/* Light */
inset 2px 2px 6px rgba(0,0,0,0.08), inset -2px -2px 6px rgba(255,255,255,0.7)
```

### Floating (high elevation)

For modals, popovers, sheets.

```css
/* Dark */
0 20px 40px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.1)
/* Light */
0 16px 32px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.1)
```

## Glassmorphism

```css
--glass-bg: rgba(30,30,30,0.7)    /* dark */ | rgba(255,255,255,0.7)    /* light */
--glass-border: rgba(255,255,255,0.08) | rgba(0,0,0,0.08)
--glass-blur: 20px
```

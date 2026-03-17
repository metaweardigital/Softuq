# Typography

## Scale

Major Third (1.25) with progressive ratio. Smaller steps for body text (~1.15), larger jumps for headings (~1.33). Golden ratio (1.618) is too aggressive for UI.

All sizes use fluid `clamp()` — scales smoothly between mobile and desktop.

| Token | Mobile | Desktop | Ratio |
|---|---|---|---|
| `--text-xs` | 11px | 12px | — |
| `--text-sm` | 13px | 14px | ×1.17 |
| `--text-base` | 15px | 16px | ×1.14 |
| `--text-lg` | 17px | 18px | ×1.13 |
| `--text-xl` | 19px | 22px | ×1.22 |
| `--text-2xl` | 22px | 28px | ×1.27 |
| `--text-3xl` | 28px | 36px | ×1.29 |
| `--text-4xl` | 34px | 48px | ×1.33 |

## Font presets

Controlled via `<DesignYstemProvider font="...">`. Overrides `--font-sans` and `--font-mono`.

| Preset | Sans | Mono |
|---|---|---|
| `system` (default) | SF Pro, system-ui | SF Mono, ui-monospace |
| `inter` | Inter | SF Mono, ui-monospace |
| `geist` | Geist | Geist Mono |

### Default font stack (system preset)

```css
--font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
--font-mono: 'SF Mono', ui-monospace, SFMono-Regular, 'Cascadia Code', monospace;
```

### Loading custom fonts

Inter is loaded via `next/font/google`. Geist and Geist Mono are local `.woff2` files. The provider references CSS variables set by `next/font`:

- `--font-inter` — set by `next/font/google` Inter loader
- `--font-geist-sans` — set by local font loader for GeistVF.woff2
- `--font-geist-mono` — set by local font loader for GeistMonoVF.woff2

## Line height

| Token | Value | Use |
|---|---|---|
| `--leading-tight` | 1.25 | Headings, card titles |
| `--leading-normal` | 1.5 | Body text, paragraphs |
| `--leading-relaxed` | 1.75 | Long-form content |

## Letter spacing

| Token | Value | Use |
|---|---|---|
| `--tracking-tight` | -0.025em | Large headings (2xl+) |
| `--tracking-normal` | 0em | Default |
| `--tracking-wide` | 0.025em | Uppercase labels, badges |

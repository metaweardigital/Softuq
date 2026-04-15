# Typography

## Scale

Major Third (1.25) with progressive ratio. Smaller steps for body text (~1.15), larger jumps for headings (~1.33). Golden ratio (1.618) is too aggressive for UI.

All sizes use fluid `clamp()` — scales smoothly between mobile and desktop.

| Token | Mobile | Desktop | Ratio |
|---|---|---|---|
| `--text-xs` | 11px | 12px | — |
| `--text-sm` | 13px | 15px | ×1.15 |
| `--text-base` | 15px | 18px | ×1.20 |
| `--text-lg` | 17px | 20px | ×1.18 |
| `--text-xl` | 19px | 22px | ×1.22 |
| `--text-2xl` | 22px | 28px | ×1.27 |
| `--text-3xl` | 28px | 36px | ×1.29 |
| `--text-4xl` | 34px | 48px | ×1.33 |

## Body scale (paragraphs)

Body sizes (`sm` / `base` / `lg`) jump **~15–20%** from mobile to desktop — visible enough to feel comfortable on large screens. This is deliberate; earlier scales only bumped 6% which was invisible.

**Always set an explicit `text-*` class on `<p>`** — never inherit the browser default (16px fixed). Hierarchy:

| Context | Class | Notes |
|---|---|---|
| Hero lead (under H1) | `text-base sm:text-lg` | Largest body text, prominent intro |
| Section description (under H2) | `text-base` | Default for marketing sections |
| In-card description | `text-sm` | Smaller, lower in hierarchy |
| Captions, helpers, footnotes | `text-xs` | Smallest, dimmed color |

## Inputs (special case)

Form inputs are pinned to **16px on mobile** to prevent iOS Safari from auto-zooming on focus. Implementation:

```tsx
sm: "h-8 ... text-[16px] sm:text-xs",
md: "h-10 ... text-[16px] sm:text-sm",
```

Applied to `Input`, `Textarea`, `SearchInput`. Independent of body scale — won't change when `--text-*` tokens are tweaked. `Select` is exempt (custom popover, not a native input → no iOS zoom).

## Font presets

Controlled via `<SoftuqProvider font="...">`. Overrides `--font-sans` and `--font-mono`.

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

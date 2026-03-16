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

## Font stack

```css
--font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
--font-mono: 'SF Mono', ui-monospace, SFMono-Regular, 'Cascadia Code', monospace;
```

Apple-native stack. SF Pro on macOS/iOS, system-ui fallback on other platforms.

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

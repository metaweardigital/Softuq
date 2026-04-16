# Typography reference

## Scale

Major Third (1.25) with fluid `clamp()`. All sizes scale between mobile and desktop automatically.

| Token | Mobile | Desktop |
|---|---|---|
| `text-xs` | 11px | 12px |
| `text-sm` | 13px | 15px |
| `text-base` | 15px | 18px |
| `text-lg` | 17px | 20px |
| `text-xl` | 19px | 22px |
| `text-2xl` | 22px | 28px |
| `text-3xl` | 28px | 36px |
| `text-4xl` | 34px | 48px |

## Paragraph rules

**Every `<p>` must have an explicit `text-*` class.** Browser default is 16px fixed and bypasses the fluid scale entirely — all body text will look wrong at non-standard viewport sizes.

### Hierarchy by context

| Context | Classes |
|---|---|
| Hero lead (directly under H1) | `text-base sm:text-lg text-fg-secondary` |
| Section description (under H2) | `text-base text-fg-secondary` |
| Card description | `text-sm text-fg-secondary` |
| Caption / helper text | `text-xs text-fg-muted` |
| Long-form content | `text-base leading-relaxed text-fg-secondary` |

### Color pairing

- Primary text (titles, body) → `text-fg-primary`
- Supporting text (descriptions) → `text-fg-secondary`
- Tertiary (captions, helpers) → `text-fg-muted`
- Never `text-fg-dimmed` on readable text — it's for disabled/placeholder only

## Heading rules

**H1 and H2 always include `text-balance`.** This uses CSS `text-wrap: balance` to distribute words evenly across lines and prevents widow words (a single word dangling on the last line) that make large titles look broken.

```tsx
<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance text-fg-primary">
  A design system for AI-era projects.
</h1>

<h2 className="text-2xl sm:text-3xl font-bold text-balance text-fg-primary">
  Frequently asked
</h2>
```

### Heading sizes by role

| Role | Classes |
|---|---|
| Hero H1 | `text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance` |
| Section H2 | `text-2xl sm:text-3xl font-bold text-balance` (or `text-3xl sm:text-4xl` for bigger sections) |
| Subsection H3 | `text-xl font-semibold` (balance optional) |
| Card title (H3/H4) | `text-lg font-semibold` or use `<CardTitle>` component |

### Escape hatches

- **Exact break location** → `&nbsp;` between the last 2–3 words: `A design system for AI-era&nbsp;projects.`
- **Never** use `<br />` — it breaks responsive reflow on different viewports
- **Never** hardcode `max-w-*` on the heading itself to force a wrap — use `text-balance` first

## Line height

| Token | Value | Use |
|---|---|---|
| `leading-tight` | 1.25 | Headings, card titles |
| `leading-normal` | 1.5 | Body text |
| `leading-relaxed` | 1.75 | Long-form, articles |

## Letter spacing

| Token | Value | Use |
|---|---|---|
| `tracking-tight` | -0.025em | Large headings (text-2xl and above) |
| `tracking-normal` | 0 | Default |
| `tracking-wide` | 0.025em | Uppercase labels, badges, eyebrows |

## Font axes

Set via `SoftuqProvider` props (or `useSoftuq()` at runtime). Two independent axes:

**`font` (body)** — applies to `body { font-family: var(--font-sans) }`

| Value | Resolves to |
|---|---|
| `system` | Native system stack (SF Pro, Segoe UI, Roboto) |
| `inter` | `var(--font-inter)` — Inter |
| `geist` | `var(--font-geist-sans)` — Geist |

**`headingFont`** — applies to `h1..h6 { font-family: var(--font-heading) }`

| Value | Resolves to | Character |
|---|---|---|
| `sans` | `var(--font-sans)` | Matches body font |
| `lora` | `var(--font-lora)` | Humanist serif, readable |
| `playfair` | `var(--font-playfair)` | High-contrast display serif |
| `fraunces` | `var(--font-fraunces)` | Expressive variable serif |

**Rules**:
- Don't hardcode `font-family` on specific elements — use `font` / `headingFont` axes so the whole site stays consistent.
- Serif heading fonts (`lora`, `playfair`, `fraunces`) only apply to `<h1>` through `<h6>`. If you want a display-serif on a non-heading element (eyebrow, pull quote), use `font-ds-heading` utility — don't hardcode.
- Next.js gets fonts via `next/font/google` injected through `src/softuq-fonts.ts`. Vite gets them via `@fontsource-variable/*` imports in `main.tsx`. Both contracts provide `--font-inter`, `--font-geist-sans`, `--font-geist-mono`, `--font-lora`, `--font-playfair`, `--font-fraunces` as CSS variables.

## Inputs — 16px mobile floor

`Input`, `Textarea`, `SearchInput` are pinned to 16px on mobile:

```tsx
sm: "h-8 ... text-[16px] sm:text-xs",
md: "h-10 ... text-[16px] sm:text-sm",
```

This prevents iOS Safari from auto-zooming when the input gets focus. Don't override this — if you need smaller text on mobile, use a static label instead of an input.

`Select` is exempt — its popover is custom, not native input, so no iOS zoom.

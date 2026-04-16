# Tokens & colors reference

## Three-layer architecture

1. **Primitives** (`packages/tokens/src/primitives.css`) — raw OKLCH values (`--gray-500`, `--blue-600`). Never referenced directly by components.
2. **Semantic** (`packages/tokens/src/semantic.css`) — meaning-based aliases (`--bg-card`, `--text-primary`, `--accent`). This is what components use.
3. **Component** (via `SoftuqProvider` + `globals.css`) — `--ds-radius-*`, `--ds-space-*` and Tailwind v4 `--color-*` utilities.

**Rule:** Always reference the highest-abstraction layer that fits. If a semantic token doesn't exist, add it to `semantic.css` — never inline a primitive.

## Semantic utilities (Tailwind v4 mapping)

Tailwind v4 `@theme` block in `packages/docs/src/app/globals.css` exposes CSS vars as utility classes.

### Text (`text-fg-*`)

| Utility | Use |
|---|---|
| `text-fg-primary` | Titles, primary body text, icons in active state |
| `text-fg-secondary` | Descriptions, supporting paragraphs |
| `text-fg-muted` | Captions, helpers, inactive icons |
| `text-fg-dimmed` | Disabled state, placeholder |
| `text-fg-inverse` | Text on accent/filled buttons (white on colored bg) |

### Background (`bg-bg-*`)

Dark-mode elevation order (each layer sits on top of the previous):

`bg-bg-base` → `bg-bg-input` → `bg-bg-card` → `bg-bg-elevated` → `bg-bg-popover`

| Utility | Use |
|---|---|
| `bg-bg-base` | Page background |
| `bg-bg-input` | Form controls |
| `bg-bg-card` | Cards, panels |
| `bg-bg-elevated` | Table rows, nested containers |
| `bg-bg-popover` | Dropdowns, menus, tooltips |
| `bg-bg-hover` | Hover state for interactive elements |
| `bg-bg-selected` | Selected list items, active nav links |
| `bg-bg-overlay` | Modal scrims, dimmed backdrops behind dialogs/sheets |

### Glass

Frosted-panel utilities (use via `bg-[var(--glass-bg)]` + `backdrop-blur-[var(--glass-blur)]` + `border-[var(--glass-border)]`). Palette-aware, theme-transitioning. Use for floating nav bars, sticky toolbars, overlay panels where translucency is wanted.

### Border (`border-edge-*`)

| Utility | Use |
|---|---|
| `border-edge-subtle` | Default dividers, card outlines |
| `border-edge-default` | Stronger separation |
| `border-edge-strong` | Emphasis, focused outlines |
| `border-edge-accent` | Featured cards, accent focus — **auto-follows active `--accent`** |

### Accent family

| Utility | Use |
|---|---|
| `bg-accent` | Primary button fill |
| `bg-accent-muted` | Badge background, subtle accent panel |
| `text-accent-text` | Accent-colored text (icons in headers, links) |
| `border-accent-border` | Accent-colored border |

### Status families

Same pattern for `destructive`, `success`, `warning`:

- `bg-{status}` / `bg-{status}-muted`
- `text-{status}-text`
- `border-{status}-border`

### Theme-independent scales

`--dark-{5..90,100}` and `--light-{5..90,100}` are palette-aware alpha scales that **never flip with theme**. Use for:
- Image overlays / scrims
- Theme-independent chips (e.g. block hover badges in template previews)
- `-100` suffix = solid color

## Rules

### Do

- Use semantic utilities (`bg-bg-card`, not `bg-[var(--bg-card)]`)
- Use `color-mix(in oklch, var(--color) N%, transparent)` for custom alpha variants
- Prefer `text-accent-text` over `text-[var(--accent)]`
- Let `border-accent` auto-follow the active accent — never hardcode it

### Don't

- Hardcode hex or rgba in components (`#ffffff`, `rgba(0,0,0,.5)`)
- Reference primitives directly in components (`text-[var(--blue-600)]`)
- Mix colorspaces — all colors are OKLCH
- Use Tailwind defaults (`bg-slate-900`, `text-gray-500`) — they bypass theming

## Radius

Use component-specific tokens from `SoftuqProvider` (driven by the `radius` axis — `none` / `sm` / `md` / `lg` / `full`):

| Token | Typical element |
|---|---|
| `--ds-radius-button` | Buttons, tags |
| `--ds-radius-input` | Inputs, selects |
| `--ds-radius-textarea` | Textareas (slightly softer than inputs on some presets) |
| `--ds-radius-card` | Cards, panels, code blocks, dialogs, popovers |
| `--ds-radius-checkbox` | Checkbox |
| `--ds-radius-tooltip` | Tooltips, toasts |
| `--ds-radius-avatar` | Avatars (becomes `rounded-full` on `lg`/`full` presets) |

```tsx
<div className="rounded-[var(--ds-radius-card)]">
```

**Hardcoded `rounded-full` is allowed for:** Avatar (on `lg`/`full` preset the token already resolves to `full`), Radio, Toggle, Progress.

**Nested radius rule:** Outer radius must be >= inner radius. Never the reverse — it creates visible gaps at corners.

## Shadows

| Token | Use |
|---|---|
| `shadow-sm` | Hover lift on cards |
| `shadow-md` | Elevated panels |
| `shadow-lg` | Modals, popovers |
| `shadow-inset` | Inset borders, pressed state |

Light mode shadows are palette-tinted via `color-mix` with `var(--gray-500)`. Dark mode shadows are plain black at higher opacity. Both are handled inside `semantic.css` — just use the utility.

## When to create new tokens

If you find yourself writing `color-mix()` in a component, **lift it into a semantic token**. Components should reference ready semantic values, not assemble colors inline.

Checklist before adding a token:
1. Does an existing semantic token fit?
2. Will more than one component need this?
3. Does it need to flip between dark/light?

If yes to 2 or 3, add to `packages/tokens/src/semantic.css`.

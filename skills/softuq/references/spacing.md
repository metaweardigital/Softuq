# Spacing reference

## Grid

Everything is on a **4px grid**. Base scale: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.

Never use odd values (e.g. 7px, 13px, 21px). Never use rem-based Tailwind defaults directly on DS blocks (`p-3`, `gap-5`, `mt-7`) — they create arbitrary breakpoints.

## Tokens

All spacing in components / blocks / templates must use CSS variables. Three spacing density presets via `SoftuqProvider`: `sm` / `md` (default) / `lg`. The `md` values are shown below.

### Stack (vertical rhythm inside a block)

Ordered tight → loose. Pick by semantic relationship, not visual guess.

| Token | `md` value | Use for |
|---|---|---|
| `--ds-space-stack-sm` | 8px | Tight pairs — card title ↔ description, label ↔ input, icon ↔ label |
| `--ds-space-stack` | 24px | Default group gap — hero H1 ↔ paragraph, paragraph ↔ CTA, form field ↔ next field |
| `--ds-space-stack-lg` | 40px | Section header → content, logical block breaks |

### Page rhythm (web pages)

| Token | Description |
|---|---|
| `--ds-space-page-x` | Horizontal page padding. Fluid `clamp()` — scales with viewport |
| `--ds-space-section-y` | Vertical section spacing. Fluid `clamp()` |
| `--ds-space-gap` | Grid / flex gap for columns and rows |
| `--ds-space-card` | Inner padding for cards, panels |
| `--ds-space-card-sm` | Compact card padding — dense list items, toasts, small surfaces |

### Component padding

Inputs and buttons size themselves from tokens too — don't override with raw Tailwind.

| Token | Use |
|---|---|
| `--ds-space-input-x` | Input / select / textarea horizontal padding |
| `--ds-space-input-y` | Input / select / textarea vertical padding |
| `--ds-space-button-sm` | Button `sm` horizontal padding |
| `--ds-space-button-md` | Button `md` horizontal padding (default) |
| `--ds-space-button-lg` | Button `lg` horizontal padding |

These are already wired into `Input`, `Textarea`, `Select`, and `Button`. Only reference them directly when composing a custom control that should match DS density.

### App rhythm (dashboards, auth, admin UI)

Denser than web. Caps at web `md` values even on `lg` preset.

| Token | Use |
|---|---|
| `--ds-space-app-page-x` | App page horizontal padding |
| `--ds-space-app-stack` | App vertical rhythm |
| `--ds-space-app-gap` | App grid / flex gap |

## Usage patterns

### Web marketing section

```tsx
<section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
  <div className="mx-auto max-w-4xl">
    <h1 className="text-4xl sm:text-5xl font-bold text-balance text-fg-primary">
      Title
    </h1>
    <p className="mt-[var(--ds-space-stack)] text-base sm:text-lg text-fg-secondary">
      Subtitle
    </p>
    <div className="mt-[var(--ds-space-stack-lg)]">
      {/* CTAs, content */}
    </div>
  </div>
</section>
```

### Card

```tsx
<div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-bg-card p-[var(--ds-space-card)]">
  <div className="flex items-start justify-between mb-[var(--ds-space-stack-sm)]">
    <Icon />
    <Badge />
  </div>
  <h3 className="text-lg font-semibold text-fg-primary">Title</h3>
  <p className="text-sm text-fg-secondary mt-1">Description</p>
</div>
```

### App page

```tsx
<div className="p-[var(--ds-space-app-page-x)] space-y-[var(--ds-space-app-stack)]">
  <Header />
  <div className="grid grid-cols-3 gap-[var(--ds-space-app-gap)]">
    {/* cards */}
  </div>
</div>
```

## What NOT to do

- `p-4`, `gap-6`, `mt-8`, `mb-12` — raw Tailwind on DS blocks. Use tokens.
- `space-y-4` with hardcoded value — use `space-y-[var(--ds-space-stack)]`
- `p-[24px]` or `mt-[40px]` — hardcoded px values. Even if correct today, they break when someone switches to `sm` or `lg` preset.
- Mixing tokens and Tailwind on the same axis — stick to one.

## Quick decision tree

> I need to add vertical space between two elements. Which token?

1. Tight pair (title + its description, label + its input)? → `--ds-space-stack-sm`
2. Default group separation (paragraph + CTA, form field + form field)? → `--ds-space-stack`
3. Section header → its body? → `--ds-space-stack-lg`
4. Whole section to next section (vertical)? → `py-[var(--ds-space-section-y)]`

> I need to add horizontal space.

1. Page padding (left/right edges of viewport)? → `--ds-space-page-x` (web) or `--ds-space-app-page-x` (app)
2. Between items in a row/grid? → `--ds-space-gap` (web) or `--ds-space-app-gap` (app)
3. Inner padding of a card/panel? → `--ds-space-card`

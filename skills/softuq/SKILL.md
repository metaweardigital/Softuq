---
name: softuq
description: Use before writing or modifying ANY UI in a Softuq project. Enforces design-system rules for typography, spacing, colors, tokens, icons, components, and layout. Triggers on work involving landing pages, hero sections, blocks, templates, cards, forms, inputs, any JSX/TSX file that renders visual UI, or discussions of styling, CSS, Tailwind classes, and design decisions.
---

# Softuq Design System — Rules for AI coding agents

You are working in a project using the **Softuq design system**. Every piece of UI must follow these rules. Check the pre-flight list before writing a single line. When in doubt, read the matching reference file in `references/`.

## Pre-flight checklist

Before touching any JSX/TSX or CSS, confirm:

1. [ ] **Every `<p>` has an explicit `text-*` class** — never inherit browser default
2. [ ] **Every H1 and H2 has `text-balance`** — prevents single-word widows
3. [ ] **Spacing uses `var(--ds-space-*)` tokens** — not Tailwind `p-4`, `gap-6`, `mt-8`
4. [ ] **Colors use semantic utilities** (`text-fg-primary`, `bg-bg-card`, `border-edge-subtle`) — never hex or rgba
5. [ ] **Icons come from `lucide-react` (UI) or `@icons-pack/react-simple-icons` (brand)** — never inline `<svg>`
6. [ ] **New components follow the CVA pattern** — forwardRef, `type="button"`, variants before interface
7. [ ] **`<html>` has `data-theme="dark"` by default** — light mode is opt-in via provider
8. [ ] **Transitions use motion tokens** (`duration-fast/normal/slow`, `ease-soft/smooth/bounce`) — never `duration-200` or `ease-out`
9. [ ] **Icon-only buttons have `aria-label`**, interactive non-buttons have keyboard handlers, every `<img>` has an `alt`

If you violate any of these, stop and fix before continuing.

---

## Typography

Full reference: `references/typography.md`

**Body text**

| Context | Class | Rule |
|---|---|---|
| Hero lead (under H1) | `text-base sm:text-lg` | Largest body, prominent intro |
| Section description (under H2) | `text-base` | Default marketing paragraph |
| In-card description | `text-sm` | Smaller hierarchy |
| Captions / helpers | `text-xs` | Smallest, usually dimmed |

Always set the class. Never leave `<p>` bare — browser default is 16px fixed, bypasses our fluid scale.

**Headings**

- H1 / H2 — **always `text-balance`**. No exceptions.
- Escape hatch for exact breaks: `&nbsp;` between last 2–3 words (never `<br />`)
- Never hardcode widths to force line breaks
- Font family comes from the `headingFont` axis (`sans` / `lora` / `playfair` / `fraunces`) — don't hardcode `font-serif` or `font-[Playfair]` on headings, the provider handles it

**Inputs**

Pin to `text-[16px]` on mobile to block iOS Safari auto-zoom on focus. Already built into `Input`, `Textarea`, `SearchInput`. Don't override with `text-sm` on mobile.

---

## Spacing

Full reference: `references/spacing.md`

All values are on a **4px grid**. Use `var(--ds-space-*)` tokens, not raw Tailwind spacing classes.

**Stack hierarchy** (vertical rhythm inside blocks):

| Token | Use |
|---|---|
| `--ds-space-stack-sm` | Title ↔ description (card header) |
| `--ds-space-stack` | Hero H1 ↔ paragraph, group gaps |
| `--ds-space-stack-lg` | Section header → content, bigger blocks |

**Page rhythm**:

| Token | Use |
|---|---|
| `--ds-space-page-x` | Horizontal page padding (fluid `clamp()`) |
| `--ds-space-section-y` | Vertical section spacing (fluid `clamp()`) |
| `--ds-space-gap` | Grid / flex gap |
| `--ds-space-card` | Inner padding for cards, panels |

**App vs web**:

- Marketing pages: `px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]`
- App UI (dashboard, auth, admin): `p-[var(--ds-space-app-page-x)]`, `space-y-[var(--ds-space-app-stack)]`, `gap-[var(--ds-space-app-gap)]` — denser than web

Never use bare Tailwind `p-4`, `gap-6`, `mt-8` on design-system blocks. They break the density preset.

---

## Colors & tokens

Full reference: `references/tokens.md`

**Three layers**: primitive (OKLCH) → semantic (dark/light) → component. Always reference the highest abstraction that fits.

**Semantic utilities** (preferred):

- Text: `text-fg-primary`, `text-fg-secondary`, `text-fg-muted`, `text-fg-inverse`
- Background: `bg-bg-base`, `bg-bg-card`, `bg-bg-elevated`, `bg-bg-popover`, `bg-bg-input`
- Border: `border-edge-subtle`, `border-edge-default`, `border-edge-strong`, `border-edge-accent`
- Accent: `text-accent-text`, `bg-accent`, `bg-accent-muted`, `border-accent-border`

**Rules**:

- Never hardcode hex or rgba in components. If a semantic token doesn't exist, add it to `packages/tokens/src/semantic.css`, don't inline.
- Primitives (`--gray-500`, `--blue-600`) only inside `semantic.css` — never directly in components.
- `--dark-{5..100}` and `--light-{5..100}` are palette-aware alpha scales for overlays/scrims — never flip with theme.
- `--border-accent` auto-follows active `--accent` — don't hardcode an accent color on focused states or featured cards.

**Radius**:

- `rounded-[var(--ds-radius-card)]`, `rounded-[var(--ds-radius-button)]`, `rounded-[var(--ds-radius-input)]`
- Hardcoded `rounded-full` only for: Avatar (lg/full preset), Radio, Toggle, Progress
- Nested radius rule: outer radius > inner radius (never reverse)

---

## Icons

Full reference: `references/icons.md`

- **UI primitives** (arrows, checks, chevrons, status) → `lucide-react`
- **Brand logos** (GitHub, npm, Stripe, etc.) → `@icons-pack/react-simple-icons`
- **Never inline raw `<svg>`** — use an icon library or add a new Lucide/Simple Icons import
- Color via `currentColor` — inherited from parent text color
- Size via `size-4`, `size-5`, `size-6` (not `w-4 h-4` pair)

Per-framework packages swap automatically (Vue: `lucide-vue-next` + `@icons-pack/vue-simple-icons`).

---

## Components

Full reference: `references/components.md`

**File structure** (in order):

```tsx
// 1. Imports
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

// 2. CVA variants — BEFORE interface (interface extends VariantProps<typeof variants>)
const buttonVariants = cva("base classes", {
  variants: { ... },
  defaultVariants: { ... },
});

// 3. Interface — extends native element + VariantProps
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// 4. Component with forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      type="button"
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

// 5. Exports — types first, then values
export type { ButtonProps };
export { Button, buttonVariants };
```

**Rules**:

- `React.forwardRef` on every component that renders a DOM element
- `type="button"` on every `<button>` (prevents accidental form submits)
- CVA for variants, `cn()` for class merging — nothing else
- Section comments (`/* === Section === */`) only in files with 3+ logical sections (provider, toast). Button, Card, Alert: no comments.
- `<p>` rules from typography section apply inside components too

---

## Mobile-first patterns

These rules are baked into the DS components. When composing layouts that use them, respect the responsive behavior — don't override with fixed widths or heights.

**Inputs (Input, SearchInput)**

- `sm` variant: `h-10` on mobile, `h-8` on desktop — larger touch target on phones, compact on desktop
- Already built into the component. Don't override height on mobile with `h-8` or similar.

**TabsList (default variant)**

- `w-full` on mobile (triggers stretch evenly via `flex-1`), `w-auto` + centered on desktop
- Already built into the component. Don't add `w-full` on desktop — it stretches unnecessarily.

**ToggleGroup as tab filter (app blocks)**

- When used as a full-width tab bar: add `className="w-full [&>button]:flex-1 sm:w-auto sm:[&>button]:flex-none"` — items stretch on mobile, hug content on desktop
- NOT built into the component (ToggleGroup has many uses). Apply via className when the context is a tab-like filter row.

**Device/viewport picker (block & template previews)**

- Hide on mobile: `className="hidden md:flex"` on the ToggleGroup
- Default viewport from screen width: `useState(() => window.innerWidth < 768 ? "mobile" : "desktop")`
- Mobile users can't resize iframes meaningfully — always show mobile preview.

---

## Motion

All transitions must use the motion tokens — never hardcode `duration-200` or `ease-out`.

**Duration tokens**:

| Class | Value | Use |
|---|---|---|
| `duration-fast` | `150ms` | Hover tints, focus rings, checkbox toggle, small color changes |
| `duration-normal` | `250ms` | Most UI — input focus, select open, accordion, dropdown items |
| `duration-slow` | `400ms` | Modals, drawers, large scale/fade entrances |

**Easing tokens**:

| Class | Curve | Use |
|---|---|---|
| `ease-soft` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default for UI interactions |
| `ease-smooth` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrance/exit of floating surfaces (popover, toast) |
| `ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful overshoot — rare, only for intentional delight |

**Keyframe utilities** (for mount animations): `animate-fade-up`, `animate-fade-down`, `animate-scale-in`, `animate-slide-in-right/left/up/down`, `animate-fade-out`, `animate-pulse`.

**Rules**:

- Default pairing: `transition-colors duration-fast ease-soft` for hover tints, `transition-all duration-normal ease-soft` for most interactive elements
- Never bare-Tailwind `duration-200` / `ease-in-out` / `duration-[300ms]` on DS components — breaks theme customization
- Transform animations (scale, translate, rotate) use `duration-normal ease-soft` unless it's a large floating surface (then `duration-slow ease-smooth`)
- `@keyframes` lives in `tailwind-theme.css` — add there, never inline
- Provider-level `html` transition on theme flip is already wired (`transition: background-color var(--duration-normal) var(--ease-soft)`) — don't duplicate on `<body>`

---

## Accessibility

Softuq hits WCAG 2.1 AA by default — don't break it.

**Contrast**:

- Semantic text tokens are tuned for ≥4.5:1 on their intended surfaces. `text-fg-primary`, `text-fg-secondary`, `text-fg-muted` all pass AA body-text contrast on `bg-bg-base`, `bg-bg-card`, `bg-bg-elevated`.
- **Never put `text-fg-muted` on `bg-bg-popover` or `bg-accent`** — contrast may drop below AA. Use `text-fg-primary` or `text-fg-inverse`.
- Never hardcode colors that haven't been checked — stick to semantic utilities.

**Focus**:

- Every interactive element needs a visible focus ring. DS components ship with `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base` — don't strip it.
- Use `focus-visible:` (not `focus:`) — keyboard users get the ring, mouse clicks don't show it.
- Custom interactive divs (`role="button"`): add `tabIndex={0}` + focus-visible ring manually.

**Keyboard**:

- Every action must be reachable without a mouse. If you add a click handler to a non-button (`<div onClick>`), convert it to `<button type="button">` or add `role="button" tabIndex={0}` + `onKeyDown` for Enter/Space.
- Modals: trap focus inside, return to trigger on close (Dialog/Sheet handle this — don't roll your own).
- Escape key closes overlays (handled by Dialog, Sheet, Popover, DropdownMenu).

**ARIA & semantics**:

- **Icon-only buttons must have `aria-label`**: `<Button size="icon" aria-label="Close"><X /></Button>`
- Decorative icons beside text: add `aria-hidden="true"` on the icon so screen readers don't double-read
- Use native elements first (`<button>`, `<a href>`, `<nav>`, `<main>`, `<aside>`) — reach for ARIA only when semantics are missing
- Form inputs must have a `<Label htmlFor>` or be wrapped in `<FormField>` (which wires it for you)
- Status messages: `<FormMessage>` uses `role="alert"` automatically — don't duplicate

**Motion**:

- Respect `prefers-reduced-motion` for non-essential animation. Wrap decorative transforms in:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .motion-safe-only { animation: none; transition: none; }
  }
  ```
  or use Tailwind's `motion-safe:animate-fade-up` / `motion-reduce:transition-none` variants.
- Essential transitions (focus ring, theme flip) can stay — they're short and informative.

**Images & media**:

- Every `<img>` needs `alt=""` (decorative) or a meaningful alt. Missing `alt` = fail.
- Iframes (previews, embeds): `title` attribute describing content.

---

## Red flags

If you catch yourself doing any of these, STOP and fix:

| Anti-pattern | Instead |
|---|---|
| `<p>` without `text-*` class | `<p className="text-sm text-fg-secondary">` |
| `<h1 className="text-6xl">` without `text-balance` | Add `text-balance` |
| `className="p-6 gap-4 mt-8"` | `p-[var(--ds-space-card)] gap-[var(--ds-space-gap)] mt-[var(--ds-space-stack)]` |
| `bg-[#111111]` or `color: "#fff"` | `bg-bg-base`, `text-fg-primary` |
| Inline `<svg xmlns=...>` | `<ChevronRight />` from `lucide-react` |
| `<Button><button>...</button></Button>` | `<DialogTrigger asChild><Button>...</Button></DialogTrigger>` |
| Hardcoded `rounded-md` on DS components | `rounded-[var(--ds-radius-card)]` |
| Forced `<br />` in headings | `text-balance` or `&nbsp;` |
| `font-serif` / `font-[Playfair]` on h1/h2 | Use `headingFont` provider axis |
| `w-4 h-4` on icon | `size-4` |
| `h-8` on sm Input/SearchInput (overriding mobile height) | Don't — component already does `h-10 sm:h-8` |
| Full-width TabsList on desktop | Don't — component already does `w-full sm:w-auto sm:self-center` |
| ToggleGroup tab filter without mobile stretch | Add `w-full [&>button]:flex-1 sm:w-auto sm:[&>button]:flex-none` |
| Device picker visible on mobile | Add `hidden md:flex` + default to `"mobile"` viewport |
| `duration-200 ease-in-out` | `duration-normal ease-soft` |
| Hardcoded `cubic-bezier(...)` | `ease-soft` / `ease-smooth` / `ease-bounce` |
| Icon-only `<Button>` without `aria-label` | `<Button aria-label="Close"><X /></Button>` |
| `<div onClick={...}>` as interactive | `<button type="button">` (or `role="button" tabIndex={0}` + `onKeyDown`) |
| `focus:` ring (shows on mouse click) | `focus-visible:` ring |
| `<img>` without `alt` | `alt=""` (decorative) or meaningful alt |

---

## When you're unsure

- Spacing granularity? → Read `references/spacing.md`
- Right text size for this context? → Read `references/typography.md`
- Which semantic color? → Read `references/tokens.md`
- How to build a new component? → Read `references/components.md` and copy the shape from `examples/component.tsx`

Full project docs live at `docs/` (tokens, guides, component pattern). For live reference visit `softuq.com/foundations`.

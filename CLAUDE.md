# DesignYstem

Custom design system. shadcn/ui-style, soft UI / neumorphic aesthetic.

## Quick reference

- **Monorepo**: pnpm workspaces — `packages/{tokens,tailwind,react,cli,docs}`
- **Distribution**: tokens as npm, components copied via CLI (like shadcn)
- **Variants**: CVA (class-variance-authority) + `cn()` helper
- **Icons**: lucide-react
- **Theme**: `data-theme="dark"` (default) / `data-theme="light"` on `<html>`
- **Tailwind**: v4 — config via `@theme` in CSS, not config file

## Token system

3 layers: primitive → semantic → component (planned).

- Primitives: `packages/tokens/src/primitives.css`
- Semantic (dark/light): `packages/tokens/src/semantic.css`
- Tailwind v4 mapping: `packages/docs/src/app/globals.css`

## Docs

- [Design Plan](docs/plans/2026-03-16-designystem-design.md) — overview, component list, planned work
- [Spacing](docs/tokens/spacing.md) — 4px grid
- [Typography](docs/tokens/typography.md) — Major Third scale, fluid clamp()
- [Colors](docs/tokens/colors.md) — palettes, semantic dark/light mapping
- [Shadows](docs/tokens/shadows.md) — neumorphic + glass
- [Border Radius](docs/tokens/radius.md) — scale + nested rule
- [Animation](docs/tokens/animation.md) — easing, duration, keyframes, z-index
- [Tailwind v4 Guide](docs/guides/tailwind-v4.md) — @theme, @source
- [Component Pattern](docs/guides/component-pattern.md) — CVA template

## Dev

```bash
pnpm install    # install deps
pnpm dev        # docs preview on localhost:3333
```

## Origin

Design from [TaskStaq](/Users/michalmarek/Documents/Projects/TaskStaq). UX patterns from [design-patterns-mcp](/Users/michalmarek/Documents/Projects/design-patterns-mcp).

# DesignYstem — Design Plan

**Date:** 2026-03-16
**Status:** In Progress

## Vision

Custom design system library. Soft UI / neumorphic aesthetic from TaskStaq. Multi-framework (React → Svelte → Astro). CLI distribution.

## Architecture

Monorepo (pnpm workspaces): `tokens`, `tailwind`, `react`, `cli` (planned), `docs`.

Hybrid distribution: tokens as npm packages, components copied via CLI.

## Components (v0.1 — 36)

**Form:** Button, Input, Textarea, Select (single + multi), Search (with whisper dropdown), Checkbox, Radio, Toggle, ToggleGroup, Slider, Label, FormField, FormDescription, FormMessage
**Display:** Card, Badge, Tag, Avatar, Separator, Progress, Skeleton, Spinner, Squircle, Table
**Typography:** Code, Kbd
**Feedback:** Alert, Toast, Tooltip, Empty
**Navigation:** Tabs, Accordion, Breadcrumb, Pagination
**Overlay:** Dialog, Sheet, Popover, DropdownMenu

**Planned (v0.2):** NavigationMenu, Command Palette, ContextMenu, HoverCard, Combobox, Calendar, DatePicker, Drawer

## Token reference

- [Spacing](../tokens/spacing.md) — 4px base grid
- [Typography](../tokens/typography.md) — Major Third scale, fluid clamp()
- [Colors](../tokens/colors.md) — 7 palettes, semantic dark/light, 5-variant status scale (base/hover/muted/border/text)
- [Shadows](../tokens/shadows.md) — sm/md/lg scale, palette-tinted light mode, glass
- [Border Radius](../tokens/radius.md) — xs (4px) to full (pill)
- [Animation](../tokens/animation.md) — Easing, duration, keyframes, z-index

## Guides

- [Tailwind v4](../guides/tailwind-v4.md) — @theme setup, @source directives
- [Component Pattern](../guides/component-pattern.md) — CVA template, rules
- [Theming](../guides/theming.md) — DesignYstemProvider, palette/accent/radius/spacing/font

## Planned work

- [x] Theming system (palette, accent, radius, spacing, font via DesignYstemProvider)
- [x] Biome (linting & formatting)
- [x] OKLCH color migration
- [x] CLI tool (`npx designystem init/add/list/diff/update`)
- [x] Light mode fine-tuning (palette-tinted shadows, 5-variant status colors)
- [ ] Svelte 5 components
- [ ] Astro components
- [ ] design-patterns-mcp knowledge integration (104 UX patterns)
- [ ] Claude Code skill

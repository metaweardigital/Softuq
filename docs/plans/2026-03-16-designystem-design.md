# DesignYstem — Design Plan

**Date:** 2026-03-16
**Status:** In Progress

## Vision

Custom design system library. Soft UI / neumorphic aesthetic from TaskStaq. Multi-framework (React → Svelte → Astro). CLI distribution.

## Architecture

Monorepo (pnpm workspaces): `tokens`, `tailwind`, `react`, `cli` (planned), `docs`.

Hybrid distribution: tokens as npm packages, components copied via CLI.

## Components (v0.1 — 26)

**Form:** Button, Input, Textarea, Select (single + multi), Checkbox, Radio, Toggle, Label, FormField, FormDescription, FormMessage
**Display:** Card, Badge, Tag, Avatar, Separator, Progress, Skeleton
**Typography:** Code
**Feedback:** Alert, Toast, Tooltip
**Navigation:** Tabs, Accordion
**Overlay:** Dialog, Sheet

**Planned (v0.2):** DropdownMenu, NavigationMenu, Command Palette, Table, Popover

## Token reference

- [Spacing](../tokens/spacing.md) — 4px base grid
- [Typography](../tokens/typography.md) — Major Third scale, fluid clamp()
- [Colors](../tokens/colors.md) — 7 palettes, semantic dark/light mapping
- [Shadows](../tokens/shadows.md) — Neumorphic raised/pressed/floating + glass
- [Border Radius](../tokens/radius.md) — xs (4px) to full (pill)
- [Animation](../tokens/animation.md) — Easing, duration, keyframes, z-index

## Guides

- [Tailwind v4](../guides/tailwind-v4.md) — @theme setup, @source directives
- [Component Pattern](../guides/component-pattern.md) — CVA template, rules

## Planned work

- [x] Theming system (palette, accent, radius, spacing via DesignYstemProvider)
- [x] Biome (linting & formatting)
- [x] OKLCH color migration
- [ ] CLI tool (`npx designystem init/add/list/diff`)
- [ ] Svelte 5 components
- [ ] Astro components
- [ ] design-patterns-mcp knowledge integration (104 UX patterns)
- [ ] Claude Code skill
- [ ] Light mode fine-tuning

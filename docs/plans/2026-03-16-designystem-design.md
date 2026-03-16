# DesignYstem — Design Document

**Date:** 2026-03-16
**Status:** In Progress

## Vision

Vlastní design system knihovna inspirovaná shadcn/ui s unikátním soft UI / neumorphic designem z TaskStaq projektu. Multi-framework podpora (React → Svelte → Astro), distribuce přes CLI.

## Architektura

### Monorepo (pnpm workspaces)

```
designystem/
├── packages/
│   ├── tokens/          # @designystem/tokens — CSS proměnné
│   ├── tailwind/        # @designystem/tailwind — Tailwind preset
│   ├── react/           # @designystem/react — React komponenty
│   ├── cli/             # CLI nástroj (planned)
│   └── docs/            # Next.js preview stránka
├── knowledge/           # UX patterns knowledge base (planned)
├── skills/              # Claude Code skill (planned)
└── docs/plans/          # Design dokumenty
```

### Distribuce (Hybrid model)

- **Tokeny & Tailwind preset** → npm balíčky (`@designystem/tokens`, `@designystem/tailwind`)
- **Komponenty** → kopírované přes CLI do projektu (jako shadcn)
- Uživatel vlastní kód komponent, může je upravovat
- Tokeny zůstávají konzistentní napříč projekty

## Token systém (3 vrstvy)

### 1. Primitive tokeny
Raw hodnoty bez sémantického významu:
- `--gray-50` až `--gray-980` (18 odstínů)
- `--blue-50` až `--blue-900`, `--red-*`, `--green-*`, `--amber-*`, `--emerald-*`, `--violet-*`
- `--radius-xs` (4px) až `--radius-full` (9999px)
- `--space-0` (0) až `--space-16` (64px)
- Fluid typography: `--text-xs` až `--text-4xl` (clamp)
- Easing: `--ease-soft`, `--ease-bounce`, `--ease-smooth`

### 2. Semantic tokeny
Účelově pojmenované, mapované z primitiv, **themed per mode**:

| Token | Dark | Light |
|---|---|---|
| `--bg-base` | `--gray-980` (#080808) | `--gray-50` (#fafafa) |
| `--bg-elevated` | `--gray-940` (#111111) | white |
| `--bg-card` | `--gray-920` (#141414) | white |
| `--text-primary` | `--gray-100` (#f5f5f5) | `--gray-980` (#080808) |
| `--text-secondary` | `--gray-500` (#8a8a8a) | `--gray-600` (#6b7280) |
| `--accent` | `--blue-500` | `--blue-600` |
| `--destructive` | `--red-500` | `--red-600` |
| `--border-subtle` | rgba(255,255,255,0.08) | rgba(0,0,0,0.06) |

Neumorphic stíny:
- **Raised**: světlý highlight vlevo nahoře + tmavý stín vpravo dole
- **Pressed**: inset varianta
- **Floating**: velký drop shadow pro modály/popovers

### 3. Component tokeny (planned)
`--button-bg`, `--card-border` atd. — pro maximální granularitu.

## Komponenty

### Technologie
- **CVA** (class-variance-authority) pro varianty
- **cn()** helper (clsx + tailwind-merge) pro class merging
- **React.forwardRef** na všech komponentách
- **TypeScript** — plné typy, exportované interfaces

### Seznam (v0.1 — 21 komponent)

**Form elements:** Button, Input, Textarea, Select, Checkbox, Radio, Toggle, Label
**Data display:** Card, Badge, Avatar, Separator, Progress, Skeleton
**Feedback:** Alert, Toast, Tooltip
**Navigation:** Tabs, Accordion
**Overlay:** Dialog, Sheet

### Plánované (v0.2)
DropdownMenu, NavigationMenu, Command Palette, Table, Popover

## CLI nástroj (planned)

```bash
npx designystem init              # Setup projekt
npx designystem add button        # Přidej komponentu
npx designystem add button card   # Víc najednou
npx designystem list              # Seznam komponent
npx designystem diff button       # Diff proti originálu
```

`init` flow:
1. Detekce frameworku (React/Svelte/Astro)
2. Instalace `@designystem/tokens`
3. Vytvoření `designystem.config.json`
4. Setup Tailwind presetu / @theme
5. Vytvoření `src/components/ui/` + `utils.ts`

## Knowledge integrace (planned)

- 104 UX/psychology patterns z `design-patterns-mcp`
- MCP server pro Claude Code — přístup k patternům při vývoji
- Patterns: Hick's Law, Fitts's Law, Cognitive Load, Progressive Disclosure, ...

## Design principy

Z TaskStaq soft UI designu (Jobs/Ive inspirace):
1. **Simplicity is architecture** — každý element musí odůvodnit svou existenci
2. **Hierarchy drives everything** — jasná vizuální hierarchie
3. **Whitespace is a feature** — vzdušný layout
4. **The Inevitability Test** — design by měl vypadat jako jediné správné řešení

## Multi-framework plán

| Fáze | Framework | Stav |
|---|---|---|
| 1 | React | V0.1 hotovo |
| 2 | Svelte 5 | Planned |
| 3 | Astro | Planned |

Sdílené: tokeny, Tailwind CSS, design principles
Per-framework: komponenty, CLI templates

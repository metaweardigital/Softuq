# DesignYstem

Custom design system. Soft UI / neumorphic aesthetic. Copy-paste component distribution.

## Quick reference

- **Monorepo**: pnpm workspaces — `packages/{tokens,tailwind,react,cli,docs}`
- **Distribution**: tokens as npm, components copied via CLI
- **Variants**: CVA (class-variance-authority) + `cn()` helper
- **Icons**: lucide-react
- **Colors**: OKLCH color space (not hex, not HSL)
- **Theme**: `data-theme="dark"` (default) / `data-theme="light"` on `<html>`
- **Tailwind**: v4 — config via `@theme` in CSS, not config file
- **Linter**: Biome (not Prettier/ESLint)

## Token system

3 layers: primitive → semantic → component.

- Primitives: `packages/tokens/src/primitives.css` (OKLCH values)
- Semantic (dark/light): `packages/tokens/src/semantic.css`
- Component (radius/spacing): `packages/react/src/designystem-provider.tsx`
- Tailwind v4 mapping: `packages/docs/src/app/globals.css`

## Theming (DesignYstemProvider)

4 axes, ordered from most global to most specific:

1. **Palette** (gray tint): neutral / zinc / stone / slate / mauve / olive
2. **Accent** (brand color): blue / violet / emerald / amber / red / rose / cyan / orange
3. **Radius** (border radius): none / sm / md / lg / full
4. **Spacing** (density): sm / md / lg
5. **Font** (typeface): system / inter / geist

Per-component override via `className` — not extra props.

## Conventions

### File organization
- Provider: `packages/react/src/designystem-provider.tsx` (beside index.ts, not in components/ui/)
- Components: `packages/react/src/components/ui/`
- Utilities: `packages/react/src/lib/`

### Comments
- Section dividers (`/* === Section === */`) only in files with 3+ logical sections (provider, toast)
- No section comments in simple components (button, alert, card) — structure is obvious from code
- No inline comments unless logic is non-obvious

### Ordering within files
Always order from most global → most specific:
- **Provider file**: Types → Presets (palette → accent → radius → spacing) → Context & Hook → Provider → Exports
- **Component file**: Imports → CVA variants → Interface (extends VariantProps) → Component → Exports
- **Exports**: types first, then values
- CVA must come before interface because `VariantProps<typeof variants>` depends on it

### Naming conventions
- CSS variables: `--ds-{foundation}-{property}` (e.g. `--ds-radius-button`, `--ds-space-card`)
- Semantic tokens: no prefix (e.g. `--accent`, `--bg-card`, `--text-primary`)
- Primitive tokens: `--{color}-{shade}` (e.g. `--gray-500`, `--blue-600`)
- Presets use consistent scale names: `sm / md / lg` (not compact/default/spacious)
- Components reference vars via `rounded-[var(--ds-radius-card)]`, `p-[var(--ds-space-card)]`

### Color values
- All colors in OKLCH: `oklch(L C H)` or `oklch(L C H / alpha)`
- Never use hex or rgba in token files
- Gray scale: lightness 0.12–0.985, chroma 0 (neutral) or 0.002–0.042 (tinted)

### Spacing
- All values on 4px grid
- Base spacing scale: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

### Components
- CVA for variants, `cn()` for class merging
- `React.forwardRef` on all components
- `type="button"` on all `<button>` elements
- Export: component, variants, props type
- Hardcoded `rounded-full` stays for: Avatar (lg/full preset), Radio, Toggle, Progress
- Badge = static indicator (status, count) — never interactive
- Tag = interactive label (dismissible, hover/focus states) — used in multi-select
- Select: composable API (Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator), supports single + multi (`multiple` prop), auto-flip positioning
- Select multi-select: responsive tags with `maxTags` prop (default 2), `+N` counter, width-based breakpoints (<250px → "N selected" text, 250-400px → maxTags, >400px → maxTags+1), fade-edge overlay
- FormField wraps Label + Input/Select/Textarea + FormDescription + FormMessage; `size` prop cascades to children
- Scrollbar utilities: `.scrollbar-thin` (4px styled), `.scrollbar-hidden` (no scrollbar)
- Fade-edge utilities: `.fade-edge-r/l/t/b` — mask-based gradient fade with theme-transitioning `background-color` (not `background-image` which can't transition)
- See [Component Pattern](docs/guides/component-pattern.md) for full template

## Docs

- [Design Plan](docs/plans/2026-03-16-designystem-design.md) — overview, component list, planned work
- [Spacing](docs/tokens/spacing.md) — 4px grid
- [Typography](docs/tokens/typography.md) — Major Third scale, fluid clamp()
- [Colors](docs/tokens/colors.md) — palettes, semantic dark/light mapping
- [Shadows](docs/tokens/shadows.md) — neumorphic + glass
- [Border Radius](docs/tokens/radius.md) — scale + nested rule
- [Animation](docs/tokens/animation.md) — easing, duration, keyframes, z-index
- [Tailwind v4 Guide](docs/guides/tailwind-v4.md) — @theme, @source
- [Component Pattern](docs/guides/component-pattern.md) — CVA template, theming override
- [Theming Guide](docs/guides/theming.md) — DesignYstemProvider, palette/accent/radius/spacing presets

## CLI

CLI tool for adding DesignYstem to any project. Located in `packages/cli/`.

```bash
npx designystem init          # setup tokens, utils, provider, globals.css
npx designystem add button    # copy component files + install deps
npx designystem add --all     # add all components
npx designystem list          # show available components
```

- `init` detects framework (React/Svelte), package manager, and project structure
- `init` writes tokens + @theme to separate CSS files imported via `@import` (avoids circular var() refs in Tailwind v4)
- `add` resolves transitive registry deps (e.g. select → tag)
- `add` rewrites import paths (`../../lib/utils` → `@/lib/utils`)
- Registry: `packages/cli/src/registry/react.json` — maps components to files, npm deps, internal deps

## Dev

```bash
pnpm install    # install deps
pnpm dev        # docs preview on localhost:3333
pnpm lint       # biome check
pnpm lint:fix   # biome auto-fix
pnpm format     # biome format
```

## Origin

Design from [TaskStaq](/Users/michalmarek/Documents/Projects/TaskStaq). UX patterns from [design-patterns-mcp](/Users/michalmarek/Documents/Projects/design-patterns-mcp).

# DesignYstem

Custom design system library inspired by shadcn/ui with soft UI / neumorphic aesthetic.

## Architecture

**Monorepo** (pnpm workspaces) with these packages:

| Package | Path | Purpose |
|---|---|---|
| `@designystem/tokens` | `packages/tokens/` | CSS variables — primitives + semantic (dark/light) |
| `@designystem/tailwind` | `packages/tailwind/` | Tailwind CSS preset (v3 compat, v4 uses `@theme` in globals.css) |
| `@designystem/react` | `packages/react/` | React components with CVA variants |
| `@designystem/docs` | `packages/docs/` | Next.js preview page (port 3333) |
| CLI (planned) | `packages/cli/` | `npx designystem add <component>` |

## Design Decisions

- **Hybrid distribution**: tokens as npm package, components copied via CLI (like shadcn)
- **CVA** (class-variance-authority) for all component variants + `cn()` helper (clsx + tailwind-merge)
- **3-layer token system**: primitive → semantic → component
- **Dark mode first**: `data-theme="dark"` (default) / `data-theme="light"` on `<html>`
- **Neumorphic shadows**: `--shadow-neu-raised`, `--shadow-neu-pressed`, `--shadow-neu-floating`
- **Glassmorphism**: `--glass-bg`, `--glass-border`, `--glass-blur`

## Token System

### Primitives (`packages/tokens/src/primitives.css`)
Raw values with no semantic meaning:
- Colors: gray (50-980), blue, red, green, amber, emerald, violet
- Typography: fluid `clamp()` sizes, SF Pro / system-ui font stack
- Spacing: 4px base grid
- Radius: xs(4px) → full(9999px)
- Easing: soft, bounce, smooth

### Semantic (`packages/tokens/src/semantic.css`)
Purpose-driven tokens mapped from primitives, themed per mode:
- `--bg-base`, `--bg-elevated`, `--bg-card`, `--bg-input`
- `--text-primary`, `--text-secondary`, `--text-muted`
- `--accent`, `--destructive`, `--success`, `--warning` (each with hover/muted/text)
- `--border-subtle`, `--border-default`, `--border-strong`
- `--shadow-neu-raised`, `--shadow-neu-pressed`, `--shadow-neu-floating`

## Tailwind v4

In Tailwind v4, theme is configured via `@theme` block in CSS (NOT via preset/config file).
All semantic tokens are mapped in `packages/docs/src/app/globals.css`.

Key: `@source` directives must include component paths so Tailwind scans them:
```css
@source "../../../../packages/react/src/**/*.tsx";
```

## Components (React)

21 components, all with TypeScript types and CVA variants:

| Component | Variants | Sizes |
|---|---|---|
| Button | default, secondary, ghost, outline, destructive, link | sm, md, lg, icon |
| Card | default, elevated, interactive | — |
| Input | default, error, success | sm, md |
| Textarea | default, error | — |
| Select | default, error | sm, md |
| Label | default, required | sm, md |
| Badge | default, secondary, outline, destructive, success, warning | sm, md |
| Toggle | — | sm, md |
| Checkbox | default, error | sm, md |
| RadioGroup | — | sm, md |
| Avatar | — | sm, md, lg |
| Separator | horizontal, vertical | — |
| Skeleton | default, circle, text | — |
| Alert | info, success, warning, error | — |
| Progress | — | sm, md |
| Tabs | default, pills, underline | sm, md |
| Dialog | — | sm, md, lg, fullscreen |
| Tooltip | top, bottom, left, right | — |
| Toast | default, success, error, warning | — |
| Accordion | default, bordered | — |
| Sheet | left, right, top, bottom | sm, md, lg |

## Component Pattern

Every component follows this pattern:
```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const componentVariants = cva("base-classes", {
  variants: { variant: { ... }, size: { ... } },
  defaultVariants: { ... },
});

interface ComponentProps extends React.HTMLAttributes<...>, VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<..., ComponentProps>(({ className, variant, size, ...props }, ref) => (
  <element ref={ref} className={cn(componentVariants({ variant, size, className }))} {...props} />
));
```

## Development

```bash
pnpm install          # Install all dependencies
pnpm dev              # Start docs preview on localhost:3333
```

## Design Origin

Based on TaskStaq project (`/Users/michalmarek/Documents/Projects/TaskStaq`) soft UI design:
- SF Pro / system-ui fonts
- Neumorphic raised/pressed/floating shadows
- Glassmorphism nav
- Border-shine & orbit animations
- Mobile-first responsive

## Related Projects

- **design-patterns-mcp** (`/Users/michalmarek/Documents/Projects/design-patterns-mcp`): MCP server with 104 UX/psychology patterns — planned integration as knowledge base
- **TaskStaq**: Source of the design language

## Planned Work

- [ ] CLI tool (`npx designystem init/add/list/diff`)
- [ ] Svelte 5 components
- [ ] Astro components
- [ ] Integrate design-patterns-mcp knowledge
- [ ] Claude Code skill for working with this DS
- [ ] Light mode fine-tuning
- [ ] NavigationMenu, DropdownMenu components
- [ ] Storybook or custom docs site

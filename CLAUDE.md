# Softuq

Custom design system. Soft UI aesthetic. Copy-paste component distribution.

## Interaction rules

- **When asked a question, ANSWER it.** Do not start editing files or writing code. Answer first, wait for instruction.
- Questions end with `?` or are phrased as "jak", "co", "proc", "jestli", "resi se" etc. — always respond with an answer, never with an action.

## Quick reference

- **Monorepo**: pnpm workspaces — `packages/{tokens,tailwind,react,cli,docs}`
- **Distribution**: tokens as npm, components copied via CLI
- **Variants**: CVA (class-variance-authority) + `cn()` helper
- **Icons**: `lucide-react` for UI primitives + `@icons-pack/react-simple-icons` for brand logos. Never inline raw SVG. Per-framework packages swap automatically (e.g. `lucide-vue-next` + `@icons-pack/vue-simple-icons` for Vue). See `/foundations/icons`.
- **Colors**: OKLCH color space (not hex, not HSL)
- **Theme**: `data-theme="dark"` (default) / `data-theme="light"` on `<html>`
- **Tailwind**: v4 — config via `@theme` in CSS, not config file
- **Linter**: Biome (not Prettier/ESLint)

## Token system

3 layers: primitive → semantic → component.

- Primitives: `packages/tokens/src/primitives.css` (OKLCH values)
- Semantic (dark/light): `packages/tokens/src/semantic.css`
- Component (radius/spacing): `packages/react/src/softuq-provider.tsx`
- Tailwind v4 mapping: `packages/docs/src/app/globals.css`

## Theming (SoftuqProvider)

5 axes, ordered from most global to most specific:

1. **Palette** (gray tint): neutral / zinc / stone / slate / mauve / olive
2. **Accent** (brand color): blue / violet / emerald / amber / red / rose / cyan / orange
3. **Radius** (border radius): none / sm / md / lg / full
4. **Spacing** (density): sm / md / lg
5. **Font** (typeface): system / inter / geist

Per-component override via `className` — not extra props.

## Conventions

### File organization

- Provider: `packages/react/src/softuq-provider.tsx` (beside index.ts, not in components/ui/)
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
- Tailwind v4 color mapping: `--color-surface-*` (backgrounds), `--color-fg-*` (text), `--color-edge-*` (borders) → avoids `bg-bg-`, `text-text-`, `border-border-` duplication

### Color values

- All colors in OKLCH: `oklch(L C H)` or `oklch(L C H / alpha)`
- Never use hex or rgba in token files
- Gray scale: lightness 0.12–0.985, chroma 0 (neutral) or 0.002–0.042 (tinted)
- Muted variants use `color-mix(in oklch, var(--color) N%, transparent)` — auto-derives from base color
- Background elevation order (dark): `bg-base → bg-input → bg-card → bg-elevated → bg-popover`
- Light mode shadows: palette-tinted via `color-mix` with `var(--gray-500)`, dark mode: plain black high opacity
- Non-changing scales `--dark-{5..90,100}` (gray-980 alpha) and `--light-{5..90,100}` (gray-50 alpha) live in a separate `:root {}` block in `semantic.css` — palette-aware, never flip with theme. Use for overlays, imagery scrims, theme-independent chips (e.g. block hover badges in template previews). `-100` = solid.
- `--border-accent` follows the active `--accent` (never hardcoded to a palette color) — featured cards, focused inputs, and accent borders auto-recolor when the user changes accent.

### Typography

- Body scale: `text-sm` (13→15px), `text-base` (15→18px), `text-lg` (17→20px) — deliberate ~15–20% mobile→desktop bump for readability
- **Always set explicit `text-*` on `<p>`** — never inherit browser default (16px fixed, no fluid scaling)
- Paragraph hierarchy: hero lead under H1 = `text-base sm:text-lg`, section description under H2 = `text-base`, in-card description = `text-sm`, caption/helper = `text-xs`
- **H1/H2 always get `text-balance`** — prevents single-word last lines (widows) on large titles. Never rely on forced `<br />`. Escape hatch: `&nbsp;` between last 2–3 words when balance doesn't break where you want
- Inputs (`Input`, `Textarea`, `SearchInput`) are pinned to `text-[16px] sm:text-{xs|sm}` — mobile floor at 16px prevents iOS Safari auto-zoom on focus. `Select` is exempt (custom popover, not native input)

### Spacing

- All values on 4px grid
- Base spacing scale: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64
- Stack hierarchy: `--ds-space-stack-sm` (title↔desc) < `--ds-space-stack` (group gap) < `--ds-space-stack-lg` (header→content)
- Page padding: `--ds-space-page-x` — fluid `clamp()`, scales with viewport
- Section vertical: `--ds-space-section-y` — fluid `clamp()`, web sections only
- Web blocks use `px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]`
- App blocks use `p-[var(--ds-space-app-page-x)]` + `space-y-[var(--ds-space-app-stack)]` + `gap-[var(--ds-space-app-gap)]`
- App spacing tokens (`--ds-space-app-*`) cap at web `md` values on the `lg` preset — app UI stays denser than marketing pages
- Button/ToggleGroup gap scales per size: sm `gap-1.5` (6px), md `gap-2` (8px), lg `gap-2.5` (10px) — always smaller than side padding
- SidebarNav includes a sticky mobile topbar (`md:hidden`) with hamburger trigger — don't add SidebarTrigger manually in children

### Mobile-first responsive

- Input / SearchInput `sm`: `h-10 sm:h-8` — built into component, don't override mobile height
- TabsList (default): `w-full sm:w-auto sm:self-center` — triggers `flex-1 sm:flex-none`. Built into component.
- ToggleGroup as tab filter: add `className="w-full [&>button]:flex-1 sm:w-auto sm:[&>button]:flex-none"` — NOT built into component (ToggleGroup has many uses), apply via className
- Device/viewport picker: `hidden md:flex` on ToggleGroup, default viewport from `window.innerWidth < 768`

### Components

- CVA for variants, `cn()` for class merging
- `React.forwardRef` on all components
- `type="button"` on all `<button>` elements
- Export: component, variants, props type
- Hardcoded `rounded-full` stays for: Avatar (lg/full preset), Radio, Toggle, Progress
- Breadcrumb: composable API (Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis). `BreadcrumbCollapsed` wraps ellipsis + DropdownMenu for collapsed middle levels. Home icon = `<Home />` as BreadcrumbLink children. BreadcrumbSeparator is `<li>` — must be sibling of BreadcrumbItem, never nested inside it. Internal dep: dropdown-menu.
- Badge = static indicator (status, count) — never interactive
- Tag = interactive label (dismissible, hover/focus states) — used in multi-select
- Select: composable API (Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator), supports single + multi (`multiple` prop), auto-flip positioning
- Select multi-select: responsive tags with `maxTags` prop (default 2), `+N` counter, width-based breakpoints (<250px → "N selected" text, 250-400px → maxTags, >400px → maxTags+1), fade-edge overlay
- Search: composable API (Search, SearchInput, SearchContent, SearchItem, SearchGroup), whisper dropdown with auto-flip, keyboard nav (arrows/Enter/Escape/Tab). SearchInput works standalone (no wrapper needed). Props: `loading`, `tags`, `shortcut` (Kbd hints). Internal deps: Tag, Kbd.
- FormField wraps Label + Input/Select/Textarea + FormDescription + FormMessage; `size` prop cascades to children
- Scrollbar utilities: `.scrollbar-thin` (4px styled), `.scrollbar-hidden` (no scrollbar)
- Fade-edge utilities: `.fade-edge-r/l/t/b` — mask-based gradient fade with theme-transitioning `background-color` (not `background-image` which can't transition)
- Code = inline code snippet (hover effect, border). CodeBlock = block-level with syntax highlighting, copy-to-clipboard, always-dark (`data-theme="dark"`). `language` prop picks the highlighter: `auto` (default, JS/TSX/shell), `md`/`markdown` (headings, inline code, bold, lists, links), `plain` (no highlighting). CodeBlock uses `style` props with semantic CSS vars (`var(--bg-card)`, `var(--text-secondary)`, etc.) for colors — Tailwind `@theme` vars don't resolve correctly on child `data-theme` elements. Radius/spacing use Tailwind arbitrary values (`var(--ds-radius-card)`, `var(--ds-space-card)`) since those aren't in `@theme`. Single-pass regex per flavor for syntax highlighting (never multi-pass — later rules corrupt HTML from earlier ones). Internal dep: lucide-react.
- DialogTrigger supports `asChild` prop — pass `<Button>` as child instead of nesting `<button>` in `<button>`
- NavigationMenu: composable API (NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport). Hover-triggered with delay (150ms enter, 300ms leave). Viewport rendered internally by NavigationMenu (NavigationMenuViewport is a no-op for API compat). Content uses `createPortal` into viewport. Viewport position clamped to nav bounds. NavigationMenuLink has `active` prop + `asChild`. `navigationMenuTriggerStyle()` for standalone link styling, `navigationMenuActiveClass` for active state. Internal dep: lucide-react.
- SectionNav: composable sidebar navigation (SectionNav, SectionNavGroup, SectionNavItem). SectionNav auto-tracks visible sections via IntersectionObserver (`observeSelector`, `observeRootMargin` props) or accepts controlled `activeId`. SectionNavGroup renders letter/category headings (clickable when `firstSectionId` provided). SectionNavItem smooth-scrolls to target section, highlights active via context. Dogfooded on `/components` page with alphabetical letter groups. Mobile: `size-1.5` dots inheriting text color (`bg-current`) — accent when active, muted when inactive.
- See [Component Pattern](docs/guides/component-pattern.md) for full template

### Blocks

Blocks live in `packages/docs/src/blocks/web/*` and `packages/docs/src/blocks/app/*`. They are **self-contained showcase sections** (hero, navbar, faq, footer, etc.) — demoed on `/blocks`, composed into templates, and dogfooded by the docs site itself.

- **Slot-based pattern** — every block ships with sensible defaults so it renders standalone on `/blocks`, but exposes slots for real-world use. Typical props: `logo` / `brand` (ReactNode), `links` (array of `{label, href, matchPrefix?}`), `actions` (ReactNode), `linkComponent` (default `"a"`, pass Next `Link` for client routing), `currentPath` (for active-link styling). Defaults mirror a demo brand ("Acme" + Sparkles); overrides flow in via props.
- **Dogfooding** — the docs site's `_components/navbar.tsx` wraps `NavbarMega` (not a hand-rolled header). Home page FAQ + footer use `FaqAccordion` and `FooterMinimal`. When adding marketing sections to the docs site, reach for a block first.
- **Content props for copy-heavy blocks** — FAQ-style blocks accept `{q, a}[]` where `a` can be a string (renders as `<p className="text-sm text-fg-muted">`) or a ReactNode (rendered as-is, for inline `<Code>` or links).
- **Refactoring existing blocks to be slot-based** follows `NavbarSimple` → `FaqAccordion` → `FooterMinimal`: extract defaults into a `DEFAULT_*` const, make each slot optional with a fallback, leave existing `<BlockName />` (no-args) usage working.

## Docs

- [Design Plan](docs/plans/2026-03-16-softuq-design.md) — overview, component list, planned work
- [Spacing](docs/tokens/spacing.md) — 4px grid
- [Typography](docs/tokens/typography.md) — Major Third scale, fluid clamp()
- [Colors](docs/tokens/colors.md) — palettes, semantic dark/light mapping
- [Shadows](docs/tokens/shadows.md) — sm/md/lg/inset, palette-tinted light mode, glass
- [Border Radius](docs/tokens/radius.md) — scale + nested rule
- [Animation](docs/tokens/animation.md) — easing, duration, keyframes, z-index
- [Icons](docs/tokens/icons.md) — Lucide (UI) + Simple Icons (brand), per-framework packages, coloring via currentColor
- [Tailwind v4 Guide](docs/guides/tailwind-v4.md) — @theme, @source
- [Component Pattern](docs/guides/component-pattern.md) — CVA template, theming override
- [Theming Guide](docs/guides/theming.md) — SoftuqProvider, palette/accent/radius/spacing presets
- [Design Skill](skills/softuq/SKILL.md) — AI coding-agent rules (bundled into CLI via `softuq skill`)

## CLI

CLI tool for adding Softuq to any project. Published as [`softuq`](https://www.npmjs.com/package/softuq) on npm. Source in `packages/cli/`.

```bash
npx softuq init          # setup tokens, utils, provider, globals.css
npx softuq add button    # copy component files + install deps
npx softuq add --all     # add all components
npx softuq list          # show available components
npx softuq diff          # show which components have upstream updates
npx softuq update        # pull updated components (with confirmation)
npx softuq skill         # install design skill to .claude/skills/ (project)
npx softuq skill -g      # install globally to ~/.claude/skills/
```

- `init` detects framework (React/Svelte), package manager, and project structure
- `init` copies `lib/tokens.ts` (JS token values) + rewrites provider import (`@softuq/tokens` → `@/lib/tokens`)
- `init` writes tokens + @theme to separate CSS files imported via `@import` (avoids circular var() refs in Tailwind v4)
- `add` resolves transitive registry deps (e.g. select → tag)
- `add` rewrites import paths (`../../lib/utils` → `@/lib/utils`)
- `diff` compares local component files against upstream source (normalizes import paths for comparison)
- `update` pulls changed components with confirmation prompt, installs new deps if needed
- Registry: `packages/cli/src/registry/react.json` — maps components to files, npm deps, internal deps
- Getting started tutorial: `/getting-started` page in docs app
- `skill` copies `skills/softuq/` (AI coding-agent rules) to `.claude/skills/softuq/` in CWD, or `~/.claude/skills/...` with `--global`. Prompts before overwrite unless `--yes` or `--overwrite`. Skill source is bundled into the tarball the same way as templates.
- Component templates + skill are bundled into the published tarball — `prepublishOnly` → `scripts/sync-templates.mjs` copies `packages/react/src` → `packages/cli/templates/react/` and `skills/softuq/` → `packages/cli/skill/`. `getSourceDir()` in `src/utils/registry.ts` and `getSkillSource()` in `src/commands/skill.ts` prefer the bundled copy (npm install) and fall back to the monorepo source (dev). Both `packages/cli/templates/` and `packages/cli/skill/` are gitignored.

## Dev

```bash
pnpm install    # install deps
pnpm dev        # docs preview on localhost:3333
pnpm lint       # biome check
pnpm lint:fix   # biome auto-fix
pnpm format     # biome format
```

- No test suite — verify changes by running `pnpm dev` and exercising the docs site.

- `pnpm build` kills the running dev server and leaves stale `.next` cache → always clean up after build:
  ```bash
  lsof -ti:3333 | xargs kill -9 2>/dev/null; rm -rf packages/docs/.next
  pnpm dev
  ```
- If dev server returns 500 or won't start, first nuke `.next`: `rm -rf packages/docs/.next`

## Deploy & Publish

### Docs site — Railway

Live at [softuq.com](https://softuq.com). Hosted on Railway, auto-deploys on push to `main`.

- Config: `railway.json` at repo root (Nixpacks builder)
- Build: `pnpm install --frozen-lockfile && pnpm --filter @softuq/docs build`
- Start: `pnpm --filter @softuq/docs start` (uses `${PORT:-3333}` so Railway injects its port)
- Restart policy: `ON_FAILURE`, max 10 retries
- Root `package.json` pins `packageManager: "pnpm@10.28.1"` and `engines.node: ">=20"` so Nixpacks picks the right toolchain

### CLI — npm

```bash
pnpm publish:cli
```

Defined in root `package.json`. Sources `NPM_TOKEN` from `.env` (gitignored), writes a temp `packages/cli/.npmrc` with the auth line, runs `pnpm --filter softuq publish --no-git-checks`, then removes the `.npmrc` (even on failure). `prepublishOnly` in `packages/cli/package.json` runs `sync-templates` + `build` automatically.

- `.env` holds `NPM_TOKEN=npm_...` — granular token with publish scope on `softuq` (never commit)
- `.npmrc` is gitignored — the temp file the publish script writes would leak the token otherwise
- Do NOT pass `--//registry.npmjs.org/:_authToken=$NPM_TOKEN` as a pnpm flag — pnpm swallows it, npm never sees it, publish falls back to interactive OTP and fails with `EOTP`
- `packages/cli/package.json` → `"access": "public"`, `"files": ["dist", "templates", "README.md"]`, no `repository`/`bugs` fields (repo is private — don't leak github links into npm metadata)
- Bin entry: `"bin": { "softuq": "dist/index.js" }` — no leading `./` (npm strips invalid bin values silently on publish)
- Bump `packages/cli/package.json` `version` before running `publish:cli` (npm rejects republish of same version)

## Versioning

Bump package versions whenever the package has meaningful changes — before committing, review which packages were touched and bump `version` in their `package.json`. Follow semver:

- **patch** (`0.1.0 → 0.1.1`): bug fixes, token tweaks, doc-only changes that don't alter API
- **minor** (`0.1.0 → 0.2.0`): new tokens, new components, new CLI commands — backwards-compatible additions
- **major** (`0.1.0 → 1.0.0`): renames, removed tokens/components, breaking API changes

Bump only the packages actually changed — do not touch versions of untouched packages. Typical impact map:

- `packages/tokens` — new/renamed tokens, `primitives.css` / `semantic.css` edits
- `packages/react` — component changes, provider API
- `packages/cli` — CLI command or registry changes
- `packages/tailwind` — exported preset changes
- `packages/docs` — docs site (can skip version bump; it's not published)
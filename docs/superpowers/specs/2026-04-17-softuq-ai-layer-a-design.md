# Softuq AI Layer — Phase A (Primitives)

Date: 2026-04-17
Status: Design

## Summary

Add a first-class "AI layer" to Softuq: a pastel iridescent color palette and three motion primitives (`<Halo>`, `<Dots>`, `<Aurora>`) for AI-flavored UI — generative work in progress, agent activity, ambient AI context.

Phase A ships tokens + 3 primitives + 1 foundation page + docs. Later phases (out of scope here) add chat/conversation UI (B), in-app AI interactions (C), and marketing blocks for AI products (D).

## Problem

Softuq has 39 components and ~24 blocks, all "classic." It has no visual language for AI-native products. Teams building AI UIs on Softuq today either hand-roll rotating gradients and typing indicators, or reach for third-party libraries (border-beam, magicui) that don't share Softuq's token system, theme, or motion conventions.

The AI layer must:
- Exist as a distinct visual identity — recognizable across any Softuq palette/accent.
- Layer cleanly on existing components without forcing a fork (e.g., a Button stays a Button; wrap it in a Halo when generating).
- Follow Softuq conventions: OKLCH, CVA, forwardRef, copy-paste CLI distribution, `prefers-reduced-motion`.
- Be minimal in v1. Just the primitives and tokens — no wrapper components, no pre-composed `<AIButton>`.

## Non-goals (this phase)

- Chat/conversation UI (message bubbles, prompt composers, streaming text)
- In-app AI interactions (command bar, inline suggestions, agent task lists)
- Marketing blocks for AI products (AI hero, model comparison, AI pricing)
- `<AIButton>` / `<AISurface>` wrapper components — primitives compose, docs show the pattern.
- Additional primitives: `Streaming`, `Sparkles`, `Grain`, `PulseRings`, `Mesh` (deferred).
- `data-ai-state` attribute triggers on existing components (possible phase B addition).

## Scope

Three primitives and the tokens they need.

- `<Halo>` — rotating conic-gradient around the border of any child. Signature effect.
- `<Dots>` — three-dot "thinking" indicator. Inline, tiny footprint.
- `<Aurora>` — absolutely positioned drifting gradient background layer.

Plus: `ai.css` tokens, keyframes, foundation docs page, CLI registry entries, docs component sub-pages.

## Architecture

No new packages. All work lands in existing ones.

### `packages/tokens/`

New file `src/ai.css`, imported from `src/index.css` immediately after `semantic.css`. Three layers, matching current primitives → semantic → component pattern:

**Primitives** — 6 OKLCH hue anchors, identical in dark and light (AI layer is theme-agnostic):

```css
:root {
  --ai-hue-1: oklch(0.78 0.12 330);  /* magenta */
  --ai-hue-2: oklch(0.76 0.12 20);   /* warm red */
  --ai-hue-3: oklch(0.80 0.11 150);  /* emerald */
  --ai-hue-4: oklch(0.85 0.08 200);  /* cyan */
  --ai-hue-5: oklch(0.72 0.13 260);  /* blue */
  --ai-hue-6: oklch(0.68 0.14 300);  /* violet */
}
```

**Semantic** — gradient presets and derived tokens:

```css
:root {
  --ai-gradient-iridescent: conic-gradient(from 0deg,
    var(--ai-hue-1) 0%, var(--ai-hue-2) 15%, var(--ai-hue-3) 35%,
    var(--ai-hue-4) 55%, var(--ai-hue-5) 70%, var(--ai-hue-6) 85%,
    var(--ai-hue-1) 100%);
  --ai-gradient-mono: conic-gradient(from 0deg,
    transparent 0%, var(--accent) 30%, var(--accent) 70%, transparent 100%);
  --ai-gradient-subtle: conic-gradient(from 0deg,
    color-mix(in oklch, var(--ai-hue-1) 40%, transparent) 0%,
    color-mix(in oklch, var(--ai-hue-5) 40%, transparent) 50%,
    color-mix(in oklch, var(--ai-hue-1) 40%, transparent) 100%);
  --ai-glow-color: color-mix(in oklch, var(--ai-hue-5) 60%, var(--ai-hue-1) 40%);
  --ai-aurora-from: var(--ai-hue-1);
  --ai-aurora-via: var(--ai-hue-4);
  --ai-aurora-to: var(--ai-hue-6);
}
```

`--ai-gradient-mono` deliberately uses `--accent` so a mono halo adapts to theme. Other presets are AI-signature and do not.

**Component** — tweakable defaults consumed by the three primitives:

```css
:root {
  --ds-ai-halo-width: 1.5px;
  --ds-ai-halo-speed: 3s;
  --ds-ai-halo-blur: 0px;
  --ds-ai-halo-bloom-size: 20px;
  --ds-ai-halo-bloom-opacity: 0.35;

  --ds-ai-dots-gap: 6px;
  --ds-ai-dots-size: 8px;
  --ds-ai-dots-speed: 1.2s;

  --ds-ai-aurora-blur: 40px;
  --ds-ai-aurora-opacity: 0.45;
  --ds-ai-aurora-speed: 12s;
}
```

These do not participate in the `SoftuqProvider` preset system in v1. Consumers override per-instance via `className` arbitrary values (e.g., `className="[--ds-ai-halo-speed:1.5s]"`).

### `packages/react/`

- `src/components/ai/` — new subfolder (first deviation from flat `components/ui/`). Future AI work populates it; existing components stay in `ui/`.
  - `halo.tsx`
  - `dots.tsx`
  - `aurora.tsx`
- `src/lib/ai-animations.css` — `@keyframes` (`ai-halo-spin`, `ai-dots-bounce`, `ai-aurora-drift`) and the scoped `prefers-reduced-motion` override. Imported from `packages/docs/src/app/globals.css`.
- `src/index.ts` — add three exports plus variant types.

### `packages/tailwind/`

`src/index.css` — add a second `@source` entry for `components/ai/*.tsx`.

### `packages/docs/`

`src/app/globals.css` extends `@theme` with:

```css
@theme {
  --color-ai-1: var(--ai-hue-1);
  --color-ai-2: var(--ai-hue-2);
  --color-ai-3: var(--ai-hue-3);
  --color-ai-4: var(--ai-hue-4);
  --color-ai-5: var(--ai-hue-5);
  --color-ai-6: var(--ai-hue-6);
  --animate-ai-halo-spin: ai-halo-spin var(--ds-ai-halo-speed) linear infinite;
  --animate-ai-dots-bounce: ai-dots-bounce var(--ds-ai-dots-speed) ease-in-out infinite;
  --animate-ai-aurora-drift: ai-aurora-drift var(--ds-ai-aurora-speed) ease-in-out infinite alternate;
}
```

## Components

All three follow existing Softuq conventions: `React.forwardRef`, CVA variants, `type="button"` where applicable, export order `component → variants → props type`, `data-ai-primitive="<name>"` attribute for motion-query scoping.

### `<Halo>` — wrapper primitive

Wraps an element, paints a rotating iridescent gradient around its border via `conic-gradient` + dual mask composite.

```tsx
<Halo tone="iridescent" size="md" speed="normal" active>
  <Button>Generate</Button>
</Halo>
```

Props:
- `tone: "iridescent" | "mono" | "subtle"` — default `"iridescent"`; `"mono"` binds to `--accent`.
- `size: "sm" | "md" | "lg"` — maps to `--ds-ai-halo-width` and bloom size. Default `"md"`.
- `speed: "slow" | "normal" | "fast"` — maps to `--ds-ai-halo-speed`. Default `"normal"`.
- `active?: boolean` — default `true`. `false` fades to 0 opacity over 400ms.
- `radius?: "inherit" | "sm" | "md" | "lg" | "full"` — default `"inherit"` (reads child border-radius).
- `className`, standard React props.

Rendering: outer wrapper (`data-ai-primitive="halo"`, `position: relative`, `display: inline-block`) + absolutely positioned inner gradient layer (`data-ai-layer`, `aria-hidden`), clipped to a border-only ring via `mask-composite: intersect, exclude`. Child renders above in z-order.

### `<Dots>` — inline primitive

Three bouncing dots.

```tsx
<Dots size="md" tone="iridescent" />
```

Props:
- `size: "sm" | "md" | "lg"` — maps to `--ds-ai-dots-size` and `--ds-ai-dots-gap`. Default `"md"`.
- `tone: "iridescent" | "mono" | "muted"` — `"iridescent"` paints each dot with a different `--ai-hue-*`; `"mono"` uses `--accent`; `"muted"` uses `--text-muted`. Default `"iridescent"`.
- `pattern: "bounce" | "pulse"` — default `"bounce"`. `"pulse"` scales each dot in sequence instead of translating.
- `aria-label?: string` — default `"Thinking"`. `role="status"`.

Rendering: wrapper (`data-ai-primitive="dots"`, `role="status"`) with three `<span data-ai-layer>` children, each with its own animation delay.

### `<Aurora>` — background layer primitive

Absolutely positioned, drifting radial gradients. Requires `position: relative` and `overflow: hidden` on the parent.

```tsx
<Card className="relative overflow-hidden">
  <Aurora intensity="medium" />
  <CardContent>Ask AI anything</CardContent>
</Card>
```

Props:
- `intensity: "subtle" | "medium" | "intense"` — maps to `--ds-ai-aurora-opacity` and blur. Default `"medium"`.
- `coverage: "full" | "top" | "bottom"` — positions the gradient cluster. Default `"full"`.
- `animate?: boolean` — default `true`. `false` renders a static snapshot.
- `className`.

Rendering: outer wrapper (`data-ai-primitive="aurora"`, `aria-hidden`, absolutely positioned at `inset: 0`) + inner drift layer (`data-ai-layer`) with three stacked radial gradients using `--ai-aurora-from/via/to`, heavy `filter: blur()`, slow drift via `transform: translate() rotate()`.

## Docs

### Foundation page

New route `packages/docs/src/app/(site)/foundations/ai-layer/page.tsx`:

- Hero: title, tagline ("Pastel iridescent palette and three primitives for AI context"), live Halo around a prompt-box mock.
- Token table — 6 hue swatches with OKLCH values, click-to-copy.
- Semantic tokens grid — iridescent / mono / subtle gradients as previews, plus `--ai-glow-color`.
- Component vars table — every `--ds-ai-*` with default value and the primitive it controls.
- Guidelines box:
  - Use for: AI-generated content, agent processing, LLM interaction, model outputs.
  - Do not use for: generic loading (use `Skeleton`), accent CTAs (use Button `variant="default"`), success/warning/error (use `Alert`).
- Motion section — `prefers-reduced-motion` behavior, static fallbacks explained.

Sidebar order in `/foundations`: Colors · Typography · Spacing · Effects · **AI Layer** · Icons · Layout.

### Component sub-pages

Standard Softuq component template:

- `/components/halo` — props table, live playground with tone/size/speed/active toggles, copy snippet.
- `/components/dots` — same pattern.
- `/components/aurora` — same pattern.

Sectioning in `/components` index: add `<Aurora>`, `<Dots>`, `<Halo>` to the alphabetical groups.

### Copy-paste patterns

In the foundation page, a "How to apply to existing components" subsection with 3–4 ready snippets:

```tsx
// Loading button
<Halo active={loading}><Button disabled={loading}>{loading ? <Dots size="sm" /> : "Generate"}</Button></Halo>

// AI panel
<Card className="relative overflow-hidden"><Aurora intensity="medium" /><CardContent>…</CardContent></Card>

// Thinking row
<div className="flex items-center gap-2"><Dots size="sm" /><span>Analyzing</span></div>
```

### llms.txt

Update `src/app/llms.txt` with AI Layer description and the 3 primitives.

## CLI

`packages/cli/src/registry/react.json` — new category `"ai"`:

```json
{
  "halo":   { "category": "ai", "files": ["components/ai/halo.tsx"],   "deps": [], "internal": [] },
  "dots":   { "category": "ai", "files": ["components/ai/dots.tsx"],   "deps": [], "internal": [] },
  "aurora": { "category": "ai", "files": ["components/ai/aurora.tsx"], "deps": [], "internal": [] }
}
```

No npm deps. Primitives share no code, so `internal: []` for all.

`init` command — copy `ai.css` to the target project and `@import` it in the generated `globals.css` after `semantic.css`. Projects already initialized need to run `npx softuq init --force` (or manually add the import). Documented in CLI README and `/getting-started`.

`add` / `list` / `diff` / `update` — no changes; work off registry.

CLI docs to keep in sync (per project convention):
- `packages/cli/README.md` — "What init does" gains a bullet for AI tokens. `list` example shows the new category.
- `packages/docs/src/app/getting-started/page.tsx` — "What init does" gains the same bullet.
- `packages/cli/CHANGELOG.md` — new entry.

Version bumps before publish:
- `@softuq/tokens` — minor (new token namespace).
- `@softuq/react` — minor (new components).
- `softuq` CLI — minor (new registry category, init behavior change).
- `@softuq/tailwind` — minor only if `@theme` colors change, otherwise skip.

`packages/cli/scripts/sync-templates.mjs` — existing logic copies `packages/react/src` and `packages/tokens/src` into the CLI tarball wholesale, so new files flow through automatically.

## Accessibility and motion

- `<Halo>` — gradient layer is `aria-hidden`. Focus ring on the child remains via `focus-visible`; the halo layer sits beneath the child's focus ring in z-order and does not suppress it.
- `<Dots>` — wrapper has `role="status"` and `aria-label` (default `"Thinking"`).
- `<Aurora>` — `aria-hidden`, entirely decorative. Content contrast is the consumer's responsibility; foundation docs call this out.

Reduced motion, scoped to the AI layer only. Every primitive puts `data-ai-primitive="<name>"` on its wrapper and `data-ai-layer` on every internal animating element (gradient layer, dot, drift layer). One rule covers all three:

```css
@media (prefers-reduced-motion: reduce) {
  [data-ai-primitive],
  [data-ai-primitive] [data-ai-layer] {
    animation: none !important;
  }
  [data-ai-primitive="dots"] [data-ai-layer] {
    opacity: 0.6;
  }
}
```

Visuals stay present but frozen — iridescent ring holds at its start angle, dots rest at reduced opacity, aurora is a static gradient. Nothing gets hidden. Other Softuq motion (toasts, dialogs, etc.) is not affected.

## Performance

- Halo is a single `conic-gradient` on a pseudo-element — GPU compositable, cheap.
- Aurora uses `filter: blur(40px)` on one layer. Fine for 1–3 instances per viewport. Foundation docs note: do not nest inside scrolling lists.
- Dots are three small transforming divs. Negligible.
- V1 uses no refs, `useEffect`, or memoization. All CSS-driven.

## Milestones

Rough order and effort. Not a commitment.

1. **M1 — Tokens** (~0.5d). `ai.css` with 3 layers, import in `tokens/index.css`, `@theme` mapping in docs `globals.css`.
2. **M2 — Halo** (~1d). Component, CVA, conic-gradient + mask-composite implementation, keyframes, reduced-motion, `/components/halo` sub-page.
3. **M3 — Dots** (~0.25d). Component, keyframes, `/components/dots` sub-page.
4. **M4 — Aurora** (~0.5d). Component, radial gradient layer, drift animation, `/components/aurora` sub-page.
5. **M5 — Foundation route** (~0.5d). `/foundations/ai-layer` page: token table, semantic grid, component vars, guidelines, motion section.
6. **M6 — CLI** (~0.25d). Registry, init change, README, getting-started bullet, CHANGELOG, version bumps.
7. **M7 — Integration pass** (~0.5d). Sidebar link, sitemap, `llms.txt`, manual `pnpm dev` check across dark/light, 3 palettes, reduced-motion on.

Estimate: ~3.5 days. Ship order is linear; Halo first (hardest, unblocks learning), Dots second (cheap win), Aurora third.

## Open questions

None blocking implementation. Tunable post-merge:
- Exact OKLCH values per hue anchor (design tuning, not architectural).
- Whether `subtle` tone needs a lower-chroma variant beyond the one specified.
- Whether to add a `pattern="wave"` option to `<Dots>` later.

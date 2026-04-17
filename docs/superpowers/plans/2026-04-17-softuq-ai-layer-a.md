# Softuq AI Layer — Phase A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a first-class AI visual layer to Softuq — pastel iridescent tokens plus three primitives (`<Halo>`, `<Dots>`, `<Aurora>`) — usable in any Softuq project via the existing copy-paste CLI.

**Architecture:** Three CSS token layers live in a new `packages/tokens/src/ai.css` (primitives → semantic → component). Three React primitives live in new subfolder `packages/react/src/components/ai/`, each using CVA variants and OKLCH conic/radial gradients. Zero new npm packages, zero new runtime dependencies, all motion pure CSS.

**Tech Stack:** Tailwind v4 (`@theme` mapping in docs globals.css), CVA, React 18 `forwardRef`, OKLCH + `conic-gradient` + `mask-composite`, biome for formatting, pnpm workspace.

**Testing note:** Softuq has no automated test suite (per `CLAUDE.md`). Every task replaces the usual "write failing test → pass" pattern with explicit manual verification steps: start `pnpm dev`, navigate to the target route, check dark + light theme, check an accent swap, check `prefers-reduced-motion`. Task is only complete when the manual check passes.

---

## Reference spec

Design is fully specified at `docs/superpowers/specs/2026-04-17-softuq-ai-layer-a-design.md`. Read it first. This plan implements it section by section.

## File structure overview

Create (new):
- `packages/tokens/src/ai.css`
- `packages/react/src/components/ai/halo.tsx`
- `packages/react/src/components/ai/dots.tsx`
- `packages/react/src/components/ai/aurora.tsx`
- `packages/docs/src/app/(site)/foundations/ai-layer/page.tsx`

Modify:
- `packages/tokens/src/tokens.css` — import `ai.css`
- `packages/tokens/src/tailwind-theme.css` — add `@keyframes` and `@media (prefers-reduced-motion)`
- `packages/tokens/package.json` — bump version
- `packages/react/src/index.ts` — export the three new components
- `packages/react/package.json` — bump version
- `packages/docs/src/app/globals.css` — add `@theme` mappings (`--color-ai-*`, `--animate-ai-*`)
- `packages/docs/src/app/(site)/foundations/page.tsx` — add AI Layer card
- `packages/docs/src/app/(site)/components/page.tsx` — add three new sections (Halo / Dots / Aurora)
- `packages/docs/src/app/sitemap.ts` — add `/foundations/ai-layer`
- `packages/docs/src/app/llms.txt/route.ts` — mention AI layer
- `packages/cli/src/registry/react.json` — three new component entries
- `packages/cli/src/commands/init.ts` — read `ai.css`, append to generated `softuq-tokens.css`
- `packages/cli/README.md` — new bullet in "What init does", new line in "list" output section
- `packages/docs/src/app/getting-started/page.tsx` — new bullet in "What init does"
- `packages/cli/CHANGELOG.md` — new entry
- `packages/cli/package.json` — bump version

No files deleted.

---

## Task 1 — Tokens: `ai.css`

**Files:**
- Create: `packages/tokens/src/ai.css`
- Modify: `packages/tokens/src/tokens.css`

- [ ] **Step 1.1: Create `ai.css` with primitives, semantic, and component layers**

Write `packages/tokens/src/ai.css`:

```css
/* ============================================
   SOFTUQ — AI layer tokens
   Pastel iridescent palette and motion defaults.
   Theme-agnostic: same values in dark and light.
   ============================================ */

:root {
  /* Primitives — 6 OKLCH hue anchors */
  --ai-hue-1: oklch(0.78 0.12 330);  /* magenta */
  --ai-hue-2: oklch(0.76 0.12 20);   /* warm red */
  --ai-hue-3: oklch(0.80 0.11 150);  /* emerald */
  --ai-hue-4: oklch(0.85 0.08 200);  /* cyan */
  --ai-hue-5: oklch(0.72 0.13 260);  /* blue */
  --ai-hue-6: oklch(0.68 0.14 300);  /* violet */

  /* Semantic — gradient presets */
  --ai-gradient-iridescent: conic-gradient(
    from 0deg,
    var(--ai-hue-1) 0%,
    var(--ai-hue-2) 15%,
    var(--ai-hue-3) 35%,
    var(--ai-hue-4) 55%,
    var(--ai-hue-5) 70%,
    var(--ai-hue-6) 85%,
    var(--ai-hue-1) 100%
  );
  --ai-gradient-mono: conic-gradient(
    from 0deg,
    transparent 0%,
    var(--accent) 30%,
    var(--accent) 70%,
    transparent 100%
  );
  --ai-gradient-subtle: conic-gradient(
    from 0deg,
    color-mix(in oklch, var(--ai-hue-1) 40%, transparent) 0%,
    color-mix(in oklch, var(--ai-hue-5) 40%, transparent) 50%,
    color-mix(in oklch, var(--ai-hue-1) 40%, transparent) 100%
  );
  --ai-glow-color: color-mix(in oklch, var(--ai-hue-5) 60%, var(--ai-hue-1) 40%);
  --ai-aurora-from: var(--ai-hue-1);
  --ai-aurora-via: var(--ai-hue-4);
  --ai-aurora-to: var(--ai-hue-6);

  /* Component — per-primitive tweakables */
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

- [ ] **Step 1.2: Import `ai.css` from `tokens.css`**

Edit `packages/tokens/src/tokens.css`. Add third import line after `semantic.css`:

```css
/* ============================================
   SOFTUQ — All Tokens
   Import this file to get all design tokens
   ============================================ */

@import "./primitives.css";
@import "./semantic.css";
@import "./ai.css";
```

- [ ] **Step 1.3: Verify CSS variables are live in the browser**

Run from repo root:

```bash
pnpm dev
```

Open `http://localhost:3333` in a browser. Open devtools → Elements → `<html>`. In the Styles panel, type `--ai-hue-1` in the filter. Expected: see `--ai-hue-1: oklch(0.78 0.12 330)` on `:root`. Check all six `--ai-hue-*` are present.

If any are missing, devtools → Network tab → confirm the CSS request for `@softuq/tokens/css` loads `ai.css` content (Ctrl-F for `--ai-hue-1` in the response).

- [ ] **Step 1.4: Commit**

```bash
git add packages/tokens/src/ai.css packages/tokens/src/tokens.css
git commit -m "feat(tokens): add AI layer — pastel iridescent palette + component defaults"
```

---

## Task 2 — Keyframes, `@theme` mapping, reduced-motion

Keyframes and `@theme` extensions make the token values callable from Tailwind utility classes (`animate-ai-halo-spin`, `bg-ai-1`, etc.) and enforce `prefers-reduced-motion` across all three primitives in one rule.

**Files:**
- Modify: `packages/tokens/src/tailwind-theme.css`
- Modify: `packages/docs/src/app/globals.css`

- [ ] **Step 2.1: Add AI keyframes + reduced-motion to `tailwind-theme.css`**

Append to `packages/tokens/src/tailwind-theme.css` (after the existing `@keyframes pulse` block near line 157):

```css

/* ============================================
   AI layer keyframes + reduced-motion scope
   ============================================ */

@keyframes ai-halo-spin {
  to { transform: rotate(1turn); }
}
@keyframes ai-dots-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
  40%           { transform: translateY(-30%); opacity: 1; }
}
@keyframes ai-aurora-drift {
  0%   { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(6%, -4%) rotate(18deg); }
}

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

- [ ] **Step 2.2: Extend `@theme` block in docs `globals.css`**

Edit `packages/docs/src/app/globals.css`. Find the existing `@theme` block (starts ~line 13). Locate the last `--animate-*` line (`--animate-blink: blink 1.1s steps(1) infinite;` at line 108) and append directly below it — still inside the `@theme { … }` block:

```css

  /* AI layer — colors */
  --color-ai-1: var(--ai-hue-1);
  --color-ai-2: var(--ai-hue-2);
  --color-ai-3: var(--ai-hue-3);
  --color-ai-4: var(--ai-hue-4);
  --color-ai-5: var(--ai-hue-5);
  --color-ai-6: var(--ai-hue-6);

  /* AI layer — animations */
  --animate-ai-halo-spin: ai-halo-spin var(--ds-ai-halo-speed) linear infinite;
  --animate-ai-dots-bounce: ai-dots-bounce var(--ds-ai-dots-speed) ease-in-out infinite;
  --animate-ai-aurora-drift: ai-aurora-drift var(--ds-ai-aurora-speed) ease-in-out infinite alternate;
```

- [ ] **Step 2.3: Nuke `.next` cache and restart dev**

Next.js caches `@theme` aggressively. Run from repo root:

```bash
lsof -ti:3333 | xargs kill -9 2>/dev/null; rm -rf packages/docs/.next
pnpm dev
```

- [ ] **Step 2.4: Verify `@keyframes` and Tailwind utilities are generated**

Open `http://localhost:3333` → devtools → Sources → find the compiled CSS file (usually `_next/static/css/*.css`). Ctrl-F for `@keyframes ai-halo-spin` — expected: present with `to { transform: rotate(1turn); }`. Ctrl-F for `.animate-ai-halo-spin` — expected: Tailwind has generated a utility class.

If missing, double-check `@theme` placement is inside the braces and that keyframes came through `@softuq/tokens/css` import.

- [ ] **Step 2.5: Commit**

```bash
git add packages/tokens/src/tailwind-theme.css packages/docs/src/app/globals.css
git commit -m "feat(tokens,docs): AI keyframes, @theme mapping, reduced-motion scope"
```

---

## Task 3 — `<Halo>` component

The signature primitive. Wraps children, paints a rotating iridescent (or mono / subtle) gradient around the border via dual `mask-composite`. The gradient sits on an inner absolutely-positioned layer (`data-ai-layer`), so the reduced-motion rule from Task 2 targets it directly.

**Files:**
- Create: `packages/react/src/components/ai/halo.tsx`
- Modify: `packages/react/src/index.ts`

- [ ] **Step 3.1: Write the component**

Create `packages/react/src/components/ai/halo.tsx`:

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const haloVariants = cva(
  "relative inline-block isolate [&>[data-ai-layer]]:pointer-events-none",
  {
    variants: {
      size: {
        sm: "[--ds-ai-halo-width:1px] [--ds-ai-halo-bloom-size:12px]",
        md: "[--ds-ai-halo-width:1.5px] [--ds-ai-halo-bloom-size:20px]",
        lg: "[--ds-ai-halo-width:2.5px] [--ds-ai-halo-bloom-size:32px]",
      },
      speed: {
        slow: "[--ds-ai-halo-speed:5s]",
        normal: "[--ds-ai-halo-speed:3s]",
        fast: "[--ds-ai-halo-speed:1.6s]",
      },
      radius: {
        inherit: "",
        sm: "rounded-[var(--ds-radius-sm)]",
        md: "rounded-[var(--ds-radius-md)]",
        lg: "rounded-[var(--ds-radius-lg)]",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      speed: "normal",
      radius: "inherit",
    },
  },
);

type HaloTone = "iridescent" | "mono" | "subtle";

interface HaloProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof haloVariants>, "radius"> {
  tone?: HaloTone;
  active?: boolean;
  radius?: "inherit" | "sm" | "md" | "lg" | "full";
}

const toneGradient: Record<HaloTone, string> = {
  iridescent: "var(--ai-gradient-iridescent)",
  mono: "var(--ai-gradient-mono)",
  subtle: "var(--ai-gradient-subtle)",
};

const Halo = React.forwardRef<HTMLDivElement, HaloProps>(
  (
    { className, tone = "iridescent", size, speed, radius = "inherit", active = true, children, style, ...props },
    ref,
  ) => {
    const layerStyle: React.CSSProperties = {
      background: toneGradient[tone],
      animation: "var(--animate-ai-halo-spin)",
      opacity: active ? 1 : 0,
      padding: "var(--ds-ai-halo-width)",
      borderRadius: "inherit",
      WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      transition: "opacity 400ms var(--ease-smooth, cubic-bezier(0.16,1,0.3,1))",
    };

    const bloomStyle: React.CSSProperties = {
      background: toneGradient[tone],
      animation: "var(--animate-ai-halo-spin)",
      filter: `blur(var(--ds-ai-halo-bloom-size))`,
      opacity: active ? "var(--ds-ai-halo-bloom-opacity)" : 0,
      borderRadius: "inherit",
      transition: "opacity 400ms var(--ease-smooth, cubic-bezier(0.16,1,0.3,1))",
    };

    return (
      <div
        ref={ref}
        data-ai-primitive="halo"
        data-ai-active={active}
        className={cn(haloVariants({ size, speed, radius }), className)}
        style={style}
        {...props}
      >
        <span aria-hidden="true" data-ai-layer className="absolute inset-[-6px] -z-10" style={bloomStyle} />
        <span aria-hidden="true" data-ai-layer className="absolute inset-0" style={layerStyle} />
        {children}
      </div>
    );
  },
);
Halo.displayName = "Halo";

export type { HaloProps, HaloTone };
export { Halo, haloVariants };
```

- [ ] **Step 3.2: Export from package root**

Edit `packages/react/src/index.ts`. At the top, right after the `// Provider` comment line, add a new block (before the existing `// Components — Navigation` comment):

```ts
// Components — AI
export { Aurora, type AuroraProps, auroraVariants } from "./components/ai/aurora";
export { Dots, type DotsProps, dotsVariants } from "./components/ai/dots";
export { Halo, type HaloProps, type HaloTone, haloVariants } from "./components/ai/halo";
```

The `Aurora` and `Dots` exports reference files we create in Tasks 4 and 5; since we're editing the index now, keep the block in alphabetical order and expect TypeScript to report missing imports until those files exist. That's expected — the next two tasks close the gap.

- [ ] **Step 3.3: Verify Halo compiles and renders**

In `packages/react/src/index.ts`, the export lines for Aurora/Dots will be unresolved until Tasks 4 and 5. To test Halo in isolation first, temporarily replace the block with just:

```ts
// Components — AI
export { Halo, type HaloProps, type HaloTone, haloVariants } from "./components/ai/halo";
```

Then in `packages/docs/src/app/(site)/components/page.tsx`, add a temporary smoke-test inside the existing main content grid (find an easy insertion point right after the first `<section>` element). Use this TSX block:

```tsx
<section id="__halo-smoketest" className="p-8">
  <Halo tone="iridescent" size="md">
    <button type="button" className="h-10 px-4 rounded-md bg-surface-elevated text-fg-primary border border-edge-subtle">
      Generate
    </button>
  </Halo>
</section>
```

Add `Halo` to the import list at the top of the file.

Start dev and visit `http://localhost:3333/components`. Expected: a rotating iridescent ring around the button, about 1.5px wide, rotation every 3s, a soft blurred bloom behind it.

Check:
- Toggle `data-theme="dark"` ↔ `data-theme="light"` on `<html>` → ring colors identical (theme-agnostic).
- `active` goes false by adding a `React.useState` toggle locally: ring fades to 0 over 400ms.
- `prefers-reduced-motion: reduce` (macOS: System Settings → Accessibility → Display → Reduce motion ON): ring stops rotating, colors stay visible.

- [ ] **Step 3.4: Remove the smoke-test, restore the full export block**

Delete the `__halo-smoketest` `<section>` from `page.tsx` and revert the temporary single-line export in `index.ts` back to the full three-line block written in Step 3.2 (which will still have unresolved Aurora/Dots — to be fixed by Tasks 4 and 5).

- [ ] **Step 3.5: Commit Halo**

```bash
git add packages/react/src/components/ai/halo.tsx packages/react/src/index.ts
git commit -m "feat(react): add <Halo> — rotating iridescent border primitive"
```

---

## Task 4 — `<Dots>` component

Three-dot "thinking" indicator. Self-closing, accessible.

**Files:**
- Create: `packages/react/src/components/ai/dots.tsx`

- [ ] **Step 4.1: Write the component**

Create `packages/react/src/components/ai/dots.tsx`:

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const dotsVariants = cva(
  "inline-flex items-end",
  {
    variants: {
      size: {
        sm: "[--ds-ai-dots-size:6px] [--ds-ai-dots-gap:4px] gap-[var(--ds-ai-dots-gap)] h-3",
        md: "[--ds-ai-dots-size:8px] [--ds-ai-dots-gap:6px] gap-[var(--ds-ai-dots-gap)] h-4",
        lg: "[--ds-ai-dots-size:10px] [--ds-ai-dots-gap:8px] gap-[var(--ds-ai-dots-gap)] h-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type DotsTone = "iridescent" | "mono" | "muted";
type DotsPattern = "bounce" | "pulse";

interface DotsProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof dotsVariants> {
  tone?: DotsTone;
  pattern?: DotsPattern;
}

const toneColors: Record<DotsTone, [string, string, string]> = {
  iridescent: ["var(--ai-hue-1)", "var(--ai-hue-4)", "var(--ai-hue-6)"],
  mono: ["var(--accent)", "var(--accent)", "var(--accent)"],
  muted: ["var(--text-muted)", "var(--text-muted)", "var(--text-muted)"],
};

const Dots = React.forwardRef<HTMLSpanElement, DotsProps>(
  (
    { className, size, tone = "iridescent", pattern = "bounce", "aria-label": ariaLabel = "Thinking", ...props },
    ref,
  ) => {
    const [c1, c2, c3] = toneColors[tone];
    const animation =
      pattern === "bounce"
        ? "var(--animate-ai-dots-bounce)"
        : "var(--animate-ai-dots-bounce)"; // v1: pulse reserved, identical keyframe swap can be added later

    const dot = (color: string, delay: string): React.CSSProperties => ({
      display: "inline-block",
      width: "var(--ds-ai-dots-size)",
      height: "var(--ds-ai-dots-size)",
      borderRadius: "9999px",
      background: color,
      animation,
      animationDelay: delay,
    });

    return (
      <span
        ref={ref}
        role="status"
        aria-label={ariaLabel}
        data-ai-primitive="dots"
        className={cn(dotsVariants({ size }), className)}
        {...props}
      >
        <span data-ai-layer style={dot(c1, "0ms")} />
        <span data-ai-layer style={dot(c2, "180ms")} />
        <span data-ai-layer style={dot(c3, "360ms")} />
      </span>
    );
  },
);
Dots.displayName = "Dots";

export type { DotsPattern, DotsProps, DotsTone };
export { Dots, dotsVariants };
```

Note: `pattern="pulse"` is accepted but maps to the same keyframe as `bounce` in v1 — the switch is scaffolded so a future PR can add a `@keyframes ai-dots-pulse` without changing the API. This is called out in the spec's "Open questions" as deferred.

- [ ] **Step 4.2: Verify Dots renders**

With `index.ts` still having the full export block from Task 3.2, the missing-file error for `./components/ai/dots` is now resolved. Check via `pnpm dev` that:

```bash
pnpm dev
```

Then add a temporary smoke section on `/components` page:

```tsx
<section id="__dots-smoketest" className="p-8 flex gap-4 items-center">
  <Dots size="sm" />
  <Dots size="md" />
  <Dots size="lg" />
  <Dots tone="mono" />
  <Dots tone="muted" />
</section>
```

Add `Dots` to the imports. Expected on page load: 5 groups of 3 bouncing dots with staggered timing (180ms between dots). `iridescent` variants show 3 distinct colors per group; `mono` uses the current accent; `muted` is grey. Reduced-motion: dots freeze at 60% opacity.

- [ ] **Step 4.3: Remove smoke section, commit**

Delete the `__dots-smoketest` section and remove `Dots` from the imports.

```bash
git add packages/react/src/components/ai/dots.tsx
git commit -m "feat(react): add <Dots> — three-dot thinking indicator"
```

---

## Task 5 — `<Aurora>` component

Background gradient layer. Absolutely positioned; parent must have `position: relative` + `overflow: hidden`.

**Files:**
- Create: `packages/react/src/components/ai/aurora.tsx`

- [ ] **Step 5.1: Write the component**

Create `packages/react/src/components/ai/aurora.tsx`:

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const auroraVariants = cva(
  "absolute inset-0 pointer-events-none",
  {
    variants: {
      intensity: {
        subtle: "[--ds-ai-aurora-opacity:0.25] [--ds-ai-aurora-blur:32px]",
        medium: "[--ds-ai-aurora-opacity:0.45] [--ds-ai-aurora-blur:40px]",
        intense: "[--ds-ai-aurora-opacity:0.7] [--ds-ai-aurora-blur:48px]",
      },
    },
    defaultVariants: {
      intensity: "medium",
    },
  },
);

type AuroraCoverage = "full" | "top" | "bottom";

interface AuroraProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof auroraVariants> {
  coverage?: AuroraCoverage;
  animate?: boolean;
}

const coveragePositions: Record<AuroraCoverage, { from: string; via: string; to: string }> = {
  full: {
    from: "20% 30%",
    via: "70% 60%",
    to: "50% 90%",
  },
  top: {
    from: "25% 20%",
    via: "70% 30%",
    to: "50% 40%",
  },
  bottom: {
    from: "20% 90%",
    via: "70% 75%",
    to: "50% 60%",
  },
};

const Aurora = React.forwardRef<HTMLDivElement, AuroraProps>(
  ({ className, intensity, coverage = "full", animate = true, style, ...props }, ref) => {
    const pos = coveragePositions[coverage];
    const layerStyle: React.CSSProperties = {
      position: "absolute",
      inset: "-10%",
      backgroundImage: [
        `radial-gradient(40% 60% at ${pos.from}, var(--ai-aurora-from) 0%, transparent 60%)`,
        `radial-gradient(45% 55% at ${pos.via}, var(--ai-aurora-via) 0%, transparent 60%)`,
        `radial-gradient(50% 50% at ${pos.to}, var(--ai-aurora-to) 0%, transparent 60%)`,
      ].join(", "),
      filter: "blur(var(--ds-ai-aurora-blur))",
      opacity: "var(--ds-ai-aurora-opacity)",
      animation: animate ? "var(--animate-ai-aurora-drift)" : undefined,
      willChange: animate ? "transform" : undefined,
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        data-ai-primitive="aurora"
        className={cn(auroraVariants({ intensity }), className)}
        style={style}
        {...props}
      >
        <div data-ai-layer style={layerStyle} />
      </div>
    );
  },
);
Aurora.displayName = "Aurora";

export type { AuroraCoverage, AuroraProps };
export { Aurora, auroraVariants };
```

- [ ] **Step 5.2: Verify Aurora renders**

Add smoke test to `/components` page:

```tsx
<section id="__aurora-smoketest" className="p-8 grid grid-cols-3 gap-4">
  {(["subtle", "medium", "intense"] as const).map((i) => (
    <div key={i} className="relative h-40 rounded-md bg-surface-card overflow-hidden">
      <Aurora intensity={i} />
      <div className="relative p-4 text-fg-primary">{i}</div>
    </div>
  ))}
</section>
```

Import `Aurora` at the top. Expected: three cards with increasing intensity, each with a slowly drifting multi-color gradient behind the label. Reduced-motion: drift stops, static gradient remains.

- [ ] **Step 5.3: Remove smoke section, commit**

```bash
git add packages/react/src/components/ai/aurora.tsx
git commit -m "feat(react): add <Aurora> — drifting background gradient primitive"
```

At this point `packages/react/src/index.ts` exports all three primitives successfully.

---

## Task 6 — `/components` page sections

Add `Halo`, `Dots`, and `Aurora` as dedicated sections on the big `/components` page, using the existing section pattern (letter-grouped SectionNav, `id="…"` on each `<section>`).

**Files:**
- Modify: `packages/docs/src/app/(site)/components/page.tsx`

- [ ] **Step 6.1: Add names to `COMPONENT_SECTIONS`**

Edit `packages/docs/src/app/(site)/components/page.tsx`. Find the `COMPONENT_SECTIONS` array (starts line ~175). Insert `"Aurora"` into the alphabetical position (right after `"Alert"` near line 178 — before `"Avatar"`), and insert `"Dots"` + `"Halo"` in their alphabetical positions. Resulting order should read: `…"Alert", "Aurora", "Avatar", "Badge", … "Dialog", "Dots", "Dropdown Menu", … "Form Text", "Halo", "Input & Textarea", …`.

- [ ] **Step 6.2: Add the imports**

In the import block at the top of the file, add to the alphabetical list (roughly after `Accordion…` and before `Alert` etc. — exact location follows existing order):

```tsx
Aurora,
Dots,
Halo,
```

- [ ] **Step 6.3: Add the three `<section>` blocks**

Find where other component sections live (the file is a long series of `<section id="…">` blocks). Place each block at the correct alphabetical position — `Aurora` between `Alert` and `Avatar`, `Dots` between `Dialog` and `Dropdown Menu`, `Halo` between `Form Text` and `Input & Textarea`.

**Halo section:**

```tsx
<section id="halo" className="space-y-6">
  <div>
    <h2 className="text-2xl font-semibold text-fg-primary">Halo</h2>
    <p className="mt-2 text-sm text-fg-muted max-w-prose">
      Rotating iridescent border around any child. Use for AI-generated or agent-in-progress states. Respects <code>prefers-reduced-motion</code> (freezes in place, keeps visuals).
    </p>
  </div>

  <div className="flex flex-wrap gap-6 items-center">
    <Halo tone="iridescent">
      <Button>Generate</Button>
    </Halo>
    <Halo tone="mono">
      <Button variant="secondary">Mono</Button>
    </Halo>
    <Halo tone="subtle">
      <Button variant="outline">Subtle</Button>
    </Halo>
    <Halo tone="iridescent" speed="fast">
      <Button variant="ghost">Fast</Button>
    </Halo>
    <Halo tone="iridescent" active={false}>
      <Button variant="outline">Inactive</Button>
    </Halo>
  </div>

  <CodeBlock language="auto" code={`<Halo tone="iridescent" size="md" speed="normal" active>
  <Button>Generate</Button>
</Halo>`} />
</section>
```

**Dots section:**

```tsx
<section id="dots" className="space-y-6">
  <div>
    <h2 className="text-2xl font-semibold text-fg-primary">Dots</h2>
    <p className="mt-2 text-sm text-fg-muted max-w-prose">
      Three-dot thinking indicator. Renders with <code>role="status"</code> and a default <code>aria-label</code> of <em>Thinking</em>.
    </p>
  </div>

  <div className="flex flex-wrap gap-6 items-center">
    <Dots size="sm" />
    <Dots size="md" />
    <Dots size="lg" />
    <Dots tone="mono" />
    <Dots tone="muted" />
  </div>

  <CodeBlock language="auto" code={`<Dots size="md" tone="iridescent" />`} />
</section>
```

**Aurora section:**

```tsx
<section id="aurora" className="space-y-6">
  <div>
    <h2 className="text-2xl font-semibold text-fg-primary">Aurora</h2>
    <p className="mt-2 text-sm text-fg-muted max-w-prose">
      Drifting multi-color gradient background layer. Parent must have <code>position: relative</code> and <code>overflow: hidden</code>. Decorative only (<code>aria-hidden</code>).
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {(["subtle", "medium", "intense"] as const).map((i) => (
      <div key={i} className="relative h-40 rounded-[var(--ds-radius-card)] bg-surface-card overflow-hidden border border-edge-subtle">
        <Aurora intensity={i} />
        <div className="relative p-4 text-fg-primary text-sm">{i}</div>
      </div>
    ))}
  </div>

  <CodeBlock language="auto" code={`<div className="relative overflow-hidden">
  <Aurora intensity="medium" />
  <div className="relative">…content…</div>
</div>`} />
</section>
```

- [ ] **Step 6.4: Verify all three sections**

Run `pnpm dev`, visit `http://localhost:3333/components`. Use the SectionNav: click the `A` group → `Aurora` should highlight and scroll into view. Click `D` → `Dots`. Click `H` → `Halo`. All three render correctly; code blocks have copy buttons; switch `<html data-theme="light">` manually in devtools to confirm the AI layer is visually identical in both themes.

- [ ] **Step 6.5: Commit**

```bash
git add packages/docs/src/app/\(site\)/components/page.tsx
git commit -m "docs(components): add Halo, Dots, Aurora sections to /components"
```

---

## Task 7 — Foundation route `/foundations/ai-layer`

Create a dedicated page that explains the AI palette and provides live swatches + component vars.

**Files:**
- Create: `packages/docs/src/app/(site)/foundations/ai-layer/page.tsx`

- [ ] **Step 7.1: Scaffold the page file**

Create `packages/docs/src/app/(site)/foundations/ai-layer/page.tsx`:

```tsx
"use client";

import { Aurora, CodeBlock, Dots, Halo } from "@softuq/react";
import { PageShell } from "../../_components/page-shell";

const HUE_TOKENS = [
  { name: "--ai-hue-1", value: "oklch(0.78 0.12 330)", label: "magenta" },
  { name: "--ai-hue-2", value: "oklch(0.76 0.12 20)", label: "warm red" },
  { name: "--ai-hue-3", value: "oklch(0.80 0.11 150)", label: "emerald" },
  { name: "--ai-hue-4", value: "oklch(0.85 0.08 200)", label: "cyan" },
  { name: "--ai-hue-5", value: "oklch(0.72 0.13 260)", label: "blue" },
  { name: "--ai-hue-6", value: "oklch(0.68 0.14 300)", label: "violet" },
];

const SEMANTIC_TOKENS = [
  { name: "--ai-gradient-iridescent", desc: "Default full-spectrum conic gradient." },
  { name: "--ai-gradient-mono", desc: "Accent-bound conic gradient (follows --accent)." },
  { name: "--ai-gradient-subtle", desc: "Lower-chroma two-stop variant for quiet contexts." },
  { name: "--ai-glow-color", desc: "Blended glow tint (blue-dominant mix)." },
  { name: "--ai-aurora-from / via / to", desc: "Three anchors for <Aurora>." },
];

const COMPONENT_VARS = [
  { name: "--ds-ai-halo-width", default: "1.5px", controls: "<Halo> ring thickness" },
  { name: "--ds-ai-halo-speed", default: "3s", controls: "<Halo> rotation period" },
  { name: "--ds-ai-halo-bloom-size", default: "20px", controls: "<Halo> blur bloom radius" },
  { name: "--ds-ai-halo-bloom-opacity", default: "0.35", controls: "<Halo> bloom opacity" },
  { name: "--ds-ai-dots-size", default: "8px", controls: "<Dots> dot diameter" },
  { name: "--ds-ai-dots-gap", default: "6px", controls: "<Dots> inter-dot spacing" },
  { name: "--ds-ai-dots-speed", default: "1.2s", controls: "<Dots> bounce period" },
  { name: "--ds-ai-aurora-blur", default: "40px", controls: "<Aurora> blur radius" },
  { name: "--ds-ai-aurora-opacity", default: "0.45", controls: "<Aurora> overall opacity" },
  { name: "--ds-ai-aurora-speed", default: "12s", controls: "<Aurora> drift period" },
];

export default function AILayerFoundationPage() {
  return (
    <div className="max-w-5xl mx-auto px-[var(--ds-space-page-x)] py-12 space-y-16">
      <PageShell
        title="AI Layer"
        description="Pastel iridescent palette and three primitives — Halo, Dots, Aurora — for AI-generated and agent-driven UI."
        crumbs={[{ label: "Foundations", href: "/foundations" }, { label: "AI Layer" }]}
      >
        <section className="relative rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden p-8 min-h-48">
          <Aurora intensity="medium" />
          <div className="relative flex flex-col sm:flex-row items-center gap-6 justify-center">
            <Halo tone="iridescent">
              <div className="h-10 px-4 inline-flex items-center rounded-md bg-surface-elevated border border-edge-subtle text-sm text-fg-primary">
                Generating…
              </div>
            </Halo>
            <Dots size="md" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-fg-primary">Hue anchors (primitives)</h2>
          <p className="text-sm text-fg-muted">Six OKLCH values. Identical in dark and light — AI identity does not flip with theme.</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {HUE_TOKENS.map((t) => (
              <div key={t.name} className="space-y-2">
                <div
                  className="h-20 rounded-[var(--ds-radius-card)] border border-edge-subtle"
                  style={{ background: `var(${t.name})` }}
                />
                <div className="text-xs font-mono text-fg-muted">{t.name}</div>
                <div className="text-[11px] text-fg-dimmed">{t.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-fg-primary">Semantic tokens</h2>
          <ul className="grid gap-3">
            {SEMANTIC_TOKENS.map((t) => (
              <li key={t.name} className="flex items-baseline gap-3 text-sm">
                <code className="text-fg-primary font-mono">{t.name}</code>
                <span className="text-fg-muted">{t.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-fg-primary">Component vars</h2>
          <p className="text-sm text-fg-muted">Override per instance via <code>className</code> arbitrary values, e.g. <code>className=&quot;[--ds-ai-halo-speed:1.5s]&quot;</code>.</p>
          <div className="overflow-x-auto rounded-[var(--ds-radius-card)] border border-edge-subtle">
            <table className="w-full text-sm">
              <thead className="bg-surface-elevated">
                <tr>
                  <th className="text-left p-3 font-medium text-fg-muted">Variable</th>
                  <th className="text-left p-3 font-medium text-fg-muted">Default</th>
                  <th className="text-left p-3 font-medium text-fg-muted">Controls</th>
                </tr>
              </thead>
              <tbody>
                {COMPONENT_VARS.map((v) => (
                  <tr key={v.name} className="border-t border-edge-subtle">
                    <td className="p-3 font-mono text-fg-primary">{v.name}</td>
                    <td className="p-3 font-mono text-fg-muted">{v.default}</td>
                    <td className="p-3 text-fg-muted">{v.controls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-fg-primary">When to use</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-5">
              <h3 className="font-medium text-fg-primary mb-2">Use for</h3>
              <ul className="text-sm text-fg-muted space-y-1 list-disc ml-5">
                <li>AI-generated content, while generating</li>
                <li>Agent processing / tool-call in progress</li>
                <li>LLM streaming feedback</li>
                <li>Ambient AI context (empty states, panels, hero)</li>
              </ul>
            </div>
            <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-5">
              <h3 className="font-medium text-fg-primary mb-2">Do not use for</h3>
              <ul className="text-sm text-fg-muted space-y-1 list-disc ml-5">
                <li>Generic loading — use <code>Skeleton</code></li>
                <li>Accent-driven CTAs — use <code>Button</code> variants</li>
                <li>Success / warning / error — use <code>Alert</code></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-fg-primary">How to apply to existing components</h2>
          <CodeBlock language="auto" code={`// Loading button
<Halo active={loading}>
  <Button disabled={loading}>{loading ? <Dots size="sm" /> : "Generate"}</Button>
</Halo>

// AI panel
<Card className="relative overflow-hidden">
  <Aurora intensity="medium" />
  <CardContent>…</CardContent>
</Card>

// Thinking row
<div className="flex items-center gap-2">
  <Dots size="sm" />
  <span>Analyzing</span>
</div>`} />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-fg-primary">Motion</h2>
          <p className="text-sm text-fg-muted">
            All three primitives honour <code>@media (prefers-reduced-motion: reduce)</code>. Animations freeze but visuals remain — iridescent ring holds, dots rest at 60% opacity, aurora becomes static. Nothing is hidden.
          </p>
        </section>
      </PageShell>
    </div>
  );
}
```

- [ ] **Step 7.2: Verify the new route**

Run `pnpm dev`, visit `http://localhost:3333/foundations/ai-layer`. Expected:
- Hero with a Halo around "Generating…" pill, Dots beside it, Aurora behind both.
- Six swatches displayed in a 6-column grid (2 columns on mobile).
- Component vars table with 10 rows.
- "Use for / Do not use for" two-column guidance card.
- Code block with 3 composition snippets.
- Motion note at the bottom.

Toggle dark ↔ light: palette looks identical, surrounding surfaces flip as usual.

- [ ] **Step 7.3: Commit**

```bash
git add packages/docs/src/app/\(site\)/foundations/ai-layer
git commit -m "docs(foundations): add /foundations/ai-layer page"
```

---

## Task 8 — Foundation index card + sitemap + llms.txt

Surface the new foundation and include it in automated index files.

**Files:**
- Modify: `packages/docs/src/app/(site)/foundations/page.tsx`
- Modify: `packages/docs/src/app/sitemap.ts`
- Modify: `packages/docs/src/app/llms.txt/route.ts`

- [ ] **Step 8.1: Add the foundation card**

Edit `packages/docs/src/app/(site)/foundations/page.tsx`. In the `FOUNDATIONS` array, add a new entry between the `Effects` entry (ending line 48) and the `Icons` entry (starting line 49):

```ts
  {
    href: "/foundations/ai-layer",
    title: "AI Layer",
    description: "Pastel iridescent palette and motion primitives for AI-driven UI.",
    icon: Sparkles,
    ready: true,
  },
```

The `Sparkles` icon is already imported at the top of the file (used by `Effects`) — reuse it. No new imports needed.

- [ ] **Step 8.2: Add route to sitemap**

Edit `packages/docs/src/app/sitemap.ts`. In the `staticRoutes` array, after the existing `/foundations/layout` entry (line 24), add:

```ts
    { url: `${BASE}/foundations/ai-layer`, changeFrequency: "monthly" as const, priority: 0.5 },
```

- [ ] **Step 8.3: Mention AI Layer in `llms.txt`**

Edit `packages/docs/src/app/llms.txt/route.ts`. Find the line mentioning foundations tokens (line 27):

```
- [Foundations](https://softuq.com/foundations): Design tokens — colors, typography, spacing, effects, icons, layout
```

Change it to:

```
- [Foundations](https://softuq.com/foundations): Design tokens — colors, typography, spacing, effects, icons, layout, AI layer
```

Then find the line mentioning the component count:

```
Softuq is a React design system with a soft UI aesthetic. It ships 37+ accessible components, …
```

Change `37+` to `40+`.

- [ ] **Step 8.4: Verify**

Run `pnpm dev`, visit:
- `/foundations` — new "AI Layer" card appears in the grid with the Sparkles icon, clicking it navigates to `/foundations/ai-layer`.
- `/sitemap.xml` — new `<url>` entry for `/foundations/ai-layer`.
- `/llms.txt` — foundations list shows "AI layer", count is 40+.

- [ ] **Step 8.5: Commit**

```bash
git add packages/docs/src/app/\(site\)/foundations/page.tsx packages/docs/src/app/sitemap.ts packages/docs/src/app/llms.txt/route.ts
git commit -m "docs: surface AI Layer in foundations index, sitemap, llms.txt"
```

---

## Task 9 — CLI registry + init

Make `npx softuq init` copy AI tokens into user projects, and `npx softuq add halo|dots|aurora` pull component files.

**Files:**
- Modify: `packages/cli/src/registry/react.json`
- Modify: `packages/cli/src/commands/init.ts`

- [ ] **Step 9.1: Add registry entries**

Edit `packages/cli/src/registry/react.json`. Inside the `"components"` object, insert three new entries. Place them alphabetically; the file appears to be alphabetical so `aurora` goes near the top (after `avatar`), `dots` between `dialog` and `dropdown-menu`, `halo` between `form-text` and `input`:

```json
    "aurora": {
      "files": ["components/ai/aurora.tsx"],
      "dependencies": ["class-variance-authority"],
      "registryDeps": []
    },
    "dots": {
      "files": ["components/ai/dots.tsx"],
      "dependencies": ["class-variance-authority"],
      "registryDeps": []
    },
    "halo": {
      "files": ["components/ai/halo.tsx"],
      "dependencies": ["class-variance-authority"],
      "registryDeps": []
    },
```

- [ ] **Step 9.2: Wire `ai.css` into the generated tokens file on init**

Edit `packages/cli/src/commands/init.ts`. Find the block that reads source CSS files (around line 156–162):

```ts
const primitives = await fs.readFile(path.join(tokensDir, "primitives.css"), "utf-8");
const semantic = await fs.readFile(path.join(tokensDir, "semantic.css"), "utf-8");
const tailwindTheme = await fs.readFile(path.join(tokensDir, "tailwind-theme.css"), "utf-8");

const tokensFile = path.join(cssDir, "softuq-tokens.css");
await fs.writeFile(tokensFile, `${marker}\n${primitives}\n\n${semantic}\n\n${BASE_TYPOGRAPHY_CSS}`);
```

Change to:

```ts
const primitives = await fs.readFile(path.join(tokensDir, "primitives.css"), "utf-8");
const semantic = await fs.readFile(path.join(tokensDir, "semantic.css"), "utf-8");
const ai = await fs.readFile(path.join(tokensDir, "ai.css"), "utf-8");
const tailwindTheme = await fs.readFile(path.join(tokensDir, "tailwind-theme.css"), "utf-8");

const tokensFile = path.join(cssDir, "softuq-tokens.css");
await fs.writeFile(tokensFile, `${marker}\n${primitives}\n\n${semantic}\n\n${ai}\n\n${BASE_TYPOGRAPHY_CSS}`);
```

- [ ] **Step 9.3: Verify `softuq init` copies AI tokens into a fresh project**

From repo root:

```bash
pnpm --filter softuq build
mkdir -p /tmp/softuq-ai-test
cd /tmp/softuq-ai-test
pnpm create vite@latest test-app --template react-ts --yes
cd test-app
pnpm install
node /Users/michalmarek/Documents/Projects/DesignYstem/packages/cli/dist/index.js init --yes
grep -l "ai-hue-1" src/softuq-tokens.css && echo OK || echo MISSING
```

Expected output: `OK`. That proves `ai.css` content was appended to the generated `softuq-tokens.css`.

Also confirm `node_modules` received `class-variance-authority` (already required by other components — no new npm install expected).

- [ ] **Step 9.4: Verify `softuq add halo` pulls the file**

Still in `/tmp/softuq-ai-test/test-app`:

```bash
node /Users/michalmarek/Documents/Projects/DesignYstem/packages/cli/dist/index.js add halo dots aurora
ls src/components/ai
```

Expected: `aurora.tsx  dots.tsx  halo.tsx`.

Also run:

```bash
node /Users/michalmarek/Documents/Projects/DesignYstem/packages/cli/dist/index.js list
```

Expected: output includes `halo`, `dots`, `aurora` under the component list.

- [ ] **Step 9.5: Commit**

```bash
cd /Users/michalmarek/Documents/Projects/DesignYstem
git add packages/cli/src/registry/react.json packages/cli/src/commands/init.ts
git commit -m "feat(cli): register AI primitives + wire ai.css into init"
```

---

## Task 10 — CLI docs, CHANGELOG, version bumps, final QA

Per `CLAUDE.md` convention, CLI-behavior changes must be synced in three places.

**Files:**
- Modify: `packages/cli/README.md`
- Modify: `packages/docs/src/app/getting-started/page.tsx`
- Modify: `packages/cli/CHANGELOG.md`
- Modify: `packages/cli/package.json`
- Modify: `packages/tokens/package.json`
- Modify: `packages/react/package.json`

- [ ] **Step 10.1: Update `packages/cli/README.md`**

Locate the "What init does" section (grep for it). Append a bullet:

```
- Copies `ai.css` (AI layer palette + motion defaults) into the generated tokens file.
```

Locate the `list` command example or feature list; ensure it mentions the new `ai` category surfaces `halo`, `dots`, and `aurora`.

- [ ] **Step 10.2: Update `packages/docs/src/app/getting-started/page.tsx`**

Grep for the "What init does" section (likely a `<ul>` list of bullets). Add the same bullet:

```
Copies ai.css (AI layer palette + motion defaults) into your tokens file.
```

- [ ] **Step 10.3: Bump versions**

Run from repo root (semver minor for each: new feature, no breakage):

```bash
node -e "const p=require('./packages/tokens/package.json');const [M,m,pt]=p.version.split('.').map(Number);p.version=\`\${M}.\${m+1}.0\`;require('fs').writeFileSync('./packages/tokens/package.json', JSON.stringify(p,null,2)+'\n');console.log('tokens →',p.version)"
node -e "const p=require('./packages/react/package.json');const [M,m,pt]=p.version.split('.').map(Number);p.version=\`\${M}.\${m+1}.0\`;require('fs').writeFileSync('./packages/react/package.json', JSON.stringify(p,null,2)+'\n');console.log('react →',p.version)"
node -e "const p=require('./packages/cli/package.json');const [M,m,pt]=p.version.split('.').map(Number);p.version=\`\${M}.\${m+1}.0\`;require('fs').writeFileSync('./packages/cli/package.json', JSON.stringify(p,null,2)+'\n');console.log('cli →',p.version)"
```

Record the three new version numbers. Example output (actual values will vary): `tokens → 0.4.0`, `react → 0.X.0`, `cli → 0.9.0`.

- [ ] **Step 10.4: Append CHANGELOG entry**

Edit `packages/cli/CHANGELOG.md`. Add a new entry at the top (below the `# Changelog` header, above the previous latest version):

```markdown
## 0.9.0 (2026-04-17)

### Added

- AI layer: new registry category with three components — `halo`, `dots`, `aurora`.
- `init` now copies the AI tokens (`ai.css` — pastel iridescent palette + motion defaults) into the generated `softuq-tokens.css`.
```

Adjust the version number to whatever `pnpm` bumped `packages/cli/package.json` to in Step 10.3.

- [ ] **Step 10.5: Final integration QA pass**

Clean, rebuild, and run the docs site:

```bash
lsof -ti:3333 | xargs kill -9 2>/dev/null
rm -rf packages/docs/.next
pnpm dev
```

Manual pass, checking each item:

1. `/components` — Halo, Dots, Aurora sections render with all variants; SectionNav jumps work.
2. `/foundations` — new AI Layer card present, clickable.
3. `/foundations/ai-layer` — hero, swatches, semantic list, component vars table, guidelines, motion note all render.
4. Swap `<html data-theme="light">` in devtools — AI visuals remain identical (no flicker, no color shift).
5. Swap accent via Softuq provider controls (top right of docs site) to `emerald` — AI visuals do NOT change (iridescent is theme-agnostic). Halo `mono` tone DOES change to emerald (bound to accent).
6. Enable reduced-motion (macOS System Settings → Accessibility → Display → Reduce motion) → animations freeze, visuals remain.
7. `pnpm lint` — biome passes.

If any of the above fails, fix inline and recommit before moving on.

- [ ] **Step 10.6: Final commit**

```bash
git add packages/cli/README.md packages/docs/src/app/getting-started/page.tsx packages/cli/CHANGELOG.md packages/cli/package.json packages/tokens/package.json packages/react/package.json
git commit -m "chore(ai-layer): sync CLI docs + CHANGELOG + version bumps for v1"
```

- [ ] **Step 10.7: Verify commit history**

```bash
git log --oneline main..HEAD
```

Expected (approximately 10 commits, in order):

```
feat(tokens): add AI layer — pastel iridescent palette + component defaults
feat(tokens,docs): AI keyframes, @theme mapping, reduced-motion scope
feat(react): add <Halo> — rotating iridescent border primitive
feat(react): add <Dots> — three-dot thinking indicator
feat(react): add <Aurora> — drifting background gradient primitive
docs(components): add Halo, Dots, Aurora sections to /components
docs(foundations): add /foundations/ai-layer page
docs: surface AI Layer in foundations index, sitemap, llms.txt
feat(cli): register AI primitives + wire ai.css into init
chore(ai-layer): sync CLI docs + CHANGELOG + version bumps for v1
```

All 10 commits present, clean, main branch clean-ish (no uncommitted noise).

---

## Self-review

Spec coverage (from `docs/superpowers/specs/2026-04-17-softuq-ai-layer-a-design.md`):

- Tokens 3-layer structure → Task 1. ✓
- Keyframes + reduced-motion → Task 2. ✓
- Tailwind `@theme` mapping → Task 2. ✓
- `<Halo>` API exactly matches spec (tone/size/speed/active/radius) → Task 3. ✓
- `<Dots>` API with tone/size/pattern/aria-label → Task 4. ✓
- `<Aurora>` API with intensity/coverage/animate → Task 5. ✓
- `data-ai-primitive` + `data-ai-layer` attributes on all three → Tasks 3–5. ✓
- `/components` sections → Task 6. ✓
- `/foundations/ai-layer` → Task 7 + Task 8. ✓
- Sitemap + llms.txt updates → Task 8. ✓
- CLI registry + init change → Task 9. ✓
- CLI docs + CHANGELOG + version bumps → Task 10. ✓
- Final manual QA pass → Task 10.5. ✓

No gaps found. No placeholders. Type names (`HaloTone`, `DotsTone`, `DotsPattern`, `AuroraCoverage`) are consistent across tasks. Ready for execution.

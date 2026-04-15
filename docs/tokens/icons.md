# Icons

Two libraries with disjoint domains — always clear which to reach for.

## Libraries

| Library | Domain | Package (React) |
|---|---|---|
| Lucide | UI primitives — arrows, form states, navigation, status | `lucide-react` |
| Simple Icons | Brand logos — GitHub, X, Figma, Stripe, ~3200 more | `@icons-pack/react-simple-icons` |

Lucide v1.0 removed brand logos for trademark reasons. Simple Icons ships only brand logos, no UI primitives.

## Per-framework packages

Both libraries ship framework-specific packages with identical icon names. Blocks and components are copy-paste per framework — imports swap automatically.

| Framework | UI icons | Brand logos |
|---|---|---|
| React | `lucide-react` | `@icons-pack/react-simple-icons` |
| Vue | `lucide-vue-next` | `@icons-pack/vue-simple-icons` |
| Svelte | `lucide-svelte` | `@icons-pack/svelte-simple-icons` |

## Naming

| Library | Prefix | Example |
|---|---|---|
| Lucide | none | `Search`, `Settings`, `ChevronDown` |
| Simple Icons | `Si` | `SiGithub`, `SiX`, `SiFigma` |

Simple Icons ship single-color by default. Colored variants exist with a `Hex` suffix (e.g. `SiGithubHex`).

## Sizing

Default size is `1em` — icons inherit font size. Override with Tailwind size utilities:

| Utility | Use |
|---|---|
| `size-3` | 12px — inline with small text |
| `size-4` | 16px — inputs, buttons, alerts (default) |
| `size-5` | 20px — cards, list items |
| `size-6` | 24px — headers, empty states |

## Coloring

Icons inherit color via `currentColor`. The parent element sets the text color — the icon follows.

```tsx
// Wrong — hardcoded on the icon
<Bell stroke="#3b82f6" className="size-5" />

// Right — parent drives color, icon inherits
<div className="text-accent">
  <Bell className="size-5" />
</div>

// Shorthand — same thing
<Bell className="size-5 text-accent" />
```

Components paint child icons via the `[&>svg]:text-*` selector on the CVA variant — the icon stays prop-free. See Alert variants (`info`, `success`, `warning`, `destructive`).

## Rules

- Never inline raw SVG — always import from the right package.
- Never mix a brand logo into a design system component (blocks only).
- Never pass `color`/`stroke` props on the icon — let the parent drive it.

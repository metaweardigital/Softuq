# Icons reference

## Two libraries, clear split

| Library | Package | Use for |
|---|---|---|
| Lucide | `lucide-react` | UI primitives — arrows, checks, chevrons, status icons, functional glyphs |
| Simple Icons | `@icons-pack/react-simple-icons` | Brand logos — GitHub, npm, Stripe, Discord, Slack, etc. |

Never mix — a Lucide `Github` glyph would look inconsistent next to the official Simple Icons brand mark.

## Rules

- **Never inline raw `<svg>` in components.** If the glyph you need isn't in either library, add it to the library's typed re-export or mention it to the team — don't drop an SVG into JSX.
- **Color via `currentColor`** — icons inherit from the parent's text color. Set color on the parent or with `text-*` on the icon itself. Never hardcode `fill` or `stroke`.
- **Size via `size-*` utilities** (`size-4`, `size-5`, `size-6`). Never `w-4 h-4` — the pair is fragile, size keeps it atomic.

```tsx
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { SiGithub, SiNpm } from "@icons-pack/react-simple-icons";

<ArrowRight className="size-4 text-fg-muted" />
<SiGithub className="size-5 text-fg-primary" />
```

## Size scale

| Class | Pixel size | Use |
|---|---|---|
| `size-3` | 12px | Inline in badges, tiny indicators |
| `size-4` | 16px | Default — buttons, inputs, menu items |
| `size-5` | 20px | Card headers, section icons |
| `size-6` | 24px | Hero / feature callouts |
| `size-8` or bigger | 32px+ | Decorative illustrations — rare |

## Stroke width

Lucide default is `strokeWidth={2}`. For dense UI (small size-3 or size-4) consider `strokeWidth={1.75}` for a lighter feel. Don't change per-icon — set via a `<LucideProvider>` or wrap once.

## Per-framework packages

If porting to another framework, both libraries have official packages:

| Framework | Lucide | Simple Icons |
|---|---|---|
| React | `lucide-react` | `@icons-pack/react-simple-icons` |
| Vue | `lucide-vue-next` | `@icons-pack/vue-simple-icons` |
| Svelte | `lucide-svelte` | `@icons-pack/svelte-simple-icons` |

The component source can be identical aside from the import — icons swap cleanly.

## Naming

- Lucide icons are imported as PascalCase of the kebab-case Lucide name: `chevron-right` → `<ChevronRight />`
- Simple Icons are prefixed with `Si`: `<SiGithub />`, `<SiNpm />`, `<SiStripe />`

## What NOT to do

```tsx
// ❌ Inline SVG
<svg xmlns="..." viewBox="0 0 24 24"><path d="..." /></svg>

// ❌ Fill/stroke hardcoded
<Check fill="#10b981" />

// ❌ Size via w/h pair
<ArrowRight className="w-4 h-4" />

// ❌ Mixing libraries for the same concept
<Github /> // Lucide's stylized GitHub, not the brand mark
```

```tsx
// ✅ Library import, currentColor inheritance, size-*
<Check className="size-4 text-success-text" />
<SiGithub className="size-4" />  // brand mark, official
```

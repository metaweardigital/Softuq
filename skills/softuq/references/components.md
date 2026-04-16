# Components reference

## File structure

Every component file follows this exact order. No variation. This keeps `VariantProps<typeof variants>` valid — CVA must exist before the interface uses it.

```tsx
// 1. Imports (external → internal → types)
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 2. CVA variants (BEFORE interface)
const buttonVariants = cva(
  // Base classes — apply to all variants
  "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-accent text-fg-inverse hover:bg-accent-hover",
        secondary: "bg-bg-elevated text-fg-primary hover:bg-bg-hover",
        outline: "border border-edge-default bg-transparent hover:bg-bg-hover",
        ghost: "hover:bg-bg-hover",
        destructive: "bg-destructive text-fg-inverse hover:bg-destructive-hover",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-[var(--ds-radius-button)]",
        md: "h-10 px-4 text-sm rounded-[var(--ds-radius-button)]",
        lg: "h-12 px-6 text-base rounded-[var(--ds-radius-button)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// 3. Props interface — extends native element attrs + VariantProps
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// 4. Component with forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

// 5. Exports — types first, then values
export type { ButtonProps };
export { Button, buttonVariants };
```

## Rules

### Structural

- **Always `React.forwardRef`** on components that render a DOM element (so consumers can grab refs for focus, measurements, etc.).
- **Always `type="button"`** on `<button>` elements (prevents accidental form submission). Either hardcode `type="button"` or accept via props with a default.
- **CVA for all variants.** No conditional class strings, no inline ternaries for styling — push variants into CVA.
- **`cn()` for merging.** Import from `@/lib/utils`. Handles Tailwind class conflicts with `tailwind-merge`.
- **`displayName`** on every forwardRef component — React DevTools needs it.

### Ordering

Within a file, ordering goes **most global → most specific**:
- Imports (external → internal → types)
- CVA variants (must precede interface)
- Interface (extends `VariantProps<typeof variants>`)
- Component
- Exports (types first, then values)

### Exports

Export in this order:
1. `export type { PropsInterface }`
2. `export { Component, componentVariants }`

Named exports only — no default exports for components.

### Comments

- **Section dividers** (`/* === Section === */`) only in files with **3+ logical sections**. Examples: `softuq-provider.tsx`, `toast.tsx`. Simple components (Button, Alert, Card) don't need them.
- **Inline comments** only when logic isn't self-evident. "This increments X" is noise; "Debounce at 300ms to avoid API spam during typing" is signal.

## Composable APIs

Complex components split into multiple parts for composability. Example: `Card` exposes `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` — consumers assemble.

Components with composable APIs currently:
- `Card` — header, title, description, content, footer
- `Dialog` — trigger, content, header, title, description, footer
- `Select` — trigger, content, item, group, label, separator. Supports single + multi (`multiple` prop) with responsive tag display (`maxTags`, default 2), `+N` counter, and width-based breakpoints.
- `Accordion` — item, trigger, content
- `Breadcrumb` — list, item, link, page, separator, ellipsis, collapsed (`BreadcrumbCollapsed` wraps ellipsis + DropdownMenu for collapsed middle levels)
- `Search` — input, content, item, group. `SearchInput` works standalone (no wrapper needed). Props: `loading`, `tags`, `shortcut`.
- `NavigationMenu` — list, item, trigger, content, link, viewport. Hover-triggered mega-menu with auto-positioned portal-rendered viewport. Use `navigationMenuTriggerStyle()` for standalone link styling.
- `SectionNav` — group, item. Auto-tracks visible sections via IntersectionObserver (`observeSelector`) or accepts controlled `activeId`. Mobile: dots inheriting text color.

**Don't add props to composable components to skip the composition.** If `Card` feels verbose, the answer is a wrapper in the consumer's code, not a new prop.

## Code display

Two components, different roles:

- `Code` — **inline** snippet. Hover effect, border. Use inside paragraphs for identifiers, CSS vars, short references.
- `CodeBlock` — **block-level** with syntax highlighting + copy-to-clipboard. Always-dark (`data-theme="dark"` internally, independent of page theme). `language` prop: `auto` (default, JS/TSX/shell), `md`/`markdown`, or `plain`. Never render markdown code blocks as raw `<pre>` — use `CodeBlock`.

## Variants via className (not props)

The SoftuqProvider handles palette / accent / radius / spacing / font globally. **Component-level overrides use `className`**, not extra props.

```tsx
// ✅ Right — className override
<Button className="rounded-full">Pill</Button>

// ❌ Wrong — adding a prop for a one-off
<Button shape="pill">Pill</Button>
```

## `asChild` pattern

Triggers that wrap other interactive elements use `asChild` (Radix convention) to avoid nested buttons:

```tsx
<DialogTrigger asChild>
  <Button>Open</Button>
</DialogTrigger>
```

Never do `<DialogTrigger><Button>...</Button></DialogTrigger>` without `asChild` — it produces nested `<button>` elements, invalid HTML, broken focus.

## Forms

`FormField` wraps `Label` + `Input`/`Select`/`Textarea` + `FormDescription` + `FormMessage`. The `size` prop cascades to children.

```tsx
<FormField size="md">
  <Label>Email</Label>
  <Input placeholder="you@example.com" />
  <FormDescription>We'll never share it.</FormDescription>
  <FormMessage>Required field.</FormMessage>
</FormField>
```

## Badge vs Tag

- **Badge** — static indicator (status, count, label). Never interactive. `<Badge>New</Badge>`
- **Tag** — interactive label (dismissible, hover/focus states). Used in multi-select or filter chips. `<Tag>React</Tag>`

If it needs a hover state, it's a Tag.

## When creating a new component

Checklist:
1. Copy file structure from `examples/component.tsx`
2. Name the CVA variants (`componentNameVariants`)
3. Extend the right native element type in `interface`
4. Use semantic color utilities (`bg-bg-card`, not hex)
5. Use `rounded-[var(--ds-radius-*)]` for radii
6. Use `var(--ds-space-*)` for padding/gaps
7. Add `displayName`
8. Export types first, then values
9. Add a registry entry in `packages/cli/src/registry/react.json` (if distributable)

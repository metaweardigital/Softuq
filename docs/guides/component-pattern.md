# Component Pattern

Every component follows this structure.

## Dependencies

- `class-variance-authority` — variant definitions
- `clsx` + `tailwind-merge` via `cn()` — class merging
- `lucide-react` — icons
- `React.forwardRef` — ref forwarding on all components

## Template

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const componentVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", secondary: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Component.displayName = "Component";

export { Component, componentVariants };
export type { ComponentProps };
```

## Rules

- Always export the component, its variants, and its props type
- Use `cn()` to merge className overrides — never hardcode without allowing override
- Use semantic color tokens (`bg-bg-card`, `text-text-primary`), never raw values
- Spacing on 4px grid
- All interactive elements need focus-visible ring
- Disabled state: `disabled:pointer-events-none disabled:opacity-50`
- Label wrapping for Checkbox/Radio: use native `<label>` with `<span>` for text — not `<Label>` component (renders its own `<label>`, nesting is invalid HTML). Add `select-none` and `cursor-pointer` (or `cursor-not-allowed` for disabled) on the wrapper.

## Theming: Radius & Spacing

Components use CSS custom properties for radius and spacing, controlled globally via `<DesignYstemProvider>`:

```tsx
<DesignYstemProvider palette="zinc" accent="violet" radius="lg" spacing="md">
  <App />
</DesignYstemProvider>
```

**Palette presets:** `neutral` | `zinc` | `stone` | `slate` | `mauve` | `olive`
**Accent presets:** `blue` | `violet` | `emerald` | `amber` | `red` | `rose` | `cyan` | `orange`
**Radius presets:** `none` | `sm` | `md` | `lg` | `full`
**Spacing presets:** `sm` | `md` | `lg`

Components reference variables like `rounded-[var(--ds-radius-card)]` and `p-[var(--ds-space-card)]` instead of hardcoded values.

### Per-component override

Don't add extra `radius`/`spacing` props. Use `className` override instead — `cn()` with `tailwind-merge` handles conflicts:

```tsx
{/* Global preset is lg, but this alert uses sm radius + compact padding */}
<Alert className="rounded-lg p-3">
  ...
</Alert>
```

Global theming via provider, local override via className.

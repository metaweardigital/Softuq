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

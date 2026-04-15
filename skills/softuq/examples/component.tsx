/**
 * Canonical Softuq component template.
 *
 * Copy this file when creating a new component. Replace "badge" with your
 * component name. Follow the order strictly — CVA must come before the
 * interface because VariantProps<typeof ...> depends on it.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 1. CVA variants — ALWAYS before the interface
const badgeVariants = cva(
  // Base: inline, centered, typography, transitions
  "inline-flex items-center gap-1 font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-accent-muted text-accent-text border border-accent-border",
        outline: "bg-transparent text-fg-primary border border-edge-default",
        secondary: "bg-bg-elevated text-fg-secondary border border-edge-subtle",
        destructive: "bg-destructive-muted text-destructive-text border border-destructive-border",
        success: "bg-success-muted text-success-text border border-success-border",
      },
      size: {
        sm: "h-5 px-1.5 text-[10px] rounded-[var(--ds-radius-badge)]",
        md: "h-6 px-2 text-xs rounded-[var(--ds-radius-badge)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// 2. Interface — extends native element + VariantProps
interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

// 3. Component — forwardRef, named, displayName
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

// 4. Exports — types first, then values
export type { BadgeProps };
export { Badge, badgeVariants };

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const badgeVariants = cva("inline-flex items-center font-medium transition-colors duration-fast", {
  variants: {
    variant: {
      default: "bg-accent text-white",
      secondary: "bg-surface-elevated text-fg-secondary border border-edge-subtle",
      outline: "border border-edge-default text-fg-primary bg-transparent",
      ghost: "bg-transparent text-fg-secondary",
      destructive: "bg-destructive-muted text-destructive-text border border-destructive-border",
      success: "bg-success-muted text-success-text border border-success-border",
      warning: "bg-warning-muted text-warning-text border border-warning-border",
    },
    size: {
      sm: "px-2 py-0.5 text-xs rounded-[var(--ds-radius-button)]",
      md: "px-2.5 py-0.5 text-xs rounded-[var(--ds-radius-button)]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, size, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant, size, className }))} {...props} />
));
Badge.displayName = "Badge";

export type { BadgeProps };
export { Badge, badgeVariants };

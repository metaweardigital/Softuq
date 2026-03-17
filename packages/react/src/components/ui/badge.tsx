import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const badgeVariants = cva("inline-flex items-center font-medium transition-colors duration-fast", {
  variants: {
    variant: {
      default: "bg-accent text-white",
      secondary: "bg-bg-elevated text-text-secondary border border-border-subtle",
      outline: "border border-border-default text-text-primary bg-transparent",
      destructive: "bg-destructive-muted text-destructive-text",
      success: "bg-success-muted text-success-text",
      warning: "bg-warning-muted text-warning-text",
    },
    size: {
      sm: "px-2 py-0.5 text-xs rounded-md",
      md: "px-2.5 py-0.5 text-xs rounded-lg",
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

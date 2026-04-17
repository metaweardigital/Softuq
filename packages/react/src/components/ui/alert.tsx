import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const alertVariants = cva(
  "relative rounded-[var(--ds-radius-card)] border p-[var(--ds-space-card-sm)] text-xs [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:h-4 [&>svg]:w-4 [&:has(svg)]:pl-11",
  {
    variants: {
      variant: {
        default: "bg-surface-card border-edge-subtle text-fg-primary [&>svg]:text-fg-secondary",
        info: "bg-surface-card border-edge-subtle text-fg-primary [&>svg]:text-accent",
        success: "bg-surface-card border-edge-subtle text-fg-primary [&>svg]:text-success",
        warning: "bg-surface-card border-edge-subtle text-fg-primary [&>svg]:text-warning",
        destructive: "bg-surface-card border-edge-subtle text-fg-primary [&>svg]:text-destructive",
      },
      size: {
        full: "w-full",
        fit: "w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "full",
    },
  },
);

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ className, variant, size, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant, size, className }))} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-xs font-semibold leading-tight tracking-tight [&:has(~p)]:mb-1", className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs text-fg-secondary [&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";

export type { AlertProps };
export { Alert, AlertDescription, AlertTitle, alertVariants };

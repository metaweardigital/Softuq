import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const alertVariants = cva(
  "relative rounded-2xl border p-4 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:h-4 [&>svg]:w-4 [&:has(svg)]:pl-11",
  {
    variants: {
      variant: {
        default: "bg-bg-card border-border-subtle text-text-primary [&>svg]:text-text-secondary",
        info: "bg-bg-card border-border-subtle text-text-primary [&>svg]:text-accent",
        success: "bg-bg-card border-border-subtle text-text-primary [&>svg]:text-success",
        warning: "bg-bg-card border-border-subtle text-text-primary [&>svg]:text-warning",
        destructive: "bg-bg-card border-border-subtle text-text-primary [&>svg]:text-destructive",
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

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("font-semibold leading-tight tracking-tight [&:has(~p)]:mb-1", className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-text-secondary [&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";

export type { AlertProps };
export { Alert, AlertDescription, AlertTitle, alertVariants };

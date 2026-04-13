import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

const spinnerVariants = cva("inline-block animate-spin text-current", {
  variants: {
    size: {
      sm: "h-3.5 w-3.5",
      md: "h-4 w-4",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface SpinnerProps extends Omit<React.SVGAttributes<SVGSVGElement>, "size">, VariantProps<typeof spinnerVariants> {
  label?: string;
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, label = "Loading", ...props }, ref) => {
    return (
      <Loader2
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(spinnerVariants({ size }), className)}
        {...props}
      />
    );
  },
);
Spinner.displayName = "Spinner";

export type { SpinnerProps };
export { Spinner, spinnerVariants };

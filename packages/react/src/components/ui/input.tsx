import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  [
    "flex w-full bg-bg-input text-text-primary placeholder:text-text-muted",
    "border border-border-subtle rounded-[var(--ds-radius-input)]",
    "transition-all duration-normal ease-soft",
    "focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive focus:ring-destructive/20 focus:border-destructive",
        success: "border-success focus:ring-success/20 focus:border-success",
      },
      inputSize: {
        sm: "h-8 px-[var(--ds-space-button-sm)] text-xs",
        md: "h-10 px-[var(--ds-space-input-x)] text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  },
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, ...props }, ref) => {
    return <input type={type} className={cn(inputVariants({ variant, inputSize, className }))} ref={ref} {...props} />;
  },
);
Input.displayName = "Input";

export type { InputProps };
export { Input, inputVariants };

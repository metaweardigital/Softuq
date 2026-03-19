import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { useFormFieldSize } from "./form-text";

const labelVariants = cva("font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50", {
  variants: {
    variant: {
      default: "text-text-secondary",
      required: "text-text-secondary after:content-['*'] after:ml-0.5 after:text-destructive",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, variant, size, ...props }, ref) => {
  const fieldSize = useFormFieldSize();
  const resolvedSize = size ?? fieldSize;
  return <label ref={ref} className={cn(labelVariants({ variant, size: resolvedSize, className }))} {...props} />;
});
Label.displayName = "Label";

export type { LabelProps };
export { Label, labelVariants };

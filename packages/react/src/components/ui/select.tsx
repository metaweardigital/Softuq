import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

const selectVariants = cva(
  [
    "flex w-full bg-bg-input text-text-primary",
    "border border-border-subtle rounded-2xl",
    "transition-all duration-normal ease-soft",
    "focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "appearance-none cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive focus:ring-destructive/20 focus:border-destructive",
      },
      selectSize: {
        sm: "h-8 px-3 pr-8 text-xs",
        md: "h-10 px-4 pr-10 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      selectSize: "md",
    },
  },
);

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, selectSize, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select ref={ref} className={cn(selectVariants({ variant, selectSize, className }))} {...props}>
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
      </div>
    );
  },
);
Select.displayName = "Select";

const SelectOption = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  ({ className, ...props }, ref) => (
    <option ref={ref} className={cn("bg-bg-elevated text-text-primary", className)} {...props} />
  ),
);
SelectOption.displayName = "SelectOption";

export type { SelectProps };
export { Select, SelectOption, selectVariants };

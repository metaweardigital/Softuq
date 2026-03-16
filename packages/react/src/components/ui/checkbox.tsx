import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

const checkboxVariants = cva(
  [
    "shrink-0 rounded-md border border-border-default bg-bg-input",
    "transition-all duration-fast ease-soft",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "cursor-pointer appearance-none",
    "checked:bg-accent checked:border-accent",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive",
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof checkboxVariants> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, variant, size, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    return (
      <div className="relative inline-flex items-center justify-center">
        <input
          type="checkbox"
          ref={ref}
          className={cn(checkboxVariants({ variant, size, className }))}
          onChange={handleChange}
          {...props}
        />
        <Check
          className={cn(
            "pointer-events-none absolute text-white opacity-0",
            "transition-opacity duration-fast",
            props.checked || props.defaultChecked ? "opacity-100" : "",
            size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"
          )}
        />
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
export type { CheckboxProps };

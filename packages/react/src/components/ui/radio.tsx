import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const radioVariants = cva(
  [
    "shrink-0 rounded-full border border-border-default bg-bg-input",
    "transition-all duration-fast ease-soft",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "cursor-pointer appearance-none",
    "checked:border-accent checked:bg-accent",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, orientation = "vertical", children, ...props }, ref) => (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col gap-3" : "flex-row gap-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof radioVariants> {
  value: string;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, size, value: itemValue, ...props }, ref) => {
    const { value, onValueChange } = React.useContext(RadioGroupContext);

    return (
      <div className="relative inline-flex items-center justify-center">
        <input
          type="radio"
          ref={ref}
          value={itemValue}
          checked={value === itemValue}
          onChange={() => onValueChange?.(itemValue)}
          className={cn(radioVariants({ size, className }))}
          {...props}
        />
        <span
          className={cn(
            "pointer-events-none absolute rounded-full bg-white transition-transform duration-fast ease-bounce",
            value === itemValue ? "scale-100" : "scale-0",
            size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2"
          )}
        />
      </div>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem, radioVariants };
export type { RadioGroupProps, RadioGroupItemProps };

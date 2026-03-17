import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const toggleVariants = cva("", {
  variants: {
    size: {
      sm: "",
      md: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size">,
    VariantProps<typeof toggleVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, size, checked = false, onCheckedChange, disabled, ...props }, ref) => {
    const isSmall = size === "sm";
    const trackW = isSmall ? "w-8" : "w-11";
    const trackH = isSmall ? "h-4" : "h-6";
    const thumbSize = isSmall ? "h-3 w-3" : "h-5 w-5";
    const thumbTranslate = checked ? (isSmall ? "translate-x-4" : "translate-x-5") : "translate-x-0";

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-full",
          "border border-border-subtle transition-colors duration-normal ease-soft",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
          "disabled:cursor-not-allowed disabled:opacity-50",
          trackW,
          trackH,
          checked ? "bg-accent" : "bg-bg-input",
          className,
        )}
        onClick={() => onCheckedChange?.(!checked)}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none rounded-full bg-white shadow-sm",
            "transition-transform duration-normal ease-bounce",
            thumbSize,
            thumbTranslate,
          )}
        />
      </button>
    );
  },
);
Toggle.displayName = "Toggle";

export type { ToggleProps };
export { Toggle, toggleVariants };

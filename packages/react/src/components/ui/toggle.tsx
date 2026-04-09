import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const toggleVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center rounded-full",
    "border border-border-subtle transition-colors duration-normal ease-soft",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "w-8 h-4",
        md: "w-11 h-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const thumbVariants = cva(
  "pointer-events-none rounded-full bg-white shadow-sm transition-transform duration-normal ease-bounce",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-5 w-5",
      },
      checked: {
        true: "",
        false: "translate-x-0",
      },
    },
    compoundVariants: [
      { size: "sm", checked: true, className: "translate-x-4" },
      { size: "md", checked: true, className: "translate-x-5" },
    ],
    defaultVariants: {
      size: "md",
      checked: false,
    },
  },
);

interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size">,
    VariantProps<typeof toggleVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, size, checked = false, onCheckedChange, ...props }, ref) => {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        ref={ref}
        className={cn(toggleVariants({ size }), checked ? "bg-accent" : "bg-bg-input", className)}
        onClick={() => onCheckedChange?.(!checked)}
        {...props}
      >
        <span className={cn(thumbVariants({ size, checked }))} />
      </button>
    );
  },
);
Toggle.displayName = "Toggle";

export type { ToggleProps };
export { Toggle, toggleVariants };

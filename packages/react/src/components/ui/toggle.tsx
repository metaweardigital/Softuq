import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const toggleVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-px",
    "border border-edge-subtle transition-colors duration-normal ease-soft",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
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
        sm: "h-4 w-4",
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
  label?: React.ReactNode;
  description?: React.ReactNode;
  labelPosition?: "left" | "right";
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    { className, size, checked = false, onCheckedChange, label, description, labelPosition = "right", id, ...props },
    ref,
  ) => {
    const generatedId = React.useId();
    const toggleId = id ?? generatedId;

    const toggle = (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        id={toggleId}
        ref={ref}
        className={cn(toggleVariants({ size }), checked ? "bg-accent" : "bg-surface-input", className)}
        onClick={() => onCheckedChange?.(!checked)}
        {...props}
      >
        <span className={cn(thumbVariants({ size, checked }))} />
      </button>
    );

    if (!label && !description) return toggle;

    const textBlock = (
      <div className="flex flex-col gap-0.5 select-none">
        {label && (
          <label
            htmlFor={toggleId}
            className={cn(
              "cursor-pointer text-fg-primary leading-none",
              size === "sm" ? "text-xs" : "text-sm",
              props.disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {label}
          </label>
        )}
        {description && (
          <p className={cn("text-fg-muted leading-snug", size === "sm" ? "text-[11px]" : "text-xs")}>{description}</p>
        )}
      </div>
    );

    return (
      <div className="inline-flex items-center gap-3">
        {labelPosition === "left" && textBlock}
        {toggle}
        {labelPosition === "right" && textBlock}
      </div>
    );
  },
);
Toggle.displayName = "Toggle";

export type { ToggleProps };
export { Toggle, toggleVariants };

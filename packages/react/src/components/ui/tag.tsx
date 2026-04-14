import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

const tagVariants = cva(
  [
    "inline-flex items-center gap-1 font-medium select-none",
    "transition-all duration-fast ease-soft",
    "border border-edge-subtle",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-surface-elevated text-fg-primary hover:bg-surface-hover",
        accent: "bg-accent text-white hover:bg-accent-hover",
        success: "bg-success-muted text-success-text border-success-border hover:bg-success/20",
        warning: "bg-warning-muted text-warning-text border-warning-border hover:bg-warning/20",
        destructive: "bg-destructive-muted text-destructive-text border-destructive-border hover:bg-destructive/20",
      },
      size: {
        sm: "h-6 px-2 text-xs rounded-[var(--ds-radius-checkbox)]",
        md: "h-7 px-2.5 text-sm rounded-[var(--ds-radius-button)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {
  onDismiss?: () => void;
  disabled?: boolean;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, onDismiss, disabled, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        tagVariants({ variant, size }),
        disabled && "opacity-50 pointer-events-none",
        onDismiss && "pr-1",
        className,
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      {onDismiss && (
        <span
          role="button"
          tabIndex={disabled ? undefined : 0}
          aria-label="Remove"
          aria-disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onDismiss();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " " || e.key === "Backspace" || e.key === "Delete") {
              e.preventDefault();
              e.stopPropagation();
              if (!disabled) onDismiss();
            }
          }}
          className={cn(
            "inline-flex items-center justify-center shrink-0 rounded-full cursor-pointer",
            "transition-colors duration-fast ease-soft",
            "hover:bg-surface-base/20 hover:text-destructive",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20",
            size === "sm" ? "h-4 w-4" : "h-5 w-5",
          )}
        >
          <X className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
        </span>
      )}
    </span>
  ),
);
Tag.displayName = "Tag";

export type { TagProps };
export { Tag, tagVariants };

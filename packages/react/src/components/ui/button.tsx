import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium",
    "transition-all duration-normal ease-soft",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
    "[&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-accent text-white shadow-sm hover:bg-accent-hover border border-edge-subtle",
        secondary: "bg-surface-elevated text-fg-primary shadow-sm hover:bg-surface-hover border border-edge-subtle",
        destructive: "bg-destructive text-white shadow-sm hover:bg-destructive-hover border border-edge-subtle",
        ghost: "text-fg-secondary hover:bg-surface-hover hover:text-fg-primary",
        outline: "border border-edge-default bg-transparent text-fg-primary hover:bg-surface-hover",
        link: "text-accent-text underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-[var(--ds-radius-button)] px-[var(--ds-space-button-sm)] text-xs [&_svg]:size-3.5",
        md: "h-10 rounded-[var(--ds-radius-button)] px-[var(--ds-space-button-md)] text-sm [&_svg]:size-4",
        lg: "h-12 rounded-[var(--ds-radius-button)] px-[var(--ds-space-button-lg)] text-base [&_svg]:size-5",
        "icon-sm": "h-8 w-8 rounded-[var(--ds-radius-button)] [&_svg]:size-3.5",
        icon: "h-10 w-10 rounded-[var(--ds-radius-button)] [&_svg]:size-4",
        "icon-lg": "h-12 w-12 rounded-[var(--ds-radius-button)] [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild && React.isValidElement<Record<string, unknown>>(children)) {
      return React.cloneElement(children, {
        ref,
        className: cn(classes, (children.props as { className?: string }).className),
        ...props,
      });
    }

    return (
      <button type="button" className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export type { ButtonProps };
export { Button, buttonVariants };

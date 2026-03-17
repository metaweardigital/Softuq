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
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-accent text-white shadow-neu-raised hover:bg-accent-hover border border-border-subtle",
        secondary: "bg-bg-elevated text-text-primary shadow-neu-raised hover:bg-bg-hover border border-border-subtle",
        destructive:
          "bg-destructive text-white shadow-neu-raised hover:bg-destructive-hover border border-border-subtle",
        ghost: "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
        outline: "border border-border-default bg-transparent text-text-primary hover:bg-bg-hover",
        link: "text-accent-text underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-[var(--ds-radius-button)] px-[var(--ds-space-button-sm)] text-xs",
        md: "h-10 rounded-[var(--ds-radius-button)] px-[var(--ds-space-button-md)] text-sm",
        lg: "h-12 rounded-[var(--ds-radius-button)] px-[var(--ds-space-button-lg)] text-base",
        icon: "h-10 w-10 rounded-[var(--ds-radius-button)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export type { ButtonProps };
export { Button, buttonVariants };

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const kbdVariants = cva(
  [
    "inline-flex items-center justify-center font-medium select-none tracking-tight",
    "border border-edge-subtle text-fg-muted",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-5 min-w-5 px-1 text-[11px] rounded-[var(--ds-radius-checkbox)]",
        md: "h-6 min-w-6 px-1.5 text-xs rounded-[var(--ds-radius-checkbox)]",
        lg: "h-7 min-w-7 px-2 text-sm rounded-[var(--ds-radius-checkbox)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface KbdProps extends Omit<React.HTMLAttributes<HTMLElement>, "size">, VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(({ className, size, ...props }, ref) => {
  return <kbd ref={ref} className={cn(kbdVariants({ size }), className)} {...props} />;
});
Kbd.displayName = "Kbd";

export type { KbdProps };
export { Kbd, kbdVariants };

import { cva, type VariantProps } from "class-variance-authority";
import { ImageIcon } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

const placeholderVariants = cva(
  "relative flex items-center justify-center overflow-hidden rounded-[var(--ds-radius-card)] border bg-surface-input text-fg-dimmed",
  {
    variants: {
      ratio: {
        square: "aspect-square",
        portrait: "aspect-[2/3]",
        landscape: "aspect-[3/2]",
        classic: "aspect-[4/3]",
        video: "aspect-video",
        wide: "aspect-[21/9]",
        auto: "",
      },
      variant: {
        default: "border-edge-subtle",
        dashed: "border-dashed border-edge-default bg-transparent",
      },
    },
    defaultVariants: {
      ratio: "landscape",
      variant: "default",
    },
  },
);

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof placeholderVariants> {
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  hideIcon?: boolean;
}

const Placeholder = React.forwardRef<HTMLDivElement, PlaceholderProps>(
  ({ className, ratio, variant, icon: Icon = ImageIcon, label, hideIcon, children, ...props }, ref) => (
    <div ref={ref} className={cn(placeholderVariants({ ratio, variant, className }))} {...props}>
      {children ?? (
        <div className="flex flex-col items-center gap-2">
          {!hideIcon && <Icon className="size-6 opacity-60" />}
          {label && <span className="text-xs font-medium">{label}</span>}
        </div>
      )}
    </div>
  ),
);
Placeholder.displayName = "Placeholder";

export type { PlaceholderProps };
export { Placeholder, placeholderVariants };

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden rounded-[var(--ds-radius-avatar)] bg-surface-elevated border border-edge-subtle",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    return (
      <div ref={ref} className={cn(avatarVariants({ size, className }))} {...props}>
        {src && !hasError ? (
          <img
            src={src}
            alt={alt || ""}
            className="aspect-square h-full w-full object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-medium text-fg-secondary">
            {fallback || alt?.charAt(0)?.toUpperCase() || "?"}
          </span>
        )}
      </div>
    );
  },
);
Avatar.displayName = "Avatar";

export type { AvatarProps };
export { Avatar, avatarVariants };

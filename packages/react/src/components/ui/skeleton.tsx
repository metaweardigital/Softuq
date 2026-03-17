import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const skeletonVariants = cva(
  "animate-shimmer bg-gradient-to-r from-bg-elevated via-bg-hover to-bg-elevated bg-[length:200%_100%]",
  {
    variants: {
      variant: {
        default: "rounded-xl",
        circle: "rounded-full",
        text: "rounded-md h-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ className, variant, ...props }, ref) => (
  <div ref={ref} className={cn(skeletonVariants({ variant, className }))} {...props} />
));
Skeleton.displayName = "Skeleton";

export type { SkeletonProps };
export { Skeleton, skeletonVariants };

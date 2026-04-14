import * as React from "react";
import { cn } from "../../lib/utils";

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "rounded-[var(--ds-radius-card)] border border-dashed border-edge-subtle",
        "px-[var(--ds-space-card)] py-[var(--ds-space-stack-lg)] gap-4",
        className,
      )}
      {...props}
    />
  );
});
Empty.displayName = "Empty";

const EmptyIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full bg-surface-elevated text-fg-muted",
        "[&_svg]:size-6 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  ),
);
EmptyIcon.displayName = "EmptyIcon";

const EmptyTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-base font-semibold text-fg-primary", className)} {...props} />
  ),
);
EmptyTitle.displayName = "EmptyTitle";

const EmptyDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("max-w-sm text-sm text-fg-muted", className)} {...props} />
  ),
);
EmptyDescription.displayName = "EmptyDescription";

const EmptyContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col items-center gap-1", className)} {...props} />
  ),
);
EmptyContent.displayName = "EmptyContent";

const EmptyActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-wrap items-center justify-center gap-2", className)} {...props} />
  ),
);
EmptyActions.displayName = "EmptyActions";

export type { EmptyProps };
export { Empty, EmptyActions, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle };

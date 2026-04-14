import * as React from "react";
import { cn } from "../../lib/utils";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {}

const Code = React.forwardRef<HTMLElement, CodeProps>(({ className, ...props }, ref) => {
  return (
    <code
      ref={ref}
      className={cn(
        "text-xs bg-surface-elevated px-1.5 py-0.5 rounded-md text-fg-primary font-mono border border-edge-subtle",
        "transition-colors duration-fast ease-soft hover:bg-surface-hover hover:border-edge-default",
        className,
      )}
      {...props}
    />
  );
});
Code.displayName = "Code";

export type { CodeProps };
export { Code };

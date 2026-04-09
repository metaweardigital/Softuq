import * as React from "react";
import { cn } from "../../lib/utils";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {}

const Code = React.forwardRef<HTMLElement, CodeProps>(({ className, ...props }, ref) => {
  return (
    <code
      ref={ref}
      className={cn(
        "text-xs bg-bg-elevated px-1.5 py-0.5 rounded-md text-text-primary font-mono border border-border-subtle",
        "transition-colors duration-fast ease-soft hover:bg-bg-hover hover:border-border-default",
        className,
      )}
      {...props}
    />
  );
});
Code.displayName = "Code";

export type { CodeProps };
export { Code };

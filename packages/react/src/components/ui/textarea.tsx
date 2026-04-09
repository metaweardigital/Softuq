import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const textareaVariants = cva(
  [
    "flex w-full min-h-[120px] resize-y bg-bg-input text-text-primary placeholder:text-text-muted",
    "border border-border-subtle rounded-[var(--ds-radius-textarea)] px-[var(--ds-space-input-x)] py-[var(--ds-space-input-y)] text-sm",
    "transition-colors duration-normal ease-soft",
    "focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive focus:ring-destructive/20 focus:border-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, variant, ...props }, ref) => {
  return <textarea className={cn(textareaVariants({ variant, className }))} ref={ref} {...props} />;
});
Textarea.displayName = "Textarea";

export type { TextareaProps };
export { Textarea, textareaVariants };

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const dotsVariants = cva(
  "inline-flex items-end",
  {
    variants: {
      size: {
        sm: "[--ds-ai-dots-size:6px] [--ds-ai-dots-gap:4px] gap-[var(--ds-ai-dots-gap)] h-3",
        md: "[--ds-ai-dots-size:8px] [--ds-ai-dots-gap:6px] gap-[var(--ds-ai-dots-gap)] h-4",
        lg: "[--ds-ai-dots-size:10px] [--ds-ai-dots-gap:8px] gap-[var(--ds-ai-dots-gap)] h-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type DotsTone = "iridescent" | "mono" | "muted";
type DotsPattern = "bounce" | "pulse";

interface DotsProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof dotsVariants> {
  tone?: DotsTone;
  pattern?: DotsPattern;
}

const toneColors: Record<DotsTone, [string, string, string]> = {
  iridescent: ["var(--ai-hue-1)", "var(--ai-hue-4)", "var(--ai-hue-6)"],
  mono: ["var(--accent)", "var(--accent)", "var(--accent)"],
  muted: ["var(--text-muted)", "var(--text-muted)", "var(--text-muted)"],
};

const Dots = React.forwardRef<HTMLSpanElement, DotsProps>(
  (
    { className, size, tone = "iridescent", pattern = "bounce", "aria-label": ariaLabel = "Thinking", ...props },
    ref,
  ) => {
    const [c1, c2, c3] = toneColors[tone];
    const animation =
      pattern === "bounce"
        ? "var(--animate-ai-dots-bounce)"
        : "var(--animate-ai-dots-bounce)";

    const dot = (color: string, delay: string): React.CSSProperties => ({
      display: "inline-block",
      width: "var(--ds-ai-dots-size)",
      height: "var(--ds-ai-dots-size)",
      borderRadius: "9999px",
      background: color,
      animation,
      animationDelay: delay,
    });

    return (
      <span
        ref={ref}
        role="status"
        aria-label={ariaLabel}
        data-ai-primitive="dots"
        className={cn(dotsVariants({ size }), className)}
        {...props}
      >
        <span data-ai-layer style={dot(c1, "0ms")} />
        <span data-ai-layer style={dot(c2, "180ms")} />
        <span data-ai-layer style={dot(c3, "360ms")} />
      </span>
    );
  },
);
Dots.displayName = "Dots";

export type { DotsPattern, DotsProps, DotsTone };
export { Dots, dotsVariants };

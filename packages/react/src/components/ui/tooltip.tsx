import * as React from "react";
import { cn } from "../../lib/utils";

type TooltipSide = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: React.ReactNode;
  side?: TooltipSide;
  delay?: number;
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

const positionClasses: Record<TooltipSide, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const oppositeSide: Record<TooltipSide, TooltipSide> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, side = "top", delay = 300, children, className, wrapperClassName }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [resolvedSide, setResolvedSide] = React.useState(side);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);
    const tooltipRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      setResolvedSide(side);
    }, [side]);

    React.useEffect(() => {
      if (!visible || !tooltipRef.current) return;
      const rect = tooltipRef.current.getBoundingClientRect();
      let needsFlip = false;
      if (side === "top") needsFlip = rect.top < 0;
      else if (side === "bottom") needsFlip = rect.bottom > window.innerHeight;
      else if (side === "left") needsFlip = rect.left < 0;
      else if (side === "right") needsFlip = rect.right > window.innerWidth;

      if (needsFlip) setResolvedSide(oppositeSide[side]);
    }, [visible, side]);

    const show = () => {
      timeoutRef.current = setTimeout(() => setVisible(true), delay);
    };
    const hide = () => {
      clearTimeout(timeoutRef.current);
      setVisible(false);
      setResolvedSide(side);
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", wrapperClassName)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
        {visible && (
          <div
            ref={tooltipRef}
            role="tooltip"
            className={cn(
              "absolute z-popover whitespace-nowrap animate-fade-up",
              "rounded-[var(--ds-radius-tooltip)] bg-bg-elevated border border-border-subtle px-3 py-1.5",
              "text-xs text-text-primary shadow-md",
              positionClasses[resolvedSide],
              className,
            )}
          >
            {content}
          </div>
        )}
      </div>
    );
  },
);
Tooltip.displayName = "Tooltip";

export type { TooltipProps };
export { Tooltip };

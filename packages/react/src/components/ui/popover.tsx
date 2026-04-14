import * as React from "react";
import { cn } from "../../lib/utils";

/* === Context === */

type PopoverSide = "top" | "bottom" | "left" | "right";
type PopoverAlign = "start" | "center" | "end";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) throw new Error("Popover components must be used within <Popover>");
  return ctx;
}

/* === Popover Root === */

interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Popover({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const triggerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const setOpen = React.useCallback(
    (value: boolean) => {
      setInternalOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange],
  );

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
}

/* === PopoverTrigger === */

interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ onClick, asChild, children, ...props }, ref) => {
    const ctx = usePopoverContext();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      ctx.setOpen(!ctx.open);
    };

    const setRefs = (node: HTMLElement | null) => {
      (ctx.triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === "function") ref(node as HTMLButtonElement | null);
      else if (ref)
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node as HTMLButtonElement | null;
    };

    if (asChild && React.isValidElement<Record<string, unknown>>(children)) {
      return React.cloneElement(children, {
        ref: setRefs,
        onClick: handleClick,
        "aria-expanded": ctx.open,
        "aria-haspopup": "dialog",
      });
    }

    return (
      <button
        ref={setRefs as React.Ref<HTMLButtonElement>}
        type="button"
        aria-expanded={ctx.open}
        aria-haspopup="dialog"
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);
PopoverTrigger.displayName = "PopoverTrigger";

/* === PopoverContent === */

const sideClasses: Record<PopoverSide, string> = {
  top: "bottom-full mb-2",
  bottom: "top-full mt-2",
  left: "right-full mr-2",
  right: "left-full ml-2",
};

const alignClasses: Record<PopoverSide, Record<PopoverAlign, string>> = {
  top: {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  },
  bottom: {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  },
  left: {
    start: "top-0",
    center: "top-1/2 -translate-y-1/2",
    end: "bottom-0",
  },
  right: {
    start: "top-0",
    center: "top-1/2 -translate-y-1/2",
    end: "bottom-0",
  },
};

const oppositeSide: Record<PopoverSide, PopoverSide> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: PopoverSide;
  align?: PopoverAlign;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, side = "bottom", align = "center", children, ...props }, ref) => {
    const ctx = usePopoverContext();
    const [resolvedSide, setResolvedSide] = React.useState<PopoverSide>(side);

    React.useEffect(() => {
      setResolvedSide(side);
    }, [side]);

    // Auto-flip
    React.useEffect(() => {
      if (!ctx.open || !ctx.contentRef.current) return;
      const rect = ctx.contentRef.current.getBoundingClientRect();
      let needsFlip = false;
      if (side === "top") needsFlip = rect.top < 0;
      else if (side === "bottom") needsFlip = rect.bottom > window.innerHeight;
      else if (side === "left") needsFlip = rect.left < 0;
      else if (side === "right") needsFlip = rect.right > window.innerWidth;
      if (needsFlip) setResolvedSide(oppositeSide[side]);
    }, [ctx.open, ctx.contentRef, side]);

    // Click outside + Escape
    React.useEffect(() => {
      if (!ctx.open) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (!ctx.contentRef.current?.contains(target) && !ctx.triggerRef.current?.contains(target)) {
          ctx.setOpen(false);
        }
      };
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          ctx.setOpen(false);
          (ctx.triggerRef.current as HTMLElement | null)?.focus();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [ctx]);

    if (!ctx.open) return null;

    return (
      <div
        ref={(node) => {
          (ctx.contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="dialog"
        className={cn(
          "absolute z-popover min-w-48",
          "bg-surface-popover border border-edge-subtle rounded-[var(--ds-radius-card)]",
          "shadow-lg p-4",
          "animate-scale-in",
          sideClasses[resolvedSide],
          alignClasses[resolvedSide][align],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
PopoverContent.displayName = "PopoverContent";

export type { PopoverContentProps, PopoverProps, PopoverTriggerProps };
export { Popover, PopoverContent, PopoverTrigger };

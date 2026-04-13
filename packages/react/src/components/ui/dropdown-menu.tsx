import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

/* === Context === */

type MenuSide = "top" | "bottom" | "left" | "right";
type MenuAlign = "start" | "center" | "end";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext() {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx) throw new Error("DropdownMenu components must be used within <DropdownMenu>");
  return ctx;
}

/* === Root === */

interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function DropdownMenu({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const triggerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const setOpen = React.useCallback(
    (value: boolean) => {
      setInternalOpen(value);
      onOpenChange?.(value);
      if (!value) setActiveIndex(-1);
    },
    [onOpenChange],
  );

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef, contentRef, activeIndex, setActiveIndex }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

/* === Trigger === */

interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ onClick, onKeyDown, asChild, children, ...props }, ref) => {
    const ctx = useDropdownMenuContext();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      ctx.setOpen(!ctx.open);
      if (!ctx.open) ctx.setActiveIndex(0);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e);
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        ctx.setOpen(true);
        ctx.setActiveIndex(0);
      }
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
        onKeyDown: handleKeyDown,
        "aria-expanded": ctx.open,
        "aria-haspopup": "menu",
      });
    }

    return (
      <button
        ref={setRefs as React.Ref<HTMLButtonElement>}
        type="button"
        aria-expanded={ctx.open}
        aria-haspopup="menu"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </button>
    );
  },
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

/* === Content === */

const sideClasses: Record<MenuSide, string> = {
  top: "bottom-full mb-2",
  bottom: "top-full mt-2",
  left: "right-full mr-2",
  right: "left-full ml-2",
};

const alignClasses: Record<MenuSide, Record<MenuAlign, string>> = {
  top: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
  bottom: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
  left: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" },
  right: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" },
};

const oppositeSide: Record<MenuSide, MenuSide> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: MenuSide;
  align?: MenuAlign;
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, side = "bottom", align = "start", children, ...props }, ref) => {
    const ctx = useDropdownMenuContext();
    const [resolvedSide, setResolvedSide] = React.useState<MenuSide>(side);

    React.useEffect(() => {
      setResolvedSide(side);
    }, [side]);

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

    // Keyboard navigation
    React.useEffect(() => {
      if (!ctx.open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        const items = ctx.contentRef.current?.querySelectorAll("[role='menuitem']:not([aria-disabled='true'])");
        const count = items?.length ?? 0;
        if (!count) return;

        if (e.key === "ArrowDown") {
          e.preventDefault();
          ctx.setActiveIndex(Math.min(ctx.activeIndex + 1, count - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          ctx.setActiveIndex(Math.max(ctx.activeIndex - 1, 0));
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const item = items?.[ctx.activeIndex] as HTMLElement | undefined;
          item?.click();
        } else if (e.key === "Home") {
          e.preventDefault();
          ctx.setActiveIndex(0);
        } else if (e.key === "End") {
          e.preventDefault();
          ctx.setActiveIndex(count - 1);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [ctx]);

    if (!ctx.open) return null;

    return (
      <div
        ref={(node) => {
          (ctx.contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="menu"
        className={cn(
          "absolute z-dropdown min-w-48",
          "bg-bg-popover border border-border-subtle rounded-[var(--ds-radius-card)]",
          "shadow-lg py-1",
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
DropdownMenuContent.displayName = "DropdownMenuContent";

/* === Item === */

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  onSelect?: () => void;
  inset?: boolean;
}

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, disabled, onSelect, inset, onClick, children, ...props }, ref) => {
    const ctx = useDropdownMenuContext();
    const itemRef = React.useRef<HTMLDivElement>(null);
    const [index, setIndex] = React.useState(-1);

    // biome-ignore lint/correctness/useExhaustiveDependencies: ctx.open needed to re-index when menu opens
    React.useEffect(() => {
      if (!ctx.contentRef.current || !itemRef.current) return;
      const items = ctx.contentRef.current.querySelectorAll("[role='menuitem']:not([aria-disabled='true'])");
      setIndex(Array.from(items).indexOf(itemRef.current));
    }, [ctx.contentRef, ctx.open]);

    const isActive = ctx.activeIndex === index && index !== -1;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(e);
      onSelect?.();
      ctx.setOpen(false);
    };

    return (
      <div
        ref={(node) => {
          (itemRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="menuitem"
        aria-disabled={disabled}
        tabIndex={-1}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect?.();
            ctx.setOpen(false);
          }
        }}
        onMouseEnter={() => {
          if (!disabled && index !== -1) ctx.setActiveIndex(index);
        }}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer select-none",
          "transition-colors duration-fast ease-soft",
          "[&_svg]:size-4 [&_svg]:shrink-0",
          inset && "pl-8",
          isActive && "bg-bg-hover",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
DropdownMenuItem.displayName = "DropdownMenuItem";

/* === CheckboxItem === */

interface DropdownMenuCheckboxItemProps extends Omit<DropdownMenuItemProps, "inset"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const DropdownMenuCheckboxItem = React.forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  ({ className, checked, onCheckedChange, onSelect, children, ...props }, ref) => {
    return (
      <DropdownMenuItem
        ref={ref}
        className={cn("pl-8 relative", className)}
        onSelect={() => {
          onCheckedChange?.(!checked);
          onSelect?.();
        }}
        {...props}
      >
        <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
          {checked && <Check className="h-3.5 w-3.5" />}
        </span>
        {children}
      </DropdownMenuItem>
    );
  },
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

/* === Label / Separator / Group / Shortcut === */

interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

function DropdownMenuLabel({ className, inset, ...props }: DropdownMenuLabelProps) {
  return (
    <div
      className={cn(
        "px-3 py-1.5 text-xs font-medium text-text-muted uppercase tracking-wide",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="separator" className={cn("h-px mx-2 my-1 bg-border-subtle", className)} {...props} />;
}

function DropdownMenuGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="group" className={cn("py-0.5", className)} {...props} />;
}

export type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuProps,
  DropdownMenuTriggerProps,
};
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};

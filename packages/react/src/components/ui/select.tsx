import { cva } from "class-variance-authority";
import { Check, ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Tag } from "./tag";

/* === Context === */

interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  multiple: boolean;
  value: string;
  values: string[];
  valueLabel: string;
  valueLabels: Map<string, string>;
  onSelect: (value: string, label: string) => void;
  onDeselect: (value: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  variant: "default" | "error" | null | undefined;
  size: "sm" | "md" | null | undefined;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("Select components must be used within <Select>");
  return ctx;
}

/* === Select Root === */

interface SelectSingleProps {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: "default" | "error" | null;
  size?: "sm" | "md" | null;
  children: React.ReactNode;
}

interface SelectMultipleProps {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  variant?: "default" | "error" | null;
  size?: "sm" | "md" | null;
  children: React.ReactNode;
}

type SelectProps = SelectSingleProps | SelectMultipleProps;

function Select(props: SelectProps) {
  const { multiple = false, variant, size, children } = props;

  // Single select state
  const [singleValue, setSingleValue] = React.useState<string>(
    !multiple ? ((props as SelectSingleProps).defaultValue ?? "") : "",
  );
  const [singleLabel, setSingleLabel] = React.useState("");

  // Multi select state
  const [multiValues, setMultiValues] = React.useState<string[]>(
    multiple ? ((props as SelectMultipleProps).defaultValue ?? []) : [],
  );
  const [multiLabels, setMultiLabels] = React.useState<Map<string, string>>(new Map());

  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const currentSingleValue = !multiple ? ((props as SelectSingleProps).value ?? singleValue) : "";
  const currentMultiValues = multiple ? ((props as SelectMultipleProps).value ?? multiValues) : [];

  const singleOnChange = !multiple ? (props as SelectSingleProps).onValueChange : undefined;
  const multiOnChange = multiple ? (props as SelectMultipleProps).onValueChange : undefined;

  const onSelect = React.useCallback(
    (v: string, label: string) => {
      if (multiple) {
        const next = [...currentMultiValues, v];
        setMultiValues(next);
        setMultiLabels((prev) => new Map(prev).set(v, label));
        multiOnChange?.(next);
      } else {
        setSingleValue(v);
        setSingleLabel(label);
        singleOnChange?.(v);
        setOpen(false);
      }
    },
    [multiple, currentMultiValues, singleOnChange, multiOnChange],
  );

  const onDeselect = React.useCallback(
    (v: string) => {
      if (multiple) {
        const next = currentMultiValues.filter((val) => val !== v);
        setMultiValues(next);
        setMultiLabels((prev) => {
          const map = new Map(prev);
          map.delete(v);
          return map;
        });
        multiOnChange?.(next);
      }
    },
    [multiple, currentMultiValues, multiOnChange],
  );

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        multiple,
        value: currentSingleValue,
        values: currentMultiValues,
        valueLabel: singleLabel,
        valueLabels: multiLabels,
        onSelect,
        onDeselect,
        triggerRef,
        contentRef,
        activeIndex,
        setActiveIndex,
        variant,
        size,
      }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

/* === SelectTrigger === */

const selectTriggerVariants = cva(
  [
    "flex w-full items-center justify-between gap-2",
    "bg-surface-input text-fg-primary",
    "border border-edge-subtle rounded-[var(--ds-radius-input)]",
    "transition-all duration-normal ease-soft",
    "focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "cursor-pointer select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive focus:ring-destructive/20 focus:border-destructive",
      },
      size: {
        sm: "min-h-8 px-[var(--ds-space-button-sm)] text-xs",
        md: "min-h-10 px-[var(--ds-space-input-x)] text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
  maxTags?: number;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, placeholder, maxTags = 2, children, ...props }, ref) => {
    const ctx = useSelectContext();
    const [triggerWidth, setTriggerWidth] = React.useState(Infinity);

    React.useEffect(() => {
      const el = ctx.triggerRef.current;
      if (!el || !ctx.multiple) return;
      const observer = new ResizeObserver(([entry]) => {
        setTriggerWidth(entry.contentRect.width);
      });
      observer.observe(el);
      return () => observer.disconnect();
    }, [ctx.triggerRef, ctx.multiple]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        ctx.setOpen(true);
        ctx.setActiveIndex(0);
      }
    };

    const hasValue = ctx.multiple ? ctx.values.length > 0 : !!ctx.value;

    const renderDisplay = () => {
      if (children) return children;
      if (ctx.multiple) {
        if (ctx.values.length === 0) return placeholder || "Select...";
        if (triggerWidth < 250) return `${ctx.values.length} selected`;
        const effectiveMax = triggerWidth >= 400 ? maxTags + 1 : maxTags;
        const visible = ctx.values.slice(0, effectiveMax);
        const remaining = ctx.values.length - visible.length;
        return (
          <span className="flex flex-nowrap items-center gap-1 py-0.5">
            {visible.map((v) => (
              <Tag key={v} variant="default" size="sm" onDismiss={() => ctx.onDeselect(v)}>
                {ctx.valueLabels.get(v) ?? v}
              </Tag>
            ))}
            {remaining > 0 && (
              <Tag variant="default" size="sm">
                +{remaining}
              </Tag>
            )}
          </span>
        );
      }
      return ctx.valueLabel || ctx.value || placeholder || "Select...";
    };

    return (
      <button
        ref={(node) => {
          (ctx.triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        type="button"
        role="combobox"
        aria-expanded={ctx.open}
        aria-haspopup="listbox"
        onClick={() => {
          ctx.setOpen(!ctx.open);
          if (!ctx.open) ctx.setActiveIndex(0);
        }}
        onKeyDown={handleKeyDown}
        className={cn(selectTriggerVariants({ variant: ctx.variant, size: ctx.size, className }))}
        {...props}
      >
        <span
          className={cn(
            "relative truncate capitalize text-left",
            !hasValue && "text-fg-muted",
            ctx.multiple && "min-w-0 flex-1 overflow-hidden",
          )}
        >
          {renderDisplay()}
          {ctx.multiple && hasValue && <span className="fade-edge-r" style={{ backgroundColor: "var(--bg-input)" }} />}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-fg-muted transition-transform duration-normal ease-soft",
            ctx.open && "rotate-180",
          )}
        />
      </button>
    );
  },
);
SelectTrigger.displayName = "SelectTrigger";

/* === SelectValue === */

function SelectValue({ placeholder }: { placeholder?: string }) {
  const ctx = useSelectContext();
  if (ctx.multiple) {
    return (
      <>
        {ctx.values.length > 0
          ? ctx.values.map((v) => ctx.valueLabels.get(v) ?? v).join(", ")
          : placeholder || "Select..."}
      </>
    );
  }
  return <>{ctx.valueLabel || ctx.value || placeholder || "Select..."}</>;
}

/* === SelectContent === */

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const ctx = useSelectContext();
    const [placement, setPlacement] = React.useState<"bottom" | "top">("bottom");

    // Auto-flip: measure available space and pick top/bottom
    React.useEffect(() => {
      if (!ctx.open || !ctx.triggerRef.current) return;
      const rect = ctx.triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setPlacement(spaceBelow < 260 && spaceAbove > spaceBelow ? "top" : "bottom");
    }, [ctx.open, ctx.triggerRef]);

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
          ctx.triggerRef.current?.focus();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [ctx.open, ctx]);

    // Keyboard navigation
    React.useEffect(() => {
      if (!ctx.open) return;

      const items = ctx.contentRef.current?.querySelectorAll("[role='option']:not([aria-disabled='true'])");
      if (!items) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        const count = items.length;
        if (!count) return;

        if (e.key === "ArrowDown") {
          e.preventDefault();
          ctx.setActiveIndex(Math.min(ctx.activeIndex + 1, count - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          ctx.setActiveIndex(Math.max(ctx.activeIndex - 1, 0));
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const item = items[ctx.activeIndex] as HTMLElement;
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
    }, [ctx.open, ctx.activeIndex, ctx]);

    // Scroll active item into view
    React.useEffect(() => {
      if (!ctx.open || ctx.activeIndex < 0) return;
      const items = ctx.contentRef.current?.querySelectorAll("[role='option']:not([aria-disabled='true'])");
      const item = items?.[ctx.activeIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }, [ctx.activeIndex, ctx.open, ctx.contentRef]);

    if (!ctx.open) return null;

    return (
      <div
        ref={(node) => {
          (ctx.contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="listbox"
        aria-multiselectable={ctx.multiple || undefined}
        className={cn(
          "absolute z-dropdown w-full",
          placement === "bottom" ? "top-full mt-1 origin-top" : "bottom-full mb-1 origin-bottom",
          "bg-surface-popover border border-edge-subtle rounded-[var(--ds-radius-card)]",
          "shadow-lg",
          "max-h-60 overflow-y-auto scrollbar-thin",
          "py-1",
          "animate-scale-in",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
SelectContent.displayName = "SelectContent";

/* === SelectItem === */

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, value, disabled, children, ...props }, ref) => {
    const ctx = useSelectContext();
    const isSelected = ctx.multiple ? ctx.values.includes(value) : ctx.value === value;

    const itemRef = React.useRef<HTMLDivElement>(null);
    const [index, setIndex] = React.useState(-1);

    // biome-ignore lint/correctness/useExhaustiveDependencies: ctx.open needed to re-index when dropdown opens
    React.useEffect(() => {
      if (!ctx.contentRef.current || !itemRef.current) return;
      const items = ctx.contentRef.current.querySelectorAll("[role='option']:not([aria-disabled='true'])");
      const idx = Array.from(items).indexOf(itemRef.current);
      setIndex(idx);
    }, [ctx.contentRef, ctx.open]);

    const isActive = ctx.activeIndex === index && index !== -1;

    const handleSelect = () => {
      if (disabled) return;
      const label = itemRef.current?.textContent ?? value;
      if (ctx.multiple && isSelected) {
        ctx.onDeselect(value);
      } else {
        ctx.onSelect(value, label);
      }
    };

    return (
      <div
        ref={(node) => {
          (itemRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        onClick={handleSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSelect();
          }
        }}
        onMouseEnter={() => {
          if (!disabled && index !== -1) ctx.setActiveIndex(index);
        }}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 text-sm capitalize cursor-pointer select-none",
          "transition-colors duration-fast ease-soft",
          isActive && "bg-surface-hover",
          isSelected && "bg-surface-selected text-accent font-medium",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        {...props}
      >
        <span className="truncate">{children}</span>
        {isSelected && <Check className="ml-auto h-4 w-4 shrink-0" />}
      </div>
    );
  },
);
SelectItem.displayName = "SelectItem";

/* === SelectGroup === */

function SelectGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div role="group" className={cn("py-1", className)} {...props}>
      {children}
    </div>
  );
}

/* === SelectLabel === */

function SelectLabel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-3 py-1.5 text-xs font-medium text-fg-muted uppercase tracking-wide", className)} {...props}>
      {children}
    </div>
  );
}

/* === SelectSeparator === */

function SelectSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("h-px mx-2 my-1 bg-edge-subtle", className)} {...props} />;
}

export type { SelectItemProps, SelectProps, SelectTriggerProps };
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
};

import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, Search as SearchIcon, X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Tag } from "./tag";

/* === Context === */

interface SearchContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  query: string;
  setQuery: (query: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  contentId: string;
}

const SearchContext = React.createContext<SearchContextValue | null>(null);

function useSearchContext() {
  return React.useContext(SearchContext);
}

/* === Search Root === */

interface SearchProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Search({ value, defaultValue, onValueChange, open, onOpenChange, children }: SearchProps) {
  const [internalQuery, setInternalQuery] = React.useState(defaultValue ?? "");
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const contentId = React.useId();

  const currentQuery = value ?? internalQuery;
  const currentOpen = open ?? internalOpen;

  const handleSetQuery = React.useCallback(
    (q: string) => {
      setInternalQuery(q);
      setActiveIndex(-1);
      onValueChange?.(q);
    },
    [onValueChange],
  );

  const handleSetOpen = React.useCallback(
    (o: boolean) => {
      setInternalOpen(o);
      if (!o) setActiveIndex(-1);
      onOpenChange?.(o);
    },
    [onOpenChange],
  );

  return (
    <SearchContext.Provider
      value={{
        open: currentOpen,
        setOpen: handleSetOpen,
        query: currentQuery,
        setQuery: handleSetQuery,
        inputRef,
        contentRef,
        activeIndex,
        setActiveIndex,
        contentId,
      }}
    >
      <div className="relative">{children}</div>
    </SearchContext.Provider>
  );
}

/* === SearchInput === */

const searchInputVariants = cva(
  [
    "flex w-full items-center gap-2",
    "bg-bg-input text-text-primary",
    "border border-border-subtle rounded-[var(--ds-radius-input)]",
    "transition-all duration-normal ease-soft",
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring/20 focus-within:border-accent",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive focus-within:ring-destructive/20 focus-within:border-destructive",
      },
      inputSize: {
        sm: "h-8 px-[var(--ds-space-button-sm)] text-xs",
        md: "h-10 px-[var(--ds-space-input-x)] text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  },
);

interface SearchInputTag {
  label: string;
  onDismiss?: () => void;
}

interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">,
    VariantProps<typeof searchInputVariants> {
  loading?: boolean;
  tags?: SearchInputTag[];
  onClear?: () => void;
  value?: string;
  onValueChange?: (value: string) => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    { className, variant, inputSize, loading, tags, onClear, value, onValueChange, onFocus, onKeyDown, ...props },
    ref,
  ) => {
    const ctx = useSearchContext();
    const [internalValue, setInternalValue] = React.useState("");
    const innerRef = React.useRef<HTMLInputElement>(null);

    const currentValue = ctx ? ctx.query : (value ?? internalValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      if (ctx) {
        ctx.setQuery(v);
        ctx.setOpen(true);
      } else {
        setInternalValue(v);
        onValueChange?.(v);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      ctx?.setOpen(true);
      onFocus?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (ctx) {
        const items = ctx.contentRef.current?.querySelectorAll("[role='option']:not([aria-disabled='true'])");
        const count = items?.length ?? 0;

        if (e.key === "Escape") {
          e.preventDefault();
          ctx.setOpen(false);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          ctx.setActiveIndex(Math.min(ctx.activeIndex + 1, count - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          ctx.setActiveIndex(Math.max(ctx.activeIndex - 1, -1));
        } else if (e.key === "Enter" && ctx.activeIndex >= 0) {
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
      }
      onKeyDown?.(e);
    };

    const handleClear = () => {
      if (ctx) {
        ctx.setQuery("");
      } else {
        setInternalValue("");
        onValueChange?.("");
      }
      onClear?.();
      const el = innerRef.current;
      el?.focus();
    };

    const showClear = !loading && currentValue.length > 0;

    const activeDescendant = ctx && ctx.activeIndex >= 0 ? `${ctx.contentId}-item-${ctx.activeIndex}` : undefined;

    return (
      <div
        role="combobox"
        aria-expanded={ctx?.open ?? false}
        aria-haspopup="listbox"
        aria-owns={ctx?.contentId}
        className={cn(searchInputVariants({ variant, inputSize, className }))}
      >
        <SearchIcon className="h-4 w-4 shrink-0 text-text-muted" />
        {tags && tags.length > 0 && (
          <span className="flex flex-nowrap items-center gap-1">
            {tags.map((tag) => (
              <Tag key={tag.label} variant="default" size="sm" onDismiss={tag.onDismiss}>
                {tag.label}
              </Tag>
            ))}
          </span>
        )}
        <input
          ref={(node) => {
            (innerRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
            if (ctx) {
              (ctx.inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
            }
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
          }}
          aria-autocomplete="list"
          aria-controls={ctx?.contentId}
          aria-activedescendant={activeDescendant}
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-text-muted"
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {loading && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-text-muted" />}
        {showClear && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={handleClear}
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors duration-fast ease-soft hover:text-text-primary"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

/* === SearchContent === */

const SearchContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const ctx = useSearchContext();
    if (!ctx) throw new Error("SearchContent must be used within <Search>");

    const [placement, setPlacement] = React.useState<"bottom" | "top">("bottom");

    React.useEffect(() => {
      if (!ctx.open || !ctx.inputRef.current) return;
      const rect =
        ctx.inputRef.current.parentElement?.getBoundingClientRect() ?? ctx.inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setPlacement(spaceBelow < 320 && spaceAbove > spaceBelow ? "top" : "bottom");
    }, [ctx.open, ctx.inputRef]);

    React.useEffect(() => {
      if (!ctx.open) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        const inputWrapper = ctx.inputRef.current?.parentElement;
        if (!ctx.contentRef.current?.contains(target) && !inputWrapper?.contains(target)) {
          ctx.setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ctx.open, ctx]);

    // Scroll active item into view
    React.useEffect(() => {
      if (!ctx.open || ctx.activeIndex < 0) return;
      const items = ctx.contentRef.current?.querySelectorAll("[role='option']:not([aria-disabled='true'])");
      const item = items?.[ctx.activeIndex] as HTMLElement | undefined;
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
        id={ctx.contentId}
        role="listbox"
        className={cn(
          "absolute z-dropdown w-full",
          placement === "bottom" ? "top-full mt-1 origin-top" : "bottom-full mb-1 origin-bottom",
          "bg-bg-popover border border-border-subtle rounded-[var(--ds-radius-card)]",
          "shadow-lg max-h-80 overflow-y-auto scrollbar-thin",
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
SearchContent.displayName = "SearchContent";

/* === SearchItem === */

interface SearchItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
}

const SearchItem = React.forwardRef<HTMLDivElement, SearchItemProps>(
  ({ className, icon, onSelect, disabled, children, ...props }, ref) => {
    const ctx = useSearchContext();
    if (!ctx) throw new Error("SearchItem must be used within <Search>");

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

    const handleClick = () => {
      if (disabled) return;
      onSelect?.();
      ctx.setOpen(false);
      ctx.inputRef.current?.focus();
    };

    return (
      <div
        ref={(node) => {
          (itemRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="option"
        aria-selected={isActive}
        aria-disabled={disabled}
        id={`${ctx.contentId}-item-${index}`}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        onMouseEnter={() => {
          if (!disabled && index !== -1) ctx.setActiveIndex(index);
        }}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer select-none",
          "transition-colors duration-fast ease-soft",
          isActive && "bg-bg-hover",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {icon && <span className="flex h-4 w-4 shrink-0 items-center justify-center text-text-muted">{icon}</span>}
        {children}
      </div>
    );
  },
);
SearchItem.displayName = "SearchItem";

/* === SearchGroup === */

interface SearchGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
}

function SearchGroup({ className, heading, children, ...props }: SearchGroupProps) {
  const headingId = React.useId();
  return (
    <div role="group" aria-labelledby={heading ? headingId : undefined} className={cn("py-1", className)} {...props}>
      {heading && (
        <div id={headingId} className="px-3 py-1.5 text-xs font-medium text-text-muted uppercase tracking-wide">
          {heading}
        </div>
      )}
      {children}
    </div>
  );
}

/* === Exports === */

export type { SearchGroupProps, SearchInputProps, SearchInputTag, SearchItemProps, SearchProps };
export { Search, SearchContent, SearchGroup, SearchInput, SearchItem, searchInputVariants };

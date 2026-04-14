import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const accordionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "divide-y divide-edge-subtle",
      bordered: "divide-y divide-edge-subtle border border-edge-subtle rounded-[var(--ds-radius-card)] overflow-hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof accordionVariants> {
  type?: "single" | "multiple";
}

const AccordionContext = React.createContext<{
  openItems: Set<string>;
  toggle: (value: string) => void;
  variant: "default" | "bordered";
}>({ openItems: new Set(), toggle: () => {}, variant: "default" });

const AccordionItemContext = React.createContext<{
  value: string;
  isOpen: boolean;
}>({ value: "", isOpen: false });

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, variant = "default", type = "single", children, ...props }, ref) => {
    const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

    const toggle = React.useCallback(
      (value: string) => {
        setOpenItems((prev) => {
          const next = new Set(prev);
          if (next.has(value)) {
            next.delete(value);
          } else {
            if (type === "single") next.clear();
            next.add(value);
          }
          return next;
        });
      },
      [type],
    );

    return (
      <AccordionContext.Provider value={{ openItems, toggle, variant: variant ?? "default" }}>
        <div ref={ref} className={cn(accordionVariants({ variant, className }))} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

/* --- AccordionItem --- */
interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { openItems, variant } = React.useContext(AccordionContext);
    const isOpen = openItems.has(value);

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div
          ref={ref}
          className={cn("group py-1", variant === "bordered" && "px-4", className)}
          data-state={isOpen ? "open" : "closed"}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

/* --- AccordionTrigger --- */
const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const { toggle } = React.useContext(AccordionContext);
    const { value, isOpen } = React.useContext(AccordionItemContext);

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => toggle(value)}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between gap-4 py-3 cursor-pointer select-none",
          "text-sm font-medium text-fg-primary",
          "transition-colors duration-normal ease-soft",
          "hover:text-accent",
          "outline-none focus-visible:text-accent",
          className,
        )}
        {...props}
      >
        {children}
        <span className="shrink-0 w-5 h-5 flex items-center justify-center text-accent">
          <svg
            className={cn("w-4 h-4 transition-transform duration-normal ease-smooth", isOpen && "rotate-45")}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="8" y1="3" x2="8" y2="13" />
            <line x1="3" y1="8" x2="13" y2="8" />
          </svg>
        </span>
      </button>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

/* --- AccordionContent --- */
const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = React.useContext(AccordionItemContext);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = React.useState(isOpen);
    const [animState, setAnimState] = React.useState<"collapsed" | "expanding" | "expanded" | "collapsing">(
      isOpen ? "expanded" : "collapsed",
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: animState intentionally excluded to prevent infinite loop
    React.useEffect(() => {
      if (isOpen) {
        setShouldRender(true);
        setAnimState("expanding");
      } else if (animState === "expanded" || animState === "expanding") {
        setAnimState("collapsing");
      }
    }, [isOpen]);

    // Handle expanding: measure → set height 0 → next frame set real height
    React.useEffect(() => {
      if (animState === "expanding" && wrapperRef.current && contentRef.current) {
        const h = contentRef.current.scrollHeight;
        // Force height: 0 so the transition has a starting point
        wrapperRef.current.style.height = "0px";
        // Double rAF to ensure browser has painted height: 0
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (wrapperRef.current) {
              wrapperRef.current.style.height = `${h}px`;
            }
          });
        });
      }

      if (animState === "collapsing" && wrapperRef.current && contentRef.current) {
        const h = contentRef.current.scrollHeight;
        // Set current height explicitly so transition works from a real value
        wrapperRef.current.style.height = `${h}px`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (wrapperRef.current) {
              wrapperRef.current.style.height = "0px";
            }
          });
        });
      }
    }, [animState]);

    const handleTransitionEnd = (e: React.TransitionEvent) => {
      // Only react to height transitions on the wrapper
      if (e.propertyName !== "height") return;

      if (animState === "expanding") {
        setAnimState("expanded");
        // Remove fixed height so content can reflow naturally
        if (wrapperRef.current) {
          wrapperRef.current.style.height = "auto";
        }
      }

      if (animState === "collapsing") {
        setAnimState("collapsed");
        setShouldRender(false);
      }
    };

    if (!shouldRender) return null;

    const isVisible = animState === "expanding" || animState === "expanded";

    return (
      <div
        ref={wrapperRef}
        style={{
          overflow: "hidden",
          transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div
          ref={(node) => {
            (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          className={cn(
            "pb-3 text-sm text-fg-secondary",
            "transition-[opacity,translate] ease-smooth",
            isVisible
              ? "opacity-100 translate-y-0 duration-[350ms] delay-100"
              : "opacity-0 -translate-y-1 duration-[250ms]",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  },
);
AccordionContent.displayName = "AccordionContent";

export type { AccordionItemProps, AccordionProps };
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, accordionVariants };

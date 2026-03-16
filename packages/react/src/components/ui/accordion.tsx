import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const accordionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "divide-y divide-border-subtle",
      bordered: "divide-y divide-border-subtle border border-border-subtle rounded-2xl overflow-hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  type?: "single" | "multiple";
}

const AccordionContext = React.createContext<{
  openItems: Set<string>;
  toggle: (value: string) => void;
}>({ openItems: new Set(), toggle: () => {} });

const AccordionItemContext = React.createContext<{
  value: string;
  isOpen: boolean;
}>({ value: "", isOpen: false });

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, variant, type = "single", children, ...props }, ref) => {
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
      [type]
    );

    return (
      <AccordionContext.Provider value={{ openItems, toggle }}>
        <div
          ref={ref}
          className={cn(accordionVariants({ variant, className }))}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

/* --- AccordionItem --- */
interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { openItems } = React.useContext(AccordionContext);
    const isOpen = openItems.has(value);

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div ref={ref} className={cn("group", className)} data-state={isOpen ? "open" : "closed"} {...props}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

/* --- AccordionTrigger --- */
const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { toggle } = React.useContext(AccordionContext);
  const { value, isOpen } = React.useContext(AccordionItemContext);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full items-center justify-between py-4 px-4 text-sm font-medium text-text-primary",
        "transition-all duration-normal ease-soft hover:bg-bg-hover",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-text-muted transition-transform duration-normal ease-smooth",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

/* --- AccordionContent --- */
const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isOpen } = React.useContext(AccordionItemContext);

  if (!isOpen) return null;
  return (
    <div
      ref={ref}
      className={cn("px-4 pb-4 text-sm text-text-secondary animate-fade-up", className)}
      {...props}
    >
      {children}
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, accordionVariants };
export type { AccordionProps, AccordionItemProps };

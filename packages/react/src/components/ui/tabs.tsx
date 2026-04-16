import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

/* --- Tabs Root --- */
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  variant: "default" | "pills" | "underline";
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
  return ctx;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  variant?: "default" | "pills" | "underline";
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, variant = "default", onValueChange, children, ...props }, ref) => {
    const [activeTab, setActiveTabState] = React.useState(defaultValue);

    const setActiveTab = React.useCallback(
      (tab: string) => {
        setActiveTabState(tab);
        onValueChange?.(tab);
      },
      [onValueChange],
    );

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
        <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

/* --- TabsList --- */
const tabsListVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      default:
        "w-full sm:w-auto sm:self-center gap-1 rounded-[var(--ds-radius-card)] bg-surface-input p-1 border border-edge-subtle",
      pills: "gap-2",
      underline: "gap-0 border-b border-edge-subtle",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(({ className, size, ...props }, ref) => {
  const { variant } = useTabsContext();
  return <div ref={ref} role="tablist" className={cn(tabsListVariants({ variant, size, className }))} {...props} />;
});
TabsList.displayName = "TabsList";

/* --- TabsTrigger --- */
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab, setActiveTab, variant } = useTabsContext();
    const isActive = activeTab === value;

    const base =
      "flex-1 sm:flex-none inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-normal ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

    const variantClasses = {
      default: cn(
        "rounded-[calc(var(--ds-radius-card)-4px)] px-3 py-1.5 text-sm",
        isActive ? "bg-surface-elevated text-fg-primary shadow-sm" : "text-fg-muted hover:text-fg-secondary",
      ),
      pills: cn(
        "rounded-full px-4 py-1.5 text-sm border",
        isActive
          ? "bg-accent text-white border-accent"
          : "bg-transparent text-fg-muted border-edge-subtle hover:text-fg-secondary",
      ),
      underline: cn(
        "px-4 py-2 text-sm border-b-2 -mb-px",
        isActive
          ? "border-accent text-accent-text"
          : "border-transparent text-fg-muted hover:text-fg-secondary hover:border-edge-default",
      ),
    };

    return (
      <button
        type="button"
        ref={ref}
        role="tab"
        aria-selected={isActive}
        className={cn(base, variantClasses[variant], className)}
        onClick={() => setActiveTab(value)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

/* --- TabsContent --- */
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ className, value, ...props }, ref) => {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;

  return <div ref={ref} role="tabpanel" className={cn("animate-fade-up", className)} {...props} />;
});
TabsContent.displayName = "TabsContent";

export type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps };
export { Tabs, TabsContent, TabsList, TabsTrigger };

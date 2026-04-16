import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

/* === Context === */

type ToggleGroupType = "single" | "multiple";

interface ToggleGroupContextValue {
  type: ToggleGroupType;
  value: string | string[];
  setValue: (v: string) => void;
  size: "sm" | "md" | "lg";
  variant: "default" | "outline";
  disabled?: boolean;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null);

function useToggleGroupContext() {
  const ctx = React.useContext(ToggleGroupContext);
  if (!ctx) throw new Error("ToggleGroupItem must be used within <ToggleGroup>");
  return ctx;
}

/* === Root === */

interface ToggleGroupSingleProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface ToggleGroupMultipleProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

type ToggleGroupProps = (ToggleGroupSingleProps | ToggleGroupMultipleProps) & {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

function ToggleGroup(props: ToggleGroupProps) {
  const { type, size = "md", variant = "default", disabled, className, children } = props;

  const [internalSingle, setInternalSingle] = React.useState<string>(
    type === "single" ? (props.defaultValue ?? "") : "",
  );
  const [internalMultiple, setInternalMultiple] = React.useState<string[]>(
    type === "multiple" ? (props.defaultValue ?? []) : [],
  );

  const value = type === "single" ? (props.value ?? internalSingle) : (props.value ?? internalMultiple);

  const setValue = React.useCallback(
    (v: string) => {
      if (type === "single") {
        const next = value === v ? "" : v;
        setInternalSingle(next);
        props.onValueChange?.(next);
      } else {
        const current = value as string[];
        const next = current.includes(v) ? current.filter((x) => x !== v) : [...current, v];
        setInternalMultiple(next);
        props.onValueChange?.(next);
      }
    },
    [type, value, props.onValueChange],
  );

  return (
    <ToggleGroupContext.Provider value={{ type, value, setValue, size, variant, disabled }}>
      <div
        role="group"
        className={cn(
          "inline-flex items-center",
          variant === "outline" &&
            "gap-1 rounded-[var(--ds-radius-card)] bg-surface-input p-1 border border-edge-subtle",
          variant === "default" && "gap-1",
          className,
        )}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

/* === Item === */

const itemVariants = cva(
  [
    "inline-flex items-center justify-center font-medium whitespace-nowrap",
    "transition-colors duration-fast ease-soft",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-7 gap-1.5 px-2 text-xs [&_svg]:size-3.5",
        md: "h-8 gap-2 px-3 text-sm [&_svg]:size-4",
        lg: "h-10 gap-2.5 px-4 text-sm [&_svg]:size-5",
      },
      variant: {
        default:
          "rounded-[var(--ds-radius-button)] border border-edge-subtle bg-surface-input text-fg-secondary hover:bg-surface-hover hover:text-fg-primary data-[state=on]:bg-accent data-[state=on]:text-white data-[state=on]:border-accent",
        outline:
          "rounded-[calc(var(--ds-radius-card)-4px)] border-0 text-fg-secondary hover:text-fg-primary data-[state=on]:bg-surface-elevated data-[state=on]:text-fg-primary data-[state=on]:shadow-sm",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);

interface ToggleGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value">,
    Omit<VariantProps<typeof itemVariants>, "size" | "variant"> {
  value: string;
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, value, disabled, children, ...props }, ref) => {
    const ctx = useToggleGroupContext();
    const isActive = ctx.type === "single" ? ctx.value === value : (ctx.value as string[]).includes(value);
    const isDisabled = disabled ?? ctx.disabled;

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isActive}
        data-state={isActive ? "on" : "off"}
        disabled={isDisabled}
        onClick={() => ctx.setValue(value)}
        className={cn(itemVariants({ size: ctx.size, variant: ctx.variant }), className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
ToggleGroupItem.displayName = "ToggleGroupItem";

export type { ToggleGroupItemProps, ToggleGroupProps };
export { itemVariants as toggleGroupItemVariants, ToggleGroup, ToggleGroupItem };

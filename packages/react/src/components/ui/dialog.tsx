import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

/* --- Dialog Context --- */
interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("Dialog components must be used within <Dialog>");
  return ctx;
}

/* --- Dialog Root --- */
interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const setOpen = React.useCallback(
    (value: boolean) => {
      setInternalOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange],
  );

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
}

/* --- DialogTrigger --- */
const DialogTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => {
    const { setOpen } = useDialogContext();
    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          onClick?.(e);
          setOpen(true);
        }}
        {...props}
      />
    );
  },
);
DialogTrigger.displayName = "DialogTrigger";

/* --- DialogOverlay --- */
const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("fixed inset-0 z-overlay bg-bg-overlay backdrop-blur-sm", "animate-fade-up", className)}
      {...props}
    />
  ),
);
DialogOverlay.displayName = "DialogOverlay";

/* --- DialogContent --- */
const dialogContentVariants = cva(
  [
    "fixed left-1/2 top-1/2 z-modal -translate-x-1/2 -translate-y-1/2",
    "w-full bg-bg-card border border-border-subtle rounded-[var(--ds-radius-card)] shadow-neu-floating",
    "animate-scale-in",
    "focus:outline-none",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "max-w-sm p-[var(--ds-space-card)]",
        md: "max-w-lg p-[var(--ds-space-card)]",
        lg: "max-w-2xl p-8",
        fullscreen: "max-w-none h-screen w-screen rounded-none p-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dialogContentVariants> {}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, size, children, ...props }, ref) => {
    const { open, setOpen } = useDialogContext();

    React.useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      if (open) {
        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "";
      };
    }, [open, setOpen]);

    if (!open) return null;

    return (
      <>
        <DialogOverlay onClick={() => setOpen(false)} />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn(dialogContentVariants({ size, className }))}
          {...props}
        >
          {children}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-[var(--ds-radius-tooltip)] p-1 text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </>
    );
  },
);
DialogContent.displayName = "DialogContent";

/* --- DialogHeader / Title / Description --- */
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1.5 mb-4", className)} {...props} />
);

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold text-text-primary", className)} {...props} />
  ),
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-text-secondary", className)} {...props} />,
);
DialogDescription.displayName = "DialogDescription";

/* --- DialogFooter --- */
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center justify-end gap-3 mt-6", className)} {...props} />
);

export type { DialogContentProps, DialogProps };
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  dialogContentVariants,
};

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

const sheetVariants = cva("fixed z-modal bg-bg-card border-border-subtle shadow-neu-floating focus:outline-none", {
  variants: {
    side: {
      left: "inset-y-0 left-0 border-r animate-slide-in-left",
      right: "inset-y-0 right-0 border-l animate-slide-in-right",
      top: "inset-x-0 top-0 border-b animate-slide-in-down",
      bottom: "inset-x-0 bottom-0 border-t animate-slide-in-up",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    { side: "left", size: "sm", className: "w-72" },
    { side: "left", size: "md", className: "w-96" },
    { side: "left", size: "lg", className: "w-[480px]" },
    { side: "right", size: "sm", className: "w-72" },
    { side: "right", size: "md", className: "w-96" },
    { side: "right", size: "lg", className: "w-[480px]" },
    { side: "top", size: "sm", className: "h-48" },
    { side: "top", size: "md", className: "h-72" },
    { side: "top", size: "lg", className: "h-96" },
    { side: "bottom", size: "sm", className: "h-48" },
    { side: "bottom", size: "md", className: "h-72" },
    { side: "bottom", size: "lg", className: "h-96" },
  ],
  defaultVariants: {
    side: "right",
    size: "md",
  },
});

interface SheetProps extends VariantProps<typeof sheetVariants> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

function Sheet({ open, onClose, side, size, children, className }: SheetProps) {
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-overlay bg-bg-overlay backdrop-blur-sm animate-fade-up"
        role="presentation"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      />
      <div role="dialog" aria-modal="true" className={cn(sheetVariants({ side, size, className }))}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-text-muted hover:text-text-primary transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="p-[var(--ds-space-card)] h-full overflow-y-auto scrollbar-thin">{children}</div>
      </div>
    </>
  );
}

export type { SheetProps };
export { Sheet, sheetVariants };

import { cva, type VariantProps } from "class-variance-authority";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

const itemVariants = cva(
  [
    "inline-flex items-center justify-center rounded-[var(--ds-radius-button)] font-medium",
    "border border-edge-subtle bg-transparent text-fg-secondary",
    "transition-colors duration-fast ease-soft",
    "hover:bg-surface-hover hover:text-fg-primary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
    "disabled:pointer-events-none disabled:opacity-40",
    "aria-[current=page]:bg-accent aria-[current=page]:text-white aria-[current=page]:border-accent",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-7 min-w-7 px-2 text-xs",
        md: "h-8 min-w-8 px-2.5 text-xs",
        lg: "h-9 min-w-9 px-3 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "size">, VariantProps<typeof itemVariants> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showEdges?: boolean;
}

function buildRange(page: number, pageCount: number, siblings: number, showEdges: boolean): (number | "ellipsis")[] {
  if (pageCount <= 1) return pageCount === 1 ? [1] : [];

  const totalSlots = siblings * 2 + (showEdges ? 5 : 3);
  if (pageCount <= totalSlots) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblings, showEdges ? 2 : 1);
  const rightSibling = Math.min(page + siblings, showEdges ? pageCount - 1 : pageCount);
  const showLeftEllipsis = showEdges && leftSibling > 2;
  const showRightEllipsis = showEdges && rightSibling < pageCount - 1;

  const items: (number | "ellipsis")[] = [];
  if (showEdges) items.push(1);
  if (showLeftEllipsis) items.push("ellipsis");
  for (let i = leftSibling; i <= rightSibling; i++) items.push(i);
  if (showRightEllipsis) items.push("ellipsis");
  if (showEdges && rightSibling < pageCount) items.push(pageCount);
  return items;
}

const iconSize: Record<NonNullable<VariantProps<typeof itemVariants>["size"]>, string> = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, page, pageCount, onPageChange, siblingCount = 1, size = "md", showEdges = true, ...props }, ref) => {
    const items = buildRange(page, pageCount, siblingCount, showEdges);
    const isFirst = page <= 1;
    const isLast = page >= pageCount;
    const resolvedSize = size ?? "md";

    const goTo = (next: number) => {
      const clamped = Math.min(Math.max(next, 1), pageCount);
      if (clamped !== page) onPageChange(clamped);
    };

    return (
      <nav ref={ref} aria-label="Pagination" className={cn("inline-flex", className)} {...props}>
        <ul className="flex items-center gap-1">
          <li>
            <button
              type="button"
              className={itemVariants({ size: resolvedSize })}
              disabled={isFirst}
              aria-label="Previous page"
              onClick={() => goTo(page - 1)}
            >
              <ChevronLeft className={iconSize[resolvedSize]} />
            </button>
          </li>
          {items.map((item, i) => (
            <li key={item === "ellipsis" ? `ellipsis-${i}` : item}>
              {item === "ellipsis" ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex items-center justify-center text-fg-muted",
                    resolvedSize === "sm" && "h-7 w-7",
                    resolvedSize === "md" && "h-8 w-8",
                    resolvedSize === "lg" && "h-9 w-9",
                  )}
                >
                  <MoreHorizontal className={iconSize[resolvedSize]} />
                </span>
              ) : (
                <button
                  type="button"
                  className={itemVariants({ size: resolvedSize })}
                  aria-current={item === page ? "page" : undefined}
                  onClick={() => goTo(item)}
                >
                  {item}
                </button>
              )}
            </li>
          ))}
          <li>
            <button
              type="button"
              className={itemVariants({ size: resolvedSize })}
              disabled={isLast}
              aria-label="Next page"
              onClick={() => goTo(page + 1)}
            >
              <ChevronRight className={iconSize[resolvedSize]} />
            </button>
          </li>
        </ul>
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";

export type { PaginationProps };
export { itemVariants as paginationItemVariants, Pagination };

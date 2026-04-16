"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

/* ===  Types  === */

interface SectionNavContextValue {
  activeId: string;
}

/* ===  Context  === */

const SectionNavContext = React.createContext<SectionNavContextValue>({ activeId: "" });

function useSectionNav() {
  return React.useContext(SectionNavContext);
}

/* ===  SectionNav  === */

interface SectionNavProps extends React.ComponentPropsWithoutRef<"nav"> {
  /** Currently active section id. When omitted, IntersectionObserver auto-tracks. */
  activeId?: string;
  /** CSS selector for observed sections. Default `"section[id]"`. */
  observeSelector?: string;
  /** Root margin for IntersectionObserver. Default `"0px 0px -60% 0px"`. */
  observeRootMargin?: string;
}

const SectionNav = React.forwardRef<HTMLElement, SectionNavProps>(
  (
    {
      activeId: controlledActiveId,
      observeSelector = "section[id]",
      observeRootMargin = "0px 0px -60% 0px",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [observedId, setObservedId] = React.useState("");
    const activeId = controlledActiveId ?? observedId;

    React.useEffect(() => {
      if (controlledActiveId !== undefined) return;
      const sections = document.querySelectorAll(observeSelector);
      if (!sections.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setObservedId(entry.target.id);
            }
          }
        },
        { rootMargin: observeRootMargin },
      );

      for (const section of sections) observer.observe(section);
      return () => observer.disconnect();
    }, [controlledActiveId, observeSelector, observeRootMargin]);

    const ctx = React.useMemo(() => ({ activeId }), [activeId]);

    return (
      <SectionNavContext.Provider value={ctx}>
        <nav ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
          {children}
        </nav>
      </SectionNavContext.Provider>
    );
  },
);
SectionNav.displayName = "SectionNav";

/* ===  SectionNavGroup  === */

interface SectionNavGroupProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  /** Id of the first section in this group. Makes the label clickable. */
  firstSectionId?: string;
}

const SectionNavGroup = React.forwardRef<HTMLDivElement, SectionNavGroupProps>(
  ({ label, firstSectionId, className, children, ...props }, ref) => {
    const handleClick = () => {
      if (!firstSectionId) return;
      const target = document.getElementById(firstSectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `#${firstSectionId}`);
      }
    };

    return (
      <div ref={ref} className={cn("flex flex-col", className)} {...props}>
        <span
          role={firstSectionId ? "button" : undefined}
          tabIndex={firstSectionId ? 0 : undefined}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClick();
          }}
          className={cn(
            "px-2 pt-3 pb-1 text-xs font-bold text-accent-text select-none",
            firstSectionId && "cursor-pointer hover:text-accent-text/80",
          )}
        >
          {label}
        </span>
        <div className="flex flex-col gap-px">{children}</div>
      </div>
    );
  },
);
SectionNavGroup.displayName = "SectionNavGroup";

/* ===  SectionNavItem  === */

interface SectionNavItemProps extends React.ComponentPropsWithoutRef<"a"> {
  /** Section id this item links to (without #). Used for active matching. */
  sectionId?: string;
}

const SectionNavItem = React.forwardRef<HTMLAnchorElement, SectionNavItemProps>(
  ({ sectionId, href, className, children, onClick, ...props }, ref) => {
    const { activeId } = useSectionNav();
    const resolvedId = sectionId ?? href?.replace("#", "");
    const isActive = !!resolvedId && activeId === resolvedId;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || !resolvedId) return;
      const target = document.getElementById(resolvedId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `#${resolvedId}`);
      }
    };

    return (
      <a
        ref={ref}
        href={href ?? (resolvedId ? `#${resolvedId}` : undefined)}
        onClick={handleClick}
        data-active={isActive || undefined}
        className={cn(
          "px-2 py-1 text-xs rounded-[var(--ds-radius-button)] transition-colors",
          isActive
            ? "text-accent-text bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] font-medium"
            : "text-fg-muted hover:text-fg-secondary hover:bg-surface-hover",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  },
);
SectionNavItem.displayName = "SectionNavItem";

export type { SectionNavGroupProps, SectionNavItemProps, SectionNavProps };
export { SectionNav, SectionNavGroup, SectionNavItem };

"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "../../lib/utils";

/* ===  Types  === */

interface NavigationMenuContextValue {
  activeValue: string;
  visibleValue: string;
  onTriggerEnter: (value: string) => void;
  close: () => void;
  registerTrigger: (value: string, el: HTMLButtonElement | null) => void;
  viewportRef: React.RefObject<HTMLDivElement | null>;
  isReady: boolean;
}

interface ItemContextValue {
  value: string;
}

/* ===  Contexts  === */

const NavigationMenuContext = React.createContext<NavigationMenuContextValue | null>(null);
const ItemContext = React.createContext<ItemContextValue | null>(null);

function useNavigationMenu() {
  const ctx = React.useContext(NavigationMenuContext);
  if (!ctx) throw new Error("NavigationMenu components must be used within <NavigationMenu>");
  return ctx;
}

function useItem() {
  const ctx = React.useContext(ItemContext);
  if (!ctx) throw new Error("NavigationMenuTrigger/Content must be used within <NavigationMenuItem>");
  return ctx;
}

/* ===  NavigationMenu  === */

interface NavigationMenuProps extends React.ComponentPropsWithoutRef<"nav"> {
  /** Delay in ms before opening on hover. Default 150. */
  delayEnter?: number;
  /** Delay in ms before closing after mouse leave. Default 300. */
  delayLeave?: number;
}

const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  ({ children, className, delayEnter = 150, delayLeave = 300, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const [activeValue, setActiveValue] = React.useState("");
    const [visibleValue, setVisibleValue] = React.useState("");
    const [viewportLeft, setViewportLeft] = React.useState(0);
    const activeRef = React.useRef("");
    const enterTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const leaveTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const viewportRef = React.useRef<HTMLDivElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const navRef = React.useRef<HTMLElement>(null);
    const triggerMapRef = React.useRef<Map<string, HTMLButtonElement>>(new Map());
    const [isReady, setIsReady] = React.useState(false);

    React.useLayoutEffect(() => setIsReady(true), []);

    // Track visibleValue for exit animation
    React.useEffect(() => {
      activeRef.current = activeValue;
      if (activeValue) setVisibleValue(activeValue);
    }, [activeValue]);

    // Position viewport centered under the active trigger, clamped to container bounds
    React.useEffect(() => {
      if (!activeValue || !navRef.current || !wrapperRef.current) return;
      const trigger = triggerMapRef.current.get(activeValue);
      if (!trigger) return;
      // Defer to next frame so portal content has rendered and we get correct width
      const raf = requestAnimationFrame(() => {
        if (!navRef.current || !wrapperRef.current) return;
        const navRect = navRef.current.getBoundingClientRect();
        const triggerRect = trigger.getBoundingClientRect();
        const vpWidth = wrapperRef.current.offsetWidth;
        const triggerCenter = triggerRect.left - navRect.left + triggerRect.width / 2;
        const ideal = triggerCenter - vpWidth / 2;

        // Clamp to the viewport window (not just nav bounds) so mega panels
        // wider than the nav still stay on-screen
        const pad = 16;
        const idealScreenLeft = navRect.left + ideal;
        let clamped = ideal;
        if (idealScreenLeft < pad) {
          clamped = ideal + (pad - idealScreenLeft);
        } else if (idealScreenLeft + vpWidth > window.innerWidth - pad) {
          clamped = ideal - (idealScreenLeft + vpWidth - (window.innerWidth - pad));
        }
        setViewportLeft(clamped);
      });
      return () => cancelAnimationFrame(raf);
    }, [activeValue]);

    // Cleanup timers
    React.useEffect(() => {
      return () => {
        clearTimeout(enterTimerRef.current);
        clearTimeout(leaveTimerRef.current);
      };
    }, []);

    // --- Hover logic: nav-level mouse leave/enter ---
    // Viewport is a DOM child of nav, so onMouseLeave only fires when
    // the pointer exits BOTH the nav AND the viewport.

    const handleNavMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        clearTimeout(leaveTimerRef.current);
        onMouseEnter?.(e);
      },
      [onMouseEnter],
    );

    const handleNavMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        clearTimeout(enterTimerRef.current);
        leaveTimerRef.current = setTimeout(() => setActiveValue(""), delayLeave);
        onMouseLeave?.(e);
      },
      [delayLeave, onMouseLeave],
    );

    const onTriggerEnter = React.useCallback(
      (value: string) => {
        clearTimeout(leaveTimerRef.current);
        clearTimeout(enterTimerRef.current);
        if (activeRef.current) {
          // Already open — switch immediately
          setActiveValue(value);
        } else {
          enterTimerRef.current = setTimeout(() => setActiveValue(value), delayEnter);
        }
      },
      [delayEnter],
    );

    const close = React.useCallback(() => {
      clearTimeout(enterTimerRef.current);
      clearTimeout(leaveTimerRef.current);
      setActiveValue("");
    }, []);

    const registerTrigger = React.useCallback((value: string, el: HTMLButtonElement | null) => {
      if (el) triggerMapRef.current.set(value, el);
      else triggerMapRef.current.delete(value);
    }, []);

    // Escape key
    React.useEffect(() => {
      if (!activeValue) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [activeValue, close]);

    const ctx = React.useMemo(
      () => ({
        activeValue,
        visibleValue,
        onTriggerEnter,
        close,
        registerTrigger,
        viewportRef,
        isReady,
      }),
      [activeValue, visibleValue, onTriggerEnter, close, registerTrigger, isReady],
    );

    const setRefs = React.useCallback(
      (node: HTMLElement | null) => {
        (navRef as React.MutableRefObject<HTMLElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      },
      [ref],
    );

    return (
      <NavigationMenuContext.Provider value={ctx}>
        <nav
          ref={setRefs}
          className={cn("relative", className)}
          onMouseEnter={handleNavMouseEnter}
          onMouseLeave={handleNavMouseLeave}
          {...props}
        >
          {children}
          {/* Viewport is rendered here as a direct child of nav so hover bridging works */}
          <NavigationMenuViewportInternal viewportLeft={viewportLeft} wrapperRef={wrapperRef} />
        </nav>
      </NavigationMenuContext.Provider>
    );
  },
);
NavigationMenu.displayName = "NavigationMenu";

/* ===  NavigationMenuList  === */

const NavigationMenuList = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<"ul">>(
  ({ className, ...props }, ref) => <ul ref={ref} className={cn("flex items-center gap-1", className)} {...props} />,
);
NavigationMenuList.displayName = "NavigationMenuList";

/* ===  NavigationMenuItem  === */

interface NavigationMenuItemProps extends React.ComponentPropsWithoutRef<"li"> {
  value?: string;
}

const NavigationMenuItem = React.forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ value, className, ...props }, ref) => {
    const autoValue = React.useId();
    const resolvedValue = value ?? autoValue;
    const ctx = React.useMemo(() => ({ value: resolvedValue }), [resolvedValue]);

    return (
      <ItemContext.Provider value={ctx}>
        <li ref={ref} className={cn("relative", className)} {...props} />
      </ItemContext.Provider>
    );
  },
);
NavigationMenuItem.displayName = "NavigationMenuItem";

/* ===  NavigationMenuTrigger  === */

const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(
  ({ children, className, ...props }, ref) => {
    const { activeValue, onTriggerEnter, registerTrigger } = useNavigationMenu();
    const { value } = useItem();
    const isActive = activeValue === value;

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        registerTrigger(value, node);
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      },
      [ref, registerTrigger, value],
    );

    return (
      <button
        ref={setRefs}
        type="button"
        data-state={isActive ? "open" : "closed"}
        onMouseEnter={() => onTriggerEnter(value)}
        onFocus={() => onTriggerEnter(value)}
        className={cn(navigationMenuTriggerStyle(), className)}
        {...props}
      >
        {children}
        <ChevronDown
          className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </button>
    );
  },
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

/* ===  NavigationMenuContent  === */

const NavigationMenuContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ children, className, ...props }, ref) => {
    const { activeValue, visibleValue, viewportRef, isReady } = useNavigationMenu();
    const { value } = useItem();
    const isActive = activeValue === value;
    const isVisible = visibleValue === value;
    const shouldRender = isActive || (isVisible && !activeValue);

    if (!shouldRender || !isReady || !viewportRef.current) return null;

    return ReactDOM.createPortal(
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {children}
      </div>,
      viewportRef.current,
    );
  },
);
NavigationMenuContent.displayName = "NavigationMenuContent";

/* ===  NavigationMenuLink  === */

interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  asChild?: boolean;
}

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ active, asChild, className, onClick, children, ...props }, ref) => {
    const navCtx = React.useContext(NavigationMenuContext);
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      navCtx?.close();
    };

    const classes = cn(className, active && ACTIVE_LINK_CLASS);

    if (asChild && React.isValidElement<Record<string, unknown>>(children)) {
      return React.cloneElement(children, {
        ref,
        className: cn(classes, (children.props as { className?: string }).className),
        onClick: handleClick,
        "data-active": active || undefined,
        ...props,
      });
    }

    return (
      <a ref={ref} data-active={active || undefined} className={classes} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  },
);
NavigationMenuLink.displayName = "NavigationMenuLink";

/* ===  NavigationMenuViewport (internal, rendered by NavigationMenu)  === */

function NavigationMenuViewportInternal({
  viewportLeft,
  wrapperRef,
}: {
  viewportLeft: number;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { activeValue, viewportRef } = useNavigationMenu();
  const isOpen = !!activeValue;

  return (
    <div
      ref={wrapperRef}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "absolute top-full z-popover pt-2",
        "transition-[opacity,translate] duration-200 ease-out",
        isOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1",
      )}
      style={{ left: viewportLeft }}
    >
      <div
        ref={(node) => {
          (viewportRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-popover shadow-lg"
      />
    </div>
  );
}

/* ===  NavigationMenuViewport (public, for custom placement — re-exports internal ref)  === */

const NavigationMenuViewport = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  (_props, _ref) => {
    // Viewport is now always rendered internally by NavigationMenu.
    // This component is a no-op kept for API compatibility.
    return null;
  },
);
NavigationMenuViewport.displayName = "NavigationMenuViewport";

/* ===  Helpers  === */

const ACTIVE_LINK_CLASS =
  "text-accent-text hover:text-accent-text bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] hover:bg-[color-mix(in_oklch,var(--accent)_18%,transparent)]";

/** Returns className string matching NavigationMenuTrigger styling. Use on NavigationMenuLink for standalone (non-dropdown) nav items. */
function navigationMenuTriggerStyle() {
  return [
    "group inline-flex items-center gap-1.5 rounded-[var(--ds-radius-button)] px-3 py-1.5 text-sm font-medium cursor-pointer",
    "transition-colors duration-normal ease-soft",
    "text-fg-secondary hover:text-fg-primary hover:bg-surface-hover",
    "data-[state=open]:text-fg-primary data-[state=open]:bg-surface-hover",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
  ].join(" ");
}

export type { NavigationMenuItemProps, NavigationMenuLinkProps, NavigationMenuProps };
export {
  ACTIVE_LINK_CLASS as navigationMenuActiveClass,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};

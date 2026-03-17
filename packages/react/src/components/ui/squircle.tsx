import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * Generate a quintic superellipse path (n=5) for given dimensions and corner radius.
 * The equation: |x/a|^5 + |y/b|^5 = 1
 */
function generateSquirclePath(width: number, height: number, radius: number, steps = 64): string {
  const r = Math.min(radius, width / 2, height / 2);
  const n = 5; // quintic

  // We build the path by tracing each corner with a superellipse arc
  // and connecting them with straight edges
  const points: [number, number][] = [];

  // Helper: trace a quarter superellipse centered at (cx, cy)
  // quadrant: 0=top-right, 1=bottom-right, 2=bottom-left, 3=top-left
  function traceCorner(cx: number, cy: number, quadrant: number) {
    const stepsPerCorner = Math.max(steps / 4, 8);
    for (let i = 0; i <= stepsPerCorner; i++) {
      const t = (i / stepsPerCorner) * (Math.PI / 2);
      const cos = Math.cos(t);
      const sin = Math.sin(t);
      // Superellipse: x = r * sign(cos) * |cos|^(2/n), y = r * sign(sin) * |sin|^(2/n)
      const exp = 2 / n;
      const sx = Math.sign(cos) * Math.abs(cos) ** exp * r;
      const sy = Math.sign(sin) * Math.abs(sin) ** exp * r;

      let x: number, y: number;
      switch (quadrant) {
        case 0: // top-right
          x = cx + sx;
          y = cy - sy;
          break;
        case 1: // bottom-right
          x = cx + sy;
          y = cy + sx;
          break;
        case 2: // bottom-left
          x = cx - sx;
          y = cy + sy;
          break;
        case 3: // top-left
          x = cx - sy;
          y = cy - sx;
          break;
        default:
          x = cx;
          y = cy;
      }
      points.push([x, y]);
    }
  }

  // Four corners: top-right, bottom-right, bottom-left, top-left
  // Start from top edge (after top-left corner)

  // Top edge: from top-left corner end to top-right corner start
  // Top-right corner
  traceCorner(width - r, r, 0);
  // Bottom-right corner
  traceCorner(width - r, height - r, 1);
  // Bottom-left corner
  traceCorner(r, height - r, 2);
  // Top-left corner
  traceCorner(r, r, 3);

  if (points.length === 0) return "";

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");

  return `${path} Z`;
}

/* --------------------------------------------------------- */
/* Squircle Component                                        */
/* --------------------------------------------------------- */

interface SquircleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Corner radius in px (default: 24) */
  radius?: number;
  /** Border width in px (default: 0, no border) */
  borderWidth?: number;
  /** Border color (default: var(--border-default)) */
  borderColor?: string;
  /** Fill color (default: transparent — shows children bg) */
  fill?: string;
  /** Explicit width — if not set, auto-detected via ResizeObserver */
  width?: number;
  /** Explicit height — if not set, auto-detected via ResizeObserver */
  height?: number;
  /** Number of path segments per corner (default: 64 total) */
  smoothness?: number;
}

const Squircle = React.forwardRef<HTMLDivElement, SquircleProps>(
  (
    {
      radius = 24,
      borderWidth = 0,
      borderColor = "var(--border-default)",
      fill = "transparent",
      width: explicitWidth,
      height: explicitHeight,
      smoothness = 64,
      className,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [size, setSize] = React.useState<{ w: number; h: number }>({ w: 0, h: 0 });

    // Merge refs
    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    // Auto-detect size
    React.useEffect(() => {
      if (explicitWidth && explicitHeight) return;
      const el = containerRef.current;
      if (!el) return;

      const ro = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        setSize({ w: Math.round(width), h: Math.round(height) });
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, [explicitWidth, explicitHeight]);

    const w = explicitWidth ?? size.w;
    const h = explicitHeight ?? size.h;
    const hasSize = w > 0 && h > 0;

    const clipPath = hasSize ? generateSquirclePath(w, h, radius, smoothness) : "";
    const borderPath = hasSize && borderWidth > 0 ? generateSquirclePath(w, h, radius, smoothness) : "";
    const innerClipPath =
      hasSize && borderWidth > 0
        ? generateSquirclePath(w - borderWidth * 2, h - borderWidth * 2, Math.max(0, radius - borderWidth), smoothness)
        : "";

    return (
      <div
        ref={mergedRef}
        className={cn("relative", className)}
        style={{
          ...style,
          ...(explicitWidth ? { width: explicitWidth } : {}),
          ...(explicitHeight ? { height: explicitHeight } : {}),
        }}
        {...props}
      >
        {/* SVG overlay for border + clip */}
        {hasSize && (
          <svg
            className="absolute inset-0 pointer-events-none"
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Fill shape */}
            {fill !== "transparent" && <path d={clipPath} fill={fill} />}
            {/* Border */}
            {borderWidth > 0 && <path d={borderPath} fill={borderColor} clipRule="evenodd" fillRule="evenodd" />}
            {borderWidth > 0 && (
              <path
                d={innerClipPath}
                fill={fill !== "transparent" ? fill : "var(--bg-card)"}
                transform={`translate(${borderWidth}, ${borderWidth})`}
              />
            )}
          </svg>
        )}

        {/* Content — clipped to squircle shape */}
        <div
          className="relative"
          style={
            hasSize
              ? {
                  clipPath: `path('${clipPath}')`,
                  width: w,
                  height: h,
                }
              : {}
          }
        >
          {children}
        </div>
      </div>
    );
  },
);
Squircle.displayName = "Squircle";

/* --------------------------------------------------------- */
/* useSquirclePath hook — for custom usage                   */
/* --------------------------------------------------------- */
function useSquirclePath(width: number, height: number, radius: number, smoothness = 64): string {
  return React.useMemo(
    () => generateSquirclePath(width, height, radius, smoothness),
    [width, height, radius, smoothness],
  );
}

export type { SquircleProps };
export { generateSquirclePath, Squircle, useSquirclePath };

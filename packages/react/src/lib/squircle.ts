import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/**
 * Generate a quintic superellipse (squircle) SVG path for a rounded rectangle.
 *
 * Parametric superellipse: x = sign(cos(t)) * |cos(t)|^(2/n) * r
 * with n=5 for Apple-style continuous curvature.
 *
 * Each corner is a quarter-arc traced at the correct angle range:
 *   top-left:     π    → 3π/2  (from left edge to top edge)
 *   top-right:    3π/2 → 2π    (from top edge to right edge)
 *   bottom-right: 0    → π/2   (from right edge to bottom edge)
 *   bottom-left:  π/2  → π     (from bottom edge to left edge)
 */
export function generateSquirclePath(width: number, height: number, radius: number): string {
  if (width <= 0 || height <= 0) return "";

  const r = Math.min(radius, width / 2, height / 2);
  if (r < 0.5) return `M0,0 L${width},0 L${width},${height} L0,${height} Z`;

  const n = 5;
  const exp = 2 / n; // 0.4
  const steps = 20;

  // Superellipse point relative to center
  function se(t: number): [number, number] {
    const c = Math.cos(t);
    const s = Math.sin(t);
    return [Math.sign(c) * Math.abs(c) ** exp * r, Math.sign(s) * Math.abs(s) ** exp * r];
  }

  const pts: string[] = [];
  function add(x: number, y: number) {
    pts.push(`${Math.round(x * 100) / 100},${Math.round(y * 100) / 100}`);
  }

  // Top-left corner: center (r, r), t from π to 3π/2
  // Goes from (0, r) to (r, 0)
  for (let i = 0; i <= steps; i++) {
    const t = Math.PI + (Math.PI / 2) * (i / steps);
    const [sx, sy] = se(t);
    add(r + sx, r + sy);
  }

  // Top-right corner: center (W-r, r), t from 3π/2 to 2π
  // Goes from (W-r, 0) to (W, r)
  for (let i = 0; i <= steps; i++) {
    const t = (3 * Math.PI) / 2 + (Math.PI / 2) * (i / steps);
    const [sx, sy] = se(t);
    add(width - r + sx, r + sy);
  }

  // Bottom-right corner: center (W-r, H-r), t from 0 to π/2
  // Goes from (W, H-r) to (W-r, H)
  for (let i = 0; i <= steps; i++) {
    const t = (Math.PI / 2) * (i / steps);
    const [sx, sy] = se(t);
    add(width - r + sx, height - r + sy);
  }

  // Bottom-left corner: center (r, H-r), t from π/2 to π
  // Goes from (r, H) to (0, H-r)
  for (let i = 0; i <= steps; i++) {
    const t = Math.PI / 2 + (Math.PI / 2) * (i / steps);
    const [sx, sy] = se(t);
    add(r + sx, height - r + sy);
  }

  return `M${pts.join(" L")} Z`;
}

/**
 * Hook: auto-measures element and returns squircle clip-path + SVG path.
 */
export function useSquircleClip(radius: number, explicitWidth?: number, explicitHeight?: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Sync measure before paint to avoid flash
  useLayoutEffect(() => {
    if (explicitWidth && explicitHeight) return;
    const el = ref.current;
    if (!el) return;
    // Immediate measure
    const rect = el.getBoundingClientRect();
    setSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
  }, [explicitWidth, explicitHeight]);

  // ResizeObserver for ongoing size changes (responsive)
  useEffect(() => {
    if (explicitWidth && explicitHeight) return;
    const el = ref.current;
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

  const svgPath = useMemo(() => generateSquirclePath(w, h, radius), [w, h, radius]);

  const clipPath = useMemo(() => (svgPath ? `path('${svgPath}')` : undefined), [svgPath]);

  return { ref, clipPath, svgPath, width: w, height: h };
}

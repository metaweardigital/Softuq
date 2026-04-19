import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const haloVariants = cva("relative inline-flex isolate", {
  variants: {
    size: {
      sm: "[--ds-ai-halo-width:1px] [--ds-ai-halo-bloom-size:6px]",
      md: "[--ds-ai-halo-width:1px] [--ds-ai-halo-bloom-size:10px]",
      lg: "[--ds-ai-halo-width:1px] [--ds-ai-halo-bloom-size:16px]",
    },
    speed: {
      slow: "[--ds-ai-halo-speed:6s]",
      normal: "[--ds-ai-halo-speed:4s]",
      fast: "[--ds-ai-halo-speed:2.4s]",
    },
    radius: {
      inherit: "",
      button: "rounded-[var(--ds-radius-button)]",
      sm: "rounded-[var(--ds-radius-sm)]",
      md: "rounded-[var(--ds-radius-md)]",
      lg: "rounded-[var(--ds-radius-lg)]",
      full: "rounded-full",
    },
  },
  defaultVariants: { size: "md", speed: "normal", radius: "button" },
});

type HaloTone = "iridescent" | "mono" | "subtle";

const toneGradient: Record<HaloTone, string> = {
  iridescent:
    "conic-gradient(from 0deg, transparent 0%, transparent 62%, var(--ai-hue-1) 72%, var(--ai-hue-3) 80%, var(--ai-hue-5) 88%, var(--ai-hue-6) 94%, transparent 100%)",
  mono: "conic-gradient(from 0deg, transparent 0%, transparent 68%, color-mix(in oklch, var(--accent) 60%, transparent) 80%, var(--accent) 92%, transparent 100%)",
  subtle:
    "conic-gradient(from 0deg, transparent 0%, transparent 70%, color-mix(in oklch, var(--ai-hue-1) 55%, transparent) 82%, color-mix(in oklch, var(--ai-hue-5) 55%, transparent) 92%, transparent 100%)",
};

interface HaloProps extends React.HTMLAttributes<HTMLDivElement>, Omit<VariantProps<typeof haloVariants>, "radius"> {
  tone?: HaloTone;
  active?: boolean;
  radius?: "inherit" | "button" | "sm" | "md" | "lg" | "full";
}

const Halo = React.forwardRef<HTMLDivElement, HaloProps>(
  ({ className, tone = "iridescent", size, speed, radius, active = true, children, style, ...props }, ref) => {
    const gradient = toneGradient[tone];
    const spinAnimation = "ai-halo-spin var(--ds-ai-halo-speed, 4s) linear infinite";

    // Ring: mask-composite gives a strip of the rotating conic on the border
    const ringContainerStyle: React.CSSProperties = {
      padding: "var(--ds-ai-halo-width, 1.5px)",
      borderRadius: "inherit",
      WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
      mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      overflow: "hidden",
      opacity: active ? 1 : 0,
      transition: "opacity 400ms cubic-bezier(0.16,1,0.3,1)",
    };

    const arcStyle: React.CSSProperties = {
      position: "absolute",
      inset: "-100%",
      background: gradient,
      animation: spinAnimation,
      willChange: "transform",
    };

    // Bloom: same rotating conic, blurred, clipped INSIDE the host (rounded-inherit + overflow-hidden)
    const bloomClipStyle: React.CSSProperties = {
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: -1,
      opacity: active ? 0.6 : 0,
      transition: "opacity 400ms cubic-bezier(0.16,1,0.3,1)",
    };

    const bloomStyle: React.CSSProperties = {
      position: "absolute",
      inset: "-100%",
      background: gradient,
      filter: "blur(var(--ds-ai-halo-bloom-size, 10px))",
      animation: spinAnimation,
      willChange: "transform",
    };

    return (
      <div
        ref={ref}
        data-ai-primitive="halo"
        data-ai-active={active}
        className={cn(haloVariants({ size, speed, radius }), className)}
        style={style}
        {...props}
      >
        <span aria-hidden="true" data-ai-layer style={bloomClipStyle}>
          <span data-ai-layer style={bloomStyle} />
        </span>
        <span
          aria-hidden="true"
          data-ai-layer
          className="pointer-events-none absolute inset-0"
          style={ringContainerStyle}
        >
          <span data-ai-layer style={arcStyle} />
        </span>
        {children}
      </div>
    );
  },
);
Halo.displayName = "Halo";

export type { HaloProps, HaloTone };
export { Halo, haloVariants };

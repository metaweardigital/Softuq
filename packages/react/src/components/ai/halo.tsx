import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const haloVariants = cva("relative inline-flex isolate [&>[data-ai-layer]]:pointer-events-none", {
  variants: {
    size: {
      sm: "[--ds-ai-halo-width:1px] [--ds-ai-halo-bloom-size:10px]",
      md: "[--ds-ai-halo-width:1.5px] [--ds-ai-halo-bloom-size:16px]",
      lg: "[--ds-ai-halo-width:2.5px] [--ds-ai-halo-bloom-size:24px]",
    },
    speed: {
      slow: "[--ds-ai-halo-speed:5s]",
      normal: "[--ds-ai-halo-speed:3s]",
      fast: "[--ds-ai-halo-speed:1.6s]",
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
  defaultVariants: {
    size: "md",
    speed: "normal",
    radius: "button",
  },
});

type HaloTone = "iridescent" | "mono" | "subtle";

interface HaloProps extends React.HTMLAttributes<HTMLDivElement>, Omit<VariantProps<typeof haloVariants>, "radius"> {
  tone?: HaloTone;
  active?: boolean;
  radius?: "inherit" | "button" | "sm" | "md" | "lg" | "full";
}

const toneGradient: Record<HaloTone, string> = {
  iridescent: "var(--ai-gradient-iridescent)",
  mono: "var(--ai-gradient-mono)",
  subtle: "var(--ai-gradient-subtle)",
};

const Halo = React.forwardRef<HTMLDivElement, HaloProps>(
  (
    { className, tone = "iridescent", size, speed, radius, active = true, children, style, ...props },
    ref,
  ) => {
    const ringStyle: React.CSSProperties = {
      background: toneGradient[tone],
      animation: "ai-halo-spin var(--ds-ai-halo-speed, 3s) linear infinite",
      opacity: active ? 1 : 0,
      transition: "opacity 400ms cubic-bezier(0.16,1,0.3,1)",
    };

    const bloomStyle: React.CSSProperties = {
      background: toneGradient[tone],
      animation: "ai-halo-spin var(--ds-ai-halo-speed, 3s) linear infinite",
      filter: "blur(var(--ds-ai-halo-bloom-size))",
      opacity: active ? "var(--ds-ai-halo-bloom-opacity)" : 0,
      borderRadius: "inherit",
      transition: "opacity 400ms cubic-bezier(0.16,1,0.3,1)",
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
        <span aria-hidden="true" data-ai-layer className="absolute inset-[-4px] -z-10" style={bloomStyle} />
        <span aria-hidden="true" data-ai-layer className="absolute inset-0 softuq-ai-halo-ring" style={ringStyle} />
        {children}
      </div>
    );
  },
);
Halo.displayName = "Halo";

export type { HaloProps, HaloTone };
export { Halo, haloVariants };

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const auroraVariants = cva("absolute inset-0 pointer-events-none", {
  variants: {
    intensity: {
      subtle: "[--ds-ai-aurora-opacity:0.25] [--ds-ai-aurora-blur:32px]",
      medium: "[--ds-ai-aurora-opacity:0.45] [--ds-ai-aurora-blur:40px]",
      intense: "[--ds-ai-aurora-opacity:0.7] [--ds-ai-aurora-blur:48px]",
    },
  },
  defaultVariants: {
    intensity: "medium",
  },
});

type AuroraCoverage = "full" | "top" | "bottom";

interface AuroraProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof auroraVariants> {
  coverage?: AuroraCoverage;
  animate?: boolean;
}

const coveragePositions: Record<AuroraCoverage, { from: string; via: string; to: string }> = {
  full: {
    from: "20% 30%",
    via: "70% 60%",
    to: "50% 90%",
  },
  top: {
    from: "25% 20%",
    via: "70% 30%",
    to: "50% 40%",
  },
  bottom: {
    from: "20% 90%",
    via: "70% 75%",
    to: "50% 60%",
  },
};

const Aurora = React.forwardRef<HTMLDivElement, AuroraProps>(
  ({ className, intensity, coverage = "full", animate = true, style, ...props }, ref) => {
    const pos = coveragePositions[coverage];
    const layerStyle: React.CSSProperties = {
      position: "absolute",
      inset: "-10%",
      backgroundImage: [
        `radial-gradient(40% 60% at ${pos.from}, var(--ai-aurora-from) 0%, transparent 60%)`,
        `radial-gradient(45% 55% at ${pos.via}, var(--ai-aurora-via) 0%, transparent 60%)`,
        `radial-gradient(50% 50% at ${pos.to}, var(--ai-aurora-to) 0%, transparent 60%)`,
      ].join(", "),
      filter: "blur(var(--ds-ai-aurora-blur))",
      opacity: "var(--ds-ai-aurora-opacity)",
      mixBlendMode: "screen",
      animation: animate ? "ai-aurora-drift var(--ds-ai-aurora-speed, 12s) ease-in-out infinite alternate" : undefined,
      willChange: animate ? "transform" : undefined,
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        data-ai-primitive="aurora"
        className={cn(auroraVariants({ intensity }), className)}
        style={style}
        {...props}
      >
        <div data-ai-layer style={layerStyle} />
      </div>
    );
  },
);
Aurora.displayName = "Aurora";

export type { AuroraCoverage, AuroraProps };
export { Aurora, auroraVariants };

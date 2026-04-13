import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const trackVariants = cva("relative w-full grow overflow-hidden rounded-full bg-border-subtle", {
  variants: {
    size: {
      sm: "h-1",
      md: "h-1.5",
      lg: "h-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const thumbVariants = cva(
  [
    "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white border-2 border-accent shadow-md",
    "transition-transform duration-fast ease-soft",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
    "disabled:pointer-events-none",
    "hover:scale-110 active:scale-95 cursor-grab active:cursor-grabbing",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type SliderValue = number | [number, number];

interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">,
    VariantProps<typeof trackVariants> {
  value?: SliderValue;
  defaultValue?: SliderValue;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onValueChange?: (value: SliderValue) => void;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function roundToStep(n: number, step: number, min: number) {
  return Math.round((n - min) / step) * step + min;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    { className, value, defaultValue, min = 0, max = 100, step = 1, disabled, size = "md", onValueChange, ...props },
    ref,
  ) => {
    const isRange = Array.isArray(value ?? defaultValue ?? 0);
    const initial: [number, number] = React.useMemo(() => {
      const source = value ?? defaultValue;
      if (Array.isArray(source)) return [source[0], source[1]];
      return [0, typeof source === "number" ? source : min];
    }, [value, defaultValue, min]);

    const [internal, setInternal] = React.useState<[number, number]>(initial);
    const current: [number, number] = React.useMemo(() => {
      if (value === undefined) return internal;
      return Array.isArray(value) ? [value[0], value[1]] : [0, value];
    }, [value, internal]);

    const trackRef = React.useRef<HTMLDivElement>(null);
    const activeThumbRef = React.useRef<0 | 1 | null>(null);

    const setValue = (next: [number, number]) => {
      setInternal(next);
      onValueChange?.(isRange ? next : next[1]);
    };

    const pointToValue = (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return null;
      const pct = clamp((clientX - rect.left) / rect.width, 0, 1);
      return roundToStep(min + pct * (max - min), step, min);
    };

    const onPointerDown = (e: React.PointerEvent<HTMLElement>, thumb?: 0 | 1) => {
      if (disabled) return;
      e.currentTarget.setPointerCapture(e.pointerId);

      const raw = pointToValue(e.clientX);
      if (raw === null) return;

      let which: 0 | 1;
      if (thumb !== undefined) {
        which = thumb;
        activeThumbRef.current = which;
        return;
      }
      if (isRange) {
        which = Math.abs(raw - current[0]) < Math.abs(raw - current[1]) ? 0 : 1;
      } else {
        which = 1;
      }
      activeThumbRef.current = which;
      applyValue(raw, which);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
      if (activeThumbRef.current === null) return;
      const raw = pointToValue(e.clientX);
      if (raw === null) return;
      applyValue(raw, activeThumbRef.current);
    };

    const onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
      activeThumbRef.current = null;
      e.currentTarget.releasePointerCapture(e.pointerId);
    };

    const applyValue = (raw: number, which: 0 | 1) => {
      const v = clamp(raw, min, max);
      if (isRange) {
        const next: [number, number] =
          which === 0 ? [Math.min(v, current[1]), current[1]] : [current[0], Math.max(v, current[0])];
        setValue(next);
      } else {
        setValue([0, v]);
      }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLElement>, which: 0 | 1) => {
      if (disabled) return;
      let delta = 0;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") delta = step;
      else if (e.key === "ArrowLeft" || e.key === "ArrowDown") delta = -step;
      else if (e.key === "PageUp") delta = step * 10;
      else if (e.key === "PageDown") delta = -step * 10;
      else if (e.key === "Home") {
        e.preventDefault();
        applyValue(min, which);
        return;
      } else if (e.key === "End") {
        e.preventDefault();
        applyValue(max, which);
        return;
      } else return;
      e.preventDefault();
      applyValue(current[which] + delta, which);
    };

    const pct = (n: number) => ((n - min) / (max - min)) * 100;
    const leftPct = isRange ? pct(current[0]) : 0;
    const rightPct = pct(current[1]);

    return (
      <div
        ref={ref}
        className={cn("relative flex items-center select-none touch-none w-full", disabled && "opacity-50", className)}
        {...props}
      >
        <div
          ref={trackRef}
          className={cn(trackVariants({ size }), "cursor-pointer")}
          onPointerDown={(e) => onPointerDown(e)}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <div className="absolute h-full bg-accent" style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%` }} />
        </div>

        {isRange && (
          <button
            type="button"
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={current[0]}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
            onKeyDown={(e) => onKeyDown(e, 0)}
            onPointerDown={(e) => onPointerDown(e, 0)}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            className={thumbVariants({ size })}
            style={{ left: `${leftPct}%` }}
          />
        )}

        <button
          type="button"
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={current[1]}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          disabled={disabled}
          onKeyDown={(e) => onKeyDown(e, 1)}
          onPointerDown={(e) => onPointerDown(e, 1)}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className={thumbVariants({ size })}
          style={{ left: `${rightPct}%` }}
        />
      </div>
    );
  },
);
Slider.displayName = "Slider";

export type { SliderProps };
export { Slider, thumbVariants as sliderThumbVariants, trackVariants as sliderTrackVariants };

"use client";

import { Badge } from "@designystem/react";
import { TrendingUp } from "lucide-react";

type Stat = {
  value: string;
  label: string;
  delta?: string;
};

const STATS: Stat[] = [
  { value: "12k+", label: "Teams shipping", delta: "+18% MoM" },
  { value: "98.7%", label: "Uptime this quarter" },
  { value: "<40ms", label: "Median response", delta: "-12ms" },
  { value: "4.9/5", label: "Customer satisfaction" },
];

export default function StatsGrid() {
  return (
    <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-[var(--ds-space-stack)]">
            By the numbers
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">Trusted where it counts</h2>
          <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-muted">
            The metrics our customers care about most — measured continuously, reported transparently.
          </p>
        </div>
        <div className="mt-[var(--ds-space-stack-lg)] grid grid-cols-2 md:grid-cols-4 gap-[var(--ds-space-gap)]">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-[var(--ds-space-card)]"
            >
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-fg-primary">{s.value}</p>
              <p className="mt-2 text-sm text-fg-muted">{s.label}</p>
              {s.delta && (
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-accent-text">
                  <TrendingUp className="size-3" />
                  {s.delta}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

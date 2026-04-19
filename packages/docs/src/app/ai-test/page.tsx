"use client";

import { Aurora, Dots, Halo } from "@softuq/react";

export default function AITestPage() {
  return (
    <div className="min-h-screen bg-surface-base p-12 space-y-16">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-fg-primary">AI primitives — raw test</h1>
        <p className="text-sm text-fg-muted">
          Halo must rotate. Dots must bounce. Aurora must drift. No layout, no theming — just the primitives.
        </p>
      </header>

      {/* HALO */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-fg-primary">Halo — should rotate every 3s</h2>
        <div className="flex flex-wrap gap-10 items-center">
          <Halo tone="iridescent" size="lg" radius="md">
            <div className="h-20 w-56 rounded-md bg-surface-elevated flex items-center justify-center text-fg-primary">
              iridescent · lg
            </div>
          </Halo>
          <Halo tone="mono" size="lg" radius="md">
            <div className="h-20 w-56 rounded-md bg-surface-elevated flex items-center justify-center text-fg-primary">
              mono · lg
            </div>
          </Halo>
          <Halo tone="subtle" size="lg" radius="md">
            <div className="h-20 w-56 rounded-md bg-surface-elevated flex items-center justify-center text-fg-primary">
              subtle · lg
            </div>
          </Halo>
        </div>
      </section>

      {/* DOTS */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-fg-primary">Dots — should bounce in sequence</h2>
        <div className="flex gap-12 items-end bg-surface-card p-8 rounded-md border border-edge-subtle">
          <Dots size="lg" tone="iridescent" />
          <Dots size="lg" tone="mono" />
          <Dots size="lg" tone="muted" />
        </div>
      </section>

      {/* AURORA */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-fg-primary">Aurora — should drift slowly</h2>
        <div className="relative h-64 rounded-md border border-edge-subtle bg-surface-card overflow-hidden">
          <Aurora intensity="intense" coverage="full" animate />
          <div className="relative p-6 text-fg-primary">aurora · intense · full</div>
        </div>
      </section>

      {/* RAW CSS SMOKE TEST — bypasses React entirely */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-fg-primary">Raw CSS smoke test (no React primitive)</h2>
        <p className="text-xs text-fg-muted">
          If these animate but the ones above don't, problem is in the TSX. If these also don't animate, keyframes
          aren't reaching the browser.
        </p>
        <div className="flex gap-10 items-center">
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 12,
              background: "var(--ai-gradient-iridescent)",
              animation: "ai-halo-spin 3s linear infinite",
            }}
          />
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 9999,
              background: "var(--ai-hue-1)",
              animation: "ai-dots-bounce 1.2s ease-in-out infinite",
            }}
          />
          <div
            style={{
              width: 160,
              height: 80,
              borderRadius: 12,
              background:
                "radial-gradient(50% 50% at 20% 30%, var(--ai-hue-1), transparent 60%), radial-gradient(50% 50% at 70% 60%, var(--ai-hue-4), transparent 60%)",
              filter: "blur(20px)",
              animation: "ai-aurora-drift 12s ease-in-out infinite alternate",
            }}
          />
        </div>
      </section>
    </div>
  );
}

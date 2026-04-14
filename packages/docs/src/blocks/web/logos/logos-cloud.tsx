"use client";

const LOGOS = ["Acme", "Lumen", "Northwind", "Otter", "Vertex", "Horizon"];

export default function Logos01() {
  return (
    <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-semibold tracking-wide uppercase text-fg-dimmed">Trusted by teams at</p>
        <div className="mt-[var(--ds-space-stack-lg)] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-[var(--ds-space-gap)] items-center">
          {LOGOS.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center py-4 text-fg-muted hover:text-fg-primary transition-colors"
            >
              <span className="text-lg font-bold tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

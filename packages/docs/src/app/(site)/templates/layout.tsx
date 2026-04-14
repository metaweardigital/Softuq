import type { ReactNode } from "react";

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return <div className="max-w-6xl mx-auto px-[var(--ds-space-page-x)] py-12">{children}</div>;
}

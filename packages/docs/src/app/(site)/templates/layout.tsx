import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Full page templates — landing pages, dashboards, auth flows. Assembled from blocks, ready to ship in an afternoon.",
};

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return <div className="max-w-6xl mx-auto px-[var(--ds-space-page-x)] py-12">{children}</div>;
}

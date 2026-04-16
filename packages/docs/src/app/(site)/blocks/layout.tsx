import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Pre-composed page sections — heroes, pricing grids, FAQ accordions, footers, and more. Fork and customize for your brand.",
};

export default function BlocksLayout({ children }: { children: ReactNode }) {
  return <div className="max-w-6xl mx-auto px-[var(--ds-space-page-x)] py-12">{children}</div>;
}

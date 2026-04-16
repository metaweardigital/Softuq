import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Foundations",
  description:
    "Design tokens that power Softuq — colors in OKLCH, fluid typography, 4px spacing grid, shadows, border radius, and animation primitives.",
};

export default function FoundationsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

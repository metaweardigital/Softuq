import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Set up Softuq in your project in minutes. Install tokens, copy components, and start building with a single CLI command.",
};

export default function GettingStartedLayout({ children }: { children: ReactNode }) {
  return <div className="max-w-2xl mx-auto px-[var(--ds-space-page-x)] py-12">{children}</div>;
}

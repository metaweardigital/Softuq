import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "License — Softuq",
  description:
    "Softuq is MIT-licensed — free to use in personal and commercial projects, fork, modify, and redistribute. No attribution required in your UI.",
};

export default function LicenseLayout({ children }: { children: ReactNode }) {
  return <div className="max-w-3xl mx-auto px-[var(--ds-space-page-x)] py-12">{children}</div>;
}

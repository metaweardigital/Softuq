import type { ReactNode } from "react";

export default function GettingStartedLayout({ children }: { children: ReactNode }) {
  return <div className="max-w-2xl mx-auto px-6 py-12">{children}</div>;
}

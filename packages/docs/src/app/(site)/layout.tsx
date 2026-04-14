import type { ReactNode } from "react";
import { Navbar } from "../_components/navbar";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1 bg-surface-base">{children}</main>
    </div>
  );
}

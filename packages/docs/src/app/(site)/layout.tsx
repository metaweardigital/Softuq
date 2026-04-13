import type { ReactNode } from "react";
import { Navbar } from "../_components/navbar";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-3.5rem)] bg-bg-base">{children}</main>
    </>
  );
}

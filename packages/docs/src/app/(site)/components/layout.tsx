import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Components",
  description:
    "37 accessible React primitives — buttons, dialogs, inputs, tables, and more. CVA variants, full TypeScript types, copy-paste into your project.",
};

export default function ComponentsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

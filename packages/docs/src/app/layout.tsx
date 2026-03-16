import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DesignYstem — Component Preview",
  description: "Live preview of all DesignYstem components",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}

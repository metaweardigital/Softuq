import type { ReactNode } from "react";
import { SiteFooter } from "../_components/footer";
import { Navbar } from "../_components/navbar";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://softuq.com/#organization",
      name: "Softuq",
      url: "https://softuq.com",
      description:
        "A design system for AI-era projects. Components, blocks, and page templates with copy-paste distribution.",
    },
    {
      "@type": "WebSite",
      "@id": "https://softuq.com/#website",
      url: "https://softuq.com",
      name: "Softuq",
      publisher: { "@id": "https://softuq.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Softuq",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      url: "https://softuq.com",
      description:
        "React design system with 37+ components, 40+ blocks, and full page templates. Copy-paste via CLI, theme via tokens.",
    },
  ],
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="flex-1 bg-surface-base">{children}</main>
      <SiteFooter />
    </div>
  );
}

"use client";

import Link from "next/link";
import FooterMinimal, { type FooterLinkItem } from "@/blocks/web/footer/footer-minimal";

const FOOTER_LINKS: FooterLinkItem[] = [
  { label: "Getting started", href: "/getting-started" },
  { label: "Components", href: "/components" },
  { label: "Blocks", href: "/blocks" },
  { label: "Templates", href: "/templates" },
];

function FooterBrand() {
  return (
    <span className="font-sans text-sm font-semibold tracking-[0.1em] text-fg-primary">
      softuq<span className="text-xs font-normal text-fg-muted tracking-normal">.com</span>
    </span>
  );
}

export function SiteFooter() {
  return (
    <FooterMinimal
      brand={<FooterBrand />}
      copyright={`\u00A9 ${new Date().getFullYear()}`}
      links={FOOTER_LINKS}
      linkComponent={Link}
      socials={[]}
    />
  );
}

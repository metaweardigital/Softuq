"use client";

import { Badge } from "@softuq/react";
import Link from "next/link";
import FooterMinimal, { type FooterLinkItem } from "@/blocks/web/footer/footer-minimal";

const FOOTER_LINKS: FooterLinkItem[] = [
  { label: "Getting started", href: "/getting-started" },
  { label: "Components", href: "/components" },
  { label: "Blocks", href: "/blocks" },
  { label: "Templates", href: "/templates" },
  { label: "MIT License", href: "/license" },
];

function FooterBrand() {
  return (
    <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-[0.1em] text-fg-primary">
      <span>
        softuq<span className="text-xs font-normal text-fg-muted tracking-normal">.com</span>
      </span>
      <Badge variant="secondary" size="sm" className="font-normal tracking-normal">
        Beta
      </Badge>
    </span>
  );
}

export function SiteFooter() {
  return (
    <FooterMinimal brand={<FooterBrand />} copyright={null} links={FOOTER_LINKS} linkComponent={Link} socials={[]} />
  );
}

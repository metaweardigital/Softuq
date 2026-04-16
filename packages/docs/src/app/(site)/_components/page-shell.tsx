"use client";

import {
  Breadcrumb,
  BreadcrumbCollapsed,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@softuq/react";
import { Home } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export type Crumb = { label: string; href?: string };

export function PageShell({
  title,
  description,
  crumbs,
  children,
}: {
  title: string;
  description?: string;
  crumbs: Crumb[];
  children: ReactNode;
}) {
  const middleCrumbs = crumbs.slice(0, -1);
  const lastCrumb = crumbs[crumbs.length - 1];
  const collapsibleItems = middleCrumbs.filter((c) => c.href).map((c) => ({ label: c.label, href: c.href as string }));

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList className="flex-nowrap">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Mobile: collapse middle crumbs into ellipsis */}
          {middleCrumbs.length > 0 && (
            <span className="contents md:hidden">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbCollapsed items={collapsibleItems} />
              </BreadcrumbItem>
            </span>
          )}

          {/* Desktop: show all crumbs */}
          {middleCrumbs.map((c) => (
            <span key={c.label} className="hidden md:contents">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {c.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={c.href}>{c.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <span>{c.label}</span>
                )}
              </BreadcrumbItem>
            </span>
          ))}

          {/* Last crumb: always visible */}
          {lastCrumb && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="min-w-0">
                <BreadcrumbPage className="truncate">{lastCrumb.label}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold text-fg-primary mt-4 tracking-tight">{title}</h1>
      {description && <p className="text-fg-secondary mt-2 text-base">{description}</p>}

      <div className="mt-10">{children}</div>
    </>
  );
}

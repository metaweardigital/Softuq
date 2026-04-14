"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@designystem/react";
import { Home } from "lucide-react";
import Link from "next/link";
import React, { type ReactNode } from "react";

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
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <React.Fragment key={c.label}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {c.href && !isLast ? (
                    <BreadcrumbLink asChild>
                      <Link href={c.href}>{c.label}</Link>
                    </BreadcrumbLink>
                  ) : isLast ? (
                    <BreadcrumbPage>{c.label}</BreadcrumbPage>
                  ) : (
                    <span>{c.label}</span>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold text-fg-primary mt-4 tracking-tight">{title}</h1>
      {description && <p className="text-fg-secondary mt-2 text-base">{description}</p>}

      <div className="mt-10">{children}</div>
    </>
  );
}

"use client";

import { ChevronRight } from "lucide-react";
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
  return (
    <>
      <nav className="flex items-center gap-1.5 text-sm text-text-muted">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <span key={c.label} className="inline-flex items-center gap-1.5">
              {c.href && !isLast ? (
                <Link href={c.href} className="hover:text-accent transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className={isLast ? "text-text-primary" : undefined}>{c.label}</span>
              )}
              {!isLast && <ChevronRight className="size-3.5 text-text-dimmed" />}
            </span>
          );
        })}
      </nav>

      <h1 className="text-3xl font-bold text-text-primary mt-4 tracking-tight">{title}</h1>
      {description && <p className="text-text-secondary mt-2 text-base">{description}</p>}

      <div className="mt-10">{children}</div>
    </>
  );
}

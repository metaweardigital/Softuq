"use client";

import { CodeBlock } from "@softuq/react";
import { PageShell } from "../_components/page-shell";

const MIT_LICENSE = `MIT License

Copyright (c) 2026 Softuq

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.`;

type Permission = { title: string; description: string };

const ALLOWED: Permission[] = [
  { title: "Commercial use", description: "Ship Softuq in paid products, SaaS, and client work." },
  { title: "Modify", description: "Fork components, tweak tokens, restyle anything — it's yours after copy." },
  { title: "Distribute", description: "Bundle Softuq into your own template, starter kit, or library." },
  { title: "Private use", description: "Internal tools, side projects, prototypes — no disclosure required." },
];

const CONDITIONS: Permission[] = [
  {
    title: "Keep the license notice",
    description: "If you redistribute Softuq itself (not a product built with it), include the MIT notice.",
  },
  {
    title: "No warranty",
    description: "Softuq is provided as-is. We can't be held liable if something breaks in your product.",
  },
];

export default function LicensePage() {
  return (
    <PageShell
      title="License"
      description="Softuq is MIT-licensed. Use it however you want — personal, commercial, forked, rebranded — no strings attached."
      crumbs={[{ label: "License" }]}
    >
      <div className="space-y-[var(--ds-space-stack-lg)]">
        <section className="space-y-[var(--ds-space-stack)]">
          <h2 className="text-xl font-semibold text-fg-primary tracking-tight">What you can do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--ds-space-gap)]">
            {ALLOWED.map((p) => (
              <div
                key={p.title}
                className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-[var(--ds-space-card)]"
              >
                <h3 className="text-sm font-semibold text-fg-primary">{p.title}</h3>
                <p className="mt-1 text-sm text-fg-muted">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-[var(--ds-space-stack)]">
          <h2 className="text-xl font-semibold text-fg-primary tracking-tight">The fine print</h2>
          <div className="space-y-[var(--ds-space-gap)]">
            {CONDITIONS.map((p) => (
              <div
                key={p.title}
                className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-[var(--ds-space-card)]"
              >
                <h3 className="text-sm font-semibold text-fg-primary">{p.title}</h3>
                <p className="mt-1 text-sm text-fg-muted">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-[var(--ds-space-stack)]">
          <h2 className="text-xl font-semibold text-fg-primary tracking-tight">Full license</h2>
          <p className="text-sm text-fg-muted">
            This is the standard MIT license text. Nothing Softuq-specific — the same text that ships with most
            open-source React libraries.
          </p>
          <CodeBlock title="LICENSE" language="plain">
            {MIT_LICENSE}
          </CodeBlock>
        </section>
      </div>
    </PageShell>
  );
}

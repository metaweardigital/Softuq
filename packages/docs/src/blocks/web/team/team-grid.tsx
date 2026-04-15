"use client";

import { Avatar, Badge, Button } from "@designystem/react";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { Globe } from "lucide-react";

type Member = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

const MEMBERS: Member[] = [
  {
    name: "Ava Pollard",
    role: "Founder & CEO",
    bio: "Previously led platform at Northwind. Shipping since the Geocities era.",
    initials: "AP",
  },
  {
    name: "Noah Chen",
    role: "Head of Design",
    bio: "Obsessed with typography, motion, and the gap between spec and production.",
    initials: "NC",
  },
  {
    name: "Leo Marín",
    role: "Principal Engineer",
    bio: "Built core infra at Otter. Turns specs into systems, systems into products.",
    initials: "LM",
  },
  {
    name: "Mira Okafor",
    role: "Product Manager",
    bio: "Loves talking to customers more than writing roadmaps — still does both.",
    initials: "MO",
  },
  {
    name: "Sam Kowalski",
    role: "Developer Advocate",
    bio: "Writes docs that read like conversations. Hosts our monthly community call.",
    initials: "SK",
  },
  {
    name: "Iris Halvorsen",
    role: "Design Engineer",
    bio: "Lives in the seam between Figma and the codebase. Keeps tokens honest.",
    initials: "IH",
  },
];

export default function TeamGrid() {
  return (
    <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-[var(--ds-space-stack)]">
            Team
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">
            The people behind the system
          </h2>
          <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-muted">
            A small, senior team of designers and engineers who care deeply about the details.
          </p>
        </div>
        <div className="mt-[var(--ds-space-stack-lg)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[var(--ds-space-gap)]">
          {MEMBERS.map((m) => (
            <div
              key={m.name}
              className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-[var(--ds-space-card)]"
            >
              <div className="flex items-center gap-3">
                <Avatar size="md" fallback={m.initials} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-fg-primary truncate">{m.name}</p>
                  <p className="text-xs text-fg-muted truncate">{m.role}</p>
                </div>
              </div>
              <p className="mt-[var(--ds-space-stack-sm)] text-sm text-fg-secondary leading-relaxed">{m.bio}</p>
              <div className="mt-[var(--ds-space-stack-sm)] flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" asChild>
                  <a href="#" aria-label={`${m.name} on X`}>
                    <SiX />
                  </a>
                </Button>
                <Button variant="ghost" size="icon-sm" asChild>
                  <a href="#" aria-label={`${m.name} website`}>
                    <Globe />
                  </a>
                </Button>
                <Button variant="ghost" size="icon-sm" asChild>
                  <a href="#" aria-label={`${m.name} on GitHub`}>
                    <SiGithub />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

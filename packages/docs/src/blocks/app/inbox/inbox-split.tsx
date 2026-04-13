"use client";

import { Avatar, Badge, Button, cn, Input, Separator } from "@designystem/react";
import { Archive, Forward, Inbox, MoreHorizontal, Reply, Search, Star, Trash2 } from "lucide-react";
import * as React from "react";

type Message = {
  id: string;
  from: string;
  initials: string;
  subject: string;
  preview: string;
  time: string;
  unread?: boolean;
  starred?: boolean;
  tag?: { label: string; variant?: "default" | "secondary" | "outline" };
};

const MESSAGES: Message[] = [
  {
    id: "m1",
    from: "Ava Pollard",
    initials: "AP",
    subject: "Re: Q2 roadmap review",
    preview: "Thanks for sending the draft. I had a few thoughts on the timeline for the platform rewrite...",
    time: "2m",
    unread: true,
    tag: { label: "Team" },
  },
  {
    id: "m2",
    from: "Noah Chen",
    initials: "NC",
    subject: "Design tokens — light mode audit",
    preview: "I went through every component and flagged contrast issues. Most are small, but a few need...",
    time: "1h",
    unread: true,
    starred: true,
    tag: { label: "Design", variant: "secondary" },
  },
  {
    id: "m3",
    from: "Leo Marín",
    initials: "LM",
    subject: "Customer call summary — Acme",
    preview: "Call went well. They're interested in the enterprise tier but want to see SOC2 paperwork first.",
    time: "3h",
    tag: { label: "Sales", variant: "outline" },
  },
  {
    id: "m4",
    from: "Ivy Okafor",
    initials: "IO",
    subject: "Weekly ops digest",
    preview: "All systems green. One incident this week on the EU cluster, resolved in 12 minutes.",
    time: "yesterday",
  },
  {
    id: "m5",
    from: "Jun Park",
    initials: "JP",
    subject: "v1.4.0 shipped 🚀",
    preview: "Release notes are live. Highlights: new billing flow, improved search, dark mode fixes.",
    time: "2d",
    starred: true,
    tag: { label: "Release", variant: "secondary" },
  },
  {
    id: "m6",
    from: "Mira Velez",
    initials: "MV",
    subject: "Recruiting pipeline update",
    preview: "5 new candidates moved to on-site. Offers out for 2, closing by end of week.",
    time: "3d",
    tag: { label: "HR", variant: "outline" },
  },
];

export default function InboxSplit() {
  const [selectedId, setSelectedId] = React.useState<string>(MESSAGES[0].id);
  const selected = MESSAGES.find((m) => m.id === selectedId) ?? MESSAGES[0];

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <header className="border-b border-border-subtle px-[var(--ds-space-section-x)] py-4 flex items-center gap-[var(--ds-space-gap)]">
        <div className="flex items-center gap-2">
          <Inbox className="size-4 text-text-muted" />
          <h1 className="text-lg font-semibold tracking-tight text-text-primary">Inbox</h1>
          <Badge variant="secondary" size="sm">
            {MESSAGES.filter((m) => m.unread).length} unread
          </Badge>
        </div>
        <div className="ml-auto relative w-64">
          <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-text-dimmed pointer-events-none" />
          <Input placeholder="Search mail..." className="h-8 pl-8 text-xs" />
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[360px_1fr] min-h-0">
        <aside className="border-r border-border-subtle overflow-y-auto scrollbar-thin">
          <ul>
            {MESSAGES.map((m, i) => {
              const active = m.id === selectedId;
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(m.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 transition-colors",
                      active ? "bg-[color-mix(in_oklch,var(--accent)_10%,transparent)]" : "hover:bg-bg-hover",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar size="sm" fallback={m.initials} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p
                            className={cn(
                              "text-sm truncate",
                              m.unread ? "font-semibold text-text-primary" : "text-text-secondary",
                            )}
                          >
                            {m.from}
                          </p>
                          {m.starred && <Star className="size-3 shrink-0 fill-warning text-warning" />}
                          <span className="ml-auto text-xs text-text-dimmed shrink-0">{m.time}</span>
                        </div>
                        <p
                          className={cn("text-sm mt-0.5 truncate", m.unread ? "text-text-primary" : "text-text-muted")}
                        >
                          {m.subject}
                        </p>
                        <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{m.preview}</p>
                        {m.tag && (
                          <Badge variant={m.tag.variant ?? "default"} size="sm" className="mt-1.5">
                            {m.tag.label}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                  {i < MESSAGES.length - 1 && <Separator />}
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="flex flex-col min-w-0">
          <header className="px-[var(--ds-space-section-x)] py-4 border-b border-border-subtle flex items-start justify-between gap-[var(--ds-space-gap)]">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-text-primary">{selected.subject}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Avatar size="sm" fallback={selected.initials} />
                <div className="text-xs">
                  <p className="text-text-primary font-medium">{selected.from}</p>
                  <p className="text-text-muted">to me · {selected.time} ago</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button variant="ghost" size="icon-sm" aria-label="Archive">
                <Archive />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Delete">
                <Trash2 />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Star">
                <Star />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="More">
                <MoreHorizontal />
              </Button>
            </div>
          </header>

          <div className="flex-1 px-[var(--ds-space-section-x)] py-6 overflow-y-auto scrollbar-thin">
            <div className="max-w-2xl space-y-4 text-sm text-text-secondary leading-relaxed">
              <p>Hi team,</p>
              <p>{selected.preview}</p>
              <p>
                I'd like to schedule a quick sync this week to walk through the key pieces. Let me know what time works
                on your end — I'll send a calendar invite.
              </p>
              <p>A few things I'd love your input on ahead of the meeting:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Scoping and phasing for the rewrite</li>
                <li>Resource allocation across Q2 and Q3</li>
                <li>Dependency on the design system migration</li>
              </ul>
              <p>Thanks,</p>
              <p>{selected.from}</p>
            </div>
          </div>

          <footer className="px-[var(--ds-space-section-x)] py-4 border-t border-border-subtle flex items-center gap-2">
            <Button size="sm">
              <Reply />
              Reply
            </Button>
            <Button variant="outline" size="sm">
              <Forward />
              Forward
            </Button>
          </footer>
        </section>
      </div>
    </div>
  );
}

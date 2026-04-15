"use client";

import { Badge, Button, FormField, Input, Label, Textarea } from "@designystem/react";
import { ArrowRight, Mail, MapPin, MessageCircle } from "lucide-react";

type InfoItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  hint: string;
};

const INFO: InfoItem[] = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@designystem.dev",
    hint: "We reply within one business day.",
  },
  {
    icon: MessageCircle,
    title: "Community",
    value: "discord.gg/designystem",
    hint: "Join 2,400+ designers and engineers.",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Prague, Czech Republic",
    hint: "By appointment — we're mostly remote.",
  },
];

export default function ContactSplit() {
  return (
    <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-stack-lg)]">
        <div>
          <Badge variant="outline" className="mb-[var(--ds-space-stack)]">
            Contact
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">Let's talk</h2>
          <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-muted">
            Questions about tokens, theming, or how to adopt the system at scale? We're listening.
          </p>
          <ul className="mt-[var(--ds-space-stack-lg)] space-y-[var(--ds-space-gap)]">
            {INFO.map((i) => {
              const Icon = i.icon;
              return (
                <li key={i.title} className="flex items-start gap-3">
                  <div className="size-10 shrink-0 rounded-[var(--ds-radius-checkbox)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wide uppercase text-fg-dimmed">{i.title}</p>
                    <p className="mt-0.5 text-sm font-medium text-fg-primary">{i.value}</p>
                    <p className="text-xs text-fg-muted">{i.hint}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card p-[var(--ds-space-card)] space-y-[var(--ds-space-gap)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--ds-space-gap)]">
            <FormField>
              <Label>First name</Label>
              <Input placeholder="Ava" />
            </FormField>
            <FormField>
              <Label>Last name</Label>
              <Input placeholder="Pollard" />
            </FormField>
          </div>
          <FormField>
            <Label>Email</Label>
            <Input type="email" placeholder="you@company.com" />
          </FormField>
          <FormField>
            <Label>Company</Label>
            <Input placeholder="Northwind" />
          </FormField>
          <FormField>
            <Label>How can we help?</Label>
            <Textarea rows={4} placeholder="Tell us a bit about your project…" />
          </FormField>
          <Button type="submit" size="md" className="w-full">
            Send message
            <ArrowRight />
          </Button>
        </form>
      </div>
    </section>
  );
}

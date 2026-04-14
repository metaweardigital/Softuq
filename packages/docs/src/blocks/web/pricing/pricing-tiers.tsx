"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@designystem/react";
import { Check } from "lucide-react";

type Tier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    description: "Everything you need to try the system.",
    features: ["All primitives", "Dark & light", "Copy-paste CLI", "MIT licensed"],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "per month",
    description: "For solo devs shipping production apps.",
    features: ["Everything in Starter", "All blocks", "Priority updates", "Email support"],
    cta: "Upgrade to Pro",
    featured: true,
  },
  {
    name: "Team",
    price: "$49",
    cadence: "per month",
    description: "For teams that need shared tokens and theming.",
    features: ["Everything in Pro", "5 seats included", "Custom tokens", "Slack support"],
    cta: "Start free trial",
  },
];

export default function Pricing01() {
  return (
    <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-[var(--ds-space-stack)]">
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">
            Simple pricing. No surprises.
          </h2>
          <p className="mt-[var(--ds-space-stack-sm)] text-fg-muted">
            Start free, scale when you need to. Cancel anytime — no questions asked.
          </p>
        </div>
        <div className="mt-[var(--ds-space-stack-lg)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--ds-space-gap)]">
          {TIERS.map((tier) => (
            <Card key={tier.name} className={tier.featured ? "relative border-edge-accent" : undefined}>
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Most popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-[var(--ds-space-gap)]">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-fg-primary">{tier.price}</span>
                  <span className="text-sm text-fg-muted">/ {tier.cadence}</span>
                </div>
                <ul className="space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-fg-secondary">
                      <Check className="size-4 mt-0.5 shrink-0 text-accent-text" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-0">
                <Button size="md" className="w-full sm:hidden" variant={tier.featured ? "default" : "outline"}>
                  {tier.cta}
                </Button>
                <Button
                  size="lg"
                  className="hidden sm:inline-flex w-full"
                  variant={tier.featured ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

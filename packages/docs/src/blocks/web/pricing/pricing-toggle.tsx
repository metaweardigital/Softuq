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
  ToggleGroup,
  ToggleGroupItem,
} from "@softuq/react";
import { Check } from "lucide-react";
import * as React from "react";

type Cadence = "monthly" | "yearly";

type Tier = {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  features: string[];
  cta: string;
  featured?: boolean;
};

const DIGIT_LADDER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

function DigitRoll({ digit }: { digit: number }) {
  return (
    <span
      className="relative inline-block overflow-hidden align-baseline"
      style={{ height: "1em", width: "0.6em", lineHeight: 1 }}
    >
      <span
        className="absolute left-0 top-0 flex flex-col transition-transform duration-500 ease-[var(--ease-smooth)]"
        style={{ transform: `translateY(-${digit}em)` }}
      >
        {DIGIT_LADDER.map((n) => (
          <span key={n} style={{ height: "1em", lineHeight: 1 }}>
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

function AnimatedPrice({ value }: { value: number }) {
  if (value === 0) return <span>$0</span>;
  const digits = String(value).split("").map(Number);
  return (
    <span className="inline-flex items-baseline tabular-nums">
      <span>$</span>
      {digits.map((d, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: position-based stability required so digit columns persist across value changes and animate via transform
        <DigitRoll key={i} digit={d} />
      ))}
    </span>
  );
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    description: "Everything you need to try the system.",
    monthly: 0,
    yearly: 0,
    features: ["All primitives", "Dark & light", "Copy-paste CLI", "MIT licensed"],
    cta: "Get started",
  },
  {
    name: "Pro",
    description: "For solo devs shipping production apps.",
    monthly: 19,
    yearly: 15,
    features: ["Everything in Starter", "All blocks", "Priority updates", "Email support"],
    cta: "Upgrade to Pro",
    featured: true,
  },
  {
    name: "Team",
    description: "For teams that need shared tokens and theming.",
    monthly: 49,
    yearly: 39,
    features: ["Everything in Pro", "5 seats included", "Custom tokens", "Slack support"],
    cta: "Start free trial",
  },
];

export default function PricingToggle() {
  const [cadence, setCadence] = React.useState<Cadence>("monthly");

  return (
    <section className="px-[var(--ds-space-page-x)] py-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-[var(--ds-space-stack)]">
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">
            Pick a plan that scales with you
          </h2>
          <p className="mt-[var(--ds-space-stack-sm)] text-base text-fg-muted">
            Save 20% with yearly billing. Every plan includes updates, docs, and community support.
          </p>
          <div className="mt-[var(--ds-space-stack)] flex items-center justify-center">
            <ToggleGroup
              type="single"
              variant="outline"
              value={cadence}
              onValueChange={(v) => v && setCadence(v as Cadence)}
              aria-label="Billing cadence"
            >
              <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
              <ToggleGroupItem value="yearly" className="gap-2">
                Yearly
                <Badge size="sm" variant="success">
                  -20%
                </Badge>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <div className="mt-[var(--ds-space-stack-lg)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--ds-space-gap)]">
          {TIERS.map((tier) => {
            const price = cadence === "monthly" ? tier.monthly : tier.yearly;
            const cadenceLabel = cadence === "monthly" ? "per month" : "per month, billed yearly";
            return (
              <Card
                key={tier.name}
                className={`flex flex-col h-full ${tier.featured ? "relative border-edge-accent" : ""}`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>Most popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-[var(--ds-space-gap)]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-fg-primary">
                      <AnimatedPrice value={price} />
                    </span>
                    <span className="text-sm text-fg-muted">/ {price === 0 ? "forever" : cadenceLabel}</span>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

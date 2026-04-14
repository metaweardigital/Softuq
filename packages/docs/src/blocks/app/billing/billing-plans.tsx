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
  cn,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@designystem/react";
import { Check, CreditCard, Download, ExternalLink, Receipt } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  current?: boolean;
  recommended?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "For individuals getting started.",
    features: ["1 workspace", "Up to 3 members", "Community support", "1 GB storage"],
  },
  {
    name: "Pro",
    price: "$24",
    period: "per member / month",
    description: "For growing teams that need more power.",
    features: [
      "Unlimited workspaces",
      "Up to 25 members",
      "Priority support",
      "100 GB storage",
      "Advanced analytics",
      "API access",
    ],
    current: true,
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "For organizations that need control.",
    features: [
      "Unlimited everything",
      "SSO + SCIM",
      "Dedicated support",
      "Custom contracts",
      "SOC2 + HIPAA",
      "Audit logs",
    ],
  },
];

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  period: string;
};

const INVOICES: Invoice[] = [
  { id: "INV-0142", date: "Apr 1, 2026", amount: "$240.00", status: "paid", period: "Mar 2026" },
  { id: "INV-0131", date: "Mar 1, 2026", amount: "$240.00", status: "paid", period: "Feb 2026" },
  { id: "INV-0120", date: "Feb 1, 2026", amount: "$192.00", status: "paid", period: "Jan 2026" },
  { id: "INV-0109", date: "Jan 1, 2026", amount: "$192.00", status: "paid", period: "Dec 2025" },
  { id: "INV-0098", date: "Dec 1, 2025", amount: "$144.00", status: "paid", period: "Nov 2025" },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <Card className={cn("flex flex-col", plan.recommended && "border-accent ring-1 ring-accent/20")}>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg">{plan.name}</CardTitle>
          {plan.current && <Badge variant="default">Current</Badge>}
          {!plan.current && plan.recommended && (
            <Badge variant="secondary" size="sm">
              Recommended
            </Badge>
          )}
        </div>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-3">
          <span className="text-3xl font-bold tracking-tight text-fg-primary">{plan.price}</span>
          <span className="text-sm text-fg-muted ml-1.5">/ {plan.period}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-fg-secondary">
              <Check className="size-4 text-accent shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {plan.current ? (
          <Button variant="outline" className="w-full">
            Manage plan
          </Button>
        ) : plan.name === "Enterprise" ? (
          <Button variant="outline" className="w-full">
            Contact sales
          </Button>
        ) : (
          <Button className="w-full">Upgrade</Button>
        )}
      </CardFooter>
    </Card>
  );
}

function StatusBadge({ status }: { status: Invoice["status"] }) {
  if (status === "paid") {
    return (
      <Badge variant="default" size="sm">
        Paid
      </Badge>
    );
  }
  if (status === "pending") {
    return (
      <Badge variant="secondary" size="sm">
        Pending
      </Badge>
    );
  }
  return (
    <Badge variant="outline" size="sm">
      Failed
    </Badge>
  );
}

export default function BillingPlans() {
  return (
    <div className="min-h-screen bg-surface-base p-[var(--ds-space-section-x)]">
      <div className="mx-auto max-w-6xl space-y-[var(--ds-space-stack)]">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-fg-primary">Billing</h1>
          <p className="text-sm text-fg-muted">Manage your subscription, payment methods, and invoices.</p>
        </header>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-[var(--ds-space-gap)]">
              <div>
                <CardTitle className="text-base">Payment method</CardTitle>
                <CardDescription>Visa ending in 4242 · expires 08/27</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <CreditCard />
                Update
              </Button>
            </div>
          </CardHeader>
        </Card>

        <section className="space-y-4">
          <div>
            <h2 className="text-base font-semibold text-fg-primary">Plans</h2>
            <p className="text-sm text-fg-muted">Upgrade or downgrade at any time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--ds-space-gap)]">
            {PLANS.map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-base font-semibold text-fg-primary flex items-center gap-2">
                <Receipt className="size-4 text-fg-muted" />
                Invoices
              </h2>
              <p className="text-sm text-fg-muted">Download past invoices and receipts.</p>
            </div>
            <Button variant="ghost" size="sm">
              <ExternalLink />
              Billing portal
            </Button>
          </div>
          <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-16" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {INVOICES.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono text-xs text-fg-primary">{inv.id}</TableCell>
                    <TableCell className="text-sm text-fg-secondary">{inv.date}</TableCell>
                    <TableCell className="text-sm text-fg-muted">{inv.period}</TableCell>
                    <TableCell className="text-sm font-medium text-fg-primary">{inv.amount}</TableCell>
                    <TableCell>
                      <StatusBadge status={inv.status} />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon-sm" aria-label="Download invoice">
                        <Download />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  );
}

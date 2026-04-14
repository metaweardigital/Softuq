"use client";

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from "@designystem/react";
import { ArrowDownRight, ArrowUpRight, DollarSign, MoreHorizontal, Plus, Users, Wallet, Zap } from "lucide-react";

type Stat = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
};

const STATS: Stat[] = [
  { label: "Revenue", value: "$48,210", delta: "+12.4%", trend: "up", icon: DollarSign },
  { label: "Active users", value: "2,847", delta: "+4.1%", trend: "up", icon: Users },
  { label: "Conversion", value: "3.62%", delta: "-0.8%", trend: "down", icon: Zap },
  { label: "Avg. deal", value: "$1,240", delta: "+2.2%", trend: "up", icon: Wallet },
];

type Activity = {
  name: string;
  initials: string;
  action: string;
  target: string;
  time: string;
};

const REVENUE_WEEKS = [
  { label: "w1", height: 32 },
  { label: "w2", height: 48 },
  { label: "w3", height: 40 },
  { label: "w4", height: 64 },
  { label: "w5", height: 52 },
  { label: "w6", height: 72 },
  { label: "w7", height: 60 },
  { label: "w8", height: 84 },
  { label: "w9", height: 70 },
  { label: "w10", height: 96 },
  { label: "w11", height: 88 },
  { label: "w12", height: 112 },
];

const ACTIVITY: Activity[] = [
  { name: "Ava Pollard", initials: "AP", action: "created", target: "Project Aurora", time: "2m ago" },
  { name: "Noah Chen", initials: "NC", action: "commented on", target: "Q2 roadmap", time: "14m ago" },
  { name: "Leo Marín", initials: "LM", action: "invited", target: "3 teammates", time: "1h ago" },
  { name: "Ivy Okafor", initials: "IO", action: "closed deal", target: "Acme Corp", time: "3h ago" },
  { name: "Jun Park", initials: "JP", action: "shipped", target: "v1.4.0", time: "yesterday" },
];

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;
  const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardDescription>{stat.label}</CardDescription>
          <div className="size-8 rounded-[var(--ds-radius-checkbox)] bg-surface-elevated border border-edge-subtle flex items-center justify-center text-fg-muted">
            <Icon className="size-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight text-fg-primary">{stat.value}</div>
        <div
          className={`mt-1 inline-flex items-center gap-1 text-xs ${stat.trend === "up" ? "text-success" : "text-destructive"}`}
        >
          <TrendIcon className="size-3" />
          {stat.delta}
          <span className="text-fg-muted">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard01() {
  return (
    <div className="min-h-screen bg-surface-base p-[var(--ds-space-app-page-x)]">
      <div className="mx-auto max-w-6xl space-y-[var(--ds-space-app-stack)]">
        <header className="flex items-start justify-between gap-[var(--ds-space-app-gap)]">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-fg-primary">Overview</h1>
            <p className="text-sm text-fg-muted">Snapshot of your workspace for the last 30 days.</p>
          </div>
          <div className="flex items-center gap-[var(--ds-space-app-gap)]">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button size="sm">
              <Plus />
              New project
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--ds-space-app-gap)]">
          {STATS.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--ds-space-app-gap)]">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Revenue trend</CardTitle>
                  <CardDescription>Last 12 weeks</CardDescription>
                </div>
                <Badge variant="outline">Weekly</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end gap-[var(--ds-space-app-gap)]">
                {REVENUE_WEEKS.map((w, i) => (
                  <div
                    key={w.label}
                    className="flex-1 rounded-[var(--ds-radius-checkbox)]"
                    style={{
                      height: `${w.height}%`,
                      background: `color-mix(in oklch, var(--accent) ${40 + i * 4}%, transparent)`,
                    }}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-xs text-fg-muted">Updated 5 minutes ago</CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Activity</CardTitle>
                  <CardDescription>Recent team events</CardDescription>
                </div>
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontal />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-[var(--ds-space-app-gap)]">
              {ACTIVITY.map((a, i) => (
                <div key={a.name}>
                  <div className="flex items-start gap-[var(--ds-space-app-gap)]">
                    <Avatar size="sm" fallback={a.initials} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-fg-primary">
                        <span className="font-medium">{a.name}</span> <span className="text-fg-muted">{a.action}</span>{" "}
                        <span className="font-medium">{a.target}</span>
                      </p>
                      <p className="text-xs text-fg-muted mt-0.5">{a.time}</p>
                    </div>
                  </div>
                  {i < ACTIVITY.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

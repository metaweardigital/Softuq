"use client";

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Progress,
} from "@designystem/react";
import { Archive, CheckCircle2, Clock, Copy, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react";
import * as React from "react";

type Status = "active" | "on-hold" | "completed";

type Project = {
  id: string;
  name: string;
  description: string;
  status: Status;
  progress: number;
  due: string;
  members: string[];
  tasks: { done: number; total: number };
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Platform rewrite",
    description: "Migrate legacy monolith to modular services",
    status: "active",
    progress: 72,
    due: "May 20",
    members: ["AP", "NC", "LM"],
    tasks: { done: 36, total: 50 },
  },
  {
    id: "p2",
    name: "Design system v2",
    description: "Ship tokens, components, and a CLI",
    status: "active",
    progress: 54,
    due: "Jun 2",
    members: ["NC", "IO"],
    tasks: { done: 27, total: 50 },
  },
  {
    id: "p3",
    name: "Billing overhaul",
    description: "Usage-based pricing + dunning flows",
    status: "on-hold",
    progress: 18,
    due: "Jul 15",
    members: ["LM", "JP", "MV"],
    tasks: { done: 5, total: 28 },
  },
  {
    id: "p4",
    name: "Analytics dashboard",
    description: "Real-time metrics with custom cohorts",
    status: "active",
    progress: 88,
    due: "Apr 30",
    members: ["AP", "JP"],
    tasks: { done: 44, total: 50 },
  },
  {
    id: "p5",
    name: "Onboarding redesign",
    description: "Reduce time-to-first-value to under 5 minutes",
    status: "completed",
    progress: 100,
    due: "Apr 1",
    members: ["IO", "MV"],
    tasks: { done: 32, total: 32 },
  },
  {
    id: "p6",
    name: "Mobile app MVP",
    description: "iOS and Android with offline-first sync",
    status: "on-hold",
    progress: 8,
    due: "Aug 30",
    members: ["NC", "JP"],
    tasks: { done: 3, total: 40 },
  },
];

const STATUS_LABELS: Record<Status, string> = {
  active: "Active",
  "on-hold": "On hold",
  completed: "Completed",
};

function StatusBadge({ status }: { status: Status }) {
  if (status === "active") {
    return (
      <Badge variant="default" size="sm" className="gap-1">
        <CheckCircle2 className="size-3" />
        {STATUS_LABELS[status]}
      </Badge>
    );
  }
  if (status === "on-hold") {
    return (
      <Badge variant="outline" size="sm" className="gap-1">
        <Clock className="size-3" />
        {STATUS_LABELS[status]}
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" size="sm" className="gap-1">
      <CheckCircle2 className="size-3" />
      {STATUS_LABELS[status]}
    </Badge>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-[var(--ds-space-gap)]">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-text-primary truncate">{project.name}</h3>
            <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{project.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Project actions">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <StatusBadge status={project.status} />
        <div>
          <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} />
        </div>
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>
            {project.tasks.done} / {project.tasks.total} tasks
          </span>
          <span>Due {project.due}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border-subtle">
        <div className="flex -space-x-2">
          {project.members.map((m) => (
            <Avatar key={m} size="sm" fallback={m} className="border-2 border-bg-card" />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

type Filter = "all" | Status;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "on-hold", label: "On hold" },
  { value: "completed", label: "Completed" },
];

export default function ProjectsGrid() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-bg-base p-[var(--ds-space-section-x)]">
      <div className="mx-auto max-w-6xl space-y-[var(--ds-space-stack)]">
        <header className="flex items-start justify-between gap-[var(--ds-space-gap)]">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary">Projects</h1>
            <p className="text-sm text-text-muted">{PROJECTS.length} projects across the workspace.</p>
          </div>
          <Button size="sm">
            <Plus />
            New project
          </Button>
        </header>

        <div className="flex items-center gap-[var(--ds-space-gap)] flex-wrap">
          <div className="relative w-full sm:w-64">
            <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-text-dimmed pointer-events-none" />
            <Input placeholder="Search projects..." className="h-9 pl-8 text-sm" />
          </div>
          <div className="flex items-center gap-1 ml-auto">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={cn(
                  "px-3 h-8 inline-flex items-center rounded-[var(--ds-radius-button)] text-xs transition-colors",
                  filter === f.value
                    ? "bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-accent-text"
                    : "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--ds-space-gap)]">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

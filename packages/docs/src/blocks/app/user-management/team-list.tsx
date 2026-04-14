"use client";

import {
  Avatar,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@designystem/react";
import { Mail, MoreHorizontal, Search, Shield, Trash2, UserPlus } from "lucide-react";

type Role = "owner" | "admin" | "member" | "billing";
type Status = "active" | "pending";

type Member = {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: Role;
  status: Status;
  lastActive: string;
};

const MEMBERS: Member[] = [
  {
    id: "u1",
    name: "Ava Pollard",
    initials: "AP",
    email: "ava@acme.co",
    role: "owner",
    status: "active",
    lastActive: "just now",
  },
  {
    id: "u2",
    name: "Noah Chen",
    initials: "NC",
    email: "noah@acme.co",
    role: "admin",
    status: "active",
    lastActive: "2m ago",
  },
  {
    id: "u3",
    name: "Leo Marín",
    initials: "LM",
    email: "leo@acme.co",
    role: "member",
    status: "active",
    lastActive: "1h ago",
  },
  {
    id: "u4",
    name: "Ivy Okafor",
    initials: "IO",
    email: "ivy@acme.co",
    role: "member",
    status: "active",
    lastActive: "3h ago",
  },
  {
    id: "u5",
    name: "Jun Park",
    initials: "JP",
    email: "jun@acme.co",
    role: "billing",
    status: "active",
    lastActive: "yesterday",
  },
  {
    id: "u6",
    name: "Mira Velez",
    initials: "MV",
    email: "mira@acme.co",
    role: "member",
    status: "pending",
    lastActive: "—",
  },
  {
    id: "u7",
    name: "Sam Rivera",
    initials: "SR",
    email: "sam@acme.co",
    role: "member",
    status: "pending",
    lastActive: "—",
  },
];

const ROLE_LABELS: Record<Role, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
  billing: "Billing",
};

function RoleBadge({ role }: { role: Role }) {
  if (role === "owner") {
    return (
      <Badge variant="default" size="sm" className="gap-1">
        <Shield className="size-3" />
        {ROLE_LABELS[role]}
      </Badge>
    );
  }
  if (role === "admin") {
    return (
      <Badge variant="secondary" size="sm">
        {ROLE_LABELS[role]}
      </Badge>
    );
  }
  return (
    <Badge variant="outline" size="sm">
      {ROLE_LABELS[role]}
    </Badge>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return status === "active" ? (
    <span className="inline-flex items-center gap-1.5 text-xs text-success">
      <span className="size-1.5 rounded-full bg-success" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
      <span className="size-1.5 rounded-full bg-fg-dimmed" />
      Pending invite
    </span>
  );
}

export default function TeamList() {
  return (
    <div className="min-h-screen bg-surface-base p-[var(--ds-space-section-x)]">
      <div className="mx-auto max-w-6xl space-y-[var(--ds-space-stack)]">
        <header className="flex items-start justify-between gap-[var(--ds-space-gap)]">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-fg-primary">Team</h1>
            <p className="text-sm text-fg-muted">
              {MEMBERS.filter((m) => m.status === "active").length} active ·{" "}
              {MEMBERS.filter((m) => m.status === "pending").length} pending
            </p>
          </div>
          <Button size="sm">
            <UserPlus />
            Invite member
          </Button>
        </header>

        <div className="flex items-center gap-[var(--ds-space-gap)]">
          <div className="relative w-full sm:w-64">
            <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-fg-dimmed pointer-events-none" />
            <Input placeholder="Search by name or email..." className="h-9 pl-8 text-sm" />
          </div>
        </div>

        <div className="rounded-[var(--ds-radius-card)] border border-edge-subtle bg-surface-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead className="w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {MEMBERS.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" fallback={m.initials} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-fg-primary truncate">{m.name}</p>
                        <p className="text-xs text-fg-muted truncate">{m.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RoleBadge role={m.role} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={m.status} />
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-fg-muted">{m.lastActive}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label="Member actions">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail />
                          Send email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield />
                          Change role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

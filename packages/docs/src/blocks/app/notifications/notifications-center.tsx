"use client";

import { Avatar, Badge, Button, cn, Separator, Tabs, TabsContent, TabsList, TabsTrigger } from "@designystem/react";
import { AtSign, Bell, CheckCheck, CreditCard, GitPullRequest, MessageSquare, Settings, UserPlus } from "lucide-react";

type NotifType = "mention" | "comment" | "invite" | "release" | "billing";

type Notification = {
  id: string;
  type: NotifType;
  actor: string;
  initials: string;
  title: string;
  preview: string;
  time: string;
  unread?: boolean;
};

const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "mention",
    actor: "Ava Pollard",
    initials: "AP",
    title: "mentioned you in Q2 roadmap",
    preview: "@you — can you confirm the platform rewrite timeline?",
    time: "2m ago",
    unread: true,
  },
  {
    id: "n2",
    type: "comment",
    actor: "Noah Chen",
    initials: "NC",
    title: "commented on Design tokens PR",
    preview: "Looks great! One small nit on the spacing scale — wdyt about 4px base?",
    time: "14m ago",
    unread: true,
  },
  {
    id: "n3",
    type: "invite",
    actor: "Leo Marín",
    initials: "LM",
    title: "invited 3 people to Acme workspace",
    preview: "sam@acme.co, mira@acme.co, kai@acme.co",
    time: "1h ago",
    unread: true,
  },
  {
    id: "n4",
    type: "release",
    actor: "Jun Park",
    initials: "JP",
    title: "shipped v1.4.0",
    preview: "New billing flow, improved search, dark mode fixes.",
    time: "3h ago",
  },
  {
    id: "n5",
    type: "billing",
    actor: "System",
    initials: "SY",
    title: "Invoice paid",
    preview: "Pro plan — $240 charged to Visa ending 4242.",
    time: "yesterday",
  },
  {
    id: "n6",
    type: "mention",
    actor: "Ivy Okafor",
    initials: "IO",
    title: "mentioned you in Weekly ops digest",
    preview: "@you — can you review the EU incident report?",
    time: "2d ago",
  },
  {
    id: "n7",
    type: "comment",
    actor: "Mira Velez",
    initials: "MV",
    title: "replied to Recruiting pipeline update",
    preview: "Thanks for the update! Moving Sam and Kai to offer.",
    time: "3d ago",
  },
];

const TYPE_ICON: Record<NotifType, React.ComponentType<{ className?: string }>> = {
  mention: AtSign,
  comment: MessageSquare,
  invite: UserPlus,
  release: GitPullRequest,
  billing: CreditCard,
};

function NotificationRow({ n }: { n: Notification }) {
  const Icon = TYPE_ICON[n.type];
  return (
    <div
      className={cn(
        "px-4 py-3 flex items-start gap-3 transition-colors",
        n.unread ? "bg-[color-mix(in_oklch,var(--accent)_6%,transparent)]" : "hover:bg-bg-hover",
      )}
    >
      <div className="relative shrink-0">
        <Avatar size="sm" fallback={n.initials} />
        <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-bg-card border border-border-subtle flex items-center justify-center text-text-muted">
          <Icon className="size-3" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-text-primary">
          <span className="font-medium">{n.actor}</span> <span className="text-text-muted">{n.title}</span>
        </p>
        <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{n.preview}</p>
        <p className="text-[11px] text-text-dimmed mt-1">{n.time}</p>
      </div>
      {n.unread && <span className="size-2 rounded-full bg-accent mt-1.5 shrink-0" aria-hidden="true" />}
    </div>
  );
}

function NotificationList({ items }: { items: Notification[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-[var(--ds-radius-card)] border border-dashed border-border-subtle bg-bg-card px-6 py-12 text-center">
        <Bell className="size-6 mx-auto text-text-dimmed" />
        <p className="text-sm text-text-muted mt-3">You're all caught up.</p>
      </div>
    );
  }
  return (
    <div className="rounded-[var(--ds-radius-card)] border border-border-subtle bg-bg-card overflow-hidden">
      {items.map((n, i) => (
        <div key={n.id}>
          <NotificationRow n={n} />
          {i < items.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}

export default function NotificationsCenter() {
  const unread = NOTIFICATIONS.filter((n) => n.unread);
  const mentions = NOTIFICATIONS.filter((n) => n.type === "mention");

  return (
    <div className="min-h-screen bg-bg-base p-[var(--ds-space-section-x)]">
      <div className="mx-auto max-w-6xl space-y-[var(--ds-space-stack)]">
        <header className="flex items-start justify-between gap-[var(--ds-space-gap)]">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary">Notifications</h1>
            <p className="text-sm text-text-muted">
              {unread.length > 0 ? `${unread.length} unread` : "You're all caught up."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <CheckCheck />
              Mark all read
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Notification settings">
              <Settings />
            </Button>
          </div>
        </header>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" size="sm" className="ml-2">
                {NOTIFICATIONS.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unread.length > 0 && (
                <Badge variant="default" size="sm" className="ml-2">
                  {unread.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="mentions">
              Mentions
              <Badge variant="secondary" size="sm" className="ml-2">
                {mentions.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <NotificationList items={NOTIFICATIONS} />
          </TabsContent>
          <TabsContent value="unread">
            <NotificationList items={unread} />
          </TabsContent>
          <TabsContent value="mentions">
            <NotificationList items={mentions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

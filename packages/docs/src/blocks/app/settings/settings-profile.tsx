"use client";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormField,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Separator,
  Textarea,
  Toggle,
} from "@designystem/react";
import { Upload } from "lucide-react";
import * as React from "react";

export default function Settings01() {
  const [emailNotif, setEmailNotif] = React.useState(true);
  const [marketing, setMarketing] = React.useState(false);
  return (
    <div className="min-h-screen bg-bg-base p-[var(--ds-space-section-x)]">
      <div className="mx-auto max-w-6xl space-y-[var(--ds-space-stack)]">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">Settings</h1>
          <p className="text-sm text-text-muted">Manage your account, preferences, and billing.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information and avatar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-[var(--ds-space-gap)]">
            <div className="flex items-center gap-[var(--ds-space-gap)]">
              <Avatar size="lg" fallback="AP" />
              <Button variant="outline" size="sm">
                <Upload />
                Upload new
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--ds-space-gap)]">
              <FormField>
                <Label>Full name</Label>
                <Input defaultValue="Ava Pollard" />
              </FormField>
              <FormField>
                <Label>Email</Label>
                <Input type="email" defaultValue="ava@example.com" />
              </FormField>
            </div>
            <FormField>
              <Label>Bio</Label>
              <Textarea rows={3} defaultValue="Product designer crafting tools people love." />
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Choose how DesignYstem looks and behaves.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-[var(--ds-space-gap)]">
            <FormField>
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger />
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="cs">Čeština</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <Separator />
            <div className="flex items-start justify-between gap-[var(--ds-space-gap)]">
              <div>
                <p className="text-sm font-medium text-text-primary">Email notifications</p>
                <p className="text-xs text-text-muted">Receive product updates and tips.</p>
              </div>
              <Toggle checked={emailNotif} onCheckedChange={setEmailNotif} />
            </div>
            <div className="flex items-start justify-between gap-[var(--ds-space-gap)]">
              <div>
                <p className="text-sm font-medium text-text-primary">Marketing emails</p>
                <p className="text-xs text-text-muted">Occasional news and offers.</p>
              </div>
              <Toggle checked={marketing} onCheckedChange={setMarketing} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive-border">
          <CardHeader>
            <CardTitle className="text-destructive-text">Danger zone</CardTitle>
            <CardDescription>Irreversible actions. Proceed with care.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-[var(--ds-space-gap)]">
              <div>
                <p className="text-sm font-medium text-text-primary">Delete account</p>
                <p className="text-xs text-text-muted">Remove your account and all associated data.</p>
              </div>
              <Button variant="destructive" size="sm">
                Delete account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { Button, Empty, EmptyActions, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle } from "@designystem/react";
import { FolderPlus, Plus } from "lucide-react";

export default function Empty01() {
  return (
    <div className="min-h-screen bg-bg-base p-[var(--ds-space-section-x)]">
      <div className="mx-auto max-w-3xl space-y-[var(--ds-space-stack)]">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">Projects</h1>
          <p className="text-sm text-text-muted">Organize work into projects to keep things focused.</p>
        </header>

        <Empty>
          <EmptyIcon>
            <FolderPlus />
          </EmptyIcon>
          <EmptyContent>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>
              Create your first project to start grouping tasks, files, and teammates in one place.
            </EmptyDescription>
          </EmptyContent>
          <EmptyActions>
            <Button size="sm">
              <Plus />
              New project
            </Button>
            <Button variant="outline" size="sm">
              Import from template
            </Button>
          </EmptyActions>
        </Empty>
      </div>
    </div>
  );
}

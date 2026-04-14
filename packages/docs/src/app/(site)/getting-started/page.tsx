"use client";

import { Code, CodeBlock } from "@designystem/react";

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-fg-inverse text-sm font-bold shrink-0">
          {n}
        </div>
        <div className="w-px flex-1 bg-edge-subtle mt-2" />
      </div>
      <div className="pb-10 min-w-0">
        <h3 className="text-lg font-semibold text-fg-primary mb-3">{title}</h3>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

export default function GettingStartedPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-fg-primary tracking-tight">Getting Started</h1>
      <p className="text-fg-secondary mt-2 text-lg">Add DesignYstem to your project in 2 minutes.</p>

      <div className="mt-10">
        <Step n={1} title="Initialize">
          <p className="text-fg-secondary">
            Run this in your project root. Works with Next.js, Vite, or any React project.
          </p>
          <CodeBlock title="terminal">{`npx designystem init`}</CodeBlock>
          <p className="text-fg-muted text-sm">
            This copies design tokens, Tailwind theme, <Code>cn()</Code> utility, and the theme provider into your
            project. It also installs <Code>clsx</Code> and <Code>tailwind-merge</Code>.
          </p>
        </Step>

        <Step n={2} title="Add components">
          <p className="text-fg-secondary">Pick the components you need.</p>
          <CodeBlock title="terminal">
            {`# Add specific components
npx designystem add button card input

# Or add everything
npx designystem add --all

# See what's available
npx designystem list`}
          </CodeBlock>
          <p className="text-fg-muted text-sm">
            Dependencies are resolved automatically — e.g. adding <Code>select</Code> also adds <Code>tag</Code> since
            it depends on it.
          </p>
        </Step>

        <Step n={3} title="Wrap with provider">
          <p className="text-fg-secondary">
            Add <Code>DesignYstemProvider</Code> to your layout and set <Code>data-theme</Code> on{" "}
            <Code>{"<html>"}</Code>.
          </p>
          <CodeBlock title="layout.tsx">
            {`import { DesignYstemProvider } from "@/components/designystem-provider";
import "./globals.css";

export default function Layout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <DesignYstemProvider
          accent="violet"
          radius="lg"
          spacing="md"
          font="system"
        >
          {children}
        </DesignYstemProvider>
      </body>
    </html>
  );
}`}
          </CodeBlock>
        </Step>

        <Step n={4} title="Use components">
          <p className="text-fg-secondary">Import and use.</p>
          <CodeBlock title="page.tsx">
            {`import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <Button className="w-full">Continue</Button>
      </CardContent>
    </Card>
  );
}`}
          </CodeBlock>
        </Step>
      </div>

      <div className="border-t border-edge-subtle pt-8 mt-4 space-y-6">
        <h2 className="text-xl font-semibold text-fg-primary">Updating</h2>
        <p className="text-fg-secondary">When components get updated upstream, check what changed and pull updates.</p>
        <CodeBlock title="terminal">
          {`# See which components have upstream changes
npx designystem diff

# Update all changed components
npx designystem update

# Update specific components
npx designystem update button card`}
        </CodeBlock>
        <p className="text-fg-muted text-sm">
          Components are your code — if you've modified a component locally, review the diff before updating.
        </p>
      </div>

      <div className="border-t border-edge-subtle pt-8 mt-8 space-y-6">
        <h2 className="text-xl font-semibold text-fg-primary">Theming</h2>
        <p className="text-fg-secondary">
          Everything is customizable via the provider. No build step needed — just change props.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-fg-primary mb-1">Accent</p>
            <p className="text-fg-muted flex flex-wrap gap-1">
              {["blue", "violet", "emerald", "amber", "red", "rose", "cyan", "orange"].map((v) => (
                <Code key={v}>{v}</Code>
              ))}
            </p>
          </div>
          <div>
            <p className="font-medium text-fg-primary mb-1">Palette</p>
            <p className="text-fg-muted flex flex-wrap gap-1">
              {["neutral", "zinc", "stone", "slate", "mauve", "olive"].map((v) => (
                <Code key={v}>{v}</Code>
              ))}
            </p>
          </div>
          <div>
            <p className="font-medium text-fg-primary mb-1">Radius</p>
            <p className="text-fg-muted flex flex-wrap gap-1">
              {["none", "sm", "md", "lg", "full"].map((v) => (
                <Code key={v}>{v}</Code>
              ))}
            </p>
          </div>
          <div>
            <p className="font-medium text-fg-primary mb-1">Spacing</p>
            <p className="text-fg-muted flex flex-wrap gap-1">
              {["sm", "md", "lg"].map((v) => (
                <Code key={v}>{v}</Code>
              ))}
            </p>
          </div>
          <div>
            <p className="font-medium text-fg-primary mb-1">Font</p>
            <p className="text-fg-muted flex flex-wrap gap-1">
              {["system", "inter", "geist"].map((v) => (
                <Code key={v}>{v}</Code>
              ))}
            </p>
          </div>
          <div>
            <p className="font-medium text-fg-primary mb-1">Mode</p>
            <p className="text-fg-muted flex flex-wrap gap-1">
              <Code>data-theme=&quot;dark&quot;</Code>
              <Code>data-theme=&quot;light&quot;</Code>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-edge-subtle pt-8 mt-8 space-y-6">
        <h2 className="text-xl font-semibold text-fg-primary">Available components</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "accordion",
            "alert",
            "avatar",
            "badge",
            "breadcrumb",
            "button",
            "card",
            "checkbox",
            "code",
            "dialog",
            "dropdown-menu",
            "empty",
            "form-text",
            "input",
            "kbd",
            "label",
            "pagination",
            "popover",
            "progress",
            "radio",
            "search",
            "select",
            "separator",
            "sheet",
            "skeleton",
            "slider",
            "spinner",
            "squircle",
            "table",
            "tabs",
            "tag",
            "textarea",
            "toast",
            "toggle",
            "toggle-group",
            "tooltip",
          ].map((c) => (
            <Code key={c}>{c}</Code>
          ))}
        </div>
      </div>

      <div className="border-t border-edge-subtle pt-8 mt-8 text-sm text-fg-muted">
        <p>
          Components are copied into your project — you own the code. Edit anything. No runtime dependency, no lock-in.
        </p>
      </div>
    </>
  );
}

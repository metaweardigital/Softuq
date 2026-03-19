"use client";

import { DesignYstemProvider } from "@designystem/react";

function Code({ children }: { children: string }) {
  return (
    <code className="text-[13px] text-accent" style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}>
      {children}
    </code>
  );
}

function highlightCode(code: string): string {
  return (
    code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // Comments
      .replace(/(\/\/.*$|#.*$)/gm, '<span style="color:var(--text-dimmed)">$1</span>')
      // Strings
      .replace(
        /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
        '<span style="color:var(--success)">$1</span>',
      )
      // Keywords
      .replace(
        /\b(import|export|from|const|let|var|function|return|default|if|else)\b/g,
        '<span style="color:var(--accent)">$1</span>',
      )
      // JSX tags
      .replace(/(&lt;\/?)([\w.]+)/g, '$1<span style="color:var(--destructive)">$2</span>')
      // Attributes
      .replace(
        /\s(className|lang|data-theme|accent|radius|spacing|font|type|placeholder)=/g,
        ' <span style="color:var(--warning)">$1</span>=',
      )
      // npx/commands
      .replace(/\b(npx)\b/g, '<span style="color:var(--accent)">$1</span>')
  );
}

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="rounded-lg border border-border-subtle overflow-hidden max-w-full">
      {title && (
        <div className="px-4 py-2 bg-bg-elevated border-b border-border-subtle text-xs text-text-muted font-mono">
          {title}
        </div>
      )}
      <pre
        className="p-4 bg-bg-card overflow-x-auto text-xs text-text-secondary leading-relaxed"
        style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
        dangerouslySetInnerHTML={{ __html: highlightCode(children) }}
      />
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-text-inverse text-sm font-bold shrink-0">
          {n}
        </div>
        <div className="w-px flex-1 bg-border-subtle mt-2" />
      </div>
      <div className="pb-10 min-w-0">
        <h3 className="text-lg font-semibold text-text-primary mb-3">{title}</h3>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

export default function GettingStartedPage() {
  return (
    <DesignYstemProvider>
      <div className="min-h-screen bg-bg-base">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <a href="/" className="text-sm text-text-muted hover:text-accent transition-colors">
            ← Back to preview
          </a>

          <h1 className="text-3xl font-bold text-text-primary mt-8">Getting Started</h1>
          <p className="text-text-secondary mt-3 text-lg">Add DesignYstem to your project in 2 minutes.</p>

          <div className="mt-12">
            <Step n={1} title="Initialize">
              <p className="text-text-secondary">
                Run this in your project root. Works with Next.js, Vite, or any React project.
              </p>
              <CodeBlock title="terminal">{`npx designystem init`}</CodeBlock>
              <p className="text-text-muted text-sm">
                This copies design tokens, Tailwind theme, <Code>cn()</Code> utility, and the theme provider into your
                project. It also installs <Code>clsx</Code> and <Code>tailwind-merge</Code>.
              </p>
            </Step>

            <Step n={2} title="Add components">
              <p className="text-text-secondary">Pick the components you need.</p>
              <CodeBlock title="terminal">
                {`# Add specific components
npx designystem add button card input

# Or add everything
npx designystem add --all

# See what's available
npx designystem list`}
              </CodeBlock>
              <p className="text-text-muted text-sm">
                Dependencies are resolved automatically — e.g. adding <Code>select</Code> also adds <Code>tag</Code>{" "}
                since it depends on it.
              </p>
            </Step>

            <Step n={3} title="Wrap with provider">
              <p className="text-text-secondary">
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
              <p className="text-text-secondary">Import and use.</p>
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

          <div className="border-t border-border-subtle pt-8 mt-4 space-y-6">
            <h2 className="text-xl font-semibold text-text-primary">Updating</h2>
            <p className="text-text-secondary">
              When components get updated upstream, check what changed and pull updates.
            </p>
            <CodeBlock title="terminal">
              {`# See which components have upstream changes
npx designystem diff

# Update all changed components
npx designystem update

# Update specific components
npx designystem update button card`}
            </CodeBlock>
            <p className="text-text-muted text-sm">
              Components are your code — if you've modified a component locally, review the diff before updating.
            </p>
          </div>

          <div className="border-t border-border-subtle pt-8 mt-8 space-y-6">
            <h2 className="text-xl font-semibold text-text-primary">Theming</h2>
            <p className="text-text-secondary">
              Everything is customizable via the provider. No build step needed — just change props.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-text-primary mb-1">Accent</p>
                <p className="text-text-muted">blue, violet, emerald, amber, red, rose, cyan, orange</p>
              </div>
              <div>
                <p className="font-medium text-text-primary mb-1">Palette</p>
                <p className="text-text-muted">neutral, zinc, stone, slate, mauve, olive</p>
              </div>
              <div>
                <p className="font-medium text-text-primary mb-1">Radius</p>
                <p className="text-text-muted">none, sm, md, lg, full</p>
              </div>
              <div>
                <p className="font-medium text-text-primary mb-1">Spacing</p>
                <p className="text-text-muted">sm, md, lg</p>
              </div>
              <div>
                <p className="font-medium text-text-primary mb-1">Font</p>
                <p className="text-text-muted">system, inter, geist</p>
              </div>
              <div>
                <p className="font-medium text-text-primary mb-1">Mode</p>
                <p className="text-text-muted">data-theme="dark" / "light"</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border-subtle pt-8 mt-8 space-y-6">
            <h2 className="text-xl font-semibold text-text-primary">Available components</h2>
            <div className="grid grid-cols-3 gap-2 text-sm text-text-secondary">
              {[
                "accordion",
                "alert",
                "avatar",
                "badge",
                "button",
                "card",
                "checkbox",
                "dialog",
                "form-text",
                "input",
                "label",
                "progress",
                "radio",
                "select",
                "separator",
                "sheet",
                "skeleton",
                "squircle",
                "tabs",
                "tag",
                "textarea",
                "toast",
                "toggle",
                "tooltip",
              ].map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border-subtle pt-8 mt-8 text-sm text-text-muted">
            <p>
              Components are copied into your project — you own the code. Edit anything. No runtime dependency, no
              lock-in.
            </p>
          </div>
        </div>
      </div>
    </DesignYstemProvider>
  );
}

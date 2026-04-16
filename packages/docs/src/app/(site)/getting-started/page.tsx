"use client";

import { Code, CodeBlock } from "@softuq/react";

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
      <p className="text-fg-secondary mt-2 text-lg">Scaffold Softuq into a fresh Next.js or Vite app in one command.</p>

      <div className="mt-8 p-4 rounded-[var(--ds-radius-card)] border border-edge-subtle bg-bg-card">
        <p className="font-medium text-fg-primary mb-2 text-sm">Prerequisites</p>
        <ul className="text-sm text-fg-secondary space-y-1 list-disc pl-5">
          <li>Node.js 20 or newer</li>
          <li>
            A React project — <Code>create-next-app</Code> (App Router) or <Code>npm create vite@latest</Code>{" "}
            (react-ts)
          </li>
          <li>
            <Code>tailwindcss@4</Code> installed — in Vite you&rsquo;ll also need <Code>@tailwindcss/vite</Code> wired
            into <Code>vite.config.ts</Code>
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <Step n={1} title="Initialize">
          <p className="text-fg-secondary">
            One command sets up everything: tokens, provider, <Code>@</Code> alias, fonts, and a live starter page.
          </p>
          <CodeBlock title="terminal">{`npx softuq init`}</CodeBlock>
          <p className="text-fg-muted text-sm leading-relaxed">What init does:</p>
          <ul className="text-sm text-fg-secondary space-y-1 list-disc pl-5">
            <li>
              Writes <Code>softuq-tokens.css</Code>, <Code>softuq-theme.css</Code>, and (Vite only){" "}
              <Code>softuq-fonts.css</Code> next to your globals and imports them in the right order
            </li>
            <li>
              Copies <Code>cn()</Code>, token JS, <Code>SoftuqProvider</Code>, and <Code>presets.ts</Code> into{" "}
              <Code>src/lib/</Code> and <Code>src/</Code>
            </li>
            <li>
              Wires <Code>SoftuqProvider</Code> into your <Code>layout.tsx</Code> (Next) or <Code>main.tsx</Code> (Vite)
              and adds <Code>data-theme=&quot;dark&quot;</Code> to <Code>{"<html>"}</Code>
            </li>
            <li>
              Sets up fonts: <Code>next/font/google</Code> via a generated <Code>src/softuq-fonts.ts</Code> for Next.js,
              or installs <Code>@fontsource-variable/*</Code> packages and imports them in <Code>main.tsx</Code> for
              Vite
            </li>
            <li>
              For Vite: adds the <Code>@/*</Code> path alias to <Code>tsconfig.app.json</Code> and{" "}
              <Code>vite.config.ts</Code>
            </li>
            <li>
              Scaffolds a starter landing page at <Code>app/page.tsx</Code> / <Code>App.tsx</Code> with a live theme
              playground for all 6 axes (opt out with <Code>--no-starter</Code>)
            </li>
          </ul>
          <p className="text-fg-muted text-sm leading-relaxed">
            Run <Code>npm run dev</Code> and the starter renders immediately — no manual wiring.
          </p>
        </Step>

        <Step n={2} title="Add more components">
          <p className="text-fg-secondary">
            The starter pulls in <Code>button</Code>, <Code>card</Code>, <Code>form-text</Code>, <Code>label</Code>,{" "}
            <Code>select</Code>, and <Code>separator</Code> automatically. Add the rest as you need them.
          </p>
          <CodeBlock title="terminal">
            {`# Add specific components
npx softuq add dialog input tabs tooltip

# Or add everything
npx softuq add --all

# See what's available
npx softuq list`}
          </CodeBlock>
          <p className="text-fg-muted text-sm leading-relaxed">
            Dependencies resolve automatically — adding <Code>select</Code> pulls in <Code>tag</Code>, adding{" "}
            <Code>breadcrumb</Code> pulls in <Code>dropdown-menu</Code>, etc.
          </p>
        </Step>

        <Step n={3} title="Customize the provider (optional)">
          <p className="text-fg-secondary leading-relaxed">
            <Code>SoftuqProvider</Code> is already wired. Pass props to set initial theme, or call{" "}
            <Code>useSoftuq()</Code> to change it at runtime — the starter&rsquo;s playground does exactly this.
          </p>
          <CodeBlock title="layout.tsx">
            {`import { SoftuqProvider } from "@/softuq-provider";
import { softuqFontVariables } from "@/softuq-fonts";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={softuqFontVariables}>
      <body>
        <SoftuqProvider
          palette="neutral"
          accent="violet"
          radius="lg"
          spacing="md"
          font="geist"
          headingFont="fraunces"
          storageKey="softuq-settings"
        >
          {children}
        </SoftuqProvider>
      </body>
    </html>
  );
}`}
          </CodeBlock>
          <p className="text-fg-muted text-sm leading-relaxed">
            Pass <Code>storageKey</Code> to persist user choices in <Code>localStorage</Code> and sync across tabs.
          </p>
        </Step>

        <Step n={4} title="Use components">
          <p className="text-fg-secondary">Import from your own project — components live in your repo.</p>
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
        <h2 className="text-xl font-semibold text-fg-primary">Keeping components up to date</h2>
        <p className="text-fg-secondary">
          Components are your code — edit them freely. When the upstream registry changes, pull updates on your terms.
        </p>
        <CodeBlock title="terminal">
          {`# See which components have upstream changes
npx softuq diff

# Update all changed components (with confirmation)
npx softuq update

# Update specific components
npx softuq update button card`}
        </CodeBlock>
        <p className="text-fg-muted text-sm">
          <Code>diff</Code> normalizes import paths, so local <Code>@/lib/utils</Code> rewrites don&rsquo;t show as
          changes.
        </p>
      </div>

      <div className="border-t border-edge-subtle pt-8 mt-8 space-y-6">
        <h2 className="text-xl font-semibold text-fg-primary">AI coding skill</h2>
        <p className="text-fg-secondary">
          Install the Softuq skill so Claude Code (or any agent) writes UI that follows the design-system conventions —
          typography, spacing, tokens, icons, component patterns.
        </p>
        <CodeBlock title="terminal">
          {`# Project-level (.claude/skills/softuq/)
npx softuq skill

# Global (~/.claude/skills/softuq/)
npx softuq skill -g`}
        </CodeBlock>
      </div>

      <div className="border-t border-edge-subtle pt-8 mt-8 space-y-6">
        <h2 className="text-xl font-semibold text-fg-primary">Theme axes</h2>
        <p className="text-fg-secondary">
          Six axes, set via <Code>SoftuqProvider</Code> props or <Code>useSoftuq()</Code> at runtime. No build step.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-fg-primary mb-1">Palette (gray tint)</p>
            <p className="text-fg-muted flex flex-wrap gap-1">
              {["neutral", "zinc", "stone", "slate", "mauve", "olive"].map((v) => (
                <Code key={v}>{v}</Code>
              ))}
            </p>
          </div>
          <div>
            <p className="font-medium text-fg-primary mb-1">Accent (brand)</p>
            <p className="text-fg-muted flex flex-wrap gap-1">
              {["blue", "violet", "emerald", "amber", "red", "rose", "cyan", "orange"].map((v) => (
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
            <p className="font-medium text-fg-primary mb-1">Spacing (density)</p>
            <p className="text-fg-muted flex flex-wrap gap-1">
              {["sm", "md", "lg"].map((v) => (
                <Code key={v}>{v}</Code>
              ))}
            </p>
          </div>
          <div>
            <p className="font-medium text-fg-primary mb-1">Font (body)</p>
            <p className="text-fg-muted flex flex-wrap gap-1">
              {["system", "inter", "geist"].map((v) => (
                <Code key={v}>{v}</Code>
              ))}
            </p>
          </div>
          <div>
            <p className="font-medium text-fg-primary mb-1">Heading font</p>
            <p className="text-fg-muted flex flex-wrap gap-1">
              {["sans", "lora", "playfair", "fraunces"].map((v) => (
                <Code key={v}>{v}</Code>
              ))}
            </p>
          </div>
          <div className="col-span-2">
            <p className="font-medium text-fg-primary mb-1">Mode (dark / light)</p>
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
            "navigation-menu",
            "pagination",
            "placeholder",
            "popover",
            "progress",
            "radio",
            "search",
            "section-nav",
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

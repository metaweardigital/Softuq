"use client";

import React from "react";
import { Plus } from "lucide-react";
import {
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Input,
  Textarea,
  Label,
  Badge,
  Select, SelectOption,
  Toggle,
  Checkbox,
  RadioGroup, RadioGroupItem,
  Avatar,
  Separator,
  Skeleton,
  Alert, AlertTitle, AlertDescription,
  Progress,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  Tooltip,
  ToastProvider, useToast,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Sheet,
} from "@designystem/react";

/* --------------------------------------------------------- */
/* Section wrapper                                           */
/* --------------------------------------------------------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary border-b border-border-subtle pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      {label && <p className="text-xs font-medium text-text-muted uppercase tracking-wide">{label}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/* --------------------------------------------------------- */
/* Toast demo (needs context)                                */
/* --------------------------------------------------------- */
function ToastDemo() {
  const { addToast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button size="sm" variant="secondary" onClick={() => addToast({ title: "Default toast", description: "Something happened" })}>
        Default
      </Button>
      <Button size="sm" variant="secondary" onClick={() => addToast({ title: "Success!", description: "Action completed", variant: "success" })}>
        Success
      </Button>
      <Button size="sm" variant="secondary" onClick={() => addToast({ title: "Error", description: "Something went wrong", variant: "error" })}>
        Error
      </Button>
      <Button size="sm" variant="secondary" onClick={() => addToast({ title: "Warning", description: "Be careful", variant: "warning" })}>
        Warning
      </Button>
    </div>
  );
}

/* --------------------------------------------------------- */
/* Main page                                                 */
/* --------------------------------------------------------- */
export default function ComponentPreview() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const [toggleChecked, setToggleChecked] = React.useState(false);
  const [toggleChecked2, setToggleChecked2] = React.useState(true);
  const [radioValue, setRadioValue] = React.useState("option1");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(45);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-bg-base">
        {/* Header */}
        <header className="sticky top-0 z-sticky backdrop-blur-glass bg-bg-base/80 border-b border-border-subtle">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">DesignYstem</h1>
              <p className="text-sm text-text-secondary">Component Preview</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-muted">{theme}</span>
              <Toggle checked={theme === "light"} onCheckedChange={toggleTheme} size="sm" />
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-10 space-y-12">

          {/* Button */}
          <Section title="Button">
            <Row label="Variants">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="link">Link</Button>
            </Row>
            <Row label="Sizes">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </Row>
            <Row label="States">
              <Button disabled>Disabled</Button>
            </Row>
          </Section>

          {/* Card */}
          <Section title="Card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card variant="default">
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Basic card with subtle shadow</CardDescription>
                </CardHeader>
                <CardContent><p className="text-sm text-text-secondary">Card content goes here.</p></CardContent>
                <CardFooter><Button size="sm">Action</Button></CardFooter>
              </Card>
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                  <CardDescription>Neumorphic raised shadow</CardDescription>
                </CardHeader>
                <CardContent><p className="text-sm text-text-secondary">More prominent elevation.</p></CardContent>
              </Card>
              <Card variant="interactive">
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>Hover to see floating effect</CardDescription>
                </CardHeader>
                <CardContent><p className="text-sm text-text-secondary">Cursor pointer, hover elevation.</p></CardContent>
              </Card>
            </div>
          </Section>

          {/* Input & Textarea */}
          <Section title="Input & Textarea">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="space-y-2">
                <Label>Default Input</Label>
                <Input placeholder="Type something..." />
              </div>
              <div className="space-y-2">
                <Label variant="required">Required Input</Label>
                <Input placeholder="Required field" />
              </div>
              <div className="space-y-2">
                <Label>Error State</Label>
                <Input variant="error" placeholder="Invalid value" />
              </div>
              <div className="space-y-2">
                <Label>Success State</Label>
                <Input variant="success" placeholder="Looks good" />
              </div>
              <div className="space-y-2">
                <Label>Small Input</Label>
                <Input inputSize="sm" placeholder="Small size" />
              </div>
              <div className="space-y-2">
                <Label>Disabled</Label>
                <Input disabled placeholder="Disabled input" />
              </div>
            </div>
            <div className="max-w-2xl space-y-2">
              <Label>Textarea</Label>
              <Textarea placeholder="Write your message here..." />
            </div>
            <div className="max-w-2xl space-y-2">
              <Label>Textarea (Error)</Label>
              <Textarea variant="error" placeholder="Invalid content..." />
            </div>
          </Section>

          {/* Select */}
          <Section title="Select">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="space-y-2">
                <Label>Default Select</Label>
                <Select>
                  <SelectOption value="">Choose an option...</SelectOption>
                  <SelectOption value="react">React</SelectOption>
                  <SelectOption value="svelte">Svelte</SelectOption>
                  <SelectOption value="astro">Astro</SelectOption>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Small Select</Label>
                <Select selectSize="sm">
                  <SelectOption value="sm">Small size</SelectOption>
                  <SelectOption value="md">Medium</SelectOption>
                </Select>
              </div>
            </div>
          </Section>

          {/* Toggle, Checkbox, Radio */}
          <Section title="Toggle / Checkbox / Radio">
            <Row label="Toggle">
              <Toggle checked={toggleChecked} onCheckedChange={setToggleChecked} />
              <Toggle checked={toggleChecked2} onCheckedChange={setToggleChecked2} />
              <Toggle size="sm" checked={toggleChecked} onCheckedChange={setToggleChecked} />
              <Toggle disabled checked={false} onCheckedChange={() => {}} />
            </Row>
            <Row label="Checkbox">
              <div className="flex items-center gap-2">
                <Checkbox defaultChecked />
                <Label size="sm">Checked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox />
                <Label size="sm">Unchecked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox size="sm" defaultChecked />
                <Label size="sm">Small</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox disabled />
                <Label size="sm">Disabled</Label>
              </div>
            </Row>
            <Row label="Radio Group">
              <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="option1" />
                  <Label size="sm">Option 1</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="option2" />
                  <Label size="sm">Option 2</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="option3" />
                  <Label size="sm">Option 3</Label>
                </div>
              </RadioGroup>
            </Row>
          </Section>

          {/* Badge */}
          <Section title="Badge">
            <Row label="Variants">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
            </Row>
            <Row label="Sizes">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
            </Row>
          </Section>

          {/* Avatar */}
          <Section title="Avatar">
            <Row label="Sizes & Fallback">
              <Avatar size="sm" fallback="SM" />
              <Avatar size="md" fallback="MD" />
              <Avatar size="lg" fallback="LG" />
              <Avatar size="md" alt="John Doe" />
              <Avatar size="md" src="https://i.pravatar.cc/100?u=demo" alt="User" />
            </Row>
          </Section>

          {/* Separator */}
          <Section title="Separator">
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">Content above</p>
              <Separator />
              <p className="text-sm text-text-secondary">Content below</p>
            </div>
            <div className="flex items-center gap-3 h-8">
              <span className="text-sm text-text-secondary">Left</span>
              <Separator orientation="vertical" />
              <span className="text-sm text-text-secondary">Right</span>
            </div>
          </Section>

          {/* Alert */}
          <Section title="Alert">
            <div className="space-y-3 max-w-2xl">
              <Alert variant="info">
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>This is an informational alert message.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your changes have been saved successfully.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>Please review your settings before proceeding.</AlertDescription>
              </Alert>
              <Alert variant="error">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* Progress */}
          <Section title="Progress">
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-text-muted">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} size="md" />
              </div>
              <Progress value={75} size="sm" />
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => setProgress(Math.max(0, progress - 10))}>-10</Button>
                <Button size="sm" variant="ghost" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
              </div>
            </div>
          </Section>

          {/* Skeleton */}
          <Section title="Skeleton">
            <div className="flex items-center gap-4">
              <Skeleton variant="circle" className="h-12 w-12" />
              <div className="space-y-2 flex-1">
                <Skeleton variant="text" className="w-3/4" />
                <Skeleton variant="text" className="w-1/2" />
              </div>
            </div>
            <Skeleton variant="default" className="h-32 w-full max-w-md" />
          </Section>

          {/* Tabs */}
          <Section title="Tabs">
            <Row label="Default">
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Account</TabsTrigger>
                  <TabsTrigger value="tab2">Settings</TabsTrigger>
                  <TabsTrigger value="tab3">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1"><p className="text-sm text-text-secondary p-2">Account settings content.</p></TabsContent>
                <TabsContent value="tab2"><p className="text-sm text-text-secondary p-2">General settings content.</p></TabsContent>
                <TabsContent value="tab3"><p className="text-sm text-text-secondary p-2">Billing information.</p></TabsContent>
              </Tabs>
            </Row>
            <Row label="Pills">
              <Tabs defaultValue="a" variant="pills">
                <TabsList>
                  <TabsTrigger value="a">All</TabsTrigger>
                  <TabsTrigger value="b">Active</TabsTrigger>
                  <TabsTrigger value="c">Archived</TabsTrigger>
                </TabsList>
                <TabsContent value="a"><p className="text-sm text-text-secondary p-2">All items.</p></TabsContent>
                <TabsContent value="b"><p className="text-sm text-text-secondary p-2">Active items.</p></TabsContent>
                <TabsContent value="c"><p className="text-sm text-text-secondary p-2">Archived items.</p></TabsContent>
              </Tabs>
            </Row>
            <Row label="Underline">
              <Tabs defaultValue="x" variant="underline">
                <TabsList>
                  <TabsTrigger value="x">Overview</TabsTrigger>
                  <TabsTrigger value="y">Analytics</TabsTrigger>
                  <TabsTrigger value="z">Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="x"><p className="text-sm text-text-secondary p-2">Overview dashboard.</p></TabsContent>
                <TabsContent value="y"><p className="text-sm text-text-secondary p-2">Analytics data.</p></TabsContent>
                <TabsContent value="z"><p className="text-sm text-text-secondary p-2">Generated reports.</p></TabsContent>
              </Tabs>
            </Row>
          </Section>

          {/* Accordion */}
          <Section title="Accordion">
            <div className="max-w-2xl">
              <Row label="Default">
                <Accordion variant="default" className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is DesignYstem?</AccordionTrigger>
                    <AccordionContent>A modern design system with neumorphic aesthetics, built for React, Svelte, and Astro.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I install it?</AccordionTrigger>
                    <AccordionContent>Run npx designystem init to set up your project, then npx designystem add button to add components.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it customizable?</AccordionTrigger>
                    <AccordionContent>Yes! Components are copied to your project so you have full control. Tokens are CSS variables you can override.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Row>
              <Row label="Bordered">
                <Accordion variant="bordered" type="multiple" className="w-full">
                  <AccordionItem value="b1">
                    <AccordionTrigger>First item</AccordionTrigger>
                    <AccordionContent>Content for first item.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="b2">
                    <AccordionTrigger>Second item</AccordionTrigger>
                    <AccordionContent>Content for second item.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Row>
            </div>
          </Section>

          {/* Dialog */}
          <Section title="Dialog">
            <Row>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <Button variant="secondary" onClick={() => setDialogOpen(true)}>Open Dialog</Button>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>This action cannot be undone. This will permanently delete your data.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={() => setDialogOpen(false)}>Delete</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Row>
          </Section>

          {/* Sheet */}
          <Section title="Sheet / Drawer">
            <Row>
              <Button variant="secondary" onClick={() => setSheetOpen(true)}>Open Sheet (Right)</Button>
              <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} side="right" size="md">
                <h3 className="text-lg font-semibold mb-4">Sheet Title</h3>
                <p className="text-sm text-text-secondary">This is a sheet / drawer component. It slides in from the edge of the screen.</p>
                <div className="mt-6">
                  <Button onClick={() => setSheetOpen(false)}>Close</Button>
                </div>
              </Sheet>
            </Row>
          </Section>

          {/* Tooltip */}
          <Section title="Tooltip">
            <Row>
              <Tooltip content="Top tooltip" side="top">
                <Button variant="outline" size="sm">Hover me (top)</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" side="bottom">
                <Button variant="outline" size="sm">Bottom</Button>
              </Tooltip>
              <Tooltip content="Left tooltip" side="left">
                <Button variant="outline" size="sm">Left</Button>
              </Tooltip>
              <Tooltip content="Right tooltip" side="right">
                <Button variant="outline" size="sm">Right</Button>
              </Tooltip>
            </Row>
          </Section>

          {/* Toast */}
          <Section title="Toast">
            <ToastDemo />
          </Section>


        </main>

        {/* Footer */}
        <footer className="border-t border-border-subtle py-8 text-center text-xs text-text-muted">
          DesignYstem v0.1.0 — Soft UI Design System
        </footer>
      </div>
    </ToastProvider>
  );
}

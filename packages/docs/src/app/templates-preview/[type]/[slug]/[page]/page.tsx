"use client";

import { notFound, useParams } from "next/navigation";
import { isBlockType } from "@/blocks/registry";
import { AppShellPreview } from "@/templates/app-shell-preview";
import { getTemplate } from "@/templates/registry";

export default function TemplatePageRoute() {
  const params = useParams<{ type: string; slug: string; page: string }>();

  if (!isBlockType(params.type)) {
    notFound();
  }

  const template = getTemplate(params.type, params.slug);
  if (!template) {
    notFound();
  }

  if (template.layout !== "app-shell" || !template.pages) {
    notFound();
  }

  const activePage = template.pages.find((p) => p.slug === params.page);
  if (!activePage) {
    notFound();
  }

  return <AppShellPreview type={params.type} template={template} activePage={activePage} />;
}

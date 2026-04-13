"use client";

import { notFound, useParams } from "next/navigation";
import { isBlockType } from "@/blocks/registry";
import { AppShellPreview } from "@/templates/app-shell-preview";
import { blockRefToString, getTemplate, resolveBlockRef } from "@/templates/registry";

export default function TemplatePreviewPage() {
  const params = useParams<{ type: string; slug: string }>();

  if (!isBlockType(params.type)) {
    notFound();
  }

  const template = getTemplate(params.type, params.slug);
  if (!template) {
    notFound();
  }

  if (template.layout === "app-shell" && template.pages && template.pages.length > 0) {
    return <AppShellPreview type={params.type} template={template} activePage={template.pages[0]} />;
  }

  const resolved = template.blocks.flatMap((ref) => {
    const meta = resolveBlockRef(ref);
    return meta ? [{ ref, key: blockRefToString(ref), meta }] : [];
  });

  const missingRefs = template.blocks.filter((ref) => !resolveBlockRef(ref)).map((ref) => blockRefToString(ref));
  if (missingRefs.length > 0) {
    return (
      <div className="p-8 text-sm text-text-muted">Template references missing blocks: {missingRefs.join(", ")}</div>
    );
  }

  return (
    <>
      {resolved.map((r) => {
        const Block = r.meta.component;
        return (
          <div key={r.key} data-block-ref={r.key} style={{ display: "contents" }}>
            <Block />
          </div>
        );
      })}
    </>
  );
}

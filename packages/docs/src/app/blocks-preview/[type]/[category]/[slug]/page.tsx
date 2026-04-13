"use client";

import { notFound, useParams } from "next/navigation";
import { getBlock, isBlockType } from "@/blocks/registry";

export default function BlockPreviewPage() {
  const params = useParams<{ type: string; category: string; slug: string }>();

  if (!isBlockType(params.type)) {
    notFound();
  }

  const block = getBlock(params.type, params.category, params.slug);
  if (!block) {
    notFound();
  }

  const Component = block.component;
  return <Component />;
}

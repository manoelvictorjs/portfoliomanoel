"use client";

import { FloatingTechLayer } from "@/shared/animations/FloatingTechLayer";
import { pageFloatingBadges, pageFloatingSnippets } from "@/content/floating-tech";

export function PageFloatingTech() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 min-h-full overflow-hidden"
      aria-hidden
    >
      <FloatingTechLayer
        variant="ambient"
        badges={pageFloatingBadges}
        snippets={pageFloatingSnippets}
      />
    </div>
  );
}

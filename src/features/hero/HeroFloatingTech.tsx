"use client";

import { FloatingTechLayer } from "@/shared/animations/FloatingTechLayer";
import {
  floatingCodeSnippets,
  heroFloatingBadges,
} from "@/content/floating-tech";

export function HeroFloatingTech() {
  return (
    <FloatingTechLayer
      variant="hero"
      badges={heroFloatingBadges}
      snippets={floatingCodeSnippets}
    />
  );
}

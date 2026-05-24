"use client";

/**
 * Página marketing — composição das seções públicas (scroll vertical).
 * Mobile: sem trilha flutuante nem perspective 3D na página.
 */

import { TechDomainSection } from "@/shared/animations/TechDomainSection";
import { PageFloatingTech } from "@/shared/animations/PageFloatingTech";
import { HeroSection } from "@/features/hero/HeroSection";
import { LearningShowcase } from "@/features/learning/LearningShowcase";
import { ProjectsShowcase } from "@/features/projects/ProjectsShowcase";
import { SkillsShowcase } from "@/features/skills/SkillsShowcase";
import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { useRef } from "react";

export function MarketingPage() {
  const scrollRoot = useRef<HTMLElement>(null);
  const { isMobile } = useDeviceProfile();

  return (
    <main
      ref={scrollRoot}
      className={isMobile ? "relative" : "page-3d-main relative isolate"}
    >
      <PageFloatingTech scrollRoot={scrollRoot} />

      <div className="relative z-[2]">
        <HeroSection />
        <TechDomainSection />
        <SkillsShowcase />
        <LearningShowcase />
        <ProjectsShowcase />
      </div>
    </main>
  );
}

"use client";

import { TechDomainSection } from "@/shared/animations/TechDomainSection";
import { PageFloatingTech } from "@/shared/animations/PageFloatingTech";
import { TechMarquee } from "@/shared/animations/TechMarquee";
import { HeroSection } from "@/features/hero/HeroSection";
import { LearningShowcase } from "@/features/learning/LearningShowcase";
import { ProjectsShowcase } from "@/features/projects/ProjectsShowcase";
import { SkillsShowcase } from "@/features/skills/SkillsShowcase";

export function MarketingPage() {
  return (
    <main className="page-3d-main relative">
      <PageFloatingTech />
      <div className="relative z-[1]">
        <HeroSection />
        <TechMarquee />
        <TechDomainSection />
        <SkillsShowcase />
        <LearningShowcase />
        <ProjectsShowcase />
      </div>
    </main>
  );
}

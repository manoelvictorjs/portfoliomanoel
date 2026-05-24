"use client";

/**
 * Seção Skills (#skills) — trilha resumida + grade “Detalhes por tecnologia”.
 * Dados: content/skills-showcase.ts, content/fullstack-journey.ts
 */

import { SITE_SECTIONS } from "@/config";
import { CompileSection } from "@/shared/ui/CompileSection";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { FullStackTree } from "./FullStackTree";
import { SkillsDetailGrid } from "./SkillsDetailGrid";

export function SkillsShowcase() {
  return (
    <CompileSection
      id={SITE_SECTIONS.skills}
      variant="left"
      className="relative px-5 py-20 md:px-10 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="02"
          label="Skills"
          title="O que uso no dia a dia"
          subtitle="Stack aplicada em projetos reais — do front ao deploy em VPS."
        />

        <div className="mt-4 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Trilha full stack
          </p>
          <div className="mt-6">
            <FullStackTree />
          </div>
        </div>

        <SkillsDetailGrid />
      </div>
    </CompileSection>
  );
}

"use client";

import {
  aluraTracks,
  udemyTracks,
  universityEducation,
} from "@/content/learning";
import { CompileSection } from "@/shared/ui/CompileSection";
import { SectionHeader } from "@/shared/ui/SectionHeader";

const aluraCourseCount = aluraTracks.reduce((n, t) => n + t.courses.length, 0);

const aluraSummary = aluraTracks
  .flatMap((t) => [...t.courses])
  .map((c) => c.name)
  .slice(0, 8)
  .join(" · ");

export function LearningShowcase() {
  const udemy = udemyTracks[0];

  return (
    <CompileSection
      id="learning"
      variant="right"
      className="relative px-5 py-20 md:px-10 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          number="03"
          label="Formação"
          title="Formação acadêmica e cursos"
          subtitle="Graduação em andamento e cursos que complementam a prática em projetos."
        />

        <div className="space-y-10">
          <section>
            <p className="text-eyebrow mb-2">Graduação</p>
            <h3 className="font-display text-xl font-semibold text-white">
              {universityEducation.institution}
            </h3>
            <p className="mt-1 text-zinc-400">{universityEducation.degree}</p>
            <p className="mt-3 text-sm text-zinc-500">
              {universityEducation.status} · desde {universityEducation.startYear}
              {" · "}
              {universityEducation.curriculumAreas.join(" · ")}
            </p>
          </section>

          <section className="border-t border-white/8 pt-10">
            <p className="text-eyebrow mb-4">Cursos</p>
            <ul className="space-y-4 text-sm leading-relaxed text-zinc-400">
              {udemy && (
                <li>
                  <span className="font-medium text-zinc-200">Udemy — </span>
                  {udemy.title}. {udemy.subtitle}
                </li>
              )}
              <li>
                <span className="font-medium text-zinc-200">Alura — </span>
                Trilhas de fundamentos, APIs, Linux, Docker, Node e Next.js. Destaques:{" "}
                {aluraSummary}
                {aluraCourseCount > 8 ? "…" : ""}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </CompileSection>
  );
}

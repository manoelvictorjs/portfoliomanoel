"use client";

import {
  aluraStats,
  aluraTracks,
  programmingLanguages,
  udemyTracks,
  universityEducation,
} from "@/content/learning";
import { CompileSection } from "@/shared/ui/CompileSection";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function LearningShowcase() {
  return (
    <CompileSection
      id="learning"
      variant="right"
      className="relative px-5 py-24 md:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="03"
          title="Formação contínua"
          subtitle="Graduação, cursos e linguagens — base acadêmica aliada à prática em projetos."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 lg:grid-cols-2"
        >
          <motion.div
            variants={staggerItem}
            className="surface-elevated rounded-[var(--radius-xl)] p-8 lg:col-span-2"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">
                  Graduação · {universityEducation.startYear}
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold text-white">
                  {universityEducation.institution}
                </h3>
                <p className="mt-2 text-zinc-400">{universityEducation.degree}</p>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
                {universityEducation.status}
              </span>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {universityEducation.curriculumAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-zinc-300"
                >
                  <span className="text-teal-400">◆</span>
                  {area}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="glass-card rounded-[var(--radius-xl)] p-8">
            <h3 className="font-display text-lg font-semibold text-white">
              Linguagens
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {programmingLanguages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-xl border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-100/90"
                >
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="glass-card rounded-[var(--radius-xl)] p-8">
            <h3 className="font-display text-lg font-semibold text-white">Udemy</h3>
            {udemyTracks.map((track) => (
              <div key={track.id} className="mt-4">
                <p className="text-sm font-medium text-zinc-200">{track.title}</p>
                <p className="mt-1 text-xs text-zinc-500">{track.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {track.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[10px] text-violet-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="glass-card overflow-hidden rounded-[var(--radius-xl)] p-0 lg:col-span-2"
          >
            <div className="border-b border-violet-500/20 bg-gradient-to-r from-violet-950/50 via-[#0d1117] to-teal-950/30 p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/15 text-2xl font-bold text-violet-200">
                    A
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      Alura · Formação contínua
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      Trilhas de fundamentos, infraestrutura e dados — aplicadas em
                      projetos reais.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="rounded-xl border border-violet-500/25 bg-violet-500/10 px-4 py-2 text-center">
                    <p className="font-display text-2xl font-bold text-white">
                      {aluraStats.totalCourses}
                    </p>
                    <p className="text-[10px] text-violet-300/80">cursos</p>
                  </div>
                  <div className="rounded-xl border border-teal-500/25 bg-teal-500/10 px-4 py-2 text-center">
                    <p className="font-display text-2xl font-bold text-white">
                      {aluraStats.tracks}
                    </p>
                    <p className="text-[10px] text-teal-300/80">trilhas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-8 lg:grid-cols-3">
              {aluraTracks.map((track) => (
                <div
                  key={track.category}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
                  style={{ borderColor: `${track.accent}22` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{track.icon}</span>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: track.accent }}
                      >
                        {track.category}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">{track.description}</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-4">
                    {track.courses.map((course) => (
                      <li
                        key={course.name}
                        className="border-b border-white/5 pb-4 last:border-0 last:pb-0"
                      >
                        <p className="flex items-start gap-2 text-sm font-medium text-zinc-200">
                          <span className="text-teal-500">✓</span>
                          {course.name}
                        </p>
                        <p className="mt-1 pl-5 text-xs leading-relaxed text-zinc-500">
                          {course.detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </CompileSection>
  );
}

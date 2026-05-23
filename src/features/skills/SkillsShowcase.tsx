"use client";

import { skillsShowcase } from "@/content/skills-showcase";
import { CompileSection } from "@/shared/ui/CompileSection";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { FullStackTree } from "./FullStackTree";
import { springElastic, springSnappy } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function SkillsShowcase() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <CompileSection
      id="skills"
      variant="left"
      className="relative px-5 py-24 md:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="02"
          title="Jornada Full Stack"
          subtitle="Visão clara do que já aplico em produção, do que estou aprofundando e do que sigo explorando — sem prazo de chegada."
        />

        <FullStackTree />

        <div className="mt-20">
          <h3 className="font-display text-lg font-semibold text-white">
            Detalhes por tecnologia
          </h3>
          <p className="mt-2 text-sm text-zinc-500">
            Clique em um card para ver o impacto em linguagem clara.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillsShowcase.map((skill, i) => {
              const isOpen = expanded === skill.id;
              return (
                <motion.button
                  key={skill.id}
                  type="button"
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springSnappy, delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setExpanded(isOpen ? null : skill.id)}
                  className={`glass-card group relative overflow-hidden rounded-[var(--radius-lg)] p-6 text-left ${
                    isOpen
                      ? "sm:col-span-2 lg:col-span-2 ring-1 ring-teal-500/30"
                      : ""
                  }`}
                  style={{
                    boxShadow: isOpen ? `0 0 48px ${skill.glow}` : undefined,
                  }}
                >
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 text-xl font-bold"
                    style={{
                      color: skill.accent,
                      boxShadow: `0 0 32px ${skill.glow}`,
                    }}
                  >
                    {skill.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {skill.title}
                  </h3>
                  {!isOpen && (
                    <p className="mt-2 text-sm text-zinc-500">
                      Toque para detalhes →
                    </p>
                  )}

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={springElastic}
                        className="mt-4 overflow-hidden"
                      >
                        <p className="text-sm leading-relaxed text-zinc-300">
                          {skill.rhSummary}
                        </p>
                        <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4 font-mono text-[11px] text-zinc-500">
                          {skill.techLog.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </CompileSection>
  );
}

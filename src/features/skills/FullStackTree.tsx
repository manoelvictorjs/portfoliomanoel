"use client";

import {
  journeyLevelMeta,
  journeyPhases,
  journeyStats,
  type JourneyLevel,
  type JourneyPhase,
} from "@/content/fullstack-journey";
import { motion } from "framer-motion";
import { useState } from "react";

function SkillPill({ name, level }: { name: string; level: JourneyLevel }) {
  const meta = journeyLevelMeta[level];
  return (
    <span
      className="rounded-lg border px-3 py-1.5 text-xs font-medium text-zinc-300"
      style={{
        borderColor: meta.border,
        backgroundColor: meta.bg,
      }}
    >
      {name}
    </span>
  );
}

function PhaseCard({
  phase,
  index,
  isLast,
  active,
  onSelect,
}: {
  phase: JourneyPhase;
  index: number;
  isLast: boolean;
  active: boolean;
  onSelect: () => void;
}) {
  const meta = journeyLevelMeta[phase.level];

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      onClick={onSelect}
      className={`relative w-full rounded-2xl border p-6 text-left transition-all md:p-7 ${
        active
          ? "border-teal-500/40 bg-teal-500/[0.06] ring-1 ring-teal-500/25"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
      }`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            color: meta.color,
            backgroundColor: meta.bg,
            border: `1px solid ${meta.border}`,
          }}
        >
          {meta.label}
        </span>
        {phase.level === "exploring" && (
          <span className="font-mono text-sm text-violet-400/80">∞</span>
        )}
      </div>

      <h3 className="font-display mt-4 text-lg font-semibold text-white md:text-xl">
        {phase.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">{phase.subtitle}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {phase.skills.map((skill) => (
          <SkillPill key={skill} name={skill} level={phase.level} />
        ))}
      </div>

      {/* Linha vertical da timeline */}
      {!isLast && (
        <span
          className="absolute -bottom-8 left-[1.65rem] top-full hidden h-8 w-px bg-gradient-to-b from-white/20 to-transparent md:block"
          aria-hidden
        />
      )}
    </motion.button>
  );
}

export function FullStackTree() {
  const [activeId, setActiveId] = useState(journeyPhases[0].id);
  const active = journeyPhases.find((p) => p.id === activeId) ?? journeyPhases[0];

  return (
    <div className="space-y-8">
      {/* Métricas */}
      <div className="grid gap-4 sm:grid-cols-3">
        {(Object.keys(journeyLevelMeta) as JourneyLevel[]).map((level) => {
          const meta = journeyLevelMeta[level];
          const count =
            level === "mastered"
              ? journeyStats.mastered
              : level === "growing"
                ? journeyStats.growing
                : journeyStats.exploring;
          return (
            <div
              key={level}
              className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                {meta.label}
              </p>
              <p className="font-display mt-1 text-2xl font-bold" style={{ color: meta.color }}>
                {count}
              </p>
              <p className="mt-0.5 text-xs text-zinc-600">tecnologias</p>
            </div>
          );
        })}
      </div>

      <p className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm leading-relaxed text-zinc-500">
        Stack aplicada em projetos reais. O que está em expansão ou exploração não
        tem prazo — a jornada segue.
      </p>

      {/* Timeline */}
      <div className="relative">
        <div
          className="absolute bottom-0 left-7 top-0 hidden w-px bg-gradient-to-b from-teal-500/50 via-white/15 to-violet-500/30 md:block"
          aria-hidden
        />

        <div className="space-y-8 md:pl-4">
          {journeyPhases.map((phase, i) => (
            <div key={phase.id} className="relative flex gap-5 md:gap-8">
              <div className="relative z-10 mt-8 hidden shrink-0 md:flex md:w-14 md:justify-center">
                <span
                  className="flex h-3.5 w-3.5 rounded-full ring-4 ring-[#06080f]"
                  style={{
                    backgroundColor: journeyLevelMeta[phase.level].color,
                    boxShadow: `0 0 12px ${journeyLevelMeta[phase.level].color}66`,
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <PhaseCard
                  phase={phase}
                  index={i}
                  isLast={i === journeyPhases.length - 1}
                  active={activeId === phase.id}
                  onSelect={() => setActiveId(phase.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destaque da fase selecionada */}
      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 md:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Foco atual
        </p>
        <h4 className="font-display mt-2 text-xl font-semibold text-white">
          {active.title}
        </h4>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          {active.subtitle}
        </p>
        {active.level === "exploring" && (
          <p className="mt-4 font-mono text-xs text-violet-400/90">
            ∞ A jornada não termina — cada tecnologia nova abre outras possibilidades.
          </p>
        )}
      </motion.div>
    </div>
  );
}

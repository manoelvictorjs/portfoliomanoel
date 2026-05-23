"use client";

import { CompileSection } from "@/shared/ui/CompileSection";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { infraExamples } from "@/content/tech-code-samples";
import { AnimatedCodeEditor } from "./AnimatedCodeEditor";
import { FloatingTechLayer } from "./FloatingTechLayer";
import {
  editorCodeSnippets,
  editorFloatingBadges,
} from "@/content/floating-tech";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

const PILLARS = [
  {
    title: "TypeScript",
    desc: "Tipagem forte, contratos de API e zero surpresas em produção.",
    color: "#3178c6",
    icon: "TS",
  },
  {
    title: "JavaScript",
    desc: "Base da web — APIs, automação, front-end e scripts em VPS.",
    color: "#f7df1e",
    icon: "JS",
  },
  {
    title: "Go",
    desc: "Serviços leves, workers e APIs com performance e deploy simples.",
    color: "#00ADD8",
    icon: "Go",
  },
] as const;

export function TechDomainSection() {
  return (
    <CompileSection
      id="tech-domain"
      variant="scale"
      className="relative px-5 py-24 md:px-10 lg:px-16 lg:py-32"
    >
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[420px] w-[420px] rounded-full bg-[#3178c6]/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[380px] w-[380px] rounded-full bg-[#00ADD8]/7 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-[320px] w-[320px] rounded-full bg-[#2496ed]/8 blur-[90px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-[280px] w-[280px] rounded-full bg-[#facc15]/6 blur-[80px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          number="★"
          title="TypeScript, JavaScript & Go"
          subtitle="Linguagens que uso no dia a dia — do front ao back, com código legível e pronto para produção."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <motion.div variants={staggerItem} className="relative">
            <FloatingTechLayer
              variant="editor"
              badges={editorFloatingBadges}
              snippets={editorCodeSnippets}
            />
            <div className="relative z-10">
              <AnimatedCodeEditor />
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-1">
            {PILLARS.map((p) => (
              <motion.div
                key={p.title}
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass-card rounded-2xl p-5"
                style={{
                  boxShadow: `0 0 32px ${p.color}22`,
                  borderColor: `${p.color}33`,
                }}
              >
                <span
                  className="font-display text-2xl font-bold"
                  style={{ color: p.color }}
                >
                  {p.icon}
                </span>
                <h3 className="font-display mt-2 font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-500">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14"
        >
          <p className="mb-6 text-center text-sm font-medium text-zinc-500">
            Infraestrutura na prática — exemplos reais de Linux e Docker
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {infraExamples.map((ex) => (
              <div
                key={ex.title}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e14]"
              >
                <div
                  className="flex items-center gap-3 border-b border-white/10 px-4 py-3"
                  style={{ borderColor: `${ex.color}33` }}
                >
                  <span className="text-xl">{ex.icon}</span>
                  <span className="font-display font-semibold text-white">
                    {ex.title}
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-zinc-600">
                    {ex.file}
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-400">
                  {ex.lines.map((line) => (
                    <div key={line}>
                      <span style={{ color: ex.color }}>{"> "}</span>
                      {line}
                    </div>
                  ))}
                </pre>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </CompileSection>
  );
}

"use client";

import { profile } from "@/content/profile";
import { completedProjects } from "@/content/projects";
import { ProfileCard } from "@/features/hero/ProfileCard";
import { Hero3DStage } from "@/features/hero/Hero3DStage";
import { HeroFloatingTech } from "@/features/hero/HeroFloatingTech";
import { useBoot } from "@/shared/providers/BootProvider";
import { ScrollButton } from "@/shared/ui/ScrollButton";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

const STATS = [
  { value: `${completedProjects.length}+`, label: "Projetos entregues" },
  { value: "Full Stack", label: "Stack principal" },
  { value: "2024+", label: "Formação UNISUL" },
] as const;

const STACK_TAGS = [
  { label: "TypeScript", className: "border-[#3178c6]/40 bg-[#3178c6]/15 text-[#7eb8ff]" },
  { label: "JavaScript", className: "border-[#f7df1e]/35 bg-[#f7df1e]/10 text-[#fde047]" },
  { label: "Go", className: "border-[#00ADD8]/35 bg-[#00ADD8]/10 text-[#67e8f9]" },
  { label: "Docker", className: "border-[#2496ed]/35 bg-[#2496ed]/10 text-[#7dd3fc]" },
  { label: "Linux", className: "border-[#facc15]/30 bg-[#facc15]/10 text-[#fde047]" },
] as const;

export function HeroSection() {
  const { introComplete } = useBoot();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-x-hidden px-5 pb-20 pt-28 md:px-10 lg:px-16"
    >
      <Hero3DStage introDone={introComplete} backLayer={<HeroFloatingTech />}>
        <div
          id="about"
          className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={introComplete ? "show" : "hidden"}
            className="max-w-xl"
            style={{ transform: "translateZ(48px)" }}
          >
            <motion.div
              variants={staggerItem}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/10 px-4 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
              </span>
              <span className="text-sm font-medium text-teal-200/90">
                Disponível para oportunidades
              </span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="font-display text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
            >
              Crio produtos digitais que{" "}
              <span className="gradient-text">funcionam de verdade</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mt-6 text-lg leading-relaxed text-zinc-400 md:text-xl"
            >
              Sou <strong className="font-medium text-zinc-200">{profile.name}</strong>
              — desenvolvedor full stack com domínio em{" "}
              <span className="font-medium text-[#3178c6]">TypeScript</span>,{" "}
              <span className="font-medium text-[#f7df1e]">JavaScript</span> e{" "}
              <span className="font-medium text-[#00ADD8]">Go</span>, com projetos
              entregues e código com ownership.
            </motion.p>

            <motion.div variants={staggerItem} className="mt-6 flex flex-wrap gap-2">
              {STACK_TAGS.map((tag, i) => (
                <motion.span
                  key={tag.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={introComplete ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.55 + i * 0.08 }}
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${tag.className}`}
                >
                  {tag.label}
                </motion.span>
              ))}
            </motion.div>

            <motion.div variants={staggerItem} className="mt-10 flex flex-wrap gap-4">
              <ScrollButton href="#projects" variant="primary">
                Explorar projetos
              </ScrollButton>
              <ScrollButton href="#tech-domain">Ver stack</ScrollButton>
              <ScrollButton href="#contact">Contato</ScrollButton>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mt-14 grid grid-cols-3 gap-4 border-t border-white/10 pt-10"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-xl font-bold text-white md:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div
            className="flex justify-center lg:justify-end"
            style={{ transform: "translateZ(100px)" }}
          >
            <ProfileCard introDone={introComplete} />
          </div>
        </div>
      </Hero3DStage>

      <motion.a
        href="#skills"
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-500"
        aria-label="Rolar para habilidades"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-lg"
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}

"use client";

/**
 * Seção Hero (#hero) — headline, stats e ProfileCard dentro do Hero3DStage.
 */

import { SITE_SECTIONS } from "@/config";
import { profile } from "@/content/profile";
import { completedProjects } from "@/content/projects";
import { HeroFloatingTech } from "@/features/hero/HeroFloatingTech";
import { Hero3DStage } from "@/features/hero/Hero3DStage";
import { ProfileCard } from "@/features/hero/ProfileCard";
import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { useBoot } from "@/shared/providers/BootProvider";
import { ScrollButton } from "@/shared/ui/ScrollButton";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

const STATS = [
  { value: `${completedProjects.length}+`, label: "Projetos no ar" },
  { value: "Full Stack", label: "Produto & infra" },
  { value: "VPS", label: "Deploy real" },
] as const;

export function HeroSection() {
  const { introComplete } = useBoot();
  const { isMobile } = useDeviceProfile();

  return (
    <section
      id={SITE_SECTIONS.hero}
      className="hero-mesh relative overflow-x-hidden"
      data-cursor-tint="45, 212, 191"
    >
      <Hero3DStage
        introDone={introComplete}
        backLayer={isMobile ? undefined : <HeroFloatingTech />}
      >
        <div className="relative flex min-h-[min(100vh,920px)] flex-col justify-center px-5 pb-16 pt-28 md:px-10 lg:px-16">
          <div
            id="about"
            className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={introComplete ? "show" : "hidden"}
              className="max-w-xl"
              style={{ transform: "translateZ(24px)" }}
            >
              <motion.p variants={staggerItem} className="text-eyebrow mb-5">
                Engenheiro de software
              </motion.p>

              <motion.h1 variants={staggerItem} className="display-xl text-white">
                Software que{" "}
                <span className="gradient-text">entrega em produção</span>
              </motion.h1>

              <motion.p variants={staggerItem} className="prose-lead mt-6 max-w-lg">
                {profile.name} — APIs, front-end e infraestrutura em VPS com ownership
                de ponta a ponta. Código testado, deploy previsível, resultado mensurável.
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="mt-10 flex flex-wrap items-center gap-5"
              >
            <ScrollButton href={`#${SITE_SECTIONS.projects}`} variant="primary">
              Ver projetos
            </ScrollButton>
            <ScrollButton href={`#${SITE_SECTIONS.techDomain}`} variant="link">
              Stack & código
            </ScrollButton>
            <ScrollButton href={`#${SITE_SECTIONS.contact}`} variant="link">
                  Contato
                </ScrollButton>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="mt-14 grid grid-cols-3 gap-6 border-t border-white/8 pt-10"
              >
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-lg font-semibold text-white md:text-xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <div
              className="flex justify-center lg:justify-end"
              style={{ transform: "translateZ(48px)" }}
            >
              <ProfileCard introDone={introComplete} />
            </div>
          </div>

          <motion.a
            href={`#${SITE_SECTIONS.techDomain}`}
            initial={{ opacity: 0 }}
            animate={introComplete ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="absolute bottom-6 left-1/2 z-20 flex flex-col items-center gap-2 text-zinc-600"
            aria-label="Rolar para stack"
            style={{ transform: "translateX(-50%) translateZ(32px)" }}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Scroll</span>
            <span className="h-8 w-px bg-gradient-to-b from-zinc-500 to-transparent" />
          </motion.a>
        </div>
      </Hero3DStage>
    </section>
  );
}

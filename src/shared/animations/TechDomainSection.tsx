"use client";

/**
 * Seção Stack (#tech-domain) — editor animado + pilares de linguagens + badges flutuantes.
 */

import { SITE_SECTIONS } from "@/config";
import { editorCodeSnippets, editorFloatingBadges } from "@/content/floating-tech";
import { CompileSection } from "@/shared/ui/CompileSection";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { AnimatedCodeEditor } from "./AnimatedCodeEditor";
import { FloatingTechLayer } from "./FloatingTechLayer";
import { TILT_PRESETS } from "@/config";
import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { useTilt3D } from "@/hooks/useTilt3D";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { SkillIconShell, type SkillIconId } from "@/shared/ui/SkillIcon";

const PILLARS: {
  title: string;
  desc: string;
  color: string;
  iconId: SkillIconId;
}[] = [
  {
    title: "TypeScript",
    desc: "Tipagem forte, contratos de API e zero surpresas em produção.",
    color: "#3178c6",
    iconId: "typescript",
  },
  {
    title: "JavaScript",
    desc: "Base da web — APIs, automação, front-end e scripts em VPS.",
    color: "#f7df1e",
    iconId: "javascript",
  },
  {
    title: "Java",
    desc: "Base da faculdade — POO, coleções e APIs com JVM; fundamento para back-end e boas práticas.",
    color: "#007396",
    iconId: "java",
  },
  {
    title: "Go",
    desc: "Serviços leves, workers e APIs com performance e deploy simples.",
    color: "#00ADD8",
    iconId: "go",
  },
];

export function TechDomainSection() {
  const { preferLightEffects } = useDeviceProfile();
  const editorTilt = useTilt3D({
    ...TILT_PRESETS.editor,
    disabled: preferLightEffects,
  });

  return (
    <CompileSection
      id={SITE_SECTIONS.techDomain}
      variant="scale"
      className="relative px-5 py-20 md:px-10 lg:px-16 lg:py-28"
    >
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          number="01"
          label="Stack"
          title="Java, TypeScript, JavaScript & Go"
          subtitle="Da base acadêmica em Java à stack web em produção — código legível e pronto para deploy."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20"
        >
          <motion.div variants={staggerItem} className="relative">
            <div className="relative min-h-[min(280px,40vh)] md:min-h-[min(320px,50vh)]">
              {!preferLightEffects && (
                <FloatingTechLayer
                  variant="editor"
                  badges={editorFloatingBadges}
                  snippets={editorCodeSnippets}
                />
              )}
              <div
                className={`relative z-10 ${preferLightEffects ? "" : "perspective-[1100px]"}`}
                onMouseMove={preferLightEffects ? undefined : editorTilt.onMouseMove}
                onMouseLeave={preferLightEffects ? undefined : editorTilt.onMouseLeave}
              >
                <motion.div
                  style={
                    editorTilt.transform
                      ? { transform: editorTilt.transform, transformStyle: "preserve-3d" }
                      : undefined
                  }
                >
                  <AnimatedCodeEditor />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="flex gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-5"
              >
                <SkillIconShell id={p.iconId} accent={p.color} className="shrink-0" />
                <div>
                  <h3 className="font-display font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </CompileSection>
  );
}

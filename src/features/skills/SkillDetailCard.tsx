"use client";

/**
 * Card clicável de uma tecnologia — tilt 3D + painel expansível (rhSummary + techLog).
 */

import type { CSSProperties } from "react";
import type { SkillShowcase } from "@/content/skills-showcase";
import { TILT_PRESETS } from "@/config";
import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { useTilt3D } from "@/hooks/useTilt3D";
import { hexToRgbComponents } from "@/lib/cursor-tint";
import { SkillIconShell, type SkillIconId } from "@/shared/ui/SkillIcon";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  skill: SkillShowcase;
  expanded: boolean;
  onToggle: () => void;
};

export function SkillDetailCard({ skill, expanded, onToggle }: Props) {
  const { preferLightEffects } = useDeviceProfile();
  const reduced = useReducedMotion();
  const light = preferLightEffects || reduced;
  const { transform, onMouseMove, onMouseLeave } = useTilt3D({
    ...TILT_PRESETS.card,
    disabled: light,
  });

  const cursorTint = hexToRgbComponents(skill.accent) ?? undefined;

  return (
    <motion.article
      layout={!light}
      className="group relative"
      initial={light ? false : { opacity: 0, y: 20 }}
      whileInView={light ? undefined : { opacity: 1, y: 0 }}
      viewport={light ? undefined : { once: true, margin: "-40px" }}
      transition={light ? undefined : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        data-cursor-tint={cursorTint}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`skill-detail-card relative w-full rounded-2xl border p-5 text-left transition-colors duration-300 ${
          expanded
            ? "border-white/20 bg-white/[0.06]"
            : "border-white/[0.08] bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.04]"
        }`}
        style={
          {
            "--skill-accent": skill.accent,
            "--skill-glow": skill.glow,
          } as CSSProperties
        }
      >
        <motion.div
          className="flex flex-col gap-4"
          style={
            transform
              ? { transform, transformStyle: "preserve-3d" }
              : { transformStyle: "preserve-3d" }
          }
        >
          <div className="relative w-fit">
            <div
              className="pointer-events-none absolute -inset-3 rounded-2xl opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: skill.glow }}
              aria-hidden
            />
            <SkillIconShell
              id={skill.id as SkillIconId}
              accent={skill.accent}
              className="relative"
            />
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-white">{skill.title}</h3>
            <p className="mt-2 text-[11px] text-zinc-500 transition-colors group-hover:text-zinc-400">
              {expanded ? "Toque para fechar ↑" : "Toque para detalhes →"}
            </p>
          </div>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, height: 0, rotateX: reduced ? 0 : -4 }}
            animate={{ opacity: 1, height: "auto", rotateX: 0 }}
            exit={{ opacity: 0, height: 0, rotateX: reduced ? 0 : -4 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="mt-3 rounded-2xl border border-white/10 bg-[#060a12]/90 p-4">
              <p className="text-sm leading-relaxed text-zinc-300">{skill.rhSummary}</p>
              <ul className="mt-4 space-y-1.5 rounded-xl border border-white/6 bg-black/40 px-3 py-3 font-mono text-[10px] leading-relaxed text-zinc-500">
                {skill.techLog.map((line) => (
                  <li key={line} className="text-teal-400/80">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

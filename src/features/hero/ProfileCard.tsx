"use client";

/** Card de perfil no hero — tilt 3D no topo; links sociais fora do plano 3D (cliques confiáveis). */

import { universityEducation } from "@/content/learning";
import { profile } from "@/content/profile";
import { TILT_PRESETS } from "@/config";
import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { useTilt3D } from "@/hooks/useTilt3D";
import { springSoft } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type Props = {
  introDone?: boolean;
};

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: profile.linkedin,
    external: true,
    className: "btn-ghost rounded-xl py-2.5 text-center text-xs font-medium",
  },
  {
    label: "GitHub",
    href: profile.github,
    external: true,
    className: "btn-ghost rounded-xl py-2.5 text-center text-xs font-medium",
  },
  {
    label: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
    className: "btn-primary col-span-2 rounded-xl py-2.5 text-center text-xs",
  },
] as const;

export function ProfileCard({ introDone = true }: Props) {
  const { preferLightEffects } = useDeviceProfile();
  const reducedMotion = useReducedMotion() ?? false;
  const light = preferLightEffects || reducedMotion;
  const { transform, onMouseMove, onMouseLeave } = useTilt3D({
    ...TILT_PRESETS.profile,
    disabled: light,
  });

  return (
    <motion.div
      initial={
        reducedMotion ? { opacity: 0, y: 32 } : { opacity: 0, y: 32, rotateX: 12, rotateY: -6 }
      }
      animate={
        introDone
          ? reducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: 0, rotateX: 0, rotateY: 0 }
          : { opacity: 0, y: 40 }
      }
      transition={{ ...springSoft, delay: introDone ? 0.35 : 0 }}
      className={`profile-card-3d relative z-30 w-full max-w-[340px] perspective-[900px] ${
        introDone ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="surface-elevated relative overflow-hidden rounded-[var(--radius-xl)] border border-white/8">
        <div
          className="p-8 pb-4"
          onMouseMove={light ? undefined : onMouseMove}
          onMouseLeave={light ? undefined : onMouseLeave}
        >
          <motion.div
            style={
              transform
                ? { transform, transformStyle: "preserve-3d" }
                : { transformStyle: "preserve-3d" }
            }
          >
            <div className="mx-auto w-fit" style={{ transform: "translateZ(20px)" }}>
              <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e16] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                <Image
                  src={profile.photo}
                  alt={`Foto de ${profile.name}`}
                  fill
                  sizes="176px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            <div className="mt-8 text-center" style={{ transform: "translateZ(12px)" }}>
              <h2 className="font-display text-2xl font-bold text-white">{profile.name}</h2>
              <p className="mt-2 text-sm font-medium text-teal-300/90">{profile.title}</p>
              <p className="mt-4 text-sm text-zinc-500">
                {universityEducation.degree} · {universityEducation.institution}
              </p>
            </div>
          </motion.div>
        </div>

        <div
          className="relative z-30 grid grid-cols-2 gap-2 px-8 pb-8"
          style={{ transformStyle: "flat" }}
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`${link.className} relative z-10 cursor-pointer`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

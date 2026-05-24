"use client";

/** Card de perfil no hero — tilt 3D e camadas translateZ para profundidade. */

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

export function ProfileCard({ introDone = true }: Props) {
  const { preferLightEffects } = useDeviceProfile();
  const reduced = useReducedMotion();
  const light = preferLightEffects || reduced;
  const { transform, onMouseMove, onMouseLeave } = useTilt3D({
    ...TILT_PRESETS.profile,
    disabled: light,
  });

  return (
    <motion.div
      initial={reduced ? { opacity: 0, y: 32 } : { opacity: 0, y: 32, rotateX: 12, rotateY: -6 }}
      animate={
        introDone
          ? reduced
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: 0, rotateX: 0, rotateY: 0 }
          : { opacity: 0, y: 40 }
      }
      transition={{ ...springSoft, delay: introDone ? 0.35 : 0 }}
      className="profile-card-3d perspective-[900px]"
      onMouseMove={light ? undefined : onMouseMove}
      onMouseLeave={light ? undefined : onMouseLeave}
    >
      <motion.div
        className="surface-elevated relative w-full max-w-[340px] overflow-hidden rounded-[var(--radius-xl)] border border-white/8 p-8"
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

        <div
          className="mt-6 grid grid-cols-2 gap-2"
          style={{ transform: "translateZ(8px)" }}
        >
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost rounded-xl py-2.5 text-center text-xs font-medium"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost rounded-xl py-2.5 text-center text-xs font-medium"
          >
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="btn-primary col-span-2 rounded-xl py-2.5 text-center text-xs"
          >
            {profile.email}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

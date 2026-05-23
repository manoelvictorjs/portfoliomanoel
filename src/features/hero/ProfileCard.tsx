"use client";

import { universityEducation } from "@/content/learning";
import { profile } from "@/content/profile";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useCallback } from "react";
import { springSoft } from "@/lib/motion";

type Props = {
  introDone?: boolean;
};

export function ProfileCard({ introDone = true }: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 24,
  });
  const glareX = useTransform(mx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["25%", "75%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(45,212,191,0.14), transparent 55%)`;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mx, my],
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 48, rotateX: 16, scale: 0.9 }}
      animate={
        introDone
          ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
          : { opacity: 0, y: 60, rotateX: 20, scale: 0.85 }
      }
      transition={{ ...springSoft, delay: introDone ? 0.35 : 0 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="profile-card-3d surface-elevated relative w-full max-w-[340px] overflow-hidden rounded-[var(--radius-xl)] p-8"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: glare }}
        aria-hidden
      />

      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-teal-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-fit">
        <div className="relative h-44 w-44 overflow-hidden rounded-2xl border-2 border-teal-500/30 shadow-lg shadow-teal-500/15 ring-4 ring-teal-500/10">
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

      <div className="relative z-10 mt-8 text-center">
        <h2 className="font-display text-2xl font-bold text-white">{profile.name}</h2>
        <p className="mt-2 text-sm font-medium text-teal-300/90">{profile.title}</p>
        <div className="mt-4 rounded-xl border border-sky-500/25 bg-sky-500/10 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-300/90">
            🎓 Faculdade
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-200">
            {universityEducation.institution}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {universityEducation.degree} · desde {universityEducation.startYear}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-6 grid grid-cols-2 gap-2">
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
  );
}

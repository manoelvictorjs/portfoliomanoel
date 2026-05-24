"use client";

import { useBoot } from "@/shared/providers/BootProvider";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = ["> portfolio · manoel.dev", "> pronto"] as const;

export function PageIntro() {
  const { introComplete, completeIntro } = useBoot();
  const [lineIndex, setLineIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (introComplete) return;

    const lineTimer = window.setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, LINES.length - 1));
    }, 380);

    const doneTimer = window.setTimeout(() => completeIntro(), 1600);

    const skipOnScroll = () => completeIntro();
    window.addEventListener("wheel", skipOnScroll, { passive: true, once: true });
    window.addEventListener("touchmove", skipOnScroll, { passive: true, once: true });
    window.addEventListener("keydown", skipOnScroll, { once: true });

    return () => {
      window.clearInterval(lineTimer);
      window.clearTimeout(doneTimer);
      window.removeEventListener("wheel", skipOnScroll);
      window.removeEventListener("touchmove", skipOnScroll);
      window.removeEventListener("keydown", skipOnScroll);
    };
  }, [introComplete, completeIntro]);

  return (
    <AnimatePresence>
      {!introComplete && (
        <motion.div
          className="page-intro pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[var(--bg-deep)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, rotateX: reduced ? 0 : -4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d", perspective: 1200 }}
        >
          <div className="page-intro-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />

          <motion.div
            className="page-intro-floor pointer-events-none absolute bottom-0 left-0 right-0 h-[38vh]"
            initial={{ opacity: 0, rotateX: 88, y: 120 }}
            animate={{ opacity: 1, rotateX: 72, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}
            aria-hidden
          />

          <motion.div
            className="relative z-10 flex flex-col items-center px-6 text-center"
            initial={reduced ? { opacity: 0, y: 12 } : { opacity: 0, y: 40, rotateX: 14, z: -80 }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, rotateX: 0, z: 0 }}
            exit={reduced ? { opacity: 0, y: -8 } : { opacity: 0, y: -24, rotateX: -8, z: -40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <p className="text-eyebrow intro-shimmer mb-4">Carregando</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Manoel <span className="gradient-text">Victor</span>
            </h1>
            <p className="mt-2 text-sm text-zinc-500">Full Stack · DevOps</p>

            <motion.div
              className="mt-8 w-full max-w-sm rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-left font-mono text-[11px] text-zinc-400 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
              initial={reduced ? undefined : { rotateX: 6, z: 20 }}
              animate={reduced ? undefined : { rotateX: 0, z: 32 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {LINES.slice(0, lineIndex + 1).map((line) => (
                <p key={line} className="text-teal-400/90">
                  {line}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

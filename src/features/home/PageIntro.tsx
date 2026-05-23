"use client";

import { useBoot } from "@/shared/providers/BootProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "> inicializando ambiente dev…",
  "> carregando stack full stack…",
  "> docker compose up -d",
  "> portfolio pronto",
] as const;

export function PageIntro() {
  const { introComplete, completeIntro } = useBoot();
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (introComplete) return;

    const lineTimer = window.setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, LINES.length - 1));
    }, 520);

    const doneTimer = window.setTimeout(() => completeIntro(), 2800);

    return () => {
      window.clearInterval(lineTimer);
      window.clearTimeout(doneTimer);
    };
  }, [introComplete, completeIntro]);

  return (
    <AnimatePresence>
      {!introComplete && (
        <motion.div
          className="page-intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#03040a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="page-intro-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />

          <motion.div
            className="page-intro-floor pointer-events-none absolute left-1/2 top-[58%] h-[420px] w-[140%] -translate-x-1/2"
            initial={{ opacity: 0, rotateX: 78, scale: 0.6 }}
            animate={{ opacity: 0.35, rotateX: 72, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />

          <motion.div
            className="relative z-10 flex flex-col items-center px-6 text-center"
            initial={{ opacity: 0, rotateX: 24, y: 40, scale: 0.88 }}
            animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, rotateX: -10, y: -24, scale: 1.04 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="font-display text-5xl font-extrabold tracking-tight md:text-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              <span className="gradient-text">MV</span>
            </motion.div>

            <motion.p
              className="mt-3 text-sm font-medium tracking-wide text-zinc-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Manoel Victor · Full Stack Developer
            </motion.p>

            <motion.div
              className="mt-10 w-full max-w-md rounded-xl border border-white/10 bg-black/50 px-4 py-4 text-left font-mono text-xs"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {LINES.slice(0, lineIndex + 1).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === lineIndex ? "text-teal-300" : "text-zinc-500"}
                >
                  {line}
                  {i === lineIndex && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-0.5 inline-block text-teal-400"
                    >
                      ▌
                    </motion.span>
                  )}
                </motion.p>
              ))}
            </motion.div>

            <motion.div
              className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="intro-shimmer h-full rounded-full bg-gradient-to-r from-teal-500 via-sky-400 to-violet-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

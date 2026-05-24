"use client";

/**
 * Intro cinematográfica — delay proposital, console de boot e código digitando.
 * Pule com scroll, toque ou qualquer tecla.
 */

import {
  introBootLogs,
  type IntroLogTone,
} from "@/content/page-intro-sequence";
import { useIntroBootSequence } from "@/hooks/useIntroBootSequence";
import { useBoot } from "@/shared/providers/BootProvider";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect } from "react";

const LOG_TONE_CLASS: Record<IntroLogTone, string> = {
  command: "text-teal-300",
  muted: "text-zinc-500",
  accent: "text-sky-300/90",
  warn: "text-amber-300/90",
  success: "text-emerald-400",
};

function highlightCode(line: string, key: number) {
  if (!line.trim()) {
    return (
      <span key={key} className="block min-h-[1.35em]">
        {"\u00A0"}
      </span>
    );
  }

  const parts = line.split(
    /(\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|import |async |await |console\.log|const |return |\{|\})/gm,
  );

  return (
    <span key={key} className="block min-h-[1.35em]">
      {parts.map((part, i) => {
        if (part.startsWith("//")) {
          return (
            <span key={i} className="text-zinc-500">
              {part}
            </span>
          );
        }
        if (
          part.startsWith('"') ||
          part.startsWith("'") ||
          part.startsWith("`")
        ) {
          return (
            <span key={i} className="text-emerald-300/90">
              {part}
            </span>
          );
        }
        if (
          ["import ", "async ", "await ", "const ", "return "].includes(part) ||
          part === "console.log"
        ) {
          return (
            <span key={i} className="text-violet-300">
              {part}
            </span>
          );
        }
        if (part === "{" || part === "}") {
          return (
            <span key={i} className="text-zinc-400">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

export function PageIntro() {
  const { introComplete, completeIntro } = useBoot();
  const reduced = useReducedMotion() ?? false;

  const skip = useCallback(() => {
    completeIntro();
  }, [completeIntro]);

  const { logLines, codeText, showCursor, progress } = useIntroBootSequence({
    active: !introComplete,
    reduced,
    onComplete: completeIntro,
  });

  useEffect(() => {
    if (introComplete) return;

    const onSkip = () => skip();
    window.addEventListener("wheel", onSkip, { passive: true, once: true });
    window.addEventListener("touchstart", onSkip, { passive: true, once: true });
    window.addEventListener("keydown", onSkip, { once: true });

    return () => {
      window.removeEventListener("wheel", onSkip);
      window.removeEventListener("touchstart", onSkip);
      window.removeEventListener("keydown", onSkip);
    };
  }, [introComplete, skip]);

  return (
    <AnimatePresence>
      {!introComplete && (
        <motion.div
          className="page-intro pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[var(--bg-deep)] px-4 py-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, rotateX: reduced ? 0 : -5 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d", perspective: 1200 }}
          role="dialog"
          aria-modal="true"
          aria-label="Inicializando portfólio"
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
            className="relative z-10 flex w-full max-w-xl flex-col items-center"
            initial={reduced ? { opacity: 0, y: 12 } : { opacity: 0, y: 36, rotateX: 12, z: -60 }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, rotateX: 0, z: 0 }}
            exit={reduced ? { opacity: 0, y: -10 } : { opacity: 0, y: -28, rotateX: -6, z: -30 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <p className="text-eyebrow intro-shimmer mb-3">Inicializando ambiente</p>
            <h1 className="font-display text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
              Manoel <span className="gradient-text">Victor</span>
            </h1>
            <p className="mt-1 text-center text-sm text-zinc-500">Full Stack · DevOps</p>

            <div className="boot-console mt-8 w-full">
              <div className="boot-console-chrome">
                <span className="boot-dot bg-red-500/90" />
                <span className="boot-dot bg-amber-400/90" />
                <span className="boot-dot bg-emerald-500/90" />
                <span className="ml-2 font-mono text-[10px] text-zinc-500">
                  manoel@portfolio — zsh
                </span>
              </div>
              <div className="boot-console-body font-mono text-[11px] leading-relaxed md:text-xs">
                {logLines.map((line, idx) => (
                  <p
                    key={`${idx}-${line.text}`}
                    className={line.text ? LOG_TONE_CLASS[line.tone] : "min-h-[0.65em]"}
                  >
                    {line.text || "\u00A0"}
                  </p>
                ))}
                {logLines.length > 0 && logLines.length < introBootLogs.length && (
                  <p className="text-teal-400/50" aria-hidden>
                    ▌
                  </p>
                )}
              </div>
            </div>

            <div className="boot-editor mt-3 w-full">
              <div className="boot-editor-chrome">
                <span className="text-teal-400/80">●</span>
                <span className="font-mono text-[10px] text-zinc-400">boot.ts</span>
                <span className="ml-auto font-mono text-[10px] text-emerald-400/80">
                  UTF-8
                </span>
              </div>
              <pre className="boot-editor-code font-mono text-[10px] leading-relaxed md:text-[11px]">
                <code>
                  {codeText.split("\n").map((line, idx) => highlightCode(line, idx))}
                  {showCursor && <span className="boot-cursor" aria-hidden />}
                </code>
              </pre>
            </div>

            <div className="mt-5 w-full">
              <div className="mb-2 flex justify-between font-mono text-[10px] text-zinc-600">
                <span>boot sequence</span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
              <div className="boot-progress-track h-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="boot-progress-fill h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.round(progress * 100)}%` }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </div>
              <p className="mt-3 text-center font-mono text-[10px] text-zinc-600">
                Scroll, toque ou tecla para pular
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import {
  getResumeDownload,
  resumeDownloadLabel,
  triggerResumeDownload,
} from "@/lib/resume/download";
import { motion } from "framer-motion";

type Props = {
  variant?: "primary" | "ghost";
  className?: string;
  showIcon?: boolean;
};

export function ResumeDownloadButton({
  variant = "ghost",
  className = "",
  showIcon = true,
}: Props) {
  const resume = getResumeDownload();

  const handleClick = () => {
    if (!triggerResumeDownload(resume)) {
      window.alert(
        "Não foi possível iniciar o download. Verifique se o PDF está em public/ ou configure NEXT_PUBLIC_RESUME_URL.",
      );
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={
        variant === "primary"
          ? `btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm ${className}`
          : `btn-ghost inline-flex items-center justify-center gap-2 rounded-full border-white/12 px-6 py-3 text-sm ${className}`
      }
      aria-label={`Baixar currículo PDF de ${resume.filename}`}
    >
      {showIcon ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M12 3v12m0 0l4-4m-4 4L8 11" />
          <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
        </svg>
      ) : null}
      Baixar currículo
    </motion.button>
  );
}

export function ResumeDownloadCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card mx-auto mb-8 flex max-w-xl flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-teal-500/25 bg-gradient-to-br from-teal-500/10 to-cyan-600/5 p-6 text-center sm:flex-row sm:text-left"
    >
      <div className="flex-1">
        <p className="text-eyebrow mb-1">PDF · ATS-friendly</p>
        <p className="font-display text-lg font-semibold text-white">
          {resumeDownloadLabel()}
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          Download direto em PDF para recrutadores e processos seletivos.
        </p>
      </div>
      <ResumeDownloadButton variant="primary" className="shrink-0" />
    </motion.div>
  );
}

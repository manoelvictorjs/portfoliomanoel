"use client";

import { getDownloadById } from "@/content/downloads";
import { triggerDownload } from "@/lib/downloads";
import type { ResolvedDownload } from "@/types/content";
import { motion } from "framer-motion";
import { DownloadIcon } from "./DownloadIcon";

export type DownloadButtonProps = {
  downloadId?: string;
  download?: ResolvedDownload;
  variant?: "primary" | "ghost";
  className?: string;
  showIcon?: boolean;
};

export function DownloadButton({
  downloadId,
  download: downloadProp,
  variant = "ghost",
  className = "",
  showIcon = true,
}: DownloadButtonProps) {
  const download =
    downloadProp ?? (downloadId ? getDownloadById(downloadId) : undefined);

  if (!download) return null;

  const handleClick = () => {
    if (!triggerDownload(download)) {
      window.alert(
        "Não foi possível iniciar o download. Verifique o arquivo em public/ ou as variáveis de ambiente.",
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
      aria-label={`${download.label} — ${download.filename}`}
    >
      {showIcon ? <DownloadIcon /> : null}
      {download.label}
    </motion.button>
  );
}

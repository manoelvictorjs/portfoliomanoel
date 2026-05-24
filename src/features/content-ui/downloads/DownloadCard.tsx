"use client";

import { formatDownloadCardTitle, getDownloadById } from "@/content/downloads";
import { profile } from "@/content/profile";
import type { ResolvedDownload } from "@/types/content";
import { motion } from "framer-motion";
import { DownloadButton } from "./DownloadButton";

export type DownloadCardProps = {
  downloadId?: string;
  download?: ResolvedDownload;
};

export function DownloadCard({ downloadId, download: downloadProp }: DownloadCardProps) {
  const download =
    downloadProp ?? (downloadId ? getDownloadById(downloadId) : undefined);

  if (!download?.card) return null;

  const title = formatDownloadCardTitle(
    download.card.titleTemplate,
    profile.name.split(" ")[0] ?? "Currículo",
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card mx-auto mb-8 flex max-w-xl flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-teal-500/25 bg-gradient-to-br from-teal-500/10 to-cyan-600/5 p-6 text-center sm:flex-row sm:text-left"
    >
      <div className="flex-1">
        <p className="text-eyebrow mb-1">{download.card.eyebrow}</p>
        <p className="font-display text-lg font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-zinc-500">{download.card.description}</p>
      </div>
      <DownloadButton download={download} variant="primary" className="shrink-0" />
    </motion.div>
  );
}

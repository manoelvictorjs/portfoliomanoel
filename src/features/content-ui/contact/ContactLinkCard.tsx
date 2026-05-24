"use client";

import type { ContactLink } from "@/types/content";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  link: ContactLink;
};

export function ContactLinkCard({ link }: Props) {
  return (
    <motion.a
      href={link.href}
      target={link.opensInNewTab ? "_blank" : undefined}
      rel={link.opensInNewTab ? "noopener noreferrer" : undefined}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`glass-card group flex flex-col rounded-[var(--radius-lg)] border bg-gradient-to-br p-6 ${link.accent}`}
    >
      <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <span className="relative h-8 w-8">
          <Image
            src={link.icon}
            alt=""
            fill
            sizes="32px"
            className="object-contain"
          />
        </span>
      </span>
      <h3 className="font-display mt-5 text-lg font-semibold text-white">
        {link.label}
      </h3>
      <p className="mt-1 text-sm text-zinc-500 group-hover:text-zinc-400">
        {link.description}
      </p>
      <span className="mt-4 text-sm font-medium text-teal-400 opacity-0 transition-opacity group-hover:opacity-100">
        Abrir →
      </span>
    </motion.a>
  );
}

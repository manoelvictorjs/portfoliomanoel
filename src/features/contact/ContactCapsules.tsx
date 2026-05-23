"use client";

import { getWhatsAppUrl, profile } from "@/content/profile";
import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, staggerItem } from "@/lib/motion";

const LINKS = [
  {
    label: "LinkedIn",
    desc: "Perfil profissional",
    href: profile.linkedin,
    icon: "/images/social/linkedin.png",
    accent: "from-sky-500/20 to-blue-600/10 border-sky-500/25",
  },
  {
    label: "E-mail",
    desc: profile.email,
    href: `mailto:${profile.email}`,
    icon: "/images/social/outlook.png",
    accent: "from-violet-500/20 to-purple-600/10 border-violet-500/25",
  },
  {
    label: "WhatsApp",
    desc: "Mensagem direta",
    href: getWhatsAppUrl(),
    icon: "/images/social/whatsapp.svg",
    accent: "from-emerald-500/20 to-teal-600/10 border-emerald-500/25",
  },
  {
    label: "GitHub",
    desc: `github.com/${profile.githubUsername}`,
    href: profile.github,
    icon: "/images/social/github.svg",
    accent: "from-zinc-500/20 to-zinc-600/10 border-zinc-500/25",
  },
] as const;

export function ContactCapsules() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {LINKS.map((link) => (
        <motion.a
          key={link.label}
          variants={staggerItem}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -6, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`glass-card group flex flex-col rounded-[var(--radius-lg)] border bg-gradient-to-br p-6 ${link.accent}`}
        >
          <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            <Image
              src={link.icon}
              alt=""
              width={32}
              height={32}
              className="object-contain"
            />
          </span>
          <h3 className="font-display mt-5 text-lg font-semibold text-white">
            {link.label}
          </h3>
          <p className="mt-1 text-sm text-zinc-500 group-hover:text-zinc-400">
            {link.desc}
          </p>
          <span className="mt-4 text-sm font-medium text-teal-400 opacity-0 transition-opacity group-hover:opacity-100">
            Abrir →
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}

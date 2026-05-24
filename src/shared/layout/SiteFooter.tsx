"use client";

import { profile } from "@/content/profile";
import { ContactCapsules } from "@/features/contact/ContactCapsules";
import { ResumeDownloadCard } from "@/shared/ui/ResumeDownloadButton";
import { ContactSocialBackdrop } from "@/features/contact/ContactSocialBackdrop";
import { CompileSection } from "@/shared/ui/CompileSection";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/5"
      data-cursor-tint="45, 212, 191"
    >
      <ContactSocialBackdrop />
      <CompileSection variant="scale" className="relative z-10 px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            number="05"
            label="Contato"
            title="Vamos construir algo juntos?"
            subtitle="Escolha o canal que preferir — resposta rápida e conversa direta, sem burocracia."
            align="center"
          />

          <ResumeDownloadCard />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ContactCapsules />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 text-center md:flex-row md:text-left"
          >
            <p className="font-display text-lg font-semibold text-white">
              {profile.name}
            </p>
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} · Next.js · TypeScript · VPS
            </p>
          </motion.div>
        </div>
      </CompileSection>
    </footer>
  );
}

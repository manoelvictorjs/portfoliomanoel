"use client";

import { contactSectionContent } from "@/content/contact-section";
import { profile } from "@/content/profile";
import { ContactSocialBackdrop } from "@/features/contact/ContactSocialBackdrop";
import { CompileSection } from "@/shared/ui/CompileSection";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";
import { ContactLinksGrid } from "../contact/ContactLinksGrid";
import { DownloadPlacement } from "../downloads/DownloadPlacement";

type Props = {
  header?: typeof contactSectionContent;
};

/** Seção de contato completa — downloads + grid + rodapé interno */
export function ContactSection({ header = contactSectionContent }: Props) {
  return (
    <footer
      id={header.sectionId}
      className="relative overflow-hidden border-t border-white/5"
      data-cursor-tint="45, 212, 191"
    >
      <ContactSocialBackdrop />
      <CompileSection
        variant="scale"
        className="relative z-10 px-5 py-24 md:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            number={header.number}
            label={header.label}
            title={header.title}
            subtitle={header.subtitle}
            align={header.align}
          />

          <DownloadPlacement placement="contact-card" mode="cards" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ContactLinksGrid />
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

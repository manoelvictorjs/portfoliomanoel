"use client";

import { getContactLinks } from "@/content/contact-links";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { motion } from "framer-motion";
import { ContactLinkCard } from "./ContactLinkCard";

type Props = {
  className?: string;
  columnsClassName?: string;
};

/** Grid de canais de contato — dados em `content/contact-links.ts` */
export function ContactLinksGrid({
  className = "relative z-10",
  columnsClassName = "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
}: Props) {
  const links = getContactLinks();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`${columnsClassName} ${className}`}
    >
      {links.map((link) => (
        <motion.div key={link.id} variants={staggerItem}>
          <ContactLinkCard link={link} />
        </motion.div>
      ))}
    </motion.div>
  );
}

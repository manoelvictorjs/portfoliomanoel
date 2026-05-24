"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type Props = {
  number: string;
  label?: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
};

export function SectionHeader({
  number,
  label,
  title,
  subtitle,
  align = "left",
}: Props) {
  const center = align === "center";

  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-48px" }}
      className={`mb-12 md:mb-14 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      <p
        className={`text-eyebrow mb-4 ${center ? "justify-center" : ""} flex items-center gap-3`}
      >
        <span className="font-mono text-teal-400/90">{number}</span>
        {label && (
          <>
            <span className="h-px w-8 bg-gradient-to-r from-teal-500/50 to-transparent" />
            <span className="text-zinc-500">{label}</span>
          </>
        )}
      </p>
      <h2 className="display-lg text-white">{title}</h2>
      <p className="prose-lead mt-4">{subtitle}</p>
    </motion.header>
  );
}

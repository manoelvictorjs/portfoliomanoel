"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type Props = {
  number: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
};

export function SectionHeader({
  number,
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
      viewport={{ once: true, margin: "-60px" }}
      className={`mb-14 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      <div
        className={`mb-5 flex items-center gap-4 ${center ? "justify-center" : ""}`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/10 font-mono text-sm font-semibold text-teal-300">
          {number}
        </span>
        <div className="section-line h-px flex-1 max-w-[120px]" />
      </div>
      <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
        {subtitle}
      </p>
    </motion.header>
  );
}

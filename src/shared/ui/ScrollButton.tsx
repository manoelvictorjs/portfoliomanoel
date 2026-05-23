"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
};

export function ScrollButton({ href, children, variant = "ghost" }: Props) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={
        variant === "primary"
          ? "btn-primary inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm"
          : "btn-ghost inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm"
      }
    >
      {children}
    </motion.a>
  );
}

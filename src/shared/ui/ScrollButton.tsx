"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "link";
};

export function ScrollButton({ href, children, variant = "ghost" }: Props) {
  if (variant === "link") {
    return (
      <a href={href} className="link-inline">
        {children}
      </a>
    );
  }

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={
        variant === "primary"
          ? "btn-primary inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm"
          : "btn-ghost inline-flex items-center justify-center rounded-full border-white/12 px-6 py-3 text-sm"
      }
    >
      {children}
    </motion.a>
  );
}

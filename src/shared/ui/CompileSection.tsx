"use client";

/**
 * Wrapper de seção com reveal no scroll (Framer Motion).
 * Mobile: variantes leves, sem perspective 3D.
 */

import { CURSOR_SECTION_TINTS } from "@/config";
import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  scrollRevealVariants,
  scrollRevealVariantsLight,
  type ScrollRevealVariant,
} from "@/lib/motion";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: ScrollRevealVariant;
  disableScrollReveal?: boolean;
};

export function CompileSection({
  id,
  children,
  className = "",
  delay = 0,
  variant = "up",
  disableScrollReveal = false,
}: Props) {
  const { preferLightEffects } = useDeviceProfile();
  const cursorTint = id ? CURSOR_SECTION_TINTS[id] : undefined;
  const variants = preferLightEffects ? scrollRevealVariantsLight : scrollRevealVariants;

  if (disableScrollReveal) {
    return (
      <section id={id} className={className} data-cursor-tint={cursorTint}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      data-cursor-tint={cursorTint}
      className={`scroll-reveal-section ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: preferLightEffects ? "-8% 0px" : "-12% 0px -8% 0px" }}
      variants={variants[variant]}
      transition={{ delay }}
      style={
        preferLightEffects
          ? undefined
          : { transformPerspective: 1600, transformStyle: "preserve-3d" }
      }
    >
      {children}
    </motion.section>
  );
}

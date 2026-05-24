/**
 * Tokens Framer Motion — springs, stagger e variantes de scroll reveal 3D.
 * Novas seções: prefira `scrollRevealVariants` + `CompileSection variant=`.
 */

/** Springs */
export const springSnappy = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
  mass: 0.7,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 280,
  damping: 28,
  mass: 0.85,
};

export const springElastic = {
  type: "spring" as const,
  stiffness: 360,
  damping: 22,
  mass: 0.75,
};

export const fadeFast = { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const };

export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

/** Stagger para listas (hero stats, grids internos) */
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

export type ScrollRevealVariant = "up" | "down" | "left" | "right" | "scale";

/** Revelações leves — mobile e prefers-reduced-motion */
export const scrollRevealVariantsLight = {
  up: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOutExpo } },
  },
  down: {
    hidden: { opacity: 0, y: -16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: easeOutExpo } },
  },
  left: {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: easeOutExpo } },
  },
  right: {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: easeOutExpo } },
  },
  scale: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: easeOutExpo } },
  },
} as const;

/** Revelações 3D suaves ao entrar no viewport (desktop) */
export const scrollRevealVariants = {
  up: {
    hidden: { opacity: 0, y: 48, rotateX: 10, z: -40 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      z: 0,
      transition: { duration: 0.7, ease: easeOutExpo },
    },
  },
  down: {
    hidden: { opacity: 0, y: -32, rotateX: -8, z: -30 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      z: 0,
      transition: { duration: 0.65, ease: easeOutExpo },
    },
  },
  left: {
    hidden: { opacity: 0, x: -36, rotateY: 10, z: -24 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      z: 0,
      transition: { duration: 0.68, ease: easeOutExpo },
    },
  },
  right: {
    hidden: { opacity: 0, x: 36, rotateY: -10, z: -24 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      z: 0,
      transition: { duration: 0.68, ease: easeOutExpo },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94, y: 28, rotateX: 6, z: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      z: 0,
      transition: { duration: 0.72, ease: easeOutExpo },
    },
  },
} as const;

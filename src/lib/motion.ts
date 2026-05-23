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



export const staggerContainer = {

  hidden: { opacity: 0 },

  show: {

    opacity: 1,

    transition: { staggerChildren: 0.08, delayChildren: 0.05 },

  },

};



export const staggerItem = {

  hidden: { opacity: 0, y: 20 },

  show: {

    opacity: 1,

    y: 0,

    transition: springSoft,

  },

};



export const fadeUp = {

  hidden: { opacity: 0, y: 24 },

  visible: {

    opacity: 1,

    y: 0,

    transition: { ...springSoft, duration: 0.5 },

  },

};



export type ScrollRevealVariant = "up" | "down" | "left" | "right" | "scale";



export const scrollRevealVariants = {

  up: {

    hidden: {

      opacity: 0,

      y: 72,

      rotateX: 14,

      scale: 0.94,

      filter: "blur(10px)",

    },

    visible: {

      opacity: 1,

      y: 0,

      rotateX: 0,

      scale: 1,

      filter: "blur(0px)",

      transition: { duration: 0.85, ease: easeOutExpo },

    },

  },

  down: {

    hidden: {

      opacity: 0,

      y: -48,

      rotateX: -10,

      scale: 0.96,

      filter: "blur(8px)",

    },

    visible: {

      opacity: 1,

      y: 0,

      rotateX: 0,

      scale: 1,

      filter: "blur(0px)",

      transition: { duration: 0.8, ease: easeOutExpo },

    },

  },

  left: {

    hidden: {

      opacity: 0,

      x: -64,

      rotateY: 12,

      scale: 0.96,

      filter: "blur(8px)",

    },

    visible: {

      opacity: 1,

      x: 0,

      rotateY: 0,

      scale: 1,

      filter: "blur(0px)",

      transition: { duration: 0.82, ease: easeOutExpo },

    },

  },

  right: {

    hidden: {

      opacity: 0,

      x: 64,

      rotateY: -12,

      scale: 0.96,

      filter: "blur(8px)",

    },

    visible: {

      opacity: 1,

      x: 0,

      rotateY: 0,

      scale: 1,

      filter: "blur(0px)",

      transition: { duration: 0.82, ease: easeOutExpo },

    },

  },

  scale: {

    hidden: {

      opacity: 0,

      scale: 0.88,

      rotateX: 18,

      filter: "blur(12px)",

    },

    visible: {

      opacity: 1,

      scale: 1,

      rotateX: 0,

      filter: "blur(0px)",

      transition: { duration: 0.9, ease: easeOutExpo },

    },

  },

} as const;



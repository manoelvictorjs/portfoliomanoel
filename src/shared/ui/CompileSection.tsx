"use client";



import { motion } from "framer-motion";

import type { ReactNode } from "react";

import {

  scrollRevealVariants,

  type ScrollRevealVariant,

} from "@/lib/motion";



type Props = {

  id?: string;

  children: ReactNode;

  className?: string;

  delay?: number;

  variant?: ScrollRevealVariant;

  /** Hero e intro usam animação própria */

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

  if (disableScrollReveal) {

    return (

      <section id={id} className={className}>

        {children}

      </section>

    );

  }



  return (

    <motion.section

      id={id}

      className={`scroll-reveal-section ${className}`}

      initial="hidden"

      whileInView="visible"

      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}

      variants={scrollRevealVariants[variant]}

      transition={{ delay }}

      style={{ transformPerspective: 1400 }}

    >

      {children}

    </motion.section>

  );

}



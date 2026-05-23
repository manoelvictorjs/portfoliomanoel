"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  glowColor?: string;
  "aria-label"?: string;
};

export function MagneticButton({
  children,
  className = "",
  onClick,
  glowColor = "rgba(56, 189, 248, 0.4)",
  "aria-label": ariaLabel,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.18);
    y.set(offsetY * 0.18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`relative overflow-hidden rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm text-zinc-100 shadow-lg backdrop-blur-sm transition-[box-shadow] duration-150 hover:border-white/20 ${className}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 24px ${glowColor}`;
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = `0 0 24px ${glowColor}`;
      }}
    >
      <span className="ripple-host relative z-10">{children}</span>
    </motion.button>
  );
}

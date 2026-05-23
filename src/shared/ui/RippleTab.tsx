"use client";

import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

type Props = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function RippleTab({ active, onClick, children }: Props) {
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(
    null,
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    });
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative overflow-hidden rounded-md px-3 py-1.5 font-mono text-xs transition-colors duration-150 ${
        active
          ? "bg-cyan-500/20 text-cyan-200"
          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
      }`}
    >
      {ripple && (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute h-8 w-8 rounded-full bg-cyan-400/40"
          style={{ left: ripple.x - 16, top: ripple.y - 16 }}
          onAnimationComplete={() => setRipple(null)}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

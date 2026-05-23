"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  introDone: boolean;
  backLayer?: ReactNode;
};

export function Hero3DStage({ children, introDone, backLayer }: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springCfg = { stiffness: 120, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), springCfg);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), springCfg);
  const depthShift = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), springCfg);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mx, my],
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const transform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${depthShift}px)`;

  return (
    <div
      className="hero-3d-stage relative min-h-screen"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="hero-3d-depth-plane pointer-events-none absolute left-1/2 top-[42%] z-0 h-[min(55vh,480px)] w-[min(92vw,920px)] -translate-x-1/2 rounded-[2rem] border border-teal-500/15"
        initial={{ opacity: 0, rotateX: 68, scale: 0.75 }}
        animate={
          introDone
            ? { opacity: 0.5, rotateX: 62, scale: 1 }
            : { opacity: 0, rotateX: 80, scale: 0.7 }
        }
        transition={{ duration: 1.2, delay: introDone ? 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        aria-hidden
      />

      {backLayer && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ transform: transform, transformStyle: "preserve-3d" }}
        >
          <div style={{ transform: "translateZ(-80px)" }}>{backLayer}</div>
        </motion.div>
      )}

      <motion.div
        className="hero-3d-inner relative z-10"
        initial={{ opacity: 0, rotateX: 18, y: 60, scale: 0.92 }}
        animate={
          introDone
            ? { opacity: 1, rotateX: 0, y: 0, scale: 1 }
            : { opacity: 0, rotateX: 22, y: 80, scale: 0.88 }
        }
        transition={{ duration: 1, delay: introDone ? 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
        style={{ transform, transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

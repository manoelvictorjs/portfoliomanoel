"use client";

/**
 * Palco do hero — 3D + parallax no desktop; entrada simples no mobile.
 */

import { HERO_3D_SPRING } from "@/config";
import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
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
  const { preferLightEffects } = useDeviceProfile();
  const reduced = useReducedMotion();
  const light = preferLightEffects || reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springCfg = HERO_3D_SPRING;
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), springCfg);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), springCfg);
  const depthShift = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), springCfg);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (light) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [light, mx, my],
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const transform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${depthShift}px)`;
  const motionStyle = light ? undefined : transform;

  return (
    <div
      className={light ? "relative w-full" : "hero-3d-stage relative w-full"}
      onMouseMove={light ? undefined : onMove}
      onMouseLeave={light ? undefined : onLeave}
    >
      {!light && (
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
      )}

      {!light && backLayer && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={
            motionStyle
              ? { transform: motionStyle, transformStyle: "preserve-3d" }
              : { transformStyle: "preserve-3d" }
          }
        >
          <div style={{ transform: "translateZ(-120px) scale(1.05)" }}>{backLayer}</div>
        </motion.div>
      )}

      <motion.div
        className="relative z-10"
        initial={light ? { opacity: 0, y: 24 } : { opacity: 0, rotateX: 18, y: 60, scale: 0.92 }}
        animate={
          introDone
            ? light
              ? { opacity: 1, y: 0 }
              : { opacity: 1, rotateX: 0, y: 0, scale: 1 }
            : light
              ? { opacity: 0, y: 32 }
              : { opacity: 0, rotateX: 22, y: 80, scale: 0.88 }
        }
        transition={{ duration: light ? 0.55 : 1, delay: introDone ? 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
        style={
          motionStyle
            ? { transform: motionStyle, transformStyle: "preserve-3d" }
            : undefined
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

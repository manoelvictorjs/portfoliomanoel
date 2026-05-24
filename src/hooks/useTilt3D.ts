"use client";

/**
 * Parallax 3D no hover — normaliza posição do mouse (-0.5…0.5) e aplica rotateX/Y + translateZ.
 * Use com `transformStyle: preserve-3d` no pai e `perspective` no container.
 *
 * @example
 * const tilt = useTilt3D(TILT_PRESETS.card);
 * <div onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}>
 *   <motion.div style={{ transform: tilt.transform }}>...</motion.div>
 * </div>
 */

import {
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useMemo, type MouseEvent } from "react";

export type Tilt3DOptions = {
  maxRotate?: number;
  maxDepth?: number;
  stiffness?: number;
  damping?: number;
  /** true desliga tilt (ex.: prefers-reduced-motion) */
  disabled?: boolean;
};

export function useTilt3D({
  maxRotate = 8,
  maxDepth = 14,
  stiffness = 120,
  damping = 18,
  disabled = false,
}: Tilt3DOptions = {}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springCfg = useMemo(
    () => ({ stiffness, damping, mass: 0.65 }),
    [stiffness, damping],
  );

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [maxRotate, -maxRotate]), springCfg);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-maxRotate, maxRotate]), springCfg);
  const depth = useSpring(useTransform(my, [-0.5, 0.5], [maxDepth * 0.5, -maxDepth * 0.5]), springCfg);

  const transform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${depth}px)`;

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [disabled, mx, my],
  );

  const onMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return {
    transform: disabled ? undefined : transform,
    onMouseMove,
    onMouseLeave,
  };
}

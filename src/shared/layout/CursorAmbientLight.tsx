"use client";

/**
 * Holofote suave na ponta do cursor — cor muda conforme a seção/card sob o mouse.
 * Desligado em touch e prefers-reduced-motion.
 */

import { CURSOR_LIGHT_SPRING, CURSOR_TINT_DEFAULT } from "@/config";
import { resolveCursorTint } from "@/lib/cursor-tint";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";

function parseTint(tint: string) {
  const [r, g, b] = tint.split(",").map((v) => parseInt(v.trim(), 10));
  return {
    r: Number.isFinite(r) ? r : 45,
    g: Number.isFinite(g) ? g : 212,
    b: Number.isFinite(b) ? b : 191,
  };
}

export function CursorAmbientLight() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);

  const defaultRgb = parseTint(CURSOR_TINT_DEFAULT);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const r = useMotionValue(defaultRgb.r);
  const g = useMotionValue(defaultRgb.g);
  const b = useMotionValue(defaultRgb.b);

  const springX = useSpring(x, CURSOR_LIGHT_SPRING);
  const springY = useSpring(y, CURSOR_LIGHT_SPRING);
  const springR = useSpring(r, { stiffness: 70, damping: 18, mass: 0.4 });
  const springG = useSpring(g, { stiffness: 70, damping: 18, mass: 0.4 });
  const springB = useSpring(b, { stiffness: 70, damping: 18, mass: 0.4 });

  const pulse = useMotionValue(0);
  const springPulse = useSpring(pulse, { stiffness: 400, damping: 28 });
  const coreAlpha = useTransform(springPulse, [0, 1], [0.22, 0.58]);

  const glow = useMotionTemplate`radial-gradient(circle 200px at ${springX}px ${springY}px, rgba(${springR}, ${springG}, ${springB}, 0.09), transparent 72%)`;
  const core = useMotionTemplate`radial-gradient(circle 28px at ${springX}px ${springY}px, rgba(${springR}, ${springG}, ${springB}, ${coreAlpha}), transparent 88%)`;

  const applyTint = useCallback(
    (tint: string) => {
      const rgb = parseTint(tint);
      r.set(rgb.r);
      g.set(rgb.g);
      b.set(rgb.b);
    },
    [r, g, b],
  );

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const syncActive = () => setActive(finePointer.matches && !reduced);
    syncActive();
    finePointer.addEventListener("change", syncActive);
    return () => finePointer.removeEventListener("change", syncActive);
  }, [reduced]);

  useEffect(() => {
    if (!active) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      applyTint(resolveCursorTint(e.clientX, e.clientY));
    };

    const onLeave = () => applyTint(CURSOR_TINT_DEFAULT);

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      pulse.set(1);
      window.setTimeout(() => pulse.set(0), 80);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onClick, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onClick);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [active, x, y, pulse, applyTint]);

  if (!active) return null;

  return (
    <div
      className="cursor-ambient-layer pointer-events-none fixed inset-0 z-[8]"
      aria-hidden
    >
      <motion.div className="absolute inset-0" style={{ background: glow }} />
      <motion.div
        className="absolute inset-0 mix-blend-soft-light"
        style={{ background: core }}
      />
    </div>
  );
}

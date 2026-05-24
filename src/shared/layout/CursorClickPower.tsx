"use client";

/**
 * Feitiço no clique — círculo arcano, faíscas douradas e explosão estilo Harry Potter.
 * A cor do ambiente mistura com o dourado da magia.
 */

import { resolveCursorTint } from "@/lib/cursor-tint";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const MAX_BURST = 8;
const SPELL_GOLD = "245, 210, 120";
const SPELL_CORE = "255, 252, 235";
const SPARK_COUNT = 14;
const RUNE_MARKS = 12;

type Burst = {
  id: number;
  x: number;
  y: number;
  tint: string;
};

function mixTintWithGold(tint: string, goldWeight = 0.45): string {
  const [tr, tg, tb] = tint.split(",").map((v) => parseInt(v.trim(), 10));
  const [gr, gg, gb] = SPELL_GOLD.split(",").map((v) => parseInt(v.trim(), 10));
  const r = Math.round(tr * (1 - goldWeight) + gr * goldWeight);
  const g = Math.round(tg * (1 - goldWeight) + gg * goldWeight);
  const b = Math.round(tb * (1 - goldWeight) + gb * goldWeight);
  return `${r}, ${g}, ${b}`;
}

function SpellSigil({
  sigilId,
  magicTint,
}: {
  sigilId: number;
  magicTint: string;
}) {
  const marks = useMemo(
    () =>
      Array.from({ length: RUNE_MARKS }, (_, i) => {
        const angle = (i / RUNE_MARKS) * 360 - 90;
        const rad = (angle * Math.PI) / 180;
        const r = 42;
        return {
          cx: 50 + Math.cos(rad) * r,
          cy: 50 + Math.sin(rad) * r,
        };
      }),
    [],
  );

  return (
    <motion.svg
      className="spell-sigil absolute -translate-x-1/2 -translate-y-1/2"
      width={120}
      height={120}
      viewBox="0 0 100 100"
      initial={{ scale: 0.2, opacity: 0, rotate: -40 }}
      animate={{ scale: 2.4, opacity: [0.95, 0.7, 0], rotate: 50 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.28, 1] }}
      aria-hidden
    >
      <defs>
        <radialGradient id={`sigil-glow-${sigilId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`rgba(${SPELL_GOLD}, 0.5)`} />
          <stop offset="100%" stopColor={`rgba(${magicTint}, 0)`} />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="46" fill={`url(#sigil-glow-${sigilId})`} />

      <motion.g
        style={{ transformOrigin: "50px 50px" }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 120 }}
        transition={{ duration: 0.85, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke={`rgba(${SPELL_GOLD}, 0.75)`}
          strokeWidth="0.6"
          strokeDasharray="3 5 8 5"
        />
      </motion.g>

      <motion.g
        style={{ transformOrigin: "50px 50px" }}
        initial={{ rotate: 0 }}
        animate={{ rotate: -90 }}
        transition={{ duration: 0.7, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke={`rgba(${magicTint}, 0.55)`}
          strokeWidth="0.45"
          strokeDasharray="2 4"
        />
      </motion.g>

      {marks.map((m, i) => (
        <motion.circle
          key={i}
          cx={m.cx}
          cy={m.cy}
          r="1.2"
          fill={`rgba(${SPELL_GOLD}, 0.9)`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{ duration: 0.5, delay: 0.04 + i * 0.02 }}
        />
      ))}

      {/* Runas simplificadas (traços arcanos) */}
      {[0, 90, 180, 270].map((angle) => (
        <motion.line
          key={`rune-${angle}`}
          x1="50"
          y1="50"
          x2={50 + Math.cos((angle * Math.PI) / 180) * 22}
          y2={50 + Math.sin((angle * Math.PI) / 180) * 22}
          stroke={`rgba(${SPELL_CORE}, 0.7)`}
          strokeWidth="0.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.9, 0] }}
          transition={{ duration: 0.35, delay: 0.05 }}
        />
      ))}
    </motion.svg>
  );
}

function SpellBurst({ burst, onDone }: { burst: Burst; onDone: () => void }) {
  const { id, x, y, tint } = burst;
  const magicTint = mixTintWithGold(tint, 0.5);

  useEffect(() => {
    const timer = window.setTimeout(onDone, 920);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ left: x, top: y }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Clarão central — Lumos */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{
          width: 28,
          height: 28,
          background: `radial-gradient(circle, rgba(${SPELL_CORE}, 1) 0%, rgba(${SPELL_GOLD}, 0.85) 25%, rgba(${magicTint}, 0.35) 55%, transparent 75%)`,
          boxShadow: `0 0 30px rgba(${SPELL_GOLD}, 1), 0 0 60px rgba(${magicTint}, 0.6), 0 0 90px rgba(${SPELL_GOLD}, 0.35)`,
        }}
        initial={{ scale: 0.15, opacity: 1 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <SpellSigil sigilId={id} magicTint={magicTint} />

      {/* Anel de choque dourado */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 40,
          height: 40,
          border: `1.5px solid rgba(${SPELL_GOLD}, 0.9)`,
          boxShadow: `0 0 24px rgba(${SPELL_GOLD}, 0.8), inset 0 0 16px rgba(${magicTint}, 0.4)`,
        }}
        initial={{ scale: 0.3, opacity: 1 }}
        animate={{ scale: 5.5, opacity: 0 }}
        transition={{ duration: 0.75, ease: [0.12, 0.9, 0.2, 1] }}
      />

      {/* Ondas de energia — como feitiço lançado */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.div
          key={`wave-${angle}`}
          className="absolute left-0 top-0 origin-left mix-blend-screen"
          style={{
            width: 72,
            height: 3,
            rotate: angle + (i % 2 === 0 ? 8 : -8),
            background: `linear-gradient(90deg, rgba(${SPELL_CORE}, 0.95), rgba(${SPELL_GOLD}, 0.7), rgba(${magicTint}, 0.2), transparent)`,
            borderRadius: 2,
            filter: `blur(${i % 3 === 0 ? 0 : 0.5}px)`,
          }}
          initial={{ scaleX: 0.05, opacity: 1 }}
          animate={{ scaleX: 1.8, opacity: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.03 + i * 0.015,
          }}
        />
      ))}

      {/* Faíscas / brasas mágicas */}
      {Array.from({ length: SPARK_COUNT }, (_, i) => {
        const angle = (i / SPARK_COUNT) * 360 + 12;
        const rad = (angle * Math.PI) / 180;
        const dist = 55 + (i % 4) * 14;
        const size = i % 3 === 0 ? 3 : 2;
        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute rounded-full mix-blend-screen"
            style={{
              width: size,
              height: size,
              background: i % 2 === 0 ? `rgba(${SPELL_GOLD}, 1)` : `rgba(${SPELL_CORE}, 1)`,
              boxShadow: `0 0 8px rgba(${SPELL_GOLD}, 1), 0 0 4px rgba(${SPELL_CORE}, 0.8)`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(rad) * dist,
              y: Math.sin(rad) * dist - 8,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.65 + (i % 5) * 0.04,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.02 + i * 0.018,
            }}
          />
        );
      })}

      {/* Traços curvos de energia (comet tail) */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = i * 60 + 20;
        const rad = (angle * Math.PI) / 180;
        return (
          <motion.div
            key={`trail-${i}`}
            className="absolute origin-left mix-blend-plus-lighter"
            style={{
              width: 40,
              height: 1.5,
              rotate: angle,
              background: `linear-gradient(90deg, rgba(${SPELL_GOLD}, 0.9), transparent)`,
              filter: "blur(0.5px)",
            }}
            initial={{ scaleX: 0, opacity: 0.8, x: 0, y: 0 }}
            animate={{
              scaleX: 2.2,
              opacity: 0,
              x: Math.cos(rad) * 20,
              y: Math.sin(rad) * 20,
            }}
            transition={{ duration: 0.48, delay: 0.04 + i * 0.03 }}
          />
        );
      })}

      {/* Poeira mágica — partículas pequenas que caem */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = i * 45 + 5;
        const rad = (angle * Math.PI) / 180;
        const dist = 35 + i * 4;
        return (
          <motion.div
            key={`dust-${i}`}
            className="absolute h-0.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: `rgba(${SPELL_GOLD}, 0.9)` }}
            initial={{ x: 0, y: 0, opacity: 0.9 }}
            animate={{
              x: Math.cos(rad) * dist,
              y: Math.sin(rad) * dist + 25,
              opacity: 0,
            }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 + i * 0.025 }}
          />
        );
      })}
    </motion.div>
  );
}

export function CursorClickPower() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const idRef = useRef(0);

  const removeBurst = useCallback((id: number) => {
    setBursts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const spawnBurst = useCallback((x: number, y: number) => {
    const tint = resolveCursorTint(x, y);
    const id = ++idRef.current;
    setBursts((prev) => [...prev.slice(-(MAX_BURST - 1)), { id, x, y, tint }]);
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const syncActive = () => setActive(finePointer.matches && !reduced);
    syncActive();
    finePointer.addEventListener("change", syncActive);
    return () => finePointer.removeEventListener("change", syncActive);
  }, [reduced]);

  useEffect(() => {
    if (!active) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      spawnBurst(e.clientX, e.clientY);
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [active, spawnBurst]);

  if (!active) return null;

  return (
    <div
      className="cursor-click-power pointer-events-none fixed inset-0 z-[11] overflow-hidden"
      aria-hidden
    >
      <AnimatePresence mode="popLayout">
        {bursts.map((burst) => (
          <SpellBurst
            key={burst.id}
            burst={burst}
            onDone={() => removeBurst(burst.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

"use client";

import {
  pageFloatingSnippets,
  pageSnakeTrail,
  type FloatingTechBadge,
} from "@/content/floating-tech";
import {
  buildOrthogonalSnakePath,
  computeNodeThresholds,
  type SnakePoint,
} from "@/lib/snake-path";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { RefObject } from "react";

const SNAKE_POINTS: SnakePoint[] = pageSnakeTrail.map((b) => ({
  x: b.x ?? 50,
  y: b.y ?? 50,
}));

const SNAKE_PATH = buildOrthogonalSnakePath(SNAKE_POINTS);
const NODE_THRESHOLDS = computeNodeThresholds(SNAKE_POINTS);

type Props = {
  scrollRoot: RefObject<HTMLElement | null>;
};

function CodeSnippet({
  text,
  position,
  color,
  delay,
}: {
  text: string;
  position: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.15, 0.4, 0.15] }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay }}
      className={`pointer-events-none absolute hidden font-mono text-[10px] sm:block lg:text-xs ${position}`}
      style={{ color }}
    >
      {text}
    </motion.div>
  );
}

function SnakeBadge({
  badge,
  index,
  progress,
}: {
  badge: FloatingTechBadge;
  index: number;
  progress: MotionValue<number>;
}) {
  const threshold = NODE_THRESHOLDS[index] ?? 0;
  const isSm = badge.size === "sm";
  const x = badge.x ?? 50;
  const y = badge.y ?? 50;

  const opacity = useTransform(progress, (p) => {
    if (p >= threshold) return 1;
    if (index === 0) return 0.45 + p * 4;
    return 0.2;
  });

  const scale = useTransform(progress, (p) => {
    const next = NODE_THRESHOLDS[index + 1] ?? 1.01;
    const isHead = p >= threshold && p < next;
    if (isHead) return 1.12;
    return p >= threshold ? 1.04 : 0.9;
  });

  const boxShadow = useTransform(progress, (p) =>
    p >= threshold
      ? `0 0 40px ${badge.color}99, 0 0 72px ${badge.color}44`
      : `0 0 10px ${badge.color}18`,
  );

  const borderColor = useTransform(progress, (p) =>
    p >= threshold ? `${badge.color}bb` : `${badge.color}33`,
  );

  const pulse = useTransform(progress, (p) => {
    const next = NODE_THRESHOLDS[index + 1] ?? 1;
    return p >= threshold && p < threshold + (next - threshold) * 0.35 ? 0.5 : 0;
  });

  return (
    <motion.div
      className="floating-tech-badge pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 sm:block"
      style={{ left: `${x}%`, top: `${y}%`, opacity, scale }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: badge.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: badge.delay,
        }}
        className={`relative rounded-2xl border backdrop-blur-md ${isSm ? "px-3 py-2" : "px-4 py-3"}`}
        style={{
          borderColor,
          backgroundColor: `${badge.color}18`,
          boxShadow,
        }}
      >
        <span
          className={`font-display block font-bold ${isSm ? "text-lg" : "text-2xl"}`}
          style={{ color: badge.color }}
        >
          {badge.label}
        </span>
        <p className={`text-zinc-500 ${isSm ? "text-[9px]" : "text-[10px]"}`}>{badge.name}</p>
        <motion.span
          className="pointer-events-none absolute -inset-1 rounded-2xl"
          style={{
            opacity: pulse,
            boxShadow: `0 0 28px ${badge.color}`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function SnakeTrailSvg({ progress }: { progress: MotionValue<number> }) {
  const pathLength = useTransform(progress, [0, 1], [0, 1]);
  const haloOpacity = useTransform(progress, [0, 0.05, 1], [0.15, 0.35, 0.45]);

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="snake-trail-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
        <filter id="snake-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="0.65" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={SNAKE_PATH}
        fill="none"
        stroke="rgba(45, 212, 191, 0.07)"
        strokeWidth={0.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      <motion.path
        d={SNAKE_PATH}
        fill="none"
        stroke="url(#snake-trail-grad)"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        filter="url(#snake-glow)"
        style={{ pathLength, opacity: haloOpacity }}
      />

      <motion.path
        d={SNAKE_PATH}
        fill="none"
        stroke="url(#snake-trail-grad)"
        strokeWidth={0.45}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength }}
      />
    </svg>
  );
}

export function PageFloatingTech({ scrollRoot }: Props) {
  const reduced = useReducedMotion();
  const fullProgress = useMotionValue(1);

  const { scrollYProgress } = useScroll({
    target: scrollRoot,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001,
  });

  const trailProgress = reduced ? fullProgress : smooth;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 min-h-full overflow-hidden"
      aria-hidden
    >
      <div className="pointer-events-none absolute left-[8%] top-[20%] h-56 w-56 rounded-full bg-[#3178c6]/10 blur-[90px]" />
      <div className="pointer-events-none absolute right-[6%] top-[35%] h-48 w-48 rounded-full bg-[#f7df1e]/8 blur-[80px]" />
      <div className="pointer-events-none absolute left-[12%] top-[55%] h-52 w-52 rounded-full bg-[#2496ed]/10 blur-[85px]" />

      <SnakeTrailSvg progress={trailProgress} />

      {pageSnakeTrail.map((badge, i) => (
        <SnakeBadge key={badge.id} badge={badge} index={i} progress={trailProgress} />
      ))}

      {pageFloatingSnippets.map((snippet, i) => (
        <CodeSnippet key={`${snippet.text}-${i}`} {...snippet} />
      ))}
    </div>
  );
}

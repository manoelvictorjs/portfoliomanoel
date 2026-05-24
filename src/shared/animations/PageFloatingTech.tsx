"use client";

/**
 * Ícones de tecnologia no fundo da página + trilha SVG animada no scroll.
 * Acendimento: progresso do scroll × posição Y de cada badge (snake-path).
 */

import { SCROLL_TOP_RESET_PX } from "@/config";
import {
  pageFloatingSnippets,
  pageSnakeTrail,
  type FloatingTechBadge,
} from "@/content/floating-tech";
import { resolveSkillIconId, SkillIconShell } from "@/shared/ui/SkillIcon";
import {
  buildDirectSnakePath,
  computeNodeThresholds,
  computeScrollThresholdsFromLayout,
  computeSnakeLitMap,
  getPageScrollProgress,
  mapScrollToPathProgress,
  type SnakePoint,
} from "@/lib/snake-path";
import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState, type RefObject } from "react";

const SNAKE_POINTS: SnakePoint[] = pageSnakeTrail.map((b) => ({
  x: b.x ?? 50,
  y: b.y ?? 50,
}));

const SNAKE_PATH = buildDirectSnakePath(SNAKE_POINTS);
const PATH_THRESHOLDS = computeNodeThresholds(SNAKE_POINTS);
const SCROLL_THRESHOLDS = computeScrollThresholdsFromLayout(SNAKE_POINTS);

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
      animate={{ opacity: [0.1, 0.28, 0.1] }}
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
  lit,
}: {
  badge: FloatingTechBadge;
  lit: boolean;
}) {
  const isSm = badge.size === "sm";
  const x = badge.x ?? 50;
  const y = badge.y ?? 50;
  const iconId = resolveSkillIconId(badge.id);

  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 sm:block"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <motion.div
        className={`relative flex items-center gap-2.5 rounded-2xl border backdrop-blur-md ${
          isSm ? "px-2.5 py-2" : "px-3 py-2.5"
        }`}
        animate={{
          opacity: lit ? 1 : 0.38,
          scale: lit ? 1.08 : 0.92,
          borderColor: lit ? "rgba(255,255,255,0.35)" : `${badge.color}40`,
          backgroundColor: lit ? "rgba(8,12,20,0.9)" : "rgba(8,12,20,0.5)",
          boxShadow: lit
            ? `0 0 0 1px ${badge.color}99, 0 12px 44px ${badge.color}66`
            : `0 0 20px ${badge.color}18`,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {iconId ? (
          <SkillIconShell
            id={iconId}
            variant="badge"
            className="shrink-0 border-white/15 bg-black/40"
          />
        ) : (
          <span
            className={`font-display font-bold ${isSm ? "text-sm" : "text-base"}`}
            style={{ color: badge.color }}
          >
            {badge.label}
          </span>
        )}
        <p
          className={`font-medium leading-tight text-zinc-200 ${isSm ? "text-[10px]" : "text-[11px]"}`}
          style={{ opacity: lit ? 1 : 0.65 }}
        >
          {badge.name}
        </p>
      </motion.div>
    </div>
  );
}

function SnakeTrailSvg({ pathProgress }: { pathProgress: number }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="snake-trail-grad" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
      </defs>

      <path
        d={SNAKE_PATH}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={0.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      <motion.path
        d={SNAKE_PATH}
        fill="none"
        stroke="url(#snake-trail-grad)"
        strokeWidth={0.55}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={false}
        animate={{ pathLength: pathProgress, opacity: litPathOpacity(pathProgress) }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </svg>
  );
}

function litPathOpacity(progress: number) {
  return 0.45 + progress * 0.35;
}

export function PageFloatingTech({ scrollRoot }: Props) {
  const { isMobile } = useDeviceProfile();
  const reduced = useReducedMotion();
  const [litMap, setLitMap] = useState<Record<number, boolean>>({ 0: true });
  const [pathProgress, setPathProgress] = useState(0);

  const syncFromScroll = useCallback(() => {
    const atTop = window.scrollY <= SCROLL_TOP_RESET_PX;
    const scroll = getPageScrollProgress();

    const nextLit = computeSnakeLitMap(scroll, SCROLL_THRESHOLDS, atTop);
    setLitMap(nextLit);

    if (reduced) {
      setPathProgress(1);
      return;
    }

    const progress = atTop
      ? 0
      : mapScrollToPathProgress(scroll, SCROLL_THRESHOLDS, PATH_THRESHOLDS);
    setPathProgress(progress);
  }, [reduced]);

  useEffect(() => {
    syncFromScroll();

    window.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("resize", syncFromScroll, { passive: true });

    const root = scrollRoot.current;
    const ro =
      root && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => syncFromScroll())
        : null;
    ro?.observe(root);

    return () => {
      window.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener("resize", syncFromScroll);
      ro?.disconnect();
    };
  }, [scrollRoot, syncFromScroll]);

  if (isMobile) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[9] min-h-full overflow-hidden"
      aria-hidden
    >
      <SnakeTrailSvg pathProgress={pathProgress} />

      {pageSnakeTrail.map((badge, i) => (
        <SnakeBadge key={badge.id} badge={badge} lit={Boolean(litMap[i])} />
      ))}

      {pageFloatingSnippets.map((snippet, i) => (
        <CodeSnippet key={`${snippet.text}-${i}`} {...snippet} />
      ))}
    </div>
  );
}

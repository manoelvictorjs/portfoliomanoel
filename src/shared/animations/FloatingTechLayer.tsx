"use client";

/**
 * Camada de badges + snippets de código flutuantes (variantes: hero | editor | ambient).
 */

import type { CSSProperties } from "react";
import type { FloatingTechBadge } from "@/content/floating-tech";
import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { resolveSkillIconId, SkillIconShell } from "@/shared/ui/SkillIcon";
import { motion } from "framer-motion";

type Snippet = {
  text: string;
  position: string;
  delay: number;
  color: string;
};

function TechBadge({
  badge,
  variant,
  staticMotion,
}: {
  badge: FloatingTechBadge;
  variant: "hero" | "editor" | "ambient";
  staticMotion?: boolean;
}) {
  const isSm = badge.size === "sm";
  const isAmbient = variant === "ambient";
  const iconId = resolveSkillIconId(badge.id);
  const hiddenOnMobile =
    variant === "hero" && !["ts", "js", "docker", "go", "react", "node"].includes(badge.id);

  const visibility = isAmbient
    ? "hidden sm:block"
    : variant === "hero"
      ? hiddenOnMobile
        ? "hidden lg:block"
        : "hidden sm:block"
      : "hidden md:block";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: isAmbient ? badge.delay * 0.3 : 0.4 + badge.delay, duration: 0.7 }}
      className={`floating-tech-badge pointer-events-none absolute ${badge.position} ${visibility} ${
        isAmbient ? "opacity-[0.55]" : ""
      }`}
      style={
        {
          "--badge-color": badge.color,
          "--float-delay": `${badge.delay}s`,
          "--float-duration": `${badge.duration}s`,
        } as CSSProperties
      }
    >
      <motion.div
        animate={
          staticMotion ? undefined : { y: [0, -10, 0], rotate: [0, badge.id === "docker" ? 0 : 2, 0] }
        }
        transition={
          staticMotion
            ? undefined
            : {
                duration: badge.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: badge.delay,
              }
        }
        className={`flex items-center gap-2 rounded-2xl border border-white/10 bg-[#080c14]/80 backdrop-blur-md ${
          isSm ? "px-2.5 py-2" : "px-3 py-2.5"
        }`}
        style={{
          boxShadow: `0 8px 28px ${badge.color}28`,
        }}
      >
        {iconId ? (
          <SkillIconShell id={iconId} variant="badge" className="shrink-0" />
        ) : (
          <span
            className={`font-display font-bold ${isSm ? "text-sm" : "text-base"}`}
            style={{ color: badge.color }}
          >
            {badge.label}
          </span>
        )}
        <p className={`font-medium text-zinc-400 ${isSm ? "text-[9px]" : "text-[10px]"}`}>
          {badge.name}
        </p>
      </motion.div>
    </motion.div>
  );
}

function CodeSnippet({
  snippet,
  variant,
  staticMotion,
}: {
  snippet: Snippet;
  variant: "hero" | "editor" | "ambient";
  staticMotion?: boolean;
}) {
  const peakOpacity = variant === "ambient" ? 0.45 : 0.55;

  if (staticMotion) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.2, peakOpacity, 0.2] }}
      transition={{
        duration: 4 + snippet.delay,
        repeat: Infinity,
        delay: snippet.delay,
      }}
      className={`pointer-events-none absolute hidden font-mono text-[10px] sm:block lg:text-xs ${snippet.position}`}
      style={{ color: snippet.color }}
    >
      {snippet.text}
    </motion.div>
  );
}

function AmbientGlow({
  variant,
  staticMotion,
}: {
  variant: "hero" | "editor" | "ambient";
  staticMotion?: boolean;
}) {
  if (staticMotion) {
    return (
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-teal-500/10 blur-[60px]"
        aria-hidden
      />
    );
  }

  if (variant === "ambient") {
    return (
      <>
        <div className="pointer-events-none absolute left-[8%] top-[20%] h-56 w-56 rounded-full bg-[#3178c6]/10 blur-[90px]" />
        <div className="pointer-events-none absolute right-[6%] top-[35%] h-48 w-48 rounded-full bg-[#f7df1e]/8 blur-[80px]" />
        <div className="pointer-events-none absolute left-[12%] top-[55%] h-52 w-52 rounded-full bg-[#2496ed]/10 blur-[85px]" />
        <div className="pointer-events-none absolute right-[10%] top-[70%] h-44 w-44 rounded-full bg-[#00ADD8]/10 blur-[75px]" />
      </>
    );
  }

  if (variant === "editor") {
    return (
      <>
        <div className="pointer-events-none absolute -left-20 top-1/4 h-48 w-48 rounded-full bg-[#2496ed]/10 blur-[80px]" />
        <div className="pointer-events-none absolute -right-16 bottom-1/4 h-40 w-40 rounded-full bg-[#00ADD8]/10 blur-[70px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-[#3178c6]/8 blur-[90px]" />
      </>
    );
  }

  return (
    <>
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="pointer-events-none absolute left-[5%] top-[15%] h-64 w-64 rounded-full bg-[#3178c6]/10 blur-[100px]"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, delay: 1 }}
        className="pointer-events-none absolute right-[8%] top-[25%] h-56 w-56 rounded-full bg-[#f7df1e]/8 blur-[90px]"
      />
      <motion.div
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="pointer-events-none absolute bottom-[20%] left-[20%] h-48 w-48 rounded-full bg-[#2496ed]/10 blur-[85px]"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 11, repeat: Infinity, delay: 0.5 }}
        className="pointer-events-none absolute bottom-[30%] right-[15%] h-40 w-40 rounded-full bg-[#00ADD8]/10 blur-[75px]"
      />
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, delay: 1.5 }}
        className="pointer-events-none absolute left-[40%] top-[8%] h-36 w-36 rounded-full bg-[#61dafb]/8 blur-[70px]"
      />
    </>
  );
}

export function FloatingTechLayer({
  variant,
  badges,
  snippets = [],
}: {
  variant: "hero" | "editor" | "ambient";
  badges: FloatingTechBadge[];
  snippets?: readonly Snippet[];
}) {
  const { preferLightEffects } = useDeviceProfile();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        variant === "editor" ? "z-0" : ""
      }`}
      aria-hidden
    >
      <AmbientGlow variant={variant} staticMotion={preferLightEffects} />
      {badges.map((badge) => (
        <TechBadge
          key={badge.id}
          badge={badge}
          variant={variant}
          staticMotion={preferLightEffects}
        />
      ))}
      {snippets.map((snippet, i) => (
        <CodeSnippet
          key={`${snippet.text}-${i}`}
          snippet={snippet}
          variant={variant}
          staticMotion={preferLightEffects}
        />
      ))}
    </div>
  );
}

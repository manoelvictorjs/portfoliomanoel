"use client";

/** Lista de skills agrupadas por nível da jornada (mastered / growing / exploring). */

import {
  journeyLevelMeta,
  journeyPhases,
  type JourneyLevel,
} from "@/content/fullstack-journey";

const LEVEL_ORDER: JourneyLevel[] = ["mastered", "growing", "exploring"];

function skillsByLevel(level: JourneyLevel): string[] {
  return journeyPhases
    .filter((p) => p.level === level)
    .flatMap((p) => p.skills);
}

export function FullStackTree() {
  return (
    <div className="max-w-3xl space-y-8">
      {LEVEL_ORDER.map((level) => {
        const meta = journeyLevelMeta[level];
        const skills = skillsByLevel(level);
        return (
          <div key={level}>
            <p
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: meta.color }}
            >
              {meta.label}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {skills.join(" · ")}
            </p>
          </div>
        );
      })}
    </div>
  );
}

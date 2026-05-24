"use client";

import { techMarqueeItems } from "@/content/tech-code-samples";
import { SkillIcon, type SkillIconId } from "@/shared/ui/SkillIcon";

const MARQUEE_ICONS: Record<string, SkillIconId> = {
  TypeScript: "typescript",
  JavaScript: "javascript",
  Go: "go",
  "Next.js": "nextjs",
  "React 19": "react",
  Docker: "docker",
  Linux: "linux",
  "Node.js": "nodejs",
  "REST APIs": "api",
};

export function TechMarquee() {
  const items = [...techMarqueeItems, ...techMarqueeItems];

  return (
    <div className="marquee-mask relative overflow-hidden border-y border-white/5 bg-[#05070e]/80 py-3.5">
      <div className="marquee-track flex w-max items-center gap-6">
        {items.map((item, i) => {
          const iconId = MARQUEE_ICONS[item.label];
          return (
            <span
              key={`${item.label}-${i}`}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-300"
            >
              {iconId ? (
                <SkillIcon id={iconId} size={18} />
              ) : (
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              )}
              {item.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

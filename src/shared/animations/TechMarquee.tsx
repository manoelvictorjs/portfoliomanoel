"use client";

import { techMarqueeItems } from "@/content/tech-code-samples";

export function TechMarquee() {
  const items = [...techMarqueeItems, ...techMarqueeItems];

  return (
    <div className="marquee-mask relative overflow-hidden border-y border-white/5 bg-black/30 py-4">
      <div className="marquee-track flex w-max gap-8">
        {items.map((item, i) => (
          <span
            key={`${item.label}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium"
            style={{ color: item.color }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
            />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

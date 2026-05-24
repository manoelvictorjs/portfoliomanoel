"use client";

import { heroScrollCtas } from "@/content/hero-ctas";
import { ScrollButton } from "@/shared/ui/ScrollButton";
import type { ScrollCta } from "@/types/content";

type Props = {
  items?: ScrollCta[];
  className?: string;
};

/** Lista de CTAs de scroll — padrão: hero; passe `items` para reutilizar em outras seções */
export function ScrollCtaList({
  items = heroScrollCtas,
  className = "flex flex-wrap items-center gap-5",
}: Props) {
  return (
    <div className={className}>
      {items.map((cta) => (
        <ScrollButton key={cta.id} href={cta.href} variant={cta.variant}>
          {cta.label}
        </ScrollButton>
      ))}
    </div>
  );
}

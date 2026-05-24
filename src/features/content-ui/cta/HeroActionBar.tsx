"use client";

import type { ScrollCta } from "@/types/content";
import { DownloadPlacement } from "../downloads/DownloadPlacement";
import { ScrollCtaList } from "./ScrollCtaList";

type Props = {
  scrollCtas?: ScrollCta[];
  className?: string;
};

/** Barra de ações do hero: scroll CTAs + downloads do placement `hero` */
export function HeroActionBar({ scrollCtas, className = "mt-10" }: Props) {
  return (
    <div className={`flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center ${className}`}>
      <ScrollCtaList items={scrollCtas} className="flex flex-wrap items-center gap-5" />
      <DownloadPlacement
        placement="hero"
        mode="buttons"
        buttonOptions={{ variant: "ghost" }}
      />
    </div>
  );
}

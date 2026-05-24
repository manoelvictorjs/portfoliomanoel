"use client";

import { SITE_SECTIONS } from "@/config/site";
import { DownloadPlacement } from "../downloads/DownloadPlacement";

type Props = {
  /** desktop: downloads compactos + botão contato */
  layout?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function NavActions({ layout = "desktop", onNavigate }: Props) {
  if (layout === "mobile") {
    return (
      <div className="mt-4 flex flex-col gap-2">
        <DownloadPlacement
          placement="nav"
          mode="buttons"
          className="flex-col gap-2"
          buttonOptions={{
            variant: "primary",
            className: "w-full rounded-xl! py-3!",
          }}
        />
        <a
          href={`#${SITE_SECTIONS.contact}`}
          onClick={onNavigate}
          className="btn-ghost rounded-xl px-4 py-3 text-center text-sm"
        >
          Falar comigo
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <DownloadPlacement
        placement="nav"
        mode="buttons"
        buttonOptions={{
          variant: "ghost",
          className: "hidden px-4! py-2! text-xs md:inline-flex",
          showIcon: false,
        }}
      />
      <a
        href={`#${SITE_SECTIONS.contact}`}
        className="btn-primary hidden rounded-full px-5 py-2.5 text-sm sm:inline-flex"
      >
        Contato
      </a>
    </div>
  );
}

"use client";

import { getDownloadsForPlacement } from "@/content/downloads";
import type { DownloadPlacement as Placement } from "@/types/content";
import { DownloadButton, type DownloadButtonProps } from "./DownloadButton";
import { DownloadCard } from "./DownloadCard";

type ButtonOptions = Pick<
  DownloadButtonProps,
  "variant" | "className" | "showIcon"
>;

type Props = {
  placement: Placement;
  /** Botões inline ou cards promocionais */
  mode: "buttons" | "cards";
  className?: string;
  buttonOptions?: ButtonOptions;
};

/**
 * Renderiza todos os downloads do catálogo para um placement.
 * Adicionar PDF = só editar `content/downloads.ts` — este componente atualiza sozinho.
 */
export function DownloadPlacement({
  placement,
  mode,
  className = "",
  buttonOptions,
}: Props) {
  const items = getDownloadsForPlacement(placement);
  if (items.length === 0) return null;

  if (mode === "cards") {
    return (
      <div className={`flex flex-col gap-6 ${className}`}>
        {items.map((item) => (
          <DownloadCard key={item.id} download={item} />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {items.map((item) => (
        <DownloadButton
          key={item.id}
          download={item}
          variant={buttonOptions?.variant ?? "ghost"}
          className={buttonOptions?.className}
          showIcon={buttonOptions?.showIcon ?? true}
        />
      ))}
    </div>
  );
}

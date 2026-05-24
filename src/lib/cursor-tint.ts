import { CURSOR_SECTION_TINTS, CURSOR_TINT_DEFAULT } from "@/config";

/** Converte #rrggbb em "r, g, b" para uso em rgba() */
export function hexToRgbComponents(hex: string): string | null {
  const normalized = hex.trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return null;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

/**
 * Cor da luz do cursor conforme o elemento sob o ponteiro.
 * Prioridade: data-cursor-tint → seção (id) → padrão teal.
 */
export function resolveCursorTint(clientX: number, clientY: number): string {
  if (typeof document === "undefined") return CURSOR_TINT_DEFAULT;

  const target = document.elementFromPoint(clientX, clientY);
  if (!target) return CURSOR_TINT_DEFAULT;

  const explicit = target.closest<HTMLElement>("[data-cursor-tint]");
  if (explicit?.dataset.cursorTint) {
    return explicit.dataset.cursorTint;
  }

  const section = target.closest<HTMLElement>("section[id], footer[id], main[id]");
  const sectionId = section?.id;
  if (sectionId && CURSOR_SECTION_TINTS[sectionId]) {
    return CURSOR_SECTION_TINTS[sectionId];
  }

  return CURSOR_TINT_DEFAULT;
}

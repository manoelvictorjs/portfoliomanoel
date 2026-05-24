"use client";

import { SCROLL_TOP_RESET_PX, VIEWPORT_CENTER_RATIO } from "@/config";
import { useEffect, useState, type RefObject } from "react";

type Options = {
  /** Primeiro nó da trilha permanece aceso sem scroll */
  alwaysOn?: boolean;
};

/**
 * Estado “aceso” para ícones na trilha de scroll (PageFloatingTech).
 * Quando o centro do elemento passa pela metade da viewport, liga e mantém até o topo.
 */
export function useIconCenterLit(
  ref: RefObject<HTMLElement | null>,
  options: Options = {},
) {
  const { alwaysOn = false } = options;
  const [latched, setLatched] = useState(false);

  useEffect(() => {
    if (alwaysOn) return;

    const el = ref.current;
    if (!el) return;

    let latchedLocal = false;

    const sync = () => {
      if (window.scrollY <= SCROLL_TOP_RESET_PX) {
        latchedLocal = false;
        setLatched(false);
        return;
      }

      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportMid = window.innerHeight * VIEWPORT_CENTER_RATIO;

      if (centerY <= viewportMid) {
        latchedLocal = true;
      }

      setLatched(latchedLocal);
    };

    const frameId = requestAnimationFrame(sync);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [alwaysOn, ref]);

  return alwaysOn || latched;
}

"use client";

import { useEffect, useState } from "react";

export type DeviceProfile = {
  /** Viewport estreita ou pointer coarse (celular/tablet) */
  isMobile: boolean;
  /** Desliga 3D, parallax, trilha de scroll e animações contínuas */
  preferLightEffects: boolean;
  /** Mouse preciso (desktop) — luz do cursor e clique “poder” */
  finePointer: boolean;
};

const MOBILE_DEFAULT: DeviceProfile = {
  isMobile: true,
  preferLightEffects: true,
  finePointer: false,
};

/**
 * Perfil do dispositivo para ligar/desligar efeitos pesados.
 * Default mobile-first evita flash de animações no SSR/hidratação.
 */
export function useDeviceProfile(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>(MOBILE_DEFAULT);

  useEffect(() => {
    const mqNarrow = window.matchMedia("(max-width: 767px)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const isMobile = mqNarrow.matches || mqCoarse.matches;
      const preferLightEffects = isMobile || mqReduced.matches;
      const finePointer = mqFine.matches && !mqCoarse.matches && !isMobile;
      setProfile({ isMobile, preferLightEffects, finePointer });
    };

    sync();
    mqNarrow.addEventListener("change", sync);
    mqCoarse.addEventListener("change", sync);
    mqFine.addEventListener("change", sync);
    mqReduced.addEventListener("change", sync);

    return () => {
      mqNarrow.removeEventListener("change", sync);
      mqCoarse.removeEventListener("change", sync);
      mqFine.removeEventListener("change", sync);
      mqReduced.removeEventListener("change", sync);
    };
  }, []);

  return profile;
}

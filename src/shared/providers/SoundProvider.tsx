"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { playKeyTick, playResponseBlip } from "@/lib/sound/click";

type SoundContextValue = {
  muted: boolean;
  toggleMute: () => void;
  tick: () => void;
  blip: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);
const STORAGE_KEY = "portfolio-sound-muted";

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setMuted(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }, []);

  const tick = useCallback(() => {
    if (!muted) playKeyTick();
  }, [muted]);

  const blip = useCallback(() => {
    if (!muted) playResponseBlip();
  }, [muted]);

  return (
    <SoundContext.Provider value={{ muted, toggleMute, tick, blip }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}

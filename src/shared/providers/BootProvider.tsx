"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SystemStatus = "offline" | "booting" | "healthy";

type BootContextValue = {
  status: SystemStatus;
  boot: () => void;
  introComplete: boolean;
  completeIntro: () => void;
};

const BootContext = createContext<BootContextValue | null>(null);

const INTRO_KEY = "portfolio-intro-v2";

function shouldSkipIntro(): boolean {
  if (typeof window === "undefined") return false;
  const seen = sessionStorage.getItem(INTRO_KEY);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return Boolean(seen || reduced);
}

export function BootProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<SystemStatus>("offline");
  const [introComplete, setIntroComplete] = useState(shouldSkipIntro);

  const completeIntro = useCallback(() => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setIntroComplete(true);
  }, []);

  const boot = useCallback(() => {
    if (status === "healthy") return;
    setStatus("booting");
    window.setTimeout(() => setStatus("healthy"), 2200);
  }, [status]);

  const value = useMemo(
    () => ({
      status,
      boot,
      introComplete,
      completeIntro,
    }),
    [status, boot, introComplete, completeIntro],
  );

  return <BootContext.Provider value={value}>{children}</BootContext.Provider>;
}

export function useBoot() {
  const ctx = useContext(BootContext);
  if (!ctx) throw new Error("useBoot must be used within BootProvider");
  return ctx;
}

export function useBootOptional() {
  return useContext(BootContext);
}

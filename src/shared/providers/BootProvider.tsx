"use client";



import {

  createContext,

  useCallback,

  useContext,

  useLayoutEffect,

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



export function BootProvider({ children }: { children: ReactNode }) {

  const [status, setStatus] = useState<SystemStatus>("offline");

  const [introComplete, setIntroComplete] = useState(false);

  const [skipIntro, setSkipIntro] = useState(false);



  useLayoutEffect(() => {

    const seen = sessionStorage.getItem(INTRO_KEY);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduced) {

      setSkipIntro(true);

      setIntroComplete(true);

    }

  }, []);



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

      introComplete: skipIntro || introComplete,

      completeIntro,

    }),

    [status, boot, skipIntro, introComplete, completeIntro],

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



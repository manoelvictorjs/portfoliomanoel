"use client";

import { INTRO_BOOT } from "@/config";
import { introBootCode, introBootLogs } from "@/content/page-intro-sequence";
import { useEffect, useRef, useState } from "react";

type LogLine = (typeof introBootLogs)[number];

type RunSignal = {
  cancelled: boolean;
  timeouts: number[];
};

function delay(ms: number, signal: RunSignal) {
  return new Promise<void>((resolve) => {
    const id = window.setTimeout(() => {
      if (!signal.cancelled) resolve();
    }, ms);
    signal.timeouts.push(id);
  });
}

type Options = {
  active: boolean;
  reduced: boolean;
  onComplete: () => void;
};

export function useIntroBootSequence({ active, reduced, onComplete }: Options) {
  const [logLines, setLogLines] = useState<LogLine[]>([]);
  const [codeText, setCodeText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!active) return;

    const signal: RunSignal = { cancelled: false, timeouts: [] };

    const finish = () => {
      if (signal.cancelled) return;
      setProgress(1);
      setShowCursor(false);
      onCompleteRef.current();
    };

    const run = async () => {
      const started = Date.now();
      const totalLogs = introBootLogs.length;
      const codeLen = introBootCode.length;

      if (reduced) {
        await delay(200, signal);
        if (signal.cancelled) return;
        setLogLines([...introBootLogs]);
        setCodeText(introBootCode);
        setProgress(1);
        await delay(INTRO_BOOT.reducedTotalMs, signal);
        finish();
        return;
      }

      await delay(INTRO_BOOT.initialDelayMs, signal);

      for (let i = 0; i < totalLogs; i++) {
        if (signal.cancelled) return;
        const next = introBootLogs[i];
        setLogLines((prev) => [...prev, next]);
        setProgress((i + 1) / (totalLogs + codeLen * 0.15) * 0.45);
        if (next.text) await delay(INTRO_BOOT.logLineMs, signal);
        else await delay(INTRO_BOOT.logLineMs * 0.35, signal);
      }

      for (let i = 0; i <= codeLen; i++) {
        if (signal.cancelled) return;
        setCodeText(introBootCode.slice(0, i));
        setProgress(0.45 + (i / codeLen) * 0.5);
        if (i < codeLen) await delay(INTRO_BOOT.charMs, signal);
      }

      await delay(INTRO_BOOT.afterCodeMs, signal);

      const elapsed = Date.now() - started;
      const remaining = Math.max(0, INTRO_BOOT.minTotalMs - elapsed);
      if (remaining > 0) await delay(remaining, signal);

      finish();
    };

    void run();

    return () => {
      signal.cancelled = true;
      signal.timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [active, reduced]);

  return { logLines, codeText, showCursor, progress };
}

"use client";

import type { SystemStatsPayload } from "@/lib/server/system-stats";
import { useEffect, useState } from "react";

export function useTelemetryStream(enabled: boolean) {
  const [stats, setStats] = useState<SystemStatsPayload | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const es = new EventSource("/api/system-stats/stream");

    es.onopen = () => {
      setConnected(true);
      setError(null);
    };

    es.onmessage = (ev) => {
      try {
        const parsed = JSON.parse(ev.data) as {
          ok?: boolean;
          data?: SystemStatsPayload;
          error?: boolean;
          message?: string;
        };
        if (parsed.data) setStats(parsed.data);
        if (parsed.error) setError(parsed.message ?? "stream error");
      } catch {
        setError("parse error");
      }
    };

    es.onerror = () => {
      setConnected(false);
      setError("reconnecting…");
    };

    return () => es.close();
  }, [enabled]);

  return { stats, connected, error };
}

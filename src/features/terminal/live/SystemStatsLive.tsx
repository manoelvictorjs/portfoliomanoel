"use client";

import type { SystemStatsPayload } from "@/lib/server/system-stats";
import { useEffect, useState } from "react";

export function SystemStatsLive() {
  const [stats, setStats] = useState<SystemStatsPayload | null>(null);
  const [phase, setPhase] = useState<"loading" | "live" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const es = new EventSource("/api/system-stats/stream");

    es.onmessage = (ev) => {
      try {
        const parsed = JSON.parse(ev.data) as { data?: SystemStatsPayload };
        if (parsed.data) {
          setStats(parsed.data);
          setPhase("live");
          setError(null);
        }
      } catch {
        setError("Falha ao interpretar stream");
        setPhase("error");
      }
    };

    es.onerror = () => {
      setError("Conexão SSE interrompida — tentando reconectar…");
    };

    return () => es.close();
  }, []);

  if (phase === "loading") {
    return (
      <div className="space-y-1 text-zinc-400">
        <p className="text-amber-300/90">FETCHING LIVE DATA FROM VPS…</p>
        <p className="animate-pulse">▸ Aguardando telemetria…</p>
      </div>
    );
  }

  if (!stats) {
    return <p className="text-amber-300/90">{error ?? "Sem dados"}</p>;
  }

  const bar = (pct: number) => {
    const filled = Math.round(pct / 10);
    return "█".repeat(filled) + "░".repeat(10 - filled);
  };

  return (
    <div className="space-y-2 text-zinc-300">
      <p className="text-emerald-400/90">[✓] Connection established ({stats.source})</p>
      <p>
        <span className="text-zinc-500">host </span>
        {stats.hostname}
        <span className="text-zinc-600"> · </span>
        {stats.platform}
      </p>
      <p>
        <span className="text-zinc-500">cpu </span>
        [{bar(stats.cpuLoad)}] {stats.cpuLoad}% ({stats.cpuCores} cores)
      </p>
      <p>
        <span className="text-zinc-500">ram </span>
        [{bar(stats.memoryPercent)}] {stats.memoryUsedGb}GB /{" "}
        {stats.memoryTotalGb}GB ({stats.memoryPercent}%)
      </p>
      <p>
        <span className="text-zinc-500">uptime </span>
        {stats.uptimeHuman}
      </p>
      <p className="text-zinc-600 text-[10px]">
        node {stats.nodeVersion} · {new Date(stats.timestamp).toLocaleTimeString()}
      </p>
      {error && <p className="text-amber-400/80 text-[10px]">{error}</p>}
    </div>
  );
}

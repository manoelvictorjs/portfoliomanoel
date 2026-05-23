"use client";

import type { DockerStatRow } from "@/lib/server/docker-stats";
import { useEffect, useState } from "react";

export function DockerStatsLive() {
  const [rows, setRows] = useState<DockerStatRow[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [source, setSource] = useState<string>("");

  useEffect(() => {
    const es = new EventSource("/api/docker/stats/stream");

    es.onmessage = (ev) => {
      try {
        const parsed = JSON.parse(ev.data) as {
          data?: {
            containers: DockerStatRow[];
            message?: string;
            source?: string;
          };
        };
        if (parsed.data) {
          setRows(parsed.data.containers);
          setMessage(parsed.data.message ?? null);
          setSource(parsed.data.source ?? "");
        }
      } catch {
        setMessage("Erro no stream Docker");
      }
    };

    return () => es.close();
  }, []);

  if (rows.length === 0) {
    return (
      <div className="text-zinc-400">
        <p className="text-cyan-300/80 animate-pulse">Streaming docker stats…</p>
        {message && (
          <p className="mt-2 text-amber-300/80 text-[10px]">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <p className="mb-2 text-[10px] text-emerald-400/80">
        LIVE · {source} · refresh 2s
      </p>
      <table className="w-full min-w-[480px] border-collapse text-left text-[10px]">
        <thead>
          <tr className="border-b border-white/10 text-zinc-500">
            <th className="py-1 pr-2">NAME</th>
            <th className="py-1 pr-2">CPU</th>
            <th className="py-1 pr-2">MEM</th>
            <th className="py-1">NET</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id + r.name} className="border-b border-white/5">
              <td className="py-1.5 pr-2 text-cyan-300/90">
                {r.name}
                <span className="block text-zinc-600">{r.image}</span>
              </td>
              <td className="py-1.5 pr-2 text-amber-200/90">{r.cpuPercent}</td>
              <td className="py-1.5 pr-2 text-emerald-300/80">
                {r.memUsage}
                <span className="text-zinc-600"> ({r.memPercent})</span>
              </td>
              <td className="py-1.5 text-zinc-500">{r.netIO}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

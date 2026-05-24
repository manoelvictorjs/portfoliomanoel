"use client";

import { useEffect, useState } from "react";

type PingData = {
  ok: boolean;
  latencyMs?: number;
  serverTime?: string;
  node?: string;
  error?: string;
};

export function PingLive() {
  const [data, setData] = useState<PingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const started = performance.now();
      try {
        const res = await fetch("/api/ping", { cache: "no-store" });
        const json = (await res.json()) as {
          ok?: boolean;
          latencyMs?: number;
          serverTime?: string;
          node?: string;
        };
        const clientMs = Math.round(performance.now() - started);
        if (!cancelled) {
          setData({
            ok: res.ok && Boolean(json.ok),
            latencyMs: json.latencyMs ?? clientMs,
            serverTime: json.serverTime,
            node: json.node,
          });
        }
      } catch {
        if (!cancelled) {
          setData({ ok: false, error: "Falha ao contactar /api/ping" });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="text-zinc-500">GET /api/ping …</p>;
  }

  if (!data?.ok) {
    return (
      <p className="text-amber-300/90">
        ✗ {data?.error ?? "API indisponível"}
      </p>
    );
  }

  return (
    <ul className="space-y-1 text-zinc-300">
      <li>
        <span className="text-emerald-400">✓</span> pong ·{" "}
        <span className="text-cyan-300">{data.latencyMs}ms</span> (servidor)
      </li>
      {data.serverTime && (
        <li className="text-zinc-500">serverTime: {data.serverTime}</li>
      )}
      {data.node && <li className="text-zinc-500">node: {data.node}</li>}
    </ul>
  );
}

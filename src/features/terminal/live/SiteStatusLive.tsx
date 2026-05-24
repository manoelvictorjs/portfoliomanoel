"use client";

import { profile } from "@/content/profile";
import { useEffect, useState } from "react";

type Check = {
  label: string;
  ok: boolean;
  detail: string;
};

export function SiteStatusLive() {
  const [checks, setChecks] = useState<Check[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const results: Check[] = [];

      try {
        const t0 = performance.now();
        const pingRes = await fetch("/api/ping", { cache: "no-store" });
        const ping = (await pingRes.json()) as { ok?: boolean; latencyMs?: number };
        results.push({
          label: "API ping",
          ok: pingRes.ok && Boolean(ping.ok),
          detail: pingRes.ok
            ? `${ping.latencyMs ?? Math.round(performance.now() - t0)}ms`
            : `HTTP ${pingRes.status}`,
        });
      } catch {
        results.push({ label: "API ping", ok: false, detail: "offline" });
      }

      try {
        const profileRes = await fetch("/api/profile", { cache: "no-store" });
        const body = profileRes.ok
          ? ((await profileRes.json()) as {
              ok?: boolean;
              data?: { headline?: string };
            })
          : null;
        results.push({
          label: "Perfil público",
          ok: profileRes.ok && Boolean(body?.ok),
          detail: body?.data?.headline ?? `HTTP ${profileRes.status}`,
        });
      } catch {
        results.push({ label: "Perfil público", ok: false, detail: "offline" });
      }

      results.push({
        label: "Contato",
        ok: true,
        detail: profile.email,
      });

      if (!cancelled) setChecks(results);
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!checks) {
    return <p className="text-zinc-500">Verificando endpoints…</p>;
  }

  return (
    <ul className="space-y-1.5">
      {checks.map((c) => (
        <li key={c.label} className="flex flex-wrap gap-x-2 text-zinc-300">
          <span className={c.ok ? "text-emerald-400" : "text-amber-400"}>
            {c.ok ? "✓" : "✗"}
          </span>
          <span className="text-zinc-500">{c.label}</span>
          <span>{c.detail}</span>
        </li>
      ))}
    </ul>
  );
}

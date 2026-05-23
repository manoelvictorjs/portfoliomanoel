"use client";

import { useEffect, useState } from "react";

type Suite = {
  file: string;
  durationMs: number;
  status: string;
  tests?: number;
  githubUrl?: string;
};

type Report = {
  summary: { total: number; passed: number; failed: number; durationMs: number };
  coverage: { lines: number; branches: number; functions: number; statements: number };
  suites: Suite[];
  source?: string;
};

export function TestReportLive() {
  const [report, setReport] = useState<Report | null>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    fetch("/api/tests/report")
      .then((r) => r.json())
      .then(setReport);
  }, []);

  useEffect(() => {
    if (!report) return;
    const max = report.suites.length;
    if (phase >= max) return;
    const t = setTimeout(() => setPhase((p) => p + 1), 280);
    return () => clearTimeout(t);
  }, [report, phase]);

  if (!report) {
    return (
      <p className="animate-pulse text-zinc-500">
        npm test --watch · inicializando Vitest…
      </p>
    );
  }

  const visible = report.suites.slice(0, phase);

  return (
    <div className="space-y-3">
      <p className="text-zinc-500 text-[10px]">
        $ vitest run · source: {report.source ?? "manifest"}
      </p>
      <ul className="space-y-1 text-[11px]">
        {visible.map((s) => (
          <li key={s.file} className="text-emerald-400/90">
            ✓ {s.file} ({s.durationMs}ms)
            {s.githubUrl && (
              <a
                href={s.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-cyan-400/80 hover:underline"
              >
                [github]
              </a>
            )}
          </li>
        ))}
        {phase < report.suites.length && (
          <li className="animate-pulse text-zinc-600">▸ running…</li>
        )}
      </ul>
      {phase >= report.suites.length && (
        <div className="rounded border border-emerald-500/20 bg-emerald-500/5 p-3 text-[10px]">
          <p className="text-emerald-400">
            {report.summary.passed}/{report.summary.total} passed ·{" "}
            {report.summary.durationMs}ms
          </p>
          <p className="mt-2 text-zinc-400">
            Coverage — lines {report.coverage.lines}% · branches{" "}
            {report.coverage.branches}% · functions {report.coverage.functions}%
          </p>
        </div>
      )}
    </div>
  );
}

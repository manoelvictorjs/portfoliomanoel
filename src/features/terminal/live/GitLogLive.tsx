"use client";

import { useEffect, useState } from "react";

type Commit = {
  shortSha: string;
  author: string;
  message: string;
  date: string;
  url: string;
};

export function GitLogLive() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [repo, setRepo] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/github/commits")
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok) {
          setError(data.error ?? "GitHub API indisponível");
          return;
        }
        setRepo(data.repo ?? "");
        setCommits(data.commits ?? []);
      })
      .catch(() => setError("Falha ao buscar commits"));
  }, []);

  if (error) {
    return <p className="text-amber-300/90">{error}</p>;
  }

  if (commits.length === 0) {
    return <p className="animate-pulse text-zinc-500">git fetch origin…</p>;
  }

  return (
    <div className="space-y-2">
      <p className="text-[10px] text-zinc-500">
        repo: <span className="text-cyan-400/90">{repo}</span> · live from GitHub API
      </p>
      <div className="space-y-1.5 font-mono text-[11px]">
        {commits.map((c) => (
          <div key={c.shortSha} className="flex gap-2">
            <span className="text-amber-300/90 shrink-0">{c.shortSha}</span>
            <span className="text-zinc-600 shrink-0">({c.author})</span>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-200/90 hover:text-cyan-300 hover:underline truncate"
            >
              {c.message}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

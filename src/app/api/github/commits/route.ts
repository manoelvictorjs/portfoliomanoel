import { clientIp, rateLimit } from "@/lib/server/rate-limit";
import { NextResponse } from "next/server";

export type GitCommit = {
  sha: string;
  shortSha: string;
  author: string;
  date: string;
  message: string;
  url: string;
};

function parseRepo(): { owner: string; repo: string } | null {
  const explicit = process.env.GITHUB_REPO;
  if (explicit?.includes("/")) {
    const [owner, repo] = explicit.split("/");
    if (owner && repo) return { owner, repo };
  }

  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? "";
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (match) return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
  return null;
}

export async function GET(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`github:${ip}`, 20, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfter: limited.retryAfter },
      { status: 429 },
    );
  }

  const parsed = parseRepo();
  if (!parsed) {
    return NextResponse.json(
      {
        ok: false,
        error: "GITHUB_REPO não configurado",
        commits: [] as GitCommit[],
      },
      { status: 400 },
    );
  }

  const { owner, repo } = parsed;
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?per_page=12`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "User-Agent": "living-dev-portfolio",
      },
      next: { revalidate: 120 },
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, error: `GitHub API ${res.status}`, commits: [] },
      { status: res.status },
    );
  }

  const raw = (await res.json()) as {
    sha: string;
    html_url: string;
    commit: {
      author: { name?: string; date?: string };
      message: string;
    };
  }[];

  const commits: GitCommit[] = raw.map((c) => ({
    sha: c.sha,
    shortSha: c.sha.slice(0, 7),
    author: c.commit.author.name ?? owner,
    date: c.commit.author.date ?? new Date().toISOString(),
    message: c.commit.message.split("\n")[0] ?? "",
    url: c.html_url,
  }));

  return NextResponse.json({
    ok: true,
    repo: `${owner}/${repo}`,
    commits,
    fetchedAt: new Date().toISOString(),
  });
}

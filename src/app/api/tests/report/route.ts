import { githubTestUrl, testManifest } from "@/content/test-manifest";
import { clientIp, rateLimit } from "@/lib/server/rate-limit";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

async function loadGeneratedReport() {
  try {
    const file = path.join(process.cwd(), "public", "test-report.json");
    const raw = await readFile(file, "utf-8");
    return JSON.parse(raw) as typeof testManifest;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`tests:${ip}`, 20, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfter: limited.retryAfter },
      { status: 429 },
    );
  }

  const generated = await loadGeneratedReport();
  const manifest = generated ?? testManifest;

  const suites = manifest.suites.map((s) => ({
    ...s,
    githubUrl: githubTestUrl(s.githubPath),
  }));

  return NextResponse.json({
    ok: true,
    source: generated ? "vitest-json" : "manifest",
    ...manifest,
    suites,
    runCommand: "npm run test:report",
    watchCommand: "npm run test:watch",
  });
}

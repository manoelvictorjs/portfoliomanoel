import { clientIp, rateLimit } from "@/lib/server/rate-limit";
import { getDockerStats } from "@/lib/server/docker-stats";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`docker-stats:${ip}`, 30, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfter: limited.retryAfter },
      { status: 429 },
    );
  }

  const data = await getDockerStats();
  return NextResponse.json(
    { ok: true, data },
    { headers: { "Cache-Control": "no-store" } },
  );
}

import { clientIp, rateLimit } from "@/lib/server/rate-limit";
import { getSystemStats } from "@/lib/server/system-stats";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`system-stats:${ip}`, 40, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfter: limited.retryAfter },
      { status: 429 },
    );
  }

  const data = await getSystemStats();
  return NextResponse.json(
    { ok: true, data },
    { headers: { "Cache-Control": "no-store" } },
  );
}

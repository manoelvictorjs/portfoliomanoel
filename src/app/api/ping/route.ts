import { clientIp, rateLimit } from "@/lib/server/rate-limit";
import { createPingPayload } from "@/lib/server/services/ping.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`ping:${ip}`, 60, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfter: limited.retryAfter },
      { status: 429 },
    );
  }

  const started = Date.now();
  const payload = createPingPayload(started);
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "no-store",
      "X-Server-Timing": `${payload.latencyMs}`,
    },
  });
}

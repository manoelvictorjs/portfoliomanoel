import { clientIp, rateLimit } from "@/lib/server/rate-limit";
import { createProfileResponse } from "@/lib/server/services/profile.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`profile:${ip}`, 40, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfter: limited.retryAfter },
      { status: 429 },
    );
  }

  return NextResponse.json(createProfileResponse(), {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

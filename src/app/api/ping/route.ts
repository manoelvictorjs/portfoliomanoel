import { createPingPayload } from "@/lib/server/services/ping.service";
import { NextResponse } from "next/server";

export async function GET() {
  const started = Date.now();
  const payload = createPingPayload(started);
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "no-store",
      "X-Server-Timing": `${payload.latencyMs}`,
    },
  });
}

import { clientIp, rateLimit } from "@/lib/server/rate-limit";
import { createSseStream, SSE_HEADERS } from "@/lib/server/sse";
import { getSystemStats } from "@/lib/server/system-stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`system-stats-stream:${ip}`, 8, 60_000);
  if (!limited.ok) {
    return new Response(
      JSON.stringify({ error: "rate_limited", retryAfter: limited.retryAfter }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  const stream = createSseStream(
    async () => ({ ok: true, data: await getSystemStats() }),
    2000,
  );

  return new Response(stream, { headers: SSE_HEADERS });
}

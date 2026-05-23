import { clientIp, rateLimit } from "@/lib/server/rate-limit";
import { runAgentChat } from "@/lib/server/agent";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`agent:${ip}`, 15, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfter: limited.retryAfter },
      { status: 429 },
    );
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const messages = (body.messages ?? [])
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: String(m.content).slice(0, 2000),
    }))
    .slice(-12);

  if (!messages.some((m) => m.role === "user")) {
    return NextResponse.json({ error: "no_user_message" }, { status: 400 });
  }

  try {
    const result = await runAgentChat(messages);
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    const message = e instanceof Error ? e.message : "agent_error";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}

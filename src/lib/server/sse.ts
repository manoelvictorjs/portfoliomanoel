export function createSseStream(
  tick: () => Promise<unknown>,
  intervalMs: number,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let timer: ReturnType<typeof setInterval> | null = null;
  let closed = false;

  return new ReadableStream({
    async start(controller) {
      const push = async () => {
        if (closed) return;
        try {
          const data = await tick();
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`),
          );
        } catch (e) {
          const message = e instanceof Error ? e.message : "stream error";
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: true, message })}\n\n`,
            ),
          );
        }
      };

      await push();
      timer = setInterval(push, intervalMs);
    },
    cancel() {
      closed = true;
      if (timer) clearInterval(timer);
    },
  });
}

export const SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
} as const;

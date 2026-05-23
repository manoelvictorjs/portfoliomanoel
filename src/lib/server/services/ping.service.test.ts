import { describe, expect, it } from "vitest";
import { createPingPayload } from "./ping.service";

describe("createPingPayload", () => {
  it("returns ok pong with timing", () => {
    const started = Date.now();
    const payload = createPingPayload(started);
    expect(payload.ok).toBe(true);
    expect(payload.pong).toBe(true);
    expect(payload.latencyMs).toBeGreaterThanOrEqual(0);
    expect(payload.serverTime).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(payload.node).toMatch(/^v\d+/);
  });
});

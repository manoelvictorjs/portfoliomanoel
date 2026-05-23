import { describe, expect, it } from "vitest";
import { clientIp, rateLimit } from "./rate-limit";

describe("rateLimit", () => {
  it("allows requests under the limit", () => {
    const key = `test-allow-${Date.now()}`;
    expect(rateLimit(key, 3, 60_000).ok).toBe(true);
    expect(rateLimit(key, 3, 60_000).ok).toBe(true);
    expect(rateLimit(key, 3, 60_000).ok).toBe(true);
  });

  it("blocks after exceeding the limit", () => {
    const key = `test-block-${Date.now()}`;
    rateLimit(key, 2, 60_000);
    rateLimit(key, 2, 60_000);
    const third = rateLimit(key, 2, 60_000);
    expect(third.ok).toBe(false);
    if (!third.ok) {
      expect(third.retryAfter).toBeGreaterThan(0);
    }
  });
});

describe("clientIp", () => {
  it("reads x-forwarded-for first hop", () => {
    const req = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.1, 10.0.0.1" },
    });
    expect(clientIp(req)).toBe("203.0.113.1");
  });

  it("falls back to local", () => {
    expect(clientIp(new Request("http://localhost"))).toBe("local");
  });
});

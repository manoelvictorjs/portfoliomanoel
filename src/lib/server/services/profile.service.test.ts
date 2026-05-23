import { describe, expect, it } from "vitest";
import { createProfileResponse } from "./profile.service";

describe("createProfileResponse", () => {
  it("wraps professional summary with timestamp", () => {
    const res = createProfileResponse();
    expect(res.ok).toBe(true);
    expect(res.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(res.data.headline).toBeTruthy();
    expect(res.data.highlights.length).toBeGreaterThan(0);
  });
});

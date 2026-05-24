import { describe, expect, it, vi, afterEach } from "vitest";
import { readPublicEnv } from "./env";

describe("readPublicEnv", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns fallback when env is empty", () => {
    expect(readPublicEnv("NEXT_PUBLIC_TEST_X", "/default.pdf")).toBe(
      "/default.pdf",
    );
  });

  it("returns trimmed env value", () => {
    vi.stubEnv("NEXT_PUBLIC_TEST_X", "  /custom.pdf  ");
    expect(readPublicEnv("NEXT_PUBLIC_TEST_X", "/default.pdf")).toBe(
      "/custom.pdf",
    );
  });
});

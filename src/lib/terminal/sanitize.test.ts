import { describe, expect, it } from "vitest";
import { sanitizeTerminalInput } from "./sanitize";

describe("sanitizeTerminalInput", () => {
  it("removes script tags and angle brackets", () => {
    const out = sanitizeTerminalInput('<script>alert(1)</script>help');
    expect(out).not.toContain("<");
    expect(out).not.toContain(">");
    expect(out).toContain("help");
  });

  it("strips javascript: protocol", () => {
    expect(sanitizeTerminalInput("javascript:alert(1)")).not.toMatch(/javascript:/i);
  });

  it("limits to 200 characters", () => {
    expect(sanitizeTerminalInput("x".repeat(400)).length).toBe(200);
  });

  it("trims whitespace", () => {
    expect(sanitizeTerminalInput("  help  ")).toBe("help");
  });
});

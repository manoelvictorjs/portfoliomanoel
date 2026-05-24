import { describe, expect, it } from "vitest";
import { executeCommand, formatPrompt } from "./engine";
import { sanitizeTerminalInput } from "./sanitize";
import type { CommandContext } from "./types";

const baseCtx: CommandContext = { sessionHistory: [] };

describe("executeCommand", () => {
  it("help lists real actions", () => {
    const result = executeCommand("help", baseCtx);
    const text = result.entries[0]?.output;
    expect(text?.kind).toBe("text");
    if (text?.kind === "text") {
      expect(text.lines.some((l) => l.includes("email"))).toBe(true);
      expect(text.lines.some((l) => l.includes("ping"))).toBe(true);
    }
  });

  it("invalid command returns friendly message", () => {
    const result = executeCommand("foo-bar", baseCtx);
    expect(result.entries[0]?.type).toBe("error");
  });

  it("email copies profile email", () => {
    const result = executeCommand("email", baseCtx);
    expect(result.copyText).toContain("@");
  });

  it("linkedin opens url", () => {
    const result = executeCommand("linkedin", baseCtx);
    expect(result.openUrl).toMatch(/linkedin/i);
  });

  it("projetos returns projects list and scroll", () => {
    const result = executeCommand("projetos", baseCtx);
    expect(result.action).toBe("scroll-projects");
    expect(result.entries[0]?.output).toEqual({
      kind: "component",
      id: "projects-list",
    });
  });

  it("ping returns live component", () => {
    const result = executeCommand("ping", baseCtx);
    expect(result.entries[0]?.output).toEqual({
      kind: "component",
      id: "ping-live",
    });
  });

  it("clear triggers clear action", () => {
    expect(executeCommand("clear", baseCtx).action).toBe("clear");
  });

  it("formatPrompt is stable", () => {
    expect(formatPrompt()).toContain("portfolio");
  });

  it("system-stats returns live component", () => {
    const result = executeCommand("system-stats", baseCtx);
    expect(result.entries[0]?.output).toEqual({
      kind: "component",
      id: "system-stats-live",
    });
  });
});

describe("sanitizeTerminalInput", () => {
  it("strips script injection attempts", () => {
    const input = '<script>alert("x")</script>help';
    expect(sanitizeTerminalInput(input)).not.toContain("<");
  });

  it("limits length to 200 chars", () => {
    expect(sanitizeTerminalInput("a".repeat(300)).length).toBe(200);
  });
});

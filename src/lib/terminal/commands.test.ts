import { describe, expect, it } from "vitest";
import { executeCommand, formatPrompt } from "./engine";
import { sanitizeTerminalInput } from "./sanitize";
import type { CommandContext } from "./types";

const baseCtx: CommandContext = { path: "~", sessionHistory: [] };

describe("executeCommand", () => {
  it("help returns command list", () => {
    const result = executeCommand("help", baseCtx);
    const text = result.entries[0]?.output;
    expect(text?.kind).toBe("text");
    if (text?.kind === "text") {
      expect(text.lines.some((l) => l.includes("bio"))).toBe(true);
    }
  });

  it("invalid command returns friendly message", () => {
    const result = executeCommand("foo-bar", baseCtx);
    expect(result.entries[0]?.type).toBe("error");
    const out = result.entries[0]?.output;
    if (out?.kind === "text") {
      expect(out.lines[0]).toContain("não encontrado");
    }
  });

  it("sudo rm -rf returns security joke", () => {
    const result = executeCommand("sudo rm -rf /", baseCtx);
    const out = result.entries[0]?.output;
    if (out?.kind === "text") {
      expect(out.lines[0]).toContain("Permissão negada");
    }
  });

  it("docker ps returns docker-ps component", () => {
    const result = executeCommand("docker ps", baseCtx);
    expect(result.entries[0]?.output).toEqual({
      kind: "component",
      id: "docker-ps",
    });
  });

  it("docker-compose up triggers boot action", () => {
    const result = executeCommand("docker-compose up", baseCtx);
    expect(result.action).toBe("boot");
  });

  it("clear triggers clear action", () => {
    expect(executeCommand("clear", baseCtx).action).toBe("clear");
  });

  it("cd projetos updates path", () => {
    const result = executeCommand("cd projetos", baseCtx);
    expect(result.path).toBe("~/projetos");
  });

  it("ls in projetos lists project files", () => {
    const ctx: CommandContext = { path: "~/projetos", sessionHistory: [] };
    const result = executeCommand("ls", ctx);
    const out = result.entries[0]?.output;
    if (out?.kind === "text") {
      expect(out.lines.some((l) => l.includes("rm-ecopecas.md"))).toBe(true);
    }
  });

  it("cat rm-ecopecas.md returns file content component", () => {
    const ctx: CommandContext = { path: "~/projetos", sessionHistory: [] };
    const result = executeCommand("cat rm-ecopecas.md", ctx);
    expect(result.entries[0]?.output.kind).toBe("component");
    if (result.entries[0]?.output.kind === "component") {
      expect(result.entries[0].output.id).toBe("file-content");
    }
  });

  it("history lists session commands", () => {
    const ctx: CommandContext = {
      path: "~",
      sessionHistory: ["help", "bio"],
    };
    const result = executeCommand("history", ctx);
    const out = result.entries[0]?.output;
    if (out?.kind === "text") {
      expect(out.lines.some((l) => l.includes("help"))).toBe(true);
      expect(out.lines.some((l) => l.includes("bio"))).toBe(true);
    }
  });

  it("formatPrompt reflects path", () => {
    expect(formatPrompt("~")).toContain(":~$");
    expect(formatPrompt("~/projetos")).toContain(":/projetos$");
  });

  it("system-stats returns live component", () => {
    const result = executeCommand("system-stats", baseCtx);
    expect(result.entries[0]?.output).toEqual({
      kind: "component",
      id: "system-stats-live",
    });
  });

  it("docker stats --live returns live component", () => {
    const result = executeCommand("docker stats --live", baseCtx);
    expect(result.entries[0]?.output.kind).toBe("component");
    if (result.entries[0]?.output.kind === "component") {
      expect(result.entries[0].output.id).toBe("docker-stats-live");
    }
  });

  it("ai-agent --interact starts agent mode", () => {
    const result = executeCommand("ai-agent --interact", baseCtx);
    expect(result.action).toBe("ai-agent-start");
  });
});

describe("sanitizeTerminalInput", () => {
  it("strips script injection attempts", () => {
    const input = '<script>alert("x")</script>help';
    expect(sanitizeTerminalInput(input)).not.toContain("<");
    expect(sanitizeTerminalInput(input)).not.toContain(">");
  });

  it("limits length to 200 chars", () => {
    expect(sanitizeTerminalInput("a".repeat(300)).length).toBe(200);
  });
});

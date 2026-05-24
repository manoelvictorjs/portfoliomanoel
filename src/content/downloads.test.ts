import { describe, expect, it } from "vitest";
import {
  downloadCatalog,
  formatDownloadCardTitle,
  getDownloadById,
  getDownloadByTerminalCommand,
  getDownloadsForPlacement,
  resolveDownload,
  validateDownloadCatalog,
} from "./downloads";

describe("downloads catalog", () => {
  it("passes catalog validation", () => {
    expect(() => validateDownloadCatalog()).not.toThrow();
  });

  it("rejects duplicate terminal commands", () => {
    expect(() =>
      validateDownloadCatalog([
        ...downloadCatalog,
        {
          ...downloadCatalog[0]!,
          id: "other",
          terminalCommands: ["curriculo"],
        },
      ]),
    ).toThrow(/duplicado/i);
  });

  it("has unique ids", () => {
    const ids = downloadCatalog.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("resolves resume with pdf path", () => {
    const resume = getDownloadById("resume");
    expect(resume).toBeDefined();
    expect(resume?.href).toMatch(/\.pdf$/i);
    expect(resume?.mimeType).toBe("application/pdf");
  });

  it("maps terminal aliases", () => {
    expect(getDownloadByTerminalCommand("curriculo")?.id).toBe("resume");
    expect(getDownloadByTerminalCommand("cv")?.id).toBe("resume");
    expect(getDownloadByTerminalCommand("unknown")).toBeUndefined();
  });

  it("filters by placement", () => {
    const hero = getDownloadsForPlacement("hero");
    expect(hero.some((d) => d.id === "resume")).toBe(true);
    expect(getDownloadsForPlacement("nav").length).toBeGreaterThan(0);
  });

  it("resolveDownload marks external https urls", () => {
    const resolved = resolveDownload({
      ...downloadCatalog[0]!,
      defaultHref: "https://example.com/cv.pdf",
      hrefEnvKey: undefined,
    });
    expect(resolved.isExternal).toBe(true);
  });

  it("formatDownloadCardTitle replaces firstName", () => {
    expect(formatDownloadCardTitle("Currículo — {firstName}", "Manoel")).toBe(
      "Currículo — Manoel",
    );
  });
});

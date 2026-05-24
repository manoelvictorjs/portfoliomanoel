import { describe, expect, it } from "vitest";
import {
  isAllowedVpsPath,
  isPrivateOrLocalHost,
  isSafeResumeHref,
  isSafeTerminalOpenUrl,
  resolveVpsApiOrigin,
} from "./url";

describe("security/url", () => {
  it("rejects private hosts", () => {
    expect(isPrivateOrLocalHost("127.0.0.1")).toBe(true);
    expect(isPrivateOrLocalHost("10.0.0.5")).toBe(true);
    expect(isPrivateOrLocalHost("localhost")).toBe(true);
  });

  it("allows terminal open URLs on allowlist only", () => {
    expect(
      isSafeTerminalOpenUrl("https://www.linkedin.com/in/example"),
    ).toBe(true);
    expect(isSafeTerminalOpenUrl("https://github.com/user")).toBe(true);
    expect(isSafeTerminalOpenUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeTerminalOpenUrl("http://linkedin.com/x")).toBe(false);
    expect(isSafeTerminalOpenUrl("https://evil.com/phish")).toBe(false);
  });

  it("resolves VPS origin safely", () => {
    expect(resolveVpsApiOrigin("https://monitor.example.com")).toBe(
      "https://monitor.example.com",
    );
    expect(resolveVpsApiOrigin("http://monitor.example.com")).toBeNull();
    expect(resolveVpsApiOrigin("https://127.0.0.1")).toBeNull();
    expect(
      resolveVpsApiOrigin("https://user:pass@monitor.example.com"),
    ).toBeNull();
    expect(
      resolveVpsApiOrigin("https://monitor.example.com/admin"),
    ).toBeNull();
  });

  it("allows safe resume paths", () => {
    expect(isSafeResumeHref("/curriculo-manoel-victor.pdf")).toBe(true);
    expect(isSafeResumeHref("/../etc/passwd")).toBe(false);
    expect(isSafeResumeHref("javascript:x")).toBe(false);
  });

  it("allowlists VPS paths", () => {
    expect(isAllowedVpsPath("/system-stats")).toBe(true);
    expect(isAllowedVpsPath("/docker/stats")).toBe(true);
    expect(isAllowedVpsPath("/etc/passwd")).toBe(false);
    expect(isAllowedVpsPath("/system-stats/../admin")).toBe(false);
  });
});

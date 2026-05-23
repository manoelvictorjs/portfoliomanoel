import { describe, expect, it } from "vitest";
import {
  formatPhoneDisplay,
  getAge,
  getWhatsAppUrl,
  profile,
  professionalSummary,
} from "./profile";

describe("profile", () => {
  it("exposes required public fields", () => {
    expect(profile.name).toBeTruthy();
    expect(profile.email).toContain("@");
    expect(profile.github).toContain("github.com");
    expect(profile.linkedin).toContain("linkedin.com");
  });

  it("getAge subtracts birth year from reference", () => {
    expect(getAge(2026)).toBe(2026 - profile.birthYear);
  });

  it("formatPhoneDisplay formats 11-digit BR numbers", () => {
    expect(formatPhoneDisplay("48996238076")).toMatch(/^\(\d{2}\) \d{5}-\d{4}$/);
  });

  it("getWhatsAppUrl encodes default message", () => {
    const url = getWhatsAppUrl();
    expect(url).toMatch(/^https:\/\/wa\.me\//);
    expect(url).toContain("text=");
  });

  it("professionalSummary has RH-friendly metrics", () => {
    expect(professionalSummary.highlights.length).toBeGreaterThan(0);
    expect(professionalSummary.metrics.projectsShipped).toBeTruthy();
  });
});

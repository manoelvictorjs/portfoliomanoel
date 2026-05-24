import { describe, expect, it } from "vitest";
import { siteNavLinks } from "./site-navigation";

describe("site-navigation", () => {
  it("has unique ids and hash hrefs", () => {
    const ids = siteNavLinks.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(siteNavLinks.every((l) => l.href.startsWith("#"))).toBe(true);
  });

  it("includes main sections", () => {
    const ids = siteNavLinks.map((l) => l.id);
    expect(ids).toContain("projects");
    expect(ids).toContain("contact");
  });
});

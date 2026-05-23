import { describe, expect, it } from "vitest";
import {
  editorFloatingBadges,
  heroFloatingBadges,
  pageFloatingBadges,
} from "./floating-tech";

describe("floating-tech badges", () => {
  it("hero badges include TS and JS", () => {
    const ids = heroFloatingBadges.map((b) => b.id);
    expect(ids).toContain("ts");
    expect(ids).toContain("js");
  });

  it("page badges cover full scroll depth", () => {
    expect(pageFloatingBadges.length).toBeGreaterThanOrEqual(10);
    const tops = pageFloatingBadges.map((b) => b.position);
    expect(tops.some((p) => p.includes("top-[6%]"))).toBe(true);
    expect(tops.some((p) => p.includes("top-[7"))).toBe(true);
  });

  it("editor badges have unique ids", () => {
    const ids = editorFloatingBadges.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

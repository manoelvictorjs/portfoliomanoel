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

  it("page snake trail starts at TS with coordinates", () => {
    expect(pageFloatingBadges.length).toBeGreaterThanOrEqual(10);
    expect(pageFloatingBadges[0]?.id).toBe("page-ts");
    expect(pageFloatingBadges[0]?.x).toBeDefined();
    expect(pageFloatingBadges[0]?.y).toBeDefined();
  });

  it("editor badges have unique ids", () => {
    const ids = editorFloatingBadges.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

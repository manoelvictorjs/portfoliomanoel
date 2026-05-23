import { describe, expect, it } from "vitest";
import * as content from "./index";

describe("content barrel", () => {
  it("re-exports core modules", () => {
    expect(content.profile).toBeDefined();
    expect(content.projects.length).toBeGreaterThan(0);
    expect(content.skillsShowcase.length).toBeGreaterThan(0);
    expect(content.heroFloatingBadges.length).toBeGreaterThan(0);
    expect(content.techMarqueeItems.length).toBeGreaterThan(0);
  });
});

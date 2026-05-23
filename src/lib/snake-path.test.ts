import { describe, expect, it } from "vitest";
import { buildOrthogonalSnakePath, computeNodeThresholds } from "./snake-path";

describe("snake-path", () => {
  const points = [
    { x: 10, y: 10 },
    { x: 90, y: 10 },
    { x: 90, y: 50 },
    { x: 20, y: 50 },
  ];

  it("builds orthogonal segments", () => {
    const path = buildOrthogonalSnakePath(points);
    expect(path).toContain("M 10 10");
    expect(path).toContain("L 90 10");
    expect(path).toContain("L 90 50");
    expect(path).toContain("L 20 50");
  });

  it("returns monotonic thresholds ending at 1", () => {
    const t = computeNodeThresholds(points);
    expect(t[0]).toBe(0);
    expect(t[t.length - 1]).toBe(1);
    for (let i = 1; i < t.length; i++) {
      expect(t[i]).toBeGreaterThanOrEqual(t[i - 1]);
    }
  });
});

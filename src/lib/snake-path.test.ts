import { describe, expect, it } from "vitest";
import {
  buildDirectSnakePath,
  computeNodeThresholds,
  computeScrollThresholds,
  computeScrollThresholdsFromLayout,
  computeSnakeLitMap,
  mapScrollToPathProgress,
} from "./snake-path";

describe("snake-path", () => {
  const points = [
    { x: 10, y: 10 },
    { x: 90, y: 10 },
    { x: 90, y: 50 },
    { x: 20, y: 50 },
  ];

  it("builds direct segments between icons", () => {
    const path = buildDirectSnakePath(points);
    expect(path).toBe("M 10 10 L 90 10 L 90 50 L 20 50");
  });

  it("returns monotonic thresholds ending at 1", () => {
    const t = computeNodeThresholds(points);
    expect(t[0]).toBe(0);
    expect(t[t.length - 1]).toBe(1);
    for (let i = 1; i < t.length; i++) {
      expect(t[i]).toBeGreaterThanOrEqual(t[i - 1]);
    }
  });

  it("first at 0, last before halfway, monotonic", () => {
    const scroll = computeScrollThresholds(points);
    expect(scroll[0]).toBe(0);
    expect(scroll[scroll.length - 1]).toBeLessThanOrEqual(0.5);
    expect(scroll[1]).toBeGreaterThanOrEqual(0.06);
    for (let i = 1; i < scroll.length; i++) {
      expect(scroll[i]).toBeGreaterThanOrEqual(scroll[i - 1]);
    }
  });

  it("maps scroll progress onto path progress", () => {
    const pathT = computeNodeThresholds(points);
    const scrollT = computeScrollThresholds(points);
    expect(mapScrollToPathProgress(0, scrollT, pathT)).toBe(0);
    expect(mapScrollToPathProgress(1, scrollT, pathT)).toBe(1);
  });

  it("layout thresholds follow icon Y order", () => {
    const layout = computeScrollThresholdsFromLayout(points);
    expect(layout[0]).toBe(0);
    expect(layout[layout.length - 1]).toBeGreaterThan(layout[1]);
  });

  it("lights icons as scroll passes thresholds", () => {
    const layout = computeScrollThresholdsFromLayout(points);
    expect(computeSnakeLitMap(0, layout, true)[0]).toBe(true);
    expect(computeSnakeLitMap(0.5, layout, false)[points.length - 1]).toBe(true);
  });
});

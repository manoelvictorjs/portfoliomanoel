import { describe, expect, it } from "vitest";
import {
  completedProjects,
  inProgressProjects,
  projects,
} from "./projects";

describe("projects content", () => {
  it("has unique ids", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every project has dual-layer copy", () => {
    for (const p of projects) {
      expect(p.businessPitch.length).toBeGreaterThan(20);
      expect(p.engineering.architecture.length).toBeGreaterThan(10);
      expect(p.stack.length).toBeGreaterThan(0);
    }
  });

  it("completed and in_progress partition the list", () => {
    expect(completedProjects.length + inProgressProjects.length).toBe(
      projects.length,
    );
    expect(completedProjects.every((p) => p.status === "completed")).toBe(true);
    expect(inProgressProjects.every((p) => p.status === "in_progress")).toBe(
      true,
    );
  });

  it("includes featured RM Ecopeças project", () => {
    const rm = projects.find((p) => p.id === "rm-ecopecas");
    expect(rm).toBeDefined();
    expect(rm?.featured).toBe(true);
  });
});

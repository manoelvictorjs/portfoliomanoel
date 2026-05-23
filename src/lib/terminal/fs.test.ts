import { describe, expect, it } from "vitest";
import { formatLsLine, listDirectory, readFile, resolvePath } from "./fs";

describe("terminal fs", () => {
  it("lists home files at ~", () => {
    const files = listDirectory("~");
    expect(files.some((f) => f.name === "README.md")).toBe(true);
  });

  it("lists project markdown files in ~/projetos", () => {
    const files = listDirectory("~/projetos");
    expect(files.some((f) => f.name.includes("rm-ecopecas"))).toBe(true);
  });

  it("resolvePath navigates into projetos", () => {
    expect(resolvePath("~", "projetos")).toBe("~/projetos");
    expect(resolvePath("~/projetos", "..")).toBe("~");
  });

  it("readFile returns curriculo at home", () => {
    const content = readFile("~", "curriculo.pdf");
    expect(content).toBeTruthy();
    expect(content).toContain("Manoel");
  });

  it("formatLsLine marks directories with slash", () => {
    expect(formatLsLine({ name: "projetos", type: "dir" })).toContain("projetos/");
  });
});

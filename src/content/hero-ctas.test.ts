import { describe, expect, it } from "vitest";
import { heroScrollCtas } from "./hero-ctas";

describe("hero-ctas", () => {
  it("has unique ids and hash links", () => {
    const ids = heroScrollCtas.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(heroScrollCtas[0]?.variant).toBe("primary");
  });
});

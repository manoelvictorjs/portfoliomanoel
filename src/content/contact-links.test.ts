import { describe, expect, it } from "vitest";
import { getContactLinkById, getContactLinks } from "./contact-links";

describe("contact-links", () => {
  it("exposes core channels with unique ids", () => {
    const links = getContactLinks();
    const ids = links.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("linkedin");
    expect(ids).toContain("email");
    expect(ids).toContain("whatsapp");
    expect(ids).toContain("github");
  });

  it("email uses mailto", () => {
    const email = getContactLinkById("email");
    expect(email?.href).toMatch(/^mailto:/);
    expect(email?.opensInNewTab).toBe(false);
  });

  it("social links open in new tab", () => {
    expect(getContactLinkById("linkedin")?.opensInNewTab).toBe(true);
    expect(getContactLinkById("github")?.href).toContain("github.com");
  });
});

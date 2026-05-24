import { getDownloadById } from "@/content/downloads";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { triggerDownload } from "./trigger";

describe("triggerDownload", () => {
  beforeEach(() => {
    vi.stubGlobal("document", {
      createElement: vi.fn(() => ({
        click: vi.fn(),
        href: "",
        download: "",
        rel: "",
        target: "",
      })),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns false for invalid href", () => {
    const resume = getDownloadById("resume")!;
    expect(
      triggerDownload({ ...resume, href: "javascript:alert(1)" }),
    ).toBe(false);
  });

  it("triggers anchor click for valid resume path", () => {
    const resume = getDownloadById("resume")!;
    expect(triggerDownload(resume)).toBe(true);
    expect(document.createElement).toHaveBeenCalledWith("a");
  });
});

import { profile } from "@/content/profile";
import { isSafeResumeHref } from "@/lib/security/url";

const DEFAULT_RESUME_PATH = "/curriculo-manoel-victor.pdf";
const DEFAULT_RESUME_FILENAME = "Manoel-Victor-Curriculo.pdf";

export type ResumeDownload = {
  href: string;
  filename: string;
  isExternal: boolean;
};

export function getResumeDownload(): ResumeDownload {
  const href =
    process.env.NEXT_PUBLIC_RESUME_URL?.trim() || DEFAULT_RESUME_PATH;
  const filename =
    process.env.NEXT_PUBLIC_RESUME_FILENAME?.trim() || DEFAULT_RESUME_FILENAME;
  const isExternal = href.startsWith("http");

  return { href, filename, isExternal };
}

/** Dispara download no navegador (somente URLs validadas). */
export function triggerResumeDownload(resume = getResumeDownload()): boolean {
  if (typeof document === "undefined") return false;
  if (!isSafeResumeHref(resume.href)) return false;

  const anchor = document.createElement("a");
  anchor.href = resume.href;
  anchor.rel = "noopener noreferrer";

  if (resume.isExternal) {
    anchor.target = "_blank";
  } else {
    anchor.download = resume.filename;
  }

  anchor.click();
  return true;
}

export function resumeDownloadLabel(): string {
  const first = profile.name.split(" ")[0] ?? "Currículo";
  return `Currículo — ${first}`;
}

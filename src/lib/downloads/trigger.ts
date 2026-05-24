import { isSafeDownloadHref } from "@/lib/security/url";
import type { ResolvedDownload } from "@/types/content";

/** Dispara download no navegador (somente URLs validadas). */
export function triggerDownload(download: ResolvedDownload): boolean {
  if (typeof document === "undefined") return false;
  if (!isSafeDownloadHref(download.href)) return false;

  const anchor = document.createElement("a");
  anchor.href = download.href;
  anchor.rel = "noopener noreferrer";

  if (download.isExternal) {
    anchor.target = "_blank";
  } else {
    anchor.download = download.filename;
  }

  anchor.click();
  return true;
}

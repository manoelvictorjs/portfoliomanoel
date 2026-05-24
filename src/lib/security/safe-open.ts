import { isSafeTerminalOpenUrl } from "./url";

/** Abre URL externa somente se passar na allowlist HTTPS. */
export function safeOpenExternalUrl(url: string | undefined): boolean {
  if (!url || !isSafeTerminalOpenUrl(url)) return false;
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}

/**
 * Validação de URLs — uso em cliente (window.open) e servidor (proxy VPS).
 */

const PRIVATE_HOST_RE =
  /^(localhost|127\.\d+\.\d+\.\d+|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+|169\.254\.\d+\.\d+|0\.0\.0\.0|\[::1\]|::1)$/i;

/** Hosts permitidos para links abertos pelo terminal (allowlist estrita). */
const TERMINAL_OPEN_HOSTS = new Set([
  "linkedin.com",
  "www.linkedin.com",
  "github.com",
  "www.github.com",
  "wa.me",
  "api.whatsapp.com",
  "outlook.com",
  "www.outlook.com",
  "live.com",
]);

export function isPrivateOrLocalHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (PRIVATE_HOST_RE.test(host)) return true;
  if (host.endsWith(".local") || host.endsWith(".internal")) return true;
  return false;
}

export function isSafeHttpsUrl(
  href: string,
  options?: { allowedHosts?: Set<string> },
): boolean {
  try {
    const u = new URL(href.trim());
    if (u.protocol !== "https:") return false;
    if (u.username || u.password) return false;
    const host = u.hostname.toLowerCase();
    if (isPrivateOrLocalHost(host)) return false;

    if (options?.allowedHosts) {
      const ok =
        options.allowedHosts.has(host) ||
        [...options.allowedHosts].some(
          (allowed) => host === allowed || host.endsWith(`.${allowed}`),
        );
      if (!ok) return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function isSafeTerminalOpenUrl(href: string): boolean {
  return isSafeHttpsUrl(href, { allowedHosts: TERMINAL_OPEN_HOSTS });
}

/** Links de projetos — HTTPS público, sem rede interna (env controlada na Vercel). */
export function isSafeProjectLiveUrl(href: string): boolean {
  return isSafeHttpsUrl(href);
}

/** PDF do currículo — path local em /public ou URL HTTPS pública. */
export function isSafeResumeHref(href: string): boolean {
  const trimmed = href.trim();
  if (trimmed.startsWith("/")) {
    return /^\/[\w.-]+\.pdf$/i.test(trimmed) && !trimmed.includes("..");
  }
  return isSafeHttpsUrl(trimmed);
}

/** Origem HTTPS do proxy VPS — sem path, sem credenciais, sem rede interna. */
export function resolveVpsApiOrigin(rawBase: string | undefined): string | null {
  const raw = rawBase?.trim();
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:") return null;
    if (u.username || u.password) return null;
    if (isPrivateOrLocalHost(u.hostname)) return null;
    if (u.pathname !== "/" && u.pathname !== "") return null;
    return u.origin;
  } catch {
    return null;
  }
}

const VPS_ALLOWED_PATHS = new Set(["/system-stats", "/docker/stats"]);

export function isAllowedVpsPath(path: string): boolean {
  if (!path.startsWith("/") || path.includes("..")) return false;
  return VPS_ALLOWED_PATHS.has(path);
}

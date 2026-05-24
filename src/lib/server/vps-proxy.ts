import {
  isAllowedVpsPath,
  resolveVpsApiOrigin,
} from "@/lib/security/url";

const VPS_ORIGIN = resolveVpsApiOrigin(process.env.VPS_API_BASE_URL);
const VPS_SECRET = process.env.VPS_API_SECRET?.trim();

export function hasVpsProxy(): boolean {
  return Boolean(VPS_ORIGIN);
}

export async function fetchFromVps<T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> {
  if (!VPS_ORIGIN || !isAllowedVpsPath(path)) return null;

  try {
    const res = await fetch(`${VPS_ORIGIN}${path}`, {
      ...init,
      redirect: "error",
      headers: {
        Accept: "application/json",
        ...(VPS_SECRET ? { "x-api-key": VPS_SECRET } : {}),
        ...init?.headers,
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

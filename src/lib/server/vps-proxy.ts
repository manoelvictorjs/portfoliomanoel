const VPS_BASE = process.env.VPS_API_BASE_URL?.replace(/\/$/, "");
const VPS_SECRET = process.env.VPS_API_SECRET;

export function hasVpsProxy(): boolean {
  return Boolean(VPS_BASE);
}

export async function fetchFromVps<T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> {
  if (!VPS_BASE) return null;

  try {
    const res = await fetch(`${VPS_BASE}${path}`, {
      ...init,
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

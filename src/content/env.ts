/** Leitura padronizada de variáveis públicas (NEXT_PUBLIC_*). */

export function readPublicEnv(key: string, fallback: string): string {
  const value = process.env[key]?.trim();
  return value || fallback;
}

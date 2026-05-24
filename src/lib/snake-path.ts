/**
 * Geometria da trilha “cobrinha” (PageFloatingTech).
 * Pontos em coordenadas SVG 0–100; thresholds alimentam pathLength da animação.
 */

export type SnakePoint = { x: number; y: number };

/** Liga cada ícone ao próximo em linha reta */
export function buildDirectSnakePath(points: SnakePoint[]): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  let d = `M ${first.x} ${first.y}`;
  for (const p of rest) {
    d += ` L ${p.x} ${p.y}`;
  }
  return d;
}

/** @deprecated use buildDirectSnakePath */
export const buildOrthogonalSnakePath = buildDirectSnakePath;

function segmentLength(a: SnakePoint, b: SnakePoint): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/** Progresso 0–1 ao longo do path SVG (distância euclidiana entre nós) */
export function computeNodeThresholds(points: SnakePoint[]): number[] {
  if (points.length === 0) return [];
  if (points.length === 1) return [0];

  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += segmentLength(points[i - 1], points[i]);
  }

  const thresholds: number[] = [0];
  let dist = 0;
  for (let i = 1; i < points.length; i++) {
    dist += segmentLength(points[i - 1], points[i]);
    thresholds.push(dist / (total || 1));
  }

  return thresholds;
}

/**
 * Progresso de scroll em que cada badge acende (ordem da cobrinha).
 * - Índice 0: topo (sempre tratado como aceso no componente)
 * - Índices 1…n-1: de `scrollStart` até `scrollEnd` (ex.: antes da metade da página)
 */
export function computeScrollThresholds(
  points: SnakePoint[],
  scrollStart = 0.06,
  scrollEnd = 0.48,
): number[] {
  if (points.length === 0) return [];
  const n = points.length;
  if (n === 1) return [0];
  if (n === 2) return [0, scrollEnd];

  return points.map((_, i) => {
    if (i === 0) return 0;
    const t = (i - 1) / (n - 2);
    return scrollStart + t * (scrollEnd - scrollStart);
  });
}

/**
 * Limites de scroll (0–1) derivados da posição Y % de cada ícone no layout.
 * Ícone acende quando scrollProgress >= threshold[i].
 */
export function computeScrollThresholdsFromLayout(
  points: SnakePoint[],
  factor = 0.88,
): number[] {
  if (points.length === 0) return [];
  return points.map((p, i) => {
    if (i === 0) return 0;
    return Math.max(0.04, (p.y / 100) * factor);
  });
}

/** Progresso de scroll da página (0–1) */
export function getPageScrollProgress(): number {
  if (typeof window === "undefined") return 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 8) return 0;
  return Math.min(1, Math.max(0, window.scrollY / max));
}

/** Mapa índice → aceso conforme scroll */
export function computeSnakeLitMap(
  scrollProgress: number,
  scrollThresholds: number[],
  atTop: boolean,
): Record<number, boolean> {
  const lit: Record<number, boolean> = {};
  if (atTop) {
    lit[0] = true;
    return lit;
  }
  for (let i = 0; i < scrollThresholds.length; i++) {
    lit[i] = scrollProgress >= scrollThresholds[i];
  }
  return lit;
}

/** Converte progresso de scroll em progresso ao longo do path (mantém linha no ícone) */
export function mapScrollToPathProgress(
  scroll: number,
  scrollThresholds: number[],
  pathThresholds: number[],
): number {
  if (scrollThresholds.length === 0) return scroll;
  if (scroll <= scrollThresholds[0]) return pathThresholds[0] ?? 0;

  const last = scrollThresholds.length - 1;
  if (scroll >= scrollThresholds[last]) return pathThresholds[last] ?? 1;

  for (let i = 0; i < last; i++) {
    const s0 = scrollThresholds[i];
    const s1 = scrollThresholds[i + 1];
    if (scroll <= s1) {
      const u = (scroll - s0) / (s1 - s0 || 1);
      const p0 = pathThresholds[i] ?? 0;
      const p1 = pathThresholds[i + 1] ?? 1;
      return p0 + u * (p1 - p0);
    }
  }

  return 1;
}

export type SnakePoint = { x: number; y: number };

/** Caminho ortogonal estilo cobrinha (horizontal → vertical entre nós) */
export function buildOrthogonalSnakePath(points: SnakePoint[]): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  let d = `M ${first.x} ${first.y}`;
  let cx = first.x;
  let cy = first.y;

  for (const p of rest) {
    if (Math.abs(p.x - cx) > 0.01) {
      d += ` L ${p.x} ${cy}`;
      cx = p.x;
    }
    if (Math.abs(p.y - cy) > 0.01) {
      d += ` L ${cx} ${p.y}`;
      cy = p.y;
    }
  }

  return d;
}

/** Progresso 0–1 do scroll em que cada nó acende (um threshold por badge) */
export function computeNodeThresholds(points: SnakePoint[]): number[] {
  if (points.length === 0) return [];
  if (points.length === 1) return [0];

  let cx = points[0].x;
  let cy = points[0].y;
  let total = 0;

  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    if (Math.abs(p.x - cx) > 0.01) {
      total += Math.abs(p.x - cx);
      cx = p.x;
    }
    if (Math.abs(p.y - cy) > 0.01) {
      total += Math.abs(p.y - cy);
      cy = p.y;
    }
  }

  const thresholds: number[] = [0];
  cx = points[0].x;
  cy = points[0].y;
  let dist = 0;

  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    if (Math.abs(p.x - cx) > 0.01) {
      dist += Math.abs(p.x - cx);
      cx = p.x;
    }
    if (Math.abs(p.y - cy) > 0.01) {
      dist += Math.abs(p.y - cy);
      cy = p.y;
    }
    thresholds.push(dist / (total || 1));
  }

  return thresholds;
}

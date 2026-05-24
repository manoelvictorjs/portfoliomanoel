/**
 * Tokens de animação reutilizáveis — evita magic numbers espalhados nos componentes.
 */

/** Scroll: distância em px para resetar trilha de ícones / estado “lit” */
export const SCROLL_TOP_RESET_PX = 48;

/** Scroll: ratio da altura da viewport para acender ícone (0.5 = meio da tela) */
export const VIEWPORT_CENTER_RATIO = 0.5;

/** Tilt 3D — perfis por contexto */
export const TILT_PRESETS = {
  card: { maxRotate: 6, maxDepth: 10, stiffness: 120, damping: 18 },
  profile: { maxRotate: 10, maxDepth: 18, stiffness: 120, damping: 18 },
  editor: { maxRotate: 6, maxDepth: 12, stiffness: 120, damping: 18 },
  hero: { maxRotate: 4, maxDepth: 6, stiffness: 90, damping: 24 },
} as const;

/** Hero 3D stage — mola do parallax */
export const HERO_3D_SPRING = { stiffness: 90, damping: 24, mass: 0.7 } as const;

/** RGB (sem alpha) da luz do cursor por seção — sincronize com SITE_SECTIONS */
export const CURSOR_SECTION_TINTS: Record<string, string> = {
  hero: "45, 212, 191",
  "tech-domain": "49, 120, 198",
  skills: "167, 139, 250",
  learning: "245, 158, 11",
  projects: "34, 211, 238",
  contact: "45, 212, 191",
};

export const CURSOR_TINT_DEFAULT = "45, 212, 191";

/** Mola da luz que segue o cursor */
export const CURSOR_LIGHT_SPRING = { stiffness: 140, damping: 22, mass: 0.45 } as const;

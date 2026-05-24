/**
 * Configuração central do site — âncoras, ordem de seções e metadados.
 * Mantenha IDs sincronizados com CompileSection `id` e links do SiteNav.
 */

/** IDs HTML das seções (hash links: #hero, #skills, …) */
export const SITE_SECTIONS = {
  hero: "hero",
  about: "about",
  techDomain: "tech-domain",
  skills: "skills",
  learning: "learning",
  projects: "projects",
  contact: "contact",
} as const;

export type SiteSectionId = (typeof SITE_SECTIONS)[keyof typeof SITE_SECTIONS];

/** Ordem das seções na MarketingPage (referência para novas seções) */
export const MARKETING_SECTION_ORDER = [
  SITE_SECTIONS.hero,
  SITE_SECTIONS.techDomain,
  SITE_SECTIONS.skills,
  SITE_SECTIONS.learning,
  SITE_SECTIONS.projects,
] as const;

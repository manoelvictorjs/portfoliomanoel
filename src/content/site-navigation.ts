import { SITE_SECTIONS } from "@/config/site";
import type { SiteNavLink } from "@/types/content";

/** Links do menu principal — ordem = ordem na UI */
export const siteNavLinks: SiteNavLink[] = [
  { id: "hero", label: "Início", href: `#${SITE_SECTIONS.hero}` },
  { id: "stack", label: "Stack", href: `#${SITE_SECTIONS.techDomain}` },
  { id: "journey", label: "Jornada", href: `#${SITE_SECTIONS.skills}` },
  { id: "learning", label: "Formação", href: `#${SITE_SECTIONS.learning}` },
  { id: "projects", label: "Projetos", href: `#${SITE_SECTIONS.projects}` },
  { id: "contact", label: "Contato", href: `#${SITE_SECTIONS.contact}` },
];

export function getSiteNavLinkById(id: string): SiteNavLink | undefined {
  return siteNavLinks.find((link) => link.id === id);
}

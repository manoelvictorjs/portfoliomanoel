import { SITE_SECTIONS } from "@/config/site";
import type { ScrollCta } from "@/types/content";

/** CTAs de scroll do hero (downloads vêm do catálogo por placement) */
export const heroScrollCtas: ScrollCta[] = [
  {
    id: "projects",
    label: "Ver projetos",
    href: `#${SITE_SECTIONS.projects}`,
    variant: "primary",
  },
  {
    id: "stack",
    label: "Stack & código",
    href: `#${SITE_SECTIONS.techDomain}`,
    variant: "link",
  },
  {
    id: "contact",
    label: "Contato",
    href: `#${SITE_SECTIONS.contact}`,
    variant: "link",
  },
];
